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

const PROFILES = deepFreeze({"u5dd8":{"sourceRoot":"u5dd8","sourceProofFile":"engine-whole-u5dd8.json","sourceProofFileSHA256":"13b5f039316a76e6862894677a10033f2caccfc8b24af837f19d336bd6456abc","sourceGroups":[[0],[1,2],[3],[4],[5],[6],[7,8],[9],[10],[11],[12],[13,14],[15],[16],[17,18],[19],[20],[21],[22],[23],[24],[25],[26]],"RAW_COUNT":27,"ORIGINAL":[[{"kind":"cdDrawLine","args":[38.5,21,38.5,147,2000,32]}],[{"kind":"cdDrawLine","args":[18.619999999999997,51,18.619999999999997,147,1000,13]}],[{"kind":"cdDrawLine","args":[18.619999999999997,147,59.8,147,2,2]}],[{"kind":"cdDrawLine","args":[59.8,51,59.8,147,2000,23]}],[{"kind":"cdDrawLine","args":[102.033,13,102.033,46,0,32]}],[{"kind":"cdDrawLine","args":[102.033,28,128.416875,28,2,200]}],[{"kind":"cdDrawLine","args":[78.708125,46,78.708125,111,2012,1]},{"kind":"cdDrawCurve","args":[78.708125,111,78.708125,163,69.9135,185,2001,7]}],[{"kind":"cdDrawLine","args":[78.708125,46,132.623,46,2,2]}],[{"kind":"cdDrawCurve","args":[132.623,46,129.946375,56,126.122625,68,22,7]}],[{"kind":"cdDrawLine","args":[82.531875,72,123.828375,63,0,200]}],[{"kind":"cdDrawLine","args":[99.73875000000001,48,99.73875000000001,75,1000,1]},{"kind":"cdDrawCurve","args":[99.73875000000001,75,99.73875000000001,85,109.73875000000001,85,10001,4001]},{"kind":"cdDrawLine","args":[109.73875000000001,85,130.32875,85,4006,5]}],[{"kind":"cdDrawLine","args":[84.9425,98.95,135.798375,98.95,0,200]}],[{"kind":"cdDrawLine","args":[95.998125,111.85,95.998125,126.9,12,313]}],[{"kind":"cdDrawLine","args":[95.998125,111.85,124.426875,111.85,2,2]}],[{"kind":"cdDrawLine","args":[124.426875,111.85,124.426875,126.9,22,323]}],[{"kind":"cdDrawLine","args":[95.998125,126.9,124.426875,126.9,2,2]}],[{"kind":"cdDrawLine","args":[88.10125,139.8,88.10125,184.95,1012,100]}],[{"kind":"cdDrawLine","args":[88.10125,139.8,132.32375000000002,139.8,2,2]}],[{"kind":"cdDrawLine","args":[132.32375000000002,139.8,132.32375000000002,169.575,3022,1]},{"kind":"cdDrawCurve","args":[132.32375000000002,169.575,132.32375000000002,179.575,126.07375000000002,179.575,3001,614]}],[{"kind":"cdDrawCurve","args":[104.842625,139.8,101.368,157,90.944125,164.525,132,7]}],[{"kind":"cdDrawLine","args":[114.63475,139.8,114.63475,145.925,2032,1]},{"kind":"cdDrawCurve","args":[114.63475,145.925,114.63475,155.925,124.63475,155.925,20001,5001]},{"kind":"cdDrawLine","args":[124.63475,155.925,126.953875,155.925,5006,5]}],[{"kind":"cdDrawLine","args":[95.998125,167.75,124.111,167.75,0,200]}],[{"kind":"cdDrawLine","args":[110.2125,167.75,110.2125,184.95,2032,300]}],[{"kind":"cdDrawLine","args":[137.3046,69,184.9984,69,0,200]}],[{"kind":"cdDrawLine","args":[158.441625,13,158.441625,75,0,1]},{"kind":"cdDrawCurve","args":[158.441625,75,155.73174999999998,159,132.9688,189,1,7]}],[{"kind":"cdDrawCurve","args":[160.06754999999998,60,162.777425,145,183.91445000000002,182,7,0]}],[{"kind":"cdDrawCurve","args":[166.02927499999998,17,175.24285,29,177.95272500000002,49,7,8]}]],"TRACE_SHA256":"aebf02de9ca96d37355899ee989ec5ddfbaf3b96e1952f688402d6b0118eb72f","GROUPS_SHA256":"61c9c14e96fbbb0b5671529fe0f5b05c8da2d76d4703564278f1dc95692ca9b4","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"09bc53d7d48c71ebc966e0400e2c3d31a12477a7b41c87a7019b27a96740e4fa","UP_TAIL_GROUPS":[[10],[20]],"LEFT_TAIL_GROUPS":[[17,18]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[12]},"u5dd8-ue0100":{"sourceRoot":"u5dd8-ue0100","sourceProofFile":"engine-whole-u5dd8-ue0100.json","sourceProofFileSHA256":"ac89a4dbb51a7f8c4d5bb622aaeaa67bc26e91ae9f3cfbe6825bf2717aedbf6e","sourceGroups":[[0],[1,2],[3],[4],[5],[6],[7,8],[9],[10],[11],[12],[13,14],[15],[16],[17,18],[19],[20],[21],[22],[23],[24],[25],[26]],"RAW_COUNT":27,"ORIGINAL":[[{"kind":"cdDrawLine","args":[38.5,21,38.5,147,2000,32]}],[{"kind":"cdDrawLine","args":[18.619999999999997,51,18.619999999999997,147,1000,13]}],[{"kind":"cdDrawLine","args":[18.619999999999997,147,59.8,147,2,2]}],[{"kind":"cdDrawLine","args":[59.8,51,59.8,147,2000,23]}],[{"kind":"cdDrawLine","args":[102.03299999999999,13,102.03299999999999,46,0,32]}],[{"kind":"cdDrawLine","args":[102.03299999999999,28,128.416875,28,2,200]}],[{"kind":"cdDrawLine","args":[78.708125,46,78.708125,111,2012,1]},{"kind":"cdDrawCurve","args":[78.708125,111,78.708125,163,69.9135,185,2001,7]}],[{"kind":"cdDrawLine","args":[78.708125,46,132.623,46,2,2]}],[{"kind":"cdDrawCurve","args":[132.623,46,129.946375,56,126.12262500000001,68,22,7]}],[{"kind":"cdDrawLine","args":[82.531875,72,123.828375,63,0,200]}],[{"kind":"cdDrawLine","args":[99.73875000000002,48,99.73875000000002,75,1000,1]},{"kind":"cdDrawCurve","args":[99.73875000000002,75,99.73875000000002,85,109.73875000000002,85,10001,4001]},{"kind":"cdDrawLine","args":[109.73875000000002,85,130.32875,85,4006,5]}],[{"kind":"cdDrawLine","args":[84.9425,98.95,135.798375,98.95,0,200]}],[{"kind":"cdDrawLine","args":[95.998125,111.85,95.998125,126.9,12,313]}],[{"kind":"cdDrawLine","args":[95.998125,111.85,124.426875,111.85,2,2]}],[{"kind":"cdDrawLine","args":[124.426875,111.85,124.426875,126.9,22,323]}],[{"kind":"cdDrawLine","args":[95.998125,126.9,124.426875,126.9,2,2]}],[{"kind":"cdDrawLine","args":[88.10125,139.8,88.10125,184.95,1012,100]}],[{"kind":"cdDrawLine","args":[88.10125,139.8,132.32375000000002,139.8,2,2]}],[{"kind":"cdDrawLine","args":[132.32375000000002,139.8,132.32375000000002,169.575,3022,1]},{"kind":"cdDrawCurve","args":[132.32375000000002,169.575,132.32375000000002,179.575,126.07375000000002,179.575,3001,614]}],[{"kind":"cdDrawCurve","args":[104.84262500000001,139.8,101.368,157,90.944125,164.525,132,7]}],[{"kind":"cdDrawLine","args":[114.63475,139.8,114.63475,145.925,2032,1]},{"kind":"cdDrawCurve","args":[114.63475,145.925,114.63475,155.925,124.63475,155.925,20001,5001]},{"kind":"cdDrawLine","args":[124.63475,155.925,126.95387499999998,155.925,5006,5]}],[{"kind":"cdDrawLine","args":[95.998125,167.75,124.111,167.75,0,200]}],[{"kind":"cdDrawLine","args":[110.2125,167.75,110.2125,184.95,2032,300]}],[{"kind":"cdDrawLine","args":[137.3046,69,184.9984,69,0,200]}],[{"kind":"cdDrawLine","args":[158.441625,13,158.441625,75,0,1]},{"kind":"cdDrawCurve","args":[158.441625,75,155.73174999999998,159,132.9688,189,1,7]}],[{"kind":"cdDrawCurve","args":[160.06754999999998,60,162.777425,145,183.91445000000004,182,7,0]}],[{"kind":"cdDrawCurve","args":[166.02927499999998,17,175.24285,29,177.95272500000002,49,7,8]}]],"TRACE_SHA256":"215461895d297ac06739a0eca473baf08343b6fff09c8a4f81a6494ceb688597","GROUPS_SHA256":"774ced6ca9439117893a5d09a46fa21d6042f0d1b034eeeef7f6939e26be7833","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"e31c90470a98f6b60f025c2a1ef31a1f5c9f0fd1baaec7205dfc72cf133a90be","UP_TAIL_GROUPS":[[10],[20]],"LEFT_TAIL_GROUPS":[[17,18]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[12]}})
export const sourceRoot = "u5dd8"
export const sourceGroups = PROFILES[sourceRoot].sourceGroups
export const sourceProofFile = PROFILES[sourceRoot].sourceProofFile
export const sourceProofFileSHA256 = PROFILES[sourceRoot].sourceProofFileSHA256
export const sourcePayloadSHA256 = PROFILES[sourceRoot].FULL_PAYLOAD_SHA256
export const supportedWholeRoots = Object.freeze(Object.keys(PROFILES))
export const wholeSourceIdentities = deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root,p])=>[root,{root,file:p.sourceProofFile,fileSHA256:p.sourceProofFileSHA256}])))
export const nativeOrderReviewed = 0
export const sourceWholeEligibility = 'unreviewed'
export const candidateStrokeCounts = deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root,p])=>[root,p.sourceGroups.length])))
