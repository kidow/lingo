import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { expandKage,kagePaths } from '../hanja-goal-glyphwiki-batch26-2026-09-22/convert.mjs'
import { boxPaths } from './convert.mjs'
const fixture=data=>({root:'shape',records:{shape:{data}}})
const pair='1:2:2:50:26:150:26$1:22:23:150:26:150:82'
test('box corners remain opt-in and right corner cannot be a separate pen stroke',()=>{
  assert.throws(()=>expandKage(fixture(pair),{allowConnectionLines:true}))
  assert.throws(()=>kagePaths(fixture(pair),[1,2],{allowConnectionLines:true,allowBoxLines:true}),/grouping/)
  assert.throws(()=>boxPaths(fixture(pair),[[1],[2]],[1,2]),/Unpaired/)
})
test('exact adjacent horizontal/vertical corner retains declared geometry',()=>{
  assert.deepEqual(boxPaths(fixture(pair),[[1,2]],[1]),['M 25 13 L 75 13 L 75 41'])
  assert.deepEqual(boxPaths(fixture('1:12:13:50:26:50:82'),[[1]],[1]),['M 25 13 L 25 41'])
})
test('gap, reverse direction, non-axis lines and unrelated caps remain rejected',()=>{
  for(const row of [
    pair.replace('22:23:150:26','22:23:149:26'),
    pair.replace('50:26:150:26','150:26:50:26'),
    pair.replace('150:26:150:82','150:82:150:26'),
    pair.replace('150:26:150:82','150:26:149:82'),
    pair.replace('22:23','22:24'),
    pair.replace('22:23','22:4'),
  ])assert.throws(()=>boxPaths(fixture(row),[[1,2]],[1]))
})
test('duplicate, omitted and reversed group indices are rejected',()=>{
  for(const [g,o]of [[[[1,2],[2]],[1,2]],[[[1]],[1]],[[[2,1]],[1]],[[[1,2]],[1,1]]]){
    assert.throws(()=>boxPaths(fixture(pair),g,o))
  }
})
test('cross-record adjacency cannot establish a handwriting connection',()=>{
  const source={root:'r',records:{r:{data:'99:0:0:0:0:200:200:a$99:0:0:0:0:200:200:b'},a:{data:pair.split('$')[0]},b:{data:pair.split('$')[1]}}}
  assert.throws(()=>boxPaths(source,[[1,2]],[1]))
})
test('whole 菖 reproduces12 reviewed strokes and leaves source untouched',()=>{
  const source=JSON.parse(readFileSync(new URL('../../public/hanja-strokes/glyphwiki/83d6.json',import.meta.url)))
  const review=JSON.parse(readFileSync(new URL('./findings.json',import.meta.url))).entries[0]
  const before=JSON.stringify(source),paths=boxPaths(source,review.groups,review.sourceStrokeIndices)
  assert.equal(paths.length,12)
  assert.equal(paths[5],'M 25.75 31.044 L 73.25 31.044 L 73.25 53.108')
  assert.equal(paths[9],'M 18.03 64.496 L 80.47 64.496 L 80.47 87.344')
  assert.equal(JSON.stringify(source),before)
})
