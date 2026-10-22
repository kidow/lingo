import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const sha=v=>createHash('sha256').update(v).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const IDENTITY={"root":"u5126","file":"../hanja-public-glyphwiki-engine-capture-u5126-2026-10-22/engine-whole-u5126.json","fileSHA256":"1c45e7464ff0f997ca04300342c8001cfb140c08b137986dee4f7ae0371a9021"},EXPECTED_GROUPS=[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11,12],[13],[14],[15],[16],[17],[18]],ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18]],LOGICAL_ATOMS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10,11],[12],[13],[14],[15],[16],[17]],sourceGroups=ORIGINAL_SOURCE_GROUPS;
const RAW_COUNT=19,ORIGINAL=[[{"kind":"cdDrawCurve","args":[68.175,15,45.9,72,12.9,117,0,7]}],[{"kind":"cdDrawLine","args":[45.9,73,45.9,186,0,0]}],[{"kind":"cdDrawLine","args":[129.45,13,129.45,37,0,32]}],[{"kind":"cdDrawLine","args":[80.46000000000001,37,186.72,37,2,0]}],[{"kind":"cdDrawLine","args":[80.46000000000001,37,80.46000000000001,96,1012,1]},{"kind":"cdDrawCurve","args":[80.46000000000001,96,80.46000000000001,163,65.28,187,1001,7]}],[{"kind":"cdDrawLine","args":[80.46000000000001,57.6,172.92000000000002,57.6,2,2]}],[{"kind":"cdDrawLine","args":[172.92000000000002,57.6,172.92000000000002,82.775,22,323]}],[{"kind":"cdDrawLine","args":[113.58,36.4,113.58,82.775,0,32]}],[{"kind":"cdDrawLine","args":[143.94,36.4,143.94,82.775,0,32]}],[{"kind":"cdDrawLine","args":[80.46000000000001,82.775,172.92000000000002,82.775,2,2]}],[{"kind":"cdDrawLine","args":[101.16,109.275,132.9,109.275,2,200]}],[{"kind":"cdDrawLine","args":[101.16,86.75,101.16,135.775,1000,32]}],[{"kind":"cdDrawCurve","args":[86.67,143.725,108.75,138.425,136.35,126.5,0,7]}],[{"kind":"cdDrawCurve","args":[173.61,101.325,163.95,109.275,143.25,115.9,0,7]}],[{"kind":"cdDrawLine","args":[143.25,86.75,143.25,129.75,0,1]},{"kind":"cdDrawCurve","args":[143.25,129.75,143.25,139.75,153.25,139.75,1,1]},{"kind":"cdDrawLine","args":[153.25,139.75,182.57999999999998,139.75,6,5]}],[{"kind":"cdDrawCurve","args":[98.83125,149.3,98.22749999999999,172.395,86.1525,180.59,7,8]}],[{"kind":"cdDrawCurve","args":[114.52875,150.79000000000002,122.98125,163.45499999999998,121.77375,179.1,7,8]}],[{"kind":"cdDrawCurve","args":[137.47125,150.79000000000002,148.9425,163.45499999999998,150.15,179.1,7,8]}],[{"kind":"cdDrawCurve","args":[161.62125,150.04500000000002,176.11124999999998,164.2,179.73375,180.59,7,8]}]],TRACE_SHA256="d744e65fe1c0e42cd89700b19e6c14903590414089d44aec0607e5f4f3843bfb",GROUPS_SHA256="dc2a5461eaa90cedd9f9d56ed1c23a85de663f7a53d554c39d47122d588768de",PROOF_SHA256="90b742c8f7c734cc1854c8304cd7645ae5e81c717cdc577eee2e208df7b976a5",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[[14]],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[];
const INPUT_PINS=[{"path":"../hanja-public-glyphwiki-engine-capture-u5126-2026-10-22/engine-whole-u5126.json","sha256":"1c45e7464ff0f997ca04300342c8001cfb140c08b137986dee4f7ae0371a9021"},{"path":"../hanja-source-raw-compare-u5126-pairs-2026-10-22/native-review.json","sha256":"1019ef01168d16a7c17b26019f69ca78a918e6fb2b13e2e4c0f67c3ffe9d31de"},{"path":"../hanja-goal-glyphwiki-batch988-2026-10-13/sources.json","sha256":"e1aa3838bb55838c79c3604482ac724f5c05ed269683889de69a8a0b953136d5"}],PROJECTOR_BODY_SHA='f58c62d83c662318ab347384c31cc6403342289cb96fe5523a003b0e2bc72038';
const endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8),point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0});
const FIXED_CACHE_SHA='b4f971c7739d7d6487c52e5bc787267c908fc1e697120412f96d2b8a8f40a342';
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');if(Array.isArray(v)){assert.equal(Object.getPrototypeOf(v),Array.prototype);assert.equal(Reflect.ownKeys(v).length,v.length+1);for(let i=0;i<v.length;i++){assert(Object.hasOwn(v,i));const d=Object.getOwnPropertyDescriptor(v,String(i));assert(d&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}assert.equal(Object.getPrototypeOf(v),Object.prototype);assert.equal(Reflect.ownKeys(v).length,Object.keys(v).length);for(const k of Object.keys(v)){const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}
export const sourceRoot='u5126',selectedProofIdentity=clone(IDENTITY),logicalSourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
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
export function captureProjection(...args){assert.equal(args.length,3);assert(!existsSync(new URL('./source.json',import.meta.url)),'fixed cache exists; no repeated projection');assert.equal(projectionRuns,0);validateSelectedProof(...args);projectionRuns++;const atoms=compileBound(...args),strokes=LOGICAL_ATOMS.map(a=>a.flatMap(i=>atoms[i]));assert.equal(strokes.length,17);assert.equal(strokes.flat().length,19);assert.equal(strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)?.length??0),0),46);return{schema:'hanja-fixed-source-cache/v1',root:sourceRoot,identity:clone(IDENTITY),sourceGroups:clone(EXPECTED_GROUPS),atomicSourceGroups:clone(ORIGINAL_SOURCE_GROUPS),strokes,geometrySHA256:digest(strokes),pureProjectorBodySHA256:PROJECTOR_BODY_SHA,preparation:{candidateBatch:1368,batchAssignmentProvisional:true,successfulPureProjectionOperations:1,internalPureCompileBoundCalls:1,originalCompilerCalls:0,existingCandidateFactoryCalls:0,engineRuns:0,newTerminalDerivations:1},sourcePreservation:{original46PolygonsExactlyOnce:true,all19RawExactlyOnce:true,raw5VQ:{rawOneBased:[5],originalType7:true,originalCallsPreserved:true},HV6:{rawOneBased:[6,7],originalExactEndpoint:true,unmodifiedTerminal323:true,split:false},independent11:{rawOneBased:[12,13],maskCount:2,endpointGapSourceUnits:[-14.489999999999995,7.949999999999989],newConnector:false},UP13:{rawOneBased:[15],originalTerminal6And5QuadSeparate:true,bodyGuideWidthWeightPreserved:true,tailWeight:12.5},originalCallFieldsUnchanged:true,newGuideOrConnector:false,activeBoundsPolicy:'body bounds from retained body polygons; tail bounds from original emitted quad'},terminalReview:{"sourceFull5SHA256":"1c45e7464ff0f997ca04300342c8001cfb140c08b137986dee4f7ae0371a9021","HV6":[{"raw":6,"points":4,"maxDistanceSquaredSource":"40036000000000012000000000001/10000000000000000000000000000","radiusSquaredSource":"196","strictCovered":true},{"raw":7,"points":9,"maxDistanceSquaredSource":"301400999999998902000000000001/2500000000000000000000000000","radiusSquaredSource":"196","strictCovered":true}],"UP13":{"quadMatchesExactKernel":true,"quad":[{"x":182.5,"y":133.7,"off":0},{"x":184.5,"y":108.7,"off":0},{"x":182.5,"y":108.7,"off":0},{"x":176.5,"y":133.7,"off":0}],"jumpSource":"25","tailWeightDisplay":"25/2","witness":{"x":182.5,"y":108.7,"off":0},"lowerBoundsSource":{"finalHdy":"621/20","firstVdx":"157/4","QHullDx":"117/4"},"strictOutsideWholeRoundTube":true},"arithmeticFirst":true,"rasterApproval":false},staticMappingApproved:true,directionApproved:false,temporalOrderApproved:false,nativeApproval:false,actualAppUI:false,runtimeApplied:false};}
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);const bytes=readFileSync(new URL('./source.json',import.meta.url));assert.equal(sha(bytes),FIXED_CACHE_SHA);const c=JSON.parse(bytes);assert.deepEqual(c.identity,IDENTITY);assert.deepEqual(c.sourceGroups,EXPECTED_GROUPS);assert.equal(digest(c.strokes),c.geometrySHA256);cachedCalls++;return c.strokes;}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1));}
export const projectionCallCount=()=>projectionRuns,cachedPositiveCallCount=()=>cachedCalls;
