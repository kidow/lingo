import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { expandKage,kagePaths } from '../hanja-goal-glyphwiki-batch26-2026-09-22/convert.mjs'
import { reviewedGroups,buildKwiPaths } from './convert.mjs'
const fixture=data=>({root:'shape',records:{shape:{data}}})
const corner='1:0:2:38:24:100:24$2:22:7:100:24:70:77:12:108'
const source=JSON.parse(readFileSync(new URL('../../public/hanja-strokes/glyphwiki/8475.json',import.meta.url)))
const recipe=JSON.parse(readFileSync(new URL('./findings.json',import.meta.url))).entries[0]
test('curve caps remain opt-in and corner fragments cannot escape as pen strokes',()=>{
  for(const row of [corner,'2:7:8:31:34:51:47:59:62','2:32:7:101:115:105:174:37:184']){
    assert.throws(()=>expandKage(fixture(row)))
  }
  assert.throws(()=>kagePaths(fixture(corner),[1,2],{allowReviewedCurves:true}),/grouping/)
  assert.throws(()=>reviewedGroups(fixture(corner),[[1],[2]],[1,2]),/Unpaired/)
})
test('only declared matching adjacent corner is connected without new points',()=>{
  assert.deepEqual(reviewedGroups(fixture(corner),[[1,2]],[1]),
    ['M 19 12 L 50 12 Q 35 38.5 6 54'])
})
test('gaps, swapped direction, hooks and arbitrary merging are rejected',()=>{
  for(const row of [
    corner.replace('22:7:100:24','22:7:99:24'),
    corner.replace('70:77:12:108','110:77:12:108'),
    corner.replace('22:7','22:4'),
    corner.replace('1:0:2','1:0:0'),
    corner.replace('38:24:100:24','100:24:38:24'),
  ]) assert.throws(()=>reviewedGroups(fixture(row),[[1,2]],[1]))
  assert.throws(()=>reviewedGroups(fixture(corner),[[2,1]],[1]))
  assert.throws(()=>reviewedGroups(fixture(corner),[[1,2],[2]],[1,2]))
  assert.throws(()=>reviewedGroups(fixture(corner),[[1,2]],[1,1]))
})
test('same-glyph replacement is exact and preserves input',()=>{
  const before=JSON.stringify(source)
  const paths=buildKwiPaths(source,recipe)
  assert.equal(paths.length,13)
  assert.equal(paths[12],'M 53 68.9 Q 67 84.9 86 90.1')
  assert.equal(paths[4],'M 19 31.86 L 50 31.86 Q 35 52.53 6 64.62')
  assert.equal(JSON.stringify(source),before)
})
test('other glyphs and unreviewed replacement positions are rejected',()=>{
  const wrong=structuredClone(source);wrong.records[wrong.alternateRoot].related='U+7678'
  assert.throws(()=>buildKwiPaths(wrong,recipe),/same whole glyph/)
  for(const replacement of [{stroke:12,root:'u8475-var-003',primitive:14},
    {stroke:13,root:'u7678-var-001',primitive:14},
    {stroke:13,root:'u8475-var-003',primitive:13}]){
    assert.throws(()=>buildKwiPaths(source,{...recipe,replacement}))
  }
})
test('unsupported hooks, component stretch and cyclic dependencies remain rejected',()=>{
  assert.throws(()=>expandKage(fixture('2:32:4:100:20:100:80:90:100'),{allowReviewedCurves:true}))
  assert.throws(()=>expandKage({root:'r',records:{r:{data:'99:1:0:0:0:200:200:shape'},shape:{data:corner}}},{allowReviewedCurves:true}))
  assert.throws(()=>expandKage({root:'r',records:{r:{data:'99:0:0:0:0:200:200:r'}}},{allowReviewedCurves:true}),/Cyclic/)
})
