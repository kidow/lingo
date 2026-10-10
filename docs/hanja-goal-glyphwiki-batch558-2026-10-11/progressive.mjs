import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[3],[2],[4],[6],[5],[7],[8],[9],[10],[11],[12],[13,14],[15],[16],[17],[18]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[12.935,31.86,93.53,31.86,0,100]}],[{"kind":"cdDrawLine","args":[63.68,12.62,63.68,50.36,0,300]}],[{"kind":"cdDrawLine","args":[135.32,12.62,135.32,50.36,0,300]}],[{"kind":"cdDrawLine","args":[105.47,31.86,186.065,31.86,0,0]}],[{"kind":"cdDrawCurve","args":[74.505,58.59,47.755,75.2,12.98,84.26,0,7]}],[{"kind":"cdDrawCurve","args":[45.615,72.935,61.13,78.975,65.945,91.81,7,8]}],[{"kind":"cdDrawCurve","args":[28.495,84.26,42.94,91.81,45.615,103.135,7,8]}],[{"kind":"cdDrawCurve","args":[90.555,83.505,52.57,114.46,11.91,128.805,0,7]}],[{"kind":"cdDrawCurve","args":[60.06,100.87,93.23,139.375,74.03723549376005,173.68281393669932,7,0]},{"kind":"cdDrawCurve","args":[74.03723549376005,173.68281393669932,69.155,182.41,59.155,182.41,2,214]}],[{"kind":"cdDrawCurve","args":[72.365,119.745,50.43,139.375,16.19,151.45499999999998,32,7]}],[{"kind":"cdDrawCurve","args":[79.855,143.15,56.315,163.535,11.91,176.37,32,7]}],[{"kind":"cdDrawCurve","args":[143.9,57.835,136.42000000000002,69.16,127.07,79.72999999999999,0,7]}],[{"kind":"cdDrawLine","args":[109.305,79.72999999999999,109.305,122.01,12,13]}],[{"kind":"cdDrawLine","args":[109.305,79.72999999999999,169.145,79.72999999999999,2,2]}],[{"kind":"cdDrawLine","args":[169.145,79.72999999999999,169.145,122.01,22,23]}],[{"kind":"cdDrawLine","args":[109.305,99.36,169.145,99.36,2,2]}],[{"kind":"cdDrawLine","args":[109.305,122.01,169.145,122.01,2,2]}],[{"kind":"cdDrawCurve","args":[128.94,124.275,121.46,177.125,79.385,187.695,0,7]}],[{"kind":"cdDrawLine","args":[147.64,122.01,147.64,168.635,32,1]},{"kind":"cdDrawCurve","args":[147.64,168.635,147.64,178.635,157.64,178.635,1,1]},{"kind":"cdDrawLine","args":[157.64,178.635,182.235,178.635,6,5]}]]
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
