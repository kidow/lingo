import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { boxPaths } from '../hanja-goal-glyphwiki-batch33-2026-09-22/convert.mjs'
const fixture=data=>({root:'shape',records:{shape:{data}}})
const options={allowCurves:true}
test('mixed curves remain opt-in',()=>{
  for(const row of ['2:7:8:54:42:70:55:76:75','2:0:7:140:44:133:59:116:83','1:0:32:100:13:100:37']){
    assert.throws(()=>boxPaths(fixture(row),[[1]],[1]))
  }
})
test('reviewed quadratic and vertical shapes preserve all declared points',()=>{
  assert.deepEqual(boxPaths(fixture('2:7:8:54:42:70:55:76:75'),[[1]],[1],options),['M 27 21 Q 35 27.5 38 37.5'])
  assert.deepEqual(boxPaths(fixture('1:0:32:100:13:100:37'),[[1]],[1],options),['M 50 6.5 L 50 18.5'])
})
test('hooks, unreviewed caps and reverse connected lines stay rejected',()=>{
  for(const row of ['2:7:4:54:42:70:55:76:75','2:32:7:54:42:70:55:76:75','2:7:0:54:42:70:55:76:75','1:0:32:100:37:100:13']){
    assert.throws(()=>boxPaths(fixture(row),[[1]],[1],options))
  }
})
test('curves cannot be merged with arbitrary neighbors',()=>{
  assert.throws(()=>boxPaths(fixture('2:7:8:54:42:70:55:76:75$1:0:0:76:75:100:75'),[[1,2]],[1],options))
  assert.throws(()=>boxPaths(fixture('1:2:2:10:20:50:20$2:22:7:50:20:40:40:20:60'),[[1,2]],[1],options))
})
test('whole 菩 reproduces12 paths without changing source',()=>{
  const source=JSON.parse(readFileSync(new URL('../../public/hanja-strokes/glyphwiki/83e9.json',import.meta.url)))
  const review=JSON.parse(readFileSync(new URL('./findings.json',import.meta.url))).entries[0]
  const before=JSON.stringify(source),paths=boxPaths(source,review.groups,review.sourceStrokeIndices,options)
  assert.equal(paths.length,12)
  assert.equal(paths[6],'M 27 39.424 Q 35 45.56 38 55')
  assert.equal(paths[10],'M 27 68.4 L 73 68.4 L 73 88')
  assert.equal(JSON.stringify(source),before)
})
test('width2 retains measured internal gaps and right-side contact',()=>{
  const reviewed=JSON.parse(readFileSync(new URL('../../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch34.json',import.meta.url)))
  const entry=reviewed[0],width=entry.strokeWidth
  const points=entry.paths.map(p=>p.match(/-?\d+(?:\.\d+)?/g).map(Number))
  const upperY=points[5][1],bottomY=points[8][1]
  assert.equal(width,2)
  assert(points[6][1]-upperY>width)
  assert(points[7][1]-upperY>width)
  assert(bottomY-points[6].at(-1)>width)
  assert.equal(points[7].at(-1),bottomY)
})
