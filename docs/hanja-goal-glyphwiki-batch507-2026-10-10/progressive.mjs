import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[3],[4],[2],[5,6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16],[17],[18],[19,20],[21],[22],[23],[24]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[25.52,28,25.52,110,12,313]}],[{"kind":"cdDrawLine","args":[25.52,28,82.64,28,2,0]}],[{"kind":"cdDrawLine","args":[52.4,28,52.4,110,32,32]}],[{"kind":"cdDrawLine","args":[25.52,56,81.8,56,2,100]}],[{"kind":"cdDrawLine","args":[25.52,83,81.8,83,2,100]}],[{"kind":"cdDrawLine","args":[25.52,110,75.92,110,2,2]}],[{"kind":"cdDrawCurve","args":[75.92,110,77.6,156,67.99526656935414,174.1602102680279,22,0]},{"kind":"cdDrawCurve","args":[67.99526656935414,174.1602102680279,63.32,183,53.32,183,2,214]}],[{"kind":"cdDrawCurve","args":[24.68,124,27.2,160,16.28,172,7,8]}],[{"kind":"cdDrawCurve","args":[33.08,127,39.8,147,37.28,164,7,8]}],[{"kind":"cdDrawCurve","args":[41.48,124,50.72,138,51.56,155,7,8]}],[{"kind":"cdDrawCurve","args":[49.04,118,59.96,127,63.32,142,7,8]}],[{"kind":"cdDrawLine","args":[86.685,25.65,187.54500000000002,25.65,0,0]}],[{"kind":"cdDrawLine","args":[96.525,47.5,96.525,84.55,12,100]}],[{"kind":"cdDrawLine","args":[96.525,47.5,176.475,47.5,2,2]}],[{"kind":"cdDrawLine","args":[176.475,47.5,176.475,84.55,22,100]}],[{"kind":"cdDrawLine","args":[122.35499999999999,25.65,122.35499999999999,71.25,32,113]}],[{"kind":"cdDrawLine","args":[151.26,25.65,151.26,71.25,32,123]}],[{"kind":"cdDrawLine","args":[122.35499999999999,71.25,151.26,71.25,2,2]}],[{"kind":"cdDrawLine","args":[106.365,95.39,106.365,137.57,12,213]}],[{"kind":"cdDrawLine","args":[106.365,95.39,166.635,95.39,2,2]}],[{"kind":"cdDrawLine","args":[166.635,95.39,166.635,137.57,22,223]}],[{"kind":"cdDrawLine","args":[106.365,116.47999999999998,166.635,116.47999999999998,2,2]}],[{"kind":"cdDrawLine","args":[106.365,137.57,166.635,137.57,2,2]}],[{"kind":"cdDrawLine","args":[86.07,158.09,188.16,158.09,0,0]}],[{"kind":"cdDrawLine","args":[136.5,137.57,136.5,187.16,32,100]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,25);assert.equal(proof.groups.length,25)
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
