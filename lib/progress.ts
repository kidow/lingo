import { createEmptyCard, type Card as FsrsCard } from 'ts-fsrs'
import type { TrackId } from './track.ts'

/**
 * 진도. (spec.md §6)
 *
 * 서버가 없다. 전부 localStorage에 있고 **트랙별로** 분리된다.
 * TOEIC 진도와 JLPT 진도는 별개이며, 나중에 같은 언어에 트랙이 둘이 되어도
 * 서로를 덮지 않는다.
 */

export const PROGRESS_VERSION = 2

/**
 * 카드 난이도 사다리. 0 소개 → 1 재인 → 2 문맥 → 3 단서 회상
 *
 * 예문 빈칸(2)이 재인과 철자 사이에 들어간다. 그림을 보고 낱말을 고르는
 * 것과 낱말의 철자 한 글자를 떠올리는 것 사이에는 **문장 안에서 그 낱말이
 * 설 자리를 아는가**라는 단계가 있다. 그 사이가 비어 있었다.
 */
export type Rung = 0 | 1 | 2 | 3
export const RUNG_INTRO = 0 satisfies Rung
export const RUNG_CHOICE = 1 satisfies Rung
export const RUNG_CLOZE = 2 satisfies Rung
export const RUNG_BLANK = 3 satisfies Rung
export const RUNG_MAX = RUNG_BLANK

/**
 * ts-fsrs의 Card를 그대로 두되 Date만 숫자로 바꾼다.
 * CardInput이 due를 number로도 받으므로 되돌릴 필요가 없다.
 */
export type StoredCard = Omit<FsrsCard, 'due' | 'last_review'> & {
  due: number
  last_review: number | null
}

export type CardState = {
  rung: Rung
  /** 연속 정답 수. 예약 거리를 정한다 */
  streak: number
  fsrs: StoredCard
}

export type Progress = {
  version: typeof PROGRESS_VERSION
  /** key = concept slug. 언어는 저장소 키가 구분한다 */
  cards: Record<string, CardState>
  /** slug → 최초 노출 시각(ms). 신선도 부스트에 쓴다 */
  introducedAt: Record<string, number>
}

export const emptyProgress = (): Progress => ({
  version: PROGRESS_VERSION,
  cards: {},
  introducedAt: {},
})

export function storeCard(card: FsrsCard): StoredCard {
  return { ...card, due: card.due.getTime(), last_review: card.last_review?.getTime() ?? null }
}

export function freshCard(now: Date): StoredCard {
  return storeCard(createEmptyCard(now))
}

/* ── 숙련도 ──────────────────────────────────────────────────────── */

/**
 * "완전히 외웠다"의 문턱. 단위는 일(day)이다. (spec.md §3, §6)
 *
 * rung만으로는 못 센다. rung 2는 소개를 지나 정답 두 번이면 닿으므로 **한
 * 세션 스와이프로 채워진다.** 그렇게 센 숫자는 외운 개수가 아니라 스와이프
 * 횟수다.
 *
 * FSRS의 stability는 다르다. 같은 날 다시 맞혀도 자라지 않고(경과 0일)
 * 날짜를 넘겨 살아남아야 오른다 — 실측으로 2.3 → 11 → 46 → 163일이다.
 * 그래서 21일을 넘기려면 최소 서너 날에 걸친 복습이 필요하다. 문턱이 시간을
 * 요구한다는 점 자체가 이 값을 고른 이유다.
 *
 * 되돌아가는 것도 허용한다. 외웠던 단어를 한 번 틀리면 stability가 46일에서
 * 3일 아래로 무너져 곧바로 빠진다. 숫자가 현재 상태를 뜻하려면 그래야 한다.
 */
export const MASTERED_STABILITY = 21

export function isMastered(card: CardState | undefined): boolean {
  if (!card) return false
  return card.rung === RUNG_MAX && card.fsrs.stability >= MASTERED_STABILITY
}

/**
 * 이 목록에서 완전히 외운 개수.
 *
 * 진도가 아니라 **목록을 기준으로** 센다. 진도에는 지금 트랙에서 더 이상
 * 출제되지 않는 slug가 남아 있을 수 있다 — TOEIC은 TSL 필터를 한 겹 더
 * 거치므로(lib/entries.ts) 필터가 바뀌면 실제로 남는다. 목록을 돌면 분자가
 * 분모를 넘는 일이 생기지 않는다.
 */
export function masteredCount(progress: Progress, slugs: string[]): number {
  let count = 0
  for (const slug of slugs) if (isMastered(progress.cards[slug])) count += 1
  return count
}

/**
 * 헤더에 쓰는 문자열. 없으면 null이고, 그러면 헤더는 지금과 똑같다. (spec.md §3)
 *
 * 0을 숨기는 이유는 빈 진도를 굳이 보여줄 이유가 없어서다. 설치 직후
 * `0%`가 며칠씩 박혀 있으면 고장으로 읽힌다.
 *
 * 반올림해서 0이 되는 구간은 `<1%`로 쓴다. JLPT는 분모가 1344라 14개를
 * 외워야 1%가 되는데, 그 사이를 `0%`로 쓰면 열세 개를 외운 사람에게
 * 아무것도 안 했다고 말하는 셈이다.
 */
export function masteryLabel(mastered: number, total: number): string | null {
  if (mastered <= 0 || total <= 0) return null
  const percent = Math.round((mastered / total) * 100)
  return percent < 1 ? '<1%' : `${percent}%`
}

/* ── 저장소 ──────────────────────────────────────────────────────── */

export const progressKey = (track: TrackId) => `lingo.progress.${track}`
export const TRACK_KEY = 'lingo.track'
/** 덱은 트랙과 달리 하나만 저장한다 — 진도를 나누지 않기 때문이다 (lib/deck.ts) */
export const DECK_KEY = 'lingo.deck'

/**
 * 없거나 깨졌으면 빈 진도로 시작한다. 던지지 않는다.
 *
 * 버전이 낮으면 **버리지 않고 옮긴다.** 진도는 서버에 사본이 없어서 한 번
 * 버리면 그걸로 끝이다 — 몇 달치 복습 간격이 사라진다.
 */
export function loadProgress(track: TrackId): Progress {
  if (typeof localStorage === 'undefined') return emptyProgress()
  try {
    const raw = localStorage.getItem(progressKey(track))
    if (!raw) return emptyProgress()
    // 저장된 값은 예전 스키마일 수 있다. version은 넓게 읽는다
    const parsed = JSON.parse(raw) as Omit<Partial<Progress>, 'version'> & { version?: number }
    if (parsed.version === 1) return migrateFromV1(parsed)
    if (parsed.version !== PROGRESS_VERSION) return emptyProgress()
    return {
      version: PROGRESS_VERSION,
      cards: parsed.cards ?? {},
      introducedAt: parsed.introducedAt ?? {},
    }
  } catch {
    return emptyProgress()
  }
}

/**
 * v1 → v2. 사다리 가운데에 문맥 칸이 끼면서 철자 칸이 2에서 3으로 밀렸다.
 *
 * v1에서 2였던 카드는 철자까지 올라간 카드다. 그대로 두면 문맥 칸으로
 * **강등**되므로 3으로 올린다. 0·1은 뜻이 그대로라 손대지 않는다.
 * FSRS 상태는 건드리지 않는다 — 다음 복습 시각은 rung이 아니라 거기 있다.
 */
function migrateFromV1(parsed: { cards?: Record<string, CardState>; introducedAt?: Record<string, number> }): Progress {
  const cards: Record<string, CardState> = {}
  for (const [slug, card] of Object.entries(parsed.cards ?? {})) {
    cards[slug] = card.rung === 2 ? { ...card, rung: RUNG_BLANK } : card
  }
  return { version: PROGRESS_VERSION, cards, introducedAt: parsed.introducedAt ?? {} }
}

/** 저장 실패는 학습을 막을 이유가 아니다 (사파리 프라이빗 모드 등). */
export function saveProgress(track: TrackId, progress: Progress): void {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(progressKey(track), JSON.stringify(progress))
  } catch {
    /* 무시 */
  }
}
