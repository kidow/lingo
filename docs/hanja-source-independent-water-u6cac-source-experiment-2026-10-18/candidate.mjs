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
  assert.deepEqual(proof.engineHashes, ENGINE_HASHES)
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

const read=f=>readFileSync(new URL(f,import.meta.url)),obj=f=>JSON.parse(read(f)),sha=v=>createHash('sha256').update(v).digest('hex'),T=obj('config.json').targets.u6cac
const FIXED_IDENTITY={"root":"u6cac","headerFile":"../hanja-goal-glyphwiki-batch562-2026-10-11/engine-proof.json","headerFileSHA256":"b7a778e92dae2c50c18200499500428169649c1220c8da742d16846c4400b13f","traceFile":"../hanja-goal-glyphwiki-batch562-2026-10-11/draw-trace.json","traceFileSHA256":"87fb4b6dadbed5a462816fca2a835ae514a4676e8a1d0403a76b2790a569784a","sourceFile":"../hanja-goal-glyphwiki-batch562-2026-10-11/sources.json","sourceFileSHA256":"c1b4934813fecdc15b8b5ddce1dbcb3ab50323b95adfb51f3eeb17e6ad89134e"},FIXED_PINS={"../hanja-goal-glyphwiki-batch562-2026-10-11/NOTICE.md":"1301216fba15a8456004805e13ebfd76e3f44e0587e2135ccd50fc86247f4887","../hanja-goal-glyphwiki-batch562-2026-10-11/README.md":"0a1cb6f67648c32a0b3188ff30d414de3451e0e3148f2d1d953170643bbdc971","../hanja-goal-glyphwiki-batch562-2026-10-11/draw-trace.json":"87fb4b6dadbed5a462816fca2a835ae514a4676e8a1d0403a76b2790a569784a","../hanja-goal-glyphwiki-batch562-2026-10-11/engine-proof.json":"b7a778e92dae2c50c18200499500428169649c1220c8da742d16846c4400b13f","../hanja-goal-glyphwiki-batch562-2026-10-11/engine-whole-u6cac-ue0100.json":"214a634f74d4d068449975d9ab8c97f21406cb1c53bf4813ec83ff236015fbb7","../hanja-goal-glyphwiki-batch562-2026-10-11/engine-whole-u6cac.json":"214a634f74d4d068449975d9ab8c97f21406cb1c53bf4813ec83ff236015fbb7","../hanja-goal-glyphwiki-batch562-2026-10-11/metadata.json":"2f19c4424348d3e3228e2ddd7e87c1d62eb951a99028a7e2f05f24359901dca1","../hanja-goal-glyphwiki-batch562-2026-10-11/progressive-review.json":"62b5902935434575775144d072bfdce0755195935d20f04157bcb8fb8f300b86","../hanja-goal-glyphwiki-batch562-2026-10-11/resume.json":"2c80eb7536626ac8f6493e62ca937a402e9b55113b865fc46149cc09f32a6d6c","../hanja-goal-glyphwiki-batch562-2026-10-11/serve-variants.py":"934cb8e293c4d8558744cfd779fc73493adb727aae9df66f0086eb49054779af","../hanja-goal-glyphwiki-batch562-2026-10-11/sources.json":"c1b4934813fecdc15b8b5ddce1dbcb3ab50323b95adfb51f3eeb17e6ad89134e","../hanja-goal-glyphwiki-batch562-2026-10-11/validation.json":"1c9d13ed18100d8b68e336ce789fc673cb9206450800dde643ce30014dbe1e64","../hanja-goal-glyphwiki-batch562-2026-10-11/verify-source.mjs":"df279a8d9dd1a4620af3aa75c0a6664260a9247812ca8cc6e4841999de489dbd","../hanja-goal-glyphwiki-batch562-2026-10-11/whole-variant-inventory.json":"7016ab6489b1e779e4859ed89c830396dcdc5e143fbcfe42aca159203cf93d3e","../hanja-source-independent-lq-hq-u5a0d-source-experiment-2026-10-18/candidate.mjs":"08f570a6a3b0e23182cee9194aa69e77fa5edb675105e364d7b9f3fc48455e7a","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09"},FIXED_PROOF_SHA="da0a8066b115bd61fe3d6d008144846c4887246daa0a5f850061ac88ff9c5745"
export const selectedProofIdentity=Object.freeze({...FIXED_IDENTITY}),sourceRoot='u6cac',sourceGroups=[[0],[1],[2,3],[4],[5],[6],[7],[8]],nativeApproval=false,runtimeApplied=false
const rawSourceGroups=[[0],[1],[2],[3],[4],[5],[6],[7],[8]],ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8]],RAW_COUNT=9
const ORIGINAL=[[{"kind":"cdDrawCurve","args":[28.18,20,47.68,27,56.26,41,7,8]}],[{"kind":"cdDrawCurve","args":[13.36,66,34.42,73,42.22,87,7,8]}],[{"kind":"cdDrawCurve","args":[14.92,133,42.22,142,39.1,184,7,8]}],[{"kind":"cdDrawCurve","args":[35.2,150,38.32,138,71.08,67,32,7]}],[{"kind":"cdDrawLine","args":[75.7,53,178,53,0,0]}],[{"kind":"cdDrawLine","args":[71.3,96,185.7,96,0,0]}],[{"kind":"cdDrawLine","args":[125.19999999999999,16,125.19999999999999,187,0,0]}],[{"kind":"cdDrawCurve","args":[117.5,96,96.6,147,54.8,179,132,7]}],[{"kind":"cdDrawCurve","args":[131.8,96,154.9,148,180.2,166,7,0]}]],TRACE_SHA256="d313a3d5fe06c24cd1f6e551eede8dc5c40ddc8c188cee5ec1a00531193eccce",GROUPS_SHA256="665a9649d3d810c45d2c28b7b9fc866fdd48be97f6b00aeed15b2e0f3afd421f"
const PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
const FIXED_RAW_SHA="0102d22e747f39cc1a3c225ab34e8443b4506e2a94cef018fd480083a89acbcd",FIXED_DERIVED_SHA="acf17ee20a477fe122d242041477ee6ea542c7264db0b9ae9380f6a5ae4ee95b"
function validateSelectedProof(trace,proof,id){assert.equal(T.rawBaselineSHA256,FIXED_RAW_SHA);assert.equal(T.derivedSHA256,FIXED_DERIVED_SHA);assert.deepEqual(T.identity,FIXED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert(id&&Object.getPrototypeOf(id)===Object.prototype);assert.deepEqual(id,FIXED_IDENTITY);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(read(f)),h,f);assert.deepEqual(proof,{...obj(id.headerFile),trace:obj(id.traceFile)})}
let sourceRuns=0,deriveRuns=0,cachedCalls=0
export const sourceCompileCallCount=()=>sourceRuns,geometryDerivationCallCount=()=>deriveRuns,cachedPositiveCallCount=()=>cachedCalls
export function captureRawGeometry(...args){assert.equal(args.length,3);const[trace,proof,id]=args;validateSelectedProof(trace,proof,id);assert.equal(sourceRuns,0);sourceRuns++;return compileBound(trace,proof,id)}
export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,id]=args;validateSelectedProof(trace,proof,id);assert.equal(deriveRuns,0);const f=obj('fixtures.json').u6cac,rawBaseline=f.rawBaseline;assert.equal(digest(rawBaseline),T.rawBaselineSHA256);const strokes=sourceGroups.map(indices=>indices.flatMap(i=>rawBaseline[i]));deriveRuns++;return{rawBaseline,strokes}}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,id]=args;validateSelectedProof(trace,proof,id);const f=obj('fixtures.json').u6cac;assert.equal(digest(f.fullProof),FIXED_PROOF_SHA);assert.equal(digest(f.rawBaseline),T.rawBaselineSHA256);assert.equal(digest(f.strokes),T.derivedSHA256);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,id]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,id)}
