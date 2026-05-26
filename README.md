# Pay it Forward — Corporate Site

株式会社 Pay it Forward のコーポレートサイト（HTML / CSS / JavaScript）。

[mostfun.jp](https://mostfun.jp/) の構造・テイストをベースに、[pay-it-forward-corporate.com](https://pay-it-forward-corporate.com/) のテキスト・コンセプトを反映して構築しています。

## 構成

```
.
├── index.html       # シングルページ構成のコーポレートサイト
├── css/style.css    # スタイル一式（CSS変数でカラーパレット管理）
├── js/main.js       # スクロール演出 / ローディング / カウンタ等
└── assets/          # 画像等（必要に応じて追加）
```

## セクション

1. **Hero** — メインコピー「食を通じて、日本のイケてる未来を創る。」
2. **About / Intro** — 会社紹介
3. **Philosophy** — PURPOSE / MISSION / VISION / VALUE
4. **Business** — マグロ居酒屋／魚卸協業／マグロ焼肉／労務改革
5. **Brand** — マグロと炉端 成る／マグロスタンダード 門前仲町店／錦糸町店
6. **Numbers** — 主要数値（VISION、店舗目標、GIVER、VALUES）
7. **Recruit** — 社員 / アルバイト / 独立支援
8. **Company** — 会社概要
9. **Contact** — お問い合わせCTA
10. **Footer**

## カラーパレット

[pay-it-forward-corporate.com](https://pay-it-forward-corporate.com/) のメインカラーに準拠した白＋青ベース。

- コーポレートブルー `#00569f`
- ネイビー `#002e6e`
- ディープネイビー `#001b48`
- スカイブルー `#84d5ff`
- ペールブルー `#e8f7ff`
- ホワイト `#ffffff`

## 起動

ローカルで開く場合：

```bash
# 任意の静的サーバで配信
python -m http.server 8080
# → http://localhost:8080
```

もしくは `index.html` をブラウザで直接開いても動作します。

## カスタマイズ

- カラー・余白等は `css/style.css` 冒頭の `:root` 変数で一括変更できます。
- 数値・社名・店舗名等は `index.html` を編集してください。
- スクロール演出の対象は `js/main.js` の `revealSelectors` 配列で管理しています。
