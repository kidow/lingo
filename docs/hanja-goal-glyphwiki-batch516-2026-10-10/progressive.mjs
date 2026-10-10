import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3,4],[5],[6],[7],[8],[9],[10,11],[12],[13],[14],[15],[16,17],[18],[19],[20,21],[22],[23]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[15.8356,34.42,97.1644,34.42,0,0]}],[{"kind":"cdDrawLine","args":[56.5,17.01625,56.5,54.895,0,32]}],[{"kind":"cdDrawLine","args":[21.6448,54.895,91.35520000000001,54.895,0,100]}],[{"kind":"cdDrawLine","args":[14.27,72.25,94.61,72.25,0,2]}],[{"kind":"cdDrawCurve","args":[94.61,72.25,92.55,82,88.43,93.7,22,7]}],[{"kind":"cdDrawLine","args":[23.54,89.8,85.34,89.8,0,100]}],[{"kind":"cdDrawLine","args":[56.5,89.8,56.5,109.3,32,32]}],[{"kind":"cdDrawLine","args":[17.36,109.3,94.61,109.3,0,100]}],[{"kind":"cdDrawLine","args":[12.21,126.85,100.79,126.85,0,200]}],[{"kind":"cdDrawLine","args":[22.2731,143.9125,22.2731,170.2375,1012,113]}],[{"kind":"cdDrawLine","args":[22.2731,143.9125,44.376900000000006,143.9125,2,2]}],[{"kind":"cdDrawLine","args":[44.376900000000006,143.9125,44.376900000000006,170.2375,1022,123]}],[{"kind":"cdDrawLine","args":[22.2731,170.2375,44.376900000000006,170.2375,2,2]}],[{"kind":"cdDrawLine","args":[51.35,146.35,98.73,146.35,0,300]}],[{"kind":"cdDrawLine","args":[82.25,130.75,82.25,171.45,0,1]},{"kind":"cdDrawCurve","args":[82.25,171.45,82.25,181.45,72.25,181.45,1,14]}],[{"kind":"cdDrawCurve","args":[54.44,152.2,61.65,156.1,65.77000000000001,169.75,7,8]}],[{"kind":"cdDrawLine","args":[98.925,30,134.625,30,0,2]}],[{"kind":"cdDrawLine","args":[134.625,30,134.625,172,22,1]},{"kind":"cdDrawCurve","args":[134.625,172,134.625,182,124.625,182,1,14]}],[{"kind":"cdDrawCurve","args":[125.7,43,117.825,83,101.55,113,0,7]}],[{"kind":"cdDrawCurve","args":[129.375,92,119.4,136,98.925,169,0,7]}],[{"kind":"cdDrawLine","args":[143.025,30,178.725,30,0,2]}],[{"kind":"cdDrawLine","args":[178.725,30,178.725,172,22,1]},{"kind":"cdDrawCurve","args":[178.725,172,178.725,182,168.725,182,1,514]}],[{"kind":"cdDrawCurve","args":[169.8,43,161.925,83,146.175,113,0,7]}],[{"kind":"cdDrawCurve","args":[174,92,163.5,136,143.025,169,0,7]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,24);assert.equal(proof.groups.length,24)
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
