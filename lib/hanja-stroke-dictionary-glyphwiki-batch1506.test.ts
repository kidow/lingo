import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync,readdirSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {HANJA_DICTIONARY_GLYPHWIKI_BATCH1506_STROKES as ENTRY,loadGlyphWikiBatch1506Strokes as load,GLYPHWIKI_BATCH1506_SOURCE_INPUT as INPUT,GLYPHWIKI_BATCH1506_INPUT_SHA256 as PINS,GLYPHWIKI_BATCH1506_APPROVAL_REVIEW as APPROVAL,GLYPHWIKI_BATCH1506_PUBLIC_SOURCE_SHA256 as PUBLIC_SHA,GLYPHWIKI_BATCH1506_NATIVE_APPROVED as nativeApproved,GLYPHWIKI_BATCH1506_REGISTRATION_AUTHORIZED as authorized,GLYPHWIKI_BATCH1506_RUNTIME_APPLIED as applied} from './hanja-stroke-dictionary-glyphwiki-batch1506.ts'
import {makeLocalU5ac2RevealContext,localU5ac2RevealPolicy} from './hanja-stroke-source-reveal-u5ac2-local.ts'
const read=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(read(p).toString()),hash=(s:string|Uint8Array)=>createHash('sha256').update(s).digest('hex')
const FOLDER="docs/hanja-source-original-u5ac2-sou10-layout-v2-2026-10-27/",PUB="public/hanja-strokes/glyphwiki/u5ac2.json",BUNDLE="public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1506.json",f=json(FOLDER+'fixtures-draft.json').u5ac2,source=json(PUB),bundle=json(BUNDLE)
test('1506 sourcegate binds exact local13 source, original16 masks27P and finite native approval',()=>{
 for(const[p,h]of Object.entries(PINS))assert.equal(hash(read(p)),h,p)
 assert.equal(hash(read(PUB)),PUBLIC_SHA);assert.equal(bundle[0].candidateSha256,PUBLIC_SHA);assert.equal(bundle[0].geometrySource,PUBLIC_SHA);assert.deepEqual(load(bundle),ENTRY)
 assert.equal(hash(JSON.stringify(INPUT.strokes)),f.compiledSHA256);assert.deepEqual(INPUT.strokes,source.outlines);assert.deepEqual(INPUT.fullProof,source.engineProof);assert.deepEqual(INPUT.identity,source.sourceIdentity)
 assert.equal(INPUT.strokes.length,13);assert.equal(INPUT.strokes.flat().length,16);assert.equal(INPUT.strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),27)
 assert.deepEqual(f.sourceGroups.flat().sort((a:number,b:number)=>a-b),Array.from({length:16},(_,i)=>i));assert.deepEqual(bundle[0].sourceStrokeIndices,f.sourceGroups.map((g:number[])=>g[0]+1))
 assert.deepEqual(bundle[0].paths,INPUT.strokes.map(s=>s.map(m=>m.outline).join(' ')));assert.equal(hash(JSON.stringify(bundle[0].paths)),bundle[0].pathsSha256)
 const ctx=makeLocalU5ac2RevealContext(INPUT.fullProof,INPUT.identity,INPUT.strokes);assert(ctx);assert.deepEqual(INPUT.strokes.flatMap((s,p)=>s.map((_,m)=>localU5ac2RevealPolicy(ctx,p,m)).filter(Boolean)).map(x=>[x!.pen,x!.mask]),[[1,1],[1,2],[2,1],[4,1],[12,2],[13,1]])
 const n=json(APPROVAL.path);assert.equal(hash(read(APPROVAL.path)),APPROVAL.SHA256);assert.equal(n.approval.finiteForwardCandidateApproved,true);assert.equal(n.approval.sourceConservingSixMasksReviewed,true);assert.equal(n.approval.fiveFreshNaturalRunsReviewed,true);assert.equal(nativeApproved,true)
 assert.equal(source.review.preparationSnapshot.runtimeApplied,false);assert.equal(source.review.preparationSnapshot.historicalSnapshot,true);assert.equal(source.review.examBodyApproved,false);assert.equal(source.review.actualAppUIFreshlyVerified,false);assert.equal(source.review.sourceMicroclockIdentityApproved,false);assert.equal(source.review.allIntermediateFramesClaimed,false)
 assert.equal(source.review.reviewedEffectiveComponentSHA256,'50c208aee36e67d097211b206b345aafd86500291e207838737d8c1c31dde219');assert.equal(n.inputSHA256['components/hanja/stroke-outlines.tsx'],source.review.reviewedEffectiveComponentSHA256)
 assert(!JSON.stringify(source).includes('registrySHA256'));assert(!JSON.stringify(source).includes('candidateSha256'));assert.equal(ENTRY[0].variant.catalogStrokes,12);assert.equal(ENTRY[0].variant.playbackStrokes,13)
})
test('1506 exact loader accepts reordered ordinary clones and rejects malformed source without invoking getters',()=>{
 const clone=()=>JSON.parse(JSON.stringify(bundle));const reordered=(v:unknown):unknown=>Array.isArray(v)?v.map(reordered):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).reverse().map(([k,x])=>[k,reordered(x)])):v
 assert.deepEqual(load(reordered(bundle)),ENTRY);assert(Object.isFrozen(ENTRY));assert(Object.isFrozen(ENTRY[0].outlines));assert.throws(()=>Reflect.apply(load,null,[]));assert.throws(()=>Reflect.apply(load,null,[bundle,0]))
 for(const mutate of[(x:typeof bundle)=>{x[0].variant.catalogStrokes=13},(x:typeof bundle)=>{x[0].variant.playbackStrokes=12},(x:typeof bundle)=>{x[0].variant.form='任意'},(x:typeof bundle)=>{delete x[0].variant},(x:typeof bundle)=>{x[0].paths[0]+=' '},(x:typeof bundle)=>{x[0].outlines[0][0].revealPath+=' '},(x:typeof bundle)=>{x[0].outlines[0][0].weight+=1},(x:typeof bundle)=>{x[0].sourceReference.geometryReviewSha256='0'.repeat(64)},(x:typeof bundle)=>{x[0].candidateSha256='0'.repeat(64)},(x:typeof bundle)=>{x[0].extra=true}]){const x=clone();mutate(x);assert.throws(()=>load(x))}
 let gets=0;const accessor=clone();Object.defineProperty(accessor[0],'glyph',{enumerable:true,get(){gets++;return '嫂'}});assert.throws(()=>load(accessor));assert.equal(gets,0)
 const symbol=clone();symbol[0][Symbol('extra')]=true;assert.throws(()=>load(symbol));const prototype=clone();Object.setPrototypeOf(prototype[0],null);assert.throws(()=>load(prototype));const extraArray=clone();extraArray.extra=1;assert.throws(()=>load(extraArray))
})
test('1506 current renderer retains each exact owned C integration run once',()=>{
 const patch=read(FOLDER+'source-reveal-r-integration.patch').toString(),renderer=read('components/hanja/stroke-outlines.tsx').toString();const runs:string[]=[];let run:string[]=[]
 for(const line of patch.split('\n')){if(line.startsWith('+'))run.push(line.slice(1));else if(run.length){const text=run.join('\n');if(text.trim())runs.push(text);run=[]}}assert(runs.length>=4);for(const owned of runs)assert.equal(renderer.split(owned).length,2,'Exact owned C addition remains once')
})
test('1506 activation tail follows ROOT status and preserves catalogue12 dictionary13 separation',async()=>{
 const {HANJA_STROKES,hanjaStrokeData}=await import('./hanja-strokes.ts'),{HANJA_VARIANT_STROKES,hanjaPlaybackVariant}=await import('./hanja-stroke-variants.ts')
 assert.equal(authorized,applied);const matches=HANJA_STROKES.filter(x=>x.glyph==='嫂'),variants=HANJA_VARIANT_STROKES.filter(x=>x.glyph==='嫂')
 if(!applied){assert.equal(matches.length,0);assert.equal(variants.length,0);assert.equal(hanjaStrokeData({glyph:'嫂',strokes:12}),null);return}
 assert.equal(matches.length,1);assert.equal(variants.length,1);assert.deepEqual(hanjaStrokeData({glyph:'嫂',strokes:12}),ENTRY[0]);assert.equal(hanjaPlaybackVariant({glyph:'嫂',strokes:12})?.paths.length,13)
 for(let strokes=0;strokes<50;strokes++)if(strokes!==12){assert.equal(hanjaStrokeData({glyph:'嫂',strokes}),null);assert.equal(hanjaPlaybackVariant({glyph:'嫂',strokes}),null)}
 const dir=new URL('../content/hanja/characters/',import.meta.url),catalog=readdirSync(dir).filter(x=>x.endsWith('.json')).flatMap(x=>JSON.parse(readFileSync(new URL(x,dir),'utf8')).characters);assert.equal(catalog.length,5978);const resolved=catalog.filter((x:{glyph:string;strokes:number})=>hanjaStrokeData(x));assert.equal(new Set(HANJA_STROKES.map(x=>x.glyph)).size,resolved.length)
 console.log(JSON.stringify({glyph:'嫂',catalog12:true,playback13:true,registered:resolved.length,remaining:5978-resolved.length,build:false}))
})
