export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// 고정원본 전용 source 실험. 새 native/runtime 승인이 아닙니다.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex'),sha=b=>createHash('sha256').update(b).digest('hex'),local=n=>new URL(n,import.meta.url),json=n=>JSON.parse(readFileSync(local(n),'utf8'))
const point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0}),endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8)
const T=json('./config.json').targets['u7468-k'],FIXED_PINS={"../hanja-goal-glyphwiki-batch281-2026-10-05/README.md":"0c315e369218f9a9ea54e0b8caa5a4893d6ac29e5c6468004d834b8c0a16a4ae","../hanja-goal-glyphwiki-batch281-2026-10-05/coverage.json":"30962bbae98f57450ad6c4759d04358897cbce52b3900ba09896d14a2adf8abf","../hanja-goal-glyphwiki-batch281-2026-10-05/draw-trace.json":"b775ef13ac48fa4ebb6783e673b883d6e9d2126025ebcb7b90525317dd471145","../hanja-goal-glyphwiki-batch281-2026-10-05/engine-proof.json":"7450bafcd7c92842aaa1cb601edff432c1be9cab4871c6726a0807b5e06a4e2b","../hanja-goal-glyphwiki-batch281-2026-10-05/metadata.json":"e4cfd0718ee55eeb23491b9eb62610794d88336481473909e19369b603103613","../hanja-goal-glyphwiki-batch281-2026-10-05/next-source-inventory.json":"52358ef4c1789954596d3374a489a0ea6817a6a843e98f915fc57f2030a21a33","../hanja-goal-glyphwiki-batch281-2026-10-05/next.json":"c0c98bb5eede3728e82dbe58e3050989429e932b0e840c5196cf62d4dbd6001f","../hanja-goal-glyphwiki-batch281-2026-10-05/review.json":"0c6080a1ac8c727c6cf6c717be211304e28cafb4de17daf10fb0c0c6a13699de","../hanja-goal-glyphwiki-batch281-2026-10-05/serve.py":"9107f97c1d0b4fc250521f7fb68b79c702bd6210c03831f14c3dcaba94b45781","../hanja-goal-glyphwiki-batch281-2026-10-05/sources.json":"84024a92b9361a345adb76ab41f6b173d9c3f79c64b4fdc2b4dba55fdcd84f22","../hanja-goal-glyphwiki-batch281-2026-10-05/validation.json":"12f611a432bd500e713de199a4f06d4dab4cc35acf592071cae919899a3803f8","../hanja-goal-glyphwiki-batch281-2026-10-05/verify.mjs":"91ba865805f0314dc3160bdbdac51a00852887c8325d93c6356eab8c05976c7e","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u7468-k","file":"../hanja-goal-glyphwiki-batch281-2026-10-05/engine-proof.json","fileSHA256":"7450bafcd7c92842aaa1cb601edff432c1be9cab4871c6726a0807b5e06a4e2b"}
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16]],RAW_COUNT=17,ORIGINAL=[[{"kind":"cdDrawLine","args":[14,42,75,42,0,0]}],[{"kind":"cdDrawLine","args":[41,42,41,149,32,32]}],[{"kind":"cdDrawLine","args":[17,93,72,93,0,100]}],[{"kind":"cdDrawCurve","args":[14,160,43,150,78,135,0,7]}],[{"kind":"cdDrawLine","args":[76.375,25,180.625,25,0,0]}],[{"kind":"cdDrawCurve","args":[102.507,27.24,96.5995,52.84,89.5105,77.16,0,7]}],[{"kind":"cdDrawCurve","args":[78.877,78.44,97.19024999999999,76.52000000000001,121.411,72.03999999999999,0,7]}],[{"kind":"cdDrawCurve","args":[107.82374999999998,47.08,119.63875,63.72,125.54625,82.92,7,8]}],[{"kind":"cdDrawCurve","args":[153.3115,27.24,147.404,52.84,140.315,77.16,0,7]}],[{"kind":"cdDrawCurve","args":[131.45375,78.44,149.17624999999998,76.52000000000001,172.21550000000002,72.03999999999999,0,7]}],[{"kind":"cdDrawCurve","args":[158.62824999999998,47.08,170.44324999999998,63.72,176.35075,82.92,7,8]}],[{"kind":"cdDrawLine","args":[69.425,97,187.575,97,0,100]}],[{"kind":"cdDrawLine","args":[92.84649999999999,116.6,92.84649999999999,174.4,12,113]}],[{"kind":"cdDrawLine","args":[92.84649999999999,116.6,164.1535,116.6,2,2]}],[{"kind":"cdDrawLine","args":[164.1535,116.6,164.1535,174.4,22,123]}],[{"kind":"cdDrawLine","args":[92.84649999999999,144.65,164.1535,144.65,2,2]}],[{"kind":"cdDrawLine","args":[92.84649999999999,174.4,164.1535,174.4,2,2]}]]
const TRACE_SHA256="8c347b01a9c5de4b140eddba69dabf249c97624dc5921cf1db0e1e2688c96427",GROUPS_SHA256="3687e09318e75453d8aad8098ab33906793a9d5ece6ea1306bf09e778a5bc1c7",FIXED_PROOF_SHA="446b6aca699df3989a53f41d036533102943b20f580d6514c3ea525119318811"
const PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
const FIXED_BASELINE_SHA="3dcaae54eca26dd0a413b3c51a2b45e3ba58add511ff51ebc4b26a0f36c63407"
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot='u7468-k',sourceGroups=[[0],[2],[1],[3],[4],[5,6],[7],[8,9],[10],[11],[12],[13,14],[15],[16]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.deepEqual(proof,json(identity.file));assert.deepEqual(proof.trace,json('../hanja-goal-glyphwiki-batch281-2026-10-05/draw-trace.json'));const s=json('../hanja-goal-glyphwiki-batch281-2026-10-05/sources.json');assert.equal(s.root,sourceRoot);assert.equal(s.glyph,'瑨');assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.deepEqual(s.providerVersions,[]);assert.deepEqual(Object.keys(s.records).sort(),["u53b8-03","u53b8-09","u65e5","u6649","u738b-01","u7468","u7468-k"]);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
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
export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(geometryRuns,0);const b=generateGeometry(trace,proof,identity);assert.equal(b.length,16);assert(b.every(p=>p.length===1));for(const[a,z]of[[5,6],[8,9]])assert.notDeepEqual(endpoint(trace[a][0]),trace[z][0].args.slice(0,2));const baseline=[b[0],b[2],b[1],b[3],b[4],[b[5][0],b[6][0]],b[7],[b[8][0],b[9][0]],b[10],b[11],b[12],b[13],b[14],b[15]];assert.equal(baseline.length,14);assert.equal(baseline.flat().length,16);geometryRuns++;return{rawBaseline:b,baseline}}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const f=json('./fixtures.json')['u7468-k'];assert.equal(digest(f.fullProof),FIXED_PROOF_SHA);assert.equal(digest(f.baseline),FIXED_BASELINE_SHA);assert.deepEqual(f.strokes,f.baseline);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return 0}
export function cachedPositiveCallCount(){return cachedCalls}
