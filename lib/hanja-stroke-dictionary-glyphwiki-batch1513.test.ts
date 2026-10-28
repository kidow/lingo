import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {loadGlyphWikiBatch1513Strokes as load,HANJA_DICTIONARY_GLYPHWIKI_BATCH1513_STROKES as expected,GLYPHWIKI_BATCH1513_SOURCE_INPUT as input,GLYPHWIKI_BATCH1513_REGISTRATION_AUTHORIZED as authorized,GLYPHWIKI_BATCH1513_RUNTIME_APPLIED as runtime} from './hanja-stroke-dictionary-glyphwiki-batch1513.ts'
const read=(p:string)=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url),'utf8')),hash=(s:string|Uint8Array)=>createHash('sha256').update(s).digest('hex'),bundle=()=>read('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1513.json')
test('1513 exact mixed public donor binds finite native evidence with explicit grid limitation',()=>{
 assert.strictEqual(load(bundle()),expected);assert.equal(authorized,true);assert.equal(runtime,true);
 for(const pin of [input.fixture,input.staticReview,input.contactMath,input.layoutCounterexampleReview,input.finalNativeReview,input.renderer,input.outlineHelper])assert.equal(hash(readFileSync(new URL('../'+pin.path,import.meta.url))),pin.SHA256);
 for(const[p,pin]of Object.entries(input.inputSHA256))assert.equal(hash(readFileSync(new URL('../'+p,import.meta.url))),pin);
 const f=read(input.fixture.path),n=read(input.finalNativeReview.path),d=expected[0];assert.equal(n.approval.registrationAuthorized,true);assert.equal(n.runtimeAppliedAtReview,false);assert.equal(n.native.aggregateFrames.unqualifiedMultiColumnRasterPass,false);assert.equal(n.limitations.multiColumnReviewRasterCauseUnresolved,true);assert.equal(n.limitations.actualAppUI,false);assert.equal(n.limitations.originalMicroclockEquivalence,false);assert.equal(n.limitations.wholeNaturalAutoplayTest,false);assert.equal(n.native.stateChecks.count,24);assert.deepEqual(n.native.stateChecks.failed,[]);
 assert.equal(d.glyph,'鞹');assert.deepEqual(d.outlines,f.strokes);assert.equal(hash(JSON.stringify(d.outlines)),input.fixture.geometrySHA256);assert.equal(n.fixtureSHA256,input.fixture.SHA256);assert.deepEqual(d.paths,d.outlines?.map(row=>row.map(s=>s.outline).join(' ')));assert.equal(hash(JSON.stringify(d.paths)),d.pathsSha256);assert.equal(d.sourceReference.geometryReviewSha256,input.finalNativeReview.SHA256);
 assert.equal(input.locallyAuthoredRoot,true);assert.equal(input.mixedParts,true);assert.equal(input.originalWhole,false);assert.equal(input.originalPublicRoot,false);assert.equal(input.isOriginalEngineCapture,false);assert.equal(input.sourceTraceDescribesReplacement,false);assert.equal(input.actualAppUIFresh,false);assert.equal(input.originalMicroclockEquivalence,false);assert.equal(input.unqualifiedMultiColumnRasterPass,false);assert.equal(d.geometryLicense?.spdx,'LicenseRef-GlyphWiki');assert(Object.isFrozen(d.outlines?.[0][0]));assert(Object.isFrozen(input.inputSHA256));
})
test('1513 exact20 pens26 masks43 P and6 gates reject wrong counts and width policies',()=>{
 const d=expected[0];assert.equal(d.paths.length,20);assert.equal(d.outlines?.flat().length,26);assert.equal(d.outlines?.flat().reduce((n,s)=>n+(s.outline.match(/M/g)||[]).length,0),43);assert.equal(d.outlines?.flat().filter(s=>s.revealStartGate).length,6);assert.equal(d.outlines?.flat().filter(s=>s.revealTransform).length,0);
 assert.deepEqual(d.outlines?.flatMap((row,p)=>row.flatMap((s,m)=>s.revealStartGate?[[p+1,m+1,s.revealWidth,s.revealStartGate.padding]]:[])),[[15,2,14,7],[16,2,16,8],[17,1,14,7],[18,2,14,7],[19,1,14,7],[19,2,14,7]]);
 for(const count of[19,21])for(const key of ['paths','outlines','sourceStrokeIndices']){const b=bundle();b[0][key]=count===19?b[0][key].slice(0,19):[...b[0][key],b[0][key][0]];assert.throws(()=>load(b))}
 for(const key of ['outline','bounds','direction','weight']){const b=bundle();delete b[0].outlines[0][0][key];assert.throws(()=>load(b))}
 for(const key of ['revealPath','revealWidth','revealStartGate']){const b=bundle();delete b[0].outlines[15][1][key];assert.throws(()=>load(b))}
 for(const key of ['unit','minProjection','firstProjection','padding','until','bounds']){const b=bundle();b[0].outlines[15][1].revealStartGate[key]=null;assert.throws(()=>load(b))}
 for(const [pen,mask,width,padding]of[[15,1,14,7],[14,1,16,8]]){const b=bundle();b[0].outlines[pen][mask].revealWidth=width;b[0].outlines[pen][mask].revealStartGate.padding=padding;assert.throws(()=>load(b))}
 const review=bundle();review[0].sourceReference.geometryReviewSha256='0'.repeat(64);assert.throws(()=>load(review));
})
test('1513 strict JSON capsule rejects hostile descriptors and freezes independent identity',()=>{
 const invoke=load as(...a:unknown[])=>unknown;assert.throws(()=>invoke());assert.throws(()=>invoke(bundle(),0));for(const value of[null,undefined,[],{},'x'])assert.throws(()=>load(value));
 const extra=bundle();extra[0].extra=1;assert.throws(()=>load(extra));const sym=bundle();sym[0][Symbol('extra')]=1;assert.throws(()=>load(sym));const hidden=bundle();Object.defineProperty(hidden[0],'hidden',{value:1});assert.throws(()=>load(hidden));
 const inherited=bundle();Object.setPrototypeOf(inherited[0],{});assert.throws(()=>load(inherited));const np=bundle();Object.setPrototypeOf(np[0],null);assert.throws(()=>load(np));const sparse=bundle();delete sparse[0].outlines[0][0];assert.throws(()=>load(sparse));
 let reads=0;const getter=bundle();Object.defineProperty(getter[0].outlines[0][0],'weight',{enumerable:true,get(){reads++;return 0}});assert.throws(()=>load(getter));assert.equal(reads,0);
 const reversed=JSON.parse(JSON.stringify(bundle(),(_k,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.entries(v).reverse()):v));assert.strictEqual(load(reversed),expected);
})
