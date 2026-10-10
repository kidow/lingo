import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12,14],[13],[15],[16,17],[18],[19],[20]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[50.18,16,39.96,37,27.55,56,0,7]}],[{"kind":"cdDrawCurve","args":[12.22,45,29.74,56,37.04,76,7,8]}],[{"kind":"cdDrawCurve","args":[71.35,39,50.91,76,26.82,110,0,7]}],[{"kind":"cdDrawCurve","args":[13.68,113,44.34,109,71.35,101,0,7]}],[{"kind":"cdDrawCurve","args":[56.02,78,69.89,91,75.73,114,7,8]}],[{"kind":"cdDrawLine","args":[47.26,109,47.26,186,32,0]}],[{"kind":"cdDrawCurve","args":[29.74,127,26.82,155,12.22,180,0,7]}],[{"kind":"cdDrawCurve","args":[56.75,122,69.89,136,75,161,7,8]}],[{"kind":"cdDrawLine","args":[131.5,13.3824,131.5,39.6117,0,32]}],[{"kind":"cdDrawLine","args":[77.525,39.6117,185.475,39.6117,0,0]}],[{"kind":"cdDrawCurve","args":[153.6361,49.0518,136.7705,77.3262,104.62045,93.0342,0,7]}],[{"kind":"cdDrawCurve","args":[106.72865,56.1204,132.02705,67.116,156.27134999999998,89.8926,7,8]}],[{"kind":"cdDrawLine","args":[96.18764999999999,50.622600000000006,96.18764999999999,102.459,0,213]}],[{"kind":"cdDrawLine","args":[167.3394,50.622600000000006,167.3394,102.459,0,223]}],[{"kind":"cdDrawLine","args":[96.18764999999999,102.459,167.3394,102.459,2,2]}],[{"kind":"cdDrawLine","args":[88.32,123.7668,88.32,184.6455,12,0]}],[{"kind":"cdDrawLine","args":[88.32,123.7668,174.04500000000002,123.7668,2,2]}],[{"kind":"cdDrawLine","args":[174.04500000000002,123.7668,174.04500000000002,171.9986,22,1]},{"kind":"cdDrawCurve","args":[174.04500000000002,171.9986,174.04500000000002,181.9986,164.04500000000002,181.9986,1,214]}],[{"kind":"cdDrawCurve","args":[132.135,106.1208,122.61,133.47210000000004,111.18,155.5296,0,7]}],[{"kind":"cdDrawCurve","args":[103.56,157.2942,128.96,152.8827,156.9,150.2358,0,7]}],[{"kind":"cdDrawCurve","args":[141.66,129.94289999999998,152.45499999999998,144.05970000000002,157.535,159.0588,7,8]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,21);assert.equal(proof.groups.length,21)
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
