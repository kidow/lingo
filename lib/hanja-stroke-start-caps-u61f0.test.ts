import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {reviewedU61f0Context,reviewedU61f0Policy,REVIEWED_U61F0_INPUT_SHA256,REVIEWED_U61F0_PROOFS,REVIEWED_U61F0_SOURCE} from './hanja-stroke-start-caps-u61f0.ts'
const clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x))
const fixture=JSON.parse(readFileSync(new URL('../docs/hanja-source-cached-order2-u61f0-2026-10-23/fixtures.json',import.meta.url),'utf8'))['u61f0-order2']
const strokes=fixture.strokes
const sha=(x:unknown)=>createHash('sha256').update(JSON.stringify(x)).digest('hex')
test('懰 exact 13 initial certificates preserve 21 source masks and reject changed inputs',()=>{
  for(const[p,h]of Object.entries(REVIEWED_U61F0_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+p,import.meta.url))).digest('hex'),h)
  assert.equal(sha(strokes),REVIEWED_U61F0_SOURCE.geometrySHA256)
  assert.equal(strokes.length,18);assert.equal(strokes.flat().length,21)
  assert.equal(strokes.flat().reduce((n:number,s:any)=>n+(s.outline.match(/M/g)||[]).length,0),46)
  const c=reviewedU61f0Context(strokes);assert(c)
  const targets=[[1,1],[2,1],[4,1],[5,2],[6,1],[7,1],[8,1],[9,1],[10,1],[14,1],[15,1],[16,1],[18,1]]
  const policies=targets.map(([p,m])=>{const v=reviewedU61f0Policy(c,p-1,m-1);assert(v);assert.deepEqual(v.segment,strokes[p-1][m-1]);assert.equal(v.certificate.notRasterProof,true);assert.equal(v.certificate.notFullSweepProof,true);return v})
  assert.equal(policies.length,13);assert.equal(REVIEWED_U61F0_PROOFS.length,13)
  assert.deepEqual(policies.map(p=>p.certificate.syntax),['MQ','MQ','MQ','MQ','MQ','MLQQ','MQ','MQ','MQ','MQ','MQ','MQ','MLQ'])
  for(const[p,m]of [[3,1],[5,1],[7,2],[11,1],[12,1],[13,1],[17,1],[18,2]])assert.equal(reviewedU61f0Policy(c,p-1,m-1),null)
  const expectedOld=[[5,2,'f6a88839a4f441ac2bed6712ca644fb93713d10ea8fb2f94ea42ef12c1ecc6ea'],[7,1,'34651f7dcfbfa1b640725afdedeac3c31f6648fa59eb2903f090634bb640f8f0'],[18,1,'a7efa96633cce23c2ff7adfe720423f9f4524ae68268706f9768e0e45d2c7a34']] as const
  for(const[p,m,h]of expectedOld)assert.equal(sha(strokes[p-1][m-1]),h)
  assert.equal(policies[3].certificate.T,'1/2');assert.equal(policies[3].certificate.K,'1/100')
  assert.equal(policies[5].certificate.firstLegLength,'16.1525');assert.equal(policies[12].certificate.firstLegLength,'78.5')
  assert.equal(reviewedU61f0Policy({...c},0,0),null)
  let negatives=0
  for(let p=0;p<strokes.length;p++)for(let m=0;m<strokes[p].length;m++)for(const key of Object.keys(strokes[p][m])){const q=clone(strokes);if(key==='bounds')q[p][m][key][0]+=.01;else if(typeof q[p][m][key]==='number')q[p][m][key]+=.01;else q[p][m][key]+=' ';assert.equal(reviewedU61f0Context(q),null);negatives++}
  let reads=0;const accessor=clone(strokes);Object.defineProperty(accessor[0][0],'weight',{enumerable:true,get(){reads++;return 1}});assert.equal(reviewedU61f0Context(accessor),null);assert.equal(reads,0)
  const reordered=clone(strokes);[reordered[8],reordered[16]]=[reordered[16],reordered[8]];assert.equal(reviewedU61f0Context(reordered),null)
  assert.equal(REVIEWED_U61F0_SOURCE.newMQCertificates,10);assert.equal(REVIEWED_U61F0_SOURCE.reusedExactCertificates,3)
  assert.equal(REVIEWED_U61F0_SOURCE.nativeInitialApproval,false);assert.equal(REVIEWED_U61F0_SOURCE.runtimeApplied,false)
  console.log(JSON.stringify({newDomainTargets:13,materialNegatives:negatives,accessorReads:reads,oldMathReruns:0,nativeApproval:false}))
})
