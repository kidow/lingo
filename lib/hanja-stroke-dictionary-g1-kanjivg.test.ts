import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-g1-kanjivg.json' with { type: 'json' }
import { G1_KANJIVG_PINS, loadG1KanjiVGStrokes } from './hanja-stroke-dictionary-g1-kanjivg.ts'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import type { HanjaCharacter } from './hanja.ts'

const dir = new URL('../content/hanja/characters/', import.meta.url)
const catalog: HanjaCharacter[] = readdirSync(dir).filter(p => p.endsWith('.json'))
  .flatMap(p => JSON.parse(readFileSync(new URL(p, dir), 'utf8')).characters)
const sha = (s: string) => createHash('sha256').update(s).digest('hex')

test('饉·睹·燐 50획은 검토된 원본 곡선·순열로 재현되고 런타임에 한 번만 등록된다', () => {
  const reproduced = JSON.parse(execFileSync(process.execPath,
    [fileURLToPath(new URL('../docs/hanja-goal-2026-09-21/build-g1.mjs', import.meta.url))], { encoding: 'utf8' }))
  assert.deepEqual(reviewed, reproduced)
  assert.equal(reviewed.reduce((n, e) => n + e.paths.length, 0), 50)
  for (const pin of G1_KANJIVG_PINS) {
    const character = catalog.find(c => c.glyph === pin.glyph)!
    assert.equal(character.strokes, pin.strokes)
    const data = hanjaStrokeData(character)!
    assert.equal(data.verificationSource, 'ehanja-crosschecked')
    assert.equal(sha(JSON.stringify(data.paths)), pin.pathsSha256)
    assert.deepEqual(data.sourceStrokeIndices, pin.sourceStrokeIndices)
    assert.equal(HANJA_STROKES.filter(e => e.glyph === pin.glyph).length, 1)
  }
  assert.equal(hanjaStrokeData(catalog.find(c => c.glyph === '瀆')!), null)
})

test('필순 순열·출처·라이선스 오염 및 未검토 글자 추가를 거부한다', () => {
  const wrongOrder = structuredClone(reviewed)
  wrongOrder[0].sourceStrokeIndices = Array.from({ length: 20 }, (_, i) => i + 1)
  assert.throws(() => loadG1KanjiVGStrokes(wrongOrder))
  const wrongSource = structuredClone(reviewed)
  wrongSource[0].sourceReference.dictionarySvgSha256 = '0'.repeat(64)
  assert.throws(() => loadG1KanjiVGStrokes(wrongSource))
  const wrongLicense = structuredClone(reviewed)
  wrongLicense[0].geometryLicense.spdx = 'unknown'
  assert.throws(() => loadG1KanjiVGStrokes(wrongLicense))
  assert.throws(() => loadG1KanjiVGStrokes([...reviewed, reviewed[0]]))
})
