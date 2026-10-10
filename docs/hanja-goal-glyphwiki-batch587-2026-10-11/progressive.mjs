import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2,3],[4],[5],[6],[7],[8,9],[10,11],[12],[13],[14],[15],[16],[17],[18,19],[20],[21],[22]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[61.5,15.125,56.375,21.775,46.125,27.95,0,7]}],[{"kind":"cdDrawLine","args":[35.875,27.95,35.875,55.025,12,1]},{"kind":"cdDrawCurve","args":[35.875,55.025,36.9,85.9,14.35,97.775,1,7]}],[{"kind":"cdDrawLine","args":[35.875,27.95,80.975,27.95,2,2]}],[{"kind":"cdDrawLine","args":[80.975,27.95,80.975,84.45,22,1]},{"kind":"cdDrawCurve","args":[80.975,84.45,80.975,94.45,70.975,94.45,1,114]}],[{"kind":"cdDrawCurve","args":[46.125,31.75,59.45,36.975,62.525,48.375,7,8]}],[{"kind":"cdDrawLine","args":[56.375,61.675,56.375,82.1,0,300]}],[{"kind":"cdDrawCurve","args":[13.325,57.875,62.525,55.5,103.525,52.175,0,7]}],[{"kind":"cdDrawLine","args":[119.95,21.3,119.95,32.7,12,1]},{"kind":"cdDrawCurve","args":[119.95,32.7,119.95,46,95.46,55.5,1,7]}],[{"kind":"cdDrawLine","args":[119.95,21.3,156.29000000000002,21.3,2,2]}],[{"kind":"cdDrawLine","args":[156.29000000000002,21.3,156.29000000000002,37.425,22,1]},{"kind":"cdDrawCurve","args":[156.29000000000002,37.425,156.29000000000002,47.425,166.29000000000002,47.425,1,4001]},{"kind":"cdDrawLine","args":[166.29000000000002,47.425,181.57,47.425,4006,5]}],[{"kind":"cdDrawLine","args":[105.73,57.875,164.98,57.875,0,2]}],[{"kind":"cdDrawCurve","args":[164.98,57.875,146.81,89.7,87.56,97.3,22,7]}],[{"kind":"cdDrawCurve","args":[116,57.875,127.06,86.375,178.41,92.55,7,0]}],[{"kind":"cdDrawLine","args":[20,113.25,180,113.25,0,100]}],[{"kind":"cdDrawLine","args":[70,101,70,126.375,0,313]}],[{"kind":"cdDrawLine","args":[130,101,130,126.375,0,323]}],[{"kind":"cdDrawLine","args":[70,126.375,130,126.375,2,2]}],[{"kind":"cdDrawLine","args":[44.9,140.69,44.9,155.80999999999997,12,313]}],[{"kind":"cdDrawLine","args":[44.9,140.69,155.1,140.69,2,2]}],[{"kind":"cdDrawLine","args":[155.1,140.69,155.1,155.80999999999997,22,323]}],[{"kind":"cdDrawLine","args":[44.9,155.80999999999997,155.1,155.80999999999997,2,2]}],[{"kind":"cdDrawLine","args":[14,169.25,186,169.25,0,100]}],[{"kind":"cdDrawLine","args":[100,126.375,100,185.875,32,300]}]]
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
