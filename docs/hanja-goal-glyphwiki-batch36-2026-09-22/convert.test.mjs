import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { boxPaths } from '../hanja-goal-glyphwiki-batch33-2026-09-22/convert.mjs'
const source=JSON.parse(readFileSync(new URL('../../public/hanja-strokes/glyphwiki/8403.json',import.meta.url)))
const review=JSON.parse(readFileSync(new URL('./findings.json',import.meta.url))).entries[0]
const options={allowCurves:true}
test('mixed whole glyph remains opt-in',()=>{
  assert.throws(()=>boxPaths(source,review.groups,review.sourceStrokeIndices))
})
test('all12 source primitives remain separate',()=>{
  assert(review.groups.every(g=>g.length===1))
  assert.deepEqual(review.groups.flat(),Array.from({length:12},(_,i)=>i+1))
  const paths=boxPaths(source,review.groups,review.sourceStrokeIndices,options)
  assert.equal(paths.length,12)
  assert.equal(paths.filter(p=>p.includes(' Q ')).length,4)
})
test('whole glyph reconstruction preserves source and exact normalized points',()=>{
  const before=JSON.stringify(source)
  const paths=boxPaths(source,review.groups,review.sourceStrokeIndices,options)
  const expected=JSON.parse(readFileSync(new URL('../../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch36.json',import.meta.url)))[0]
  assert.deepEqual(paths,expected.paths)
  assert.equal(paths[4],"M 50.25 25.4503 L 50.25 36.4874")
  assert.equal(paths[6],"M 33.335 39.125 Q 27.8625 56.0025 11.445 67.385")
  assert.equal(paths[9],"M 64.18 50.115 Q 77.115 55.2175 83.5825 62.2825")
  assert.equal(JSON.stringify(source),before)
})
test('duplicate order and curve grouping are rejected',()=>{
  const order=review.sourceStrokeIndices.slice();order[3]=order[2]
  assert.throws(()=>boxPaths(source,review.groups,order,options))
  const groups=review.groups.slice(0,6).concat([[7,8]],review.groups.slice(8))
  assert.throws(()=>boxPaths(source,groups,Array.from({length:11},(_,i)=>i+1),options))
})
test('width2 keeps 人 strokes separate from surrounding horizontals',()=>{
  const entry=JSON.parse(readFileSync(new URL('../../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch36.json',import.meta.url)))[0]
  const p=entry.paths.map(s=>s.match(/-?\d+(?:\.\d+)?/g).map(Number))
  assert.equal(entry.strokeWidth,2)
  assert(p[2][0]-p[0][2]>entry.strokeWidth)
  for(const i of [6,8])assert(p[i][1]-p[5][1]>entry.strokeWidth)
  for(const i of [6,7,8,9])assert(p[10][1]-p[i].at(-1)>entry.strokeWidth)
  assert.equal(p[4][3],p[5][1])
  assert(p[11][1]<p[10][1]&&p[11][3]>p[10][1])
})
test('unverified cap changes are rejected',()=>{
  const changed=structuredClone(source)
  changed.records['u20143-03'].data=changed.records['u20143-03'].data.replace('2:7:8','2:7:4')
  assert.throws(()=>boxPaths(changed,review.groups,review.sourceStrokeIndices,options))
})
