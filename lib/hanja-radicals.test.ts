import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync } from 'node:fs'
import test from 'node:test'
import type { HanjaCharacter, HanjaRadical } from './hanja.ts'
import { indexCharacters, indexRadicals } from './hanja-radicals.ts'

const root = new URL('../content/hanja/', import.meta.url)
const read = (name: string) => JSON.parse(readFileSync(new URL(name, root), 'utf8'))
const characters = readdirSync(new URL('characters/', root)).filter((f) => f.endsWith('.json'))
  .flatMap((f) => (read(`characters/${f}`) as { characters: HanjaCharacter[] }).characters)
const { radicals } = read('radicals.json') as { radicals: HanjaRadical[] }
const translations = read('radical-translations.json') as Record<string, string>
const assigned = new Set(characters.map((c) => c.glyph))

test('부수 213자는 배정표의 부수와 정확히 같다', () => {
  const expected = new Set(characters.map((c) => c.radical))
  assert.equal(radicals.length, expected.size)
  assert.deepEqual(new Set(radicals.map((r) => r.glyph)), expected)
  assert.equal(new Set(radicals.map((r) => r.glyph)).size, radicals.length)
})

test('배정자가 아닌 부수는 표준국어대사전 명칭과 출처를 가진다', () => {
  for (const radical of radicals) {
    if (assigned.has(radical.glyph)) {
      assert.equal(radical.name, undefined, `${radical.glyph}는 배정자라 명칭이 필요 없다`)
    } else {
      assert.ok(radical.name?.text, `${radical.glyph}에 명칭이 없다`)
      assert.ok(radical.name!.targetCode > 0)
      assert.match(radical.name!.url, /^https:\/\/stdict\.korean\.go\.kr\//)
      assert.match(radical.name!.verifiedAt, /^\d{4}-\d{2}-\d{2}$/)
    }
  }
})

test('說文 원문은 亠·爿만 없고, 있는 것은 모두 해시가 맞고 번역이 있다', () => {
  const missing = radicals.filter((r) => !r.shuowen).map((r) => r.glyph)
  assert.deepEqual(missing, ['亠', '爿'])
  for (const radical of radicals) {
    if (!radical.shuowen) {
      assert.equal(radical.translation, undefined)
      continue
    }
    const { text, sha256, volume, section, url, revisionId } = radical.shuowen
    assert.equal(createHash('sha256').update(text).digest('hex'), sha256, radical.glyph)
    assert.ok(volume >= 1 && volume <= 15 && section.endsWith('部') && revisionId > 0)
    assert.match(url, /^https:\/\/zh\.wikisource\.org\/wiki\//)
    assert.ok(!/\{\{|\[\[|&#\d+;/.test(text), `${radical.glyph} 원문에 위키 문법이 남았다`)
    assert.equal(radical.translation, translations[radical.glyph], `${radical.glyph} 번역이 번역 파일과 다르다`)
    assert.ok(radical.translation, `${radical.glyph} 번역이 없다`)
    assert.ok(!radical.translation!.includes('皆从'), `${radical.glyph} 번역에 상투구가 남았다`)
  }
})

test('부수마다 훈음이나 명칭이 있고, 글자 색인은 호환 한자도 찾는다', () => {
  const index = indexRadicals(radicals, characters)
  for (const radical of radicals) assert.ok(index.get(radical.glyph)?.label, radical.glyph)
  assert.equal(index.get('木')?.label, '나무 목')
  assert.equal(index.get('广')?.label, '엄호')
  const byGlyph = indexCharacters(characters)
  for (const character of characters) {
    assert.equal(byGlyph.get(character.glyph), character)
    for (const alias of character.glyphAliases ?? []) assert.ok(byGlyph.get(alias))
  }
})
