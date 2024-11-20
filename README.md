# ちょこころね

## 概要
ちょこころねは、装備の組み合わせを最適化するためのツールです。特定のステータスを最大化するための装備の組み合わせを探索し、冒険者さんのステータスを最大化することができます。

## 使い方

1. **装備の登録（倉庫）**:
   - 保有している装備を部位ごとに登録します。
   - 強化値、特殊コアも登録できます。

2. **装備の検索**:
   - 装備名称やステータスから装備を検索できます。

3. **装備の保存と読み込み**:
   - 倉庫の内容や冒険者さんのステータスをファイルに保存し、後で読み込むことができます。
   - マネキン(装備の組合せ)も保存できます。

4. **装備の組み合わせ生成**:
   - 指定されたステータスが最大になる装備の組み合わせを探索します。
   - 単一ステータスが最大になる組み合わせの探索にのみ対応しています。

## 計算の仕様

1. **装備ステータスの合計**:
   - メイン装備とサブ装備のステータスを合計します。
   - メイン装備の合計値の計算
     - 装備の純粋な合計値+錬成強化値+特殊コアの合計値
   - サブ装備の合計値の計算
     - （装備+錬成強化値）* 0.5（少数切り上げ）の合計値

2. **セット効果の適用**:
   - 特定の装備の組み合わせによるセット効果が適用されます。
   - メイン装備の組み合わせによるセット効果のみ対応しています。

3. **装備効果の適用**:
   - 装備ごとの特殊効果がステータスに反映されます。
   - メイン装備の装備効果のみ対応しています。

4. **最終ステータスの計算**:
   - 冒険者さんの基本ステータス、アバターステータス、装備ステータス、セット効果、装備効果を全て合計して最終的なステータスを算出します。

ちょこころねを使って、最適な装備の組み合わせを見つけ、冒険者さんのステータスを最大化しましょう！
