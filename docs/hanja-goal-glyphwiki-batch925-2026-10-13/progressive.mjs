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

const PROFILES = deepFreeze({"u9046-g":{"sourceRoot":"u9046-g","sourceProofFile":"engine-whole-u9046-g.json","sourceProofFileSHA256":"422f0241f3258bae0ede99f352491a433ac76644a43755893de16653c3aa39c9","sourceGroups":[[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10,11],[12],[13,14],[15]],"RAW_COUNT":16,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[23,25,45,37,56,56,7,8]}],[{"kind":"cdDrawLine","args":[14,93,50,93,0,2]}],[{"kind":"cdDrawLine","args":[50,93,50,155,22,300]}],[{"kind":"cdDrawCurve","args":[16,179,35,166,55,151,0,7]}],[{"kind":"cdDrawBezier","args":[53,149,68,172,84,181,178,177,7,0]}],[{"kind":"cdDrawCurve","args":[111.71000000000001,12.44,120.88,18.53,126.775,29.84,7,8]}],[{"kind":"cdDrawLine","args":[74.375,38.54,172.625,38.54,0,0]}],[{"kind":"cdDrawCurve","args":[94.025,43.76,103.195,52.46,107.78,68.12,7,8]}],[{"kind":"cdDrawCurve","args":[148.39,44.63,142.495,58.55,133.325,75.08,0,7]}],[{"kind":"cdDrawCurve","args":[78.305,63.6308,78.96000000000001,91.47515,68.48,100.50574999999999,7,8]}],[{"kind":"cdDrawLine","args":[78.96000000000001,74.91905,173.28,74.91905,0,2]}],[{"kind":"cdDrawCurve","args":[173.28,74.91905,169.35,83.94965,160.18,99.00065000000001,22,7]}],[{"kind":"cdDrawLine","args":[90.75,101.18,90.75,149.9,12,100]}],[{"kind":"cdDrawLine","args":[90.75,101.18,156.25,101.18,2,2]}],[{"kind":"cdDrawLine","args":[156.25,101.18,156.25,137.29,22,1]},{"kind":"cdDrawCurve","args":[156.25,137.29,156.25,147.29,146.25,147.29,1,514]}],[{"kind":"cdDrawLine","args":[123.5,81.17,123.5,163.82,0,0]}]],"TRACE_SHA256":"8def32a8dd0d57dbc6acba2a4c38b24e60afcbc6066880f319c593e06822ba77","GROUPS_SHA256":"76d9a183fcb81694941ecb89f426abb506d0eaeb9cba3b286e70f4bedc8eeef2","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"5aa49c5e1937457cd35f551ebea938da692c9fb0f778de77bf745e15f9b0bf77","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[13,14]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[]},"u9046-t":{"sourceRoot":"u9046-t","sourceProofFile":"engine-whole-u9046-t.json","sourceProofFileSHA256":"ab1d448b10d9b196b9bedb65a97e219d59b2fefd954c107267dba397e9d9fde1","sourceGroups":[[0],[1,2,3,4],[5],[6],[7],[8],[9],[10],[11],[12,13],[14],[15,16],[17]],"RAW_COUNT":18,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[23.56,21.1,42.18,33.32,48.06,47.42,7,1]}],[{"kind":"cdDrawLine","args":[13.76,70.92,52.96,70.92,0,2]}],[{"kind":"cdDrawLine","args":[52.96,70.92,26.5,109.46,22,313]}],[{"kind":"cdDrawLine","args":[26.5,109.46,58.84,109.46,2,2]}],[{"kind":"cdDrawCurve","args":[58.84,109.46,52.96,140.48,31.4,161.16,22,7]}],[{"kind":"cdDrawCurve","args":[12.78,171.5,29.44,160.22,42.18,149.88,0,7]}],[{"kind":"cdDrawBezier","args":[37.28,152.7,55.9,178.08,111.76,179.96,176.44,177.14,7,0]}],[{"kind":"cdDrawCurve","args":[111.71000000000001,12.44,120.88,18.53,126.775,29.84,7,8]}],[{"kind":"cdDrawLine","args":[74.375,38.54,172.625,38.54,0,0]}],[{"kind":"cdDrawCurve","args":[94.025,43.76,103.195,52.46,107.78,68.12,7,8]}],[{"kind":"cdDrawCurve","args":[148.39,44.63,142.495,58.55,133.325,75.08,0,7]}],[{"kind":"cdDrawCurve","args":[78.305,63.6308,78.96000000000001,91.47515,68.48,100.50574999999999,7,8]}],[{"kind":"cdDrawLine","args":[78.96000000000001,74.91905,173.28,74.91905,0,2]}],[{"kind":"cdDrawCurve","args":[173.28,74.91905,169.35,83.94965,160.18,99.00065000000001,22,7]}],[{"kind":"cdDrawLine","args":[90.75,101.18,90.75,149.9,12,100]}],[{"kind":"cdDrawLine","args":[90.75,101.18,156.25,101.18,2,2]}],[{"kind":"cdDrawLine","args":[156.25,101.18,156.25,137.29,22,1]},{"kind":"cdDrawCurve","args":[156.25,137.29,156.25,147.29,146.25,147.29,1,514]}],[{"kind":"cdDrawLine","args":[123.5,81.17,123.5,163.82,0,0]}]],"TRACE_SHA256":"b899fbf861a8f7718609725516784acec7c411a7a2ef0e7e6189ecda8fed8f76","GROUPS_SHA256":"bbdb13b273f7886f6580c84275a2d7893ac46b3bf42bcb6a93f95d6a584fb514","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"b3b5ca4e2c3e27bfa1b7e4f285f3f78ad745558b65b9a4c7ce76a825d957a229","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[15,16]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[]},"u9046-var-001":{"sourceRoot":"u9046-var-001","sourceProofFile":"engine-whole-u9046-var-001.json","sourceProofFileSHA256":"1ec1cf99c0b07bff2ce0dbfaa53e20eff3cf3a6d04d27d265324c6f33fe12168","sourceGroups":[[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10,11],[12],[13,14],[15]],"RAW_COUNT":16,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[23,25,45,37,56,56,7,8]}],[{"kind":"cdDrawLine","args":[14,93,50,93,0,2]}],[{"kind":"cdDrawLine","args":[50,93,50,155,22,300]}],[{"kind":"cdDrawCurve","args":[16,179,35,166,55,151,0,7]}],[{"kind":"cdDrawBezier","args":[53,149,68,172,84,181,178,177,7,0]}],[{"kind":"cdDrawLine","args":[125.5,15.31,125.5,40.54,0,32]}],[{"kind":"cdDrawLine","args":[74.875,40.54,176.125,40.54,0,0]}],[{"kind":"cdDrawCurve","args":[95.125,44.02,104.575,53.59,109.3,71.86,7,8]}],[{"kind":"cdDrawCurve","args":[151.15,44.89,145.075,59.68,135.625,77.08,0,7]}],[{"kind":"cdDrawCurve","args":[78.925,65.6308,79.6,93.47515,68.8,102.50574999999999,7,8]}],[{"kind":"cdDrawLine","args":[79.6,76.91905,176.8,76.91905,0,2]}],[{"kind":"cdDrawCurve","args":[176.8,76.91905,172.75,85.94965,163.3,101.00065000000001,22,7]}],[{"kind":"cdDrawLine","args":[91.75,103.18,91.75,151.9,12,100]}],[{"kind":"cdDrawLine","args":[91.75,103.18,159.25,103.18,2,2]}],[{"kind":"cdDrawLine","args":[159.25,103.18,159.25,139.29,22,1]},{"kind":"cdDrawCurve","args":[159.25,139.29,159.25,149.29,149.25,149.29,1,514]}],[{"kind":"cdDrawLine","args":[125.5,83.17,125.5,165.82,0,0]}]],"TRACE_SHA256":"60d9813169d62c00f99a627700c97bbbc9b8501a90f3adce6b4282ccc6d7f723","GROUPS_SHA256":"74f150520109ff3b878a01905cb52a7997b8c84e36db05d984e85751a1903410","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"1557602b3723ac6eec515818a74bfe8f498cafedb990d9aeef873e85dab54b13","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[13,14]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[]}})
export const sourceRoot = "u9046-g"
export const sourceGroups = PROFILES[sourceRoot].sourceGroups
export const sourceProofFile = PROFILES[sourceRoot].sourceProofFile
export const sourceProofFileSHA256 = PROFILES[sourceRoot].sourceProofFileSHA256
export const sourcePayloadSHA256 = PROFILES[sourceRoot].FULL_PAYLOAD_SHA256
export const supportedWholeRoots = Object.freeze(Object.keys(PROFILES))
export const wholeSourceIdentities = deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root,p])=>[root,{root,file:p.sourceProofFile,fileSHA256:p.sourceProofFileSHA256}])))
export const nativeOrderReviewed = 0
export const sourceWholeEligibility = 'unreviewed'
export const candidateStrokeCounts = deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root,p])=>[root,p.sourceGroups.length])))
