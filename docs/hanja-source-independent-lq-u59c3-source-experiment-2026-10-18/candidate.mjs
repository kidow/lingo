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
  assert.deepEqual(rawSourceGroups, ORIGINAL_SOURCE_GROUPS, "Pinned numeric source grouping; no native order approval")
  assert.equal(trace.length, RAW_COUNT)
  assert.equal(proof.groups.length, RAW_COUNT)
  assert.deepEqual(trace.map(row => row.map(call => ({ kind: call.kind, args: call.args }))), ORIGINAL)
  assert.equal(digest(trace), TRACE_SHA256, 'Every original trajectory and polygon must match the selected whole root')
  assert.equal(digest(proof.groups), GROUPS_SHA256)
  assert.deepEqual(proof.defaults, PINNED_DEFAULTS)
  assert.equal(proof.engineRevision, ENGINE_REVISION)
  assert.deepEqual(proof.hashes, ENGINE_HASHES)
  const rawIndices = rawSourceGroups.flat()
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
  const outlines = rawSourceGroups.map(indices => {
    const tail = tails.get(JSON.stringify(indices))
    return tail ? [compile(indices, tail), segment([tail.polygon], tail.direction, tail.jump / 2)] : [compile(indices)]
  })
  const emittedPolygonCount = outlines.flat().reduce((sum, mask) => sum + (mask.outline.match(/M/g)?.length ?? 0), 0)
  assert.equal(emittedPolygonCount, trace.flatMap(calls => calls.flatMap(call => call.polygons)).length, 'Every original polygon must be emitted in exactly one mask')

  // Terminal13 is one original emitted polygon, not a separate authored tip.
  // Keep its full original bounds in a cardinal down mask; do not invent a curve connector or split geometry.
  for (const raw of SINGLE_CARDINAL_TIP_RAW) {
    const index = rawSourceGroups.findIndex(indices => indices.length === 1 && indices[0] === raw);
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

const local=n=>new URL(n,import.meta.url),json=n=>JSON.parse(readFileSync(local(n),'utf8')),sha=b=>createHash('sha256').update(b).digest('hex')
const FIXED_PINS={"../hanja-goal-glyphwiki-batch93-2026-09-27/NOTICE.md":"70208a8857e1069a84b767b86c90581a55af6a9e06e17d4bc466ad416f64821f","../hanja-goal-glyphwiki-batch93-2026-09-27/README.md":"4c0b6a300e852271e277a8dfd3ab911a5140d644528ed58f45b29cd589b399f1","../hanja-goal-glyphwiki-batch93-2026-09-27/alternative-sources.json":"c20f0f5a60a90fbdf28f6d34deee5aebe58c03cd64b680a97e86cba41dd69033","../hanja-goal-glyphwiki-batch93-2026-09-27/draw-trace.json":"c49272e4a5c7eb2991627e47bb5e167bd1dd2373c1a4f2690ed46f3573c88524","../hanja-goal-glyphwiki-batch93-2026-09-27/engine-proof.json":"775ba023fa5e5bc996acdccfe2c29a85b2638411280f2cc23a36f6083b245e96","../hanja-goal-glyphwiki-batch93-2026-09-27/findings.json":"b6f9bd8664fb73be04799ea8cee9f48010c8cfacd1a18e93704a017cda877bdc","../hanja-goal-glyphwiki-batch93-2026-09-27/metadata.json":"693093dd6ae9f9545926f34b356c9001923b757f8c0008129a45ebd1b236e65d","../hanja-goal-glyphwiki-batch93-2026-09-27/next-inventory.json":"2edfb3c51ef47389d797edcb91cffe4269be010b52f2321775abfa7144ab2613","../hanja-goal-glyphwiki-batch93-2026-09-27/next.json":"0638ed7d322338cd5e6eb8edd71b86ea6fe29fe57ca195f7ee67412e45767236","../hanja-goal-glyphwiki-batch93-2026-09-27/serve.py":"928ceb121e0d766d84d8961d86891f34fe01ce1bd4f9889b6e7abe1968fc9459","../hanja-goal-glyphwiki-batch93-2026-09-27/sources.json":"d1775ed4c6668670c11e628916f95b91c750ecaf5e2dd7303a2f2331066081d2","../hanja-goal-glyphwiki-batch93-2026-09-27/validation.json":"2150b7fadac4bb4f218d8709c67febb23ad018602310c77a07b4a8e5922474f9","../hanja-goal-glyphwiki-batch93-2026-09-27/verify.mjs":"d494526f4b4940b6a4d9c65a2ace80b10065870a80efb84014b60687cce387c6","../hanja-source-regroup-u6e3d-source-experiment-2026-10-18/candidate.mjs":"734a82fdd306423689e120c527fcb909beacd736b57672c7c806057f6d4ad98c","../hanja-source-regroup-u6e3d-source-experiment-2026-10-18/serve.py":"911747052853013c1a49cd76108b46d5f76e663761dedd41fda63d66df300765","../hanja-goal-glyphwiki-batch719-2026-10-12/progressive.mjs":"17f21ae041455f0a5e6d46f8bdbe6d8d2c9e736cf9ce550367e02a83979f4063","../hanja-goal-glyphwiki-batch1183-2026-10-18/review.json":"aff8d111b4574eeda09ae93dc134eb9c543e2340f9b829e73eadc234a7a65634","../hanja-remaining-source-recovery-u7628-2026-10-18/progressive.mjs":"7e59b053af205f184bb56cdfcda95d9d5fe9cbf0adbc7bb2c8d4b96e4def3ddc","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},FIXED_PROOF_SHA="531caa0af584c9f9949efb8851f7e13faf2abd59599af3aaa0758d9ec5f0e4df"
const T=json('./config.json').targets.u59c3, EXPECTED_IDENTITY={"root":"u59c3","headerFile":"../hanja-goal-glyphwiki-batch93-2026-09-27/engine-proof.json","headerFileSHA256":"775ba023fa5e5bc996acdccfe2c29a85b2638411280f2cc23a36f6083b245e96","traceFile":"../hanja-goal-glyphwiki-batch93-2026-09-27/draw-trace.json","traceFileSHA256":"c49272e4a5c7eb2991627e47bb5e167bd1dd2373c1a4f2690ed46f3573c88524","sourceFile":"../hanja-goal-glyphwiki-batch93-2026-09-27/sources.json","sourceFileSHA256":"d1775ed4c6668670c11e628916f95b91c750ecaf5e2dd7303a2f2331066081d2"}
const rawSourceGroups=[[0],[1],[2],[3],[4],[5],[6],[7],[8]],ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8]],RAW_COUNT=9
const ORIGINAL=[[{"kind":"cdDrawLine","args":[50.8,16,27.4,135,0,0]}],[{"kind":"cdDrawCurve","args":[29.2,118,63.4,129,80.5,156,7,8]}],[{"kind":"cdDrawCurve","args":[75.1,61,64.3,153,12.1,188,22,7]}],[{"kind":"cdDrawLine","args":[17.5,61,75.1,61,0,2]}],[{"kind":"cdDrawLine","args":[81.41,32,183.59,32,0,0]}],[{"kind":"cdDrawLine","args":[133.81,32,133.81,170,32,32]}],[{"kind":"cdDrawLine","args":[133.81,97,176.385,97,2,100]}],[{"kind":"cdDrawLine","args":[101.715,75,101.715,170,0,32]}],[{"kind":"cdDrawLine","args":[76.17,170,188.82999999999998,170,0,0]}]]
const TRACE_SHA256="e3fb89979342b76e91c2a8e66d17ceaa6d8cf4b76166e0bb0b8059a24bbb6900",GROUPS_SHA256="1133a0f1ca53d71450423ef31f55391ccee77329faa43e149d2babe9df115f6d"
const PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
const FIXED_BASELINE_SHA="2cb2786e006f0ca56006ab07bb69a7d8f72bbebfbe9a247f68c5f0a602c35c6a",FIXED_DERIVED_SHA="5bf8dcc41ca6530a68f6eed697d0cd3ed82f38d9868de0cb268dfe28d377d2c6"
function validateSelectedProof(trace,proof,identity){assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_DERIVED_SHA);assert.deepEqual(T.sourceGroups,sourceGroups);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),T.proofKeys);assert.equal(digest(proof),T.fullProofSHA256);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(T.inputSHA256))assert.equal(sha(readFileSync(local(f))),h,f);const header=json(identity.headerFile),originalTrace=json(identity.traceFile);assert.deepEqual(Object.keys(header).sort(),T.originalHeaderKeys);assert.deepEqual(proof,{...header,trace:originalTrace});const source=json(identity.sourceFile);assert.equal(source.root,T.root);assert.equal(source.glyph,T.glyph);assert.deepEqual(Object.keys(source.records).sort(),['u5973-01','u59c3','u6b63']);for(const r of Object.values(source.records))for(const row of r.data.split('$')){const f=row.split(':');if(f[0]==='99')assert(source.records[f[7]])}}
let geometryRuns=0,deriveRuns=0,cachedCalls=0
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot='u59c3',sourceGroups=[[0,1],[2],[3],[4],[5],[6],[7],[8]],nativeApproval=false,runtimeApplied=false
export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);geometryRuns++;return compileBound(trace,proof,identity)}
export function deriveIndependentMasks(...args){assert.equal(args.length,4);const[baseline,trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(sha(JSON.stringify(baseline)),T.baselineSHA256);assert.equal(baseline.length,9);assert(baseline.every(p=>p.length===1));assert.deepEqual(trace[0][0].args,[50.8,16,27.4,135,0,0]);assert.deepEqual(trace[1][0].args,[29.2,118,63.4,129,80.5,156,7,8]);assert.notDeepEqual(endpoint(trace[0][0]),trace[1][0].args.slice(0,2));const strokes=[[baseline[0][0],baseline[1][0]],...baseline.slice(2)];assert.equal(strokes.length,8);assert.equal(strokes.flat().length,9);assert.deepEqual(strokes.flat(),baseline.flat());deriveRuns++;return strokes}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const f=json('./fixtures.json').u59c3;assert.equal(digest(f.fullProof),T.fullProofSHA256);assert.equal(digest(f.strokes),T.derivedSHA256);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return deriveRuns}
export function cachedPositiveCallCount(){return cachedCalls}
