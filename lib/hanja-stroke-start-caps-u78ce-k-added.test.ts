import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {reviewedU78ceKContext,reviewedU78ceKPolicy,REVIEWED_U78ceK_PROOFS,REVIEWED_U78ceK_SOURCE} from './hanja-stroke-start-caps-u78ce-k.ts'
const fixture=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u78ce-k-2026-10-24/fixtures.json',import.meta.url),'utf8')).u78ceK
test('磎 newly added short MQ8 exact target contract only',()=>{
 const context=reviewedU78ceKContext(fixture.strokes);assert(context);const p=reviewedU78ceKPolicy(context,7,0);assert(p);assert.equal(REVIEWED_U78ceK_SOURCE.counts.targets,10);assert.deepEqual(p.segment,fixture.strokes[7][0]);assert.equal(p.certificate.syntax,'MQ');assert.equal(p.certificate.T,'3/4');assert.equal(p.certificate.K,'1/20');assert.equal(p.certificate.notFullSweepProof,true);
 const proof=REVIEWED_U78ceK_PROOFS.at(-1)!;assert.equal(proof.pen,8);assert.equal(proof.mask,1);assert.equal(proof.lambda,'855625/18721');assert.equal(proof.curvatureMargin,'176335688848619775/419920526039104');assert.equal(proof.chordSquaredMinus49,'22240481/409600');
 const changed=structuredClone(fixture.strokes);changed[7][0].revealPath+=' ';assert.equal(reviewedU78ceKContext(changed),null)
})
