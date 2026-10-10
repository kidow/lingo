import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1,2,3],[4],[5],[6],[7,8],[9],[10],[11],[12],[13]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[38,14,38,82,0,1]},{"kind":"cdDrawCurve","args":[38,82,38,160,12,188,1,7]}],[{"kind":"cdDrawLine","args":[12,64,64,64,0,2]}],[{"kind":"cdDrawLine","args":[64,64,64,150,22,300]}],[{"kind":"cdDrawCurve","args":[56,156,72,144,92,128,0,7]}],[{"kind":"cdDrawLine","args":[86,28,186,28,0,0]}],[{"kind":"cdDrawCurve","args":[138,28,130,43,118,56,132,7]}],[{"kind":"cdDrawLine","args":[104,56,104,142,12,113]}],[{"kind":"cdDrawLine","args":[104,56,166,56,2,2]}],[{"kind":"cdDrawLine","args":[166,56,166,142,22,323]}],[{"kind":"cdDrawLine","args":[104,85,166,85,2,2]}],[{"kind":"cdDrawLine","args":[104,113,166,113,2,2]}],[{"kind":"cdDrawLine","args":[104,142,166,142,2,2]}],[{"kind":"cdDrawCurve","args":[125,157,106,174,70,188,0,7]}],[{"kind":"cdDrawCurve","args":[140,154,164,163,179,181,7,8]}]]
const inside=(point,poly)=>{let hit=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a.y>point[1])!==(b.y>point[1])&&point[0]<(b.x-a.x)*(point[1]-a.y)/(b.y-a.y)+a.x)hit=!hit;}return hit}
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,14);assert.equal(proof.groups.length,14)
  assert.deepEqual(trace.map(r=>r.map(c=>({kind:c.kind,args:c.args}))),ORIGINAL)
  for(let i=0;i<trace.length;i++)assert.deepEqual(trace[i].flatMap(c=>c.polygons),proof.groups[i].polygons)
  const before=trace[2][0],after=trace[3][0]
  assert.deepEqual(before.args.slice(2,4),[64,150])
  assert.deepEqual(after.args.slice(0,2),[56,156])
  assert(before.polygons.some(p=>inside([64,147],p))&&after.polygons.some(p=>inside([64,147],p)),'Original filled contours must overlap; never add a connector')
  const segment=(polygons,direction,weight)=>{
    const points=polygons.flat(),xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
    assert(points.length>0&&points.every(p=>p.off===0))
    const normalized=polygons.map(p=>{const area=p.reduce((n,v,i)=>{const q=p[(i+1)%p.length];return n+v.x*q.y-q.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
    return {outline:normalized.map(p=>p.map((v,i)=>`${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight:Math.round(weight*1e6)/1e6}
  }
  const compile=indices=>{
    const calls=indices.flatMap(i=>trace[i])
    for(let i=1;i<calls.length;i++){const c=calls[i-1];assert.deepEqual(c.args.slice(c.kind==='cdDrawLine'?2:4,c.kind==='cdDrawLine'?4:6),calls[i].args.slice(0,2),'All merged original trajectories must be continuous')}
    const pieces=calls.map(c=>{const a=c.args;if(c.kind==='cdDrawCurve')return {...segment(c.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
      assert.equal(c.kind,'cdDrawLine');assert(a[0]===a[2]||a[1]===a[3]);return segment(c.polygons,a[0]===a[2]?(a[3]>a[1]?'down':'up'):(a[2]>a[0]?'right':'left'),Math.hypot(a[2]-a[0],a[3]-a[1])/2)})
    if(pieces.length===1)return pieces[0]
    const a=calls[0].args
    return {outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:`M${a[0]/2} ${a[1]/2} ${calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?`L${v[2]/2} ${v[3]/2}`:`Q${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2}`}).join(' ')}`,revealWidth:14}
  }
  // Preserve the original separate rising flick within domestic pen 2.
  // Its filled contour overlaps the vertical; its centerline is never bridged.
  return sourceGroups.map(indices=>indices.length===3?[compile([1,2]),compile([3])]:[compile(indices)])
}
