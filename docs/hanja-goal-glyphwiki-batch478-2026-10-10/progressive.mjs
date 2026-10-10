import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2,3],[4],[5],[6],[7,8],[9],[10,11],[12],[13,14],[15],[16]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[12.36,32,75.26,32,0,100]}],[{"kind":"cdDrawCurve","args":[42.7,32,36.04,91,12.36,126,132,7]}],[{"kind":"cdDrawLine","args":[36.04,71,64.16,71,2,2]}],[{"kind":"cdDrawCurve","args":[64.16,71,56.76,158,12.36,189,22,7]}],[{"kind":"cdDrawCurve","args":[25.68,100,39.74,108,44.18,127,7,8]}],[{"kind":"cdDrawLine","args":[71,31,185,31,0,100]}],[{"kind":"cdDrawLine","args":[107,31,103,57,32,213]}],[{"kind":"cdDrawLine","args":[103,57,130,57,2,2]}],[{"kind":"cdDrawCurve","args":[130,57,133,136,123.88603368931844,152.2749398405028,22,0]},{"kind":"cdDrawCurve","args":[123.88603368931844,152.2749398405028,119,161,109,161,2,14]}],[{"kind":"cdDrawLine","args":[81,81,81,131,12,13]}],[{"kind":"cdDrawLine","args":[81,81,107,81,2,2]}],[{"kind":"cdDrawLine","args":[107,81,107,131,22,23]}],[{"kind":"cdDrawLine","args":[81,131,107,131,2,2]}],[{"kind":"cdDrawLine","args":[135,72,172,72,0,2]}],[{"kind":"cdDrawCurve","args":[172,72,166,135,132,161,22,7]}],[{"kind":"cdDrawCurve","args":[143,72,152,136,178,152,7,0]}],[{"kind":"cdDrawLine","args":[68,177,188,177,0,0]}]]
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
    for(let i=1;i<calls.length;i++){const c=calls[i-1];assert.deepEqual(c.args.slice(c.kind==='cdDrawLine'?2:4,c.kind==='cdDrawLine'?4:6),calls[i].args.slice(0,2),'All merged original trajectories must be continuous')}
    const pieces=calls.map(c=>{const a=c.args;if(c.kind==='cdDrawCurve')return {...segment(c.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
      assert.equal(c.kind,'cdDrawLine');const p=segment(c.polygons,a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve',Math.hypot(a[2]-a[0],a[3]-a[1])/2);return p.direction==='curve'?{...p,revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2}`,revealWidth:14}:p})
    if(pieces.length===1)return pieces[0]
    const a=calls[0].args
    return {outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:`M${a[0]/2} ${a[1]/2} ${calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?`L${v[2]/2} ${v[3]/2}`:`Q${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2}`}).join(' ')}`,revealWidth:14}
  }
  return sourceGroups.map(indices=>[compile(indices)])
}
