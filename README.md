## 仕様技術

### フロントエンド

- Svelte 5（Routifyベース）
- CSS（ライブラリ不使用）

### コンテンツ管理

- microCMS（REST API経由でコンテンツ取得）

### GitHub連携

- `VITE_GITHUB_USERNAME`: プロフィールの使用言語取得に使うGitHubユーザー名
- `VITE_GITHUB_REPO_URL`: `VITE_GITHUB_USERNAME` 未設定時のユーザー名推定元
- `VITE_GITHUB_SKILLS_CACHE_TTL_MS`: 使用言語取得結果のブラウザキャッシュ時間（任意）
- 未設定の場合は `nosukeuehara` をデフォルトのGitHubユーザーとして使用

### ホスティング

- Cloudflare Pages（静的ホスティング）
- Cloudflare Workers（APIプロキシ用途）

### BitPetリリースキャンペーン

- `VITE_BITPET_CAMPAIGN_END_AT`: 8bitデザインの終了日時（ISO 8601 UTC）
- デフォルトは `2026-09-15T14:59:59.000Z`（2026/09/15 23:59:59 JST）
- `main` への反映、または `site/bitpet-8bit-*` タグでGitHub Pagesへ自動デプロイ

### 生成AIの活用

- ChatGPT
  - Svelteのドキュメント理解や設計補助
- NotebookLM
  - ドキュメントの要約・辞書的参照

## 更新履歴

- 2026/08/15 BitPetリリース記念の8bitデザインとCI/CD設定を追加
- 2025/06/01 公開
