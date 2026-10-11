import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5],[6],[7],[10,9],[11],[8],[12,13],[19],[20],[14,15],[17],[18],[16]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[110,13,110,39,0,32]}],[{"kind":"cdDrawLine","args":[48,39,186,39,2,0]}],[{"kind":"cdDrawLine","args":[48,39,48,98,1012,1]},{"kind":"cdDrawCurve","args":[48,98,48,161,15,187,1001,7]}],[{"kind":"cdDrawCurve","args":[14,54,27,64,32,85,7,8]}],[{"kind":"cdDrawCurve","args":[14,128,29,122,47,108,0,7]}],[{"kind":"cdDrawCurve","args":[116.63,49.39,95.3,59.11,71.6,64.78,0,7]}],[{"kind":"cdDrawLine","args":[71.6,64.78,71.6,102.85,1012,313]}],[{"kind":"cdDrawLine","args":[71.6,82.6,114.26,82.6,2,100]}],[{"kind":"cdDrawLine","args":[71.6,102.85,166.4,102.85,2,2]}],[{"kind":"cdDrawLine","args":[166.4,63.97,166.4,102.85,22,323]}],[{"kind":"cdDrawLine","args":[125.32,63.97,166.4,63.97,0,2]}],[{"kind":"cdDrawLine","args":[128.48000000000002,82.6,166.4,82.6,0,2]}],[{"kind":"cdDrawLine","args":[73.97,110.95,73.97,169.27,0,32]}],[{"kind":"cdDrawCurve","args":[56.59,178.99,81.87,170.89,107.94,161.98000000000002,0,7]}],[{"kind":"cdDrawLine","args":[119,110.14,119,171.7,0,32]}],[{"kind":"cdDrawCurve","args":[99.25,179.8,126.9,170.08,155.34,160.36,0,7]}],[{"kind":"cdDrawCurve","args":[161.66,110.14,160.07999999999998,178.99,182.99,181.42,0,15]}],[{"kind":"cdDrawCurve","args":[128.48000000000002,112.57,141.12,119.86,148.23000000000002,129.57999999999998,7,8]}],[{"kind":"cdDrawCurve","args":[127.69,132.01,138.75,139.3,147.44,152.26,7,8]}],[{"kind":"cdDrawCurve","args":[85.03,112.57,96.88,119.86,103.99000000000001,129.57999999999998,7,8]}],[{"kind":"cdDrawCurve","args":[84.24000000000001,132.01,95.3,139.3,103.99000000000001,152.26,7,8]}]]
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
