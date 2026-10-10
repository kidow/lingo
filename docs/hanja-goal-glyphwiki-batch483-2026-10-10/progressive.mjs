import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2,3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14,15],[16],[17],[18]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[50.35,15.2,46.11,21.8,40.28,29,0,7]}],[{"kind":"cdDrawLine","args":[24.38,29,24.38,65.6,12,313]}],[{"kind":"cdDrawLine","args":[24.38,29,79.5,29,2,2]}],[{"kind":"cdDrawLine","args":[79.5,29,79.5,65.6,22,323]}],[{"kind":"cdDrawLine","args":[24.38,47,79.5,47,2,2]}],[{"kind":"cdDrawLine","args":[24.38,65.6,79.5,65.6,2,2]}],[{"kind":"cdDrawCurve","args":[78.97,78.8,53,86,27.03,92.6,0,7]}],[{"kind":"cdDrawLine","args":[27.03,71.6,27.03,100.6,0,1]},{"kind":"cdDrawCurve","args":[27.03,100.6,27.03,110.6,37.03,110.6,1,3001]},{"kind":"cdDrawLine","args":[37.03,110.6,90.1,110.6,3006,5]}],[{"kind":"cdDrawLine","args":[99.82,26.6,180.05,26.6,0,0]}],[{"kind":"cdDrawLine","args":[114.51,33.8,109.425,62.6,0,113]}],[{"kind":"cdDrawLine","args":[109.425,62.6,186.265,62.6,2,0]}],[{"kind":"cdDrawCurve","args":[145.585,27.8,144.45499999999998,93.8,93.605,117.2,0,7]}],[{"kind":"cdDrawLine","args":[148.41,64.4,148.41,101.2,0,1]},{"kind":"cdDrawCurve","args":[148.41,101.2,148.41,111.2,158.41,111.2,1,1]},{"kind":"cdDrawLine","args":[158.41,111.2,182.875,111.2,6,5]}],[{"kind":"cdDrawLine","args":[51.4,126.37,51.4,165.13,12,313]}],[{"kind":"cdDrawLine","args":[51.4,126.37,148.6,126.37,2,2]}],[{"kind":"cdDrawLine","args":[148.6,126.37,148.6,165.13,22,323]}],[{"kind":"cdDrawLine","args":[51.4,145.18,148.6,145.18,2,2]}],[{"kind":"cdDrawLine","args":[51.4,165.13,148.6,165.13,2,2]}],[{"kind":"cdDrawLine","args":[14,179.125,186,179.125,0,100]}]]
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
    for(let i=1;i<calls.length;i++){const c=calls[i-1];assert.deepEqual(c.args.slice(c.kind==='cdDrawLine'?2:4,c.kind==='cdDrawLine'?4:6),calls[i].args.slice(0,2),'All merged original trajectories must be continuous')}
    const pieces=calls.map(c=>{const a=c.args;if(c.kind==='cdDrawCurve')return {...segment(c.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
      assert.equal(c.kind,'cdDrawLine');const p=segment(c.polygons,a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve',Math.hypot(a[2]-a[0],a[3]-a[1])/2);return p.direction==='curve'?{...p,revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2}`,revealWidth:14}:p})
    if(pieces.length===1)return pieces[0]
    const a=calls[0].args
    return {outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:`M${a[0]/2} ${a[1]/2} ${calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?`L${v[2]/2} ${v[3]/2}`:`Q${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2}`}).join(' ')}`,revealWidth:14}
  }
  return sourceGroups.map(indices=>[compile(indices)])
}
