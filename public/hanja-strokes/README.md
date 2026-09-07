# Lingo reviewed Hanja stroke geometry

The seven `g*-reviewed.json` files contain 467 glyphs derived from AnimCJK's Korean
`graphicsKo.txt`, commit `ec5e17cca76c87587790bcbce5ea0b4d4fb753d6`.
Copyright and upstream credits are preserved in `COPYING.txt`.
The geometry is distributed under the Arphic Public License in `ARPHICPL.txt`.
There is no warranty. You may copy, modify and redistribute this geometry under
that license. The downloadable JSON is the complete modified geometry source;
the files are served at `/hanja-strokes/`, alongside these notices:

| File | First assigned grade | Glyphs |
| --- | --- | ---: |
| `g8-reviewed.json` | 8 | 31 |
| `g7-2-reviewed.json` | 7-II | 50 |
| `g7-reviewed.json` | 7 | 48 |
| `g6-2-reviewed.json` | 6-II | 73 |
| `g6-reviewed.json` | 6 | 72 |
| `g5-2-reviewed.json` | 5-II | 96 |
| `g5-reviewed.json` | 5 | 97 |
| `corrections-reviewed.json` | 5-II | 1 (性) |
| `supplement-reviewed.json` | 4-II / 3-II / 1 | 3 (回 / 瓦 / 臼) |
| `dots-reviewed.json` | 6 / 5 | 2 (者 / 都) |

Together with 18 separately authored grade-8 centerlines, playback covers
491 characters: 488 of the 500 through grade 5, plus 回, 瓦 and 臼.
Twelve count mismatches through grade 5 remain disabled; matching counts alone
do not approve a candidate. The supplemental three use `graphicsJa.txt` at the
same pinned commit, under the same Arphic Public License and copyright notices.
The original seven files remain unchanged; the correction adds one Korean glyph.

Modified on 2026-09-07 for Lingo: selected glyphs after comparing their cumulative
stroke diagrams with the Korean official `f37.hwp`; retained every median point
and stroke boundary, flipped Y, uniformly fitted each glyph to an 80-unit extent
centered in a 100-unit square, rounded to one decimal and encoded as SVG M/L
centerlines. Original filled outlines are omitted. No original stroke is split.
For 者 and 都 only, one short centerline is authored from each official diagram
and inserted as stroke 5 after normalization. Every original path is retained.
The JSON records the one-based original stroke mapping (null = new stroke),
`official-dot-v1` correction ID, and SHA-256 of UTF-8 `JSON.stringify(paths)`.
Only 性 is reordered, using the recorded one-based permutation
`[1,3,2,4,5,6,7,8]` to match `BIN002A.gif`, row 21. Every other entry preserves
the upstream order. Source hashes, official image/row locations and review dates
are included in the JSON. `sourceWholeImage: true` identifies the complete
standalone diagrams for 回 (`BIN0036.bmp`), 瓦 (`BIN0038.bmp`) and 臼 (`BIN0017.gif`),
without inventing a table row. Official images are not redistributed.

See `docs/hanja-stroke-review-dots.md` for 者/都 and
`docs/hanja-stroke-review-supplement.md` for the four-glyph review and audit
instructions. The audit checks both pinned corpora and the exact allowed correction.

The comparison verifies cumulative order and stroke structure against the
official diagrams; it is not pixel-identical tracing, official certification,
or handwriting grading. Noto static glyphs use a separate font and license.
