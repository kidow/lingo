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
const byteSHA=v=>createHash("sha256").update(v).digest("hex")
const INPUT_PINS=Object.freeze({"NOTICE.md":"77e002e3ef6ff18b2dab1aafc44295d10a08c230e5ef88b46485c3bc1e010b79","candidate-compile-analysis.json":"6e8afa5aa2d6628e9aafb07396c2126d20e75e6eb30a25083d411abb6639b412","combined-native-source-pins.json":"29a32749a17bfdb30f2194bb3cac53ad7d8be39296370a108a6517a727722040","engine-proof.json":"4fb9f44f1daeed5c1989f904695408a7384b2374d78b8678670c059edc78833a","engine-whole-u82fd-01.json":"9c50218c89f5af45283fcf8bffc5a4b9f69642cb40cc315f1163174de695d083","engine-whole-u82fd-k.json":"4e7bed3138e42c70a00f80a866afb69b9b8634cac9c6c64eec01e7814efec95d","engine-whole-u82fd-ue0100.json":"9bd184da24f56448a83d81d72f4c94d9b5c6e8d80140cfe6ac551bd942ae7d10","engine-whole-u82fd-ue0101.json":"9bd184da24f56448a83d81d72f4c94d9b5c6e8d80140cfe6ac551bd942ae7d10","engine-whole-u82fd-ue0102.json":"e47093cecc00fdcf8b44188acf30ae646b5ac657946dc91ec2799404fbbf3797","engine-whole-u82fd-ue0103.json":"fd12a29e066322200a4cbaf15a618ee22733b3036f8f3b69c69bb5f7d443508b","engine-whole-u82fd.json":"9bd184da24f56448a83d81d72f4c94d9b5c6e8d80140cfe6ac551bd942ae7d10","metadata.json":"75cdd16075d4eb9b898d9a0448c0d43303a8846ae1689b763c277d9d6395f217","native-server-input-pins.json":"b01c0e44d33f0079ddc7cb5fc23f5b65c166e637c93fef3b357938c8c40f227f","progressive.mjs":"ae4ea07ef00d3034f317bf73618e19407f802a3ff3baefbf137e0ee4bc3ba845","serve-combined-native.py":"ca555dd138377d1c062712b2c6f70e70af691594decba9b0398a595918c464d7","serve-native.py":"877594ea2a3b31306435ed753ac834765d8f4d8d9c07de872ecb5f892d707515","server-compile-strict-candidate.mjs":"d877b5a7c64c518bdc95b7805fdb11d5f970b4904ca39a0be72fa76326b7a4e5","source-analysis.json":"434709974749cd8b54323f9008eaab53b1dcbda1919990e42b0db2e66e90f125","source-join-analysis.json":"86a5e1ab17c0242ffcd8e1f58ede78b842c6ed68ff47c5496a475b5af581fda5","source-only-helper-readiness.json":"51c6f0bc3eedbe717e63752ed1b452abd7c0ffa373998c67cacbc1214b546578","sources.json":"4a8369844d5379d322e6e68a362198adac7b3d3bab2586fa6c4d8a173884cd71","strict-native-adapter.mjs":"9db601b754f060614d1a4bf32d1cea5005e8eb32390c429b04442324ff45b7b5","strict-native-server-preflight.json":"728ee6cc650503e36ba1e93a27b280f4138a6b0d06af52703bc6a800b6f24d4d","strict-source-candidate.d.mts":"7d480f04430f658e89a0b7411ea32fbc7fdc7495b7c44dc03dcdd45ed8f96998","strict-source-candidate.mjs":"f3fdc245be4339c508c60b402aa784f5abb28694ef0161b8616d8cc330e865d4","strict-source-preparation.json":"8853f0ac4baac8c33767f865d0ae92e76bd17be6c00c23692afb7b26aa593804","verify-source.mjs":"e2a5dc250f28cdc93e843a9d9a47f614d46125a3c9e823a1768fe99504f4c88c","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09"})
const PROFILE={"sourceRoot":"u82fd-ue0103","sourceProofFile":"./engine-whole-u82fd-ue0103.json","sourceProofFileSha256":"fd12a29e066322200a4cbaf15a618ee22733b3036f8f3b69c69bb5f7d443508b","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"4fb9f44f1daeed5c1989f904695408a7384b2374d78b8678670c059edc78833a","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"4a8369844d5379d322e6e68a362198adac7b3d3bab2586fa6c4d8a173884cd71","SELECTED_PROOF_IDENTITY":{"sourceRoot":"u82fd-ue0103","sourceProofFile":"./engine-whole-u82fd-ue0103.json","sourceProofFileSha256":"fd12a29e066322200a4cbaf15a618ee22733b3036f8f3b69c69bb5f7d443508b","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"4fb9f44f1daeed5c1989f904695408a7384b2374d78b8678670c059edc78833a","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"4a8369844d5379d322e6e68a362198adac7b3d3bab2586fa6c4d8a173884cd71"},"ORIGINAL_PROOF_KEYS":["defaults","engineHashes","engineRevision","groups","trace"],"PROOF_SHA256":"236cbcb6c74b75d47c7d9b9d02c31240a3ee427979712b06efdf2de7e0298747","FULL_SOURCE_HEADER":{"engineRevision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"defaults":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}},"sourceGroups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9]],"RAW_COUNT":10,"ORIGINAL":[[{"kind":"cdDrawLine","args":[12.935,28.64,93.53,28.64,0,100]}],[{"kind":"cdDrawLine","args":[63.68,8.88,63.68,47.64,0,300]}],[{"kind":"cdDrawLine","args":[135.32,8.88,135.32,47.64,0,300]}],[{"kind":"cdDrawLine","args":[105.47,28.64,186.065,28.64,0,0]}],[{"kind":"cdDrawCurve","args":[152.75,57.005,117.29,66.785,50.31,71.675,0,7]}],[{"kind":"cdDrawLine","args":[50.31,71.675,50.31,113.24,12,1]},{"kind":"cdDrawCurve","args":[50.31,113.24,48.34,167.03,17.805,188.22,1,7]}],[{"kind":"cdDrawLine","args":[93.65,69.22999999999999,93.65,171.105,32,32]}],[{"kind":"cdDrawCurve","args":[88.725,174.365,108.425,166.215,131.07999999999998,159.695,0,7]}],[{"kind":"cdDrawCurve","args":[113.35,145.84,131.07999999999998,155.62,138.96,175.18,7,8]}],[{"kind":"cdDrawCurve","args":[134.035,59.45,139.945,148.285,183.285,177.625,7,0]}]],"TRACE_SHA256":"0be16683638611c8d90bf955734f644503e34465488df48241cf1716d7b9b1f3","GROUPS_SHA256":"7fd77c20a9b1d4cb26bdfc1dc0a60e6fd8cf68d9b5c72dae0c4e92d56334315b","PINNED_DEFAULTS":{"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},"ENGINE_REVISION":"49232bac0348fe815f4200d4116ab7917e0db47f","ENGINE_HASHES":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"UP_TAIL_GROUPS":[],"LEFT_TAIL_GROUPS":[],"SINGLE_CARDINAL_TIP_RAW":[]}
const compiler=createPinnedCompiler(PROFILE)
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u82fd-ue0103","sourceProofFile":"./engine-whole-u82fd-ue0103.json","sourceProofFileSha256":"fd12a29e066322200a4cbaf15a618ee22733b3036f8f3b69c69bb5f7d443508b","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"4fb9f44f1daeed5c1989f904695408a7384b2374d78b8678670c059edc78833a","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"4a8369844d5379d322e6e68a362198adac7b3d3bab2586fa6c4d8a173884cd71"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const baselineSourceGroups=Object.freeze([[0],[1],[2],[3],[4],[5],[6],[7],[8],[9]].map(g=>Object.freeze(g)))
export const sourceMaskGroups=Object.freeze([[0],[1],[3],[2],[4],[5],[6,7],[8],[9]].map(g=>Object.freeze(g)))
export const sourceGroups=sourceMaskGroups
export const nativeApproval=false
export const runtimeApplied=false
function pins(){for(const[f,h]of Object.entries(INPUT_PINS))assert.equal(byteSHA(readFileSync(new URL(f,import.meta.url))),h,f)}
pins()
export function verifyBoundaryLayout(out){assert.equal(out.length,9);assert.equal(out.flat().length,10);assert.equal(out[6].length,2);assert.equal(out[6][0].direction,"down");assert.equal(out[6][0].revealPath,undefined);assert.equal(out[6][1].direction,"curve");assert.equal(out[6][1].revealPath,"M44.3625 87.1825 Q54.2125 83.1075 65.53999999999999 79.8475");assert.equal(out[6][1].revealWidth,14);return true}
export function compileProgressive(trace,proof,identity){assert.equal(arguments.length,3,"Exactly three explicit arguments");assert.deepEqual(identity,selectedProofIdentity,"Exact original VS3 full5/id7 ./prefix Sha256 identity");pins();assert.deepEqual(Object.keys(proof).sort(),["defaults","engineHashes","engineRevision","groups","trace"]);assert.equal(byteSHA(JSON.stringify(proof)),"236cbcb6c74b75d47c7d9b9d02c31240a3ee427979712b06efdf2de7e0298747");assert.deepEqual(trace,proof.trace);const before=JSON.stringify(proof),baseline=compiler.compileProgressive(trace,proof,identity);assert.equal(baseline.length,10);assert.equal(baseline.flat().length,10);assert.equal(baseline.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),22);const out=sourceMaskGroups.map(g=>g.length===1?baseline[g[0]]:g.flatMap(i=>baseline[i]));for(let i=0;i<out.length;i++)if(sourceMaskGroups[i].length===1)assert.strictEqual(out[i],baseline[sourceMaskGroups[i][0]]);assert.strictEqual(out[6][0],baseline[6][0]);assert.strictEqual(out[6][1],baseline[7][0]);assert.equal(JSON.stringify(proof),before);verifyBoundaryLayout(out);return out}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4,"Exactly four explicit arguments");assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
