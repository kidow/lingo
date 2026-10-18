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
const T=json('./config.json').targets.u701c,FIXED_PINS={"../hanja-goal-glyphwiki-batch799-2026-10-13/NOTICE.md":"53f10caed2d247cf82218e79676a682e0d7add1e0f89bd575b903aeb9caee5a4","../hanja-goal-glyphwiki-batch799-2026-10-13/README.md":"3e3a7fb8814aa53529bee804b3f8398b5f3fe337c8c8280bcabf5a2ecb28061b","../hanja-goal-glyphwiki-batch799-2026-10-13/draw-trace.json":"215d7fefcd725b133917a6d7002fe6bf32dd244ce146c6d510a7adddb86eff8f","../hanja-goal-glyphwiki-batch799-2026-10-13/engine-proof.json":"0eb3393a2c525bac342e67f4f21697f79b9f05112e5dc4222477e412edb6cd8e","../hanja-goal-glyphwiki-batch799-2026-10-13/engine-whole-u701c-k.json":"6cabc8931e694739bc43596516ff61cca86d5c273b6a75310189c2fcd599c05c","../hanja-goal-glyphwiki-batch799-2026-10-13/engine-whole-u701c.json":"0eb3393a2c525bac342e67f4f21697f79b9f05112e5dc4222477e412edb6cd8e","../hanja-goal-glyphwiki-batch799-2026-10-13/metadata.json":"87ee680560b365154372c4ae6ca29c6e1b4907252dcf4ed9865acd325629df04","../hanja-goal-glyphwiki-batch799-2026-10-13/resume.json":"c075029a32651bdb4cfc9d5fd4f5656605b13d7039183f6238e6686fe569d384","../hanja-goal-glyphwiki-batch799-2026-10-13/review.json":"8af02a07cd6e2ebabdd55393700afe946631694030618b98723ee634a9758891","../hanja-goal-glyphwiki-batch799-2026-10-13/serve-memory.py":"c56f403441607bef782059c2254b9ace8a013b73f9d0010aa14f2c16b4bc9a64","../hanja-goal-glyphwiki-batch799-2026-10-13/source-analysis.json":"e3d315be455db1d6715f50e98f003bcd1b31dfbdf153249e1031dce56ad524fd","../hanja-goal-glyphwiki-batch799-2026-10-13/source-join-analysis.json":"bd6115cd111ea78d6be23b747a89889466fa9974862e712fad26e493ca86d71b","../hanja-goal-glyphwiki-batch799-2026-10-13/sources.json":"01b54d68662f60329f8c95cfcca0e7e68c355e80b0bb938d55a3dd9daa9c3716","../hanja-goal-glyphwiki-batch799-2026-10-13/validation.json":"617ef0b9f611007ec957f324a67d78bc782258615ddb5bf81dc971021782a5ae","../hanja-goal-glyphwiki-batch799-2026-10-13/verify-source.mjs":"41217ac9866f46d49b61d00803551007754794dad8424f447ce9cda1128f9622","../hanja-goal-glyphwiki-batch799-2026-10-13/whole-variant-inventory.json":"59fd92f1b47f890b00929b292078508d94d1fb9df0df7d4eb3cc674e842baddf","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u701c","file":"../hanja-goal-glyphwiki-batch799-2026-10-13/engine-proof.json","fileSHA256":"0eb3393a2c525bac342e67f4f21697f79b9f05112e5dc4222477e412edb6cd8e"},FIXED_PROOF_SHA="8bc4691cdf02289ba3f3dbbab77e05cbc3186eeafc54daa8632ebdece6fee92c",FIXED_BASELINE_SHA="4e824d8fb27fc008bffbe0ed894173078f05f8a4998c8f32589e6a62361f71b7"
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6,7],[8],[9],[10,11],[12],[13],[14],[15],[16],[17,18],[19],[20],[21],[22]],FACTORY_MAP=[[0],[1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19]],RAW_COUNT=23,ORIGINAL=[[{"kind":"cdDrawCurve","args":[22.05,20,35.8,27,41.85,41,7,8]}],[{"kind":"cdDrawCurve","args":[11.6,66,26.45,73,31.95,87,7,8]}],[{"kind":"cdDrawCurve","args":[12.7,133,31.95,142,29.75,184,7,8]}],[{"kind":"cdDrawCurve","args":[27,150,29.2,138,52.3,67,32,7]}],[{"kind":"cdDrawLine","args":[51.18,28,117.735,28,0,0]}],[{"kind":"cdDrawLine","args":[65.4782325,50.42,65.4782325,79.58,12,213]}],[{"kind":"cdDrawLine","args":[65.4782325,50.42,103.43676750000002,50.42,2,2]}],[{"kind":"cdDrawLine","args":[103.43676750000002,50.42,103.43676750000002,79.58,22,223]}],[{"kind":"cdDrawLine","args":[65.4782325,79.58,103.43676750000002,79.58,2,2]}],[{"kind":"cdDrawLine","args":[57.8355,102,57.8355,185,12,0]}],[{"kind":"cdDrawLine","args":[57.8355,102,111.0795,102,2,2]}],[{"kind":"cdDrawLine","args":[111.0795,102,111.0795,172,3022,1]},{"kind":"cdDrawCurve","args":[111.0795,172,111.0795,182,104.8295,182,3001,614]}],[{"kind":"cdDrawCurve","args":[77.247375,102,77.247375,134,62.2725,144,32,7]}],[{"kind":"cdDrawLine","args":[91.667625,102,91.667625,122,1032,1]},{"kind":"cdDrawCurve","args":[91.667625,122,91.667625,132,101.667625,132,10001,2001]},{"kind":"cdDrawLine","args":[101.667625,132,103.31475,132,2006,5]}],[{"kind":"cdDrawLine","args":[65.60025,150,104.424,150,0,100]}],[{"kind":"cdDrawLine","args":[84.45750000000001,150,84.45750000000001,184,32,200]}],[{"kind":"cdDrawLine","args":[128.21550000000002,59,128.21550000000002,112,3012,13]}],[{"kind":"cdDrawLine","args":[128.21550000000002,59,176.90775,59,2,2]}],[{"kind":"cdDrawLine","args":[176.90775,59,176.90775,112,22,223]}],[{"kind":"cdDrawLine","args":[128.21550000000002,112,176.90775,112,2,2]}],[{"kind":"cdDrawLine","args":[152.19825,19,152.19825,167,1000,32]}],[{"kind":"cdDrawCurve","args":[120.94800000000001,176,149.29125,169,177.6345,160,0,7]}],[{"kind":"cdDrawCurve","args":[168.18675,136,179.088,157,181.26825,183,7,8]}]],TRACE_SHA256="3a5a31784af6b160b39a14b9d6a30ae621f10b1da8dc9b6bd766ad9805db3abb",GROUPS_SHA256="9fe272d028aee29d9bb637960a0062d271e1776a3ffbfa872252480f3aac0272",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot="u701c",sourceGroups=[[0],[1],[2,3],[4],[5],[6,7],[8],[9],[10,11],[12],[13],[14],[15],[16],[17,18],[19],[20],[21],[22]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,FACTORY_MAP);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.deepEqual(proof,json(identity.file));const s=json("../hanja-goal-glyphwiki-batch799-2026-10-13/sources.json");assert.equal(s.root,"u701c");assert.equal(s.glyph,T.glyph);assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.equal(Object.keys(s.records).length,T.sourceFamily.records);assert.equal(s.providerVersions.length,T.sourceFamily.providerVersions);for(const p of s.providerVersions)assert.equal(s.records[p.name].data,(p.responseIdentity||p).data);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
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
