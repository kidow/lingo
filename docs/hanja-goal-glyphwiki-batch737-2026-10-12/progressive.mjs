import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[3],[2],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[12.935,34.15,93.53,34.15,0,100]}],[{"kind":"cdDrawLine","args":[63.68,12.05,63.68,55.4,0,300]}],[{"kind":"cdDrawLine","args":[135.32,12.05,135.32,55.4,0,300]}],[{"kind":"cdDrawLine","args":[105.47,34.15,186.065,34.15,0,0]}],[{"kind":"cdDrawCurve","args":[48.345,66.5611,45.78,90.3322,34.665,104.4337,7,8]}],[{"kind":"cdDrawLine","args":[72.285,68.9785,72.285,100.4772,0,1]},{"kind":"cdDrawCurve","args":[72.285,100.4772,72.285,110.4772,82.285,110.4772,1,1]},{"kind":"cdDrawLine","args":[82.285,110.4772,133.845,110.4772,6,5]}],[{"kind":"cdDrawCurve","args":[85.11,56.4886,107.34,63.33790000000001,114.18,82.27420000000001,7,8]}],[{"kind":"cdDrawCurve","args":[133.845,64.9495,156.075,76.2307,165.48,96.3757,7,8]}],[{"kind":"cdDrawCurve","args":[26.695,128.65904999999998,25.18,156.85809999999998,18.615000000000002,173.58635,7,8]}],[{"kind":"cdDrawLine","args":[40.835,131.52675,40.835,170.7556,0,1]},{"kind":"cdDrawCurve","args":[40.835,170.7556,40.835,180.7556,50.835,180.7556,1,1]},{"kind":"cdDrawLine","args":[50.835,180.7556,77.195,180.7556,6,5]}],[{"kind":"cdDrawCurve","args":[48.41,116.7103,61.54,124.83545,65.58,147.2991,7,8]}],[{"kind":"cdDrawCurve","args":[77.195,126.74725000000001,90.325,140.12985,95.88,164.02735,7,8]}],[{"kind":"cdDrawCurve","args":[112.695,128.89210000000003,111.18,157.32420000000002,104.615,174.1907,7,8]}],[{"kind":"cdDrawLine","args":[126.835,131.7835,126.835,171.41920000000002,0,1]},{"kind":"cdDrawCurve","args":[126.835,171.41920000000002,126.835,181.41920000000002,136.83499999999998,181.41920000000002,1,1]},{"kind":"cdDrawLine","args":[136.83499999999998,181.41920000000002,163.195,181.41920000000002,6,5]}],[{"kind":"cdDrawCurve","args":[134.41,116.84459999999999,147.54,125.0369,151.57999999999998,147.6862,7,8]}],[{"kind":"cdDrawCurve","args":[163.195,126.96449999999999,176.325,140.4577,181.88,164.55270000000002,7,8]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,16);assert.equal(proof.groups.length,16)
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
  return sourceGroups.map(indices=>{const h=hooks.get(JSON.stringify(indices));return h?[compile(indices,h.hook),segment([h.hook],'left',h.jump/2)]:[compile(indices)]})
}
