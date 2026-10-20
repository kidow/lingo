export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'
import {readFileSync} from 'node:fs'
const digest=v=>createHash('sha256').update(JSON.stringify(v)).digest('hex'),sha=b=>createHash('sha256').update(b).digest('hex'),local=n=>new URL(n,import.meta.url),json=n=>JSON.parse(readFileSync(local(n),'utf8'))
const endpoint=call=>call.args.slice(call.kind==='cdDrawLine'?2:call.kind==='cdDrawCurve'?4:6,call.kind==='cdDrawLine'?4:call.kind==='cdDrawCurve'?6:8),point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0})
const T=json('./config.json').targets['u6f57-k'],FIXED_PINS={"../hanja-goal-glyphwiki-batch902-2026-10-13/NOTICE.md":"381635f6602eea6635a15f9929531b0e6ebe6cdb00a20f98076a9844ccbc29cc","../hanja-goal-glyphwiki-batch902-2026-10-13/README.md":"31c5bb995568d5a7445aa11d12ab598456749678b51367e027e30e9bb13fc7f8","../hanja-goal-glyphwiki-batch902-2026-10-13/candidate-compile-analysis.json":"1bbb819365e3e40a5cc96299819902b20a10b2a503f2b6ed4449caf8ec0374d0","../hanja-goal-glyphwiki-batch902-2026-10-13/engine-proof.json":"46ff9dcaec256a3008598e231d34a48dc270f21b03444fcea1d131ca31741c9a","../hanja-goal-glyphwiki-batch902-2026-10-13/engine-whole-u6f57-k.json":"46ff9dcaec256a3008598e231d34a48dc270f21b03444fcea1d131ca31741c9a","../hanja-goal-glyphwiki-batch902-2026-10-13/engine-whole-u6f57-ue0100.json":"46ff9dcaec256a3008598e231d34a48dc270f21b03444fcea1d131ca31741c9a","../hanja-goal-glyphwiki-batch902-2026-10-13/engine-whole-u6f57.json":"46ff9dcaec256a3008598e231d34a48dc270f21b03444fcea1d131ca31741c9a","../hanja-goal-glyphwiki-batch902-2026-10-13/metadata.json":"d98349c4c8f6f3888bdd26d8d1738d4d72345c7bdba836a8d61272b50732c730","../hanja-goal-glyphwiki-batch902-2026-10-13/native-server-compile.mjs":"497b5130b710aab8f822611d8eb0b508331190d76027a487b782f03ebfb5aacc","../hanja-goal-glyphwiki-batch902-2026-10-13/native-server-source-audit.json":"d8587ab169a583936a6a7e0f6afda529d41ad3559d7415a687980011b3e4f217","../hanja-goal-glyphwiki-batch902-2026-10-13/native-server-validation.json":"3f176733ae307a034712c85209b2f9a1c39959b0f84bc8437d636b34db9664dd","../hanja-goal-glyphwiki-batch902-2026-10-13/progressive.mjs":"8c945f909a7ef161b23f7797c3916ac99f39dd9ec9118ebd9c8eced3e0f03ff2","../hanja-goal-glyphwiki-batch902-2026-10-13/resume.json":"49fea254a0055c4c4005a60113353e2eca9a45496dbe0a3fd63ea5314cdc2be7","../hanja-goal-glyphwiki-batch902-2026-10-13/review.json":"2171515a4605c490f47ae00e3320ca6a1a113dd46ce5eef71131f8ebdb42d4fe","../hanja-goal-glyphwiki-batch902-2026-10-13/serve-native.py":"4c97299986d36ea225fab049215e09ea7c3f15e8a01db9bfb26503affbbdb333","../hanja-goal-glyphwiki-batch902-2026-10-13/source-analysis.json":"5380ece53fc494078386c3f1c3739a776b074ea4d39fb74d59bfab483856c471","../hanja-goal-glyphwiki-batch902-2026-10-13/source-join-analysis.json":"0bad6ca165e5a3d00911ed6748e6020791e010c3521293f12834f41d0af1aa23","../hanja-goal-glyphwiki-batch902-2026-10-13/sources.json":"e5f3fea7c17ae4ac6e1804b5447282bb05c164a39ff326ef187f72f4c974d8fb","../hanja-goal-glyphwiki-batch902-2026-10-13/validation.json":"bba0bd61fc56c0644a695779036153eb52008a966d93653d53a9dcc74b71bb5e","../hanja-goal-glyphwiki-batch902-2026-10-13/verify-source.mjs":"05b39ab813c9046020bf9ca7dc4c661a3304cecbe90332cffeb1ffcde42ea7bf","../hanja-source-raw-compare-u905d-2026-10-21/serve.py":"c9a998d1831751f31132278c5ec03fa1e17327c2201ce0aa1fb21d8553215fd1","../hanja-source-raw-compare-u905d-2026-10-21/check.mjs":"be8f72b83497ada12143f0463e134162f8d0a1f00a84b4de20fc9087b0271c79","../hanja-source-raw-compare-u6f57-k-2026-10-21/config.json":"e67429dd0e038ea1340d6ce24f32110e12d55f58f2d6ce1b34fa9a13791ac5f7","../hanja-source-raw-compare-u6f57-k-2026-10-21/check.mjs":"ff7b08b449ac5c03a7ddbaf7ef409a1cadee6eab0c769e022cc5666676eb8ebd","../hanja-source-raw-compare-u6f57-k-2026-10-21/serve.py":"02987f4503007b0926bea1f531ed580dd7666e22eb02f51bbe9483f1f4b9d2ac","../hanja-source-raw-compare-u6f57-k-2026-10-21/README.md":"aa3a32e155d422141196240d7ab57e6ab9b4a3d3505a6619368ab0ceb7f87aad","../hanja-source-raw-compare-u6f57-k-2026-10-21/validation.json":"631f932f7110a053c9300ddfdcf45b6f88eb06417bae10f6388b0228611f4281","../hanja-source-native-raw-correspondence-u6f57-k-2026-10-21/README.md":"6c60adaac484b1141adb9bcec4d213a2205cfbf0463ffaea1308eed67da705c0","../hanja-source-native-raw-correspondence-u6f57-k-2026-10-21/review.json":"6476f70a8b313f94590c490177838abdc1143bf6f57e7de7783ce12587c1ca92","../hanja-source-independent-qq-u6d7f-k-source-experiment-2026-10-19/candidate.mjs":"500260a987af7d6770d706945109aa5633bafaa1af160590ca30aff5e3c74386","../hanja-source-independent-qq-u6d7f-k-source-experiment-2026-10-19/source-check.mjs":"71b7373b080e9b693910c4792b20a5fef61b72277f923ce3060cba89ce8443fb","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09"},EXPECTED_IDENTITY={"root":"u6f57-k","file":"../hanja-goal-glyphwiki-batch902-2026-10-13/engine-whole-u6f57-k.json","fileSHA256":"46ff9dcaec256a3008598e231d34a48dc270f21b03444fcea1d131ca31741c9a"},FIXED_PROOF_SHA="08ef32a5d669e0a9713b938ef9b6953806555501284303ca56eed9d1974c2f96",FIXED_SOURCES_SHA="354ca367593eaa30b86c8575b56cab532536fac6e11d006a2b3c3e67eda5896e",FIXED_STROKES_SHA='e190251094e331ce8476292f886be4368fdb87f7dd82d41c0c3c601fed8fe770',FIXED_RAW_SHA='bcade9ca63c58dfd79efa25a13db507785421a64f0d6bf76787da187aafa713a',FIXED_FIXTURE_FILE_SHA='0a62c42ef6615497523b158d097f07ab013ada5f738489a9a5fc910bd401ed08'
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15]],RAW_COUNT=16,ORIGINAL=[[{"kind":"cdDrawCurve","args":[26.56,20,45.56,27,53.92,41,7,8]}],[{"kind":"cdDrawCurve","args":[12.12,66,32.64,73,40.24,87,7,8]}],[{"kind":"cdDrawCurve","args":[13.64,133,40.24,142,37.2,184,7,8]}],[{"kind":"cdDrawCurve","args":[33.4,150,36.44,138,68.36,67,32,7]}],[{"kind":"cdDrawCurve","args":[103.4,16,91.9,47,63.150000000000006,76,0,7]}],[{"kind":"cdDrawLine","args":[91.9,43,91.9,107,32,113]}],[{"kind":"cdDrawCurve","args":[145.95,17,137.9,31,126.4,43,0,7]}],[{"kind":"cdDrawLine","args":[128.7,43,128.7,107,32,32]}],[{"kind":"cdDrawLine","args":[91.9,43,180.45,43,2,0]}],[{"kind":"cdDrawLine","args":[91.9,64,173.55,64,2,100]}],[{"kind":"cdDrawLine","args":[91.9,84,173.55,84,2,100]}],[{"kind":"cdDrawLine","args":[91.9,107,183.9,107,2,100]}],[{"kind":"cdDrawLine","args":[67.75,132,186.2,132,0,0]}],[{"kind":"cdDrawLine","args":[128.7,112,128.7,187,0,0]}],[{"kind":"cdDrawCurve","args":[119.5,132,104.55000000000001,162,64.3,181,132,7]}],[{"kind":"cdDrawCurve","args":[134.45,132,154,160,179.3,171,7,0]}]],TRACE_SHA256="121e57f57cadeded865534ef040921563188945035a69f45a19e0ed537290fa1",GROUPS_SHA256="9c6924f90c719fc216baf4e686f65cd3a9935a0347da2406dac725bb2a4ac353",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const sourceRoot='u6f57-k',selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceGroups=[[0],[1],[2,3],[4],[5],[6],[8],[9],[10],[7],[11],[12],[13],[14],[15]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){
 assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY)
 assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.sourceGroups,sourceGroups);assert.deepEqual(T.rawProjectionGroups,ORIGINAL_SOURCE_GROUPS)
 assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace)
 for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f)
 assert.equal(sha(readFileSync(local(identity.file))),identity.fileSHA256);assert.deepEqual(proof,json(identity.file))
 const s=json(T.sourceFile);assert.equal(digest(s),FIXED_SOURCES_SHA);assert.equal(s.root,'u6f57');assert.equal(s.glyph,'潗');assert.deepEqual(Object.keys(s.records).sort(),['u6c35-01','u6f57','u6f57-k','u6f57-ue0100','u96c6-02']);assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.deepEqual(s.providerVersions,[])
 for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])
}
let projectionRuns=0,internalProjectionCalls=0,cachedCalls=0
export function captureProjection(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(projectionRuns,0,'only first pure cached-trace projection authorized');const sourceGroups=ORIGINAL_SOURCE_GROUPS;internalProjectionCalls++;
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

 const rawBaseline=compileBound(trace,proof,identity);assert.equal(rawBaseline.length,16);assert(rawBaseline.every(p=>p.length===1));const strokes=[[0],[1],[2,3],[4],[5],[6],[8],[9],[10],[7],[11],[12],[13],[14],[15]].map(indices=>indices.map(i=>rawBaseline[i][0]));projectionRuns++;return{rawBaseline,baseline:strokes,strokes}
}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(sha(readFileSync(local('./fixtures.json'))),FIXED_FIXTURE_FILE_SHA);const f=json('./fixtures.json')['u6f57-k'];assert.equal(digest(f.fullProof),FIXED_PROOF_SHA);assert.equal(digest(f.rawBaseline),FIXED_RAW_SHA);assert.equal(digest(f.strokes),FIXED_STROKES_SHA);assert.deepEqual(f.baseline,f.strokes);assert.deepEqual(f.sourceGroups,sourceGroups);assert.deepEqual(T.fixedStrokesSHA256,FIXED_STROKES_SHA);assert.deepEqual(f.strokes,sourceGroups.map(indices=>indices.map(i=>f.rawBaseline[i][0])));cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceProjectionCallCount(){return projectionRuns}
export function internalProjectionCallCount(){return internalProjectionCalls}
export function sourceCompileCallCount(){return 0}
export function sourceFactoryCallCount(){return 0}
export function cachedPositiveCallCount(){return cachedCalls}
