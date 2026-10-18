import assert from'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
export{renderProgressive}from'../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const read=f=>readFileSync(new URL(f,import.meta.url)),obj=f=>JSON.parse(read(f)),sha=v=>createHash('sha256').update(v).digest('hex'),config=obj('config.json'),counts=new Map(),last=new Map()
export const nativeApproval=false,runtimeApplied=false
export function fixedTargets(){return structuredClone(config.targets)}
export function sourceCompileCallCount(){return 0}
export function candidateDerivationCount(k){return counts.get(String(k))??0}
export function lastCompilation(k){return last.get(String(k))}
export function guards(){const p=obj('preparation.json');assert.equal(sha(read('config.json')),p.configSHA256);for(const t of Object.values(config.targets))for(const[f,h]of Object.entries(t.inputSHA256))assert.equal(sha(read(f)),h,f);for(const[f,h]of Object.entries(p.newFilesSHA256))assert.equal(sha(read(f)),h,f)}
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })
const round=x=>Math.round(x*1e6)/1e6
function existingTail(t,proof){const trace=proof.trace;
  const terminalUpTail = (indices) => {
    const terminal = trace[indices.at(-1)].at(-1)
    assert.equal(terminal.kind, 'cdDrawLine')
    const [x1, y1, x2, y2, ta1, ta2] = terminal.args
    assert.equal(y1, y2); assert(x1 < x2)
    assert.equal(ta1 % 1000, 6); assert.equal(ta2 % 100, 5)
    const opt1 = Math.floor(ta1 / 1000)
    const width = proof.defaults.kMinWidthT - opt1 / 2
    const jump = proof.defaults.kWidth * (4 * (1 - opt1 / proof.defaults.kAdjustMageStep) + 1)
    assert(width > 0 && jump > 0)
    const polygon = [point(x2, y2 - width), point(x2 + 2, y2 - width - jump), point(x2, y2 - width - jump), point(x2 - width, y2 - width)]
    assert.deepEqual(terminal.polygons.at(-1), polygon, 'Pinned original terminal5 upward-tail polygon identity')
    return { polygon, jump, direction: 'up' }
  }
  const terminalLeftTail = (indices) => {
    const terminal = trace[indices.at(-1)].at(-1)
    assert.equal(terminal.kind, 'cdDrawCurve')
    const [x1, y1, cx, cy, x2, y2, ta1, ta2] = terminal.args
    assert.equal(cy, y2); assert(cx > x2)
    assert.equal(ta2 % 100, 14)
    const opt1 = Math.floor(ta1 / 1000), opt2 = Math.floor((ta2 % 1000) / 100)
    const width = proof.defaults.kMinWidthT - opt1 / 2
    const jump = proof.defaults.kWidth * 4 * Math.min(1 - opt2 / 10, (width / proof.defaults.kMinWidthT) ** 3) * (width > 6 ? 6 / width : 1)
    assert(width > 0 && jump > 0)
    const polygon = [point(x2, y2), point(x2, y2 - width), point(x2 - jump, y2 - width), point(x2 - jump, y2 - width * 0.5)]
    assert.deepEqual(terminal.polygons.at(-1), polygon, 'Pinned original terminal14 left-tail polygon identity')
    return { polygon, jump, direction: 'left' }
  }
  return t.tailDirection==='up'?terminalUpTail(t.rawIndices):terminalLeftTail(t.rawIndices)
}
function eligible(t,proof){assert.deepEqual(t.sourceGroups[t.pen-1],t.rawIndices);const calls=t.rawIndices.flatMap(i=>proof.trace[i]);assert.deepEqual(calls.map(c=>({kind:c.kind,args:c.args})),t.exactCalls);assert(calls.length>0);for(const c of calls)for(const p of c.polygons){assert(p.length>=3);assert(p.every(q=>q.off===0&&Number.isFinite(q.x)&&Number.isFinite(q.y)))}return existingTail(t,proof)}
const bounds=polys=>{const a=polys.flat();assert(a.length);return[Math.min(...a.map(q=>q.x/2)),Math.min(...a.map(q=>q.y/2)),Math.max(...a.map(q=>q.x/2)),Math.max(...a.map(q=>q.y/2))]}
function derive(t,baseline,proof,tail){assert.equal(baseline.length,t.pens);assert.equal(baseline.flat().length,t.masks);const old=baseline[t.pen-1];assert.equal(old.length,1);const body=old[0],calls=t.rawIndices.flatMap(i=>proof.trace[i]),polygons=calls.flatMap(c=>c.polygons),sourceTail=polygons.at(-1),chunks=body.outline.match(/M[^Z]* Z/g);assert.equal(chunks.length,polygons.length);assert.deepEqual(sourceTail,tail.polygon);assert.deepEqual(body.bounds,bounds(polygons));assert.equal(body.direction,'curve');assert.equal(body.revealWidth,14);const kept=polygons.slice(0,-1),withoutTail={...body,outline:chunks.slice(0,-1).join(' '),bounds:bounds(kept)},terminal={outline:chunks.at(-1),bounds:bounds([sourceTail]),direction:tail.direction,weight:round(tail.jump/2)};assert.equal(withoutTail.revealPath,body.revealPath);assert.equal(withoutTail.revealWidth,body.revealWidth);assert.equal(withoutTail.weight,body.weight);assert(terminal.weight>0);assert.equal(withoutTail.outline+' '+terminal.outline,body.outline);const out=baseline.slice();out[t.pen-1]=[withoutTail,terminal];for(let i=0;i<out.length;i++)if(i!==t.pen-1)assert.equal(out[i],baseline[i]);assert.equal(out.flat().length,t.masks+1);assert.equal(out.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),t.polygons);return out}

function boundedVh(t,baseline,proof){
 const s=t.vh;assert.equal(s.pen,11);assert.deepEqual(s.rawIndices,[10,11]);assert.deepEqual(t.sourceGroups[s.pen-1],s.rawIndices)
 const calls=s.rawIndices.flatMap(i=>proof.trace[i]);assert.equal(calls.length,2);assert.deepEqual(calls.map(c=>({kind:c.kind,args:c.args})),s.exactCalls)
 const[v,h]=calls;assert.equal(v.kind,'cdDrawLine');assert.equal(h.kind,'cdDrawLine');assert.deepEqual([v.polygons.length,h.polygons.length],s.polygonsCounts);assert.deepEqual([v,h].map(c=>sha(JSON.stringify(c.polygons))),s.polygonsSHA256)
 assert.deepEqual(v.args.slice(2,4),h.args.slice(0,2));assert(v.args[2]<v.args[0]&&v.args[3]>v.args[1]);assert.equal(v.args[4],12);assert.equal(v.args[5],13);assert.equal(h.args[1],h.args[3]);assert(h.args[0]<h.args[2]);assert.equal(h.args[4],2);assert.equal(h.args[5],200)
 const q=v.polygons[0];assert.equal(q.length,4);assert(q.every(p=>p.off===0&&Number.isInteger(p.x*10)&&Number.isInteger(p.y*10)))
 const cross=(a,b,p)=>(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0]),qi=q.map(p=>[Math.round(p.x*10),Math.round(p.y*10)])
 const turns=qi.map((a,i)=>cross(a,qi[(i+1)%4],qi[(i+2)%4]));assert(turns.every(n=>n>0)||turns.every(n=>n<0),'Only pinned convex V quadrilateral')
 const bodyH=h.polygons[0];assert.equal(bodyH.length,4);const leftEdge=[bodyH[0],bodyH[3]];assert.equal(leftEdge[0].x,leftEdge[1].x)
 for(const p of leftEdge){const point=[Math.round(p.x*10),Math.round(p.y*10)],c=qi.map((a,i)=>cross(a,qi[(i+1)%4],point));assert(c.every(n=>n>0)||c.every(n=>n<0),'H initial edge strictly inside completed V')}
 assert(h.polygons[1].every(p=>p.x>leftEdge[0].x),'End cap cannot be initial H stamp')
 const old=baseline[s.pen-1];assert.equal(old.length,1);const mask=old[0],chunks=mask.outline.match(/M[^Z]* Z/g);assert.equal(chunks.length,3);assert.equal(mask.direction,'curve');assert.equal(mask.revealWidth,14)
 const outline=polygons=>polygons.map(p=>{const area=p.reduce((a,v,i)=>{const z=p[(i+1)%p.length];return a+v.x*z.y-z.x*v.y},0);assert(area!==0);const a=area<0?[p[0],...p.slice(1).reverse()]:p;return a.map((v,i)=>(i?'L':'M')+v.x/2+' '+v.y/2).join(' ')+' Z'}).join(' ')
 assert.equal(chunks[0],outline(v.polygons));assert.equal(chunks.slice(1).join(' '),outline(h.polygons));assert.deepEqual(mask.bounds,bounds(calls.flatMap(c=>c.polygons)))
 const weights=calls.map(c=>round(Math.hypot(c.args[2]-c.args[0],c.args[3]-c.args[1])/2));assert.deepEqual(weights,s.weights);assert.equal(round(weights[0]+weights[1]),mask.weight,'Original per-call weights sum to old pen weight')
 const pieces=[{outline:chunks[0],bounds:bounds(v.polygons),direction:'down',weight:weights[0]},{outline:chunks.slice(1).join(' '),bounds:bounds(h.polygons),direction:'right',weight:weights[1]}]
 assert.deepEqual(pieces.map(m=>m.bounds),s.bounds);assert.deepEqual(pieces.map(m=>m.direction),s.directions);assert.equal(pieces.map(m=>m.outline).join(' '),mask.outline)
 const out=baseline.slice();out[s.pen-1]=pieces;for(let i=0;i<out.length;i++)if(i!==s.pen-1)assert.equal(out[i],baseline[i]);return out
}
export function compileProgressive(...args){
 assert.equal(args.length,3,'Exactly3 explicit arguments');guards();const[trace,proof,id]=args,t=Object.values(config.targets).find(t=>t.root===id?.root);assert(t,'Exact selected root required');assert.deepEqual(id,t.identity);assert.deepEqual(Object.keys(proof).sort(),t.proofKeys);assert.equal(sha(JSON.stringify(proof)),t.fullProofSHA256);assert.deepEqual(trace,proof.trace)
 const header=obj(t.sourceDirectory+'/'+t.headerFile),body=obj(t.sourceDirectory+'/'+t.proofFile);assert.equal(sha(read(t.sourceDirectory+'/'+t.proofFile)),id.fileSHA256);assert.deepEqual(Object.keys(header).sort(),['defaults','engineHashes','engineRevision','groups']);for(const k of Object.keys(header))assert.deepEqual(header[k],body[k]);assert.deepEqual(body,proof);assert.deepEqual(obj(t.sourceDirectory+'/'+t.traceFile),proof.trace)
 const before=JSON.stringify(proof),baseline=obj(t.cachedBaseline.file)[t.cachedBaseline.key].baseline;assert.equal(sha(JSON.stringify(baseline)),t.cachedBaseline.baselineSHA256);assert.equal(baseline.length,t.pens);assert.equal(baseline.flat().length,t.masks)
 const beforeBaseline=JSON.stringify(baseline),tail=eligible(t,proof);counts.set(t.key,candidateDerivationCount(t.key)+1)
 const vh=boundedVh(t,baseline,proof),left=derive(t,baseline,proof,tail),cachedLeft=obj(t.cachedBaseline.file)[t.key].strokes;assert.deepEqual(left,cachedLeft);assert.equal(sha(JSON.stringify(left)),t.cachedBaseline.leftDerivedSHA256)
 const strokes=baseline.slice();strokes[t.vh.pen-1]=vh[t.vh.pen-1];strokes[t.pen-1]=left[t.pen-1];for(let i=0;i<strokes.length;i++)if(![t.vh.pen-1,t.pen-1].includes(i))assert.equal(strokes[i],baseline[i]);assert.equal(strokes.length,t.pens);assert.equal(strokes.flat().length,t.masks+2);assert.equal(strokes.flat().reduce((s,m)=>s+(m.outline.match(/M/g)||[]).length,0),t.polygons);assert.equal(JSON.stringify(proof),before);assert.equal(JSON.stringify(baseline),beforeBaseline)
 last.set(t.key,{baseline,strokes,independent:[vh,left],sourceCompilations:0,displayPolicyChanged:true});return strokes
}
export function compileSourceWhole(...args){assert.equal(args.length,4,'Exactly4 explicit arguments');const[root,trace,proof,id]=args;assert.equal(root,id?.root);return compileProgressive(trace,proof,id)}
