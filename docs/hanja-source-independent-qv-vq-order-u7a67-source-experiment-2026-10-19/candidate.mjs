export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// Provisional source-only review compiler. Domestic order and browser approval are pending.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const endpoint = (call) => call.args.slice(call.kind === 'cdDrawLine' ? 2 : call.kind === 'cdDrawCurve' ? 4 : 6, call.kind === 'cdDrawLine' ? 4 : call.kind === 'cdDrawCurve' ? 6 : 8)
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })


const local=n=>new URL(n,import.meta.url),json=n=>JSON.parse(readFileSync(local(n),'utf8')),sha=b=>createHash('sha256').update(b).digest('hex')
const round=x=>Math.round(x*1e6)/1e6
const T=json('./config.json').targets.u7a67,FIXED_PINS={"../hanja-goal-glyphwiki-batch859-2026-10-13/NOTICE.md":"0459a01f81859f4f9399503d6e77f85a80640f1e73384ee1e8104070c6af6453","../hanja-goal-glyphwiki-batch859-2026-10-13/README.md":"9314c992b2cd2d8c82c68b19bfd28a3a5ad11edb1e2a10edc813df1f108e5e15","../hanja-goal-glyphwiki-batch859-2026-10-13/candidate-compile-analysis.json":"b849b75d327ce61fc3b5aaae221cd0eda2df69fc8e1c44b8ae243964b182642a","../hanja-goal-glyphwiki-batch859-2026-10-13/engine-proof.json":"55cc0974d2e301a1c0dbf8ea600a0c06a65bdd91c2167c88e5277a5fa85ce871","../hanja-goal-glyphwiki-batch859-2026-10-13/engine-whole-u7a67-ue0100.json":"07abeb2c368e154db8d6e357a58f4f1339b9e7a4c7fc7e05976db9bca706bef0","../hanja-goal-glyphwiki-batch859-2026-10-13/engine-whole-u7a67.json":"78a4c3e4fc2e34c40105ddae4e43c916f7aa18e7dbe279a6e22166420707261e","../hanja-goal-glyphwiki-batch859-2026-10-13/metadata.json":"cd18ffb3a03cc632136cbc9f418316f988477d7209cd52245bedd20f791489b3","../hanja-goal-glyphwiki-batch859-2026-10-13/native-boundary-source-analysis.json":"7bf6376a199d74f339ee58fc472e88b10d96d7a1c2ad78b3694adcc62b8f51af","../hanja-goal-glyphwiki-batch859-2026-10-13/native-preflight-source-analysis.json":"7d82968dc20f9e160ecc13f899d41361ecbbc49df5f091cb0fa715943787c0aa","../hanja-goal-glyphwiki-batch859-2026-10-13/progressive.mjs":"3d51aa2d6e0f736d344e1f1ac8c88b327ff596b870f07578401c1af5cd1bc4d1","../hanja-goal-glyphwiki-batch859-2026-10-13/resume.json":"357618452599304bd8aff61a106fae3a74a936d488c982befcc936eceac0ff03","../hanja-goal-glyphwiki-batch859-2026-10-13/review.json":"5a26cb9ddd4854fbace71c2c8978c64341857f421c6762f89b080f853f3c6261","../hanja-goal-glyphwiki-batch859-2026-10-13/serve-progressive.py":"77e7db779953956391979727e7f16152ee82cb1eda6ff492c004b56e99b7cc12","../hanja-goal-glyphwiki-batch859-2026-10-13/serve-whole.py":"49c6168247ed02dfffe56880f78de94ace7637d95bb4f19449fa1621bd27a40d","../hanja-goal-glyphwiki-batch859-2026-10-13/source-analysis.json":"f1d653a39b432774227c2c7abbdab88250a6292098eb71bb964b73d56fd98a3e","../hanja-goal-glyphwiki-batch859-2026-10-13/source-join-analysis.json":"4f93fd64e4a5db7ecf698da5d4096f4547af46a5a0b8302b1f38eeebb6b735fb","../hanja-goal-glyphwiki-batch859-2026-10-13/sources.json":"62d7fa00e2978895b751d85085dc1752306bf0a24df1cf2805723af85590accb","../hanja-goal-glyphwiki-batch859-2026-10-13/validation.json":"a5e0e64f628e0be7ba8b7b1530cb17d160f8bc712173f00ba850f8e66ea41092","../hanja-goal-glyphwiki-batch859-2026-10-13/verify-source.mjs":"21c9f92e5aa34f5ab8eda981345e0878287879f0fe7497ccbf44b801b55e9efa","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u7a67","file":"../hanja-goal-glyphwiki-batch859-2026-10-13/engine-proof.json","fileSHA256":"55cc0974d2e301a1c0dbf8ea600a0c06a65bdd91c2167c88e5277a5fa85ce871"},FIXED_PROOF_SHA="ae2f7e2a5ddfd195d26339df606b65b056d2a27614dbbf18ab82ef6ba7865b0a",FIXED_BASELINE_SHA="cfef22e97d45a5a641b1a39ddb05e4d494a6d4178bef11be23da4ef7c0770abb"
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[10],[11],[12],[7,8],[9],[13],[14],[15],[16],[17],[19],[20],[18]],FACTORY_MAP=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16],[17],[18],[19]],RAW_COUNT=21,ORIGINAL=[[{"kind":"cdDrawCurve","args":[68.83,23,52.53,34,14.225,45,0,7]}],[{"kind":"cdDrawLine","args":[12.595,76,75.35,76,0,0]}],[{"kind":"cdDrawLine","args":[45.195,35,45.195,186,32,0]}],[{"kind":"cdDrawCurve","args":[42.75,76,34.6,125,12.595,159,132,7]}],[{"kind":"cdDrawCurve","args":[46.825,98,62.31,106,71.275,121,7,8]}],[{"kind":"cdDrawLine","args":[128.5,14.58,128.5,39.393125,0,32]}],[{"kind":"cdDrawLine","args":[72.37875,39.393125,184.62125,39.393125,0,0]}],[{"kind":"cdDrawLine","args":[74.28999999999999,57.5,108.345,57.5,0,2]}],[{"kind":"cdDrawCurve","args":[108.345,57.5,108.345,85.25,106.60277430727197,90.55009049380774,22,0]},{"kind":"cdDrawCurve","args":[106.60277430727197,90.55009049380774,103.47999999999999,100.05,93.47999999999999,100.05,2,414]}],[{"kind":"cdDrawCurve","args":[90.97,57.5,91.66499999999999,88.95,68.035,103.75,32,7]}],[{"kind":"cdDrawCurve","args":[111.125,41.775,118.77000000000001,51.025,123.635,63.975,7,8]}],[{"kind":"cdDrawCurve","args":[143.79000000000002,45.475,137.535,58.425,129.195,70.45,0,7]}],[{"kind":"cdDrawLine","args":[128.5,64.9,128.5,105.6,1000,100]}],[{"kind":"cdDrawCurve","args":[178.54000000000002,50.1,166.03,55.65,150.04500000000002,61.2,0,7]}],[{"kind":"cdDrawLine","args":[150.04500000000002,61.2,150.04500000000002,92.65,1012,32]}],[{"kind":"cdDrawCurve","args":[138.23000000000002,98.2,154.215,92.65,170.2,85.25,0,7]}],[{"kind":"cdDrawCurve","args":[164.64,56.575,168.81,90.8,182.70999999999998,101.9,7,0]}],[{"kind":"cdDrawLine","args":[96.651625,110,96.651625,142.56,0,1]},{"kind":"cdDrawCurve","args":[96.651625,142.56,96.651625,176.88,76.93795,187.44,1,7]}],[{"kind":"cdDrawLine","args":[160.88005,110,160.88005,185.68,0,0]}],[{"kind":"cdDrawLine","args":[96.651625,126.72,160.88005,126.72,2,2]}],[{"kind":"cdDrawLine","args":[96.651625,150.48,160.88005,150.48,2,2]}]],TRACE_SHA256="c98ef189f9836831e8572c633c1ae4ae1fc1a70649a878d5b8427b75cf215479",GROUPS_SHA256="957ed593b70d6e091cd9416b347a14fe269933c5a641128093549ba215979b68",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[[7,8]],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot='u7a67',sourceGroups=[[0],[1],[2],[3],[4],[5],[6],[10],[11],[12],[7,8],[9],[13],[14,15],[16],[17],[19],[20],[18]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,FACTORY_MAP);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.deepEqual(proof,json(identity.file));const selected=json('../hanja-goal-glyphwiki-batch859-2026-10-13/engine-whole-u7a67.json');assert.deepEqual(Object.keys(selected).sort(),['defaults','groups','trace']);for(const k of ['groups','trace','defaults'])assert.deepEqual(proof[k],selected[k]);const s=json("../hanja-goal-glyphwiki-batch859-2026-10-13/sources.json");assert.equal(s.root,"u7a67");assert.equal(s.glyph,T.glyph);assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.equal(Object.keys(s.records).length,T.sourceFamily.records);assert.equal(s.providerVersions.length,T.sourceFamily.providerVersions);for(const p of s.providerVersions)assert.equal(s.records[p.name].data,(p.responseIdentity||p).data);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
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

return compileBound(trace,proof,identity)}
let geometryRuns=0,cachedCalls=0
export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(geometryRuns,0);const rawBaseline=generateGeometry(trace,proof,identity);const baseline=FACTORY_MAP.map(indices=>indices.flatMap(i=>rawBaseline[i]));geometryRuns++;return{rawBaseline,baseline}}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const f=json('./fixtures.json')[sourceRoot];assert.equal(digest(f.fullProof),FIXED_PROOF_SHA);assert.equal(digest(f.baseline),FIXED_BASELINE_SHA);assert.deepEqual(f.strokes,f.baseline);assert.deepEqual(f.baseline,FACTORY_MAP.map(indices=>indices.flatMap(i=>f.rawBaseline[i])));cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return 0}
export function cachedPositiveCallCount(){return cachedCalls}
