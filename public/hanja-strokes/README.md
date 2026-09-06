# Lingo reviewed Hanja stroke geometry

`g8-reviewed.json` contains 31 grade-8 glyphs derived from AnimCJK's Korean
`graphicsKo.txt`, commit `ec5e17cca76c87587790bcbce5ea0b4d4fb753d6`.
Copyright and upstream credits are preserved in `COPYING.txt`.
The geometry is distributed under the Arphic Public License in `ARPHICPL.txt`.
There is no warranty. You may copy, modify and redistribute this geometry under
that license. The downloadable JSON is the complete modified geometry source;
it is served at `/hanja-strokes/g8-reviewed.json`, alongside these notices.

Modified on 2026-09-07 for Lingo: selected glyphs after comparing their cumulative
stroke diagrams with the Korean official `f37.hwp`; retained every median point
and stroke boundary, flipped Y, uniformly fitted each glyph to an 80-unit extent
centered in a 100-unit square, rounded to one decimal and encoded as SVG M/L
centerlines. Original filled outlines are omitted. No stroke is added, split or
reordered. Source hashes, individual official image/row locations and review
dates are included in the JSON. Official source images are not redistributed.

The comparison verifies cumulative order and stroke structure against the
official diagrams; it is not pixel-identical tracing, official certification,
or handwriting grading. Noto static glyphs use a separate font and license.
