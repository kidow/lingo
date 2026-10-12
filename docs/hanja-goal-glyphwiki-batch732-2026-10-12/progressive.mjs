import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5],[8],[9],[10],[11],[6],[7],[12],[13],[14]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[110,13,110,39,0,32]}],[{"kind":"cdDrawLine","args":[48,39,186,39,2,0]}],[{"kind":"cdDrawLine","args":[48,39,48,98,12,1]},{"kind":"cdDrawCurve","args":[48,98,48,161,15,187,1,7]}],[{"kind":"cdDrawCurve","args":[14,54,27,64,32,85,7,8]}],[{"kind":"cdDrawCurve","args":[14,128,29,122,47,108,0,7]}],[{"kind":"cdDrawLine","args":[60.8,67.8498,179.2,67.8498,0,0]}],[{"kind":"cdDrawLine","args":[120,48.013799999999996,120,72.80879999999999,0,1]},{"kind":"cdDrawCurve","args":[120,72.80879999999999,120,127.35780000000001,56.36,139.2594,1,7]}],[{"kind":"cdDrawCurve","args":[119.26,81.735,129.62,121.40700000000001,178.46,135.29219999999998,7,0]}],[{"kind":"cdDrawCurve","args":[89.66,74.7924,84.47999999999999,98.59559999999999,63.019999999999996,117.43979999999999,0,7]}],[{"kind":"cdDrawCurve","args":[83.74000000000001,91.65299999999999,96.32,97.6038,101.5,107.5218,7,8]}],[{"kind":"cdDrawCurve","args":[152.56,74.7924,146.64,93.6366,134.8,101.571,0,7]}],[{"kind":"cdDrawCurve","args":[146.64,89.6694,165.14,100.57920000000001,171.06,112.48079999999999,7,8]}],[{"kind":"cdDrawLine","args":[77.08,153.555,162.92000000000002,153.555,0,0]}],[{"kind":"cdDrawLine","args":[120,127.05,120,181.77,0,32]}],[{"kind":"cdDrawLine","args":[56.36,181.77,183.64,181.77,0,0]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,15);assert.equal(proof.groups.length,15)
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
