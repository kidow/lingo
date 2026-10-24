import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {makeReviewedU8adbUe0101SourceContext,reviewedU8adbUe0101Context,reviewedU8adbUe0101Policy,REVIEWED_U8adbUe0101_SOURCE,REVIEWED_U8adbUe0101_INPUT_SHA256} from './hanja-stroke-start-caps-u8adb-ue0101.ts'
const fixture=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u8adb-ue0101-2026-10-25/fixtures.json',import.meta.url),'utf8')).u8adb_ue0101
const clone=<T>(v:T):T=>JSON.parse(JSON.stringify(v))
test('諛 exact whole context binds one independently certified masks only',()=>{
 for(const[path,expected]of Object.entries(REVIEWED_U8adbUe0101_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+path,import.meta.url))).digest('hex'),expected)
 const context=makeReviewedU8adbUe0101SourceContext(fixture.fullProof,fixture.identity,fixture.strokes)
 assert.ok(context);assert.equal(context,reviewedU8adbUe0101Context(fixture.strokes))
 const reversed=Object.fromEntries(Object.entries(fixture.fullProof).reverse());assert.equal(makeReviewedU8adbUe0101SourceContext(reversed,fixture.identity,fixture.strokes),context)
 for(let p=0;p<16;p++)for(let m=0;m<fixture.strokes[p].length;m++){
  const policy=reviewedU8adbUe0101Policy(context,p,m)
  assert.equal(!!policy,m===0&&p===7)
  if(policy){assert.deepEqual(policy.segment,fixture.strokes[p][m]);assert.equal(policy.certificate.initialArcMax,7);assert.equal(policy.certificate.T,'1/2');assert.equal(policy.certificate.K,'1/20');assert.equal(policy.kind,'growing-u8adb-ue0101-caps')}
 }
 assert.equal(REVIEWED_U8adbUe0101_SOURCE.nativeApproval,false);assert.equal(REVIEWED_U8adbUe0101_SOURCE.runtimeApplied,false)
})
test('諛 changed source, identity, guide, polygons and getters fail closed',()=>{
 const id=clone(fixture.identity);id.sourceRoot='other';assert.equal(makeReviewedU8adbUe0101SourceContext(fixture.fullProof,id,fixture.strokes),null)
 const proof=clone(fixture.fullProof);proof.trace[0][0].args[0]+=1;assert.equal(makeReviewedU8adbUe0101SourceContext(proof,fixture.identity,fixture.strokes),null)
 for(const field of ['outline','revealPath','revealWidth','weight']){const s=clone(fixture.strokes);s[7][0][field]=typeof s[7][0][field]==='number'?s[7][0][field]+1:s[7][0][field]+' ';assert.equal(reviewedU8adbUe0101Context(s),null)}
 const p=clone(fixture.fullProof);Object.defineProperty(p,'groups',{enumerable:true,get(){throw Error('getter must not execute')}});assert.equal(makeReviewedU8adbUe0101SourceContext(p,fixture.identity,fixture.strokes),null)
 assert.equal(reviewedU8adbUe0101Policy(null,2,0),null)
})
