import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1,2],[3],[4],[5],[6],[8],[9,10],[7],[11],[12],[13],[15],[16,17],[14],[18],[19]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[37.16,13,37.16,54,0,32]}],[{"kind":"cdDrawLine","args":[12.76,54,56.07,54,0,2]}],[{"kind":"cdDrawCurve","args":[56.07,54,41.43,99,9.71,134,22,7]}],[{"kind":"cdDrawLine","args":[37.16,99,37.16,186,32,0]}],[{"kind":"cdDrawCurve","args":[60.34,90,56.68,99,45.7,115,0,7]}],[{"kind":"cdDrawCurve","args":[37.77,107,53.02,120,59.73,138,7,8]}],[{"kind":"cdDrawLine","args":[64.6,41,124.775,41,0,100]}],[{"kind":"cdDrawLine","args":[95.775,14,95.775,185,2000,0]}],[{"kind":"cdDrawLine","args":[74.75,66,74.75,120,1012,0]}],[{"kind":"cdDrawLine","args":[74.75,66,116.075,66,2,2]}],[{"kind":"cdDrawLine","args":[116.075,66,116.075,102,2022,1]},{"kind":"cdDrawCurve","args":[116.075,102,116.075,112,108.575,112,2001,614]}],[{"kind":"cdDrawCurve","args":[95.775,105,84.175,154,62.425,174,2,7]}],[{"kind":"cdDrawCurve","args":[97.225,124,111,136,118.25,155,7,8]}],[{"kind":"cdDrawLine","args":[127.675,41,188.575,41,0,0]}],[{"kind":"cdDrawLine","args":[155.95,14,155.95,185,2000,0]}],[{"kind":"cdDrawLine","args":[134.2,66,134.2,114,2012,100]}],[{"kind":"cdDrawLine","args":[134.2,66,179.15,66,2,2]}],[{"kind":"cdDrawLine","args":[179.15,66,179.15,102,1022,1]},{"kind":"cdDrawCurve","args":[179.15,102,179.15,112,170.4,112,1001,614]}],[{"kind":"cdDrawCurve","args":[155.95,102,140,153,116.075,174,2,7]}],[{"kind":"cdDrawCurve","args":[155.95,101,166.1,144,184.225,164,7,0]}]]
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
    for(let i=1;i<calls.length;i++){const c=calls[i-1];assert.deepEqual(c.args.slice(c.kind==='cdDrawLine'?2:4,c.kind==='cdDrawLine'?4:6),calls[i].args.slice(0,2),'All merged original trajectories must be continuous')}
    const pieces=calls.map(c=>{const a=c.args;if(c.kind==='cdDrawCurve')return {...segment(c.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
      assert.equal(c.kind,'cdDrawLine');const p=segment(c.polygons,a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve',Math.hypot(a[2]-a[0],a[3]-a[1])/2);return p.direction==='curve'?{...p,revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2}`,revealWidth:14}:p})
    if(pieces.length===1)return pieces[0]
    const a=calls[0].args
    return {outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:`M${a[0]/2} ${a[1]/2} ${calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?`L${v[2]/2} ${v[3]/2}`:`Q${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2}`}).join(' ')}`,revealWidth:14}
  }
  return sourceGroups.map(indices=>[compile(indices)])
}
