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
const T=json('./config.json').targets["u8629-ue0102"],FIXED_PINS={"../hanja-goal-glyphwiki-batch593-2026-10-11/NOTICE.md":"98590d637ad51d054306c4e639cb05125d84cde4a3cb60744336e474a41201b8","../hanja-goal-glyphwiki-batch593-2026-10-11/README.md":"36821b90502aa17de33efb1929d8ce8fb929bc90dbb0c4d687bcdae105396de6","../hanja-goal-glyphwiki-batch593-2026-10-11/draw-trace.json":"648df5189745209afbef368b776ca8014882545e16096733a54ef87c9170855f","../hanja-goal-glyphwiki-batch593-2026-10-11/engine-proof.json":"4b0ba5d2f1016f81ba9cad085d49532924c6295c41a982101805ce81f4f7402a","../hanja-goal-glyphwiki-batch593-2026-10-11/engine-whole-u8629-ue0100.json":"96a1374a3aa9fedc6009862eb5012a555b7127ec8accefa5fa5bc32bb4fdaf79","../hanja-goal-glyphwiki-batch593-2026-10-11/engine-whole-u8629-ue0101.json":"96a1374a3aa9fedc6009862eb5012a555b7127ec8accefa5fa5bc32bb4fdaf79","../hanja-goal-glyphwiki-batch593-2026-10-11/engine-whole-u8629-ue0102.json":"941040794a9a052683f9a5b5d62c9fcce4519e28bceecabc0c2471ecb84cb780","../hanja-goal-glyphwiki-batch593-2026-10-11/engine-whole-u8629-ue0103.json":"b578cfa023153ce0711072babc49dbd12864a16ab48174800c4e9d4374e8a29d","../hanja-goal-glyphwiki-batch593-2026-10-11/engine-whole-u8629.json":"45359c7523fff936ca35e68aac5156074f63815d932ca9a942dca7a47a3bb0bc","../hanja-goal-glyphwiki-batch593-2026-10-11/metadata.json":"370a85d41c9bd36cdb1876ebd1b8411cbb56e064bef5ffb139a3030df3748352","../hanja-goal-glyphwiki-batch593-2026-10-11/progressive-review.json":"6029f56c8a66fce6bc4cf8e8a07a30d51f6f2d2193edc865dbcb6f56a307a2a3","../hanja-goal-glyphwiki-batch593-2026-10-11/resume.json":"6474174c177035c992abd0bfd0b3a78b6b3fd7a89b868e9619fcadd96b54e0e8","../hanja-goal-glyphwiki-batch593-2026-10-11/serve-variants.py":"e6b82775b1effd313b3f0163d1faaea4836fe100152cc424cdda8d102db942a5","../hanja-goal-glyphwiki-batch593-2026-10-11/sources.json":"769b4f724b2bfd7f9f5cd35e8e9921fa4ef85207322b9f4578143de9da3d8125","../hanja-goal-glyphwiki-batch593-2026-10-11/validation.json":"7f984ee59b62785b0b3cf735cd4de585c11ca392221e652e41f98048a715d885","../hanja-goal-glyphwiki-batch593-2026-10-11/verify-source.mjs":"dfc11f980846c8e720bfe078389fc42b0289e557a9ea70fa6d83744f275f2de4","../hanja-goal-glyphwiki-batch593-2026-10-11/whole-variant-inventory.json":"89b99af6cd99bd0272ba876c7e343e69988e8a9a00cef59049fed12dbbe1c2e0","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u8629-ue0102","file":"../hanja-goal-glyphwiki-batch593-2026-10-11/engine-whole-u8629-ue0102.json","fileSHA256":"941040794a9a052683f9a5b5d62c9fcce4519e28bceecabc0c2471ecb84cb780"},FIXED_PROOF_SHA="6c856c1ad5981b128d229c2af8ff5a2bd5357529ca0298effc59641e5ffe9e24",FIXED_BASELINE_SHA="9581d844f7a15c53d5d0ca2c7aa23807b2c507a2f7e09d3adbdc759ab0e0868b"
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6,7],[8,9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22],[23],[24]],FACTORY_MAP=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15,16],[17,18],[19],[20],[21],[22]],RAW_COUNT=25,ORIGINAL=[[{"kind":"cdDrawLine","args":[12.935,28.375,93.53,28.375,0,100]}],[{"kind":"cdDrawLine","args":[63.68,12.125,63.68,44,0,300]}],[{"kind":"cdDrawLine","args":[135.32,12.125,135.32,44,0,300]}],[{"kind":"cdDrawLine","args":[105.47,28.375,186.065,28.375,0,0]}],[{"kind":"cdDrawCurve","args":[39.99,46.5101,31.73,63.19610000000001,12.26,74.45915,0,7]}],[{"kind":"cdDrawLine","args":[32.91,57.77315000000001,108.43,57.77315000000001,2,200]}],[{"kind":"cdDrawLine","args":[38.22,68.243615,29.37,105.8246585,12,13]}],[{"kind":"cdDrawLine","args":[29.37,105.8246585,109.02,105.8246585,2,300]}],[{"kind":"cdDrawLine","args":[38.22,68.243615,90.73,68.243615,2,2]}],[{"kind":"cdDrawCurve","args":[90.73,68.243615,87.19,110.3215355,83.58278698136465,112.2853603495886,22,0]},{"kind":"cdDrawCurve","args":[83.58278698136465,112.2853603495886,74.8,117.066851,64.8,117.066851,2,114]}],[{"kind":"cdDrawCurve","args":[53.56,72.4192865,65.36,75.310136,69.49,82.0554515,7,8]}],[{"kind":"cdDrawCurve","args":[48.84,90.72800000000001,61.82,93.6188495,67.13,101.00657599999998,7,8]}],[{"kind":"cdDrawLine","args":[13.44,86.873534,112.56,86.873534,0,200]}],[{"kind":"cdDrawCurve","args":[138.65,46.5101,128.45,67.78475,104.65,82.385,0,7]}],[{"kind":"cdDrawLine","args":[125.05,66.95045,187.95,66.95045,2,0]}],[{"kind":"cdDrawCurve","args":[164.15,66.95045,153.95,107.414,88.5,119.0942,2,7]}],[{"kind":"cdDrawCurve","args":[119.95,71.12195,129.3,103.2425,181.15,114.9227,7,0]}],[{"kind":"cdDrawCurve","args":[98,120.698,86,129.76999999999998,70,138.84199999999998,0,7]}],[{"kind":"cdDrawCurve","args":[44,129.76999999999998,70,136.898,82,149.20999999999998,7,8]}],[{"kind":"cdDrawCurve","args":[137,128.474,118,140.786,88,155.69,0,7]}],[{"kind":"cdDrawCurve","args":[21,158.28199999999998,76,156.986,164,153.098,0,7]}],[{"kind":"cdDrawCurve","args":[139,140.138,164,149.20999999999998,175,162.17000000000002,7,8]}],[{"kind":"cdDrawLine","args":[100,156.986,100,185.49800000000002,32,200]}],[{"kind":"cdDrawCurve","args":[68,164.762,53,176.42600000000002,24,186.14600000000002,0,7]}],[{"kind":"cdDrawCurve","args":[125,161.522,152,170.59399999999997,166,183.554,7,8]}]],TRACE_SHA256="cb72981b761abe194c4fe81a1ce0992b30c4d84786f5a6fd57edbac9180d5ee0",GROUPS_SHA256="6242a9d9cb0ae6cef6f484ee267e114d5e9f2fe3e662da70814a0e10fad02636",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot="u8629-ue0102",sourceGroups=[[0],[1],[2],[3],[4],[5],[6,7],[8,9],[10],[11],[12],[13],[14],[15],[16],[17,18],[19,20],[21],[22],[23],[24]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,FACTORY_MAP);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.deepEqual(proof,json(identity.file));const s=json("../hanja-goal-glyphwiki-batch593-2026-10-11/sources.json");assert.equal(s.root,"u8629-ue0102");assert.equal(s.glyph,T.glyph);assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.equal(Object.keys(s.records).length,T.sourceFamily.records);assert.equal(s.providerVersions.length,T.sourceFamily.providerVersions);for(const p of s.providerVersions)assert.equal(s.records[p.name].data,(p.responseIdentity||p).data);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
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
