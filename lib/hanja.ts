import { isMastered, RUNG_CHOICE, type Ladder, type Progress } from './progress.ts'
import { hashString, makeRng, shuffled } from './random.ts'

/** 한국어문회 읽기 급수. 쓰기 급수나 한자어의 급수로 재사용하지 않는다. */
export type HanjaGrade = '8급' | '7급II' | '7급' | '6급II' | '6급' | '5급II' | '5급'
  | '4급II' | '4급' | '3급II' | '3급' | '2급' | '1급' | '특급II' | '특급'

export type HanjaCharacter = {
  id: string
  glyph: string
  hun: string
  eum: string
  readingGrade: HanjaGrade
  radical: string
  strokes: number
  example: { word: string; reading: string; meaning: string }
}

export const HANJA_SKILLS = ['recognition', 'hun-eum'] as const
export type HanjaSkill = typeof HANJA_SKILLS[number]
export type HanjaEntry = { key: string; character: HanjaCharacter; skill: HanjaSkill }
export type HanjaQuestion =
  | { kind: 'hanja-intro'; entry: HanjaEntry }
  | { kind: 'hanja-choice'; entry: HanjaEntry; prompt: string; answer: string; options: string[] }

export const HANJA_LADDER: Ladder = { min: RUNG_CHOICE, max: RUNG_CHOICE }
export const hanjaKey = (id: string, skill: HanjaSkill) => `hanja:char:${id}:${skill}`
export const hunEum = (character: HanjaCharacter) => `${character.hun} ${character.eum}`
export const isHanja = (item: { key: string }): item is HanjaEntry => 'character' in item

export function hanjaEntries(characters: HanjaCharacter[]): HanjaEntry[] {
  return characters.flatMap((character) => HANJA_SKILLS.map((skill) => ({
    key: hanjaKey(character.id, skill), character, skill,
  })))
}

/** 두 방향 모두 숙련돼야 한 글자를 센다. 쓰기와 소개는 숙련도에 포함하지 않는다. */
export function masteredHanjaCount(progress: Progress, characters: HanjaCharacter[]): number {
  return characters.filter((character) => HANJA_SKILLS.every((skill) =>
    isMastered(progress.cards[hanjaKey(character.id, skill)], HANJA_LADDER),
  )).length
}

export function buildHanjaChoice(entry: HanjaEntry, entries: HanjaEntry[], attempt = 0): HanjaQuestion {
  const recognition = entry.skill === 'recognition'
  const label = (character: HanjaCharacter) => recognition ? character.glyph : hunEum(character)
  const answer = label(entry.character)
  const rng = makeRng(hashString(`${entry.key}:${attempt}`))
  // 같은 훈음이 있는 글자는 양방향 모두 오답에서 제외한다.
  const pool = [...new Set(entries.filter(({ character }) =>
    character.id !== entry.character.id && hunEum(character) !== hunEum(entry.character),
  ).map(({ character }) => label(character)))].filter((value) => value !== answer)
  if (pool.length < 3) throw new Error(`한자 보기 부족: ${entry.key}`)
  return {
    kind: 'hanja-choice', entry, answer,
    prompt: recognition ? hunEum(entry.character) : entry.character.glyph,
    options: shuffled([answer, ...shuffled(pool, rng).slice(0, 3)], rng),
  }
}
