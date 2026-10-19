export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// Provisional source-only review compiler. Domestic order and browser approval are pending.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const endpoint = (call) => call.args.slice(call.kind === 'cdDrawLine' ? 2 : call.kind === 'cdDrawCurve' ? 4 : 6, call.kind === 'cdDrawLine' ? 4 : call.kind === 'cdDrawCurve' ? 6 : 8)
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })


const local=n=>new URL(n,import.meta.url),json=n=>JSON.parse(readFileSync(local(n),'utf8')),sha=b=>createHash('sha256').update(b).digest('hex')
const round=x=>Math.round(x*1e6)/1e6
const T=json('./config.json').targets["u8fed-k"],FIXED_PINS={"../hanja-goal-glyphwiki-batch896-2026-10-13/NOTICE.md":"284f0f550ba33b1de75b8b38a6a74a11788d62b03e932d69eddd9c03c0c618ae","../hanja-goal-glyphwiki-batch896-2026-10-13/README.md":"8cf3a013581d17ee1574ff3ad2e2fc449f9488189db9317ea6db2f3aa48fe2dc","../hanja-goal-glyphwiki-batch896-2026-10-13/blocked-source-contract.mjs":"1b1a7090c08ca3bcdc7859d8f8041ff8fce0fe984809944c1707320d4ba90e6a","../hanja-goal-glyphwiki-batch896-2026-10-13/candidate-compile-analysis.json":"01e9f475d306f136b83e9c28df0da099df278098ef3435f0024fa0e67c4b9807","../hanja-goal-glyphwiki-batch896-2026-10-13/engine-proof.json":"7b3052e0508730fb029b881ba9bdb6fac298c2f2a0df0bb195ccdcc1f8e63b53","../hanja-goal-glyphwiki-batch896-2026-10-13/engine-whole-u8fed-k.json":"682a63e93461ab37a5e167980654f993709b4ff042fd5cc633a6dea31a54327a","../hanja-goal-glyphwiki-batch896-2026-10-13/engine-whole-u8fed-ue0100.json":"7b3052e0508730fb029b881ba9bdb6fac298c2f2a0df0bb195ccdcc1f8e63b53","../hanja-goal-glyphwiki-batch896-2026-10-13/engine-whole-u8fed-ue0101.json":"682a63e93461ab37a5e167980654f993709b4ff042fd5cc633a6dea31a54327a","../hanja-goal-glyphwiki-batch896-2026-10-13/engine-whole-u8fed-ue0102.json":"7b3052e0508730fb029b881ba9bdb6fac298c2f2a0df0bb195ccdcc1f8e63b53","../hanja-goal-glyphwiki-batch896-2026-10-13/engine-whole-u8fed-ue0103.json":"c29839afd07f2b6cf836beb90b31392c065ed77905519965f8dc69bf6f5e1338","../hanja-goal-glyphwiki-batch896-2026-10-13/engine-whole-u8fed-v.json":"c29839afd07f2b6cf836beb90b31392c065ed77905519965f8dc69bf6f5e1338","../hanja-goal-glyphwiki-batch896-2026-10-13/engine-whole-u8fed.json":"7b3052e0508730fb029b881ba9bdb6fac298c2f2a0df0bb195ccdcc1f8e63b53","../hanja-goal-glyphwiki-batch896-2026-10-13/metadata.json":"401c8ceac17569123644dba7e3537378e3850170bad874815644fa8e13ef3200","../hanja-goal-glyphwiki-batch896-2026-10-13/native-preflight-source-analysis.json":"092aae90e53f7c7dc9e75c0a98b5adbe14095ab3f6f51be8e01eaf6259b9e7c7","../hanja-goal-glyphwiki-batch896-2026-10-13/native-server-preflight-source-analysis.json":"20074adb41b0d5e212685010b66d39c4ef834a940f6bc58b9a88965494e78b81","../hanja-goal-glyphwiki-batch896-2026-10-13/resume.json":"6fa5d597f73930932d8fa92e2c0aef4cb7072ea284eb0fd82f15b697b9d0bf45","../hanja-goal-glyphwiki-batch896-2026-10-13/review.json":"8a05eb63dd23a8a2f462a62635c6cbd1aad3c834824014cf381cec18aca86e6b","../hanja-goal-glyphwiki-batch896-2026-10-13/serve-progressive.py":"07f0b8f0e6bfec751ef1c06fb8e12341f0ac2465380fa377804b092c7c1f4137","../hanja-goal-glyphwiki-batch896-2026-10-13/serve-whole.py":"94657659a4b42ebe5d32866e5e63d69a7f2a9ff99fbb06bf37ced96e8d991b21","../hanja-goal-glyphwiki-batch896-2026-10-13/source-analysis.json":"e50d02b98ae67d7cf604ad148409c30247f0dbbb459f5157ac6ae3695f383947","../hanja-goal-glyphwiki-batch896-2026-10-13/source-join-analysis.json":"817eba699a46f627debe6232edfb64c6f5a4ce05f6480c975a9d6f1c293375fa","../hanja-goal-glyphwiki-batch896-2026-10-13/sources.json":"d0c0da93c7735e47ae3d4f8b308bdcdf051ca9d6b36fe9338f350713b7bb0f8f","../hanja-goal-glyphwiki-batch896-2026-10-13/validation.json":"3bcb132a5ea9b21ec529173479dece6b921c39a42355e4ccf2e2f8b3305d84cd","../hanja-goal-glyphwiki-batch896-2026-10-13/verify-source.mjs":"8a80d8f75119ea3eabc8676198c8b9f8cf49cdf5331d2bece63a75c817f5494a","../hanja-goal-glyphwiki-batch162-2026-10-03/NOTICE.md":"45b6f50a61dd7b5dd4527618d3bd7f6007098010b63ae3bc2d24cc729c6d03ca","../hanja-goal-glyphwiki-batch162-2026-10-03/README.md":"3bda596833dfd9d9dbde3894289a499f6ac36203d721259f3b88196dec8f5af7","../hanja-goal-glyphwiki-batch162-2026-10-03/engine-trace.json":"22105f6f695f9d11214398b8da11ff0d6307e2d38767bf7f3457d1fac17c4251","../hanja-goal-glyphwiki-batch162-2026-10-03/findings.json":"575ae6c60b851eb683c25ffb1b4b7a78332c76a9adfdcf5296a7fd88683aac5c","../hanja-goal-glyphwiki-batch162-2026-10-03/next.json":"2c37545aefcd37fee4ec6e9cb72dcf0398050c899313abba0ce93438a60ecfe0","../hanja-goal-glyphwiki-batch162-2026-10-03/sources.json":"0d7687fccef28f7ba4671ae32b34976011906f0d425e9fc1f1235133d21329eb","../hanja-goal-glyphwiki-batch162-2026-10-03/verify.mjs":"63a9b379f65d3558685f4a3e45b11386a13c7b4e0fb074ddfc10fa294cca9425","../hanja-source-mapping-u6faf-experiment-2026-10-19/README.md":"42a9857610ab9cfeea4a792bdd393182774af118a619cef008577d594e40cf0e","../hanja-source-mapping-u6faf-experiment-2026-10-19/config.json":"c4592d7feb5d086d7d6949fd2ac0cc53843c03a2892af3f912871baa07b4c562","../hanja-source-mapping-u6faf-experiment-2026-10-19/serve.py":"91a39b35d9832285a213f9fc32b60e33ecca979c1c286fd1637009885f4ce0e1","../hanja-source-mapping-u6faf-experiment-2026-10-19/validation.json":"156b5fc17dce0794791df2e66b9e1909d6974c641dc936fddf9daaf58e2a7d23","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47","../hanja-source-mapping-u8fed-k-experiment-2026-10-19/README.md":"ea9cad53da0c6d8842525d575f4fde83e3b10e75300b2e75bb67eb0e9771dd1e","../hanja-source-mapping-u8fed-k-experiment-2026-10-19/config.json":"5074912b29e40e9c55de417b4a6a47c7c120d4216a7a46f74dd3f6c10f799f63","../hanja-source-mapping-u8fed-k-experiment-2026-10-19/serve.py":"b963618b2a3ab165e21b2c627739cbaa9daf199842b819bf192cfb11f990ff7d","../hanja-source-mapping-u8fed-k-experiment-2026-10-19/validation.json":"cb1c708ae8ccca3631182c2ec302d7325c11ab3771c547ef45779ed3ff323277","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c"},EXPECTED_IDENTITY={"root":"u8fed-k","file":"../hanja-goal-glyphwiki-batch896-2026-10-13/engine-whole-u8fed-k.json","fileSHA256":"682a63e93461ab37a5e167980654f993709b4ff042fd5cc633a6dea31a54327a"},FIXED_PROOF_SHA="298dabd60745b2471ad9885581e4aba054cd6c07f600aa68d596ce5aa43a11a3",FIXED_BASELINE_SHA="2d1d7518d10f00319804e6e2e841f95bee2248e1e4f2c8df8f570ed1ac4e7262"
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2,3],[4],[5],[6],[7],[8],[9],[10]],FACTORY_MAP=[[5],[6],[7],[8],[9],[0],[1],[2],[3,4]],RAW_COUNT=11,ORIGINAL=[[{"kind":"cdDrawCurve","args":[27,21,46,30,58,46,7,8]}],[{"kind":"cdDrawCurve","args":[16,57,35,65,49,81,7,8]}],[{"kind":"cdDrawLine","args":[14,107,50,107,0,2]}],[{"kind":"cdDrawLine","args":[50,107,50,158,22,300]}],[{"kind":"cdDrawCurve","args":[16,179,35,168,55,154,0,7]}],[{"kind":"cdDrawBezier","args":[53,152,68,172,84,181,179,177,7,0]}],[{"kind":"cdDrawCurve","args":[98,24,92,58,73,85,0,7]}],[{"kind":"cdDrawLine","args":[88,56,175,56,0,0]}],[{"kind":"cdDrawLine","args":[70,96,184,96,0,0]}],[{"kind":"cdDrawLine","args":[128,19,128,64,0,1]},{"kind":"cdDrawCurve","args":[128,64,128,139,72,159,1,7]}],[{"kind":"cdDrawCurve","args":[123,112,158,131,173,156,7,8]}]],TRACE_SHA256="14c2766bd04b9cdc649818d73085a32469dde17ba38b57ed3b0cb5ef7ae89d4f",GROUPS_SHA256="ba001e51a7bd372691059107d72c75ec2bdeb6d2825171af09226a6dea578d83",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot="u8fed-k",sourceGroups=[[6],[7],[8],[9],[10],[0],[1],[2,3],[4,5]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,FACTORY_MAP);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.deepEqual(proof,json(identity.file));const s=json("../hanja-goal-glyphwiki-batch896-2026-10-13/sources.json");assert.equal(s.root,"u8fed");assert.equal(s.glyph,T.glyph);assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.equal(Object.keys(s.records).length,T.sourceFamily.records);assert.equal(s.providerVersions.length,T.sourceFamily.providerVersions);for(const p of s.providerVersions)assert.equal(s.records[p.name].data,(p.responseIdentity||p).data);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
function generateGeometry(trace,proof,identity){const sourceGroups=ORIGINAL_SOURCE_GROUPS
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

return compileBound(trace,proof,identity)}
let geometryRuns=0,cachedCalls=0
export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(geometryRuns,0);const rawBaseline=generateGeometry(trace,proof,identity);const baseline=FACTORY_MAP.map(indices=>indices.flatMap(i=>rawBaseline[i]));geometryRuns++;return{rawBaseline,baseline}}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const f=json('./fixtures.json')[sourceRoot];assert.equal(digest(f.fullProof),FIXED_PROOF_SHA);assert.equal(digest(f.baseline),FIXED_BASELINE_SHA);assert.deepEqual(f.strokes,f.baseline);assert.deepEqual(f.baseline,FACTORY_MAP.map(indices=>indices.flatMap(i=>f.rawBaseline[i])));cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return 0}
export function cachedPositiveCallCount(){return cachedCalls}
