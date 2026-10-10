import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[3],[2],[4],[5,6],[7],[8],[9],[10,11],[12],[13]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[12.13,30.835,93.94,30.835,0,0]}],[{"kind":"cdDrawLine","args":[63.64,10.945,63.64,49.96,0,300]}],[{"kind":"cdDrawLine","args":[136.36,10.945,136.36,49.96,0,300]}],[{"kind":"cdDrawLine","args":[106.06,30.835,187.87,30.835,0,0]}],[{"kind":"cdDrawCurve","args":[89,54.22,68,93.72,16,119,0,7]}],[{"kind":"cdDrawLine","args":[79,71.6,159,71.6,0,2]}],[{"kind":"cdDrawCurve","args":[159,71.6,153,97.67,142.42231212258287,101.43036804042178,22,0]},{"kind":"cdDrawCurve","args":[142.42231212258287,101.43036804042178,133,104.78,123,104.78,2,14]}],[{"kind":"cdDrawCurve","args":[92.75,113.28434999999999,81.05,116.3535,40.1,124.68404999999998,0,7]}],[{"kind":"cdDrawLine","args":[40.1,124.68404999999998,40.1,176.8596,12,213]}],[{"kind":"cdDrawLine","args":[40.1,149.23725000000002,95.675,149.23725000000002,2,0]}],[{"kind":"cdDrawLine","args":[108.35,123.3687,164.9,123.3687,0,2]}],[{"kind":"cdDrawLine","args":[164.9,123.3687,164.9,176.8596,22,223]}],[{"kind":"cdDrawLine","args":[109.325,149.23725000000002,164.9,149.23725000000002,0,2]}],[{"kind":"cdDrawLine","args":[40.1,176.8596,164.9,176.8596,2,2]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,14);assert.equal(proof.groups.length,14)
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
