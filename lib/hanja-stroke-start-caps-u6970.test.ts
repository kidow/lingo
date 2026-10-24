import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {makeReviewedU6970SourceContext,reviewedU6970Context,reviewedU6970Policy,REVIEWED_U6970_SOURCE,REVIEWED_U6970_INPUT_SHA256} from './hanja-stroke-start-caps-u6970.ts'
const fixture=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u6970-2026-10-25/fixtures.json',import.meta.url),'utf8')).u6970
const clone=<T>(v:T):T=>JSON.parse(JSON.stringify(v))
test('楰 exact whole context binds three independently certified masks only',()=>{
 for(const[path,expected]of Object.entries(REVIEWED_U6970_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+path,import.meta.url))).digest('hex'),expected)
 const context=makeReviewedU6970SourceContext(fixture.fullProof,fixture.identity,fixture.strokes)
 assert.ok(context);assert.equal(context,reviewedU6970Context(fixture.strokes))
 const reversed=Object.fromEntries(Object.entries(fixture.fullProof).reverse());assert.equal(makeReviewedU6970SourceContext(reversed,fixture.identity,fixture.strokes),context)
 for(let p=0;p<13;p++)for(let m=0;m<fixture.strokes[p].length;m++){
  const policy=reviewedU6970Policy(context,p,m)
  assert.equal(!!policy,m===0&&[2,3,4].includes(p))
  if(policy){assert.deepEqual(policy.segment,fixture.strokes[p][m]);assert.equal(policy.certificate.initialArcMax,7);assert.equal(policy.certificate.T,'1/2');assert.equal(policy.certificate.K,'1/20');assert.equal(policy.kind,'growing-u6970-caps')}
 }
 assert.equal(REVIEWED_U6970_SOURCE.nativeApproval,false);assert.equal(REVIEWED_U6970_SOURCE.runtimeApplied,false)
})
test('楰 changed source, identity, guide, polygons and getters fail closed',()=>{
 const id=clone(fixture.identity);id.sourceRoot='other';assert.equal(makeReviewedU6970SourceContext(fixture.fullProof,id,fixture.strokes),null)
 const proof=clone(fixture.fullProof);proof.trace[0][0].args[0]+=1;assert.equal(makeReviewedU6970SourceContext(proof,fixture.identity,fixture.strokes),null)
 for(const field of ['outline','revealPath','revealWidth','weight']){const s=clone(fixture.strokes);s[2][0][field]=typeof s[2][0][field]==='number'?s[2][0][field]+1:s[2][0][field]+' ';assert.equal(reviewedU6970Context(s),null)}
 const p=clone(fixture.fullProof);Object.defineProperty(p,'groups',{enumerable:true,get(){throw Error('getter must not execute')}});assert.equal(makeReviewedU6970SourceContext(p,fixture.identity,fixture.strokes),null)
 assert.equal(reviewedU6970Policy(null,2,0),null)
})
