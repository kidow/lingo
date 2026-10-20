import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'
import {readFileSync} from 'node:fs'
const digest=v=>createHash('sha256').update(JSON.stringify(v)).digest('hex'),sha=v=>createHash('sha256').update(v).digest('hex'),local=n=>new URL(n,import.meta.url),json=n=>JSON.parse(readFileSync(local(n),'utf8')),endpoint=call=>call.args.slice(call.kind==='cdDrawLine'?2:call.kind==='cdDrawCurve'?4:6,call.kind==='cdDrawLine'?4:call.kind==='cdDrawCurve'?6:8),point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0})
const T=json('./config.json').targets.u7d3d,FIXED_PINS={"../hanja-goal-glyphwiki-batch954-2026-10-13/NOTICE.md":"8f666f1d4ae3bfc3e8013e798a39ccb0f8cd5d6cd6318d454fdef33aafa4953c","../hanja-goal-glyphwiki-batch954-2026-10-13/candidate-compile-analysis.json":"45bdb43e23a5df3aba786941ee27edbd901efcf6502c576edecafe279303799d","../hanja-goal-glyphwiki-batch954-2026-10-13/engine-proof.json":"43d96c6fab191814e46c97219036d6c5a3a46fc2c5a12b2ffa3312c43cee7e47","../hanja-goal-glyphwiki-batch954-2026-10-13/engine-whole-u7d3d-ue0100.json":"e7c2484d2cca44987ed560c8c8f91766995e161b0f0ec716c674e9fb0602edba","../hanja-goal-glyphwiki-batch954-2026-10-13/engine-whole-u7d3d.json":"e7c2484d2cca44987ed560c8c8f91766995e161b0f0ec716c674e9fb0602edba","../hanja-goal-glyphwiki-batch954-2026-10-13/metadata.json":"44dea759d4dd6af6f0d386aedcf211911637176935456f20c5c706621ad67003","../hanja-goal-glyphwiki-batch954-2026-10-13/native-server-preparation-source-analysis.json":"bbe11d10ef7f1775dfc1ced22fd6c2d389811d867b3924b62826de9a52825d7a","../hanja-goal-glyphwiki-batch954-2026-10-13/native-server-validation.json":"7be903dbea02ce27e50e8f1e00232b20103640581aa175386288ade822a3d6e5","../hanja-goal-glyphwiki-batch954-2026-10-13/progressive.mjs":"1bd39e0eed136b97c43456d25162b1964cf87d9a9fe8edbe04863c240ce627cf","../hanja-goal-glyphwiki-batch954-2026-10-13/serve-whole.py":"a533a5b1681819b9cf5c23a7c0ee93f4947b3b56016971511ead0a85e772f182","../hanja-goal-glyphwiki-batch954-2026-10-13/source-analysis.json":"eec9fa7769238e33e6ea09352eebf94de610776c815ec7ebe16ae02b0f8d1851","../hanja-goal-glyphwiki-batch954-2026-10-13/source-join-analysis.json":"87bcbdeb9d43de571c236dabf46b0b31a95c88bd840e9c8aa5d733e31d73839c","../hanja-goal-glyphwiki-batch954-2026-10-13/source-preservation-audit.json":"618077dabe2d71b468280fdc0b408f4c51075d799861ed2639bc8943b3c1dfaf","../hanja-goal-glyphwiki-batch954-2026-10-13/sources.json":"3984a643235fd885033a82a66e3ef561b1baab27e75de1aaaef4f8b6ea01dfe4","../hanja-goal-glyphwiki-batch954-2026-10-13/verify-source.mjs":"fa7cfd0c5410c8ae6bb3479f0b8f56fcbf7a2c3bdedcb118d231e3cbaa284a16","../hanja-goal-glyphwiki-batch954-2026-10-13/README.md":"5388c5f5e861e18490bfdc93e9674c33937d27fb976910c05599277599a023f7","../hanja-goal-glyphwiki-batch954-2026-10-13/source-hold.json":"4f793570408223095c795ca68b4062847685c0e5f1e07e17d7d8b8293f49bd77","../hanja-source-raw-compare-u7d3d-2026-10-20/config.json":"24629754f5f0e799f832d4b1c492cf23f65e348b87447f5e171ddc65bdcc7e69","../hanja-source-raw-compare-u7d3d-2026-10-20/check.mjs":"2ea264bdcb63609a215c1d67c1a0fdffe149a580930a52fafd14ce2183ce0e1d","../hanja-source-raw-compare-u7d3d-2026-10-20/serve.py":"1c7a4aa0db39d39293d76d06806c004cb72809978f97b42a8007c6d250dbf33a","../hanja-source-raw-compare-u7d3d-2026-10-20/README.md":"4f1cf397b95e63101897e9f871b37932af58cc660a8ddebd049470b33e029ca0","../hanja-source-raw-compare-u7d3d-2026-10-20/validation.json":"20eb8bb17d9302a5b367118005124521444920e95d41e98155d94280634dff28","../hanja-source-native-raw-correspondence-u7d3d-2026-10-20/README.md":"958a5e5b71e5ca7e37a04a04e4139391b2a348fe82455c35c311a3c8832e2076","../hanja-source-native-raw-correspondence-u7d3d-2026-10-20/review.json":"faaa1d6b9ee1717f98f873331af81e3e3dc9b898e15a5f803cb1266e30378b45","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"sourceRoot":"u7d3d","sourceProofFile":"./engine-whole-u7d3d.json","sourceProofFileSha256":"e7c2484d2cca44987ed560c8c8f91766995e161b0f0ec716c674e9fb0602edba","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"43d96c6fab191814e46c97219036d6c5a3a46fc2c5a12b2ffa3312c43cee7e47"},FIXED_PROOF_SHA="f34aa1eeb878c3f40dc4ec3b41d16b287c5c7bb8bf0643160157f2cb8aa93335",FIXED_FACTORY_SHA="5ddf658fd183c130eecff89661329d2f2b5e8dbedef0f362b533bc108cb923e8",FIXED_BASELINE_SHA="848847e8f08651f873e9f41e3cf8733981fa02bb880dfd82c07846763af0a6eb",SOURCE_DIRECTORY="../hanja-goal-glyphwiki-batch954-2026-10-13/"
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10,11],[12],[13]],FACTORY_MAP=[[0,1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11],[12]],RAW_COUNT=14,ORIGINAL=[[{"kind":"cdDrawCurve","args":[51.5,16,41,37,28.25,56,0,7]}],[{"kind":"cdDrawCurve","args":[12.5,45,30.5,56,38,76,7,8]}],[{"kind":"cdDrawCurve","args":[73.25,39,52.25,76,27.5,110,0,7]}],[{"kind":"cdDrawCurve","args":[14,113,45.5,109,73.25,101,0,7]}],[{"kind":"cdDrawCurve","args":[57.5,78,71.75,91,77.75,114,7,8]}],[{"kind":"cdDrawLine","args":[48.5,109,48.5,186,32,0]}],[{"kind":"cdDrawCurve","args":[30.5,127,27.5,155,12.5,180,0,7]}],[{"kind":"cdDrawCurve","args":[58.25,122,71.75,136,77,161,7,8]}],[{"kind":"cdDrawLine","args":[130,16.880000000000003,130,45.4,0,32]}],[{"kind":"cdDrawCurve","args":[87.22,33.80799999999999,87.84,64.444,77.92,74.38,7,8]}],[{"kind":"cdDrawLine","args":[87.84,46.228,177.12,46.228,0,2]}],[{"kind":"cdDrawCurve","args":[177.12,46.228,173.4,56.16400000000001,164.72,72.724,22,7]}],[{"kind":"cdDrawCurve","args":[169,90,140,105,105,120,0,7]}],[{"kind":"cdDrawLine","args":[105,65,105,166,0,1]},{"kind":"cdDrawCurve","args":[105,166,105,176,115,176,1,1]},{"kind":"cdDrawLine","args":[115,176,180,176,6,5]}]],TRACE_SHA256="0b5c3e3247f758ba1eff01ec6ba5f4ac96652c356cbb978e8b5f73c5c98c767b",GROUPS_SHA256="d08054d98eb115ef905eb9de85fb3f07419151a653fef58f3eafebd0f4ec7cc5",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=Object.freeze({...EXPECTED_IDENTITY}),sourceRoot='u7d3d',sourceGroups=Object.freeze([[0,1],[2,3],[4],[5],[6],[7],[8],[9],[10,11],[12],[13]].map(a=>Object.freeze(a))),nativeApproval=false,runtimeApplied=false
let factoryAttempts=0,factoryCompileBoundCalls=0,geometrySuccesses=0,cachedCalls=0
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,FACTORY_MAP);assert.deepEqual(T.sourceGroups,sourceGroups);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[p,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(p))),h,p);const fullBytes=readFileSync(local(SOURCE_DIRECTORY+identity.sourceHeaderFile.slice(2))),bodyBytes=readFileSync(local(SOURCE_DIRECTORY+identity.sourceProofFile.slice(2)));assert.equal(sha(fullBytes),identity.sourceHeaderFileSha256);assert.equal(sha(bodyBytes),identity.sourceProofFileSha256);const full=JSON.parse(fullBytes),body=JSON.parse(bodyBytes);assert.deepEqual(full,proof);assert.deepEqual(Object.keys(body).sort(),['defaults','groups','trace']);for(const k of['defaults','groups','trace'])assert.deepEqual(body[k],proof[k]);const s=json(SOURCE_DIRECTORY+'sources.json');assert.equal(s.root,sourceRoot);assert.equal(s.glyph,T.glyph);assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.equal(Object.keys(s.records).length,T.sourceFamily.records);assert.equal(s.providerVersions.length,T.sourceFamily.providerVersions);const closure=[];function visit(n){if(closure.includes(n))return;closure.push(n);assert(s.records[n]);const d=s.records[n].data;if(d.startsWith('[[')&&d.endsWith(']]'))visit(d.slice(2,-2));else for(const row of d.split('$'))if(row.startsWith('99:'))visit(row.split(':')[7])}visit(sourceRoot);assert.deepEqual(closure,T.sourceFamily.selectedRootClosure)}
function generateGeometry(trace,proof,identity){const sourceGroups=ORIGINAL_SOURCE_GROUPS
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

factoryCompileBoundCalls++;return compileBound(trace,proof,identity)}
export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(factoryAttempts,0);factoryAttempts++;const factoryBaseline=generateGeometry(trace,proof,identity),baseline=FACTORY_MAP.map(ix=>ix.flatMap(i=>factoryBaseline[i]));geometrySuccesses++;return{factoryBaseline,baseline}}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const f=json('./fixtures.json')[sourceRoot];assert.equal(typeof FIXED_FACTORY_SHA,'string');assert.equal(typeof FIXED_BASELINE_SHA,'string');assert.deepEqual(f.fullProof,proof);assert.equal(digest(f.factoryBaseline),FIXED_FACTORY_SHA);assert.equal(digest(f.baseline),FIXED_BASELINE_SHA);assert.equal(T.factoryBaselineSHA256,FIXED_FACTORY_SHA);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);assert.deepEqual(f.originalOrderBaseline,f.factoryBaseline);assert.deepEqual(f.baseline,FACTORY_MAP.map(ix=>ix.flatMap(i=>f.factoryBaseline[i])));assert.deepEqual(f.strokes,f.baseline);assert.equal(f.sourceFactoryOperations,1);assert.equal(f.internalCompileBoundCalls,1);assert.equal(f.newSourceGeometryGenerations,1);assert.equal(f.tailDerivations,0);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return factoryCompileBoundCalls}
export function sourceFactoryAttemptCount(){return factoryAttempts}
export function successfulGeometryGenerationCount(){return geometrySuccesses}
export function geometryDerivationCallCount(){return 0}
export function cachedPositiveCallCount(){return cachedCalls}
