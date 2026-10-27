import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {loadGlyphWikiBatch1503Strokes as load,HANJA_DICTIONARY_GLYPHWIKI_BATCH1503_STROKES as expected,GLYPHWIKI_BATCH1503_SOURCE_INPUT as input,GLYPHWIKI_BATCH1503_INPUT_SHA256 as pins,GLYPHWIKI_BATCH1503_REGISTRATION_AUTHORIZED as authorized,GLYPHWIKI_BATCH1503_RUNTIME_APPLIED as applied} from './hanja-stroke-dictionary-glyphwiki-batch1503.ts'
import {makeLocalU7aeaSourcePrefixContext,LOCAL_U7AEA_SOURCE_PREFIX_INPUT} from './hanja-stroke-source-prefix-u7aea-local.ts'
import {makeReviewedU7aeaLocalHeadTailContext} from './hanja-stroke-source-head-tail-u7aea-local.ts'
const read=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(read(p).toString()),hash=(v:string|Uint8Array)=>createHash('sha256').update(v).digest('hex')
const fixture=json('docs/hanja-source-original-u7aea-local-2026-10-27/fixtures-draft.json').u7aea,bundle=json('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1503.json'),glyph=json('public/hanja-strokes/glyphwiki/u7aea.json')
function reverse(value:unknown):unknown{return Array.isArray(value)?value.map(reverse):value&&typeof value==='object'?Object.fromEntries(Object.entries(value).reverse().map(([k,v])=>[k,reverse(v)])):value}
test('1503 preserves exact13logical/16mask/27P source and binds BOTH actual production factories',()=>{
 const loaded=load(bundle);assert.strictEqual(loaded,expected);const outlines=loaded[0].outlines;assert(outlines)
 assert.deepEqual(outlines,fixture.strokes);assert.equal(hash(JSON.stringify(outlines)),'c59c97d44ce071358ae98d1e01b34d32447276e5ab736f88d59766262dc0f110')
 assert.equal(outlines.length,13);assert.equal(outlines.flat().length,16);assert.equal(outlines.flat().reduce((n,s)=>n+(s.outline.match(/M/g)||[]).length,0),27)
 assert.deepEqual(input.fullProof,fixture.fullProof);assert.deepEqual(input.identity,fixture.identity);assert.deepEqual(input.strokes,outlines)
 assert(makeLocalU7aeaSourcePrefixContext(input.fullProof,input.identity,outlines));assert(makeReviewedU7aeaLocalHeadTailContext(input.fullProof,input.identity,outlines))
 const r=read('components/hanja/stroke-outlines.tsx').toString().replace(/\s+/g,'')
 for(const name of ['makeLocalU7aeaSourcePrefixContext','makeReviewedU7aeaLocalHeadTailContext'])assert(r.includes(name+'(LOCAL_U7AEA_SOURCE_PREFIX_INPUT.fullProof,LOCAL_U7AEA_SOURCE_PREFIX_INPUT.identity,strokes)'))
 assert.deepEqual(input.fullProof,LOCAL_U7AEA_SOURCE_PREFIX_INPUT.fullProof);assert.deepEqual(input.identity,LOCAL_U7AEA_SOURCE_PREFIX_INPUT.identity)
 assert.deepEqual(loaded[0].paths,outlines.map(p=>p.map(s=>s.outline).join(' ')));assert.equal(hash(JSON.stringify(loaded[0].paths)),loaded[0].pathsSha256)
})
test('1503 strict loader accepts value clones and reordered keys while freezing every output',()=>{
 assert.strictEqual(load(structuredClone(bundle)),expected);assert.strictEqual(load(reverse(bundle)),expected)
 assert(Object.isFrozen(expected)&&Object.isFrozen(expected[0])&&Object.isFrozen(expected[0].outlines)&&Object.isFrozen(input.fullProof))
 const changed=structuredClone(bundle);changed[0].outlines[6][1].weight+=.001;assert.throws(()=>load(changed))
 assert.equal(makeLocalU7aeaSourcePrefixContext(input.fullProof,input.identity,changed[0].outlines),null);assert.equal(makeReviewedU7aeaLocalHeadTailContext(input.fullProof,input.identity,changed[0].outlines),null)
})
test('1503 rejects prototypes/extra keys/symbols/getters without invoking getters',()=>{
 const call=load as(...args:unknown[])=>unknown;assert.throws(()=>call());assert.throws(()=>call(bundle,1))
 for(const edit of [(v:any)=>{v[0].extra=1},(v:any)=>{v[0][Symbol('extra')]=1},(v:any)=>{Object.setPrototypeOf(v[0],{extra:1})},(v:any)=>{Object.setPrototypeOf(v[0].outlines,Object.create(Array.prototype))},(v:any)=>{delete v[0].outlines[0][0].bounds}]){const v=structuredClone(bundle);edit(v);assert.throws(()=>load(v))}
 let reads=0;const getter=structuredClone(bundle);Object.defineProperty(getter[0],'glyph',{enumerable:true,get(){reads++;return'竪'}});assert.throws(()=>load(getter));assert.equal(reads,0)
 const nested=structuredClone(bundle);Object.defineProperty(nested[0].outlines[0],'0',{enumerable:true,get(){reads++;return bundle[0].outlines[0][0]}});assert.throws(()=>load(nested));assert.equal(reads,0)
})
test('1503 editable source preserves full local proof and unchanged original parent6 rows/child version types',()=>{
 const recipe=json('docs/hanja-component-recipe-u7aea-2026-10-27/recipe.json'),archive=json('docs/hanja-source-inventory-u7aea-additional-2026-10-27/sources.json')
 assert.deepEqual(glyph.engineProof,fixture.fullProof);assert.deepEqual(glyph.sourceIdentity,fixture.identity);assert.deepEqual(glyph.outlines,fixture.strokes);assert.deepEqual(glyph.sourceGroups,fixture.sourceGroups)
 assert.deepEqual(glyph.localRoot,recipe.virtualRoot);assert.deepEqual(glyph.sourceRecords,recipe.originalChildren);assert.deepEqual(glyph.originalSourceRecords['simch-kx_t087217'],archive.records['simch-kx_t087217'])
 assert.deepEqual(glyph.sourceParent.originalParentRows,archive.records['simch-kx_t087217'].data.split('$'));assert.equal(glyph.sourceParent.originalParentRows.length,6);assert.equal(glyph.localRoot.data.split('$').length,5)
 assert.equal(glyph.sourceParent.omittedParentRowOneBased,6);assert.equal(glyph.sourceParent.omittedOriginalRow,recipe.omittedOriginalRow);assert.equal(glyph.sourceParent.raw17PDeletedDirectly,false)
 for(const [key,child]of Object.entries(recipe.originalChildren)as[string,{name:string;version:string|number}][]){assert.deepEqual(glyph.sourceRecords[key],archive.records[child.name]);assert.equal(glyph.originalChildOrigins[key].version,child.version);assert.equal(glyph.originalChildOrigins[key].versionType,typeof child.version)}
 assert.equal(glyph.locallyAuthoredRoot,true);assert.equal(glyph.mixedParts,false);assert.equal(glyph.publicGlyphWikiRoot,false);assert.equal(glyph.originalWhole,false)
})
test('1503 evidence pins bind scoped native review and keep preparation activation flags consistent',()=>{
 for(const [path,pin]of Object.entries(pins))assert.equal(hash(read(path)),pin,path)
 const native=json(glyph.review.nativeAnimationReview);assert.equal(hash(read(glyph.review.nativeAnimationReview)),glyph.review.nativeAnimationReviewSHA256);assert.equal(native.nativeAnimationApproval,true);assert.equal(native.manualNativeScenes,33);assert.equal(native.doneWholeAll13StrokesComplete,true);assert.equal(native.selected13NaturalCompletion.allFullStatusErrorsBadGuardErrorsEmpty,true)
 assert.equal(native.sourceP_Q_WidthWeightsChanged,false);assert.equal(native.sourceMicroClockIdentityApproved,false);assert.equal(native.freshAppUIVerified,false)
 assert.equal(glyph.review.registrationAuthorized,authorized);assert.equal(glyph.review.runtimeApplied,applied);assert.equal(glyph.review.actualAppUIFreshlyVerified,false);assert.equal(glyph.review.examBodyApproved,false);assert.equal(glyph.review.sourceMicroclockIdentityApproved,false)
 assert.equal(fixture.previewOnly,true);assert.equal(fixture.runtimeApplied,false);assert.equal(glyph.sourcePreservation.policyPreviewFlagsPreserved,true)
 assert(read('public/hanja-strokes/glyphwiki/NOTICE-7aea.md').toString().includes('공개 원래 whole이 아니며'))
})
