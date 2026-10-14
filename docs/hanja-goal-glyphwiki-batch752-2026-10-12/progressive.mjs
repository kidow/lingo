import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1,2],[3],[4],[5],[6],[7],[9],[10],[8],[11],[12],[13],[14,15],[16],[17],[18],[19,20],[21],[22],[23],[24]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[28.06,28.71,28.06,70.28999999999999,12,13]}],[{"kind":"cdDrawLine","args":[28.06,28.71,77.94,28.71,2,2]}],[{"kind":"cdDrawLine","args":[77.94,28.71,77.94,70.28999999999999,22,23]}],[{"kind":"cdDrawLine","args":[28.06,70.28999999999999,77.94,70.28999999999999,2,2]}],[{"kind":"cdDrawCurve","args":[124.1,14.48,110.6,32.96,88.1,45.28,0,7]}],[{"kind":"cdDrawLine","args":[111.5,32.519999999999996,111.5,82.68,12,313]}],[{"kind":"cdDrawCurve","args":[159.2,15.8,152,22.84,140.3,32.519999999999996,0,7]}],[{"kind":"cdDrawLine","args":[111.5,32.519999999999996,182.6,32.519999999999996,2,100]}],[{"kind":"cdDrawLine","args":[144.8,32.519999999999996,144.8,82.68,32,32]}],[{"kind":"cdDrawLine","args":[111.5,48.36,180.8,48.36,2,100]}],[{"kind":"cdDrawLine","args":[111.5,64.64,180.8,64.64,2,100]}],[{"kind":"cdDrawLine","args":[111.5,82.68,186.2,82.68,2,100]}],[{"kind":"cdDrawCurve","args":[103.395,86.22,98.47,92.905,89.605,101.5,0,7]}],[{"kind":"cdDrawLine","args":[48.235,101.5,48.235,149.25,12,13]}],[{"kind":"cdDrawLine","args":[48.235,101.5,143.78,101.5,2,2]}],[{"kind":"cdDrawLine","args":[143.78,101.5,143.78,126.33,22,323]}],[{"kind":"cdDrawLine","args":[48.235,113.915,143.78,113.915,2,2]}],[{"kind":"cdDrawLine","args":[48.235,126.33,143.78,126.33,2,2]}],[{"kind":"cdDrawLine","args":[48.235,137.79,183.18,137.79,2,200]}],[{"kind":"cdDrawLine","args":[48.235,149.25,165.45,149.25,2,2]}],[{"kind":"cdDrawCurve","args":[165.45,149.25,166.435,162.62,162.53837905753971,171.59261256357132,22,0]},{"kind":"cdDrawCurve","args":[162.53837905753971,171.59261256357132,158.555,180.765,148.555,180.765,2,14]}],[{"kind":"cdDrawCurve","args":[33.46,153.07,33.46,172.17,20.655,181.72,7,8]}],[{"kind":"cdDrawCurve","args":[59.07,154.025,68.92,165.485,68.92,177.9,7,8]}],[{"kind":"cdDrawCurve","args":[84.68,154.025,96.5,162.62,101.425,174.08,7,8]}],[{"kind":"cdDrawCurve","args":[114.23,154.025,127.035,158.8,132.945,169.305,7,8]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,25);assert.equal(proof.groups.length,25)
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
  const hooks=new Map([[JSON.stringify([19,20]),terminalHook([19,20])]])
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
