import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5],[6,7],[8],[9],[10],[11],[12],[13],[14],[15]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[13.895,38,88.925,38,0,300]}],[{"kind":"cdDrawLine","args":[34.025,14,34.025,62,0,113]}],[{"kind":"cdDrawLine","args":[67.88,14,67.88,62,0,123]}],[{"kind":"cdDrawLine","args":[34.025,62,67.88,62,2,2]}],[{"kind":"cdDrawLine","args":[51.41,62,51.41,186,32,0]}],[{"kind":"cdDrawLine","args":[25.744249999999997,88.72,25.744249999999997,123.28,12,113]}],[{"kind":"cdDrawLine","args":[25.744249999999997,88.72,76.16075,88.72,2,2]}],[{"kind":"cdDrawLine","args":[76.16075,88.72,76.16075,123.28,22,123]}],[{"kind":"cdDrawLine","args":[25.744249999999997,123.28,76.16075,123.28,2,2]}],[{"kind":"cdDrawLine","args":[12.98,151,88.925,151,0,0]}],[{"kind":"cdDrawLine","args":[126.91999999999999,17,126.91999999999999,96,1000,1]},{"kind":"cdDrawCurve","args":[126.91999999999999,96,126.91999999999999,167,78.2,186,1001,7]}],[{"kind":"cdDrawCurve","args":[92.41,36,106.62,51,112.71,78,7,8]}],[{"kind":"cdDrawCurve","args":[89.365,136,106.62,121,126.91999999999999,96,0,7]}],[{"kind":"cdDrawLine","args":[148.235,17,148.235,162,1000,1]},{"kind":"cdDrawCurve","args":[148.235,162,148.235,172,158.235,172,10001,1]},{"kind":"cdDrawLine","args":[158.235,172,182.745,172,6,5]}],[{"kind":"cdDrawCurve","args":[180.715,39,170.565,56,154.325,76,0,7]}],[{"kind":"cdDrawCurve","args":[154.325,91,170.565,104,180.715,128,7,8]}]]
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
