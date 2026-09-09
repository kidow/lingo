<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 작업 순서 — 개념을 넣을 때

```bash
pnpm dup <slug|뜻…>     # 1. 이미 있는 개념인지 본다 (content/ 전체)
#  content/*.json에 개념 블록을 쓴다
pnpm batch <slug…>      # 2. 소품 겹침·로마자·발음기호·굽기·검증을 한 번에
pnpm genimg <slug…>     # 3. 그림을 뽑는다. 끝에 시트를 만들어 준다
#  시트를 눈으로 본다 — 뒤바뀜과 낱말 오독은 여기서만 잡힌다
pnpm image <slug…>      # 4. WebP로 변환
```

**워크트리를 다른 세션과 함께 쓴다.** `⟨손대는 중⟩`이 붙은 개념은 그 세션이
아직 커밋하지 않은 수정을 품고 있다 — **고치지 않는다.** 그림을 다시 그리려
하면 `pnpm genimg`이 아예 멈춘다.

| 더 볼 것 | |
|---|---|
| [spec.md](spec.md) §7 | 콘텐츠를 넣는 절차와 스크립트 표 |
| [docs/nets.md](docs/nets.md) | 어느 검사가 무엇을 잡고 무엇을 놓치는지 |
| [docs/concurrent-sessions.md](docs/concurrent-sessions.md) | 워크트리를 공유할 때의 규칙 |
| [IMAGE_STYLE.md](IMAGE_STYLE.md) | 그림 규칙과 자주 걸리는 자리 |
