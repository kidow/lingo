export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// Provisional source-only review compiler. Domestic order and browser approval are pending.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const endpoint = (call) => call.args.slice(call.kind === 'cdDrawLine' ? 2 : call.kind === 'cdDrawCurve' ? 4 : 6, call.kind === 'cdDrawLine' ? 4 : call.kind === 'cdDrawCurve' ? 6 : 8)
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })

function compileBound(trace, proof, identity) {
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

function validateSelectedProof(trace,proof,identity){assert.deepEqual(identity,SELECTED_PROOF_IDENTITY,'Explicit fixed whole/proof/capsule identity');assert.equal(createHash('sha256').update(readFileSync(new URL('./source-profile.json',import.meta.url))).digest('hex'),"38c21aeb705bc969e9c5a5fa45b627a681df7b47ce9b50f9e26fb1040be2e74a");for(const[file,hash]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(file,import.meta.url))).digest('hex'),hash);for(const[file,hash]of Object.entries({"docs/hanja-goal-glyphwiki-batch847-2026-10-13/NOTICE.md":"586fcbaa56ee6a7fb9ba380c2fbab247941ac5bc0a4ba5b7f0d3fdeccdb83300","docs/hanja-goal-glyphwiki-batch847-2026-10-13/README.md":"7da34c20927f2afbbe66c8964cefa0f8a7937228340fcbdc50eb0b1986f9049f","docs/hanja-goal-glyphwiki-batch847-2026-10-13/candidate-compile-analysis.json":"df20fd3ec541d9e7927690a7da4254f802f867ced4d9087d1203f70040252a9a","docs/hanja-goal-glyphwiki-batch847-2026-10-13/engine-proof.json":"e36ff2060994f013b1b980aabf7701dd620055890f8a450049137c3fd97b8071","docs/hanja-goal-glyphwiki-batch847-2026-10-13/engine-whole-u7628-g.json":"30e70a268c0c5ffdacac81e6713c9c4b9a1e7d2ebc695e9fe2977b36e5f0e029","docs/hanja-goal-glyphwiki-batch847-2026-10-13/engine-whole-u7628-ue0100.json":"e36ff2060994f013b1b980aabf7701dd620055890f8a450049137c3fd97b8071","docs/hanja-goal-glyphwiki-batch847-2026-10-13/engine-whole-u7628.json":"e36ff2060994f013b1b980aabf7701dd620055890f8a450049137c3fd97b8071","docs/hanja-goal-glyphwiki-batch847-2026-10-13/metadata.json":"a25d860dd96348ccf83b325889b19af9fbbe5b82fa9cefbc158a860f82310b57","docs/hanja-goal-glyphwiki-batch847-2026-10-13/native-preflight-source-analysis.json":"464d1dd1ed1bab464fc5fbb9bcf5ed4daa4bac8878d51dd4771d26b4b825615f","docs/hanja-goal-glyphwiki-batch847-2026-10-13/progressive.mjs":"35965895f0ab67051f08268c3d3d8540b7cf855fdbca36ac2731f3f00ede2d71","docs/hanja-goal-glyphwiki-batch847-2026-10-13/resume.json":"d8684ad969979855e117e5de3a32ff403aa31607ed8adbd28a1d704d49e776b0","docs/hanja-goal-glyphwiki-batch847-2026-10-13/review.json":"9d638e9fdea7fd4606a95cf33d082d596ae4ad481dfc243ff39bb74253efeda3","docs/hanja-goal-glyphwiki-batch847-2026-10-13/serve-progressive.py":"b5bd0fbd38293a1819fa4842fadf7f18478f47fea523410fb4b58b02187d31c0","docs/hanja-goal-glyphwiki-batch847-2026-10-13/serve-whole.py":"320c4692eb4be023ef3edbff9c73c6daa88cac963f5af06b97b0be1a64348961","docs/hanja-goal-glyphwiki-batch847-2026-10-13/source-analysis.json":"fbbf337e16b28ba8b57e7a4f72394e575143f3ef6f12028682c21df8203e0fb7","docs/hanja-goal-glyphwiki-batch847-2026-10-13/source-join-analysis.json":"d2ee0dd80d0882bcfaf26d97cf9ba7ec22bd3fd0fcc92f6c9e9ac8d528d312ea","docs/hanja-goal-glyphwiki-batch847-2026-10-13/sources.json":"0b93441904aa8a06a0e5a18d96a93242ad17c9df5af715c94541e21c84ef0bfe","docs/hanja-goal-glyphwiki-batch847-2026-10-13/validation.json":"67e0730f644d87f2c3aed31c13241cf7d3e2113ce81e33f1d0e6dbe34e2ac041","docs/hanja-goal-glyphwiki-batch847-2026-10-13/verify-source.mjs":"fbb05d332c2a74397c6ee6afea19b324c7e0329e1070925a7a16d285f4966b69","docs/hanja-remaining-five-source-recovery-2026-10-17/archive-recovered-u9f10-sources.json":"7e0f2687a2538635ab5fef637bac21b5936aff4278a18d1f2c38fd3e5dc5c9e3","docs/hanja-remaining-five-source-recovery-2026-10-17/capture.mjs":"729b73bc2a5ad8febc04261928eca0725be1a2926cc4dfc4e06ec31321eed2b7","docs/hanja-remaining-five-source-recovery-2026-10-17/archive-LICENSE.txt":"abe789645f228e14d2e117769487cad0860f32e2a0b151c2ad8ef43843f5eec8","docs/hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09"}))assert.equal(createHash('sha256').update(readFileSync(new URL('../../'+file,import.meta.url))).digest('hex'),hash,file);assert.deepEqual(Object.keys(proof).sort(),ORIGINAL_PROOF_KEYS);assert.equal(digest(proof),PROOF_SHA256);assert.deepEqual(trace,proof.trace);assert.equal(digest(trace),TRACE_SHA256);assert.equal(digest(proof.groups),GROUPS_SHA256);assert.deepEqual(Object.fromEntries(Object.entries(proof).filter(([key])=>key!=='trace'&&key!=='groups')),FULL_SOURCE_HEADER);}
let positiveCompilations=0
export function sourceCompileCallCount(){return positiveCompilations}
export function compileProgressive(...args){assert.equal(args.length,3,'Exactly3 explicit arguments');const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const result=compileBound(trace,proof,identity);positiveCompilations++;return result}
export function compileSourceWhole(...args){assert.equal(args.length,4,'Exactly4 explicit arguments');const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
const SELECTED_PROOF_IDENTITY={"sourceRoot":"u7628","sourceProofFile":"./engine-whole-u7628.json","sourceProofFileSha256":"c0c83445cf0994d69e83ec74439753c7bcd6e3176e70d5dfc156669c3e13614f","sourceCapsuleFile":"./sources.json","sourceCapsuleFileSha256":"df44e2b2b0ca0bc7770d13834a454f2973b7ecbd29f9455df5a8579ccbe42212"}
export const selectedProofIdentity=structuredClone(SELECTED_PROOF_IDENTITY)
export const sourceRoot='u7628'
export const sourceProofFile='./engine-whole-u7628.json'
export const sourceProofFileSha256="c0c83445cf0994d69e83ec74439753c7bcd6e3176e70d5dfc156669c3e13614f"
const ORIGINAL_PROOF_KEYS=["defaults","engineHashes","engineRevision","groups","trace"]
const PROOF_SHA256="b5a8b6231ccda4b5edad098b565fea12cdc6e4c591d242b29d6b0e08562918f2"
const FULL_SOURCE_HEADER={"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups=[[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13,14],[15],[16]]
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13,14],[15],[16]]
const RAW_COUNT=17
const ORIGINAL=[[{"kind":"cdDrawLine","args":[110,13,110,39,0,32]}],[{"kind":"cdDrawLine","args":[48,39,186,39,2,0]}],[{"kind":"cdDrawLine","args":[48,39,48,98,1012,1]},{"kind":"cdDrawCurve","args":[48,98,48,161,15,187,1001,7]}],[{"kind":"cdDrawCurve","args":[14,54,27,64,32,85,7,8]}],[{"kind":"cdDrawCurve","args":[14,128,29,122,47,108,0,7]}],[{"kind":"cdDrawCurve","args":[157,51.15,126.6,58.575,79.47999999999999,63.525,0,7]}],[{"kind":"cdDrawLine","args":[79.47999999999999,45.375,79.47999999999999,67.55,0,1]},{"kind":"cdDrawCurve","args":[79.47999999999999,67.55,79.47999999999999,77.55,89.47999999999999,77.55,1,3001]},{"kind":"cdDrawLine","args":[89.47999999999999,77.55,172.2,77.55,3006,5]}],[{"kind":"cdDrawLine","args":[94.41400000000002,94.79250000000002,94.41400000000002,143.748,12,313]}],[{"kind":"cdDrawLine","args":[94.41400000000002,94.79250000000002,158.026,94.79250000000002,2,2]}],[{"kind":"cdDrawLine","args":[158.026,94.79250000000002,158.026,143.748,22,323]}],[{"kind":"cdDrawLine","args":[94.41400000000002,110.75625,158.026,110.75625,2,2]}],[{"kind":"cdDrawLine","args":[94.41400000000002,126.72,158.026,126.72,2,2]}],[{"kind":"cdDrawLine","args":[94.41400000000002,143.748,158.026,143.748,2,2]}],[{"kind":"cdDrawLine","args":[68.84,89.925,68.84,157.575,1000,113]}],[{"kind":"cdDrawLine","args":[68.84,157.575,185.12,157.575,2,100]}],[{"kind":"cdDrawCurve","args":[111.4,165.825,89.36,179.025,58.2,187.275,0,7]}],[{"kind":"cdDrawCurve","args":[130.4,165.825,159.28,170.775,175.24,183.975,7,8]}]]
const TRACE_SHA256="be6656b0fef4d1f1fdac7f1721b4997c9dd41f46216887a1208729e2745df9f8"
const GROUPS_SHA256="91870cd9bf24671a0dfb0d7a1b0da59bb2812d983428a17dd7cac45b845acfa6"
const PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS=[[6]],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[7]
export const nativeApproved=false,runtimeApplied=false
