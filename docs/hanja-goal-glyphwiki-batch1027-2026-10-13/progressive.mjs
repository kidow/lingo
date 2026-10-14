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
export function compileProgressive(trace, proof, fileIdentity) { return compileSourceWhole(sourceRoot, trace, proof, fileIdentity) }
export function compileSourceWhole(root, trace, proof, fileIdentity) {
  assert(Object.hasOwn(PROFILES, root), 'Only captured complete original whole roots are supported')
  assert.deepEqual(fileIdentity, wholeSourceIdentities[root], 'Explicit original whole file identity must be selected, including its pinned byte SHA256')
  return compileBound(trace, proof, PROFILES[root])
}
export const nativeApproval = false
export const nativeDirectionsReviewed = 0
export const nativeFramesReviewed = 0
export const nativeReplaysReviewed = 0
export const runtimeApplied = false

const PROFILES = deepFreeze({"u8585":{"sourceRoot":"u8585","sourceProofFile":"engine-whole-u8585.json","sourceProofFileSHA256":"bd2560796015ef1a748818c32ffe7f93eb14e2fe3cde975c99aaa805fc26a04e","sourceGroups":[[0],[1],[2],[3,4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17]],"RAW_COUNT":18,"ORIGINAL":[[{"kind":"cdDrawLine","args":[13,32.81,187,32.81,0,0]}],[{"kind":"cdDrawLine","args":[72,12.27,72,52.56,0,300]}],[{"kind":"cdDrawLine","args":[128,12.27,128,52.56,0,300]}],[{"kind":"cdDrawLine","args":[20.233125,87.19,72.961125,87.19,0,2]}],[{"kind":"cdDrawCurve","args":[72.961125,87.19,63.074625000000005,159.87,15.289875,187.52,22,7]}],[{"kind":"cdDrawLine","args":[50.716499999999996,51.64,29.295749999999998,145.65,0,0]}],[{"kind":"cdDrawCurve","args":[30.9435,132.22,62.25075000000001,140.91,77.904375,162.24,7,8]}],[{"kind":"cdDrawLine","args":[94.47449999999999,60.33,175.579875,60.33,0,100]}],[{"kind":"cdDrawLine","args":[94.47449999999999,60.33,94.47449999999999,88.77000000000001,12,1]},{"kind":"cdDrawCurve","args":[94.47449999999999,88.77000000000001,94.47449999999999,119.58,77.87025,141.7,1,7]}],[{"kind":"cdDrawLine","args":[94.47449999999999,76.92,168.555,76.92,0,100]}],[{"kind":"cdDrawLine","args":[94.47449999999999,92.72,180.05025,92.72,2,100]}],[{"kind":"cdDrawLine","args":[113.63325,92.72,113.63325,128.26999999999998,32,32]}],[{"kind":"cdDrawCurve","args":[97.667625,133.01,120.01950000000001,125.9,142.371375,117.21,0,7]}],[{"kind":"cdDrawCurve","args":[170.47087499999998,99.03999999999999,161.530125,104.57,149.39625,111.68,0,7]}],[{"kind":"cdDrawCurve","args":[134.06925,91.93,144.28725,118.79,181.966125,127.48,7,0]}],[{"kind":"cdDrawLine","args":[81.063375,146.44,184.520625,146.44,0,0]}],[{"kind":"cdDrawLine","args":[154.50525,130.64,154.50525,173.57,0,1]},{"kind":"cdDrawCurve","args":[154.50525,173.57,154.50525,183.57,144.50525,183.57,1,14]}],[{"kind":"cdDrawCurve","args":[102.138,154.34,114.9105,159.87,123.212625,174.09,7,8]}]],"TRACE_SHA256":"cd8f56b7235f637b30ac34f49f3cf505960dad9167f34244152560bd9ef8f9a3","GROUPS_SHA256":"636f5f41aca211512f0237ca155b93ff4a2ce2a37d639c7aebbf9755e670b073","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"0fc8a2878b7ff76541ee89938ce5593c2c1f598568a2b2a21aa81beaee6dabb7","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[16]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[]},"u8585-g":{"sourceRoot":"u8585-g","sourceProofFile":"engine-whole-u8585-g.json","sourceProofFileSHA256":"2e964a86915d325d16c6aa9ba72f61e24864ab4becfaead636c438ac541a0dca","sourceGroups":[[0],[1],[2],[3,4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17]],"RAW_COUNT":18,"ORIGINAL":[[{"kind":"cdDrawLine","args":[13,32.81,187,32.81,0,0]}],[{"kind":"cdDrawLine","args":[72,12.27,72,52.56,0,300]}],[{"kind":"cdDrawLine","args":[128,12.27,128,52.56,0,300]}],[{"kind":"cdDrawLine","args":[17.85,88.8,68.41,88.8,0,2]}],[{"kind":"cdDrawCurve","args":[68.41,88.8,58.93,162.4,13.11,190.4,22,7]}],[{"kind":"cdDrawLine","args":[47.08,52.8,28.12,139.2,0,32]}],[{"kind":"cdDrawCurve","args":[24.96,138.4,56.56,145.6,73.15,164.8,7,8]}],[{"kind":"cdDrawLine","args":[95.555,60.8,179.955,60.8,0,100]}],[{"kind":"cdDrawLine","args":[95.555,60.8,95.555,120,1012,1]},{"kind":"cdDrawCurve","args":[95.555,120,95.555,157.6,66.015,191.2,1001,7]}],[{"kind":"cdDrawLine","args":[103.995,77.6,172.57,77.6,0,100]}],[{"kind":"cdDrawLine","args":[95.555,93.6,182.065,93.6,2,100]}],[{"kind":"cdDrawLine","args":[118.76499999999999,93.6,118.76499999999999,129.6,1032,32]}],[{"kind":"cdDrawCurve","args":[113.49,134.4,128.26,127.2,147.25,118.4,0,7]}],[{"kind":"cdDrawCurve","args":[170.46,100,162.02,105.6,150.415,112.8,0,7]}],[{"kind":"cdDrawCurve","args":[134.59,92.8,145.14,120,179.955,129.6,7,0]}],[{"kind":"cdDrawLine","args":[98.72,148,185.23,148,0,0]}],[{"kind":"cdDrawLine","args":[154.635,132,154.635,175.6,0,1]},{"kind":"cdDrawCurve","args":[154.635,175.6,154.635,185.6,144.635,185.6,1,14]}],[{"kind":"cdDrawCurve","args":[102.94,156,115.6,161.6,124.04,176,7,8]}]],"TRACE_SHA256":"54623b89f125a4fa5df40003cb7430dfd3ce492c2a51ec555c7c5d6a3aac8803","GROUPS_SHA256":"debbe79f932fe95919f6ce23dd0bb3b0cb89d62c47b1791b57684d08b781e20e","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"41e1e3fcaff24c17db425df46798780f26d97fc121d92ddca25e936692f80bdf","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[16]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[]},"u8585-ue0100":{"sourceRoot":"u8585-ue0100","sourceProofFile":"engine-whole-u8585-ue0100.json","sourceProofFileSHA256":"e08339278a7a8aa8c79e209a8fd0ddf854316e429e2671da51c010ee944f09c5","sourceGroups":[[0],[1],[2],[3,4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17]],"RAW_COUNT":18,"ORIGINAL":[[{"kind":"cdDrawLine","args":[13,32.81,187,32.81,0,0]}],[{"kind":"cdDrawLine","args":[72,12.27,72,52.56,0,300]}],[{"kind":"cdDrawLine","args":[128,12.27,128,52.56,0,300]}],[{"kind":"cdDrawLine","args":[20.233125,87.19,72.961125,87.19,0,2]}],[{"kind":"cdDrawCurve","args":[72.961125,87.19,63.074625000000005,159.87,15.289875,187.52,22,7]}],[{"kind":"cdDrawLine","args":[50.716499999999996,51.64,29.295749999999998,145.65,0,0]}],[{"kind":"cdDrawCurve","args":[30.9435,132.22,62.25075000000001,140.91,77.904375,162.24,7,8]}],[{"kind":"cdDrawLine","args":[94.47449999999999,60.33,175.579875,60.33,0,100]}],[{"kind":"cdDrawLine","args":[94.47449999999999,60.33,94.47449999999999,88.77000000000002,12,1]},{"kind":"cdDrawCurve","args":[94.47449999999999,88.77000000000002,94.47449999999999,119.58,77.87025,141.7,1,7]}],[{"kind":"cdDrawLine","args":[94.47449999999999,76.92,168.555,76.92,0,100]}],[{"kind":"cdDrawLine","args":[94.47449999999999,92.72,180.05025,92.72,2,100]}],[{"kind":"cdDrawLine","args":[113.63325,92.72,113.63325,128.26999999999998,32,32]}],[{"kind":"cdDrawCurve","args":[97.667625,133.01,120.01950000000001,125.9,142.371375,117.21,0,7]}],[{"kind":"cdDrawCurve","args":[170.47087499999998,99.04,161.530125,104.57,149.39625,111.68,0,7]}],[{"kind":"cdDrawCurve","args":[134.06925,91.93,144.28725,118.79,181.966125,127.48,7,0]}],[{"kind":"cdDrawLine","args":[81.063375,146.44,184.520625,146.44,0,0]}],[{"kind":"cdDrawLine","args":[154.50525,130.64,154.50525,173.57,0,1]},{"kind":"cdDrawCurve","args":[154.50525,173.57,154.50525,183.57,144.50525,183.57,1,14]}],[{"kind":"cdDrawCurve","args":[102.138,154.34,114.9105,159.87,123.212625,174.09,7,8]}]],"TRACE_SHA256":"81694842ef2e6a3d0063a8b9bfaea37f59a0e72c25976a6b39a7b51925a33198","GROUPS_SHA256":"1e9f9668db9348a8b0afc3e419e560fab6565280c9661f3a292b3e1f9ecb1056","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"4895f072638aa3e52b65c92375d8a3c92a9b498d0b090de5205624369000e265","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[16]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[]},"u8585-ue0101":{"sourceRoot":"u8585-ue0101","sourceProofFile":"engine-whole-u8585-ue0101.json","sourceProofFileSHA256":"e08339278a7a8aa8c79e209a8fd0ddf854316e429e2671da51c010ee944f09c5","sourceGroups":[[0],[1],[2],[3,4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17]],"RAW_COUNT":18,"ORIGINAL":[[{"kind":"cdDrawLine","args":[13,32.81,187,32.81,0,0]}],[{"kind":"cdDrawLine","args":[72,12.27,72,52.56,0,300]}],[{"kind":"cdDrawLine","args":[128,12.27,128,52.56,0,300]}],[{"kind":"cdDrawLine","args":[20.233125,87.19,72.961125,87.19,0,2]}],[{"kind":"cdDrawCurve","args":[72.961125,87.19,63.074625000000005,159.87,15.289875,187.52,22,7]}],[{"kind":"cdDrawLine","args":[50.716499999999996,51.64,29.295749999999998,145.65,0,0]}],[{"kind":"cdDrawCurve","args":[30.9435,132.22,62.25075000000001,140.91,77.904375,162.24,7,8]}],[{"kind":"cdDrawLine","args":[94.47449999999999,60.33,175.579875,60.33,0,100]}],[{"kind":"cdDrawLine","args":[94.47449999999999,60.33,94.47449999999999,88.77000000000002,12,1]},{"kind":"cdDrawCurve","args":[94.47449999999999,88.77000000000002,94.47449999999999,119.58,77.87025,141.7,1,7]}],[{"kind":"cdDrawLine","args":[94.47449999999999,76.92,168.555,76.92,0,100]}],[{"kind":"cdDrawLine","args":[94.47449999999999,92.72,180.05025,92.72,2,100]}],[{"kind":"cdDrawLine","args":[113.63325,92.72,113.63325,128.26999999999998,32,32]}],[{"kind":"cdDrawCurve","args":[97.667625,133.01,120.01950000000001,125.9,142.371375,117.21,0,7]}],[{"kind":"cdDrawCurve","args":[170.47087499999998,99.04,161.530125,104.57,149.39625,111.68,0,7]}],[{"kind":"cdDrawCurve","args":[134.06925,91.93,144.28725,118.79,181.966125,127.48,7,0]}],[{"kind":"cdDrawLine","args":[81.063375,146.44,184.520625,146.44,0,0]}],[{"kind":"cdDrawLine","args":[154.50525,130.64,154.50525,173.57,0,1]},{"kind":"cdDrawCurve","args":[154.50525,173.57,154.50525,183.57,144.50525,183.57,1,14]}],[{"kind":"cdDrawCurve","args":[102.138,154.34,114.9105,159.87,123.212625,174.09,7,8]}]],"TRACE_SHA256":"81694842ef2e6a3d0063a8b9bfaea37f59a0e72c25976a6b39a7b51925a33198","GROUPS_SHA256":"1e9f9668db9348a8b0afc3e419e560fab6565280c9661f3a292b3e1f9ecb1056","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"4895f072638aa3e52b65c92375d8a3c92a9b498d0b090de5205624369000e265","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[16]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[]}})
export const sourceRoot = "u8585"
export const sourceGroups = PROFILES[sourceRoot].sourceGroups
export const sourceProofFile = PROFILES[sourceRoot].sourceProofFile
export const sourceProofFileSHA256 = PROFILES[sourceRoot].sourceProofFileSHA256
export const sourcePayloadSHA256 = PROFILES[sourceRoot].FULL_PAYLOAD_SHA256
export const supportedWholeRoots = Object.freeze(Object.keys(PROFILES))
export const wholeSourceIdentities = deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root,p])=>[root,{root,file:p.sourceProofFile,fileSHA256:p.sourceProofFileSHA256}])))
export const nativeOrderReviewed = 0
export const sourceWholeEligibility = 'unreviewed'
export const candidateStrokeCounts = deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root,p])=>[root,p.sourceGroups.length])))
