<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 작업 순서 — 개념을 넣을 때

```bash
pnpm pending --free     # 0. 남에게 넘겨 둔 것 중 지금 열린 파일이 있는지 본다
pnpm dup <slug|뜻…>     # 1. 이미 있는 개념인지 본다 (content/ 전체)
#  개념 블록을 쓴다
pnpm ex <배치.json>     # 2. content/에 넣기 전에 예문이 표제어를 보여주는지 (0.3초)
pnpm dup <배치.json>    #    같은 배치로 정답(일본어는 읽기)이 남의 정답·곁말과 겹치는지
#  content/*.json에 넣는다
pnpm batch <slug…>      # 3. 소품 겹침·로마자·발음기호·번체·등급·발음 목록·굽기·검증을 한 번에
pnpm echoes             # 4. 뽑기 전 그물 ①  글이 닮은 개념 (안 그린 것만 짚는다)
pnpm props <낱말…>      #    뽑기 전 그물 ②  몸통을 같이 쓰는 개념 — 「그림」 줄까지 본다
pnpm genimg <slug…>     # 5. 그림을 뽑는다. 끝에 시트를 만들어 준다
#  시트를 눈으로 본다 — 뒤바뀜과 낱말 오독은 여기서만 잡힌다
pnpm image <slug…>      # 6. WebP로 변환
```

**워크트리를 다른 세션과 함께 쓴다.** `⟨손대는 중⟩`이 붙은 개념은 그 세션이
아직 커밋하지 않은 수정을 품고 있다 — **고치지 않는다.** 그림을 다시 그리려
하면 `pnpm genimg`이 아예 멈춘다.

**4번은 둘 다 돌린다.** 둘이 다른 것을 잡는다 — `echoes`는 **문장이 닮은**
쌍을, `props`는 **낱말 하나를 같이 쓰는** 쌍을 짚는다. 2026-09-21에 `idea`
열다섯을 고르며 `echoes`가 일곱을 걸렀는데 `props`가 **다섯을 더** 잡았다.
망원경을 같이 쓰는 두 개념은 글 겹침이 0.06이라 `echoes`에 안 걸리고, 나무
망치 셋은 겹친 낱말 넷 가운데 드문 것이 하나뿐이라 후보에서 떨어진다
([nets.md](docs/nets.md)). **`props`는 요약 줄 말고 `그림` 줄을 본다** — 같은
날 그 줄을 안 봐서 다림줄을 열 번째로 만들었다.

**0번을 회차마다 돌린다.** 내가 만들지 않은 개념에서 찾은 문제는 고치지 않고
[docs](docs/)에 적어 넘기는데, 그 파일이 언제 비는지는 아무도 알려 주지 않는다.
반나절이면 상태가 뒤집혀 목록에 적어 둘 수도 없다. 2026-09-09에 `compass`를
세 번 시도해 세 번 다 막혔다가, `pending --free`를 만든 날 `travel`과 `idea`가
동시에 빈 틈이 잡혀 그 자리에서 끝냈다. 그날 이후 이틀에 걸쳐 **아홉을** 그렇게
줍었다. 한 번 돌리는 데 0.3초고, 열려 있지 않으면 그냥 «0»이라고 한다.

| 더 볼 것 | |
|---|---|
| [spec.md](spec.md) §7 | 콘텐츠를 넣는 절차와 스크립트 표 |
| [docs/nets.md](docs/nets.md) | 어느 검사가 무엇을 잡고 무엇을 놓치는지 |
| [docs/headword-in-examples.md](docs/headword-in-examples.md) | 예문에 표제어를 그대로 두는 법 — 회차마다 걸리는 독일어 다섯 자리 |
| [docs/concurrent-sessions.md](docs/concurrent-sessions.md) | 워크트리를 공유할 때의 규칙 |
| [IMAGE_STYLE.md](IMAGE_STYLE.md) | 그림 규칙과 자주 걸리는 자리 |
