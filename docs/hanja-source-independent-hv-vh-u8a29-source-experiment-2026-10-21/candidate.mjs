export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs';
import assert from 'node:assert/strict';import{readFileSync,existsSync}from'node:fs';import{createHash}from'node:crypto';import{fileURLToPath}from'node:url';
const json=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=x=>createHash('sha256').update(x).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const T=json('./config.json').targets.u8a29,FIXED_PINS={"../hanja-goal-glyphwiki-batch1055-2026-10-13/metadata.json":"f8b95555ea8c624884ef8b613447118192d0b1169599d0c2396a7f65f60eb20d","../hanja-goal-glyphwiki-batch1055-2026-10-13/sources.json":"df0f33ef60ec805f5508c8fc2d51b49e368307bc4341181974d3b41d1b887293","../hanja-goal-glyphwiki-batch1055-2026-10-13/README.md":"10b16e7012bc41105c03d332e55137d1ecaae14f094282e462ef9d63ab747c12","../hanja-goal-glyphwiki-batch1055-2026-10-13/source-hold.json":"1abd78e564b1b4d79344ad63c366c5fd1e4a605cb0b6449dc115d238bd4f365c","../hanja-goal-glyphwiki-batch1055-2026-10-13/candidate-compile-analysis.json":"a007f216e1941f35cb265d46bec6547c74897588340e97153c0bd0e4a2cccf8f","../hanja-goal-glyphwiki-batch1055-2026-10-13/source-only-helper-readiness.json":"4a41f526dfd4902dfe39917e8490c70b872f13428e432713da64f98a1c92e9ba","../hanja-goal-glyphwiki-batch1055-2026-10-13/engine-whole-u8a29.json":"b56d6a71c7835c50f2dba80ea1f66a9b61d076ec166128476da75d4cc5cef8d1","../hanja-source-raw-compare-u82fd-vs3-2026-10-21/serve.py":"25266cacf9c4aa8fe22e808e7446c0d5332bd1ddbbf374c267bdfc45067e90f7","../hanja-goal-glyphwiki-batch1055-2026-10-13/source-join-analysis.json":"e547f51e584f8338efee7d755edf2b10a51c8d1380beefb7ff8b0012f217b6a1","../hanja-source-raw-compare-u8a29-2026-10-21/config.json":"9da280fc21cc104923c24fef67b87d5c2ecb3c9bdd84ddc272e5ebb3a9e1e152","../hanja-source-raw-compare-u8a29-2026-10-21/serve.py":"ba91ba7f00bc2e4899ca4d3c69d03ab5cd6f8b0a9f888899eea49aa69a58665d","../hanja-source-raw-compare-u8a29-2026-10-21/check.mjs":"7259abfa4c2a30cab3d6803726bd3b23fb8137be1db904406d6f3da93f456703","../hanja-source-raw-compare-u8a29-2026-10-21/README.md":"52c1828e8e7f494712f3e2f071186cbb5506ab47b1abd71086f702255a8784c7","../hanja-source-raw-compare-u8a29-2026-10-21/validation.json":"704aaee116b7345eed866df01a1a99322674ae91c5ab110b1af706c4d54a6542","../hanja-source-raw-review-u8a29-2026-10-21/README.md":"1ce209e6385947bae6d187602f4242e2a9ce22b9b1f9832461f47ad9e631971d","../hanja-source-raw-review-u8a29-2026-10-21/review.json":"0a808c5ac55d39409fe6fd062e3149bd412a1745fcc8219e6eafa754f0f4bef4","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-source-independent-vs3-actualfull5-u82fd-source-experiment-2026-10-21/candidate.mjs":"79761746a1cc0b3630460cc83d3d4e145cf0abe097ef98a4c37de5616ccdea7e"},EXPECTED_IDENTITY={"sourceRoot":"u8a29","sourceProofFile":"engine-whole-u8a29.json","sourceProofFileSha256":"b56d6a71c7835c50f2dba80ea1f66a9b61d076ec166128476da75d4cc5cef8d1"},EXPECTED_GROUPS=[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10,12],[11]],BASELINE_GROUPS=[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12]];
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');if(Array.isArray(v)){assert.equal(Object.getPrototypeOf(v),Array.prototype);assert.equal(Reflect.ownKeys(v).length,v.length+1);for(let i=0;i<v.length;i++){assert(Object.hasOwn(v,i));const d=Object.getOwnPropertyDescriptor(v,String(i));assert(d&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}assert.equal(Object.getPrototypeOf(v),Object.prototype);assert.equal(Reflect.ownKeys(v).length,Object.keys(v).length);for(const k of Object.keys(v)){const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}
export const sourceRoot='u8a29',selectedProofIdentity=clone(EXPECTED_IDENTITY),sourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
const EXPECTED_CONFIG_SHA="284d7a83525051b4be196e0d71282d99df41398480b2c9bb4d82d23048932b9a";
function validateSelectedProof(trace,proof,identity){assert.equal(arguments.length,3);assert.equal(sha(readFileSync(new URL('./config.json',import.meta.url))),EXPECTED_CONFIG_SHA);strictJSON(identity);strictJSON(proof);strictJSON(trace);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.sourceGroups,EXPECTED_GROUPS);assert.deepEqual(T.baselineSourceGroups,BASELINE_GROUPS);for(const[p,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h,p);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),"64d72e65aa04d01e4f1b102c492f98f7419b46312327d431aef193e942b1753e");assert.deepEqual(trace,proof.trace);assert.equal(T.actualFull5File,"../hanja-goal-glyphwiki-batch1055-2026-10-13/engine-whole-u8a29.json");assert.equal(T.actualFull5SHA256,EXPECTED_IDENTITY.sourceProofFileSha256);assert.equal(sha(readFileSync(new URL(T.actualFull5File,import.meta.url))),EXPECTED_IDENTITY.sourceProofFileSha256);assert.deepEqual(json(T.actualFull5File),proof);}
const RAW_COUNT=13,ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12]],ORIGINAL=[[{"kind":"cdDrawLine","args":[17.5,30,67.375,30,0,100]}],[{"kind":"cdDrawLine","args":[14,56,75.25,56,0,0]}],[{"kind":"cdDrawLine","args":[17.5,84,67.375,84,0,100]}],[{"kind":"cdDrawLine","args":[17.5,110,67.375,110,0,100]}],[{"kind":"cdDrawLine","args":[22.75,135,22.75,173,12,113]}],[{"kind":"cdDrawLine","args":[22.75,135,62.125,135,2,2]}],[{"kind":"cdDrawLine","args":[62.125,135,62.125,173,22,123]}],[{"kind":"cdDrawLine","args":[22.75,173,62.125,173,2,2]}],[{"kind":"cdDrawCurve","args":[159,28,138.2,113,97.9,160,0,7]}],[{"kind":"cdDrawCurve","args":[101.15,47,136.9,91,162.25,151,7,8]}],[{"kind":"cdDrawLine","args":[89.45,29,89.45,169,0,13]}],[{"kind":"cdDrawLine","args":[177.2,29,177.2,169,0,23]}],[{"kind":"cdDrawLine","args":[89.45,169,177.2,169,2,2]}]],TRACE_SHA256="7c41892b1f948719558295b6482dacc0d7e4e1eb01804227fdaa237cf814d970",GROUPS_SHA256="2444d2e8e735b281286ab807ac59957d8d4c1e907d9387b5760b942be92d3ed2",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[];
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
if(process.argv[1]===fileURLToPath(import.meta.url)){assert.equal(process.argv.length,3);assert.equal(process.argv[2],'--author-capture-once');const proof=json(T.actualFull5File),payload=captureProjection(proof.trace,proof,EXPECTED_IDENTITY);process.stdout.write(JSON.stringify({'u8a29':payload}))}
const FIXED_RAW_SHA="d387d0f53aac3bd8e1ce76945499c430857b456c889d5e490ec5b8f383b30c7a",FIXED_COMPILED_SHA="217071f7050ebbb9e3f2d63c51fda0401004287c00f90de5210f6bd71d74c3bc",FIXED_PAYLOAD_SHA="287a39cd8cc1eff1c7d9d32dcfa214c1ed2ecd69c9a6638de957284a58deacd8",FIXED_FILE_SHA="8ee191a3a00bf9e12f2077f122ae0d78b2cafd5e7ca83e6312f60a2ca20c8b6e";
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);assert.equal(T.rawBaselineSHA256,FIXED_RAW_SHA);assert.equal(T.derivedSHA256,FIXED_COMPILED_SHA);assert.equal(T.fixturePayloadSHA256,FIXED_PAYLOAD_SHA);const bytes=readFileSync(new URL('./fixtures.json',import.meta.url));assert.equal(sha(bytes),FIXED_FILE_SHA);const f=JSON.parse(bytes)['u8a29'];assert.equal(digest(f),FIXED_PAYLOAD_SHA);assert.equal(digest(f.fullProof),T.fullProofSHA256);assert.equal(digest(f.rawBaseline),FIXED_RAW_SHA);assert.equal(digest(f.strokes),FIXED_COMPILED_SHA);assert.deepEqual(f.baseline,BASELINE_GROUPS.map(g=>g.flatMap(i=>f.rawBaseline[i])));cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1))}
