import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12,13],[14],[15],[16],[17],[18]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[31,20.315,31,48.065,12,213]}],[{"kind":"cdDrawLine","args":[31,20.315,169,20.315,2,2]}],[{"kind":"cdDrawLine","args":[169,20.315,169,48.065,22,223]}],[{"kind":"cdDrawLine","args":[77,20.315,77,48.065,32,32]}],[{"kind":"cdDrawLine","args":[123,20.315,123,48.065,32,32]}],[{"kind":"cdDrawLine","args":[31,48.065,169,48.065,2,2]}],[{"kind":"cdDrawLine","args":[100,56.008875,100,70.609875,0,32]}],[{"kind":"cdDrawLine","args":[26,70.609875,174,70.609875,0,0]}],[{"kind":"cdDrawCurve","args":[54,73.65174999999999,70,81.560625,76,93.728125,7,8]}],[{"kind":"cdDrawCurve","args":[140,74.8685,133,83.994125,116,98.595125,0,7]}],[{"kind":"cdDrawLine","args":[15,98.595125,185,98.595125,0,100]}],[{"kind":"cdDrawLine","args":[45,112.3475,45,148.478,12,313]}],[{"kind":"cdDrawLine","args":[45,112.3475,155,112.3475,2,2]}],[{"kind":"cdDrawLine","args":[155,112.3475,155,148.478,22,323]}],[{"kind":"cdDrawLine","args":[45,130.41275000000002,155,130.41275000000002,2,2]}],[{"kind":"cdDrawLine","args":[45,148.478,155,148.478,2,2]}],[{"kind":"cdDrawLine","args":[32,165.56675,168,165.56675,0,100]}],[{"kind":"cdDrawLine","args":[100,112.3475,100,183.63199999999998,32,32]}],[{"kind":"cdDrawLine","args":[16,183.63199999999998,184,183.63199999999998,0,0]}]]
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
