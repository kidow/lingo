export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs';
import assert from 'node:assert/strict';import{readFileSync,existsSync}from'node:fs';import{createHash}from'node:crypto';import{fileURLToPath}from'node:url';
const json=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=x=>createHash('sha256').update(x).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const T=json('./config.json').targets.u5611,FIXED_PINS={"../hanja-goal-glyphwiki-batch1030-2026-10-13/NOTICE.md":"ddc93e40e7684359342cec763f52d49f75561a11a74aa0862e4e40eae2290602","../hanja-goal-glyphwiki-batch1030-2026-10-13/README.md":"8b8bfbc397ca66caa0232b57f13dcf03e26b858a8d7aa9eb240a06081b1a27f4","../hanja-goal-glyphwiki-batch1030-2026-10-13/metadata.json":"800e7cfe1794558bf35aee8ddd2af0951992d584408678c6f353d97de4c4e6c6","../hanja-goal-glyphwiki-batch1030-2026-10-13/sources.json":"117e8d82fa6bd8ffab98a5827f9e84e5acdfbb66bdd2af59a532ee8df7f9d800","../hanja-goal-glyphwiki-batch1030-2026-10-13/source-analysis.json":"fedbd0ad7da053d8217a873e3fd8df206de14c113cd331df2baf07f809aad4d3","../hanja-goal-glyphwiki-batch1030-2026-10-13/source-join-analysis.json":"5492627b85c00a9c896811bddad4daacc4469b7b0e71f9bdc3c68a6a9557357a","../hanja-goal-glyphwiki-batch1030-2026-10-13/source-hold.json":"e17634ea3c8b2fb5bebd3aafa3ad52bac25085f69d2425500d1d96476a1f8e51","../hanja-goal-glyphwiki-batch1030-2026-10-13/candidate-compile-analysis.json":"75892dad46a211f8a182039bd6f786ea2318d0e27c3fc6d8cf0b889511f5229a","../hanja-goal-glyphwiki-batch1030-2026-10-13/engine-proof.json":"b1e65ef6c58827ebae1a8d63919c80e8e2c3cb2c74d846b26743630212b0047a","../hanja-goal-glyphwiki-batch1030-2026-10-13/engine-whole-u5611.json":"b1e65ef6c58827ebae1a8d63919c80e8e2c3cb2c74d846b26743630212b0047a","../hanja-source-raw-compare-u5611-2026-10-22/README.md":"4175af0b12d99d0cba4d44cbd031b645a772be99edf7ff4270a2280f71397bc9","../hanja-source-raw-compare-u5611-2026-10-22/check.mjs":"0a982eb65b38f2356f7b4d23f3b91e6a2309f422f6a3f2b3fb66b9f7b2ffbd34","../hanja-source-raw-compare-u5611-2026-10-22/config.json":"a150ea4423e99a1174422220b7294b76c09a8e0b2941f2b671277785895177b1","../hanja-source-raw-compare-u5611-2026-10-22/serve.py":"25266cacf9c4aa8fe22e808e7446c0d5332bd1ddbbf374c267bdfc45067e90f7","../hanja-source-raw-compare-u5611-2026-10-22/validation.json":"d1a26d0ef78da0e272b5f02b36ecd04c779b1ec0b7e877e34b8409d1a4f4d8f4","../hanja-source-raw-review-u5611-2026-10-22/README.md":"0c801be14ce46666aa474bc8cc58d95277280e43a81d9a2c669c863677cdee49","../hanja-source-raw-review-u5611-2026-10-22/review.json":"343664c70675762ba430a4b2b2712d57c8e4a62b948c89b94755800eae7b26c5","../hanja-source-independent-hq-qq-u9654-source-experiment-2026-10-21/candidate.mjs":"8c8d93691d023ee16df89f5d5f848acde016ee79a8ba9178522ed4105283c212","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09"},EXPECTED_IDENTITY={"sourceRoot":"u5611","sourceProofFile":"engine-proof.json","sourceProofFileSha256":"b1e65ef6c58827ebae1a8d63919c80e8e2c3cb2c74d846b26743630212b0047a"},EXPECTED_GROUPS=[[0],[1,2],[3],[5],[4],[6,8],[7],[9],[10],[11],[12],[13],[14],[15]];
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');if(Array.isArray(v)){assert.equal(Object.getPrototypeOf(v),Array.prototype);assert.equal(Reflect.ownKeys(v).length,v.length+1);for(let i=0;i<v.length;i++){assert(Object.hasOwn(v,i));const d=Object.getOwnPropertyDescriptor(v,String(i));assert(d&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}assert.equal(Object.getPrototypeOf(v),Object.prototype);assert.equal(Reflect.ownKeys(v).length,Object.keys(v).length);for(const k of Object.keys(v)){const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}
export const sourceRoot='u5611',selectedProofIdentity=clone(EXPECTED_IDENTITY),sourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
const EXPECTED_CONFIG_SHA="4c062cfa5367000581dbe896238fe7d1b345e750d680551a8caa59f9890954d7";
function validateSelectedProof(trace,proof,identity){assert.equal(arguments.length,3);strictJSON(identity);strictJSON(proof);strictJSON(trace);assert.equal(sha(readFileSync(new URL('./config.json',import.meta.url))),EXPECTED_CONFIG_SHA);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.sourceGroups,EXPECTED_GROUPS);for(const[p,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h,p);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),"563b8a43ad6cfbb56fd91517f99e9e1f5e55cfca10ce4bb940c3eea77bf89de2");assert.deepEqual(trace,proof.trace);assert.equal(T.actualFull5File,"../hanja-goal-glyphwiki-batch1030-2026-10-13/engine-proof.json");assert.equal(sha(readFileSync(new URL(T.actualFull5File,import.meta.url))),EXPECTED_IDENTITY.sourceProofFileSha256);assert.deepEqual(json(T.actualFull5File),proof);assert.equal(T.matchingWholeFull5File,"../hanja-goal-glyphwiki-batch1030-2026-10-13/engine-whole-u5611.json");assert.equal(T.matchingWholeFull5SHA256,EXPECTED_IDENTITY.sourceProofFileSha256);const bytes=readFileSync(new URL(T.matchingWholeFull5File,import.meta.url));assert.equal(sha(bytes),T.matchingWholeFull5SHA256);const selected=JSON.parse(bytes);assert.deepEqual(Object.keys(selected).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(selected,proof);}
const RAW_COUNT=16,ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15]],ORIGINAL=[[{"kind":"cdDrawLine","args":[26.4223,43.72,26.4223,132.28,12,13]}],[{"kind":"cdDrawLine","args":[26.4223,43.72,61.00769999999999,43.72,2,2]}],[{"kind":"cdDrawLine","args":[61.00769999999999,43.72,61.00769999999999,132.28,22,23]}],[{"kind":"cdDrawLine","args":[26.4223,132.28,61.00769999999999,132.28,2,2]}],[{"kind":"cdDrawLine","args":[124.86000000000001,32,177.9,32,2,0]}],[{"kind":"cdDrawLine","args":[124.86000000000001,15,124.86000000000001,48,0,32]}],[{"kind":"cdDrawLine","args":[85.08,48,176.795,48,2,2]}],[{"kind":"cdDrawLine","args":[85.08,48,85.08,100,12,1]},{"kind":"cdDrawCurve","args":[85.08,100,85.08,165,62.980000000000004,187,1,7]}],[{"kind":"cdDrawCurve","args":[176.795,48,171.27,60,164.64,73,22,7]}],[{"kind":"cdDrawLine","args":[86.185,75,162.43,67,0,0]}],[{"kind":"cdDrawLine","args":[121.54499999999999,51,121.54499999999999,77,0,1]},{"kind":"cdDrawCurve","args":[121.54499999999999,77,121.54499999999999,87,131.545,87,1,1]},{"kind":"cdDrawLine","args":[131.545,87,177.9,87,6,5]}],[{"kind":"cdDrawCurve","args":[164.64,101,134.805,109,96.13,112,0,7]}],[{"kind":"cdDrawCurve","args":[98.34,119,111.6,127,118.22999999999999,139,7,8]}],[{"kind":"cdDrawCurve","args":[171.27,117,162.43,129,148.065,146,0,7]}],[{"kind":"cdDrawLine","args":[90.605,149,186.74,149,0,0]}],[{"kind":"cdDrawLine","args":[137.015,112,137.015,173,0,1]},{"kind":"cdDrawCurve","args":[137.015,173,137.015,183,127.01499999999999,183,1,14]}]],TRACE_SHA256="b7d7c7de03c25d0c580bb99bf4940103855e64e53f52a6524279050dbd839982",GROUPS_SHA256="4cc090eb238075077194af709acd2d3d1118ff0519109ab82b8d8e608ef6c243",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[];
const endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8),point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0});
function projectRaw(trace,proof,identity){const sourceGroups=ORIGINAL_SOURCE_GROUPS;
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

return compileBound(trace,proof,identity)}
let projectionRuns=0,internalRawProjectorRuns=0,cachedCalls=0;
export function captureProjection(...args){assert.equal(args.length,3);assert(!existsSync(new URL('./fixtures.json',import.meta.url)),'public fixture exists; projection disabled');validateSelectedProof(...args);assert.equal(projectionRuns,0);projectionRuns++;internalRawProjectorRuns++;const[trace,proof,identity]=args,rawBaseline=projectRaw(trace,proof,identity),strokes=EXPECTED_GROUPS.map(g=>g.flatMap(i=>rawBaseline[i]));return{fullProof:proof,rawBaseline,baseline:clone(strokes),strokes,traceProjectionOperations:1,newInternalRawProjectorExecutions:1,originalCompilerExecutions:0,existingFactoryCalls:0,engineRuns:0,tailDerivations:0,staticMappingApproved:true,nativeAnimationApproved:false,nativeApproval:false,runtimeApplied:false}}
export function traceProjectionCallCount(){return projectionRuns}export function newInternalRawProjectorCallCount(){return internalRawProjectorRuns}export function cachedPositiveCallCount(){return cachedCalls}export function originalSourceCompilerCallCount(){return 0}export function existingFactoryCallCount(){return 0}
if(process.argv[1]===fileURLToPath(import.meta.url)){assert.equal(process.argv.length,3);assert.equal(process.argv[2],'--author-capture-once');const proof=json(T.actualFull5File);process.stdout.write(JSON.stringify({u5611:captureProjection(proof.trace,proof,EXPECTED_IDENTITY)}))}
const FIXED_RAW_SHA="8d189e007ab13d02e82f7f541c3887e7577c4d5d74087dde3fd210c5c90fa244",FIXED_COMPILED_SHA="23a8bf5267cde446e1fd1fc487430cdd37683e1d4289e37d57c74dc5f2772b53",FIXED_PAYLOAD_SHA="6bd249199e300c73bd49f827a6f696384019cd7afc142762bb7a147a1be2f9cc",FIXED_FILE_SHA="12f102dd1e8b58ecf912bceec9267a131997309abb64d665649f02c6d17e04ff";
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);assert.equal(T.rawBaselineSHA256,FIXED_RAW_SHA);assert.equal(T.derivedSHA256,FIXED_COMPILED_SHA);assert.equal(T.fixturePayloadSHA256,FIXED_PAYLOAD_SHA);const bytes=readFileSync(new URL('./fixtures.json',import.meta.url));assert.equal(sha(bytes),FIXED_FILE_SHA);const f=JSON.parse(bytes).u5611;assert.equal(digest(f),FIXED_PAYLOAD_SHA);assert.deepEqual(f.fullProof,args[1]);assert.equal(digest(f.rawBaseline),FIXED_RAW_SHA);assert.equal(digest(f.strokes),FIXED_COMPILED_SHA);assert.deepEqual(f.baseline,f.strokes);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1))}
