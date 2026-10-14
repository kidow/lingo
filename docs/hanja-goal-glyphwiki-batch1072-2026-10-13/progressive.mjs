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
const CASES=[{"sourceRoot":"u905d-ue0102","sourceProofFile":"./engine-whole-u905d-ue0102.json","sourceProofFileSha256":"ff6fd860826efcbdef27942cc62027ebb893d9fc2f5c2156557b4900bb4153a6","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"747a19309cdf2b7188af2372a3f036be63ae6227dcdfea28788d81c06e9008ff","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"edb92c6c5826253c6af36abd27bcf27b3d7bbf2792a84ba54abcaeae5d943f5e","SELECTED_PROOF_IDENTITY":{"sourceRoot":"u905d-ue0102","sourceProofFile":"./engine-whole-u905d-ue0102.json","sourceProofFileSha256":"ff6fd860826efcbdef27942cc62027ebb893d9fc2f5c2156557b4900bb4153a6","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"747a19309cdf2b7188af2372a3f036be63ae6227dcdfea28788d81c06e9008ff","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"edb92c6c5826253c6af36abd27bcf27b3d7bbf2792a84ba54abcaeae5d943f5e"},"ORIGINAL_PROOF_KEYS":["defaults","engineHashes","engineRevision","groups","trace"],"PROOF_SHA256":"02383c6b885c1a7032394e4a2e4faf4ea53c7df219ece60a4c2e503942e37ec3","FULL_SOURCE_HEADER":{"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}},"sourceGroups":[[0],[1,2],[3],[4],[5],[6,7],[8],[9],[10],[11],[12],[13],[14],[15]],"RAW_COUNT":16,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[23,25,45,37,56,56,7,8]}],[{"kind":"cdDrawLine","args":[14,93,50,93,0,2]}],[{"kind":"cdDrawLine","args":[50,93,50,155,22,300]}],[{"kind":"cdDrawCurve","args":[16,179,35,166,55,151,0,7]}],[{"kind":"cdDrawBezier","args":[53,149,68,172,84,181,178,177,7,0]}],[{"kind":"cdDrawLine","args":[80.598,26.2993,80.598,57.90429999999999,12,13]}],[{"kind":"cdDrawLine","args":[80.598,26.2993,171.40199999999996,26.2993,2,2]}],[{"kind":"cdDrawLine","args":[171.40199999999996,26.2993,171.40199999999996,57.90429999999999,22,23]}],[{"kind":"cdDrawLine","args":[110.86599999999999,26.2993,110.86599999999999,57.90429999999999,32,32]}],[{"kind":"cdDrawLine","args":[141.13400000000001,26.2993,141.13400000000001,57.90429999999999,32,32]}],[{"kind":"cdDrawLine","args":[80.598,57.90429999999999,171.40199999999996,57.90429999999999,2,2]}],[{"kind":"cdDrawLine","args":[126,67.0805,126,161.37949999999998,0,0]}],[{"kind":"cdDrawCurve","args":[107.1,78.1745,91.97999999999998,99.25310000000002,70.56,116.44879999999999,0,7]}],[{"kind":"cdDrawCurve","args":[142.38,77.06509999999999,162.54000000000002,91.48730000000002,175.14,107.01890000000002,7,8]}],[{"kind":"cdDrawCurve","args":[111.51,113.6753,96.39,139.1915,71.19,155.2778,0,7]}],[{"kind":"cdDrawCurve","args":[129.15,88.1591,142.38,131.4257,177.03,149.1761,7,0]}]],"TRACE_SHA256":"223ba91d7515f5e4ec60fadfd22f3a429a01ac45ce9372568c6d39d2ced8b46f","GROUPS_SHA256":"c8b8cfe7902d54251ffd7a2de1ccae62f511e9c4e5aacbed33ef3528acecd65e","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[5]},{"sourceRoot":"u905d-var-001","sourceProofFile":"./engine-whole-u905d-var-001.json","sourceProofFileSha256":"d7d3b1d6b1b6ae9fbbdaf5c03e380a65ba179ed2957fbbb55e0d885e7aefc0e5","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"747a19309cdf2b7188af2372a3f036be63ae6227dcdfea28788d81c06e9008ff","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"edb92c6c5826253c6af36abd27bcf27b3d7bbf2792a84ba54abcaeae5d943f5e","SELECTED_PROOF_IDENTITY":{"sourceRoot":"u905d-var-001","sourceProofFile":"./engine-whole-u905d-var-001.json","sourceProofFileSha256":"d7d3b1d6b1b6ae9fbbdaf5c03e380a65ba179ed2957fbbb55e0d885e7aefc0e5","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"747a19309cdf2b7188af2372a3f036be63ae6227dcdfea28788d81c06e9008ff","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"edb92c6c5826253c6af36abd27bcf27b3d7bbf2792a84ba54abcaeae5d943f5e"},"ORIGINAL_PROOF_KEYS":["defaults","engineHashes","engineRevision","groups","trace"],"PROOF_SHA256":"b0991f4d34a36eb5bda9132edecd8af56fdbef55b152b591f160ee1780975d10","FULL_SOURCE_HEADER":{"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}},"sourceGroups":[[0],[1,2],[3],[4],[5],[6,7],[8],[9],[10],[11],[12],[13],[14],[15]],"RAW_COUNT":16,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[23,25,45,37,56,56,7,8]}],[{"kind":"cdDrawLine","args":[14,93,50,93,0,2]}],[{"kind":"cdDrawLine","args":[50,93,50,155,22,300]}],[{"kind":"cdDrawCurve","args":[16,179,35,166,55,151,0,7]}],[{"kind":"cdDrawBezier","args":[53,149,68,172,84,181,178,177,7,0]}],[{"kind":"cdDrawLine","args":[78.97675,25.01326875,78.97675,58.36670625,12,13]}],[{"kind":"cdDrawLine","args":[78.97675,25.01326875,172.02325,25.01326875,2,2]}],[{"kind":"cdDrawLine","args":[172.02325,25.01326875,172.02325,58.36670625,22,23]}],[{"kind":"cdDrawLine","args":[109.99225000000001,25.01326875,109.99225000000001,58.36670625,32,32]}],[{"kind":"cdDrawLine","args":[141.00775,25.01326875,141.00775,58.36670625,32,32]}],[{"kind":"cdDrawLine","args":[78.97675,58.36670625,172.02325,58.36670625,2,2]}],[{"kind":"cdDrawLine","args":[125.5,64.95,125.5,167.61,0,0]}],[{"kind":"cdDrawCurve","args":[110.275,82.65,92.875,101.235,66.775,115.395,0,7]}],[{"kind":"cdDrawCurve","args":[110.275,116.28,92.875,134.865,66.775,149.025,0,7]}],[{"kind":"cdDrawCurve","args":[141.45,82.65,164.65,92.385,178.425,111.855,7,8]}],[{"kind":"cdDrawCurve","args":[141.45,116.28,164.65,126.015,178.425,145.485,7,8]}]],"TRACE_SHA256":"f45849a7466faca288868a1c6cc42a1b6992bfe6430e6513e7a619bc2b6d81e0","GROUPS_SHA256":"42ac4fb3e921be3d82b69f85d1c8e401a0b824743224eff68c9bd376d125ca72","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[5]},{"sourceRoot":"u905d-var-005","sourceProofFile":"./engine-whole-u905d-var-005.json","sourceProofFileSha256":"38b94960a87cf1fb69cba1d9f41bcb2fd2bdb182fa61c2fb6472ad5e3454fc36","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"747a19309cdf2b7188af2372a3f036be63ae6227dcdfea28788d81c06e9008ff","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"edb92c6c5826253c6af36abd27bcf27b3d7bbf2792a84ba54abcaeae5d943f5e","SELECTED_PROOF_IDENTITY":{"sourceRoot":"u905d-var-005","sourceProofFile":"./engine-whole-u905d-var-005.json","sourceProofFileSha256":"38b94960a87cf1fb69cba1d9f41bcb2fd2bdb182fa61c2fb6472ad5e3454fc36","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"747a19309cdf2b7188af2372a3f036be63ae6227dcdfea28788d81c06e9008ff","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"edb92c6c5826253c6af36abd27bcf27b3d7bbf2792a84ba54abcaeae5d943f5e"},"ORIGINAL_PROOF_KEYS":["defaults","engineHashes","engineRevision","groups","trace"],"PROOF_SHA256":"401bd39e0ecb18def5ff7591f5958fa074e227e933c9aec05f6433048191752f","FULL_SOURCE_HEADER":{"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}},"sourceGroups":[[0],[1,2],[3],[4],[5],[6,7],[8],[9],[10],[11],[12],[13],[14],[15]],"RAW_COUNT":16,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[23,25,45,37,56,56,7,8]}],[{"kind":"cdDrawLine","args":[14,93,50,93,0,2]}],[{"kind":"cdDrawLine","args":[50,93,50,155,22,300]}],[{"kind":"cdDrawCurve","args":[16,179,35,166,55,151,0,7]}],[{"kind":"cdDrawBezier","args":[53,149,68,172,84,181,178,177,7,0]}],[{"kind":"cdDrawLine","args":[80.598,26.2993,80.598,57.90429999999999,12,13]}],[{"kind":"cdDrawLine","args":[80.598,26.2993,171.402,26.2993,2,2]}],[{"kind":"cdDrawLine","args":[171.402,26.2993,171.402,57.90429999999999,22,23]}],[{"kind":"cdDrawLine","args":[110.86599999999999,26.2993,110.86599999999999,57.90429999999999,32,32]}],[{"kind":"cdDrawLine","args":[141.13400000000001,26.2993,141.13400000000001,57.90429999999999,32,32]}],[{"kind":"cdDrawLine","args":[80.598,57.90429999999999,171.402,57.90429999999999,2,2]}],[{"kind":"cdDrawLine","args":[126,67.0805,126,161.37949999999998,0,0]}],[{"kind":"cdDrawCurve","args":[107.1,78.1745,91.97999999999999,99.25310000000002,70.56,116.44879999999999,0,7]}],[{"kind":"cdDrawCurve","args":[142.38,77.06509999999999,162.54000000000002,91.48730000000002,175.14,107.01890000000002,7,8]}],[{"kind":"cdDrawCurve","args":[111.50999999999999,113.6753,96.39,139.1915,71.19,155.2778,0,7]}],[{"kind":"cdDrawCurve","args":[129.15,88.1591,142.38,131.4257,177.03,149.1761,7,0]}]],"TRACE_SHA256":"5e2e754162b4ce1fc95cc6a0dd02437013b3a85d50fded631a0a3e73fa054f97","GROUPS_SHA256":"a8cfc1751c33d23da228e797c6c531fd500c48726056f3ed5b9e1381f2a66e1a","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[5]}];
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
