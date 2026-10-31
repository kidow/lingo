import {fixtureEvidenceBytes} from './hanja-stroke-batch-test-types.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {loadGlyphWikiBatch1501Strokes as load,HANJA_DICTIONARY_GLYPHWIKI_BATCH1501_STROKES as expected,GLYPHWIKI_BATCH1501_APPROVAL_REVIEW as approval,GLYPHWIKI_BATCH1501_RUNTIME_APPLIED as applied} from './hanja-stroke-dictionary-glyphwiki-batch1501.ts'
import {makeReviewedU5a93StartsContext} from './hanja-stroke-source-starts-u5a93.ts'
import {makeReviewedU5a93FirstPrefixContext} from './hanja-stroke-source-prefix-u5a93-first.ts'
const json=(p:string)=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url),'utf8'))
const hash=(v:string|Uint8Array)=>createHash('sha256').update(v).digest('hex')
test('1501 preserves reviewed12 exact fields, rejects original order, binds both production factories and evidence',()=>{
 const fixture=json('docs/hanja-source-original-u5a93-2026-10-26/fixtures.json').u5a93
 const bundle=json('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1501.json')
 const perm=[0,1,2,3,4,5,6,7,8,10,9,11],reviewed=perm.map(i=>fixture.strokes[i])
 assert.equal(hash(JSON.stringify(fixture.strokes)),'79aea820e2f76cc4fa9bbe75a4f65fb75bb62c261060b1aa4e2e3bf1e3d71752')
 assert.equal(hash(JSON.stringify(reviewed)),'36c733b72b0aeb002f7a02a51365c5206459a756828a8fef62224c81d4b04485')
 assert.deepEqual(bundle[0].outlines,reviewed);assert.strictEqual(load(bundle),expected);assert.equal(applied,true)
 assert.ok(makeReviewedU5a93StartsContext(fixture.fullProof,fixture.identity,bundle[0].outlines))
 assert.ok(makeReviewedU5a93FirstPrefixContext(fixture.fullProof,fixture.identity,bundle[0].outlines))
 assert.equal(makeReviewedU5a93StartsContext(fixture.fullProof,fixture.identity,fixture.strokes),null)
 assert.equal(makeReviewedU5a93FirstPrefixContext(fixture.fullProof,fixture.identity,fixture.strokes),null)
 const original=structuredClone(bundle);original[0].outlines=fixture.strokes;assert.throws(()=>load(original))
 const reordered=JSON.parse(JSON.stringify(bundle,(_k,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.entries(v).reverse()):v));assert.strictEqual(load(reordered),expected)
 for(const key of ['outline','bounds','direction','weight','revealPath','revealWidth']){const changed=structuredClone(bundle);delete changed[0].outlines[0][0][key];assert.throws(()=>load(changed))}
 const extra=structuredClone(bundle);extra[0].extra=1;assert.throws(()=>load(extra));const sym=structuredClone(bundle);sym[0][Symbol('extra')]=1;assert.throws(()=>load(sym));const inherited=structuredClone(bundle);Object.setPrototypeOf(inherited[0],{extra:1});assert.throws(()=>load(inherited))
 assert.ok(Object.isFrozen(expected));assert.ok(Object.isFrozen(expected[0].outlines))
 const review=json(approval.path);assert.equal(hash(fixtureEvidenceBytes(approval.path,approval.SHA256,evidencePath=>readFileSync(new URL('../'+evidencePath,import.meta.url)))),approval.SHA256);assert.equal(review.approval.registrationAuthorized,true);assert.equal(review.approval.runtimeApplied,true)
 for(const pin of [...review.nativeEvidence,review.sourceFixture,review.actualFull5,review.orderManifest])assert.equal(hash(fixtureEvidenceBytes(pin.path,pin.SHA256,evidencePath=>readFileSync(new URL('../'+evidencePath,import.meta.url)))),pin.SHA256,pin.path)
 for(const [path,sha]of Object.entries(review.inputSHA256))assert.equal(hash(fixtureEvidenceBytes(path,sha,evidencePath=>readFileSync(new URL('../'+evidencePath,import.meta.url)))),sha,path)
 const publicGlyph=json('public/hanja-strokes/glyphwiki/u5a93.json');assert.deepEqual(publicGlyph.outlines,reviewed);assert.deepEqual(publicGlyph.engineProof,fixture.fullProof);assert.deepEqual(publicGlyph.sourceIdentity,fixture.identity);assert.deepEqual(publicGlyph.sourceGroups,perm.map(i=>fixture.sourceGroups[i]));assert.equal(publicGlyph.displayPolicy.policyPreviewFlagsPreserved,true);assert.equal(publicGlyph.review.runtimeApplied,true);assert.equal(review.actualResolverVerification.applied,5916);assert.equal(review.actualResolverVerification.missing,62)
 assert.equal(hash(JSON.stringify(bundle[0].paths)),bundle[0].pathsSha256);assert.deepEqual(bundle[0].paths,reviewed.map((s:{outline:string}[])=>s.map(v=>v.outline).join(' ')))
})
