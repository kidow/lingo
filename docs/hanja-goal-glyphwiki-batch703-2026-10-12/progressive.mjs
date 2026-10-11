import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15,16],[17],[18]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[52.29,15,39.57,58,13.335,92,0,7]}],[{"kind":"cdDrawCurve","args":[51.495,27,71.37,38,79.32,54,7,8]}],[{"kind":"cdDrawLine","args":[33.21,71,78.525,71,0,100]}],[{"kind":"cdDrawLine","args":[18.9,103,83.295,103,0,0]}],[{"kind":"cdDrawLine","args":[51.495,71,51.495,164,32,32]}],[{"kind":"cdDrawCurve","args":[20.49,120,33.21,134,34.8,154,7,8]}],[{"kind":"cdDrawCurve","args":[75.345,119,69.78,135,61.035,151,0,7]}],[{"kind":"cdDrawCurve","args":[17.310000000000002,177,49.905,169,81.705,157,0,7]}],[{"kind":"cdDrawLine","args":[104.51,24.52,104.51,73.47999999999999,12,213]}],[{"kind":"cdDrawLine","args":[104.51,24.52,167.69,24.52,2,2]}],[{"kind":"cdDrawLine","args":[167.69,24.52,167.69,73.47999999999999,22,223]}],[{"kind":"cdDrawLine","args":[104.51,48.28,167.69,48.28,2,2]}],[{"kind":"cdDrawLine","args":[104.51,73.47999999999999,167.69,73.47999999999999,2,2]}],[{"kind":"cdDrawLine","args":[83,96,188.3,96,0,100]}],[{"kind":"cdDrawCurve","args":[120.8,96,107.3,127,81.2,141,132,7]}],[{"kind":"cdDrawLine","args":[110,118,174.8,118,2,2]}],[{"kind":"cdDrawCurve","args":[174.8,118,173.9,152,168.06227766016838,169.51316701949486,22,0]},{"kind":"cdDrawCurve","args":[168.06227766016838,169.51316701949486,164.9,179,154.9,179,2,14]}],[{"kind":"cdDrawCurve","args":[132.5,118,114.5,155,78.5,177,132,7]}],[{"kind":"cdDrawCurve","args":[155.9,118,143.3,161,108.2,186,132,7]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,19);assert.equal(proof.groups.length,19)
  assert.deepEqual(trace.map(r=>r.map(c=>({kind:c.kind,args:c.args}))),ORIGINAL)
  for(let i=0;i<trace.length;i++)assert.deepEqual(trace[i].flatMap(c=>c.polygons),proof.groups[i].polygons)
  const segment=(polygons,direction,weight)=>{
    const points=polygons.flat(),xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
    assert(points.length>0&&points.every(p=>p.off===0))
    const normalized=polygons.map(p=>{const area=p.reduce((n,v,i)=>{const q=p[(i+1)%p.length];return n+v.x*q.y-q.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
    return {outline:normalized.map(p=>p.map((v,i)=>`${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight:Math.round(weight*1e6)/1e6}
  }
  const terminal = trace[16][1]
  assert.equal(terminal.kind,'cdDrawCurve')
  assert.deepEqual(terminal.args,[168.06227766016838,169.51316701949486,164.9,179,154.9,179,2,14])
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
    if(withoutTerminalHook){assert.deepEqual(indices,[15,16]);assert.deepEqual(calls.at(-1).polygons.pop(),hook)}
    for(let i=1;i<calls.length;i++){const c=calls[i-1];assert.deepEqual(c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawBezier'?6:4,c.kind==='cdDrawLine'?4:c.kind==='cdDrawBezier'?8:6),calls[i].args.slice(0,2),'All merged original trajectories must be continuous')}
    const pieces=calls.map(c=>{const a=c.args;if(c.kind==='cdDrawBezier')return {...segment(c.polygons,'curve',Math.hypot(a[6]-a[0],a[7]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`,revealWidth:14};if(c.kind==='cdDrawCurve')return {...segment(c.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
      assert.equal(c.kind,'cdDrawLine');const p=segment(c.polygons,a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve',Math.hypot(a[2]-a[0],a[3]-a[1])/2);return p.direction==='curve'?{...p,revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2}`,revealWidth:14}:p})
    if(pieces.length===1)return pieces[0]
    const a=calls[0].args
    return {outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:`M${a[0]/2} ${a[1]/2} ${calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?`L${v[2]/2} ${v[3]/2}`:c.kind==='cdDrawBezier'?`C${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2} ${v[6]/2} ${v[7]/2}`:`Q${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2}`}).join(' ')}`,revealWidth:14}
  }
  return sourceGroups.map(indices=>indices.length===2 && indices[0]===15 ? [compile(indices,true),segment([hook],'left',jump/2)] : [compile(indices)])
}
