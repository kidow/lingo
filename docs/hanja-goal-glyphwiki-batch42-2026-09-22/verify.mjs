import assert from 'node:assert/strict'
import{readFileSync}from'node:fs'
import{hanjaStrokeData}from'../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const source=read('./sources.json'),f=read('./findings.json')
assert.equal(hanjaStrokeData({glyph:'萎',strokes:12}),null)
assert.equal(f.full12StrokeApproval,false);assert.equal(f.runtimeAdded,0)
const rows=source.records['u5973-04'].data.split('$').map(r=>r.split(':').map(Number))
assert.deepEqual(rows[0].slice(-2),[48,156]);assert.deepEqual(rows[1].slice(3,5),[56,146]);assert.notDeepEqual(rows[0].slice(-2),rows[1].slice(3,5))
let count=0
if(process.argv.includes('--sources'))for(const r of Object.values(source.records)){
 const res=await fetch('https://glyphwiki.org/api/glyph?name='+encodeURIComponent(r.name+'@'+r.version),{signal:AbortSignal.timeout(15000)})
 assert(res.ok,'GlyphWiki HTTP '+res.status);const a=await res.json();for(const k of ['name','data','related'])assert.equal(a[k],r[k]);assert.equal(Number(a.version),Number(r.version));count++
}
console.log(JSON.stringify({passed:true,heldGlyphs:1,reviewedDictionarySteps:f.reviewedDictionarySteps,unconnectedBoundary:true,sourceVersions:count,runtimeAdded:0,privateMediaSaved:false}))
