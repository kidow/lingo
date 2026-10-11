import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5],[6],[7,8],[9],[10],[11],[12],[13],[14,15],[16]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[65.015,15,43.82,72,12.42,117,0,7]}],[{"kind":"cdDrawLine","args":[43.82,73,43.82,186,0,0]}],[{"kind":"cdDrawCurve","args":[167.88,18.200000000000003,123,32,71.52,32,0,7]}],[{"kind":"cdDrawCurve","args":[80.1,37.4,91.97999999999998,47,95.94,60.8,7,8]}],[{"kind":"cdDrawCurve","args":[114.42,35,122.34,42.8,126.3,55.400000000000006,7,8]}],[{"kind":"cdDrawCurve","args":[161.28,35.6,155.34,53.599999999999994,144.78,65.6,0,7]}],[{"kind":"cdDrawCurve","args":[74.14519999999999,60.89,74.8544,85.495,63.50719999999999,93.475,7,8]}],[{"kind":"cdDrawLine","args":[74.8544,70.86500000000001,176.97920000000002,70.86500000000001,0,2]}],[{"kind":"cdDrawCurve","args":[176.97920000000002,70.86500000000001,172.724,78.845,162.79520000000002,92.145,22,7]}],[{"kind":"cdDrawCurve","args":[83.645,80.55,84.23,103.825,72.53,112.47,7,8]}],[{"kind":"cdDrawLine","args":[100.61,81.215,100.61,105.13,0,1]},{"kind":"cdDrawCurve","args":[100.61,105.13,100.61,115.13,110.61,115.13,1,2001]},{"kind":"cdDrawLine","args":[110.61,115.13,147.995,115.13,2006,5]}],[{"kind":"cdDrawCurve","args":[112.89500000000002,77.225,124.595,83.875,131.03,97.175,7,8]}],[{"kind":"cdDrawCurve","args":[148.57999999999998,81.88,162.62,92.52000000000002,166.715,109.145,7,8]}],[{"kind":"cdDrawCurve","args":[108.875,124.05,93.375,151.175,61.6,166.675,0,7]}],[{"kind":"cdDrawLine","args":[101.125,137.225,151.5,137.225,2,2]}],[{"kind":"cdDrawCurve","args":[151.5,137.225,120.5,179.075,54.625,188.375,22,7]}],[{"kind":"cdDrawCurve","args":[100.35,138.775,120.5,177.525,177.85,182.175,7,0]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,17);assert.equal(proof.groups.length,17)
  assert.deepEqual(trace.map(r=>r.map(c=>({kind:c.kind,args:c.args}))),ORIGINAL)
  for(let i=0;i<trace.length;i++)assert.deepEqual(trace[i].flatMap(c=>c.polygons),proof.groups[i].polygons)
  const segment=(polygons,direction,weight)=>{
    const points=polygons.flat(),xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
    assert(points.length>0&&points.every(p=>p.off===0))
    const normalized=polygons.map(p=>{const area=p.reduce((n,v,i)=>{const q=p[(i+1)%p.length];return n+v.x*q.y-q.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
    return {outline:normalized.map(p=>p.map((v,i)=>`${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight:Math.round(weight*1e6)/1e6}
  }
  const terminal = trace[10][2]
  assert.equal(terminal.kind,'cdDrawLine')
  assert.deepEqual(terminal.args,[110.61,115.13,147.995,115.13,2006,5])
  const [x1,y1,x2,y2,ta1,ta2] = terminal.args
  assert(x1<x2 && y1===y2 && ta1%1000===6 && ta2%100===5)
  const opt1=Math.floor(ta1/1000), width=proof.defaults.kMinWidthT-opt1/2
  const hookHeight=proof.defaults.kWidth*(4*(1-opt1/proof.defaults.kAdjustMageStep)+1)
  const point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0})
  const hook=[point(x2,y2-width),point(x2+2,y2-width-hookHeight),point(x2,y2-width-hookHeight),point(x2-width,y2-width)]
  assert.deepEqual(terminal.polygons.at(-1),hook,'Pinned original horizontal terminal5 hook polygon identity')
  const compile=(indices,withoutTerminalHook=false)=>{
    const calls=indices.flatMap(i=>trace[i]).map(c=>({...c,polygons:c.polygons.slice()}))
    if(withoutTerminalHook){assert.deepEqual(indices,[10]);assert.deepEqual(calls.at(-1).polygons.pop(),hook)}
    for(let i=1;i<calls.length;i++){const c=calls[i-1];assert.deepEqual(c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawBezier'?6:4,c.kind==='cdDrawLine'?4:c.kind==='cdDrawBezier'?8:6),calls[i].args.slice(0,2),'All merged original trajectories must be continuous')}
    const pieces=calls.map(c=>{const a=c.args;if(c.kind==='cdDrawBezier')return {...segment(c.polygons,'curve',Math.hypot(a[6]-a[0],a[7]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`,revealWidth:14};if(c.kind==='cdDrawCurve')return {...segment(c.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
      assert.equal(c.kind,'cdDrawLine');const p=segment(c.polygons,a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve',Math.hypot(a[2]-a[0],a[3]-a[1])/2);return p.direction==='curve'?{...p,revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2}`,revealWidth:14}:p})
    if(pieces.length===1)return pieces[0]
    const a=calls[0].args
    return {outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:`M${a[0]/2} ${a[1]/2} ${calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?`L${v[2]/2} ${v[3]/2}`:c.kind==='cdDrawBezier'?`C${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2} ${v[6]/2} ${v[7]/2}`:`Q${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2}`}).join(' ')}`,revealWidth:14}
  }
  return sourceGroups.map(indices=>indices.length===1 && indices[0]===10 ? [compile(indices,true),segment([hook],'up',hookHeight/2)] : [compile(indices)])
}
