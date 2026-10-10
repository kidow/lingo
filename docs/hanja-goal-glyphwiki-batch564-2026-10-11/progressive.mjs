import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10,11],[12,13],[14],[15],[16]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[52.91,15,40.03,58,13.465,92,0,7]}],[{"kind":"cdDrawCurve","args":[52.105,27,72.23,38,80.28,54,7,8]}],[{"kind":"cdDrawLine","args":[33.59,71,79.475,71,0,100]}],[{"kind":"cdDrawLine","args":[19.1,103,84.305,103,0,0]}],[{"kind":"cdDrawLine","args":[52.105,71,52.105,164,32,32]}],[{"kind":"cdDrawCurve","args":[20.71,120,33.59,134,35.2,154,7,8]}],[{"kind":"cdDrawCurve","args":[76.255,119,70.62,135,61.765,151,0,7]}],[{"kind":"cdDrawCurve","args":[17.490000000000002,177,50.495,169,82.695,157,0,7]}],[{"kind":"cdDrawCurve","args":[111.82,14,103.14,54,82.68,81,0,7]}],[{"kind":"cdDrawLine","args":[104.38,41,183.74,41,2,0]}],[{"kind":"cdDrawLine","args":[109.96000000000001,66.1,100.66,156.19,12,13]}],[{"kind":"cdDrawLine","args":[100.66,156.19,184.36,156.19,2,200]}],[{"kind":"cdDrawLine","args":[109.96000000000001,66.1,165.14,66.1,2,2]}],[{"kind":"cdDrawCurve","args":[165.14,66.1,161.42000000000002,166.97,154.67159117188606,175.3510883833028,22,0]},{"kind":"cdDrawCurve","args":[154.67159117188606,175.3510883833028,148.4,183.14,138.4,183.14,2,14]}],[{"kind":"cdDrawCurve","args":[126.08,76.11,138.48000000000002,83.04,142.82,99.21,7,8]}],[{"kind":"cdDrawCurve","args":[121.12,120,134.76,126.93,140.34,144.64,7,8]}],[{"kind":"cdDrawLine","args":[83.92,110.76,188.07999999999998,110.76,0,200]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,17);assert.equal(proof.groups.length,17)
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
