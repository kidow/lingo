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

const SELECTED_PROOF_IDENTITY={"sourceRoot":"u6678","sourceProofFile":"./engine-whole-u6678.json","sourceProofFileSha256":"6fa18ca35d149aa31fc313faf2e0ae7770556aa07129e4bc9e76355a0c59c8e9","sourceCapsuleFile":"./sources.json","sourceCapsuleFileSha256":"9b62cdba5b2944811484211675c32a57ee2993c3f3147aa419c70b0b4817a80f"}
export const selectedProofIdentity=structuredClone(SELECTED_PROOF_IDENTITY)
export const sourceRoot='u6678'
export const sourceProofFile='./engine-whole-u6678.json'
export const sourceProofFileSha256="6fa18ca35d149aa31fc313faf2e0ae7770556aa07129e4bc9e76355a0c59c8e9"
const ORIGINAL_PROOF_KEYS=['defaults','engineHashes','engineRevision','groups','trace']
const PROOF_SHA256="1e7551f7cf3e736b287251e23b9c1ecb05fce1b4a38c23348932b0a44fe5595d"
const FULL_SOURCE_HEADER={"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}}
export const sourceGroups=[[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13]]
const ORIGINAL_SOURCE_GROUPS=[[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13]]
const RAW_COUNT=14
const ORIGINAL=[[{"kind":"cdDrawLine","args":[49,21.93,49,67.01,12,113]}],[{"kind":"cdDrawLine","args":[49,21.93,151,21.93,2,2]}],[{"kind":"cdDrawLine","args":[151,21.93,151,67.01,22,23]}],[{"kind":"cdDrawLine","args":[49,44.47,151,44.47,2,2]}],[{"kind":"cdDrawLine","args":[49,67.01,151,67.01,2,2]}],[{"kind":"cdDrawLine","args":[14,92.5,104,92.5,0,0]}],[{"kind":"cdDrawLine","args":[62,92.5,62,165,32,32]}],[{"kind":"cdDrawLine","args":[62,126.25,95,126.25,2,200]}],[{"kind":"cdDrawLine","args":[33,113.75,33,171.25,0,32]}],[{"kind":"cdDrawCurve","args":[14,174.375,51,169.375,107,156.875,0,7]}],[{"kind":"cdDrawCurve","args":[130.775,78.75,119.075,110.625,91.775,132.5,0,7]}],[{"kind":"cdDrawLine","args":[115.175,109.375,187.325,109.375,2,0]}],[{"kind":"cdDrawCurve","args":[160.025,109.375,148.325,170,73.25,187.5,132,7]}],[{"kind":"cdDrawCurve","args":[109.325,115.625,120.05,163.75,179.525,181.25,7,0]}]]
const TRACE_SHA256="d68c2254007f6a52abb2826eb9f540faa38bab0afd433b5f3226afbb45a58548"
const GROUPS_SHA256="060deb15887e2521ecbaed0cf72f95a95c836e4321ce1ef09e4ef48ab804c27d"
const PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
const SOURCE_PINS={"docs/hanja-goal-glyphwiki-batch234-2026-10-04/sources.json":"d6465b5ec5f421bea7718932c8fa02da77730e2801505fbeca6fc9f0b34f19b3","docs/hanja-goal-glyphwiki-batch234-2026-10-04/engine-proof.json":"356ad17f80065ed559267017262805a4748f3b2bf9378b8d962415f30d596237","docs/hanja-goal-glyphwiki-batch234-2026-10-04/draw-trace.json":"44ead57e36c82d1b70ad8a39bf2a04cf39bcfba511a21ef8b65f965fdd5c2c56","docs/hanja-goal-glyphwiki-batch234-2026-10-04/metadata.json":"22525f4172d19a42cd0eb809f50104b21243f891dfbb96bac15302d09350a2bc","docs/hanja-remaining-source-recovery-u7628-2026-10-18/progressive.mjs":"7e59b053af205f184bb56cdfcda95d9d5fe9cbf0adbc7bb2c8d4b96e4def3ddc","docs/hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","docs/hanja-current-source-u6678-2026-10-18/sources.json":"9b62cdba5b2944811484211675c32a57ee2993c3f3147aa419c70b0b4817a80f","docs/hanja-current-source-u6678-2026-10-18/engine-whole-u6678.json":"6fa18ca35d149aa31fc313faf2e0ae7770556aa07129e4bc9e76355a0c59c8e9"}
function validateSelectedProof(trace,proof,identity){assert.deepEqual(identity,SELECTED_PROOF_IDENTITY,'Exact explicit selected source identity');assert(proof&&typeof proof==='object'&&!Array.isArray(proof));for(const[file,hash]of Object.entries(SOURCE_PINS))assert.equal(createHash('sha256').update(readFileSync(new URL('../../'+file,import.meta.url))).digest('hex'),hash,file);assert.deepEqual(Object.keys(proof).sort(),ORIGINAL_PROOF_KEYS);assert.equal(digest(proof),PROOF_SHA256);assert.deepEqual(trace,proof.trace);assert.equal(digest(trace),TRACE_SHA256);assert.equal(digest(proof.groups),GROUPS_SHA256);assert.deepEqual(Object.fromEntries(Object.entries(proof).filter(([key])=>key!=='trace'&&key!=='groups')),FULL_SOURCE_HEADER)}
let positiveCompilations=0
export function sourceCompileCallCount(){return positiveCompilations}
export function compileProgressive(...args){assert.equal(args.length,3,'Exactly3 explicit arguments');const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const result=compileBound(trace,proof,identity);positiveCompilations++;return result}
export function compileSourceWhole(...args){assert.equal(args.length,4,'Exactly4 explicit arguments');const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export const nativeApproved=false,runtimeApplied=false
