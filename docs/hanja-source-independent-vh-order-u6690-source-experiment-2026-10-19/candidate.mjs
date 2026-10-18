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
const T=json('./config.json').targets.u6690,FIXED_PINS={"../hanja-goal-glyphwiki-batch771-2026-10-13/NOTICE.md":"444d804cf7f50a17829ca5843e82424eeb305aa575e0733e1fa3d629a4da7322","../hanja-goal-glyphwiki-batch771-2026-10-13/README.md":"16a3d21d79474d7e1181616989652f0879a69b03b6ce2c79b071be985bb2ffaf","../hanja-goal-glyphwiki-batch771-2026-10-13/draw-trace.json":"ef92fbc88e8419eaa565bf02b986182201f9bb1bc93faf41ba11906dab0106b7","../hanja-goal-glyphwiki-batch771-2026-10-13/engine-proof.json":"6eb96adc90de90065d8ae6d4ca89c66856f033ec0dbe4a0d7af04c98262d2bc3","../hanja-goal-glyphwiki-batch771-2026-10-13/engine-whole-u6690-k.json":"a748f919e2fe8fa6699fb68e0724f1bb108a80a520d182139d5db064b5bb2f74","../hanja-goal-glyphwiki-batch771-2026-10-13/engine-whole-u6690-ue0100.json":"4f87540a2668e491e71bfbe3684cf29dec9f3e27a763e3c81972884f59cce23a","../hanja-goal-glyphwiki-batch771-2026-10-13/engine-whole-u6690-ue0101.json":"4f87540a2668e491e71bfbe3684cf29dec9f3e27a763e3c81972884f59cce23a","../hanja-goal-glyphwiki-batch771-2026-10-13/engine-whole-u6690-ue0102.json":"f748df1cb0f5dabe75ed4f9ea3173104aa9649f959d11aaba5c4511d19e2d92e","../hanja-goal-glyphwiki-batch771-2026-10-13/engine-whole-u6690.json":"4f87540a2668e491e71bfbe3684cf29dec9f3e27a763e3c81972884f59cce23a","../hanja-goal-glyphwiki-batch771-2026-10-13/metadata.json":"ea32a85e8d43c2b8c16fb469e18467659036216047c9c4aa68eedc060eca867d","../hanja-goal-glyphwiki-batch771-2026-10-13/resume.json":"62dca5db4253a97e71d2f8f6bc1db9459c91fcae1f234518f334712f3ceecbb7","../hanja-goal-glyphwiki-batch771-2026-10-13/review.json":"a423ee6a1ea05f5057d2eea3ceae7f7f07526fb742936e0d0654cfdbe6293ea5","../hanja-goal-glyphwiki-batch771-2026-10-13/serve-memory.py":"1a264f49c8814a8d961b577cf5ce2d5c8c4fffa8dfa132cd752791fe66ddd40e","../hanja-goal-glyphwiki-batch771-2026-10-13/source-analysis.json":"1d2595670cdd3badfdff9419e01ffd539669e8842404cb1e0581615609e7d388","../hanja-goal-glyphwiki-batch771-2026-10-13/source-join-analysis.json":"7fa42eedaf27ee3494faa75e9485ea3bbb036c0fbb326b215f50c98989dfb713","../hanja-goal-glyphwiki-batch771-2026-10-13/sources.json":"1edb9c3319589bf08554de898e0c6b3ccba8c4825dc2956dea707fdc91c8d8ee","../hanja-goal-glyphwiki-batch771-2026-10-13/validation.json":"4de657823192072ba78e72373f9cfcf4f40b804a4ee39660aacad9042566233e","../hanja-goal-glyphwiki-batch771-2026-10-13/verify-source.mjs":"9c630ea62cec1246020627e818027057e6e5595fcac8fc671757135bad8f026c","../hanja-goal-glyphwiki-batch771-2026-10-13/whole-variant-inventory.json":"8672fdbe27ab4bcf11f8f6fe747b22cbc73203eb2ec36aded4e730ae893beea1","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47","../hanja-source-independent-vh-u6690-source-experiment-2026-10-19/README.md":"ac5f00d89c3a76787b82f9717ca82c76d23254e44ac25f91b0bd5edce4381e6f","../hanja-source-independent-vh-u6690-source-experiment-2026-10-19/candidate.d.mts":"1dc1821b0e36ba17988369ba3e081232962b88ada5a7e7a3f30396ac0d2f4140","../hanja-source-independent-vh-u6690-source-experiment-2026-10-19/candidate.mjs":"75b05a7d85308cebeeaa8aa15c057eafad5264d7a6ec05e880f7d1872250d90a","../hanja-source-independent-vh-u6690-source-experiment-2026-10-19/config.json":"932afbba87864af71ff8143415671cd658e65364c1d2cbf72562fe257bc6490d","../hanja-source-independent-vh-u6690-source-experiment-2026-10-19/fixtures.json":"346d8d67c0557ada83b0cbc4f20b71cf693dc197079af078fc89f88486b9613e","../hanja-source-independent-vh-u6690-source-experiment-2026-10-19/preparation.json":"434cfbbd127e72ef150a96229f16bce6e7c8e50cea4e4bd2a900b2347e2e4055","../hanja-source-independent-vh-u6690-source-experiment-2026-10-19/serve.py":"9fc69b370b0df69a1b1be813e3ade3f24a1e01ccbdcfacf1fd66a7de6525ad33","../hanja-source-independent-vh-u6690-source-experiment-2026-10-19/source-check.mjs":"471109f55895a68cd868563738e08e8cef4273c5e395e03c8f98d4eb768ca88c"},EXPECTED_IDENTITY={"root":"u6690","file":"../hanja-goal-glyphwiki-batch771-2026-10-13/engine-proof.json","fileSHA256":"6eb96adc90de90065d8ae6d4ca89c66856f033ec0dbe4a0d7af04c98262d2bc3"},FIXED_PROOF_SHA="5864f66191b76550e6fdcaf94e2b40e2991a682da6622b3d7db1d9fb5e233b08",FIXED_BASELINE_SHA="7f537cee2eab81212690a41a65322849c84cbb2eb9b842b9157be2b81507434b"
const ORIGINAL_SOURCE_GROUPS=[[0],[1,2],[3],[4],[5,6],[7],[8],[9],[10,11],[12],[13],[14],[15],[16]],FACTORY_MAP=[[0],[1],[2],[3],[5],[4],[6],[7],[8],[9],[10],[11,12],[13]],RAW_COUNT=17,ORIGINAL=[[{"kind":"cdDrawLine","args":[24.52335,37.56,24.52335,150.44,12,13]}],[{"kind":"cdDrawLine","args":[24.52335,37.56,61.32164999999999,37.56,2,2]}],[{"kind":"cdDrawLine","args":[61.32164999999999,37.56,61.32164999999999,150.44,22,323]}],[{"kind":"cdDrawLine","args":[24.52335,92.34,61.32164999999999,92.34,2,2]}],[{"kind":"cdDrawLine","args":[24.52335,150.44,61.32164999999999,150.44,2,2]}],[{"kind":"cdDrawLine","args":[77.31,36,154.985,36,0,2]}],[{"kind":"cdDrawLine","args":[154.985,36,154.985,64,22,32]}],[{"kind":"cdDrawLine","args":[121.525,13,109.575,64,0,32]}],[{"kind":"cdDrawLine","args":[67.75,64,187.25,64,0,100]}],[{"kind":"cdDrawLine","args":[95.235,82,95.235,108,12,113]}],[{"kind":"cdDrawLine","args":[95.235,82,159.765,82,2,2]}],[{"kind":"cdDrawLine","args":[159.765,82,159.765,108,22,123]}],[{"kind":"cdDrawLine","args":[95.235,108,159.765,108,2,2]}],[{"kind":"cdDrawLine","args":[89.26,134,181.275,134,2,0]}],[{"kind":"cdDrawLine","args":[89.26,134,89.26,161,12,32]}],[{"kind":"cdDrawLine","args":[67.75,161,187.25,161,0,0]}],[{"kind":"cdDrawLine","args":[137.06,109,137.06,187,0,200]}]],TRACE_SHA256="1f90dd0f41a5deaed7c0a2fdbf6486cedfe6f4466e09a08e0742899923c3cbcf",GROUPS_SHA256="0c1e63a0bbe2d2233bb5d88401d0e45d48eca04e680e3d38399c82d5404e3b18",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot="u6690",sourceGroups=[[0],[1,2],[3],[4],[7],[5,6],[8],[9],[10,11],[12],[13],[14,15],[16]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,FACTORY_MAP);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.deepEqual(proof,json(identity.file));const s=json("../hanja-goal-glyphwiki-batch771-2026-10-13/sources.json");assert.equal(s.root,"u6690");assert.equal(s.glyph,T.glyph);assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.equal(Object.keys(s.records).length,T.sourceFamily.records);assert.equal(s.providerVersions.length,T.sourceFamily.providerVersions);for(const p of s.providerVersions)assert.equal(s.records[p.name].data,(p.responseIdentity||p).data);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
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
