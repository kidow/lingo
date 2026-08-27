import { createEmptyCard, type Card as FsrsCard } from 'ts-fsrs'
import type { Language } from './types.ts'

/**
 * 진도. (spec.md §6)
 *
 * 서버가 없다. 전부 localStorage에 있고 언어별로 분리된다.
 * 일본어 진도와 독일어 진도는 별개다.
 */

export const PROGRESS_VERSION = 1

/** 카드 난이도 사다리. 0 소개 → 1 재인 → 2 단서 회상 */
export type Rung = 0 | 1 | 2
export const RUNG_INTRO = 0 satisfies Rung
export const RUNG_CHOICE = 1 satisfies Rung
export const RUNG_BLANK = 2 satisfies Rung
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

/* ── 저장소 ──────────────────────────────────────────────────────── */

export const progressKey = (lang: Language) => `lingo.progress.${lang}`
export const LANGUAGE_KEY = 'lingo.language'

/** 없거나 깨졌으면 빈 진도로 시작한다. 던지지 않는다. */
export function loadProgress(lang: Language): Progress {
  if (typeof localStorage === 'undefined') return emptyProgress()
  try {
    const raw = localStorage.getItem(progressKey(lang))
    if (!raw) return emptyProgress()
    const parsed = JSON.parse(raw) as Partial<Progress>
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

/** 저장 실패는 학습을 막을 이유가 아니다 (사파리 프라이빗 모드 등). */
export function saveProgress(lang: Language, progress: Progress): void {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(progressKey(lang), JSON.stringify(progress))
  } catch {
    /* 무시 */
  }
}
