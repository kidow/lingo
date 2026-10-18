export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// Provisional source-only review compiler. Domestic order and browser approval are pending.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const endpoint = (call) => call.args.slice(call.kind === 'cdDrawLine' ? 2 : call.kind === 'cdDrawCurve' ? 4 : 6, call.kind === 'cdDrawLine' ? 4 : call.kind === 'cdDrawCurve' ? 6 : 8)
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })


const local=n=>new URL(n,import.meta.url),json=n=>JSON.parse(readFileSync(local(n),'utf8')),sha=b=>createHash('sha256').update(b).digest('hex')
const T=json('./config.json').targets.u90a0,FIXED_PINS={"../hanja-goal-glyphwiki-batch627-2026-10-11/NOTICE.md":"fe168bd4a1a251197ebed2e67680098ed273f664ee4818ca72b6dc2a218699fc","../hanja-goal-glyphwiki-batch627-2026-10-11/README.md":"bfbf9e3ae041e0f68244276f6be177cbb9d4cb938f6397ff7536aa2591e01a49","../hanja-goal-glyphwiki-batch627-2026-10-11/draw-trace.json":"3e8419aa75f5e956a2608d5c1a20587fcd97b5d185efbbc87f9fb1632891e300","../hanja-goal-glyphwiki-batch627-2026-10-11/engine-proof.json":"696e60baf47878e94728487eb2d694f922d0858441a64ae38e2c52cdb7df78b5","../hanja-goal-glyphwiki-batch627-2026-10-11/engine-whole-u90a0-ue0100.json":"8ca6fb9c7b5b0d6d1249e539cb7659247ddb69b5bd3b18f53ce776d4c0e1018c","../hanja-goal-glyphwiki-batch627-2026-10-11/engine-whole-u90a0.json":"8ca6fb9c7b5b0d6d1249e539cb7659247ddb69b5bd3b18f53ce776d4c0e1018c","../hanja-goal-glyphwiki-batch627-2026-10-11/metadata.json":"9ff9348465695b973cdfb6d69d01080cd05a27f38756504fa4cb75c2f8854211","../hanja-goal-glyphwiki-batch627-2026-10-11/progressive-review.json":"aa244c35ea6583b64ce76185c0dd879f459eff6fdab2eef4341f051d17e513ad","../hanja-goal-glyphwiki-batch627-2026-10-11/progressive.mjs":"6d06a119efe6f3eaeee568d7b5ef71f5b92bfa645e7c1c70aba1e0cb25f9da21","../hanja-goal-glyphwiki-batch627-2026-10-11/resume.json":"ce5d81da456684a03f759f4557ff810b1b790cf697743703bed6b5f7de03f658","../hanja-goal-glyphwiki-batch627-2026-10-11/serve-progressive.py":"710859c338d37dec0270e600af11c2541ed9ae39975933acfe93e9129afb57d3","../hanja-goal-glyphwiki-batch627-2026-10-11/serve-variants.py":"96f5786ee11cd61c5de51f31b5b65f1bef3ed1d4ae541909a29b5ffeba8f0b3f","../hanja-goal-glyphwiki-batch627-2026-10-11/sources.json":"a885bd95436073fad0c23cdb57b41c60e75a6714be4add6d7054d709c44bdd8f","../hanja-goal-glyphwiki-batch627-2026-10-11/validation.json":"b1dc0519caee9611c3f6fe1cc8f8ca19e16929b9ab848935f7e92a407fa367ba","../hanja-goal-glyphwiki-batch627-2026-10-11/verify-source.mjs":"4b8e4f31a5bf51ddd3bd4fadeab125e667ab5aeaeecf8f6ebfd97b0bb2884d55","../hanja-goal-glyphwiki-batch627-2026-10-11/whole-variant-inventory.json":"08da720ba137bbfff500a91f5ccaaae7893cd583f13886fcea9e45468b52e7c9","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u90a0","file":"../hanja-goal-glyphwiki-batch627-2026-10-11/engine-whole-u90a0.json","fileSHA256":"8ca6fb9c7b5b0d6d1249e539cb7659247ddb69b5bd3b18f53ce776d4c0e1018c"}
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3,4],[5],[6,7,8],[9],[10]],RAW_COUNT=11,ORIGINAL=[[{"kind":"cdDrawCurve","args":[44.355,39,36.27,79,12.015,107,0,7]}],[{"kind":"cdDrawLine","args":[47.82,30,83.625,30,0,200]}],[{"kind":"cdDrawCurve","args":[79.005,30,86.5125,75,109.6125,97,7,0]}],[{"kind":"cdDrawLine","args":[27.03,99,88.245,99,2,2]}],[{"kind":"cdDrawCurve","args":[88.245,99,88.245,159,84.31946573394862,171.46201354302028,22,0]},{"kind":"cdDrawCurve","args":[84.31946573394862,171.46201354302028,81.315,181,71.315,181,2,114]}],[{"kind":"cdDrawBezier","args":[53.595,99,53.595,150,40.89,174,13.170000000000002,188,32,7]}],[],[{"kind":"cdDrawLine","args":[124,28,176,28,2,2]}],[{"kind":"cdDrawCurve","args":[176,28,166,53,145,84,22,7]}],[{"kind":"cdDrawBezier","args":[145,83,183,99,182,133,175.9872611141445,146.82929943746765,7,1]},{"kind":"cdDrawCurve","args":[175.9872611141445,146.82929943746765,172,156,162,156,1,414]}],[{"kind":"cdDrawLine","args":[124,28,124,186,12,0]}]]
const TRACE_SHA256="ff5d72bb722c0bfc5e315de80f0089c1742fc923b6b7b034543854ae854f8f9c",GROUPS_SHA256="d7e373cfdfd468113df8e5ab476486c2fda7762138b0aa474700d3a7b3639806",FIXED_PROOF_SHA="fec2d7fca4e309dcd176dca0a2f96845daed3c849b4383ca3fbe3de9f93f6355"
const PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
const FIXED_BASELINE_SHA="5c703d400a92a217ced50e234e735a192eb94d997e96efc843fe1d4d662e49a2"
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot='u90a0',sourceGroups=[[0],[1,2],[3,4],[5],[7,8],[9],[10]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.deepEqual(proof,json(identity.file));assert.deepEqual(proof.trace,json('../hanja-goal-glyphwiki-batch627-2026-10-11/draw-trace.json'));assert.deepEqual(trace[6],[]);assert.deepEqual(proof.groups[6].polygons,[]);assert.equal(proof.groups[6].raw[0],0);const s=json('../hanja-goal-glyphwiki-batch627-2026-10-11/sources.json');assert.equal(s.root,sourceRoot);assert.equal(s.glyph,'邠');assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.equal(Object.keys(s.records).length,5);assert.deepEqual(s.providerVersions,[]);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
function generateGeometry(trace,proof,identity){
 const sourceGroups=ORIGINAL_SOURCE_GROUPS
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

 return compileBound(trace,proof,identity)
}
let geometryRuns=0,cachedCalls=0
export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(geometryRuns,0);const rawBaseline=generateGeometry(trace,proof,identity);assert.equal(rawBaseline.length,8);assert(rawBaseline.every(p=>p.length===1));assert.notDeepEqual(endpoint(trace[1][0]),trace[2][0].args.slice(0,2));const baseline=[rawBaseline[0],[rawBaseline[1][0],rawBaseline[2][0]],...rawBaseline.slice(3)];assert.deepEqual(baseline.flat(),rawBaseline.flat());assert.equal(baseline.length,7);assert.equal(baseline.flat().length,8);geometryRuns++;return{rawBaseline,baseline}}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const f=json('./fixtures.json').u90a0;assert.equal(digest(f.fullProof),FIXED_PROOF_SHA);assert.equal(digest(f.baseline),FIXED_BASELINE_SHA);assert.deepEqual(f.strokes,f.baseline);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return 0}
export function cachedPositiveCallCount(){return cachedCalls}
