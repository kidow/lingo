import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2,3],[4],[5],[6,7],[8],[9],[10],[11],[12],[13],[14,15],[16],[17],[18],[19,20],[21],[22],[23],[24]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[19.034399999999998,27.72,93.8672,27.72,0,0]}],[{"kind":"cdDrawLine","args":[34.3892,49.302,34.3892,81.378,12,213]}],[{"kind":"cdDrawLine","args":[34.3892,49.302,77.61080000000001,49.302,2,2]}],[{"kind":"cdDrawLine","args":[77.61080000000001,49.302,77.61080000000001,81.378,22,223]}],[{"kind":"cdDrawLine","args":[34.3892,81.378,77.61080000000001,81.378,2,2]}],[{"kind":"cdDrawLine","args":[24.4072,103.51440000000001,24.4072,183.82319999999999,12,0]}],[{"kind":"cdDrawLine","args":[24.4072,103.51440000000001,87.59280000000001,103.51440000000001,2,2]}],[{"kind":"cdDrawLine","args":[87.59280000000001,103.51440000000001,87.59280000000001,171.76399999999998,22,1]},{"kind":"cdDrawCurve","args":[87.59280000000001,171.76399999999998,87.59280000000001,181.76399999999998,77.59280000000001,181.76399999999998,1,514]}],[{"kind":"cdDrawCurve","args":[76.0192,109.83963375000002,58.3552,131.11374375000003,32.742399999999996,142.97815125,0,7]}],[{"kind":"cdDrawCurve","args":[37.1584,113.31713249999999,58.6496,124.15874625000001,73.36959999999999,140.11432875,7,8]}],[{"kind":"cdDrawLine","args":[31.2704,150.831054,80.72959999999999,150.831054,0,100]}],[{"kind":"cdDrawLine","args":[56,150.831054,56,183.07166625000002,32,200]}],[{"kind":"cdDrawCurve","args":[143.92000000000002,14,139.695,27,133.78,38,0,7]}],[{"kind":"cdDrawLine","args":[113.5,38,113.5,122,12,313]}],[{"kind":"cdDrawLine","args":[113.5,38,167.58,38,2,2]}],[{"kind":"cdDrawLine","args":[167.58,38,167.58,82,22,223]}],[{"kind":"cdDrawLine","args":[113.5,60,167.58,60,2,2]}],[{"kind":"cdDrawLine","args":[113.5,82,167.58,82,2,2]}],[{"kind":"cdDrawLine","args":[113.5,102,186.17,102,2,100]}],[{"kind":"cdDrawLine","args":[113.5,122,177.72,122,2,2]}],[{"kind":"cdDrawCurve","args":[177.72,122,178.565,164,172.22724206332867,173.64324960778393,22,0]},{"kind":"cdDrawCurve","args":[172.22724206332867,173.64324960778393,166.735,182,156.735,182,2,14]}],[{"kind":"cdDrawCurve","args":[110.965,135,113.5,161,102.515,172,7,8]}],[{"kind":"cdDrawCurve","args":[122.795,138,129.555,155,126.175,167,7,8]}],[{"kind":"cdDrawCurve","args":[135.47,137,144.765,145,144.765,160,7,8]}],[{"kind":"cdDrawCurve","args":[148.14499999999998,134,159.975,139,161.665,151,7,8]}]]
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
  const hooks=new Map([[6,7],[19,20]].map(indices=>[JSON.stringify(indices),terminalHook(indices)]))
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
  return sourceGroups.map(indices=>{const h=hooks.get(JSON.stringify(indices));return h?[compile(indices,h.hook),segment([h.hook],'left',h.jump/2)]:[compile(indices)]})
}
