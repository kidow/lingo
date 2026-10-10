import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5],[6],[8],[9],[7],[10,11],[12],[13],[14],[15]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[20.975,32,75.425,32,0,0]}],[{"kind":"cdDrawLine","args":[12.725,68,84.5,68,0,0]}],[{"kind":"cdDrawLine","args":[46.55,68,46.55,186,2032,0]}],[{"kind":"cdDrawLine","args":[25.925,87,25.925,120,1000,1]},{"kind":"cdDrawCurve","args":[25.925,120,25.925,162,12.725,174,1001,7]}],[{"kind":"cdDrawLine","args":[68.825,87,68.825,158,1000,0]}],[{"kind":"cdDrawLine","args":[96.1,30,96.1,117,12,313]}],[{"kind":"cdDrawLine","args":[96.1,30,185.2,30,2,0]}],[{"kind":"cdDrawLine","args":[134.6,30,134.6,117,32,32]}],[{"kind":"cdDrawLine","args":[96.1,59,180.8,59,2,0]}],[{"kind":"cdDrawLine","args":[96.1,88,180.8,88,2,0]}],[{"kind":"cdDrawLine","args":[96.1,117,178.6,117,2,2]}],[{"kind":"cdDrawCurve","args":[178.6,117,178.6,161,169.92848195673085,173.7343971264792,22,0]},{"kind":"cdDrawCurve","args":[169.92848195673085,173.7343971264792,164.3,182,154.3,182,2,14]}],[{"kind":"cdDrawCurve","args":[93.9,132,96.1,164,81.8,175,7,8]}],[{"kind":"cdDrawCurve","args":[106,133,114.80000000000001,148,112.6,167,7,8]}],[{"kind":"cdDrawCurve","args":[120.30000000000001,131,133.5,142,135.7,160,7,8]}],[{"kind":"cdDrawCurve","args":[136.8,128,151.1,135,156.6,151,7,8]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,16);assert.equal(proof.groups.length,16)
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
    for(let i=1;i<calls.length;i++){const c=calls[i-1];assert.deepEqual(c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawBezier'?6:4,c.kind==='cdDrawLine'?4:c.kind==='cdDrawBezier'?8:6),calls[i].args.slice(0,2),'All merged original trajectories must be continuous')}
    const pieces=calls.map(c=>{const a=c.args;if(c.kind==='cdDrawBezier')return {...segment(c.polygons,'curve',Math.hypot(a[6]-a[0],a[7]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`,revealWidth:14};if(c.kind==='cdDrawCurve')return {...segment(c.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
      assert.equal(c.kind,'cdDrawLine');const p=segment(c.polygons,a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve',Math.hypot(a[2]-a[0],a[3]-a[1])/2);return p.direction==='curve'?{...p,revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2}`,revealWidth:14}:p})
    if(pieces.length===1)return pieces[0]
    const a=calls[0].args
    return {outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:`M${a[0]/2} ${a[1]/2} ${calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?`L${v[2]/2} ${v[3]/2}`:c.kind==='cdDrawBezier'?`C${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2} ${v[6]/2} ${v[7]/2}`:`Q${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2}`}).join(' ')}`,revealWidth:14}
  }
  return sourceGroups.map(indices=>[compile(indices)])
}
