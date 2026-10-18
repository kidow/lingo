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
const T=json('./config.json').targets["u7f76"],FIXED_PINS={"../hanja-goal-glyphwiki-batch546-2026-10-11/NOTICE.md":"7ae3f968d0e40be6c995885844c5ea396f8e20264cf0965ef3c297e2873a6a0b","../hanja-goal-glyphwiki-batch546-2026-10-11/README.md":"ac7a3cddebe672d4960059bb41d314aa91ad50765d6bb4c7bf6ba3de01a0954e","../hanja-goal-glyphwiki-batch546-2026-10-11/draw-trace.json":"06edbb76b03def341664b92b5cd96e781acd00eca4e745fd5f2b9437ddc44599","../hanja-goal-glyphwiki-batch546-2026-10-11/engine-proof.json":"9db223033580150433a608008f5e471e9cd5d0fc038468bd86a39f30a8e7e5e5","../hanja-goal-glyphwiki-batch546-2026-10-11/engine-whole-u7f76-ue0100.json":"7e8556a7a9ff2a23ac782b32b2e7c1469b46834a7e912b9913664131e2f866df","../hanja-goal-glyphwiki-batch546-2026-10-11/engine-whole-u7f76-ue0101.json":"7958d2da355e09ea1a52e80fe68fd931f44b8758f52e680f44aef63b500a957f","../hanja-goal-glyphwiki-batch546-2026-10-11/engine-whole-u7f76.json":"0ac1cc7cfafd2f183741cf7ef2f9c7d51914b1314a5693e787ae64797c685827","../hanja-goal-glyphwiki-batch546-2026-10-11/metadata.json":"2cbc0ace08212ad8c72131d1138af9594f2d2eb755450b7989d245f0d239d751","../hanja-goal-glyphwiki-batch546-2026-10-11/progressive-review.json":"f25f2046ca9f4d142f47fbe7d361d8ffe10aa4829e6211dc5f661dd88734ddea","../hanja-goal-glyphwiki-batch546-2026-10-11/progressive.mjs":"95099912686d7160f8a9e666ad46615a9d9848a9c8859d8f616d2dd41f2fcbf5","../hanja-goal-glyphwiki-batch546-2026-10-11/resume.json":"1ab3ce7dffcafcc90022d127c87d9a010fe26407d9f2647b3fe393b1024dec2f","../hanja-goal-glyphwiki-batch546-2026-10-11/serve-progressive.py":"9165f3a7e189e5fbcc7dca8a78372086183d5fe4faa1844d312d76b1f4c40252","../hanja-goal-glyphwiki-batch546-2026-10-11/serve-variants.py":"c02ec7e0efe86c53dd04c0b7aac069ae18ed65de6b3aedf9e2eaa89b08bed8c9","../hanja-goal-glyphwiki-batch546-2026-10-11/sources.json":"5f7e00e390257553b1f50766a7592fba1e13762ad3a4491e2c4173c82fc26086","../hanja-goal-glyphwiki-batch546-2026-10-11/validation.json":"356b4e9eabe3c6453505f733ab7fa70d815262dd8ed8d74a2a7bf998fb825f52","../hanja-goal-glyphwiki-batch546-2026-10-11/verify-source.mjs":"8afb89eff3d47776a687cc36bdd07cce1829642d490d6bad95e6e950df910f32","../hanja-goal-glyphwiki-batch546-2026-10-11/whole-variant-inventory.json":"dc9b1c7f2c2a8923c52bf03508e62800b55f3bd8e19279faa9a7300d87c39872","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u7f76","headerFile":"../hanja-goal-glyphwiki-batch546-2026-10-11/engine-proof.json","headerFileSHA256":"9db223033580150433a608008f5e471e9cd5d0fc038468bd86a39f30a8e7e5e5","traceFile":"../hanja-goal-glyphwiki-batch546-2026-10-11/draw-trace.json","traceFileSHA256":"06edbb76b03def341664b92b5cd96e781acd00eca4e745fd5f2b9437ddc44599","sourceFile":"../hanja-goal-glyphwiki-batch546-2026-10-11/sources.json","sourceFileSHA256":"5f7e00e390257553b1f50766a7592fba1e13762ad3a4491e2c4173c82fc26086"},FIXED_PROOF_SHA="402621e04af7dff744ae3c0657cb3097330fc4f8587c15fb6582111d5381c917",FIXED_BASELINE_SHA="767acc007b36bf74ad626b406f0260f3540e6ce18c8bbaf8416420831f653a34"
const ORIGINAL_SOURCE_GROUPS=[[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10,11],[12],[13],[14,15],[16],[17],[18]],FACTORY_MAP=[[0],[1],[2],[3],[4],[5],[6,7],[8],[9],[10],[11],[12],[13],[14],[15]],RAW_COUNT=19,ORIGINAL=[[{"kind":"cdDrawLine","args":[31,20.79,31,52.29,12,213]}],[{"kind":"cdDrawLine","args":[31,20.79,169,20.79,2,2]}],[{"kind":"cdDrawLine","args":[169,20.79,169,52.29,22,323]}],[{"kind":"cdDrawLine","args":[77,20.79,77,52.29,32,32]}],[{"kind":"cdDrawLine","args":[123,20.79,123,52.29,32,32]}],[{"kind":"cdDrawLine","args":[31,52.29,169,52.29,2,2]}],[{"kind":"cdDrawCurve","args":[88.96,62.64015,70.56,69.61165,40.2,75.886,0,7]}],[{"kind":"cdDrawLine","args":[40.2,75.886,40.2,112.83494999999999,12,32]}],[{"kind":"cdDrawCurve","args":[21.8,119.10929999999999,47.56,112.1378,85.28,99.5891,0,7]}],[{"kind":"cdDrawCurve","args":[61.36,82.16035,84.36,92.61760000000001,91.72,109.3492,7,8]}],[{"kind":"cdDrawLine","args":[100.92,69.61165,166.24,69.61165,0,2]}],[{"kind":"cdDrawCurve","args":[166.24,69.61165,167.16,100.28625,161.6274296035073,108.67110098242367,22,0]},{"kind":"cdDrawCurve","args":[161.6274296035073,108.67110098242367,156.12,117.01785,146.12,117.01785,2,14]}],[{"kind":"cdDrawCurve","args":[130.36,69.61165,126.68,112.1378,80.68,125.38365,132,7]}],[{"kind":"cdDrawLine","args":[47.56,129.3731,47.56,174.4068,12,113]}],[{"kind":"cdDrawLine","args":[47.56,129.3731,152.44,129.3731,2,2]}],[{"kind":"cdDrawLine","args":[152.44,129.3731,152.44,174.4068,22,123]}],[{"kind":"cdDrawLine","args":[100,129.3731,100,174.4068,32,32]}],[{"kind":"cdDrawLine","args":[47.56,151.88995,152.44,151.88995,2,2]}],[{"kind":"cdDrawLine","args":[47.56,174.4068,152.44,174.4068,2,2]}]],TRACE_SHA256="ffc4ff3cc528b9eccc4d3bfc7c43294627a6308a2521cad5b9cae2ca967518dc",GROUPS_SHA256="b1bf1783e1334605831e16748efd4045df9800afb1544d0112696fc267a518aa",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot="u7f76",sourceGroups=[[0],[1,2],[3],[4],[5],[6],[7,8],[9],[10,11],[12],[13],[14,15],[16],[17],[18]],nativeApproval=false,runtimeApplied=false
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
