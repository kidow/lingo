export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// Provisional source-only review compiler. Domestic order and browser approval are pending.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'

const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const endpoint = (call) => call.args.slice(call.kind === 'cdDrawLine' ? 2 : call.kind === 'cdDrawCurve' ? 4 : 6, call.kind === 'cdDrawLine' ? 4 : call.kind === 'cdDrawCurve' ? 6 : 8)
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })

export function compileProgressive(trace, proof) {
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
    // Root observed the domestic vertical-then-horizontal fold as one pen.
    // Raw10 emits a foot quadrilateral and a top nib triangle; both stay in
    // one full-bounds downward mask. Raw11's original horizontal is the next
    // mask in that same pen. No authored path, tip or connector is introduced.
    if (indices.length === 2 && indices[0] === 10 && indices[1] === 11) {
      assert.equal(trace[10].length, 1)
      assert.equal(trace[11].length, 1)
      const vertical = trace[10][0], horizontal = trace[11][0]
      assert.equal(vertical.kind, 'cdDrawLine')
      assert.equal(horizontal.kind, 'cdDrawLine')
      assert.deepEqual(vertical.args, [82.44, 24, 82.44, 72, 0, 13])
      assert.deepEqual(horizontal.args, [82.44, 72, 106.86, 72, 2, 2])
      assert.equal(vertical.polygons.length, 2)
      assert.equal(vertical.polygons[0].length, 4)
      assert.equal(vertical.polygons[1].length, 3)
      assert.equal(horizontal.polygons.length, 1)
      assert.deepEqual(endpoint(vertical), horizontal.args.slice(0, 2))
      return [
        segment(vertical.polygons, 'down', Math.hypot(vertical.args[2] - vertical.args[0], vertical.args[3] - vertical.args[1]) / 2),
        segment(horizontal.polygons, 'right', Math.hypot(horizontal.args[2] - horizontal.args[0], horizontal.args[3] - horizontal.args[1]) / 2),
      ]
    }
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

export const sourceRoot = "u93d8"
export const sourceGroups = [[0],[1],[2],[3],[4],[5],[6],[7],[8],[10,11],[9],[12],[13],[14,15],[16],[17],[18],[19],[20]]
const RAW_COUNT = 21
const CATALOG_COUNT = 19
const ORIGINAL_SOURCE_GROUPS = [[0],[1],[2],[3],[4],[5],[6],[7],[8],[10,11],[9],[12],[13],[14,15],[16],[17],[18],[19],[20]]
const NON_DRAWING_SOURCE_ROWS = []
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[44.85,15,34.05,58,11.775,92,0,7]}],[{"kind":"cdDrawCurve","args":[44.175,27,61.05,38,67.8,54,7,8]}],[{"kind":"cdDrawLine","args":[28.65,71,67.125,71,0,100]}],[{"kind":"cdDrawLine","args":[16.5,103,71.175,103,0,100]}],[{"kind":"cdDrawLine","args":[44.175,71,44.175,164,32,32]}],[{"kind":"cdDrawCurve","args":[17.85,120,28.65,134,30,154,7,8]}],[{"kind":"cdDrawCurve","args":[64.425,119,59.7,135,52.275,151,0,7]}],[{"kind":"cdDrawCurve","args":[15.15,177,42.825,169,69.825,157,0,7]}],[{"kind":"cdDrawLine","args":[106.86,13,106.86,185,1000,0]}],[{"kind":"cdDrawLine","args":[72.53999999999999,110,106.86,110,0,2]}],[{"kind":"cdDrawLine","args":[82.44,24,82.44,72,0,13]}],[{"kind":"cdDrawLine","args":[82.44,72,106.86,72,2,2]}],[{"kind":"cdDrawLine","args":[85.74,110,85.74,126,1032,1]},{"kind":"cdDrawCurve","args":[85.74,126,85.74,164,71.88,188,1001,7]}],[{"kind":"cdDrawCurve","args":[152.28994999999998,15.170000000000002,140.1723,46.245,116.77270000000003,66.58500000000001,0,7]}],[{"kind":"cdDrawLine","args":[144.76864999999998,33.25,179.4502,33.25,2,2]}],[{"kind":"cdDrawCurve","args":[179.4502,33.25,158.5577,89.185,115.51915,107.83,22,7]}],[{"kind":"cdDrawCurve","args":[137.6652,43.42,150.20069999999998,51.33,155.63275,60.935,7,8]}],[{"kind":"cdDrawCurve","args":[126.38325,56.415,137.24735,63.75999999999999,143.51510000000002,75.06,7,8]}],[{"kind":"cdDrawLine","args":[115.08760000000001,114.53,188.68400000000003,114.53,0,300]}],[{"kind":"cdDrawLine","args":[167.2572,85.03,167.2572,171.79000000000005,0,1]},{"kind":"cdDrawCurve","args":[167.2572,171.79000000000005,167.2572,181.79000000000005,157.2572,181.79000000000005,1,314]}],[{"kind":"cdDrawCurve","args":[129.5274,126.92,140.70659999999998,136.95,143.9672,151.11,7,8]}]]
const TRACE_SHA256 = "226e548058bec285611a9076292970b84c3f29c5e3a1b24c6bab6cc9bee5b8ed"
const GROUPS_SHA256 = "de882ba2353e62da071e4de80e77bcc73b16b1f8fbea65b357c07a3c478f2e0b"
const WHOLE_PAYLOAD_SHA256 = "2778a4b1c60b9e0f9e09cd76cad24cc920f54523e95d455955e1f1ce851dc358"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = [[19]]
const SINGLE_CARDINAL_TIP_RAW = []
export const sourceProofFile = "engine-whole-u93d8.json"
export const sourceWholeFileSHA256 = "b3f64446c3c4ba7b6db7094546ffc9a7886e685cdfb82096e5cb5ad347d56ba5"
export const approvalStatus = "candidate-native-review-pending"
