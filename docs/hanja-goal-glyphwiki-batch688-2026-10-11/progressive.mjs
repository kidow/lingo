import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[3],[4],[2],[5,6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[26.06,29.58,26.06,110.35,12,313]}],[{"kind":"cdDrawLine","args":[26.06,29.58,86.92,29.58,2,0]}],[{"kind":"cdDrawLine","args":[54.7,29.58,54.7,110.35,32,32]}],[{"kind":"cdDrawLine","args":[26.06,57.16,86.025,57.16,2,0]}],[{"kind":"cdDrawLine","args":[26.06,83.755,86.025,83.755,2,0]}],[{"kind":"cdDrawLine","args":[26.06,110.35,79.76,110.35,2,2]}],[{"kind":"cdDrawCurve","args":[79.76,110.35,81.55,155.66,71.30078224614532,173.57508026051693,22,0]},{"kind":"cdDrawCurve","args":[71.30078224614532,173.57508026051693,66.335,182.255,56.334999999999994,182.255,2,214]}],[{"kind":"cdDrawCurve","args":[25.165,124.14,27.85,159.6,16.215,171.42,7,8]}],[{"kind":"cdDrawCurve","args":[34.115,127.095,41.275,146.795,38.59,163.54,7,8]}],[{"kind":"cdDrawCurve","args":[43.065,124.14,52.91,137.93,53.805,154.675,7,8]}],[{"kind":"cdDrawCurve","args":[51.12,118.23,62.755,127.095,66.335,141.87,7,8]}],[{"kind":"cdDrawCurve","args":[113.35,19,106.39,65,91.6,91,0,7]}],[{"kind":"cdDrawLine","args":[108.13,54,172.51,54,0,0]}],[{"kind":"cdDrawLine","args":[135.1,16,135.1,102,0,32]}],[{"kind":"cdDrawLine","args":[89.86,102,182.95,102,0,0]}],[{"kind":"cdDrawCurve","args":[122.05,106,119.44,169,79.42,187,0,7]}],[{"kind":"cdDrawLine","args":[145.54000000000002,102,145.54000000000002,168,32,1]},{"kind":"cdDrawCurve","args":[145.54000000000002,168,145.54000000000002,178,155.54000000000002,178,1,1]},{"kind":"cdDrawLine","args":[155.54000000000002,178,181.21,178,6,5]}]]
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
