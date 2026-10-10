import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3,4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[60,14,60,51,0,32]}],[{"kind":"cdDrawLine","args":[60,34,92,34,2,200]}],[{"kind":"cdDrawCurve","args":[22.810000000000002,41.64,23.32,66.245,15.16,74.225,7,8]}],[{"kind":"cdDrawLine","args":[23.32,51.614999999999995,96.76,51.614999999999995,0,2]}],[{"kind":"cdDrawCurve","args":[96.76,51.614999999999995,93.7,59.595,86.56,72.89500000000001,22,7]}],[{"kind":"cdDrawCurve","args":[85.6,68.69,57.1,80.675,15.3,84.905,0,7]}],[{"kind":"cdDrawCurve","args":[19.1,88.43,32.4,98.3,36.2,110.99000000000001,7,8]}],[{"kind":"cdDrawCurve","args":[86.55,84.2,78.95,98.3,67.55,113.10499999999999,0,7]}],[{"kind":"cdDrawLine","args":[14.35,118.745,96.05,118.745,0,0]}],[{"kind":"cdDrawLine","args":[55.2,79.97,55.2,187.13,32,0]}],[{"kind":"cdDrawCurve","args":[52.35,118.745,38.1,151.88,14.35,173.03,132,7]}],[{"kind":"cdDrawCurve","args":[57.1,133.55,78,139.19,89.4,151.88,7,8]}],[{"kind":"cdDrawCurve","args":[132.55,14,121.15,65,94.55,100,0,7]}],[{"kind":"cdDrawLine","args":[117.35,63,187.65,63,2,0]}],[{"kind":"cdDrawCurve","args":[161.05,63,149.65,160,76.5,188,2,7]}],[{"kind":"cdDrawCurve","args":[111.65,73,122.1,150,180.05,178,7,0]}]]
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
