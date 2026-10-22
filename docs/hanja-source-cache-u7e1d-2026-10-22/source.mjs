import assert from 'node:assert/strict';
import{readFileSync,existsSync}from'node:fs';
import{createHash}from'node:crypto';
export{renderProgressive}from'../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs';
const sha=v=>createHash('sha256').update(v).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const IDENTITY={"root":"u7e1d","file":"../hanja-public-glyphwiki-engine-capture-second-six-2026-10-22/engine-whole-u7e1d.json","fileSHA256":"b278e11ebed3c0b66c02f7d5eca2edac92aefa55292f60e1c2fbe919b34b289c"},EXPECTED_GROUPS=[[0,1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11,12],[13],[14],[15],[16,17],[18],[19]],ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11,12],[13],[14],[15],[16],[17],[18],[19]],LOGICAL_ATOMS=[[0,1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15,16],[17],[18]];
const RAW_COUNT=20,ORIGINAL=[[{"kind":"cdDrawCurve","args":[49.2,16,39.4,37,27.5,56,0,7]}],[{"kind":"cdDrawCurve","args":[12.8,45,29.6,56,36.6,76,7,8]}],[{"kind":"cdDrawCurve","args":[69.5,39,49.9,76,26.8,110,0,7]}],[{"kind":"cdDrawCurve","args":[14.2,113,43.6,109,69.5,101,0,7]}],[{"kind":"cdDrawCurve","args":[54.8,78,68.1,91,73.7,114,7,8]}],[{"kind":"cdDrawLine","args":[46.4,109,46.4,186,32,0]}],[{"kind":"cdDrawCurve","args":[29.6,127,26.8,155,12.8,180,0,7]}],[{"kind":"cdDrawCurve","args":[55.5,122,68.1,136,73,161,7,8]}],[{"kind":"cdDrawCurve","args":[164.65,22,139.4,31,100.01,37,0,7]}],[{"kind":"cdDrawLine","args":[100.01,15,100.01,44,0,1]},{"kind":"cdDrawCurve","args":[100.01,44,100.01,54,110.01,54,1,2001]},{"kind":"cdDrawLine","args":[110.01,54,176.77,54,2006,5]}],[{"kind":"cdDrawLine","args":[114.4631,74.9,114.4631,134.24,1012,313]}],[{"kind":"cdDrawLine","args":[114.4631,74.9,167.3669,74.9,2,2]}],[{"kind":"cdDrawLine","args":[167.3669,74.9,167.3669,134.24,22,323]}],[{"kind":"cdDrawLine","args":[114.4631,94.25,167.3669,94.25,2,2]}],[{"kind":"cdDrawLine","args":[114.4631,113.6,167.3669,113.6,2,2]}],[{"kind":"cdDrawLine","args":[114.4631,134.24,167.3669,134.24,2,2]}],[{"kind":"cdDrawLine","args":[90.92,69,90.92,151,1000,113]}],[{"kind":"cdDrawLine","args":[90.92,151,187.88,151,2,0]}],[{"kind":"cdDrawCurve","args":[119.2,161,99,177,68.7,187,0,7]}],[{"kind":"cdDrawCurve","args":[137.38,161,164.65,167,181.82,183,7,8]}]],TRACE_SHA256="1eea4b484ab8e2f916a6aa71439872defdd352861940e222a3ace044c14b9fe9",GROUPS_SHA256="9b0e2da29b7331859498e18cc52fdbcaad262f10ce27f547c99a4312474c4628",PROOF_SHA256="9c5caf2df7bb851c9e28b5c8790c3274738a0e13f7ef9b0f67ad94d6d2abb114",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[[9]],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[];
const INPUT_PINS=[{"path":"../hanja-public-glyphwiki-engine-capture-second-six-2026-10-22/engine-whole-u7e1d.json","sha256":"b278e11ebed3c0b66c02f7d5eca2edac92aefa55292f60e1c2fbe919b34b289c"},{"path":"../hanja-source-raw-compare-fresh-u7e1d-2026-10-22/native-review.json","sha256":"880ac1208a0f8193d700e2c470e3e0a9edf68fb2651af6521c86010fcb5ce212"},{"path":"../hanja-source-cache-u799b-2026-10-22/source.mjs","sha256":"933f1dc3c6c9aff19ed1e1bb19dbb501ba99c34f757acc8b22afec2802ee6602"}],PROJECTOR_BODY_SHA="f58c62d83c662318ab347384c31cc6403342289cb96fe5523a003b0e2bc72038",sourceGroups=ORIGINAL_SOURCE_GROUPS,endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8),point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0});
const FIXED_CACHE_SHA="b059654ca50044da046eab0ece34121b32bb299bb0b5ac043c84567c819b0f8c";
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');if(Array.isArray(v)){assert.equal(Object.getPrototypeOf(v),Array.prototype);assert.equal(Reflect.ownKeys(v).length,v.length+1);for(let i=0;i<v.length;i++){assert(Object.hasOwn(v,i));const d=Object.getOwnPropertyDescriptor(v,String(i));assert(d&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}assert.equal(Object.getPrototypeOf(v),Object.prototype);assert.equal(Reflect.ownKeys(v).length,Object.keys(v).length);for(const k of Object.keys(v)){const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}
export const sourceRoot='u7e1d',selectedProofIdentity=clone(IDENTITY),logicalSourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
function validateSelectedProof(trace,proof,identity){assert.equal(arguments.length,3);strictJSON(trace);strictJSON(proof);strictJSON(identity);assert.deepEqual(identity,IDENTITY);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);for(const p of INPUT_PINS)assert.equal(sha(readFileSync(new URL(p.path,import.meta.url))),p.sha256,p.path);const raw=readFileSync(new URL(IDENTITY.file,import.meta.url));assert.equal(sha(raw),IDENTITY.fileSHA256);assert.deepEqual(JSON.parse(raw),proof);assert.equal(digest(proof),PROOF_SHA256);assert.deepEqual(trace,proof.trace);const e=JSON.parse(readFileSync(new URL(INPUT_PINS[1].path,import.meta.url)));assert.equal(e.sourceRoot,sourceRoot);assert.deepEqual(e.staticCorrespondenceOneBased,EXPECTED_GROUPS.map(g=>g.map(i=>i+1)));assert.equal(e.approval.staticCorrespondence,true);assert.equal(sha(compileBound.toString()),PROJECTOR_BODY_SHA);}
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
export function captureProjection(...args){assert.equal(args.length,3);assert(!existsSync(new URL('./source.json',import.meta.url)),'public cache exists; projection disabled');assert.equal(projectionRuns,0);validateSelectedProof(...args);projectionRuns++;const atoms=compileBound(...args),strokes=LOGICAL_ATOMS.map(a=>a.flatMap(i=>atoms[i]));assert.equal(atoms.length,19);assert.equal(strokes.length,16);assert.equal(strokes.flat().length,20);assert.equal(strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)?.length??0),0),46);const tail=args[1].trace[9][2].polygons[2];assert.equal(digest(tail),'27ac9c3c7f9f7a1fb1a066d120005bb1b2287aad027d146c5f2c602e09a1e508');assert.deepEqual(strokes[13].map(m=>m.direction),['down','right']);assert.equal(strokes[7][0].revealWidth,14);return{schema:'hanja-fixed-source-cache/v1',root:sourceRoot,identity:clone(IDENTITY),sourceGroups:clone(EXPECTED_GROUPS),atomicSourceGroups:clone(ORIGINAL_SOURCE_GROUPS),strokes,geometrySHA256:digest(strokes),pureProjectorBodySHA256:PROJECTOR_BODY_SHA,preparation:{successfulPureProjectionOperations:1,internalPureCompileBoundCalls:1,originalCompilerCalls:0,existingCandidateFactoryCalls:0,engineRuns:0,newTerminalDerivations:1},sourcePreservation:{original46PolygonsExactlyOnce:true,QQ1Gap:[-14.7,-11],QQ2Gap:[-12.6,3],QQIndependentMasks:true,UP8:{raw:10,args:[110.01,54,176.77,54,2006,5],quadSHA256:digest(tail),width:5,jump:17,tailWeight:8.5,bodyWeight:strokes[7][0].weight,bodyGuideUnchanged:true,bodyWidth:14,bodyTailBoundary:strokes[7][0].weight/(strokes[7][0].weight+8.5),fixedPerPenDurationUnchanged:true},VH14:{raw:[17,18],args:[[90.92,69,90.92,151,1000,113],[90.92,151,187.88,151,2,0]],originalFootPreserved:true,independentCardinal:true,weights:strokes[13].map(m=>m.weight)},newGuideOrConnector:false},staticMappingApproved:true,directionApproved:false,temporalOrderApproved:false,nativeApproval:false,actualAppUI:false,runtimeApplied:false};}
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);const bytes=readFileSync(new URL('./source.json',import.meta.url));assert.equal(sha(bytes),FIXED_CACHE_SHA);const c=JSON.parse(bytes);assert.deepEqual(c.identity,IDENTITY);assert.deepEqual(c.sourceGroups,EXPECTED_GROUPS);assert.equal(digest(c.strokes),c.geometrySHA256);cachedCalls++;return c.strokes;}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1));}
export const projectionCallCount=()=>projectionRuns,cachedPositiveCallCount=()=>cachedCalls;
