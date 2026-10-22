import assert from 'node:assert/strict';
import{readFileSync,existsSync}from'node:fs';
import{createHash}from'node:crypto';
const sha=v=>createHash('sha256').update(v).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const IDENTITY={"root":"u85e9-k","file":"../hanja-public-glyphwiki-engine-capture-u85e9-k-2026-10-22/engine-whole-u85e9-k.json","fileSHA256":"cc3aa60c932b5d986141ad8aa81a38b35361334a43ff877c886f10f024311e99"};
const EXPECTED_GROUPS=[[0],[1],[3],[2],[4],[5],[6,7],[8],[9],[10],[11],[12],[13],[14],[15],[16,17],[19],[20],[18]];
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16,17],[18],[19],[20]];
const LOGICAL_ATOMS=[[0],[1],[3],[2],[4],[5],[6,7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[18],[19],[17]];
const RAW_COUNT=21;
const ORIGINAL=[[{"kind":"cdDrawLine","args":[12.935,32.614999999999995,93.53,32.614999999999995,0,100]}],[{"kind":"cdDrawLine","args":[63.68,12.205,63.68,52.24,0,300]}],[{"kind":"cdDrawLine","args":[135.32,12.205,135.32,52.24,0,300]}],[{"kind":"cdDrawLine","args":[105.47,32.614999999999995,186.065,32.614999999999995,0,0]}],[{"kind":"cdDrawCurve","args":[29.645,64.468,49.52,69.6018,58.265,79.8694,7,8]}],[{"kind":"cdDrawCurve","args":[14.54,98.20439999999999,36.004999999999995,103.3382,43.955,113.6058,7,8]}],[{"kind":"cdDrawCurve","args":[16.130000000000003,147.3422,43.955,153.9428,40.775,184.74560000000002,7,8]}],[{"kind":"cdDrawCurve","args":[36.8,159.81,39.98,151.00919999999996,73.37,98.93779999999998,32,7]}],[{"kind":"cdDrawCurve","args":[166.35,58.92,125.92500000000001,65.76,70.485,73.36,0,7]}],[{"kind":"cdDrawCurve","args":[87.81,72.6,98.20500000000001,78.68,102.82499999999999,90.84,7,8]}],[{"kind":"cdDrawCurve","args":[161.73,71.84,153.645,82.47999999999998,140.94,93.12,0,7]}],[{"kind":"cdDrawLine","args":[71.64,94.64,185.985,94.64,0,0]}],[{"kind":"cdDrawLine","args":[127.08000000000001,66.52,127.08000000000001,128.84,32,0]}],[{"kind":"cdDrawCurve","args":[118.995,94.64,99.36000000000001,118.2,64.71,131.12,132,7]}],[{"kind":"cdDrawCurve","args":[131.7,93.88,157.11,115.16,179.055,122.76,7,0]}],[{"kind":"cdDrawLine","args":[86.655,133.4,86.655,173.68,12,113]}],[{"kind":"cdDrawLine","args":[86.655,133.4,168.66,133.4,2,2]}],[{"kind":"cdDrawLine","args":[168.66,133.4,168.66,173.68,22,123]}],[{"kind":"cdDrawLine","args":[86.655,173.68,168.66,173.68,2,2]}],[{"kind":"cdDrawLine","args":[86.655,153.16,167.505,153.16,2,2]}],[{"kind":"cdDrawLine","args":[127.08000000000001,133.4,127.08000000000001,173.68,32,32]}]];
const TRACE_SHA256="c61251e2249d7ced9ce9b845b770f949ed85a3db9e6276b63bf9e6ab2d429044";
const GROUPS_SHA256="23f783d20b618c7ae54b5420b1cff0fd88e05387eb8779a82ab7bb2f86478fb1";
const PROOF_SHA256="de62434a13305563a68e5d73f57190f4703d4e4ff1f3075c37e9fde9730f2579";
const PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5};
const ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f";
const ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"};
const UP_TAIL_GROUPS=[];
const LEFT_TAIL_GROUPS=[];
const SINGLE_CARDINAL_TIP_RAW=[15];
const INPUT_PINS=[{"path":"../hanja-public-glyphwiki-engine-capture-u85e9-k-2026-10-22/engine-whole-u85e9-k.json","sha256":"cc3aa60c932b5d986141ad8aa81a38b35361334a43ff877c886f10f024311e99"},{"path":"../hanja-source-raw-compare-u85e9-k-pairs-2026-10-22/board-config.json","sha256":"bb75972ed0ba4860962cea6e7f91a48848d9260549fa5fdc504ec01689d39b0a"},{"path":"../hanja-source-raw-compare-u85e9-k-pairs-2026-10-22/native-review.json","sha256":"7360199b855431cbcf3f678c26dab5acc52d67ecba007c52e2ad3c83cd58a8a0"},{"path":"../hanja-goal-glyphwiki-batch1083-2026-10-13/sources.json","sha256":"ab178828883f1da6d8f8926bfbfea3aeb3360e1d6a9c850667a235ceabf0a58a"}];
const PROJECTOR_BODY_SHA="f58c62d83c662318ab347384c31cc6403342289cb96fe5523a003b0e2bc72038";
const FIXED_CACHE_SHA="82b3046d1a800772ff76586120161a5b49e1f0d8ca18cc58e3b089ffb449a3a8";
const sourceGroups=ORIGINAL_SOURCE_GROUPS,endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8),point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0});
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');if(Array.isArray(v)){assert.equal(Object.getPrototypeOf(v),Array.prototype);assert.equal(Reflect.ownKeys(v).length,v.length+1);for(let i=0;i<v.length;i++){assert(Object.hasOwn(v,i));const d=Object.getOwnPropertyDescriptor(v,String(i));assert(d&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}assert.equal(Object.getPrototypeOf(v),Object.prototype);assert.equal(Reflect.ownKeys(v).length,Object.keys(v).length);for(const k of Object.keys(v)){const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}
export const sourceRoot='u85e9-k',selectedProofIdentity=clone(IDENTITY),logicalSourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
function validateSelectedProof(trace,proof,identity){assert.equal(arguments.length,3);strictJSON(trace);strictJSON(proof);strictJSON(identity);assert.deepEqual(identity,IDENTITY);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);for(const p of INPUT_PINS)assert.equal(sha(readFileSync(new URL(p.path,import.meta.url))),p.sha256,p.path);const raw=readFileSync(new URL(IDENTITY.file,import.meta.url));assert.equal(sha(raw),IDENTITY.fileSHA256);assert.deepEqual(JSON.parse(raw),proof);assert.equal(digest(proof),PROOF_SHA256);assert.deepEqual(trace,proof.trace);const e=JSON.parse(readFileSync(new URL(INPUT_PINS[2].path,import.meta.url)));assert.equal(e.glyph,'藩');assert.equal(e.actualFull5SHA256,IDENTITY.fileSHA256);assert.deepEqual(e.provisionalGroupsOneBased,EXPECTED_GROUPS.map(g=>g.map(i=>i+1)));assert.equal(e.staticCorrespondenceReviewed,true);assert.equal(sha(compileBound.toString()),PROJECTOR_BODY_SHA);}
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
export function captureProjection(...args){
 assert.equal(args.length,3);assert(!existsSync(new URL('./source.json',import.meta.url)),'public cache exists; projection disabled');assert.equal(projectionRuns,0);validateSelectedProof(...args);projectionRuns++;
 const atoms=compileBound(...args),strokes=LOGICAL_ATOMS.map(a=>a.flatMap(i=>atoms[i]));assert.equal(atoms.length,20);assert.equal(strokes.length,19);assert.equal(strokes.flat().length,20);
 const polys=s=>s.flat().flatMap(m=>m.outline.match(/M[^M]+/g).map(v=>v.trim())).sort();assert.equal(polys(strokes).length,36);assert.equal(strokes[6].length,2);assert.equal(strokes[15].length,1);assert.equal(strokes[15][0].revealPath,'M43.3275 66.7 L84.33 66.7 L84.33 86.84');assert.equal(strokes[15][0].revealWidth,14);
 const h=args[1].trace[16][0],v=args[1].trace[17][0];assert.deepEqual(endpoint(h),v.args.slice(0,2));assert.equal(strokes[14][0].direction,'down');assert.equal(strokes[14][0].revealPath,undefined);
 const qa=args[1].trace[6][0].args,qb=args[1].trace[7][0].args,gap=[qb[0]-qa[4],qb[1]-qa[5]];
 return{schema:'hanja-fixed-source-cache/v1',root:sourceRoot,identity:clone(IDENTITY),sourceGroups:clone(EXPECTED_GROUPS),atomicSourceGroups:clone(ORIGINAL_SOURCE_GROUPS),strokes,geometrySHA256:digest(strokes),pureProjectorBodySHA256:PROJECTOR_BODY_SHA,preparation:{candidateBatch:1369,batchAssignmentProvisional:true,successfulPureProjectionOperations:1,internalPureCompileBoundCalls:1,originalCompilerCalls:0,existingCandidateFactoryCalls:0,engineRuns:0,newTerminalDerivations:0},sourcePreservation:{original36PolygonsExactlyOnce:true,originalPolygonCount:36,emittedPolygonCount:36,noOriginalPolygonSplit:true,originalContourUnchanged:true,newExternalInk:false,originalCallFieldsUnchanged:true,newGuideOrConnector:false,originalGuideWidthWeightPreserved:true,QQ7:{rawOneBased:[7,8],independentMasks:true,endpointGapSourceUnits:gap,newConnector:false,temporalContinuityApproved:false},HV16:{rawOneBased:[17,18],originalExactJoin:true,guide:strokes[15][0].revealPath,width:14,polygonCapsuleMaxSquared:['160121/160000','17881/400'],strictlyBelowRadiusSquared49:true,rasterCoverageApproved:false},V15:{rawOneBased:16,originalSingleQuad:true,cardinalDown:true,fullOriginalBounds:true}},terminalReview:{newTailSplit:0,originalV15CardinalMask:true,fullRoundCoverageProvenForOtherCurves:false,requiredNative:'QQ7 초기·경계·연결 및 모든curve residual/원HV16 완료·잔여 검토 필요'},staticMappingApproved:true,directionApproved:false,temporalOrderApproved:false,nativeApproval:false,actualAppUI:false,runtimeApplied:false};
}
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);const bytes=readFileSync(new URL('./source.json',import.meta.url));assert.equal(sha(bytes),FIXED_CACHE_SHA);const c=JSON.parse(bytes);assert.deepEqual(c.identity,IDENTITY);assert.deepEqual(c.sourceGroups,EXPECTED_GROUPS);assert.equal(digest(c.strokes),c.geometrySHA256);cachedCalls++;return c.strokes;}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1));}
export const projectionCallCount=()=>projectionRuns,cachedPositiveCallCount=()=>cachedCalls;
