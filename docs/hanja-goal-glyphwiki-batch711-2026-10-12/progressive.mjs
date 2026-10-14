import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = [[0],[1],[3],[2],[4,5],[6],[7],[8],[9,10],[11]]
const ORIGINAL = [[{"kind":"cdDrawLine","args":[16.415,39.22,93.77,39.22,0,100]}],[{"kind":"cdDrawLine","args":[65.12,13.74,65.12,63.72,0,200]}],[{"kind":"cdDrawLine","args":[133.88,13.74,133.88,63.72,0,200]}],[{"kind":"cdDrawLine","args":[105.23,39.22,182.585,39.22,0,0]}],[{"kind":"cdDrawLine","args":[61,67.93,35,160.58,0,100]}],[{"kind":"cdDrawCurve","args":[40,142.05,77,148.59,96,175.84,7,8]}],[{"kind":"cdDrawCurve","args":[95,90.82,87,168.21,21,188.92,22,7]}],[{"kind":"cdDrawLine","args":[17,90.82,95,90.82,2,2]}],[{"kind":"cdDrawLine","args":[121,88.64,121,164.94,12,13]}],[{"kind":"cdDrawLine","args":[121,88.64,172,88.64,2,2]}],[{"kind":"cdDrawLine","args":[172,88.64,172,164.94,22,23]}],[{"kind":"cdDrawLine","args":[121,164.94,172,164.94,2,2]}]]
export function compileProgressive(trace, proof) {
  assert.equal(trace.length,12);assert.equal(proof.groups.length,12)
  assert.deepEqual(trace.map(r=>r.map(c=>({kind:c.kind,args:c.args}))),ORIGINAL)
  for(let i=0;i<trace.length;i++)assert.deepEqual(trace[i].flatMap(c=>c.polygons),proof.groups[i].polygons)
  const segment=(polygons,direction,weight)=>{
    const points=polygons.flat(),xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
    assert(points.length>0&&points.every(p=>p.off===0))
    const normalized=polygons.map(p=>{const area=p.reduce((n,v,i)=>{const q=p[(i+1)%p.length];return n+v.x*q.y-q.x*v.y},0);assert(area!==0);return area<0?[p[0],...p.slice(1).reverse()]:p})
    return {outline:normalized.map(p=>p.map((v,i)=>`${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight:Math.round(weight*1e6)/1e6}
  }
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
  const compile=(indices)=>{
    const exceptions=[{indices:[4,5],end:[35,160.58],start:[40,142.05],point:[43.5,144]}]
    const calls=indices.flatMap(i=>trace[i]).map(c=>({...c,polygons:c.polygons.slice()}))
  {const calls=indices.flatMap(i=>trace[i]);for(let i=1;i<calls.length;i++){const prev=calls[i-1],end=prev.args.slice(prev.kind==='cdDrawLine'?2:prev.kind==='cdDrawBezier'?6:4,prev.kind==='cdDrawLine'?4:prev.kind==='cdDrawBezier'?8:6),start=calls[i].args.slice(0,2),exception=exceptions.find(e=>JSON.stringify(e.indices)===JSON.stringify(indices));if(exception){assert.equal(i,1);assert.deepEqual(end,exception.end);assert.deepEqual(start,exception.start);const inside=poly=>{const p=exception.point;let hit=false;for(let j=0,k=poly.length-1;j<poly.length;k=j++){const a=poly[j],b=poly[k];if((a.y>p[1])!==(b.y>p[1])&&p[0]<(b.x-a.x)*(p[1]-a.y)/(b.y-a.y)+a.x)hit=!hit;}return hit;};assert(prev.polygons.some(inside)&&calls[i].polygons.some(inside),'original filled contours must overlap');}else assert.deepEqual(end,start,'all other original pen trajectories must be continuous');}}
    const pieces=calls.map(c=>{const a=c.args;if(c.kind==='cdDrawBezier')return {...segment(c.polygons,'curve',Math.hypot(a[6]-a[0],a[7]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`,revealWidth:14};if(c.kind==='cdDrawCurve')return {...segment(c.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
      assert.equal(c.kind,'cdDrawLine');const p=segment(c.polygons,a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve',Math.hypot(a[2]-a[0],a[3]-a[1])/2);return p.direction==='curve'?{...p,revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2}`,revealWidth:14}:p})
    if(JSON.stringify(indices)==="[4,5]")return pieces
    if(pieces.length===1)return pieces[0]
    const a=calls[0].args
    return {outline:pieces.map(p=>p.outline).join(' '),bounds:[Math.min(...pieces.map(p=>p.bounds[0])),Math.min(...pieces.map(p=>p.bounds[1])),Math.max(...pieces.map(p=>p.bounds[2])),Math.max(...pieces.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(pieces.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:`M${a[0]/2} ${a[1]/2} ${calls.map(c=>{const v=c.args;return c.kind==='cdDrawLine'?`L${v[2]/2} ${v[3]/2}`:c.kind==='cdDrawBezier'?`C${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2} ${v[6]/2} ${v[7]/2}`:`Q${v[2]/2} ${v[3]/2} ${v[4]/2} ${v[5]/2}`}).join(' ')}`,revealWidth:14}
  }
  return sourceGroups.map(indices=>{
    const p=compile(indices);
    const masks=Array.isArray(p)?p:[p];
    if(JSON.stringify(indices)==='[9,10]') masks[0].revealWidth=originalLineTipWidth(indices.flatMap(raw=>trace[raw]));
    return masks;
  })
}
