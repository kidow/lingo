import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[3],[2],[4],[5],[6],[8],[9],[7],[11],[12],[10]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[12.935,32.225,93.53,32.225,0,100]}],[{"kind":"cdDrawLine","args":[63.68,12.075,63.68,51.6,0,300]}],[{"kind":"cdDrawLine","args":[135.32,12.075,135.32,51.6,0,300]}],[{"kind":"cdDrawLine","args":[105.47,32.225,186.065,32.225,0,0]}],[{"kind":"cdDrawLine","args":[26,74.34,177,74.34,0,0]}],[{"kind":"cdDrawLine","args":[64,56.58,64,127.62,0,32]}],[{"kind":"cdDrawLine","args":[133,56.58,133,127.62,0,32]}],[{"kind":"cdDrawLine","args":[17,127.62,186,127.62,0,100]}],[{"kind":"cdDrawLine","args":[64,90.62,133,90.62,2,2]}],[{"kind":"cdDrawLine","args":[64,109.12,133,109.12,2,2]}],[{"kind":"cdDrawLine","args":[38,127.62,38,165.72,32,1]},{"kind":"cdDrawCurve","args":[38,165.72,38,175.72,48,175.72,1,3001]},{"kind":"cdDrawLine","args":[48,175.72,174,175.72,3006,3000]}],[{"kind":"cdDrawCurve","args":[85,127.62,86,157.22,44,166.84,32,7]}],[{"kind":"cdDrawLine","args":[114,127.62,114,147.95999999999998,32,1]},{"kind":"cdDrawCurve","args":[114,147.95999999999998,114,157.95999999999998,124,157.95999999999998,1,3001]},{"kind":"cdDrawLine","args":[124,157.95999999999998,157,157.95999999999998,3006,5]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,13);assert.equal(proof.groups.length,13)
  assert.deepEqual(trace.map(r=>r.map(c=>({kind:c.kind,args:c.args}))),ORIGINAL)
  for(let i=0;i<trace.length;i++)assert.deepEqual(trace[i].flatMap(c=>c.polygons),proof.groups[i].polygons)
  const segment=(polygons,direction,weight)=>{
    const points=polygons.flat(),xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
    assert(points.length>0&&points.every(p=>p.off===0))
    const normalized=polygons.map(p=>{const area=p.reduce((n,v,i)=>{const q=p[(i+1)%p.length];return n+v.x*q.y-q.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
    return {outline:normalized.map(p=>p.map((v,i)=>`${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight:Math.round(weight*1e6)/1e6}
  }
  const terminal = trace[12][2]
  assert.equal(terminal.kind,'cdDrawLine')
  assert.deepEqual(terminal.args,[124,157.95999999999998,157,157.95999999999998,3006,5])
  const [x1,y1,x2,y2,ta1,ta2] = terminal.args
  assert(x1<x2 && y1===y2 && ta1%1000===6 && ta2%100===5)
  const opt1=Math.floor(ta1/1000), width=proof.defaults.kMinWidthT-opt1/2
  const hookHeight=proof.defaults.kWidth*(4*(1-opt1/proof.defaults.kAdjustMageStep)+1)
  const point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0})
  const hook=[point(x2,y2-width),point(x2+2,y2-width-hookHeight),point(x2,y2-width-hookHeight),point(x2-width,y2-width)]
  assert.deepEqual(terminal.polygons.at(-1),hook,'Pinned original horizontal terminal5 hook polygon identity')
  const compile=(indices,withoutTerminalHook=false)=>{
    const calls=indices.flatMap(i=>trace[i]).map(c=>({...c,polygons:c.polygons.slice()}))
    if(withoutTerminalHook){assert.deepEqual(indices,[12]);assert.deepEqual(calls.at(-1).polygons.pop(),hook)}
    for(let i=1;i<calls.length;i++){const c=calls[i-1];assert.deepEqual(c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawBezier'?6:4,c.kind==='cdDrawLine'?4:c.kind==='cdDrawBezier'?8:6),calls[i].args.slice(0,2),'All merged original trajectories must be continuous')}
    const pieces=calls.map(c=>{const a=c.args;if(c.kind==='cdDrawBezier')return {...segment(c.polygons,'curve',Math.hypot(a[6]-a[0],a[7]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`,revealWidth:14};if(c.kind==='cdDrawCurve')return {...segment(c.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
      assert.equal(c.kind,'cdDrawLine');const p=segment(c.polygons,a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve',Math.hypot(a[2]-a[0],a[3]-a[1])/2);return p.direction==='curve'?{...p,revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2}`,revealWidth:14}:p})
    if(pieces.length===1)return pieces[0]
    const a=calls[0].args
    return {outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:`M${a[0]/2} ${a[1]/2} ${calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?`L${v[2]/2} ${v[3]/2}`:c.kind==='cdDrawBezier'?`C${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2} ${v[6]/2} ${v[7]/2}`:`Q${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2}`}).join(' ')}`,revealWidth:14}
  }
  return sourceGroups.map(indices=>indices.length===1 && indices[0]===12
    ? [compile(indices,true),segment([hook],'up',hookHeight/2)]
    : [compile(indices)])
}
