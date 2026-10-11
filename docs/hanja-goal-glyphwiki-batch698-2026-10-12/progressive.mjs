import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13,14],[15],[16],[17,18],[19],[20],[21,22],[25],[23],[24]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[20.48,32,70.64,32,0,0]}],[{"kind":"cdDrawLine","args":[12.88,68,79,68,0,0]}],[{"kind":"cdDrawLine","args":[44.04,68,44.04,186,2032,0]}],[{"kind":"cdDrawLine","args":[25.04,87,25.04,120,1000,1]},{"kind":"cdDrawCurve","args":[25.04,120,25.04,162,12.88,174,1001,7]}],[{"kind":"cdDrawLine","args":[64.56,87,64.56,158,1000,0]}],[{"kind":"cdDrawCurve","args":[131.3,13.72,109.2,57.445,72.15,78.115,0,7]}],[{"kind":"cdDrawCurve","args":[128.7,16.105,151.45,53.47,181.35,68.575,7,0]}],[{"kind":"cdDrawLine","args":[106.6,61.42,151.45,61.42,0,100]}],[{"kind":"cdDrawLine","args":[88.5625,79.82,88.5625,104.18,1012,213]}],[{"kind":"cdDrawLine","args":[88.5625,79.82,107.3475,79.82,2,2]}],[{"kind":"cdDrawLine","args":[107.3475,79.82,107.3475,104.18,3022,223]}],[{"kind":"cdDrawLine","args":[88.5625,104.18,107.3475,104.18,2,2]}],[{"kind":"cdDrawLine","args":[120.6075,79.82,120.6075,104.18,3012,213]}],[{"kind":"cdDrawLine","args":[120.6075,79.82,139.39249999999998,79.82,2,2]}],[{"kind":"cdDrawLine","args":[139.39249999999998,79.82,139.39249999999998,104.18,3022,223]}],[{"kind":"cdDrawLine","args":[120.6075,104.18,139.39249999999998,104.18,2,2]}],[{"kind":"cdDrawLine","args":[152.6525,79.82,152.6525,104.18,3012,213]}],[{"kind":"cdDrawLine","args":[152.6525,79.82,171.4375,79.82,2,2]}],[{"kind":"cdDrawLine","args":[171.4375,79.82,171.4375,104.18,1022,223]}],[{"kind":"cdDrawLine","args":[152.6525,104.18,171.4375,104.18,2,2]}],[{"kind":"cdDrawLine","args":[91.676,123.555,91.676,184.305,12,0]}],[{"kind":"cdDrawLine","args":[91.676,123.555,168.324,123.555,2,2]}],[{"kind":"cdDrawLine","args":[168.324,123.555,168.324,173.09,22,1]},{"kind":"cdDrawCurve","args":[168.324,173.09,168.324,183.09,158.324,183.09,1,214]}],[{"kind":"cdDrawLine","args":[117.416,123.555,117.416,180.255,32,100]}],[{"kind":"cdDrawLine","args":[142.584,123.555,142.584,180.255,32,100]}],[{"kind":"cdDrawLine","args":[91.676,151.5,168.324,151.5,2,2]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,26);assert.equal(proof.groups.length,26)
  assert.deepEqual(trace.map(r=>r.map(c=>({kind:c.kind,args:c.args}))),ORIGINAL)
  for(let i=0;i<trace.length;i++)assert.deepEqual(trace[i].flatMap(c=>c.polygons),proof.groups[i].polygons)
  const segment=(polygons,direction,weight)=>{
    const points=polygons.flat(),xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
    assert(points.length>0&&points.every(p=>p.off===0))
    const normalized=polygons.map(p=>{const area=p.reduce((n,v,i)=>{const q=p[(i+1)%p.length];return n+v.x*q.y-q.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
    return {outline:normalized.map(p=>p.map((v,i)=>`${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight:Math.round(weight*1e6)/1e6}
  }
  const terminal = trace[22][1]
  assert.equal(terminal.kind,'cdDrawCurve')
  assert.deepEqual(terminal.args,[168.324,173.09,168.324,183.09,158.324,183.09,1,214])
  const [x1,y1,cx,cy,x2,y2,ta1,ta2] = terminal.args
  assert.equal(ta2%100,14)
  const opt1=Math.floor((ta1%10000)/1000),opt2=Math.floor((ta2%1000)/100)
  const width=proof.defaults.kMinWidthT-opt1/2
  const jump=proof.defaults.kWidth*4*Math.min(1-opt2/10,Math.pow(width/proof.defaults.kMinWidthT,3))*(width>6?6/width:1)
  const point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0})
  const hook=[point(x2,y2),point(x2,y2-width),point(x2-jump,y2-width),point(x2-jump,y2-width*.5)]
  assert.deepEqual(terminal.polygons.at(-1),hook,'Pinned original terminal14 left-hook polygon identity')
  const compile=(indices,withoutTerminalHook=false)=>{
    const calls=indices.flatMap(i=>trace[i]).map(c=>({...c,polygons:c.polygons.slice()}))
    if(withoutTerminalHook){assert.deepEqual(indices,[21,22]);assert.deepEqual(calls.at(-1).polygons.pop(),hook)}
    for(let i=1;i<calls.length;i++){const c=calls[i-1];assert.deepEqual(c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawBezier'?6:4,c.kind==='cdDrawLine'?4:c.kind==='cdDrawBezier'?8:6),calls[i].args.slice(0,2),'All merged original trajectories must be continuous')}
    const pieces=calls.map(c=>{const a=c.args;if(c.kind==='cdDrawBezier')return {...segment(c.polygons,'curve',Math.hypot(a[6]-a[0],a[7]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`,revealWidth:14};if(c.kind==='cdDrawCurve')return {...segment(c.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
      assert.equal(c.kind,'cdDrawLine');const p=segment(c.polygons,a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve',Math.hypot(a[2]-a[0],a[3]-a[1])/2);return p.direction==='curve'?{...p,revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2}`,revealWidth:14}:p})
    if(pieces.length===1)return pieces[0]
    const a=calls[0].args
    return {outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:`M${a[0]/2} ${a[1]/2} ${calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?`L${v[2]/2} ${v[3]/2}`:c.kind==='cdDrawBezier'?`C${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2} ${v[6]/2} ${v[7]/2}`:`Q${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2}`}).join(' ')}`,revealWidth:14}
  }
  return sourceGroups.map(indices=>indices.length===2 && indices[0]===21 ? [compile(indices,true),segment([hook],'left',jump/2)] : [compile(indices)])
}
