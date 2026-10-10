import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5],[6],[7,8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[38.120000000000005,14,38.120000000000005,185,0,0]}],[{"kind":"cdDrawCurve","args":[26.92,55,24.68,85,17.96,98,7,8]}],[{"kind":"cdDrawCurve","args":[45.4,52,55.48,67,58.84,84,7,8]}],[{"kind":"cdDrawCurve","args":[98.03999999999999,17.545,88.94,23.995,73.925,29.8,0,7]}],[{"kind":"cdDrawLine","args":[73.925,29.8,73.925,63.985,12,32]}],[{"kind":"cdDrawCurve","args":[64.825,69.79,77.565,63.34,96.22,51.73,0,7]}],[{"kind":"cdDrawCurve","args":[84.39,35.605000000000004,95.765,45.28,99.405,60.76,7,8]}],[{"kind":"cdDrawLine","args":[103.955,23.995,136.26,23.995,0,2]}],[{"kind":"cdDrawCurve","args":[136.26,23.995,136.715,52.375,134.58128912533377,58.42442204026251,22,0]},{"kind":"cdDrawCurve","args":[134.58128912533377,58.42442204026251,131.255,67.85499999999999,121.255,67.85499999999999,2,114]}],[{"kind":"cdDrawCurve","args":[118.515,23.995,116.695,63.34,93.945,75.595,132,7]}],[{"kind":"cdDrawLine","args":[153.8,30,153.8,152,0,0]}],[{"kind":"cdDrawLine","args":[178.005,15,178.005,172,0,1]},{"kind":"cdDrawCurve","args":[178.005,172,178.005,182,168.005,182,1,14]}],[{"kind":"cdDrawCurve","args":[102.83,71.525,87.39,98.83,55.545,120.42,0,7]}],[{"kind":"cdDrawCurve","args":[101.86500000000001,79.145,125.99,86.13,135.64,96.28999999999999,7,8]}],[{"kind":"cdDrawLine","args":[79.67,107.08500000000001,134.675,107.08500000000001,0,0]}],[{"kind":"cdDrawLine","args":[62.3,127.405,140.465,127.405,0,0]}],[{"kind":"cdDrawLine","args":[101.86500000000001,107.08500000000001,101.86500000000001,166.14,32,32]}],[{"kind":"cdDrawCurve","args":[64.23,138.2,79.67,147.09,81.6,159.79000000000002,7,8]}],[{"kind":"cdDrawCurve","args":[130.815,137.565,124.06,147.725,113.445,157.885,0,7]}],[{"kind":"cdDrawCurve","args":[60.370000000000005,174.39499999999998,99.935,169.315,138.535,161.695,0,7]}]]
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
