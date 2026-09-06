import { isMastered, RUNG_CHOICE, type Ladder, type Progress } from './progress.ts'
import { hashString, makeRng, shuffled } from './random.ts'

/** 한국어문회 읽기 급수. 쓰기 급수나 한자어의 급수로 재사용하지 않는다. */
export type HanjaGrade = '8급' | '7급II' | '7급' | '6급II' | '6급' | '5급II' | '5급'
  | '4급II' | '4급' | '3급II' | '3급' | '2급' | '1급' | '특급II' | '특급'

export const HANJA_GRADES: readonly HanjaGrade[] = [
  '8급', '7급II', '7급', '6급II', '6급', '5급II', '5급', '4급II', '4급',
  '3급II', '3급', '2급', '1급', '특급II', '특급',
]
export type HanjaReading = { hun: string; eum: string }

export type HanjaCharacter = {
  id: string
  glyph: string
  hun: string
  eum: string
  readingGrade: HanjaGrade
  radical: string
  strokes: number
  /** 복수 훈음은 대표 훈음을 포함한 공식 원문 순서다. */
  readings?: HanjaReading[]
  glyphAliases?: string[]
  sourceRow?: number
  sourceHunEum?: string
  sourceGlyph?: string
  /** 검수한 예시만 제공한다. 원자료에 없는 문장을 생성하지 않는다. */
  example?: { word: string; reading: string; meaning: string }
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
export const gradeLabel = (grade: HanjaGrade) => grade.replace('II', 'Ⅱ')
export const hanjaReadings = (character: HanjaCharacter): HanjaReading[] => character.readings ?? [character]
export const isHanja = (item: { key: string }): item is HanjaEntry => 'character' in item

/** 훈의 병기와 다른 음도 인정해, 유효한 답을 오답 보기에 넣지 않는다. */
export function acceptedHanjaAnswers(character: HanjaCharacter): string[] {
  return hanjaReadings(character).flatMap(({ hun, eum }) =>
    [hun, ...hun.split('/')].map((meaning) => `${meaning.trim()} ${eum}`),
  )
}

export function searchHanja(characters: HanjaCharacter[], query: string): HanjaCharacter[] {
  const normalize = (value: string) => value.normalize('NFC').replace(/\s/g, '')
  const term = normalize(query)
  if (!term) return characters
  return characters.filter((character) => [
    character.glyph, ...(character.glyphAliases ?? []), ...acceptedHanjaAnswers(character),
    ...(character.example ? Object.values(character.example) : []),
  ].some((value) => normalize(value).includes(term)))
}

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

// 전체 11,956개 능력을 매 문제마다 다시 급수별로 나누지 않는다.
const pools = new WeakMap<HanjaEntry[], Map<HanjaGrade, HanjaEntry[]>>()

function gradePool(entries: HanjaEntry[], grade: HanjaGrade): HanjaEntry[] {
  let groups = pools.get(entries)
  if (!groups) {
    groups = new Map()
    const seen = new Set<string>()
    for (const item of entries) {
      if (seen.has(item.character.id)) continue
      seen.add(item.character.id)
      const bucket = groups.get(item.character.readingGrade) ?? []
      bucket.push(item)
      groups.set(item.character.readingGrade, bucket)
    }
    pools.set(entries, groups)
  }
  return groups.get(grade) ?? []
}

export function buildHanjaChoice(entry: HanjaEntry, entries: HanjaEntry[], attempt = 0): HanjaQuestion {
  const recognition = entry.skill === 'recognition'
  const label = (character: HanjaCharacter) => recognition ? character.glyph : hunEum(character)
  const answer = label(entry.character)
  const rng = makeRng(hashString(`${entry.key}:${attempt}`))
  const accepted = new Set(acceptedHanjaAnswers(entry.character))
  const candidates = (items: HanjaEntry[]) => items.filter(({ character }) =>
    character.id !== entry.character.id &&
    !acceptedHanjaAnswers(character).some((value) => accepted.has(value)),
  ).map(({ character }) => label(character)).filter((value) => value !== answer)
  // 쉬운 글자에 특급 한자가 오답으로 섞이지 않도록 같은 급수를 우선한다.
  let pool = [...new Set(candidates(gradePool(entries, entry.character.readingGrade)))]
  if (pool.length < 3) pool = [...new Set([...pool, ...candidates(entries)])]
  if (pool.length < 3) throw new Error(`한자 보기 부족: ${entry.key}`)
  return {
    kind: 'hanja-choice', entry, answer,
    prompt: recognition ? hunEum(entry.character) : entry.character.glyph,
    options: shuffled([answer, ...shuffled(pool, rng).slice(0, 3)], rng),
  }
}
