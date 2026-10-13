import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'
export const sourceRoot = 'u79de'
const proofHash783=v=>createHash('sha256').update(JSON.stringify(v)).digest('hex')
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2],[3],[4],[5],[6,7],[8],[9],[10]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[74.39,23,56.49,34,14.425,45,0,7]}],[{"kind":"cdDrawLine","args":[12.635,76,81.55,76,0,0]}],[{"kind":"cdDrawLine","args":[48.435,35,48.435,186,32,0]}],[{"kind":"cdDrawCurve","args":[45.75,76,36.8,125,12.635,159,132,7]}],[{"kind":"cdDrawCurve","args":[50.225,98,67.23,106,77.075,121,7,8]}],[{"kind":"cdDrawLine","args":[95.715,62,95.715,169,12,13]}],[{"kind":"cdDrawLine","args":[95.715,62,175.285,62,2,2]}],[{"kind":"cdDrawLine","args":[175.285,62,175.285,169,22,23]}],[{"kind":"cdDrawLine","args":[95.715,113,175.285,113,2,2]}],[{"kind":"cdDrawLine","args":[135.5,15,135.5,169,0,32]}],[{"kind":"cdDrawLine","args":[95.715,169,175.285,169,2,2]}]]
export function compileProgressive(trace, proof) {
  assert.equal(proofHash783(proof.groups),'a7731f39ce0a2fd73239bf17e2c4c7538f3099f1711c403f69fc5582fdb6738b')
  assert.equal(proofHash783(proof.trace),'64624b6ff6511acf628182b3a6566efc73c97d9553a3ab09516a355f0f384226')
  assert.equal(proofHash783(proof.defaults),'37614aae6c1bc5591eef0938f89a6ba40b887d805b71ce9054e69f0615dd59dc')
  assert.equal(proofHash783(proof.engineHashes),'7104660dcf74e03b94564089b578c315cfb8d3323b8911019847950c971d2da4')
  assert.equal(proof.engineRevision,'49232bac0348fe815f4200d4116ab7917e0db47f')
  assert.equal(trace.length,11);assert.equal(proof.groups.length,11)
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
  const hooks=new Map([])
  // Bound this original line fold by its own emitted polygon vertices only.
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
    if(JSON.stringify(indices)==='[6,7]') masks[0].revealWidth=originalLineTipWidth(indices.flatMap(raw=>trace[raw]));
    return masks;
  })
}
