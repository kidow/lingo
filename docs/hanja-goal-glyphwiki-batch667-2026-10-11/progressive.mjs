import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3,4],[5],[6],[7],[8],[9],[10,11],[12],[13],[14],[15],[16],[17],[18,19],[21],[20],[22],[23],[24],[25,26],[27]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[15.9408,31.2,98.0592,31.2,0,0]}],[{"kind":"cdDrawLine","args":[57,13.35,57,52.2,0,32]}],[{"kind":"cdDrawLine","args":[21.8064,52.2,92.1936,52.2,0,100]}],[{"kind":"cdDrawLine","args":[14.36,70,95.48,70,0,2]}],[{"kind":"cdDrawCurve","args":[95.48,70,93.4,80,89.24,92,22,7]}],[{"kind":"cdDrawLine","args":[23.72,88,86.12,88,0,100]}],[{"kind":"cdDrawLine","args":[57,88,57,108,32,32]}],[{"kind":"cdDrawLine","args":[17.48,108,95.48,108,0,100]}],[{"kind":"cdDrawLine","args":[12.280000000000001,126,101.72,126,0,200]}],[{"kind":"cdDrawLine","args":[22.4408,143.5,22.4408,170.5,1012,113]}],[{"kind":"cdDrawLine","args":[22.4408,143.5,44.75920000000001,143.5,2,2]}],[{"kind":"cdDrawLine","args":[44.75920000000001,143.5,44.75920000000001,170.5,1022,123]}],[{"kind":"cdDrawLine","args":[22.4408,170.5,44.75920000000001,170.5,2,2]}],[{"kind":"cdDrawLine","args":[51.8,146,99.64,146,0,300]}],[{"kind":"cdDrawLine","args":[83,130,83,172,0,1]},{"kind":"cdDrawCurve","args":[83,172,83,182,73,182,1,14]}],[{"kind":"cdDrawCurve","args":[54.92,152,62.2,156,66.36,170,7,8]}],[{"kind":"cdDrawCurve","args":[144.72,16,140.12,28,132.76,43,0,7]}],[{"kind":"cdDrawLine","args":[114.36,43,114.36,106,12,13]}],[{"kind":"cdDrawLine","args":[114.36,43,175.08,43,2,2]}],[{"kind":"cdDrawLine","args":[175.08,43,175.08,106,22,323]}],[{"kind":"cdDrawLine","args":[144.72,43,144.72,106,32,32]}],[{"kind":"cdDrawLine","args":[114.36,74,175.08,74,2,2]}],[{"kind":"cdDrawLine","args":[114.36,106,175.08,106,2,2]}],[{"kind":"cdDrawCurve","args":[132.76,112,126.32,178,87.68,188,0,7]}],[{"kind":"cdDrawLine","args":[148.4,108,148.4,167,0,1]},{"kind":"cdDrawCurve","args":[148.4,167,148.4,177,158.4,177,1,1]},{"kind":"cdDrawLine","args":[158.4,177,184.28,177,6,5]}],[{"kind":"cdDrawCurve","args":[167.72,120,164.04,133,158.52,146,0,7]}],[{"kind":"cdDrawCurve","args":[154.84,149,164.04,145,176.92,141,0,7]}],[{"kind":"cdDrawCurve","args":[171.4,131,176.92,138,178.76,151,7,8]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,28);assert.equal(proof.groups.length,28)
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
