# Dictionary-crosschecked AnimCJK geometry

`dictionary-reviewed-ja.json` contains the complete modified centerline source
for 響 (22 strokes), modified for Lingo on 2026-09-13.

The original 20-stroke medians derive from AnimCJK `graphicsJa.txt`, commit
`ec5e17cca76c87587790bcbce5ea0b4d4fb753d6`, SHA-256
`2bcd1c6d186e5376c5f9202b4eae2eaeff13c2566675a55f1c9dd548a2ef31c8`.
Preserved copyright and attribution: [COPYING.txt](COPYING.txt).
The pinned upstream notice is in `licenses/COPYING.txt` and licenses
character graphics under the [Arphic Public License](ARPHICPL.txt).
This modified geometry is distributed under that license, without warranty;
the complete JSON centerlines and notices are served together.

Ten output strokes (2,3,5,6,7,8,10,11,12,13) retain the earlier reshaped
AnimCJK proposal before a positive uniform fit. Output strokes 5 and 10
originate from the separated upper and lower parts of original Ja stroke 7.
Numeric source indices identify lineage, not unchanged original coordinates.

Twelve output strokes (1,4,9,14–22) are local centerlines and carry null original
indices. Stroke 4 was already locally authored in the earlier proposal;
stroke 1's terminal direction, stroke 9's spacing and the nine 音 centerlines
were replaced during this review. All coordinates undergo the same positive
uniform normalization, preserving directions and stroke boundaries.

The exact original medians, prior proposal, corrections, resulting paths and
per-stroke observations are retained in
`docs/hanja-g3ii-hyang-2026-09-13/` and checked by
`scripts/hanja-stroke-dictionary-ja.ts`.

The `ehanja-crosschecked` label means all 22 strokes were compared with the
domestic e-hanja dictionary animation. Separate 11/12 playback intervals
resolve an earlier same-endpoint pause that was insufficient to prove two
strokes. It does not mean examination-body certification, exact font-outline
matching or handwriting grading. No e-hanja paths, masks, centerlines, scripts
or screenshots are redistributed.
