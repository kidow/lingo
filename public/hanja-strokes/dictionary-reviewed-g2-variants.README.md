# Reviewed grade 2 playback variants

`dictionary-reviewed-g2-variants.json` contains 35 normalized SVG centerlines:
飼 (13 strokes, 飠 form), 祐 (9 strokes, 礻 form), 禎 (13 strokes, 礻 form).
The catalog counts 14, 10, 14 are preserved separately. Only these exact reviewed
glyph/catalog-count pairs are admitted by `lib/hanja-stroke-variants.ts`.

Geometry sources, under the Arphic Public License:

- 飼: Make Me a Hanzi `graphics.txt`, revision
  `bddc96d41bef78427ed0e034e9f7e31d71fd1b92`, SHA-256
  `a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee`.
- 祐 and 禎: AnimCJK `graphicsJa.txt`, revision
  `ec5e17cca76c87587790bcbce5ea0b4d4fb753d6`, SHA-256
  `2bcd1c6d186e5376c5f9202b4eae2eaeff13c2566675a55f1c9dd548a2ef31c8`.

Upstream copyright notices are preserved in [COPYING.txt](COPYING.txt) and
[MAKEMEAHANZI-COPYING.txt](MAKEMEAHANZI-COPYING.txt); the complete license is
[ARPHICPL.txt](ARPHICPL.txt). There is no warranty. This downloadable JSON is
the complete modified geometry source.

Modified for Lingo on 2026-09-21: all original median points and pen-lift boundaries
are retained, Y is flipped, each glyph is uniformly fitted to an 80-unit extent
in a 100-unit square and rounded to one decimal. Original strokes 5 and 6 of
祐 are exchanged. No other reordering, splitting, merging or new geometry is used.

All 35 strokes were visually compared against the e-hanja dictionary's complete
stroke sequence and direction. This is private dictionary crosschecking, not
Korea Eomunhoe certification. No dictionary SVGs, masks, screenshots or videos
are redistributed. Proof: `docs/hanja-g2-variants-2026-09-21/review.json`.
