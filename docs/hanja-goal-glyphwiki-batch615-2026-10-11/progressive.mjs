import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[3],[2],[4],[5],[6],[7],[8],[9],[10,11],[12],[13],[14],[15],[16]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[12.935,31.08,93.53,31.08,0,100]}],[{"kind":"cdDrawLine","args":[63.68,12.36,63.68,49.08,0,300]}],[{"kind":"cdDrawLine","args":[135.32,12.36,135.32,49.08,0,300]}],[{"kind":"cdDrawLine","args":[105.47,31.08,186.065,31.08,0,0]}],[{"kind":"cdDrawLine","args":[27,58.457750000000004,173,58.457750000000004,0,100]}],[{"kind":"cdDrawLine","args":[100,42.67962500000001,100,74.235875,0,300]}],[{"kind":"cdDrawLine","args":[14,84.333875,186,84.333875,0,0]}],[{"kind":"cdDrawLine","args":[66,67.2935,66,101.37425000000002,0,300]}],[{"kind":"cdDrawLine","args":[134,67.2935,134,101.37425000000002,0,300]}],[{"kind":"cdDrawLine","args":[50,108.7085,50,157.16899999999998,12,213]}],[{"kind":"cdDrawLine","args":[50,108.7085,150,108.7085,2,2]}],[{"kind":"cdDrawLine","args":[150,108.7085,150,157.16899999999998,22,323]}],[{"kind":"cdDrawLine","args":[50,124.86200000000001,150,124.86200000000001,2,2]}],[{"kind":"cdDrawLine","args":[50,141.01549999999997,150,141.01549999999997,2,2]}],[{"kind":"cdDrawLine","args":[50,157.16899999999998,150,157.16899999999998,2,2]}],[{"kind":"cdDrawCurve","args":[82,165.98,61,176.2595,15,186.539,0,7]}],[{"kind":"cdDrawCurve","args":[110,165.98,156,172.58824999999996,175,184.33625,7,8]}]]
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
