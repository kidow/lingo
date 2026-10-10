import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[5],[6,7],[8],[9],[10,11],[12]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[23.58,55,28.56,89,16.939999999999998,108,7,8]}],[{"kind":"cdDrawCurve","args":[74.21,53,63.42,66,45.16,85,0,7]}],[{"kind":"cdDrawLine","args":[45.16,20,45.16,97,0,1]},{"kind":"cdDrawCurve","args":[45.16,97,45.16,160,11.96,187,1,7]}],[{"kind":"cdDrawCurve","args":[44.33,123,64.25,143,70.06,163,7,8]}],[],[{"kind":"cdDrawLine","args":[88.19099999999999,28,88.19099999999999,184,12,0]}],[{"kind":"cdDrawLine","args":[88.19099999999999,28,171.72899999999998,28,2,2]}],[{"kind":"cdDrawLine","args":[171.72899999999998,28,171.72899999999998,170,22,1]},{"kind":"cdDrawCurve","args":[171.72899999999998,170,171.72899999999998,180,161.72899999999998,180,1,214]}],[{"kind":"cdDrawLine","args":[101.61,61,158.31,61,0,0]}],[{"kind":"cdDrawLine","args":[113.517,90.47,113.517,138.53,12,13]}],[{"kind":"cdDrawLine","args":[113.517,90.47,146.40300000000002,90.47,2,2]}],[{"kind":"cdDrawLine","args":[146.40300000000002,90.47,146.40300000000002,138.53,22,23]}],[{"kind":"cdDrawLine","args":[113.517,138.53,146.40300000000002,138.53,2,2]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,13);assert.equal(proof.groups.length,13)
  assert.deepEqual(trace.map(r=>r.map(c=>({kind:c.kind,args:c.args}))),ORIGINAL);assert.deepEqual(trace[4],[]);assert.deepEqual(proof.groups[4].polygons,[]);assert.equal(proof.groups[4].raw[0],0)
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
