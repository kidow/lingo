import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[3],[4],[2],[5,6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[25.92,28,25.92,110,12,313]}],[{"kind":"cdDrawLine","args":[25.92,28,86.44,28,2,0]}],[{"kind":"cdDrawLine","args":[54.4,28,54.4,110,32,32]}],[{"kind":"cdDrawLine","args":[25.92,56,85.55,56,2,0]}],[{"kind":"cdDrawLine","args":[25.92,83,85.55,83,2,0]}],[{"kind":"cdDrawLine","args":[25.92,110,79.32,110,2,2]}],[{"kind":"cdDrawCurve","args":[79.32,110,81.1,156,70.85849314307212,174.2763175900233,22,0]},{"kind":"cdDrawCurve","args":[70.85849314307212,174.2763175900233,65.97,183,55.97,183,2,214]}],[{"kind":"cdDrawCurve","args":[25.03,124,27.7,160,16.130000000000003,172,7,8]}],[{"kind":"cdDrawCurve","args":[33.93,127,41.05,147,38.38,164,7,8]}],[{"kind":"cdDrawCurve","args":[42.83,124,52.62,138,53.51,155,7,8]}],[{"kind":"cdDrawCurve","args":[50.84,118,62.41,127,65.97,142,7,8]}],[{"kind":"cdDrawLine","args":[125.275,14,125.275,99,0,1]},{"kind":"cdDrawCurve","args":[125.275,99,125.275,166,91.35,188,1,7]}],[{"kind":"cdDrawLine","args":[90.2,50,125.275,50,0,2]}],[{"kind":"cdDrawLine","args":[93.075,91,125.275,91,0,2]}],[{"kind":"cdDrawCurve","args":[89.625,140,108.025,133,123.55,123,0,7]}],[{"kind":"cdDrawLine","args":[152.3,14,152.3,186,0,0]}],[{"kind":"cdDrawLine","args":[152.3,50,186.8,50,2,200]}],[{"kind":"cdDrawLine","args":[152.3,91,182.2,91,2,200]}],[{"kind":"cdDrawLine","args":[152.3,133,188.525,133,2,100]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,19);assert.equal(proof.groups.length,19)
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
