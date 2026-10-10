import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[3],[4],[2],[5,6],[7],[8],[9],[10],[11],[15],[16],[17],[18],[12],[13],[14]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[24.08,28,24.08,110,12,313]}],[{"kind":"cdDrawLine","args":[24.08,28,82.56,28,2,0]}],[{"kind":"cdDrawLine","args":[51.6,28,51.6,110,32,32]}],[{"kind":"cdDrawLine","args":[24.08,56,81.7,56,2,0]}],[{"kind":"cdDrawLine","args":[24.08,83,81.7,83,2,0]}],[{"kind":"cdDrawLine","args":[24.08,110,75.68,110,2,2]}],[{"kind":"cdDrawCurve","args":[75.68,110,77.4,156,67.54157239743316,174.20639844523288,22,0]},{"kind":"cdDrawCurve","args":[67.54157239743316,174.20639844523288,62.78,183,52.78,183,2,214]}],[{"kind":"cdDrawCurve","args":[23.22,124,25.8,160,14.62,172,7,8]}],[{"kind":"cdDrawCurve","args":[31.82,127,38.7,147,36.12,164,7,8]}],[{"kind":"cdDrawCurve","args":[40.42,124,49.88,138,50.74,155,7,8]}],[{"kind":"cdDrawCurve","args":[48.16,118,59.34,127,62.78,142,7,8]}],[{"kind":"cdDrawLine","args":[84.5,46,186.375,46,0,0]}],[{"kind":"cdDrawLine","args":[135.125,14,135.125,186,0,0]}],[{"kind":"cdDrawCurve","args":[135.125,92,123.25,144,82,180,32,7]}],[{"kind":"cdDrawCurve","args":[135.75,91,150.75,148,183.25,172,7,0]}],[{"kind":"cdDrawCurve","args":[107.625,57,102,103,83.875,129,0,7]}],[{"kind":"cdDrawCurve","args":[103.875,81,115.75,95,120.75,110,7,8]}],[{"kind":"cdDrawCurve","args":[163.875,58,158.875,102,144.5,120,0,7]}],[{"kind":"cdDrawCurve","args":[160.75,86,172,98,180.125,119,7,8]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,19);assert.equal(proof.groups.length,19)
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
