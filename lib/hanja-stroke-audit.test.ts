import assert from 'node:assert/strict'
import test from 'node:test'
import { auditStrokes, parseCandidates } from '../scripts/hanja-stroke-audit.ts'

const character = { glyph: '山', strokes: 3, readingGrade: '8' }
const candidate = { character: '山', strokes: ['M0 0 L1 1', 'M1 1 L2 2', 'M2 2 L3 3'],
  medians: [[[0, 0], [1, 1]], [[1, 1], [2, 2]], [[2, 2], [3, 3]]] }

test('후보의 획수와 좌표가 맞아도 공식 검토 없이 재생을 허용하지 않는다', () => {
  const report = auditStrokes([character], [candidate], [])
  assert.equal(report.entries[0].candidateStatus, 'needs-official-review')
  assert.equal(report.entries[0].playback, 'unavailable')
  assert.equal(report.entries[0].evidence, null)
})

test('후보 누락, 획수 불일치, 잘못된 좌표, 유사 문자를 구분한다', () => {
  assert.equal(auditStrokes([character], [], []).entries[0].candidateStatus, 'missing')
  assert.equal(auditStrokes([{ ...character, strokes: 4 }], [candidate], []).entries[0].candidateStatus, 'count-mismatch')
  assert.equal(auditStrokes([character], [{ ...candidate, medians: [[[NaN, 0]]] }], []).entries[0].candidateStatus, 'invalid')
  assert.equal(auditStrokes([{ ...character, glyph: '⼭' }], [candidate], []).entries[0].candidateStatus, 'missing')
  assert.throws(() => auditStrokes([character], [candidate, candidate], []), /duplicate/)
  assert.throws(() => parseCandidates(new TextEncoder().encode('{}')), /hash changed/)
})

test('검증된 자체 경로와 후보의 검토 상태를 별도로 유지한다', () => {
  const verified = { glyph: '山', paths: ['a', 'b', 'c'], sourceImage: 'BIN0016.gif', sourceRow: 18 }
  const entry = auditStrokes([character], [candidate], [verified]).entries[0]
  assert.equal(entry.playback, 'verified')
  assert.equal(entry.candidateStatus, 'needs-official-review')
  assert.deepEqual(entry.evidence, { image: 'BIN0016.gif', row: 18 })
  assert.throws(() => auditStrokes([{ ...character, strokes: 4 }], [candidate], [verified]), /mismatch/)
})
