import assert from 'node:assert/strict'
import {readFileSync, readdirSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'

const read = file => JSON.parse(readFileSync(new URL(file, import.meta.url)))
const sources = read('sources.json'), candidate = read('candidate.json'), findings = read('findings.json')
const sha = bytes => createHash('sha256').update(bytes).digest('hex')
const paths = svg => [...svg.matchAll(/<path\b(?=[^>]*id="kvg:[^"]+-s\d+")(?=[^>]*d="([^"]+)")[^>]*>/g)].map(m => m[1])
assert.ok(sources.repositories.every(r => r.truncated === false))
assert.equal(sources.proprietaryAssetsSaved, 0)
assert.equal(sources.runtimeApprovalsAdded, 0)
const fetched = new Map()
for (const source of sources.sources) {
  const response = await fetch(source.url)
  assert.equal(response.status, 200)
  const bytes = Buffer.from(await response.arrayBuffer())
  assert.equal(bytes.length, source.bytes)
  assert.equal(sha(bytes), source.sha256)
  const count = source.path.endsWith('.json') ? JSON.parse(bytes).length : paths(bytes.toString()).length
  assert.equal(count, source.strokes)
  fetched.set(source.repo + ':' + source.path, bytes.toString())
}
for (const entry of sources.dictionaryChecks) {
  const response = await fetch(entry.dictionary.url)
  assert.equal(response.status, 200)
  const bytes = Buffer.from(await response.arrayBuffer())
  assert.equal(sha(bytes), entry.dictionary.sha256)
  assert.equal(bytes.length, entry.dictionary.bytes)
  assert.equal((bytes.toString().match(/clip-path=/g) ?? []).length, entry.dictionaryStrokes)
}
// A fork is not independent geometry: compare the actual paths, not XML formatting.
for (const source of sources.sources.filter(s => s.repo === 'Connum/hanzivg')) {
  assert.deepEqual(paths(fetched.get(source.repo + ':' + source.path)), paths(fetched.get('KanjiVG/kanjivg:' + source.path)))
}
const original = fetched.get('KanjiVG/kanjivg:kanji/0514e-Hyougai.svg')
assert.equal(sha(original), candidate.svgSha256)
assert.deepEqual(paths(original), candidate.paths)
assert.equal(candidate.paths.length, 8)
assert.deepEqual(candidate.dictionaryToCandidate, [1, 2, 3, 5, 4, 6, 7, 8])
assert.deepEqual([...candidate.dictionaryToCandidate].sort((a,b) => a-b), [1,2,3,4,5,6,7,8])
const seen = sources.visualReview.visits.filter(v => v.id === candidate.id).flatMap(v => v.pairs)
for (const [i, source] of candidate.dictionaryToCandidate.entries()) assert.ok(seen.some(([left,right]) => left === i+1 && right === source))
assert.equal(findings.entries.filter(e => e.status === 'candidate-reviewed').length, 1)
const copyright = await (await fetch('https://stroke-order.learningweb.moe.edu.tw/page.jsp?ID=52')).text()
assert.ok(copyright.includes('非商業性') && copyright.includes('禁止改作'))
const all = readdirSync(new URL('../../content/hanja/characters/', import.meta.url)).filter(f => f.endsWith('.json'))
  .flatMap(f => read('../../content/hanja/characters/' + f).characters)
for (const glyph of [...'莽萸兎']) assert.equal(hanjaStrokeData(all.find(c => c.glyph === glyph)), null)
const applied = all.filter(c => hanjaStrokeData(c)).length
console.log(JSON.stringify({pass:true,sourceFilesVerified:sources.sources.length,dictionaryPinsVerified:3,
  forkGeometryDuplicate:true,reviewedCandidateCharacters:1,reviewedCandidateStrokes:8,
  runtimeApprovalsAdded:0,runtime:{applied,total:all.length,remaining:all.length-applied}},null,2))
