import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1,2],[11],[12],[3],[5],[4],[10],[6],[7],[8],[9],[13],[14],[15],[17],[18],[16],[21],[22],[19,20]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[23.125,24.77,23.125,80.21,12,113]}],[{"kind":"cdDrawLine","args":[23.125,24.77,81.535,24.77,2,2]}],[{"kind":"cdDrawLine","args":[81.535,24.77,81.535,80.21,22,123]}],[{"kind":"cdDrawLine","args":[23.125,80.21,81.535,80.21,2,2]}],[{"kind":"cdDrawLine","args":[19.585,108.92,89.5,108.92,0,0]}],[{"kind":"cdDrawLine","args":[52.33,24.77,52.33,133.67,32,32]}],[{"kind":"cdDrawCurve","args":[29.32,149.51,28.435,172.28,13.39,183.17,7,8]}],[{"kind":"cdDrawCurve","args":[41.71,146.54,49.675,162.38,46.135,179.21,7,8]}],[{"kind":"cdDrawCurve","args":[56.755,145.55,65.605,157.43,68.26,175.25,7,8]}],[{"kind":"cdDrawCurve","args":[71.8,141.59,84.19,153.47,87.73,172.28,7,8]}],[{"kind":"cdDrawLine","args":[14.275,133.67,92.155,133.67,0,100]}],[{"kind":"cdDrawCurve","args":[28.435,36.65,36.4,47.54,40.825,67.34,7,8]}],[{"kind":"cdDrawCurve","args":[72.685,37.64,67.375,53.48,56.755,70.31,0,7]}],[{"kind":"cdDrawLine","args":[94.34,41,183.43,41,0,200]}],[{"kind":"cdDrawLine","args":[116.75999999999999,17,116.75999999999999,113,0,32]}],[{"kind":"cdDrawLine","args":[157.47,17,157.47,113,0,32]}],[{"kind":"cdDrawLine","args":[89.03,113,188.74,113,0,100]}],[{"kind":"cdDrawLine","args":[116.75999999999999,63,157.47,63,2,2]}],[{"kind":"cdDrawLine","args":[116.75999999999999,88,157.47,88,2,2]}],[{"kind":"cdDrawLine","args":[104.37,113,104.37,176,32,113]}],[{"kind":"cdDrawLine","args":[104.37,176,184.01999999999998,176,2,0]}],[{"kind":"cdDrawCurve","args":[129.15,113,129.74,153,104.96000000000001,166,32,7]}],[{"kind":"cdDrawLine","args":[146.26,113,146.26,144,32,1]},{"kind":"cdDrawCurve","args":[146.26,144,146.26,154,156.26,154,1,2001]},{"kind":"cdDrawLine","args":[156.26,154,171.63,154,2006,5]}]]
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
