import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3,4],[5],[6],[8],[9,10],[11],[12],[7],[13,14],[15],[16]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[69.9284,12.87,69.9284,36.63,0,32]}],[{"kind":"cdDrawLine","args":[27.868900000000004,36.63,119.19810000000001,36.63,2,0]}],[{"kind":"cdDrawLine","args":[27.868900000000004,36.63,27.868900000000004,100.98,12,1]},{"kind":"cdDrawCurve","args":[27.868900000000004,100.98,27.868900000000004,159.39,12.84765,187.11,1,7]}],[{"kind":"cdDrawLine","args":[43.40255,60.23999999999999,101.6484,60.23999999999999,0,2]}],[{"kind":"cdDrawLine","args":[101.6484,60.23999999999999,101.6484,98.88,22,323]}],[{"kind":"cdDrawLine","args":[32.5781,79.56,119.1737,79.56,0,300]}],[{"kind":"cdDrawLine","args":[43.40255,98.88,101.6484,98.88,0,2]}],[{"kind":"cdDrawLine","args":[74.845,41.76,74.845,184.56,0,100]}],[{"kind":"cdDrawLine","args":[44.825191999999994,117.1794,44.825191999999994,184.83720000000002,12,0]}],[{"kind":"cdDrawLine","args":[44.825191999999994,117.1794,104.86480800000001,117.1794,2,2]}],[{"kind":"cdDrawLine","args":[104.86480800000001,117.1794,104.86480800000001,171.7964,22,1]},{"kind":"cdDrawCurve","args":[104.86480800000001,171.7964,104.86480800000001,181.7964,94.86480800000001,181.7964,1,514]}],[{"kind":"cdDrawLine","args":[44.825191999999994,136.94459999999998,104.86480800000001,136.94459999999998,2,2]}],[{"kind":"cdDrawLine","args":[44.825191999999994,156.7098,104.86480800000001,156.7098,2,2]}],[{"kind":"cdDrawLine","args":[135.82,28,177.68,28,2,2]}],[{"kind":"cdDrawCurve","args":[177.68,28,169.63,53,152.725,84,22,7]}],[{"kind":"cdDrawBezier","args":[152.725,83,183.315,99,182.51,133,177.76350424728105,146.5614164363398,7,1]},{"kind":"cdDrawCurve","args":[177.76350424728105,146.5614164363398,174.46,156,164.46,156,1,514]}],[{"kind":"cdDrawLine","args":[135.82,28,135.82,186,12,0]}]]
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
  const hooks=new Map([[JSON.stringify([9,10]),terminalHook([9,10])],[JSON.stringify([15]),terminalHook([15])]])
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
