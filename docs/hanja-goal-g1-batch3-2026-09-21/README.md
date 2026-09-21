# Goal batch 3: 餞 approved; 諭 and 愉 held

Date: 2026-09-21. Baseline commit: a21062a63a67c439b189312077d51fe5716ea2cd.

## Result

- 餞: 17 strokes approved after a whole-character domestic dictionary crosscheck, normalization and cumulative-state review.
- 諭: 16 strokes reviewed; held for whole-form and path differences.
- 愉: 12 strokes reviewed; held for whole-form and path differences.
- This is `ehanja-crosschecked`, not certification by the Korean examination body.

## Evidence and transformation

`candidates.json` contains three licensed KanjiVG Kaisho path sets and exact domestic SVG metadata.
`alternatives.json` pins the default 諭/愉 sources separately. All paths in these two files are KanjiVG, never proprietary dictionary paths.

KanjiVG revision: `422b5538595676da918c288a4230cb5e22a1ee7e`.
License: CC-BY-SA-3.0, © Ulrich Apel and contributors.

餞 source: [0991e-Kaisho.svg](https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/0991e-Kaisho.svg).
Domestic crosscheck: [e-hanja 餞](http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/991E.svg).

The reviewed source order is `[1,2,3,5,6,7,4,8,9,10,11,12,13,14,15,16,17]`.
Only the food radical order changes. Exact curves are uniformly scaled by 100/109.
No flattening, reversal, new points, splitting or merging.

The visual review covered all 45 primary source strokes and complete forms, 11 conflicting strokes in the default alternatives, and all 17 normalized/reordered 餞 cumulative states plus its complete form.
`findings.json` records individual observations and release conditions.
Proprietary graphics and rendered comparisons remained in RAM; no SVG, HTML or screenshots were saved.

## Holds

- 諭: first dot differs from the domestic horizontal; stroke 9 omits the horizontal entry; strokes 13–14 are horizontals rather than dots; 15–16 use vertical strokes rather than the domestic bent pair.
- 愉: stroke 5 omits the horizontal entry; strokes 9–10 are horizontals rather than dots; 11–12 use vertical strokes rather than the domestic bent pair.
- Both default alternatives retain these conflicts. Reordering alone cannot fix them. Obtain licensed matching whole strokes or an independent Korean source validating the exact alternative form before promotion.

## Reproduction and validation

`node --experimental-strip-types docs/hanja-goal-g1-batch3-2026-09-21/build.mjs` reproduces the public bundle.
The normalized path SHA-256 is `af6726e97f86e1063f4a3a181eff6c804cbb5349b3306282c4587bd858bc7332`.

- All Hanja tests: 772 passed, 0 failed.
- Bundle reproduction, registration uniqueness, source/order/license checks, and held-character nonregistration passed.
- Shared worktree typecheck passed (`pnpm exec tsc --noEmit --incremental false`).
- Independent production build passed in `/tmp/lingo-hanja-goal-g1-batch3-check`; 3 production files matched the working tree byte-for-byte. A temporary page mounts the real HanjaCard for browser verification.
- Actual HanjaCard browser checks passed: intro autoplay 1/17→17/17; writing entry autoplay 1/17→17/17; replay completed in both views. No duplicate static glyph was visible during the animation, and console errors were empty.
- Drawing a downward stroke changed the input counter from 0 to 1 without moving the sheet. Bounds stayed x=117, y=120.90625, width=480, height=685.09375. Canvas touch-action was none; input remained after replay. This was a desktop browser drag, not a physical mobile-device test.
- UI and 1.5× playback timing code were unchanged. Owned review/UI tabs, RAM comparison server, static server and isolated checkout were cleaned up. No shared development server was touched.

## Working-tree coverage

4,932 / 5,978 applied (82.5%); 1,046 remaining.
1급: 1,058 / 1,145 (92.4%), 87 remaining.
2급: 537 / 538 (99.8%), 1 remaining.
특급II: 845 / 1,150 (73.5%), 305 remaining.
특급: 675 / 1,328 (50.8%), 653 remaining.
All grades from 3급II through 8급 remain fully applied.

Next independent candidates from the source inventory: 朕, 饌, 讒, 鍼.
Count agreement only establishes candidacy, never approval.
