import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { normalizeKanjiVGPath } from './hanja-stroke-kanjivg-geometry.ts'
import { hanjaStrokeData } from './hanja-strokes.ts'
import runtime from '../public/hanja-strokes/dictionary-reviewed-special2-kanjivg-variants.json' with { type: 'json' }

const dir = '../docs/hanja-special2-kanjivg-review-2026-09-21/'
const bytes = (path: string) => readFileSync(new URL(path, import.meta.url))
const read = (path: string) => JSON.parse(bytes(path).toString())
const sha = (value: string | Buffer) => createHash('sha256').update(value).digest('hex')
const proposals = read(dir + 'proposals.json')
const findings = read(dir + 'findings.json')
const originals = read('../docs/hanja-special2-alternatives-2026-09-21/candidates.json')
type SourceEntry = { id: string; strokes: {path: string}[] }
type Proposal = { id: string; glyph: string; strokes: number; catalogStrokes: number; svgSha256: string;
  dictionaryToCandidate: number[]; dictionary: {url: string; sha256: string}; url: string; revision: string }

test('KanjiVG 좌표 변환은 상대·절대 곡선과 음수 좌표를 보존한다', () => {
  assert.equal(normalizeKanjiVGPath('M109,54.5c-10.9,0 0,10.9 21.8,10.9s10.9,0 21.8,-10.9'),
    'M 100 50 c -10 0 0 10 20 10 s 10 0 20 -10')
  assert.equal(normalizeKanjiVGPath('M0 0C0 109 109 109 109 0'), 'M 0 0 C 0 100 100 100 100 0')
  for (const path of ['', 'M0', 'M0 0c1 2', 'M0 0A1 1 0 0 0 1 1', 'MNaN 0', 'M0 0Z']) {
    assert.throws(() => normalizeKanjiVGPath(path))
  }
})

for (const entry of runtime) {
  test(`${entry.glyph}: 원본 65획 중 해당 곡선의 명령·제어점·순서와 라이선스를 보존한다`, () => {
    const proposal: Proposal = proposals.entries.find((p: Proposal) => p.glyph === entry.glyph)
    const original: SourceEntry = originals.entries.find((e: SourceEntry) => e.id === proposal.id)
    assert.deepEqual(entry.sourceStrokeIndices, proposal.dictionaryToCandidate)
    const indices = Array.from({length: proposal.strokes}, (_, i) => i + 1)
    assert.deepEqual([...entry.sourceStrokeIndices].sort((a,b) => a-b), indices)
    for (const [i, path] of entry.paths.entries()) {
      const source = original.strokes[entry.sourceStrokeIndices[i] - 1].path
      assert.equal(path, normalizeKanjiVGPath(source))
      // Independent numeric comparison includes absolute and relative control/end points.
      assert.deepEqual(path.match(/[MCcs]/g), source.match(/[MCcs]/g))
      const numbers = (s: string) => (s.match(/[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g) ?? []).map(Number)
      const before = numbers(source), after = numbers(path)
      assert.equal(after.length, before.length)
      for (let n = 0; n < before.length; n++) assert.ok(Math.abs(after[n] * 109 / 100 - before[n]) < 1e-7)
    }
    assert.equal(entry.candidateSha256, proposal.svgSha256)
    assert.equal(entry.geometrySource, proposal.svgSha256)
    assert.equal(entry.pathsSha256, sha(JSON.stringify(entry.paths)))
    assert.equal(entry.sourceReference.dictionarySvgSha256, proposal.dictionary.sha256)
    assert.equal(entry.sourceReference.dictionarySvgUrl, proposal.dictionary.url)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes, indices.join(','))
    for (const key of ['orderReviewSha256', 'geometryReviewSha256', 'directionReviewSha256'] as const) {
      assert.equal(entry.sourceReference[key], sha(bytes(dir + 'findings.json')))
    }
    assert.equal(entry.geometryLicense.name, 'CC-BY-SA-3.0')
    assert.equal(entry.geometryLicense.attribution, originals.attribution)
    assert.equal(entry.geometryLicense.url, originals.licenseUrl)
    assert.equal(entry.geometryLicense.sourceUrl, proposal.url)
    assert.equal(entry.geometryLicense.revision, proposal.revision)
    const character = {glyph: entry.glyph, strokes: proposal.catalogStrokes}
    assert.deepEqual(hanjaStrokeData(character)?.paths, entry.paths)
    assert.equal(hanjaStrokeData({...character, strokes: proposal.strokes}), null)
    assert.equal(findings.entries.find((e: {glyph: string}) => e.glyph === entry.glyph).fullStrokeReviewCompleted, true)
  })
}

test('세 글자 65획만 추가하고 이전 검토와 보류 상태를 보존한다', () => {
  assert.deepEqual(runtime.map(e => e.glyph), [...'纛蘿藺'])
  assert.equal(runtime.reduce((n, e) => n + e.paths.length, 0), 65)
  assert.equal(findings.runtimeApprovalsAdded, 0, 'Historical review remains unchanged')
  assert.equal(hanjaStrokeData({glyph:'鱉', strokes:22}), null)
  assert.equal(hanjaStrokeData({glyph:'宬', strokes:10}), null)
})
