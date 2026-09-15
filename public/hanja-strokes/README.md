# Lingo reviewed Hanja stroke geometry

`textbook-reviewed.json` is a separate publisher-reference registry, currently empty.
The 20 discovery candidates in `scripts/hanja-stroke-textbook-review.json` are all
pending; they do not authorize playback. A complete per-stroke comparison record
and unchanged pinned Ko geometry are required before adding an entry. Publisher
comparisons are labelled `vivasam-high-2022`, not as Korea Eomunhoe certification.
No publisher video or artwork is bundled. See `docs/hanja-stroke-review-textbook.md`.

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
| `splits-reviewed.json` | 8 through 5 | 12 |

Together with 18 separately authored grade-8 centerlines, playback covers
503 characters: all 500 through grade 5, plus 回, 瓦 and 臼.
All twelve previously pending glyphs have individually reviewed split corrections.
Matching counts alone do not approve a candidate. The supplemental three use `graphicsJa.txt` at the
same pinned commit, under the same Arphic Public License and copyright notices.
The original seven files remain unchanged. Total imported or corrected geometry
is 482 Korean-derived glyphs and 3 Japanese-derived glyphs.

Modified on 2026-09-07 for Lingo: selected glyphs after comparing their cumulative
stroke diagrams with the Korean official `f37.hwp`; retained every median point
and stroke boundary, flipped Y, uniformly fitted each glyph to an 80-unit extent
centered in a 100-unit square, rounded to one decimal and encoded as SVG M/L
centerlines. Original filled outlines are omitted. The following explicit
corrections are applied after that normalization.
For 者 and 都 only, one short centerline is authored from each official diagram
and inserted as stroke 5 after normalization. Every original path is retained.
The JSON records the one-based original stroke mapping (null = new stroke),
`official-dot-v1` correction ID, and SHA-256 of UTF-8 `JSON.stringify(paths)`.
性 is reordered using the recorded one-based permutation
`[1,3,2,4,5,6,7,8]` to match `BIN002A.gif`, row 21.
For 成, original strokes 1 and 2 are exchanged and original stroke 3 is split
at its third normalized median point. Every point is retained.
For 萬草花藥苦英敬觀舊落葉 only, original horizontal stroke 1 is split into two
paths with the per-glyph gap recorded in `recipes`; cut endpoints are interpolated
and rounded to one decimal, and the connecting bridge is omitted. The first four
output strokes follow left horizontal, left vertical, right horizontal, right vertical.
All remaining paths are unchanged. Repeated `sourceStrokeIndices` denote split
portions. Each correction records its final path hash. Other entries retain upstream order. Source hashes, official image/row locations and review dates
are included in the JSON. `sourceWholeImage: true` identifies the complete
standalone diagrams for 回 (`BIN0036.bmp`), 瓦 (`BIN0038.bmp`) and 臼 (`BIN0017.gif`),
without inventing a table row. Official images are not redistributed.

See `docs/hanja-stroke-review-splits.md` for the twelve split corrections,
`docs/hanja-stroke-review-dots.md` for 者/都 and
`docs/hanja-stroke-review-supplement.md` for the four-glyph review and audit
instructions. The audit checks both pinned corpora and the exact allowed correction.

The comparison verifies cumulative order and stroke structure against the
official diagrams; it is not pixel-identical tracing, official certification,
or handwriting grading. Noto static glyphs use a separate font and license.

`dictionary-reviewed-g2-batch2.json` adds 50 grade-2 characters (658 strokes),
modified for Lingo on 2026-09-15: 47 use Make Me a Hanzi at
`bddc96d41bef78427ed0e034e9f7e31d71fd1b92`, and 垈·悳·惇 use AnimCJK
`graphicsJa.txt` at `ec5e17cca76c87587790bcbce5ea0b4d4fb753d6`.
Both retain the Arphic Public License and upstream credits in the notices above.
The JSON is the complete modified centerline source: 632 retained paths,
26 locally corrected paths and three character-specific order permutations.
Each glyph was compared against its e-hanja dictionary sequence; all 17 corrected
forms received a complete second review. These entries are `ehanja-crosschecked`,
not exam-body certification. Dictionary artwork is not distributed.
Evidence and reproducible recipes: `docs/hanja-g2-batch2-2026-09-15/README.md`.

`dictionary-reviewed-g2-batch3.json` adds 50 grade-2 characters (674 strokes),
modified for Lingo on 2026-09-16: 44 use Make Me a Hanzi at
`bddc96d41bef78427ed0e034e9f7e31d71fd1b92`; 漣·魔·靺·魅·旻·鉢 use AnimCJK
`graphicsJa.txt` at `ec5e17cca76c87587790bcbce5ea0b4d4fb753d6`.
Both retain the Arphic Public License and upstream credits above.
The modified source includes 611 retained and 63 locally corrected centerlines,
plus ten glyph-specific order permutations. All 50 glyphs were individually
compared with their e-hanja sequence and all 30 corrected forms were rechecked.
These entries are `ehanja-crosschecked`, not exam-body certification.
Dictionary artwork is not distributed. Evidence and reproducible recipes:
`docs/hanja-g2-batch3-2026-09-15/README.md`.

`dictionary-reviewed-g2-batch4.json` adds 50 grade-2 characters (594 strokes),
modified for Lingo on 2026-09-16: 48 use Make Me a Hanzi at
`bddc96d41bef78427ed0e034e9f7e31d71fd1b92`; 汎·毘 use AnimCJK
`graphicsJa.txt` at `ec5e17cca76c87587790bcbce5ea0b4d4fb753d6`.
Both retain the Arphic Public License and upstream credits above.
The modified source contains 531 retained and 63 locally corrected centerlines,
plus six glyph-specific order permutations. All 50 glyphs were independently
compared with their e-hanja sequence and all 32 corrected forms were rechecked.
These entries are `ehanja-crosschecked`, not exam-body certification.
Dictionary artwork is not distributed. Evidence and reproducible recipes:
`docs/hanja-g2-batch4-2026-09-16/README.md`.
