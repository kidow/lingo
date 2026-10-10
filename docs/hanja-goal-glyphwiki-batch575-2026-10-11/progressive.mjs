import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[26.945,24,26.945,118,12,1]},{"kind":"cdDrawCurve","args":[26.945,118,26.945,173,13.645,188,1,7]}],[{"kind":"cdDrawLine","args":[26.945,24,60.195,24,2,2]}],[{"kind":"cdDrawLine","args":[60.195,24,60.195,171,22,1]},{"kind":"cdDrawCurve","args":[60.195,171,60.195,181,50.195,181,1,214]}],[{"kind":"cdDrawLine","args":[26.945,67,60.195,67,2,2]}],[{"kind":"cdDrawLine","args":[26.945,112,60.195,112,2,2]}],[{"kind":"cdDrawCurve","args":[102.08,15.425,90.56,43.92,67.52,73.805,0,7]}],[{"kind":"cdDrawLine","args":[92.72,41.14,183.44,41.14,2,0]}],[{"kind":"cdDrawLine","args":[67.52,87.705,187.76,87.705,0,100]}],[{"kind":"cdDrawLine","args":[92.72,41.14,92.72,132.88,1032,32]}],[{"kind":"cdDrawLine","args":[115.03999999999999,41.14,115.03999999999999,132.88,2032,32]}],[{"kind":"cdDrawLine","args":[137.36,41.14,137.36,132.88,2032,32]}],[{"kind":"cdDrawLine","args":[159.68,41.14,159.68,132.88,1032,32]}],[{"kind":"cdDrawLine","args":[69.68,132.88,186.32,132.88,0,100]}],[{"kind":"cdDrawCurve","args":[87.88159999999999,140,87.1904,169.45,73.3664,179.9,7,8]}],[{"kind":"cdDrawCurve","args":[105.8528,141.9,115.52960000000002,158.05,114.1472,178,7,8]}],[{"kind":"cdDrawCurve","args":[132.1184,141.9,145.25119999999998,158.05,146.6336,178,7,8]}],[{"kind":"cdDrawCurve","args":[159.76639999999998,140.95,176.35520000000002,159,180.5024,179.9,7,8]}]]
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
