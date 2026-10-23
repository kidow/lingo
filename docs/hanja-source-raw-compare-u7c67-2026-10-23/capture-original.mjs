// One missing actual full5 capture for the static gate; no projector or SVG animation.
import fs from 'node:fs'
import vm from 'node:vm'
import zlib from 'node:zlib'
import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'
const sha=b=>createHash('sha256').update(b).digest('hex')
const cache=fs.readFileSync('/private/tmp/hanja-pinned-engine8-49232-2026-10-23.json.gz.b64')
assert.equal(sha(cache),'e44f6edec0b18b0aa097042d00913672842dc7049eb1a56bcafce69643a518da')
const codes=JSON.parse(zlib.gunzipSync(Buffer.from(cache.toString(),'base64')))
const dir=new URL('../hanja-goal-glyphwiki-batch414-2026-10-09/',import.meta.url)
const read=name=>fs.readFileSync(new URL(name,dir))
const inputs={'engine-proof.json':'e39b22b71e665cc542587e82049ee405a80ca8488cef9ab1fe3349f41d75844c','draw-trace.json':'67c0480f7b19474f2d23c0adc7866591c1b1b1f753d7f07bad661f6177cdce71','sources.json':'637f5c2f6467aeed655aa5187b3dfbbf25709b37690b95c37e2ed7e44b318693'}
for(const[name,pin]of Object.entries(inputs))assert.equal(sha(read(name)),pin)
const header=JSON.parse(read('engine-proof.json')),trace=JSON.parse(read('draw-trace.json')),sources=JSON.parse(read('sources.json'))
assert.deepEqual(Object.keys(header),['engineRevision','engineHashes','groups','defaults'])
assert.equal(Object.keys(header.engineHashes).length,8)
const ctx=vm.createContext({records:sources.records,root:sources.root})
for(const[name,pin]of Object.entries(header.engineHashes)){const code=codes[name];assert.equal(typeof code,'string');assert.equal(sha(code),pin);vm.runInContext(code,ctx,{timeout:1000})}
const old=read('verify.mjs').toString(),start=old.indexOf('const actual=JSON.parse(vm.runInContext('),end=old.indexOf('\nassert.deepEqual(actual.groups',start)
assert(start>=0&&end>start)
const actual=new Function('vm','ctx',old.slice(start,end).replace('const actual=','return '))(vm,ctx)
assert.deepEqual(actual.groups,header.groups)
assert.deepEqual(actual.defaults,header.defaults)
assert.deepEqual(actual.trace,trace)
const full={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...actual}
assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
assert.deepEqual([full.groups.length,full.trace.length,full.trace.flat().length,full.groups.flatMap(g=>g.polygons).length],[26,26,30,60])
console.log(JSON.stringify({full,actualCaptureRuns:1,engineLoads:8,header4TraceExact:true,sourceInputs:inputs,HTTP:0,sourceProjection:0,SVGAnimation:0,nativeApproval:false}))
