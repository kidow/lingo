import type { Language, Trivia } from './types.ts'

/**
 * 상식 문항의 **오답 품질**을 글만 보고 의심한다. (spec.md §7)
 *
 * 낱말 카드는 오답을 풀에서 자동으로 뽑지만(`distractorPool`) 상식은 손으로
 * 적는다 — 그래서 "내용을 몰라도 답이 보이는" 문항이 섞인다. 1,000문항을 눈으로
 * 다시 읽을 수는 없으므로 기계가 먼저 의심할 자리를 골라 준다.
 *
 * **진도 데이터로는 못 잡는다.** 정답률로 거르려면 사람이 많이 풀어야 하는데
 * 진도는 브라우저마다 갈린 localStorage에 있고(§6), 문항을 쓴 사람은 답을 이미
 * 안다. 반면 아래 네 신호는 문항 하나만 놓고도 보인다.
 *
 * **오류가 아니라 의심이다.** 전부 사람이 다시 읽어 판단할 후보일 뿐이라
 * `pnpm check`는 이걸로 실패하지 않고 경고만 낸다.
 */
export type SuspectKind =
  /** 정답만 눈에 띄게 길거나 짧다 — 읽지 않고 길이로 고를 수 있다 */
  | 'length'
  /** 소거되는 오답이 둘 이상 — 사실상 2지선다다 */
  | 'throwaway'
  /** 정답에만 괄호 주석이 붙었다 — 친절함이 표지가 된다 */
  | 'gloss'
  /** 같은 언어에 같은 물음이 둘 있다 */
  | 'duplicate'

export type Suspect = {
  lang: Language
  id: string
  question: string
  kinds: SuspectKind[]
  /** 왜 걸렸는지 한 줄. 표에 그대로 찍는다 */
  why: string
}

/**
 * 내용을 몰라도 지워지는 보기들.
 *
 * "차이가 없다"·"규칙이 없다" 같은 말은 사지선다에서 거의 언제나 오답이라
 * 학습자가 문법을 몰라도 지운다. 둘 이상 깔리면 남는 것이 둘뿐이다.
 *
 * **정답은 이 검사에서 뺀다.** 정답이 저런 문장인 문항도 있고(러시아어에 관사가
 * "아예 없다"), 그건 오답 품질 문제가 아니라 다른 이야기다.
 */
const THROWAWAY = [
  /차이가 없다/,
  /뜻이 같다/,
  /같은 뜻이다/,
  /정해져 있지 않다/,
  /규칙이 없다/,
  /제한이 없다/,
  /자유롭다/,
  /해당 없음/,
  /알 수 없다/,
  /모른다/,
  /상관없다/,
  /둘 다 같다/,
  /셋 다 같다/,
  /넷 다 같다/,
  /둘 다 아니다/,
  /같은 빈도/,
]

/** 글자 수. 이모지·한자를 한 글자로 세려면 코드포인트로 세야 한다 */
const len = (text: string) => [...text].length

/** 길이가 튀었다고 볼 배수와 최소 글자 차이. 아래 `lengthSuspect` 주석 참고 */
const RATIO = 3
const GAP = 12

/**
 * 길이로 답이 보이는가.
 *
 * 정답에만 조건을 덧붙이다 보면 정답이 혼자 길어진다 — 출제에서 가장 흔한
 * 실수다. 반대로 정답만 툭 짧은 경우도 같은 표지가 된다.
 *
 * 비율과 절대 차이를 **둘 다** 본다. 비율만 보면 짧은 보기들(`ы`·`и` 같은
 * 두 글자)에서 한두 글자 차이가 몇 배가 되어 헛경고가 쏟아진다.
 *
 * 문턱은 **실측으로 잡았다.** 1.6배·6자로 두면 1,029문항 중 232개(23%)가 걸린다 —
 * 설명형 정답과 짧은 오답이라는 문체 자체가 걸리는 것이라 신호가 아니라 소음이다.
 * 3배·12자로 올리면 43개(4%)가 남고, 그때부터는 눈으로 봐도 정답이 튄다.
 */
function lengthSuspect(item: Trivia): string | null {
  const others = item.choices.filter((choice) => choice !== item.answer).map(len)
  if (others.length === 0) return null

  const answer = len(item.answer)
  const max = Math.max(...others)
  const min = Math.min(...others)

  if (answer >= max * RATIO && answer - max >= GAP)
    return `정답이 가장 긺 (${answer}자 vs ${max}자)`
  if (min >= answer * RATIO && min - answer >= GAP)
    return `정답이 가장 짧음 (${answer}자 vs ${min}자)`
  return null
}

/** 소거되는 오답이 몇 개인가. 정답은 세지 않는다 */
function throwawaySuspect(item: Trivia): string | null {
  const count = item.choices.filter(
    (choice) => choice !== item.answer && THROWAWAY.some((pattern) => pattern.test(choice)),
  ).length
  return count >= 2 ? `소거되는 오답 ${count}개 — 사실상 ${4 - count}지선다` : null
}

/**
 * 정답에만 괄호 주석이 붙었는가.
 *
 * `일본어족(Japonic)`처럼 정답에만 원어를 달아 주면 친절하지만, 오답 셋이
 * 맨몸이면 그 괄호가 곧 표지가 된다. 넷 다 달거나 넷 다 빼야 한다.
 */
function glossSuspect(item: Trivia): string | null {
  const gloss = (text: string) => /[(（]/.test(text)
  if (!gloss(item.answer)) return null
  const others = item.choices.filter((choice) => choice !== item.answer)
  return others.every((choice) => !gloss(choice)) ? '정답에만 괄호 주석이 붙음' : null
}

/** 공백·문장부호를 지운 물음. 같은 질문을 두 번 쓴 것을 잡는 데만 쓴다 */
const normalize = (question: string) => question.replace(/[\s?？.,·「」『』()（）]/g, '')

/**
 * 한 언어의 문항을 훑어 의심스러운 것만 돌려준다.
 *
 * 언어별로 부르는 이유는 중복 검사 때문이다 — 물음이 같아도 언어가 다르면
 * 다른 문항이다(`관사가 있나요?`는 일곱 언어에 각각 성립한다).
 */
export function auditTrivia(lang: Language, items: Trivia[]): Suspect[] {
  const seen = new Map<string, string>()
  const suspects: Suspect[] = []

  for (const item of items) {
    const kinds: SuspectKind[] = []
    const why: string[] = []

    const checks: [SuspectKind, string | null][] = [
      ['length', lengthSuspect(item)],
      ['throwaway', throwawaySuspect(item)],
      ['gloss', glossSuspect(item)],
    ]
    for (const [kind, reason] of checks) {
      if (reason) {
        kinds.push(kind)
        why.push(reason)
      }
    }

    const key = normalize(item.question)
    const twin = seen.get(key)
    if (twin) {
      kinds.push('duplicate')
      why.push(`같은 물음이 이미 있음 (${twin})`)
    } else {
      seen.set(key, item.id)
    }

    if (kinds.length > 0) {
      suspects.push({ lang, id: item.id, question: item.question, kinds, why: why.join(' · ') })
    }
  }

  return suspects
}
