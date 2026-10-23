import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {reviewedU8fc5Context,reviewedU8fc5Policy,REVIEWED_U8FC5_INPUT_SHA256,REVIEWED_U8FC5_PROOFS} from './hanja-stroke-start-caps-u8fc5.ts'
import {reviewedU8fc5TailContext,reviewedU8fc5TailFrame,REVIEWED_U8FC5_UP_TAIL} from './hanja-stroke-original-up-tail-u8fc5.ts'
const clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x))
const fixture=JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-qb-u8fc5-vs2-source-experiment-2026-10-19/fixtures.json',import.meta.url),'utf8'))['u8fc5-ue0102']
const strokes=fixture.strokes
test('迅 exact original eight masks select separate L/Q/C start certificates; tampered source fails closed',()=>{
  for(const[p,h]of Object.entries(REVIEWED_U8FC5_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+p,import.meta.url))).digest('hex'),h)
  assert.equal(createHash('sha256').update(JSON.stringify(strokes)).digest('hex'),'780347f088e4ec9baeba17018b1c64c7be9538ffd5da3cd424d326968cd3d8e7')
  const c=reviewedU8fc5Context(strokes);assert(c)
  const policies=strokes.flatMap((masks:any[],p:number)=>masks.map((s:any,m:number)=>{const policy=reviewedU8fc5Policy(c,p,m);assert(policy);assert.deepEqual(policy.segment,s);return policy}))
  assert.deepEqual(policies.map((p:any)=>p.certificate.syntax),['MLQ','MQ','MQ','MQ','MQ','MLL','MQ','MC'])
  assert.equal(REVIEWED_U8FC5_PROOFS.length,8)
  assert.equal(policies[7].certificate.K,'3/35');assert.equal(policies[0].certificate.firstLegLength,'81/2')
  assert.equal(reviewedU8fc5Policy({...c},0,0),null)
  let negatives=0
  for(let p=0;p<strokes.length;p++)for(let m=0;m<strokes[p].length;m++)for(const key of Object.keys(strokes[p][m])){const q=clone(strokes);if(key==='bounds')q[p][m][key][0]+=.01;else if(typeof q[p][m][key]==='number')q[p][m][key]+=.01;else q[p][m][key]+=' ';assert.equal(reviewedU8fc5Context(q),null);negatives++}
  let reads=0;const accessor=clone(strokes);Object.defineProperty(accessor[0][0],'weight',{enumerable:true,get(){reads++;return 1}});assert.equal(reviewedU8fc5Context(accessor),null);assert.equal(reads,0)
  console.log(JSON.stringify({newGuardTargets:8,materialNegatives:negatives,mathRerun:0,nativeApproval:false}))
})
test('迅 original UP reveal phase keeps one original ink and original eight source masks',()=>{
  const c=reviewedU8fc5TailContext(strokes);assert(c);const s=strokes[0][0],share=REVIEWED_U8FC5_UP_TAIL.bodyShare
  const points=[0,1e-6,share/2,share,share+(1-share)/2,1-1e-6,1]
  const frames=points.map(p=>reviewedU8fc5TailFrame(c,s,p))
  assert.deepEqual(frames.map(f=>f.phase),['empty','body','body','body','tail','tail','complete'])
  for(const f of frames){assert.equal(f.bodyOutline+' '+f.tailOutline,s.outline);assert.equal(f.originalMaskCount,8);assert.equal(f.paintOriginalInkOnce,true);assert(f.tailRect.y>=65&&f.tailRect.y<=78);assert(f.tailRect.height>=0&&f.tailRect.height<=13)}
  assert.equal(frames[3].bodyProgress,1);assert.equal(frames[3].tailProgress,0);assert.equal(frames[6].tailProgress,1)
  assert.equal(REVIEWED_U8FC5_UP_TAIL.bodyWeight,s.weight);assert.equal(REVIEWED_U8FC5_UP_TAIL.derivedSourceMasks,0)
  assert.throws(()=>reviewedU8fc5TailFrame({...c},s,.5));assert.throws(()=>reviewedU8fc5TailFrame(c,{...s,outline:s.outline.replace('L75.5 14.5','L75.6 14.5')},.5))
  for(const p of[-1,NaN,Infinity,1.1])assert.throws(()=>reviewedU8fc5TailFrame(c,s,p))
  assert.deepEqual(strokes,fixture.strokes);assert.equal(REVIEWED_U8FC5_UP_TAIL.nativeApproval,false)
})
