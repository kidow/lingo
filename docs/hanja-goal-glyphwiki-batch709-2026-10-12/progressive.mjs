import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5],[6],[7,8],[9],[12],[10],[11]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[14.58,55,78.96,55,0,0]}],[{"kind":"cdDrawLine","args":[46.4,15,46.4,171,0,1]},{"kind":"cdDrawCurve","args":[46.4,171,46.4,181,36.4,181,1,314]}],[{"kind":"cdDrawCurve","args":[15.32,122,48.62,107,78.96,91,0,7]}],[{"kind":"cdDrawCurve","args":[128.85,14.4768,105.9,57.0908,67.425,77.2356,0,7]}],[{"kind":"cdDrawCurve","args":[126.15,16.8012,149.775,53.216800000000006,180.825,67.938,7,0]}],[{"kind":"cdDrawLine","args":[103.2,60.9648,149.775,60.9648,0,100]}],[{"kind":"cdDrawLine","args":[95.775,82.16,95.775,107.12,12,113]}],[{"kind":"cdDrawLine","args":[95.775,82.16,159.225,82.16,2,2]}],[{"kind":"cdDrawLine","args":[159.225,82.16,159.225,107.12,22,123]}],[{"kind":"cdDrawLine","args":[95.775,107.12,159.225,107.12,2,2]}],[{"kind":"cdDrawLine","args":[109.275,120.21,109.275,140.23000000000002,0,1]},{"kind":"cdDrawCurve","args":[109.275,140.23000000000002,106.575,178.125,80.925,187.42,1,7]}],[{"kind":"cdDrawLine","args":[147.75,120.21,147.75,185.275,0,0]}],[{"kind":"cdDrawLine","args":[70.8,148.095,184.875,148.095,0,0]}]]
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
  const terminal = trace[1][1]
  assert.equal(terminal.kind,'cdDrawCurve')
  assert.deepEqual(terminal.args,[46.4,171,46.4,181,36.4,181,1,314])
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
    if(withoutTerminalHook){assert.deepEqual(indices,[1]);assert.deepEqual(calls.at(-1).polygons.pop(),hook)}
    for(let i=1;i<calls.length;i++){const c=calls[i-1];assert.deepEqual(c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawBezier'?6:4,c.kind==='cdDrawLine'?4:c.kind==='cdDrawBezier'?8:6),calls[i].args.slice(0,2),'All merged original trajectories must be continuous')}
    const pieces=calls.map(c=>{const a=c.args;if(c.kind==='cdDrawBezier')return {...segment(c.polygons,'curve',Math.hypot(a[6]-a[0],a[7]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`,revealWidth:14};if(c.kind==='cdDrawCurve')return {...segment(c.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
      assert.equal(c.kind,'cdDrawLine');const p=segment(c.polygons,a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve',Math.hypot(a[2]-a[0],a[3]-a[1])/2);return p.direction==='curve'?{...p,revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2}`,revealWidth:14}:p})
    if(pieces.length===1)return pieces[0]
    const a=calls[0].args
    return {outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:`M${a[0]/2} ${a[1]/2} ${calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?`L${v[2]/2} ${v[3]/2}`:c.kind==='cdDrawBezier'?`C${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2} ${v[6]/2} ${v[7]/2}`:`Q${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2}`}).join(' ')}`,revealWidth:14}
  }
  return sourceGroups.map(indices=>indices.length===1 && indices[0]===1 ? [compile(indices,true),segment([hook],'left',jump/2)] : [compile(indices)])
}
