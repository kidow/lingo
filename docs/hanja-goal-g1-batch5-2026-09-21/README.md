# Goal batch 5: 眈 9 strokes

Date: 2026-09-21. Baseline commit: cf77cf6dc5ca91cd2eb7021e819dfa75bd50f4e1.

## Decision

眈 is approved as a domestic dictionary crosscheck, not an examination-body certification.
The previous dictionary inventory failed with a timeout. The public retry recorded in
`../hanja-goal-g1-batch4-2026-09-21/next-tan-source.json` returned a 9-stroke display.
The pinned SVG has 18 total paths, which the existing verified parser resolves into 9 animation strokes plus outlines.

Both KanjiVG variants were visually reviewed at all 9 strokes and in complete form.
The default `07708` was selected: its 目 inner horizontals close against the right vertical,
matching the domestic complete form more closely than `07708-Kaisho`.
All 9 normalized cumulative states and the complete form were then rechecked.

## Provenance and reproduction

- [Selected KanjiVG source](https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/07708.svg).
- [Domestic dictionary source](http://img.e-hanja.kr/hanjaSvg/aniSVG/7700/7708.svg).
- Revision: `422b5538595676da918c288a4230cb5e22a1ee7e`.
- License: CC-BY-SA-3.0, © Ulrich Apel and contributors.
- Source SHA-256: `d37cd9cf87ca196ffc18d3be86b9e60bb0a0794bc43ecae5626ae10666f4dc38`.
- Normalized paths SHA-256: `01f4a812e22ed7acbd040e4c07f7768bb5a1313b8d1b6783f17dd6c0e7ff49d4`.

Only uniform scaling by 100/109 was used. Source order 1–9 is unchanged.
There are no reversed, invented, flattened, split or merged paths.
`candidates.json` contains licensed paths for both candidates; `normalized.json` contains the selected normalized paths.
`findings.json` records the choice and stroke observations. The builder selects by both glyph and candidate ID, avoiding accidental use of the first variant.

Run `node --experimental-strip-types docs/hanja-goal-g1-batch5-2026-09-21/build.mjs` to reproduce the public bundle.
Private dictionary graphics, HTML and screenshots remained in RAM and were not saved.

## Checks

- 776 Hanja tests passed.
- The public bundle reproduces the selected default source and exactly equals the normalized visual-review paths.
- Tests reject the unselected Kaisho source hash, changed stroke order, replaced source URL/license and duplicate entries.
- Runtime registration is unique; all original metadata and source pins are preserved.
- Shared-worktree typecheck and isolated production build passed. All three production files matched the isolated checkout byte-for-byte; a temporary real HanjaCard page is used for UI verification.
- Actual HanjaCard UI passed: intro autoplay 1/9→9/9, writing-entry autoplay 1/9→9/9 and replay to completion in both views. No duplicate static overlay was visible. Console errors were empty.
- A downward canvas drag added one stroke without moving the sheet; input remained after replay. Bounds before/after: x=117, y=120.90625, width=480, height=685.09375. Canvas touch-action was none. This was desktop drag verification, not a physical mobile-device test.
- UI/timing code and existing 1.5× speed were unchanged. Owned review/UI tabs, servers and isolated checkout were cleaned up; shared development servers were untouched.

## Coverage

This batch adds 1 character and 9 strokes.
Verified working-tree total: 4,935 / 5,978 applied (82.6%), 1,043 remaining.
1급: 1,061 / 1,145 (92.7%), 84 remaining.
Other grades remain unchanged.

## Next independent batch

`next-special2-candidates.json` pins 24 catalog-count-compatible source files for 14 unapplied 특급II characters. These are candidates only, not approvals. Next: 鱇·菰·廐·饋, 4 characters / 69 strokes. The historical 廐 and 饋 holds concern Ja/MM geometry; whole KanjiVG candidates must be reviewed afresh without modifying the held source strokes.
