import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { hanjaStrokeData } from '../../lib/hanja-strokes.ts'
const read=name=>JSON.parse(readFileSync(new URL(name,import.meta.url),'utf8'))
const source=read('./sources.json'),alts=read('./alternatives.json'),f=read('./findings.json')
assert.equal(hanjaStrokeData({glyph:'蓉',strokes:14}),null)
assert.equal(f.approved,false); assert.equal(f.runtimeAdded,0)
assert.deepEqual(f.groups.flat(),Array.from({length:16},(_,i)=>i+1))
assert.equal(new Set(f.order).size,14)
const normal=source.records['u8c37-04'].data.split('$')
const taiwan=alts.entries.find(e=>e.root==='u84c9-t').records['u8c37-t04'].data.split('$')
assert.deepEqual(normal.slice(0,6),taiwan.slice(0,6))
assert.equal(normal[4],'1:12:13:63:139:63:177')
const unique=new Map([source,...alts.entries].flatMap(s=>Object.values(s.records).map(r=>[r.name+'@'+r.version,r])))
let versions=0
if(process.argv.includes('--sources'))for(const[key,r]of unique){
 const response=await fetch('https://glyphwiki.org/api/glyph?name='+encodeURIComponent(key),{signal:AbortSignal.timeout(15000)})
 assert(response.ok,'GlyphWiki HTTP '+response.status);const a=await response.json()
 for(const k of ['name','data','related'])assert.equal(a[k],r[k]);assert.equal(Number(a.version),Number(r.version));versions++
}
console.log(JSON.stringify({passed:true,heldGlyphs:1,visualSteps:14,records:unique.size,sourceVersions:versions,runtimeAdded:0,privateGraphicsSaved:false}))
