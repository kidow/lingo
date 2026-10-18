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
function tailEligible(t,proof){assert.deepEqual(t.sourceGroups[t.pen-1],t.rawIndices);const calls=t.rawIndices.flatMap(i=>proof.trace[i]);assert.deepEqual(calls.map(c=>({kind:c.kind,args:c.args})),t.exactCalls);assert(calls.length>0);for(const c of calls)for(const p of c.polygons){assert(p.length>=3);assert(p.every(q=>q.off===0&&Number.isFinite(q.x)&&Number.isFinite(q.y)))}return existingTail(t,proof)}
const bounds=polys=>{const a=polys.flat();assert(a.length);return[Math.min(...a.map(q=>q.x/2)),Math.min(...a.map(q=>q.y/2)),Math.max(...a.map(q=>q.x/2)),Math.max(...a.map(q=>q.y/2))]}
function tailDerive(t,baseline,proof,tail){assert.equal(baseline.length,t.pens);assert.equal(baseline.flat().length,t.masks);const old=baseline[t.pen-1];assert.equal(old.length,1);const body=old[0],calls=t.rawIndices.flatMap(i=>proof.trace[i]),polygons=calls.flatMap(c=>c.polygons),sourceTail=polygons.at(-1),chunks=body.outline.match(/M[^Z]* Z/g);assert.equal(chunks.length,polygons.length);assert.deepEqual(sourceTail,tail.polygon);assert.deepEqual(body.bounds,bounds(polygons));assert.equal(body.direction,'curve');assert.equal(body.revealWidth,14);const kept=polygons.slice(0,-1),withoutTail={...body,outline:chunks.slice(0,-1).join(' '),bounds:bounds(kept)},terminal={outline:chunks.at(-1),bounds:bounds([sourceTail]),direction:tail.direction,weight:round(tail.jump/2)};assert.equal(withoutTail.revealPath,body.revealPath);assert.equal(withoutTail.revealWidth,body.revealWidth);assert.equal(withoutTail.weight,body.weight);assert(terminal.weight>0);assert.equal(withoutTail.outline+' '+terminal.outline,body.outline);const out=baseline.slice();out[t.pen-1]=[withoutTail,terminal];for(let i=0;i<out.length;i++)if(i!==t.pen-1)assert.equal(out[i],baseline[i]);assert.equal(out.flat().length,t.masks+1);assert.equal(out.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),t.polygons);return out}
function eligible(t,proof){const indices=t.sourceGroups[t.pen-1];assert.deepEqual(indices,t.rawIndices);assert.equal(indices.length,2);const calls=indices.flatMap(i=>proof.trace[i]);assert.equal(calls.length,2);assert.deepEqual(calls.map(c=>({kind:c.kind,args:c.args})),t.exactCalls);const[h,v]=calls;assert.equal(h.kind,'cdDrawLine');assert.equal(v.kind,'cdDrawLine');assert.equal(h.args.length,6);assert.equal(v.args.length,6);assert.equal(h.args[1],h.args[3]);assert(h.args[2]>h.args[0]);assert.deepEqual(h.args.slice(2,4),v.args.slice(0,2));assert.equal(v.args[0],v.args[2]);assert(v.args[3]>v.args[1]);assert.equal(h.args[5]%100,2);assert.equal(v.args[4]%100,22);assert.equal(v.args[5]%100,23);assert.equal(h.polygons.length,1);assert.equal(v.polygons.length,2);for(const c of calls)for(const p of c.polygons){assert(p.length>=3);assert(p.every(q=>q.off===0&&Number.isFinite(q.x)&&Number.isFinite(q.y)));assert.notEqual(p.reduce((a,q,i)=>{const r=p[(i+1)%p.length];return a+q.x*r.y-r.x*q.y},0),0)}return calls}
function derive(t,baseline,proof){const[h,v]=eligible(t,proof),old=baseline[t.pen-1];assert.equal(old.length,1);const body=old[0],chunks=body.outline.match(/M[^Z]* Z/g);assert.equal(chunks.length,3);assert.equal(body.direction,'curve');assert.equal(body.revealWidth,14);const path='M'+h.args[0]/2+' '+h.args[1]/2+' L'+h.args[2]/2+' '+h.args[3]/2+' L'+v.args[2]/2+' '+v.args[3]/2;assert.equal(body.revealPath,path,'Only exact existing threepoint H then V guide is eligible');const segment=(c,outline,direction)=>{const p=c.polygons.flat(),xs=p.map(q=>q.x/2),ys=p.map(q=>q.y/2);return{outline,bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight:round(Math.hypot(c.args[2]-c.args[0],c.args[3]-c.args[1])/2)}};const horizontal=segment(h,chunks[0],'right'),vertical=segment(v,chunks.slice(1).join(' '),'down');assert(horizontal.weight>0&&vertical.weight>0);assert.equal(round(horizontal.weight+vertical.weight),body.weight);assert.equal(horizontal.outline+' '+vertical.outline,body.outline);const result=baseline.slice();result[t.pen-1]=[horizontal,vertical];for(let i=0;i<baseline.length;i++)if(i!==t.pen-1)assert.equal(result[i],baseline[i]);assert.equal(result.length,t.pens);assert.equal(result.flat().length,t.masks+1);assert.equal(result.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),t.polygons);return result}
export function compileProgressive(...args){
 assert.equal(args.length,3,'Exactly3 explicit arguments');guards();const[trace,proof,id]=args,t=Object.values(config.targets).find(v=>v.root===id?.root);assert(t,'Exact selected root required');assert.deepEqual(id,t.identity);assert.deepEqual(Object.keys(proof).sort(),t.proofKeys);assert.equal(sha(JSON.stringify(proof)),t.fullProofSHA256);assert.deepEqual(trace,proof.trace);
 const header=obj(t.sourceDirectory+'/'+t.headerFile),b=obj(t.sourceDirectory+'/'+t.proofFile);assert.equal(sha(read(t.sourceDirectory+'/'+t.proofFile)),id.fileSHA256);assert.deepEqual(Object.keys(header).sort(),t.proofKeys);assert.deepEqual(Object.keys(b).sort(),['defaults','groups','trace']);for(const k of['defaults','groups','trace'])assert.deepEqual(header[k],b[k]);assert.deepEqual(proof,{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...b});assert.deepEqual(obj(t.sourceDirectory+'/'+t.traceFile),proof.trace);
 const baseline=obj(t.cachedBaseline.file)[t.cachedBaseline.key].baseline;assert.equal(sha(JSON.stringify(baseline)),t.cachedBaseline.baselineSHA256);assert.equal(baseline.length,t.pens);assert.equal(baseline.flat().length,t.masks);const before=JSON.stringify(proof),beforeBaseline=JSON.stringify(baseline),upSpecs=t.upTargets.map(v=>({...t,...v}));assert.deepEqual(upSpecs.map(v=>v.pen),[11,19]);assert.equal(t.cardinal.pen,15);assert.equal(new Set([t.cardinal.pen,...upSpecs.map(v=>v.pen)]).size,3);const tails=upSpecs.map(v=>tailEligible(v,proof));
 counts.set(t.key,candidateDerivationCount(t.key)+1);const cardinal=derive({...t,...t.cardinal},baseline,proof),up=upSpecs.map((v,i)=>tailDerive(v,baseline,proof,tails[i])),independent=[cardinal,...up],strokes=baseline.slice(),upOnly=baseline.slice();strokes[t.cardinal.pen-1]=cardinal[t.cardinal.pen-1];for(let i=0;i<upSpecs.length;i++){const pen=upSpecs[i].pen-1;strokes[pen]=up[i][pen];upOnly[pen]=up[i][pen]}assert.equal(sha(JSON.stringify(upOnly)),t.cachedBaseline.upDerivedSHA256);
 for(let i=0;i<strokes.length;i++)if(![t.cardinal.pen,...upSpecs.map(v=>v.pen)].includes(i+1))assert.equal(strokes[i],baseline[i]);assert.equal(strokes.length,t.pens);assert.equal(strokes.flat().length,t.masks+3);assert.equal(strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),t.polygons);assert.equal(JSON.stringify(proof),before);assert.equal(JSON.stringify(baseline),beforeBaseline);assert.equal(sourceCompileCallCount(t.key),0);last.set(t.key,{baseline,strokes,independent,upOnly,sourceCompilations:0,displayPolicyChanged:true});return strokes
}
export function compileSourceWhole(...args){assert.equal(args.length,4,'Exactly4 explicit arguments');const[root,trace,proof,id]=args;assert.equal(root,id?.root);return compileProgressive(trace,proof,id)}
