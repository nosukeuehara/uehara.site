export type LanguageSkill = {
  name: string;
  bytes: number;
  ratio: number;
};

export type ProfileCloudItem = {
  label: string;
  tone: "primary" | "secondary" | "language";
  weight: number;
};

export const profileCloudItems: ProfileCloudItem[] = [
  { label: "上 原 龍 之 介", tone: "primary", weight: 1 },
  { label: "ue / hara", tone: "secondary", weight: 0.7 },
  { label: "web", tone: "secondary", weight: 0.68 },
  { label: "2001", tone: "primary", weight: 0.78 },
  { label: "宮古島", tone: "secondary", weight: 0.62 },
  { label: "Docker", tone: "language", weight: 0.58 },
  { label: "Python", tone: "language", weight: 0.54 },
  { label: "Next.js", tone: "language", weight: 0.52 },
  { label: "Tailwind", tone: "language", weight: 0.48 },
  { label: "React", tone: "language", weight: 0.5 },
  { label: "sweep", tone: "secondary", weight: 0.42 },
];

export const fallbackLanguageSkills: LanguageSkill[] = [
  { name: "JavaScript", bytes: 500, ratio: 1 },
  { name: "TypeScript", bytes: 420, ratio: 0.84 },
  { name: "PHP", bytes: 280, ratio: 0.56 },
  { name: "Python", bytes: 180, ratio: 0.36 },
];
