# Goal batch 4: 饌 and 鍼 approved; 朕 and 讒 held

Date: 2026-09-21. Baseline commit: e7d25221ccdab2d9acad6a723d399222e7ce0a35.

## Result

- 饌: 21 strokes approved after food-radical order correction.
- 鍼: 17 strokes approved in the original order.
- 朕 (10) and 讒 (24): held for source/form conflicts.
- Classification is `ehanja-crosschecked`, not Korean examination-body certification.

## Sources and review

The four primary sources contain 72 strokes; all individual strokes and complete forms were visually reviewed.
Six conflict strokes in default 朕/讒 alternatives were separately reviewed.
All 38 normalized cumulative states of the approved entries, plus both complete forms, were checked again.

`candidates.json` pins the KanjiVG revision, URLs, byte counts, hashes and licensed source paths.
`alternatives.json` pins the two other source variants.
`normalized.json` contains only the licensed normalized curves used in the second visual pass.
`findings.json` records decisions and stroke-specific observations.

KanjiVG revision: `422b5538595676da918c288a4230cb5e22a1ee7e`.
License: CC-BY-SA-3.0, © Ulrich Apel and contributors.

- [饌 source](https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/0994c-Kaisho.svg) / [domestic crosscheck](http://img.e-hanja.kr/hanjaSvg/aniSVG/9900/994C.svg).
- [鍼 source](https://raw.githubusercontent.com/KanjiVG/kanjivg/422b5538595676da918c288a4230cb5e22a1ee7e/kanji/0937c.svg) / [domestic crosscheck](http://img.e-hanja.kr/hanjaSvg/aniSVG/9300/937C.svg).

饌 order: `[1,2,3,5,6,7,4,8,9,10,11,12,13,14,15,16,17,18,19,20,21]`.
鍼 retains 1–17. Curves are uniformly scaled by 100/109.
No reversal, new points, curve flattening, splitting or merging.
Dictionary graphics, HTML and comparison screenshots were never saved; only metadata and licensed KanjiVG paths are in the repository.

## Holds and release conditions

- 朕: primary and default sources both use horizontal internal bars instead of the domestic dots. Strokes 5–6 also differ in direction and structure. All 10 primary strokes and default 3–6 were reviewed.
- 讒: Kaisho stroke 1 is a dot instead of a horizontal, and 15 has the opposite direction. The default source addresses the direction of 15 but still has a dot at 1. Only those two default conflict strokes were inspected; no full approval is claimed.
- Release requires matching reusable whole-stroke geometry or independent Korean evidence for the exact alternative form. A promising alternative must still pass every remaining stroke and cumulative-state review.

## Validation

- Hanja tests: 774 passed, 0 failed.
- Bundle reproduction includes equality with the actual normalized visual-review paths.
- Runtime registration, source hashes/order/license metadata, count and held-character exclusion checked.
- Shared-worktree typecheck passed.
- Independent production build passed in `/tmp/lingo-hanja-goal-g1-batch4-check`; all three production files matched the working tree byte-for-byte.
- Actual HanjaCard UI passed for both glyphs: intro autoplay 1/n→n/n, writing-entry autoplay 1/n→n/n, and replay to completion in both views. No duplicate static overlay was visible. Console errors were empty.
- On 鍼, a downward canvas drag added one stroke without moving the sheet. Before/after bounds: x=117, y=120.90625, width=480, height=685.09375. Touch-action was none; the input remained after replay. This verifies desktop dragging, not physical mobile-device input.
- UI/timing code, including 1.5× speed, was unchanged. Owned source/UI tabs, RAM server, static server and isolated checkout were cleaned up; shared development servers were untouched.

## Coverage and next work

4,934 / 5,978 applied (82.5%); 1,044 remaining.
1급: 1,060 / 1,145 (92.6%), 85 remaining.
2급: 537 / 538 (99.8%), 1 remaining.
특급II: 845 / 1,150 (73.5%), 305 remaining.
특급: 675 / 1,328 (50.8%), 653 remaining.
3급II through 8급 remain complete.

The next candidate is 眈. Its historical failure was a timeout; the live public dictionary retry now returns HTTP 200 and a 9-stroke display.
`next-tan-source.json` pins the discovered iframe source and hashes. This is availability evidence only, not stroke approval.
The SVG contains 18 path elements in total; these must be parsed into outline/animation groups, not mistaken for 18 strokes.
Compare the licensed `07708-Kaisho` and `07708` candidates before choosing geometry.
