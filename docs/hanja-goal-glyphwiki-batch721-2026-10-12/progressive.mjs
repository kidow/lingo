import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0,1],[2,3],[4],[5],[6],[7],[8],[9],[10,11],[12],[13],[14,15],[17],[16],[18],[19],[20]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[48.2,16,38.4,37,26.5,56,0,7]}],[{"kind":"cdDrawCurve","args":[11.8,45,28.6,56,35.6,76,7,8]}],[{"kind":"cdDrawCurve","args":[68.5,39,48.9,76,25.8,110,0,7]}],[{"kind":"cdDrawCurve","args":[13.2,113,42.6,109,68.5,101,0,7]}],[{"kind":"cdDrawCurve","args":[53.8,78,67.1,91,72.7,114,7,8]}],[{"kind":"cdDrawLine","args":[45.4,109,45.4,186,32,0]}],[{"kind":"cdDrawCurve","args":[28.6,127,25.8,155,11.8,180,0,7]}],[{"kind":"cdDrawCurve","args":[54.5,122,67.1,136,72,161,7,8]}],[{"kind":"cdDrawLine","args":[131.32,12.6,131.32,40.5,0,32]}],[{"kind":"cdDrawCurve","args":[89.50599999999999,29.16,90.11200000000001,59.13,80.41599999999998,68.85,7,8]}],[{"kind":"cdDrawLine","args":[90.11200000000001,41.31,177.37599999999998,41.31,0,2]}],[{"kind":"cdDrawCurve","args":[177.37599999999998,41.31,173.74,51.03,165.25599999999997,67.23,22,7]}],[{"kind":"cdDrawLine","args":[99,62,161.62,62,0,100]}],[{"kind":"cdDrawLine","args":[91.93,86,91.93,142,12,113]}],[{"kind":"cdDrawLine","args":[91.93,86,168.69,86,2,2]}],[{"kind":"cdDrawLine","args":[168.69,86,168.69,142,22,223]}],[{"kind":"cdDrawLine","args":[130.31,62,130.31,142,32,32]}],[{"kind":"cdDrawLine","args":[91.93,114,168.69,114,2,2]}],[{"kind":"cdDrawLine","args":[91.93,142,168.69,142,2,2]}],[{"kind":"cdDrawCurve","args":[113.14,156,95.97,173,66.68,187,0,7]}],[{"kind":"cdDrawCurve","args":[139.4,155,164.65,165,179.8,183,7,8]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,21);assert.equal(proof.groups.length,21)
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
  return sourceGroups.map(indices=>[0,2].includes(indices[0])?indices.map(i=>compile([i])):[compile(indices)])
}
