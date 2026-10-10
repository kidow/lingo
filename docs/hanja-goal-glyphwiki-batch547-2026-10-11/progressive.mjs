import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[3],[2],[4],[5,6],[8],[7],[9],[10],[11,12],[14],[13],[15],[16],[17,18],[20],[19],[21]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[12.935,30.665,93.53,30.665,0,100]}],[{"kind":"cdDrawLine","args":[63.68,11.555,63.68,49.04,0,300]}],[{"kind":"cdDrawLine","args":[135.32,11.555,135.32,49.04,0,300]}],[{"kind":"cdDrawLine","args":[105.47,30.665,186.065,30.665,0,0]}],[{"kind":"cdDrawLine","args":[49.75,61.736000000000004,49.75,104.376,12,313]}],[{"kind":"cdDrawLine","args":[49.75,61.736000000000004,150.25,61.736000000000004,2,2]}],[{"kind":"cdDrawLine","args":[150.25,61.736000000000004,150.25,104.376,22,323]}],[{"kind":"cdDrawLine","args":[100,61.736000000000004,100,104.376,32,32]}],[{"kind":"cdDrawLine","args":[49.75,82.728,150.25,82.728,2,2]}],[{"kind":"cdDrawLine","args":[49.75,104.376,150.25,104.376,2,2]}],[{"kind":"cdDrawLine","args":[26.685,123.24400000000001,26.685,176.804,12,213]}],[{"kind":"cdDrawLine","args":[26.685,123.24400000000001,86.315,123.24400000000001,2,2]}],[{"kind":"cdDrawLine","args":[86.315,123.24400000000001,86.315,176.804,22,223]}],[{"kind":"cdDrawLine","args":[56.5,123.24400000000001,56.5,176.804,32,32]}],[{"kind":"cdDrawLine","args":[26.685,149.612,86.315,149.612,2,2]}],[{"kind":"cdDrawLine","args":[26.685,176.804,86.315,176.804,2,2]}],[{"kind":"cdDrawLine","args":[113.685,123.24400000000001,113.685,176.804,12,213]}],[{"kind":"cdDrawLine","args":[113.685,123.24400000000001,173.315,123.24400000000001,2,2]}],[{"kind":"cdDrawLine","args":[173.315,123.24400000000001,173.315,176.804,22,223]}],[{"kind":"cdDrawLine","args":[143.5,123.24400000000001,143.5,176.804,32,32]}],[{"kind":"cdDrawLine","args":[113.685,149.612,173.315,149.612,2,2]}],[{"kind":"cdDrawLine","args":[113.685,176.804,173.315,176.804,2,2]}]]
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
