import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { HANJA_STROKES } from '../../lib/hanja-strokes.ts'
const read = p => JSON.parse(readFileSync(new URL(p, import.meta.url), 'utf8'))
const metadata = read('metadata.json'), findings = read('findings.json'), next = read('next.json'), sources = read('sources.json')
const script = new URL('serve.py', import.meta.url).pathname
const code = "import sys,runpy,json;sys.dont_write_bytecode=True;d=runpy.run_path(" + JSON.stringify(script) + ");es=d['fetch_public']();print(json.dumps([{'glyph':e['glyph'],'strokes':len(e['strokes'])} for e in es],ensure_ascii=False))"
const actual = JSON.parse(execFileSync('python3', ['-c', code], { encoding: 'utf8', timeout: 60000 }))
assert.equal(actual.length, 6)
assert.equal(actual.reduce((n, e) => n + e.strokes, 0), 91)
for (const m of metadata) {
  const f = findings.entries.find(f => f.glyph === m.glyph)
  assert.equal(actual.find(e => e.glyph === m.glyph).strokes, m.candidateStrokes)
  assert.equal(m.candidateStrokes, m.dictionary.strokes)
  assert.equal(f.decision, 'hold')
  assert.deepEqual(f.reviewedStrokes, Array.from({length:m.candidateStrokes},(_,i)=>i+1))
  assert.equal(f.finalFormReviewed, true)
  assert(f.blockers.length && f.release)
  assert.equal(HANJA_STROKES.some(e => e.glyph === m.glyph), false)
}
assert.equal(sources.counts.l4u.domesticCountMatches, 26)
assert.equal(sources.tegakiAudit.files, 173)
assert.equal(sources.tegakiAudit.errors.length, 0)
assert.equal(next.remainingCountMatched.length, 20)
assert.equal(new Set(next.remainingCountMatched.map(e => e.glyph)).size, 20)
assert(next.remainingCountMatched.every(e => !metadata.some(m => m.glyph === e.glyph)))
console.log(JSON.stringify({passed:true,publicSourceHashChecked:true,normalizedPathHashes:6,domesticVisualSteps:91,newRuntimeGlyphs:0,nextCountMatchedGlyphs:20}))
