# 한 레포에 세션이 둘일 때

확인일: 2026-09-08. 하루 동안 두 에이전트 세션이 같은 워크트리에서 `content/`를
함께 고치며 겪은 사고 여섯과, 그걸 막는 규칙.

**전제부터 적는다.** 두 세션은 브랜치도 워크트리도 나누지 않았다(대화 규칙 2).
그러면 파일 하나를 두 프로세스가 동시에 읽고 쓴다 — git이 막아 주는 자리가
아니다. 아래는 그 상태를 견디는 법이지 고치는 법이 아니다.

## 무슨 일이 있었나

**1 · 내 작업이 남의 커밋에 실렸다 (두 번).** TORFL 곁말 25개가
`24b1de01`("곁말 서른여섯 — 기각 사유가 거의 다 영어 동음이의였다")에,
`мелочь`·`финиш` 둘이 `6ba66276`에 들어갔다. 둘 다 커밋 메시지는 중국어
얘기뿐이라 러시아어 작업이 어디에 들어갔는지 히스토리에 남지 않았다.
이미 푸시된 뒤라 되돌릴 수도 없었다.

**2 · 반대로 남의 것을 담을 뻔했다.** 같은 사고를 다른 세션도 겪었고, 그쪽은
커밋 직전에 알아채고 파일 넷을 뺐다.

> **커밋에서 파일 넷을 뺐다.** 작업 중 `content/food.json`·`job.json`·
> `nature.json`·`travel.json`에 다른 세션이 개념 넷을 추가했다. 늘 하던
> `git add content/`를 그대로 했으면 남의 미완성 작업을 쓸어 담았을 것이다 —
> 예전에 `git add lib/`로 빌드를 깬 것과 같은 사고다.
>
> — `6ba66276`

**3 · 곁말 하나가 조용히 사라졌다.** `профессия`를 `office.json`에 넣는
스크립트가 성공을 찍었는데 파일에는 없었다. 그 사이 다른 세션이 같은 파일을
통째로 다시 썼다 — 둘 다 "읽고 · 고치고 · 쓰기"라 나중에 쓴 쪽이 이긴다.
**검사에 안 걸린다.** `pnpm check`는 없는 곁말을 모른다. `pnpm coverage`가
+11이어야 하는데 +10인 것을 보고서야 알았다.

**4 · `pnpm levels`가 동시에 돌 뻔했다.** 돌리려고 보니 이미 두 프로세스가
있었다(`levels.ts`와 `levels.ts office`). 셋째를 띄웠으면 셋이 같은 콘텐츠
파일에 서로 다른 시점의 등급을 썼을 것이다. 끝날 때까지 기다렸다 — 37초였다.

**5 · 인덱스에 올려 둔 것이 사라졌다.** 아래 절차로 `content/action.json`과
`lib/levels-stamp.ts`를 인덱스에 넣어 두고, 그림 넉 장을 만드는 4분 동안 두었다.
돌아와 보니 인덱스에 이미지 넉 장만 남아 있었다. 그 사이 다른 세션이 커밋을
했는데 **그 커밋에도 내 항목은 없었다**(HEAD를 뒤져 확인했다) — 커밋에 딸려
들어간 것이 아니라 인덱스에서 그냥 빠졌다. 어느 git 명령이 그랬는지는 못
가렸다. `git reset`·`git stash`·부분 커밋이 다 후보다.

**인덱스도 워크트리처럼 공유 상태다.** `.git/index`는 레포에 하나뿐이라
두 세션이 같은 것을 쓴다.

**6 · 스테이징 수술을 여덟 번 했다.** 아래에 절차를 적는다.

## 규칙 다섯

**1 · `git add`에 디렉터리를 주지 않는다.** `git add content/` · `git add -A` ·
`git add .` 셋 다 금지다. 고친 파일을 이름으로 적는다. 사고 1과 2가 이 한 줄로
막힌다.

**2 · 넣은 뒤 숫자로 확인한다.** JSON을 통째로 다시 쓰는 사이가 길수록 남의
쓰기를 지운다. 배치를 파일 단위로 짧게 끊고, 넣은 뒤 `pnpm coverage`가
**예상만큼** 올랐는지 본다. 유실은 그 숫자로만 드러난다(사고 3).

**3 · 전역 생성물은 한 세션만 돌린다** — `pnpm levels` · `pnpm split` ·
`node scripts/audio.ts manifest`. 돌리기 전에 본다.

```bash
ps aux | grep "[l]evels.ts"
```

**4 · 주제 파일을 갈라 맡는다.** 트랙이 달라도(HSK · TORFL · TSL) 결국 같은
파일에서 만난다 — `action.json` · `idea.json` · `office.json`은 어느 트랙이든
쓴다. 시작할 때 서로 어느 파일을 만질지 정하는 편이 낫고, 정할 수 없으면
규칙 1~3으로 버틴다.

**5 · 스테이징과 커밋 사이를 벌리지 않는다.** 인덱스는 레포에 하나뿐이라
올려 둔 것이 남의 git 명령에 지워진다(사고 5). **그림 생성·등급 조회처럼
분 단위로 걸리는 일은 스테이징 앞에 끝낸다.** 순서는 이렇다.

```
콘텐츠 넣기 → pnpm check → 그림 생성·변환 → pnpm levels → pnpm split
  → 스테이징 → git diff --cached --stat 로 눈으로 확인 → 곧바로 커밋
```

커밋 직전의 `git diff --cached --stat`은 생략하지 않는다. 사고 5는 그 한 줄로
잡았다 — 커밋했으면 이미지 넉 장만 든 빈 커밋이 됐다.

## 섞였을 때 — 내 것만 스테이징하기

작업 트리에는 남의 미완성 작업이 섞여 있고 내 것만 커밋해야 하는 자리다.
**작업 트리를 건드리지 않는다.** HEAD의 파일을 읽어 내 것만 얹고, 그 결과를
인덱스에 직접 넣는다. 남의 변경은 작업 트리에 그대로 남아 그쪽이 커밋한다.

```js
// node로 실행한다. MINE만 이번 배치에 맞게 고친다
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const R = process.cwd()
const git = (a, o = {}) => execFileSync('/usr/bin/git', a, { cwd: R, encoding: 'utf8', ...o })

const MINE = {
  'content/nature.json': { concepts: ['petroleum'], also: { 'release-animal': ['освобождать'] } },
  'content/time.json': { concepts: [], also: { hurry: ['спешить'] } },
}

const tmp = mkdtempSync(join(tmpdir(), 'stage-'))
for (const [path, mine] of Object.entries(MINE)) {
  const head = JSON.parse(git(['show', `HEAD:${path}`], { maxBuffer: 1 << 30 }))
  const work = JSON.parse(readFileSync(join(R, path), 'utf8'))
  const have = new Set(head.concepts.map((c) => c.slug))

  for (const slug of mine.concepts) {
    if (have.has(slug)) continue
    head.concepts.push(work.concepts.find((c) => c.slug === slug))
  }
  for (const [slug, words] of Object.entries(mine.also)) {
    const c = head.concepts.find((c) => c.slug === slug)
    const list = c.words.ru.also ?? []
    c.words.ru.also = [...list, ...words.filter((w) => !list.includes(w))]
  }

  const file = join(tmp, path.replace(/\//g, '_'))
  writeFileSync(file, JSON.stringify(head, null, 2) + '\n')
  git(['update-index', '--cacheinfo', `100644,${git(['hash-object', '-w', file]).trim()},${path}`])
}
```

`git diff --cached --stat`으로 내 것만 들었는지 보고 커밋한다. 이미지처럼
새로 만든 파일은 그냥 `git add <경로>`로 얹으면 된다 — 남과 겹칠 일이 없다.

**등급 지문은 파일 전체를 본다.** `lib/levels-stamp.ts`의 값은
`scripts/levels-stamp.ts`의 `fingerprint()`가 그 파일 **모든 표기**로 계산한다.
`pnpm levels`는 작업 트리(남의 개념이 든)를 보고 지문을 적으므로, 내 것만
스테이징하면 지문이 어긋나 `pnpm check`가 도로 "등급이 낡았습니다"를 뱉는다.
새 개념을 넣은 파일은 **스테이징한 내용으로 지문을 다시 계산해** 함께 넣는다.

```js
import { fingerprint, stampSource } from './scripts/levels-stamp.ts'

// HEAD의 지문표를 읽어 내가 고친 파일만 갈아 끼운다
const stamp = { ...LEVELS_STAMP_AT_HEAD }
stamp['nature.json'] = fingerprint(head.concepts)    // 인덱스에 넣은 그 배열
const file = join(tmp, 'levels-stamp.ts')
writeFileSync(file, stampSource(stamp))
git(['update-index', '--cacheinfo', `100644,${git(['hash-object', '-w', file]).trim()},lib/levels-stamp.ts`])
```

곁말만 더한 파일은 `term`이 안 바뀌어 지문도 그대로다 — 손댈 것이 없다.

## 안 하기로 한 것

**락 파일을 두지 않았다.** `.locks/<파일>`을 잡고 푸는 방식은 세션이 죽으면
락이 남고, 남은 락을 푸는 규칙을 또 만들어야 한다. 사고 여섯 중 넷은 규칙 1
한 줄로 막히고, 사고 3은 숫자 확인으로, 사고 5는 스테이징을 커밋 직전으로
미루는 것으로 잡힌다.

**워크트리를 나누지 않았다.** `git worktree`로 갈라 두면 파일 경합은 사라지지만
콘텐츠 작업은 결국 같은 JSON을 고치므로 병합에서 다시 만난다. 지금 규모에서는
합치는 비용이 더 크다.
