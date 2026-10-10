import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[10],[11],[12],[13],[2],[3,4],[5],[6],[7,8],[9],[14,15],[16],[17],[18],[19,20],[21],[22,23],[24],[25],[26]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[100.5,11.92,100.5,34.86,0,32]}],[{"kind":"cdDrawLine","args":[19.325,34.86,181.675,34.86,0,100]}],[{"kind":"cdDrawLine","args":[73,49.7875,73,113.164,2012,32]}],[{"kind":"cdDrawLine","args":[73,49.7875,127,49.7875,2,2]}],[{"kind":"cdDrawLine","args":[127,49.7875,127,113.164,2022,32]}],[{"kind":"cdDrawLine","args":[82,66.3205,118,66.3205,0,100]}],[{"kind":"cdDrawLine","args":[89.56,79.64793499999999,89.56,97.99956499999999,3012,313]}],[{"kind":"cdDrawLine","args":[89.56,79.64793499999999,110.44,79.64793499999999,2,2]}],[{"kind":"cdDrawLine","args":[110.44,79.64793499999999,110.44,97.99956499999999,3022,323]}],[{"kind":"cdDrawLine","args":[89.56,97.99956499999999,110.44,97.99956499999999,2,2]}],[{"kind":"cdDrawCurve","args":[60,47.032,50,51.6245,32,57.13549999999999,0,7]}],[{"kind":"cdDrawLine","args":[32,57.13549999999999,34,113.164,12,32]}],[{"kind":"cdDrawLine","args":[33,73.6685,64,73.6685,2,200]}],[{"kind":"cdDrawLine","args":[33,92.0385,64,92.0385,2,200]}],[{"kind":"cdDrawLine","args":[140,52.543000000000006,168,52.543000000000006,0,2]}],[{"kind":"cdDrawLine","args":[168,52.543000000000006,166,113.164,22,32]}],[{"kind":"cdDrawLine","args":[136,73.6685,167,73.6685,0,2]}],[{"kind":"cdDrawLine","args":[136,92.0385,167,92.0385,0,2]}],[{"kind":"cdDrawCurve","args":[24,104.8975,25,126.94149999999999,16,137.04500000000002,7,8]}],[{"kind":"cdDrawLine","args":[26,113.164,178,113.164,2,2]}],[{"kind":"cdDrawCurve","args":[178,113.164,174,120.512,162,136.1265,22,7]}],[{"kind":"cdDrawLine","args":[55,127.647075,55,180.677925,12,32]}],[{"kind":"cdDrawLine","args":[55,127.647075,145,127.647075,2,2]}],[{"kind":"cdDrawLine","args":[145,127.647075,145,180.677925,22,32]}],[{"kind":"cdDrawLine","args":[55,145.081875,145,145.081875,2,2]}],[{"kind":"cdDrawLine","args":[55,162.516675,145,162.516675,2,2]}],[{"kind":"cdDrawLine","args":[14,180.677925,186,180.677925,0,0]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,27);assert.equal(proof.groups.length,27)
  assert.deepEqual(trace.map(r=>r.map(c=>({kind:c.kind,args:c.args}))),ORIGINAL)
  for(let i=0;i<trace.length;i++)assert.deepEqual(trace[i].flatMap(c=>c.polygons),proof.groups[i].polygons)
  const segment=(polygons,direction,weight)=>{
    const points=polygons.flat(),xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
    assert(points.length>0&&points.every(p=>p.off===0))
    const normalized=polygons.map(p=>{const area=p.reduce((n,v,i)=>{const q=p[(i+1)%p.length];return n+v.x*q.y-q.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
    return {outline:normalized.map(p=>p.map((v,i)=>`${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight:Math.round(weight*1e6)/1e6}
  }
  const compile=indices=>{
    const calls=indices.flatMap(i=>trace[i])
    for(let i=1;i<calls.length;i++){const c=calls[i-1];assert.deepEqual(c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawBezier'?6:4,c.kind==='cdDrawLine'?4:c.kind==='cdDrawBezier'?8:6),calls[i].args.slice(0,2),'All merged original trajectories must be continuous')}
    const pieces=calls.map(c=>{const a=c.args;if(c.kind==='cdDrawBezier')return {...segment(c.polygons,'curve',Math.hypot(a[6]-a[0],a[7]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`,revealWidth:14};if(c.kind==='cdDrawCurve')return {...segment(c.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
      assert.equal(c.kind,'cdDrawLine');const p=segment(c.polygons,a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve',Math.hypot(a[2]-a[0],a[3]-a[1])/2);return p.direction==='curve'?{...p,revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2}`,revealWidth:14}:p})
    if(pieces.length===1)return pieces[0]
    const a=calls[0].args
    return {outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:`M${a[0]/2} ${a[1]/2} ${calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?`L${v[2]/2} ${v[3]/2}`:c.kind==='cdDrawBezier'?`C${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2} ${v[6]/2} ${v[7]/2}`:`Q${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2}`}).join(' ')}`,revealWidth:14}
  }
  return sourceGroups.map(indices=>[compile(indices)])
}
