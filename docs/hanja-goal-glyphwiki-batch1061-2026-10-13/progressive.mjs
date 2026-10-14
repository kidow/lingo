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
    assert(y1 < y2); assert.equal(ta2 % 100, 15); assert.equal(ta1, 0); assert.equal(terminal.polygons.length, 5)
    const width = proof.defaults.kMinWidthT, jump = proof.defaults.kWidth * 5
    const expected = [point(x2, y2 - width + 1), point(x2 + 2, y2 - width - jump), point(x2, y2 - width - jump), point(x2 - width, y2 - width + 1)]
    assert.deepEqual(terminal.polygons.at(-1), expected, 'Original terminal15 up-tail formula is identity evidence only')
    // This pinned terminal15 call has two original head decorations before its last two tail polygons.
    // Keep the body and both head polygons intact; take only the original final nib and up-tail.
    const nib = terminal.polygons.at(-2), up = terminal.polygons.at(-1)
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

const PROFILES = deepFreeze({"u7214":{"sourceRoot":"u7214","sourceProofFile":"engine-whole-u7214.json","sourceProofFileSHA256":"23a771386659ae9daf7d2ee8d2bbb6b42e60b48212e34f9f6cceb78078a93e9a","sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19,20,21]],"RAW_COUNT":22,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[22.19,53,27.08,87,15.67,106,7,8]}],[{"kind":"cdDrawCurve","args":[71.905,51,61.31,64,43.38,83,0,7]}],[{"kind":"cdDrawLine","args":[43.38,18,43.38,95,0,1]},{"kind":"cdDrawCurve","args":[43.38,95,43.38,158,10.78,185,1,7]}],[{"kind":"cdDrawCurve","args":[42.565,121,62.125,141,67.83,161,7,8]}],[{"kind":"cdDrawCurve","args":[97.675,12.49,108.63499999999999,20.52,113.43,32.93,7,8]}],[{"kind":"cdDrawCurve","args":[156.58499999999998,13.95,150.42000000000002,24.9,140.14499999999998,37.31,0,7]}],[{"kind":"cdDrawLine","args":[75.07,37.31,181.93,37.31,0,0]}],[{"kind":"cdDrawLine","args":[128.5,37.31,128.5,76.73,32,32]}],[{"kind":"cdDrawLine","args":[80.55,57.02,176.45,57.02,0,100]}],[{"kind":"cdDrawLine","args":[70.275,76.73,186.725,76.73,0,0]}],[{"kind":"cdDrawCurve","args":[124.39,87.31,105.89500000000001,93.36,75.07,98.805,0,7]}],[{"kind":"cdDrawLine","args":[69.59,109.695,187.41,109.695,0,0]}],[{"kind":"cdDrawLine","args":[105.89500000000001,94.57,105.89500000000001,135.105,32,200]}],[{"kind":"cdDrawCurve","args":[103.155,109.695,90.14,133.29,68.22,145.995,132,7]}],[{"kind":"cdDrawCurve","args":[105.89500000000001,111.51,124.39,121.19,135.35,136.92000000000002,7,8]}],[{"kind":"cdDrawBezier","args":[142.885,84.285,144.94,142.97,159.325,179.27,183.3,181.69,0,15]}],[{"kind":"cdDrawCurve","args":[172.34,121.795,155.215,176.245,116.17,187.74,0,7]}],[{"kind":"cdDrawCurve","args":[151.10500000000002,82.47,161.38,88.52,167.54500000000002,103.645,7,8]}],[{"kind":"cdDrawLine","args":[79.865,141.155,129.87,141.155,0,100]}],[{"kind":"cdDrawLine","args":[92.88,141.155,89.455,156.28,32,313]}],[{"kind":"cdDrawLine","args":[89.455,156.28,121.65,156.28,2,2]}],[{"kind":"cdDrawCurve","args":[121.65,156.28,118.91,170.8,117.55554702372697,173.79067171768315,22,0]},{"kind":"cdDrawCurve","args":[117.55554702372697,173.79067171768315,113.43,182.9,103.43,182.9,2,14]}]],"TRACE_SHA256":"7f435a27e4527bab3d1652fa9ca53b07941c17482b4f2bb41aa7379013d87fce","GROUPS_SHA256":"aa3557b59b38fd775e178cd3f8b3e51580fa43dd9f1c92c206e936336732f75f","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"bad2bd3ad09411248085d0cf6c02573b70e656b20b0e2d71c960720bd3ad2365","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[19,20,21]],"FIFTEEN_TAIL_GROUPS":[[15]],"SINGLE_CARDINAL_TIP_RAW":[]}})
export const sourceRoot = "u7214"
export const sourceGroups = PROFILES[sourceRoot].sourceGroups
export const sourceProofFile = PROFILES[sourceRoot].sourceProofFile
export const sourceProofFileSHA256 = PROFILES[sourceRoot].sourceProofFileSHA256
export const sourcePayloadSHA256 = PROFILES[sourceRoot].FULL_PAYLOAD_SHA256
export const supportedWholeRoots = Object.freeze(Object.keys(PROFILES))
export const wholeSourceIdentities = deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root,p])=>[root,{root,file:p.sourceProofFile,fileSHA256:p.sourceProofFileSHA256}])))
export const nativeOrderReviewed = 0
export const sourceWholeEligibility = 'unreviewed'
export const candidateStrokeCounts = deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root,p])=>[root,p.sourceGroups.length])))

