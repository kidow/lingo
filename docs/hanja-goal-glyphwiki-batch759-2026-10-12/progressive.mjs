import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1,2],[3],[4],[5],[7,8],[6],[9],[10],[11],[12,13],[14],[15,16,17],[18],[19],[20]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[19.256,43.72,19.256,132.28,12,13]}],[{"kind":"cdDrawLine","args":[19.256,43.72,50.343999999999994,43.72,2,2]}],[{"kind":"cdDrawLine","args":[50.343999999999994,43.72,50.343999999999994,132.28,22,23]}],[{"kind":"cdDrawLine","args":[19.256,132.28,50.343999999999994,132.28,2,2]}],[{"kind":"cdDrawLine","args":[120.56,13,120.56,46,0,32]}],[{"kind":"cdDrawLine","args":[120.56,28,171.275,28,2,0]}],[{"kind":"cdDrawLine","args":[75.725,46,75.725,111,12,1]},{"kind":"cdDrawCurve","args":[75.725,111,75.725,163,58.82,185,1,7]}],[{"kind":"cdDrawLine","args":[75.725,46,179.36,46,2,2]}],[{"kind":"cdDrawCurve","args":[179.36,46,174.215,56,166.865,68,22,7]}],[{"kind":"cdDrawLine","args":[83.075,72,162.45499999999998,63,0,0]}],[{"kind":"cdDrawLine","args":[116.15,48,116.15,75,0,1]},{"kind":"cdDrawCurve","args":[116.15,75,116.15,85,126.15,85,1,3001]},{"kind":"cdDrawLine","args":[126.15,85,174.95,85,3006,5]}],[{"kind":"cdDrawLine","args":[113.73934700000001,102.27289999999999,113.73934700000001,128.31709999999998,1012,313]}],[{"kind":"cdDrawLine","args":[113.73934700000001,102.27289999999999,163.028153,102.27289999999999,2,2]}],[{"kind":"cdDrawLine","args":[163.028153,102.27289999999999,163.028153,128.31709999999998,22,323]}],[{"kind":"cdDrawLine","args":[113.73934700000001,128.31709999999998,163.028153,128.31709999999998,2,2]}],[{"kind":"cdDrawLine","args":[95.29069999999997,111.85,95.29069999999997,142.59,1000,213]}],[{"kind":"cdDrawLine","args":[95.29069999999997,142.59,162.79309999999998,142.59,2,2]}],[{"kind":"cdDrawLine","args":[162.79309999999998,142.59,162.79309999999998,161.67000000000002,22,32]}],[{"kind":"cdDrawLine","args":[81.42859999999999,161.67000000000002,183.2849,161.67000000000002,0,300]}],[{"kind":"cdDrawCurve","args":[132.6581,147.36,130.2473,179.16,85.04480000000001,187.64,0,7]}],[{"kind":"cdDrawCurve","args":[133.8635,161.67000000000002,151.3418,180.22,176.0525,183.93,7,0]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,21);assert.equal(proof.groups.length,21)
  assert.deepEqual(trace.map(r=>r.map(c=>({kind:c.kind,args:c.args}))),ORIGINAL)
  for(let i=0;i<trace.length;i++)assert.deepEqual(trace[i].flatMap(c=>c.polygons),proof.groups[i].polygons)
  const segment=(polygons,direction,weight)=>{
    const points=polygons.flat(),xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
    assert(points.length>0&&points.every(p=>p.off===0))
    const normalized=polygons.map(p=>{const area=p.reduce((n,v,i)=>{const q=p[(i+1)%p.length];return n+v.x*q.y-q.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
    return {outline:normalized.map(p=>p.map((v,i)=>`${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight:Math.round(weight*1e6)/1e6}
  }
  const terminalUpTail=(indices)=>{
    const terminal=trace[indices.at(-1)].at(-1)
    assert.equal(terminal.kind,'cdDrawLine')
    const [x1,y1,x2,y2,ta1,ta2]=terminal.args
    assert.equal(y1,y2);assert(x1<x2)
    assert.equal(ta1%1000,6);assert.equal(ta2%100,5)
    assert.deepEqual(proof.defaults,{kMage:10,kWidth:5,kMinWidthT:6,kAdjustMageStep:5})
    const opt1=Math.floor(ta1/1000)
    const width=proof.defaults.kMinWidthT-opt1/2
    const jump=proof.defaults.kWidth*(4*(1-opt1/proof.defaults.kAdjustMageStep)+1)
    const point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0})
    const hook=[point(x2,y2-width),point(x2+2,y2-width-jump),point(x2,y2-width-jump),point(x2-width,y2-width)]
    assert.deepEqual(terminal.polygons.at(-1),hook,'Pinned original cdDrawLine terminal5 upward-tail polygon identity')
    return {hook,jump}
  }
  const hooks=new Map([[JSON.stringify([10]),terminalUpTail([10])]])
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
    const masks=h?[compile(indices,h.hook),segment([h.hook],'up',h.jump/2)]:[compile(indices)];
    if(JSON.stringify(indices)==='[1,2]') masks[0].revealWidth=originalLineTipWidth(indices.flatMap(raw=>trace[raw]));
    return masks;
  })
}
