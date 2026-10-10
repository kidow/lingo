import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1,2],[3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13],[14],[15]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[23.7222,37.56,23.7222,150.44,12,13]}],[{"kind":"cdDrawLine","args":[23.7222,37.56,57.8178,37.56,2,2]}],[{"kind":"cdDrawLine","args":[57.8178,37.56,57.8178,150.44,22,23]}],[{"kind":"cdDrawLine","args":[23.7222,92.34,57.8178,92.34,2,2]}],[{"kind":"cdDrawLine","args":[23.7222,150.44,57.8178,150.44,2,2]}],[{"kind":"cdDrawCurve","args":[97.3,16.85,88.2,63.38,65.8,90.11,0,7]}],[{"kind":"cdDrawLine","args":[91,40.61,180.6,40.61,2,0]}],[{"kind":"cdDrawLine","args":[92.4,63.38,172.2,63.38,0,100]}],[{"kind":"cdDrawLine","args":[81.2,86.15,160.3,86.15,0,2]}],[{"kind":"cdDrawCurve","args":[160.3,86.15,158.9,172.28,183.4,182.18,22,15]}],[{"kind":"cdDrawCurve","args":[80.6855,96.04505,92.52950000000001,104.99465000000001,97.4645,120.0971,7,8]}],[{"kind":"cdDrawCurve","args":[141.38600000000002,96.04505,135.464,108.35074999999999,126.0875,121.2158,0,7]}],[{"kind":"cdDrawLine","args":[73.7765,128.48735,155.204,128.48735,0,0]}],[{"kind":"cdDrawLine","args":[113.75,92.1296,113.75,186.10039999999998,0,0]}],[{"kind":"cdDrawCurve","args":[107.828,128.48735,98.45150000000001,158.69225,72.296,181.62560000000002,132,7]}],[{"kind":"cdDrawCurve","args":[113.75,135.19955000000002,136.45100000000002,146.9459,147.80149999999998,164.8451,7,8]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,16);assert.equal(proof.groups.length,16)
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
