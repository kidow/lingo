import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22],[23]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[13.65,27.97,105,27.97,0,100]}],[{"kind":"cdDrawLine","args":[40.95,13.165,40.95,40.66,0,313]}],[{"kind":"cdDrawLine","args":[74.55,13.165,74.55,40.66,0,323]}],[{"kind":"cdDrawLine","args":[40.95,40.66,74.55,40.66,2,2]}],[{"kind":"cdDrawLine","args":[28.35,54.76,28.35,70.975,12,313]}],[{"kind":"cdDrawLine","args":[28.35,54.76,88.2,54.76,2,2]}],[{"kind":"cdDrawLine","args":[88.2,54.76,88.2,70.975,22,323]}],[{"kind":"cdDrawLine","args":[28.35,70.975,88.2,70.975,2,2]}],[{"kind":"cdDrawLine","args":[19.95,87.19,98.7,87.19,0,100]}],[{"kind":"cdDrawLine","args":[12.6,101.995,103.95,101.995,0,100]}],[{"kind":"cdDrawLine","args":[57.75,40.66,57.75,77.32,32,1]},{"kind":"cdDrawCurve","args":[57.75,77.32,57.75,125.26,14.7,135.835,1,7]}],[{"kind":"cdDrawCurve","args":[53.55,106.93,75.6,111.16,92.4,125.26,7,8]}],[{"kind":"cdDrawCurve","args":[130.555,15.985,117.88,45.595,96.755,65.33500000000001,0,7]}],[{"kind":"cdDrawLine","args":[118.725,44.89,118.725,125.26,12,213]}],[{"kind":"cdDrawCurve","args":[163.51,18.1,156.75,29.38,145.765,44.89,0,7]}],[{"kind":"cdDrawLine","args":[118.725,44.89,185.48,44.89,2,0]}],[{"kind":"cdDrawLine","args":[149.99,44.89,149.99,125.26,32,32]}],[{"kind":"cdDrawLine","args":[118.725,70.27,183.79,70.27,2,0]}],[{"kind":"cdDrawLine","args":[118.725,96.355,183.79,96.355,2,0]}],[{"kind":"cdDrawLine","args":[118.725,125.26,188.86,125.26,2,0]}],[{"kind":"cdDrawCurve","args":[37,137.95999999999998,38,165.61,18,175.88,7,8]}],[{"kind":"cdDrawLine","args":[66,138.75,66,169.04,0,1]},{"kind":"cdDrawCurve","args":[66,169.04,66,179.04,76,179.04,1,1]},{"kind":"cdDrawLine","args":[76,179.04,147,179.04,6,5]}],[{"kind":"cdDrawCurve","args":[87,134.01,107,141.91,118,157.70999999999998,7,8]}],[{"kind":"cdDrawCurve","args":[148,139.54000000000002,172,152.18,179,171.93,7,8]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,24);assert.equal(proof.groups.length,24)
  assert.deepEqual(trace.map(r=>r.map(c=>({kind:c.kind,args:c.args}))),ORIGINAL)
  for(let i=0;i<trace.length;i++)assert.deepEqual(trace[i].flatMap(c=>c.polygons),proof.groups[i].polygons)
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
      assert.equal(c.kind,'cdDrawLine');const p=segment(c.polygons,a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve',Math.hypot(a[2]-a[0],a[3]-a[1])/2);return p.direction==='curve'?{...p,revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2}`,revealWidth:14}:p})
    if(pieces.length===1)return pieces[0]
    const a=calls[0].args
    return {outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:`M${a[0]/2} ${a[1]/2} ${calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?`L${v[2]/2} ${v[3]/2}`:`Q${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2}`}).join(' ')}`,revealWidth:14}
  }
  return sourceGroups.map(indices=>[compile(indices)])
}
