import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[26.235,20,43.36,27,50.895,41,7,8]}],[{"kind":"cdDrawCurve","args":[13.22,66,31.715,73,38.565,87,7,8]}],[{"kind":"cdDrawCurve","args":[14.59,133,38.565,142,35.825,184,7,8]}],[{"kind":"cdDrawCurve","args":[32.4,150,35.14,138,63.91,67,32,7]}],[{"kind":"cdDrawCurve","args":[84.25999999999999,16.627200000000002,77.6,49.492799999999995,56.88,73.5408,0,7]}],[{"kind":"cdDrawLine","args":[79.08,38.2704,126.44,38.2704,2,100]}],[{"kind":"cdDrawCurve","args":[83.52000000000001,38.2704,98.32,48.6912,103.5,64.72319999999999,7,8]}],[{"kind":"cdDrawCurve","args":[142.72,16.627200000000002,136.06,48.6912,115.34,69.53280000000001,0,7]}],[{"kind":"cdDrawLine","args":[136.8,38.2704,185.64,38.2704,2,100]}],[{"kind":"cdDrawCurve","args":[141.98000000000002,38.2704,156.78,48.6912,161.95999999999998,64.72319999999999,7,8]}],[{"kind":"cdDrawLine","args":[70.94,87.48,176.02,87.48,0,0]}],[{"kind":"cdDrawLine","args":[122.74,87.48,122.74,175.8,32,32]}],[{"kind":"cdDrawCurve","args":[92.4,98.04,89.44,140.28,65.76,165.24,0,7]}],[{"kind":"cdDrawCurve","args":[91.66,123.96,102.75999999999999,134.52,107.94,151.8,7,8]}],[{"kind":"cdDrawCurve","args":[156.04000000000002,98.04,151.6,145.08,132.36,161.4,0,7]}],[{"kind":"cdDrawCurve","args":[153.07999999999998,126.84,166.4,136.44,174.54000000000002,154.68,7,8]}],[{"kind":"cdDrawLine","args":[62.06,175.8,185.64,175.8,0,0]}]]
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
