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
const T=json('./config.json').targets.u9e8c,FIXED_PINS={"../hanja-goal-glyphwiki-batch760-2026-10-12/NOTICE.md":"09ba7eb9a966364e4b925da4c951ce1df6784104feb043c04cf8eec583731535","../hanja-goal-glyphwiki-batch760-2026-10-12/README.md":"e4f7af320ce5e1b348ceb01e0e25cdf7143dfd28baf307b8660739bca9138b1e","../hanja-goal-glyphwiki-batch760-2026-10-12/draw-trace.json":"6f11dc036972f73129614677085056b7f08ee5f90064c9e2c69a99734b87bd26","../hanja-goal-glyphwiki-batch760-2026-10-12/engine-proof.json":"0724131a5d139e09cd3f21907cf7f09de6729b819aac1fd17b66be68111ee34e","../hanja-goal-glyphwiki-batch760-2026-10-12/engine-whole-u9e8c-ue0100.json":"6f7c04d773e7b4d4609880a7719176736d0487dec74bb2e974450f39aaa379f7","../hanja-goal-glyphwiki-batch760-2026-10-12/engine-whole-u9e8c-var-001.json":"6859f8ca5e9a9a95b6f3a07f005099b2ddf83eff66971246c604d8523ad0e7e9","../hanja-goal-glyphwiki-batch760-2026-10-12/engine-whole-u9e8c-var-002.json":"27dc79af67f3165d3c75461a4e6e51b15763873edb5f419dbb0f1a8a1ccae16d","../hanja-goal-glyphwiki-batch760-2026-10-12/engine-whole-u9e8c-var-003.json":"0f57516031baf5e060009b5e4d38b83f0cd25bc2b65b1eea5bc449db010a16f6","../hanja-goal-glyphwiki-batch760-2026-10-12/engine-whole-u9e8c.json":"9e342ecf932887aed532150564ab412631b7b36c52711eb0a448476dd94eb18d","../hanja-goal-glyphwiki-batch760-2026-10-12/metadata.json":"23a41b884f5b89df41aa311849c919ef6ad230b6a176f02f0e1ed9f9257bf6f1","../hanja-goal-glyphwiki-batch760-2026-10-12/resume.json":"31d8305027507369ba83bcbf2f6da3af183693083bcbad745d922339fda853e9","../hanja-goal-glyphwiki-batch760-2026-10-12/review.json":"3947e8ea9b7512ab6e2b397070f66e626a5e63adaa2f31185614eefcb728432c","../hanja-goal-glyphwiki-batch760-2026-10-12/serve-memory.py":"3a9dd59ccd3a54c61c6a16029380bf82ae14abeb44ab254837841e8e433d45c3","../hanja-goal-glyphwiki-batch760-2026-10-12/sources.json":"b1bf256c37970f3684ecc30b7b1008fb48be2203de4a3ab328767b6c9556e687","../hanja-goal-glyphwiki-batch760-2026-10-12/validation.json":"47dd1acc2983fc35f5fd15337fac88de58952a2282773847c67c24d7a94dd212","../hanja-goal-glyphwiki-batch760-2026-10-12/verify-source.mjs":"187ed231377bb9eaa8ee5479ed9f46dba5c78157dab2900bb4800a97088c1a4a","../hanja-goal-glyphwiki-batch760-2026-10-12/whole-variant-inventory.json":"df064521645f7185778e6774721792bd1b10648a6b56ea73ec7281d53cb1e605","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u9e8c","file":"../hanja-goal-glyphwiki-batch760-2026-10-12/engine-proof.json","fileSHA256":"0724131a5d139e09cd3f21907cf7f09de6729b819aac1fd17b66be68111ee34e"},FIXED_PROOF_SHA="104027288edbad92376832dd39018511c8ff7d2b232621f3ec81ebda7d9e6ad4",FIXED_BASELINE_SHA="a1885a2974dd81c0157b792f4f71fd1223db6b0789551bd690d3b7bd153c1659"
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3,4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14,15],[16],[20,21,22],[17],[18],[19]],FACTORY_MAP=[[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13],[14],[15],[16],[17],[18]],RAW_COUNT=23,ORIGINAL=[[{"kind":"cdDrawLine","args":[104,12.92,104,28.04,0,32]}],[{"kind":"cdDrawLine","args":[32,28.04,184,28.04,2,100]}],[{"kind":"cdDrawLine","args":[32,28.04,32,61.64,12,1]},{"kind":"cdDrawCurve","args":[32,61.64,32,92.72,13,112.04,1,7]}],[{"kind":"cdDrawLine","args":[32,42.32,166,42.32,2,2]}],[{"kind":"cdDrawLine","args":[166,42.32,166,58.28,22,323]}],[{"kind":"cdDrawLine","args":[80,28.88,80,58.28,0,32]}],[{"kind":"cdDrawLine","args":[124,28.88,124,58.28,0,32]}],[{"kind":"cdDrawLine","args":[32,58.28,166,58.28,2,2]}],[{"kind":"cdDrawLine","args":[62,75.08,108,75.08,2,100]}],[{"kind":"cdDrawLine","args":[62,60.8,62,91.88,0,32]}],[{"kind":"cdDrawCurve","args":[41,96.92,73,93.56,113,86,0,7]}],[{"kind":"cdDrawCurve","args":[167,70.04,153,75.08,123,79.28,0,7]}],[{"kind":"cdDrawLine","args":[123,60.8,123,84.4,0,1]},{"kind":"cdDrawCurve","args":[123,84.4,123,94.4,133,94.4,1,3001]},{"kind":"cdDrawLine","args":[133,94.4,180,94.4,3006,5]}],[{"kind":"cdDrawLine","args":[74.7246,111.01820000000001,74.7246,128.4818,12,313]}],[{"kind":"cdDrawLine","args":[74.7246,111.01820000000001,160.1354,111.01820000000001,2,2]}],[{"kind":"cdDrawLine","args":[160.1354,111.01820000000001,160.1354,128.4818,22,323]}],[{"kind":"cdDrawLine","args":[74.7246,128.4818,160.1354,128.4818,2,2]}],[{"kind":"cdDrawLine","args":[22.905,159.68,186.085,159.68,0,100]}],[{"kind":"cdDrawCurve","args":[104.495,143.18,90.565,178.16,16.935000000000002,186.07999999999998,132,7]}],[{"kind":"cdDrawCurve","args":[112.455,159.68,132.355,176.18,181.11,182.12,7,0]}],[{"kind":"cdDrawLine","args":[45.79,107.53999999999999,45.79,143.18,0,313]}],[{"kind":"cdDrawLine","args":[45.79,143.18,144.295,143.18,2,2]}],[{"kind":"cdDrawLine","args":[144.295,143.18,144.295,159.68,22,32]}]],TRACE_SHA256="578bec8de6019ba64386d22f21b7716f0f734cd76b18500f9cd0c8e6b1ca184b",GROUPS_SHA256="7bfbb9054137a3b13501dc67d318fe6f0f0f49e7819e3ff141c18d7fff287095",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot='u9e8c',sourceGroups=[[0],[1],[2],[3,4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14,15],[16],[20,21,22],[17],[18],[19]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,FACTORY_MAP);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.deepEqual(proof,json(identity.file));const header=json('../hanja-goal-glyphwiki-batch760-2026-10-12/engine-whole-u9e8c.json');assert.deepEqual(Object.keys(header).sort(),['defaults','groups','trace']);assert.deepEqual(proof.trace,json('../hanja-goal-glyphwiki-batch760-2026-10-12/draw-trace.json'));for(const k of ['groups','defaults','trace'])assert.deepEqual(proof[k],header[k]);const s=json("../hanja-goal-glyphwiki-batch760-2026-10-12/sources.json");assert.equal(s.root,"u9e8c");assert.equal(s.glyph,T.glyph);assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.equal(Object.keys(s.records).length,T.sourceFamily.records);assert.equal(s.providerVersions.length,T.sourceFamily.providerVersions);for(const p of s.providerVersions)assert.equal(s.records[p.name].data,(p.responseIdentity||p).data);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
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
