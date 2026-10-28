import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {loadGlyphWikiBatch1511Strokes as load,HANJA_DICTIONARY_GLYPHWIKI_BATCH1511_STROKES as expected,GLYPHWIKI_BATCH1511_SOURCE_INPUT as input,GLYPHWIKI_BATCH1511_LOCAL_AUTHORED as local,GLYPHWIKI_BATCH1511_REGISTRATION_AUTHORIZED as registration,GLYPHWIKI_BATCH1511_RUNTIME_APPLIED as runtime} from './hanja-stroke-dictionary-glyphwiki-batch1511.ts'
const read=(p:string)=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url),'utf8')),hash=(v:string|Uint8Array)=>createHash('sha256').update(v).digest('hex'),bundle=()=>read('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1511.json')
test('1511 exact MM outlines, transforms and gates bind approved finite native inputs',()=>{
 assert.strictEqual(load(bundle()),expected);assert.equal(local,true);assert.equal(registration,true);assert.equal(runtime,true);assert.equal(input.runtimeApplied,true);assert.equal(input.actualAppUIFresh,false);assert.equal(input.originalWhole,false);assert.equal(input.originalMMWhole,false)
 for(const pin of [input.fixture,input.recipe,input.sourceDraft,input.sourceIdentity.recipient,input.sourceIdentity.donor,input.sourceClockReview,input.finalNativeReview])assert.equal(hash(readFileSync(new URL('../'+pin.path,import.meta.url))),pin.SHA256)
 const f=read(input.fixture.path),data=expected[0];assert.equal(data.glyph,'薅');assert.equal(data.paths.length,17);assert.equal(data.outlines?.flat().length,17);assert.deepEqual(data.outlines,f.u8585.strokes);assert(data.outlines?.flat().every(m=>m.revealStartGate&&m.revealTransform));assert.equal(hash(JSON.stringify(data.outlines)),'e9e39047f1dc662adfcaeb0a5332dd202f093799ec4513bb7b27859b3e110a45');assert.deepEqual(data.paths,data.outlines?.map(s=>s.map(m=>m.outline).join(' ')));assert.equal(hash(JSON.stringify(data.paths)),data.pathsSha256);assert(Object.isFrozen(data.outlines?.[0][0].revealStartGate));assert(Object.isFrozen(input.sourceIdentity.donor))
 const n=read(input.finalNativeReview.path);assert.equal(n.approval.registerThisExactGeometry,true);assert.equal(n.fixture.SHA256,input.fixture.SHA256);assert.equal(data.sourceReference.geometryReviewSha256,input.finalNativeReview.SHA256)
})
test('1511 strict loader rejects geometry, tuple, gate, provenance and hostile mutations',()=>{
 const invoke=load as(...a:unknown[])=>unknown;assert.throws(()=>invoke());assert.throws(()=>invoke(bundle(),0));for(const value of [null,undefined,[],{},'x'])assert.throws(()=>load(value))
 for(const key of ['outline','bounds','direction','weight','revealPath','revealWidth','revealTransform','revealStartGate']){const b=bundle();delete b[0].outlines[0][0][key];assert.throws(()=>load(b),key)}
 for(const key of ['unit','minProjection','firstProjection','padding','until','bounds']){const b=bundle();b[0].outlines[0][0].revealStartGate[key]=null;assert.throws(()=>load(b),key)}
 for(const key of ['orderReviewSha256','directionReviewSha256','geometryReviewSha256','dictionarySvgSha256']){const b=bundle();b[0].sourceReference[key]='0'.repeat(64);assert.throws(()=>load(b),key)}
 const extra=bundle();extra[0].extra=1;assert.throws(()=>load(extra));const sym=bundle();sym[0][Symbol('extra')]=1;assert.throws(()=>load(sym));const hidden=bundle();Object.defineProperty(hidden[0],'hidden',{value:1});assert.throws(()=>load(hidden));const inherited=bundle();Object.setPrototypeOf(inherited[0],{x:1});assert.throws(()=>load(inherited));const nullProto=bundle();Object.setPrototypeOf(nullProto[0],null);assert.throws(()=>load(nullProto));const sparse=bundle();delete sparse[0].outlines[0][0];assert.throws(()=>load(sparse))
 let reads=0;const getter=bundle();Object.defineProperty(getter[0].outlines[0][0],'weight',{enumerable:true,get(){reads++;return 1}});assert.throws(()=>load(getter));assert.equal(reads,0);const reverse=JSON.parse(JSON.stringify(bundle(),(_k,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.entries(v).reverse()):v));assert.strictEqual(load(reverse),expected)
})
test('1511 exact seventeen-stroke admission rejects sixteen and retains authored root identity',()=>{
 const data=load(bundle())[0];assert.equal(data.paths.length,17);const recipe=read(input.recipe.path);assert.equal(typeof recipe.locallyAuthoredRoot,'string');assert.equal(input.locallyAuthoredRoot,recipe.locallyAuthoredRoot);assert.equal(input.locallyAuthoredRoot,'u8585-mm-authored-grass17');assert.equal(input.upstreamTimingEquivalenceClaim,false)
 for(const field of ['paths','outlines','sourceStrokeIndices']){const b=bundle();b[0][field]=b[0][field].slice(0,16);assert.throws(()=>load(b))}
})
