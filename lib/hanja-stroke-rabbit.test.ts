import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import test from 'node:test'
import {hanjaStrokeData} from './hanja-strokes.ts'
import {normalizeKanjiVGPath} from './hanja-stroke-kanjivg-geometry.ts'

const candidate = JSON.parse(readFileSync(new URL('../docs/hanja-mang-yu-rabbit-2026-09-21/candidate.json', import.meta.url), 'utf8'))
test('兎는 배정표 7획을 보존하며 검토한 순서의 사전 8획을 재생한다', () => {
  const data = hanjaStrokeData({glyph: '兎', strokes: 7})
  assert.ok(data && 'variant' in data)
  assert.deepEqual(data.variant, {catalogStrokes: 7, playbackStrokes: 8, form: '사전'})
  assert.deepEqual(data.paths, [1,2,3,5,4,6,7,8].map(i => normalizeKanjiVGPath(candidate.paths[i-1])))
  assert.equal(data.paths.length, 8)
  assert.equal(data.verificationSource, 'ehanja-crosschecked')
  assert.equal(data.pathsSha256, createHash('sha256').update(JSON.stringify(data.paths)).digest('hex'))
  assert.equal(data.sourceReference.dictionarySvgSha256, candidate.dictionary.sha256)
  const bundled = JSON.parse(readFileSync(new URL('../public/hanja-strokes/dictionary-reviewed-special2-rabbit-variant.json', import.meta.url), 'utf8'))[0]
  assert.equal(bundled.geometryLicense.name, 'CC-BY-SA-3.0')
  assert.deepEqual(bundled.paths, data.paths)
  assert.equal(hanjaStrokeData({glyph: '兎', strokes: 8}), null)
})
