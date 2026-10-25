import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {gunzipSync} from 'node:zlib'
import vm from 'node:vm'
const b='/Users/kidow/Documents/dev/kidow/lingo/',sha=x=>createHash('sha256').update(x).digest('hex')
// Public authored GlyphWiki records and pinned public engine8 only. No private SVG/image/CSS/learning/auth inputs.
const inputs=[{"path":"docs/hanja-source-alternative-u7a48-hkcs-2026-10-26/sources.json","sha":"7f8345f1a7fe9863fa5d609f83290fce845cb13b667243de145f56f705717c1e","root":"hkcs_m7a48"}]
const codes=JSON.parse(gunzipSync(Buffer.from(readFileSync('/private/tmp/hanja-pinned-engine8-49232-2026-10-23.json.gz.b64','utf8').trim(),'base64'))),ref=JSON.parse(readFileSync(b+'docs/hanja-actual-engine-capture-u85a9-hkcs-2026-10-24/capture.json')),hashes=ref.engine.actualLoadedHashes
assert.equal(ref.engine.revision,'49232bac0348fe815f4200d4116ab7917e0db47f');assert.deepEqual(Object.keys(codes),Object.keys(hashes));for(const[file,hash]of Object.entries(hashes))assert.equal(sha(codes[file]),hash)
const INSTRUMENT="\nconst k=new Kage();for(const[name,r]of Object.entries(records))k.kBuhin.push(name,r.data);\nconst groups=[],trace=[];let calls=[],makeGlyphCalls=0;\nfor(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}\nconst orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};\nconst originalMake=k.makeGlyph;k.makeGlyph=function(...args){makeGlyphCalls++;return originalMake.apply(this,args)};\nconst p=new Polygons();k.makeGlyph(p,root);\nJSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep},whole:p.array.map(p=>p.array),makeGlyphCalls})"
const outputs=[]
for(const input of inputs){
 const bytes=readFileSync(b+input.path);assert.equal(sha(bytes),input.sha);const source=JSON.parse(bytes);assert.equal(source.root,input.root)
 const seen=new Set();function visit(name,chain=[]){assert(!chain.includes(name));if(seen.has(name))return;const r=source.records[name];assert(r);seen.add(name);for(const line of r.data.split('$')){const a=line.split(':');if(a[0]==='99')visit(a[7],[...chain,name]);}}visit(source.root);assert.deepEqual([...seen].sort(),Object.keys(source.records).sort())
 const ctx=vm.createContext({records:source.records,root:source.root}),actualLoadedHashes={};for(const[file,code]of Object.entries(codes)){actualLoadedHashes[file]=sha(code);vm.runInContext(code,ctx,{timeout:1000,filename:file});}
 const result=JSON.parse(vm.runInContext(INSTRUMENT,ctx,{timeout:3000}));assert.equal(result.makeGlyphCalls,1);assert.deepEqual(result.groups.flatMap(g=>g.polygons),result.whole);assert.deepEqual(result.groups.map(g=>g.polygons),result.trace.map(row=>row.flatMap(call=>call.polygons)));
 const full5={engineRevision:ref.engine.revision,engineHashes:actualLoadedHashes,groups:result.groups,trace:result.trace,defaults:result.defaults};assert.deepEqual(Object.keys(full5).sort(),['defaults','engineHashes','engineRevision','groups','trace']);
 outputs.push({sourcePath:input.path,sourceSHA256:input.sha,root:source.root,full5,captureFacts:{actualVMContexts:1,vendorEvaluations:8,captureEvaluation:1,makeGlyphCalls:result.makeGlyphCalls,actualProviderRoot:source.root,aliasInserted:false,wholePolygonsSHA256:sha(JSON.stringify(result.whole)),wholeAndTracePolygonsExactlySame:true,instrumentSHA256:sha(INSTRUMENT),raw:result.groups.length,calls:result.trace.flat().length,polygons:result.whole.length,nativeApproval:false,runtimeApplied:false,newHeaderFromExecutedCodeBytesOnly:true,oldHeaderOrBodyCombined:false,sourceProjection:0}})
}
export const publicOutputs=outputs
console.log(JSON.stringify({publicOnly:true,privateMediaInputs:false,summary:outputs.map(o=>({root:o.root,...o.captureFacts}))}))
