export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// Provisional source-only review compiler. Domestic order and browser approval are pending.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'

const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const endpoint = (call) => call.args.slice(call.kind === 'cdDrawLine' ? 2 : call.kind === 'cdDrawCurve' ? 4 : 6, call.kind === 'cdDrawLine' ? 4 : call.kind === 'cdDrawCurve' ? 6 : 8)
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })

function compileBound(trace, proof, profile) {
  const { RAW_COUNT, ORIGINAL, TRACE_SHA256, GROUPS_SHA256, PINNED_DEFAULTS, ENGINE_REVISION, ENGINE_HASHES, UP_TAIL_GROUPS, LEFT_TAIL_GROUPS, FIFTEEN_TAIL_GROUPS, SINGLE_CARDINAL_TIP_RAW, sourceGroups } = profile
  assert.deepEqual(trace, proof.trace, 'The selected original whole trace is part of the full proof')
  if (proof.sourceRoot !== undefined) assert.equal(proof.sourceRoot, profile.sourceRoot)
  if (proof.sourceProofFile !== undefined) assert.equal(proof.sourceProofFile, profile.sourceProofFile)
  assert.equal(digest({ engineRevision: proof.engineRevision, engineHashes: proof.engineHashes, groups: proof.groups, trace: proof.trace, defaults: proof.defaults }), profile.FULL_PAYLOAD_SHA256)
  const consumedPolygons = new Set()
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
    for (const polygon of polygons) { assert(!consumedPolygons.has(polygon), 'An original polygon cannot be emitted twice'); consumedPolygons.add(polygon) }
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
    return { polygons: [terminal.polygons.at(-1)], directions: ['up'], weights: [jump / 2] }
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
    return { polygons: [terminal.polygons.at(-1)], directions: ['left'], weights: [jump / 2] }
  }
  const terminalFifteen = (indices) => {
    const terminal = trace[indices.at(-1)].at(-1)
    assert.equal(terminal.kind, 'cdDrawBezier')
    const [x1, y1, cx1, cy1, cx2, cy2, x2, y2, ta1, ta2] = terminal.args
    assert(y1 < y2); assert.equal(ta2 % 100, 15); assert.equal(terminal.polygons.length, 3)
    const width = proof.defaults.kMinWidthT, jump = proof.defaults.kWidth * 5
    const expected = [point(x2, y2 - width + 1), point(x2 + 2, y2 - width - jump), point(x2, y2 - width - jump), point(x2 - width, y2 - width + 1)]
    assert.deepEqual(terminal.polygons.at(-1), expected, 'Original terminal15 up-tail formula is identity evidence only')
    const nib = terminal.polygons[1], up = terminal.polygons[2]
    const nibWidth = Math.max(...nib.map(p => p.x)) - Math.min(...nib.map(p => p.x))
    const upHeight = Math.max(...up.map(p => p.y)) - Math.min(...up.map(p => p.y))
    return { polygons: [nib, up], directions: ['right', 'up'], weights: [nibWidth / 2, upHeight / 2] }
  }
  const tails = new Map()
  for (const indices of UP_TAIL_GROUPS) tails.set(JSON.stringify(indices), terminalUpTail(indices))
  for (const indices of LEFT_TAIL_GROUPS) tails.set(JSON.stringify(indices), terminalLeftTail(indices))
  for (const indices of FIFTEEN_TAIL_GROUPS) tails.set(JSON.stringify(indices), terminalFifteen(indices))
  const compile = (indices, tail) => {
    const calls = indices.flatMap(index => trace[index]).map(call => ({ ...call, polygons: [...call.polygons] }))
    if (tail) for (const polygon of [...tail.polygons].reverse()) assert.deepEqual(calls.at(-1).polygons.pop(), polygon)
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
    // The root's native observation identifies one pen; original ink overlaps by 264/25 KAGE units squared.
    // Preserve both original paths, polygons, bounds, widths and weights as separate sequential masks.
    // Their centerline gap remains unchanged; no connector or shared reveal path is authored.
    if (profile.sourceRoot === 'u95d0-ue0103' && indices.length === 2 && indices[0] === 18 && indices[1] === 19) {
      assert.deepEqual(endpoint(trace[18].at(-1)), [68.50999999999999, 160.72])
      assert.deepEqual(trace[19][0].args.slice(0, 2), [63.82, 160.11])
      return [compile([18]), compile([19])]
    }
    const tail = tails.get(JSON.stringify(indices))
    return tail ? [compile(indices, tail), ...tail.polygons.map((polygon, index) => segment([polygon], tail.directions[index], tail.weights[index]))] : [compile(indices)]
  })
  const emittedPolygonCount = outlines.flat().reduce((sum, mask) => sum + (mask.outline.match(/M/g)?.length ?? 0), 0)
  assert.equal(emittedPolygonCount, trace.flatMap(calls => calls.flatMap(call => call.polygons)).length, 'Every original polygon must be emitted in exactly one mask')

  assert.equal(consumedPolygons.size, emittedPolygonCount)
  for (const polygon of trace.flatMap(rows => rows.flatMap(call => call.polygons))) assert(consumedPolygons.has(polygon))

  // Terminal13 original polygons retain their full cardinal bounds; no authored tip.
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
    assert(call.polygons.length >= 1);
    assert.equal(outlines[index].length, 1);
    assert.equal(outlines[index][0].direction, 'down');
    assert.equal(outlines[index][0].revealPath, undefined);
    const points = call.polygons.flat();
    assert.deepEqual(outlines[index][0].bounds, [Math.min(...points.map(p => p.x / 2)), Math.min(...points.map(p => p.y / 2)), Math.max(...points.map(p => p.x / 2)), Math.max(...points.map(p => p.y / 2))]);
  }
  return outlines
}


const deepFreeze = value => { if (value && typeof value === 'object' && !Object.isFrozen(value)) { Object.freeze(value); for (const child of Object.values(value)) deepFreeze(child) } return value }
function validateWholeSourceIdentity(root, proof, identity) {
  assert.deepEqual(identity, wholeSourceIdentities[root], 'Exact frozen whole file and archive identity is required')
  assert.equal(proof.sourceRoot, root)
  assert.equal(proof.sourceProofFile, identity.file)
  assert.equal(proof.sourceProofFileSHA256, identity.fileSHA256)
  assert.equal(proof.sourceArchiveSHA256, identity.archiveSHA256)
}
export function compileProgressive(trace, proof, identity) {
  // Retain the existing default g caller; explicit review callers pin the exact whole identity.
  if (identity !== undefined) validateWholeSourceIdentity(sourceRoot, proof, identity)
  return compileBound(trace, proof, PROFILES[sourceRoot])
}
export function compileSourceWhole(root, trace, proof, identity) {
  assert(Object.hasOwn(PROFILES, root), 'Only captured complete original whole roots are supported')
  validateWholeSourceIdentity(root, proof, identity)
  return compileBound(trace, proof, PROFILES[root])
}
export const wholeSourceIdentities = deepFreeze({"u95d0-ue0103":{"root":"u95d0-ue0103","file":"engine-whole-u95d0-ue0103.json","fileSHA256":"fe951f2ef7ec07326641e14b8dc744073ad9f0a52d2e06069732c2b5e90a7bbb","archiveSHA256":"7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62"},"u95d0-ue0102":{"root":"u95d0-ue0102","file":"engine-whole-u95d0-ue0102.json","fileSHA256":"3bdff97f8d34c921e9f6364f1ae558a318439f356426038273261cc2f6a8aa5d","archiveSHA256":"7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62"},"u95d0-g":{"root":"u95d0-g","file":"engine-whole-u95d0-g.json","fileSHA256":"925544a2c3fd32747dce17062b2bc5656fb86f181a2cb5c67f4debdd02fd3069","archiveSHA256":"7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62"},"u95d0-itaiji-001":{"root":"u95d0-itaiji-001","file":"engine-whole-u95d0-itaiji-001.json","fileSHA256":"5c27aba9190482c7edb60f9581f84163ef603f09ed49730f8a90126c973d101d","archiveSHA256":"7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62"}})
export const nativeApproval = false
export const nativeDirectionsReviewed = 0
export const nativeFramesReviewed = 0
export const nativeReplaysReviewed = 0
export const runtimeApplied = false

const PROFILES = deepFreeze({"u95d0-g":{"sourceRoot":"u95d0-g","sourceProofFile":"engine-whole-u95d0-g.json","sourceProofFileSHA256":"925544a2c3fd32747dce17062b2bc5656fb86f181a2cb5c67f4debdd02fd3069","sourceGroups":[[0],[1,2],[3],[4],[5],[6,7],[8],[9],[10],[11],[12],[13,14],[15],[16],[17],[18],[19],[20]],"RAW_COUNT":21,"ORIGINAL":[[{"kind":"cdDrawLine","args":[29,26,29,186,12,0]}],[{"kind":"cdDrawLine","args":[29,26,83,26,2,2]}],[{"kind":"cdDrawLine","args":[83,26,83,60,22,323]}],[{"kind":"cdDrawLine","args":[29,43,83,43,2,2]}],[{"kind":"cdDrawLine","args":[29,60,83,60,2,2]}],[{"kind":"cdDrawLine","args":[117,26,117,60,12,313]}],[{"kind":"cdDrawLine","args":[117,26,171,26,2,2]}],[{"kind":"cdDrawLine","args":[171,26,171,173,22,1]},{"kind":"cdDrawCurve","args":[171,173,171,183,161,183,1,14]}],[{"kind":"cdDrawLine","args":[117,43,171,43,2,2]}],[{"kind":"cdDrawLine","args":[117,60,171,60,2,2]}],[{"kind":"cdDrawLine","args":[48.875,76.6,146.66500000000002,76.6,0,300]}],[{"kind":"cdDrawLine","args":[99.675,59.8,95.86500000000001,93.4,0,32]}],[{"kind":"cdDrawLine","args":[71.1,93.4,71.1,155,12,32]}],[{"kind":"cdDrawLine","args":[71.1,93.4,124.44,93.4,2,2]}],[{"kind":"cdDrawLine","args":[124.44,93.4,124.44,155.7,22,32]}],[{"kind":"cdDrawLine","args":[71.1,108.8,124.44,108.8,2,2]}],[{"kind":"cdDrawLine","args":[71.1,124.2,124.44,124.2,2,2]}],[{"kind":"cdDrawLine","args":[71.1,139.6,124.44,139.6,2,2]}],[{"kind":"cdDrawLine","args":[43.795,155.7,151.745,155.7,0,100]}],[{"kind":"cdDrawCurve","args":[88.88,163.4,71.1,174.6,46.335,181.6,0,7]}],[{"kind":"cdDrawCurve","args":[104.755,163.4,128.885,167.6,142.22,178.8,7,8]}]],"TRACE_SHA256":"15d24f38c992e849291c4e6e0e8eafbc95bef380e4de7c75cdf1ba7ba88d3470","GROUPS_SHA256":"cefa39f9304c462d63714aeca1c79d1838ee99b76dde71f482fcfda19f0b01a2","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"d677f9c85d8e43f08de183400d4b2134b4daba44bb8f1d21d80dbe7f20970483","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[6,7]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[5]},"u95d0-itaiji-001":{"sourceRoot":"u95d0-itaiji-001","sourceProofFile":"engine-whole-u95d0-itaiji-001.json","sourceProofFileSHA256":"5c27aba9190482c7edb60f9581f84163ef603f09ed49730f8a90126c973d101d","sourceGroups":[[0],[1],[2],[3,4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14,15],[16],[17],[18],[19],[20],[21],[22],[23],[24],[25],[26],[27],[28],[29],[30],[31],[32]],"RAW_COUNT":33,"ORIGINAL":[[{"kind":"cdDrawLine","args":[28.75,24.91,175.05,24.91,0,100]}],[{"kind":"cdDrawLine","args":[104.75,14.23,99.05,35.59,0,32]}],[{"kind":"cdDrawLine","args":[62,35.59,62,74.75,12,32]}],[{"kind":"cdDrawLine","args":[62,35.59,141.8,35.59,2,2]}],[{"kind":"cdDrawLine","args":[141.8,35.59,141.8,75.195,22,32]}],[{"kind":"cdDrawLine","args":[62,45.38,141.8,45.38,2,2]}],[{"kind":"cdDrawLine","args":[62,55.17,141.8,55.17,2,2]}],[{"kind":"cdDrawLine","args":[62,64.96000000000001,141.8,64.96000000000001,2,2]}],[{"kind":"cdDrawLine","args":[21.15,75.195,182.65,75.195,0,200]}],[{"kind":"cdDrawCurve","args":[88.6,80.09,62,87.21,24.95,91.66,0,7]}],[{"kind":"cdDrawCurve","args":[112.35,80.09,148.45,82.76,168.4,89.88,7,8]}],[{"kind":"cdDrawLine","args":[17.625,108.76,95.395,108.76,0,100]}],[{"kind":"cdDrawLine","args":[58.025,96.28,54.995,121.24000000000001,0,32]}],[{"kind":"cdDrawLine","args":[35.3,121.24000000000001,35.3,167,12,32]}],[{"kind":"cdDrawLine","args":[35.3,121.24000000000001,77.72,121.24000000000001,2,2]}],[{"kind":"cdDrawLine","args":[77.72,121.24000000000001,77.72,167.51999999999998,22,32]}],[{"kind":"cdDrawLine","args":[35.3,132.68,77.72,132.68,2,2]}],[{"kind":"cdDrawLine","args":[35.3,144.12,77.72,144.12,2,2]}],[{"kind":"cdDrawLine","args":[35.3,155.56,77.72,155.56,2,2]}],[{"kind":"cdDrawLine","args":[13.585,167.51999999999998,99.435,167.51999999999998,0,300]}],[{"kind":"cdDrawCurve","args":[49.44,173.24,35.3,181.56,15.605,186.76,0,7]}],[{"kind":"cdDrawCurve","args":[62.065,173.24,81.255,176.36,91.86,184.68,7,8]}],[{"kind":"cdDrawLine","args":[109,108.76,183.4,108.76,0,100]}],[{"kind":"cdDrawLine","args":[145,95.24,141.8,120.72,0,32]}],[{"kind":"cdDrawLine","args":[120.2,120.72,120.2,166.48000000000002,12,32]}],[{"kind":"cdDrawLine","args":[123.4,120.72,169.8,120.72,2,2]}],[{"kind":"cdDrawLine","args":[167.4,120.72,167.4,167,22,32]}],[{"kind":"cdDrawLine","args":[120.2,131.64,167.4,131.64,2,2]}],[{"kind":"cdDrawLine","args":[120.2,142.56,167.4,142.56,2,2]}],[{"kind":"cdDrawLine","args":[120.2,153.48000000000002,167.4,153.48000000000002,2,2]}],[{"kind":"cdDrawLine","args":[101.8,167,187.4,167,0,300]}],[{"kind":"cdDrawCurve","args":[138.6,173.24,119.4,181.56,97,186.76,0,7]}],[{"kind":"cdDrawCurve","args":[150.6,173.24,169.8,176.36,182.6,184.68,7,8]}]],"TRACE_SHA256":"7b294add0b28a917ac9e93c39b5b1b41faf58609647b38dcf03c3b5b1472f8c3","GROUPS_SHA256":"047a11fcf038a5d534f94f2f84cc5588cbf6435ffd94b08d89c74341394c16d1","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"3d388b00d5c5c23cfd83daaae8422021c531bed1d91947006650201c325a17ec","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[]},"u95d0-ue0102":{"sourceRoot":"u95d0-ue0102","sourceProofFile":"engine-whole-u95d0-ue0102.json","sourceProofFileSHA256":"3bdff97f8d34c921e9f6364f1ae558a318439f356426038273261cc2f6a8aa5d","sourceGroups":[[0],[1,2],[3],[4],[5],[6,7],[8],[9],[10],[11],[12],[13,14],[15],[16],[17],[18],[19],[20]],"RAW_COUNT":21,"ORIGINAL":[[{"kind":"cdDrawLine","args":[29,26,29,186,12,0]}],[{"kind":"cdDrawLine","args":[29,26,83,26,2,2]}],[{"kind":"cdDrawLine","args":[83,26,83,69,22,223]}],[{"kind":"cdDrawLine","args":[29,47,83,47,2,2]}],[{"kind":"cdDrawLine","args":[29,69,83,69,2,2]}],[{"kind":"cdDrawLine","args":[117,26,117,69,12,213]}],[{"kind":"cdDrawLine","args":[117,26,171,26,2,2]}],[{"kind":"cdDrawLine","args":[171,26,171,172,22,1]},{"kind":"cdDrawCurve","args":[171,172,171,182,161,182,1,14]}],[{"kind":"cdDrawLine","args":[117,47,171,47,2,2]}],[{"kind":"cdDrawLine","args":[117,69,171,69,2,2]}],[{"kind":"cdDrawLine","args":[49.95,88.75,150.05,88.75,0,200]}],[{"kind":"cdDrawLine","args":[100,73.125,100,103.125,0,32]}],[{"kind":"cdDrawLine","args":[69.45,103.125,69.45,146.25,12,313]}],[{"kind":"cdDrawLine","args":[69.45,103.125,130.55,103.125,2,2]}],[{"kind":"cdDrawLine","args":[130.55,103.125,130.55,146.25,22,323]}],[{"kind":"cdDrawLine","args":[69.45,117.5,130.55,117.5,2,2]}],[{"kind":"cdDrawLine","args":[69.45,131.875,130.55,131.875,2,2]}],[{"kind":"cdDrawLine","args":[69.45,146.25,130.55,146.25,2,2]}],[{"kind":"cdDrawLine","args":[43.45,158.75,156.55,158.75,0,100]}],[{"kind":"cdDrawCurve","args":[92.85,166.25,74,176.25,47.35,182.5,0,7]}],[{"kind":"cdDrawCurve","args":[108.45,166.25,133.15,170,146.8,180,7,8]}]],"TRACE_SHA256":"d63073638e2298ec971044946264c208c64ac70aaf47865c19bfee483ff8734c","GROUPS_SHA256":"1bcd01293c0a1dcc14b1ae4ac3f4488573f4a6d8ef5f48b32255c5c7051f01fd","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"27ed057f011e891b0b5e62a849c61bca17b83280a915771e5cdb1fb4c38345d7","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[6,7]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[5,12]},"u95d0-ue0103":{"sourceRoot":"u95d0-ue0103","sourceProofFile":"engine-whole-u95d0-ue0103.json","sourceProofFileSHA256":"fe951f2ef7ec07326641e14b8dc744073ad9f0a52d2e06069732c2b5e90a7bbb","sourceGroups":[[0],[1,2],[3],[4],[5],[6,7],[8],[9],[10],[11],[12],[13,14],[15],[16],[17],[18,19],[20],[21]],"RAW_COUNT":22,"ORIGINAL":[[{"kind":"cdDrawLine","args":[29,26,29,186,12,0]}],[{"kind":"cdDrawLine","args":[29,26,83,26,2,2]}],[{"kind":"cdDrawLine","args":[83,26,83,69,22,223]}],[{"kind":"cdDrawLine","args":[29,47,83,47,2,2]}],[{"kind":"cdDrawLine","args":[29,69,83,69,2,2]}],[{"kind":"cdDrawLine","args":[117,26,117,69,12,313]}],[{"kind":"cdDrawLine","args":[117,26,171,26,2,2]}],[{"kind":"cdDrawLine","args":[171,26,171,172,22,1]},{"kind":"cdDrawCurve","args":[171,172,171,182,161,182,1,14]}],[{"kind":"cdDrawLine","args":[117,47,171,47,2,2]}],[{"kind":"cdDrawLine","args":[117,69,171,69,2,2]}],[{"kind":"cdDrawCurve","args":[133.5,81.42,106.7,86.91,65.16,90.57,0,7]}],[{"kind":"cdDrawLine","args":[65.16,77.15,65.16,90.94,0,1]},{"kind":"cdDrawCurve","args":[65.16,90.94,65.16,100.94,75.16,100.94,1,4001]},{"kind":"cdDrawLine","args":[75.16,100.94,146.9,100.94,4006,5]}],[{"kind":"cdDrawLine","args":[78.3255,113.68900000000001,78.3255,149.8864,1012,313]}],[{"kind":"cdDrawLine","args":[78.3255,113.68900000000001,134.40449999999998,113.68900000000001,2,2]}],[{"kind":"cdDrawLine","args":[134.40449999999998,113.68900000000001,134.40449999999998,149.8864,22,323]}],[{"kind":"cdDrawLine","args":[78.3255,125.4925,134.40449999999998,125.4925,2,2]}],[{"kind":"cdDrawLine","args":[78.3255,137.296,134.40449999999998,137.296,2,2]}],[{"kind":"cdDrawLine","args":[78.3255,149.8864,134.40449999999998,149.8864,2,2]}],[{"kind":"cdDrawLine","args":[55.78,110.09,55.78,151.57,1000,1]},{"kind":"cdDrawCurve","args":[55.78,151.57,57.120000000000005,160.11,68.50999999999999,160.72,1001,7]}],[{"kind":"cdDrawLine","args":[63.82,160.11,158.29000000000002,160.11,2,100]}],[{"kind":"cdDrawCurve","args":[93.3,166.20999999999998,73.87,175.97,46.4,182.07,0,7]}],[{"kind":"cdDrawCurve","args":[110.05,166.20999999999998,135.51,169.87,149.57999999999998,179.63,7,8]}]],"TRACE_SHA256":"d2ced18417fec332648471fe4edc84b7379ac2491a0850d5274a5c4c4768dc0c","GROUPS_SHA256":"7d7ad16ebb172c2bd28558709dbe7c1f3632c02f3a34daaaa9280b5b33ec1b69","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"78fccdebd4a3665e3cf4fd721a7470d1eb0ff0e3e51884a4d3beceaa926c55b1","UP_TAIL_GROUPS":[[11]],"LEFT_TAIL_GROUPS":[[6,7]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[5,12]}})
export const sourceRoot = "u95d0-g"
export const sourceGroups = PROFILES[sourceRoot].sourceGroups
export const sourceProofFile = PROFILES[sourceRoot].sourceProofFile
export const sourceProofFileSHA256 = PROFILES[sourceRoot].sourceProofFileSHA256
export const sourcePayloadSHA256 = PROFILES[sourceRoot].FULL_PAYLOAD_SHA256
export const wholeSourceGroups = deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root, profile]) => [root, profile.sourceGroups])))
export const supportedWholeRoots = Object.freeze(Object.keys(PROFILES))
export const candidateStrokeCounts = deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root,p])=>[root,p.sourceGroups.length])))
