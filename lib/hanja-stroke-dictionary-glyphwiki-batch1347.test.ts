import assert from 'node:assert/strict'
import test from 'node:test'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import ts from'typescript'
import{HANJA_DICTIONARY_GLYPHWIKI_BATCH1347_STROKES as EXPECTED,loadGlyphWikiBatch1347Strokes as load,GLYPHWIKI_BATCH1347_NATIVE_APPROVAL,GLYPHWIKI_BATCH1347_RUNTIME_APPLIED,GLYPHWIKI_BATCH1347_ASSIGNMENT_PROVISIONAL,GLYPHWIKI_BATCH1347_ACTIVATION_REVIEW,GLYPHWIKI_BATCH1347_ACTUAL_PRODUCT_APP_UI,GLYPHWIKI_BATCH1347_ALL_PENS_AUTOPLAY_APPROVED}from'./hanja-stroke-dictionary-glyphwiki-batch1347.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex'),clone=(v:any)=>JSON.parse(JSON.stringify(v))
test('1347 고정 준비bundle 의미동일성·정확source결박과 실제변조음성',()=>{
 const bundle=json('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1347.json'),asset=json('public/hanja-strokes/glyphwiki/u5bd8.json'),cache=json('docs/hanja-source-cache-u5bd8-2026-10-22/source.json')
 assert.deepEqual(load(bundle),EXPECTED);assert.equal(EXPECTED[0].geometrySource,sha(bytes('public/hanja-strokes/glyphwiki/u5bd8.json')))
 assert.deepEqual(bundle[0].outlines,cache.strokes);assert.equal(sha(JSON.stringify(cache.strokes)),"09d0c9e1a5d83a69b0e1e0715ca375759bf5ef205da91a54b97a8a9924e951cc")
 assert.deepEqual(asset.engineProof,json('docs/hanja-public-glyphwiki-engine-capture-second-six-2026-10-22/engine-whole-u5bd8.json'));assert.equal(sha(bytes('docs/hanja-public-glyphwiki-engine-capture-second-six-2026-10-22/engine-whole-u5bd8.json')),"56562fc1898b65d7101b8ccf89cb3ebb9f65623c6dd876b286eda83dbe21b223")
 assert.deepEqual(asset.sourceGroups,cache.sourceGroups);assert.deepEqual(asset.sourceIdentity,cache.identity);assert.equal(asset.preparationHistory.runtimeApplied,false)
 assert.equal(asset.records.length,6);assert.deepEqual(asset.exactInterRawJoins,[[2,3],[7,8]]);assert.equal(asset.independentMaskPolicies.length,1)
 assert.equal(GLYPHWIKI_BATCH1347_NATIVE_APPROVAL,true);assert.equal(GLYPHWIKI_BATCH1347_RUNTIME_APPLIED,true);assert.equal(GLYPHWIKI_BATCH1347_ASSIGNMENT_PROVISIONAL,false);assert(Object.isFrozen(EXPECTED[0].outlines![2][0].bounds))
 const reordered=bundle.map((b:any)=>Object.fromEntries(Object.entries(b).reverse()));assert.deepEqual(load(reordered),EXPECTED)
 for(const args of[[],[bundle,{}]])assert.throws(()=>Reflect.apply(load,null,args))
 for(const mutate of[(b:any)=>b[0].glyph='wrong',(b:any)=>b[0].outlines[2][0].weight++,(b:any)=>b[0].outlines[2][0].revealPath+=' ',(b:any)=>b[0].outlines[4][0].bounds[0]++,(b:any)=>b[0].sourceStrokeIndices.reverse(),(b:any)=>b[0].paths[0]+=' ',(b:any)=>b[0].nativeApproval=true]){
  const bad=clone(bundle);mutate(bad);assert.notDeepEqual(bad,bundle);assert.throws(()=>load(bad))
 }
 const sparse=clone(bundle);delete sparse[0].outlines[2][0];assert.throws(()=>load(sparse))
 const inherited=clone(bundle),m=inherited[0].outlines[2][0],weight=m.weight;delete m.weight;Object.setPrototypeOf(m,{weight});assert.throws(()=>load(inherited))
 let reads=0;const getter=clone(bundle);Object.defineProperty(getter[0].outlines[2][0],'weight',{enumerable:true,get(){reads++;return weight}});assert.throws(()=>load(getter));assert.equal(reads,0)
 const symbol=clone(bundle);symbol[0][Symbol('extra')]=1;assert.throws(()=>load(symbol));assert.throws(()=>{(EXPECTED[0].outlines![2][0].bounds as number[])[0]++})
})

// New correction tail only; original successful loader/strict negatives are not repeated.
test('1347 source-preserving UP5 and independent VH11 correction',async()=>{
 const c=json('docs/hanja-source-cache-u5bd8-2026-10-22/source.json'),b=json('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1347.json'),a=json('public/hanja-strokes/glyphwiki/u5bd8.json');const m=await import('../docs/hanja-source-cache-u5bd8-2026-10-22/source.mjs'),p=a.engineProof;assert.deepEqual(m.compileProgressive(p.trace,p,c.identity),c.strokes);assert.equal(m.projectionCallCount(),0);assert.equal(m.cachedCorrectionCallCount(),0);assert.deepEqual(load(b),EXPECTED);assert.deepEqual(EXPECTED[0].outlines,c.strokes);assert.equal(c.strokes.length,13);assert.equal(c.strokes.flat().length,15);assert.equal(c.strokes.flat().map((x:any)=>x.outline).join(' ').match(/M/g).length,34);assert.equal(c.geometrySHA256,"09d0c9e1a5d83a69b0e1e0715ca375759bf5ef205da91a54b97a8a9924e951cc");assert.deepEqual(c.strokes[4].map((x:any)=>x.direction),['curve','up']);assert.equal(c.strokes[4][0].weight,73.963568);assert.equal(c.strokes[4][1].weight,6.5);assert.equal(c.strokes[4][0].revealPath,"M24 23.6125 L24 34.504999999999995 Q24 39.504999999999995 29 39.504999999999995 L85 39.504999999999995");assert.deepEqual(c.strokes[10].map((x:any)=>x.direction),['down','right']);assert.deepEqual(c.strokes[10].map((x:any)=>x.weight),[33.415,76.5]);assert(c.strokes[10].every((x:any)=>!Object.hasOwn(x,'revealPath')));assert.equal(sha(JSON.stringify(EXPECTED[0].paths)),"022b4d857548a5c9f8481a660301f73eb7cc9983fbef81c14149ef6646d329e0");assert.equal(a.sourceProvenance.sourceModuleSHA256,sha(bytes('docs/hanja-source-cache-u5bd8-2026-10-22/source.mjs')));assert.equal(a.sourceProvenance.cacheFileSHA256,sha(bytes('docs/hanja-source-cache-u5bd8-2026-10-22/source.json')));assert.equal(EXPECTED[0].geometrySource,sha(bytes('public/hanja-strokes/glyphwiki/u5bd8.json')));assert.equal(c.correctionHistory.successfulCachedCorrectionOperations,1);assert.equal(c.nativeApproval,false);assert.equal(a.preparationHistory.runtimeApplied,false);assert.equal(GLYPHWIKI_BATCH1347_NATIVE_APPROVAL,true);
 for(const mutate of[(x:any)=>x[0].outlines[4].pop(),(x:any)=>x[0].outlines[4][1].weight=13,(x:any)=>x[0].outlines[10].reverse(),(x:any)=>x[0].outlines[10][0].direction='curve']){const bad=clone(b);mutate(bad);assert.throws(()=>load(bad));}
 const native=json("docs/hanja-actual-component-profiles-2026-10-22/u5bd8-native-review.json");assert.equal(native.native.validScreens,21);assert.deepEqual(native.native.fullRoundResidual.failurePens,[5,11]);assert.equal(native.historicalInputPinsAtObservation.geometrySHA256,"49d4afb76f69af37ce081c75284251481a203aeb5c2bb51196bc4f2f82f14b04");assert.equal(native.approval.runtimeApplied,false);
})


// ROOT activation: run this new tail alone; no prior loader negatives/source tests are replayed.
test('1347 activation tail ROOT finite approval and active registration',()=>{
 const r=json(GLYPHWIKI_BATCH1347_ACTIVATION_REVIEW.path)
 assert.equal(sha(bytes(GLYPHWIKI_BATCH1347_ACTIVATION_REVIEW.path)),GLYPHWIKI_BATCH1347_ACTIVATION_REVIEW.SHA256)
 assert.equal(r.schema,'hanja-actual-component-activation-review/v1');assert.equal(r.glyph,'寘');assert.equal(r.batch,1347)
 for(const[p,h]of Object.entries(r.inputSHA256))assert.equal(sha(bytes(p)),h,p)
 const c=json('docs/hanja-source-cache-u5bd8-2026-10-22/source.json'),a=json('public/hanja-strokes/glyphwiki/u5bd8.json')
 assert.equal(sha(JSON.stringify(c.strokes)),r.geometry.SHA256);assert.deepEqual([c.strokes.length,c.strokes.flat().length,c.strokes.flat().map((x:any)=>x.outline).join(' ').match(/M/g).length],[13,15,34]);assert.deepEqual(EXPECTED[0].outlines,c.strokes);assert.equal(EXPECTED[0].geometrySource,sha(bytes('public/hanja-strokes/glyphwiki/u5bd8.json')))
 assert.equal(c.nativeApproval,false);assert.equal(a.preparationHistory.runtimeApplied,false)
 assert.equal(GLYPHWIKI_BATCH1347_NATIVE_APPROVAL,true);assert.equal(GLYPHWIKI_BATCH1347_RUNTIME_APPLIED,true);assert.equal(GLYPHWIKI_BATCH1347_ASSIGNMENT_PROVISIONAL,false);assert.equal(GLYPHWIKI_BATCH1347_ACTUAL_PRODUCT_APP_UI,false);assert.equal(GLYPHWIKI_BATCH1347_ALL_PENS_AUTOPLAY_APPROVED,false)
 assert.equal(r.correctedNative.uniqueScreens,15);assert.equal(r.correctedNative.breakdown.reduce((n:number,x:any)=>n+x.screens,0),15);assert.equal(r.currentCoarseAcceptance.retainedUnchanged11PensSamples+r.currentCoarseAcceptance.newReplacementSamples,117)
 assert.deepEqual(r.currentCoverageAcceptance.retainedOriginalBlankCurvePens,[2,3,4,7,12,13]);assert.deepEqual(r.currentCoverageAcceptance.newBlankCurveBodyPens,[5]);assert.equal(r.historicalHold.oldApprovalRemainsFalse,true)
 const old=json(r.historicalHold.file);assert.equal(old.approval.nativeApproval,false);assert.deepEqual(old.native.fullRoundResidual.failurePens,[5,11])
 assert.equal(r.approval.isolatedActualComponentFiniteObservation,true);assert.equal(r.approval.rootRegistrationApproved,true);assert.equal(r.approval.runtimeApplied,true);for(const k of['actualProductAppUI','actualAppUI','controllerWorkflow','storage','all13Autoplay','wholeReplay'])assert.equal(r.approval[k],false)
 const registry=readFileSync(new URL('./hanja-strokes.ts',import.meta.url),'utf8'),sf=ts.createSourceFile('hanja-strokes.ts',registry,ts.ScriptTarget.Latest,true),imports=new Map<string,{file:string,symbol:string}>()
 for(const n of sf.statements)if(ts.isImportDeclaration(n)&&n.importClause?.namedBindings&&ts.isNamedImports(n.importClause.namedBindings)&&ts.isStringLiteral(n.moduleSpecifier))for(const x of n.importClause.namedBindings.elements)imports.set(x.name.text,{file:n.moduleSpecifier.text,symbol:x.propertyName?.text??x.name.text})
 let array:ts.Expression|undefined;function locate(n:ts.Node){if(ts.isVariableDeclaration(n)&&ts.isIdentifier(n.name)&&n.name.text==='HANJA_STROKES')array=n.initializer;ts.forEachChild(n,locate)}locate(sf)
 while(array&&(ts.isAsExpression(array)||ts.isSatisfiesExpression(array)||ts.isParenthesizedExpression(array)))array=array.expression
 assert(array&&ts.isArrayLiteralExpression(array));let targetSpreads=0;const added=new Set<string>()
 for(const n of array.elements){if(!ts.isSpreadElement(n)||!ts.isIdentifier(n.expression))continue
  if(n.expression.text===r.registration.symbol)targetSpreads++
  const b=imports.get(n.expression.text),batch=Number(b?.file.match(/batch(\d+)\.ts$/)?.[1]);if(!b||batch<=1330||!Number.isFinite(batch))continue
  const text=readFileSync(new URL(b.file,import.meta.url),'utf8'),module=ts.createSourceFile(b.file,text,ts.ScriptTarget.Latest,true),glyphs=new Set<string>()
  function literals(x:ts.Node){if(ts.isPropertyAssignment(x)&&(ts.isIdentifier(x.name)?x.name.text:ts.isStringLiteral(x.name)?x.name.text:'')==='glyph'&&ts.isStringLiteral(x.initializer))glyphs.add(x.initializer.text);ts.forEachChild(x,literals)}literals(module);assert.equal(glyphs.size,1);for(const g of glyphs)added.add(g)
 }
 assert.equal(targetSpreads,1);assert.equal(imports.get(r.registration.symbol)?.file,'./hanja-stroke-dictionary-glyphwiki-batch1347.ts')
 // Necessary frozen baseline manifest read only; no registry/source module evaluation.
 const manifest=json('docs/hanja-remaining-232-static-inventory-2026-10-21/inventory.json'),baseMissing=new Set<string>(manifest.missing.map((x:any)=>x.glyph))
 assert.equal(manifest.counts.registeredUniqueStatic,5746);for(const g of added)assert(baseMissing.has(g))
 const counts={registeredUniqueStatic:manifest.counts.registeredUniqueStatic+added.size,remainingStatic:manifest.missing.filter((x:any)=>!added.has(x.glyph)).length,targetMatches:EXPECTED.filter(x=>x.glyph==='寘').length}
 assert.deepEqual(counts,{registeredUniqueStatic:5762,remainingStatic:216,targetMatches:1});assert.equal(r.registration.expectedRegisteredUnique,counts.registeredUniqueStatic);assert.equal(r.registration.expectedRemaining,counts.remainingStatic);assert.equal(bytes('public/hanja-strokes/glyphwiki/u5bd8.NOTICE.md').length>0,true)
 console.log('ACTIVATION_RESULT '+JSON.stringify({...counts,pens:13,masks:15,polygons:34,geometrySHA256:r.geometry.SHA256,newActivationTail:1,oldLoaderNegativesRepeated:false,sourceProjection:0,sourceCompiler:0,engine:0,SSR:0,build:false}))
})
