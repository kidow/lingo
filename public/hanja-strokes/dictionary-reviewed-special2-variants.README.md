# Reviewed special grade II playback variants

`dictionary-reviewed-special2-variants.json` contains 190 normalized SVG centerlines for 15 individually reviewed characters.

| Character | Unchanged catalog count | Playback count | Licensed corpus |
|---|---:|---:|---|
| 夔 | 20 | 21 | Hans |
| 犁 | 12 | 11 | Ja |
| 蓼 | 15 | 14 | Ja |
| 鵡 | 18 | 19 | Ja |
| 筬 | 13 | 12 | Ja |
| 亐 | 4 | 3 | Ja |
| 臾 | 8 | 9 | Ja |
| 贇 | 18 | 19 | Ja |
| 卄 | 4 | 3 | Ja |
| 渚 | 12 | 11 | Ja |
| 猪 | 12 | 11 | Ja |
| 簒 | 16 | 17 | Ja |
| 砦 | 10 | 11 | Ja |
| 穉 | 16 | 17 | Ja |
| 啣 | 11 | 12 | Ja |

The exact glyph, two counts, candidate SHA-256 and path SHA-256 are pinned in
`lib/hanja-stroke-variants.ts`. 篠 and the other unreviewed count conflicts remain unavailable.
Study and writing use the same paths for their static glyph and animation, labelled
`사전 자형 · 재생 N획 (배정 N획)`. Catalog artwork and catalog counts are unchanged.

Geometry is derived from AnimCJK revision `ec5e17cca76c87587790bcbce5ea0b4d4fb753d6`:

- 夔: `graphicsZhHans.txt`, SHA-256 `5a5c157fddd0fd9bfaf5580b25c20a1ba2b0cabc0b7142e09f6149cbd5547798`.
- The other 14: `graphicsJa.txt`, SHA-256 `2bcd1c6d186e5376c5f9202b4eae2eaeff13c2566675a55f1c9dd548a2ef31c8`.

Original copyright notices: [COPYING.txt](COPYING.txt). Full license:
[ARPHICPL.txt](ARPHICPL.txt). There is no warranty. This downloadable JSON is the
complete modified geometry source.

Modified for Lingo on 2026-09-21: preserve all original median points, stroke order
and pen-lift boundaries, flip Y, uniformly fit each glyph to an 80-unit extent in
a 100-unit square, and round to one decimal. No reordering, splitting, merging or
new geometry. 夔 uses the complete Hans candidate; it is not combined with Ja.

All 190 strokes were visually crosschecked against the complete stroke order and
direction of the private Korean e-hanja dictionary. This is not Korea Eomunhoe
certification. Dictionary SVGs, masks, screenshots and videos are not redistributed.
Proof: `docs/hanja-special2-variant-review-2026-09-21/review.json`,
SHA-256 `4986561bf06c6f53df8a6e5365d1a9760cbb9c3328b57e76b0ca875838e86c3a`.
The review remains a historical pre-integration record; integration is documented
separately in that directory's `integration.md` and `integration-checks.json`.
