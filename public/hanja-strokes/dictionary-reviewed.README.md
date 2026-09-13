# Dictionary-crosschecked Hanja geometry

`dictionary-reviewed.json` contains the complete modified centerline source for
訣 (11 strokes), 紋 (10 strokes), 森 (12 strokes) and 楓 (13 strokes),
modified for Lingo on 2026-09-13.

## Geometry copyright and modifications

訣, 森, 楓 and eight strokes of 紋 derive from Make Me a Hanzi `graphics.txt`, commit
`bddc96d41bef78427ed0e034e9f7e31d71fd1b92`. The complete pinned file hash is
`a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee`.
Upstream attribution and copyright are preserved in
[MAKEMEAHANZI-COPYING.txt](MAKEMEAHANZI-COPYING.txt).

Original medians were flipped vertically, uniformly fitted to an 80-unit extent
in a 100-unit square, rounded to one decimal and encoded as SVG M/L centerlines.
Filled outlines are omitted. Original order is retained for 訣, 森 and 楓.

紋 strokes 4 and 5 replace the corresponding original medians with affine
transforms of already reviewed, locally authored 紅 correction strokes. These
two donor strokes were authored for Lingo against a publisher video, rather than
copied from an upstream median. They retain the null original stroke indices
to distinguish this modification. The pinned donor and exact transform are
recorded in the repository's
`docs/hanja-g3ii-gyeol-mun-2026-09-13/` review and validated by
`scripts/hanja-stroke-dictionary.ts`. The original authored point records remain
in `scripts/hanja-stroke-textbook-corrections.json` under
`textbook-7d05-stage2-v1`.

This modified geometry is distributed under the
[Arphic Public License](ARPHICPL.txt), without warranty. The JSON, these notices
and the license are served together under `/hanja-strokes/`.

## Verification is separate from geometry

The `ehanja-crosschecked` source means that existing per-stroke and domestic
numbered-diagram reviews were supplemented with direct observation of e-hanja
animations for 訣 stroke 11 and 紋 strokes 4–5 only. For 森 and 楓, all 25 dictionary
stroke directions and cumulative candidate stages were compared individually.
The complete comparison is recorded in `docs/hanja-g3ii-sam-pung-2026-09-13/`;
the original moving observations are pinned from the earlier twelve-character
dictionary review. No stroke was reordered, reversed, split or merged for
these two characters. This does not claim an exact font-outline match,
handwriting grading, or examination-body certification.

No e-hanja outlines, centerlines, CSS, scripts or screenshots are redistributed.
The dictionary supplies a comparison reference, not the bundled geometry or a
license for copying its artwork. Source URLs, hashes and observation notes are
recorded in `docs/hanja-g3ii-direction-3-2026-09-13/direction-review.json`.
