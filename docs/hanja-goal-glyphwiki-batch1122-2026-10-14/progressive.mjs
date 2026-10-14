export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// Fresh source-only VS2 whole candidate. Order is merely authored adjacency; domestic review is pending.
// Catalog23 is unchanged. Exact joins/count do not authorize native playback.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const endpoint = (call) => call.args.slice(call.kind === 'cdDrawLine' ? 2 : call.kind === 'cdDrawCurve' ? 4 : 6, call.kind === 'cdDrawLine' ? 4 : call.kind === 'cdDrawCurve' ? 6 : 8)
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })

export function compileProgressive(trace, proof, identity) {
  validateSelectedSourceIdentity(proof, identity)
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

export const sourceRoot = "u9ad3-ue0102"
export const sourceGroups = [[0],[1,2],[3],[4],[5],[6,7],[8],[9,10],[11],[12],[13],[14,15],[16],[17],[18],[19],[20],[21],[22],[23],[24,25],[26],[27]]
const RAW_COUNT = 28
const CATALOG_COUNT = 23
const ORIGINAL_SOURCE_GROUPS = [[0],[1,2],[3],[4],[5],[6,7],[8],[9,10],[11],[12],[13],[14,15],[16],[17],[18],[19],[20],[21],[22],[23],[24,25],[26],[27]]
const NON_DRAWING_SOURCE_ROWS = []
const ORIGINAL = [[{"kind":"cdDrawLine","args":[28.12,24,28.12,76,1012,32]}],[{"kind":"cdDrawLine","args":[28.12,24,69.92,24,2,2]}],[{"kind":"cdDrawLine","args":[69.92,24,69.92,76,1022,32]}],[{"kind":"cdDrawLine","args":[49.4,47,49.4,76,2012,32]}],[{"kind":"cdDrawLine","args":[49.4,47,69.92,47,2,2]}],[{"kind":"cdDrawCurve","args":[18.4604,68,18.9088,91.125,11.7344,98.625,7,8]}],[{"kind":"cdDrawLine","args":[18.9088,77.375,83.47840000000001,77.375,0,2]}],[{"kind":"cdDrawCurve","args":[83.47840000000001,77.375,80.788,84.875,74.5104,97.375,22,7]}],[{"kind":"cdDrawLine","args":[28.272000000000002,100.59,28.272000000000002,185.585,12,0]}],[{"kind":"cdDrawLine","args":[28.272000000000002,100.59,69.768,100.59,2,2]}],[{"kind":"cdDrawLine","args":[69.768,100.59,69.768,171.765,22,1]},{"kind":"cdDrawCurve","args":[69.768,171.765,69.768,181.765,59.768,181.765,1,514]}],[{"kind":"cdDrawLine","args":[28.272000000000002,125.42,69.768,125.42,2,2]}],[{"kind":"cdDrawLine","args":[28.272000000000002,150.25,69.768,150.25,2,2]}],[{"kind":"cdDrawCurve","args":[88.685,25.5,101.775,37.74,108.32,57.12,7,8]}],[{"kind":"cdDrawLine","args":[83.33,94.86,104.75,94.86,0,2]}],[{"kind":"cdDrawLine","args":[104.75,94.86,104.75,158.1,22,300]}],[{"kind":"cdDrawCurve","args":[84.52,182.58,95.825,169.32,107.725,154.02,0,7]}],[{"kind":"cdDrawBezier","args":[106.535,151.98,115.46000000000001,175.44,124.97999999999999,184.62,181.505,180.54,7,0]}],[{"kind":"cdDrawLine","args":[117.24175725,33.360834,183.26771724999998,33.360834,0,0]}],[{"kind":"cdDrawCurve","args":[146.540777,15.526542000000001,138.70019425,56.715264,113.94045925,83.89132799999999,0,7]}],[{"kind":"cdDrawLine","args":[136.22422075,55.016760000000005,177.0777835,55.016760000000005,0,100]}],[{"kind":"cdDrawLine","args":[153.55603524999998,55.016760000000005,153.55603524999998,82.61745,32,32]}],[{"kind":"cdDrawLine","args":[125.49500225,82.61745,182.855055,82.61745,0,100]}],[{"kind":"cdDrawLine","args":[130.221474,99.519411,130.221474,168.9411465,12,0]}],[{"kind":"cdDrawLine","args":[130.221474,99.519411,171.58980100000002,99.519411,2,2]}],[{"kind":"cdDrawLine","args":[171.58980100000002,99.519411,171.58980100000002,155.8210685,22,1]},{"kind":"cdDrawCurve","args":[171.58980100000002,155.8210685,171.58980100000002,165.8210685,161.58980100000002,165.8210685,1,514]}],[{"kind":"cdDrawLine","args":[130.221474,119.79991799999999,171.58980100000002,119.79991799999999,2,2]}],[{"kind":"cdDrawLine","args":[130.221474,140.08042500000002,171.58980100000002,140.08042500000002,2,2]}]]
const TRACE_SHA256 = "ecf9dba0c2a56b57622cc78152a0900d8b3133dbaed9cb6a66bc172e265fe284"
const GROUPS_SHA256 = "255b3186ec746c184d4ee03c42a009a6943f3fe8c210e67a8488ac8d81e7c6dc"
const WHOLE_PAYLOAD_SHA256 = "1045a6fca5da04e60b42885b52b281fc9b58019912b430781268e2b33409b8be"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = [[9,10],[24,25]]
const SINGLE_CARDINAL_TIP_RAW = []
export const sourceProofFile = "engine-whole-u9ad3-ue0102.json"
export const sourceWholeFileSHA256 = "44ec0ee8b5962c17092f4035067e990f8c3055103a6b68274006f4134d7c0d48"
export const approvalStatus = "candidate-native-review-pending"

export const selectedProofIdentity = Object.freeze({ sourceRoot, sourceProofFile, sourceProofFileSHA256: sourceWholeFileSHA256 })
function validateSelectedSourceIdentity(proof, identity) {
  assert.deepEqual(identity, selectedProofIdentity, 'Exact captured whole/root/file/byteSHA identity is required')
  const bytes=readFileSync(new URL(sourceProofFile, import.meta.url))
  assert.equal(createHash('sha256').update(bytes).digest('hex'), sourceWholeFileSHA256)
  assert.deepEqual(proof, JSON.parse(bytes), 'Full selected fixed engine proof must remain unchanged')
}
export function compileSourceWhole(root, trace, proof, identity) {
  assert.equal(root, sourceRoot, 'Only this captured original whole is supported')
  return compileProgressive(trace, proof, identity)
}
export const nativeApproval=false
export const nativeDirectionsReviewed=0
export const nativeFramesReviewed=0
export const nativeReplaysReviewed=0
export const runtimeApplied=false
