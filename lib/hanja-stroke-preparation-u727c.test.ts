import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {reviewedU727cContext,reviewedU727cPolicy,REVIEWED_U727C_INPUT_SHA256,REVIEWED_U727C_PROOFS} from './hanja-stroke-start-caps-u727c.ts'
import {reviewedU727cFootContext,reviewedU727cFootPolicy,makeReviewedU727cFootSourceContext,REVIEWED_U727c_FOOT_SOURCE} from './hanja-stroke-source-foot-u727c.ts'
const read=(p:string)=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url),'utf8')),sha=(v:unknown)=>createHash('sha256').update(JSON.stringify(v)).digest('hex')
test('牼 new own policy bindings and official33 metadata only; no previous proofs replayed',()=>{
 const f=read('docs/hanja-source-independent-qq-three-u727c-source-experiment-2026-10-23/fixtures.json').u727c
 assert.deepEqual([f.strokes.length,f.strokes.flat().length],[11,14]);assert.equal(sha(f.strokes),'350fc58023412c2aa5e03acf53ed462056a970b0f96265df52c1fcbacc4f29ff')
 const c=reviewedU727cContext(f.strokes);assert(c)
 for(const pen of [1,4,6,7,8]){const p=reviewedU727cPolicy(c,pen-1,0);assert(p);assert.equal(p.id,'u727c-'+pen+'-1');assert.deepEqual(p.segment,f.strokes[pen-1][0]);assert.equal(p.certificate.initialKind,'single-quadratic')}
 assert.equal(reviewedU727cPolicy(c,5,1),null);assert.equal(REVIEWED_U727C_PROOFS.length,5)
 const fc=reviewedU727cFootContext(f.strokes);assert(fc)
 for(const pen of [6,7,8]){const p=reviewedU727cFootPolicy(fc,pen-1,1);assert(p);assert.equal(p.id,'u727c-'+pen+'-2');assert.deepEqual(p.segment,f.strokes[pen-1][1])}
 const id={root:'u727c',file:'../hanja-source-original-full-u727c-2026-10-23/engine-proof.json',fileSHA256:'89859c169dac0332017f79e4c1b39424063e39caa95f3306d972318e0f0702db'}
 assert(makeReviewedU727cFootSourceContext(f.fullProof,id,f.strokes));assert.equal(makeReviewedU727cFootSourceContext(f.fullProof,{...id,root:'u785c'},f.strokes),null)
 const changed=JSON.parse(JSON.stringify(f.strokes));changed[5][1].weight++;assert.equal(reviewedU727cContext(changed),null);assert.equal(reviewedU727cFootContext(changed),null)
 assert.deepEqual(REVIEWED_U727c_FOOT_SOURCE.zeroDrawRawIndices,[4]);assert.equal(REVIEWED_U727c_FOOT_SOURCE.nativeApproved,false)
 for(const [p,h]of Object.entries(REVIEWED_U727C_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+p,import.meta.url))).digest('hex'),h)
 const n=read('docs/hanja-official-media-compare-u727c-2026-10-23/official-temporal-native-review.json')
 assert.equal(n.freshScreens,33);assert.equal(n.strokes,11);assert.deepEqual(n.fractions,[.1,.5,.75]);assert.equal(n.directions.length,11);assert.equal(n.server.stopped,true);assert.equal(n.server.exitCode,130);assert.equal(n.approval.officialMacroDirections,true);assert.equal(n.approval.sourceMapping,false);assert.equal(n.runtimeApplied,false)
 for(const x of [n.config,n.metadata])assert.equal(createHash('sha256').update(readFileSync(new URL('../'+x.path,import.meta.url))).digest('hex'),x.sha256)
})
