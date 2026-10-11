import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11,12],[13],[14],[15],[16]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[19.1,30,70.685,30,0,0]}],[{"kind":"cdDrawLine","args":[15.48,56,78.83,56,0,0]}],[{"kind":"cdDrawLine","args":[19.1,84,70.685,84,0,0]}],[{"kind":"cdDrawLine","args":[19.1,110,70.685,110,0,0]}],[{"kind":"cdDrawLine","args":[24.53,135,24.53,173,12,113]}],[{"kind":"cdDrawLine","args":[24.53,135,65.255,135,2,2]}],[{"kind":"cdDrawLine","args":[65.255,135,65.255,173,22,123]}],[{"kind":"cdDrawLine","args":[24.53,173,65.255,173,2,2]}],[{"kind":"cdDrawCurve","args":[130.79000000000002,15.276,108.86,67.78725,72.095,92.61075000000001,0,7]}],[{"kind":"cdDrawCurve","args":[128.21,18.14025,150.785,63.0135,180.45499999999998,81.15375,7,0]}],[{"kind":"cdDrawLine","args":[108.215,71.355,150.785,71.355,0,100]}],[{"kind":"cdDrawLine","args":[92.735,93.465,160.45999999999998,93.465,0,2]}],[{"kind":"cdDrawLine","args":[160.45999999999998,93.465,147.56,123.615,22,200]}],[{"kind":"cdDrawCurve","args":[88.865,123.48,89.51,159.18,76.61,172.44,7,8]}],[{"kind":"cdDrawLine","args":[107.57,124.5,107.57,166.52,0,1]},{"kind":"cdDrawCurve","args":[107.57,166.52,107.57,176.52,117.57,176.52,1,1]},{"kind":"cdDrawLine","args":[117.57,176.52,159.815,176.52,6,5]}],[{"kind":"cdDrawCurve","args":[121.11500000000001,118.38,134.015,128.58,141.11,148.98,7,8]}],[{"kind":"cdDrawCurve","args":[160.45999999999998,125.52000000000002,175.94,141.84,180.45499999999998,167.34,7,8]}]]
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
  const terminal = trace[14][2]
  assert.equal(terminal.kind,'cdDrawLine')
  assert.deepEqual(terminal.args,[117.57,176.52,159.815,176.52,6,5])
  const [x1,y1,x2,y2,ta1,ta2] = terminal.args
  assert(x1<x2 && y1===y2 && ta1%1000===6 && ta2%100===5)
  const opt1=Math.floor(ta1/1000), width=proof.defaults.kMinWidthT-opt1/2
  const hookHeight=proof.defaults.kWidth*(4*(1-opt1/proof.defaults.kAdjustMageStep)+1)
  const point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0})
  const hook=[point(x2,y2-width),point(x2+2,y2-width-hookHeight),point(x2,y2-width-hookHeight),point(x2-width,y2-width)]
  assert.deepEqual(terminal.polygons.at(-1),hook,'Pinned original horizontal terminal5 hook polygon identity')
  const compile=(indices,withoutTerminalHook=false)=>{
    const calls=indices.flatMap(i=>trace[i]).map(c=>({...c,polygons:c.polygons.slice()}))
    if(withoutTerminalHook){assert.deepEqual(indices,[14]);assert.deepEqual(calls.at(-1).polygons.pop(),hook)}
    for(let i=1;i<calls.length;i++){const c=calls[i-1];assert.deepEqual(c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawBezier'?6:4,c.kind==='cdDrawLine'?4:c.kind==='cdDrawBezier'?8:6),calls[i].args.slice(0,2),'All merged original trajectories must be continuous')}
    const pieces=calls.map(c=>{const a=c.args;if(c.kind==='cdDrawBezier')return {...segment(c.polygons,'curve',Math.hypot(a[6]-a[0],a[7]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`,revealWidth:14};if(c.kind==='cdDrawCurve')return {...segment(c.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
      assert.equal(c.kind,'cdDrawLine');const p=segment(c.polygons,a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve',Math.hypot(a[2]-a[0],a[3]-a[1])/2);return p.direction==='curve'?{...p,revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2}`,revealWidth:14}:p})
    if(pieces.length===1)return pieces[0]
    const a=calls[0].args
    return {outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:`M${a[0]/2} ${a[1]/2} ${calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?`L${v[2]/2} ${v[3]/2}`:c.kind==='cdDrawBezier'?`C${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2} ${v[6]/2} ${v[7]/2}`:`Q${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2}`}).join(' ')}`,revealWidth:14}
  }
  return sourceGroups.map(indices=>indices.length===2 && indices[0]===5
    ? (compile(indices), [compile([5]),compile([6])])
    : indices.length===1 && indices[0]===14
    ? [compile(indices,true),segment([hook],'up',hookHeight/2)]
    : [compile(indices)])
}
