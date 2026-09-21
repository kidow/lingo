import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ENDPOINT, ROUTES, makeRequest, reviewCandidates, validateResponse } from './hanja-jev-review.mjs'

const input = { candidates: [{ id: 'candidate', glyph: '薪', observations: ['All17 paths exist; directions and cumulative forms have not been visually reviewed.'], references: ['https://glyphwiki.org/wiki/u85aa-k@11'] }] }
const response = () => ({ model: 'jev-test', answers: { candidate: { type: 'choice', choice: 'visual_review', confidence: 0.9, probabilities: Object.fromEntries(Object.keys(ROUTES).map(k => [k, k === 'visual_review' ? 1 : 0])) } }, usage: { input_tokens: 200, output_tokens: 40 } })

test('real workflow request uses a fixed endpoint, bounded text and independent typed questions', async () => {
  const result = await reviewCandidates(input, { apiKey: 'test-secret', fetchImpl: async (url, options) => {
    assert.equal(url, ENDPOINT)
    assert.equal(options.redirect, 'error')
    assert.equal(options.headers.Authorization, 'Bearer test-secret')
    const sent = JSON.parse(options.body)
    assert.equal(sent.model, 'jev-latest')
    assert.equal(sent.questions.candidate.type, 'choice')
    assert.match(sent.questions.candidate.instructions, /candidates\[0\]/)
    assert.ok(sent.questions.candidate.criteria.insufficient_evidence)
    return { ok: true, json: async () => response() }
  } })
  assert.equal(result.advisoryOnly, true)
  assert.equal(result.runtimeApproval, false)
  assert.equal(result.answers.candidate.choice, 'visual_review')
  assert.doesNotMatch(JSON.stringify(result), /test-secret/)
})

test('missing credentials, graphics and ambiguous candidate IDs fail before any API request', async () => {
  let requests = 0
  await assert.rejects(reviewCandidates(input, { apiKey: '', fetchImpl: async () => { requests++; throw Error() } }), /not configured/)
  assert.equal(requests, 0)
  assert.throws(() => makeRequest({ candidates: [input.candidates[0], input.candidates[0]] }), /unique/)
  assert.throws(() => makeRequest({ candidates: [{ ...input.candidates[0], svg: '<svg/>' }] }), /Unexpected/)
  assert.throws(() => makeRequest({ candidates: [{ ...input.candidates[0], observations: ['<svg>private</svg>'] }] }), /Private graphics/)
})

test('malformed API answers cannot silently become a decision', () => {
  const request = makeRequest(input)
  for (const mutate of [
    r => { delete r.answers.candidate },
    r => { r.answers.candidate.choice = 'approved' },
    r => { r.answers.candidate.confidence = 2 },
    r => { r.answers.candidate.probabilities.visual_review = 0 },
    r => { delete r.usage },
  ]) {
    const r = response(); mutate(r)
    assert.throws(() => validateResponse(r, request), /Invalid|mismatch/)
  }
})

test('network and service failures hide sensitive text and do not retry', async () => {
  let requests = 0
  await assert.rejects(reviewCandidates(input, { apiKey: 'secret', fetchImpl: async () => { requests++; throw Error('secret echoed') } }), e => !e.message.includes('secret') && /no automatic retry/.test(e.message))
  assert.equal(requests, 1)
  await assert.rejects(reviewCandidates(input, { apiKey: 'secret', fetchImpl: async () => ({ ok: false, status: 401, json: async () => { throw Error('must not read body') } }) }), /Jev HTTP 401/)
})
