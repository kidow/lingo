import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2,3],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14,15],[16],[17],[18],[19]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[23.32,20,41.32,27,49.24,41,7,8]}],[{"kind":"cdDrawCurve","args":[9.64,66,29.08,73,36.28,87,7,8]}],[{"kind":"cdDrawCurve","args":[11.08,133,36.28,142,33.4,184,7,8]}],[{"kind":"cdDrawCurve","args":[29.8,150,32.68,138,62.92,67,32,7]}],[],[{"kind":"cdDrawCurve","args":[79.636,26.63875,81.967,37.92625,74.974,48.8375,7,8]}],[{"kind":"cdDrawCurve","args":[117.265,24.38125,112.27000000000001,35.2925,102.946,45.075,0,7]}],[{"kind":"cdDrawCurve","args":[96.952,15.7275,97.618,62.00625,69.646,75.9275,0,7]}],[{"kind":"cdDrawCurve","args":[93.28900000000002,50.3425,108.94,58.24375,119.929,72.9175,7,8]}],[{"kind":"cdDrawCurve","args":[134.39600000000002,26.63875,136.72699999999998,37.92625,129.73399999999998,48.8375,7,8]}],[{"kind":"cdDrawCurve","args":[172.025,24.38125,167.03,35.2925,157.70600000000002,45.075,0,7]}],[{"kind":"cdDrawCurve","args":[151.712,15.7275,152.378,62.00625,124.406,75.9275,0,7]}],[{"kind":"cdDrawCurve","args":[148.04899999999998,50.3425,163.7,58.24375,174.689,72.9175,7,8]}],[{"kind":"cdDrawCurve","args":[71.94,71.004,72.68,103.6195,60.84,114.1975,7,8]}],[{"kind":"cdDrawLine","args":[72.68,84.2265,179.24,84.2265,0,2]}],[{"kind":"cdDrawCurve","args":[179.24,84.2265,174.8,94.80449999999999,164.44,112.43449999999999,22,7]}],[{"kind":"cdDrawLine","args":[63.8,124.05,182.2,124.05,0,0]}],[{"kind":"cdDrawLine","args":[123,93.65,123,187.7,0,0]}],[{"kind":"cdDrawCurve","args":[118.56,124.05,98.58,163.95,60.1,177.25,132,7]}],[{"kind":"cdDrawCurve","args":[125.96,124.05,146.68,160.15,178.5,172.5,7,0]}]]
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
