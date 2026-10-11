import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1,2],[3],[4,5],[7],[6],[8],[9],[10],[11],[12],[14],[15],[16],[21],[29],[28],[24,25],[23],[19,18],[20],[22],[17],[26],[27]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[37.27,16,26.84,51,11.94,75,0,7]}],[{"kind":"cdDrawLine","args":[30.565,35,60.365,35,0,2]}],[{"kind":"cdDrawCurve","args":[60.365,35,57.385,46,43.23,65,22,7]}],[{"kind":"cdDrawLine","args":[25.35,66,25.35,130,1012,313]}],[{"kind":"cdDrawLine","args":[25.35,66,68.56,66,2,2]}],[{"kind":"cdDrawLine","args":[68.56,66,68.56,130,1022,323]}],[{"kind":"cdDrawLine","args":[46.955,66,46.955,130,2032,32]}],[{"kind":"cdDrawLine","args":[25.35,98,68.56,98,2,2]}],[{"kind":"cdDrawLine","args":[25.35,130,68.56,130,2,2]}],[{"kind":"cdDrawCurve","args":[23.86,143,23.86,171,14.92,186,7,8]}],[{"kind":"cdDrawCurve","args":[33.545,146,40.25,164,38.76,180,7,8]}],[{"kind":"cdDrawCurve","args":[45.465,146,55.895,158,58.13,176,7,8]}],[{"kind":"cdDrawCurve","args":[60.365,144,71.54,153,76.755,170,7,8]}],[],[{"kind":"cdDrawCurve","args":[110.85,19,99.8,31,87.45,35,0,7]}],[{"kind":"cdDrawLine","args":[87.45,35,89.4,144,12,32]}],[{"kind":"cdDrawLine","args":[88.75,69,112.8,69,2,200]}],[{"kind":"cdDrawLine","args":[73.8,144,188.85,144,0,300]}],[{"kind":"cdDrawLine","args":[175.2,31,172.6,144,22,32]}],[{"kind":"cdDrawLine","args":[153.75,31,175.2,31,0,2]}],[{"kind":"cdDrawLine","args":[153.1,68,173.9,68,0,2]}],[{"kind":"cdDrawLine","args":[88.75,105,113.45,105,2,200]}],[{"kind":"cdDrawLine","args":[151.8,105,173.25,105,0,2]}],[{"kind":"cdDrawLine","args":[124.5,92,120.6,144,0,32]}],[{"kind":"cdDrawLine","args":[123.2,72,142.7,72,2,2]}],[{"kind":"cdDrawLine","args":[142.7,72,139.45,144,22,32]}],[{"kind":"cdDrawCurve","args":[116.05,154,100.45,177,80.95,190,0,7]}],[{"kind":"cdDrawCurve","args":[144,152,162.85,164,173.9,184,7,8]}],[{"kind":"cdDrawLine","args":[126.45,16,123.2,72,0,213]}],[{"kind":"cdDrawLine","args":[125.8,35,149.2,35,2,200]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,30);assert.equal(proof.groups.length,30)
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
