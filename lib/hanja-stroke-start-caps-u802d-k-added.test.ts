import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {reviewedU802dKContext,reviewedU802dKPolicy,REVIEWED_U802dK_PROOFS,REVIEWED_U802dK_SOURCE} from './hanja-stroke-start-caps-u802d-k.ts'
const fixture=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u802d-k-2026-10-24/fixtures.json',import.meta.url),'utf8')).u802dK
test('耭 newly added MC16 and short MQ18 exact target contract only',()=>{
 const proofs=REVIEWED_U802dK_PROOFS as readonly Readonly<Record<string,unknown>>[]
 const context=reviewedU802dKContext(fixture.strokes);assert(context);assert.equal(REVIEWED_U802dK_SOURCE.counts.targets,14)
 for(const [pen,syntax,T]of [[16,'MC','1/10'],[18,'MQ','1']] as const){
  const p=reviewedU802dKPolicy(context,pen-1,0);assert(p);assert.equal(p.kind,'growing-u802d-k-caps');assert.deepEqual(p.segment,fixture.strokes[pen-1][0]);assert.equal(p.certificate.syntax,syntax);assert.equal(p.certificate.T,T);assert.equal(p.certificate.K,'1/20');assert.equal(p.certificate.initialArcMax,7);assert.equal(p.certificate.notFullSweepProof,true);
  const changed=structuredClone(fixture.strokes);changed[pen-1][0].revealPath+=' ';assert.equal(reviewedU802dKContext(changed),null)
 }
 assert.deepEqual(proofs.slice(-2).map(x=>[x.pen,x.mask,x.syntax]),[[16,1,'MC'],[18,1,'MQ']]);assert.deepEqual(proofs[12].derivativeYBernstein,['339/2','798/5','150']);assert.equal(proofs[12].curvatureMargin,'28309532724');assert.equal(proofs[13].lambda,'1225/52');assert.equal(proofs[13].curvatureMargin,'30469425/562432');
})
