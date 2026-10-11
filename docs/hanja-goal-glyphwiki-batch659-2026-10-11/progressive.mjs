import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0,1],[2,3],[4],[5],[6],[7],[8,9],[10,11],[12,13],[14],[15,16],[17],[18],[19],[20],[21],[22]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[49.86,16,39.92,37,27.85,56,0,7]}],[{"kind":"cdDrawCurve","args":[12.94,45,29.98,56,37.08,76,7,8]}],[{"kind":"cdDrawCurve","args":[70.45,39,50.57,76,27.14,110,0,7]}],[{"kind":"cdDrawCurve","args":[14.36,113,44.18,109,70.45,101,0,7]}],[{"kind":"cdDrawCurve","args":[55.54,78,69.03,91,74.71,114,7,8]}],[{"kind":"cdDrawLine","args":[47.02,109,47.02,186,32,0]}],[{"kind":"cdDrawCurve","args":[29.98,127,27.14,155,12.94,180,0,7]}],[{"kind":"cdDrawCurve","args":[56.25,122,69.03,136,74,161,7,8]}],[{"kind":"cdDrawCurve","args":[105.61,16.79,99.715,26.615,89.235,37.095,0,7]}],[{"kind":"cdDrawCurve","args":[89.235,37.095,99.715,44.955,105.61,57.4,7,8]}],[{"kind":"cdDrawCurve","args":[136.39499999999998,16.79,130.5,26.615,120.02000000000001,37.095,0,7]}],[{"kind":"cdDrawCurve","args":[120.02000000000001,37.095,130.5,44.955,136.39499999999998,57.4,7,8]}],[{"kind":"cdDrawCurve","args":[167.18,16.79,161.285,26.615,150.805,37.095,0,7]}],[{"kind":"cdDrawCurve","args":[150.805,37.095,161.285,44.955,167.18,57.4,7,8]}],[{"kind":"cdDrawLine","args":[96.44,67.66,96.44,110.13999999999999,12,213]}],[{"kind":"cdDrawLine","args":[96.44,67.66,164.56,67.66,2,2]}],[{"kind":"cdDrawLine","args":[164.56,67.66,164.56,110.13999999999999,22,223]}],[{"kind":"cdDrawLine","args":[96.44,88.9,164.56,88.9,2,2]}],[{"kind":"cdDrawLine","args":[96.44,110.13999999999999,164.56,110.13999999999999,2,2]}],[{"kind":"cdDrawLine","args":[75.48,131.38,185.51999999999998,131.38,0,0]}],[{"kind":"cdDrawLine","args":[130.5,67.66,130.5,184.48,32,0]}],[{"kind":"cdDrawCurve","args":[126.57,131.38,106.92,167.96,72.86,185.66,132,7]}],[{"kind":"cdDrawCurve","args":[134.43,131.38,154.735,164.42,180.935,177.4,7,0]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,23);assert.equal(proof.groups.length,23)
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
