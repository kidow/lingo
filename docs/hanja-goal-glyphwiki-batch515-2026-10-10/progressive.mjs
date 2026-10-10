import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11,12],[14],[13,15],[16],[17],[18],[19],[20],[21]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[15.2,30,58.52,30,0,100]}],[{"kind":"cdDrawLine","args":[12.16,56,65.36,56,0,0]}],[{"kind":"cdDrawLine","args":[15.2,84,58.52,84,0,100]}],[{"kind":"cdDrawLine","args":[15.2,110,58.52,110,0,100]}],[{"kind":"cdDrawLine","args":[19.76,135,19.76,173,12,113]}],[{"kind":"cdDrawLine","args":[19.76,135,53.96,135,2,2]}],[{"kind":"cdDrawLine","args":[53.96,135,53.96,173,22,123]}],[{"kind":"cdDrawLine","args":[19.76,173,53.96,173,2,2]}],[{"kind":"cdDrawLine","args":[96.8475,14,96.8475,40,0,32]}],[{"kind":"cdDrawLine","args":[66.4185,40,130.1745,40,0,0]}],[{"kind":"cdDrawLine","args":[80.184,57,80.184,83,12,213]}],[{"kind":"cdDrawLine","args":[80.184,57,113.511,57,2,2]}],[{"kind":"cdDrawLine","args":[113.511,57,113.511,83,22,323]}],[{"kind":"cdDrawLine","args":[70.7655,107,116.40899999999999,107,0,2]}],[{"kind":"cdDrawLine","args":[80.184,83,113.511,83,0,2]}],[{"kind":"cdDrawCurve","args":[116.40899999999999,107,106.9905,121,98.29650000000001,130,22,7]}],[{"kind":"cdDrawLine","args":[98.29650000000001,122,98.29650000000001,172,0,1]},{"kind":"cdDrawCurve","args":[98.29650000000001,172,98.29650000000001,182,88.29650000000001,182,1,14]}],[{"kind":"cdDrawCurve","args":[68.592,153,102.6435,146,128.001,135,0,7]}],[{"kind":"cdDrawCurve","args":[148.94939999999997,14,141.1662,65,123.0054,100,0,7]}],[{"kind":"cdDrawLine","args":[138.5718,63,186.5682,63,2,100]}],[{"kind":"cdDrawCurve","args":[168.4074,63,160.6242,160,110.68199999999999,188,2,7]}],[{"kind":"cdDrawCurve","args":[134.6802,73,141.8148,150,181.37939999999998,178,7,0]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,22);assert.equal(proof.groups.length,22)
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
