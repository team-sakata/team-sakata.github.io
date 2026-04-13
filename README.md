# team-sakata.github.io

坂田・森・浅谷・西本研究室のホームページ（Astro製）

## 全体の仕組み

```
┌─────────────────────────────────────────────────────────────────┐
│                        GitHub リポジトリ                         │
│              team-sakata/team-sakata.github.io                   │
│                                                                 │
│  ┌─────────────────────┐       ┌──────────────────────────┐    │
│  │   main ブランチ      │       │   gh-pages ブランチ       │    │
│  │                     │       │                          │    │
│  │  src/               │ ビルド │  index.html              │    │
│  │  ├── pages/         │──────▶│  ja/...                  │    │
│  │  ├── components/    │       │  en/...                  │    │
│  │  ├── data/          │       │  assets/                 │    │
│  │  └── layouts/       │       │  images/                 │    │
│  │  public/            │       │                          │    │
│  │  package.json       │       │  ※ dist/ の中身が         │    │
│  │  astro.config.mjs   │       │    そのまま配置される       │    │
│  └─────────────────────┘       └───────────┬──────────────┘    │
│                                             │                   │
└─────────────────────────────────────────────┼───────────────────┘
                                              │ GitHub Pages が
                                              │ 自動で配信
                                              ▼
                                 ┌──────────────────────┐
                                 │   本番サーバー         │
                                 │                      │
                                 │  https://team-sakata │
                                 │    .github.io/       │
                                 └──────────────────────┘
```

### ブランチの役割

| ブランチ | 役割 |
|:---------|:-----|
| `main` | ソースコード（Astro）。編集はここで行う |
| `gh-pages` | ビルド済み HTML/CSS/JS。直接編集しない |

### デプロイの流れ

```
ローカルで編集 → main に push → npm run deploy → gh-pages に自動 push → 本番反映
```

`npm run deploy` は内部で以下を実行します：

1. `GITHUB_PAGES=true npm run build` — Astro でビルド（`dist/` に出力）
2. `gh-pages -d dist` — `dist/` の中身を `gh-pages` ブランチに push

---

## セットアップ

```bash
git clone https://github.com/team-sakata/team-sakata.github.io.git
cd team-sakata.github.io
npm install
```

## コマンド一覧

| コマンド | 説明 |
|:---------|:-----|
| `npm run dev` | ローカル開発サーバー起動（`localhost:4321`） |
| `npm run build` | ビルド（`dist/` に出力） |
| `npm run preview` | ビルド結果をローカルでプレビュー |
| `npm run deploy` | **ビルド＋本番デプロイ（gh-pages へ push）** |

## 本番デプロイ手順（コピペ用）

```bash
npm run deploy
```

これだけで本番に反映されます（1〜2分後に https://team-sakata.github.io/ で確認）。

### `npm run deploy` が裏でやっていること

```
npm run deploy
  │
  ├─ 1. npm run predeploy（自動実行）
  │     └─ GITHUB_PAGES=true npm run build
  │           └─ Astro が src/ 以下をコンパイルし、dist/ に HTML/CSS/JS を生成
  │
  └─ 2. gh-pages -d dist
        └─ dist/ の中身を gh-pages ブランチに commit & push
              └─ GitHub Pages が自動検知して本番サーバーに配信
```

> **注意**: `main` ブランチで作業していることを確認してから実行してください。
> 初回や久しぶりの場合は `npm install` を先に実行してください。

## コンテンツの編集

- **ニュース**: `src/data/news.yaml`
- **メンバー**: `src/data/members.yaml`
- **ページ**: `src/pages/[...locale]/` 以下の `.astro` ファイル
- **画像**: `public/images/`
