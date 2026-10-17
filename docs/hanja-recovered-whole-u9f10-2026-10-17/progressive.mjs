export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'
import {readFileSync} from 'node:fs'
// Source-only copied primitive compiler; no domestic grouping, direction or reveal approval.
const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const endpoint = (call) => call.args.slice(call.kind === 'cdDrawLine' ? 2 : call.kind === 'cdDrawCurve' ? 4 : 6, call.kind === 'cdDrawLine' ? 4 : call.kind === 'cdDrawCurve' ? 6 : 8)
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })
const deepFreeze=x=>{if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.freeze(x);for(const v of Object.values(x))deepFreeze(v)}return x}
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u9f10","sourceProofFile":"../hanja-remaining-five-source-recovery-2026-10-17/engine-archive-recovered-u9f10.json","sourceProofFileSha256":"181efdd367500f1635fb789cf9035b4404ffa46691b5672aae8f2a268375141b","sourceCapsuleFile":"../hanja-remaining-five-source-recovery-2026-10-17/archive-recovered-u9f10-sources.json","sourceCapsuleFileSha256":"7e0f2687a2538635ab5fef637bac21b5936aff4278a18d1f2c38fd3e5dc5c9e3","sourceManifestFile":"../hanja-remaining-five-source-recovery-2026-10-17/manifest.json","sourceManifestFileSha256":"0c4a6414b7865608df7a44924cc01c1f0c04dc91683f784f8b9e7061de0c5002"})
export const sourceGroups=deepFreeze([[0,1,2,3],[4],[5],[6,7],[8],[9],[10],[11,12,13],[14],[15],[16],[17],[18],[19],[20]])
const ORIGINAL_SOURCE_GROUPS=structuredClone(sourceGroups)
const FULL_PROOF_SHA256='5bace4925f1a06d1a28f9a3816eca0793c4d86bd376e2544aceff0441c36cd03'
const FULL_SOURCE_HEADER={"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
const {RAW_COUNT,ORIGINAL,TRACE_SHA256,GROUPS_SHA256,PINNED_DEFAULTS,ENGINE_REVISION,ENGINE_HASHES,UP_TAIL_GROUPS,LEFT_TAIL_GROUPS,SINGLE_CARDINAL_TIP_RAW}=deepFreeze({"RAW_COUNT":21,"ORIGINAL":[[{"kind":"cdDrawLine","args":[35,22,133,22,0,2]}],[{"kind":"cdDrawLine","args":[133,22,128,38,22,313]}],[{"kind":"cdDrawLine","args":[128,38,176,38,2,2]}],[{"kind":"cdDrawCurve","args":[176,38,174,52,173.96116135138183,52.1941932430908,22,0]},{"kind":"cdDrawCurve","args":[173.96116135138183,52.1941932430908,172,62,162,62,2,514]}],[{"kind":"cdDrawCurve","args":[74,22,68,50,18,68,132,7]}],[{"kind":"cdDrawLine","args":[67.6,59.3895,67.6,112.4712,12,213]}],[{"kind":"cdDrawLine","args":[67.6,59.3895,132.4,59.3895,2,2]}],[{"kind":"cdDrawLine","args":[132.4,59.3895,132.4,112.4712,22,223]}],[{"kind":"cdDrawLine","args":[67.6,76.69874999999999,132.4,76.69874999999999,2,2]}],[{"kind":"cdDrawLine","args":[67.6,94.00800000000001,132.4,94.00800000000001,2,2]}],[{"kind":"cdDrawLine","args":[67.6,112.4712,132.4,112.4712,2,2]}],[{"kind":"cdDrawLine","args":[37,76.98134999999999,37,131.57025,0,313]}],[{"kind":"cdDrawLine","args":[37,131.57025,83,131.57025,2,2]}],[{"kind":"cdDrawLine","args":[83,131.57025,83,185.440875,22,0]}],[{"kind":"cdDrawLine","args":[16,146.654025,83,146.654025,0,2]}],[{"kind":"cdDrawLine","args":[43,146.654025,43,160.30124999999998,32,1]},{"kind":"cdDrawCurve","args":[43,160.30124999999998,42,176.821575,17,186.15914999999998,1,7]}],[{"kind":"cdDrawLine","args":[117,131.57025,162,131.57025,2,2]}],[{"kind":"cdDrawLine","args":[162,76.98134999999999,162,131.57025,0,323]}],[{"kind":"cdDrawLine","args":[117,131.57025,117,185.440875,12,0]}],[{"kind":"cdDrawLine","args":[117,146.654025,185,146.654025,2,100]}],[{"kind":"cdDrawLine","args":[158,146.654025,158,184.004325,32,100]}]],"TRACE_SHA256":"15c43c8cbac6c23ce87aaa38b07557d9748b23cdee0fa51d4cc30c66ab59121b","GROUPS_SHA256":"b0dec22e4ba064bfaeebdde8acab3c3ce9b52576e4b48f6ff5c0865ba324a0c5","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[0,1,2,3]],"SINGLE_CARDINAL_TIP_RAW":[]})
export function compileProgressive(trace, proof, identity) {
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
function validateSelectedProof(trace,proof,identity){
  assert(identity,'Explicit whole, fixed source capsule and manifest identity is required')
  assert.deepEqual(identity,selectedProofIdentity,'Exact seven-field root/proof/capsule/manifest identity')
  const read=p=>readFileSync(new URL(p,import.meta.url)),sha=b=>createHash('sha256').update(b).digest('hex')
  const proofBytes=read(selectedProofIdentity.sourceProofFile),capsuleBytes=read(selectedProofIdentity.sourceCapsuleFile),manifestBytes=read(selectedProofIdentity.sourceManifestFile)
  assert.equal(sha(proofBytes),selectedProofIdentity.sourceProofFileSha256)
  assert.equal(sha(capsuleBytes),selectedProofIdentity.sourceCapsuleFileSha256)
  assert.equal(sha(manifestBytes),selectedProofIdentity.sourceManifestFileSha256)
  const originalProof=JSON.parse(proofBytes),capsule=JSON.parse(capsuleBytes),manifest=JSON.parse(manifestBytes)
  assert.equal(capsule.root,'u9f10');assert.equal(capsule.glyph,'鼐');assert.equal(capsule.mode,'archive-recovered')
  const entry=manifest.glyphs.find(x=>x.glyph==='鼐').whole.find(x=>x.root==='u9f10'&&x.mode==='archive-recovered')
  assert(entry&&entry.sourceComplete);assert.equal(entry.proofFileSha256,selectedProofIdentity.sourceProofFileSha256);assert.equal(entry.sourceFileSha256,selectedProofIdentity.sourceCapsuleFileSha256)
  assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
  assert.equal(digest(proof),FULL_PROOF_SHA256);assert.deepEqual(proof,originalProof)
  assert.equal(digest(trace),TRACE_SHA256);assert.deepEqual(trace,proof.trace)
  assert.deepEqual(Object.fromEntries(Object.entries(proof).filter(([key])=>key!=='trace'&&key!=='groups')),FULL_SOURCE_HEADER)
  assert.deepEqual(proof.engineHashes,manifest.engineHashes);assert.equal(proof.engineRevision,manifest.engineRevision)
}
export const nativeApproved=false
export const runtimeApplied=false
