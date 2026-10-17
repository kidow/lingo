# 硜·祛 — whole-form native comparison preparation

Date: 2026-10-18. This folder prepares one local Python helper; no server or native review was started.

The helper uses the existing domestic dictionary inventories and batch191/batch411 metadata:
- 硜:12 strokes,5867bytes, SHA256 faeaa77e2590824b0dc0b998ab6771d57c7bb2320a502fa02c431f9f6385d916; exact inventory URL http://img.e-hanja.kr/hanjaSvg/aniSVG/7800/785C.svg .
- 祛:10 strokes,5082bytes, SHA256 e54752bfe05526267f9ea3f652528e8fc106320478f38f5c6244672f80a16210; exact inventory URL http://img.e-hanja.kr/hanjaSvg/aniSVG/7900/795B.svg .

The older batch411 硜 URL uses lowercase785c; those original metadata bytes are not changed. The new helper selects the inventory's literal uppercase URL and has no casing/alias fallback. This preparation verifies existing metadata consistency, not current server availability.

Launch later, recording PID and dynamic port:
`rtk proxy python3 -B docs/hanja-outside-two-whole-native-prep-2026-10-18/serve-whole.py --port 0`

Routes:
- `/whole?glyph=硜` shows the two source-count possibilities.
- `/whole?glyph=祛` shows the twelve source-count possibilities.
- Add `scope=all` for all captured wholes of that glyph.
- Add `root=kaido_hkrm-06011131`, `root=krcourt-a0215`, or another listed exact root to show one comparison.
- Each `.whole` section contains a `.pair`: LEFT domestic dictionary, RIGHT public original full polygons.

The page shows the46-name family coverage,41 complete whole identities,14 numeric possibilities, each exact fixedname@version and a standalone64-character proof SHA256. Identical proof files retain distinct root identities. Five selector-request validation failures remain unresolved diagnostics rather than permanent absence claims. Counts and versions come only from the immutable source manifests.

All public whole shapes use original full5 proof polygons in viewBox0 0 200 200. No engine, primitive compiler, new path, coordinate adjustment, stroke-group choice, joining decision or reveal animation is run. The existing domestic renderer verifies bytes/SHA, title, original transform, clip coverage and timeline; the whole renderer uses those original outlines and transform. Domestic SVG is fetched only when root later requests a page and stays in that server's RAM cache. No asset or screenshot is written to disk.

Syntax check: one AST parse PASS, no bytecode written. Source guard: exactly one `--check` invocation exit0 PASS with71 immutable input pins, all41 full5/closure identities, inventory/metadata consistency and14 count-only flags. That check made zero domestic HTTP requests, did not import the domestic renderer, start a server, execute an engine, or claim native observation.

All public capsule53 and 臄 prep7 files are pinned unchanged, with11 reused inventory/metadata/catalog/renderer inputs. Existing files are not modified. No Git, build, runtime, canonical hold, resume or counter edit occurs. After root finishes or defers native comparison, stop the helper and its launch wrapper; keep these files.
