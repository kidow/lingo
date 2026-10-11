import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13,14],[15],[16]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[24.16,27.84,99.04,27.84,0,0]}],[{"kind":"cdDrawLine","args":[58.72,13.84,58.72,44.64,0,32]}],[{"kind":"cdDrawLine","args":[17.439999999999998,44.64,104.8,44.64,0,100]}],[{"kind":"cdDrawCurve","args":[46.24,46.88,40.48,63.12,17.439999999999998,72.08,0,7]}],[{"kind":"cdDrawLine","args":[72.16,46.32,72.16,54.24000000000001,0,1]},{"kind":"cdDrawCurve","args":[72.16,54.24000000000001,72.16,64.24000000000001,82.16,64.24000000000001,1,5001]},{"kind":"cdDrawLine","args":[82.16,64.24000000000001,99.04,64.24000000000001,5006,5]}],[{"kind":"cdDrawLine","args":[24.16,79.92,99.04,79.92,0,0]}],[{"kind":"cdDrawLine","args":[58.72,65.92,58.72,99.52,0,32]}],[{"kind":"cdDrawCurve","args":[21.28,105.68,54.88,100.08,102.88,91.68,0,7]}],[{"kind":"cdDrawLine","args":[131.89119999999997,14.96,131.89119999999997,42.4,0,1]},{"kind":"cdDrawCurve","args":[131.89119999999997,42.4,131.89119999999997,94.48,89.78559999999999,111.28,1,7]}],[{"kind":"cdDrawLine","args":[103.8208,40.16,159.136,40.16,0,2]}],[{"kind":"cdDrawCurve","args":[159.136,40.16,159.136,106.24,178.9504,106.24,22,15]}],[{"kind":"cdDrawCurve","args":[106.2976,56.4,134.36800000000002,68.72,144.2752,86.08,7,8]}],[{"kind":"cdDrawLine","args":[47.865808,123.30364,47.865808,167.97215999999997,12,13]}],[{"kind":"cdDrawLine","args":[47.865808,123.30364,152.134192,123.30364,2,2]}],[{"kind":"cdDrawLine","args":[152.134192,123.30364,152.134192,167.97215999999997,22,23]}],[{"kind":"cdDrawLine","args":[47.865808,144.98100999999997,152.134192,144.98100999999997,2,2]}],[{"kind":"cdDrawLine","args":[47.865808,167.97215999999997,152.134192,167.97215999999997,2,2]}]]
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
