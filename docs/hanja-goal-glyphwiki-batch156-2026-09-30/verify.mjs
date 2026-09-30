import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url)))
const s=read('./sources.json'),p=read('./engine-trace.json'),f=read('./findings.json')
assert.equal(s.root,'u8fcb')
assert.deepEqual(s.providerVersions.map(v=>[v.name,v.version]),[['u8fcb',13],['u8fb6-j',2],['u738b-j',3]])
for(const r of Object.values(s.records))for(const l of r.data.split('$'))if(l.startsWith('99:'))assert(s.records[l.split(':')[7]])
assert.equal(Object.keys(p.hashes).length,8);assert.equal(p.trace.length,10)
const a=p.trace[4].calls[0],b=p.trace[5].calls[0]
assert.equal(a.kind,'cdDrawCurve');assert.equal(b.kind,'cdDrawBezier')
assert.deepEqual(a.args.slice(4,6),[55,154]);assert.deepEqual(b.args.slice(0,2),[53,152])
assert.notDeepEqual(a.args.slice(4,6),b.args.slice(0,2))
assert.equal(f.status,'held');assert.equal(f.runtimeAdded,0);assert.equal(f.domestic.strokeOutlines,8)
assert.equal(hanjaStrokeData({glyph:'迋',strokes:8}),null)
console.log(JSON.stringify({passed:true,glyph:'迋',discontinuityConfirmed:true,runtimeAdded:0}))
