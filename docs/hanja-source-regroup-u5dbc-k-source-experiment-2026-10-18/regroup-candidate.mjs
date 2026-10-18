import assert from'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import*as original from'../hanja-goal-glyphwiki-batch1090-2026-10-13/progressive.mjs'
export{renderProgressive}from'../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const read=f=>readFileSync(new URL(f,import.meta.url)),obj=f=>JSON.parse(read(f)),sha=x=>createHash('sha256').update(x).digest('hex'),t=obj('config.json').targets['1090'],fixture=obj('fixtures.json')['1090'];let compilerCalls=0
export const nativeApproval=false,runtimeApplied=false
export const sourceGroups=t.sourceGroups,originalSourceGroups=t.originalSourceGroups
export function fixedTargets(){return structuredClone(obj('config.json').targets)}
export function sourceCompileCallCount(){return compilerCalls}
export function originalWholeCompilerCallCount(){return 0}
export function guards(){const p=obj('preparation.json');assert.equal(sha(read('config.json')),p.configSHA256);for(const[f,h]of Object.entries(t.inputSHA256))assert.equal(sha(read(f)),h,f);for(const[f,h]of Object.entries(p.newFilesSHA256))assert.equal(sha(read(f)),h,f);const prior=obj(t.priorFixtureFile)[t.priorFixtureKey];assert.deepEqual(fixture.sourceBaseline,prior.baseline);assert.deepEqual(fixture.baseline,prior.strokes);assert.equal(sha(JSON.stringify(fixture.baseline)),t.baselineSHA256);assert.equal(sha(JSON.stringify(fixture.sourceBaseline)),t.sourceBaselineSHA256)}
function originalPerCallPieces(calls){
  const segment = (polygons, direction, weight) => {
    const points = polygons.flat()
    assert(points.length > 0 && points.every(value => value.off === 0))
    assert(weight > 0)
    const xs = points.map(value => value.x / 2), ys = points.map(value => value.y / 2)
    const normalized = polygons.map(polygon => {
      const area = polygon.reduce((sum, value, index) => { const next = polygon[(index + 1) % polygon.length]; return sum + value.x * next.y - next.x * value.y }, 0)
      assert(area !== 0)
      return area < 0 ? [polygon[0], ...polygon.slice(1).reverse()] : polygon
    })
    return {
      outline: normalized.map(polygon => polygon.map((value, index) => `${index ? 'L' : 'M'}${value.x / 2} ${value.y / 2}`).join(' ') + ' Z').join(' '),
      bounds: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)],
      direction,
      weight: Math.round(weight * 1e6) / 1e6,
    }
  }
    const pieces = calls.map(call => {
      const args = call.args
      if (call.kind === 'cdDrawBezier') return {
        ...segment(call.polygons, 'curve', Math.hypot(args[6] - args[0], args[7] - args[1]) / 2),
        revealPath: `M${args[0] / 2} ${args[1] / 2} C${args[2] / 2} ${args[3] / 2} ${args[4] / 2} ${args[5] / 2} ${args[6] / 2} ${args[7] / 2}`,
        revealWidth: 14,
      }
      if (call.kind === 'cdDrawCurve') return {
        ...segment(call.polygons, 'curve', Math.hypot(args[4] - args[0], args[5] - args[1]) / 2),
        revealPath: `M${args[0] / 2} ${args[1] / 2} Q${args[2] / 2} ${args[3] / 2} ${args[4] / 2} ${args[5] / 2}`,
        revealWidth: 14,
      }
      const piece = segment(call.polygons, args[0] === args[2] ? (args[3] > args[1] ? 'down' : 'up') : args[1] === args[3] ? (args[2] > args[0] ? 'right' : 'left') : 'curve', Math.hypot(args[2] - args[0], args[3] - args[1]) / 2)
      return piece.direction === 'curve' ? { ...piece, revealPath: `M${args[0] / 2} ${args[1] / 2} L${args[2] / 2} ${args[3] / 2}`, revealWidth: 14 } : piece
    })
return pieces
}
export function compileProgressive(...args){assert.equal(args.length,3,'Exactly3 explicit arguments');guards();const[trace,proof,id]=args;assert.deepEqual(id,t.identity);assert.deepEqual(Object.keys(proof).sort(),t.proofKeys);assert.equal(sha(JSON.stringify(proof)),t.fullProofSHA256);assert.deepEqual(trace,proof.trace);const h=obj(t.sourceDirectory+'/'+t.headerFile),b=obj(t.sourceDirectory+'/'+t.proofFile);assert.deepEqual(Object.keys(h).sort(),t.headerKeys);assert.deepEqual(Object.keys(b).sort(),['defaults','groups','trace']);assert.deepEqual(proof,{engineRevision:h.engineRevision,engineHashes:h.engineHashes,...b});assert.deepEqual(h.defaults,b.defaults);for(const[k,f]of Object.entries(t.boundFiles))assert.equal(id[k],sha(read(t.sourceDirectory+'/'+f)));assert.deepEqual(original.selectedProofIdentity,t.originalInnerIdentity);assert.deepEqual(original.sourceGroups,t.originalSourceGroups)
 const split=t.split,merge=t.merge,calls=split.rawIndices.flatMap(i=>proof.trace[i]),join=merge.rawIndices.flatMap(i=>proof.trace[i]);assert.equal(calls.length,2);assert.equal(join.length,2);assert.deepEqual(calls.map(c=>({kind:c.kind,args:c.args})),split.exactCalls);assert.deepEqual(join.map(c=>({kind:c.kind,args:c.args})),merge.exactCalls);assert.deepEqual(calls.map(c=>c.polygons.length),split.polygonCounts);assert.deepEqual(calls.map(c=>sha(JSON.stringify(c.polygons))),split.polygonSHA256);assert.deepEqual(join.map(c=>sha(JSON.stringify(c.polygons))),merge.polygonSHA256);assert.equal(calls[0].kind,'cdDrawCurve');assert.equal(calls[1].kind,'cdDrawLine');assert.deepEqual(calls[0].args.slice(4,6),calls[1].args.slice(0,2));assert.deepEqual(join[0].args.slice(2,4),join[1].args.slice(0,2));assert.deepEqual(join[0].args.slice(2,4),merge.exactEndpoint);assert.deepEqual(join[1].args.slice(4),[1022,32]);const before=JSON.stringify(proof),base=fixture.baseline,baseBefore=JSON.stringify(base),old=base[3][0],chunks=old.outline.match(/M[^Z]* Z/g);assert.equal(chunks.length,4);assert.equal(old.direction,'curve');assert.equal(old.revealWidth,14);assert.equal(old.weight,split.oldTotalWeight);compilerCalls++;const pieces=originalPerCallPieces(calls);assert.equal(pieces.length,2);assert.equal(pieces[0].outline,chunks.slice(0,3).join(' '));assert.equal(pieces[1].outline,chunks[3]);assert.deepEqual(pieces.map(m=>m.weight),split.weights);assert.equal(Math.round(pieces[0].weight*1e6)+Math.round(pieces[1].weight*1e6),Math.round(old.weight*1e6));assert.equal(pieces[0].revealWidth,14);assert.equal(pieces[0].direction,'curve');assert.equal(pieces[1].direction,'down');assert(!('revealPath'in pieces[1]));assert.equal(old.revealPath,pieces[0].revealPath+' L'+calls[1].args[2]/2+' '+calls[1].args[3]/2)
 const merged=[base[11][0],base[12][0]];assert.deepEqual(merged.map(m=>m.direction),merge.directions);assert.deepEqual(merged.map(m=>m.weight),merge.weights);assert(merged.every(m=>!('revealPath'in m)));const out=[base[0],base[1],base[2],[pieces[0]],[pieces[1]],base[4],base[5],base[9],base[10],merged,base[13],base[6],base[7],base[8],base[14],base[15],base[16]];assert.equal(out.length,17);assert.equal(out.flat().length,19);assert.equal(out.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),36);assert.deepEqual(t.sourceGroups.flat().slice().sort((a,b)=>a-b),Array.from({length:20},(_,i)=>i));assert.equal(JSON.stringify(proof),before);assert.equal(JSON.stringify(base),baseBefore);const p=obj('preparation.json');if(p.compiled?.SHA256)assert.equal(sha(JSON.stringify(out)),p.compiled.SHA256);return out}
export function compileSourceWhole(...args){assert.equal(args.length,4,'Exactly4 explicit arguments');const[root,trace,proof,id]=args;assert.equal(root,t.root);return compileProgressive(trace,proof,id)}
