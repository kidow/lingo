import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {makeReviewedU802dKTailSourceContext,reviewedU802dKTailFrame,REVIEWED_U802dK_UP_TAIL} from './hanja-stroke-original-up-tail-u802d-k.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u802d-k-2026-10-24/fixtures.json',import.meta.url),'utf8')).u802dK
test('耭16 original MC/body4P UP1P source partition and finite frame only',()=>{
 const c=makeReviewedU802dKTailSourceContext(f.fullProof,f.identity,f.strokes);assert(c);const s=f.strokes[15][0],share=REVIEWED_U802dK_UP_TAIL.bodyShare
 for(const p of [0,1e-6,.03,share-1e-10,share,share+1e-10,.99,1]){const x=reviewedU802dKTailFrame(c,s,p);assert.equal(x.bodyOutline+' '+x.tailOutline,s.outline);assert(Number.isFinite(x.tailRect.y));assert.equal(x.tailRect.y+x.tailRect.height,87.5);assert.equal(x.tailRect.x,87.5);assert.equal(x.tailRect.width,4);assert(x.bodyProgress>=0&&x.bodyProgress<=1&&x.tailProgress>=0&&x.tailProgress<=1)}
 for(const k of ['outline','revealPath','weight','revealWidth','bounds']){const z=structuredClone(f.strokes);if(k==='bounds')z[15][0][k][0]+=.01;else if(typeof z[15][0][k]==='number')z[15][0][k]+=.01;else z[15][0][k]+=' ';assert.equal(makeReviewedU802dKTailSourceContext(f.fullProof,f.identity,z),null)}
 for(const p of [NaN,Infinity,-.01,1.01])assert.throws(()=>reviewedU802dKTailFrame(c,s,p))
})
