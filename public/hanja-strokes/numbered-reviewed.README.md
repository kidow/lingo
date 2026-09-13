# Publisher-numbered stroke geometry

`numbered-reviewed.json` contains four reviewed characters: 笛, 蹟, 稚 and 遷
(57 strokes). The first three entries were reviewed on 2026-09-13; 遷 was added
on 2026-09-14 without changing their geometry.

The reusable geometry comes from Make Me a Hanzi `graphics.txt`, commit
`bddc96d41bef78427ed0e034e9f7e31d71fd1b92`. Upstream copyright, attribution and
licensing notices are retained in [MAKEMEAHANZI-COPYING.txt](MAKEMEAHANZI-COPYING.txt)
and [ARPHICPL.txt](ARPHICPL.txt). There is no warranty. The published JSON contains
the complete modified centerline paths; original filled outlines are omitted.

Lingo fits each character uniformly inside a 100-unit SVG viewBox and applies
only individually reviewed changes. 遷 retains the 14-stroke original in the
source registry, splits its original stroke 13 at a shared point into strokes
13 and 14, and moves the endpoint of stroke 11 leftward. Its resulting 15 paths
are pinned by SHA-256 `ad14e4955ce0585f21eb3481c280d47b960c44e974ded49c33f0e9ed898d38ba`.

The `moyaland-numbered` label refers to domestic publisher order diagrams
cross-checked with separately reviewed Taiwan MOE direction references. It is
not Korean exam-body certification. Each character carries its own diagram,
direction-review and source-review references. Source artwork, Taiwan MOE
Track coordinates, animation media and code are not included in this bundle.
