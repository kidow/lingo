export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs';
import assert from'node:assert/strict';import{readFileSync,existsSync}from'node:fs';import{createHash}from'node:crypto';import{fileURLToPath}from'node:url';
const json=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=x=>createHash('sha256').update(x).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const T=json('./config.json').targets['u5b76-ue0102'],FIXED_PINS={"../hanja-goal-glyphwiki-batch822-2026-10-13/NOTICE.md":"7bb0af5a0da560977dbf732f8e8cbc8b560762c9dbc25397b8cf84869b1ebfb9","../hanja-goal-glyphwiki-batch822-2026-10-13/README.md":"cf6409218027ebd006607628d931d3c7012f86fabca37964e79d69952d9f3dd6","../hanja-goal-glyphwiki-batch822-2026-10-13/candidate-compile-analysis.json":"08656aa14e380a7eab10b32135171900a4ae91bb3f12ac0be9cdae09641de819","../hanja-goal-glyphwiki-batch822-2026-10-13/draw-trace.json":"226a7d5c8b2a0e01956dc56ab80268c45eb7ecbce038190c2a2b24f9ea376df4","../hanja-goal-glyphwiki-batch822-2026-10-13/engine-proof.json":"abda14cfd5e382f623296ac943938afd286375bc29947520edcb3f22986f6879","../hanja-goal-glyphwiki-batch822-2026-10-13/engine-whole-u5b76-ue0100.json":"abda14cfd5e382f623296ac943938afd286375bc29947520edcb3f22986f6879","../hanja-goal-glyphwiki-batch822-2026-10-13/engine-whole-u5b76-ue0101.json":"abda14cfd5e382f623296ac943938afd286375bc29947520edcb3f22986f6879","../hanja-goal-glyphwiki-batch822-2026-10-13/engine-whole-u5b76-ue0102.json":"21a36539fcd4ca8ce572502737989296f674f03611dc5bd369a2cc37d0a9eaa0","../hanja-goal-glyphwiki-batch822-2026-10-13/engine-whole-u5b76.json":"abda14cfd5e382f623296ac943938afd286375bc29947520edcb3f22986f6879","../hanja-goal-glyphwiki-batch822-2026-10-13/metadata.json":"75285133c0fe84572c14e5cb78ea5bc55594f87ac6cfe8b4d3090ccf8bdf3c2a","../hanja-goal-glyphwiki-batch822-2026-10-13/resume.json":"982919451ba9b7f6b816ee1abc148d006df4ace328a5a4ae9e20d362a279e1eb","../hanja-goal-glyphwiki-batch822-2026-10-13/review.json":"34065844e9d781993d648dad9f0483800eb71833029b06377d271b59a271828d","../hanja-goal-glyphwiki-batch822-2026-10-13/serve-whole.py":"345cd88107a9cca8b38bffd57f996589014f57c0302b0a3aa4764f8fbfdfe616","../hanja-goal-glyphwiki-batch822-2026-10-13/source-analysis.json":"0ac644f11694444f44daa57819efb9b1a0fb978d10083197c59a0105deced604","../hanja-goal-glyphwiki-batch822-2026-10-13/source-join-analysis.json":"97b1b8ff6fdfe7bfa8a60435ff4aeceb6c4f8ee88acd4350919eb66bfa65b006","../hanja-goal-glyphwiki-batch822-2026-10-13/sources.json":"4e6e3ed3bcf8615ab7136579f0dfa7a66fe702514c4d7355e231083758dfe5d7","../hanja-goal-glyphwiki-batch822-2026-10-13/validation.json":"c6e081a12bd3c400264c24c73e87c6cbc0f2cb5a7fa352ccd01dec0c3f51e9fb","../hanja-goal-glyphwiki-batch822-2026-10-13/verify-source.mjs":"ace77082598a645c5de3891afdfbb41df4f5e4ed7736c5b1554d8c6c58624fcc","../hanja-goal-glyphwiki-batch822-2026-10-13/whole-variant-inventory.json":"1139f6af289a427d7f38b320a25924d7edbbabc4a0e3334ad8b89b41f934e2bd","../hanja-source-raw-compare-u5b76-2026-10-21/config.json":"ef30c2b18906848c0a1c990ec05fd7c8c1b94687db64e86e86f287eebaa8741c","../hanja-source-raw-compare-u5b76-2026-10-21/serve.py":"25266cacf9c4aa8fe22e808e7446c0d5332bd1ddbbf374c267bdfc45067e90f7","../hanja-source-raw-compare-u5b76-2026-10-21/check.mjs":"72fe179a1e39954a8a4ae420d9f8e124f206ec5327b9ecd320b41a90a9eb73e6","../hanja-source-raw-compare-u5b76-2026-10-21/README.md":"ceff02a8d7351125531cdc18d986067add8ff2e7297cd96a524f90794cd5a95e","../hanja-source-raw-compare-u5b76-2026-10-21/validation.json":"8856b455c8791db321c54801017b7ea7c480afe842f0ffce90d2904c561036a4","../hanja-source-raw-review-u5b76-vs2-2026-10-21/README.md":"29cb31273900a7f6758c02e2d17c8cc79fac8fa802aafdd5ba9aeba6c88772eb","../hanja-source-raw-review-u5b76-vs2-2026-10-21/review.json":"3931fb800e195cbecf6e5ac7226340e7f203789b5f01ea5d57e1e0f4cf6c349f","../hanja-source-independent-qq-reorder-hl-hq-u7d8e-source-experiment-2026-10-21/candidate.mjs":"ac38052ea783f34742fe8e72c1e55dcdfd457480ddac06fc2c49580d07f14709","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09"},EXPECTED_IDENTITY={"sourceRoot":"u5b76-ue0102","sourceProofFile":"engine-whole-u5b76-ue0102.json","sourceProofFileSha256":"21a36539fcd4ca8ce572502737989296f674f03611dc5bd369a2cc37d0a9eaa0"},EXPECTED_GROUPS=[[0],[1],[2],[3],[4,5],[6,7],[8],[9,10],[11,12],[13],[14,15],[16],[17]],EXPECTED_CONFIG_SHA="212baa0a730143ad673e567048dc5c364051f0b60f0569c8b772cd7edeab0bdb";
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');if(Array.isArray(v)){assert.equal(Object.getPrototypeOf(v),Array.prototype);assert.equal(Reflect.ownKeys(v).length,v.length+1);for(let i=0;i<v.length;i++){assert(Object.hasOwn(v,i));const d=Object.getOwnPropertyDescriptor(v,String(i));assert(d&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}assert.equal(Object.getPrototypeOf(v),Object.prototype);assert.equal(Reflect.ownKeys(v).length,Object.keys(v).length);for(const k of Object.keys(v)){const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}

function validateSelectedProof(trace,proof,identity){assert.equal(arguments.length,3);strictJSON(identity);strictJSON(proof);strictJSON(trace);assert.equal(sha(readFileSync(new URL('./config.json',import.meta.url))),EXPECTED_CONFIG_SHA);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.sourceGroups,EXPECTED_GROUPS);for(const[p,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h,p);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),"13963a3e69966dbb29354a335493976b0783c69129b228ff3cca2ec8f0b7d874");assert.deepEqual(trace,proof.trace);assert.equal(T.actualFull5File,"../hanja-goal-glyphwiki-batch822-2026-10-13/engine-whole-u5b76-ue0102.json");assert.equal(T.selectedWholeFile,"../hanja-goal-glyphwiki-batch822-2026-10-13/engine-whole-u5b76-ue0102.json");const b=readFileSync(new URL(T.selectedWholeFile,import.meta.url));assert.equal(sha(b),EXPECTED_IDENTITY.sourceProofFileSha256);assert.equal(T.selectedWholeSHA256,EXPECTED_IDENTITY.sourceProofFileSha256);assert.deepEqual(JSON.parse(b),proof);assert.deepEqual(json(T.actualFull5File),proof);}
export const sourceRoot='u5b76-ue0102',selectedProofIdentity=clone(EXPECTED_IDENTITY),sourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
const RAW_COUNT=18,ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17]],ORIGINAL=[[{"kind":"cdDrawLine","args":[15.4342,27.18185,92.81755000000001,27.18185,0,0]}],[{"kind":"cdDrawLine","args":[61.291,13.299800000000001,61.291,40.549749999999996,0,300]}],[{"kind":"cdDrawLine","args":[106.19245,27.18185,183.5758,27.18185,0,0]}],[{"kind":"cdDrawLine","args":[137.719,13.299800000000001,137.719,40.549749999999996,0,300]}],[{"kind":"cdDrawCurve","args":[67.19387499999999,43.8324,56.383075,52.733975,36.7885,66.27985,0,7]}],[{"kind":"cdDrawCurve","args":[20.572300000000002,60.8615,48.274975,68.602,54.35605,78.277625,7,8]}],[{"kind":"cdDrawCurve","args":[88.815475,60.8615,67.19387499999999,81.373825,33.410125,103.82127499999999,0,7]}],[{"kind":"cdDrawCurve","args":[17.8696,107.3045,55.707399999999986,103.43424999999999,90.16682499999999,98.40292500000001,0,7]}],[{"kind":"cdDrawCurve","args":[71.247925,85.6311,91.51817500000001,99.564,93.54520000000001,108.85260000000002,7,8]}],[{"kind":"cdDrawCurve","args":[154.066375,43.8324,143.25557500000002,52.733975,123.661,66.27985,0,7]}],[{"kind":"cdDrawCurve","args":[107.4448,60.8615,135.147475,68.602,141.22854999999998,78.277625,7,8]}],[{"kind":"cdDrawCurve","args":[175.68797499999997,60.8615,154.066375,81.373825,120.282625,103.82127499999999,0,7]}],[{"kind":"cdDrawCurve","args":[104.74210000000001,107.3045,142.5799,103.43424999999999,177.039325,98.40292500000001,0,7]}],[{"kind":"cdDrawCurve","args":[158.12042499999998,85.6311,178.39067500000002,99.564,180.4177,108.85260000000002,7,8]}],[{"kind":"cdDrawLine","args":[45.12,123.1,144.1,123.1,0,2]}],[{"kind":"cdDrawCurve","args":[144.1,123.1,125.48,131.2,101.96,139.3,22,7]}],[{"kind":"cdDrawLine","args":[100,136.06,100,172.23,0,1]},{"kind":"cdDrawCurve","args":[100,172.23,100,182.23,90,182.23,1,14]}],[{"kind":"cdDrawLine","args":[14.74,150.64,186.24,150.64,0,0]}]],TRACE_SHA256="6e9aaa841119301082c2bee37474d8612496e94bfd903c4ba034413689a8ddeb",GROUPS_SHA256="d90eac9e2c69576796c4c49b319a5e6d6e94fb7c4793aec27000f7453b7deb15",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[];
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
export function captureProjection(...args){assert.equal(args.length,3);assert(!existsSync(new URL('./fixture.json',import.meta.url)),'public fixture exists; projection disabled');validateSelectedProof(...args);assert.equal(projectionRuns,0);projectionRuns++;internalRawProjectorRuns++;const[trace,proof]=args,rawBaseline=projectRaw(...args),strokes=EXPECTED_GROUPS.map(g=>g.flatMap(i=>rawBaseline[i]));return{fullProof:proof,rawBaseline,baseline:clone(strokes),strokes,traceProjectionOperations:1,newInternalRawProjectorExecutions:1,originalCompilerExecutions:0,existingFactoryCalls:0,engineRuns:0,tailDerivations:0,staticCorrespondenceObserved:true,nativeAnimationApproved:false,nativeApproval:false,runtimeApplied:false}}
export function traceProjectionCallCount(){return projectionRuns}export function newInternalRawProjectorCallCount(){return internalRawProjectorRuns}export function cachedPositiveCallCount(){return cachedCalls}export function originalSourceCompilerCallCount(){return 0}export function existingFactoryCallCount(){return 0}
if(process.argv[1]===fileURLToPath(import.meta.url)){assert.equal(process.argv.length,3);assert.equal(process.argv[2],'--author-capture-once');const proof=json(T.actualFull5File);process.stdout.write(JSON.stringify({'u5b76-ue0102':captureProjection(proof.trace,proof,EXPECTED_IDENTITY)}))}
const FIXED_RAW_SHA="85a2b047e8b478697139a240e0ccea132832d9e133861580b44a47fd468872c7",FIXED_COMPILED_SHA="d08f44b6a8a1233cf8bf685cfc5305be1efb9e8ffea4af750af15ebf4c438727",FIXED_PAYLOAD_SHA="270defb7ae249524918415e0c2abe81e335a3f5e732c5f4a30634c05c1d96e47",FIXED_FILE_SHA="2626f648bf03fcd5dfd62c0ad0b3ec960530b2115a7818d4f352c06ef0ce818b";
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);assert.equal(T.rawBaselineSHA256,FIXED_RAW_SHA);assert.equal(T.derivedSHA256,FIXED_COMPILED_SHA);assert.equal(T.fixturePayloadSHA256,FIXED_PAYLOAD_SHA);const bytes=readFileSync(new URL('./fixture.json',import.meta.url));assert.equal(sha(bytes),FIXED_FILE_SHA);const f=JSON.parse(bytes)['u5b76-ue0102'];assert.equal(digest(f),FIXED_PAYLOAD_SHA);assert.deepEqual(f.fullProof,args[1]);assert.equal(digest(f.rawBaseline),FIXED_RAW_SHA);assert.equal(digest(f.strokes),FIXED_COMPILED_SHA);assert.deepEqual(f.baseline,f.strokes);cachedCalls++;return f.strokes}

export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1))}
