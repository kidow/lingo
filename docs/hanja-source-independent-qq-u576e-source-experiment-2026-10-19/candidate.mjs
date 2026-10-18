export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// Provisional source-only review compiler. Domestic order and browser approval are pending.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const endpoint = (call) => call.args.slice(call.kind === 'cdDrawLine' ? 2 : call.kind === 'cdDrawCurve' ? 4 : 6, call.kind === 'cdDrawLine' ? 4 : call.kind === 'cdDrawCurve' ? 6 : 8)
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })


const local=n=>new URL(n,import.meta.url),json=n=>JSON.parse(readFileSync(local(n),'utf8')),sha=b=>createHash('sha256').update(b).digest('hex')
const T=json('./config.json').targets.u576e,FIXED_PINS={"../hanja-goal-glyphwiki-batch117-2026-09-27/README.md":"e1b37c24fb028793737e488a1396c26966cdd95628cb35e4aca53abb3183a3c3","../hanja-goal-glyphwiki-batch117-2026-09-27/alternative-sources.json":"76a08cfdf5e1d8b10632fa191f780b1ce1f3638180e8b7df780969d6312d0674","../hanja-goal-glyphwiki-batch117-2026-09-27/draw-trace.json":"cc0947b9816f203a99ad3dd4d1ba0d8a744345328258301aec92f9daeec9d4fd","../hanja-goal-glyphwiki-batch117-2026-09-27/engine-proof.json":"3c19d50186d79b3f80b91c8840a7878d6df4b7897e261f4d2f4a4d9511b333dc","../hanja-goal-glyphwiki-batch117-2026-09-27/findings.json":"9152228ee90e4ac6077a723bd2219a1d4f16465b63a7b758a6aa936353047e60","../hanja-goal-glyphwiki-batch117-2026-09-27/historical-source-proof.json":"172db3e196797bcf60d77c1aa5e2d28262baf8e2d05cf83a1b1bb19f91010b20","../hanja-goal-glyphwiki-batch117-2026-09-27/metadata.json":"45ff7e8381b62dabeb240912d2831ecf998619c511de18767544e747a82cfa07","../hanja-goal-glyphwiki-batch117-2026-09-27/next.json":"37200bafab10fb24c173e93aa008507e23c29a8a440e90d914b80bb1187dd3b9","../hanja-goal-glyphwiki-batch117-2026-09-27/serve.py":"838cecb011d397a7df8e6ccf78bba3e6b9ea70f24d8793629f157d8b0eabbc5c","../hanja-goal-glyphwiki-batch117-2026-09-27/sources.json":"aab8d794087c0d5fff3e1acfa49067aa8dce88565b4f92c6302513eb815ed092","../hanja-goal-glyphwiki-batch117-2026-09-27/verify.mjs":"0480f04430139be5f6fe5299cfb08e726bb3bcf2222f4be5203769335a523509","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u576e","headerFile":"../hanja-goal-glyphwiki-batch117-2026-09-27/engine-proof.json","headerFileSHA256":"3c19d50186d79b3f80b91c8840a7878d6df4b7897e261f4d2f4a4d9511b333dc","traceFile":"../hanja-goal-glyphwiki-batch117-2026-09-27/draw-trace.json","traceFileSHA256":"cc0947b9816f203a99ad3dd4d1ba0d8a744345328258301aec92f9daeec9d4fd","sourceFile":"../hanja-goal-glyphwiki-batch117-2026-09-27/sources.json","sourceFileSHA256":"aab8d794087c0d5fff3e1acfa49067aa8dce88565b4f92c6302513eb815ed092"}
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3,4],[5],[6],[7],[8,9],[10]],RAW_COUNT=11,ORIGINAL=[[{"kind":"cdDrawLine","args":[15.35,71.5,79.43,71.5,0,0]}],[{"kind":"cdDrawLine","args":[46.5,22.1,46.5,138.95,0,32]}],[{"kind":"cdDrawCurve","args":[15.35,154.15,41.16,145.6,80.32,127.55,0,7]}],[],[{"kind":"cdDrawCurve","args":[126.24000000000001,17,115.44,49,94.92,86,0,7]}],[{"kind":"cdDrawCurve","args":[77.64,88,114.36,84,173.76,75,0,7]}],[{"kind":"cdDrawCurve","args":[144.6,39,170.52,61,182.4,93,7,8]}],[{"kind":"cdDrawLine","args":[96.5616,113.61,96.5616,171.39,12,113]}],[{"kind":"cdDrawLine","args":[96.5616,113.61,166.71840000000003,113.61,2,2]}],[{"kind":"cdDrawLine","args":[166.71840000000003,113.61,166.71840000000003,171.39,22,123]}],[{"kind":"cdDrawLine","args":[96.5616,171.39,166.71840000000003,171.39,2,2]}]]
const TRACE_SHA256="97464afd9c89e4af40ea42b6cc5915621f0bb9abbd6fdfd0c86425ecb297fcc0",GROUPS_SHA256="3b4419df60ac0e08a08e7c0f705dfaaea9d9f040e55f85006d33058acefb11cb",FIXED_PROOF_SHA="b9cc717000941e95a1bbae1a334c3ff5e001c3092957823e4c77f2b93b6f29b6"
const PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
const FIXED_BASELINE_SHA="eebad442ac9457d15ba67b84c48e336b96901a29f38fb3e911a13b0b8f4b20ec"
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot='u576e',sourceGroups=[[0],[1],[2],[4,5],[6],[7],[8,9],[10]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);assert.equal(T.partialKAlternativeUsed,false);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineRevision','groups','hashes','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.deepEqual(proof,{...json(identity.headerFile),trace:json(identity.traceFile)});assert.deepEqual(trace[3],[]);assert.deepEqual(proof.groups[3].polygons,[]);assert.equal(proof.groups[3].raw[0],0);const s=json(identity.sourceFile);assert.equal(s.root,sourceRoot);assert.equal(s.glyph,'坮');assert.deepEqual(s.missing,[]);assert.deepEqual(Object.keys(s.records).sort(),['u53e3@7','u53f0-02@4','u53f0-08@2','u571f-01','u576e']);assert.deepEqual(s.versionedSources.map(v=>v.name),['u53f0-02@4','u53f0-08@2','u53e3@7']);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
function generateGeometry(trace,proof,identity){
 const sourceGroups=ORIGINAL_SOURCE_GROUPS
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
  assert.deepEqual(proof.hashes, ENGINE_HASHES)
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

 return compileBound(trace,proof,identity)
}
let geometryRuns=0,cachedCalls=0
export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(geometryRuns,0);const rawBaseline=generateGeometry(trace,proof,identity);assert.equal(rawBaseline.length,9);assert(rawBaseline.every(p=>p.length===1));assert.notDeepEqual(endpoint(trace[4][0]),trace[5][0].args.slice(0,2));const baseline=[...rawBaseline.slice(0,3),[rawBaseline[3][0],rawBaseline[4][0]],...rawBaseline.slice(5)];assert.deepEqual(baseline.flat(),rawBaseline.flat());assert.equal(baseline.length,8);assert.equal(baseline.flat().length,9);geometryRuns++;return{rawBaseline,baseline}}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const f=json('./fixtures.json').u576e;assert.equal(digest(f.fullProof),FIXED_PROOF_SHA);assert.equal(digest(f.baseline),FIXED_BASELINE_SHA);assert.deepEqual(f.strokes,f.baseline);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return 0}
export function cachedPositiveCallCount(){return cachedCalls}
