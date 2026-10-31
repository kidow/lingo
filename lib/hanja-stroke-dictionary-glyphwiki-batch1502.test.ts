import {fixtureEvidenceBytes} from './hanja-stroke-batch-test-types.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {loadGlyphWikiBatch1502Strokes as load,HANJA_DICTIONARY_GLYPHWIKI_BATCH1502_STROKES as expected,GLYPHWIKI_BATCH1502_SOURCE_INPUT as input,GLYPHWIKI_BATCH1502_INPUT_SHA256 as pins,GLYPHWIKI_BATCH1502_LOCAL_AUTHORED as local,GLYPHWIKI_BATCH1502_REGISTRATION_AUTHORIZED as registration,GLYPHWIKI_BATCH1502_RUNTIME_APPLIED as runtime} from './hanja-stroke-dictionary-glyphwiki-batch1502.ts'
import {makeReviewedU83f0LocalPointWindowContext as point} from './hanja-stroke-source-point-windows-u83f0-local.ts'
import {makeLocalU83f0SourcePrefixContext as prefix} from './hanja-stroke-source-prefix-u83f0-local.ts'
const read=(p:string)=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url),'utf8')),hash=(v:string|Uint8Array)=>createHash('sha256').update(v).digest('hex'),clone=<T,>(v:T):T=>JSON.parse(JSON.stringify(v))
const bundle=()=>read('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1502.json')
function frozen(v:unknown):boolean{return !v||typeof v!=='object'||Object.isFrozen(v)&&Object.values(v).every(frozen)}
test('1502 exact local12/16mask/34P unchanged fixture and frozen source getter bind both reviewed factories',()=>{
 const fixed=read('docs/hanja-source-original-u83f0-local-components-2026-10-27/fixtures-draft.json').u83f0,b=bundle(),data=load(b)[0];assert(data.outlines)
 assert.equal(hash(JSON.stringify(data.outlines)),'efbf229cb5e874b17bb812b380408f71dccd6734a2653eda26d207cbaab50606');assert.deepEqual(data.outlines,fixed.strokes);assert.deepEqual(input.fullProof,fixed.fullProof);assert.deepEqual(input.identity,fixed.identity);assert.strictEqual(input.strokes,expected[0].outlines);assert.equal(data.paths.length,12);assert.equal(data.outlines.flat().length,16);assert.equal(data.outlines.flat().reduce((n,s)=>n+(s.outline.match(/M/g)||[]).length,0),34)
 assert.deepEqual(data.paths,data.outlines.map(s=>s.map(m=>m.outline).join(' ')));assert.equal(hash(JSON.stringify(data.paths)),data.pathsSha256);assert(point(input.fullProof,input.identity,input.strokes));assert(prefix(input.fullProof,input.identity,input.strokes));assert(frozen(expected));assert(frozen(input));assert.strictEqual(load(b),expected)
 const wrong=clone(input.strokes);const changed=wrong as unknown as{outline:string}[][];changed[4][1].outline+=' ';assert.equal(point(input.fullProof,input.identity,wrong),null);assert.equal(prefix(input.fullProof,input.identity,wrong),null);assert.equal(point(input.fullProof,{...input.identity,root:'u83f0'},input.strokes),null)
})
test('1502 loader is keyorder independent and rejects extras prototypes getters symbols missing or changed fields',()=>{
 const reverse=JSON.parse(JSON.stringify(bundle(),(_k,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.entries(v).reverse()):v));assert.strictEqual(load(reverse),expected)
 const make=load as(...a:unknown[])=>unknown;assert.throws(()=>make());assert.throws(()=>make(bundle(),0));assert.throws(()=>load([]));assert.throws(()=>load(null))
 for(const key of ['outline','bounds','direction','weight','revealPath','revealWidth']){const b=bundle();delete b[0].outlines[4][1][key];assert.throws(()=>load(b),key)}
 const extra=bundle();extra[0].extra=true;assert.throws(()=>load(extra));const nested=bundle();nested[0].outlines[0][0].extra=1;assert.throws(()=>load(nested));const sym=bundle();sym[0][Symbol('extra')]=1;assert.throws(()=>load(sym));const arr=bundle();arr[0].outlines[0].extra=true;assert.throws(()=>load(arr))
 const inherited=bundle();Object.setPrototypeOf(inherited[0],{extra:1});assert.throws(()=>load(inherited));const nullProto=bundle();Object.setPrototypeOf(nullProto[0],null);assert.throws(()=>load(nullProto))
 let reads=0;const getter=bundle();Object.defineProperty(getter[0],'glyph',{enumerable:true,get(){reads++;return '菰'}});assert.throws(()=>load(getter));assert.equal(reads,0);const nestedGetter=bundle();Object.defineProperty(nestedGetter[0].outlines[4][1],'weight',{enumerable:true,get(){reads++;return 1}});assert.throws(()=>load(nestedGetter));assert.equal(reads,0)
 const freeze=(v:unknown)=>{if(v&&typeof v==='object'){for(const x of Object.values(v))freeze(x);Object.freeze(v)}};const copy=bundle();freeze(copy);assert.strictEqual(load(copy),expected)
})
test('1502 preserves local authorship original public metadata and scoped dictionary/native evidence',()=>{
 for(const[p,h]of Object.entries(pins))assert.equal(hash(fixtureEvidenceBytes(p,h,evidencePath=>readFileSync(new URL('../'+evidencePath,import.meta.url)))),h,p)
 assert.equal(pins['docs/hanja-source-original-u83f0-local-components-2026-10-27/fixtures-draft.json'],'80df51355acb56c1b1d69fe5c67e866fb1d484f325e361d91a0b582e3ea11485')
 const g=read('public/hanja-strokes/glyphwiki/u83f0.json'),recipe=read('docs/hanja-component-recipe-u83f0-2026-10-27/recipe.json'),b=bundle()[0];assert.equal(local,true);assert.equal(g.locallyAuthoredRoot,true);assert.equal(g.mixedParts,true);assert.equal(g.publicGlyphWikiRoot,false);assert.equal(g.originalWhole,false);assert.equal(g.review.registrationAuthorized,registration);assert.equal(g.review.runtimeApplied,runtime);assert.equal(g.review.examBodyApproved,false);assert.equal(g.review.sourceMicroclockIdentityApproved,false);assert.equal(g.review.actualAppUIFreshlyVerified,false);assert.deepEqual(g.sourceRecords,recipe.originalChildren);assert.deepEqual(g.sourceParents,recipe.parentRows);assert.deepEqual(g.engineProof,input.fullProof);assert.deepEqual(g.sourceIdentity,input.identity);assert.deepEqual(g.outlines,input.strokes)
 const media=read('docs/hanja-official-media-compare-u83f0-2026-10-23/metadata.json');assert.equal(b.sourceReference.dictionarySvgSha256,media.dictionary.sha256);assert.equal(media.dictionary.clips,12)
 const native=read('docs/hanja-actual-component-profiles-2026-10-22/u83f0-local-components-source-preview-4-native-review.json');assert.equal(native.result,'PASS-finite-isolated-actual-component-forward-review');assert.equal(native.nativeAnimationApproval,true);assert.equal(native.sourceMicroClockEquivalent,false);assert.equal(native.actualAppUIVerified,false);assert.equal(native.runtimeApplied,false);assert.equal(native.profileSHA256,pins['docs/hanja-actual-component-profiles-2026-10-22/u83f0-local-components-source-preview-4.json']);assert.equal(native.compiledSHA256,'efbf229cb5e874b17bb812b380408f71dccd6734a2653eda26d207cbaab50606')
})
