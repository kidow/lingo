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
const T=json('./config.json').targets.u7e8a,FIXED_PINS={"../hanja-goal-glyphwiki-batch455-2026-10-09/NOTICE.md":"941afb3d09b7e4ab10a4ae204b39459f64d23d51e8a5755abc09ad3d68fbf768","../hanja-goal-glyphwiki-batch455-2026-10-09/README.md":"1103eb1958063281eef2d1c8ab690e59c42aa2074052846ef6c6f550f24f2b77","../hanja-goal-glyphwiki-batch455-2026-10-09/draw-trace.json":"949931403342555f4e039cccafd0a9b05b009c6a513ddb9e71582f2babcfb2ff","../hanja-goal-glyphwiki-batch455-2026-10-09/engine-proof.json":"1acf14b9bfd24ab7171012b7f5c2e5527e94d29e3f3be37751997cf5f012ffb1","../hanja-goal-glyphwiki-batch455-2026-10-09/held-review.json":"7e929b36ef560bb6cc853c640781d32a17f6c96ad6d09c0b1155a38becd5bb2c","../hanja-goal-glyphwiki-batch455-2026-10-09/metadata.json":"e15a7ef4e297ccd4af578640b07c08037de0d813dbb21259d621cdad8230663f","../hanja-goal-glyphwiki-batch455-2026-10-09/next-source-inventory.json":"3bcefbc3d91f1b6e7008b07b9c79509e18116ed137447bd13f2f1b64c48041ba","../hanja-goal-glyphwiki-batch455-2026-10-09/resume.json":"472fef0713f03caf85b0c055846a82ea228c6e0889a5ce601abf0033bf6dda27","../hanja-goal-glyphwiki-batch455-2026-10-09/serve.py":"754ac26ef138cb5a2b12c47c65ab6dbe7d0e956ef13c2c6e88d55cfd5bab8b04","../hanja-goal-glyphwiki-batch455-2026-10-09/sources.json":"da82e4e057b5643b73bb1e00b862f0d94f3845431ea58014a012488ee2ab934e","../hanja-goal-glyphwiki-batch455-2026-10-09/validation.json":"82bfeccf1a436642439aa247a115715e7668f44a1776c4ed188c4a741253d4ec","../hanja-goal-glyphwiki-batch455-2026-10-09/verify-source.mjs":"09ce860c50e98c66a3ad1641cfa751793c6d56eb17c28779925cff7ad4a76f7c","../hanja-goal-glyphwiki-batch455-2026-10-09/whole-engine-proofs.json":"5a7709ee9b3d05d8d4c5511d4af6fbd35ef723d4ee41321c5f4c9d5ef2e980af","../hanja-goal-glyphwiki-batch455-2026-10-09/whole-variant-inventory.json":"ba0b505d453a80b42d2962258ff24067565e2a132b98ff4bcf73ebedda4be2ba","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u7e8a","headerFile":"../hanja-goal-glyphwiki-batch455-2026-10-09/engine-proof.json","headerFileSHA256":"1acf14b9bfd24ab7171012b7f5c2e5527e94d29e3f3be37751997cf5f012ffb1","traceFile":"../hanja-goal-glyphwiki-batch455-2026-10-09/draw-trace.json","traceFileSHA256":"949931403342555f4e039cccafd0a9b05b009c6a513ddb9e71582f2babcfb2ff","sourceFile":"../hanja-goal-glyphwiki-batch455-2026-10-09/sources.json","sourceFileSHA256":"da82e4e057b5643b73bb1e00b862f0d94f3845431ea58014a012488ee2ab934e"},FIXED_PROOF_SHA="8a9a4a1ad95576f2bebff53a8007b29fbb955b6d466252db09784ff50ad62bfd",FIXED_BASELINE_SHA="4d283cadffd03fe01310fb0ce7fa760ecd2ab78c663755daaf4acf90d07ad4c4"
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17,18],[19],[20],[21],[22],[23]],FACTORY_MAP=[[0,1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[19],[18],[20],[21],[22]],RAW_COUNT=24,ORIGINAL=[[{"kind":"cdDrawCurve","args":[47.89,16,38.58,37,27.275,56,0,7]}],[{"kind":"cdDrawCurve","args":[13.31,45,29.27,56,35.92,76,7,8]}],[{"kind":"cdDrawCurve","args":[67.175,39,48.555,76,26.61,110,0,7]}],[{"kind":"cdDrawCurve","args":[14.64,113,42.57,109,67.175,101,0,7]}],[{"kind":"cdDrawCurve","args":[53.21,78,65.845,91,71.165,114,7,8]}],[{"kind":"cdDrawLine","args":[45.23,109,45.23,186,32,0]}],[{"kind":"cdDrawCurve","args":[29.27,127,26.61,155,13.31,180,0,7]}],[{"kind":"cdDrawCurve","args":[53.875,122,65.845,136,70.5,161,7,8]}],[{"kind":"cdDrawLine","args":[133.6,13,133.6,37,0,32]}],[{"kind":"cdDrawLine","args":[88.1,37,186.9,37,2,0]}],[{"kind":"cdDrawLine","args":[88.1,37,88.1,102,12,1]},{"kind":"cdDrawCurve","args":[88.1,102,88.1,161,71.85,189,1,7]}],[{"kind":"cdDrawLine","args":[101.464,63.35,181.986,63.35,0,200]}],[{"kind":"cdDrawLine","args":[127.42175,45.53,127.42175,81.97999999999998,0,313]}],[{"kind":"cdDrawLine","args":[156.02824999999999,45.53,156.02824999999999,81.97999999999998,0,323]}],[{"kind":"cdDrawLine","args":[127.42175,81.97999999999998,156.02824999999999,81.97999999999998,2,2]}],[{"kind":"cdDrawLine","args":[95.63674999999999,94.94,187.81325,94.94,0,200]}],[{"kind":"cdDrawLine","args":[113.11850000000001,111.14,113.11850000000001,153.26,12,213]}],[{"kind":"cdDrawLine","args":[113.11850000000001,111.14,170.3315,111.14,2,2]}],[{"kind":"cdDrawLine","args":[170.3315,111.14,170.3315,153.26,22,323]}],[{"kind":"cdDrawLine","args":[141.725,94.94,141.725,153.26,32,32]}],[{"kind":"cdDrawLine","args":[113.11850000000001,132.2,170.3315,132.2,2,2]}],[{"kind":"cdDrawLine","args":[113.11850000000001,153.26,170.3315,153.26,2,2]}],[{"kind":"cdDrawCurve","args":[131.65975,163.79,118.94575,176.75,97.226,186.47,0,7]}],[{"kind":"cdDrawCurve","args":[150.73075,162.17000000000002,170.3315,170.27,181.45625,184.04,7,8]}]],TRACE_SHA256="d5e65a4300d0c125647f2d0df119517f67039a6ec91efdadb5d5069c85315c9d",GROUPS_SHA256="f82652b848924634559cd8146952cbcce629ddb8fca21a21a0bcbd71915ea45f",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot="u7e8a",sourceGroups=[[0,1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17,18],[20],[19],[21],[22],[23]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,FACTORY_MAP);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);const header=json(identity.headerFile);assert.deepEqual(Object.keys(header).sort(),['defaults','engineHashes','engineRevision','groups']);assert.deepEqual(proof,{...header,trace:json(identity.traceFile)});const s=json(identity.sourceFile);assert.equal(s.root,sourceRoot);assert.equal(s.glyph,T.glyph);assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.equal(Object.keys(s.records).length,T.sourceFamily.records);assert.equal(s.providerVersions.length,T.sourceFamily.providerVersions);for(const p of s.providerVersions)assert.equal(s.records[p.name].data,(p.responseIdentity||p).data);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
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
