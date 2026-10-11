import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1,2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12,13],[14],[15],[16],[17],[18,19],[20],[21]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[25.655,23,25.655,94,2012,1]},{"kind":"cdDrawCurve","args":[25.655,94,25.655,164,12.85,188,2001,7]}],[{"kind":"cdDrawLine","args":[25.655,23,86.725,23,2,2]}],[{"kind":"cdDrawBezier","args":[86.725,23,84.755,187,88.695,178,182.27,178,22,15]}],[{"kind":"cdDrawCurve","args":[71.95,40,57.175,49,34.519999999999996,55,0,7]}],[{"kind":"cdDrawLine","args":[41.415,78,41.415,122,4012,13]}],[{"kind":"cdDrawLine","args":[41.415,78,70.965,78,2,2]}],[{"kind":"cdDrawLine","args":[70.965,78,70.965,122,2022,323]}],[{"kind":"cdDrawLine","args":[41.415,122,70.965,122,2,2]}],[{"kind":"cdDrawLine","args":[56.19,50,56.19,162,4032,32]}],[{"kind":"cdDrawCurve","args":[30.58,171,48.31,166,75.89,157,0,7]}],[{"kind":"cdDrawCurve","args":[65.055,138,77.86,155,82.785,174,7,8]}],[{"kind":"cdDrawLine","args":[114.8812,24.978,114.8812,67.172,12,313]}],[{"kind":"cdDrawLine","args":[114.8812,24.978,169.11880000000002,24.978,2,2]}],[{"kind":"cdDrawLine","args":[169.11880000000002,24.978,169.11880000000002,67.172,22,323]}],[{"kind":"cdDrawLine","args":[114.8812,45.454499999999996,169.11880000000002,45.454499999999996,2,2]}],[{"kind":"cdDrawLine","args":[114.8812,67.172,169.11880000000002,67.172,2,2]}],[{"kind":"cdDrawLine","args":[95.56,85.6,188.44,85.6,0,100]}],[{"kind":"cdDrawCurve","args":[128.5,85.6,116.62,117.9,95.02,134.05,132,7]}],[{"kind":"cdDrawLine","args":[121.47999999999999,104.3,176.01999999999998,104.3,2,2]}],[{"kind":"cdDrawCurve","args":[176.01999999999998,104.3,175.48000000000002,136.6,171.5967965479774,148.35471130419947,22,0]},{"kind":"cdDrawCurve","args":[171.5967965479774,148.35471130419947,168.45999999999998,157.85,158.45999999999998,157.85,2,14]}],[{"kind":"cdDrawCurve","args":[140.38,104.3,128.5,141.7,99.34,160.4,132,7]}],[{"kind":"cdDrawCurve","args":[159.28,104.3,152.26,142.55,127.96000000000001,163.8,132,7]}]]
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
  const terminal14=trace[19][1],terminal15=trace[2][0]
  assert.equal(terminal14.kind,'cdDrawCurve');assert.equal(terminal15.kind,'cdDrawBezier')
  assert.deepEqual(terminal14.args,[171.5967965479774,148.35471130419947,168.45999999999998,157.85,158.45999999999998,157.85,2,14])
  assert.deepEqual(terminal15.args,[86.725,23,84.755,187,88.695,178,182.27,178,22,15])
  const point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0})
  const [x1,y1,cx,cy,x2,y2,ta1,ta2]=terminal14.args
  assert.equal(ta2%100,14)
  const opt1=Math.floor((ta1%10000)/1000),opt2=Math.floor((ta2%1000)/100)
  const width=proof.defaults.kMinWidthT-opt1/2
  const jump=proof.defaults.kWidth*4*Math.min(1-opt2/10,Math.pow(width/proof.defaults.kMinWidthT,3))*(width>6?6/width:1)
  const hook14=[point(x2,y2),point(x2,y2-width),point(x2-jump,y2-width),point(x2-jump,y2-width*.5)]
  assert.deepEqual(terminal14.polygons.at(-1),hook14,'Pinned terminal14 polygon identity')
  const [bx,by,,,ex,ey,endX,endY,bta1,bta2]=terminal15.args
  assert.equal(bta2%100,15);assert(by<endY,'Pinned terminal15 upward branch')
  const bWidth=proof.defaults.kMinWidthT-Math.floor((bta1%10000)/1000)/2
  const hook15=[point(endX,endY-bWidth+1),point(endX+2,endY-bWidth-proof.defaults.kWidth*5),point(endX,endY-bWidth-proof.defaults.kWidth*5),point(endX-bWidth,endY-bWidth+1)]
  assert.deepEqual(terminal15.polygons.at(-1),hook15,'Pinned terminal15 polygon identity')
  const compile=(indices,hookDirection=null)=>{
    const calls=indices.flatMap(i=>trace[i]).map(c=>({...c,polygons:c.polygons.slice()}))
    if(hookDirection){assert.deepEqual(indices,hookDirection==='up'?[1,2]:[18,19]);assert.deepEqual(calls.at(-1).polygons.pop(),hookDirection==='up'?hook15:hook14)}
    for(let i=1;i<calls.length;i++){const c=calls[i-1];assert.deepEqual(c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawBezier'?6:4,c.kind==='cdDrawLine'?4:c.kind==='cdDrawBezier'?8:6),calls[i].args.slice(0,2),'All merged original trajectories must be continuous')}
    const pieces=calls.map(c=>{const a=c.args;if(c.kind==='cdDrawBezier')return {...segment(c.polygons,'curve',Math.hypot(a[6]-a[0],a[7]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`,revealWidth:14};if(c.kind==='cdDrawCurve')return {...segment(c.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
      assert.equal(c.kind,'cdDrawLine');const p=segment(c.polygons,a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve',Math.hypot(a[2]-a[0],a[3]-a[1])/2);return p.direction==='curve'?{...p,revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2}`,revealWidth:14}:p})
    if(pieces.length===1)return pieces[0]
    const a=calls[0].args
    return {outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:`M${a[0]/2} ${a[1]/2} ${calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?`L${v[2]/2} ${v[3]/2}`:c.kind==='cdDrawBezier'?`C${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2} ${v[6]/2} ${v[7]/2}`:`Q${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2}`}).join(' ')}`,revealWidth:14}
  }
  return sourceGroups.map(indices=>indices[0]===1 ? [compile(indices,'up'),segment([hook15],'up',(proof.defaults.kWidth*5+1)/2)] : indices[0]===18 ? [compile(indices,'left'),segment([hook14],'left',jump/2)] : [compile(indices)])
}
