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

const SELECTED_PROOF_IDENTITY={"sourceRoot":"u4f8a","sourceProofFile":"./engine-whole-u4f8a.json","sourceProofFileSha256":"f2ccf3acf2327e9f8725568c722bdcb8481eacbce306f438216a2420dab76380","sourceCapsuleFile":"./sources.json","sourceCapsuleFileSha256":"7faba9a455063475a411c93216f9c34eec555ca923d63d75e0db61e48ada6ba4"}
export const selectedProofIdentity=structuredClone(SELECTED_PROOF_IDENTITY)
export const sourceRoot='u4f8a'
export const sourceProofFile='./engine-whole-u4f8a.json'
export const sourceProofFileSha256="f2ccf3acf2327e9f8725568c722bdcb8481eacbce306f438216a2420dab76380"
const ORIGINAL_PROOF_KEYS=['defaults','engineHashes','engineRevision','groups','trace']
const PROOF_SHA256="babd71eaa8a7d24ce24f7c37dcfe65f637cc8bbdf80431c7f3f22eda6ec57b54"
const FULL_SOURCE_HEADER={"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups=[[0],[1],[2],[3],[4],[5],[6],[7]]
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7]]
const RAW_COUNT=8
const ORIGINAL=[[{"kind":"cdDrawCurve","args":[70.15,15,47.2,72,13.2,117,0,7]}],[{"kind":"cdDrawLine","args":[47.2,73,47.2,186,0,0]}],[{"kind":"cdDrawLine","args":[126.30000000000001,18,126.30000000000001,98,0,32]}],[{"kind":"cdDrawCurve","args":[79,36,97.7,51,103.2,80,7,8]}],[{"kind":"cdDrawCurve","args":[168.1,35,158.2,57,141.7,84,0,7]}],[{"kind":"cdDrawLine","args":[69.1,98,186.8,98,0,0]}],[{"kind":"cdDrawCurve","args":[113.1,98,109.80000000000001,169,60.3,188,132,7]}],[{"kind":"cdDrawLine","args":[139.5,98,139.5,169,32,1]},{"kind":"cdDrawCurve","args":[139.5,169,139.5,179,149.5,179,1,1]},{"kind":"cdDrawLine","args":[149.5,179,180.2,179,6,5]}]]
const TRACE_SHA256="932ad9a1a0e0ac45bcadaa7e20dd37e7c69f2439fb0a23bffd18575c4ae36807"
const GROUPS_SHA256="b4b6fbdec3e41b5bf5e71b0cbd0de66879fe5e606af8e9111d073c506617a726"
const PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
const SOURCE_PINS={"docs/hanja-goal-glyphwiki-batch84-2026-09-27/NOTICE.md":"9ff60594104db2e79e4374169d4cd593cd2b13a6ba1b7d0704a0f974311704e2","docs/hanja-goal-glyphwiki-batch84-2026-09-27/README.md":"241e0685552563a77040592671f98cb0cde74e74b67e1819780ef2409ba7a16b","docs/hanja-goal-glyphwiki-batch84-2026-09-27/alternative-sources.json":"f0ab823b5ea123fdeec8340c44648fbc0aa8673e5be8f3db61bd2b96112d0b83","docs/hanja-goal-glyphwiki-batch84-2026-09-27/draw-trace.json":"a91b11eebecaf243d600c3dc221549d9847e01f8df9dcc4ba3b46d98e9a5e25c","docs/hanja-goal-glyphwiki-batch84-2026-09-27/engine-proof.json":"21132befb74813379264e18eba2f50f8b8661152f9ccf8d6b20ea2b1c9807a32","docs/hanja-goal-glyphwiki-batch84-2026-09-27/findings.json":"74f5b84abcf4f74f25ac67a528e869455ae1861197dadff46891b0079fbbd63f","docs/hanja-goal-glyphwiki-batch84-2026-09-27/metadata.json":"c3f70efec2864e6a2fcb364a3813d567bad8a376554c4a7aa49cfd5487ef3ed5","docs/hanja-goal-glyphwiki-batch84-2026-09-27/next.json":"d66340bd1cfcac3dc55870cf3b13e55492961f808d20eaf57203ad3ea25b389b","docs/hanja-goal-glyphwiki-batch84-2026-09-27/presets.json":"f7954376060326f00bc3a5fb8ed380ce7cd3503a362ef59d6c767babe85e5f31","docs/hanja-goal-glyphwiki-batch84-2026-09-27/serve.py":"3179f647ebe2ff62bc140eeafea2178b5ad6001dd0365d61a18ea2b262f3cb09","docs/hanja-goal-glyphwiki-batch84-2026-09-27/sources.json":"d4053e74f3794f4776872544d3fa46630825bcb3fb5ac6f4d558a76e4747a59b","docs/hanja-goal-glyphwiki-batch84-2026-09-27/validation.json":"a2ba9369a85d0b944847b8a299ac9bce4496eaf263e1fd3d987e838eb4295ca5","docs/hanja-goal-glyphwiki-batch84-2026-09-27/verify.mjs":"ddcef6a69acd8b457141397724b55029bd6e911d0d8b5e7af58bdcd154b65db6","docs/hanja-remaining-source-recovery-u7628-2026-10-18/progressive.mjs":"7e59b053af205f184bb56cdfcda95d9d5fe9cbf0adbc7bb2c8d4b96e4def3ddc","docs/hanja-remaining-five-source-recovery-2026-10-17/capture.mjs":"729b73bc2a5ad8febc04261928eca0725be1a2926cc4dfc4e06ec31321eed2b7","docs/hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","docs/hanja-current-source-u4f8a-2026-10-18/sources.json":"7faba9a455063475a411c93216f9c34eec555ca923d63d75e0db61e48ada6ba4","docs/hanja-current-source-u4f8a-2026-10-18/engine-whole-u4f8a.json":"f2ccf3acf2327e9f8725568c722bdcb8481eacbce306f438216a2420dab76380"}
function validateSelectedProof(trace,proof,identity){assert.deepEqual(identity,SELECTED_PROOF_IDENTITY,'Exact explicit selected source identity');assert(proof&&typeof proof==='object'&&!Array.isArray(proof));for(const[file,hash]of Object.entries(SOURCE_PINS))assert.equal(createHash('sha256').update(readFileSync(new URL('../../'+file,import.meta.url))).digest('hex'),hash,file);assert.deepEqual(Object.keys(proof).sort(),ORIGINAL_PROOF_KEYS);assert.equal(digest(proof),PROOF_SHA256);assert.deepEqual(trace,proof.trace);assert.equal(digest(trace),TRACE_SHA256);assert.equal(digest(proof.groups),GROUPS_SHA256);assert.deepEqual(Object.fromEntries(Object.entries(proof).filter(([key])=>key!=='trace'&&key!=='groups')),FULL_SOURCE_HEADER)}
let positiveCompilations=0
export function sourceCompileCallCount(){return positiveCompilations}
export function compileProgressive(...args){assert.equal(args.length,3,'Exactly3 explicit arguments');const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const result=compileBound(trace,proof,identity);positiveCompilations++;return result}
export function compileSourceWhole(...args){assert.equal(args.length,4,'Exactly4 explicit arguments');const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export const nativeApproved=false,runtimeApplied=false
