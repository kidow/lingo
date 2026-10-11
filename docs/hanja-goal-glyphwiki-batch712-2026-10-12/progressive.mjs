import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2,3],[4],[5],[6],[7],[8],[9],[14],[22],[21],[17,18],[16],[12,11],[13],[15],[10],[19],[20]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[41.65,17,41.65,51,0,32]}],[{"kind":"cdDrawLine","args":[12.75,51,75.65,51,0,0]}],[{"kind":"cdDrawLine","args":[38.25,86,60.35,86,0,2]}],[{"kind":"cdDrawCurve","args":[60.35,86,62.9,153,56.23400568718577,170.64527906333177,22,0]},{"kind":"cdDrawCurve","args":[56.23400568718577,170.64527906333177,52.7,180,42.7,180,2,314]}],[{"kind":"cdDrawLine","args":[35.7,54,35.7,80,0,1]},{"kind":"cdDrawCurve","args":[35.7,80,35.7,150,12.75,187,1,7]}],[{"kind":"cdDrawCurve","args":[103.04,16.185,90.24,46.065,69.76,64.325,0,7]}],[{"kind":"cdDrawLine","args":[90.24,38.595,184.95999999999995,38.595,32,0]}],[{"kind":"cdDrawCurve","args":[110.16,53.01,99.28,62.489999999999995,87.12,65.65,0,7]}],[{"kind":"cdDrawLine","args":[87.12,65.65,89.03999999999999,151.76,12,32]}],[{"kind":"cdDrawLine","args":[88.4,92.50999999999999,112.08,92.50999999999999,2,200]}],[{"kind":"cdDrawLine","args":[73.68,151.76,186.95999999999998,151.76,0,300]}],[{"kind":"cdDrawLine","args":[173.51999999999998,62.489999999999995,170.95999999999998,151.76,22,32]}],[{"kind":"cdDrawLine","args":[152.4,62.489999999999995,173.51999999999998,62.489999999999995,0,2]}],[{"kind":"cdDrawLine","args":[151.76,91.72,172.24,91.72,0,2]}],[{"kind":"cdDrawLine","args":[88.4,120.95,112.72,120.95,2,200]}],[{"kind":"cdDrawLine","args":[150.48000000000002,120.95,171.6,120.95,0,2]}],[{"kind":"cdDrawLine","args":[123.6,110.68,119.75999999999999,151.76,0,32]}],[{"kind":"cdDrawLine","args":[122.32,94.88,141.51999999999998,94.88,2,2]}],[{"kind":"cdDrawLine","args":[141.51999999999998,94.88,138.32,151.76,22,32]}],[{"kind":"cdDrawCurve","args":[115.28,159.66,99.92,177.83,80.72,188.1,0,7]}],[{"kind":"cdDrawCurve","args":[142.8,158.07999999999998,161.36,167.56,172.24,183.36,7,8]}],[{"kind":"cdDrawLine","args":[125.52000000000001,50.64,122.32,94.88,0,313]}],[{"kind":"cdDrawLine","args":[124.88,65.65,147.92000000000002,65.65,2,200]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,23);assert.equal(proof.groups.length,23)
  assert.deepEqual(trace.map(r=>r.map(c=>({kind:c.kind,args:c.args}))),ORIGINAL)
  for(let i=0;i<trace.length;i++)assert.deepEqual(trace[i].flatMap(c=>c.polygons),proof.groups[i].polygons)
  const segment=(polygons,direction,weight)=>{
    const points=polygons.flat(),xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
    assert(points.length>0&&points.every(p=>p.off===0))
    const normalized=polygons.map(p=>{const area=p.reduce((n,v,i)=>{const q=p[(i+1)%p.length];return n+v.x*q.y-q.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
    return {outline:normalized.map(p=>p.map((v,i)=>`${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight:Math.round(weight*1e6)/1e6}
  }
  const terminal = trace[3][1]
  assert.equal(terminal.kind,'cdDrawCurve')
  assert.deepEqual(terminal.args,[56.23400568718577,170.64527906333177,52.7,180,42.7,180,2,314])
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
    if(withoutTerminalHook){assert.deepEqual(indices,[2,3]);assert.deepEqual(calls.at(-1).polygons.pop(),hook)}
    for(let i=1;i<calls.length;i++){const c=calls[i-1];assert.deepEqual(c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawBezier'?6:4,c.kind==='cdDrawLine'?4:c.kind==='cdDrawBezier'?8:6),calls[i].args.slice(0,2),'All merged original trajectories must be continuous')}
    const pieces=calls.map(c=>{const a=c.args;if(c.kind==='cdDrawBezier')return {...segment(c.polygons,'curve',Math.hypot(a[6]-a[0],a[7]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`,revealWidth:14};if(c.kind==='cdDrawCurve')return {...segment(c.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
      assert.equal(c.kind,'cdDrawLine');const p=segment(c.polygons,a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve',Math.hypot(a[2]-a[0],a[3]-a[1])/2);return p.direction==='curve'?{...p,revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2}`,revealWidth:14}:p})
    if(pieces.length===1)return pieces[0]
    const a=calls[0].args
    return {outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:`M${a[0]/2} ${a[1]/2} ${calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?`L${v[2]/2} ${v[3]/2}`:c.kind==='cdDrawBezier'?`C${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2} ${v[6]/2} ${v[7]/2}`:`Q${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2}`}).join(' ')}`,revealWidth:14}
  }
  return sourceGroups.map(indices=>JSON.stringify(indices)==="[2,3]" ? [compile(indices,true),segment([hook],'left',jump/2)] : [compile(indices)])
}
