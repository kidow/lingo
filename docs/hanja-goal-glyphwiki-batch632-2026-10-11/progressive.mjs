import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[3],[2],[4],[5,6],[8],[7],[9],[10],[11],[12],[13]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[12.935,33.59,93.53,33.59,0,100]}],[{"kind":"cdDrawLine","args":[63.68,12.53,63.68,53.84,0,300]}],[{"kind":"cdDrawLine","args":[135.32,12.53,135.32,53.84,0,300]}],[{"kind":"cdDrawLine","args":[105.47,33.59,186.065,33.59,0,0]}],[{"kind":"cdDrawLine","args":[43.76500000000001,66.220928,43.76500000000001,119.12364799999999,12,313]}],[{"kind":"cdDrawLine","args":[43.76500000000001,66.220928,158.335,66.220928,2,2]}],[{"kind":"cdDrawLine","args":[158.335,66.220928,158.335,119.12364799999999,22,323]}],[{"kind":"cdDrawLine","args":[101.05,66.220928,101.05,119.12364799999999,32,32]}],[{"kind":"cdDrawLine","args":[43.76500000000001,92.265344,158.335,92.265344,2,2]}],[{"kind":"cdDrawLine","args":[43.76500000000001,119.12364799999999,158.335,119.12364799999999,2,2]}],[{"kind":"cdDrawCurve","args":[37,134.374,38,164.5965,18,175.822,7,8]}],[{"kind":"cdDrawLine","args":[66,135.2375,66,169.276,0,1]},{"kind":"cdDrawCurve","args":[66,169.276,66,179.276,76,179.276,1,1]},{"kind":"cdDrawLine","args":[76,179.276,147,179.276,6,5]}],[{"kind":"cdDrawCurve","args":[87,130.0565,107,138.6915,118,155.9615,7,8]}],[{"kind":"cdDrawCurve","args":[148,136.101,172,149.91699999999997,179,171.50449999999998,7,8]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,14);assert.equal(proof.groups.length,14)
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
