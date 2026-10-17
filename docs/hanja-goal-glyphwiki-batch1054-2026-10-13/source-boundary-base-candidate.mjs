export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// Provisional source-only review compiler. Domestic order and browser approval are pending.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'

const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const endpoint = (call) => call.args.slice(call.kind === 'cdDrawLine' ? 2 : call.kind === 'cdDrawCurve' ? 4 : 6, call.kind === 'cdDrawLine' ? 4 : call.kind === 'cdDrawCurve' ? 6 : 8)
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })

function compileBound(trace, proof, profile) {
  const { RAW_COUNT, ORIGINAL, TRACE_SHA256, GROUPS_SHA256, PINNED_DEFAULTS, ENGINE_REVISION, ENGINE_HASHES, UP_TAIL_GROUPS, LEFT_TAIL_GROUPS, FIFTEEN_TAIL_GROUPS, SINGLE_CARDINAL_TIP_RAW, sourceGroups } = profile
  assert.deepEqual(trace, proof.trace, 'The selected original whole trace is part of the full proof')
  if (proof.sourceRoot !== undefined) assert.equal(proof.sourceRoot, profile.sourceRoot)
  if (proof.sourceProofFile !== undefined) assert.equal(proof.sourceProofFile, profile.sourceProofFile)
  assert.equal(digest({ engineRevision: proof.engineRevision, engineHashes: proof.engineHashes, groups: proof.groups, trace: proof.trace, defaults: proof.defaults }), profile.FULL_PAYLOAD_SHA256)
  const consumedPolygons = new Set()
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
    for (const polygon of polygons) { assert(!consumedPolygons.has(polygon), 'An original polygon cannot be emitted twice'); consumedPolygons.add(polygon) }
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
    return { polygons: [terminal.polygons.at(-1)], directions: ['up'], weights: [jump / 2] }
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
    return { polygons: [terminal.polygons.at(-1)], directions: ['left'], weights: [jump / 2] }
  }
  const terminalFifteen = (indices) => {
    const terminal = trace[indices.at(-1)].at(-1)
    assert.equal(terminal.kind, 'cdDrawBezier')
    const [x1, y1, cx1, cy1, cx2, cy2, x2, y2, ta1, ta2] = terminal.args
    assert(y1 < y2); assert.equal(ta2 % 100, 15); assert.equal(terminal.polygons.length, 3)
    const width = proof.defaults.kMinWidthT, jump = proof.defaults.kWidth * 5
    const expected = [point(x2, y2 - width + 1), point(x2 + 2, y2 - width - jump), point(x2, y2 - width - jump), point(x2 - width, y2 - width + 1)]
    assert.deepEqual(terminal.polygons.at(-1), expected, 'Original terminal15 up-tail formula is identity evidence only')
    const nib = terminal.polygons[1], up = terminal.polygons[2]
    const nibWidth = Math.max(...nib.map(p => p.x)) - Math.min(...nib.map(p => p.x))
    const upHeight = Math.max(...up.map(p => p.y)) - Math.min(...up.map(p => p.y))
    return { polygons: [nib, up], directions: ['right', 'up'], weights: [nibWidth / 2, upHeight / 2] }
  }
  const tails = new Map()
  for (const indices of UP_TAIL_GROUPS) tails.set(JSON.stringify(indices), terminalUpTail(indices))
  for (const indices of LEFT_TAIL_GROUPS) tails.set(JSON.stringify(indices), terminalLeftTail(indices))
  for (const indices of FIFTEEN_TAIL_GROUPS) tails.set(JSON.stringify(indices), terminalFifteen(indices))
  const compile = (indices, tail) => {
    const calls = indices.flatMap(index => trace[index]).map(call => ({ ...call, polygons: [...call.polygons] }))
    if (tail) for (const polygon of [...tail.polygons].reverse()) assert.deepEqual(calls.at(-1).polygons.pop(), polygon)
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
    return tail ? [compile(indices, tail), ...tail.polygons.map((polygon, index) => segment([polygon], tail.directions[index], tail.weights[index]))] : [compile(indices)]
  })
  const emittedPolygonCount = outlines.flat().reduce((sum, mask) => sum + (mask.outline.match(/M/g)?.length ?? 0), 0)
  assert.equal(emittedPolygonCount, trace.flatMap(calls => calls.flatMap(call => call.polygons)).length, 'Every original polygon must be emitted in exactly one mask')

  assert.equal(consumedPolygons.size, emittedPolygonCount)
  for (const polygon of trace.flatMap(rows => rows.flatMap(call => call.polygons))) assert(consumedPolygons.has(polygon))

  // Terminal13 original polygons retain their full cardinal bounds; no authored tip.
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
    assert(call.polygons.length >= 1);
    assert.equal(outlines[index].length, 1);
    assert.equal(outlines[index][0].direction, 'down');
    assert.equal(outlines[index][0].revealPath, undefined);
    const points = call.polygons.flat();
    assert.deepEqual(outlines[index][0].bounds, [Math.min(...points.map(p => p.x / 2)), Math.min(...points.map(p => p.y / 2)), Math.max(...points.map(p => p.x / 2)), Math.max(...points.map(p => p.y / 2))]);
  }
  return outlines
}

import {readFileSync} from 'node:fs'
const byteSHA=v=>createHash('sha256').update(v).digest('hex')
const INPUT_PINS=Object.freeze({"NOTICE.md":"477444bc28de5c4c835d5546471dc79d64122ec8fc198dd95d47e902d90d91c7","candidate-compile-analysis.json":"4b1ac26296c579810acf351bde001e82953c57b7a4a8a64fcb9794d9c38aa161","engine-proof.json":"98d07cd2de607719ba66f249e500f7898973912dd5268dcf9ad6a02307af3949","engine-whole-u9079-g.json":"bd4fb6410f5e7a1bd2b169c693581d3a45a2637ae9cfb750768048a50a166f1c","engine-whole-u9079-j.json":"96316eb6fc2ade81711f41ce67b735d4fa687b902455f4526c3d804ce6c14e3b","engine-whole-u9079-k.json":"96316eb6fc2ade81711f41ce67b735d4fa687b902455f4526c3d804ce6c14e3b","engine-whole-u9079-ue0100.json":"96316eb6fc2ade81711f41ce67b735d4fa687b902455f4526c3d804ce6c14e3b","engine-whole-u9079-ue0101.json":"96316eb6fc2ade81711f41ce67b735d4fa687b902455f4526c3d804ce6c14e3b","engine-whole-u9079-ue0102.json":"0848b462b98f241fe2f1331c5cf9eec9d518f45009c18f40c09dfc24b3a0324f","engine-whole-u9079-var-001.json":"6e5a1d93ccf33131670497cb0a2d786fee282073f3f90f77f47020afc6703779","engine-whole-u9079-var-002.json":"5b21487c8880df543f939edfc9776e0048b24144df0d4237f32f7dc55619f55a","engine-whole-u9079.json":"98d07cd2de607719ba66f249e500f7898973912dd5268dcf9ad6a02307af3949","metadata.json":"be923c8734cafb76a59c43a7dfc713bfc50c8f83528ffee77f6364ff1e80f24f","native-preflight-source-analysis.json":"5607ba3c96e523e452d5e00e10a60961702be3fa1d6118d972b6e71ee2a018e4","native-server-preparation-source-analysis.json":"eef5fb0e17f25351ce69840f559cf4101a5a3dd10a6f03a64b5e16d555de4605","native-server-validation.json":"ce81e7ac0eae9e14325b82ed5b22e784d6734b5abeaf3653a5847457dd3441b3","progressive.mjs":"c47ad2bdac9231db87a83895abb852483104bf6339d3d57f0c1635aa77e09a1b","serve-progressive.py":"b86b36a316c7c9bde6db2ab32b65eefd097a489b0f363c383076039eb13d3b46","serve-whole.py":"854f51bfdb06b8bcd104118bec4101d8f1d95bfc991c241893cedfdc83eb0257","server-compile.mjs":"6aa2aa89076188ed96b2008503963ded25dd276ded2d89821fc8a3405257247e","source-analysis.json":"1a98d79c03a1311ecb4d2d04fe4a1c11454ab14b67391824d259c79483fccb12","source-join-analysis.json":"833e5336555975e197cc3499711364993e03b1ab43aa8e4e28e6aedca796e3f8","source-only-helper-readiness.json":"1512207bd9cce6317c07191b2a3d1876e132b1273cca3de2bd24abd5b9235e6b","source-verification.json":"b882e436162f72c43d795f2eb1f36f74f786655249db3da31711a908c81e7ae4","sources.json":"bf16b04275f5097241bfe5cf88a7248e215f06a9d877e9f04dbe68530bd59374","verify-source.mjs":"1951d47f7cdc518ddeb99092bef200fed3d27250cae78047a703a5361966e4f7","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","strict-source-candidate.mjs":"95dd870aa605ebb84d767c12e5c5fa8cede54eebd1d839f26e5794b837f5984e","strict-source-candidate.d.mts":"3c0ea06030b4d07cea7dd7e82ffd1cc132f985158a22b54ba24b8c3507680d73","server-compile-strict-candidate.mjs":"96c861a9d9ad1135bb12174ec4ff13c3d72b5b6f8263d695b927e0adeedaf1a1","strict-source-preparation.json":"c38af26e97dffcdc09d9474bc785aee32c78171d63d0d5e38d1dce4efb526a4d","serve-combined-native.py":"f058370ab740c9cc9bf6817f4132c2fd873ea072f45c109dde8b796241ecb31c","combined-native-source-pins.json":"5c92b153c0e62e1cbc43b091c4ac57b823eb03c13f639a3b59486ac71225d0f6"})
const PROFILE={"sourceRoot":"u9079","sourceProofFile":"engine-whole-u9079.json","sourceProofFileSHA256":"98d07cd2de607719ba66f249e500f7898973912dd5268dcf9ad6a02307af3949","sourceGroups":[[0],[1],[2,3],[4],[5],[6,7],[8],[9,10],[11],[12],[13],[14,15],[16],[17],[18],[19,20],[21]],"RAW_COUNT":22,"ORIGINAL":[[{"kind":"cdDrawCurve","args":[26.865,21,45.77,30,57.71,46,7,8]}],[{"kind":"cdDrawCurve","args":[15.92,57,34.825,65,48.755,81,7,8]}],[{"kind":"cdDrawLine","args":[13.93,107,49.75,107,0,2]}],[{"kind":"cdDrawLine","args":[49.75,107,49.75,158,22,300]}],[{"kind":"cdDrawCurve","args":[15.92,179,34.825,168,54.725,154,0,7]}],[{"kind":"cdDrawBezier","args":[52.735,152,67.66,172,83.58,181,178.105,177,7,0]}],[{"kind":"cdDrawLine","args":[80.4,21.14,152.82,21.14,0,2]}],[{"kind":"cdDrawCurve","args":[152.82,21.14,143.59,29.84,128.68,41.15,22,7]}],[{"kind":"cdDrawCurve","args":[104.53999999999999,28.97,123,34.19,131.51999999999998,46.37,7,8]}],[{"kind":"cdDrawLine","args":[73.3,48.11,168.44,48.11,0,2]}],[{"kind":"cdDrawCurve","args":[168.44,48.11,161.34,59.42,145.72,71.6,22,7]}],[{"kind":"cdDrawLine","args":[130.1,48.11,130.1,74.65,32,1]},{"kind":"cdDrawCurve","args":[130.1,74.65,130.1,84.65,120.1,84.65,1,14]}],[{"kind":"cdDrawCurve","args":[123,48.11,104.53999999999999,75.08,67.62,82.91,132,7]}],[{"kind":"cdDrawLine","args":[75.2028,93.35,75.2028,161.21,12,0]}],[{"kind":"cdDrawLine","args":[75.2028,93.35,170.79719999999998,93.35,2,2]}],[{"kind":"cdDrawLine","args":[170.79719999999998,93.35,170.79719999999998,149.47,22,1]},{"kind":"cdDrawCurve","args":[170.79719999999998,149.47,170.79719999999998,159.47,160.79719999999998,159.47,1,114]}],[{"kind":"cdDrawCurve","args":[110.3478,93.35,106.83330000000001,113.36,81.52890000000001,127.28,132,7]}],[{"kind":"cdDrawLine","args":[136.3551,94.22,136.3551,107.275,32,1]},{"kind":"cdDrawCurve","args":[136.3551,107.275,136.3551,117.275,146.3551,117.275,1,5001]},{"kind":"cdDrawLine","args":[146.3551,117.275,159.55079999999998,117.275,5006,5]}],[{"kind":"cdDrawLine","args":[102.20821799999999,127.35395,102.20821799999999,145.91105,12,313]}],[{"kind":"cdDrawLine","args":[102.20821799999999,127.35395,143.79178199999998,127.35395,2,2]}],[{"kind":"cdDrawLine","args":[143.79178199999998,127.35395,143.79178199999998,145.91105,22,323]}],[{"kind":"cdDrawLine","args":[102.20821799999999,145.91105,143.79178199999998,145.91105,2,2]}]],"TRACE_SHA256":"ae61d9b4e6c33b1bdd90250c99228efda1d22bdc45bb7fd3b144d8191bec6a44","GROUPS_SHA256":"6102849c2ab175ce8bb96e366f54fa59acccb67940c56af8769f2580e07ae830","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"FULL_PAYLOAD_SHA256":"e8fcab9e9b24dcd4e6a0c3e88a6011929a995c8fa1ce72e329a1c65fec4028f4","UP_TAIL_GROUPS":[[17]],"LEFT_TAIL_GROUPS":[[11],[14,15]],"FIFTEEN_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[18]}
export const selectedProofIdentity=Object.freeze({"root":"u9079","file":"engine-whole-u9079.json","fileSHA256":"98d07cd2de607719ba66f249e500f7898973912dd5268dcf9ad6a02307af3949"})
export const sourceRoot=selectedProofIdentity.root
export const sourceGroups=Object.freeze([[6,7],[8],[9,10],[11],[12],[13],[14,15],[16],[17],[18],[19,20],[21],[0],[1],[2,3],[4,5]].map(g=>Object.freeze(g)))
export const baselineSourceGroups=Object.freeze([[0],[1],[2,3],[4],[5],[6,7],[8],[9,10],[11],[12],[13],[14,15],[16],[17],[18],[19,20],[21]].map(g=>Object.freeze(g)))
export const nativeApproval=false
export const runtimeApplied=false
const FULL_PROOF_SHA256='250f7b3fbadd2607aeeb4d935b3e027a97a135e01ecb4f8fc06471d6470c9a90'
function pins(){for(const[f,h]of Object.entries(INPUT_PINS))assert.equal(byteSHA(readFileSync(new URL(f,import.meta.url))),h,f)}
pins()
// 원본 compileBound는17획만 생성한다. 이 경계 실험은 원 마스크 참조만 재배치한다.
export function verifyBoundaryLayout(strokes){
 assert.equal(strokes.length,16);assert.equal(strokes.flat().length,20)
 assert.equal(strokes[15].length,2,'마지막16획은 원Q와 원Bezier 두 마스크')
 const q=strokes[15][0],c=strokes[15][1]
 assert.equal(q.direction,'curve');assert.equal(c.direction,'curve')
 assert.equal(q.revealPath,'M7.96 89.5 Q17.4125 84 27.3625 77')
 assert.equal(c.revealPath,'M26.3675 76 C33.83 86 41.79 90.5 89.0525 88.5')
 assert.equal(q.revealWidth,14);assert.equal(c.revealWidth,14)
 assert.equal((q.outline.match(/M/g)||[]).length,3);assert.equal((c.outline.match(/M/g)||[]).length,2)
 return true
}
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3,'Exactly three explicit arguments required')
 assert.deepEqual(identity,selectedProofIdentity,'원래 identity3/대소문자/경로 그대로 필요')
 pins();assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','sourceProofFile','sourceProofFileSHA256','sourceRoot','trace'])
 assert.equal(byteSHA(JSON.stringify(proof)),FULL_PROOF_SHA256,'base 전체 full8 proof 고정')
 assert.deepEqual(trace,proof.trace);const before=JSON.stringify(proof)
 const baseline=compileBound(trace,proof,PROFILE)
 assert.equal(baseline.length,17);assert.equal(baseline.flat().length,20)
 const out=[...baseline.slice(5),baseline[0],baseline[1],baseline[2],[...baseline[3],...baseline[4]]]
 for(let i=0;i<12;i++)assert.strictEqual(out[i],baseline[i+5])
 for(let i=0;i<3;i++)assert.strictEqual(out[i+12],baseline[i])
 assert.strictEqual(out[15][0],baseline[3][0]);assert.strictEqual(out[15][1],baseline[4][0])
 assert.equal(JSON.stringify(proof),before);verifyBoundaryLayout(out);return out
}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4,'Exactly four explicit arguments required');assert.equal(root,sourceRoot,'base whole만 허용');return compileProgressive(trace,proof,identity)}
