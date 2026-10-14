import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1,2],[3],[4],[6],[7,8],[9],[10],[11],[12,13],[14],[15]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[25.939,37.56,25.939,150.44,12,13]}],[{"kind":"cdDrawLine","args":[25.939,37.56,63.361,37.56,2,2]}],[{"kind":"cdDrawLine","args":[63.361,37.56,63.361,150.44,22,23]}],[{"kind":"cdDrawLine","args":[25.939,92.34,63.361,92.34,2,2]}],[{"kind":"cdDrawLine","args":[25.939,150.44,63.361,150.44,2,2]}],[],[{"kind":"cdDrawLine","args":[92.7145,26.08,92.7145,85.92,12,113]}],[{"kind":"cdDrawLine","args":[92.7145,26.08,163.53549999999998,26.08,2,2]}],[{"kind":"cdDrawLine","args":[163.53549999999998,26.08,163.53549999999998,85.92,22,123]}],[{"kind":"cdDrawLine","args":[92.7145,55.12,163.53549999999998,55.12,2,2]}],[{"kind":"cdDrawLine","args":[92.7145,85.92,163.53549999999998,85.92,2,2]}],[{"kind":"cdDrawCurve","args":[116.30000000000001,88,98.025,124,70.075,144,0,7]}],[{"kind":"cdDrawLine","args":[99.1,114,173.275,114,0,2]}],[{"kind":"cdDrawCurve","args":[173.275,114,174.35,168,166.38282351117314,175.94070746394704,22,0]},{"kind":"cdDrawCurve","args":[166.38282351117314,175.94070746394704,159.3,183,149.3,183,2,14]}],[{"kind":"cdDrawCurve","args":[125.975,114,109.85,148,77.6,168,132,7]}],[{"kind":"cdDrawCurve","args":[151.775,114,131.35,168,90.5,188,132,7]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,16);assert.equal(proof.groups.length,16)
  assert.deepEqual(trace[5],[]);assert.deepEqual(proof.groups[5].polygons,[])
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
  const hooks=new Map([[12,13]].map(indices=>[JSON.stringify(indices),terminalHook(indices)]))
  // Bound only this selected original pure-line fold by its emitted vertices.
  const originalLineTipWidth = (calls) => {
    assert(calls.every(call=>call.kind==='cdDrawLine'));
    const distance = (point,call) => {
      const [x1,y1,x2,y2]=call.args;
      const dx=x2-x1,dy=y2-y1;
      const t=Math.max(0,Math.min(1,((point.x-x1)*dx+(point.y-y1)*dy)/(dx*dx+dy*dy)));
      return Math.hypot(point.x-(x1+t*dx),point.y-(y1+t*dy));
    };
    const maximum=Math.max(...calls.flatMap(call=>call.polygons.flat()).map(point=>Math.min(...calls.map(call=>distance(point,call)))));
    return Math.max(14,Math.ceil(maximum*1e6)/1e6+0.001);
  };
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
  return sourceGroups.map(indices=>{
    const h=hooks.get(JSON.stringify(indices));
    const masks=h?[compile(indices,h.hook),segment([h.hook],'left',h.jump/2)]:[compile(indices)];
    if(JSON.stringify(indices)==='[1,2]') masks[0].revealWidth=originalLineTipWidth(indices.flatMap(raw=>trace[raw]));
    return masks;
  })
}
