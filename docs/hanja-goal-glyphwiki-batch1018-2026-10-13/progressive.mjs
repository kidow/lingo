export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// Provisional source-only review compiler. Domestic order and browser approval are pending.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const endpoint = (call) => call.args.slice(call.kind === 'cdDrawLine' ? 2 : call.kind === 'cdDrawCurve' ? 4 : 6, call.kind === 'cdDrawLine' ? 4 : call.kind === 'cdDrawCurve' ? 6 : 8)
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })


function createPinnedCompiler(pins) {
const {sourceRoot,sourceProofFile,sourceProofFileSha256,sourceHeaderFile,sourceHeaderFileSha256,sourceMetadataFile,sourceMetadataFileSha256,SELECTED_PROOF_IDENTITY,ORIGINAL_PROOF_KEYS,PROOF_SHA256,FULL_SOURCE_HEADER,sourceGroups,RAW_COUNT,ORIGINAL,TRACE_SHA256,GROUPS_SHA256,PINNED_DEFAULTS,ENGINE_REVISION,ENGINE_HASHES,UP_TAIL_GROUPS,LEFT_TAIL_GROUPS,SINGLE_CARDINAL_TIP_RAW}=pins;
const ORIGINAL_SOURCE_GROUPS=structuredClone(sourceGroups);
function compileProgressive(trace, proof, identity) {
  validateSelectedProof(trace, proof, identity)
  assert.deepEqual(sourceGroups, ORIGINAL_SOURCE_GROUPS, "Pinned numeric source grouping; no native order approval")
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
  return outlines
}


function validateSelectedProof(trace, proof, identity) {
  assert.deepEqual(identity, SELECTED_PROOF_IDENTITY, 'Selected source root, proof file and exact file SHA are pinned')
  const bytes = readFileSync(new URL(sourceProofFile, import.meta.url))
  assert.equal(createHash('sha256').update(bytes).digest('hex'), sourceProofFileSha256, 'Pinned source proof file SHA256')
  const headerBytes = readFileSync(new URL(sourceHeaderFile, import.meta.url))
  assert.equal(createHash('sha256').update(headerBytes).digest('hex'), sourceHeaderFileSha256, 'Pinned full engine header file SHA256')
  const sourceBytes = readFileSync(new URL(sourceMetadataFile, import.meta.url))
  assert.equal(createHash('sha256').update(sourceBytes).digest('hex'), sourceMetadataFileSha256, 'Pinned original source metadata file SHA256')
  assert.deepEqual(Object.keys(proof).sort(), ORIGINAL_PROOF_KEYS, 'Complete engine header and original proof keys are pinned')
  assert.equal(digest(proof), PROOF_SHA256, 'Entire selected proof, including full header, remains unchanged')
  assert.equal(digest(trace), TRACE_SHA256)
  assert.equal(digest(proof.groups), GROUPS_SHA256)
  assert.deepEqual(Object.fromEntries(Object.entries(proof).filter(([key]) => key !== 'trace' && key !== 'groups')), FULL_SOURCE_HEADER)
  assert.deepEqual(proof.defaults, PINNED_DEFAULTS)
  assert.equal(proof.engineRevision, ENGINE_REVISION)
  assert.deepEqual(proof.engineHashes, ENGINE_HASHES)
}

return {compileProgressive,sourceGroups};
}
const CASES=[{"sourceRoot":"u66b3-ue0104","sourceProofFile":"./engine-whole-u66b3-ue0104.json","sourceProofFileSha256":"3294e68ca3e0c689474c1b68a38bbd95752b2360097fc6d5e1327cf2e21a2bd3","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"a30a05738c2ea0963b3a17d432abffcc2da987d8be9cf1c2592810a76250593b","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"edea92a8e1b8b7f3561a22a6435c291c6fe2662f7b5fc2865f325a32fa4486d3","SELECTED_PROOF_IDENTITY":{"sourceRoot":"u66b3-ue0104","sourceProofFile":"./engine-whole-u66b3-ue0104.json","sourceProofFileSha256":"3294e68ca3e0c689474c1b68a38bbd95752b2360097fc6d5e1327cf2e21a2bd3","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"a30a05738c2ea0963b3a17d432abffcc2da987d8be9cf1c2592810a76250593b","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"edea92a8e1b8b7f3561a22a6435c291c6fe2662f7b5fc2865f325a32fa4486d3"},"ORIGINAL_PROOF_KEYS":["defaults","engineHashes","engineRevision","groups","trace"],"PROOF_SHA256":"29909b7a919b49e804c86f22098aa143232bd444093d3ecffc83331c7ad25002","FULL_SOURCE_HEADER":{"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}},"sourceGroups":[[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16]],"RAW_COUNT":17,"ORIGINAL":[[{"kind":"cdDrawLine","args":[24.890900000000002,37.56,24.890900000000002,150.44,12,13]}],[{"kind":"cdDrawLine","args":[24.890900000000002,37.56,57.739099999999986,37.56,2,2]}],[{"kind":"cdDrawLine","args":[57.739099999999986,37.56,57.739099999999986,150.44,22,23]}],[{"kind":"cdDrawLine","args":[24.890900000000002,92.34,57.739099999999986,92.34,2,2]}],[{"kind":"cdDrawLine","args":[24.890900000000002,150.44,57.739099999999986,150.44,2,2]}],[{"kind":"cdDrawLine","args":[71.53595,35.07,125.965325,35.07,0,100]}],[{"kind":"cdDrawLine","args":[74.43885,60.15,123.78815,60.15,0,200]}],[{"kind":"cdDrawLine","args":[99.11349999999999,14.55,99.11349999999999,112.02,0,200]}],[{"kind":"cdDrawCurve","args":[69.35877500000001,97.2,93.3077,88.65,126.69104999999999,72.69,0,7]}],[{"kind":"cdDrawLine","args":[129.622979,35.07,185.097398,35.07,0,100]}],[{"kind":"cdDrawLine","args":[131.13248700000003,60.15,183.58789000000002,60.15,0,100]}],[{"kind":"cdDrawLine","args":[126.226586,86.37,188.871168,86.37,0,0]}],[{"kind":"cdDrawLine","args":[157.17149999999998,14.55,157.17149999999998,112.02,0,200]}],[{"kind":"cdDrawLine","args":[82.74,123,170.685,123,0,2]}],[{"kind":"cdDrawLine","args":[170.685,123,170.685,176,22,123]}],[{"kind":"cdDrawLine","args":[69.87,148,170.685,148,0,2]}],[{"kind":"cdDrawLine","args":[81.31,176,170.685,176,0,2]}]],"TRACE_SHA256":"a06fb4b2b23c2271ec9ae1533dd6e00235cae908d8eb5f46e6fcd4820beae33a","GROUPS_SHA256":"a3a63f2cf1010d238ccf53b66e463225a939dc83192fcfda5cb81065b583855b","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[0]},{"sourceRoot":"u66b3-ue0102","sourceProofFile":"./engine-whole-u66b3-ue0102.json","sourceProofFileSha256":"b9073c12291a789b346ff41645f2fad93e60a638e64aa765e95e4b04186b556b","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"a30a05738c2ea0963b3a17d432abffcc2da987d8be9cf1c2592810a76250593b","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"edea92a8e1b8b7f3561a22a6435c291c6fe2662f7b5fc2865f325a32fa4486d3","SELECTED_PROOF_IDENTITY":{"sourceRoot":"u66b3-ue0102","sourceProofFile":"./engine-whole-u66b3-ue0102.json","sourceProofFileSha256":"b9073c12291a789b346ff41645f2fad93e60a638e64aa765e95e4b04186b556b","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"a30a05738c2ea0963b3a17d432abffcc2da987d8be9cf1c2592810a76250593b","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"edea92a8e1b8b7f3561a22a6435c291c6fe2662f7b5fc2865f325a32fa4486d3"},"ORIGINAL_PROOF_KEYS":["defaults","engineHashes","engineRevision","groups","trace"],"PROOF_SHA256":"64a3c31b2f45f87539b61a3c61939fe7f438c60fb0e284ed89e00d330edf353f","FULL_SOURCE_HEADER":{"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}},"sourceGroups":[[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16]],"RAW_COUNT":17,"ORIGINAL":[[{"kind":"cdDrawLine","args":[24.02945,37.56,24.02945,150.44,12,13]}],[{"kind":"cdDrawLine","args":[24.02945,37.56,57.08554999999999,37.56,2,2]}],[{"kind":"cdDrawLine","args":[57.08554999999999,37.56,57.08554999999999,150.44,22,23]}],[{"kind":"cdDrawLine","args":[24.02945,92.34,57.08554999999999,92.34,2,2]}],[{"kind":"cdDrawLine","args":[24.02945,150.44,57.08554999999999,150.44,2,2]}],[{"kind":"cdDrawLine","args":[72,40,127,40,0,100]}],[{"kind":"cdDrawLine","args":[99,14,99,95,0,32]}],[{"kind":"cdDrawLine","args":[74,68,124,68,0,200]}],[{"kind":"cdDrawCurve","args":[70,105,96,98,132,86,0,7]}],[{"kind":"cdDrawLine","args":[130,40,186,40,0,100]}],[{"kind":"cdDrawLine","args":[156,14,156,99,0,32]}],[{"kind":"cdDrawLine","args":[130,68,184,68,0,100]}],[{"kind":"cdDrawLine","args":[124,99,188,99,0,0]}],[{"kind":"cdDrawLine","args":[80.96000000000001,122.24,166.765,122.24,0,2]}],[{"kind":"cdDrawLine","args":[166.765,122.24,166.765,177.9,22,223]}],[{"kind":"cdDrawLine","args":[84.235,148.46,166.765,148.46,0,2]}],[{"kind":"cdDrawLine","args":[79.65,177.9,166.765,177.9,0,2]}]],"TRACE_SHA256":"b4b29591cf361586cfb02ab486a4fd9aeab38e3b4859e36f681ec9a97e59826a","GROUPS_SHA256":"2c612c3454ad675a0c397663ed5d99106fd982ef0a2f87d04e5d83560c186807","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[0]},{"sourceRoot":"u66b3-ue0103","sourceProofFile":"./engine-whole-u66b3-ue0103.json","sourceProofFileSha256":"1dcbe92c881f5181a56c907709221a5f81ea778101413fbc3174ec988ea5b0a6","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"a30a05738c2ea0963b3a17d432abffcc2da987d8be9cf1c2592810a76250593b","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"edea92a8e1b8b7f3561a22a6435c291c6fe2662f7b5fc2865f325a32fa4486d3","SELECTED_PROOF_IDENTITY":{"sourceRoot":"u66b3-ue0103","sourceProofFile":"./engine-whole-u66b3-ue0103.json","sourceProofFileSha256":"1dcbe92c881f5181a56c907709221a5f81ea778101413fbc3174ec988ea5b0a6","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"a30a05738c2ea0963b3a17d432abffcc2da987d8be9cf1c2592810a76250593b","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"edea92a8e1b8b7f3561a22a6435c291c6fe2662f7b5fc2865f325a32fa4486d3"},"ORIGINAL_PROOF_KEYS":["defaults","engineHashes","engineRevision","groups","trace"],"PROOF_SHA256":"de757e0a2663ac9daece83f5f08806f1af9d491d32ad6b30829c4619248291bc","FULL_SOURCE_HEADER":{"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}},"sourceGroups":[[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16]],"RAW_COUNT":17,"ORIGINAL":[[{"kind":"cdDrawLine","args":[24.02945,37.56,24.02945,150.44,12,13]}],[{"kind":"cdDrawLine","args":[24.02945,37.56,57.08554999999999,37.56,2,2]}],[{"kind":"cdDrawLine","args":[57.08554999999999,37.56,57.08554999999999,150.44,22,23]}],[{"kind":"cdDrawLine","args":[24.02945,92.34,57.08554999999999,92.34,2,2]}],[{"kind":"cdDrawLine","args":[24.02945,150.44,57.08554999999999,150.44,2,2]}],[{"kind":"cdDrawLine","args":[70.63759999999999,35.07,125.44760000000001,35.07,0,100]}],[{"kind":"cdDrawLine","args":[73.5608,60.15,123.2552,60.15,0,200]}],[{"kind":"cdDrawLine","args":[98.408,14.55,98.408,112.02,0,200]}],[{"kind":"cdDrawCurve","args":[68.4452,97.2,92.5616,88.65,126.1784,72.69,0,7]}],[{"kind":"cdDrawLine","args":[129.130832,35.07,184.993184,35.07,0,100]}],[{"kind":"cdDrawLine","args":[130.65089600000002,60.15,183.47312000000002,60.15,0,100]}],[{"kind":"cdDrawLine","args":[125.71068799999999,86.37,188.793344,86.37,0,0]}],[{"kind":"cdDrawLine","args":[156.87199999999999,14.55,156.87199999999999,112.02,0,200]}],[{"kind":"cdDrawLine","args":[81.9776,123.36,170.6384,123.36,0,2]}],[{"kind":"cdDrawLine","args":[170.6384,123.36,170.6384,176.6,22,223]}],[{"kind":"cdDrawLine","args":[85.3616,148.44,170.6384,148.44,0,2]}],[{"kind":"cdDrawLine","args":[80.624,176.6,170.6384,176.6,0,2]}]],"TRACE_SHA256":"dfe0a586db3092a8967b2aff03656061115dc97b9564a570ccc4f6eeb346e4ab","GROUPS_SHA256":"9e32264f7ecd2e5aac67d70b24b17a1c93c6ff372a785c8afde8cb97f20d788d","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[0]},{"sourceRoot":"u66b3-k","sourceProofFile":"./engine-whole-u66b3-k.json","sourceProofFileSha256":"c3a8f2b42ff78822a83582069894151066583c77338daaa44088c871d612e12a","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"a30a05738c2ea0963b3a17d432abffcc2da987d8be9cf1c2592810a76250593b","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"edea92a8e1b8b7f3561a22a6435c291c6fe2662f7b5fc2865f325a32fa4486d3","SELECTED_PROOF_IDENTITY":{"sourceRoot":"u66b3-k","sourceProofFile":"./engine-whole-u66b3-k.json","sourceProofFileSha256":"c3a8f2b42ff78822a83582069894151066583c77338daaa44088c871d612e12a","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"a30a05738c2ea0963b3a17d432abffcc2da987d8be9cf1c2592810a76250593b","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"edea92a8e1b8b7f3561a22a6435c291c6fe2662f7b5fc2865f325a32fa4486d3"},"ORIGINAL_PROOF_KEYS":["defaults","engineHashes","engineRevision","groups","trace"],"PROOF_SHA256":"2860ac0036ab6801d82b2ba94ab752c4b40281e034160253264a2e9f8b4a1608","FULL_SOURCE_HEADER":{"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}},"sourceGroups":[[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16]],"RAW_COUNT":17,"ORIGINAL":[[{"kind":"cdDrawLine","args":[25.354650000000003,37.56,25.354650000000003,150.44,12,13]}],[{"kind":"cdDrawLine","args":[25.354650000000003,37.56,63.40034999999999,37.56,2,2]}],[{"kind":"cdDrawLine","args":[63.40034999999999,37.56,63.40034999999999,150.44,22,23]}],[{"kind":"cdDrawLine","args":[25.354650000000003,92.34,63.40034999999999,92.34,2,2]}],[{"kind":"cdDrawLine","args":[25.354650000000003,150.44,63.40034999999999,150.44,2,2]}],[{"kind":"cdDrawLine","args":[76.385,38.239999999999995,125.705,38.239999999999995,0,200]}],[{"kind":"cdDrawLine","args":[77.755,63.08,124.335,63.08,0,200]}],[{"kind":"cdDrawLine","args":[72.96000000000001,87.92,128.445,87.92,0,100]}],[{"kind":"cdDrawLine","args":[101.72999999999998,15.559999999999997,101.72999999999998,108.44,0,300]}],[{"kind":"cdDrawLine","args":[135.29500000000002,38.239999999999995,184.615,38.239999999999995,0,200]}],[{"kind":"cdDrawLine","args":[136.66500000000002,63.08,183.245,63.08,0,200]}],[{"kind":"cdDrawLine","args":[133.24,87.92,188.04000000000005,87.92,0,100]}],[{"kind":"cdDrawLine","args":[159.26999999999998,15.559999999999997,159.26999999999998,108.44,0,300]}],[{"kind":"cdDrawLine","args":[90.1124,118.86,164.476,118.86,0,2]}],[{"kind":"cdDrawLine","args":[164.476,118.86,164.476,177.74,22,223]}],[{"kind":"cdDrawLine","args":[76.248,147.38,185.90279999999998,147.38,0,300]}],[{"kind":"cdDrawLine","args":[88.852,177.74,164.476,177.74,0,2]}]],"TRACE_SHA256":"0f7d1dd59c51b5be0b542d733458b93a0431d2fa28a7ee1b68f64d2d87156d32","GROUPS_SHA256":"f9b4389b7632f8fe84d04f3627b2f73e376f675976d61f5e86fa08d6d2ef0c31","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[0]},{"sourceRoot":"u66b3-t","sourceProofFile":"./engine-whole-u66b3-t.json","sourceProofFileSha256":"69866d06ca354f32f8850b95b5a1c144e50ab7fec4475783fbe8b718b03653b2","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"a30a05738c2ea0963b3a17d432abffcc2da987d8be9cf1c2592810a76250593b","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"edea92a8e1b8b7f3561a22a6435c291c6fe2662f7b5fc2865f325a32fa4486d3","SELECTED_PROOF_IDENTITY":{"sourceRoot":"u66b3-t","sourceProofFile":"./engine-whole-u66b3-t.json","sourceProofFileSha256":"69866d06ca354f32f8850b95b5a1c144e50ab7fec4475783fbe8b718b03653b2","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"a30a05738c2ea0963b3a17d432abffcc2da987d8be9cf1c2592810a76250593b","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"edea92a8e1b8b7f3561a22a6435c291c6fe2662f7b5fc2865f325a32fa4486d3"},"ORIGINAL_PROOF_KEYS":["defaults","engineHashes","engineRevision","groups","trace"],"PROOF_SHA256":"644c9eb6e8821ad7f1d36eccd3ccca45bc534181c8dbac2b239704f5e2e25e61","FULL_SOURCE_HEADER":{"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}},"sourceGroups":[[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16]],"RAW_COUNT":17,"ORIGINAL":[[{"kind":"cdDrawLine","args":[25.354650000000003,37.56,25.354650000000003,150.44,12,13]}],[{"kind":"cdDrawLine","args":[25.354650000000003,37.56,63.40034999999999,37.56,2,2]}],[{"kind":"cdDrawLine","args":[63.40034999999999,37.56,63.40034999999999,150.44,22,23]}],[{"kind":"cdDrawLine","args":[25.354650000000003,92.34,63.40034999999999,92.34,2,2]}],[{"kind":"cdDrawLine","args":[25.354650000000003,150.44,63.40034999999999,150.44,2,2]}],[{"kind":"cdDrawLine","args":[76.385,38.239999999999995,125.705,38.239999999999995,0,200]}],[{"kind":"cdDrawLine","args":[77.755,63.08,124.33500000000001,63.08,0,200]}],[{"kind":"cdDrawLine","args":[72.96000000000001,87.92,128.445,87.92,0,100]}],[{"kind":"cdDrawLine","args":[101.72999999999999,15.559999999999997,101.72999999999999,108.44,0,300]}],[{"kind":"cdDrawLine","args":[135.29500000000002,38.239999999999995,184.615,38.239999999999995,0,200]}],[{"kind":"cdDrawLine","args":[136.66500000000002,63.08,183.245,63.08,0,200]}],[{"kind":"cdDrawLine","args":[133.24,87.92,188.04000000000002,87.92,0,100]}],[{"kind":"cdDrawLine","args":[159.26999999999998,15.559999999999997,159.26999999999998,108.44,0,300]}],[{"kind":"cdDrawLine","args":[90.1124,118.86,164.476,118.86,0,2]}],[{"kind":"cdDrawLine","args":[164.476,118.86,164.476,177.74,22,223]}],[{"kind":"cdDrawLine","args":[76.248,147.38,185.90279999999998,147.38,0,300]}],[{"kind":"cdDrawLine","args":[88.852,177.74,164.476,177.74,0,2]}]],"TRACE_SHA256":"484d824e0d362fcdfbcfa6e01ac9a7a76da580dc30d4ff989a1b7e053f41875e","GROUPS_SHA256":"dcdbcd1558914a49aec22b767dbc5b7e081ba2eeddc9d8c6a87a1f827eeaf531","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[0]}];
const READY=new Map(CASES.map(pins=>[pins.sourceRoot,createPinnedCompiler(pins)]));
const PRIMARY=CASES[0];
export const sourceRoot=PRIMARY.sourceRoot;
export const sourceProofFile=PRIMARY.sourceProofFile;
export const sourceProofFileSha256=PRIMARY.sourceProofFileSha256;
export const selectedProofIdentity=structuredClone(PRIMARY.SELECTED_PROOF_IDENTITY);
export const sourceGroups=READY.get(sourceRoot).sourceGroups;
export const wholeSourceIdentities=Object.fromEntries(CASES.map(p=>[p.sourceRoot,structuredClone(p.SELECTED_PROOF_IDENTITY)]));
export function compileSourceWhole(root,trace,proof,identity){assert(identity&&identity.sourceRoot===root,"Explicit root and pinned file identity must agree");return compileProgressive(trace,proof,identity);}
export const sourceProofFileSHA256=PRIMARY.sourceProofFileSha256;
export const candidateWholeProofs=CASES.map(p=>({identity:structuredClone(p.SELECTED_PROOF_IDENTITY),sourceGroups:structuredClone(p.sourceGroups)}));
export const approvalStatus="candidate-native-review-pending";
export const nativeApproved=false;
export const runtimeApplied=false;
export function compileProgressive(trace,proof,identity){assert(identity&&typeof identity.sourceRoot==="string","Explicit pinned whole file identity is required");const selected=READY.get(identity.sourceRoot);assert(selected,"No implicit whole substitution");return selected.compileProgressive(trace,proof,identity);}
