import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[4,5],[6],[7],[3],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[55.63,15,37.465,58,13.245,86,0,7]}],[{"kind":"cdDrawCurve","args":[52.17,25,73.795,37,83.31,56,7,8]}],[{"kind":"cdDrawLine","args":[38.33,61,74.66,61,0,100]}],[{"kind":"cdDrawLine","args":[33.14,79,33.14,186,12,0]}],[{"kind":"cdDrawLine","args":[33.14,79,73.795,79,2,2]}],[{"kind":"cdDrawLine","args":[73.795,79,73.795,123,22,123]}],[{"kind":"cdDrawLine","args":[33.14,100,73.795,100,0,2]}],[{"kind":"cdDrawLine","args":[32.275,123,73.795,123,2,2]}],[{"kind":"cdDrawLine","args":[33.14,147,85.04,147,2,100]}],[{"kind":"cdDrawLine","args":[33.14,170,85.905,170,2,0]}],[{"kind":"cdDrawCurve","args":[108.116,31.54,112.37199999999999,47.74,99.604,63.4,7,8]}],[{"kind":"cdDrawCurve","args":[176.82,28.3,167.7,43.96,150.676,58,0,7]}],[{"kind":"cdDrawCurve","args":[139.732,15.88,140.948,82.3,89.87599999999999,102.28,0,7]}],[{"kind":"cdDrawCurve","args":[133.044,65.56,161.62,76.9,181.68400000000003,97.96,7,8]}],[{"kind":"cdDrawCurve","args":[109.75,107,111.65,135,94.55,146,7,8]}],[{"kind":"cdDrawCurve","args":[180.05,111,165.8,126,146.8,140,0,7]}],[{"kind":"cdDrawCurve","args":[138.25,87,138.25,170,73.65,187,0,7]}],[{"kind":"cdDrawCurve","args":[140.15,96,140.15,164,181,182,7,0]}]]
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
