import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11],[15],[16,17],[18],[13],[12],[14],[19],[20],[21],[22],[23],[24]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[15.3,31,84.275,31,0,0]}],[{"kind":"cdDrawLine","args":[24.6,63,24.6,166,12,13]}],[{"kind":"cdDrawLine","args":[24.6,63,74.975,63,2,2]}],[{"kind":"cdDrawLine","args":[74.975,63,74.975,166,1022,23]}],[{"kind":"cdDrawLine","args":[41.65,31,41.65,63,2032,1]},{"kind":"cdDrawCurve","args":[41.65,63,41.65,113,30.025,129,2001,7]}],[{"kind":"cdDrawLine","args":[56.375,31,56.375,107,3032,1]},{"kind":"cdDrawCurve","args":[56.375,107,56.375,117,66.375,117,30001,1001]},{"kind":"cdDrawLine","args":[66.375,117,67.225,117,1006,5]}],[{"kind":"cdDrawLine","args":[24.6,141,74.975,141,2,2]}],[{"kind":"cdDrawLine","args":[24.6,166,74.975,166,2,2]}],[{"kind":"cdDrawLine","args":[84.72,36,187.38,36,0,0]}],[{"kind":"cdDrawLine","args":[122.775,14,122.775,59,0,113]}],[{"kind":"cdDrawLine","args":[149.325,14,149.325,59,0,123]}],[{"kind":"cdDrawLine","args":[122.775,59,149.325,59,2,2]}],[{"kind":"cdDrawLine","args":[83.83500000000001,89,107.73,89,0,2]}],[{"kind":"cdDrawLine","args":[107.73,59,107.73,145,2000,100]}],[{"kind":"cdDrawCurve","args":[84.72,134,94.455,129,107.73,117,0,7]}],[{"kind":"cdDrawLine","args":[124.545,87,124.545,129,3012,213]}],[{"kind":"cdDrawLine","args":[124.545,87,146.67000000000002,87,2,2]}],[{"kind":"cdDrawLine","args":[146.67000000000002,87,146.67000000000002,129,3022,223]}],[{"kind":"cdDrawLine","args":[124.545,129,146.67000000000002,129,2,2]}],[{"kind":"cdDrawCurve","args":[184.725,79,175.875,87,163.485,94,0,7]}],[{"kind":"cdDrawLine","args":[163.485,59,163.485,126,2000,1]},{"kind":"cdDrawCurve","args":[163.485,126,163.485,136,173.485,136,20001,1]},{"kind":"cdDrawLine","args":[173.485,136,182.955,136,6,5]}],[{"kind":"cdDrawCurve","args":[101.052675,150,100.44645000000001,173.25,88.32195,181.5,7,8]}],[{"kind":"cdDrawCurve","args":[116.81452499999999,151.5,125.30167499999997,164.25,124.089225,180,7,8]}],[{"kind":"cdDrawCurve","args":[139.85107500000004,151.5,151.36935,164.25,152.58180000000002,180,7,8]}],[{"kind":"cdDrawCurve","args":[164.100075,150.75,178.649475,165,182.28682500000002,181.5,7,8]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,25);assert.equal(proof.groups.length,25)
  assert.deepEqual(trace.map(r=>r.map(c=>({kind:c.kind,args:c.args}))),ORIGINAL)
  for(let i=0;i<trace.length;i++)assert.deepEqual(trace[i].flatMap(c=>c.polygons),proof.groups[i].polygons)
  const segment=(polygons,direction,weight)=>{
    const points=polygons.flat(),xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
    assert(points.length>0&&points.every(p=>p.off===0))
    const normalized=polygons.map(p=>{const area=p.reduce((n,v,i)=>{const q=p[(i+1)%p.length];return n+v.x*q.y-q.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
    return {outline:normalized.map(p=>p.map((v,i)=>`${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight:Math.round(weight*1e6)/1e6}
  }
  const compile=(indices,hook=null)=>{
    const calls=indices.flatMap(i=>trace[i]).map(c=>({...c,polygons:c.polygons.slice()}))
    if(hook)assert.deepEqual(calls.at(-1).polygons.pop(),hook)
    for(let i=1;i<calls.length;i++){const c=calls[i-1];assert.deepEqual(c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawBezier'?6:4,c.kind==='cdDrawLine'?4:c.kind==='cdDrawBezier'?8:6),calls[i].args.slice(0,2),'All merged original trajectories must be continuous')}
    const pieces=calls.map(c=>{const a=c.args;if(c.kind==='cdDrawBezier')return {...segment(c.polygons,'curve',Math.hypot(a[6]-a[0],a[7]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`,revealWidth:14};if(c.kind==='cdDrawCurve')return {...segment(c.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
      assert.equal(c.kind,'cdDrawLine');const p=segment(c.polygons,a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve',Math.hypot(a[2]-a[0],a[3]-a[1])/2);return p.direction==='curve'?{...p,revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2}`,revealWidth:14}:p})
    if(pieces.length===1)return pieces[0]
    const a=calls[0].args
    return {outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:`M${a[0]/2} ${a[1]/2} ${calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?`L${v[2]/2} ${v[3]/2}`:c.kind==='cdDrawBezier'?`C${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2} ${v[6]/2} ${v[7]/2}`:`Q${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2}`}).join(' ')}`,revealWidth:14}
  }
  return sourceGroups.map(indices=>[compile(indices)])
}
