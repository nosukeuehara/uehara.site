import {
  fallbackLanguageSkills,
  type LanguageSkill,
} from "../contentData/meItem";

type GitHubRepo = {
  fork: boolean;
  archived: boolean;
  languages_url: string;
};

type GitHubLanguageMap = Record<string, number>;

const GITHUB_API_BASE_URL = "https://api.github.com";
const DEFAULT_GITHUB_USERNAME = "nosukeuehara";
const CACHE_KEY = "uehara-site:github-language-skills-v2";
const DEFAULT_CACHE_TTL_MS = 1000 * 60 * 60 * 12;
const MAX_REPOS_TO_ANALYZE = 30;
const MAX_LANGUAGES_TO_SHOW = 12;
const languageDisplayNames = new Map([["Dockerfile", "Docker"]]);

export async function fetchGitHubLanguageSkills(): Promise<LanguageSkill[]> {
  const username = getGitHubUsername();

  if (!username) {
    return fallbackLanguageSkills;
  }

  const cached = readLanguageSkillsCache(username);
  if (cached) {
    return cached;
  }

  try {
    const repos = await fetchUserRepos(username);
    const activeRepos = repos
      .filter((repo) => !repo.fork && !repo.archived)
      .slice(0, MAX_REPOS_TO_ANALYZE);

    if (activeRepos.length === 0) {
      return fallbackLanguageSkills;
    }

    const languagesByName = await fetchAggregatedLanguages(activeRepos);
    const languageSkills = buildLanguageSkills(languagesByName);

    if (languageSkills.length === 0) {
      return fallbackLanguageSkills;
    }

    writeLanguageSkillsCache(username, languageSkills);
    return languageSkills;
  } catch {
    return fallbackLanguageSkills;
  }
}

function getGitHubUsername() {
  const configuredUsername = import.meta.env.VITE_GITHUB_USERNAME;

  if (configuredUsername) {
    return configuredUsername;
  }

  return (
    getUsernameFromGitHubUrl(import.meta.env.VITE_GITHUB_REPO_URL) ||
    DEFAULT_GITHUB_USERNAME
  );
}

function getUsernameFromGitHubUrl(url: string | undefined) {
  if (!url) {
    return "";
  }

  try {
    const parsedUrl = new URL(url);
    const [, username] = parsedUrl.pathname.split("/");
    return parsedUrl.hostname === "github.com" ? username || "" : "";
  } catch {
    const match = url.match(/github\.com[:/]([^/]+)\//);
    return match?.[1] ?? "";
  }
}

async function fetchUserRepos(username: string) {
  const res = await fetch(
    `${GITHUB_API_BASE_URL}/users/${username}/repos?per_page=100&sort=pushed`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch GitHub repositories.");
  }

  return (await res.json()) as GitHubRepo[];
}

async function fetchAggregatedLanguages(repos: GitHubRepo[]) {
  const languageMaps = await Promise.all(
    repos.map(async (repo) => {
      const res = await fetch(repo.languages_url);

      if (!res.ok) {
        return {};
      }

      return (await res.json()) as GitHubLanguageMap;
    })
  );

  return languageMaps.reduce<GitHubLanguageMap>((result, languages) => {
    Object.entries(languages).forEach(([language, bytes]) => {
      result[language] = (result[language] ?? 0) + bytes;
    });

    return result;
  }, {});
}

function buildLanguageSkills(languagesByName: GitHubLanguageMap) {
  const normalizedLanguages = Object.entries(languagesByName).reduce(
    (result, [name, bytes]) => {
      const displayName = languageDisplayNames.get(name) ?? name;
      result[displayName] = (result[displayName] ?? 0) + bytes;

      return result;
    },
    {} as GitHubLanguageMap
  );
  const sortedLanguages = Object.entries(normalizedLanguages)
    .filter(([, bytes]) => bytes > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, MAX_LANGUAGES_TO_SHOW);
  const maxBytes = sortedLanguages[0]?.[1] ?? 1;

  return sortedLanguages.map<LanguageSkill>(([name, bytes]) => ({
    name,
    bytes,
    ratio: bytes / maxBytes,
  }));
}

function readLanguageSkillsCache(username: string) {
  try {
    const rawCache = window.localStorage.getItem(`${CACHE_KEY}:${username}`);

    if (!rawCache) {
      return null;
    }

    const cache = JSON.parse(rawCache) as {
      expiresAt: number;
      languageSkills: LanguageSkill[];
    };

    return cache.expiresAt > Date.now() && Array.isArray(cache.languageSkills)
      ? cache.languageSkills
      : null;
  } catch {
    return null;
  }
}

function writeLanguageSkillsCache(
  username: string,
  languageSkills: LanguageSkill[]
) {
  const cacheTtlMs = Number(
    import.meta.env.VITE_GITHUB_SKILLS_CACHE_TTL_MS ?? DEFAULT_CACHE_TTL_MS
  );

  try {
    window.localStorage.setItem(
      `${CACHE_KEY}:${username}`,
      JSON.stringify({
        expiresAt: Date.now() + cacheTtlMs,
        languageSkills,
      })
    );
  } catch {
    // localStorage が使えない環境では毎回 API から取得する。
  }
}
