import type { HanjaCharacter, HanjaRadical } from './hanja.ts'

export type RadicalEntry = {
  radical: HanjaRadical
  /** 배정자면 배정표의 훈음(木 → 나무 목), 아니면 사전의 부수 명칭(广 → 엄호) */
  label: string
}

/**
 * 부수 213자를 글자에서 찾을 수 있게 묶는다. 훈음은 저장하지 않고 배정표에서 찾는다
 * (docs/hanja-radical-example-design.md). 둘 다 없는 부수는 없다 — `pnpm test`가 지킨다.
 */
export function indexRadicals(radicals: HanjaRadical[], characters: HanjaCharacter[]): Map<string, RadicalEntry> {
  const byGlyph = new Map(characters.map((character) => [character.glyph, character]))
  return new Map(radicals.map((radical) => {
    const assigned = byGlyph.get(radical.glyph)
    const label = assigned ? `${assigned.hun} ${assigned.eum}` : radical.name?.text ?? ''
    return [radical.glyph, { radical, label }]
  }))
}

/** 한자어의 글자마다 배정표 훈음. 호환 한자로 적힌 글자도 `glyphAliases`로 찾는다. */
export function indexCharacters(characters: HanjaCharacter[]): Map<string, HanjaCharacter> {
  const index = new Map<string, HanjaCharacter>()
  for (const character of characters) {
    index.set(character.glyph, character)
    for (const alias of character.glyphAliases ?? []) if (!index.has(alias)) index.set(alias, character)
  }
  return index
}
