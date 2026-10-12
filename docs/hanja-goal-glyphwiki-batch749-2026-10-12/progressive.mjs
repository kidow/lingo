import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[3],[4],[2],[5,6],[7],[8],[9],[10],[11],[12,13],[15],[14],[16],[17,18],[19],[20,21],[22]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[23.8,29.58,23.8,110.35,12,313]}],[{"kind":"cdDrawLine","args":[23.8,29.58,81.6,29.58,2,0]}],[{"kind":"cdDrawLine","args":[51,29.58,51,110.35,32,32]}],[{"kind":"cdDrawLine","args":[23.8,57.16,80.75,57.16,2,100]}],[{"kind":"cdDrawLine","args":[23.8,83.755,80.75,83.755,2,100]}],[{"kind":"cdDrawLine","args":[23.8,110.35,74.8,110.35,2,2]}],[{"kind":"cdDrawCurve","args":[74.8,110.35,76.5,155.66,66.82416285230009,173.46822760851757,22,0]},{"kind":"cdDrawCurve","args":[66.82416285230009,173.46822760851757,62.05,182.255,52.05,182.255,2,214]}],[{"kind":"cdDrawCurve","args":[22.95,124.14,25.5,159.6,14.45,171.42,7,8]}],[{"kind":"cdDrawCurve","args":[31.45,127.095,38.25,146.795,35.7,163.54,7,8]}],[{"kind":"cdDrawCurve","args":[39.95,124.14,49.3,137.93,50.15,154.675,7,8]}],[{"kind":"cdDrawCurve","args":[47.6,118.23,58.65,127.095,62.05,141.87,7,8]}],[{"kind":"cdDrawLine","args":[108.2,29,108.2,94,12,32]}],[{"kind":"cdDrawLine","args":[108.2,29,165.8,29,2,2]}],[{"kind":"cdDrawLine","args":[165.8,29,165.8,94,22,32]}],[{"kind":"cdDrawLine","args":[135.8,57,135.8,94,12,32]}],[{"kind":"cdDrawLine","args":[135.8,57,165.8,57,2,2]}],[{"kind":"cdDrawLine","args":[95,94,95,186,12,0]}],[{"kind":"cdDrawLine","args":[95,94,179,94,2,2]}],[{"kind":"cdDrawLine","args":[179,94,179,172,22,1]},{"kind":"cdDrawCurve","args":[179,172,179,182,169,182,1,214]}],[{"kind":"cdDrawLine","args":[119,118,119,153,12,13]}],[{"kind":"cdDrawLine","args":[119,118,155,118,2,2]}],[{"kind":"cdDrawLine","args":[155,118,155,153,22,23]}],[{"kind":"cdDrawLine","args":[119,153,155,153,2,2]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,23);assert.equal(proof.groups.length,23)
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
  const hooks=new Map([[JSON.stringify([5,6]),terminalHook([5,6])],[JSON.stringify([17,18]),terminalHook([17,18])]])
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
