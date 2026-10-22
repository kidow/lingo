import assert from 'node:assert/strict';
import{readFileSync,existsSync}from'node:fs';
import{createHash}from'node:crypto';
export{renderProgressive}from'../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs';
const sha=v=>createHash('sha256').update(v).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const IDENTITY={"root":"u7494","file":"../hanja-public-glyphwiki-engine-capture-u7494-2026-10-22/engine-whole-u7494.json","fileSHA256":"fe1dbf23246a100ef0d2a56885185fe54aa92273f562f98deb4e355948dbec2c"};
const EXPECTED_GROUPS=[[0],[2],[1],[3],[4],[5,6],[7],[8,9],[10],[12],[13],[11],[14],[15,16],[17],[18]],ORIGINAL_SOURCE_GROUPS=[[0],[2],[1],[3],[4],[5],[6],[7],[8,9],[10],[12],[13],[11],[14],[15,16],[17],[18]],LOGICAL_ATOMS=[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16]];
const RAW_COUNT=19;
const ORIGINAL=[[{"kind":"cdDrawLine","args":[13.65,42,73.125,42,0,0]}],[{"kind":"cdDrawLine","args":[39.975,42,39.975,149,32,32]}],[{"kind":"cdDrawLine","args":[16.575,93,70.2,93,0,0]}],[{"kind":"cdDrawCurve","args":[13.65,160,41.925,150,76.05,135,0,7]}],[{"kind":"cdDrawCurve","args":[105.225,33,94.425,59,67.425,76,0,7]}],[{"kind":"cdDrawLine","args":[108.6,25,153.15,25,0,100]}],[{"kind":"cdDrawCurve","args":[148.425,25,157.875,54,182.175,67,7,0]}],[{"kind":"cdDrawLine","args":[87.3375,68.460224,87.3375,107.80217599999997,12,213]}],[{"kind":"cdDrawLine","args":[87.3375,68.460224,167.6625,68.460224,2,2]}],[{"kind":"cdDrawLine","args":[167.6625,68.460224,167.6625,107.80217599999997,22,223]}],[{"kind":"cdDrawLine","args":[127.5,68.460224,127.5,107.80217599999997,32,32]}],[{"kind":"cdDrawLine","args":[87.3375,107.80217599999997,167.6625,107.80217599999997,2,2]}],[{"kind":"cdDrawCurve","args":[97.09125,75.43279999999999,107.41875,84.09080000000002,112.58250000000001,98.52080000000002,7,8]}],[{"kind":"cdDrawCurve","args":[153.89249999999998,77.7416,147.0075,89.28559999999999,137.25375,102.56120000000001,0,7]}],[{"kind":"cdDrawLine","args":[96.5175,126.9024,96.5175,173.5776,12,113]}],[{"kind":"cdDrawLine","args":[96.5175,126.9024,158.48250000000002,126.9024,2,2]}],[{"kind":"cdDrawLine","args":[158.48250000000002,126.9024,158.48250000000002,173.5776,22,123]}],[{"kind":"cdDrawLine","args":[96.5175,149.55360000000002,158.48250000000002,149.55360000000002,2,2]}],[{"kind":"cdDrawLine","args":[96.5175,173.5776,158.48250000000002,173.5776,2,2]}]];
const TRACE_SHA256="09303cb03a2c02eb4e23829901e8d2be124750eb9dcc14edd0cbe377da4037e5",GROUPS_SHA256="8355f9ece9f4cd5aa522a53798d1f12c1e6984d5bc54805ce702123bf82ee49e",PROOF_SHA256="442e06df29a3657e6911b3f03b42876550eaa8edd1c7f8b36b9e885662198d6f";
const PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"};
const UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[7,14];
const INPUT_PINS=[{"path":"../hanja-public-glyphwiki-engine-capture-u7494-2026-10-22/engine-whole-u7494.json","sha256":"fe1dbf23246a100ef0d2a56885185fe54aa92273f562f98deb4e355948dbec2c"},{"path":"../hanja-source-raw-compare-pairs-u7494-2026-10-22/native-review.json","sha256":"7679ed1d905f6d293d6208c26a9728e66f6c6fec6220406f59640e4a554ece8d"},{"path":"../hanja-goal-glyphwiki-batch889-2026-10-13/sources.json","sha256":"3207043d878b08cb472fea34023bf81f679a414abdd3fa681e839b2bc91e47b7"},{"path":"../hanja-public-glyphwiki-engine-capture-u7494-2026-10-22/validation.json","sha256":"59e152eca944fb63ab4bcbed43067d408d663c06ce63e56c74dd5708bfd0af6c"},{"path":"../hanja-source-raw-compare-pairs-u7494-2026-10-22/board-config.json","sha256":"091f344ef09b9e20b8e966a60581a68741df2737da79ef59ec4a07bcb6c60c44"}];
const BASE_PROJECTOR_BODY_SHA='f58c62d83c662318ab347384c31cc6403342289cb96fe5523a003b0e2bc72038',PROJECTOR_BODY_SHA="1ea5179b10f13e69f2c62e800e320a9988b4f31d94a788c3afe0461eb4846327";
const FIXED_CACHE_SHA='75cb1e28cde612327ab9420af7605bf891067f63c3388247fc30fffeca6dacb1';
const sourceGroups=ORIGINAL_SOURCE_GROUPS,endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8),point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0});
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');if(Array.isArray(v)){assert.equal(Object.getPrototypeOf(v),Array.prototype);assert.equal(Reflect.ownKeys(v).length,v.length+1);for(let i=0;i<v.length;i++){assert(Object.hasOwn(v,i));const d=Object.getOwnPropertyDescriptor(v,String(i));assert(d&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}assert.equal(Object.getPrototypeOf(v),Object.prototype);assert.equal(Reflect.ownKeys(v).length,Object.keys(v).length);for(const k of Object.keys(v)){const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}
export const sourceRoot='u7494',selectedProofIdentity=clone(IDENTITY),logicalSourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
function validateSelectedProof(trace,proof,identity){assert.equal(arguments.length,3);strictJSON(trace);strictJSON(proof);strictJSON(identity);assert.deepEqual(identity,IDENTITY);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);for(const p of INPUT_PINS)assert.equal(sha(readFileSync(new URL(p.path,import.meta.url))),p.sha256,p.path);const bytes=readFileSync(new URL(IDENTITY.file,import.meta.url));assert.equal(sha(bytes),IDENTITY.fileSHA256);assert.deepEqual(JSON.parse(bytes),proof);assert.equal(digest(proof),PROOF_SHA256);assert.deepEqual(trace,proof.trace);const e=JSON.parse(readFileSync(new URL(INPUT_PINS[1].path,import.meta.url)));assert.equal(e.glyph,'璔');assert.equal(e.actualFull5SHA256,IDENTITY.fileSHA256);assert.deepEqual(e.provisionalGroupsOneBased,EXPECTED_GROUPS.map(g=>g.map(i=>i+1)));assert.equal(e.staticCorrespondenceReviewed,true);assert.equal(sha(compileBound.toString()),PROJECTOR_BODY_SHA);}
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
  assert.deepEqual([...rawIndices].sort((a, b) => a - b), Array.from({ length: RAW_COUNT }, (_, index) => index), 'Every pinned raw group exactly once')
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
export function captureProjection(...args){
 assert.equal(args.length,3);assert(!existsSync(new URL('./source.json',import.meta.url)),'cache exists; projection disabled');assert.equal(projectionRuns,0);validateSelectedProof(...args);projectionRuns++;
 const atoms=compileBound(...args),strokes=LOGICAL_ATOMS.map(a=>a.flatMap(i=>atoms[i]));assert.equal(strokes.length,16);assert.equal(strokes.flat().length,17);assert.equal(strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)?.length??0),0),32);assert.equal(strokes[5].length,2);
 return{schema:'hanja-fixed-source-cache/v1',root:sourceRoot,identity:clone(IDENTITY),sourceGroups:clone(EXPECTED_GROUPS),atomicSourceGroups:clone(ORIGINAL_SOURCE_GROUPS),strokes,geometrySHA256:digest(strokes),pureProjectorBodySHA256:PROJECTOR_BODY_SHA,basePureProjectorBodySHA256:BASE_PROJECTOR_BODY_SHA,preparation:{successfulPureProjectionOperations:1,internalPureCompileBoundCalls:1,originalCompilerCalls:0,existingCandidateFactoryCalls:0,engineRuns:0,newTerminalDerivations:0},sourcePreservation:{"original32PolygonsExactlyOnce":true,"exactInterRawJoinsOneBased":[[9,10],[16,17]],"HQ6":{"rawOneBased":[6,7],"independentMasks":true,"originalStartGap":[-4.724999999999994,0],"newJoinedGuide":false},"HVFullCapsuleSufficientConditions":[{"pen":8,"scale":"100000000000000","polygons":[{"raw":9,"polygon":0,"allVerticesStrictlyInsideOwnSourceCapsuleR14":true,"positiveMarginSigns":[true,true,true,true]},{"raw":10,"polygon":0,"allVerticesStrictlyInsideOwnSourceCapsuleR14":true,"positiveMarginSigns":[true,true,true,true]},{"raw":10,"polygon":1,"allVerticesStrictlyInsideOwnSourceCapsuleR14":true,"positiveMarginSigns":[true,true,true,true,true]}]},{"pen":14,"scale":"100000000000000","polygons":[{"raw":16,"polygon":0,"allVerticesStrictlyInsideOwnSourceCapsuleR14":true,"positiveMarginSigns":[true,true,true,true]},{"raw":17,"polygon":0,"allVerticesStrictlyInsideOwnSourceCapsuleR14":true,"positiveMarginSigns":[true,true,true,true]},{"raw":17,"polygon":1,"allVerticesStrictlyInsideOwnSourceCapsuleR14":true,"positiveMarginSigns":[true,true,true,true,true]}]}],"cardinalSourceBounds":[{"pen":7,"raw":8,"direction":"down","terminalFlags":[12,213],"allOriginalPBounds":true},{"pen":13,"raw":15,"direction":"down","terminalFlags":[12,113],"allOriginalPBounds":true}],"originalBodyGuideWidthWeightPreserved":true,"newGuideOrConnector":false,"logicalStrokeDurationChanged":false,"terminalPartitions":[],"approvalScope":"source capsule十分条件のみ/UA AA native未検証","arithmeticRecovery":"初回RAM算術assert namespace呼出しで未完了→.ok訂正tailPASS/資料変更0"},staticMappingApproved:true,directionApproved:false,temporalOrderApproved:false,nativeApproval:false,actualAppUI:false,runtimeApplied:false};
}
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);const bytes=readFileSync(new URL('./source.json',import.meta.url));assert.equal(sha(bytes),FIXED_CACHE_SHA);const c=JSON.parse(bytes);assert.deepEqual(c.identity,IDENTITY);assert.deepEqual(c.sourceGroups,EXPECTED_GROUPS);assert.equal(digest(c.strokes),c.geometrySHA256);cachedCalls++;return c.strokes;}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1));}
export const projectionCallCount=()=>projectionRuns,cachedPositiveCallCount=()=>cachedCalls;
