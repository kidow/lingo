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

const PROFILES = deepFreeze({"u994e-ue0102":{"sourceRoot":"u994e-ue0102","sourceProofFile":"engine-whole-u994e-ue0102.json","sourceProofFileSHA256":"a6b0c3023e458da1d201adc2ee77fa5275833a104a04c86de135c56bc6187564","sourceGroups":[[0],[1],[2],[3,4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14,15],[16],[17],[18],[19],[20],[21,22],[23]],"RAW_COUNT":24,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[51.46,15,36.52,58,10.79,86,0,7]}],[{"kind":"cdDrawCurve","args":[48.14,25,68.89,38,78.02,58,7,8]}],[{"kind":"cdDrawLine","args":[50.63,48,50.63,74,0,32]}],[{"kind":"cdDrawLine","args":[31.54,74,68.89,74,2,2]}],[{"kind":"cdDrawLine","args":[68.89,74,68.89,121,22,323]}],[{"kind":"cdDrawLine","args":[31.54,97,68.89,97,0,2]}],[{"kind":"cdDrawLine","args":[31.54,121,68.89,121,2,2]}],[{"kind":"cdDrawLine","args":[31.54,74,31.54,167,12,32]}],[{"kind":"cdDrawCurve","args":[14.11,174,35.69,166,67.23,150,0,7]}],[{"kind":"cdDrawCurve","args":[50.63,131,67.23,145,74.7,168,7,8]}],[{"kind":"cdDrawLine","args":[83.48,36,181.51999999999998,36,0,0]}],[{"kind":"cdDrawLine","args":[132.5,14,132.5,57,0,32]}],[{"kind":"cdDrawLine","args":[92.51,57,172.49,57,0,100]}],[{"kind":"cdDrawLine","args":[104.8166,73.81,104.8166,99.19,12,313]}],[{"kind":"cdDrawLine","args":[104.8166,73.81,160.1834,73.81,2,2]}],[{"kind":"cdDrawLine","args":[160.1834,73.81,160.1834,99.19,22,123]}],[{"kind":"cdDrawLine","args":[104.8166,99.19,160.1834,99.19,2,2]}],[{"kind":"cdDrawCurve","args":[148.625,103,144.11,116,137.66,127,0,7]}],[{"kind":"cdDrawCurve","args":[112.505,101,119.6,110,123.47,125,7,8]}],[{"kind":"cdDrawLine","args":[77.675,127,187.325,127,0,100]}],[{"kind":"cdDrawLine","args":[100.70150000000001,143.65,100.70150000000001,173.35,12,113]}],[{"kind":"cdDrawLine","args":[100.70150000000001,143.65,164.2985,143.65,2,2]}],[{"kind":"cdDrawLine","args":[164.2985,143.65,164.2985,173.35,22,123]}],[{"kind":"cdDrawLine","args":[100.70150000000001,173.35,164.2985,173.35,2,2]}]],"TRACE_SHA256":"2daf82e611fcd83c1c77ee25771c784dac272bf3b04cdccda96f1c43f0a3eb34","GROUPS_SHA256":"4ee1be0599ce29c69baccc39170e4b19b5abe12221046f1e0faacdd0efb7c306","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"9fb74e6203d41ce7430256100edd5b6116cdefa093012dd57235aa2c06ab5e47","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[13,20]},"u994e":{"sourceRoot":"u994e","sourceProofFile":"engine-whole-u994e.json","sourceProofFileSHA256":"37d61bf1a14a69bd15dcb20be12cac520cd7f1d4f07502b4e8154c74f428779f","sourceGroups":[[0],[1],[2],[3],[4,5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15,16],[17],[18],[19],[20],[21],[22,23],[24]],"RAW_COUNT":25,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[51.46,15,34.03,58,10.79,86,0,7]}],[{"kind":"cdDrawCurve","args":[48.14,25,68.89,37,78.02,56,7,8]}],[{"kind":"cdDrawLine","args":[34.86,61,69.72,61,0,200]}],[{"kind":"cdDrawLine","args":[29.88,79,29.88,186,12,0]}],[{"kind":"cdDrawLine","args":[29.88,79,68.89,79,2,2]}],[{"kind":"cdDrawLine","args":[68.89,79,68.89,123,22,323]}],[{"kind":"cdDrawLine","args":[29.88,100,68.89,100,0,2]}],[{"kind":"cdDrawLine","args":[29.05,123,68.89,123,2,2]}],[{"kind":"cdDrawLine","args":[29.88,147,79.68,147,2,100]}],[{"kind":"cdDrawLine","args":[29.88,170,80.51,170,2,0]}],[],[{"kind":"cdDrawLine","args":[83.48,36,181.51999999999998,36,0,0]}],[{"kind":"cdDrawLine","args":[132.5,14,132.5,57,0,32]}],[{"kind":"cdDrawLine","args":[92.51,57,172.49,57,0,100]}],[{"kind":"cdDrawLine","args":[104.8166,73.81,104.8166,99.19,12,313]}],[{"kind":"cdDrawLine","args":[104.8166,73.81,160.1834,73.81,2,2]}],[{"kind":"cdDrawLine","args":[160.1834,73.81,160.1834,99.19,22,123]}],[{"kind":"cdDrawLine","args":[104.8166,99.19,160.1834,99.19,2,2]}],[{"kind":"cdDrawCurve","args":[148.625,103,144.11,116,137.66,127,0,7]}],[{"kind":"cdDrawCurve","args":[112.505,101,119.6,110,123.47,125,7,8]}],[{"kind":"cdDrawLine","args":[77.675,127,187.325,127,0,100]}],[{"kind":"cdDrawLine","args":[100.70150000000001,143.65,100.70150000000001,173.35,12,113]}],[{"kind":"cdDrawLine","args":[100.70150000000001,143.65,164.2985,143.65,2,2]}],[{"kind":"cdDrawLine","args":[164.2985,143.65,164.2985,173.35,22,123]}],[{"kind":"cdDrawLine","args":[100.70150000000001,173.35,164.2985,173.35,2,2]}]],"TRACE_SHA256":"9647199b0f353f4b6b275355fcbe37c568d51ac2aed455394fc25c70e9e8b18f","GROUPS_SHA256":"5e41ebad234888e5e22738a7ea8ec47558f171ba9cb71a915b55440626721564","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"4b241028abee7c51a5caf722a28dcdd6bba21fbcf50414f3c8f7907d7cfbf134","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[14,21]},"u994e-ue0100":{"sourceRoot":"u994e-ue0100","sourceProofFile":"engine-whole-u994e-ue0100.json","sourceProofFileSHA256":"0d4994f90e7df998740b000c3b5cc1cd8e745765c389ea00626300f704618edb","sourceGroups":[[0],[1],[2],[3],[4,5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15,16],[17],[18],[19],[20],[21],[22,23],[24]],"RAW_COUNT":25,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[51.46,15,34.03,58,10.79,86,0,7]}],[{"kind":"cdDrawCurve","args":[48.14,25,68.89,37,78.02,56,7,8]}],[{"kind":"cdDrawLine","args":[34.86,61,69.72,61,0,200]}],[{"kind":"cdDrawLine","args":[29.88,79,29.88,186,12,0]}],[{"kind":"cdDrawLine","args":[29.88,79,68.89,79,2,2]}],[{"kind":"cdDrawLine","args":[68.89,79,68.89,123,22,323]}],[{"kind":"cdDrawLine","args":[29.88,100,68.89,100,0,2]}],[{"kind":"cdDrawLine","args":[29.05,123,68.89,123,2,2]}],[{"kind":"cdDrawLine","args":[29.88,147,79.68,147,2,100]}],[{"kind":"cdDrawLine","args":[29.88,170,80.51,170,2,0]}],[],[{"kind":"cdDrawLine","args":[83.48,36,181.52,36,0,0]}],[{"kind":"cdDrawLine","args":[132.5,14,132.5,57,0,32]}],[{"kind":"cdDrawLine","args":[92.51,57,172.49,57,0,100]}],[{"kind":"cdDrawLine","args":[104.8166,73.81,104.8166,99.19,12,313]}],[{"kind":"cdDrawLine","args":[104.8166,73.81,160.1834,73.81,2,2]}],[{"kind":"cdDrawLine","args":[160.1834,73.81,160.1834,99.19,22,123]}],[{"kind":"cdDrawLine","args":[104.8166,99.19,160.1834,99.19,2,2]}],[{"kind":"cdDrawCurve","args":[148.625,103,144.11,116,137.66,127,0,7]}],[{"kind":"cdDrawCurve","args":[112.505,101,119.6,110,123.47,125,7,8]}],[{"kind":"cdDrawLine","args":[77.675,127,187.325,127,0,100]}],[{"kind":"cdDrawLine","args":[100.70150000000001,143.65,100.70150000000001,173.35,12,113]}],[{"kind":"cdDrawLine","args":[100.70150000000001,143.65,164.2985,143.65,2,2]}],[{"kind":"cdDrawLine","args":[164.2985,143.65,164.2985,173.35,22,123]}],[{"kind":"cdDrawLine","args":[100.70150000000001,173.35,164.2985,173.35,2,2]}]],"TRACE_SHA256":"4545c56a3041627870086054c813beb34124c6970ea4ea5a2a16297a1f18b10a","GROUPS_SHA256":"133efdeac82520ee4d577649a93d453e07f1949dc7a39ddc17ee50909863f684","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"c64cd7809eaf1d6c55be153d4d2fef93e585b404d8dc0daeea0263af4a7fb1b5","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[14,21]},"u994e-ue0101":{"sourceRoot":"u994e-ue0101","sourceProofFile":"engine-whole-u994e-ue0101.json","sourceProofFileSHA256":"0d4994f90e7df998740b000c3b5cc1cd8e745765c389ea00626300f704618edb","sourceGroups":[[0],[1],[2],[3],[4,5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15,16],[17],[18],[19],[20],[21],[22,23],[24]],"RAW_COUNT":25,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[51.46,15,34.03,58,10.79,86,0,7]}],[{"kind":"cdDrawCurve","args":[48.14,25,68.89,37,78.02,56,7,8]}],[{"kind":"cdDrawLine","args":[34.86,61,69.72,61,0,200]}],[{"kind":"cdDrawLine","args":[29.88,79,29.88,186,12,0]}],[{"kind":"cdDrawLine","args":[29.88,79,68.89,79,2,2]}],[{"kind":"cdDrawLine","args":[68.89,79,68.89,123,22,323]}],[{"kind":"cdDrawLine","args":[29.88,100,68.89,100,0,2]}],[{"kind":"cdDrawLine","args":[29.05,123,68.89,123,2,2]}],[{"kind":"cdDrawLine","args":[29.88,147,79.68,147,2,100]}],[{"kind":"cdDrawLine","args":[29.88,170,80.51,170,2,0]}],[],[{"kind":"cdDrawLine","args":[83.48,36,181.52,36,0,0]}],[{"kind":"cdDrawLine","args":[132.5,14,132.5,57,0,32]}],[{"kind":"cdDrawLine","args":[92.51,57,172.49,57,0,100]}],[{"kind":"cdDrawLine","args":[104.8166,73.81,104.8166,99.19,12,313]}],[{"kind":"cdDrawLine","args":[104.8166,73.81,160.1834,73.81,2,2]}],[{"kind":"cdDrawLine","args":[160.1834,73.81,160.1834,99.19,22,123]}],[{"kind":"cdDrawLine","args":[104.8166,99.19,160.1834,99.19,2,2]}],[{"kind":"cdDrawCurve","args":[148.625,103,144.11,116,137.66,127,0,7]}],[{"kind":"cdDrawCurve","args":[112.505,101,119.6,110,123.47,125,7,8]}],[{"kind":"cdDrawLine","args":[77.675,127,187.325,127,0,100]}],[{"kind":"cdDrawLine","args":[100.70150000000001,143.65,100.70150000000001,173.35,12,113]}],[{"kind":"cdDrawLine","args":[100.70150000000001,143.65,164.2985,143.65,2,2]}],[{"kind":"cdDrawLine","args":[164.2985,143.65,164.2985,173.35,22,123]}],[{"kind":"cdDrawLine","args":[100.70150000000001,173.35,164.2985,173.35,2,2]}]],"TRACE_SHA256":"4545c56a3041627870086054c813beb34124c6970ea4ea5a2a16297a1f18b10a","GROUPS_SHA256":"133efdeac82520ee4d577649a93d453e07f1949dc7a39ddc17ee50909863f684","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"c64cd7809eaf1d6c55be153d4d2fef93e585b404d8dc0daeea0263af4a7fb1b5","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[14,21]}})
export const sourceRoot = "u994e-ue0102"
export const sourceGroups = PROFILES[sourceRoot].sourceGroups
export const sourceProofFile = PROFILES[sourceRoot].sourceProofFile
export const sourceProofFileSHA256 = PROFILES[sourceRoot].sourceProofFileSHA256
export const sourcePayloadSHA256 = PROFILES[sourceRoot].FULL_PAYLOAD_SHA256
export const supportedWholeRoots = Object.freeze(Object.keys(PROFILES))
export const wholeSourceIdentities = deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root,p])=>[root,{root,file:p.sourceProofFile,fileSHA256:p.sourceProofFileSHA256}])))
export const nativeOrderReviewed = 0
export const sourceWholeEligibility = 'unreviewed'
export const candidateStrokeCounts = deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root,p])=>[root,p.sourceGroups.length])))

