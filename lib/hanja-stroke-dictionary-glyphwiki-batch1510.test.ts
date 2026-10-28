import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {loadGlyphWikiBatch1510Strokes as load,HANJA_DICTIONARY_GLYPHWIKI_BATCH1510_STROKES as expected,GLYPHWIKI_BATCH1510_SOURCE_INPUT as input,GLYPHWIKI_BATCH1510_LOCAL_AUTHORED as local,GLYPHWIKI_BATCH1510_REGISTRATION_AUTHORIZED as registration,GLYPHWIKI_BATCH1510_RUNTIME_APPLIED as runtime} from './hanja-stroke-dictionary-glyphwiki-batch1510.ts'
const read=(p:string)=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url),'utf8')),hash=(v:string|Uint8Array)=>createHash('sha256').update(v).digest('hex'),bundle=()=>read('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1510.json')
test('1510 exact MM outlines, transforms and gates bind approved finite native inputs',()=>{
 assert.strictEqual(load(bundle()),expected);assert.equal(local,true);assert.equal(registration,true);assert.equal(runtime,true);assert.equal(input.runtimeApplied,true);assert.equal(input.actualAppUIFresh,false);assert.equal(input.originalWhole,false);assert.equal(input.originalMMWhole,false)
 for(const pin of [input.fixture,input.recipe,input.sourceDraft,input.sourceIdentity.recipient,input.sourceIdentity.donor,input.sourceClockReview,input.finalNativeReview])assert.equal(hash(readFileSync(new URL('../'+pin.path,import.meta.url))),pin.SHA256)
 const f=read(input.fixture.path),data=expected[0];assert.equal(data.glyph,'菏');assert.equal(data.paths.length,12);assert.equal(data.outlines?.flat().length,12);assert.deepEqual(data.outlines,f.u83cf.strokes);assert(data.outlines?.flat().every(m=>m.revealStartGate&&m.revealTransform));assert.equal(hash(JSON.stringify(data.outlines)),'8d09d7edb9bc82fa37c4da3d1b4212bf5587f04aa1995630f895f1af33a0c53e');assert.deepEqual(data.paths,data.outlines?.map(s=>s.map(m=>m.outline).join(' ')));assert.equal(hash(JSON.stringify(data.paths)),data.pathsSha256);assert(Object.isFrozen(data.outlines?.[0][0].revealStartGate));assert(Object.isFrozen(input.sourceIdentity.donor))
 const n=read(input.finalNativeReview.path);assert.equal(n.approval.registerThisExactGeometry,true);assert.equal(n.fixture.SHA256,input.fixture.SHA256);assert.equal(data.sourceReference.geometryReviewSha256,input.finalNativeReview.SHA256)
})
test('1510 strict loader rejects geometry, tuple, gate, provenance and hostile mutations',()=>{
 const invoke=load as(...a:unknown[])=>unknown;assert.throws(()=>invoke());assert.throws(()=>invoke(bundle(),0));for(const value of [null,undefined,[],{},'x'])assert.throws(()=>load(value))
 for(const key of ['outline','bounds','direction','weight','revealPath','revealWidth','revealTransform','revealStartGate']){const b=bundle();delete b[0].outlines[0][0][key];assert.throws(()=>load(b),key)}
 for(const key of ['unit','minProjection','firstProjection','padding','until','bounds']){const b=bundle();b[0].outlines[0][0].revealStartGate[key]=null;assert.throws(()=>load(b),key)}
 for(const key of ['orderReviewSha256','directionReviewSha256','geometryReviewSha256','dictionarySvgSha256']){const b=bundle();b[0].sourceReference[key]='0'.repeat(64);assert.throws(()=>load(b),key)}
 const extra=bundle();extra[0].extra=1;assert.throws(()=>load(extra));const sym=bundle();sym[0][Symbol('extra')]=1;assert.throws(()=>load(sym));const hidden=bundle();Object.defineProperty(hidden[0],'hidden',{value:1});assert.throws(()=>load(hidden));const inherited=bundle();Object.setPrototypeOf(inherited[0],{x:1});assert.throws(()=>load(inherited));const nullProto=bundle();Object.setPrototypeOf(nullProto[0],null);assert.throws(()=>load(nullProto));const sparse=bundle();delete sparse[0].outlines[0][0];assert.throws(()=>load(sparse))
 let reads=0;const getter=bundle();Object.defineProperty(getter[0].outlines[0][0],'weight',{enumerable:true,get(){reads++;return 1}});assert.throws(()=>load(getter));assert.equal(reads,0);const reverse=JSON.parse(JSON.stringify(bundle(),(_k,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.entries(v).reverse()):v));assert.strictEqual(load(reverse),expected)
})
test('1510 exact twelve-stroke admission rejects eleven-stroke payloads and false font equivalence',()=>{
 const data=load(bundle())[0];assert.equal(data.paths.length,12);assert.equal(input.fontVariantDecision.pen,7);assert.equal(input.fontVariantDecision.originalClockIdentityApproved,false);assert.equal(input.fontVariantDecision.publisherMicroclockEquivalence,false)
 for(const field of ['paths','outlines','sourceStrokeIndices']){const b=bundle();b[0][field]=b[0][field].slice(0,11);assert.throws(()=>load(b))}
})
