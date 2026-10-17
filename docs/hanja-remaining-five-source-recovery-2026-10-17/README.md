# Five missing fixed sources — recovery capsule

Public-source acquisition on 2026-10-17 for 鼐·纆·樲·邅·絰. No domestic SVG, screenshot or learning record is included. This capsule supplies geometry candidates, not approval of Korean stroke order.

## Fixed source branches

- `archive-recovered`: 17 original whole roots. Original archived/historical definitions remain identical to their parent source capsule. Only missing dependency names are resolved through separately pinned public API definitions: `u76ee-j@2`, `u571f-j@4`, `u56de-j@2`.
- `current-fixed`: 22 whole roots, comprising the original whole names and each character's explicitly named `-j` whole. Every whole and dependency is fixed to an exact public `name@version`. This is independent of the old archive identity.

Both branches are fixed mixed-date closures. Neither claims that a newer dependency was present in the original archive, nor that every definition represents one simultaneous upstream snapshot. Alias/dependency chains remain explicit in each source file. No component or another glyph is relabeled as a whole character.

`manifest.json` pins all 39 complete whole proofs and their source files. `capture.mjs` refuses to overwrite source/proof files. `verify-source.mjs` independently replays the eight pinned engine files and checks source/provider identities, inherited records, closure completeness, groups, primitive trace and output defaults.

## Source facts

The minimum below only joins exact adjacent primitive endpoints. It is a source geometry diagnostic; it does not establish authored pen boundaries, directions, whole-form compatibility or Korean stroke order. No raw row is dropped, reordered, split, reversed or joined by an invented connector.

| Character | Catalog strokes | Complete wholes | Exact consecutive minima | Next requirement |
|---|---:|---:|---|---|
| 鼐 | 15 | 9 | 15 except VS2 minimum14 | Original/base whole has a numeric15 candidate; whole form and pen grouping need native review. |
| 纆 | 21 | 9 | 22–23 | No21 candidate under this unchanged consecutive contract; another complete source or author-supported boundaries are needed. |
| 樲 | 16 | 5 | 16 | Native whole/sequence/direction and grouping review remains. |
| 邅 | 17 | 11 | 17 for VS2/var001; others18 | VS2/var001 are numeric17 candidates; 辶 shape, grouping and directions remain unreviewed. |
| 絰 | 12 | 5 | 15 | No12 candidate under this unchanged consecutive contract; further source work is required. |

All 39 proofs have zero empty raw rows and zero within-row primitive endpoint gaps. A correct count or endpoint continuity alone does not approve animation.

Independent verification passed once: 39 whole proofs reproduced, eight engine hashes verified, 109 inherited record instances checked, 184 public provider instances checked, 56 unique exact definitions refetched, and archive license bytes verified.

The first capture attempt stopped before geometry production because the public discovery endpoint returned numeric `version`, while `name@version` returned a string. The preserved `capture-attempt-version-type-failure.json` records that unsuccessful attempt. The final capture explicitly compares `String(version)` and still requires exact name, data and related identity; transport response bytes and hashes remain preserved separately.

## Unchanged application state

Native reviews: **0**. Runtime registration: **false**. New canonical holds: **0**. Resumes/counters: unchanged. Servers/builds/Git operations: **0**. Existing parent source capsules, metadata, NOTICE and runtime files remain untouched.
