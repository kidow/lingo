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
const CASES=[{"sourceRoot":"u85e9","sourceProofFile":"./engine-whole-u85e9.json","sourceProofFileSha256":"e743916c6b79f5fc1afd4903a6d79410299484b3915451847e218b7f77095d06","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"eebcd74fbc94019cc17e3206e62c35c2e702113ccc6ab443267e4a31349ad41a","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"ab178828883f1da6d8f8926bfbfea3aeb3360e1d6a9c850667a235ceabf0a58a","SELECTED_PROOF_IDENTITY":{"sourceRoot":"u85e9","sourceProofFile":"./engine-whole-u85e9.json","sourceProofFileSha256":"e743916c6b79f5fc1afd4903a6d79410299484b3915451847e218b7f77095d06","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"eebcd74fbc94019cc17e3206e62c35c2e702113ccc6ab443267e4a31349ad41a","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"ab178828883f1da6d8f8926bfbfea3aeb3360e1d6a9c850667a235ceabf0a58a"},"ORIGINAL_PROOF_KEYS":["defaults","engineHashes","engineRevision","groups","trace"],"PROOF_SHA256":"ea9800309c9f81850e3b59f19eb17f392b5ef2357e90ffa5bd4e1aff93736feb","FULL_SOURCE_HEADER":{"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}},"sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15,16],[17],[18],[19]],"RAW_COUNT":20,"ORIGINAL":[[{"kind":"cdDrawLine","args":[13,33.614999999999995,187,33.614999999999995,0,0]}],[{"kind":"cdDrawLine","args":[72,13.205,72,53.24,0,300]}],[{"kind":"cdDrawLine","args":[128,13.205,128,53.24,0,300]}],[{"kind":"cdDrawCurve","args":[28.18,55.8,47.68,61.33,56.26,72.39,7,8]}],[{"kind":"cdDrawCurve","args":[13.36,92.14,34.42,97.67,42.22,108.73,7,8]}],[{"kind":"cdDrawCurve","args":[14.92,145.07,42.22,152.18,39.1,185.36,7,8]}],[{"kind":"cdDrawCurve","args":[35.2,158.5,38.32,149.01999999999998,71.08,92.93,32,7]}],[{"kind":"cdDrawCurve","args":[168.36,57.86,136.72,65.56,71.18,70.18,0,7]}],[{"kind":"cdDrawCurve","args":[87,73.26,98.3,79.42,103.94999999999999,91.74000000000001,7,8]}],[{"kind":"cdDrawCurve","args":[163.84,71.72,154.8,84.03999999999999,143.5,96.36,0,7]}],[{"kind":"cdDrawLine","args":[71.18,97.9,185.31,97.9,0,0]}],[{"kind":"cdDrawLine","args":[127.68,67.1,127.68,131.01,32,0]}],[{"kind":"cdDrawCurve","args":[119.77000000000001,97.9,100.56,121.77,66.66,134.86,132,7]}],[{"kind":"cdDrawCurve","args":[132.2,97.9,157.06,117.92,178.53,126.39,7,0]}],[{"kind":"cdDrawLine","args":[88.3108,136.04579999999999,88.3108,178.0878,12,213]}],[{"kind":"cdDrawLine","args":[88.3108,136.04579999999999,167.0492,136.04579999999999,2,2]}],[{"kind":"cdDrawLine","args":[167.0492,136.04579999999999,167.0492,178.0878,22,223]}],[{"kind":"cdDrawLine","args":[127.68,136.04579999999999,127.68,178.0878,32,32]}],[{"kind":"cdDrawLine","args":[88.3108,156.7434,167.0492,156.7434,2,2]}],[{"kind":"cdDrawLine","args":[88.3108,178.0878,167.0492,178.0878,2,2]}]],"TRACE_SHA256":"7ef823d507eb7f1da719bcfa389087f6722abb1d7b13742c36fbc38819b03c6b","GROUPS_SHA256":"5a7fa6f60d6c790f3017b17e098113eff7a452ea65dd5f8a14f3649b2a9a0ac7","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[14]},{"sourceRoot":"u85e9-ue0100","sourceProofFile":"./engine-whole-u85e9-ue0100.json","sourceProofFileSha256":"048196c632f9a5a9696b23f51d313c9f1f19e7b439d2dbe53f2f43d011ff7bff","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"eebcd74fbc94019cc17e3206e62c35c2e702113ccc6ab443267e4a31349ad41a","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"ab178828883f1da6d8f8926bfbfea3aeb3360e1d6a9c850667a235ceabf0a58a","SELECTED_PROOF_IDENTITY":{"sourceRoot":"u85e9-ue0100","sourceProofFile":"./engine-whole-u85e9-ue0100.json","sourceProofFileSha256":"048196c632f9a5a9696b23f51d313c9f1f19e7b439d2dbe53f2f43d011ff7bff","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"eebcd74fbc94019cc17e3206e62c35c2e702113ccc6ab443267e4a31349ad41a","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"ab178828883f1da6d8f8926bfbfea3aeb3360e1d6a9c850667a235ceabf0a58a"},"ORIGINAL_PROOF_KEYS":["defaults","engineHashes","engineRevision","groups","trace"],"PROOF_SHA256":"c415d9f9a50eb87a9efef12708c3ff95d89f0110dcd0012d3261973f0ee7105a","FULL_SOURCE_HEADER":{"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}},"sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15,16],[17],[18],[19]],"RAW_COUNT":20,"ORIGINAL":[[{"kind":"cdDrawLine","args":[13,33.614999999999995,187,33.614999999999995,0,0]}],[{"kind":"cdDrawLine","args":[72,13.205,72,53.24,0,300]}],[{"kind":"cdDrawLine","args":[128,13.205,128,53.24,0,300]}],[{"kind":"cdDrawCurve","args":[28.18,55.8,47.68,61.33,56.26,72.39,7,8]}],[{"kind":"cdDrawCurve","args":[13.36,92.14,34.42,97.67,42.22,108.73,7,8]}],[{"kind":"cdDrawCurve","args":[14.92,145.07,42.22,152.18,39.1,185.36,7,8]}],[{"kind":"cdDrawCurve","args":[35.2,158.5,38.32,149.01999999999998,71.08,92.93,32,7]}],[{"kind":"cdDrawCurve","args":[168.36,57.86,136.72,65.56,71.18,70.18,0,7]}],[{"kind":"cdDrawCurve","args":[87,73.26,98.3,79.42,103.94999999999999,91.74,7,8]}],[{"kind":"cdDrawCurve","args":[163.84,71.72,154.8,84.04,143.5,96.36,0,7]}],[{"kind":"cdDrawLine","args":[71.18,97.9,185.31,97.9,0,0]}],[{"kind":"cdDrawLine","args":[127.68,67.1,127.68,131.01,32,0]}],[{"kind":"cdDrawCurve","args":[119.77000000000002,97.9,100.56,121.77,66.66,134.86,132,7]}],[{"kind":"cdDrawCurve","args":[132.2,97.9,157.06,117.92,178.53,126.39,7,0]}],[{"kind":"cdDrawLine","args":[88.3108,136.04579999999999,88.3108,178.0878,12,213]}],[{"kind":"cdDrawLine","args":[88.3108,136.04579999999999,167.0492,136.04579999999999,2,2]}],[{"kind":"cdDrawLine","args":[167.0492,136.04579999999999,167.0492,178.0878,22,223]}],[{"kind":"cdDrawLine","args":[127.68,136.04579999999999,127.68,178.0878,32,32]}],[{"kind":"cdDrawLine","args":[88.3108,156.7434,167.0492,156.7434,2,2]}],[{"kind":"cdDrawLine","args":[88.3108,178.0878,167.0492,178.0878,2,2]}]],"TRACE_SHA256":"ccffd72fdd1fb91de559676b2e11190c80f01c51b78218ac82a9a141bf70db80","GROUPS_SHA256":"94e8e323b3e221bc541e3afc13fe24bc5357698040fd5684cfff4239f2bab9f1","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[14]},{"sourceRoot":"u85e9-ue0101","sourceProofFile":"./engine-whole-u85e9-ue0101.json","sourceProofFileSha256":"048196c632f9a5a9696b23f51d313c9f1f19e7b439d2dbe53f2f43d011ff7bff","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"eebcd74fbc94019cc17e3206e62c35c2e702113ccc6ab443267e4a31349ad41a","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"ab178828883f1da6d8f8926bfbfea3aeb3360e1d6a9c850667a235ceabf0a58a","SELECTED_PROOF_IDENTITY":{"sourceRoot":"u85e9-ue0101","sourceProofFile":"./engine-whole-u85e9-ue0101.json","sourceProofFileSha256":"048196c632f9a5a9696b23f51d313c9f1f19e7b439d2dbe53f2f43d011ff7bff","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"eebcd74fbc94019cc17e3206e62c35c2e702113ccc6ab443267e4a31349ad41a","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"ab178828883f1da6d8f8926bfbfea3aeb3360e1d6a9c850667a235ceabf0a58a"},"ORIGINAL_PROOF_KEYS":["defaults","engineHashes","engineRevision","groups","trace"],"PROOF_SHA256":"c415d9f9a50eb87a9efef12708c3ff95d89f0110dcd0012d3261973f0ee7105a","FULL_SOURCE_HEADER":{"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}},"sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15,16],[17],[18],[19]],"RAW_COUNT":20,"ORIGINAL":[[{"kind":"cdDrawLine","args":[13,33.614999999999995,187,33.614999999999995,0,0]}],[{"kind":"cdDrawLine","args":[72,13.205,72,53.24,0,300]}],[{"kind":"cdDrawLine","args":[128,13.205,128,53.24,0,300]}],[{"kind":"cdDrawCurve","args":[28.18,55.8,47.68,61.33,56.26,72.39,7,8]}],[{"kind":"cdDrawCurve","args":[13.36,92.14,34.42,97.67,42.22,108.73,7,8]}],[{"kind":"cdDrawCurve","args":[14.92,145.07,42.22,152.18,39.1,185.36,7,8]}],[{"kind":"cdDrawCurve","args":[35.2,158.5,38.32,149.01999999999998,71.08,92.93,32,7]}],[{"kind":"cdDrawCurve","args":[168.36,57.86,136.72,65.56,71.18,70.18,0,7]}],[{"kind":"cdDrawCurve","args":[87,73.26,98.3,79.42,103.94999999999999,91.74,7,8]}],[{"kind":"cdDrawCurve","args":[163.84,71.72,154.8,84.04,143.5,96.36,0,7]}],[{"kind":"cdDrawLine","args":[71.18,97.9,185.31,97.9,0,0]}],[{"kind":"cdDrawLine","args":[127.68,67.1,127.68,131.01,32,0]}],[{"kind":"cdDrawCurve","args":[119.77000000000002,97.9,100.56,121.77,66.66,134.86,132,7]}],[{"kind":"cdDrawCurve","args":[132.2,97.9,157.06,117.92,178.53,126.39,7,0]}],[{"kind":"cdDrawLine","args":[88.3108,136.04579999999999,88.3108,178.0878,12,213]}],[{"kind":"cdDrawLine","args":[88.3108,136.04579999999999,167.0492,136.04579999999999,2,2]}],[{"kind":"cdDrawLine","args":[167.0492,136.04579999999999,167.0492,178.0878,22,223]}],[{"kind":"cdDrawLine","args":[127.68,136.04579999999999,127.68,178.0878,32,32]}],[{"kind":"cdDrawLine","args":[88.3108,156.7434,167.0492,156.7434,2,2]}],[{"kind":"cdDrawLine","args":[88.3108,178.0878,167.0492,178.0878,2,2]}]],"TRACE_SHA256":"ccffd72fdd1fb91de559676b2e11190c80f01c51b78218ac82a9a141bf70db80","GROUPS_SHA256":"94e8e323b3e221bc541e3afc13fe24bc5357698040fd5684cfff4239f2bab9f1","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[14]},{"sourceRoot":"u85e9-var-001","sourceProofFile":"./engine-whole-u85e9-var-001.json","sourceProofFileSha256":"27b5290ce33e6e91aa23de4b608a53b8d829be21e021fc700d19fc1a9c3d6e2a","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"eebcd74fbc94019cc17e3206e62c35c2e702113ccc6ab443267e4a31349ad41a","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"ab178828883f1da6d8f8926bfbfea3aeb3360e1d6a9c850667a235ceabf0a58a","SELECTED_PROOF_IDENTITY":{"sourceRoot":"u85e9-var-001","sourceProofFile":"./engine-whole-u85e9-var-001.json","sourceProofFileSha256":"27b5290ce33e6e91aa23de4b608a53b8d829be21e021fc700d19fc1a9c3d6e2a","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"eebcd74fbc94019cc17e3206e62c35c2e702113ccc6ab443267e4a31349ad41a","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"ab178828883f1da6d8f8926bfbfea3aeb3360e1d6a9c850667a235ceabf0a58a"},"ORIGINAL_PROOF_KEYS":["defaults","engineHashes","engineRevision","groups","trace"],"PROOF_SHA256":"13591236485e886e165c6c5dc4519348dd334abe729668f622a568a65a01c9ff","FULL_SOURCE_HEADER":{"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}},"sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15,16],[17],[18],[19]],"RAW_COUNT":20,"ORIGINAL":[[{"kind":"cdDrawLine","args":[19.09,35.64,180.91,35.64,0,0]}],[{"kind":"cdDrawLine","args":[73.96,15.88,73.96,54.64,0,300]}],[{"kind":"cdDrawLine","args":[126.04,15.88,126.04,54.64,0,300]}],[{"kind":"cdDrawCurve","args":[29.955,51.2,50.08,56.87,58.935,68.21000000000001,7,8]}],[{"kind":"cdDrawCurve","args":[14.66,88.46,36.394999999999996,94.13,44.445,105.47,7,8]}],[{"kind":"cdDrawCurve","args":[16.27,142.73000000000002,44.445,150.01999999999998,41.225,184.04,7,8]}],[{"kind":"cdDrawCurve","args":[37.2,156.5,40.42,146.78,74.23,89.27000000000002,32,7]}],[{"kind":"cdDrawCurve","args":[164,53,123,60,67,68,0,7]}],[{"kind":"cdDrawCurve","args":[84,67,95,73,100,86,7,8]}],[{"kind":"cdDrawCurve","args":[160,66,151,77,139,88,0,7]}],[{"kind":"cdDrawLine","args":[69,90,184,90,0,0]}],[{"kind":"cdDrawLine","args":[124,62,124,126,32,0]}],[{"kind":"cdDrawCurve","args":[116,90,97,115,61,128,132,7]}],[{"kind":"cdDrawCurve","args":[129,89,154,111,176,119,7,0]}],[{"kind":"cdDrawLine","args":[83,130,83,172,12,113]}],[{"kind":"cdDrawLine","args":[83,130,167,130,2,2]}],[{"kind":"cdDrawLine","args":[167,130,167,172,22,123]}],[{"kind":"cdDrawLine","args":[83,172,167,172,2,2]}],[{"kind":"cdDrawLine","args":[83,151,165,151,2,2]}],[{"kind":"cdDrawLine","args":[124,130,124,172,32,32]}]],"TRACE_SHA256":"cfb22e5fce438d737e063d142598f3d541dbac5c7b1d0388f4531a92abada989","GROUPS_SHA256":"1b57d8a91d2cccad2e92bd0addaf2a08f79cb1e336d5de1403d996e5524d6643","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[14]}];
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
