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

const PROFILES = deepFreeze({"u63e5":{"sourceRoot":"u63e5","sourceProofFile":"engine-whole-u63e5.json","sourceProofFileSHA256":"c409428d268f1f0f60f00b9b4dc2d8f24c6f1692e24e03820f936dfa89cb6550","sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11,12],[13]],"RAW_COUNT":14,"ORIGINAL":[[{"kind":"cdDrawLine","args":[15.07,55,76.84,55,0,0]}],[{"kind":"cdDrawLine","args":[45.6,15,45.6,171,0,1]},{"kind":"cdDrawCurve","args":[45.6,171,45.6,181,35.6,181,1,314]}],[{"kind":"cdDrawCurve","args":[15.78,122,47.73,107,76.84,91,0,7]}],[{"kind":"cdDrawLine","args":[130.5,13,130.5,42,0,32]}],[{"kind":"cdDrawLine","args":[79.8,42,181.2,42,0,0]}],[{"kind":"cdDrawCurve","args":[96.375,46,108.075,57,114.9,78,7,8]}],[{"kind":"cdDrawCurve","args":[158.775,47,150.975,64,139.275,84,0,7]}],[{"kind":"cdDrawCurve","args":[86.77125000000001,73.64,87.405,98.245,77.265,106.225,7,8]}],[{"kind":"cdDrawLine","args":[87.405,83.615,178.665,83.615,0,2]}],[{"kind":"cdDrawCurve","args":[178.665,83.615,174.8625,91.595,165.99,104.89500000000002,22,7]}],[{"kind":"cdDrawLine","args":[95.4,114,95.4,170,12,0]}],[{"kind":"cdDrawLine","args":[95.4,114,165.6,114,2,2]}],[{"kind":"cdDrawLine","args":[165.6,114,165.6,157,22,1]},{"kind":"cdDrawCurve","args":[165.6,157,165.6,167,155.6,167,1,514]}],[{"kind":"cdDrawLine","args":[130.5,91,130.5,186,0,0]}]],"TRACE_SHA256":"d25913ebb6832721360943b5d4beac62690e3c0db866fa35de8de5eb0ca4a030","GROUPS_SHA256":"1cba83cb921112417356a55fd314de7255aa73f63261b52a1bdcda656b8a989a","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"0636305d5ab60ae739794bf2b9a58a9147e05bdae8f2f568fca28c81e9899ec5","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[1],[11,12]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[]},"u63e5-ue0100":{"sourceRoot":"u63e5-ue0100","sourceProofFile":"engine-whole-u63e5-ue0100.json","sourceProofFileSHA256":"fae546a06d09205befbea94c7a4fabb93e8c177927e8f910603ecb7531e7fd8b","sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11,12],[13]],"RAW_COUNT":14,"ORIGINAL":[[{"kind":"cdDrawLine","args":[15.07,55,76.84,55,0,0]}],[{"kind":"cdDrawLine","args":[45.6,15,45.6,171,0,1]},{"kind":"cdDrawCurve","args":[45.6,171,45.6,181,35.6,181,1,314]}],[{"kind":"cdDrawCurve","args":[15.78,122,47.73,107,76.84,91,0,7]}],[{"kind":"cdDrawLine","args":[130.5,13,130.5,42,0,32]}],[{"kind":"cdDrawLine","args":[79.8,42,181.2,42,0,0]}],[{"kind":"cdDrawCurve","args":[96.375,46,108.075,57,114.9,78,7,8]}],[{"kind":"cdDrawCurve","args":[158.775,47,150.975,64,139.275,84,0,7]}],[{"kind":"cdDrawCurve","args":[86.77125,73.64,87.405,98.245,77.265,106.225,7,8]}],[{"kind":"cdDrawLine","args":[87.405,83.615,178.665,83.615,0,2]}],[{"kind":"cdDrawCurve","args":[178.665,83.615,174.8625,91.595,165.99,104.89500000000002,22,7]}],[{"kind":"cdDrawLine","args":[95.4,114,95.4,170,12,0]}],[{"kind":"cdDrawLine","args":[95.4,114,165.6,114,2,2]}],[{"kind":"cdDrawLine","args":[165.6,114,165.6,157,22,1]},{"kind":"cdDrawCurve","args":[165.6,157,165.6,167,155.6,167,1,514]}],[{"kind":"cdDrawLine","args":[130.5,91,130.5,186,0,0]}]],"TRACE_SHA256":"646ec9e4ab57b2a522d1372978aac61b2d7af086ea5eab69d8993c19524a3fb3","GROUPS_SHA256":"c1d968a7258912f399902f4379e31572a0bddd2890581c5a4b7e84f27c1da4d2","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"15672a8ac445e165ee580b350f29b122e89d8d01b508e01504f934e576cf102e","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[1],[11,12]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[]},"u63e5-ue0101":{"sourceRoot":"u63e5-ue0101","sourceProofFile":"engine-whole-u63e5-ue0101.json","sourceProofFileSHA256":"fae546a06d09205befbea94c7a4fabb93e8c177927e8f910603ecb7531e7fd8b","sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11,12],[13]],"RAW_COUNT":14,"ORIGINAL":[[{"kind":"cdDrawLine","args":[15.07,55,76.84,55,0,0]}],[{"kind":"cdDrawLine","args":[45.6,15,45.6,171,0,1]},{"kind":"cdDrawCurve","args":[45.6,171,45.6,181,35.6,181,1,314]}],[{"kind":"cdDrawCurve","args":[15.78,122,47.73,107,76.84,91,0,7]}],[{"kind":"cdDrawLine","args":[130.5,13,130.5,42,0,32]}],[{"kind":"cdDrawLine","args":[79.8,42,181.2,42,0,0]}],[{"kind":"cdDrawCurve","args":[96.375,46,108.075,57,114.9,78,7,8]}],[{"kind":"cdDrawCurve","args":[158.775,47,150.975,64,139.275,84,0,7]}],[{"kind":"cdDrawCurve","args":[86.77125,73.64,87.405,98.245,77.265,106.225,7,8]}],[{"kind":"cdDrawLine","args":[87.405,83.615,178.665,83.615,0,2]}],[{"kind":"cdDrawCurve","args":[178.665,83.615,174.8625,91.595,165.99,104.89500000000002,22,7]}],[{"kind":"cdDrawLine","args":[95.4,114,95.4,170,12,0]}],[{"kind":"cdDrawLine","args":[95.4,114,165.6,114,2,2]}],[{"kind":"cdDrawLine","args":[165.6,114,165.6,157,22,1]},{"kind":"cdDrawCurve","args":[165.6,157,165.6,167,155.6,167,1,514]}],[{"kind":"cdDrawLine","args":[130.5,91,130.5,186,0,0]}]],"TRACE_SHA256":"646ec9e4ab57b2a522d1372978aac61b2d7af086ea5eab69d8993c19524a3fb3","GROUPS_SHA256":"c1d968a7258912f399902f4379e31572a0bddd2890581c5a4b7e84f27c1da4d2","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"15672a8ac445e165ee580b350f29b122e89d8d01b508e01504f934e576cf102e","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[1],[11,12]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[]},"u63e5-ue0102":{"sourceRoot":"u63e5-ue0102","sourceProofFile":"engine-whole-u63e5-ue0102.json","sourceProofFileSHA256":"88189668aceb647ee175e1c423e14a7ddbc0acc6b07a5a4672818df6b4c585f2","sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11,12],[13]],"RAW_COUNT":14,"ORIGINAL":[[{"kind":"cdDrawLine","args":[16.795,56,72.04,56,0,100]}],[{"kind":"cdDrawLine","args":[44.1,16,44.1,172,0,1]},{"kind":"cdDrawCurve","args":[44.1,172,44.1,182,34.1,182,1,314]}],[{"kind":"cdDrawCurve","args":[17.43,123,46.005,108,72.04,92,0,7]}],[{"kind":"cdDrawLine","args":[91.75,25,161.25,25,0,0]}],[{"kind":"cdDrawLine","args":[74.375,46,178.625,46,0,0]}],[{"kind":"cdDrawCurve","args":[95.225,50,104.955,61,109.82,81,7,8]}],[{"kind":"cdDrawCurve","args":[152.91,51,146.655,67,136.925,87,0,7]}],[{"kind":"cdDrawCurve","args":[78.545,73.24,79.24,106.17,68.12,116.85,7,8]}],[{"kind":"cdDrawLine","args":[79.24,86.59,179.32,86.59,0,2]}],[{"kind":"cdDrawCurve","args":[179.32,86.59,175.15,97.27000000000002,165.42,115.07,22,7]}],[{"kind":"cdDrawLine","args":[91.75,116,91.75,170,12,0]}],[{"kind":"cdDrawLine","args":[91.75,116,161.25,116,2,2]}],[{"kind":"cdDrawLine","args":[161.25,116,161.25,157,22,1]},{"kind":"cdDrawCurve","args":[161.25,157,161.25,167,151.25,167,1,514]}],[{"kind":"cdDrawLine","args":[126.5,94,126.5,186,0,0]}]],"TRACE_SHA256":"08499a46b7b3dad8d0da1f6dca66099f8428988bb1b586080bfbf93afb01eec4","GROUPS_SHA256":"62ac269c48a2ba58fa8f8820c553d617c8679455cf42e8bec58ef77eed4b3fe4","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"e9113b73abf143d9d64ca2c69563b0797391cf58962c9c53b826407a57d57a8b","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[1],[11,12]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[]}})
export const sourceRoot = "u63e5"
export const sourceGroups = PROFILES[sourceRoot].sourceGroups
export const sourceProofFile = PROFILES[sourceRoot].sourceProofFile
export const sourceProofFileSHA256 = PROFILES[sourceRoot].sourceProofFileSHA256
export const sourcePayloadSHA256 = PROFILES[sourceRoot].FULL_PAYLOAD_SHA256
export const supportedWholeRoots = Object.freeze(Object.keys(PROFILES))
export const wholeSourceIdentities = deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root,p])=>[root,{root,file:p.sourceProofFile,fileSHA256:p.sourceProofFileSHA256}])))
export const nativeOrderReviewed = 0
export const sourceWholeEligibility = 'unreviewed'
export const candidateStrokeCounts = deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root,p])=>[root,p.sourceGroups.length])))
