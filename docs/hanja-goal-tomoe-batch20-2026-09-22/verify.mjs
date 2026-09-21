import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { HANJA_STROKES } from '../../lib/hanja-strokes.ts'
const read = p => JSON.parse(readFileSync(new URL(p, import.meta.url), 'utf8'))
const metadata = read('metadata.json'), findings = read('findings.json'), next = read('next.json')
const code = "import sys,runpy,json;sys.dont_write_bytecode=True;d=runpy.run_path(" + JSON.stringify(new URL('serve.py', import.meta.url).pathname) + ");print(json.dumps([{'glyph':e['glyph'],'strokes':len(e['strokes'])} for e in d['fetch_public']()],ensure_ascii=False))"
const actual = JSON.parse(execFileSync('python3', ['-c', code], { encoding: 'utf8', timeout: 60000 }))
assert.equal(actual.length, 3)
assert.equal(actual.reduce((n,e) => n + e.strokes, 0), 45)
for (const m of metadata) {
  const f = findings.entries.find(e => e.glyph === m.glyph)
  assert.equal(actual.find(e => e.glyph === m.glyph).strokes, m.candidateStrokes)
  assert.equal(m.candidateStrokes, m.dictionary.strokes)
  assert.deepEqual(f.reviewedStrokes, Array.from({length:m.candidateStrokes},(_,i)=>i+1))
  assert.equal(f.cumulativeStatesReviewed, true)
  assert.equal(f.finalFormReviewed, true)
  assert.equal(f.decision, 'hold')
  assert(f.blockers.length && f.release && f.priorReview)
  assert.equal(HANJA_STROKES.some(e => e.glyph === m.glyph), false)
}
assert.equal(next.remainingCountMatched.length, 14)
assert.equal(new Set(next.remainingCountMatched.map(e=>e.glyph)).size,14)
assert(next.remainingCountMatched.every(e=>!metadata.some(m=>m.glyph===e.glyph)))
assert(next.firstBatch.every(g=>next.remainingCountMatched.some(e=>e.glyph===g)))
console.log(JSON.stringify({passed:true,publicSourceAndPointHashes:true,normalizedPathHashes:3,domesticVisualSteps:45,newRuntimeGlyphs:0,nextCountMatchedGlyphs:14}))
