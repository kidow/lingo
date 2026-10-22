import assert from 'node:assert/strict';
import{readFileSync,existsSync}from'node:fs';
import{createHash}from'node:crypto';
export{renderProgressive}from'../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs';
const sha=v=>createHash('sha256').update(v).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const IDENTITY={"root":"u95d0","file":"../hanja-public-glyphwiki-engine-capture-2026-10-22/engine-whole-u95d0.json","fileSHA256":"ffacb236e411b30435d798b968cab0b4e1e199e001566744dd270df357d6294d"},EXPECTED_GROUPS=[[0],[1,2],[3],[4],[5],[6,7],[8],[9],[10],[11],[12],[13,14],[15],[16],[17],[18,19],[20],[21]],ORIGINAL_SOURCE_GROUPS=[[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16],[17],[18],[19],[20],[21]],LOGICAL_ATOMS=[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16,17],[18],[19]];
const RAW_COUNT=22,ORIGINAL=[[{"kind":"cdDrawLine","args":[29,26,29,186,12,0]}],[{"kind":"cdDrawLine","args":[29,26,83,26,2,2]}],[{"kind":"cdDrawLine","args":[83,26,83,60,22,223]}],[{"kind":"cdDrawLine","args":[29,43,83,43,2,2]}],[{"kind":"cdDrawLine","args":[29,60,83,60,2,2]}],[{"kind":"cdDrawLine","args":[117,26,117,60,12,313]}],[{"kind":"cdDrawLine","args":[117,26,171,26,2,2]}],[{"kind":"cdDrawLine","args":[171,26,171,173,22,1]},{"kind":"cdDrawCurve","args":[171,173,171,183,161,183,1,14]}],[{"kind":"cdDrawLine","args":[117,43,171,43,2,2]}],[{"kind":"cdDrawLine","args":[117,60,171,60,2,2]}],[{"kind":"cdDrawCurve","args":[133.5,74.3,106.7,80.15,65.16,84.05,0,7]}],[{"kind":"cdDrawLine","args":[65.16,69.75,65.16,85.1,0,1]},{"kind":"cdDrawCurve","args":[65.16,85.1,65.16,95.1,75.16,95.1,1,4001]},{"kind":"cdDrawLine","args":[75.16,95.1,146.9,95.1,4006,5]}],[{"kind":"cdDrawLine","args":[78.3255,108.685,78.3255,147.256,1012,313]}],[{"kind":"cdDrawLine","args":[78.3255,108.685,134.40449999999998,108.685,2,2]}],[{"kind":"cdDrawLine","args":[134.40449999999998,108.685,134.40449999999998,147.256,22,323]}],[{"kind":"cdDrawLine","args":[78.3255,121.2625,134.40449999999998,121.2625,2,2]}],[{"kind":"cdDrawLine","args":[78.3255,133.84,134.40449999999998,133.84,2,2]}],[{"kind":"cdDrawLine","args":[78.3255,147.256,134.40449999999998,147.256,2,2]}],[{"kind":"cdDrawLine","args":[55.78,104.85,55.78,158.15,1000,313]}],[{"kind":"cdDrawLine","args":[55.78,158.15,158.29000000000002,158.15,2,100]}],[{"kind":"cdDrawCurve","args":[93.3,164.65,73.87,175.05,46.4,181.55,0,7]}],[{"kind":"cdDrawCurve","args":[110.05,164.65,135.51,168.55,149.57999999999998,178.95,7,8]}]],TRACE_SHA256="d2cc2de7d41ea72d13820786378b3fe3505837bdc97a24499837c730efc5d57c",GROUPS_SHA256="d1e2a9f76879b01ed4d9c5030e5fa07ba47b1ecae15f616066988cde8d6f2320",PROOF_SHA256="6b94628bef7abde1ac5cf0fa223524f65827e5729fca7876f09eb260dd429c69",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[[11]],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[];
const INPUT_PINS=[{"path":"../hanja-public-glyphwiki-engine-capture-2026-10-22/engine-whole-u95d0.json","sha256":"ffacb236e411b30435d798b968cab0b4e1e199e001566744dd270df357d6294d"},{"path":"../hanja-source-native-raw-correspondence-u95d0-2026-10-22.json","sha256":"d329a9069a7e21a409a515bc0b5eebe7c1f94b727cf747e237509d8cea0c0e63"},{"path":"../hanja-public-glyphwiki-source-closure-u9f08-u9085-u95d0-2026-10-22.json","sha256":"9e3f10928e846151380d4b46bcfcc667d2a859649083e28611afd42542631b19"},{"path":"../hanja-source-cache-u9085-2026-10-22/source.mjs","sha256":"031e9900104264c972724b08b3bdc87fc14dba0d98b6cb40d2c480e040501124"}],PROJECTOR_BODY_SHA="f58c62d83c662318ab347384c31cc6403342289cb96fe5523a003b0e2bc72038",sourceGroups=ORIGINAL_SOURCE_GROUPS,endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8),point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0});
const FIXED_CACHE_SHA="fb06c5d6aa1b69e1407b6f39f6c28a95362b332808ffdea26a0e27415d69a90b";
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');if(Array.isArray(v)){assert.equal(Object.getPrototypeOf(v),Array.prototype);assert.equal(Reflect.ownKeys(v).length,v.length+1);for(let i=0;i<v.length;i++){assert(Object.hasOwn(v,i));const d=Object.getOwnPropertyDescriptor(v,String(i));assert(d&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}assert.equal(Object.getPrototypeOf(v),Object.prototype);assert.equal(Reflect.ownKeys(v).length,Object.keys(v).length);for(const k of Object.keys(v)){const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}
export const sourceRoot='u95d0',selectedProofIdentity=clone(IDENTITY),logicalSourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
function validateSelectedProof(trace,proof,identity){assert.equal(arguments.length,3);strictJSON(trace);strictJSON(proof);strictJSON(identity);assert.deepEqual(identity,IDENTITY);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);for(const p of INPUT_PINS)assert.equal(sha(readFileSync(new URL(p.path,import.meta.url))),p.sha256,p.path);const raw=readFileSync(new URL(IDENTITY.file,import.meta.url));assert.equal(sha(raw),IDENTITY.fileSHA256);assert.deepEqual(JSON.parse(raw),proof);assert.equal(digest(proof),PROOF_SHA256);assert.deepEqual(trace,proof.trace);const e=JSON.parse(readFileSync(new URL(INPUT_PINS[1].path,import.meta.url)));assert.equal(e.sourceRoot,sourceRoot);assert.deepEqual(e.staticCorrespondenceOneBased,EXPECTED_GROUPS.map(g=>g.map(i=>i+1)));assert.equal(e.approval.staticCorrespondence,true);assert.equal(sha(compileBound.toString()),PROJECTOR_BODY_SHA)}
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
export function captureProjection(...args){assert.equal(args.length,3);assert(!existsSync(new URL('./source.json',import.meta.url)),'public cache exists; projection disabled');assert.equal(projectionRuns,0);validateSelectedProof(...args);projectionRuns++;const atoms=compileBound(...args),strokes=LOGICAL_ATOMS.map(a=>a.flatMap(i=>atoms[i]));assert.equal(atoms.length,20);assert.equal(strokes.length,18);assert.equal(strokes.flat().length,21);assert.equal(strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)?.length??0),0),42);assert.deepEqual(strokes[5].map(m=>m.direction),['right','curve']);assert.deepEqual(strokes[15].map(m=>m.direction),['down','right']);assert.equal(strokes[9][1].direction,'up');assert.equal(strokes[9][1].weight,4.5);const terminal=args[1].trace[11].at(-1);assert.deepEqual(terminal.args,[75.16,95.1,146.9,95.1,4006,5]);return{schema:'hanja-fixed-source-cache/v1',root:sourceRoot,identity:clone(IDENTITY),sourceGroups:clone(EXPECTED_GROUPS),atomicSourceGroups:clone(ORIGINAL_SOURCE_GROUPS),strokes,geometrySHA256:digest(strokes),pureProjectorBodySHA256:PROJECTOR_BODY_SHA,preparation:{successfulPureProjectionOperations:1,internalPureCompileBoundCalls:1,originalCompilerCalls:0,existingCandidateFactoryCalls:0,engineRuns:0,newTerminalDerivations:1},sourcePreservation:{original42PolygonsExactlyOnce:true,exactInterRawJoinsOneBased:[[2,3],[14,15]],independentH_LQ6:{rawOneBased:[7,8],maskCount:2,sourceKinds:['cdDrawLine','cdDrawLine+cdDrawCurve'],newInterRawGuide:false,left14TailUnpartitioned:true},UP10:{rawOneBased:12,terminalArgs:clone(terminal.args),quadSHA256:digest(terminal.polygons.at(-1)),bodyGuideUnchanged:true,bodyWeight:strokes[9][0].weight,bodyWidth:14,tailWeight:4.5,bodyTailBoundary:strokes[9][0].weight/(strokes[9][0].weight+4.5),fixedPerPenDurationUnchanged:true},VH16:{rawOneBased:[19,20],directions:['down','right'],originalFootPreserved:true,independentCardinal:true,weights:strokes[15].map(m=>m.weight)},originalCallFieldsUnchanged:true,newGuideOrConnector:false},staticMappingApproved:true,directionApproved:false,temporalOrderApproved:false,nativeApproval:false,actualAppUI:false,runtimeApplied:false};}
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);const bytes=readFileSync(new URL('./source.json',import.meta.url));assert.equal(sha(bytes),FIXED_CACHE_SHA);const c=JSON.parse(bytes);assert.deepEqual(c.identity,IDENTITY);assert.deepEqual(c.sourceGroups,EXPECTED_GROUPS);assert.equal(digest(c.strokes),c.geometrySHA256);cachedCalls++;return c.strokes;}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1));}
export const projectionCallCount=()=>projectionRuns,cachedPositiveCallCount=()=>cachedCalls;
