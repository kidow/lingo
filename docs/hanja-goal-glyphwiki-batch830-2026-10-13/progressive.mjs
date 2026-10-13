export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// Provisional source-only review compiler. Domestic order and browser approval are pending.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'

const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const endpoint = (call) => call.args.slice(call.kind === 'cdDrawLine' ? 2 : call.kind === 'cdDrawCurve' ? 4 : 6, call.kind === 'cdDrawLine' ? 4 : call.kind === 'cdDrawCurve' ? 6 : 8)
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })

function compileBound(trace, proof, profile) {
  const { sourceGroups, ORIGINAL_SOURCE_GROUPS, NON_DRAWING_SOURCE_ROWS, RAW_COUNT, CATALOG_COUNT, ORIGINAL, TRACE_SHA256, GROUPS_SHA256, PINNED_DEFAULTS, ENGINE_REVISION, ENGINE_HASHES, WHOLE_PAYLOAD_SHA256, UP_TAIL_GROUPS, LEFT_TAIL_GROUPS, SINGLE_CARDINAL_TIP_RAW } = profile
  assert.equal(proof.sourceRoot, profile.sourceRoot, 'Exact selected whole header root is required')
  assert.equal(proof.sourceProofFile, profile.sourceProofFile, 'Exact selected whole header file is required')
  assert.equal(proof.sourceProofFileSHA256, profile.sourceProofFileSHA256, 'Verified whole file byte SHA256 header is required')
  assert.equal(proof.sourceArchiveSHA256, profile.SOURCE_ARCHIVE_SHA256, 'Original fixed archive identity is required')
  assert.deepEqual(sourceGroups, ORIGINAL_SOURCE_GROUPS, "Pinned numeric source grouping; no native order approval")
  assert.equal(trace.length, RAW_COUNT)
  assert.equal(proof.groups.length, RAW_COUNT)
  assert.deepEqual(trace,proof.trace,'Selected complete whole trace must match, including empty metadata')
  assert.deepEqual(trace.map(row => row.map(call => ({ kind: call.kind, args: call.args }))), ORIGINAL)
  assert.equal(digest(trace), TRACE_SHA256, 'Every original trajectory and polygon must match the selected whole root')
  assert.equal(digest(proof.groups), GROUPS_SHA256)
  assert.deepEqual(proof.defaults, PINNED_DEFAULTS)
  assert.equal(proof.engineRevision, ENGINE_REVISION)
  assert.deepEqual(proof.engineHashes, ENGINE_HASHES)
  assert.equal(digest({engineRevision:proof.engineRevision,engineHashes:proof.engineHashes,groups:proof.groups,trace,defaults:proof.defaults}),WHOLE_PAYLOAD_SHA256,'The entire selected original body must match')
  const rawIndices = sourceGroups.flat()
  assert.deepEqual([...rawIndices].sort((a, b) => a - b), Array.from({ length: RAW_COUNT }, (_, index) => index).filter(index=>!NON_DRAWING_SOURCE_ROWS.some(row=>row.raw===index)), 'Every drawing raw group must occur exactly once; empty metadata remains in the whole proof')
  for(const row of NON_DRAWING_SOURCE_ROWS){assert.deepEqual(trace[row.raw],[]);assert.deepEqual(proof.groups[row.raw].polygons,[]);assert.deepEqual(proof.groups[row.raw].raw,row.originalRaw)}
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
  assert.equal(outlines.length,CATALOG_COUNT,'Numerical candidate count only; no domestic approval')
  return outlines
}

const deepFreeze = value => { if (value && typeof value === 'object' && !Object.isFrozen(value)) { Object.freeze(value); for (const child of Object.values(value)) deepFreeze(child) } return value }
const PROFILES=deepFreeze({"u7cbb":{"sourceRoot":"u7cbb","sourceProofFile":"engine-whole-u7cbb.json","sourceProofFileSHA256":"8546b3ac8bd9f17e4e3c7f28b6adb4618f24e648f51f7359c7883497d0c90a19","sourceGroups":[[0],[1],[2],[3],[4],[5],[6,11],[7],[8],[9],[10],[12],[13],[14]],"RAW_COUNT":15,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[19.815,26,33.09,46,35.745,67,7,8]}],[{"kind":"cdDrawCurve","args":[82.65,25,76.455,47,64.95,70,0,7]}],[{"kind":"cdDrawLine","args":[13.62,83,90.615,83,0,0]}],[{"kind":"cdDrawLine","args":[52.56,13,52.56,187,0,0]}],[{"kind":"cdDrawCurve","args":[48.135,83,39.285,132,12.735,163,132,7]}],[{"kind":"cdDrawCurve","args":[52.56,94,73.8,106,84.42,121,7,8]}],[{"kind":"cdDrawLine","args":[109,30,109,105,12,32]}],[{"kind":"cdDrawLine","args":[109,30,179,30,2,0]}],[{"kind":"cdDrawLine","args":[109,55,173,55,0,0]}],[{"kind":"cdDrawLine","args":[109,80,174,80,0,0]}],[{"kind":"cdDrawLine","args":[87,105,188,105,0,100]}],[{"kind":"cdDrawLine","args":[109,105,109,169,32,32]}],[{"kind":"cdDrawCurve","args":[88,182,121,170,155,153,0,7]}],[{"kind":"cdDrawCurve","args":[178,120,167,129,146,141,0,7]}],[{"kind":"cdDrawCurve","args":[131,105,149,162,182,180,7,0]}]],"TRACE_SHA256":"a482f37a6d5223ccf89c8201252fc1ba3de38f77182856c60171d452e3e72e9b","GROUPS_SHA256":"b4d8ece04df3fe2fdfac4e3b1a64722d9ac08a5536f254b290836613fcc5cd4c","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"fb17b9554e8d5bdf9019a1df4a622dcac5c62d75f0c068870e2f126deeed6f1e","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[],"ORIGINAL_SOURCE_GROUPS":[[0],[1],[2],[3],[4],[5],[6,11],[7],[8],[9],[10],[12],[13],[14]],"NON_DRAWING_SOURCE_ROWS":[],"CATALOG_COUNT":14,"WHOLE_PAYLOAD_SHA256":"fb17b9554e8d5bdf9019a1df4a622dcac5c62d75f0c068870e2f126deeed6f1e","SOURCE_ARCHIVE_SHA256":"7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62"},"u7cbb-ue0100":{"sourceRoot":"u7cbb-ue0100","sourceProofFile":"engine-whole-u7cbb-ue0100.json","sourceProofFileSHA256":"e41ed526768db8e32ab03b42d6533ddf0814ac01385dd4e180d188a35247b963","sourceGroups":[[0],[1],[2],[3],[4],[5],[6,11],[7],[8],[9],[10],[12],[13],[14]],"RAW_COUNT":15,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[19.815,26,33.09,46,35.745,67,7,8]}],[{"kind":"cdDrawCurve","args":[82.65,25,76.455,47,64.95,70,0,7]}],[{"kind":"cdDrawLine","args":[13.62,83,90.615,83,0,0]}],[{"kind":"cdDrawLine","args":[52.56,13,52.56,187,0,0]}],[{"kind":"cdDrawCurve","args":[48.135,83,39.285,132,12.735,163,132,7]}],[{"kind":"cdDrawCurve","args":[52.56,94,73.8,106,84.42,121,7,8]}],[{"kind":"cdDrawLine","args":[109,30,109,105,12,32]}],[{"kind":"cdDrawLine","args":[109,30,179,30,2,0]}],[{"kind":"cdDrawLine","args":[109,55,173,55,0,0]}],[{"kind":"cdDrawLine","args":[109,80,174,80,0,0]}],[{"kind":"cdDrawLine","args":[87,105,188,105,0,100]}],[{"kind":"cdDrawLine","args":[109,105,109,169,32,32]}],[{"kind":"cdDrawCurve","args":[88,182,121,170,155,153,0,7]}],[{"kind":"cdDrawCurve","args":[178,120,167,129,146,141,0,7]}],[{"kind":"cdDrawCurve","args":[131,105,149,162,182,180,7,0]}]],"TRACE_SHA256":"a482f37a6d5223ccf89c8201252fc1ba3de38f77182856c60171d452e3e72e9b","GROUPS_SHA256":"b4d8ece04df3fe2fdfac4e3b1a64722d9ac08a5536f254b290836613fcc5cd4c","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"fb17b9554e8d5bdf9019a1df4a622dcac5c62d75f0c068870e2f126deeed6f1e","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[],"ORIGINAL_SOURCE_GROUPS":[[0],[1],[2],[3],[4],[5],[6,11],[7],[8],[9],[10],[12],[13],[14]],"NON_DRAWING_SOURCE_ROWS":[],"CATALOG_COUNT":14,"WHOLE_PAYLOAD_SHA256":"fb17b9554e8d5bdf9019a1df4a622dcac5c62d75f0c068870e2f126deeed6f1e","SOURCE_ARCHIVE_SHA256":"7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62"}})
export const sourceRoot="u7cbb"
export const sourceGroups=PROFILES[sourceRoot].sourceGroups
export const sourceProofFile=PROFILES[sourceRoot].sourceProofFile
export const sourceProofFileSHA256=PROFILES[sourceRoot].sourceProofFileSHA256
export const sourceWholeFileSHA256=sourceProofFileSHA256
export const sourcePayloadSHA256=PROFILES[sourceRoot].WHOLE_PAYLOAD_SHA256
export const supportedWholeRoots=Object.freeze(Object.keys(PROFILES))
export const wholeSourceIdentities=deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root,p])=>[root,{root,file:p.sourceProofFile,fileSHA256:p.sourceProofFileSHA256}])))
export const candidateStrokeCounts=deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root,p])=>[root,p.sourceGroups.length])))
export function compileSourceWhole(root,trace,proof,fileIdentity){
  assert(Object.hasOwn(PROFILES,root),'Only captured complete whole roots are supported')
  assert.deepEqual(fileIdentity,wholeSourceIdentities[root],'Explicit root/file/actual byte SHA256 identity is required')
  return compileBound(trace,proof,PROFILES[root])
}
export function compileProgressive(trace,proof,fileIdentity){return compileSourceWhole(sourceRoot,trace,proof,fileIdentity)}
export const approvalStatus="candidate-native-review-pending"
export const nativeApproval=false
export const nativeOrderReviewed=0
export const nativeDirectionsReviewed=0
export const nativeFramesReviewed=0
export const nativeReplaysReviewed=0
export const runtimeApplied=false
