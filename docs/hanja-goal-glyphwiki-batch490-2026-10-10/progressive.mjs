import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[11],[12,13],[14],[15]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[52.4,15,36.2,72,12.2,117,0,7]}],[{"kind":"cdDrawLine","args":[36.2,73,36.2,186,0,0]}],[{"kind":"cdDrawLine","args":[54.975,44,124.0875,44,0,300]}],[{"kind":"cdDrawLine","args":[72.7875,16,72.7875,137,0,32]}],[{"kind":"cdDrawLine","args":[104.85,16,104.85,137,0,32]}],[{"kind":"cdDrawLine","args":[72.7875,75,104.85,75,2,2]}],[{"kind":"cdDrawLine","args":[72.7875,106,104.85,106,2,2]}],[{"kind":"cdDrawLine","args":[53.55,137,124.8,137,0,300]}],[{"kind":"cdDrawCurve","args":[79.2,147,71.3625,169,54.975,187,0,7]}],[{"kind":"cdDrawCurve","args":[92.025,146,106.275,155,114.1125,173,7,8]}],[],[{"kind":"cdDrawCurve","args":[144.77249999999998,16,138.765,57,121.41,88,0,7]}],[{"kind":"cdDrawLine","args":[134.0925,61,177.48,61,2,2]}],[{"kind":"cdDrawCurve","args":[177.48,61,172.8075,73,161.45999999999998,94,22,7]}],[{"kind":"cdDrawCurve","args":[148.11,71,148.11,165,107.3925,188,0,7]}],[{"kind":"cdDrawCurve","args":[150.1125,95,151.4475,152,180.8175,179,7,0]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,16);assert.equal(proof.groups.length,16)
  assert.deepEqual(trace[10],[]);assert.equal(proof.groups[10].polygons.length,0)
  assert.deepEqual(sourceGroups.flat().slice().sort((a,b)=>a-b),Array.from({length:16},(_,i)=>i).filter(i=>i!==10))
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
    for(let i=1;i<calls.length;i++){const c=calls[i-1];assert.deepEqual(c.args.slice(c.kind==='cdDrawLine'?2:4,c.kind==='cdDrawLine'?4:6),calls[i].args.slice(0,2),'All merged original trajectories must be continuous')}
    const pieces=calls.map(c=>{const a=c.args;if(c.kind==='cdDrawCurve')return {...segment(c.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
      assert.equal(c.kind,'cdDrawLine');const p=segment(c.polygons,a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve',Math.hypot(a[2]-a[0],a[3]-a[1])/2);return p.direction==='curve'?{...p,revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2}`,revealWidth:14}:p})
    if(pieces.length===1)return pieces[0]
    const a=calls[0].args
    return {outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:`M${a[0]/2} ${a[1]/2} ${calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?`L${v[2]/2} ${v[3]/2}`:`Q${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2}`}).join(' ')}`,revealWidth:14}
  }
  return sourceGroups.map(indices=>[compile(indices)])
}
