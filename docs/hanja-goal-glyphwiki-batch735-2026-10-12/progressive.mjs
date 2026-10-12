import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3,4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15],[16,17],[18],[19],[20],[21]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[103.92,14.44,103.92,30.28,0,32]}],[{"kind":"cdDrawLine","args":[33.36,30.28,182.32,30.28,2,100]}],[{"kind":"cdDrawLine","args":[33.36,30.28,33.36,65.47999999999999,12,1]},{"kind":"cdDrawCurve","args":[33.36,65.47999999999999,33.36,98.04,14.74,118.28,1,7]}],[{"kind":"cdDrawLine","args":[33.36,45.24,164.68,45.24,2,2]}],[{"kind":"cdDrawLine","args":[164.68,45.24,164.68,61.96,22,323]}],[{"kind":"cdDrawLine","args":[80.4,31.16,80.4,61.96,0,32]}],[{"kind":"cdDrawLine","args":[123.52,31.16,123.52,61.96,0,32]}],[{"kind":"cdDrawLine","args":[33.36,61.96,164.68,61.96,2,2]}],[{"kind":"cdDrawLine","args":[62.76,79.56,107.84,79.56,2,100]}],[{"kind":"cdDrawLine","args":[62.76,64.6,62.76,97.16,0,32]}],[{"kind":"cdDrawCurve","args":[42.18,102.44,73.54,98.92,112.74,91,0,7]}],[{"kind":"cdDrawCurve","args":[165.66,74.28,151.94,79.56,122.54,83.96,0,7]}],[{"kind":"cdDrawLine","args":[122.54,64.6,122.54,89.8,0,1]},{"kind":"cdDrawCurve","args":[122.54,89.8,122.54,99.8,132.54000000000002,99.8,1,3001]},{"kind":"cdDrawLine","args":[132.54000000000002,99.8,178.4,99.8,3006,5]}],[{"kind":"cdDrawCurve","args":[97.6,109.71979999999999,74.2,114.9776,43,119.06700000000001,0,7]}],[{"kind":"cdDrawLine","args":[43,119.06700000000001,43,150.6138,12,13]}],[{"kind":"cdDrawLine","args":[43,133.672,98.575,133.672,2,0]}],[{"kind":"cdDrawLine","args":[111.25,116.7302,160,116.7302,0,2]}],[{"kind":"cdDrawLine","args":[160,116.7302,160,150.6138,22,23]}],[{"kind":"cdDrawLine","args":[110.275,133.672,160,133.672,0,2]}],[{"kind":"cdDrawLine","args":[43,150.6138,160,150.6138,2,2]}],[{"kind":"cdDrawCurve","args":[87,151.98,80,180.04000000000002,18,186.48000000000002,0,7]}],[{"kind":"cdDrawLine","args":[117,151.52,117,172.34,32,1]},{"kind":"cdDrawCurve","args":[117,172.34,117,182.34,127,182.34,1,1]},{"kind":"cdDrawLine","args":[127,182.34,180,182.34,6,5]}]]
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
  return sourceGroups.map(indices=>{if(indices[0]===9)return indices.map(i=>compile([i]));const h=hooks.get(JSON.stringify(indices));return h?[compile(indices,h.hook),segment([h.hook],'left',h.jump/2)]:[compile(indices)]})
}
