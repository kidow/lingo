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
const CASES=[{"sourceRoot":"u99fd","sourceProofFile":"./engine-whole-u99fd.json","sourceProofFileSha256":"2bc15fa3ff20aaf206a01cd8063a610c43a251c6603c19128c97ae1152377ee8","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"c46af98e9a2a6d8e89d002a87290e074c1e6ad3fb348784fb5e9da3a5678ea4b","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"5e40bbd47401ba3dda43af151b82e889131b7c4fd4fec3face096443b1f9a94f","SELECTED_PROOF_IDENTITY":{"sourceRoot":"u99fd","sourceProofFile":"./engine-whole-u99fd.json","sourceProofFileSha256":"2bc15fa3ff20aaf206a01cd8063a610c43a251c6603c19128c97ae1152377ee8","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"c46af98e9a2a6d8e89d002a87290e074c1e6ad3fb348784fb5e9da3a5678ea4b","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"5e40bbd47401ba3dda43af151b82e889131b7c4fd4fec3face096443b1f9a94f"},"ORIGINAL_PROOF_KEYS":["defaults","engineHashes","engineRevision","groups","trace"],"PROOF_SHA256":"3a2bde43c2ada80267c4254680e59629b71e7d0739586a77be47cfd2a4b6bf8e","FULL_SOURCE_HEADER":{"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}},"sourceGroups":[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12,13],[14],[15],[16,17],[18],[19]],"RAW_COUNT":20,"ORIGINAL":[[{"kind":"cdDrawLine","args":[24.08,29.3,24.08,109.25,12,313]}],[{"kind":"cdDrawLine","args":[24.08,29.3,82.56,29.3,2,0]}],[{"kind":"cdDrawLine","args":[51.6,29.3,51.6,109.25,32,32]}],[{"kind":"cdDrawLine","args":[24.08,56.6,81.7,56.6,2,0]}],[{"kind":"cdDrawLine","args":[24.08,82.925,81.7,82.925,2,0]}],[{"kind":"cdDrawLine","args":[24.08,109.25,75.68,109.25,2,2]}],[{"kind":"cdDrawCurve","args":[75.68,109.25,77.4,154.1,67.63516042498507,171.68272242217975,22,0]},{"kind":"cdDrawCurve","args":[67.63516042498507,171.68272242217975,62.78,180.425,52.78,180.425,2,214]}],[{"kind":"cdDrawCurve","args":[23.22,122.9,25.8,158,14.62,169.7,7,8]}],[{"kind":"cdDrawCurve","args":[31.82,125.825,38.7,145.325,36.12,161.9,7,8]}],[{"kind":"cdDrawCurve","args":[40.42,122.9,49.88,136.55,50.74,153.125,7,8]}],[{"kind":"cdDrawCurve","args":[48.16,117.05,59.34,125.825,62.78,140.45,7,8]}],[{"kind":"cdDrawLine","args":[104.44800000000001,25.49,104.44800000000001,59.51,12,113]}],[{"kind":"cdDrawLine","args":[104.44800000000001,25.49,167.55200000000002,25.49,2,2]}],[{"kind":"cdDrawLine","args":[167.55200000000002,25.49,167.55200000000002,59.51,22,123]}],[{"kind":"cdDrawLine","args":[104.44800000000001,59.51,167.55200000000002,59.51,2,2]}],[{"kind":"cdDrawLine","args":[99.392,85.61,99.392,186.18,12,0]}],[{"kind":"cdDrawLine","args":[99.392,85.61,172.608,85.61,2,2]}],[{"kind":"cdDrawLine","args":[172.608,85.61,172.608,171.66,22,1]},{"kind":"cdDrawCurve","args":[172.608,171.66,172.608,181.66,162.608,181.66,1,314]}],[{"kind":"cdDrawLine","args":[99.392,114.99,172.608,114.99,2,2]}],[{"kind":"cdDrawLine","args":[99.392,144.37,172.608,144.37,2,2]}]],"TRACE_SHA256":"5040ca32142f1d4bcebc45f75f5a272a89128084c23bc340694e7753345650ed","GROUPS_SHA256":"57ea18c25ad861c7f66b3d7ae325196907859753321641fb21b40dc73ed17d70","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[5,6],[16,17]],"SINGLE_CARDINAL_TIP_RAW":[0,11]},{"sourceRoot":"u99fd-ue0100","sourceProofFile":"./engine-whole-u99fd-ue0100.json","sourceProofFileSha256":"2bc15fa3ff20aaf206a01cd8063a610c43a251c6603c19128c97ae1152377ee8","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"c46af98e9a2a6d8e89d002a87290e074c1e6ad3fb348784fb5e9da3a5678ea4b","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"5e40bbd47401ba3dda43af151b82e889131b7c4fd4fec3face096443b1f9a94f","SELECTED_PROOF_IDENTITY":{"sourceRoot":"u99fd-ue0100","sourceProofFile":"./engine-whole-u99fd-ue0100.json","sourceProofFileSha256":"2bc15fa3ff20aaf206a01cd8063a610c43a251c6603c19128c97ae1152377ee8","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"c46af98e9a2a6d8e89d002a87290e074c1e6ad3fb348784fb5e9da3a5678ea4b","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"5e40bbd47401ba3dda43af151b82e889131b7c4fd4fec3face096443b1f9a94f"},"ORIGINAL_PROOF_KEYS":["defaults","engineHashes","engineRevision","groups","trace"],"PROOF_SHA256":"3a2bde43c2ada80267c4254680e59629b71e7d0739586a77be47cfd2a4b6bf8e","FULL_SOURCE_HEADER":{"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}},"sourceGroups":[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12,13],[14],[15],[16,17],[18],[19]],"RAW_COUNT":20,"ORIGINAL":[[{"kind":"cdDrawLine","args":[24.08,29.3,24.08,109.25,12,313]}],[{"kind":"cdDrawLine","args":[24.08,29.3,82.56,29.3,2,0]}],[{"kind":"cdDrawLine","args":[51.6,29.3,51.6,109.25,32,32]}],[{"kind":"cdDrawLine","args":[24.08,56.6,81.7,56.6,2,0]}],[{"kind":"cdDrawLine","args":[24.08,82.925,81.7,82.925,2,0]}],[{"kind":"cdDrawLine","args":[24.08,109.25,75.68,109.25,2,2]}],[{"kind":"cdDrawCurve","args":[75.68,109.25,77.4,154.1,67.63516042498507,171.68272242217975,22,0]},{"kind":"cdDrawCurve","args":[67.63516042498507,171.68272242217975,62.78,180.425,52.78,180.425,2,214]}],[{"kind":"cdDrawCurve","args":[23.22,122.9,25.8,158,14.62,169.7,7,8]}],[{"kind":"cdDrawCurve","args":[31.82,125.825,38.7,145.325,36.12,161.9,7,8]}],[{"kind":"cdDrawCurve","args":[40.42,122.9,49.88,136.55,50.74,153.125,7,8]}],[{"kind":"cdDrawCurve","args":[48.16,117.05,59.34,125.825,62.78,140.45,7,8]}],[{"kind":"cdDrawLine","args":[104.44800000000001,25.49,104.44800000000001,59.51,12,113]}],[{"kind":"cdDrawLine","args":[104.44800000000001,25.49,167.55200000000002,25.49,2,2]}],[{"kind":"cdDrawLine","args":[167.55200000000002,25.49,167.55200000000002,59.51,22,123]}],[{"kind":"cdDrawLine","args":[104.44800000000001,59.51,167.55200000000002,59.51,2,2]}],[{"kind":"cdDrawLine","args":[99.392,85.61,99.392,186.18,12,0]}],[{"kind":"cdDrawLine","args":[99.392,85.61,172.608,85.61,2,2]}],[{"kind":"cdDrawLine","args":[172.608,85.61,172.608,171.66,22,1]},{"kind":"cdDrawCurve","args":[172.608,171.66,172.608,181.66,162.608,181.66,1,314]}],[{"kind":"cdDrawLine","args":[99.392,114.99,172.608,114.99,2,2]}],[{"kind":"cdDrawLine","args":[99.392,144.37,172.608,144.37,2,2]}]],"TRACE_SHA256":"5040ca32142f1d4bcebc45f75f5a272a89128084c23bc340694e7753345650ed","GROUPS_SHA256":"57ea18c25ad861c7f66b3d7ae325196907859753321641fb21b40dc73ed17d70","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[5,6],[16,17]],"SINGLE_CARDINAL_TIP_RAW":[0,11]}];
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
