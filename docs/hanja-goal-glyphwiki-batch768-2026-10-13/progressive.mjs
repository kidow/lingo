import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[3],[4],[2],[5,6],[7],[8],[9],[10],[11],[12],[13],[14],[15,16],[17],[18],[19],[20],[21]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[25.08,29.58,25.08,110.35,12,313]}],[{"kind":"cdDrawLine","args":[25.08,29.58,83.56,29.58,2,0]}],[{"kind":"cdDrawLine","args":[52.6,29.58,52.6,110.35,32,32]}],[{"kind":"cdDrawLine","args":[25.08,57.16,82.7,57.16,2,0]}],[{"kind":"cdDrawLine","args":[25.08,83.755,82.7,83.755,2,0]}],[{"kind":"cdDrawLine","args":[25.08,110.35,76.68,110.35,2,2]}],[{"kind":"cdDrawCurve","args":[76.68,110.35,78.4,155.66,68.5973532989483,173.4918323539309,22,0]},{"kind":"cdDrawCurve","args":[68.5973532989483,173.4918323539309,63.78,182.255,53.78,182.255,2,214]}],[{"kind":"cdDrawCurve","args":[24.22,124.14,26.8,159.6,15.62,171.42,7,8]}],[{"kind":"cdDrawCurve","args":[32.82,127.095,39.7,146.795,37.12,163.54,7,8]}],[{"kind":"cdDrawCurve","args":[41.42,124.14,50.88,137.93,51.74,154.675,7,8]}],[{"kind":"cdDrawCurve","args":[49.16,118.23,60.34,127.095,63.78,141.87,7,8]}],[{"kind":"cdDrawLine","args":[100.525,29.85,187.3,29.85,2,0]}],[{"kind":"cdDrawLine","args":[100.525,29.85,100.525,91.54,1012,1]},{"kind":"cdDrawCurve","args":[100.525,91.54,100.525,156.215,82,184.075,1001,7]}],[{"kind":"cdDrawCurve","args":[147.325,29.85,143.425,44.775,137.575,58.705,132,7]}],[{"kind":"cdDrawLine","args":[121,58.705,121,116.415,1012,313]}],[{"kind":"cdDrawLine","args":[121,58.705,173.65,58.705,2,2]}],[{"kind":"cdDrawLine","args":[173.65,58.705,173.65,116.415,22,223]}],[{"kind":"cdDrawLine","args":[121,86.565,173.65,86.565,2,2]}],[{"kind":"cdDrawLine","args":[121,116.415,173.65,116.415,2,2]}],[{"kind":"cdDrawLine","args":[146.35,116.415,146.35,172.085,32,1]},{"kind":"cdDrawCurve","args":[146.35,172.085,146.35,182.085,136.35,182.085,1,14]}],[{"kind":"cdDrawCurve","args":[122.95,135.32,117.1,160.195,100.525,182.085,0,7]}],[{"kind":"cdDrawCurve","args":[160.975,132.335,177.55,153.23,182.425,175.12,7,8]}]]
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
  const hooks=new Map([[JSON.stringify([5,6]),terminalHook([5,6])],[JSON.stringify([19]),terminalHook([19])]])
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
  return sourceGroups.map(indices=>{const h=hooks.get(JSON.stringify(indices));return h?[compile(indices,h.hook),segment([h.hook],'left',h.jump/2)]:[compile(indices)]})
}
