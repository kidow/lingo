export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// Provisional source-only review compiler. Domestic order and browser approval are pending.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

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
  const profile=PROFILES[root],identity=wholeSourceIdentities[root]
  const bytes=readFileSync(new URL(identity.file,import.meta.url))
  assert.equal(createHash('sha256').update(bytes).digest('hex'),identity.fileSHA256,'Actual selected complete whole file bytes are pinned')
  const expected={engineRevision:profile.ENGINE_REVISION,engineHashes:profile.ENGINE_HASHES,...JSON.parse(bytes),sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256}
  assert.deepEqual(proof,expected,'Exact selected complete whole body and explicit header bridge are required')
  return compileBound(trace, proof, PROFILES[root])
}
export const nativeApproval = false
export const nativeDirectionsReviewed = 0
export const nativeFramesReviewed = 0
export const nativeReplaysReviewed = 0
export const runtimeApplied = false

const PROFILES = deepFreeze({"u9139":{"sourceRoot":"u9139","sourceProofFile":"engine-whole-u9139.json","sourceProofFileSHA256":"46a6035e485d29243794a4c94b423054e12bf17ecda3ec0fb8561e679e712241","sourceGroups":[[0],[1],[2],[3],[4],[5],[6,7],[8],[9],[10],[11],[12],[13],[14],[15,16],[17],[18]],"RAW_COUNT":19,"ORIGINAL":[[{"kind":"cdDrawLine","args":[13.7002,24.28,71.6746,24.28,0,100]}],[{"kind":"cdDrawLine","args":[29.4016,24.28,29.4016,88.3,32,32]}],[{"kind":"cdDrawLine","args":[55.9732,24.28,55.9732,102.85,32,200]}],[{"kind":"cdDrawLine","args":[29.4016,43.68,55.9732,43.68,2,2]}],[{"kind":"cdDrawLine","args":[29.4016,63.08,55.9732,63.08,2,2]}],[{"kind":"cdDrawCurve","args":[14.908,93.15,33.6289,87.33,55.9732,79.57,0,7]}],[{"kind":"cdDrawLine","args":[67.4473,33.01,106.0969,33.01,0,2]}],[{"kind":"cdDrawCurve","args":[106.0969,33.01,92.81110000000001,76.66,63.823899999999995,94.12,22,7]}],[{"kind":"cdDrawCurve","args":[69.259,49.5,95.2267,62.11,110.9281,92.18,7,8]}],[{"kind":"cdDrawCurve","args":[87.01,98,68.71,114,46.75,124,0,7]}],[{"kind":"cdDrawLine","args":[65.965,115,65.965,186,32,0]}],[{"kind":"cdDrawCurve","args":[45.835,110,33.025,124,14.725,136,0,7]}],[{"kind":"cdDrawCurve","args":[53.155,140,40.345,160,12.895,178,0,7]}],[{"kind":"cdDrawCurve","args":[106.225,114,97.075,129,85.18,141,0,7]}],[{"kind":"cdDrawCurve","args":[66.88,128,87.01,138,105.31,166,7,8]}],[{"kind":"cdDrawLine","args":[127.7,28,175.8,28,2,2]}],[{"kind":"cdDrawCurve","args":[175.8,28,166.55,53,147.125,84,22,7]}],[{"kind":"cdDrawBezier","args":[147.125,83,182.275,99,181.35,133,175.83128742495882,146.72220424064292,7,1]},{"kind":"cdDrawCurve","args":[175.83128742495882,146.72220424064292,172.1,156,162.1,156,1,514]}],[{"kind":"cdDrawLine","args":[127.7,28,127.7,186,12,0]}]],"TRACE_SHA256":"56ac4391d61907225c95a5474a51c3594a12f4344c8b878d53d7dd51b8d16ca0","GROUPS_SHA256":"5853dbf325515213da41f38366af97124d3cecdd1bcc2064a38328952bd1e823","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"7b05c5c0d840bb380e675fc9f7135e1111f92af82a7b51ebe024a2bb19eac632","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[17]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[]},"u9139-k":{"sourceRoot":"u9139-k","sourceProofFile":"engine-whole-u9139-k.json","sourceProofFileSHA256":"40f8ca488dee7583af1c27144d72a7850d006ad0427354d389592878ff26ceb7","sourceGroups":[[0],[1],[2],[3],[4],[5],[6,7],[8],[9],[10],[11],[12],[13],[14],[15,16],[17],[18]],"RAW_COUNT":19,"ORIGINAL":[[{"kind":"cdDrawLine","args":[12,21,130,21,0,100]}],[{"kind":"cdDrawLine","args":[34,21,34,85,32,32]}],[{"kind":"cdDrawLine","args":[63,21,63,108,32,100]}],[{"kind":"cdDrawLine","args":[34,40,63,40,2,2]}],[{"kind":"cdDrawLine","args":[34,62,63,62,2,2]}],[{"kind":"cdDrawCurve","args":[13,89,40,84,63,80,0,7]}],[{"kind":"cdDrawLine","args":[61,34,114,34,0,2]}],[{"kind":"cdDrawCurve","args":[114,34,102,88,70,104,22,7]}],[{"kind":"cdDrawCurve","args":[75,35,106,60,121,100,7,8]}],[{"kind":"cdDrawCurve","args":[109.49,104.8,70.79,111.66,21.125,113.62,0,7]}],[{"kind":"cdDrawLine","args":[69.5,110.19,69.5,185.65,32,0]}],[{"kind":"cdDrawCurve","args":[50.795,124.4,39.83,138.61,14.675,148.41,0,7]}],[{"kind":"cdDrawCurve","args":[54.02,148.9,37.895,166.54000000000002,12.74,176.82999999999998,0,7]}],[{"kind":"cdDrawCurve","args":[114.65,121.46000000000001,104.33,136.65,84.98,147.92000000000002,0,7]}],[{"kind":"cdDrawCurve","args":[70.145,120.97,81.755,155.76,123.68,178.3,7,0]}],[{"kind":"cdDrawLine","args":[137.78,29.58,181.72,29.58,2,2]}],[{"kind":"cdDrawCurve","args":[181.72,29.58,173.27,54.205,155.525,84.74,22,7]}],[{"kind":"cdDrawBezier","args":[155.525,83.755,187.635,99.515,186.79,133.005,181.8346860431776,146.29051925346874,7,1]},{"kind":"cdDrawCurve","args":[181.8346860431776,146.29051925346874,178.34,155.66,168.34,155.66,1,514]}],[{"kind":"cdDrawLine","args":[137.78,29.58,137.78,185.21,12,0]}]],"TRACE_SHA256":"e0a003d579c7d26ec33d45402e79d35f69c700a5d94fe00d4ee9f08fbcaee67e","GROUPS_SHA256":"f639e8b09fc757713a61850a66b710b21d94a9debdaf26a38d68aa1f18e1e4b2","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"55cf921f9cb87eb6374fd8f05a68677fdc4ec74550bd1800fd14655590d728d1","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[17]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[]},"u9139-ue0100":{"sourceRoot":"u9139-ue0100","sourceProofFile":"engine-whole-u9139-ue0100.json","sourceProofFileSHA256":"46a6035e485d29243794a4c94b423054e12bf17ecda3ec0fb8561e679e712241","sourceGroups":[[0],[1],[2],[3],[4],[5],[6,7],[8],[9],[10],[11],[12],[13],[14],[15,16],[17],[18]],"RAW_COUNT":19,"ORIGINAL":[[{"kind":"cdDrawLine","args":[13.7002,24.28,71.6746,24.28,0,100]}],[{"kind":"cdDrawLine","args":[29.4016,24.28,29.4016,88.3,32,32]}],[{"kind":"cdDrawLine","args":[55.9732,24.28,55.9732,102.85,32,200]}],[{"kind":"cdDrawLine","args":[29.4016,43.68,55.9732,43.68,2,2]}],[{"kind":"cdDrawLine","args":[29.4016,63.08,55.9732,63.08,2,2]}],[{"kind":"cdDrawCurve","args":[14.908,93.15,33.6289,87.33,55.9732,79.57,0,7]}],[{"kind":"cdDrawLine","args":[67.4473,33.01,106.0969,33.01,0,2]}],[{"kind":"cdDrawCurve","args":[106.0969,33.01,92.81110000000001,76.66,63.823899999999995,94.12,22,7]}],[{"kind":"cdDrawCurve","args":[69.259,49.5,95.2267,62.11,110.9281,92.18,7,8]}],[{"kind":"cdDrawCurve","args":[87.01,98,68.71,114,46.75,124,0,7]}],[{"kind":"cdDrawLine","args":[65.965,115,65.965,186,32,0]}],[{"kind":"cdDrawCurve","args":[45.835,110,33.025,124,14.725,136,0,7]}],[{"kind":"cdDrawCurve","args":[53.155,140,40.345,160,12.895,178,0,7]}],[{"kind":"cdDrawCurve","args":[106.225,114,97.075,129,85.18,141,0,7]}],[{"kind":"cdDrawCurve","args":[66.88,128,87.01,138,105.31,166,7,8]}],[{"kind":"cdDrawLine","args":[127.7,28,175.8,28,2,2]}],[{"kind":"cdDrawCurve","args":[175.8,28,166.55,53,147.125,84,22,7]}],[{"kind":"cdDrawBezier","args":[147.125,83,182.275,99,181.35,133,175.83128742495882,146.72220424064292,7,1]},{"kind":"cdDrawCurve","args":[175.83128742495882,146.72220424064292,172.1,156,162.1,156,1,514]}],[{"kind":"cdDrawLine","args":[127.7,28,127.7,186,12,0]}]],"TRACE_SHA256":"56ac4391d61907225c95a5474a51c3594a12f4344c8b878d53d7dd51b8d16ca0","GROUPS_SHA256":"5853dbf325515213da41f38366af97124d3cecdd1bcc2064a38328952bd1e823","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"7b05c5c0d840bb380e675fc9f7135e1111f92af82a7b51ebe024a2bb19eac632","UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[17]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[]}})
export const sourceRoot = "u9139"
export const sourceGroups = PROFILES[sourceRoot].sourceGroups
export const sourceProofFile = PROFILES[sourceRoot].sourceProofFile
export const sourceProofFileSHA256 = PROFILES[sourceRoot].sourceProofFileSHA256
export const sourcePayloadSHA256 = PROFILES[sourceRoot].FULL_PAYLOAD_SHA256
export const supportedWholeRoots = Object.freeze(Object.keys(PROFILES))
export const wholeSourceIdentities = deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root,p])=>[root,{root,file:p.sourceProofFile,fileSHA256:p.sourceProofFileSHA256}])))
export const sourceGroupsByWhole = deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root,p])=>[root,p.sourceGroups])))
export const nativeOrderReviewed = 0
export const sourceWholeEligibility = 'unreviewed'
export const candidateStrokeCounts = deepFreeze(Object.fromEntries(Object.entries(PROFILES).map(([root,p])=>[root,p.sourceGroups.length])))
