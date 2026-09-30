import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url)))
const s=read('./sources.json'),p=read('./engine-trace.json'),f=read('./findings.json')
assert.equal(s.root,'u90b0-j')
assert.deepEqual(s.providerVersions.map(v=>[v.name,v.version]),[['u90b0-j',3],['u53f0-08',6],['u53e3-j',20],['u961d-02',18]])
for(const r of Object.values(s.records))for(const l of r.data.split('$'))if(l.startsWith('99:'))assert(s.records[l.split(':')[7]])
assert.equal(Object.keys(p.hashes).length,8);assert.equal(p.trace.length,11)
const a=p.trace[0].calls[0],b=p.trace[1].calls[0]
assert.equal(a.kind,'cdDrawCurve');assert.equal(b.kind,'cdDrawCurve')
assert.deepEqual(a.args.slice(4,6),[29.349999999999994,86]);assert.deepEqual(b.args.slice(0,2),[13.75,88])
assert.notDeepEqual(a.args.slice(4,6),b.args.slice(0,2))
assert.deepEqual(p.trace[8].calls[0].args.slice(4,6),[147.75,84]);assert.deepEqual(p.trace[9].calls[0].args.slice(0,2),[147.75,83])
assert.equal(f.status,'held');assert.equal(f.runtimeAdded,0);assert.equal(f.domestic.strokeOutlines,8)
assert.equal(hanjaStrokeData({glyph:'邰',strokes:8}),null)
console.log(JSON.stringify({passed:true,glyph:'邰',discontinuityConfirmed:true,runtimeAdded:0}))
