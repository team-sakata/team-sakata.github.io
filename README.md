# team-sakata.github.io

坂田・森・浅谷・西本研究室のホームページ

- 本番 URL: https://team-sakata.github.io/
- 技術スタック: [Astro](https://astro.build/)（静的サイトジェネレーター）+ [GitHub Pages](https://pages.github.com/)（ホスティング）

---

## 全体の仕組み

```
┌─────────────────────────────────────────────────────────────────┐
│                        GitHub リポジトリ                         │
│              team-sakata/team-sakata.github.io                   │
│                                                                 │
│  ┌─────────────────────┐       ┌──────────────────────────┐    │
│  │   main ブランチ      │       │   gh-pages ブランチ       │    │
│  │  （ソースコード）     │       │  （ビルド済みファイル）     │    │
│  │                     │       │                          │    │
│  │  src/               │ ビルド │  index.html              │    │
│  │  ├── pages/         │──────▶│  ja/...                  │    │
│  │  ├── components/    │       │  en/...                  │    │
│  │  ├── data/          │       │  assets/                 │    │
│  │  ├── content/       │       │  images/                 │    │
│  │  └── layouts/       │       │                          │    │
│  │  public/            │       │  ※ dist/ の中身が         │    │
│  │  package.json       │       │    そのまま配置される       │    │
│  └─────────────────────┘       └───────────┬──────────────┘    │
│                                             │                   │
└─────────────────────────────────────────────┼───────────────────┘
                                              │ GitHub Pages が
                                              │ 自動で配信
                                              ▼
                                 ┌──────────────────────┐
                                 │   本番サーバー         │
                                 │  https://team-sakata │
                                 │    .github.io/       │
                                 └──────────────────────┘
```

- **`main` ブランチ** — ソースコード。**編集はすべてここで行う**
- **`gh-pages` ブランチ** — ビルド済み HTML/CSS/JS。**直接編集しない**（`npm run deploy` が自動管理）
- **GitHub Pages** — `gh-pages` ブランチの内容をそのまま https://team-sakata.github.io/ として配信するサービス

---

## はじめかた（初回セットアップ）

### 前提条件

- [Git](https://git-scm.com/) がインストールされている
- [Node.js](https://nodejs.org/) v18 以上がインストールされている（推奨: v22）
- GitHub の `team-sakata` org へのアクセス権がある

### 手順

```bash
# リポジトリをクローン
git clone https://github.com/team-sakata/team-sakata.github.io.git
cd team-sakata.github.io

# パッケージをインストール
npm install
```

### ローカルで確認する

```bash
npm run dev
```

ブラウザで http://localhost:4321 を開くと、ローカルでサイトを確認できます。
ファイルを保存すると自動でブラウザに反映されます（ホットリロード）。

---

## 本番デプロイ（コピペ用）

```bash
npm run deploy
```

**これだけで OK。** 1〜2分後に https://team-sakata.github.io/ に反映されます。

### `npm run deploy` が裏でやっていること

```
npm run deploy
  │
  ├─ 1. npm run predeploy（自動実行）
  │     └─ GITHUB_PAGES=true npm run build
  │           └─ Astro が src/ 以下を HTML/CSS/JS にコンパイルし dist/ に出力
  │
  └─ 2. gh-pages -d dist
        └─ dist/ の中身を gh-pages ブランチに commit & push
              └─ GitHub Pages が自動検知して本番に配信
```

> **注意**
> - `main` ブランチにいることを確認してから実行してください（`git branch` で確認）
> - 久しぶりに触る場合は `npm install` を先に実行してください

---

## コンテンツの編集ガイド

### ファイル構成

```
src/
├── data/
│   └── news.yaml            ← ニュース（トップページ・ニュースページ）
├── content/
│   ├── activity/             ← 活動記録（YYYYMMDD_NN.yaml）
│   ├── members/
│   │   ├── faculty.yaml      ← 教員
│   │   ├── doctoral.yaml     ← 博士課程
│   │   ├── masters.yaml      ← 修士課程
│   │   ├── undergrad.yaml    ← 学部生
│   │   ├── staff.yaml        ← スタッフ
│   │   ├── collaborators.yaml← 共同研究者
│   │   └── alumni.yaml       ← 卒業生
│   ├── publications/
│   │   └── list.yaml         ← 論文リスト
│   └── research-focus/
│       └── focus1〜6.yaml    ← 研究テーマ
├── pages/                    ← ページ本体（.astro ファイル）
├── components/               ← 再利用可能な UI パーツ
├── layouts/                  ← ページの共通レイアウト
└── styles/
    └── global.css            ← 全体のスタイル

public/
└── images/                   ← 画像ファイル（そのまま配信される）
```

### ニュースを追加する

`src/data/news.yaml` の**先頭**に追記します。

通常のニュースは、一覧に本文と文中リンクをそのまま表示します。

```yaml
- date: "2026.10"
  text: "ここにニュースの内容を書く。[関連資料](https://example.com)"
  textEn: "English news text with an optional [link](https://example.com)."
```

詳細ページが必要なニュースだけ、`id`・見出し・本文・画像を追加します。

```yaml
- id: "event-2026"                 # URL用の一意な名前
  date: "2026.10"
  title: "一覧に表示する短い見出し"
  titleEn: "Short headline for the English page"
  text: "一覧に表示する短い見出し"
  textEn: "Short headline for the English page"
  body: "詳細ページの本文（目安300字）"
  bodyEn: "English text for the detail page"
  images:
    - "/images/news/event-2026-01.jpg"
    - "/images/news/event-2026-02.jpg"
  link: "https://example.com"       # 詳細ページの関連リンク（省略可）
```

- `date` — `"YYYY.MM"` 形式（ダブルクォートで囲む）
- `text` / `textEn` — 日英の一覧文。`[題目](https://example.com)` 形式のリンクを入れられます。
- `id` — 詳細ページが必要な記事にだけ指定します。一意の値がページのURLになります。
- `title` / `titleEn` — 詳細ページを使う記事の日英見出し。クリックすると詳細ページに移動します。
- `body` / `bodyEn` — 詳細ページの本文。省略時は `text` / `textEn` を使います。
- `images` — `public/images/news/` に配置した写真のパス。未配置の写真は表示されません。
- `link` — 詳細ページの関連リンク URL（任意）
- `id` のない既存記事は一覧のままで、文中リンクも直接開けます。
- **YAML はインデント（半角スペース2つ）が重要です。タブは使わないでください。**

### 画像を追加する

`public/images/` に画像を置くと、サイト上で `/images/ファイル名` としてアクセスできます。
メンバー写真は `public/images/members/` に `.webp` 形式で配置してください。

### 日英対応

サイトは `/ja/` と `/en/` の2言語構成です。
ページテンプレート内に `locale` に応じた `copy` オブジェクトを定義することで日英を切り替えています。

---

## よくある操作

### 編集 → 確認 → デプロイの一連の流れ

```bash
# 1. ファイルを編集（例: news.yaml をエディタで開いて保存）

# 2. ローカルで確認
npm run dev          # http://localhost:4321 で表示を確認

# 3. 変更を Git にコミット
git add .
git commit -m "ニュースを追加"
git push origin main

# 4. 本番にデプロイ
npm run deploy
```

### 困ったとき

| 症状 | 対処 |
|:-----|:-----|
| `npm run dev` でエラーが出る | `npm install` を実行してから再度試す |
| デプロイしたのにサイトが変わらない | 1〜2分待つ / ブラウザのキャッシュをクリア |
| YAML の文法エラー | インデントが半角スペース2つになっているか確認 |
| 今どのブランチにいるかわからない | `git branch` で `* main` と表示されればOK |
