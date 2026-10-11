import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[4,5],[6],[7],[3],[8],[9],[10],[11,12],[13],[14],[15],[16,17],[18],[19],[20,21]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[52.7,15,34.85,58,11.05,86,0,7]}],[{"kind":"cdDrawCurve","args":[49.3,25,70.55,37,79.9,56,7,8]}],[{"kind":"cdDrawLine","args":[35.7,61,71.4,61,0,200]}],[{"kind":"cdDrawLine","args":[30.6,79,30.6,186,12,0]}],[{"kind":"cdDrawLine","args":[30.6,79,70.55,79,2,2]}],[{"kind":"cdDrawLine","args":[70.55,79,70.55,123,22,323]}],[{"kind":"cdDrawLine","args":[30.6,100,70.55,100,0,2]}],[{"kind":"cdDrawLine","args":[29.75,123,70.55,123,2,2]}],[{"kind":"cdDrawLine","args":[30.6,147,81.6,147,2,100]}],[{"kind":"cdDrawLine","args":[30.6,170,82.45,170,2,0]}],[{"kind":"cdDrawLine","args":[99.525,24.96,99.525,80.04,12,113]}],[{"kind":"cdDrawLine","args":[99.525,24.96,168.375,24.96,2,2]}],[{"kind":"cdDrawLine","args":[168.375,24.96,168.375,80.04,22,123]}],[{"kind":"cdDrawLine","args":[99.525,51.69,168.375,51.69,2,2]}],[{"kind":"cdDrawLine","args":[99.525,80.04,168.375,80.04,2,2]}],[{"kind":"cdDrawCurve","args":[122.05,82,105.05,116,77.85,139,0,7]}],[{"kind":"cdDrawLine","args":[108.45,105,177.3,105,2,2]}],[{"kind":"cdDrawCurve","args":[177.3,105,179,156,167.98326713865174,174.41806732237788,22,0]},{"kind":"cdDrawCurve","args":[167.98326713865174,174.41806732237788,162.85,183,152.85,183,2,14]}],[{"kind":"cdDrawCurve","args":[136.5,112,128.85,142,108.45,159,0,7]}],[{"kind":"cdDrawCurve","args":[131.4,126,146.7,134,156.9,150,7,8]}],[{"kind":"cdDrawLine","args":[99.81400000000001,127.44,99.81400000000001,166.38,0,13]}],[{"kind":"cdDrawLine","args":[99.81400000000001,166.38,159.98125,166.38,2,0]}]]
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
  const compile=(indices)=>{
    const calls=indices.flatMap(i=>trace[i]).map(c=>({...c,polygons:c.polygons.slice()}))
    for(let i=1;i<calls.length;i++){const c=calls[i-1];assert.deepEqual(c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawBezier'?6:4,c.kind==='cdDrawLine'?4:c.kind==='cdDrawBezier'?8:6),calls[i].args.slice(0,2),'All merged original trajectories must be continuous')}
    const pieces=calls.map(c=>{const a=c.args;if(c.kind==='cdDrawBezier')return {...segment(c.polygons,'curve',Math.hypot(a[6]-a[0],a[7]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`,revealWidth:14};if(c.kind==='cdDrawCurve')return {...segment(c.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
      assert.equal(c.kind,'cdDrawLine');const p=segment(c.polygons,a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve',Math.hypot(a[2]-a[0],a[3]-a[1])/2);return p.direction==='curve'?{...p,revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2}`,revealWidth:14}:p})
    if(pieces.length===1)return pieces[0]
    const a=calls[0].args
    return {outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:`M${a[0]/2} ${a[1]/2} ${calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?`L${v[2]/2} ${v[3]/2}`:c.kind==='cdDrawBezier'?`C${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2} ${v[6]/2} ${v[7]/2}`:`Q${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2}`}).join(' ')}`,revealWidth:14}
  }
  return sourceGroups.map(indices=>indices.length===2 && (indices[0]===4 || indices[0]===11 || indices[0]===20)
    ? (compile(indices),indices.map(i=>compile([i])))
    : [compile(indices)])
}
