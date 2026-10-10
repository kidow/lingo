import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0,1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[27.55,28,68.4,28,2,2]}],[{"kind":"cdDrawCurve","args":[68.4,28,61.75,49,44.65,76,22,7]}],[{"kind":"cdDrawCurve","args":[44.65,75,69.35,100,63.87197805295298,125.22773265087442,7,0]},{"kind":"cdDrawCurve","args":[63.87197805295298,125.22773265087442,61.75,135,51.75,135,2,514]}],[{"kind":"cdDrawLine","args":[27.55,28,27.55,186,12,0]}],[{"kind":"cdDrawLine","args":[90.48459199999999,30.025577700000017,90.48459199999999,98.10511942499997,12,13]}],[{"kind":"cdDrawLine","args":[90.48459199999999,30.025577700000017,162.515408,30.025577700000017,2,2]}],[{"kind":"cdDrawLine","args":[162.515408,30.025577700000017,162.515408,98.10511942499997,22,23]}],[{"kind":"cdDrawLine","args":[90.48459199999999,63.06417883124998,162.515408,63.06417883124998,2,2]}],[{"kind":"cdDrawLine","args":[90.48459199999999,98.10511942499997,162.515408,98.10511942499997,2,2]}],[{"kind":"cdDrawLine","args":[74.305,137.596134375,178.695,137.596134375,0,0]}],[{"kind":"cdDrawLine","args":[126.5,107.91233437500001,126.5,178.41135937500002,0,32]}],[{"kind":"cdDrawLine","args":[65.01,178.41135937500002,187.99,178.41135937500002,0,0]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,12);assert.equal(proof.groups.length,12)
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
