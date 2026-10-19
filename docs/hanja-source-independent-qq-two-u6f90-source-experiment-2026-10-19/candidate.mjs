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
const T=json('./config.json').targets.u6f90,FIXED_PINS={"../hanja-goal-glyphwiki-batch764-2026-10-12/NOTICE.md":"e834f7fc464939931de9dd731c90849baa9fb223f3879268d2b4e08d6cafcaaf","../hanja-goal-glyphwiki-batch764-2026-10-12/README.md":"0c135e5683779219b282ed65460d462f110b7ef8752d11445ea567981754eba8","../hanja-goal-glyphwiki-batch764-2026-10-12/draw-trace.json":"a515b722b1fc785078a188f74ebeda37810caf3bdfcb726af0aa03d67a4e70e8","../hanja-goal-glyphwiki-batch764-2026-10-12/engine-proof.json":"9d000786ff93811edc86e829b39d23046838456f0e3d640c6ce4fe5f000fd196","../hanja-goal-glyphwiki-batch764-2026-10-12/engine-whole-u6f90-k.json":"d0c78bb2a1164c47cea94d2b4b409caba3df2ab7296b4088dcd52c1670c2620a","../hanja-goal-glyphwiki-batch764-2026-10-12/engine-whole-u6f90-ue0100.json":"d0c78bb2a1164c47cea94d2b4b409caba3df2ab7296b4088dcd52c1670c2620a","../hanja-goal-glyphwiki-batch764-2026-10-12/engine-whole-u6f90.json":"65c01867cafb76551cd70df791835bebd69dda10e6b4aa59234776e622746245","../hanja-goal-glyphwiki-batch764-2026-10-12/metadata.json":"afae5010e488772c405e244d6cab0f2ba70e52331a6734bb28d82f21e130d988","../hanja-goal-glyphwiki-batch764-2026-10-12/resume.json":"6fce96afe61ffae8eff6b0bfc8a89fb2a3d2ee019de0f7fed8657006b55808cf","../hanja-goal-glyphwiki-batch764-2026-10-12/review.json":"7022b86cfe10c299093750f618acda63c68d493915a79f09e4b59f25a2c13dd3","../hanja-goal-glyphwiki-batch764-2026-10-12/serve-memory.py":"419cd51c0132ae164e7dfb350ac3e64efd412320390f12dbbf8cf97751392be1","../hanja-goal-glyphwiki-batch764-2026-10-12/source-join-analysis.json":"ee8f03ea74f2a376807553282212cf96e637acad18ef229189f23fc0fa658ab2","../hanja-goal-glyphwiki-batch764-2026-10-12/sources.json":"29093cbed863528f7531587558690a0b3c2a8d0aad120c7a0fda51fca3d4090c","../hanja-goal-glyphwiki-batch764-2026-10-12/validation.json":"50ff937cc44ffff939add26b3e13090783fda3b9094a580cc96bf077b975536a","../hanja-goal-glyphwiki-batch764-2026-10-12/verify-source.mjs":"7d22cec4b9019ae74aab51c98a737a8300a2815ec4d25d850409eb7f3f93da7c","../hanja-goal-glyphwiki-batch764-2026-10-12/whole-variant-inventory.json":"c065b23f0e8c4503c1f8e68649e1e48fe22555c652abc555fb7cf5adf9fdf7da","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u6f90","file":"../hanja-goal-glyphwiki-batch764-2026-10-12/engine-proof.json","fileSHA256":"9d000786ff93811edc86e829b39d23046838456f0e3d640c6ce4fe5f000fd196"},FIXED_PROOF_SHA="c1dd9e540ebe8f152e97790065148e1cf94c250347c4aa36738f9b08f0550c9e",FIXED_BASELINE_SHA="b50d38105f00eb26be9e7b60ce4f425a14a52b0a2b294601a12a93c9025b784a"
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6,7],[8],[9],[10],[11],[12],[16],[17],[13],[14],[15]],FACTORY_MAP=[[0],[1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14,15],[16]],RAW_COUNT=18,ORIGINAL=[[{"kind":"cdDrawCurve","args":[20.375,20,36,27,42.875,41,7,8]}],[{"kind":"cdDrawCurve","args":[8.5,66,25.375,73,31.625,87,7,8]}],[{"kind":"cdDrawCurve","args":[9.75,133,31.625,142,29.125,184,7,8]}],[{"kind":"cdDrawCurve","args":[26,150,28.5,138,54.75,67,32,7]}],[{"kind":"cdDrawLine","args":[64.21125,25.86375,176.59875,25.86375,0,0]}],[{"kind":"cdDrawCurve","args":[67.9575,34.8183,68.70675,64.6668,57.468,75.61125,7,8]}],[{"kind":"cdDrawLine","args":[67.9575,46.75769999999999,179.59574999999998,46.75769999999999,2,2]}],[{"kind":"cdDrawCurve","args":[179.59574999999998,46.75769999999999,175.10025,58.6971,169.10625,69.64155,22,7]}],[{"kind":"cdDrawLine","args":[120.405,25.86375,120.405,98.49510000000001,32,0]}],[{"kind":"cdDrawLine","args":[73.20224999999999,68.6466,108.417,68.6466,0,200]}],[{"kind":"cdDrawLine","args":[69.456,88.5456,108.417,88.5456,0,100]}],[{"kind":"cdDrawLine","args":[132.39299999999997,68.6466,166.10925000000003,68.6466,0,200]}],[{"kind":"cdDrawLine","args":[132.39299999999997,88.5456,171.35399999999998,88.5456,0,100]}],[{"kind":"cdDrawCurve","args":[104.61,134.9865,97.6845,154.4796,83.8335,173.9727,132,7]}],[{"kind":"cdDrawCurve","args":[61.518,175.7448,116.922,169.54245,163.86149999999998,163.3401,0,7]}],[{"kind":"cdDrawCurve","args":[145.39350000000002,143.847,164.631,161.56799999999998,173.09550000000002,183.71925,7,8]}],[{"kind":"cdDrawLine","args":[69.213,111.9492,170.0175,111.9492,0,100]}],[{"kind":"cdDrawLine","args":[54.5925,134.9865,185.4075,134.9865,0,0]}]],TRACE_SHA256="7e32c429eb5bd655b6ea49125017960f11d2a16db2c563908ccd78094601f100",GROUPS_SHA256="106cc933d11f6c22103d9b79a3e8bc12cc69e6624f5659dcd4605168cede60de",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot='u6f90',sourceGroups=[[0],[1],[2,3],[4],[5],[6,7],[8],[9],[10],[11],[12],[16],[17],[13,14],[15]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,FACTORY_MAP);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.deepEqual(proof,json(identity.file));const header=json('../hanja-goal-glyphwiki-batch764-2026-10-12/engine-whole-u6f90.json');assert.deepEqual(Object.keys(header).sort(),['defaults','groups','trace']);assert.deepEqual(proof.trace,json('../hanja-goal-glyphwiki-batch764-2026-10-12/draw-trace.json'));for(const k of ['groups','defaults','trace'])assert.deepEqual(proof[k],header[k]);const s=json("../hanja-goal-glyphwiki-batch764-2026-10-12/sources.json");assert.equal(s.root,"u6f90");assert.equal(s.glyph,T.glyph);assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.equal(Object.keys(s.records).length,T.sourceFamily.records);assert.equal(s.providerVersions.length,T.sourceFamily.providerVersions);for(const p of s.providerVersions)assert.equal(s.records[p.name].data,(p.responseIdentity||p).data);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
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
