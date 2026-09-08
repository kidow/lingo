# 한 레포에 세션이 둘일 때

확인일: 2026-09-08. 하루 동안 두 에이전트 세션이 같은 워크트리에서 `content/`를
함께 고치며 겪은 사고 일곱과, 그걸 막는 규칙.

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

**6 · 이번엔 내가 남의 배치를 삼켰다.** 커밋 `7e3b8f78`은 내 개념 넷만
담을 셈이었는데 `body`·`food`·`home`·`nature`·`number`·`quality`·`school`·
`travel`과 그쪽 그림 스무 장이 함께 들어갔다. 사고 1의 정확한 역방향이다.

**그 커밋에 든 개념 스물여섯 가운데 넷만 내 것이다.**

| | slug |
| --- | --- |
| 내 것 (TORFL B1) | `add` · `praise` · `sulk` · `take-away` |
| 다른 세션 것 | `weave` · `warm-oneself` · `cover-up` · `flicker` · `fracture` · `vegetarian-food` · `additive` · `roof-tile` · `hand-plane` · `poplar` · `blowing-sand` · `waters` · `radius` · `longitude` · `gorgeous` · `sparse` · `rich-aroma` · `fluorescence` · `lab-test` · `air-force` · `aircraft-cabin` · `borderland` |

**그 스물둘의 기록은 이 표가 전부다.** 커밋 메시지는 러시아어 동사 얘기뿐이고,
그 배치를 설명한 커밋은 히스토리에 없다(`git log --grep`으로 확인했다).
`git log -S <slug>`로 찾아온 사람이 여기서 사정을 알게 하려고 적어 둔다.

**히스토리는 고치지 않기로 했다.** 커밋을 둘로 쪼개려면 그 뒤에 쌓인 서른
남짓을 다시 쓰고 force-push해야 하는데, `7e3b8f78`은 이미 이 문서와 커밋
메시지 둘(`f144aba2`·`ed3c49db`)이 인용하고 있어 그 참조가 다 죽는다. 무엇보다
다른 세션이 같은 워크트리에서 살아 있는 동안 force-push는 그쪽 인덱스와 HEAD를
어긋나게 한다. 얻는 것은 메시지 정확도 하나인데, **스물둘을 왜 넣었는지는
그 세션만 쓸 수 있으므로** 쪼개도 근거는 여전히 빈다.

**규칙 1로는 못 막힌다.** `git add`에 파일 이름만 줬고, 스테이징 직후
`git diff --cached --stat`도 내 것만 보였다. 그 확인과 `git commit` 사이에
저쪽이 자기 파일을 스테이징했고, **인자 없는 `git commit`은 내가 add한 것이
아니라 인덱스에 든 것 전부를 커밋한다.**

발견도 늦었다. 하루 뒤 A1 숫자가 왜 하나 올랐는지 쫓다가 그 개념
(`sparse`/`редкий`)이 내 커밋에 들어 있는 것을 봤다.

**7 · 스테이징 수술을 여덟 번 했다.** 아래에 절차를 적는다.

**8 · 개인 인덱스를 쓰고도 또 삼켰다.** 커밋 `4bf98e2c`는 `content/idea.json`의
프랑스어 예문 두 줄만 담을 셈이었는데 다른 세션의 개념 `deity`(신령)가 함께
들어갔다. 인덱스는 내 것이었지만 **작업 트리 파일은 여전히 공유 상태**다 —
`git hash-object content/idea.json`이 그 순간 디스크에 있는 것을 그대로 굳혔고,
그 사이 저쪽이 같은 파일에 개념을 하나 더 써 넣었다.

```
12:58  내가 예문 둘을 고친다
12:59  git diff --stat content/idea.json → 8줄. 내 것뿐이다
13:0x  저쪽이 deity를 같은 파일에 쓴다     ← 여기가 창이다
13:0x  내가 hash-object로 굳힌다           → deity가 딸려 온다
```

**아래 「개인 인덱스」 절이 "사고 5와 6이 둘 다 구조적으로 막힌다"고 적은 것은
과했다.** 막히는 것은 **공유 인덱스**를 거치는 경로뿐이다. 작업 트리 파일을
통째로 해시하면 창이 그대로 남는다. 그래서 규칙 7을 더한다.

`deity`는 그림이 아직 없어 출제되지 않으므로(§4) 기능에는 영향이 없고,
저쪽이 그림과 함께 커밋하면 그대로 이어진다. 히스토리는 사고 6과 같은 이유로
고치지 않는다.

## 규칙 여섯

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

**6 · `git commit`에도 경로를 준다.** 인자 없는 커밋은 인덱스 전체를 담으므로
확인과 커밋 사이에 남이 스테이징한 것까지 나간다(사고 6). 확인만으로는 못
막는다 — 창이 좁아도 0이 아니다.

```bash
git commit -F - -- docs/a1-gap-audit.md spec.md
```

**단, 경로 지정 커밋은 작업 트리를 커밋한다.** 아래 수술처럼 인덱스에만 있는
내용(HEAD + 내 것)을 담아야 하는 자리에는 못 쓴다. 그때는 개인 인덱스를 쓴다.

**7 · 굳힌 트리를 슬러그로 검산하고 커밋한다.** 개인 인덱스도 작업 트리
파일을 해시하는 순간 남의 쓰기를 같이 굳힌다(사고 8). 눈으로 보는 `--stat`은
줄 수만 보여 주므로 개념 하나가 늘어난 것을 놓친다. **트리를 만든 뒤
`update-ref` 앞에서** 콘텐츠 파일마다 슬러그 집합을 HEAD와 견준다.

```js
const head = new Set(JSON.parse(git(['show', `${parent}:${p}`])).concepts.map(c => c.slug))
const mine = new Set(JSON.parse(git(['show', `${tree}:${p}`])).concepts.map(c => c.slug))
const extra = [...mine].filter(s => !head.has(s) && !EXPECTED.includes(s))
if (extra.length) throw new Error(`${p}에 내 것이 아닌 개념: ${extra.join(' ')}`)
```

`EXPECTED`는 이 배치에서 내가 넣기로 한 슬러그다. **비워 두는 것이 기본이고**,
개념을 넣는 배치에서만 채운다. 트리는 이미 굳어 있으므로 이 검산과 `update-ref`
사이에는 남이 끼어들 자리가 없다 — 창이 여기서 진짜로 닫힌다.

예문·속성만 고치는 배치는 슬러그 집합이 그대로여야 하므로 이 검산 하나로
충분하다. 개념을 지우는 일은 없으므로 빠진 슬러그는 보지 않는다.

## 섞였을 때 — 개인 인덱스로 내 것만 커밋하기

작업 트리에는 남의 미완성 작업이 섞여 있고 내 것만 커밋해야 하는 자리다.
**작업 트리도 `.git/index`도 건드리지 않는다.** HEAD의 파일을 읽어 내 것만
얹고, 그 결과를 **내 인덱스 파일**에 넣어 거기서 커밋을 만든다. 남의 변경은
작업 트리에 그대로 남아 그쪽이 커밋한다.

`GIT_INDEX_FILE`을 주면 그 실행만 다른 인덱스를 쓴다. 공유 인덱스를 아예 안
건드리므로 **인덱스를 거치는** 사고 5(내 것이 지워짐)와 사고 6(남의 것이
스테이징돼 딸려 감)이 막힌다.

**막히지 않는 것도 적어 둔다.** 작업 트리 파일은 여전히 공유 상태라,
`hash-object`가 그 순간 디스크에 있는 남의 쓰기까지 굳힌다(사고 8). 그 창은
규칙 7의 슬러그 검산으로 닫는다.

```bash
export GIT_INDEX_FILE=$(mktemp -d)/index
git read-tree HEAD          # HEAD를 그 인덱스에 깐다
#  … 아래 node 조각이 update-index로 내 것만 얹는다 …
git write-tree              # → TREE
git commit-tree TREE -p HEAD -F message.txt   # → COMMIT
unset GIT_INDEX_FILE
git update-ref HEAD COMMIT  # 여기서 처음 브랜치가 움직인다
```

`git write-tree`까지는 아무것도 공개되지 않는다. `git ls-tree TREE`나
`git show --stat COMMIT`으로 **내 것만 들었는지 보고 나서** `update-ref`한다.
확인과 반영 사이에 남이 끼어들 자리가 없다 — 트리는 이미 굳어 있다.

`update-ref`에 **옛 값을 함께 준다**(`git update-ref HEAD <새> <옛>`). 그 사이
남이 커밋했으면 실패하므로, 실패하면 새 HEAD를 부모로 다시 지으면 된다.
덮어쓰기가 구조적으로 막힌다.

**끝나고 공유 인덱스를 HEAD에 맞춘다.** 커밋은 개인 인덱스로 갔지만
`.git/index`는 옛 HEAD를 그대로 들고 있다 — 그대로 두면 남이 인자 없이
`git commit`할 때 **내 변경을 되돌리는 커밋**이 나간다. 내가 건드린 경로만
되돌린다(다른 스테이징은 남는다).

```bash
git reset HEAD -- content/quality.json lib/levels-stamp.ts public/concepts/well-fed.webp
```

이 한 줄을 빼먹으면 절차가 도로 위험해진다. 처음 실제로 써 본 회차
(`ed3c49db`)에서 바로 걸린 자리다.

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

위 node 조각의 `git(...)` 호출은 `GIT_INDEX_FILE`이 설정된 환경을 물려받아야
한다. 새로 만든 이미지처럼 남과 겹칠 일이 없는 파일도 같은 인덱스에
`update-index --add`로 얹는다 — 공유 인덱스에 `git add`하면 사고 5·6의
창이 다시 열린다.

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

**지문표는 커밋 직전의 HEAD에서 읽는다.** 배치를 시작할 때 `git show
HEAD:lib/levels-stamp.ts`를 떠 두고 그림을 열다섯 장 만드는 동안 남이 커밋하면,
그 사이 갱신된 남의 항목이 내 판본에는 없다. 그대로 커밋하면 **남의 지문을
되돌린다.** 실제로 그렇게 나갈 뻔했다 — `action.json`·`body.json`·`city.json`
셋이 옛 값으로 돌아가 있었다.

커밋한 뒤 푸시 전에 한 줄로 본다. 내가 고친 파일의 줄만 나와야 한다.

```bash
git diff HEAD~1 HEAD -- lib/levels-stamp.ts
```

되돌린 것이 보이면 부모의 판본을 다시 읽어 내 파일만 갈아 끼우고
`git commit --amend`한다. 남이 이미 내 개념까지 포함해 `pnpm levels`를 돌렸다면
값이 같아 **손댈 것이 없는** 것이 정상이다 — 그때는 지문 파일을 커밋에서 빼면 된다.

**생성물은 스크립트마다 읽는 자리가 다르다.** 다른 세션의 미완성 콘텐츠가
생성물에 구워지지 않게 하려면 `git archive HEAD content`로 임시 트리를 만들어
거기서 돌리는 방법을 쓰는데, **그게 통하는 스크립트와 안 통하는 스크립트가 있다.**

| 스크립트 | 콘텐츠를 어디서 읽나 | 임시 트리로 가둘 수 있나 |
| --- | --- | --- |
| `scripts/audio.ts` | `join('content', …)` — 실행한 자리 | 된다 |
| `scripts/split.ts` | `new URL('..', import.meta.url)` — **스크립트가 놓인 자리** | 안 된다. 심링크를 따라 레포를 읽는다 |

`split`은 가둘 수 없지만 **가둘 이유도 없다** — `public/content/`는 `.gitignore`에
있어 커밋에 실리지 않는다. 커밋되는 생성물(`lib/levels-stamp.ts`,
`lib/audio-have.ts`)만 HEAD에서 구우면 된다.

2026-09-09에 이 차이를 모르고 «HEAD로 구웠다»고 적었다가, 실제로는 `split`이
작업 트리를 읽고 있었다. 커밋에는 영향이 없었지만 **확인 방법도 틀렸다** —
`git status public/content`가 조용한 것은 최신이어서가 아니라 무시 대상이어서다.

**푸시가 거절되면 fetch부터 한다.** 워크트리가 하나라 남의 커밋은 이미 로컬
HEAD에 들어와 있고 거절은 대개 원격 참조가 낡아서 생긴다.

```bash
git fetch origin
git log --oneline -2            # 내 커밋의 부모가 origin/main인지 본다
git diff <부모> HEAD --stat     # 내 것만 들었는지 다시 본다
git push
```

부모가 origin/main이 아니면 rebase가 아니라 **커밋을 다시 짓는다** — 새 HEAD의
파일을 읽어 내 것만 얹는 절차(위)를 그대로 한 번 더 돌린다.

**거절이 곧 실패는 아니다.** 워크트리가 하나라 남의 세션이 **내 커밋 위에 얹어
먼저 푸시하는** 일이 생긴다. 그러면 내 커밋은 이미 원격에 있고, 거절 메시지의
«is at X but expected Y»에서 X가 내 커밋을 자손으로 두고 있을 뿐이다. 다시
만들면 같은 개념이 두 번 들어간다. **fetch 다음에 이것부터 본다.**

```bash
git branch -r --contains <내 커밋>   # origin/main이 나오면 이미 올라간 것이다
git diff --stat origin/main HEAD     # 빈 출력이면 로컬과 원격이 같다
```

둘 다 «있다·같다»로 나오면 **아무것도 하지 않는다.** 2026-09-08에 상황 표현
26회차가 이 자리였다 — 커밋 d44b31aa를 다시 지을 뻔했고, 실제로는 다른 세션의
HSK 5급 커밋이 그것을 부모로 삼아 이미 밀어 올린 뒤였다.

## 안 하기로 한 것

**락 파일을 두지 않았다.** `.locks/<파일>`을 잡고 푸는 방식은 세션이 죽으면
락이 남고, 남은 락을 푸는 규칙을 또 만들어야 한다. 사고 1·2는 규칙 1로,
사고 3은 숫자 확인으로, 사고 4는 프로세스 확인으로 막힌다. 사고 5와 6은
**개인 인덱스**가 구조적으로 막는다 — 공유 인덱스를 아예 안 쓰기 때문이다.

**워크트리를 나누지 않았다.** `git worktree`로 갈라 두면 파일 경합은 사라지지만
콘텐츠 작업은 결국 같은 JSON을 고치므로 병합에서 다시 만난다. 지금 규모에서는
합치는 비용이 더 크다.
