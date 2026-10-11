import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[2],[1],[3],[4,5],[7],[6],[8],[9],[10],[11],[12],[13],[14],[15,16],[17],[18],[19]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[14.16,42,71.5,42,0,0]}],[{"kind":"cdDrawLine","args":[39.54,42,39.54,149,32,32]}],[{"kind":"cdDrawLine","args":[16.98,93,68.68,93,0,100]}],[{"kind":"cdDrawCurve","args":[14.16,160,41.42,150,74.32,135,0,7]}],[{"kind":"cdDrawLine","args":[89.67,27.89335,162.12,27.89335,0,2]}],[{"kind":"cdDrawLine","args":[162.12,27.89335,162.12,68.73183999999999,22,223]}],[{"kind":"cdDrawLine","args":[88.28999999999999,68.73183999999999,162.12,68.73183999999999,0,2]}],[{"kind":"cdDrawLine","args":[74.49,47.57455,186.26999999999998,47.57455,0,200]}],[{"kind":"cdDrawLine","args":[129,13.13245,129,90.87319000000001,0,32]}],[{"kind":"cdDrawLine","args":[72.42,90.87319000000001,185.57999999999998,90.87319000000001,0,0]}],[{"kind":"cdDrawCurve","args":[89.67,100,88.98,121.483,75.18,129.106,7,8]}],[{"kind":"cdDrawCurve","args":[107.61,101.38600000000001,117.27000000000001,113.16699999999999,115.89,127.72,7,8]}],[{"kind":"cdDrawCurve","args":[133.82999999999998,101.38600000000001,146.94,113.16699999999999,148.32,127.72,7,8]}],[{"kind":"cdDrawCurve","args":[161.43,100.69300000000001,177.99,113.86,182.13,129.106,7,8]}],[{"kind":"cdDrawLine","args":[91.74,138.6397,91.74,176.4775,12,32]}],[{"kind":"cdDrawLine","args":[91.74,138.6397,166.26,138.6397,2,2]}],[{"kind":"cdDrawLine","args":[166.26,138.6397,166.26,176.4775,22,32]}],[{"kind":"cdDrawLine","args":[116.58,138.6397,116.58,176.4775,32,32]}],[{"kind":"cdDrawLine","args":[141.42000000000002,138.6397,141.42000000000002,176.4775,32,32]}],[{"kind":"cdDrawLine","args":[69.66,176.4775,188.34,176.4775,0,200]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,20);assert.equal(proof.groups.length,20)
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
