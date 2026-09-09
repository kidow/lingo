import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import test from 'node:test'
import { HANJA_STROKES } from './hanja-strokes.ts'
import { comparePaths } from '../scripts/hanja-component-geometry.ts'
import {
  generateDraftReview, parseDraftReviewArgs, renderDraftReviewHtml, type FrozenDrafts,
} from '../scripts/hanja-component-draft-review.ts'
import { TEXTBOOK_REVIEW_REGISTRY } from '../scripts/hanja-stroke-textbook.ts'

const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')

function fixture() {
  // Pin the identity of an approved whole glyph; registry ordering and total coverage may change.
  const reference = HANJA_STROKES.find(entry => entry.glyph === '妙')
  assert.ok(reference?.verificationSource === 'vivasam-high-2022')
  const approved = [structuredClone(reference)]
  const ledger = { ...TEXTBOOK_REVIEW_REGISTRY,
    records: structuredClone(TEXTBOOK_REVIEW_REGISTRY.records.filter(record => record.glyph === '妙')) }
  const original = {
    glyph: '妙', expectedStrokes: reference.paths.length, paths: [...reference.paths].reverse(),
    status: 'candidate-unreviewed' as const, provenance: 'component-derived-unreviewed' as const,
    placements: [], schedule: reference.paths.map((_, index) => ({ instance: 'synthetic', componentStroke: index + 1 })),
    libraryHash: 'a'.repeat(64), rules: ['Synthetic original draft; no new observations.'],
  }
  const frozen: FrozenDrafts = { candidates: { v2: [original,
    { ...structuredClone(original), glyph: '砲', expectedStrokes: 10 }] } }
  return { approved, ledger, frozen }
}

test('reference replacement preserves original draft and binds exact whole-target proof', () => {
  const { frozen, approved, ledger } = fixture()
  const before = JSON.stringify({ frozen, approved, ledger })
  const report = generateDraftReview(frozen, approved, ledger)
  const record = report.records[0]
  assert.equal(record.status, 'reference-guided-whole-target-replacement')
  assert.deepEqual(record.original, frozen.candidates.v2[0])
  assert.equal(record.originalSha256, hash(frozen.candidates.v2[0]))
  assert.deepEqual(record.corrected?.paths, approved[0].paths)
  assert.equal(record.corrected?.pathsSha256, hash(approved[0].paths))
  assert.equal(record.corrected?.runtimeReferenceSha256, hash(approved[0]))
  assert.equal(record.corrected?.reviewRecordSha256, hash(ledger.records[0]))
  assert.deepEqual(record.corrected?.reviewRecord.strokeEndsSeconds, ledger.records[0].strokeEndsSeconds)
  assert.deepEqual(record.beforeComparison, comparePaths(frozen.candidates.v2[0].paths, approved[0].paths))
  assert.equal(report.independentPredictionAccuracy, false)
  assert.equal(JSON.stringify({ frozen, approved, ledger }), before)
  record.original.paths[0] = 'M0 0 L1 1'
  record.corrected!.paths[0] = 'M1 1 L2 2'
  assert.equal(JSON.stringify({ frozen, approved, ledger }), before)
})

test('missing whole-target evidence remains held with no fabricated comparison or approvals', () => {
  const { frozen, approved, ledger } = fixture()
  const report = generateDraftReview(frozen, approved, ledger)
  assert.equal(report.records[1].glyph, '砲')
  assert.equal(report.records[1].status, 'held')
  assert.equal(report.records[1].holdReason, 'missing-whole-target-evidence')
  assert.equal(report.records[1].corrected, null)
  assert.equal(report.records[1].beforeComparison, null)
  assert.deepEqual(report.summary, { originalDrafts: 2, referenceGuidedReplacements: 1, held: 1,
    currentRuntimeApproved: 1, additionalRuntimeApprovals: 0, published: 0 })
})

test('identity, whole count, runtime paths and whole-video observations cannot bypass reference validation', () => {
  for (const change of [
    (data: ReturnType<typeof fixture>) => { data.frozen.candidates.v2[0].expectedStrokes += 1 },
    (data: ReturnType<typeof fixture>) => { data.approved[0].paths = data.approved[0].paths.map(() => 'M1 1 L2 2') },
    (data: ReturnType<typeof fixture>) => { data.ledger.records[0].checks = undefined },
    (data: ReturnType<typeof fixture>) => { data.ledger.records[0].status = 'pending' },
    (data: ReturnType<typeof fixture>) => { data.ledger.records[0].sourceVideo!.url = 'https://example.invalid/fake.mp4' },
  ]) {
    const data = fixture()
    change(data)
    assert.throws(() => generateDraftReview(data.frozen, data.approved, data.ledger))
  }
  const data = fixture()
  assert.throws(() => generateDraftReview(data.frozen, [...data.approved, ...data.approved], data.ledger), /Duplicate whole-target/)
  assert.throws(() => generateDraftReview({ candidates: { v2: [data.frozen.candidates.v2[0], data.frozen.candidates.v2[0]] } }, data.approved, data.ledger), /duplicate draft/)
  const wrongIdentity = [{ ...data.approved[0], glyph: '抄' }]
  assert.equal(generateDraftReview(data.frozen, wrongIdentity, data.ledger).records[0].corrected, null)
})

test('replay pins reject changed frozen originals and changed otherwise valid review notes', () => {
  const data = fixture(), report = generateDraftReview(data.frozen, data.approved, data.ledger)
  assert.deepEqual(generateDraftReview(data.frozen, data.approved, data.ledger, { expectedInput: report.input }), report)
  data.frozen.candidates.v2[0].rules.push('Post-hoc change')
  assert.throws(() => generateDraftReview(data.frozen, data.approved, data.ledger, { expectedInput: report.input }), /input pin mismatch/)
  const other = fixture()
  other.ledger.records[0].notes += ' Changed proof annotation.'
  assert.throws(() => generateDraftReview(other.frozen, other.approved, other.ledger, { expectedInput: report.input }), /input pin mismatch/)
  const video = fixture()
  video.ledger.records[0].sourceVideo!.sha256 = 'a'.repeat(64)
  assert.throws(() => generateDraftReview(video.frozen, video.approved, video.ledger, { expectedInput: report.input }), /input pin mismatch/)
})

test('HTML keeps original and reference panels, escapes data and uses only local replay code', () => {
  const data = fixture(), report = generateDraftReview(data.frozen, data.approved, data.ledger)
  report.limitations.push('<img src=x onerror="alert(1)">')
  report.records[0].original.paths[0] = 'M1 1 L2 2" onload="alert(1)'
  const html = renderDraftReviewHtml(report)
  assert.match(html, /원본 합성 초안/)
  assert.match(html, /승인 참조로 전체 교체/)
  assert.match(html, /독립 합성 예측의 정확도 평가가 아니다/)
  assert.match(html, /&lt;img src=x onerror=&quot;/)
  assert.doesNotMatch(html, /<img src=x|d="M1 1 L2 2" onload=/)
  assert.doesNotMatch(html, /<script[^>]+src=|fetch\(/)
  assert.match(html, /data-replay="draft-0"/)
  assert.match(html, /prefers-reduced-motion/)
})

test('CLI permits a single read-only output or replay flag', () => {
  assert.equal(parseDraftReviewArgs([]), 'summary')
  for (const mode of ['--json', '--html', '--check']) assert.equal(parseDraftReviewArgs([mode]), mode)
  for (const args of [['--write'], ['--json', '--html'], ['--check', '--check']]) assert.throws(() => parseDraftReviewArgs(args))
})
