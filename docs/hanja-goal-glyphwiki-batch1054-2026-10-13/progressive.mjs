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

const PROFILES = deepFreeze({"u9079-g":{"sourceRoot":"u9079-g","sourceProofFile":"engine-whole-u9079-g.json","sourceProofFileSHA256":"bd4fb6410f5e7a1bd2b169c693581d3a45a2637ae9cfb750768048a50a166f1c","sourceGroups":[[0],[1,2],[3],[4],[5,6],[7],[8,9],[10],[11],[12],[13,14],[15],[16],[17],[18,19],[20]],"RAW_COUNT":21,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[23,25,45,37,56,56,7,8]}],[{"kind":"cdDrawLine","args":[14,93,50,93,0,2]}],[{"kind":"cdDrawLine","args":[50,93,50,155,22,300]}],[{"kind":"cdDrawCurve","args":[16,179,35,166,55,151,0,7]}],[{"kind":"cdDrawBezier","args":[53,149,68,172,84,181,178,177,7,0]}],[{"kind":"cdDrawLine","args":[82.2,28.15,151.56,28.15,0,2]}],[{"kind":"cdDrawCurve","args":[151.56,28.15,140.68,37.225,126.4,43.825,22,7]}],[{"kind":"cdDrawCurve","args":[106.68,33.925,123,38.05,129.8,47.125,7,8]}],[{"kind":"cdDrawLine","args":[75.4,53.725,166.51999999999998,53.725,0,2]}],[{"kind":"cdDrawCurve","args":[166.51999999999998,53.725,159.72,64.45,144.76,76,22,7]}],[{"kind":"cdDrawLine","args":[129.8,53.725,129.8,78.375,32,1]},{"kind":"cdDrawCurve","args":[129.8,78.375,129.8,88.375,119.80000000000001,88.375,1,14]}],[{"kind":"cdDrawCurve","args":[123,53.725,105.32,79.3,69.96000000000001,86.725,132,7]}],[{"kind":"cdDrawLine","args":[78.8,95.721625,78.8,162.851875,12,0]}],[{"kind":"cdDrawLine","args":[78.8,95.721625,170.6,95.721625,2,2]}],[{"kind":"cdDrawLine","args":[170.6,95.721625,170.6,151.57725000000002,22,1]},{"kind":"cdDrawCurve","args":[170.6,151.57725000000002,170.6,161.57725000000002,160.6,161.57725000000002,1,114]}],[{"kind":"cdDrawCurve","args":[116.5944,102.63859000000001,104.436,114.36514,86.705,122.96461000000001,0,7]}],[{"kind":"cdDrawCurve","args":[130.7792,101.85682000000001,147.497,108.501865,157.1224,121.01018499999998,7,8]}],[{"kind":"cdDrawLine","args":[104.2456,123.899335,104.2456,143.17166500000002,12,213]}],[{"kind":"cdDrawLine","args":[104.2456,123.899335,144.4744,123.899335,2,2]}],[{"kind":"cdDrawLine","args":[144.4744,123.899335,144.4744,143.17166500000002,22,223]}],[{"kind":"cdDrawLine","args":[104.2456,143.17166500000002,144.4744,143.17166500000002,2,2]}]],"TRACE_SHA256":"8a7c544c335515d8314e09895ece44e0c463f1842291b38a823bbcc8d69da0e7","GROUPS_SHA256":"9977608d82c9bed67186e11c83bd88b01e656dae5b47f8748dfabbb0611bc1ec","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"eae75ce5e15e64afc1b592368ad034b902a33990d5d68b0548ced22ab6488063","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[10],[13,14]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[17]},"u9079-ue0102":{"sourceRoot":"u9079-ue0102","sourceProofFile":"engine-whole-u9079-ue0102.json","sourceProofFileSHA256":"0848b462b98f241fe2f1331c5cf9eec9d518f45009c18f40c09dfc24b3a0324f","sourceGroups":[[0],[1,2],[3],[4],[5,6],[7],[8,9],[10],[11],[12],[13,14],[15],[16],[17],[18,19],[20]],"RAW_COUNT":21,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[23,25,45,37,56,56,7,8]}],[{"kind":"cdDrawLine","args":[14,93,50,93,0,2]}],[{"kind":"cdDrawLine","args":[50,93,50,155,22,300]}],[{"kind":"cdDrawCurve","args":[16,179,35,166,55,151,0,7]}],[{"kind":"cdDrawBezier","args":[53,149,68,172,84,181,178,177,7,0]}],[{"kind":"cdDrawLine","args":[80.4,21.14,152.82,21.14,0,2]}],[{"kind":"cdDrawCurve","args":[152.82,21.14,143.59,29.84,128.68,41.15,22,7]}],[{"kind":"cdDrawCurve","args":[104.54,28.97,123,34.19,131.51999999999998,46.37,7,8]}],[{"kind":"cdDrawLine","args":[73.3,48.11,168.44,48.11,0,2]}],[{"kind":"cdDrawCurve","args":[168.44,48.11,161.34,59.42,145.72,71.6,22,7]}],[{"kind":"cdDrawLine","args":[130.1,48.11,130.1,74.65,32,1]},{"kind":"cdDrawCurve","args":[130.1,74.65,130.1,84.65,120.1,84.65,1,14]}],[{"kind":"cdDrawCurve","args":[123,48.11,104.54,75.08,67.62,82.91,132,7]}],[{"kind":"cdDrawLine","args":[76.85,92.48,76.85,162.08,12,0]}],[{"kind":"cdDrawLine","args":[76.85,92.48,172.7,92.48,2,2]}],[{"kind":"cdDrawLine","args":[172.7,92.48,172.7,151.21,22,1]},{"kind":"cdDrawCurve","args":[172.7,151.21,172.7,161.21,162.7,161.21,1,114]}],[{"kind":"cdDrawCurve","args":[113.06,92.48,108.09,116.84,82.53,126.41,132,7]}],[{"kind":"cdDrawLine","args":[132.94,92.48,132.94,104.23,32,1]},{"kind":"cdDrawCurve","args":[132.94,104.23,132.94,114.23,142.94,114.23,1,5001]},{"kind":"cdDrawLine","args":[142.94,114.23,172.7,114.23,5006,5000]}],[{"kind":"cdDrawLine","args":[103.83,126.41,103.83,142.07,12,313]}],[{"kind":"cdDrawLine","args":[103.83,126.41,144.3,126.41,2,2]}],[{"kind":"cdDrawLine","args":[144.3,126.41,144.3,142.07,22,323]}],[{"kind":"cdDrawLine","args":[103.83,142.07,144.3,142.07,2,2]}]],"TRACE_SHA256":"44bece8b60f56631ad85fec9f134c1db10e1ac8b168911c5d3eeaacb34e454b5","GROUPS_SHA256":"587e2d8d29301f2cd71636f5e5542d21678164a447e6e211d191cadd9f978c46","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"faf25b87b95029ddd868aa7213758d301ae80759191a84e42f8e2334ef5e783e","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[10],[13,14]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[17]},"u9079-var-001":{"sourceRoot":"u9079-var-001","sourceProofFile":"engine-whole-u9079-var-001.json","sourceProofFileSHA256":"6e5a1d93ccf33131670497cb0a2d786fee282073f3f90f77f47020afc6703779","sourceGroups":[[0],[1,2],[3],[4],[5,6],[7],[8,9],[10],[11],[12],[13,14],[15],[16],[17],[18,19],[20]],"RAW_COUNT":21,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[23,25,45,37,56,56,7,8]}],[{"kind":"cdDrawLine","args":[14,93,50,93,0,2]}],[{"kind":"cdDrawLine","args":[50,93,50,155,22,300]}],[{"kind":"cdDrawCurve","args":[16,179,35,166,55,151,0,7]}],[{"kind":"cdDrawBezier","args":[53,149,68,172,84,181,178,177,7,0]}],[{"kind":"cdDrawLine","args":[80.4,21.14,152.82,21.14,0,2]}],[{"kind":"cdDrawCurve","args":[152.82,21.14,143.59,29.84,128.68,41.15,22,7]}],[{"kind":"cdDrawCurve","args":[104.53999999999999,28.97,123,34.19,131.51999999999998,46.37,7,8]}],[{"kind":"cdDrawLine","args":[73.3,48.11,168.44,48.11,0,2]}],[{"kind":"cdDrawCurve","args":[168.44,48.11,161.34,59.42,145.72,71.6,22,7]}],[{"kind":"cdDrawLine","args":[130.1,48.11,130.1,74.65,32,1]},{"kind":"cdDrawCurve","args":[130.1,74.65,130.1,84.65,120.1,84.65,1,14]}],[{"kind":"cdDrawCurve","args":[123,48.11,104.53999999999999,75.08,67.62,82.91,132,7]}],[{"kind":"cdDrawLine","args":[75.2028,93.35,75.2028,161.21,12,0]}],[{"kind":"cdDrawLine","args":[75.2028,93.35,170.79719999999998,93.35,2,2]}],[{"kind":"cdDrawLine","args":[170.79719999999998,93.35,170.79719999999998,149.47,22,1]},{"kind":"cdDrawCurve","args":[170.79719999999998,149.47,170.79719999999998,159.47,160.79719999999998,159.47,1,114]}],[{"kind":"cdDrawCurve","args":[110.3478,93.35,106.83330000000001,113.36,81.52890000000001,127.28,132,7]}],[{"kind":"cdDrawLine","args":[136.3551,94.22,136.3551,107.275,32,1]},{"kind":"cdDrawCurve","args":[136.3551,107.275,136.3551,117.275,146.3551,117.275,1,5001]},{"kind":"cdDrawLine","args":[146.3551,117.275,159.55079999999998,117.275,5006,5]}],[{"kind":"cdDrawLine","args":[102.20821799999999,127.35395,102.20821799999999,145.91105,12,313]}],[{"kind":"cdDrawLine","args":[102.20821799999999,127.35395,143.79178199999998,127.35395,2,2]}],[{"kind":"cdDrawLine","args":[143.79178199999998,127.35395,143.79178199999998,145.91105,22,323]}],[{"kind":"cdDrawLine","args":[102.20821799999999,145.91105,143.79178199999998,145.91105,2,2]}]],"TRACE_SHA256":"76569d1417b2a72ed6f0c9728ee9aa55def1ee088d8af755a7af5a97fc8aae84","GROUPS_SHA256":"b411e8e5e0c9785b48498b217ffc03418a9034036a0a14b31a58f8bb21785b65","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"c51e5f6070fc67e9bbf15d44518e77d5db46d286702d93f3e2419cf2da388202","UP_TAIL_GROUPS":[[16]],"LEFT_TAIL_GROUPS":[[10],[13,14]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[17]},"u9079-var-002":{"sourceRoot":"u9079-var-002","sourceProofFile":"engine-whole-u9079-var-002.json","sourceProofFileSHA256":"5b21487c8880df543f939edfc9776e0048b24144df0d4237f32f7dc55619f55a","sourceGroups":[[0],[1,2],[3],[4],[5,6],[7],[8,9],[10],[11],[12],[13,14],[15],[16],[17],[18,19],[20]],"RAW_COUNT":21,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[23,25,45,37,56,56,7,8]}],[{"kind":"cdDrawLine","args":[14,93,50,93,0,2]}],[{"kind":"cdDrawLine","args":[50,93,50,155,22,300]}],[{"kind":"cdDrawCurve","args":[16,179,35,166,55,151,0,7]}],[{"kind":"cdDrawBezier","args":[53,149,68,172,84,181,178,177,7,0]}],[{"kind":"cdDrawLine","args":[80.4,21.14,152.82,21.14,0,2]}],[{"kind":"cdDrawCurve","args":[152.82,21.14,143.59,29.84,128.68,41.15,22,7]}],[{"kind":"cdDrawCurve","args":[104.53999999999999,28.97,123,34.19,131.51999999999998,46.37,7,8]}],[{"kind":"cdDrawLine","args":[73.3,48.11,168.44,48.11,0,2]}],[{"kind":"cdDrawCurve","args":[168.44,48.11,161.34,59.42,145.72,71.6,22,7]}],[{"kind":"cdDrawLine","args":[130.1,48.11,130.1,74.65,32,1]},{"kind":"cdDrawCurve","args":[130.1,74.65,130.1,84.65,120.1,84.65,1,14]}],[{"kind":"cdDrawCurve","args":[123,48.11,104.53999999999999,75.08,67.62,82.91,132,7]}],[{"kind":"cdDrawLine","args":[76.85,92.48,76.85,162.08,12,0]}],[{"kind":"cdDrawLine","args":[76.85,92.48,172.7,92.48,2,2]}],[{"kind":"cdDrawLine","args":[172.7,92.48,172.7,151.21,22,1]},{"kind":"cdDrawCurve","args":[172.7,151.21,172.7,161.21,162.7,161.21,1,114]}],[{"kind":"cdDrawCurve","args":[113.06,92.48,108.09,116.84,82.53,126.41,132,7]}],[{"kind":"cdDrawLine","args":[132.94,92.48,132.94,104.23,32,1]},{"kind":"cdDrawCurve","args":[132.94,104.23,132.94,114.23,142.94,114.23,1,5001]},{"kind":"cdDrawLine","args":[142.94,114.23,172.7,114.23,5006,5000]}],[{"kind":"cdDrawLine","args":[103.83,126.41,103.83,142.07,12,313]}],[{"kind":"cdDrawLine","args":[103.83,126.41,144.3,126.41,2,2]}],[{"kind":"cdDrawLine","args":[144.3,126.41,144.3,142.07,22,323]}],[{"kind":"cdDrawLine","args":[103.83,142.07,144.3,142.07,2,2]}]],"TRACE_SHA256":"ef80d216a14d456db7c7895636a2ee5b8d9935b56f794951210302687e9822dc","GROUPS_SHA256":"c5f29c4efcc8e655f4d005b4298253da7e84633d08facd2d71ac3baed09a6965","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"12b446eac758033c57ab38dae96ffe681079c841a58c0a37852654e3e5c20550","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[10],[13,14]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[17]}})
export const sourceRoot = "u9079-g"
export const sourceGroups = PROFILES[sourceRoot].sourceGroups
export const sourceProofFile = PROFILES[sourceRoot].sourceProofFile
export const sourceProofFileSHA256 = PROFILES[sourceRoot].sourceProofFileSHA256
export const sourcePayloadSHA256 = PROFILES[sourceRoot].FULL_PAYLOAD_SHA256
export const supportedWholeRoots = Object.freeze(Object.keys(PROFILES))
export const wholeSourceIdentities = deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root,p])=>[root,{root,file:p.sourceProofFile,fileSHA256:p.sourceProofFileSHA256}])))
export const nativeOrderReviewed = 0
export const sourceWholeEligibility = 'unreviewed'
export const candidateStrokeCounts = deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root,p])=>[root,p.sourceGroups.length])))

