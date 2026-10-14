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
const CASES=[{"sourceRoot":"u7501","sourceProofFile":"./engine-whole-u7501.json","sourceProofFileSha256":"57611d1aeab7aead8768e14853b032835b7e9ccf68665d1f5be40a5564ef6aac","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"26f09ae3a7a0b061263fd1db19d9726a78242b8c1def9818867b4431ce6d6fed","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"51fbf6fc927fe1826f8783ccfeb35763c0ca50bf341f82acb3f08a773793b571","SELECTED_PROOF_IDENTITY":{"sourceRoot":"u7501","sourceProofFile":"./engine-whole-u7501.json","sourceProofFileSha256":"57611d1aeab7aead8768e14853b032835b7e9ccf68665d1f5be40a5564ef6aac","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"26f09ae3a7a0b061263fd1db19d9726a78242b8c1def9818867b4431ce6d6fed","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"51fbf6fc927fe1826f8783ccfeb35763c0ca50bf341f82acb3f08a773793b571"},"ORIGINAL_PROOF_KEYS":["defaults","engineHashes","engineRevision","groups","trace"],"PROOF_SHA256":"117445bc7f6eee739daaa67766eb1992d12a10b424d6b715cbe5f04455ee075e","FULL_SOURCE_HEADER":{"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}},"sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11,12],[13]],"RAW_COUNT":14,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[47.71,15,40.85,32,28.11,53,0,7]}],[{"kind":"cdDrawLine","args":[18.8,53,56.53,53,0,100]}],[{"kind":"cdDrawCurve","args":[16.35,123,39.870000000000005,111,60.45,94,0,7]}],[{"kind":"cdDrawLine","args":[41.34,53,41.34,99,32,1]},{"kind":"cdDrawCurve","args":[41.34,99,41.34,157,19.78,187,1,7]}],[{"kind":"cdDrawCurve","args":[85.93,16,79.07,33,68.78,53,0,7]}],[{"kind":"cdDrawLine","args":[59.47,53,97.2,53,0,100]}],[{"kind":"cdDrawLine","args":[56.04,110,100.63,110,0,200]}],[{"kind":"cdDrawLine","args":[75.15,53,75.15,185,32,0]}],[{"kind":"cdDrawLine","args":[98.12,29,183.48,29,0,0]}],[{"kind":"cdDrawLine","args":[123.34,30,116.55,169,32,32]}],[{"kind":"cdDrawCurve","args":[93.27,180,118.49,171,152.44,159,0,7]}],[{"kind":"cdDrawLine","args":[121.4,69,162.14,69,2,2]}],[{"kind":"cdDrawCurve","args":[162.14,69,153.41,173,183.48,177,22,15]}],[{"kind":"cdDrawCurve","args":[129.16,93,141.77,108,144.68,133,7,8]}]],"TRACE_SHA256":"6985b9db2b44824c9f8ebed47e163db5a688fd9a84b1efca2096b9ddee026d87","GROUPS_SHA256":"b1a7fd17fd246e2d2f1ad7f0d2b860db75e1a05062935884c84448b4df2cc452","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[]},{"sourceRoot":"u7501-k","sourceProofFile":"./engine-whole-u7501-k.json","sourceProofFileSha256":"421ea7facc14f02f0ffa9bbd3471d24a8cf351a135717ed3330171025f138758","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"26f09ae3a7a0b061263fd1db19d9726a78242b8c1def9818867b4431ce6d6fed","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"51fbf6fc927fe1826f8783ccfeb35763c0ca50bf341f82acb3f08a773793b571","SELECTED_PROOF_IDENTITY":{"sourceRoot":"u7501-k","sourceProofFile":"./engine-whole-u7501-k.json","sourceProofFileSha256":"421ea7facc14f02f0ffa9bbd3471d24a8cf351a135717ed3330171025f138758","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"26f09ae3a7a0b061263fd1db19d9726a78242b8c1def9818867b4431ce6d6fed","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"51fbf6fc927fe1826f8783ccfeb35763c0ca50bf341f82acb3f08a773793b571"},"ORIGINAL_PROOF_KEYS":["defaults","engineHashes","engineRevision","groups","trace"],"PROOF_SHA256":"2c61582897c1055dc924ca52e79f3357635b0127fd2c54eade5bbee9d89d80e9","FULL_SOURCE_HEADER":{"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}},"sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11,12],[13]],"RAW_COUNT":14,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[49.685,15,42.475,32,29.085,53,0,7]}],[{"kind":"cdDrawLine","args":[19.3,53,58.955,53,0,100]}],[{"kind":"cdDrawCurve","args":[16.725,123,41.445,111,63.075,94,0,7]}],[{"kind":"cdDrawLine","args":[42.99,53,42.99,99,32,1]},{"kind":"cdDrawCurve","args":[42.99,99,42.99,157,20.33,187,1,7]}],[{"kind":"cdDrawCurve","args":[89.855,16,82.645,33,71.83,53,0,7]}],[{"kind":"cdDrawLine","args":[62.045,53,101.7,53,0,100]}],[{"kind":"cdDrawLine","args":[58.44,110,105.305,110,0,100]}],[{"kind":"cdDrawLine","args":[78.525,53,78.525,185,32,0]}],[{"kind":"cdDrawLine","args":[101.2,31,184.8,31,0,0]}],[{"kind":"cdDrawLine","args":[125.9,32,119.25,171,32,32]}],[{"kind":"cdDrawCurve","args":[96.45,182,121.15,173,154.4,161,0,7]}],[{"kind":"cdDrawLine","args":[124,71,163.9,71,2,2]}],[{"kind":"cdDrawLine","args":[163.9,71,163.03795956010083,169.00038685169338,22,1]},{"kind":"cdDrawCurve","args":[163.03795956010083,169.00038685169338,162.95,179,172.95,179,1,1]},{"kind":"cdDrawLine","args":[172.95,179,183.85,179,6,5]}],[{"kind":"cdDrawCurve","args":[131.6,95,143.95,110,146.8,135,7,8]}]],"TRACE_SHA256":"df5baf9957f9cfc117b55bbfb925ed58bbd963ac7e371161afb285252ac0004e","GROUPS_SHA256":"0f895cac5f20d5bbf860c021b480f934ef21d906a53bd8cbaddae793299d03e7","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"UP_TAIL_GROUPS":[[11,12]],"LEFT_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[]},{"sourceRoot":"u7501-ue0100","sourceProofFile":"./engine-whole-u7501-ue0100.json","sourceProofFileSha256":"57611d1aeab7aead8768e14853b032835b7e9ccf68665d1f5be40a5564ef6aac","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"26f09ae3a7a0b061263fd1db19d9726a78242b8c1def9818867b4431ce6d6fed","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"51fbf6fc927fe1826f8783ccfeb35763c0ca50bf341f82acb3f08a773793b571","SELECTED_PROOF_IDENTITY":{"sourceRoot":"u7501-ue0100","sourceProofFile":"./engine-whole-u7501-ue0100.json","sourceProofFileSha256":"57611d1aeab7aead8768e14853b032835b7e9ccf68665d1f5be40a5564ef6aac","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"26f09ae3a7a0b061263fd1db19d9726a78242b8c1def9818867b4431ce6d6fed","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"51fbf6fc927fe1826f8783ccfeb35763c0ca50bf341f82acb3f08a773793b571"},"ORIGINAL_PROOF_KEYS":["defaults","engineHashes","engineRevision","groups","trace"],"PROOF_SHA256":"117445bc7f6eee739daaa67766eb1992d12a10b424d6b715cbe5f04455ee075e","FULL_SOURCE_HEADER":{"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}},"sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11,12],[13]],"RAW_COUNT":14,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[47.71,15,40.85,32,28.11,53,0,7]}],[{"kind":"cdDrawLine","args":[18.8,53,56.53,53,0,100]}],[{"kind":"cdDrawCurve","args":[16.35,123,39.870000000000005,111,60.45,94,0,7]}],[{"kind":"cdDrawLine","args":[41.34,53,41.34,99,32,1]},{"kind":"cdDrawCurve","args":[41.34,99,41.34,157,19.78,187,1,7]}],[{"kind":"cdDrawCurve","args":[85.93,16,79.07,33,68.78,53,0,7]}],[{"kind":"cdDrawLine","args":[59.47,53,97.2,53,0,100]}],[{"kind":"cdDrawLine","args":[56.04,110,100.63,110,0,200]}],[{"kind":"cdDrawLine","args":[75.15,53,75.15,185,32,0]}],[{"kind":"cdDrawLine","args":[98.12,29,183.48,29,0,0]}],[{"kind":"cdDrawLine","args":[123.34,30,116.55,169,32,32]}],[{"kind":"cdDrawCurve","args":[93.27,180,118.49,171,152.44,159,0,7]}],[{"kind":"cdDrawLine","args":[121.4,69,162.14,69,2,2]}],[{"kind":"cdDrawCurve","args":[162.14,69,153.41,173,183.48,177,22,15]}],[{"kind":"cdDrawCurve","args":[129.16,93,141.77,108,144.68,133,7,8]}]],"TRACE_SHA256":"6985b9db2b44824c9f8ebed47e163db5a688fd9a84b1efca2096b9ddee026d87","GROUPS_SHA256":"b1a7fd17fd246e2d2f1ad7f0d2b860db75e1a05062935884c84448b4df2cc452","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[]},{"sourceRoot":"u7501-ue0101","sourceProofFile":"./engine-whole-u7501-ue0101.json","sourceProofFileSha256":"57611d1aeab7aead8768e14853b032835b7e9ccf68665d1f5be40a5564ef6aac","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"26f09ae3a7a0b061263fd1db19d9726a78242b8c1def9818867b4431ce6d6fed","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"51fbf6fc927fe1826f8783ccfeb35763c0ca50bf341f82acb3f08a773793b571","SELECTED_PROOF_IDENTITY":{"sourceRoot":"u7501-ue0101","sourceProofFile":"./engine-whole-u7501-ue0101.json","sourceProofFileSha256":"57611d1aeab7aead8768e14853b032835b7e9ccf68665d1f5be40a5564ef6aac","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"26f09ae3a7a0b061263fd1db19d9726a78242b8c1def9818867b4431ce6d6fed","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"51fbf6fc927fe1826f8783ccfeb35763c0ca50bf341f82acb3f08a773793b571"},"ORIGINAL_PROOF_KEYS":["defaults","engineHashes","engineRevision","groups","trace"],"PROOF_SHA256":"117445bc7f6eee739daaa67766eb1992d12a10b424d6b715cbe5f04455ee075e","FULL_SOURCE_HEADER":{"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}},"sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11,12],[13]],"RAW_COUNT":14,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[47.71,15,40.85,32,28.11,53,0,7]}],[{"kind":"cdDrawLine","args":[18.8,53,56.53,53,0,100]}],[{"kind":"cdDrawCurve","args":[16.35,123,39.870000000000005,111,60.45,94,0,7]}],[{"kind":"cdDrawLine","args":[41.34,53,41.34,99,32,1]},{"kind":"cdDrawCurve","args":[41.34,99,41.34,157,19.78,187,1,7]}],[{"kind":"cdDrawCurve","args":[85.93,16,79.07,33,68.78,53,0,7]}],[{"kind":"cdDrawLine","args":[59.47,53,97.2,53,0,100]}],[{"kind":"cdDrawLine","args":[56.04,110,100.63,110,0,200]}],[{"kind":"cdDrawLine","args":[75.15,53,75.15,185,32,0]}],[{"kind":"cdDrawLine","args":[98.12,29,183.48,29,0,0]}],[{"kind":"cdDrawLine","args":[123.34,30,116.55,169,32,32]}],[{"kind":"cdDrawCurve","args":[93.27,180,118.49,171,152.44,159,0,7]}],[{"kind":"cdDrawLine","args":[121.4,69,162.14,69,2,2]}],[{"kind":"cdDrawCurve","args":[162.14,69,153.41,173,183.48,177,22,15]}],[{"kind":"cdDrawCurve","args":[129.16,93,141.77,108,144.68,133,7,8]}]],"TRACE_SHA256":"6985b9db2b44824c9f8ebed47e163db5a688fd9a84b1efca2096b9ddee026d87","GROUPS_SHA256":"b1a7fd17fd246e2d2f1ad7f0d2b860db75e1a05062935884c84448b4df2cc452","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[]},{"sourceRoot":"u7501-ue0102","sourceProofFile":"./engine-whole-u7501-ue0102.json","sourceProofFileSha256":"4d4b91715f066d63087a3abef0bf0639cfe6beff33ad116084b7bc648f46eb6c","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"26f09ae3a7a0b061263fd1db19d9726a78242b8c1def9818867b4431ce6d6fed","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"51fbf6fc927fe1826f8783ccfeb35763c0ca50bf341f82acb3f08a773793b571","SELECTED_PROOF_IDENTITY":{"sourceRoot":"u7501-ue0102","sourceProofFile":"./engine-whole-u7501-ue0102.json","sourceProofFileSha256":"4d4b91715f066d63087a3abef0bf0639cfe6beff33ad116084b7bc648f46eb6c","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"26f09ae3a7a0b061263fd1db19d9726a78242b8c1def9818867b4431ce6d6fed","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"51fbf6fc927fe1826f8783ccfeb35763c0ca50bf341f82acb3f08a773793b571"},"ORIGINAL_PROOF_KEYS":["defaults","engineHashes","engineRevision","groups","trace"],"PROOF_SHA256":"a18be1461fb26c73709e4c7710dc65fd5906566585671748d4d3eeb76131a302","FULL_SOURCE_HEADER":{"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}},"sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11,12],[13]],"RAW_COUNT":14,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[47.71,15,40.85,32,28.11,53,0,7]}],[{"kind":"cdDrawLine","args":[18.8,53,56.53,53,0,100]}],[{"kind":"cdDrawCurve","args":[16.35,123,39.870000000000005,111,60.45,94,0,7]}],[{"kind":"cdDrawLine","args":[41.34,53,41.34,99,32,1]},{"kind":"cdDrawCurve","args":[41.34,99,41.34,157,19.78,187,1,7]}],[{"kind":"cdDrawCurve","args":[85.93,16,79.07,33,68.78,53,0,7]}],[{"kind":"cdDrawLine","args":[59.47,53,97.2,53,0,100]}],[{"kind":"cdDrawLine","args":[56.04,110,100.63,110,0,200]}],[{"kind":"cdDrawLine","args":[75.15,53,75.15,185,32,0]}],[{"kind":"cdDrawLine","args":[98.12,29,183.48,29,0,0]}],[{"kind":"cdDrawLine","args":[123.34,30,116.55,169,32,32]}],[{"kind":"cdDrawCurve","args":[93.27,180,118.49,171,152.44,159,0,7]}],[{"kind":"cdDrawLine","args":[121.4,69,162.14,69,2,2]}],[{"kind":"cdDrawLine","args":[162.14,69,161.2598111924877,167.00040331064778,22,1]},{"kind":"cdDrawCurve","args":[161.2598111924877,167.00040331064778,161.17,177,171.17,177,1,1]},{"kind":"cdDrawLine","args":[171.17,177,182.51,177,6,5]}],[{"kind":"cdDrawCurve","args":[129.16,93,141.77,108,144.68,133,7,8]}]],"TRACE_SHA256":"77e3591fef7e76c2353dfb59f1da71a2350b80ed27cc78be4116f903f2ca039e","GROUPS_SHA256":"7600dc6991a76dbf122c1cae2c474c69f4e712fc19a472236927d1c73cb4ac77","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"UP_TAIL_GROUPS":[[11,12]],"LEFT_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[]}];
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
export const approvalStatus="candidate-shape-attribution-pending";
export const nativeApproved=false;
export const runtimeApplied=false;
export function compileProgressive(trace,proof,identity){assert(identity&&typeof identity.sourceRoot==="string","Explicit pinned whole file identity is required");const selected=READY.get(identity.sourceRoot);assert(selected,"No implicit whole substitution");return selected.compileProgressive(trace,proof,identity);}
