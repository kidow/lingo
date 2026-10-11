import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15],[16],[17,18],[19]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[27,28.75,173,28.75,0,0]}],[{"kind":"cdDrawLine","args":[100,13.125,100,44.375,0,300]}],[{"kind":"cdDrawLine","args":[14,54.375,186,54.375,0,0]}],[{"kind":"cdDrawLine","args":[66,37.5,66,71.25,0,300]}],[{"kind":"cdDrawLine","args":[134,37.5,134,71.25,0,300]}],[{"kind":"cdDrawLine","args":[14.990625,91.143,99.9375,91.143,0,200]}],[{"kind":"cdDrawLine","args":[55.965,75.218,55.965,108.979,0,32]}],[{"kind":"cdDrawLine","args":[19.9875,108.979,95.94,108.979,0,100]}],[{"kind":"cdDrawLine","args":[31.979999999999997,121.71900000000001,31.979999999999997,141.466,12,313]}],[{"kind":"cdDrawLine","args":[31.979999999999997,121.71900000000001,81.94875,121.71900000000001,2,2]}],[{"kind":"cdDrawLine","args":[81.94875,121.71900000000001,81.94875,141.466,22,323]}],[{"kind":"cdDrawLine","args":[31.979999999999997,141.466,81.94875,141.466,2,2]}],[{"kind":"cdDrawCurve","args":[27.9825,147.199,40.974375,155.48000000000002,44.971875,168.22,7,8]}],[{"kind":"cdDrawCurve","args":[81.94875,146.562,75.95250000000001,156.11700000000002,63.959999999999994,171.405,0,7]}],[{"kind":"cdDrawCurve","args":[16.989375,181.59699999999998,59.9625,174.59,102.935625,167.583,0,7]}],[{"kind":"cdDrawLine","args":[95.16,98.8,183.31462499999998,98.8,0,100]}],[{"kind":"cdDrawLine","args":[134.70600000000002,74.75,134.70600000000002,125.45,0,32]}],[{"kind":"cdDrawLine","args":[96.80775000000001,125.45,166.01325,125.45,0,2]}],[{"kind":"cdDrawCurve","args":[166.01325,125.45,142.94475000000003,174.85,76.210875,187.2,22,7]}],[{"kind":"cdDrawCurve","args":[106.69425000000001,125.45,123.17174999999999,168.35,175.89974999999998,181.35,7,0]}]]
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
