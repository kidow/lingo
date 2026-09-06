import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'
import { hanjaGlyphHref } from './hanja-glyph.ts'

const root = new URL('../', import.meta.url)
const assetRoot = new URL('../public/hanja/', import.meta.url)

test('전 5,978자와 부수·예시의 SVG가 존재하고 원본 해시와 일치한다', () => {
  const manifest = JSON.parse(readFileSync(new URL('manifest.json', assetRoot), 'utf8'))
  const folder = new URL('content/hanja/characters/', root)
  const characters = readdirSync(folder).filter((file) => file.endsWith('.json'))
    .flatMap((file) => JSON.parse(readFileSync(new URL(file, folder), 'utf8')).characters)
  assert.equal(new Set(characters.map((character: { glyph: string }) => character.glyph)).size, 5978)
  assert.equal(manifest.primaryCount, 5978)
  assert.equal(manifest.supplementalCount, 45)
  assert.equal(manifest.font.sha256, '77b4b741f864d27f15e90f275b17106dde90b2ad28f82bab72dc95805db5fb42')
  const glyphs = new Set<string>(characters.flatMap((character: { glyph: string; radical: string; example?: { word: string } }) =>
    [character.glyph, ...character.radical, ...(character.example?.word ?? '')]))
  assert.equal(Object.keys(manifest.glyphs).length, glyphs.size)
  assert.equal(readdirSync(assetRoot).filter((file) => file.endsWith('.svg')).length, glyphs.size)
  for (const glyph of glyphs) {
    const file = hanjaGlyphHref(glyph).split('/').at(-1)!.split('#')[0]
    const id = file.slice(0, -4)
    const svg = readFileSync(new URL(file, assetRoot), 'utf8')
    assert.equal(manifest.glyphs[id]?.glyph, glyph)
    assert.equal(createHash('sha256').update(svg).digest('hex'), manifest.glyphs[id].sha256, glyph)
    assert.match(svg, /viewBox="0 0 1000 1000"/)
    assert.match(svg, /id="glyph" fill="currentColor"/)
    assert.match(svg, /<path d="M[^"<>]+"/)
    assert.doesNotMatch(svg, /<(?:text|script|foreignObject|image|use)\b|\b(?:href|style|onload)=|NaN|Infinity/i)
  }
  assert.match(readFileSync(new URL('OFL.txt', assetRoot), 'utf8'), /SIL OPEN FONT LICENSE Version 1.1/)
  assert.match(readFileSync(new URL('NOTICE.txt', assetRoot), 'utf8'), /© 2017-2024 Adobe/)
})

test('SVG 주소는 한 글자의 코드포인트를 그대로 사용한다', () => {
  assert.equal(hanjaGlyphHref('山'), '/hanja/u5c71.svg#glyph')
  assert.equal(hanjaGlyphHref('𠮷'), '/hanja/u20bb7.svg#glyph')
  assert.notEqual(hanjaGlyphHref('金'), hanjaGlyphHref('金'))
  assert.throws(() => hanjaGlyphHref(''))
  assert.throws(() => hanjaGlyphHref('山林'))
})
