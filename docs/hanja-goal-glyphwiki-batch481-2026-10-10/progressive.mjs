import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[2,3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15]]
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[27.025,20,46.4,27,54.925,41,7,8]}],[{"kind":"cdDrawCurve","args":[12.3,66,33.225,73,40.975,87,7,8]}],[{"kind":"cdDrawCurve","args":[13.85,133,40.975,142,37.875,184,7,8]}],[{"kind":"cdDrawCurve","args":[34,150,37.1,138,69.65,67,32,7]}],[{"kind":"cdDrawLine","args":[65.3,37,187.7,37,0,0]}],[{"kind":"cdDrawLine","args":[103.55,15,103.55,59,0,213]}],[{"kind":"cdDrawLine","args":[149.45,15,149.45,59,0,223]}],[{"kind":"cdDrawLine","args":[103.55,59,149.45,59,2,2]}],[{"kind":"cdDrawLine","args":[84.425,82,84.425,110,12,213]}],[{"kind":"cdDrawLine","args":[84.425,82,168.575,82,2,2]}],[{"kind":"cdDrawLine","args":[168.575,82,168.575,110,22,223]}],[{"kind":"cdDrawLine","args":[84.425,110,168.575,110,2,2]}],[{"kind":"cdDrawLine","args":[72.95,132,180.05,132,0,100]}],[{"kind":"cdDrawLine","args":[126.5,59,126.5,182,32,32]}],[{"kind":"cdDrawLine","args":[80.6,157,172.4,157,0,0]}],[{"kind":"cdDrawLine","args":[65.3,182,187.7,182,0,0]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,16);assert.equal(proof.groups.length,16)
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
    // Unapproved source preview only: disconnected pieces remain independent.
    const pieces=calls.map(c=>{const a=c.args;if(c.kind==='cdDrawCurve')return {...segment(c.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
      assert.equal(c.kind,'cdDrawLine');const p=segment(c.polygons,a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve',Math.hypot(a[2]-a[0],a[3]-a[1])/2);return p.direction==='curve'?{...p,revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2}`,revealWidth:14}:p})
    return pieces
  }
  return sourceGroups.map(indices=>compile(indices))
}
