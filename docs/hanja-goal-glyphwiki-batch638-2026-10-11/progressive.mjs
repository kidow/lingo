import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2,3],[4,5],[6],[7],[8],[9],[10],[11,12],[13],[14]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[27.335,20,46.96,27,55.595,41,7,8]}],[{"kind":"cdDrawCurve","args":[12.42,66,33.614999999999995,73,41.465,87,7,8]}],[{"kind":"cdDrawCurve","args":[13.99,133,41.465,142,38.325,184,7,8]}],[{"kind":"cdDrawCurve","args":[34.4,150,37.54,138,70.51,67,32,7]}],[{"kind":"cdDrawLine","args":[75.5645,23.878800000000002,174.128,23.878800000000002,0,2]}],[{"kind":"cdDrawCurve","args":[174.128,23.878800000000002,167.51299999999998,29.848499999999998,156.92900000000003,39.798,22,7]}],[{"kind":"cdDrawLine","args":[126.5,23.878800000000002,126.5,83.5758,32,32]}],[{"kind":"cdDrawLine","args":[126.5,54.72225,172.14350000000002,54.72225,2,100]}],[{"kind":"cdDrawCurve","args":[96.071,39.798,93.425,72.63135,68.9495,95.51520000000001,0,7]}],[{"kind":"cdDrawCurve","args":[93.425,53.72730000000001,100.03999999999999,91.5354,178.097,87.55560000000001,7,0]}],[{"kind":"cdDrawLine","args":[90.69800000000001,104.30392499999999,90.69800000000001,185.25165,12,0]}],[{"kind":"cdDrawLine","args":[90.69800000000001,104.30392499999999,162.302,104.30392499999999,2,2]}],[{"kind":"cdDrawLine","args":[162.302,104.30392499999999,162.302,171.61355,22,1]},{"kind":"cdDrawCurve","args":[162.302,171.61355,162.302,181.61355,152.302,181.61355,1,314]}],[{"kind":"cdDrawLine","args":[90.69800000000001,127.95157499999999,162.302,127.95157499999999,2,2]}],[{"kind":"cdDrawLine","args":[90.69800000000001,151.59922500000002,162.302,151.59922500000002,2,2]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,15);assert.equal(proof.groups.length,15)
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
