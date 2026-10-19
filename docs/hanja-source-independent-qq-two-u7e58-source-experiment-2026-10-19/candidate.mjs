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
const T=json('./config.json').targets.u7e58,FIXED_PINS={"../hanja-goal-glyphwiki-batch796-2026-10-13/NOTICE.md":"d97ab8530c1513dbbb2147a4cf4ae46145e3b4c0b2714270551c37bec11cd924","../hanja-goal-glyphwiki-batch796-2026-10-13/README.md":"608afd3a3f9321bb6a10c0f38008775d6d9f85d73783d341942683e80fa4f9b2","../hanja-goal-glyphwiki-batch796-2026-10-13/draw-trace.json":"63ed5f160c38796ce8b62af5e380424a98bd03e5ddce32179d84c298d4870e04","../hanja-goal-glyphwiki-batch796-2026-10-13/engine-proof.json":"59134520f516dfc4529a5a14c27b8a036b80279a956655f55429cf927038c122","../hanja-goal-glyphwiki-batch796-2026-10-13/engine-whole-u7e58-ue0100.json":"4a415e7491e03b5ef04e96fdb9f47afd7c200b1d34f20a03d08791cfed0db12b","../hanja-goal-glyphwiki-batch796-2026-10-13/engine-whole-u7e58.json":"59134520f516dfc4529a5a14c27b8a036b80279a956655f55429cf927038c122","../hanja-goal-glyphwiki-batch796-2026-10-13/metadata.json":"3674ef7de71da6255a5ba7bc7e6951c54b8162ca23ba33166470bad5eb673769","../hanja-goal-glyphwiki-batch796-2026-10-13/resume.json":"7098844a1fba2cd58f6a5aa5379b1a9388c59c56cf58b3d0978ee530943dba71","../hanja-goal-glyphwiki-batch796-2026-10-13/review.json":"80b5f695565c9b40aed74ca176f9cddc6fb8487ed258d342d12780d756685ed5","../hanja-goal-glyphwiki-batch796-2026-10-13/serve-memory.py":"be062cc3eb72b477011b66f23ed05a546229c3bc82656f78cd87aa91487f3ef1","../hanja-goal-glyphwiki-batch796-2026-10-13/source-analysis.json":"268814a079bda9997013aef3cc47b49db29ee9fc2d04a6da1f5d3bfd9a187b2e","../hanja-goal-glyphwiki-batch796-2026-10-13/source-join-analysis.json":"652f680c29ab41e99b439027041d79aa96726850e6bf350ec8d88df25f46e08d","../hanja-goal-glyphwiki-batch796-2026-10-13/sources.json":"40dd99aa4b7947485c20abce9a5924247c55ee7052cd4b6fe489a8089f4f6a0a","../hanja-goal-glyphwiki-batch796-2026-10-13/validation.json":"626f9774aea214adefef4e096b9568ca54f37df48962e269027c64e9f9cd5125","../hanja-goal-glyphwiki-batch796-2026-10-13/verify-source.mjs":"4be4ead3e35e0975f093d8845c233fc7c0710a50dd9f7ac24cc1b66e4e399b41","../hanja-goal-glyphwiki-batch796-2026-10-13/whole-variant-inventory.json":"96372e44c93e1f339936311c1e0a0367a345985adc60ccf1a430a3ba9c6f4358","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u7e58","file":"../hanja-goal-glyphwiki-batch796-2026-10-13/engine-whole-u7e58.json","fileSHA256":"59134520f516dfc4529a5a14c27b8a036b80279a956655f55429cf927038c122"},FIXED_PROOF_SHA="ec63ebe20c3822569bf1cb568baa8de8d19e82b1eae84b4a8969ca74769b3063",FIXED_BASELINE_SHA="7f41fd272f223b84fe7c2956250c4e9794f5f4301e2475b1b6bc82113593a990"
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11,12],[13],[14],[15],[16,17],[18],[19],[20],[21,22],[23]],FACTORY_MAP=[[0,1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19]],RAW_COUNT=24,ORIGINAL=[[{"kind":"cdDrawCurve","args":[48.21,16,38.62,37,26.975,56,0,7]}],[{"kind":"cdDrawCurve","args":[12.59,45,29.03,56,35.88,76,7,8]}],[{"kind":"cdDrawCurve","args":[68.075,39,48.895,76,26.29,110,0,7]}],[{"kind":"cdDrawCurve","args":[13.96,113,42.73,109,68.075,101,0,7]}],[{"kind":"cdDrawCurve","args":[53.69,78,66.705,91,72.185,114,7,8]}],[{"kind":"cdDrawLine","args":[45.47,109,45.47,186,32,0]}],[{"kind":"cdDrawCurve","args":[29.03,127,26.29,155,12.59,180,0,7]}],[{"kind":"cdDrawCurve","args":[54.375,122,66.705,136,71.5,161,7,8]}],[{"kind":"cdDrawLine","args":[91,22.11,159.85,22.11,0,2]}],[{"kind":"cdDrawCurve","args":[159.85,22.11,151.075,32.16,136.9,45.225,22,7]}],[{"kind":"cdDrawCurve","args":[113.95,31.155,131.5,37.185,139.6,51.255,7,8]}],[{"kind":"cdDrawLine","args":[84.25,53.265,174.7,53.265,0,2]}],[{"kind":"cdDrawCurve","args":[174.7,53.265,167.95,66.33,153.1,80.4,22,7]}],[{"kind":"cdDrawLine","args":[138.25,53.265,138.25,85.475,32,1]},{"kind":"cdDrawCurve","args":[138.25,85.475,138.25,95.475,128.25,95.475,1,14]}],[{"kind":"cdDrawCurve","args":[131.5,53.265,113.95,84.42,78.85,93.465,132,7]}],[{"kind":"cdDrawLine","args":[86.059,105.525,86.059,183.915,12,0]}],[{"kind":"cdDrawLine","args":[86.059,105.525,176.941,105.525,2,2]}],[{"kind":"cdDrawLine","args":[176.941,105.525,176.941,171.905,22,1]},{"kind":"cdDrawCurve","args":[176.941,171.905,176.941,181.905,166.941,181.905,1,114]}],[{"kind":"cdDrawCurve","args":[119.4715,105.525,116.13025,128.64,92.07325,144.72,132,7]}],[{"kind":"cdDrawLine","args":[144.19675,106.53,144.19675,123.1625,32,1]},{"kind":"cdDrawCurve","args":[144.19675,123.1625,144.19675,133.1625,154.19675,133.1625,1,5001]},{"kind":"cdDrawLine","args":[154.19675,133.1625,166.249,133.1625,5006,5]}],[{"kind":"cdDrawLine","args":[111.733165,144.805425,111.733165,166.242075,12,213]}],[{"kind":"cdDrawLine","args":[111.733165,144.805425,151.26683499999996,144.805425,2,2]}],[{"kind":"cdDrawLine","args":[151.26683499999996,144.805425,151.26683499999996,166.242075,22,223]}],[{"kind":"cdDrawLine","args":[111.733165,166.242075,151.26683499999996,166.242075,2,2]}]],TRACE_SHA256="74cfc63281e30a4512189db6db16d922292d4bc31e8b12cf9a606cd47acd3c2a",GROUPS_SHA256="3560dbdf5e5b61f2c1e637044ab0cbacf66bdcc2af77dd4cb0112bc8a884f6e7",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot="u7e58",sourceGroups=[[0,1],[2,3],[4],[5],[6],[7],[8,9],[10],[11,12],[13],[14],[15],[16,17],[18],[19],[20],[21,22],[23]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,FACTORY_MAP);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.deepEqual(proof,json(identity.file));const s=json("../hanja-goal-glyphwiki-batch796-2026-10-13/sources.json");assert.equal(s.root,"u7e58");assert.equal(s.glyph,T.glyph);assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.equal(Object.keys(s.records).length,T.sourceFamily.records);assert.equal(s.providerVersions.length,T.sourceFamily.providerVersions);for(const p of s.providerVersions)assert.equal(s.records[p.name].data,(p.responseIdentity||p).data);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
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
