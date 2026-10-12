import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[4,5],[6],[7],[3],[8],[9],[10],[11],[12],[13,14],[15],[16],[17,18],[19],[20],[21]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[51.15,15,33.825,58,10.725,86,0,7]}],[{"kind":"cdDrawCurve","args":[47.85,25,68.475,37,77.55,56,7,8]}],[{"kind":"cdDrawLine","args":[34.65,61,69.3,61,0,200]}],[{"kind":"cdDrawLine","args":[29.7,79,29.7,186,12,0]}],[{"kind":"cdDrawLine","args":[29.7,79,68.475,79,2,2]}],[{"kind":"cdDrawLine","args":[68.475,79,68.475,123,22,223]}],[{"kind":"cdDrawLine","args":[29.7,100,68.475,100,0,2]}],[{"kind":"cdDrawLine","args":[28.875,123,68.475,123,2,2]}],[{"kind":"cdDrawLine","args":[29.7,147,79.2,147,2,100]}],[{"kind":"cdDrawLine","args":[29.7,170,80.025,170,2,100]}],[{"kind":"cdDrawLine","args":[88.56,35.25,179.44,35.25,0,0]}],[{"kind":"cdDrawLine","args":[134,13.47,134,64.28999999999999,0,32]}],[{"kind":"cdDrawLine","args":[78.96000000000001,64.28999999999999,189.04000000000002,64.28999999999999,0,0]}],[{"kind":"cdDrawCurve","args":[126.96000000000001,67.315,118.64,87.885,106.47999999999999,107.85,0,7]}],[{"kind":"cdDrawCurve","args":[86.64,109.665,120.56,107.245,170.48000000000002,102.405,0,7]}],[{"kind":"cdDrawCurve","args":[146.8,76.995,166.64,92.12,178.16,115.715,7,8]}],[{"kind":"cdDrawLine","args":[99.44,130.305,99.44,175.875,1012,32]}],[{"kind":"cdDrawLine","args":[99.44,130.305,168.56,130.305,2,2]}],[{"kind":"cdDrawLine","args":[168.56,130.305,168.56,175.875,1022,32]}],[{"kind":"cdDrawLine","args":[122.47999999999999,130.305,122.47999999999999,175.875,2032,32]}],[{"kind":"cdDrawLine","args":[145.51999999999998,130.305,145.51999999999998,175.875,2032,32]}],[{"kind":"cdDrawLine","args":[78.96000000000001,175.875,189.04000000000002,175.875,0,300]}]]
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
  return sourceGroups.map(indices=>{if(indices[0]===13)return indices.map(i=>compile([i]));const h=hooks.get(JSON.stringify(indices));return h?[compile(indices,h.hook),segment([h.hook],'left',h.jump/2)]:[compile(indices)]})
}
