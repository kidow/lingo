import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[6,7],[8],[9],[10,11],[12],[13],[14],[15],[16],[17],[18]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[72.8,23,54.8,34,12.5,45,0,7]}],[{"kind":"cdDrawLine","args":[10.7,76,80,76,0,0]}],[{"kind":"cdDrawLine","args":[46.7,35,46.7,186,32,0]}],[{"kind":"cdDrawCurve","args":[44,76,35,125,10.7,159,132,7]}],[{"kind":"cdDrawCurve","args":[48.5,98,65.6,106,75.5,121,7,8]}],[],[{"kind":"cdDrawLine","args":[78.94,24,120.34,24,0,2]}],[{"kind":"cdDrawLine","args":[120.34,24,120.34,82,22,0]}],[{"kind":"cdDrawCurve","args":[105.85,30,95.5,50,76.87,66,0,7]}],[{"kind":"cdDrawCurve","args":[112.06,56,99.64,78,76.87,94,0,7]}],[{"kind":"cdDrawLine","args":[132.76,24,172.09,24,0,2]}],[{"kind":"cdDrawLine","args":[172.09,24,172.09,90,22,0]}],[{"kind":"cdDrawCurve","args":[157.6,30,147.25,50,128.62,66,0,7]}],[{"kind":"cdDrawCurve","args":[165.88,56,155.53,74,138.97,88,0,7]}],[{"kind":"cdDrawCurve","args":[130.69,84,112.06,114,74.8,132,0,7]}],[{"kind":"cdDrawCurve","args":[128.62,88,151.39,116,178.3,126,7,0]}],[{"kind":"cdDrawCurve","args":[134.62300000000002,114.32,116.01369999999999,135.785,89.0002,146.12,0,7]}],[{"kind":"cdDrawCurve","args":[150.2308,129.425,124.4179,157.25,89.0002,166.79,0,7]}],[{"kind":"cdDrawCurve","args":[167.03920000000002,143.735,133.42239999999998,179.51,85.3984,188.255,0,7]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,19);assert.equal(proof.groups.length,19)
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
