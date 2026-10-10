import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0,1],[2],[3],[4],[5],[6],[7],[8],[9],[10,11],[12],[13],[14],[15,16,17],[18],[19],[20],[21],[22]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[24.65,28,61.2,28,2,2]}],[{"kind":"cdDrawCurve","args":[61.2,28,55.25,49,39.95,76,22,7]}],[{"kind":"cdDrawCurve","args":[39.95,75,62.05,100,57.157195168606926,125.18355427922904,7,0]},{"kind":"cdDrawCurve","args":[57.157195168606926,125.18355427922904,55.25,135,45.25,135,2,514]}],[{"kind":"cdDrawLine","args":[24.65,28,24.65,186,12,0]}],[{"kind":"cdDrawLine","args":[98.41499999999999,14,98.41499999999999,38,0,32]}],[{"kind":"cdDrawLine","args":[68.96000000000001,38,127.87,38,0,100]}],[{"kind":"cdDrawCurve","args":[77.865,43,85.4,54,88.825,72,7,8]}],[{"kind":"cdDrawCurve","args":[114.85499999999999,45,110.745,61,103.21000000000001,79,0,7]}],[{"kind":"cdDrawLine","args":[67.59,79,129.24,79,0,200]}],[{"kind":"cdDrawLine","args":[79.92,100,79.92,186,12,0]}],[{"kind":"cdDrawLine","args":[79.92,100,116.225,100,2,2]}],[{"kind":"cdDrawLine","args":[116.225,100,116.225,172,1022,1]},{"kind":"cdDrawCurve","args":[116.225,172,116.225,182,107.475,182,1001,514]}],[{"kind":"cdDrawLine","args":[79.92,124,116.225,124,2,2]}],[{"kind":"cdDrawLine","args":[79.92,147,116.225,147,2,2]}],[{"kind":"cdDrawLine","args":[138.14499999999998,36,184.725,36,2,100]}],[{"kind":"cdDrawLine","args":[138.14499999999998,14,138.14499999999998,59,0,213]}],[{"kind":"cdDrawLine","args":[138.14499999999998,59,175.135,59,2,2]}],[{"kind":"cdDrawLine","args":[175.135,59,175.135,87,22,223]}],[{"kind":"cdDrawLine","args":[138.14499999999998,87,175.135,87,2,2]}],[{"kind":"cdDrawLine","args":[138.14499999999998,87,138.14499999999998,170,1012,1]},{"kind":"cdDrawCurve","args":[138.14499999999998,170,138.14499999999998,180,148.14499999999998,180,10001,1001]},{"kind":"cdDrawLine","args":[148.14499999999998,180,183.35500000000002,180,1006,5]}],[{"kind":"cdDrawLine","args":[138.14499999999998,110,177.875,110,2,100]}],[{"kind":"cdDrawLine","args":[138.14499999999998,131,177.875,131,2,100]}],[{"kind":"cdDrawLine","args":[138.14499999999998,152,177.875,152,2,100]}]]
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
