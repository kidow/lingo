import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2,3],[4],[5],[6],[7,8],[9],[10],[11],[12,13],[14],[15]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[100,12,100,32,0,32]}],[{"kind":"cdDrawCurve","args":[31.69,23.007999999999996,32.68,48.464,16.84,56.72,7,8]}],[{"kind":"cdDrawLine","args":[32.68,33.327999999999996,175.24,33.327999999999996,0,2]}],[{"kind":"cdDrawCurve","args":[175.24,33.327999999999996,169.3,41.583999999999996,155.44,55.34400000000001,22,7]}],[{"kind":"cdDrawCurve","args":[80.2,40,69.31,72,14.86,80.8,0,7]}],[{"kind":"cdDrawLine","args":[119.8,39.2,119.8,58.8,0,1]},{"kind":"cdDrawCurve","args":[119.8,58.8,119.8,68.8,129.8,68.8,1,3001]},{"kind":"cdDrawLine","args":[129.8,68.8,177.22,68.8,3006,5]}],[{"kind":"cdDrawCurve","args":[89,67.51,68,102.25999999999999,16,124.5,0,7]}],[{"kind":"cdDrawLine","args":[79,82.8,159,82.8,0,2]}],[{"kind":"cdDrawCurve","args":[159,82.8,153,105.735,142.54412023600952,109.00507639618803,22,0]},{"kind":"cdDrawCurve","args":[142.54412023600952,109.00507639618803,133,111.99000000000001,123,111.99000000000001,2,14]}],[{"kind":"cdDrawCurve","args":[92.75,119.471675,81.05,122.17175,40.1,129.50052499999998,0,7]}],[{"kind":"cdDrawLine","args":[40.1,129.50052499999998,40.1,175.4018,12,113]}],[{"kind":"cdDrawLine","args":[40.1,151.10112500000002,95.675,151.10112500000002,2,0]}],[{"kind":"cdDrawLine","args":[108.35,128.34335,164.9,128.34335,0,2]}],[{"kind":"cdDrawLine","args":[164.9,128.34335,164.9,175.4018,22,123]}],[{"kind":"cdDrawLine","args":[109.325,151.10112500000002,164.9,151.10112500000002,0,2]}],[{"kind":"cdDrawLine","args":[40.1,175.4018,164.9,175.4018,2,2]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,16);assert.equal(proof.groups.length,16)
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
