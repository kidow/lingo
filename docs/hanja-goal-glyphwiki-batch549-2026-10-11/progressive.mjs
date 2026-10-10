import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[3],[4],[2],[5,6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16],[17,18],[19]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[25.24,29.58,25.24,110.35,12,313]}],[{"kind":"cdDrawLine","args":[25.24,29.58,81.68,29.58,2,0]}],[{"kind":"cdDrawLine","args":[51.8,29.58,51.8,110.35,32,32]}],[{"kind":"cdDrawLine","args":[25.24,57.16,80.85,57.16,2,100]}],[{"kind":"cdDrawLine","args":[25.24,83.755,80.85,83.755,2,100]}],[{"kind":"cdDrawLine","args":[25.24,110.35,75.04,110.35,2,2]}],[{"kind":"cdDrawCurve","args":[75.04,110.35,76.7,155.66,67.27673490620931,173.42128527068485,22,0]},{"kind":"cdDrawCurve","args":[67.27673490620931,173.42128527068485,62.59,182.255,52.59,182.255,2,214]}],[{"kind":"cdDrawCurve","args":[24.41,124.14,26.9,159.6,16.11,171.42,7,8]}],[{"kind":"cdDrawCurve","args":[32.71,127.095,39.35,146.795,36.86,163.54,7,8]}],[{"kind":"cdDrawCurve","args":[41.01,124.14,50.14,137.93,50.97,154.675,7,8]}],[{"kind":"cdDrawCurve","args":[48.48,118.23,59.27,127.095,62.59,141.87,7,8]}],[{"kind":"cdDrawLine","args":[90.12,28,186.45,28,0,0]}],[{"kind":"cdDrawLine","args":[96.96000000000001,71,125.46000000000001,71,2,2]}],[{"kind":"cdDrawLine","args":[96.96000000000001,71,96.96000000000001,118,12,13]}],[{"kind":"cdDrawLine","args":[96.96000000000001,118,125.46000000000001,118,2,2]}],[{"kind":"cdDrawLine","args":[125.46000000000001,28,125.46000000000001,116,32,1]},{"kind":"cdDrawCurve","args":[125.46000000000001,116,126.03,166,94.68,188,1,7]}],[{"kind":"cdDrawLine","args":[150.54000000000002,28,150.54000000000002,186,32,0]}],[{"kind":"cdDrawLine","args":[150.54000000000002,71,179.04000000000002,71,2,2]}],[{"kind":"cdDrawLine","args":[179.04000000000002,71,179.04000000000002,118,22,23]}],[{"kind":"cdDrawLine","args":[150.54000000000002,118,179.04000000000002,118,2,2]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,20);assert.equal(proof.groups.length,20)
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
