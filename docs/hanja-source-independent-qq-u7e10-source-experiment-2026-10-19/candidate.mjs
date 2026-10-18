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
const T=json('./config.json').targets.u7e10,FIXED_PINS={"../hanja-goal-glyphwiki-batch936-2026-10-13/NOTICE.md":"474fc5374c71940998c532a3f30dcb6eb1eaccf3550de5b79698ba5f00a3c36b","../hanja-goal-glyphwiki-batch936-2026-10-13/README.md":"42b734295c7dbab6060cb696919d06c4d454ac8569c049580e8aa9b9223f9bb0","../hanja-goal-glyphwiki-batch936-2026-10-13/candidate-compile-analysis.json":"aadb03e00f994a59ffdb1766da722d6efd24b097cd800ec255d306a1eac9afc1","../hanja-goal-glyphwiki-batch936-2026-10-13/engine-proof.json":"9b2aac1b87f1e5a1d0a58cc2ecde53f267ccadce42cfbfff1cd21d1778011d39","../hanja-goal-glyphwiki-batch936-2026-10-13/engine-whole-u7e10-ue0100.json":"9b2aac1b87f1e5a1d0a58cc2ecde53f267ccadce42cfbfff1cd21d1778011d39","../hanja-goal-glyphwiki-batch936-2026-10-13/engine-whole-u7e10.json":"9b2aac1b87f1e5a1d0a58cc2ecde53f267ccadce42cfbfff1cd21d1778011d39","../hanja-goal-glyphwiki-batch936-2026-10-13/metadata.json":"0296e10a9b5f689f365d0fd9a98b5e1f090e8e6c5a8cf2ac5418fbeb631ae836","../hanja-goal-glyphwiki-batch936-2026-10-13/native-server-preflight-hold.json":"425a5d101605b51e1b4d67de3ce834fd58c18ce71aa1a812e1606109b7812b96","../hanja-goal-glyphwiki-batch936-2026-10-13/native-static-helper-preparation-source-analysis.json":"d882b25c9d386bf0a91560318658b9f55dad938727ae46d369a476e4659bfa86","../hanja-goal-glyphwiki-batch936-2026-10-13/resume.json":"4d203013252db2778e1b00689e519614af94afb2a5999930b3fc12a3270e6340","../hanja-goal-glyphwiki-batch936-2026-10-13/review.json":"035c6a8e7d73e42fb6ad55fd11ee7ad512e481e0ef0d7d2a0953d0c8e0953b6b","../hanja-goal-glyphwiki-batch936-2026-10-13/serve-whole-static.py":"be94536b1dc4fa6b357e9b7f10a59c0660928f05ac4fa056e8aba584844b8b1a","../hanja-goal-glyphwiki-batch936-2026-10-13/source-analysis.json":"3c981c1ef7f656dc63b280ae97ea8cb177de1309340d306f081bec139acf8ecf","../hanja-goal-glyphwiki-batch936-2026-10-13/source-join-analysis.json":"3cc90737e1051f51c6b0035e9796c9ca09e58867b3d865919076afb5cab1bd6f","../hanja-goal-glyphwiki-batch936-2026-10-13/source-preservation-audit.json":"339a85f3585ba8d232f90c318fb8b964b61b9fe858d3b96f363c8de31e802009","../hanja-goal-glyphwiki-batch936-2026-10-13/sources.json":"0a6a9f3af9a3ead7cddd5cf757b6253dd66d1e0898e234e29d6a0a4aff7dc7cf","../hanja-goal-glyphwiki-batch936-2026-10-13/validation.json":"015da04c4997ed8ba96209fd224e6a3c95236542cfa5bff45147aa0122a11c13","../hanja-goal-glyphwiki-batch936-2026-10-13/verify-source.mjs":"44c3bf9b04b68c99ff5b12dcc740e085e723dc985c30d2d1a5c34ab1c3387201","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u7e10","file":"../hanja-goal-glyphwiki-batch936-2026-10-13/engine-proof.json","fileSHA256":"9b2aac1b87f1e5a1d0a58cc2ecde53f267ccadce42cfbfff1cd21d1778011d39"},FIXED_PROOF_SHA="ff25fc780ac73cd139bc7f168b25ec2cdf70007686bfc33ccbf09b0666e614b4",FIXED_BASELINE_SHA="8ca0ecf6c9d602017e90989f7fd74305aedd3512ba05ee0da2c1e91a6d1aab81"
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10],[11,12],[13],[14],[15],[16,17],[18,19],[20],[21]],FACTORY_MAP=[[0,1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17]],RAW_COUNT=22,ORIGINAL=[[{"kind":"cdDrawCurve","args":[52.84,16,42.48,37,29.9,56,0,7]}],[{"kind":"cdDrawCurve","args":[14.36,45,32.120000000000005,56,39.52,76,7,8]}],[{"kind":"cdDrawCurve","args":[74.3,39,53.58,76,29.16,110,0,7]}],[{"kind":"cdDrawCurve","args":[15.84,113,46.92,109,74.3,101,0,7]}],[{"kind":"cdDrawCurve","args":[58.76,78,72.82,91,78.74,114,7,8]}],[{"kind":"cdDrawLine","args":[49.88,109,49.88,186,32,0]}],[{"kind":"cdDrawCurve","args":[32.120000000000005,127,29.16,155,14.36,180,0,7]}],[{"kind":"cdDrawCurve","args":[59.5,122,72.82,136,78,161,7,8]}],[{"kind":"cdDrawCurve","args":[115.77,15,105.62,44,83.29,60,0,7]}],[{"kind":"cdDrawLine","args":[107.65,32,174.64,32,0,2]}],[{"kind":"cdDrawCurve","args":[174.64,32,175.655,76,168.6763659942611,87.45916913914435,22,0]},{"kind":"cdDrawCurve","args":[168.6763659942611,87.45916913914435,163.475,96,153.475,96,2,14]}],[{"kind":"cdDrawLine","args":[105.62,46,105.62,70,1000,213]}],[{"kind":"cdDrawLine","args":[105.62,70,151.295,70,2,2]}],[{"kind":"cdDrawLine","args":[151.295,46,151.295,70,1000,123]}],[{"kind":"cdDrawLine","args":[128.965,40,128.965,70,2000,1]},{"kind":"cdDrawCurve","args":[128.965,70,123.89,90,91.41,100,2001,7]}],[{"kind":"cdDrawCurve","args":[115.77,96,103.59,126,81.26,144,0,7]}],[{"kind":"cdDrawLine","args":[105.62,114,175.655,114,0,2]}],[{"kind":"cdDrawCurve","args":[175.655,114,175.655,161,169.0155600983237,174.08264020034738,22,0]},{"kind":"cdDrawCurve","args":[169.0155600983237,174.08264020034738,164.49,183,154.49,183,2,14]}],[{"kind":"cdDrawLine","args":[104.605,130,104.605,156,0,113]}],[{"kind":"cdDrawLine","args":[104.605,156,153.325,156,2,2]}],[{"kind":"cdDrawLine","args":[153.325,130,153.325,156,0,123]}],[{"kind":"cdDrawLine","args":[128.965,122,128.965,156,0,1]},{"kind":"cdDrawCurve","args":[128.965,156,125.91999999999999,178,87.35,188,1,7]}]],TRACE_SHA256="af87abf17edf33f5013d6b1abeff00f4b4c065c7e700a4e2e073024bff55ae5a",GROUPS_SHA256="a13ee441f1bc7ca137bf0745cbe38599c2d86190442112efcecac640ca00ed52",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot="u7e10",sourceGroups=[[0,1],[2,3],[4],[5],[6],[7],[8],[9,10],[11,12],[13],[14],[15],[16,17],[18,19],[20],[21]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,FACTORY_MAP);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.deepEqual(proof,json(identity.file));const s=json("../hanja-goal-glyphwiki-batch936-2026-10-13/sources.json");assert.equal(s.root,"u7e10");assert.equal(s.glyph,T.glyph);assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.equal(Object.keys(s.records).length,T.sourceFamily.records);assert.equal(s.providerVersions.length,T.sourceFamily.providerVersions);for(const p of s.providerVersions)assert.equal(s.records[p.name].data,(p.responseIdentity||p).data);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
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
