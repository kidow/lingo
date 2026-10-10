import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[6,7],[5],[8],[9],[10],[11,12],[14],[13],[15],[16],[17,18],[19],[20],[21]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[15.875,71.5,68.075,71.5,0,100]}],[{"kind":"cdDrawLine","args":[41.25,22.1,41.25,138.95,0,32]}],[{"kind":"cdDrawCurve","args":[15.875,154.15,36.9,145.6,68.8,127.55,0,7]}],[{"kind":"cdDrawLine","args":[121.68,13,121.68,46,0,32]}],[{"kind":"cdDrawLine","args":[121.68,28,170.325,28,2,100]}],[{"kind":"cdDrawLine","args":[78.675,46,78.675,111,1012,1]},{"kind":"cdDrawCurve","args":[78.675,111,78.675,163,62.46,185,1001,7]}],[{"kind":"cdDrawLine","args":[78.675,46,178.07999999999998,46,2,2]}],[{"kind":"cdDrawCurve","args":[178.07999999999998,46,173.14499999999998,56,166.095,68,22,7]}],[{"kind":"cdDrawLine","args":[85.725,72,161.865,63,0,0]}],[{"kind":"cdDrawLine","args":[117.45,48,117.45,75,0,1]},{"kind":"cdDrawCurve","args":[117.45,75,117.45,85,127.45,85,1,3001]},{"kind":"cdDrawLine","args":[127.45,85,173.85,85,3006,5]}],[{"kind":"cdDrawLine","args":[98.62368,100.125,98.62368,135.875,1012,313]}],[{"kind":"cdDrawLine","args":[98.62368,100.125,165.88632,100.125,2,2]}],[{"kind":"cdDrawLine","args":[165.88632,100.125,165.88632,135.875,22,323]}],[{"kind":"cdDrawLine","args":[132.255,100.125,132.255,135.875,32,32]}],[{"kind":"cdDrawLine","args":[98.62368,117.725,165.88632,117.725,2,2]}],[{"kind":"cdDrawLine","args":[98.62368,135.875,165.88632,135.875,2,2]}],[{"kind":"cdDrawLine","args":[97.695054,151.1045,97.695054,184.1375,1012,32]}],[{"kind":"cdDrawLine","args":[97.695054,151.1045,166.81494600000002,151.1045,2,2]}],[{"kind":"cdDrawLine","args":[166.81494600000002,151.1045,166.81494600000002,184.1375,1022,32]}],[{"kind":"cdDrawLine","args":[120.735018,151.1045,120.735018,184.1375,2032,32]}],[{"kind":"cdDrawLine","args":[143.774982,151.1045,143.774982,184.1375,2032,32]}],[{"kind":"cdDrawLine","args":[77.215086,184.1375,187.29491399999998,184.1375,0,300]}]]
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
