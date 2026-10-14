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

const PROFILES = deepFreeze({"u8669":{"sourceRoot":"u8669","sourceProofFile":"engine-whole-u8669.json","sourceProofFileSHA256":"e274549526f4c0899ff1e46234760891b0775f511cf30271d89d2a2b7d78cade","sourceGroups":[[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11],[12],[13],[14,15],[16],[17],[18],[19]],"RAW_COUNT":20,"ORIGINAL":[[{"kind":"cdDrawLine","args":[51,14,51,75,0,32]}],[{"kind":"cdDrawCurve","args":[38.4,27,30.75,49,15.45,68,0,7]}],[{"kind":"cdDrawCurve","args":[59.55,27,74.85,41,84.75,63,7,8]}],[{"kind":"cdDrawLine","args":[25.241999999999997,76.004,25.241999999999997,121.75099999999999,12,213]}],[{"kind":"cdDrawLine","args":[25.241999999999997,76.004,76.758,76.004,2,2]}],[{"kind":"cdDrawLine","args":[76.758,76.004,76.758,121.75099999999999,22,223]}],[{"kind":"cdDrawLine","args":[25.241999999999997,98.20474999999999,76.758,98.20474999999999,2,2]}],[{"kind":"cdDrawLine","args":[25.241999999999997,121.75099999999999,76.758,121.75099999999999,2,2]}],[{"kind":"cdDrawLine","args":[51,122,51,172,32,1]},{"kind":"cdDrawCurve","args":[51,172,51,182,41,182,1,314]}],[{"kind":"cdDrawCurve","args":[37.05,140,26.7,161,11.85,174,0,7]}],[{"kind":"cdDrawCurve","args":[61.35,139,74.85,149,87.45,171,7,8]}],[{"kind":"cdDrawLine","args":[136.36,13,136.36,51,0,32]}],[{"kind":"cdDrawLine","args":[136.36,30,173.275,30,2,100]}],[{"kind":"cdDrawLine","args":[103.725,51,103.725,116,12,1]},{"kind":"cdDrawCurve","args":[103.725,116,103.725,164,91.42,185,1,7]}],[{"kind":"cdDrawLine","args":[103.725,51,179.16,51,2,2]}],[{"kind":"cdDrawCurve","args":[179.16,51,175.41500000000002,62,170.065,75,22,7]}],[{"kind":"cdDrawLine","args":[109.075,82,166.85500000000002,72,0,0]}],[{"kind":"cdDrawLine","args":[133.15,56,133.15,91,0,1]},{"kind":"cdDrawCurve","args":[133.15,91,133.15,101,143.15,101,1,1]},{"kind":"cdDrawLine","args":[143.15,101,175.95,101,6,5]}],[{"kind":"cdDrawLine","args":[130.475,115,130.475,129,1000,1]},{"kind":"cdDrawCurve","args":[130.475,129,130.475,171,103.19,183,1001,7]}],[{"kind":"cdDrawLine","args":[152.41,115,152.41,162,1000,1]},{"kind":"cdDrawCurve","args":[152.41,162,152.41,172,162.41,172,10001,1]},{"kind":"cdDrawLine","args":[162.41,172,181.83499999999998,172,6,5]}]],"TRACE_SHA256":"6c4bd0040f628d7d13d44307564485ae89a90393d292a2b9d51afabff099dc01","GROUPS_SHA256":"100536c290073debbb3afc8b2fc9e6adf7f525ab2fe0c489ff4c8e12a94bd143","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"6bf5aa4d0a1905ef3d023b8c7dc82c428b8929abdfea0d95c71e6efa049f819b","UP_TAIL_GROUPS":[[17],[19]],"LEFT_TAIL_GROUPS":[[8]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[3]},"u8669-ue0100":{"sourceRoot":"u8669-ue0100","sourceProofFile":"engine-whole-u8669-ue0100.json","sourceProofFileSHA256":"d1b60d4e077ae7bd8a967bc544085f564e8b6b8859b8891805ecc1f68ce7c92b","sourceGroups":[[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11],[12],[13],[14,15],[16],[17],[18],[19]],"RAW_COUNT":20,"ORIGINAL":[[{"kind":"cdDrawLine","args":[51,14,51,75,0,32]}],[{"kind":"cdDrawCurve","args":[38.4,27,30.75,49,15.45,68,0,7]}],[{"kind":"cdDrawCurve","args":[59.55,27,74.85,41,84.75,63,7,8]}],[{"kind":"cdDrawLine","args":[25.241999999999997,76.004,25.241999999999997,121.75099999999999,12,213]}],[{"kind":"cdDrawLine","args":[25.241999999999997,76.004,76.758,76.004,2,2]}],[{"kind":"cdDrawLine","args":[76.758,76.004,76.758,121.75099999999999,22,223]}],[{"kind":"cdDrawLine","args":[25.241999999999997,98.20474999999999,76.758,98.20474999999999,2,2]}],[{"kind":"cdDrawLine","args":[25.241999999999997,121.75099999999999,76.758,121.75099999999999,2,2]}],[{"kind":"cdDrawLine","args":[51,122,51,172,32,1]},{"kind":"cdDrawCurve","args":[51,172,51,182,41,182,1,314]}],[{"kind":"cdDrawCurve","args":[37.05,140,26.7,161,11.85,174,0,7]}],[{"kind":"cdDrawCurve","args":[61.35,139,74.85,149,87.45,171,7,8]}],[{"kind":"cdDrawLine","args":[136.36,13,136.36,51,0,32]}],[{"kind":"cdDrawLine","args":[136.36,30,173.275,30,2,100]}],[{"kind":"cdDrawLine","args":[103.725,51,103.725,116,12,1]},{"kind":"cdDrawCurve","args":[103.725,116,103.725,164,91.42,185,1,7]}],[{"kind":"cdDrawLine","args":[103.725,51,179.16,51,2,2]}],[{"kind":"cdDrawCurve","args":[179.16,51,175.41500000000005,62,170.065,75,22,7]}],[{"kind":"cdDrawLine","args":[109.075,82,166.855,72,0,0]}],[{"kind":"cdDrawLine","args":[133.15,56,133.15,91,0,1]},{"kind":"cdDrawCurve","args":[133.15,91,133.15,101,143.15,101,1,1]},{"kind":"cdDrawLine","args":[143.15,101,175.95,101,6,5]}],[{"kind":"cdDrawLine","args":[130.475,115,130.475,129,1000,1]},{"kind":"cdDrawCurve","args":[130.475,129,130.475,171,103.19,183,1001,7]}],[{"kind":"cdDrawLine","args":[152.41,115,152.41,162,1000,1]},{"kind":"cdDrawCurve","args":[152.41,162,152.41,172,162.41,172,10001,1]},{"kind":"cdDrawLine","args":[162.41,172,181.83499999999995,172,6,5]}]],"TRACE_SHA256":"4c10e6a48a14f947e91e01eb6b50376a9644fb68aa773dd566f1c0fd4108529a","GROUPS_SHA256":"15a987a1c129f381dedde059206ef4b9a43e3120da85ec78dd853589c6838c88","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"cf09964e05c76cdcd1e22a263cb1d347cf393953bf8c7dcd43ba59ff7f448e41","UP_TAIL_GROUPS":[[17],[19]],"LEFT_TAIL_GROUPS":[[8]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[3]},"u8669-var-001":{"sourceRoot":"u8669-var-001","sourceProofFile":"engine-whole-u8669-var-001.json","sourceProofFileSHA256":"89e20bc18c798ff85d8263c3f35c8fcdd244e212a7a78a658ce96c7a80bf1f50","sourceGroups":[[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11],[12],[13],[14,15],[16],[17],[18],[19]],"RAW_COUNT":20,"ORIGINAL":[[{"kind":"cdDrawLine","args":[53,14,53,75,0,32]}],[{"kind":"cdDrawCurve","args":[39.84,27,31.85,49,15.87,68,0,7]}],[{"kind":"cdDrawCurve","args":[61.93,27,77.91,41,88.25,63,7,8]}],[{"kind":"cdDrawLine","args":[26.097199999999997,76.004,26.097199999999997,121.75099999999999,12,213]}],[{"kind":"cdDrawLine","args":[26.097199999999997,76.004,79.90280000000001,76.004,2,2]}],[{"kind":"cdDrawLine","args":[79.90280000000001,76.004,79.90280000000001,121.75099999999999,1022,223]}],[{"kind":"cdDrawLine","args":[26.097199999999997,98.20474999999999,79.90280000000001,98.20474999999999,2,2]}],[{"kind":"cdDrawLine","args":[26.097199999999997,121.75099999999999,79.90280000000001,121.75099999999999,2,2]}],[{"kind":"cdDrawLine","args":[53,126,53,172,0,1]},{"kind":"cdDrawCurve","args":[53,172,53,182,43,182,1,314]}],[{"kind":"cdDrawCurve","args":[38.43,140,27.62,161,12.11,174,0,7]}],[{"kind":"cdDrawCurve","args":[63.81,139,77.91,149,91.07,171,7,8]}],[{"kind":"cdDrawLine","args":[137.74,13.26,137.74,49.98,0,32]}],[{"kind":"cdDrawLine","args":[137.74,29.58,174.28,29.58,2,100]}],[{"kind":"cdDrawLine","args":[103.52,49.98,103.52,113.22,1012,1]},{"kind":"cdDrawCurve","args":[103.52,113.22,103.52,166.26,86.12,188.7,1001,7]}],[{"kind":"cdDrawLine","args":[103.52,49.98,180.66,49.98,2,2]}],[{"kind":"cdDrawCurve","args":[180.66,49.98,176.6,60.18,171.38,72.42,22,7]}],[{"kind":"cdDrawLine","args":[108.74,82.62,168.48000000000002,71.4,0,0]}],[{"kind":"cdDrawLine","args":[137.74,56.1,137.74,95.06,0,1]},{"kind":"cdDrawCurve","args":[137.74,95.06,137.74,105.06,147.74,105.06,1,1]},{"kind":"cdDrawLine","args":[147.74,105.06,177.18,105.06,6,5]}],[{"kind":"cdDrawLine","args":[130.2,117.3,130.2,131.58,1000,1]},{"kind":"cdDrawCurve","args":[130.2,131.58,130.2,174.42,102.94,186.66,1001,7]}],[{"kind":"cdDrawLine","args":[152.82,117.3,152.82,165.44,1000,1]},{"kind":"cdDrawCurve","args":[152.82,165.44,152.82,175.44,162.82,175.44,10001,1]},{"kind":"cdDrawLine","args":[162.82,175.44,182.98000000000002,175.44,6,5]}]],"TRACE_SHA256":"f331861daaa13b496ff91491bee6929c3af67a40d1d30c98d496a3c403643439","GROUPS_SHA256":"d3540fca8ef393f32fca287d0fe3c99d83d489d406f71d33e9d2e78a6e9c5c0e","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"7d5dc6b08739e219eebca665f95bbf43a18f6173c48bcf3e5880c3345aac40ce","UP_TAIL_GROUPS":[[17],[19]],"LEFT_TAIL_GROUPS":[[8]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[3]}})
export const sourceRoot = "u8669"
export const sourceGroups = PROFILES[sourceRoot].sourceGroups
export const sourceProofFile = PROFILES[sourceRoot].sourceProofFile
export const sourceProofFileSHA256 = PROFILES[sourceRoot].sourceProofFileSHA256
export const sourcePayloadSHA256 = PROFILES[sourceRoot].FULL_PAYLOAD_SHA256
export const supportedWholeRoots = Object.freeze(Object.keys(PROFILES))
export const wholeSourceIdentities = deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root,p])=>[root,{root,file:p.sourceProofFile,fileSHA256:p.sourceProofFileSHA256}])))
export const nativeOrderReviewed = 0
export const sourceWholeEligibility = 'unreviewed'
export const candidateStrokeCounts = deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root,p])=>[root,p.sourceGroups.length])))
