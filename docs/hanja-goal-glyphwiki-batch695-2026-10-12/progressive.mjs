import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1,2],[3],[4],[5,6],[7],[8],[9],[10],[11,12],[13],[14],[15],[16],[17]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[48.75,14,39.4,56,16.45,81,0,7]}],[{"kind":"cdDrawLine","args":[41.95,36,84.45,36,2,2]}],[{"kind":"cdDrawCurve","args":[84.45,36,54.7,99,13.05,122,22,7]}],[{"kind":"cdDrawCurve","args":[34.3,54,81.9,82,94.65,109,7,8]}],[{"kind":"cdDrawLine","args":[37.7,116,37.7,168,12,13]}],[{"kind":"cdDrawLine","args":[37.7,116,81.9,116,2,2]}],[{"kind":"cdDrawLine","args":[81.9,116,81.9,168,22,323]}],[{"kind":"cdDrawLine","args":[37.7,168,81.9,168,2,2]}],[{"kind":"cdDrawLine","args":[96.96,28,188.96,28,0,0]}],[{"kind":"cdDrawCurve","args":[144.8,28,137.44,43,126.4,56,132,7]}],[{"kind":"cdDrawLine","args":[113.52,56,113.52,142,12,113]}],[{"kind":"cdDrawLine","args":[113.52,56,170.56,56,2,2]}],[{"kind":"cdDrawLine","args":[170.56,56,170.56,142,22,323]}],[{"kind":"cdDrawLine","args":[113.52,85,170.56,85,2,2]}],[{"kind":"cdDrawLine","args":[113.52,113,170.56,113,2,2]}],[{"kind":"cdDrawLine","args":[113.52,142,170.56,142,2,2]}],[{"kind":"cdDrawCurve","args":[132.84,157,115.36,174,82.24,188,0,7]}],[{"kind":"cdDrawCurve","args":[146.64,154,168.72,163,182.52,181,7,8]}]]
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
  const compile=(indices)=>{
    const calls=indices.flatMap(i=>trace[i]).map(c=>({...c,polygons:c.polygons.slice()}))
    for(let i=1;i<calls.length;i++){const c=calls[i-1];assert.deepEqual(c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawBezier'?6:4,c.kind==='cdDrawLine'?4:c.kind==='cdDrawBezier'?8:6),calls[i].args.slice(0,2),'All merged original trajectories must be continuous')}
    const pieces=calls.map(c=>{const a=c.args;if(c.kind==='cdDrawBezier')return {...segment(c.polygons,'curve',Math.hypot(a[6]-a[0],a[7]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`,revealWidth:14};if(c.kind==='cdDrawCurve')return {...segment(c.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
      assert.equal(c.kind,'cdDrawLine');const p=segment(c.polygons,a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve',Math.hypot(a[2]-a[0],a[3]-a[1])/2);return p.direction==='curve'?{...p,revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2}`,revealWidth:14}:p})
    if(pieces.length===1)return pieces[0]
    const a=calls[0].args
    return {outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:`M${a[0]/2} ${a[1]/2} ${calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?`L${v[2]/2} ${v[3]/2}`:c.kind==='cdDrawBezier'?`C${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2} ${v[6]/2} ${v[7]/2}`:`Q${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2}`}).join(' ')}`,revealWidth:14}
  }
  return sourceGroups.map(indices=>indices.length===2 && (indices[0]===5 || indices[0]===11)
    ? (compile(indices),indices.map(i=>compile([i])))
    : [compile(indices)])
}
