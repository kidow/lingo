export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'
import {readFileSync} from 'node:fs'
const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const endpoint = (call) => call.args.slice(call.kind === 'cdDrawLine' ? 2 : call.kind === 'cdDrawCurve' ? 4 : 6, call.kind === 'cdDrawLine' ? 4 : call.kind === 'cdDrawCurve' ? 6 : 8)
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })
const deepFreeze=x=>{if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.freeze(x);for(const v of Object.values(x))deepFreeze(v)}return x}
export const selectedProofIdentity=deepFreeze({"sourceRoot":"hkcs_u890a","sourceProofFile":"../hanja-related-whole-jing-bian-pian-native-source-2026-10-14/engine-whole-hkcs_u890a.json","sourceProofFileSha256":"c7b12b4b04be08a1eae82dff8716e099b6b6c362fba6a92f947c50a7462cafcb","sourceCapsuleFile":"../hanja-related-whole-jing-bian-pian-native-source-2026-10-14/sources.json","sourceCapsuleFileSha256":"acdb287e18a5b2dc4f83d39270c7ebe276aee479bab3c798bb23076f38ea706a","sourceChecksFile":"../hanja-related-whole-jing-bian-pian-native-source-2026-10-14/metadata.json","sourceChecksFileSha256":"921ada4a03563e123ddeddd4c64de64c9b50b45566426499ad43a2575520a9d3"})
export const sourceGroups=deepFreeze([[0],[1,2],[3],[4],[5],[6],[7],[8,9],[10],[11],[12,13],[14],[15],[16]])
const ORIGINAL_SOURCE_GROUPS=structuredClone(sourceGroups)
const FULL_PROOF_SHA256="0050b92635f0f40b13c477fda00d3b9cac224f5a15874116b249215deafadcb7"
const FULL_SOURCE_HEADER={"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
const {RAW_COUNT,ORIGINAL,TRACE_SHA256,GROUPS_SHA256,PINNED_DEFAULTS,ENGINE_REVISION,ENGINE_HASHES,UP_TAIL_GROUPS,LEFT_TAIL_GROUPS,SINGLE_CARDINAL_TIP_RAW}=deepFreeze({"RAW_COUNT":17,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[32.55,12,46.325,22,52.125,40,7,8]}],[{"kind":"cdDrawLine","args":[16.6,56,68.075,56,0,2]}],[{"kind":"cdDrawCurve","args":[68.075,56,50.675,100,12.975,134,22,7]}],[{"kind":"cdDrawLine","args":[45.6,100,45.6,186,32,0]}],[{"kind":"cdDrawCurve","args":[73.15,90,68.8,99,55.75,115,0,7]}],[{"kind":"cdDrawCurve","args":[46.325,107,64.45,120,72.425,138,7,8]}],[{"kind":"cdDrawCurve","args":[106.55,13,123.35,21,130.7,36,7,8]}],[{"kind":"cdDrawLine","args":[88.7,46,88.7,83,12,1]},{"kind":"cdDrawCurve","args":[88.7,83,88.7,151,63.5,187,1,7]}],[{"kind":"cdDrawLine","args":[88.7,46,166.4,46,2,2]}],[{"kind":"cdDrawLine","args":[166.4,46,166.4,78,22,123]}],[{"kind":"cdDrawLine","args":[88.7,78,166.4,78,2,2]}],[{"kind":"cdDrawLine","args":[103.4,103,103.4,187,1012,0]}],[{"kind":"cdDrawLine","args":[103.4,103,170.6,103,2,2]}],[{"kind":"cdDrawLine","args":[170.6,103,170.6,173,1022,1]},{"kind":"cdDrawCurve","args":[170.6,173,170.6,183,161.85,183,1001,314]}],[{"kind":"cdDrawLine","args":[103.4,136,170.6,136,2,2]}],[{"kind":"cdDrawLine","args":[125.44999999999999,103,125.44999999999999,176,2032,0]}],[{"kind":"cdDrawLine","args":[147.5,103,147.5,168,2032,0]}]],"TRACE_SHA256":"c031972e7253fee94ba978acb24b528fd973e22fa7ac01aee0f88e1a2521e72d","GROUPS_SHA256":"edbcd58d30161dc17604bd2cb34b6278351373f43f62d00df36629a2f9db157d","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[[12,13]],"SINGLE_CARDINAL_TIP_RAW":[]})
export function compileProgressive(trace, proof, identity) {
  assert.equal(arguments.length,3,'Exactly trace, full5 proof and explicit seven-field identity are required')
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
 assert(identity,'Explicit whole/proof/closure/checks identity required');assert.deepEqual(identity,selectedProofIdentity,'Exact seven-field case-sensitive identity; no aliases/defaults/path prefixes')
 const read=p=>readFileSync(new URL(p,import.meta.url)),sha=b=>createHash('sha256').update(b).digest('hex')
 const pb=read(identity.sourceProofFile),cb=read(identity.sourceCapsuleFile),sb=read(identity.sourceChecksFile)
 assert.equal(sha(pb),identity.sourceProofFileSha256);assert.equal(sha(cb),identity.sourceCapsuleFileSha256);assert.equal(sha(sb),identity.sourceChecksFileSha256)
 const saved=JSON.parse(pb),capsule=JSON.parse(cb),checks=JSON.parse(sb)
 assert(capsule.wholeNames.includes(identity.sourceRoot));assert.equal(capsule.wholeRelated[identity.sourceRoot],"u890a");assert.equal(checks.proofSourceFile.file,'sources.json');assert.equal(checks.proofSourceFile.SHA256,identity.sourceCapsuleFileSha256);const entry=checks.cases.find(x=>x.glyph==="褊"&&x.root===identity.sourceRoot);assert(entry);assert.equal(entry.catalogueId,"u890a");assert.equal(entry.catalogStrokes,14);assert.equal(entry.proofFile,"engine-whole-hkcs_u890a.json");assert.equal(entry.proofFileSHA256,identity.sourceProofFileSha256);assert.deepEqual(entry.sourceGroups,sourceGroups);assert.equal(capsule.sourceIdentityByWhole[identity.sourceRoot].related,"u890a");assert.equal(sha(capsule.records[identity.sourceRoot].data),capsule.sourceIdentityByWhole[identity.sourceRoot].archiveWholeDataSHA256);assert.deepEqual(proof.engineHashes,capsule.engine.sha256ByFile);assert.equal(proof.engineRevision,capsule.engine.revision);
 const seen=new Set();const walk=name=>{if(seen.has(name))return;const record=capsule.records[name];assert(record,'Every selected whole dependency must be explicitly captured: '+name);seen.add(name);for(const row of record.data.split('$')){const fields=row.split(':');if(fields[0]==='99')walk(fields[7])}};walk(identity.sourceRoot)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FULL_PROOF_SHA256);assert.deepEqual(proof,saved)
 assert.equal(digest(trace),TRACE_SHA256);assert.deepEqual(trace,proof.trace)
 assert.deepEqual(Object.fromEntries(Object.entries(proof).filter(([k])=>!['trace','groups'].includes(k))),FULL_SOURCE_HEADER)
}
export const nativeApproved=false
export const runtimeApplied=false
