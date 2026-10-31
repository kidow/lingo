import {fixtureEvidenceBytes} from './hanja-stroke-batch-test-types.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {loadGlyphWikiBatch1504Strokes as load,HANJA_DICTIONARY_GLYPHWIKI_BATCH1504_STROKES as expected,GLYPHWIKI_BATCH1504_SOURCE_INPUT as input,GLYPHWIKI_BATCH1504_INPUT_SHA256 as pins,GLYPHWIKI_BATCH1504_NATIVE_APPROVED as nativeApproved,GLYPHWIKI_BATCH1504_REGISTRATION_AUTHORIZED as authorized,GLYPHWIKI_BATCH1504_RUNTIME_APPLIED as applied} from './hanja-stroke-dictionary-glyphwiki-batch1504.ts'
import {makeLocalU8587SourcePrefixContext} from './hanja-stroke-source-prefix-u8587-local.ts'
import {makeReviewedU8587LocalPointWindowContext} from './hanja-stroke-source-point-windows-u8587-local.ts'
const read=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(read(p).toString()),hash=(v:string|Uint8Array)=>createHash('sha256').update(v).digest('hex')
const fixture=json('docs/hanja-source-original-u8587-local-components-2026-10-27/fixtures-draft.json').u8587,bundle=json('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1504.json'),draft=json('docs/hanja-source-original-u8587-local-components-2026-10-27/batch1504-editable-source-draft.json')
function reverse(value:unknown):unknown{return Array.isArray(value)?value.map(reverse):value&&typeof value==='object'?Object.fromEntries(Object.entries(value).reverse().map(([k,v])=>[k,reverse(v)])):value}
test('1504 activation preserves exact17logical/22mask/45P and both actual source contexts',()=>{
 const loaded=load(bundle);assert.strictEqual(loaded,expected);const outlines=loaded[0].outlines;assert(outlines)
 assert.deepEqual(outlines,fixture.strokes);assert.equal(hash(JSON.stringify(outlines)),'3700d16a0661f86803707df324e76d2305f2b8e180baa38e6dbc1fefa860f67a');assert.equal(outlines.length,17);assert.equal(outlines.flat().length,22);assert.equal(outlines.flat().reduce((n,s)=>n+(s.outline.match(/M/g)||[]).length,0),45)
 assert.deepEqual(input.fullProof,fixture.fullProof);assert.deepEqual(input.identity,fixture.identity);assert.deepEqual(input.strokes,outlines)
 assert(makeLocalU8587SourcePrefixContext(input.fullProof,input.identity,outlines));assert(makeReviewedU8587LocalPointWindowContext(input.fullProof,input.identity,outlines))
 assert.deepEqual(loaded[0].paths,outlines.map(p=>p.map(s=>s.outline).join(' ')));assert.equal(hash(JSON.stringify(loaded[0].paths)),loaded[0].pathsSha256)
 assert.equal(loaded[0].geometrySource,'fd502e9f6caeb2eef26c2f9596319f1fa703b0cd072d73d2738c8e08c5a71202')
})
test('1504 accepts ordinary clones and reordered keys, freezes outputs and rejects changed source fields',()=>{
 assert.strictEqual(load(structuredClone(bundle)),expected);assert.strictEqual(load(reverse(bundle)),expected)
 assert(Object.isFrozen(expected)&&Object.isFrozen(expected[0])&&Object.isFrozen(expected[0].outlines)&&Object.isFrozen(input.fullProof))
 for(const key of ['outline','bounds','weight','direction','revealPath','revealWidth']){const changed=structuredClone(bundle);delete changed[0].outlines[12][2][key];assert.throws(()=>load(changed))}
 const changed=structuredClone(bundle);changed[0].outlines[12][2].weight+=.001;assert.equal(makeLocalU8587SourcePrefixContext(input.fullProof,input.identity,changed[0].outlines),null);assert.equal(makeReviewedU8587LocalPointWindowContext(input.fullProof,input.identity,changed[0].outlines),null)
})
test('1504 strict loader rejects prototype/symbol/extra/getter payloads with zero getter reads',()=>{
 const call=load as(...args:unknown[])=>unknown;assert.throws(()=>call());assert.throws(()=>call(bundle,1))
 for(const edit of [(v:any)=>{v[0].extra=1},(v:any)=>{v[0][Symbol('extra')]=1},(v:any)=>{Object.setPrototypeOf(v[0],{extra:1})},(v:any)=>{Object.setPrototypeOf(v[0].outlines,Object.create(Array.prototype))}]){const v=structuredClone(bundle);edit(v);assert.throws(()=>load(v))}
 let reads=0;const root=structuredClone(bundle);Object.defineProperty(root[0],'glyph',{enumerable:true,get(){reads++;return'薇'}});assert.throws(()=>load(root));assert.equal(reads,0)
 const nested=structuredClone(bundle);Object.defineProperty(nested[0].outlines[12],'2',{enumerable:true,get(){reads++;return bundle[0].outlines[12][2]}});assert.throws(()=>load(nested));assert.equal(reads,0)
})
test('1504 editable draft preserves original mixed-parts recipe/fullProof/version types without public-whole claims',()=>{
 const recipe=json('docs/hanja-component-recipe-u8587-2026-10-27/recipe.json')
 assert.deepEqual(draft.engineProof,fixture.fullProof);assert.deepEqual(draft.sourceIdentity,fixture.identity);assert.deepEqual(draft.outlines,fixture.strokes);assert.deepEqual(draft.sourceGroups,fixture.sourceGroups)
 assert.deepEqual(draft.localRoot,recipe.virtualRoot);assert.deepEqual(draft.sourceRecords,recipe.originalChildren);assert.deepEqual(draft.originalPublicRoots,recipe.originalPublicRoots);assert.deepEqual(draft.sourceParents,recipe.parentRows);assert.deepEqual(draft.sourceOrigins,recipe.sourceOrigins)
 for(const [key,value]of Object.entries(recipe.originalChildren)as[string,{version:string|number}][])assert.equal(typeof draft.sourceRecords[key].version,typeof value.version)
 assert.equal(draft.locallyAuthoredRoot,true);assert.equal(draft.mixedParts,true);assert.equal(draft.publicGlyphWikiRoot,false);assert.equal(draft.originalWhole,false);assert.equal(draft.publication.publicGlyphWrittenByPreparer,true);assert.deepEqual(json('public/hanja-strokes/glyphwiki/u8587.json'),draft)
 assert.equal(draft.sourcePreservation.sourcePOrQOrBoundsOrWidthOrWeightChanged,false);assert.equal(draft.sourcePreservation.policyPreviewFlagsPreserved,true)
})
test('1504 binds finite actual-component approval while preserving historical source preview limits',()=>{
 for(const [path,pin]of Object.entries(pins))assert.equal(hash(fixtureEvidenceBytes(path,pin,read)),pin,path)
 const media=json('docs/hanja-official-media-compare-u8587-2026-10-27/metadata.json').dictionary;assert.equal(expected[0].sourceReference.dictionarySvgUrl,media.url);assert.equal(expected[0].sourceReference.dictionarySvgSha256,media.sha256)
 assert.equal(nativeApproved,true);assert.equal(authorized,true);assert.equal(applied,true);assert.equal(draft.review.nativeState,'PASS-finite-actual-component-native-and-focused-integration');assert.equal(draft.review.nativeAnimationApproved,true);assert.equal(draft.review.runtimeApplied,true);assert.equal(draft.review.registrationAuthorized,true);assert.equal(draft.historicalPreparationReview.nativeState,'HOLD-pending-final-candidate-review');assert.equal(draft.historicalPreparationReview.runtimeApplied,false);assert.equal(draft.review.reviewedEffectiveRAMComponentSHA256,hash(fixtureEvidenceBytes('components/hanja/stroke-outlines.tsx',draft.review.reviewedEffectiveRAMComponentSHA256,read)));assert.equal(expected[0].sourceReference.geometryReviewSha256,hash(read(draft.review.nativeAnimationReview)))
 assert.equal(draft.review.examBodyApproved,false);assert.equal(draft.review.actualAppUIFreshlyVerified,false);assert.equal(draft.review.sourceMicroclockIdentityApproved,false);assert.equal(fixture.runtimeApplied,false)
 const notice=read('public/hanja-strokes/glyphwiki/NOTICE-8587.md').toString();assert(notice.includes('finite')&&notice.includes('공개 원래 whole이 아니다')&&notice.includes('시험주관기관 공식 인증이 아니다'))
})
