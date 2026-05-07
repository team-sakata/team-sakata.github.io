# 2026年5月更新 設計書（ニュース追加・活動報告追加・メンバー情報更新）

## 1. 目的
2026年5月の研究室サイト更新として、以下を実施する。

- ニュース2件の追加
- 活動報告ページ1件の追加（ニュースから内部リンク）
- メンバー欄（盧 慧敏さん）の肩書・表彰情報の追記
- 活動報告に掲載する写真3点の格納先ルールを明確化

## 2. 対応範囲
### 2.1 ニュース追加（2件）
- 対象データ: `src/data/news.yaml`
- 追加内容:
  1. 2026.05 / ICML2026 spotlight採択（宇都宮さんら）
     - 外部リンク: https://arxiv.org/abs/2604.18649
  2. 2026.05 / 博士2年の盧さんのNEP VC賞受賞
     - 内部リンク: 2.2で作成する活動報告ページ

### 2.2 活動報告ページ追加（1件）
- 対象データ: `src/content/activity/`
- 新規ファイル（案）: `src/content/activity/202603xx_01.yaml`
  - date: `2026-03-xx`（受賞時期に合わせる）
  - title: `NEDO Entrepreneurs Program（NEP）への参加・受賞について`
  - description: ユーザー提供本文案を整形して投入
  - link: 必要であれば公式イベントURL等（未指定なら省略）
- ニュース項目からこの活動報告ページへリンクする

## 3. 活動報告画像3点の掲載方針
### 3.1 画像格納先
- 新設ディレクトリ: `public/images/activity/nep-2026/`
- 格納ファイル（例）:
  - `public/images/activity/nep-2026/nep-2026-01.jpg`
  - `public/images/activity/nep-2026/nep-2026-02.jpg`
  - `public/images/activity/nep-2026/nep-2026-03.jpg`

### 3.2 表示方式
現状の活動報告スキーマは `image`（単数）のみのため、3枚掲載のために以下を拡張する。

- `src/content/config.ts`
  - `activity` コレクションに `images: z.array(z.string()).optional()` を追加
- `src/pages/[...locale]/activity/[id].astro`
  - `images` がある場合はギャラリー表示（3枚）
  - 既存の `image` は後方互換として維持

この方針により既存活動報告を壊さず、今回の3点掲載要件を満たす。

## 4. メンバー欄更新（盧 慧敏さん）
- 対象データ: `src/content/members/doctoral.yaml`
- 変更方針:
  - role を追加: `日本学術振興会特別研究員DC2`
  - awards に以下を明示:
    - 言語処理学会年次大会 優秀賞・Elyza賞・SB Intuitions賞 三賞同時受賞（2025年度）
    - NEDO Entrepreneurs Program（NEP）VC賞（2025年度）
- 英語表示（`roleEn`, `awardsEn`）は既存運用に合わせて追加

## 5. 変更対象ファイル一覧
- `src/data/news.yaml`
- `src/content/activity/202603xx_01.yaml`（新規）
- `src/content/config.ts`
- `src/pages/[...locale]/activity/[id].astro`
- `src/content/members/doctoral.yaml`
- `public/images/activity/nep-2026/`（新規ディレクトリ、画像3点）

## 6. 実装手順（次フェーズ）
1. 活動報告ページのID・日付を確定してYAML新規作成
2. ニュース2件を `news.yaml` の先頭に追加
3. ニュース2件目から活動報告ページへリンク設定
4. 活動報告の複数画像対応（schema + テンプレート）を実装
5. 盧さんの role / awards を更新
6. `npm run build` で静的ビルド確認

## 7. 確認項目
- ニュース一覧・トップニュースプレビューで2件が表示される
- ICMLニュースのリンクが arXiv に遷移する
- NEPニュースのリンクが活動報告詳細に遷移する
- 活動報告ページで写真3点が表示される
- メンバーページ（博士課程）で盧さんの肩書と表彰が表示される
- 既存活動報告ページ表示に退行がない

## 8. 補足（画像アップロード先の回答）
写真は以下に配置するのが適切。

- `public/images/activity/nep-2026/`

この配下に3点を置けば、活動報告ページから `/images/activity/nep-2026/<filename>` で参照できる。
