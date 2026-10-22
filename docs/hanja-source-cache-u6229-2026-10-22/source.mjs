import assert from 'node:assert/strict';
import{readFileSync,existsSync}from'node:fs';
import{createHash}from'node:crypto';
export{renderProgressive}from'../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs';
const sha=v=>createHash('sha256').update(v).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const IDENTITY={"root":"u6229","file":"../hanja-goal-glyphwiki-batch845-2026-10-13/engine-whole-u6229.json","fileSHA256":"561d47bcd2e5da61e87b0600cc3e9616252109afdbb08e4e9fa12317bcac1ec4"};
const EXPECTED_GROUPS=[[0],[1,2],[3],[4,5],[6],[7],[8],[9,10],[11],[12],[13],[15],[16],[14]];
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15],[16]];
const LOGICAL_ATOMS=[[0],[1,2],[3],[4,5],[6],[7],[8],[9],[10],[11],[12],[14],[15],[13]];
const RAW_COUNT=17;
const ORIGINAL=[[{"kind":"cdDrawLine","args":[18.25,25,109.75,25,0,0]}],[{"kind":"cdDrawCurve","args":[41.186,27.24,36.001,52.84,29.779,77.16,0,7]}],[{"kind":"cdDrawCurve","args":[20.446,78.44,36.5195,76.52000000000001,57.778,72.03999999999999,0,7]}],[{"kind":"cdDrawCurve","args":[45.8525,47.08,56.2225,63.72,61.4075,82.92,7,8]}],[{"kind":"cdDrawCurve","args":[85.77699999999999,27.24,80.592,52.84,74.37,77.16,0,7]}],[{"kind":"cdDrawCurve","args":[66.5925,78.44,82.1475,76.52000000000001,102.369,72.03999999999999,0,7]}],[{"kind":"cdDrawCurve","args":[90.4435,47.08,100.8135,63.72,105.9985,82.92,7,8]}],[{"kind":"cdDrawLine","args":[12.15,97,115.85,97,0,0]}],[{"kind":"cdDrawLine","args":[32.70700000000001,116.6,32.70700000000001,174.4,12,113]}],[{"kind":"cdDrawLine","args":[32.70700000000001,116.6,95.293,116.6,2,2]}],[{"kind":"cdDrawLine","args":[95.293,116.6,95.293,174.4,22,323]}],[{"kind":"cdDrawLine","args":[32.70700000000001,144.65,95.293,144.65,2,2]}],[{"kind":"cdDrawLine","args":[32.70700000000001,174.4,95.293,174.4,2,2]}],[{"kind":"cdDrawLine","args":[113.23,75,187.62,69,0,0]}],[{"kind":"cdDrawCurve","args":[149.56,21,165.995,31,173.78,48,7,8]}],[{"kind":"cdDrawBezier","args":[134.85500000000002,14,134.85500000000002,169,174.645,180,182.43,180,0,15]}],[{"kind":"cdDrawCurve","args":[172.915,95,147.82999999999998,169,93.335,188,0,7]}]];
const TRACE_SHA256="879eda162afd393e262d60c72244c1efd84feecc0793f1fa1121e524b92616f1";
const GROUPS_SHA256="6599e1ca9cc790cc38d98bef6f806380fce6b9c8a3148362d9ca7f0b3614253c";
const PROOF_SHA256="0c034789bb751b1eae8f78a9724b187f03e7cefba9047521325141e9066a3408";
const PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5};
const ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f";
const ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"};
const UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[];
const INPUT_PINS=[{"path":"../hanja-goal-glyphwiki-batch845-2026-10-13/engine-whole-u6229.json","sha256":"561d47bcd2e5da61e87b0600cc3e9616252109afdbb08e4e9fa12317bcac1ec4"},{"path":"../hanja-source-raw-compare-u6229-2026-10-22/board-config.json","sha256":"16eaacb1b902cdbd547d42be1fd8deea4ad522e8009ac733563b078cd2e51e24"},{"path":"../hanja-source-raw-compare-u6229-2026-10-22/native-review.json","sha256":"a384ef6a7ebe4c2c3ee1d2c787316981876f9e9c11020175f20e98da1ad44257"},{"path":"../hanja-goal-glyphwiki-batch845-2026-10-13/sources.json","sha256":"e207fc398d31131881a58e1a889d63fdf88f0c30568f3b1a21f1406d054f1f8f"}];
const PROJECTOR_BODY_SHA="f58c62d83c662318ab347384c31cc6403342289cb96fe5523a003b0e2bc72038";
const FIXED_CACHE_SHA="bff29f33b82be160c7625e182b8242dc56b1b5875a4fe0754ae1a77505d37bd4";
const sourceGroups=ORIGINAL_SOURCE_GROUPS,endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8),point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0});
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');if(Array.isArray(v)){assert.equal(Object.getPrototypeOf(v),Array.prototype);assert.equal(Reflect.ownKeys(v).length,v.length+1);for(let i=0;i<v.length;i++){assert(Object.hasOwn(v,i));const d=Object.getOwnPropertyDescriptor(v,String(i));assert(d&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}assert.equal(Object.getPrototypeOf(v),Object.prototype);assert.equal(Reflect.ownKeys(v).length,Object.keys(v).length);for(const k of Object.keys(v)){const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}
export const sourceRoot='u6229',selectedProofIdentity=clone(IDENTITY),logicalSourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
function validateSelectedProof(trace,proof,identity){assert.equal(arguments.length,3);strictJSON(trace);strictJSON(proof);strictJSON(identity);assert.deepEqual(identity,IDENTITY);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);for(const p of INPUT_PINS)assert.equal(sha(readFileSync(new URL(p.path,import.meta.url))),p.sha256,p.path);const raw=readFileSync(new URL(IDENTITY.file,import.meta.url));assert.equal(sha(raw),IDENTITY.fileSHA256);assert.deepEqual(JSON.parse(raw),proof);assert.equal(digest(proof),PROOF_SHA256);assert.deepEqual(trace,proof.trace);const e=JSON.parse(readFileSync(new URL(INPUT_PINS[2].path,import.meta.url)));assert.equal(e.glyph,'戩');assert.equal(e.actualFull5SHA256,IDENTITY.fileSHA256);assert.deepEqual(e.provisionalGroupsOneBased,EXPECTED_GROUPS.map(g=>g.map(i=>i+1)));assert.equal(e.staticCorrespondenceReviewed,true);assert.equal(sha(compileBound.toString()),PROJECTOR_BODY_SHA);}
function compileBound(trace, proof, identity) {
  validateSelectedProof(trace, proof, identity)
  assert.deepEqual(sourceGroups, ORIGINAL_SOURCE_GROUPS, "Pinned numeric source grouping; no native order approval")
  assert.equal(trace.length, RAW_COUNT)
  assert.equal(proof.groups.length, RAW_COUNT)
  assert.deepEqual(trace.map(row => row.map(call => ({ kind: call.kind, args: call.args }))), ORIGINAL)
  assert.equal(digest(trace), TRACE_SHA256, 'Every original trajectory and polygon must match the selected whole root')
  assert.equal(digest(proof.groups), GROUPS_SHA256)
  assert.deepEqual(proof.defaults, PINNED_DEFAULTS)
  assert.equal(proof.engineRevision, ENGINE_REVISION)
  assert.deepEqual(proof.engineHashes, ENGINE_HASHES)
  const rawIndices = sourceGroups.flat()
  assert.deepEqual([...rawIndices].sort((a, b) => a - b), Array.from({ length: RAW_COUNT }, (_, index) => index), 'Every original raw group must occur exactly once')
  for (let index = 0; index < trace.length; index++) {
    assert.deepEqual(trace[index].flatMap(call => call.polygons), proof.groups[index].polygons)
  }
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
  // The tail is an existing emitted polygon. Its extra directional mask adds no geometry or connector.
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
  const tails = new Map()
  for (const indices of UP_TAIL_GROUPS) tails.set(JSON.stringify(indices), terminalUpTail(indices))
  for (const indices of LEFT_TAIL_GROUPS) tails.set(JSON.stringify(indices), terminalLeftTail(indices))
  const compile = (indices, tail) => {
    const calls = indices.flatMap(index => trace[index]).map(call => ({ ...call, polygons: [...call.polygons] }))
    if (tail) assert.deepEqual(calls.at(-1).polygons.pop(), tail.polygon)
    for (let index = 1; index < calls.length; index++) {
      assert.deepEqual(endpoint(calls[index - 1]), calls[index].args.slice(0, 2), 'Merged original trajectories must be exactly continuous; no invented connectors')
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
    if (pieces.length === 1) return pieces[0]
    const first = calls[0].args
    return {
      outline: pieces.map(piece => piece.outline).join(' '),
      bounds: [Math.min(...pieces.map(piece => piece.bounds[0])), Math.min(...pieces.map(piece => piece.bounds[1])), Math.max(...pieces.map(piece => piece.bounds[2])), Math.max(...pieces.map(piece => piece.bounds[3]))],
      direction: 'curve',
      weight: Math.round(pieces.reduce((sum, piece) => sum + piece.weight, 0) * 1e6) / 1e6,
      revealPath: `M${first[0] / 2} ${first[1] / 2} ${calls.map(call => { const args = call.args; return call.kind === 'cdDrawLine' ? `L${args[2] / 2} ${args[3] / 2}` : call.kind === 'cdDrawBezier' ? `C${args[2] / 2} ${args[3] / 2} ${args[4] / 2} ${args[5] / 2} ${args[6] / 2} ${args[7] / 2}` : `Q${args[2] / 2} ${args[3] / 2} ${args[4] / 2} ${args[5] / 2}` }).join(' ')}`,
      revealWidth: 14,
    }
  }
  const outlines = sourceGroups.map(indices => {
    const tail = tails.get(JSON.stringify(indices))
    return tail ? [compile(indices, tail), segment([tail.polygon], tail.direction, tail.jump / 2)] : [compile(indices)]
  })
  const emittedPolygonCount = outlines.flat().reduce((sum, mask) => sum + (mask.outline.match(/M/g)?.length ?? 0), 0)
  assert.equal(emittedPolygonCount, trace.flatMap(calls => calls.flatMap(call => call.polygons)).length, 'Every original polygon must be emitted in exactly one mask')

  // Terminal13 is one original emitted polygon, not a separate authored tip.
  // Keep its full original bounds in a cardinal down mask; do not invent a curve connector or split geometry.
  for (const raw of SINGLE_CARDINAL_TIP_RAW) {
    const index = sourceGroups.findIndex(indices => indices.length === 1 && indices[0] === raw);
    assert(index >= 0);
    const call = trace[raw][0];
    assert.equal(trace[raw].length, 1);
    assert.equal(call.kind, 'cdDrawLine');
    assert.equal(call.args[0], call.args[2]);
    assert(call.args[3] > call.args[1]);
    assert.equal(call.args.at(-1) % 100, 13);
    assert.equal(call.polygons.length, 1);
    assert.equal(outlines[index].length, 1);
    assert.equal(outlines[index][0].direction, 'down');
    assert.equal(outlines[index][0].revealPath, undefined);
    const points = call.polygons.flat();
    assert.deepEqual(outlines[index][0].bounds, [Math.min(...points.map(p => p.x / 2)), Math.min(...points.map(p => p.y / 2)), Math.max(...points.map(p => p.x / 2)), Math.max(...points.map(p => p.y / 2))]);
  }
  return outlines
}

let projectionRuns=0,cachedCalls=0;
export function captureProjection(...args){assert.equal(args.length,3);assert(!existsSync(new URL('./source.json',import.meta.url)),'public cache exists; projection disabled');assert.equal(projectionRuns,0);validateSelectedProof(...args);projectionRuns++;const atoms=compileBound(...args),strokes=LOGICAL_ATOMS.map(a=>a.flatMap(i=>atoms[i]));assert.equal(atoms.length,16);assert.equal(strokes.length,14);assert.equal(strokes.flat().length,16);assert.equal(strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)?.length??0),0),38);return{schema:'hanja-fixed-source-cache/v1',root:sourceRoot,identity:clone(IDENTITY),sourceGroups:clone(EXPECTED_GROUPS),atomicSourceGroups:clone(ORIGINAL_SOURCE_GROUPS),strokes,geometrySHA256:digest(strokes),pureProjectorBodySHA256:PROJECTOR_BODY_SHA,preparation:{successfulPureProjectionOperations:1,internalPureCompileBoundCalls:1,originalCompilerCalls:0,existingCandidateFactoryCalls:0,engineRuns:0,newTerminalDerivations:0},sourcePreservation:{original38PolygonsExactlyOnce:true,QQ2Gap:[args[0][2][0].args[0]-args[0][1][0].args[4],args[0][2][0].args[1]-args[0][1][0].args[5]],QQ4Gap:[args[0][5][0].args[0]-args[0][4][0].args[4],args[0][5][0].args[1]-args[0][4][0].args[5]],QQIndependentMasks:true,HV8ExactJoin:[10,11],domestic12Raw16:EXPECTED_GROUPS[11],domestic13Raw17:EXPECTED_GROUPS[12],domestic14Raw15:EXPECTED_GROUPS[13],newGuideOrConnector:false,originalTerminalUP12Preserved:true,terminalUP12NativeRiskUnreviewed:true},staticMappingApproved:true,directionApproved:false,temporalOrderApproved:false,nativeApproval:false,actualAppUI:false,runtimeApplied:false};}
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);const bytes=readFileSync(new URL('./source.json',import.meta.url));assert.equal(sha(bytes),FIXED_CACHE_SHA);const c=JSON.parse(bytes);assert.deepEqual(c.identity,IDENTITY);assert.deepEqual(c.sourceGroups,EXPECTED_GROUPS);assert.equal(digest(c.strokes),c.geometrySHA256);cachedCalls++;return c.strokes;}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1));}
export const projectionCallCount=()=>projectionRuns,cachedPositiveCallCount=()=>cachedCalls;

// 원 actualfull5의 terminal15 UP quad만 분리. 역사 캐시는 입력; 재투영/engine 호출 없음.
const HISTORICAL_CACHE_SHA256='71a21c1892b4f0571fd8581242701bdd461eaf874d08a7cca0aac188f664d07a',HISTORICAL_CACHE_CANONICAL_SHA256='9fe4eafe37ecf0fc2fcbb3fb620939dacc1007d43a6af2aac96a5d6214231804';
let cachedCorrectionRuns=0;
export function deriveCachedCorrection(input){
 assert.equal(arguments.length,1);strictJSON(input);assert.equal(cachedCorrectionRuns,0);assert.equal(sha(readFileSync(new URL('./source.json',import.meta.url))),HISTORICAL_CACHE_SHA256);assert.equal(digest(input),HISTORICAL_CACHE_CANONICAL_SHA256);
 const proof=JSON.parse(readFileSync(new URL(IDENTITY.file,import.meta.url)));validateSelectedProof(proof.trace,proof,clone(IDENTITY));const call=proof.trace[15][0];assert.equal(proof.trace[15].length,1);assert.equal(call.kind,'cdDrawBezier');assert.deepEqual(call.args,[134.85500000000002,14,134.85500000000002,169,174.645,180,182.43,180,0,15]);const[x1,y1,c1x,c1y,c2x,c2y,x2,y2,ta1,ta2]=call.args;assert.equal(c2y,y2);assert(c2x<x2);assert.equal(ta1,0);assert.equal(ta2,15);
 const width=proof.defaults.kMinWidthT-Math.floor(ta1/1000)/2,jump=proof.defaults.kWidth*(4*(1-Math.floor(ta1/1000)/proof.defaults.kAdjustMageStep)+1);assert.equal(width,6);assert.equal(jump,25);
 const polygon=[point(x2,y2-width+1),point(x2+2,y2-width-jump),point(x2,y2-width-jump),point(x2-width,y2-width+1)];assert.deepEqual(call.polygons.at(-1),polygon);assert(polygon.every(p=>p.off===0));
 const normalized=poly=>{const area=poly.reduce((n,p,i)=>{const q=poly[(i+1)%poly.length];return n+p.x*q.y-q.x*p.y},0);assert(area!==0);const out=area<0?[poly[0],...poly.slice(1).reverse()]:poly;return out.map((p,i)=>(i?'L':'M')+(p.x/2)+' '+(p.y/2)).join(' ')+' Z'};
 const old=input.strokes[11][0];assert.equal(input.strokes[11].length,1);assert.equal(old.weight,86.341445);assert.equal(old.revealWidth,14);const parts=old.outline.match(/M[^Z]+Z/g);assert.equal(parts.length,5);assert.equal(parts.pop(),normalized(polygon));const bodyPoints=call.polygons.slice(0,-1).flat(),bounds=ps=>[Math.min(...ps.map(p=>p.x/2)),Math.min(...ps.map(p=>p.y/2)),Math.max(...ps.map(p=>p.x/2)),Math.max(...ps.map(p=>p.y/2))];
 const tailBounds=bounds(polygon),tail={outline:normalized(polygon),bounds:tailBounds,direction:'up',weight:tailBounds[3]-tailBounds[1]};assert.deepEqual(tailBounds,[88.2,74.5,92.2,87.5]);assert.equal(tail.weight,13);const result=clone(input);result.strokes[11]=[{...old,outline:parts.join(' '),bounds:bounds(bodyPoints)},tail];
 assert.equal(result.strokes.length,14);assert.equal(result.strokes.flat().length,17);assert.equal(result.strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)?.length||0),0),38);for(let i=0;i<14;i++)if(i!==11)assert.deepEqual(result.strokes[i],input.strokes[i]);assert.deepEqual(result.strokes[11][0].revealPath,old.revealPath);assert.equal(result.strokes[11][0].weight,old.weight);
 result.geometrySHA256=digest(result.strokes);result.preparation={...result.preparation,newTerminalDerivations:1,cachedCorrectionOperations:1};result.sourcePreservation={...result.sourcePreservation,UP12TailPartition:{rawOneBased:16,sourceTerminal:15,quad:polygon,bodyPolygons:4,bodyWeight:old.weight,bodyGuideUnchanged:true,bodyWidth:14,width,jump,sourceFootY:175,sourceFarY:149,tailBounds,tailWeight:13,weightBasis:'原quad yextent (175-149)/2',logicalStrokeDurationChanged:false,internalBodyTailAllocationChanged:true},priorGeometrySHA256:input.geometrySHA256};cachedCorrectionRuns++;return result;
}
export const cachedCorrectionCount=()=>cachedCorrectionRuns;
