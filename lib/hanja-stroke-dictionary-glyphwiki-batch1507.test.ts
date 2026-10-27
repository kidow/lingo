import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync,readdirSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1507_STROKES as ENTRY,loadGlyphWikiBatch1507Strokes as load,GLYPHWIKI_BATCH1507_SOURCE_INPUT as INPUT,GLYPHWIKI_BATCH1507_INPUT_SHA256 as PINS,GLYPHWIKI_BATCH1507_APPROVAL_REVIEW as APPROVAL,GLYPHWIKI_BATCH1507_PUBLIC_SOURCE_SHA256 as PUBLIC_SHA,GLYPHWIKI_BATCH1507_NATIVE_APPROVED as nativeApproved,GLYPHWIKI_BATCH1507_REGISTRATION_AUTHORIZED as authorized,GLYPHWIKI_BATCH1507_RUNTIME_APPLIED as applied} from './hanja-stroke-dictionary-glyphwiki-batch1507.ts'
import {makeReviewedU9008HkcsSourceRevealContext,reviewedU9008HkcsSourceRevealPolicy} from './hanja-stroke-source-reveal-u9008-hkcs.ts'
import {makeReviewedU9008HkcsContactFootContext,reviewedU9008HkcsContactFootPolicy} from './hanja-stroke-contact-foot-u9008-hkcs.ts'
const read=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(read(p).toString()),hash=(s:string|Uint8Array)=>createHash('sha256').update(s).digest('hex')
const FOLDER="docs/hanja-source-original-u9008-hkcs-2026-10-27/",PUB="public/hanja-strokes/glyphwiki/u9008.json",BUNDLE="public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1507.json",f=json(FOLDER+'fixtures-draft.json').u9008,source=json(PUB),bundle=json(BUNDLE)
test('1507 sourcegate binds exact originalHKCS10 source, original15 masks27P and finite native approval',()=>{
 for(const[p,h]of Object.entries(PINS))assert.equal(hash(read(p)),h,p)
 assert.equal(hash(read(PUB)),PUBLIC_SHA);assert.equal(bundle[0].candidateSha256,PUBLIC_SHA);assert.equal(bundle[0].geometrySource,PUBLIC_SHA);assert.deepEqual(load(bundle),ENTRY)
 assert.equal(hash(JSON.stringify(INPUT.strokes)),f.compiledSHA256);assert.deepEqual(INPUT.strokes,source.outlines);assert.deepEqual(INPUT.fullProof,source.engineProof);assert.deepEqual(INPUT.identity,source.sourceIdentity)
 assert.equal(INPUT.strokes.length,10);assert.equal(INPUT.strokes.flat().length,15);assert.equal(INPUT.strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),27)
 assert.deepEqual(f.sourceGroups.flat().sort((a:number,b:number)=>a-b),Array.from({length:14},(_,i)=>i));assert.deepEqual(bundle[0].sourceStrokeIndices,f.sourceGroups.map((g:number[])=>g[0]+1))
 assert.deepEqual(bundle[0].paths,INPUT.strokes.map(s=>s.map(m=>m.outline).join(' ')));assert.equal(hash(JSON.stringify(bundle[0].paths)),bundle[0].pathsSha256)
 const a=makeReviewedU9008HkcsSourceRevealContext(INPUT.fullProof,INPUT.identity,INPUT.strokes),b=makeReviewedU9008HkcsContactFootContext(INPUT.fullProof,INPUT.identity,INPUT.strokes);assert(a);assert(b);const owned=INPUT.strokes.flatMap((s,p)=>s.flatMap((_,m)=>reviewedU9008HkcsSourceRevealPolicy(a,p,m)||reviewedU9008HkcsContactFootPolicy(b,p,m)?[[p+1,m+1]]:[]));assert.deepEqual(owned,[[1,1],[3,3],[7,1],[8,1],[10,1],[10,2]])
 const n=json(APPROVAL.path);assert.equal(hash(read(APPROVAL.path)),APPROVAL.SHA256);assert.equal(n.approval.finiteForwardCandidateApproved,true);assert.equal(nativeApproved,true)
 assert.equal(source.locallyAuthoredRoot,false);assert.equal(source.publicGlyphWikiRoot,true);assert.equal(source.originalWhole,true);assert.equal(source.sourceProvenance.fixedRecords.length,3);assert.equal(source.review.preparationSnapshot.runtimeApplied,false);assert.equal(source.review.preparationSnapshot.historicalSnapshot,true);assert.equal(source.review.examBodyApproved,false);assert.equal(source.review.actualAppUIFreshlyVerified,false);assert.equal(source.review.sourceMicroclockIdentityApproved,false);assert.equal(source.review.allIntermediateFramesClaimed,false)
 assert.equal(source.review.reviewedEffectiveComponentSHA256,'5f21a981e5f9621e07afb6621fdac5de8c3d649ac5b0effad0d0e854f28011b6');assert.equal(n.inputSHA256['components/hanja/stroke-outlines.tsx'],source.review.reviewedEffectiveComponentSHA256)
 assert(!JSON.stringify(source).includes('registrySHA256'));assert(!JSON.stringify(source).includes('candidateSha256'));assert.equal(ENTRY[0].variant.catalogStrokes,9);assert.equal(ENTRY[0].variant.playbackStrokes,10)
})
test('1507 exact loader accepts reordered ordinary clones and rejects malformed source without invoking getters',()=>{
 const clone=()=>JSON.parse(JSON.stringify(bundle));const reordered=(v:unknown):unknown=>Array.isArray(v)?v.map(reordered):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).reverse().map(([k,x])=>[k,reordered(x)])):v
 assert.deepEqual(load(reordered(bundle)),ENTRY);assert(Object.isFrozen(ENTRY));assert(Object.isFrozen(ENTRY[0].outlines));assert.throws(()=>Reflect.apply(load,null,[]));assert.throws(()=>Reflect.apply(load,null,[bundle,0]))
 for(const mutate of[(x:typeof bundle)=>{x[0].variant.catalogStrokes=13},(x:typeof bundle)=>{x[0].variant.playbackStrokes=12},(x:typeof bundle)=>{x[0].variant.form='任意'},(x:typeof bundle)=>{delete x[0].variant},(x:typeof bundle)=>{x[0].paths[0]+=' '},(x:typeof bundle)=>{x[0].outlines[0][0].revealPath+=' '},(x:typeof bundle)=>{x[0].outlines[0][0].weight+=1},(x:typeof bundle)=>{x[0].sourceReference.geometryReviewSha256='0'.repeat(64)},(x:typeof bundle)=>{x[0].candidateSha256='0'.repeat(64)},(x:typeof bundle)=>{x[0].extra=true}]){const x=clone();mutate(x);assert.throws(()=>load(x))}
 let gets=0;const accessor=clone();Object.defineProperty(accessor[0],'glyph',{enumerable:true,get(){gets++;return '逈'}});assert.throws(()=>load(accessor));assert.equal(gets,0)
 const symbol=clone();symbol[0][Symbol('extra')]=true;assert.throws(()=>load(symbol));const prototype=clone();Object.setPrototypeOf(prototype[0],null);assert.throws(()=>load(prototype));const extraArray=clone();extraArray.extra=1;assert.throws(()=>load(extraArray))
})
test('1507 current renderer retains each exact owned D integration run once',()=>{
 const patch=read(FOLDER+'source-reveal-r-integration.patch').toString(),renderer=read('components/hanja/stroke-outlines.tsx').toString();const runs:string[]=[];let run:string[]=[]
 for(const line of patch.split('\n')){if(line.startsWith('+'))run.push(line.slice(1));else if(run.length){const text=run.join('\n');if(text.trim())runs.push(text);run=[]}}assert(runs.length>=4);for(const owned of runs)assert.equal(renderer.split(owned).length,2,'Exact owned D addition remains once')
})
test('1507 activation tail follows ROOT status and preserves catalogue9 dictionary10 separation',async()=>{
 const {HANJA_STROKES,hanjaStrokeData}=await import('./hanja-strokes.ts'),{HANJA_VARIANT_STROKES,hanjaPlaybackVariant}=await import('./hanja-stroke-variants.ts')
 assert.equal(authorized,applied);const matches=HANJA_STROKES.filter(x=>x.glyph==='逈'),variants=HANJA_VARIANT_STROKES.filter(x=>x.glyph==='逈')
 if(!applied){assert.equal(matches.length,0);assert.equal(variants.length,0);assert.equal(hanjaStrokeData({glyph:'逈',strokes:9}),null);return}
 assert.equal(matches.length,1);assert.equal(variants.length,1);assert.deepEqual(hanjaStrokeData({glyph:'逈',strokes:9}),ENTRY[0]);assert.equal(hanjaPlaybackVariant({glyph:'逈',strokes:9})?.paths.length,10)
 for(let strokes=0;strokes<50;strokes++)if(strokes!==9){assert.equal(hanjaStrokeData({glyph:'逈',strokes}),null);assert.equal(hanjaPlaybackVariant({glyph:'逈',strokes}),null)}
 const dir=new URL('../content/hanja/characters/',import.meta.url),catalog=readdirSync(dir).filter(x=>x.endsWith('.json')).flatMap(x=>JSON.parse(readFileSync(new URL(x,dir),'utf8')).characters);assert.equal(catalog.length,5978);const resolved=catalog.filter((x:{glyph:string;strokes:number})=>hanjaStrokeData(x));assert.equal(new Set(HANJA_STROKES.map(x=>x.glyph)).size,resolved.length)
 console.log(JSON.stringify({glyph:'逈',catalog9:true,playback10:true,registered:resolved.length,remaining:5978-resolved.length,build:false}))
})
