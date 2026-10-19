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
const T=json('./config.json').targets.u97d8,FIXED_PINS={"../hanja-goal-glyphwiki-batch652-2026-10-11/README.md":"34c7fda427e9b1507476bf91c70d3e7141d548335514705676ef8a34c3758560","../hanja-goal-glyphwiki-batch652-2026-10-11/draw-trace.json":"6847edf0c4354613d6ec44775d7c80ce6bf57de1ed0628c1f0a94fdeace20010","../hanja-goal-glyphwiki-batch652-2026-10-11/engine-proof.json":"78633dc24de6eb89d06cbe27775f06d91f416eeb3d1a14c19b7fcd75c9f8b374","../hanja-goal-glyphwiki-batch652-2026-10-11/engine-whole-u97d8-g.json":"3fa87e72e6bd87a99e8046b4356fdd3a889a545bcbe9d210ce570223f2ab91ab","../hanja-goal-glyphwiki-batch652-2026-10-11/engine-whole-u97d8-ue0100.json":"8614f3e6509b3446b2d71cb3d3ce04f38f112f768fee3377d4174c8b529c27b2","../hanja-goal-glyphwiki-batch652-2026-10-11/engine-whole-u97d8-ue0101.json":"8614f3e6509b3446b2d71cb3d3ce04f38f112f768fee3377d4174c8b529c27b2","../hanja-goal-glyphwiki-batch652-2026-10-11/engine-whole-u97d8-ue0102.json":"961c87b13d7d554d15144aa8253df6e8928618eb5e9d87cbba49ff955e71ed94","../hanja-goal-glyphwiki-batch652-2026-10-11/engine-whole-u97d8.json":"8614f3e6509b3446b2d71cb3d3ce04f38f112f768fee3377d4174c8b529c27b2","../hanja-goal-glyphwiki-batch652-2026-10-11/metadata.json":"9db3800467808254b1c1e16882acfd72eee8e66c8f24b95fc2da71b25e2571ae","../hanja-goal-glyphwiki-batch652-2026-10-11/progressive-review.json":"21e31fb6a9c76e258f946053ddbc06657b42eb4c2382f24a4e014cca97f4f63f","../hanja-goal-glyphwiki-batch652-2026-10-11/progressive.mjs":"a48a5199ccd718901877230dbca94a9f482a04e5e72d6309eee752bda288e7e5","../hanja-goal-glyphwiki-batch652-2026-10-11/resume.json":"58d3f7ab713aee71d2739d637c2afe7b7eadb33eb8fe7a792b51aadef921e178","../hanja-goal-glyphwiki-batch652-2026-10-11/serve-progressive.py":"db59c2fd988b07e17c6f2fdaddd8686d48a971a1ebb4458c0f3c36a9f11005bd","../hanja-goal-glyphwiki-batch652-2026-10-11/serve-variants.py":"e27d11bf213e8c110c4384eec59369acf5e422e65dc4ad5f9d03eec1e9884808","../hanja-goal-glyphwiki-batch652-2026-10-11/sources.json":"37495ad733cbdc64060e82a38bdd1c16fae746c76cafc90169f5e2cb92b0a5d0","../hanja-goal-glyphwiki-batch652-2026-10-11/validation.json":"58bd78074040736b6c47ed2ffb9e33006549922a05c6e5aff2fcd53a3dcdb3c7","../hanja-goal-glyphwiki-batch652-2026-10-11/verify-source.mjs":"c59d439b684bfd1b610d6a897eddcfc967442359787a5916e2a03391c923a7fe","../hanja-goal-glyphwiki-batch652-2026-10-11/whole-variant-inventory.json":"4832e1021f2272c8363fc9ec0d35ae3c6013ae3413febd30d5afc2d42e9382aa","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u97d8","file":"../hanja-goal-glyphwiki-batch652-2026-10-11/engine-whole-u97d8.json","fileSHA256":"8614f3e6509b3446b2d71cb3d3ce04f38f112f768fee3377d4174c8b529c27b2"},FIXED_PROOF_SHA="521c4c449c72166fd787cc14eb5704a80217bf139428cb0c0e6383bb62f37527",FIXED_BASELINE_SHA="39c8ed2b04446ae43c66fce19e1e700140d67980ee3da60a4a59bf4d0d2e824f",ORIGINAL_SOURCE_GROUPS=[[2],[0,1],[3],[4],[5,6],[7],[8],[9],[10],[11],[12],[15],[17],[16],[13,14],[18],[19],[20],[21]],FACTORY_MAP=[[0],[1],[2],[3],[4],[5],[6],[7,8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18]],RAW_COUNT=22,ORIGINAL=[[{"kind":"cdDrawLine","args":[17.659999999999997,36,67.71,36,0,2]}],[{"kind":"cdDrawLine","args":[67.71,36,67.71,64,22,32]}],[{"kind":"cdDrawLine","args":[46.150000000000006,13,38.45,64,0,32]}],[{"kind":"cdDrawLine","args":[11.5,64,88.5,64,0,300]}],[{"kind":"cdDrawLine","args":[29.21,82,29.21,108,12,113]}],[{"kind":"cdDrawLine","args":[29.21,82,70.79,82,2,2]}],[{"kind":"cdDrawLine","args":[70.79,82,70.79,108,22,123]}],[{"kind":"cdDrawLine","args":[29.21,108,70.79,108,2,2]}],[{"kind":"cdDrawLine","args":[25.36,134,84.65,134,2,100]}],[{"kind":"cdDrawLine","args":[25.36,134,25.36,161,12,32]}],[{"kind":"cdDrawLine","args":[11.5,161,88.5,161,0,0]}],[{"kind":"cdDrawLine","args":[56.16,109,56.16,187,0,200]}],[{"kind":"cdDrawLine","args":[82.4,44.44,186.28,44.44,0,100]}],[{"kind":"cdDrawLine","args":[101.02,16.16,101.02,95.95,0,13]}],[{"kind":"cdDrawLine","args":[101.02,95.95,181.38,95.95,2,0]}],[{"kind":"cdDrawLine","args":[126.5,14.14,126.5,70.7,0,113]}],[{"kind":"cdDrawLine","args":[126.5,70.7,156.88,70.7,2,2]}],[{"kind":"cdDrawLine","args":[156.88,16.16,156.88,70.7,0,123]}],[{"kind":"cdDrawLine","args":[82.4,126.25,186.28,126.25,0,100]}],[{"kind":"cdDrawLine","args":[132.38,103.02,132.38,186.85,0,0]}],[{"kind":"cdDrawCurve","args":[129.44,126.25,113.76,165.64,69.66,186.85,132,7]}],[{"kind":"cdDrawCurve","args":[137.28,126.25,151,156.55,181.38,175.74,7,0]}]],TRACE_SHA256="b97d0cbeed1b09a7376a33129da85d2e0407c2ac024f5e2e94adea177509666b",GROUPS_SHA256="16a875be0ebc05e009b5e7a32c5f757245773865484dba9af0c3bd6bf18a1774",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot='u97d8',sourceGroups=[[2],[0,1],[3],[4],[5,6],[7],[8],[9,10],[11],[12],[15],[17],[16],[13,14],[18],[19],[20],[21]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,FACTORY_MAP);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.deepEqual(proof,json(identity.file));const s=json("../hanja-goal-glyphwiki-batch652-2026-10-11/sources.json");assert.equal(s.root,"u97d8");assert.equal(s.glyph,T.glyph);assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.equal(Object.keys(s.records).length,T.sourceFamily.records);assert.equal(s.providerVersions.length,T.sourceFamily.providerVersions);for(const p of s.providerVersions)assert.equal(s.records[p.name].data,(p.responseIdentity||p).data);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
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
