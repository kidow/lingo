import assert from 'node:assert/strict'
import { test } from 'node:test'
import { outlineClip, outlineSegmentProgress } from './hanja-stroke-outline.ts'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch43.json' with { type: 'json' }
import { loadGlyphWikiBatch43Strokes } from './hanja-stroke-dictionary-glyphwiki-batch43.ts'
import { HANJA_STROKES, hanjaStrokeData, STROKE_DURATION, STROKE_GAP, strokeDuration } from './hanja-strokes.ts'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const data = loadGlyphWikiBatch43Strokes(reviewed)[0]
const strokes = data.outlines!

test('芭 8획은 중복 없이 등록되고 배정표 획수를 보존한다', () => {
  assert.equal(hanjaStrokeData({glyph:'芭',strokes:8}),data)
  assert.equal(hanjaStrokeData({glyph:'芭',strokes:7}),null)
  assert.equal(HANJA_STROKES.filter(s=>s.glyph==='芭').length,1)
  assert.equal(strokes.length,8)
  assert.equal(createHash('sha256').update(JSON.stringify(data.paths)).digest('hex'),data.pathsSha256)
  assert.equal(STROKE_DURATION,650/1.5)
  assert.equal(STROKE_GAP,180/1.5)
  assert.equal(strokeDuration(8),8*STROKE_DURATION+7*STROKE_GAP)
})
test('원본 윤곽과 분리된 끝 갈고리를 재현한다', () => {
  const script=fileURLToPath(new URL('../docs/hanja-goal-glyphwiki-batch43-2026-09-22/verify.mjs',import.meta.url))
  const output=execFileSync(process.execPath,[script],{encoding:'utf8'})
  assert.match(output,/"passed":true/)
  assert.deepEqual(strokes[7].map(s=>s.direction),['down','curve','right','up'])
  assert.equal(strokes[7][3].outline,'M88 86.4 L89 73.9 L88 73.9 L85 86.4 Z')
})
test('마지막 갈고리는 가로 몸통 후 아래에서 위로만 드러난다', () => {
  const last=strokes[7],weight=last.reduce((n,s)=>n+s.weight,0)
  const hookStart=1-last[3].weight/weight
  assert.equal(outlineSegmentProgress(last,hookStart-0.001)[3],0)
  const middle=outlineSegmentProgress(last,(hookStart+1)/2)
  assert(middle.slice(0,3).every(p=>p===1))
  assert(Math.abs(middle[3]-.5)<1e-12)
  const clip=outlineClip(last[3],.5)
  assert.equal(clip.x,85);assert.equal(clip.width,4)
  assert(Math.abs(clip.y-80.15)<1e-12);assert(Math.abs(clip.height-6.25)<1e-12)
})
test('구간 경계는 단조 진행하며 다음 구간을 미리 그리지 않는다', () => {
  for(const stroke of strokes){
    let previous=stroke.map(()=>0)
    for(let i=0;i<=1000;i++){
      const values=outlineSegmentProgress(stroke,i/1000)
      values.forEach((p,j)=>{assert(p>=previous[j]);assert(p>=0&&p<=1);if(j&&p>0)assert.equal(values[j-1],1)})
      previous=values
    }
    assert(outlineSegmentProgress(stroke,-1).every(p=>p===0))
    assert(outlineSegmentProgress(stroke,2).every(p=>Math.abs(p-1)<1e-12))
  }
})
test('획·구간·방향·갈고리·출처 변조를 거부한다', () => {
  for(const modify of [
    (e:typeof reviewed[number])=>{e.outlines[7].pop()},
    (e:typeof reviewed[number])=>{e.outlines[7][3].direction='down'},
    (e:typeof reviewed[number])=>{e.outlines[7][3].weight=0},
    (e:typeof reviewed[number])=>{e.outlines[4].reverse()},
    (e:typeof reviewed[number])=>{e.paths.pop()},
    (e:typeof reviewed[number])=>{e.sourceReference.dictionarySvgSha256='0'.repeat(64)},
    (e:typeof reviewed[number])=>{e.geometryLicense.spdx='unverified'},
  ]){const changed=structuredClone(reviewed);modify(changed[0]);assert.throws(()=>loadGlyphWikiBatch43Strokes(changed))}
  assert.throws(()=>loadGlyphWikiBatch43Strokes([...reviewed,...reviewed]))
})
