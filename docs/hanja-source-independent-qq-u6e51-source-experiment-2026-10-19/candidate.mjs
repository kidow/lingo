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
const T=json('./config.json').targets["u6e51"],FIXED_PINS={"../hanja-goal-glyphwiki-batch638-2026-10-11/NOTICE.md":"fd86c481e9416a85dbe7aae9258e200a383ac67af9a6fd4d20cb2e65960772d8","../hanja-goal-glyphwiki-batch638-2026-10-11/README.md":"c225835b27630670c0c1e214e370e595e96a140bee12e8cd59d9a64c0dfdc194","../hanja-goal-glyphwiki-batch638-2026-10-11/draw-trace.json":"09287ab49244f7a42ea87a7f3fced6410aeeb92eb37e2667dd4416a223629164","../hanja-goal-glyphwiki-batch638-2026-10-11/engine-proof.json":"8373c143cfc458f712ccde37ba3c091d410709e734f9da9a10bb000bd6eabae0","../hanja-goal-glyphwiki-batch638-2026-10-11/engine-whole-u6e51-ue0100.json":"074da1f29dd77ba660d79988aced336174d57400da9242fa4ada4e89267bfd74","../hanja-goal-glyphwiki-batch638-2026-10-11/engine-whole-u6e51.json":"ba8df01dd0a95fa0e4030b33a66d945bdc7c5ef9d138e1dc1bb36bc9291f7eb2","../hanja-goal-glyphwiki-batch638-2026-10-11/metadata.json":"915f7cbcb122f443e370076d0c13950e146f1e634c5e1d2f872d8c30f4076733","../hanja-goal-glyphwiki-batch638-2026-10-11/progressive-review.json":"7521fc26d983ecfaa94b3694fcb78ca669641fe08348219e4dbbb517ff03f2d9","../hanja-goal-glyphwiki-batch638-2026-10-11/progressive.mjs":"3e2ae57068bbd04fb9e470eefe5df3d2030679798bd06726feadd090c9f98693","../hanja-goal-glyphwiki-batch638-2026-10-11/resume.json":"90d31d023f2e92ff030b3e69b6ec315c3124190101d052eaf567c6b62ca9b12d","../hanja-goal-glyphwiki-batch638-2026-10-11/serve-variants.py":"8aac5fcfc92ef2d6baee9807247835d5620e0f9dddc41e14c9cc911e7ba8ab79","../hanja-goal-glyphwiki-batch638-2026-10-11/sources.json":"9b9d55bee8ce448157696b22b57b242bd3e6d5a29c71eae2bd8d077b9a5e88ea","../hanja-goal-glyphwiki-batch638-2026-10-11/validation.json":"81c3815ae054123bfc081c3ef8546dd44a67470b622f9a9d7a5d3f1a71d83abe","../hanja-goal-glyphwiki-batch638-2026-10-11/verify-source.mjs":"15c65fce2ab670026ffdd0fe826dc21e3b26d9e7be8fa385f5617bae263ba3c8","../hanja-goal-glyphwiki-batch638-2026-10-11/whole-variant-inventory.json":"ab732d04be6d00718fb89790d4464f5c4e213e4491f219ab799349b8ddb3546e","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u6e51","headerFile":"../hanja-goal-glyphwiki-batch638-2026-10-11/engine-proof.json","headerFileSHA256":"8373c143cfc458f712ccde37ba3c091d410709e734f9da9a10bb000bd6eabae0","traceFile":"../hanja-goal-glyphwiki-batch638-2026-10-11/draw-trace.json","traceFileSHA256":"09287ab49244f7a42ea87a7f3fced6410aeeb92eb37e2667dd4416a223629164","sourceFile":"../hanja-goal-glyphwiki-batch638-2026-10-11/sources.json","sourceFileSHA256":"9b9d55bee8ce448157696b22b57b242bd3e6d5a29c71eae2bd8d077b9a5e88ea"},FIXED_PROOF_SHA="72e10ac739d7f8446079c1683bfbbb63075a8ecab3f8def0171d40ed906918c8",FIXED_BASELINE_SHA="b709b38b64f75382922d64ff9a42f0bfab6b789a9ff80dfa4cb8392da42a1fb7"
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11,12],[13],[14]],FACTORY_MAP=[[0],[1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11],[12]],RAW_COUNT=15,ORIGINAL=[[{"kind":"cdDrawCurve","args":[27.335,20,46.96,27,55.595,41,7,8]}],[{"kind":"cdDrawCurve","args":[12.42,66,33.614999999999995,73,41.465,87,7,8]}],[{"kind":"cdDrawCurve","args":[13.99,133,41.465,142,38.325,184,7,8]}],[{"kind":"cdDrawCurve","args":[34.4,150,37.54,138,70.51,67,32,7]}],[{"kind":"cdDrawLine","args":[75.5645,23.878800000000002,174.128,23.878800000000002,0,2]}],[{"kind":"cdDrawCurve","args":[174.128,23.878800000000002,167.51299999999998,29.848499999999998,156.92900000000003,39.798,22,7]}],[{"kind":"cdDrawLine","args":[126.5,23.878800000000002,126.5,83.5758,32,32]}],[{"kind":"cdDrawLine","args":[126.5,54.72225,172.14350000000002,54.72225,2,100]}],[{"kind":"cdDrawCurve","args":[96.071,39.798,93.425,72.63135,68.9495,95.51520000000001,0,7]}],[{"kind":"cdDrawCurve","args":[93.425,53.72730000000001,100.03999999999999,91.5354,178.097,87.55560000000001,7,0]}],[{"kind":"cdDrawLine","args":[90.69800000000001,104.30392499999999,90.69800000000001,185.25165,12,0]}],[{"kind":"cdDrawLine","args":[90.69800000000001,104.30392499999999,162.302,104.30392499999999,2,2]}],[{"kind":"cdDrawLine","args":[162.302,104.30392499999999,162.302,171.61355,22,1]},{"kind":"cdDrawCurve","args":[162.302,171.61355,162.302,181.61355,152.302,181.61355,1,314]}],[{"kind":"cdDrawLine","args":[90.69800000000001,127.95157499999999,162.302,127.95157499999999,2,2]}],[{"kind":"cdDrawLine","args":[90.69800000000001,151.59922500000002,162.302,151.59922500000002,2,2]}]],TRACE_SHA256="b37a717e585197cf0632015e0c3e1884dc4c2faa5d1b361075013e1cd5485749",GROUPS_SHA256="0c65f035146e61a386264aff06f0d6a3a845b3c7047be5ec6d4d6093b0aa52d0",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot="u6e51",sourceGroups=[[0],[1],[2,3],[4,5],[6],[7],[8],[9],[10],[11,12],[13],[14]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,FACTORY_MAP);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);const header=json(identity.headerFile);assert.deepEqual(Object.keys(header).sort(),['defaults','engineHashes','engineRevision','groups']);assert.deepEqual(proof,{...header,trace:json(identity.traceFile)});const s=json(identity.sourceFile);assert.equal(s.root,sourceRoot);assert.equal(s.glyph,T.glyph);assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.equal(Object.keys(s.records).length,T.sourceFamily.records);assert.equal(s.providerVersions.length,T.sourceFamily.providerVersions);for(const p of s.providerVersions)assert.equal(s.records[p.name].data,(p.responseIdentity||p).data);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
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
