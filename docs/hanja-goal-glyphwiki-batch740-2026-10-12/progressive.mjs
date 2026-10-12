import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0,1],[2],[3],[4],[5],[6,7],[17],[15],[16],[11],[13],[12],[14],[8],[9],[10]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[27.55,28,68.4,28,2,2]}],[{"kind":"cdDrawCurve","args":[68.4,28,61.75,49,44.65,76,22,7]}],[{"kind":"cdDrawCurve","args":[44.65,75,69.35,100,63.87197805295298,125.22773265087442,7,0]},{"kind":"cdDrawCurve","args":[63.87197805295298,125.22773265087442,61.75,135,51.75,135,2,514]}],[{"kind":"cdDrawLine","args":[27.55,28,27.55,186,12,0]}],[{"kind":"cdDrawCurve","args":[127,14,121.4,24,110.2,37,0,7]}],[{"kind":"cdDrawLine","args":[87.8,37,87.8,131,12,0]}],[{"kind":"cdDrawLine","args":[87.8,37,169,37,2,2]}],[{"kind":"cdDrawLine","args":[169,37,169,130,22,0]}],[{"kind":"cdDrawLine","args":[70.3,140,188.6,140,0,0]}],[{"kind":"cdDrawCurve","args":[128.4,122,122.8,178,64,188,0,7]}],[{"kind":"cdDrawCurve","args":[129.1,140,143.8,172,179.5,179,7,0]}],[{"kind":"cdDrawLine","args":[96.2,85,162,85,0,0]}],[{"kind":"cdDrawCurve","args":[124.2,85,114.4,107,96.9,120,132,7]}],[{"kind":"cdDrawLine","args":[127,56,127,117,0,0]}],[{"kind":"cdDrawCurve","args":[129.1,93,143.1,98,153.6,112,7,8]}],[{"kind":"cdDrawCurve","args":[99,61,108.8,68,116.5,78,7,8]}],[{"kind":"cdDrawCurve","args":[151.5,59,144.5,71,134.7,82,0,7]}],[{"kind":"cdDrawCurve","args":[147.3,45,124.9,54,101.8,59,0,7]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,18);assert.equal(proof.groups.length,18)
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
  const hooks=new Map()
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
