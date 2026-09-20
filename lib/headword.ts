/**
 * 예문이 표제어를 못 보여줄 때 **왜 그런지** 한 마디로 짚는다.
 *
 * 문맥 카드는 예문에서 표제어를 뚫어 넷 중 고르게 한다(`clozeAt`). 뚫으려면
 * 글자도 대소문자도 그대로여야 하는데, 표제어를 문장에 앉히다 보면 꼴이
 * 바뀐다. `pnpm check`는 오래 «예문이 그 단어를 보여주지 않습니다»까지만
 * 말했다 — 맞는 말이지만 **어디를 고칠지는 안 알려 준다.**
 *
 * 2026-09-18부터 축을 채우는 열두 회차에서 이 경고가 스물여덟 났고, 자리가
 * 다섯뿐이었다. 언어는 여섯으로 흩어졌는데 뿌리는 같다 — **표제어를 원형
 * 그대로 세울 자리를 못 찾은 것**이다.
 *
 *   ein routinierter Spieler      de 형용사가 명사 앞에 서서 어미가 붙었다
 *   bei der mütterlichen Familie  de 격이 붙어 두 낱말이 다 바뀌었다
 *   Leichter ist es aufzurunden   de 분리동사 안으로 zu가 들어갔다
 *   wird sich alles überschneiden de 재귀대명사와 동사 사이에 말이 끼었다
 *   stops it laddering            en 동사구의 머리가 활용됐다
 *   si se canta el marcador       es 재귀 수동으로 바뀌었다
 *   Une route sinueuse            fr 여성형이 되며 꼬리가 갈렸다
 *   カーテンを ひく                 ja 표제어 안에 공백이 들어갔다
 *
 * 고치는 법은 [docs/headword-in-examples.md](../docs/headword-in-examples.md)에
 * 적어 두었다. 여기서는 그 문서의 어느 줄인지를 경고에 붙인다.
 */

import { clozeAt } from './quiz.ts'
import type { Language } from './types.ts'

const SPACE = /\s+/gu
/** 낱말로 자른다. 문장 부호는 떼고 본다 — «sinueuse.»의 마침표까지 세면 못 맞춘다 */
const words = (text: string): string[] =>
  text
    .split(/[\s.,;:!?()«»"。、！？「」]+/u)
    .map((w) => w.replace(/[’']+$/u, ''))
    .filter(Boolean)

const bare = (text: string) => text.replace(SPACE, '')
const lower = (text: string) => text.toLowerCase()

/**
 * 공백을 지우면 표제어가 나오는 자리에서 **원문의 그 대목**을 돌려준다.
 *
 * 그냥 `bare(text).includes(bare(answer))`로 보면 안 된다. 공백이 끼어든 자리와
 * **긴 낱말 안에 표제어가 박힌 자리**를 못 가른다 — «routinierter»는 공백을
 * 지우지 않아도 «routiniert»를 품는다. 돌려준 대목에 공백이 있을 때만
 * 「공백만 다르다」고 말할 수 있다.
 */
function spanIgnoringSpace(text: string, answer: string): string {
  const want = bare(lower(answer))
  if (!want) return ''
  let start = -1
  let got = ''
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i] ?? ''
    if (/\s/u.test(ch)) {
      if (start >= 0) got += ch
      continue
    }
    if (got.replace(SPACE, '').length === 0) start = i
    got += ch
    const solid = bare(lower(got))
    if (want.startsWith(solid)) {
      if (solid === want) return text.slice(start, i + 1)
      continue
    }
    // 어긋났으면 이 자리에서 다시 시작한다
    i = start
    start = -1
    got = ''
  }
  return ''
}

/** 앞에서부터 몇 글자가 같은가 */
function common(a: string, b: string): number {
  let n = 0
  while (n < a.length && n < b.length && a[n] === b[n]) n += 1
  return n
}

/** 어간은 같고 꼬리만 갈린 낱말인가 — routiniert↔routinierter · sinueux↔sinueuse */
function sameStem(a: string, b: string): boolean {
  if (a === b) return false
  const n = common(a, b)
  if (n >= 4 && a.length - n <= 3 && b.length - n <= 3) return true
  /*
   * 짧은 쪽이 통째로 앞머리인 자리는 세 글자부터 본다 — `set`↔`setting`.
   * 어간을 넉 자로 잡으면 영어의 짧은 동사가 통째로 빠진다.
   */
  const [short, long] = a.length <= b.length ? [a, b] : [b, a]
  return short.length >= 3 && long.startsWith(short) && long.length - short.length <= 4
}

/**
 * 표제어의 낱말이 **낱말 그대로** 이 차례로 다 들어 있는가.
 *
 * `indexOf`로 보면 안 된다. «mütterliche»가 «mütterlichen» 안에서 걸려
 * 어미가 붙은 자리를 「사이에 말이 끼었다」고 잘못 짚는다.
 */
function allInOrder(text: string, parts: string[]): boolean {
  const have = words(text).map(lower)
  let from = 0
  for (const part of parts) {
    const at = have.indexOf(lower(part), from)
    if (at < 0) return false
    from = at + 1
  }
  return true
}

/**
 * 표제어가 예문에 아예 없을 때 짚을 말. 짚을 것이 없으면 빈 문자열이다.
 *
 * 순서에 뜻이 있다. 앞의 둘은 **글자로 딱 갈리는 자리**라 먼저 보고, 뒤의
 * 둘은 닮은 꼴을 재는 자리라 나중에 본다.
 */
export function whyMissing(text: string, answer: string, lang: string): string {
  if (!text || !answer) return ''

  /* 1. 공백만 다르다 — ja에서 «カーテンを ひく»처럼 표제어 안이 벌어진다 */
  const span = spanIgnoringSpace(text, answer)
  if (span && /\s/u.test(span.trim())) return '공백만 다릅니다 — 표제어를 한 덩이로 붙여 쓰세요'

  const parts = answer.split(SPACE).filter(Boolean)

  /* 2. 분리동사 안으로 zu가 들어갔다 — aufrunden → aufzurunden */
  if (lang === 'de') {
    const zu = words(text).find((w) => w.length === answer.length + 2 && w.replace('zu', '') === answer)
    if (zu) return `"${zu}"처럼 zu가 분리동사 안에 끼었습니다 — 화법조동사 뒤에 원형으로 두세요`
  }

  /* 3. 표제어 낱말은 다 있는데 사이에 딴 말이 끼었다 — sich alles überschneiden */
  if (parts.length > 1 && allInOrder(text, parts))
    return '표제어의 낱말 사이에 다른 말이 끼었습니다 — 붙여 쓰세요'

  /* 4. 어간은 같고 꼴이 바뀌었다. 표제어의 어느 낱말이든 본다 */
  for (const part of parts) {
    const hit = words(text).find((w) => sameStem(lower(w), lower(part)))
    if (hit)
      return `예문은 "${hit}"로 꼴이 바뀌어 있습니다 — 표제어가 원형 그대로 서는 자리에 두세요`
  }

  /*
   * 5. 한 낱말만 다르다. 「jemanden tief verletzen」을 「niemanden tief
   *    verletzen」으로 적은 자리다 — 꼴이 바뀐 것이 아니라 말이 갈린 것이라
   *    고칠 곳은 그 한 낱말뿐이다.
   */
  if (parts.length > 1)
    for (let i = 0; i < parts.length; i += 1)
      if (allInOrder(text, parts.filter((_, at) => at !== i)))
        return `표제어에서 "${parts[i]}"만 예문에 없습니다 — 그 자리를 표제어대로 적으세요`

  return ''
}

/**
 * 대소문자만 다를 때 짚을 말.
 *
 * 문장 첫머리면 «옮기세요»가 맞지만, 독일어에는 «zum Garnieren»처럼 동사를
 * 명사로 써서 커진 자리가 있다. 그 둘은 고칠 곳이 다르다.
 */
export function whyCapital(text: string, answer: string): string {
  const at = lower(text).indexOf(lower(answer))
  if (at < 0) return ''
  const before = text.slice(0, at).trimEnd()
  if (before === '' || /[.!?:»"]$/u.test(before)) return '낱말이 문장 첫머리에 오지 않게 고치세요'
  return '문장 한가운데서 커졌습니다 — 동사를 명사로 쓴 자리라면 zu 부정사로 푸세요'
}

/**
 * 표제어가 들어는 있는데 못 뚫을 때 짚을 말.
 *
 * 거의 언제나 **앞에 붙은 아포스트로피**다. «l'étiquette»처럼 축약이 붙으면
 * 낱말 경계가 사라져 `clozeAt`이 자리를 안 준다.
 */
export function whyStuck(text: string, answer: string): string {
  const at = lower(text).indexOf(lower(answer))
  if (at > 0 && /[’']/u.test(text[at - 1] ?? '')) return '앞의 아포스트로피가 낱말 경계를 지웁니다 — 관사를 풀어 적으세요'
  /*
   * 표제어가 낱말 **안에만** 있는 자리. 독일어 형용사가 여기 모인다 —
   * `link`는 명사 앞에서 늘 어미를 받으므로 문장에 그 꼴로 설 수 없다
   * (docs/examples-pending.md). 예문이 아니라 표제형을 고칠 자리다.
   */
  if (at >= 0 && !words(text).some((w) => lower(w) === lower(answer)))
    return '표제어가 낱말 안에만 있습니다 — 어미가 안 붙는 자리를 쓰거나 표제형을 굴절형으로 박으세요'
  return ''
}

/** 예문이 표제어를 못 보여주는 자리. `said`는 짚을 말이고, 없으면 빈 문자열이다 */
export type Snag = {
  /** capital 대소문자만 다름 · missing 아예 없음 · stuck 들어는 있는데 못 뚫음 */
  kind: 'capital' | 'missing' | 'stuck'
  said: string
}

/**
 * 예문 하나를 재 본다. 걸릴 것이 없으면 `null`.
 *
 * 세 갈래를 가르는 판단은 오래 `scripts/check.ts` 안에만 있었다. 그래서 그
 * 판단을 쓰려면 아홉 단계짜리 `pnpm batch`를 끝까지 돌려야 했다 — **쓰고 난
 * 뒤에야** 무엇이 틀렸는지 알았다는 뜻이다. 열세 회차 내내 회차마다 서넛씩
 * 같은 자리에서 걸렸다(영어 문장 첫머리 · 프랑스어 축약). 여기로 내려
 * `scripts/ex.ts`가 **쓰기 전에** 같은 잣대로 잴 수 있게 한다.
 */
export function judgeExample(text: string, answer: string, lang: Language): Snag | null {
  if (!text.includes(answer))
    return text.toLowerCase().includes(answer.toLowerCase())
      ? { kind: 'capital', said: whyCapital(text, answer) }
      : { kind: 'missing', said: whyMissing(text, answer, lang) }
  if (clozeAt(text, answer, lang) >= 0) return null
  return { kind: 'stuck', said: whyStuck(text, answer) }
}

/**
 * 낱말 하나의 예문을 다 재 본다. 차례(`at`)를 달아 돌려준다.
 *
 * 「못 뚫음」만 다르게 센다 — 예문 둘 가운데 하나만 뚫리면 문맥 카드는
 * 만들어지므로 **다 막혔을 때만** 말한다. `scripts/check.ts`가 오래 그렇게
 * 해 왔고(낱말마다 하나씩만 낸다), 여기서도 마지막 것 하나만 남긴다.
 */
export function judgeWord(texts: string[], answer: string, lang: Language): (Snag & { at: number })[] {
  const all = texts
    .map((text, at) => ({ at, snag: judgeExample(text, answer, lang) }))
    .flatMap(({ at, snag }) => (snag ? [{ ...snag, at }] : []))
  const stuck = all.filter((s) => s.kind === 'stuck')
  // 하나라도 멀쩡히 뚫렸으면 막힌 자리는 접는다. 아니면 마지막 것만 낸다
  const keep = all.length < texts.length ? [] : stuck.slice(-1)
  return [...all.filter((s) => s.kind !== 'stuck'), ...keep].sort((a, b) => a.at - b.at)
}

/*
 * 독일어 동사 괄호(Satzklammer) — **부정사는 오른쪽 끝이다.**
 *
 * 표제어가 `instand halten`·`in die Ferne blicken`처럼 **동사구**이면, 예문에
 * 글자 그대로 세우려다 정형 동사를 뒤로 밀게 된다.
 *
 *   Sie instand halten die Pumpe monatlich.      ← 정형 동사가 아예 없다
 *   Sie müssen die Pumpe monatlich instand halten.
 *
 * **`check`도 `clozeAt`도 조용하다** — 표제형이 예문에 있고 뚫리기까지 하므로
 * 문맥 카드는 잘 만들어진다. 틀린 독일어인데 그래서 더 나쁘다. 2026-09-10에
 * 동사구 표제어를 눈으로 훑어 열하나를 찾아 넘겼는데(docs/examples-pending.md),
 * 기계로 재 보니 240이었다. **눈으로 훑는 것으로는 안 되는 자리**다.
 */

/**
 * 뒤따라도 되는 말 — 접속사가 오면 절이 이어지는 자리다.
 *
 * `der`·`die`·`das`는 **넣지 않는다.** 관계대명사이기도 하지만 독일어 관계절은
 * 앞에 쉼표를 찍고, 쉼표는 이미 따로 뺀다. 쉼표 없이 오는 `die`는 거의 다
 * 관사다 — 넣었더니 `Sie instand halten die Pumpe monatlich.`이 빠졌다.
 */
const DE_CLAUSE = /^(zu|und|oder|aber|sondern|denn|als|wie|weil|dass|ob|damit|wenn|um|wo|wer|was)$/u

/** 뒤따라도 되는 정형 동사 — 종속절은 동사가 끝에 온다 (`… austragen muss`) */
const DE_FINITE = new Set(
  `ist sind war waren sei seien bin bist seid hast habt hat haben hatte hatten
   wird wirst werden wurde wurden würde würden
   kann kannst können konnte konnten könnte könnten
   muss musst müssen musste mussten müsste müssten soll sollst sollen sollte sollten
   will willst wollen wollte wollten darf darfst dürfen durfte durften
   mag magst mögen mochte möchte möchten
   lässt lassen ließ ließen bleibt bleibst bleiben blieb blieben`.split(/\s+/u),
)

/**
 * 부정사와 꼴이 같지 않은 **정형뿐인** 동사. 표제어가 이것으로 끝나면 그
 * 동사구는 오른쪽 괄호가 아니라 **왼쪽 괄호**다 — 둘째 자리에 서고 뒤에
 * 말이 오는 것이 맞다 (`es ist seines`). `haben`·`werden`·`sein`처럼 부정사와
 * 같은 꼴은 여기 넣지 않는다. 넣으면 `nicht haben`·`verwendet werden`이
 * 빠진다.
 */
const DE_TENSED = new Set(
  `ist sind war waren sei seien bin bist seid hast habt hat hatte hatten gilt
   wird wirst wurde wurden würde würden kann kannst konnte konnten könnte könnten
   muss musst musste mussten müsste müssten soll sollst sollte sollten
   will willst wollte wollten darf darfst durfte durften mag magst mochte möchte möchten
   lässt ließ ließen bleibt bleibst blieb blieben`.split(/\s+/u),
)

/** 앞에 오면 동사구가 아니라 **명사**인 자리 — `beim Bomben abwerfen` */
const DE_NOMINAL = new Set(['beim', 'zum', 'am', 'im', 'vom', 'ans', 'aufs', 'das', 'des', 'dem'])

/**
 * 독일어 동사구 표제어가 문장 끝에 안 왔을 때 짚을 말. 없으면 빈 문자열이다.
 *
 * 눈금은 하나뿐이다 — **표제어 뒤에 말이 남아 있는가.** 남아도 되는 자리를
 * 셋 뺀다(절이 이어짐 · 종속절의 정형 동사 · 명사로 쓴 자리). 240을 세어
 * 스물다섯씩 두 번 눈으로 보니 스물셋·스물넷이 진짜였다. 남는 헛것은
 * `Zweimal die Lektion vorbereiten hilft.`처럼 **동사구가 주어인 자리**다 —
 * 그래서 막지 않고 짚기만 한다.
 */
export function whyLateVerb(text: string, answer: string, lang: Language, pos: string): string {
  if (lang !== 'de' || pos !== '동사' || !answer.includes(' ')) return ''
  if (DE_TENSED.has((answer.split(SPACE).at(-1) ?? '').toLowerCase())) return ''
  const at = text.indexOf(answer)
  if (at < 0) return ''
  const tail = text.slice(at + answer.length).trim()
  if (!tail || /^[.!?…»"]*$/u.test(tail) || tail.startsWith(',')) return ''
  const next = tail.split(/[\s.,;:!?]+/u)[0] ?? ''
  if (DE_CLAUSE.test(next) || DE_FINITE.has(next.toLowerCase())) return ''
  const prev = text.slice(0, at).trim().split(SPACE).at(-1) ?? ''
  if (DE_NOMINAL.has(prev.toLowerCase())) return ''
  return `동사구 뒤에 "${next}"가 남았습니다 — 조동사를 둘째 자리에 세우고 표제형을 문장 끝으로 보내세요`
}
