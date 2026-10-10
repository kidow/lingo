import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10,11],[12],[13],[14],[15,16],[17]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[14.8,34.055,64,34.055,0,300]}],[{"kind":"cdDrawLine","args":[44.2,14.685,44.2,52.68,0,300]}],[{"kind":"cdDrawLine","args":[70,34.055,119.2,34.055,0,100]}],[{"kind":"cdDrawLine","args":[89.8,14.685,89.8,52.68,0,300]}],[{"kind":"cdDrawLine","args":[34.6,61.195,34.6,105.155,12,213]}],[{"kind":"cdDrawLine","args":[34.6,61.195,99.4,61.195,2,2]}],[{"kind":"cdDrawLine","args":[99.4,61.195,99.4,105.155,22,223]}],[{"kind":"cdDrawLine","args":[34.6,83.175,99.4,83.175,2,2]}],[{"kind":"cdDrawLine","args":[34.6,105.155,99.4,105.155,2,2]}],[{"kind":"cdDrawLine","args":[26.2,125.565,26.2,185.225,12,0]}],[{"kind":"cdDrawLine","args":[26.2,125.565,107.8,125.565,2,2]}],[{"kind":"cdDrawLine","args":[107.8,125.565,107.8,172.085,22,1]},{"kind":"cdDrawCurve","args":[107.8,172.085,107.8,182.085,97.8,182.085,1,214]}],[{"kind":"cdDrawLine","args":[67,61.195,67,154.61,32,32]}],[{"kind":"cdDrawCurve","args":[37.6,160.89,63.4,156.965,89.2,151.47,0,7]}],[{"kind":"cdDrawCurve","args":[76.6,133.41500000000002,89.8,147.54500000000002,94.6,167.17,7,8]}],[{"kind":"cdDrawLine","args":[118.16,65,177.5,65,0,2]}],[{"kind":"cdDrawCurve","args":[177.5,65,177.5,153,168.91100712017388,170.97696184149652,22,0]},{"kind":"cdDrawCurve","args":[168.91100712017388,170.97696184149652,164.6,180,154.6,180,2,414]}],[{"kind":"cdDrawLine","args":[146.54000000000002,19,146.54000000000002,64,0,1]},{"kind":"cdDrawCurve","args":[146.54000000000002,64,146.54000000000002,159,106.12,188,1,7]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,18);assert.equal(proof.groups.length,18)
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
