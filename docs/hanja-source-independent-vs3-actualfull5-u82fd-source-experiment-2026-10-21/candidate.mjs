export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs';
import assert from 'node:assert/strict';import{readFileSync,existsSync}from'node:fs';import{createHash}from'node:crypto';import{fileURLToPath}from'node:url';
const json=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=x=>createHash('sha256').update(x).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const T=json('./config.json').targets['u82fd-ue0103'],FIXED_PINS={"../hanja-source-actual-full5-u82fd-vs3-2026-10-21/capture.mjs":"231652aed3a634e51066f09a1685c3d3cdf1910c69427cafc70393eb6f02d40d","../hanja-source-actual-full5-u82fd-vs3-2026-10-21/engine-whole-u82fd-ue0103.json":"9a71406f64cd87f87b244e6c6b05fac330360b677d0a0c03ff0d509f7cc4c840","../hanja-source-actual-full5-u82fd-vs3-2026-10-21/README.md":"aaaf7f8a9fff31aa5dd5e2689225e603a51209e3a8133a8099d239f03a94649e","../hanja-source-actual-full5-u82fd-vs3-2026-10-21/check.mjs":"b097f82956eaf016e23f85cb20f50bfab7d9eacd3a62a2921a77fc77492820b2","../hanja-source-actual-full5-u82fd-vs3-2026-10-21/validation.json":"d313b7fbff4cdcdc0a018637ca5043e7d4e92a34f15b53b93ec1b49c9b4ca39b","../hanja-source-raw-review-u82fd-vs3-2026-10-21/README.md":"738794c720fe8b2b109b56712ef701cc201d1414798734e69a8cf9cf727fb916","../hanja-source-raw-review-u82fd-vs3-2026-10-21/review.json":"267ad9e8e31ef5f014ee0f1dcf18fd12dc0b1af67830161465d3411ffb074662","../hanja-goal-glyphwiki-batch1068-2026-10-13/sources.json":"4a8369844d5379d322e6e68a362198adac7b3d3bab2586fa6c4d8a173884cd71","../hanja-goal-glyphwiki-batch1068-2026-10-13/NOTICE.md":"77e002e3ef6ff18b2dab1aafc44295d10a08c230e5ef88b46485c3bc1e010b79","../hanja-goal-glyphwiki-batch1068-2026-10-13/native-review.json":"2f703e2f2271a8e45319c3f498ec0f6e5699614109a08515a7afc3f6c8bcdb78","../hanja-source-independent-qq-hv-u7c1c-source-experiment-2026-10-21/candidate.mjs":"d7e7a436a03903782437c22137f70bd253e85f835af7bc645edb6699921ae2b8","../hanja-source-independent-qq-reorder-u7d7a-source-experiment-2026-10-21/serve.py":"ec4501da374c4c6570f5b3b65be22b3a375e73abb696f675c980115e81ae8e0f","../hanja-source-raw-compare-u82fd-vs3-2026-10-21/config.json":"fcaaa2f6c8dc959ecb363bb1a6e2c96d0857800d5645a3f0b1b38f67ccaef433","../hanja-source-raw-compare-u82fd-vs3-2026-10-21/serve.py":"25266cacf9c4aa8fe22e808e7446c0d5332bd1ddbbf374c267bdfc45067e90f7","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09"},EXPECTED_IDENTITY={"sourceRoot":"u82fd-ue0103","sourceProofFile":"engine-whole-u82fd-ue0103.json","sourceProofFileSha256":"9a71406f64cd87f87b244e6c6b05fac330360b677d0a0c03ff0d509f7cc4c840"},EXPECTED_GROUPS=[[0],[1],[3],[2],[4],[5],[6,7],[8],[9]],BASELINE_GROUPS=[[0],[1],[2],[3],[4],[5],[6,7],[8],[9]];
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');if(Array.isArray(v)){assert.equal(Object.getPrototypeOf(v),Array.prototype);assert.equal(Reflect.ownKeys(v).length,v.length+1);for(let i=0;i<v.length;i++){assert(Object.hasOwn(v,i));const d=Object.getOwnPropertyDescriptor(v,String(i));assert(d&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}assert.equal(Object.getPrototypeOf(v),Object.prototype);assert.equal(Reflect.ownKeys(v).length,Object.keys(v).length);for(const k of Object.keys(v)){const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}
export const sourceRoot='u82fd-ue0103',selectedProofIdentity=clone(EXPECTED_IDENTITY),sourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
const EXPECTED_CONFIG_SHA="a51a6dfc0eab7c026788199a0e5e373a10f3fbbfa64a46bbc179236cf7b213da";
function validateSelectedProof(trace,proof,identity){assert.equal(sha(readFileSync(new URL('./config.json',import.meta.url))),EXPECTED_CONFIG_SHA);assert.equal(arguments.length,3);strictJSON(identity);strictJSON(proof);strictJSON(trace);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.sourceGroups,EXPECTED_GROUPS);assert.deepEqual(T.baselineSourceGroups,BASELINE_GROUPS);assert.deepEqual(T.proofKeys,['defaults','engineHashes','engineRevision','groups','trace']);for(const[p,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h,p);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),"236cbcb6c74b75d47c7d9b9d02c31240a3ee427979712b06efdf2de7e0298747");assert.deepEqual(trace,proof.trace);assert.equal(T.actualFull5File,"../hanja-source-actual-full5-u82fd-vs3-2026-10-21/engine-whole-u82fd-ue0103.json");assert.equal(T.actualFull5SHA256,EXPECTED_IDENTITY.sourceProofFileSha256);assert.equal(sha(readFileSync(new URL(T.actualFull5File,import.meta.url))),EXPECTED_IDENTITY.sourceProofFileSha256);assert.deepEqual(json(T.actualFull5File),proof);}
const RAW_COUNT=10,ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9]],ORIGINAL=[[{"kind":"cdDrawLine","args":[12.935,28.64,93.53,28.64,0,100]}],[{"kind":"cdDrawLine","args":[63.68,8.88,63.68,47.64,0,300]}],[{"kind":"cdDrawLine","args":[135.32,8.88,135.32,47.64,0,300]}],[{"kind":"cdDrawLine","args":[105.47,28.64,186.065,28.64,0,0]}],[{"kind":"cdDrawCurve","args":[152.75,57.005,117.29,66.785,50.31,71.675,0,7]}],[{"kind":"cdDrawLine","args":[50.31,71.675,50.31,113.24,12,1]},{"kind":"cdDrawCurve","args":[50.31,113.24,48.34,167.03,17.805,188.22,1,7]}],[{"kind":"cdDrawLine","args":[93.65,69.22999999999999,93.65,171.105,32,32]}],[{"kind":"cdDrawCurve","args":[88.725,174.365,108.425,166.215,131.07999999999998,159.695,0,7]}],[{"kind":"cdDrawCurve","args":[113.35,145.84,131.07999999999998,155.62,138.96,175.18,7,8]}],[{"kind":"cdDrawCurve","args":[134.035,59.45,139.945,148.285,183.285,177.625,7,0]}]],TRACE_SHA256="0be16683638611c8d90bf955734f644503e34465488df48241cf1716d7b9b1f3",GROUPS_SHA256="7fd77c20a9b1d4cb26bdfc1dc0a60e6fd8cf68d9b5c72dae0c4e92d56334315b",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[];
const endpoint=call=>call.args.slice(call.kind==='cdDrawLine'?2:call.kind==='cdDrawCurve'?4:6,call.kind==='cdDrawLine'?4:call.kind==='cdDrawCurve'?6:8),point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0});
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
export function captureProjection(...args){assert.equal(args.length,3);assert(!existsSync(new URL('./fixtures.json',import.meta.url)),'public fixed fixture exists; projection disabled');validateSelectedProof(...args);assert.equal(projectionRuns,0,'author first projection only');projectionRuns++;internalRawProjectorRuns++;const[trace,proof,identity]=args,rawBaseline=projectRaw(trace,proof,identity),strokes=EXPECTED_GROUPS.map(g=>g.flatMap(i=>rawBaseline[i])),baseline=BASELINE_GROUPS.map(g=>g.flatMap(i=>rawBaseline[i]));return{fullProof:proof,rawBaseline,baseline,strokes,traceProjectionOperations:1,newInternalRawProjectorExecutions:1,originalCompilerExecutions:0,existingFactoryCalls:0,engineRuns:0,tailDerivations:0,staticMappingApproved:false,staticMappingCandidateObserved:true,nativeAnimationApproved:false,nativeApproval:false,runtimeApplied:false}}
export function traceProjectionCallCount(){return projectionRuns}export function newInternalRawProjectorCallCount(){return internalRawProjectorRuns}export function cachedPositiveCallCount(){return cachedCalls}export function originalSourceCompilerCallCount(){return 0}export function existingFactoryCallCount(){return 0}
if(process.argv[1]===fileURLToPath(import.meta.url)){assert.equal(process.argv.length,3);assert.equal(process.argv[2],'--author-capture-once');const proof=json(T.actualFull5File),payload=captureProjection(proof.trace,proof,EXPECTED_IDENTITY);process.stdout.write(JSON.stringify({'u82fd-ue0103':payload}))}
const FIXED_RAW_SHA="b0209757da31171ac59e29a651b138b9aecfe92670e5ce46ad209eb17dbb9327",FIXED_COMPILED_SHA="4a842b0535cbeee6a9392eb1be179c0aed335617db1019ba558b2cf9cfab0698",FIXED_PAYLOAD_SHA="d26103aa8c906ff6fd455014ae217486f75ccc378180e74c70ac4abeb509e19e",FIXED_FILE_SHA="b9e95f18387c30c92b7e71772fb15ea562d1f8d9a8ed8249c5a62e84f9d483f5";
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);assert.equal(T.rawBaselineSHA256,FIXED_RAW_SHA);assert.equal(T.derivedSHA256,FIXED_COMPILED_SHA);assert.equal(T.fixturePayloadSHA256,FIXED_PAYLOAD_SHA);const bytes=readFileSync(new URL('./fixtures.json',import.meta.url));assert.equal(sha(bytes),FIXED_FILE_SHA);const f=JSON.parse(bytes)['u82fd-ue0103'];assert.equal(digest(f),FIXED_PAYLOAD_SHA);assert.equal(digest(f.fullProof),T.fullProofSHA256);assert.equal(digest(f.rawBaseline),FIXED_RAW_SHA);assert.equal(digest(f.strokes),FIXED_COMPILED_SHA);assert.deepEqual(f.baseline,BASELINE_GROUPS.map(g=>g.flatMap(i=>f.rawBaseline[i])));cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1))}
