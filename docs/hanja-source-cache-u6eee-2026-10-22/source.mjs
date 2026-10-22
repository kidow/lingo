import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const sha=v=>createHash('sha256').update(v).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const IDENTITY={"root":"u6eee","file":"../hanja-public-glyphwiki-engine-capture-u6eee-2026-10-22/engine-whole-u6eee.json","fileSHA256":"3685c250740f4f1af5c048704b45de7b9dfd336b4be838a79eda5d01a99a7725"},EXPECTED_GROUPS=[[0],[1],[2,3],[5],[4],[6,8],[7],[9],[10],[11],[12],[13],[14],[15]],ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[5],[4],[6,8],[7],[9],[10],[11],[12],[13],[14],[15]],LOGICAL_ATOMS=[[0],[1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14]],sourceGroups=ORIGINAL_SOURCE_GROUPS;
const RAW_COUNT=16,ORIGINAL=[[{"kind":"cdDrawCurve","args":[23.53,20,39.28,27,46.21,41,7,8]}],[{"kind":"cdDrawCurve","args":[11.559999999999999,66,28.57,73,34.870000000000005,87,7,8]}],[{"kind":"cdDrawCurve","args":[12.82,133,34.870000000000005,142,32.35,184,7,8]}],[{"kind":"cdDrawCurve","args":[29.2,150,31.72,138,58.18,67,32,7]}],[{"kind":"cdDrawLine","args":[94.36,35,132.1,35,2,100]}],[{"kind":"cdDrawLine","args":[94.36,14,94.36,56,0,32]}],[{"kind":"cdDrawLine","args":[68.46000000000001,56,128.4,56,2,2]}],[{"kind":"cdDrawLine","args":[68.46000000000001,56,68.46000000000001,126,12,1]},{"kind":"cdDrawCurve","args":[68.46000000000001,126,68.46000000000001,170,56.62,187,1,7]}],[{"kind":"cdDrawCurve","args":[128.4,56,126.92,65,121.74,77,22,7]}],[{"kind":"cdDrawLine","args":[74.38,90,119.52,79,0,100]}],[{"kind":"cdDrawLine","args":[94.36,64,94.36,96,0,1]},{"kind":"cdDrawCurve","args":[94.36,96,94.36,106,104.36,106,1,1]},{"kind":"cdDrawLine","args":[104.36,106,126.18,106,6,5]}],[{"kind":"cdDrawCurve","args":[94.36,120,92.14,173,67.72,187,0,7]}],[{"kind":"cdDrawLine","args":[112.12,121,112.12,166,0,1]},{"kind":"cdDrawCurve","args":[112.12,166,112.12,176,122.12,176,1,1]},{"kind":"cdDrawLine","args":[122.12,176,182.42,176,6,5]}],[{"kind":"cdDrawCurve","args":[172.2191,19.03,157.5338,46.71,136.8656,67.47,0,7]}],[{"kind":"cdDrawCurve","args":[175.4825,60.55,159.70940000000002,91.69,136.8656,111.585,0,7]}],[{"kind":"cdDrawCurve","args":[179.8337,102.935,160.25330000000002,142.725,130.3388,161.755,0,7]}]],TRACE_SHA256="7ba396a7b22de1282fb5a7a74ce8eaff5b7e870828805f47fcce68e93bbafec8",GROUPS_SHA256="65aa14995f655a8ceb96e140f693457031562a63c55ff26e5feafcd9e9f870be",PROOF_SHA256="1b6bbf8738e1ea8f3ac60885dda23a5b2a90029e00eb52a8cc28710a3b8d3d23",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[[10],[12]],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[];
const INPUT_PINS=[{"path":"../hanja-public-glyphwiki-engine-capture-u6eee-2026-10-22/engine-whole-u6eee.json","sha256":"3685c250740f4f1af5c048704b45de7b9dfd336b4be838a79eda5d01a99a7725"},{"path":"../hanja-source-raw-compare-u6eee-base-pairs-2026-10-22/native-review.json","sha256":"70daa585ece72478b6c745692def0e1511ffc5b5d025c0bfc3fa865fd4c3f8e5"},{"path":"../hanja-goal-glyphwiki-batch987-2026-10-13/sources.json","sha256":"694b518cf660b62e7bc1b212084b23ec7a55dbcbf50fcc776110dbed93a49a3f"}],PROJECTOR_BODY_SHA='f58c62d83c662318ab347384c31cc6403342289cb96fe5523a003b0e2bc72038';
const endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8),point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0});
const FIXED_CACHE_SHA='ba2095a8a07953bba93787d9d46151422a80d10960cf3e6f94d104ec6ec60a9d';
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');if(Array.isArray(v)){assert.equal(Object.getPrototypeOf(v),Array.prototype);assert.equal(Reflect.ownKeys(v).length,v.length+1);for(let i=0;i<v.length;i++){assert(Object.hasOwn(v,i));const d=Object.getOwnPropertyDescriptor(v,String(i));assert(d&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}assert.equal(Object.getPrototypeOf(v),Object.prototype);assert.equal(Reflect.ownKeys(v).length,Object.keys(v).length);for(const k of Object.keys(v)){const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}
export const sourceRoot='u6eee',selectedProofIdentity=clone(IDENTITY),logicalSourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
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
export function captureProjection(...args){assert.equal(args.length,3);assert(!existsSync(new URL('./source.json',import.meta.url)),'fixed cache exists; no repeated projection');assert.equal(projectionRuns,0);validateSelectedProof(...args);projectionRuns++;const atoms=compileBound(...args),strokes=LOGICAL_ATOMS.map(a=>a.flatMap(i=>atoms[i]));assert.equal(strokes.length,14);assert.equal(strokes.flat().length,17);assert.equal(strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)?.length??0),0),47);return{schema:'hanja-fixed-source-cache/v1',root:sourceRoot,identity:clone(IDENTITY),sourceGroups:clone(EXPECTED_GROUPS),atomicSourceGroups:clone(ORIGINAL_SOURCE_GROUPS),strokes,geometrySHA256:digest(strokes),pureProjectorBodySHA256:PROJECTOR_BODY_SHA,preparation:{candidateBatch:1371,batchAssignmentProvisional:true,successfulPureProjectionOperations:1,internalPureCompileBoundCalls:1,originalCompilerCalls:0,existingCandidateFactoryCalls:0,engineRuns:0,newTerminalDerivations:2},sourcePreservation:{original47PolygonsExactlyOnce:true,all16RawExactlyOnce:true,QQ3:{rawOneBased:[3,4],independentMasks:true,endpointGapSourceUnits:[-3.150000000000002,-34],newConnector:false},fold6:{rawOneBased:[7,9],originalExactEndpoint:true,sourceOrderAroundRaw8ApprovedForStaticOnly:true,newConnector:false},raw8VQ:{logicalPen:7,originalRawOneBased:8,originalCallsPreserved:true},UP9:{rawOneBased:[11],originalTerminal6And5QuadSeparate:true,bodyGuideWidthWeightPreserved:true,tailWeight:12.5},UP11:{rawOneBased:[13],originalTerminal6And5QuadSeparate:true,bodyGuideWidthWeightPreserved:true,tailWeight:12.5},originalCallFieldsUnchanged:true,newGuideOrConnector:false,activeBoundsPolicy:'body bounds from retained body polygons; tail bounds from original emitted quads'},terminalReview:{"sourceFull5SHA256":"3685c250740f4f1af5c048704b45de7b9dfd336b4be838a79eda5d01a99a7725","UP9And11":[{"pen":9,"rawOneBased":11,"originalLastArgs":[104.36,106,126.18,106,6,5],"quad":[{"x":126.1,"y":100,"off":0},{"x":128.1,"y":75,"off":0},{"x":126.1,"y":75,"off":0},{"x":120.1,"y":100,"off":0}],"quadMatchesExactKernel":true,"jumpSource":"25","tailWeightDisplay":"25/2","witness":{"x":126.1,"y":75,"off":0},"lowerBoundsSource":{"finalHdy":"31","firstVdx":"1587/50","QHullDx":"1087/50"},"strictOutsideWholeRoundTube":true},{"pen":11,"rawOneBased":13,"originalLastArgs":[122.12,176,182.42,176,6,5],"quad":[{"x":182.4,"y":170,"off":0},{"x":184.4,"y":145,"off":0},{"x":182.4,"y":145,"off":0},{"x":176.4,"y":170,"off":0}],"quadMatchesExactKernel":true,"jumpSource":"25","tailWeightDisplay":"25/2","witness":{"x":182.4,"y":145,"off":0},"lowerBoundsSource":{"finalHdy":"31","firstVdx":"1757/25","QHullDx":"1507/25"},"strictOutsideWholeRoundTube":true}],"arithmeticFirst":true,"rasterApproval":false},staticMappingApproved:true,directionApproved:false,temporalOrderApproved:false,nativeApproval:false,actualAppUI:false,runtimeApplied:false};}
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);const bytes=readFileSync(new URL('./source.json',import.meta.url));assert.equal(sha(bytes),FIXED_CACHE_SHA);const c=JSON.parse(bytes);assert.deepEqual(c.identity,IDENTITY);assert.deepEqual(c.sourceGroups,EXPECTED_GROUPS);assert.equal(digest(c.strokes),c.geometrySHA256);cachedCalls++;return c.strokes;}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1));}
export const projectionCallCount=()=>projectionRuns,cachedPositiveCallCount=()=>cachedCalls;
