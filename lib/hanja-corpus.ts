import g8 from '@/content/hanja/characters/g8.json'
import g72 from '@/content/hanja/characters/g7-2.json'
import g7 from '@/content/hanja/characters/g7.json'
import g62 from '@/content/hanja/characters/g6-2.json'
import g6 from '@/content/hanja/characters/g6.json'
import g52 from '@/content/hanja/characters/g5-2.json'
import g5 from '@/content/hanja/characters/g5.json'
import g42 from '@/content/hanja/characters/g4-2.json'
import g4 from '@/content/hanja/characters/g4.json'
import g32 from '@/content/hanja/characters/g3-2.json'
import g3 from '@/content/hanja/characters/g3.json'
import g2 from '@/content/hanja/characters/g2.json'
import g1 from '@/content/hanja/characters/g1.json'
import special2 from '@/content/hanja/characters/special-2.json'
import special from '@/content/hanja/characters/special.json'
import radicals from '@/content/hanja/radicals.json'
import type { HanjaCharacter, HanjaRadical } from './hanja'
import { indexCharacters, indexRadicals } from './hanja-radicals'

/** 각 파일은 신규 배정자만 가진다. 낮은 급수부터 한 번씩 소개한다. */
const files: { characters: unknown[] }[] = [
  g8, g72, g7, g62, g6, g52, g5, g42, g4, g32, g3, g2, g1, special2, special,
]

export const HANJA_CHARACTERS = files.flatMap((file) => file.characters) as HanjaCharacter[]
export const HANJA_RADICALS = radicals.radicals as HanjaRadical[]
/** 부수 글자 → 부수 항목과 훈음. 카드가 부수 블록을 그릴 때 쓴다 */
export const RADICAL_INDEX = indexRadicals(HANJA_RADICALS, HANJA_CHARACTERS)
/** 글자(호환 한자 포함) → 배정자. 한자어의 글자별 훈음을 찾을 때 쓴다 */
export const CHARACTER_INDEX = indexCharacters(HANJA_CHARACTERS)
