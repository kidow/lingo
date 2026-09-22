import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { normalizedPolygonPath, normalizedOutline } from './normalize.mjs'

const read = path => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'))
const parse = outline => outline.split(' Z').map(p => p.trim()).filter(Boolean).map(path =>
  [...path.matchAll(/[ML](-?[0-9.]+) (-?[0-9.]+)/g)].map(m => ({ x: Number(m[1]), y: Number(m[2]) })))
const signedArea = polygon => polygon.reduce((n,p,i) => {
  const next = polygon[(i+1)%polygon.length]
  return n + p.x*next.y-next.x*p.y
},0)
function winding(polygon, x, y) {
  let value = 0
  for(let i=0;i<polygon.length;i++) {
    const a=polygon[i],b=polygon[(i+1)%polygon.length]
    const side=(b.x-a.x)*(y-a.y)-(x-a.x)*(b.y-a.y)
    if(a.y<=y && b.y>y && side>0)value++
    if(a.y>y && b.y<=y && side<0)value--
  }
  return value
}
const results=[]
for(const [batch,glyph,stroke,raw] of [[45,'芍',5,4],[47,'菽',9,9]]) {
  const base='../hanja-goal-glyphwiki-batch'+batch+'-2026-09-22/'
  const trace=read(base+'draw-trace.json')
  const runtime=read('../../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch'+batch+'.json')[0]
  const segment=runtime.outlines[stroke-1][0]
  const reviewHash=createHash('sha256').update(readFileSync(new URL(base+'progressive-review.json',import.meta.url))).digest('hex')
  for(const key of ['orderReviewSha256','geometryReviewSha256','directionReviewSha256'])
    assert.equal(runtime.sourceReference[key],reviewHash)
  const source=trace[raw][0]
  assert.equal(source.kind,'cdDrawCurve')
  assert.equal(segment.outline,normalizedPolygonPath(source.polygons))
  assert.equal(normalizedOutline(segment.outline),segment.outline)
  const original=source.polygons.map(p=>p.map(v=>({x:v.x/2,y:v.y/2})))
  const normalized=parse(segment.outline)
  assert.equal(normalized.length,original.length)
  original.forEach((p,i)=>{
    assert.deepEqual(normalized[i][0],p[0])
    const sort=points=>points.map(v=>JSON.stringify(v)).sort()
    assert.deepEqual(sort(normalized[i]),sort(p))
    assert(signedArea(normalized[i])>0)
  })
  const a=source.args
  assert.equal(segment.revealPath,`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`)
  const [x0,y0,x1,y1]=segment.bounds
  let missingBefore=0,checked=0,witness=null
  // Compare nonzero combined fill with the union of independently filled source polygons.
  // Sample cell interiors; source boundary anti-aliasing is intentionally not approximated.
  for(let ix=0;ix<160;ix++)for(let iy=0;iy<160;iy++){
    const x=x0+(ix+.371)*(x1-x0)/160,y=y0+(iy+.617)*(y1-y0)/160
    const values=original.map(p=>winding(p,x,y))
    const union=values.some(Boolean),old=values.reduce((a,b)=>a+b,0)!==0
    const now=normalized.reduce((n,p)=>n+winding(p,x,y),0)!==0
    assert.equal(now,union,JSON.stringify({glyph,x,y}))
    if(union&&!old){missingBefore++;witness??=[x,y]}
    checked++
  }
  assert(missingBefore>0)
  results.push({glyph,stroke,checked,missingBefore,witness,verticesPreserved:true,revealPathPreserved:true})
}
console.log(JSON.stringify({passed:true,results}))
