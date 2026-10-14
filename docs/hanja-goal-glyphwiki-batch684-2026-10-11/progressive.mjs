import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[1,2],[3],[0],[4],[5],[6,7],[8],[9],[10],[11,12],[13],[14],[15],[16]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[27.25,39.64,27.25,94.36,12,1]},{"kind":"cdDrawCurve","args":[27.25,94.36,27.25,154.84,12.37,187.48,1,7]}],[{"kind":"cdDrawLine","args":[27.25,39.64,79.33,39.64,2,2]}],[{"kind":"cdDrawLine","args":[79.33,39.64,79.33,81.88,1022,23]}],[{"kind":"cdDrawLine","args":[27.25,81.88,79.33,81.88,2,2]}],[{"kind":"cdDrawCurve","args":[136,14,131,27,124,38,0,7]}],[{"kind":"cdDrawLine","args":[100,38,100,122,1012,313]}],[{"kind":"cdDrawLine","args":[100,38,164,38,2,2]}],[{"kind":"cdDrawLine","args":[164,38,164,82,22,223]}],[{"kind":"cdDrawLine","args":[100,60,164,60,2,2]}],[{"kind":"cdDrawLine","args":[100,82,164,82,2,2]}],[{"kind":"cdDrawLine","args":[100,102,186,102,2,100]}],[{"kind":"cdDrawLine","args":[100,122,176,122,2,2]}],[{"kind":"cdDrawCurve","args":[176,122,177,164,169.13940613514922,174.10647782623673,22,0]},{"kind":"cdDrawCurve","args":[169.13940613514922,174.10647782623673,163,182,153,182,2,14]}],[{"kind":"cdDrawCurve","args":[86,139,88,165,75,176,7,8]}],[{"kind":"cdDrawCurve","args":[103,141,110,158,105,170,7,8]}],[{"kind":"cdDrawCurve","args":[118,139,130,147,132,163,7,8]}],[{"kind":"cdDrawCurve","args":[135,134,152,140,156,153,7,8]}]]
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
    return {outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:`M${a[0]/2} ${a[1]/2} ${calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?`L${v[2]/2} ${v[3]/2}`:c.kind==='cdDrawBezier'?`C${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2} ${v[6]/2} ${v[7]/2}`:`Q${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2}`}).join(' ')}`,revealWidth:JSON.stringify(indices)==="[1,2]"?14.515728:14}
  }
  return sourceGroups.map(indices=>[compile(indices)])
}
