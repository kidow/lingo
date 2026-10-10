import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5],[6],[7],[17],[15],[16],[18],[19],[20,21],[14],[8,10],[9],[11,13],[12]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[47.95,15,36.35,58,12.425,92,0,7]}],[{"kind":"cdDrawCurve","args":[47.225,27,65.35,38,72.6,54,7,8]}],[{"kind":"cdDrawLine","args":[30.55,71,71.875,71,0,100]}],[{"kind":"cdDrawLine","args":[17.5,103,76.225,103,0,100]}],[{"kind":"cdDrawLine","args":[47.225,71,47.225,164,32,32]}],[{"kind":"cdDrawCurve","args":[18.95,120,30.55,134,32,154,7,8]}],[{"kind":"cdDrawCurve","args":[68.975,119,63.9,135,55.925,151,0,7]}],[{"kind":"cdDrawCurve","args":[16.05,177,45.775,169,74.775,157,0,7]}],[{"kind":"cdDrawLine","args":[93.3955,105.2965,110.55250000000001,105.2965,0,2]}],[{"kind":"cdDrawCurve","args":[111.98225,106.86070000000001,110.55250000000001,136.5805,125.564875,156.9151,7,0]}],[{"kind":"cdDrawCurve","args":[110.55250000000001,105.2965,108.407875,148.312,88.391375,162.38979999999998,22,7]}],[{"kind":"cdDrawLine","args":[138.6155,105.2965,155.77249999999998,105.2965,0,2]}],[{"kind":"cdDrawCurve","args":[157.20225,106.86070000000001,155.77249999999998,136.5805,170.784875,156.9151,7,0]}],[{"kind":"cdDrawCurve","args":[155.77249999999998,105.2965,153.62787500000002,148.312,133.611375,162.38979999999998,22,7]}],[{"kind":"cdDrawLine","args":[131.5,68.32,131.5,182.17,32,0]}],[{"kind":"cdDrawLine","args":[108.225,16.207117750000002,108.225,66.51787825000001,0,213]}],[{"kind":"cdDrawLine","args":[153.445,16.207117750000002,153.445,66.51787825000001,0,223]}],[{"kind":"cdDrawLine","args":[77.635,35.50439575,186.03,35.50439575,0,0]}],[{"kind":"cdDrawLine","args":[108.225,66.51787825000001,153.445,66.51787825000001,2,2]}],[{"kind":"cdDrawLine","args":[86.28,89.4664,86.28,185.21920000000003,12,0]}],[{"kind":"cdDrawLine","args":[86.28,89.4664,176.72,89.4664,2,2]}],[{"kind":"cdDrawLine","args":[176.72,89.4664,176.72,172.76399999999998,22,1]},{"kind":"cdDrawCurve","args":[176.72,172.76399999999998,176.72,182.76399999999998,166.72,182.76399999999998,1,114]}]]
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
