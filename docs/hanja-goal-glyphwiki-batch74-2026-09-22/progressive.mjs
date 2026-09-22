import assert from 'node:assert/strict'
import {normalizedPolygonPath} from '../hanja-goal-outline-winding-2026-09-22/normalize.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=[[0],[1],[2],[4],[3],[5],[6]]
const CURVES={
  "0:0": [
    66.595,
    15,
    44.86,
    72,
    12.66,
    117,
    0,
    7
  ],
  "3:0": [
    146.35,
    48,
    165.925,
    69,
    173.175,
    93,
    7,
    8
  ],
  "4:0": [
    106.475,
    48,
    97.775,
    75,
    76.75,
    97,
    0,
    7
  ]
}
export function compileProgressive(trace,proof){
 assert.equal(trace.length,7)
 const segment=(polygons,direction,weight)=>{
  const p=polygons.flat(),xs=p.map(v=>v.x/2),ys=p.map(v=>v.y/2)
  return {outline:normalizedPolygonPath(polygons),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight:Math.round(weight*1e6)/1e6}
 }
 return sourceGroups.map(indices=>indices.flatMap(index=>{
  assert.deepEqual(trace[index].flatMap(c=>c.polygons),proof.groups[index].polygons)
  return trace[index].map((call,j)=>{
   const a=call.args
   if(call.kind==='cdDrawCurve'){
    assert.deepEqual(a,CURVES[index+':'+j])
    return {...segment(call.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
   }
   assert.equal(call.kind,'cdDrawLine');const[x1,y1,x2,y2]=a;assert(x1===x2||y1===y2)
   return segment(call.polygons,x1===x2?(y2>y1?'down':'up'):(x2>x1?'right':'left'),Math.hypot(x2-x1,y2-y1)/2)
  })
 }))
}
