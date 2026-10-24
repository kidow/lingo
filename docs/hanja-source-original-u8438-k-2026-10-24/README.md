# 萸: 配当12・辞書13の原本投影 DRAFT

ROOTの国内民間辞書39画面の順序・方向記録を根拠に、既存固定whole u8438-k の原14raw/15calls/27Pを13logical/15maskへ一度だけ投影しました。元カタログ12は変更していません。13画variantの個別許可は後続で、臾の許可を継承しません。

既存full5: docs/hanja-goal-glyphwiki-batch781-2026-10-13/engine-whole-u8438-k.json、SHA83fe67507b40f4ae74c76c543c97724ad608f3b32db09e3d631a02cb3f64bc37。新actual makeGlyph captureではありません。既存sources.json/validation.jsonと7-field identityでbindし、engine再実行0。別providerや最新sourceを混ぜていません。

zero-based map: [[0],[1],[3],[2],[4],[5],[6],[13],[9,8],[10],[7],[11],[12]]。草右H/Vを国内順に配置し、raw10 H→raw9 Vのみ1logicalにまとめます。literalendpoint(163,71.39)一致、原filled接触は別source検証済。原call内の順序・P座標・guide・flags・幅・weightの生成規則を保持し、各raw/call/Pを1回ずつ含みます。別の部品を移植せず、元polygonは200→100の一様正規化とwinding統一のみです。

fixtureSHA0c329d676ac1615a5c313b6afa89590b591ab5e034883e0370b2b5d0eee27b6a、geometrySHAa1d3e3eb347dc685f20f524b19e4d49edb7956f6d30c5477f0834c6dd9b87591。

全13logicalの原P静的対応は**まだ未観察**。初期cap/15maskの接触・terminal/fullsource残余・実再生・アプリ検証も未承認です。source-only gateはこれらの承認を代替しません。public/registry/shared helper/rendererは変更せず、production importは禁止です。
