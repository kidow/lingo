import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5],[6],[9],[8],[10],[11],[12],[13],[14],[15,16],[17],[18],[19],[20],[21]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[17.310000000000002,27.32,83.295,27.32,0,0]}],[{"kind":"cdDrawCurve","args":[58.65,27.32,45.93,56.44,13.335,84.52,132,7]}],[{"kind":"cdDrawCurve","args":[38.775,51.24,74.55,111.56,55.33309419075831,171.71426760053734,7,0]},{"kind":"cdDrawCurve","args":[55.33309419075831,171.71426760053734,52.29,181.24,42.29,181.24,2,314]}],[{"kind":"cdDrawCurve","args":[52.29,78.28,37.98,104.28,12.54,124.04,32,7]}],[{"kind":"cdDrawCurve","args":[60.24,106.36,41.955,141.72,12.54,156.28,32,7]}],[{"kind":"cdDrawCurve","args":[78.525,56.44,69.78,71,58.65,90.76,0,7]}],[{"kind":"cdDrawCurve","args":[62.625,105.32,72.96,113.64,81.705,134.44,7,8]}],[],[{"kind":"cdDrawLine","args":[135,12,135,50,2000,300]}],[{"kind":"cdDrawLine","args":[90,32,181,32,0,0]}],[{"kind":"cdDrawLine","args":[88,62,135,62,0,300]}],[{"kind":"cdDrawLine","args":[115,40,115,79,1000,300]}],[{"kind":"cdDrawLine","args":[138,62,188,62,0,0]}],[{"kind":"cdDrawLine","args":[156,40,156,79,1000,300]}],[{"kind":"cdDrawLine","args":[102,87,102,151,12,213]}],[{"kind":"cdDrawLine","args":[102,87,169,87,2,2]}],[{"kind":"cdDrawLine","args":[169,87,169,151,22,223]}],[{"kind":"cdDrawLine","args":[102,108,169,108,2,2]}],[{"kind":"cdDrawLine","args":[102,130,169,130,2,2]}],[{"kind":"cdDrawLine","args":[102,151,169,151,2,2]}],[{"kind":"cdDrawCurve","args":[124,165,106,180,80,189,0,7]}],[{"kind":"cdDrawCurve","args":[136,163,165,174,181,185,7,8]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,22);assert.equal(proof.groups.length,22)
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
