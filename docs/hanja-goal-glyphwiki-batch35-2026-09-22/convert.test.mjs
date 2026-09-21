import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { boxPaths } from '../hanja-goal-glyphwiki-batch33-2026-09-22/convert.mjs'
const fixture=data=>({root:'shape',records:{shape:{data}}})
const options={allowCurves:true,allowConnectedVerticals:true}
test('connected vertical heads remain separately opt-in',()=>{
  for(const row of ['1:32:32:57:35:57:151','1:32:0:139:35:139:186']){
    assert.throws(()=>boxPaths(fixture(row),[[1]],[1]))
    assert.throws(()=>boxPaths(fixture(row),[[1]],[1],{allowCurves:true}))
  }
})
test('downward connected verticals preserve both source points',()=>{
  assert.deepEqual(boxPaths(fixture('1:32:32:57:35:57:151'),[[1]],[1],options),['M 28.5 17.5 L 28.5 75.5'])
  assert.deepEqual(boxPaths(fixture('1:32:0:139:35:139:186'),[[1]],[1],options),['M 69.5 17.5 L 69.5 93'])
})
test('reversed, diagonal and hooked connection lines stay rejected',()=>{
  for(const row of ['1:32:32:57:151:57:35','1:32:0:139:186:139:35','1:32:0:139:35:141:186','1:32:4:139:35:139:186']){
    assert.throws(()=>boxPaths(fixture(row),[[1]],[1],options))
  }
})
test('connected lines cannot be guessed into corners',()=>{
  assert.throws(()=>boxPaths(fixture('1:32:0:20:20:20:50$1:0:0:20:50:50:50'),[[1,2]],[1],options))
  assert.throws(()=>boxPaths(fixture('1:2:2:10:20:50:20$1:22:23:51:20:51:60'),[[1,2]],[1],options))
})
test('whole 葺 reproduces13 paths without source mutation',()=>{
  const source=JSON.parse(readFileSync(new URL('../../public/hanja-strokes/glyphwiki/847a.json',import.meta.url)))
  const review=JSON.parse(readFileSync(new URL('./findings.json',import.meta.url))).entries[0]
  const before=JSON.stringify(source),paths=boxPaths(source,review.groups,review.sourceStrokeIndices,options)
  assert.equal(paths.length,13)
  assert.equal(paths[5],'M 27.065 29.12 L 71.435 29.12 L 71.435 42.08')
  assert.equal(paths[8],'M 28.86 50.22 L 28.86 84.092')
  assert.equal(paths[11],'M 11.58 85.552 Q 37.98 83.8 90.3 79.712')
  assert.equal(paths[12],'M 68.22 50.22 L 68.22 94.312')
  assert.equal(JSON.stringify(source),before)
})
test('width1.5 preserves grass gap and ear top connections',()=>{
  const entry=JSON.parse(readFileSync(new URL('../../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch35.json',import.meta.url)))[0]
  const p=entry.paths.map(s=>s.match(/-?\d+(?:\.\d+)?/g).map(Number))
  assert.equal(entry.strokeWidth,1.5)
  assert(p[2][0]-p[0][2]>entry.strokeWidth)
  assert.equal(p[8][1],p[7][1]);assert.equal(p[12][1],p[7][1])
  assert(p[8][0]>p[7][0]&&p[12][0]<p[7][2])
  assert.equal(p[9][0],p[8][0]);assert.equal(p[10][0],p[8][0])
  assert.equal(p[9][2],p[12][0]);assert.equal(p[10][2],p[12][0])
})
