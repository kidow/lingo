import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {loadGlyphWikiBatch1505Strokes as load,HANJA_DICTIONARY_GLYPHWIKI_BATCH1505_STROKES as expected,GLYPHWIKI_BATCH1505_SOURCE_INPUT as input,GLYPHWIKI_BATCH1505_INPUT_SHA256 as pins,GLYPHWIKI_BATCH1505_NATIVE_APPROVED as nativeApproved,GLYPHWIKI_BATCH1505_REGISTRATION_AUTHORIZED as authorized,GLYPHWIKI_BATCH1505_RUNTIME_APPLIED as applied} from './hanja-stroke-dictionary-glyphwiki-batch1505.ts'
import {makeLocalU995bSourcePrefixContext} from './hanja-stroke-source-prefix-u995b-local.ts'
import {makeReviewedU995bLocalPointWindowContext} from './hanja-stroke-source-point-windows-u995b-local.ts'
import {makeLocalU995b22SourcePrefixContext} from './hanja-stroke-source-prefix-u995b-22-local.ts'
const read=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(read(p).toString()),hash=(v:string|Uint8Array)=>createHash('sha256').update(v).digest('hex')
const folder='docs/hanja-source-original-u995b-local-2026-10-27/',f=json(folder+'fixtures-draft.json').u995b,bundle=json('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1505.json'),source=json('public/hanja-strokes/glyphwiki/u995b.json')
function reverse(v:unknown):unknown{return Array.isArray(v)?v.map(reverse):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).reverse().map(([k,x])=>[k,reverse(x)])):v}
test('1505 exact23logical26mask46P and three actual context factories bind unchanged source',()=>{
 const out=load(bundle);assert.strictEqual(out,expected);const strokes=out[0].outlines;assert(strokes);assert.deepEqual(strokes,f.strokes);assert.equal(strokes.length,23);assert.equal(strokes.flat().length,26);assert.equal(strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),46)
 assert.equal(hash(JSON.stringify(strokes)),'d661f0f15ef21322c84c0c8eeb5e9ea030e3ab705de8851e4d9b9233ef5b5238');assert.deepEqual(input.fullProof,f.fullProof);assert.deepEqual(input.identity,f.identity);assert.deepEqual(input.strokes,strokes)
 assert(makeLocalU995bSourcePrefixContext(input.fullProof,input.identity,strokes));assert(makeReviewedU995bLocalPointWindowContext(input.fullProof,input.identity,strokes));assert(makeLocalU995b22SourcePrefixContext(input.fullProof,input.identity,strokes))
 assert.deepEqual(out[0].paths,strokes.map(s=>s.map(m=>m.outline).join(' ')));assert.equal(hash(JSON.stringify(out[0].paths)),out[0].pathsSha256);assert.equal(out[0].geometrySource,f.identity.fileSHA256)
})
test('1505 accepts reordered ordinary clones but rejects changed source fields and freezes data',()=>{
 assert.strictEqual(load(structuredClone(bundle)),expected);assert.strictEqual(load(reverse(bundle)),expected);assert(Object.isFrozen(expected)&&Object.isFrozen(input.fullProof)&&Object.isFrozen(input.strokes))
 for(const key of ['outline','bounds','weight','direction','revealPath','revealWidth']){const x=structuredClone(bundle);delete x[0].outlines[18][1][key];assert.throws(()=>load(x))}
 const changed=structuredClone(bundle);changed[0].outlines[21][0].weight+=.001;assert.equal(makeLocalU995bSourcePrefixContext(input.fullProof,input.identity,changed[0].outlines),null);assert.equal(makeReviewedU995bLocalPointWindowContext(input.fullProof,input.identity,changed[0].outlines),null);assert.equal(makeLocalU995b22SourcePrefixContext(input.fullProof,input.identity,changed[0].outlines),null)
})
test('1505 rejects arity/prototypes/extra/symbol/getter payloads without invoking getters',()=>{
 const call=load as(...args:unknown[])=>unknown;assert.throws(()=>call());assert.throws(()=>call(bundle,1))
 for(const edit of[(x:any)=>{x[0].extra=1},(x:any)=>{x[0][Symbol('bad')]=1},(x:any)=>{Object.setPrototypeOf(x[0],{bad:1})},(x:any)=>{Object.setPrototypeOf(x[0].outlines,Object.create(Array.prototype))}]){const x=structuredClone(bundle);edit(x);assert.throws(()=>load(x))}
 let reads=0;const a=structuredClone(bundle);Object.defineProperty(a[0],'glyph',{enumerable:true,get(){reads++;return'饛'}});assert.throws(()=>load(a));const b=structuredClone(bundle);Object.defineProperty(b[0].outlines[18],'1',{enumerable:true,get(){reads++;return bundle[0].outlines[18][1]}});assert.throws(()=>load(b));assert.equal(reads,0)
})
test('1505 preserves explicit local omission recipe and original capture, without parent-geometry transfer',()=>{
 const recipe=json('docs/hanja-component-recipe-u995b-2026-10-27/recipe.json'),capture=json('docs/hanja-component-capture-u995b-2026-10-27/capture.json')
 assert.deepEqual(source.localRoot,recipe.virtualRoot);assert.deepEqual(source.localRecords,recipe.localRecords);assert.deepEqual(source.originalSourceRecords,recipe.originalRecords);assert.deepEqual(source.originalChildRecords,recipe.originalChildren);assert.deepEqual(source.omission,recipe.omission);assert.deepEqual(source.originalWholeIdentityWrapper,recipe.originalWholeIdentityWrapper);assert.equal(source.originalWholeIdentityWrapper.related,'u3013')
 assert.deepEqual(source.engineProof,f.fullProof);assert.deepEqual(source.sourceIdentity,f.identity);assert.deepEqual(source.sourceGroups,f.sourceGroups);assert.deepEqual(source.outlines,f.strokes);assert.deepEqual(source.capturedGeometryComparison,capture.freshRetainedComparison)
 assert.equal(source.locallyAuthoredRoot,true);assert.equal(source.publicGlyphWikiRoot,false);assert.equal(source.originalWhole,false);assert.equal(source.sourcePreservation.originalPublicParentGeometryIdentical,false);assert.equal(source.sourcePreservation.policyPreviewFlagsPreserved,true);assert.equal(f.previewOnly,true);assert.equal(f.runtimeApplied,false)
})
test('1505 binds final finite-native review and source pins while ROOT runtime registration remains separate',()=>{
 for(const[p,h]of Object.entries(pins))assert.equal(hash(read(p)),h,p)
 const n=json(folder+'native-source-preview-review.json');assert.equal(n.approval.finiteForwardCandidateApproved,true);assert.equal(n.approval.runtimeApplied,false);assert.equal(expected[0].sourceReference.geometryReviewSha256,hash(read(folder+'native-source-preview-review.json')))
 assert.equal(nativeApproved,true);assert.equal(authorized,true);assert.equal(applied,source.review.runtimeApplied);assert.equal(source.review.indexApplicationVerified,source.review.runtimeApplied)
 assert.equal(source.review.examBodyApproved,false);assert.equal(source.review.actualAppUIFreshlyVerified,false);assert.equal(source.review.sourceMicroclockIdentityApproved,false);assert.equal(source.review.allIntermediateFramesClaimed,false)
 assert.equal(source.review.reviewedEffectiveComponentSHA256,hash(read('components/hanja/stroke-outlines.tsx')))
 const notice=read('public/hanja-strokes/glyphwiki/NOTICE-995b.md').toString();assert(notice.includes('공개 원래 whole이 아니')&&notice.includes('시험주관기관 공식 인증이 아니'));assert.equal(source.review.all23NaturalPlaybackVerified,false)
})
