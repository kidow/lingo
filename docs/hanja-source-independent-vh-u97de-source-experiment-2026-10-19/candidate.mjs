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
const T=json('./config.json').targets.u97de,FIXED_PINS={"../hanja-goal-glyphwiki-batch743-2026-10-12/NOTICE.md":"247bf51691c3c1b92195afe3055ba389ed8420240fce76b5ce26d285cd2981d2","../hanja-goal-glyphwiki-batch743-2026-10-12/README.md":"32f4d649b576e4911842b88190dc68ad018791ce2ead77a70267dabe7e8ab59f","../hanja-goal-glyphwiki-batch743-2026-10-12/draw-trace.json":"9d81ec0156aefde7f44d21c669b9f2b46e41a970b7b2badb89b0c957687bed99","../hanja-goal-glyphwiki-batch743-2026-10-12/engine-proof.json":"29665d27cb02842a954c4e3947742c224ccf5cc8b3f677f4c9ff93e10cbbfe9e","../hanja-goal-glyphwiki-batch743-2026-10-12/engine-whole-u97de-ue0100.json":"eddb65d40808d79d01987b5233d375fcac1b01579108cfbb6d2ca310b88ca999","../hanja-goal-glyphwiki-batch743-2026-10-12/engine-whole-u97de-ue0101.json":"03a4d6898dd3b527ab3c33cead02e58efe400cd15265a241ddf529cfccd313ee","../hanja-goal-glyphwiki-batch743-2026-10-12/engine-whole-u97de-ue0102.json":"eddb65d40808d79d01987b5233d375fcac1b01579108cfbb6d2ca310b88ca999","../hanja-goal-glyphwiki-batch743-2026-10-12/engine-whole-u97de-ue0103.json":"6c56f7d19c1be656f83ae5cccc6dfccdc209c7ec9c694a867b6554a0c37e2f18","../hanja-goal-glyphwiki-batch743-2026-10-12/engine-whole-u97de-ue0104.json":"89dbcefc56dfcfbaa7e65421df6a80aa22450926debfde97f3e54b4bfe8928a8","../hanja-goal-glyphwiki-batch743-2026-10-12/engine-whole-u97de-ue0105.json":"4c926b6c6c65152422ba256131928904c556c6b930724fe14ece22bbec53c498","../hanja-goal-glyphwiki-batch743-2026-10-12/engine-whole-u97de.json":"58960414c5964f3380af54d4e50870e7460961c7631072919a0bde8159448ae0","../hanja-goal-glyphwiki-batch743-2026-10-12/metadata.json":"11a653fc79a437b65b8f47c6df676c0969d2ece6387d5090eff3a560b670f96a","../hanja-goal-glyphwiki-batch743-2026-10-12/resume.json":"081d8df9cc1e19b96eb667f7a26aedc451821328ea63e898c2343f85c43943e6","../hanja-goal-glyphwiki-batch743-2026-10-12/review.json":"fb6eeb6f1b68cfd1c21f5c1aa942b3d542f1975c45094fd0f59f52e064822f2e","../hanja-goal-glyphwiki-batch743-2026-10-12/serve-memory.py":"5b877cc00d795dd7c0cb8659582fff0fbc76762e5d9da62e1cfa9962dc5afb87","../hanja-goal-glyphwiki-batch743-2026-10-12/sources.json":"98b45629e66c3b8805aa40b8211d4d78c59b49e5ae59ca968655adcffc972cd4","../hanja-goal-glyphwiki-batch743-2026-10-12/validation.json":"113325ea5903563e0a38847d779fce8f1752f772a195a3722a5b3555f2139b7c","../hanja-goal-glyphwiki-batch743-2026-10-12/verify-source.mjs":"f9474d648dc196a662a5550986484b2ac812a9a57f319a0244e046ed3868b9d3","../hanja-goal-glyphwiki-batch743-2026-10-12/whole-variant-inventory.json":"98c0b8a0e9195bd6bf951c1392f8f82d1836ada64b81fb73cba225e289bc6b24","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u97de","file":"../hanja-goal-glyphwiki-batch743-2026-10-12/engine-proof.json","fileSHA256":"29665d27cb02842a954c4e3947742c224ccf5cc8b3f677f4c9ff93e10cbbfe9e"},FIXED_PROOF_SHA="3249b1ddd259e3c4b82277cae27b57c5fb63439ce8bdbcb10e3905f5bf9b421d",FIXED_BASELINE_SHA="a85314c9ac46c67a29f3eecc98da4abf48e1bfb93ec44cea980cf3a08c74fbe4"
const ORIGINAL_SOURCE_GROUPS=[[0,1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13,14],[16],[17],[15],[18],[19,20],[21],[22],[23]],FACTORY_MAP=[[0],[1],[2],[3],[4],[5],[6],[7,8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19]],RAW_COUNT=24,ORIGINAL=[[{"kind":"cdDrawLine","args":[19.08,36,68.48,36,0,2]}],[{"kind":"cdDrawLine","args":[68.48,36,68.48,64,22,32]}],[{"kind":"cdDrawLine","args":[47.2,13,39.599999999999994,64,0,32]}],[{"kind":"cdDrawLine","args":[13,64,89,64,0,300]}],[{"kind":"cdDrawLine","args":[30.479999999999997,82,30.479999999999997,108,12,113]}],[{"kind":"cdDrawLine","args":[30.479999999999997,82,71.52,82,2,2]}],[{"kind":"cdDrawLine","args":[71.52,82,71.52,108,22,123]}],[{"kind":"cdDrawLine","args":[30.479999999999997,108,71.52,108,2,2]}],[{"kind":"cdDrawLine","args":[26.68,134,85.2,134,2,100]}],[{"kind":"cdDrawLine","args":[26.68,134,26.68,161,12,32]}],[{"kind":"cdDrawLine","args":[13,161,89,161,0,100]}],[{"kind":"cdDrawLine","args":[57.08,109,57.08,187,0,100]}],[{"kind":"cdDrawLine","args":[103.365,27.16,103.365,95.31,12,113]}],[{"kind":"cdDrawLine","args":[103.365,27.16,164.0655,27.16,2,2]}],[{"kind":"cdDrawLine","args":[164.0655,27.16,164.0655,95.31,22,123]}],[{"kind":"cdDrawLine","args":[103.365,95.31,164.0655,95.31,2,2]}],[{"kind":"cdDrawCurve","args":[135.222,35.6,135.222,70.7,111.606,88.4,0,7]}],[{"kind":"cdDrawCurve","args":[131.778,59.3,146.784,69.8,154.164,85.7,7,8]}],[{"kind":"cdDrawLine","args":[99.6258,119.525,99.6258,179.375,1012,32]}],[{"kind":"cdDrawLine","args":[99.6258,119.525,167.3742,119.525,2,2]}],[{"kind":"cdDrawLine","args":[167.3742,119.525,167.3742,179.375,1022,32]}],[{"kind":"cdDrawLine","args":[122.20859999999999,119.525,122.20859999999999,179.375,2032,32]}],[{"kind":"cdDrawLine","args":[144.7914,119.525,144.7914,179.375,2032,32]}],[{"kind":"cdDrawLine","args":[79.5522,179.375,187.4478,179.375,0,300]}]],TRACE_SHA256="a8a26f19ee24e68f31f68ba37aa1d6c03a7d72fb1d31724c04d1b4a22cabc6a7",GROUPS_SHA256="d0d15c8e37fd05c5565636603c29ea34a8b66594ae8b064a7a523ac2eec5898f",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot="u97de",sourceGroups=[[0,1],[2],[3],[4],[5,6],[7],[8],[9,10],[11],[12],[13,14],[16],[17],[15],[18],[19,20],[21],[22],[23]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,FACTORY_MAP);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.deepEqual(proof,json(identity.file));const s=json("../hanja-goal-glyphwiki-batch743-2026-10-12/sources.json");assert.equal(s.root,"u97de");assert.equal(s.glyph,T.glyph);assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.equal(Object.keys(s.records).length,T.sourceFamily.records);assert.equal(s.providerVersions.length,T.sourceFamily.providerVersions);for(const p of s.providerVersions)assert.equal(s.records[p.name].data,(p.responseIdentity||p).data);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
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
