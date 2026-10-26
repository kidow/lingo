import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {gunzipSync} from 'node:zlib'
import vm from 'node:vm'
const b='/Users/kidow/Documents/dev/kidow/lingo/',sha=x=>createHash('sha256').update(x).digest('hex')
const pins={
 'docs/hanja-source-alternative-u7aea-kesuuko-2026-10-26/sources.json':'790479cb51e9f0525e5724b8f6f65fbcfb28755699f3eb0a1b2ea7f2fa94c95b',
 'docs/hanja-source-alternative-u7aea-kesuuko-2026-10-26/additional-public-records.json':'38c1a25a925326432f216782286a711f4caa3d903869cb07ac8067449e63f571'
}
const docs=Object.entries(pins).map(([p,h])=>{const v=readFileSync(b+p);assert.equal(sha(v),h);return JSON.parse(v)})
const records={...docs[0].records,...docs[1].records},root=docs[0].root
assert.equal(root,'kesuuko_dot88-u7aea');assert.equal(Object.keys(records).length,38)
const seen=new Set()
function visit(n,chain=[]){assert(!chain.includes(n));if(seen.has(n))return;const r=records[n];assert(r);assert.equal(r.name,n);seen.add(n);for(const row of r.data.split('$')){const a=row.split(':');if(a[0]==='99')visit(a[7],[...chain,n])}}
visit(root);assert.equal(seen.size,38)
const codes=JSON.parse(gunzipSync(Buffer.from(readFileSync('/private/tmp/hanja-pinned-engine8-49232-2026-10-23.json.gz.b64','utf8').trim(),'base64')))
const refBytes=readFileSync(b+'docs/hanja-actual-engine-capture-u85a9-hkcs-2026-10-24/capture.json');assert.equal(sha(refBytes),'ab6f45a9c05f357e08c5ffd410053eecf51185a2c1ca73bf6742d3174cd305ef');const ref=JSON.parse(refBytes)
assert.equal(ref.engine.revision,'49232bac0348fe815f4200d4116ab7917e0db47f');assert.deepEqual(Object.keys(codes),Object.keys(ref.engine.actualLoadedHashes))
for(const[f,h]of Object.entries(ref.engine.actualLoadedHashes))assert.equal(sha(codes[f]),h)
const helper=readFileSync(b+'docs/hanja-actual-engine-capture-u7443-g-2026-10-26/capture-once.mjs','utf8')
assert.equal(sha(helper),'8908ddd029d49213f6369e264949b6e74fea01a446eb4ac6dca5cde264f76c0a')
const instrument=JSON.parse(helper.match(/^const INSTRUMENT=(.*)$/m)[1])
const ctx=vm.createContext({records,root}),actualLoadedHashes={}
for(const[f,c]of Object.entries(codes)){actualLoadedHashes[f]=sha(c);vm.runInContext(c,ctx,{timeout:1000,filename:f})}
const result=JSON.parse(vm.runInContext(instrument,ctx,{timeout:10000}))
assert.equal(result.makeGlyphCalls,1);assert.equal(result.groups.length,128)
assert.deepEqual(result.groups.flatMap(g=>g.polygons),result.whole)
assert.deepEqual(result.groups.map(g=>g.polygons),result.trace.map(row=>row.flatMap(call=>call.polygons)))
export const full5={engineRevision:ref.engine.revision,engineHashes:actualLoadedHashes,groups:result.groups,trace:result.trace,defaults:result.defaults}
export const captureFacts={actualVMContexts:1,vendorEvaluations:8,captureEvaluation:1,makeGlyphCalls:result.makeGlyphCalls,actualProviderRoot:root,aliasInserted:false,sourceRecords:38,raw:result.groups.length,calls:result.trace.flat().length,polygons:result.whole.length,wholeAndTracePolygonsExactlySame:true,wholePolygonsSHA256:sha(JSON.stringify(result.whole)),instrumentSHA256:sha(instrument),newHeaderFromExecutedCodeBytesOnly:true,oldHeaderOrBodyCombined:false,sourceProjection:0,nativeApproval:false,runtimeApplied:false}
