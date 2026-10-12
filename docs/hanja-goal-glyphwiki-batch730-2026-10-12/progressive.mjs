import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16,17],[18],[19],[20],[21,22],[23]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[26.785,19.9,45.16,26.865,53.245,40.795,7,8]}],[{"kind":"cdDrawCurve","args":[12.82,65.67,32.665,72.635,40.015,86.565,7,8]}],[{"kind":"cdDrawCurve","args":[14.29,132.335,40.015,141.29,37.075,183.08,7,8]}],[{"kind":"cdDrawCurve","args":[33.4,149.25,36.34,137.31,67.21000000000001,66.665,32,7]}],[{"kind":"cdDrawCurve","args":[85.301985,24.0212125,87.52045125,34.1563375,80.8650525,43.953625,7,8]}],[{"kind":"cdDrawCurve","args":[121.11436875,21.994187500000002,116.3605125,31.791475000000002,107.4866475,40.575250000000004,0,7]}],[{"kind":"cdDrawCurve","args":[101.78202,14.223925,102.4158675,55.7779375,75.7942725,68.277925,0,7]}],[{"kind":"cdDrawCurve","args":[98.29585875000001,45.30497499999999,113.19127499999999,52.3995625,123.64975874999999,65.575225,7,8]}],[{"kind":"cdDrawCurve","args":[137.418335,24.0212125,139.63680125,34.1563375,132.9814025,43.953625,7,8]}],[{"kind":"cdDrawCurve","args":[173.23071875,21.994187500000002,168.47686249999998,31.791475000000002,159.60299750000001,40.575250000000004,0,7]}],[{"kind":"cdDrawCurve","args":[153.89837,14.223925,154.5322175,55.7779375,127.9106225,68.277925,0,7]}],[{"kind":"cdDrawCurve","args":[150.41220875,45.30497499999999,165.307625,52.3995625,175.76610875,65.575225,7,8]}],[{"kind":"cdDrawCurve","args":[77.977525,63.85708,78.6818,93.14276500000001,67.4134,102.640825,7,8]}],[{"kind":"cdDrawLine","args":[78.6818,75.729655,180.09740000000002,75.729655,0,2]}],[{"kind":"cdDrawCurve","args":[180.09740000000002,75.729655,175.87175,85.22771499999999,166.01190000000003,101.05781499999999,22,7]}],[{"kind":"cdDrawLine","args":[96.328,92.89179999999999,96.328,121.0276,12,213]}],[{"kind":"cdDrawLine","args":[96.328,92.89179999999999,154.67200000000003,92.89179999999999,2,2]}],[{"kind":"cdDrawLine","args":[154.67200000000003,92.89179999999999,154.67200000000003,121.0276,22,223]}],[{"kind":"cdDrawLine","args":[96.328,121.0276,154.67200000000003,121.0276,2,2]}],[{"kind":"cdDrawCurve","args":[125.5,121.0276,122.64,129.6406,115.77600000000001,142.273,132,7]}],[{"kind":"cdDrawLine","args":[90.036,142.273,90.036,174.4282,12,113]}],[{"kind":"cdDrawLine","args":[90.036,142.273,160.964,142.273,2,2]}],[{"kind":"cdDrawLine","args":[160.964,142.273,160.964,174.4282,22,123]}],[{"kind":"cdDrawLine","args":[90.036,174.4282,160.964,174.4282,2,2]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,24);assert.equal(proof.groups.length,24)
  assert.deepEqual(trace.map(r=>r.map(c=>({kind:c.kind,args:c.args}))),ORIGINAL)
  for(let i=0;i<trace.length;i++)assert.deepEqual(trace[i].flatMap(c=>c.polygons),proof.groups[i].polygons)
  const segment=(polygons,direction,weight)=>{
    const points=polygons.flat(),xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
    assert(points.length>0&&points.every(p=>p.off===0))
    const normalized=polygons.map(p=>{const area=p.reduce((n,v,i)=>{const q=p[(i+1)%p.length];return n+v.x*q.y-q.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
    return {outline:normalized.map(p=>p.map((v,i)=>`${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight:Math.round(weight*1e6)/1e6}
  }
  const terminalHook=(indices)=>{
    const terminal=trace[indices.at(-1)].at(-1)
    assert.equal(terminal.kind,'cdDrawCurve')
    const [x1,y1,cx,cy,x2,y2,ta1,ta2]=terminal.args
    assert.equal(ta2%100,14)
    const opt1=Math.floor((ta1%10000)/1000),opt2=Math.floor((ta2%1000)/100)
    const width=proof.defaults.kMinWidthT-opt1/2
    const jump=proof.defaults.kWidth*4*Math.min(1-opt2/10,Math.pow(width/proof.defaults.kMinWidthT,3))*(width>6?6/width:1)
    const point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0})
    const hook=[point(x2,y2),point(x2,y2-width),point(x2-jump,y2-width),point(x2-jump,y2-width*.5)]
    assert.deepEqual(terminal.polygons.at(-1),hook,'Pinned original terminal14 left-hook polygon identity')
    return {hook,jump}
  }
  const hooks=new Map()
  const compile=(indices,hook=null)=>{
    const calls=indices.flatMap(i=>trace[i]).map(c=>({...c,polygons:c.polygons.slice()}))
    if(hook)assert.deepEqual(calls.at(-1).polygons.pop(),hook)
    for(let i=1;i<calls.length;i++){const c=calls[i-1];assert.deepEqual(c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawBezier'?6:4,c.kind==='cdDrawLine'?4:c.kind==='cdDrawBezier'?8:6),calls[i].args.slice(0,2),'All merged original trajectories must be continuous')}
    const pieces=calls.map(c=>{const a=c.args;if(c.kind==='cdDrawBezier')return {...segment(c.polygons,'curve',Math.hypot(a[6]-a[0],a[7]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`,revealWidth:14};if(c.kind==='cdDrawCurve')return {...segment(c.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
      assert.equal(c.kind,'cdDrawLine');const p=segment(c.polygons,a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve',Math.hypot(a[2]-a[0],a[3]-a[1])/2);return p.direction==='curve'?{...p,revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2}`,revealWidth:14}:p})
    if(pieces.length===1)return pieces[0]
    const a=calls[0].args
    return {outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:`M${a[0]/2} ${a[1]/2} ${calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?`L${v[2]/2} ${v[3]/2}`:c.kind==='cdDrawBezier'?`C${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2} ${v[6]/2} ${v[7]/2}`:`Q${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2}`}).join(' ')}`,revealWidth:14}
  }
  return sourceGroups.map(indices=>{if(indices[0]===2)return indices.map(i=>compile([i]));const h=hooks.get(JSON.stringify(indices));return h?[compile(indices,h.hook),segment([h.hook],'left',h.jump/2)]:[compile(indices)]})
}
