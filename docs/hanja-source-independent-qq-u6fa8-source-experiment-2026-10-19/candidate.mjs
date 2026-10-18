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
const T=json('./config.json').targets["u6fa8"],FIXED_PINS={"../hanja-goal-glyphwiki-batch639-2026-10-11/NOTICE.md":"06390834e41238c5857c26ba5a9e3221409a998518363310f51e423910f6cca4","../hanja-goal-glyphwiki-batch639-2026-10-11/README.md":"d97c6df4ef3e94cdb8748dedfc644047652ad4691399ccd3b092f7058a83472e","../hanja-goal-glyphwiki-batch639-2026-10-11/draw-trace.json":"0a3be3ef95085af0b94f3359d322d9bab7a51256089ed2603b394b86786fe9fe","../hanja-goal-glyphwiki-batch639-2026-10-11/engine-proof.json":"cd8b75f14cdeb6fde759219249c49665f58cb4c197187ead52b4ca33c21f3a39","../hanja-goal-glyphwiki-batch639-2026-10-11/engine-whole-u6fa8-ue0100.json":"83fdf88a8e1fadc38825a1a01463ea3d494a462a85fb035fc20ba1ae0a4d0f85","../hanja-goal-glyphwiki-batch639-2026-10-11/engine-whole-u6fa8.json":"296643297787cb61b3ebfb53388def83e60284c69764175ef7acb3cabacd64c1","../hanja-goal-glyphwiki-batch639-2026-10-11/metadata.json":"8b72238374e5d8950d49d0ab78b2f2168d1cb6becac6d430ac475d3985db82ae","../hanja-goal-glyphwiki-batch639-2026-10-11/progressive-review.json":"64a24ff40fe8a2d41a43e502884a6a1c99608e618bd6bbede3da714f7bfce51a","../hanja-goal-glyphwiki-batch639-2026-10-11/progressive.mjs":"083d5dcbadee1b29442c1ebe5a98ae91a2ac991f38f9d9e0c4154eaf2bc70402","../hanja-goal-glyphwiki-batch639-2026-10-11/resume.json":"a7f84dc9786cb37b6353b665f9aad3282bd78abb4f8f1ff164cb4cc21a17a101","../hanja-goal-glyphwiki-batch639-2026-10-11/serve-variants.py":"e2d36761dc5e3edfcedaeee0a607a22832084a7f58c0bc9fd0302f2daf3c80cb","../hanja-goal-glyphwiki-batch639-2026-10-11/sources.json":"4e4091102237a738c69ae1ca623b35f8ed631c3d107e03af0c1ca5de4fb4574f","../hanja-goal-glyphwiki-batch639-2026-10-11/validation.json":"f03fa24addfde343f87e678e54798176fd016ff330216a9470d41c02184c2a18","../hanja-goal-glyphwiki-batch639-2026-10-11/verify-source.mjs":"6262e1a5c9860e5861d5d1ce73e7c6816110f877a61a1680f5d90afcdb52a014","../hanja-goal-glyphwiki-batch639-2026-10-11/whole-variant-inventory.json":"4d831f5b13b1a9b93591beca47a63a60b7476f84aa553e705dc1a4da1d4a3dbc","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u6fa8","headerFile":"../hanja-goal-glyphwiki-batch639-2026-10-11/engine-proof.json","headerFileSHA256":"cd8b75f14cdeb6fde759219249c49665f58cb4c197187ead52b4ca33c21f3a39","traceFile":"../hanja-goal-glyphwiki-batch639-2026-10-11/draw-trace.json","traceFileSHA256":"0a3be3ef95085af0b94f3359d322d9bab7a51256089ed2603b394b86786fe9fe","sourceFile":"../hanja-goal-glyphwiki-batch639-2026-10-11/sources.json","sourceFileSHA256":"4e4091102237a738c69ae1ca623b35f8ed631c3d107e03af0c1ca5de4fb4574f"},FIXED_PROOF_SHA="b8025546455b571be1295185b4423111adc45218e7ed304bd5f473182750dd30",FIXED_BASELINE_SHA="dcad349650ff92196b8a0a72476f0ad5fb223a1c1436cd9a91e5241c22943243"
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16]],FACTORY_MAP=[[0],[1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16]],RAW_COUNT=17,ORIGINAL=[[{"kind":"cdDrawCurve","args":[26.235,20,43.36,27,50.895,41,7,8]}],[{"kind":"cdDrawCurve","args":[13.22,66,31.715,73,38.565,87,7,8]}],[{"kind":"cdDrawCurve","args":[14.59,133,38.565,142,35.825,184,7,8]}],[{"kind":"cdDrawCurve","args":[32.4,150,35.14,138,63.91,67,32,7]}],[{"kind":"cdDrawCurve","args":[84.25999999999999,16.627200000000002,77.6,49.492799999999995,56.88,73.5408,0,7]}],[{"kind":"cdDrawLine","args":[79.08,38.2704,126.44,38.2704,2,100]}],[{"kind":"cdDrawCurve","args":[83.52000000000001,38.2704,98.32,48.6912,103.5,64.72319999999999,7,8]}],[{"kind":"cdDrawCurve","args":[142.72,16.627200000000002,136.06,48.6912,115.34,69.53280000000001,0,7]}],[{"kind":"cdDrawLine","args":[136.8,38.2704,185.64,38.2704,2,100]}],[{"kind":"cdDrawCurve","args":[141.98000000000002,38.2704,156.78,48.6912,161.95999999999998,64.72319999999999,7,8]}],[{"kind":"cdDrawLine","args":[70.94,87.48,176.02,87.48,0,0]}],[{"kind":"cdDrawLine","args":[122.74,87.48,122.74,175.8,32,32]}],[{"kind":"cdDrawCurve","args":[92.4,98.04,89.44,140.28,65.76,165.24,0,7]}],[{"kind":"cdDrawCurve","args":[91.66,123.96,102.75999999999999,134.52,107.94,151.8,7,8]}],[{"kind":"cdDrawCurve","args":[156.04000000000002,98.04,151.6,145.08,132.36,161.4,0,7]}],[{"kind":"cdDrawCurve","args":[153.07999999999998,126.84,166.4,136.44,174.54000000000002,154.68,7,8]}],[{"kind":"cdDrawLine","args":[62.06,175.8,185.64,175.8,0,0]}]],TRACE_SHA256="3c3cab3469d39a010aa47af56d7d2d13fb51391a903089ac09062e717614d74e",GROUPS_SHA256="8cd519862b43a0102527b6392084f94e8b557f14fe7f9cd9668c0946a8d1b063",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot="u6fa8",sourceGroups=[[0],[1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16]],nativeApproval=false,runtimeApplied=false
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
