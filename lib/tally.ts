import type { DeckId } from './deck.ts'
import { HANJA_LADDER, HANJA_SKILLS } from './hanja.ts'
import { KANA_LADDER, KANA_SKILLS } from './kana.ts'
import { isMastered, TRIVIA_LADDER, WORD_LADDER, type Ladder, type Progress } from './progress.ts'
import type { TrackId } from './track.ts'

/**
 * 트랙마다 어디까지 왔는가. 「내 진도」 모달이 그린다 (components/sync-sheet.tsx).
 *
 * 헤더의 %는 **지금 보는 트랙·덱 하나**만 센다. 분모가 그 트랙의 콘텐츠
 * 파일 안에 있어서다(4~7MB, 보고 있는 언어 하나만 받는다). 다른 트랙까지
 * 세려고 그 파일을 다 받을 수는 없으니, 빌드 때 **개수만** 따로 굽는다
 * (scripts/split.ts → public/content/tally.json).
 *
 * 분모는 헤더와 같은 함수로 센다. 어긋나면 모달과 헤더가 같은 트랙에 다른
 * %를 적는다.
 */

/** 덱 넷과 한능검. 한능검은 덱이 없는 트랙이라 한 칸으로 둔다 */
export type Shelf = DeckId | 'hanja'

export type Tally = {
  /** 트랙 → 칸 → 전체 개수. 가나·한능검은 **글자** 수다 */
  totals: Partial<Record<TrackId, Partial<Record<Shelf, number>>>>
  /**
   * 표현 개념의 slug. 단어와 표현은 카드 이름이 둘 다 slug 그대로라
   * 이름만으로는 못 가른다 — 개념의 분류(`scene`)를 알아야 한다 (lib/deck.ts)
   */
  phrases: string[]
}

export type Count = { seen: number; mastered: number }

/**
 * 카드 이름 → 칸. 상식·가나·한능검은 이름 앞머리로 가린다
 * (lib/trivia.ts의 `triviaKey`, lib/kana.ts의 `kanaKey`, lib/hanja.ts의 `hanjaKey`).
 */
export function shelfOf(key: string, phrases: ReadonlySet<string>): Shelf {
  if (key.startsWith('hanja:')) return 'hanja'
  if (key.startsWith('kana:')) return 'kana'
  if (key.startsWith('trivia:')) return 'trivia'
  return phrases.has(key) ? 'phrase' : 'word'
}

/**
 * 가나와 한능검은 **글자**를 센다. 헤더와 같은 규칙이다 — 글자 하나에 능력이
 * 둘이고(읽기·쓰기, 글자·훈음) 둘 다 떼야 그 글자를 안다고 한다
 * (lib/kana.ts의 `masteredKanaCount`, lib/hanja.ts의 `masteredHanjaCount`).
 * 카드로 세면 절반만 뗀 글자가 50%로 잡힌다.
 */
const PER_GLYPH: Partial<Record<Shelf, { skills: number; ladder: Ladder }>> = {
  kana: { skills: KANA_SKILLS.length, ladder: KANA_LADDER },
  hanja: { skills: HANJA_SKILLS.length, ladder: HANJA_LADDER },
}

const LADDER: Record<Shelf, Ladder> = {
  word: WORD_LADDER,
  phrase: WORD_LADDER,
  trivia: TRIVIA_LADDER,
  kana: KANA_LADDER,
  hanja: HANJA_LADDER,
}

/** 능력을 뗀 이름. `kana:hira:a:read` → `kana:hira:a` */
const glyphOf = (key: string) => key.slice(0, key.lastIndexOf(':'))

/**
 * 진도 하나를 칸별로 센다. **본 것**은 카드가 하나라도 있는 것(소개를
 * 넘겼거나 답했다), **외운 것**은 헤더와 같은 기준이다.
 *
 * 목록이 아니라 진도를 돈다 — 다른 트랙의 목록은 이 기기에 없다. 그래서
 * 지금은 출제되지 않는 카드가 남아 있으면(TOEIC은 TSL로 한 번 더 거른다)
 * 분자가 분모를 넘을 수 있고, 그리는 쪽이 전체로 자른다.
 */
export function countProgress(progress: Progress, phrases: ReadonlySet<string>): Partial<Record<Shelf, Count>> {
  const out: Partial<Record<Shelf, Count>> = {}
  const glyphs = new Map<string, { shelf: Shelf; done: number }>()

  for (const [key, card] of Object.entries(progress.cards)) {
    const shelf = shelfOf(key, phrases)
    const done = isMastered(card, LADDER[shelf])

    if (PER_GLYPH[shelf]) {
      const id = glyphOf(key)
      const glyph = glyphs.get(id) ?? { shelf, done: 0 }
      if (done) glyph.done += 1
      glyphs.set(id, glyph)
      continue
    }

    const count = (out[shelf] ??= { seen: 0, mastered: 0 })
    count.seen += 1
    if (done) count.mastered += 1
  }

  for (const { shelf, done } of glyphs.values()) {
    const count = (out[shelf] ??= { seen: 0, mastered: 0 })
    count.seen += 1
    if (done === PER_GLYPH[shelf]!.skills) count.mastered += 1
  }

  return out
}
