export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs';
import assert from 'node:assert/strict';import{readFileSync,existsSync}from'node:fs';import{createHash}from'node:crypto';import{fileURLToPath}from'node:url';
const json=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=x=>createHash('sha256').update(x).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const T=json('./config.json').targets.u4fd3,FIXED_PINS={"../hanja-goal-glyphwiki-batch1067-2026-10-13/NOTICE.md":"7d9f951a48bb8e26b248c1c015548785c0bd7b6307c09804dcf754bbd3c3fcf2","../hanja-goal-glyphwiki-batch1067-2026-10-13/README.md":"eaaf0ff8b285a0ea759bb3db2c486baf395de984e787a007a226a565ea3beb39","../hanja-goal-glyphwiki-batch1067-2026-10-13/candidate-compile-analysis.json":"470e2ea74c28275f0a1dee981b2e2f846793d8c85238f08542b3c151a84a7714","../hanja-goal-glyphwiki-batch1067-2026-10-13/checkpoint-validation.json":"4e30162fc5464686e6bf07fc266223afed47e0f5d5d0606f3626863cbc52b47c","../hanja-goal-glyphwiki-batch1067-2026-10-13/engine-proof.json":"655ccee1ebef3e043e7e2b3d1fdf4f6a8fd299cd2e84fb6c0650d158b1bfb936","../hanja-goal-glyphwiki-batch1067-2026-10-13/engine-whole-u4fd3-k.json":"a250c28afc35e6e2e3c999a21e55f630213de9ecea3e08872ccf5df353e09fa4","../hanja-goal-glyphwiki-batch1067-2026-10-13/engine-whole-u4fd3-ue0100.json":"a250c28afc35e6e2e3c999a21e55f630213de9ecea3e08872ccf5df353e09fa4","../hanja-goal-glyphwiki-batch1067-2026-10-13/engine-whole-u4fd3.json":"a250c28afc35e6e2e3c999a21e55f630213de9ecea3e08872ccf5df353e09fa4","../hanja-goal-glyphwiki-batch1067-2026-10-13/metadata.json":"bf69ba44796dd145c227e8b44e14a2156ef43eef37cb54f2ed5e4df374f081c9","../hanja-goal-glyphwiki-batch1067-2026-10-13/native-server-preparation-source-analysis.json":"8c671c8ab72a36af2181569465b653ccc0f0967b1f42f90593afb24e46f0dc60","../hanja-goal-glyphwiki-batch1067-2026-10-13/native-server-validation.json":"c073f9ef54730938b2f55f4815c4365ebfe44bbdbc55f235977df150efcf661d","../hanja-goal-glyphwiki-batch1067-2026-10-13/progressive.mjs":"cf88c0ef1bfc0e8f78e2167c8a143c8928fb17c986e0f7274fd428b6591a5dd9","../hanja-goal-glyphwiki-batch1067-2026-10-13/resume.json":"f37020db542a326baaf7a4c46886c8736d5708c39a6a5872e9592f7811a66370","../hanja-goal-glyphwiki-batch1067-2026-10-13/serve-whole.py":"57be36254fb24d1936b09c74ca85fa642366b558ddb88b384e2b68e482352265","../hanja-goal-glyphwiki-batch1067-2026-10-13/source-analysis.json":"c884337013b4430d9505a7b7966396683eccf61264b17c6740cb9a4db9f437e0","../hanja-goal-glyphwiki-batch1067-2026-10-13/source-hold.json":"063ad8ce640c95ab0130dda0309f46618d95b6fc372b1eb16b36d903800c4fa3","../hanja-goal-glyphwiki-batch1067-2026-10-13/source-join-analysis.json":"b355fac9aeea97886ed2425691d63e7200eabc5b6e822dfaa741803bba80300e","../hanja-goal-glyphwiki-batch1067-2026-10-13/source-only-helper-readiness.json":"c8d48ad05e5dc048a0a8a376852c3f3f3a6ce357e6b8af4071a82815f31d302a","../hanja-goal-glyphwiki-batch1067-2026-10-13/sources.json":"b19ddfdd57ce69e70a8167d85db9d2e88437f3143d284b2afa28a1b9f879049a","../hanja-goal-glyphwiki-batch1067-2026-10-13/validation.json":"9b807eb3a97b996a5c42652e7084af9f0e46ea483ac055fd84e9c41e3d076a7c","../hanja-goal-glyphwiki-batch1067-2026-10-13/verify-source.mjs":"34b902e5d7b7e9ed5a7e05c0afc21d02f063884e4d05b06dced99902c9b51342","../hanja-source-raw-compare-u4fd3-2026-10-21/config.json":"20a5e181f3cc088d4473a36e2d7d45d8b025505a71654d9d226399282c144512","../hanja-source-raw-compare-u4fd3-2026-10-21/serve.py":"65e1549bbba60e19d5fc3109f79c1ae370372883425ed8bb9da52bca76ee6fd3","../hanja-source-raw-compare-u4fd3-2026-10-21/check.mjs":"77e35015e024ecc98eff544b69f0f6a104483967e543ecc024aff309f71fd390","../hanja-source-raw-compare-u4fd3-2026-10-21/README.md":"103120e8be173ebaf653916d3645c034fc97a2cb86b5166ab6ad30cbe07d4779","../hanja-source-raw-compare-u4fd3-2026-10-21/validation.json":"5e4acf03dd9b45c3352a32e3c50c137286d20b06b7eb536c7fd231dcbccd1ee3","../hanja-source-raw-review-u4fd3-2026-10-21/README.md":"a14a4dab1863198c680e9d77891ccdae2bba98958bcbe8951eff460d6bc5c26a","../hanja-source-raw-review-u4fd3-2026-10-21/review.json":"3791081ca9dd01b7bdcae4715f0a551ca434cce25fedfb88c28e1bbe180dd1fe","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-source-independent-hq-qq-u9654-source-experiment-2026-10-21/candidate.mjs":"8c8d93691d023ee16df89f5d5f848acde016ee79a8ba9178522ed4105283c212","../hanja-source-independent-hq-qq-u9654-source-experiment-2026-10-21/candidate.d.mts":"082f8676fd9158af0ab93d48929becd3dc5b6b3d37a51751e84e98e9c8e682e9"},EXPECTED_IDENTITY={"sourceRoot":"u4fd3","sourceProofFile":"engine-proof.json","sourceProofFileSha256":"655ccee1ebef3e043e7e2b3d1fdf4f6a8fd299cd2e84fb6c0650d158b1bfb936"},EXPECTED_GROUPS=[[0],[1],[2],[3,4],[5,6],[7,8],[9],[10],[11]];
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');if(Array.isArray(v)){assert.equal(Object.getPrototypeOf(v),Array.prototype);assert.equal(Reflect.ownKeys(v).length,v.length+1);for(let i=0;i<v.length;i++){assert(Object.hasOwn(v,i));const d=Object.getOwnPropertyDescriptor(v,String(i));assert(d&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}assert.equal(Object.getPrototypeOf(v),Object.prototype);assert.equal(Reflect.ownKeys(v).length,Object.keys(v).length);for(const k of Object.keys(v)){const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}
export const sourceRoot='u4fd3',selectedProofIdentity=clone(EXPECTED_IDENTITY),sourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
const EXPECTED_CONFIG_SHA="bf816148dd4b7757badd4e7a65f42ef663460faae18fab2ace7d568a5f6e5efe";
function validateSelectedProof(trace,proof,identity){assert.equal(arguments.length,3);strictJSON(identity);strictJSON(proof);strictJSON(trace);assert.equal(sha(readFileSync(new URL('./config.json',import.meta.url))),EXPECTED_CONFIG_SHA);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.sourceGroups,EXPECTED_GROUPS);for(const[p,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h,p);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),"e58a97d68f15aacc72bbccb5d3cb22fe40bc080b4e4de1c96d85e5e7551c09a0");assert.deepEqual(trace,proof.trace);assert.equal(T.actualFull5File,'../hanja-goal-glyphwiki-batch1067-2026-10-13/engine-proof.json');assert.equal(sha(readFileSync(new URL(T.actualFull5File,import.meta.url))),EXPECTED_IDENTITY.sourceProofFileSha256);assert.deepEqual(json(T.actualFull5File),proof);assert.equal(sha(readFileSync(new URL(T.selectedBody3File,import.meta.url))),"a250c28afc35e6e2e3c999a21e55f630213de9ecea3e08872ccf5df353e09fa4");const body=json(T.selectedBody3File);assert.deepEqual(Object.keys(body).sort(),['defaults','groups','trace']);for(const k of Object.keys(body))assert.deepEqual(body[k],proof[k]);}
const RAW_COUNT=12,ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11]],ORIGINAL=[[{"kind":"cdDrawCurve","args":[68.175,15,45.9,72,12.9,117,0,7]}],[{"kind":"cdDrawLine","args":[45.9,73,45.9,186,0,0]}],[{"kind":"cdDrawLine","args":[72.9,28,185.65,28,0,0]}],[{"kind":"cdDrawCurve","args":[101.6,43,91.35,59,77,78,0,7]}],[{"kind":"cdDrawCurve","args":[75.975,76,95.45,92,105.7,113,7,8]}],[{"kind":"cdDrawCurve","args":[136.45,43,126.19999999999999,59,111.85,78,0,7]}],[{"kind":"cdDrawCurve","args":[110.825,76,130.3,92,140.55,113,7,8]}],[{"kind":"cdDrawCurve","args":[171.3,43,161.05,59,145.675,78,0,7]}],[{"kind":"cdDrawCurve","args":[144.65,76,165.15,91,177.45,111,7,8]}],[{"kind":"cdDrawLine","args":[78.025,133,180.525,133,0,0]}],[{"kind":"cdDrawLine","args":[129.275,133,129.275,177,32,32]}],[{"kind":"cdDrawLine","args":[69.825,177,186.675,177,0,0]}]],TRACE_SHA256="3854663df8cfbe1f614451fd380dff6bfbaee02e6d4f46c9ad85843043bd3683",GROUPS_SHA256="ebc26315cf9a6be5682ff03e0bcf2fddb787a1175f46f695eb0265803414bb8e",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[];
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
if(process.argv[1]===fileURLToPath(import.meta.url)){assert.equal(process.argv.length,3);assert.equal(process.argv[2],'--author-capture-once');const proof=json(T.actualFull5File);process.stdout.write(JSON.stringify({u4fd3:captureProjection(proof.trace,proof,EXPECTED_IDENTITY)}))}
const FIXED_RAW_SHA="d2004bb6c9a39d1ac5975d5aedf6892e307b789d4398703ea9a4bf73727a026a",FIXED_COMPILED_SHA="f731ac914a72e3021f43db274bca35d7b4f91968e964601f9112bdb900052726",FIXED_PAYLOAD_SHA="a199a8cd354d0ae35542667614bebe9bfde8c0e5d304115d132c8b2074e60912",FIXED_FILE_SHA="8774215fd380fe4bf3a410d65f6fdf3a2b8442ef13cc7085b146e1e34339b04d";
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);assert.equal(T.rawBaselineSHA256,FIXED_RAW_SHA);assert.equal(T.derivedSHA256,FIXED_COMPILED_SHA);assert.equal(T.fixturePayloadSHA256,FIXED_PAYLOAD_SHA);const bytes=readFileSync(new URL('./fixtures.json',import.meta.url));assert.equal(sha(bytes),FIXED_FILE_SHA);const f=JSON.parse(bytes).u4fd3;assert.equal(digest(f),FIXED_PAYLOAD_SHA);assert.deepEqual(f.fullProof,args[1]);assert.equal(digest(f.rawBaseline),FIXED_RAW_SHA);assert.equal(digest(f.strokes),FIXED_COMPILED_SHA);assert.deepEqual(f.baseline,f.strokes);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1))}
