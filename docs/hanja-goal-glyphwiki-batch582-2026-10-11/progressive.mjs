import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2,3],[4,5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[39.195,15.48,31.155,43.2,12.06,61.68000000000001,0,7]}],[{"kind":"cdDrawLine","args":[32.16,33.96,108.54,33.96,2,0]}],[{"kind":"cdDrawLine","args":[41.205,51.12,31.155,115.8,12,413]}],[{"kind":"cdDrawLine","args":[31.155,115.8,109.545,115.8,2,100]}],[{"kind":"cdDrawLine","args":[41.205,51.12,90.45,51.12,2,2]}],[{"kind":"cdDrawLine","args":[90.45,51.12,81.405,127.68,22,0]}],[{"kind":"cdDrawCurve","args":[51.255,57.72,63.315,63,67.335,74.88,7,8]}],[{"kind":"cdDrawCurve","args":[47.235,89.4,60.3,93.36,66.33,106.56,7,8]}],[{"kind":"cdDrawLine","args":[13.065,82.8,115.575,82.8,0,100]}],[{"kind":"cdDrawCurve","args":[138.76035,16.7076,128.75055000000003,50.03099999999999,105.39435000000002,72.9,0,7]}],[{"kind":"cdDrawLine","args":[125.41395,48.7242,187.14105,48.7242,2,0]}],[{"kind":"cdDrawCurve","args":[163.78485,48.7242,153.77505,112.104,89.54549999999999,130.3992,2,7]}],[{"kind":"cdDrawCurve","args":[120.40905000000001,55.258199999999995,129.5847,105.57,180.46785,123.8652,7,0]}],[{"kind":"cdDrawCurve","args":[37,135.4,38,165.15,18,176.2,7,8]}],[{"kind":"cdDrawLine","args":[66,136.25,66,169.6,0,1]},{"kind":"cdDrawCurve","args":[66,169.6,66,179.6,76,179.6,1,1]},{"kind":"cdDrawLine","args":[76,179.6,147,179.6,6,5]}],[{"kind":"cdDrawCurve","args":[87,131.15,107,139.65,118,156.65,7,8]}],[{"kind":"cdDrawCurve","args":[148,137.1,172,150.7,179,171.95,7,8]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,17);assert.equal(proof.groups.length,17)
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
