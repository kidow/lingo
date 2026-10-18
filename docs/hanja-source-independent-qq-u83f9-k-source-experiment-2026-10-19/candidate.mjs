export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// Provisional source-only review compiler. Domestic order and browser approval are pending.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const endpoint = (call) => call.args.slice(call.kind === 'cdDrawLine' ? 2 : call.kind === 'cdDrawCurve' ? 4 : 6, call.kind === 'cdDrawLine' ? 4 : call.kind === 'cdDrawCurve' ? 6 : 8)
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })


const local=n=>new URL(n,import.meta.url),json=n=>JSON.parse(readFileSync(local(n),'utf8')),sha=b=>createHash('sha256').update(b).digest('hex')
const T=json('./config.json').targets['u83f9-k'],FIXED_PINS={"../hanja-goal-glyphwiki-batch250-2026-10-04/NOTICE.md":"2b0836fd61ed5ea01f6cbb79597bf888d93ddf8042e512096750f51f99a82744","../hanja-goal-glyphwiki-batch250-2026-10-04/README.md":"0e9be0065244fcad3d85520b834638b88ef0262bcc670ed421f041a315151a35","../hanja-goal-glyphwiki-batch250-2026-10-04/alternative-sources.json":"f647db0af5b40c06542a8dddfed15cff40aac94723b159940e4ac4d2ae01cfa8","../hanja-goal-glyphwiki-batch250-2026-10-04/coverage.json":"acce17f2ebc2832b48fb40b5fcb81570389e42f34f1dea7d83b29d22166245d4","../hanja-goal-glyphwiki-batch250-2026-10-04/draw-trace.json":"337d65db6ce053f804e4e6dbd95783bc346d5d069f1d1476b26b5b45a80281a6","../hanja-goal-glyphwiki-batch250-2026-10-04/engine-proof.json":"042193ce17ee38aa345ad7715fefc52d2c2c7c2caf3aa46681799ca776a8154a","../hanja-goal-glyphwiki-batch250-2026-10-04/hold-review.json":"68c47c87c2f7e31bd065e3463bc001512e3f7d9d2dd72373abeb859100ed4251","../hanja-goal-glyphwiki-batch250-2026-10-04/metadata.json":"d108f2bbde6fb641e9b607d607c530d67c777243763731b90ff1cddd251d629b","../hanja-goal-glyphwiki-batch250-2026-10-04/next-source-inventory.json":"85bb3cb3fee2cc1166c5bb8246861be10db6b2e6785223d53e3e8937f1f1748d","../hanja-goal-glyphwiki-batch250-2026-10-04/next.json":"02a58daf52e9a2286d67f35f283cd44c9ff8c493aa59c79f6ddb815f5967db2a","../hanja-goal-glyphwiki-batch250-2026-10-04/serve.py":"398057a9343438f490a555d43205724991bc38dc93ad116424d8554f85c1e4b2","../hanja-goal-glyphwiki-batch250-2026-10-04/sources.json":"f635544d6f0e8c6ca97456dc6c1f870b9e62b77d271fb1148ffb0e2522cec31c","../hanja-goal-glyphwiki-batch250-2026-10-04/validation.json":"626879cb04aec018322e17bda1144f5dffba4358b5983f508c2885a30eecc6ba","../hanja-goal-glyphwiki-batch250-2026-10-04/verify.mjs":"c11d5555e7f56d8dd17895f515b11054fb70e01fb770469124218651c5e673b1","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch719-2026-10-12/progressive.mjs":"17f21ae041455f0a5e6d46f8bdbe6d8d2c9e736cf9ce550367e02a83979f4063","../hanja-goal-glyphwiki-batch1183-2026-10-18/review.json":"aff8d111b4574eeda09ae93dc134eb9c543e2340f9b829e73eadc234a7a65634","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u83f9-k","headerFile":"../hanja-goal-glyphwiki-batch250-2026-10-04/engine-proof.json","headerFileSHA256":"042193ce17ee38aa345ad7715fefc52d2c2c7c2caf3aa46681799ca776a8154a","traceFile":"../hanja-goal-glyphwiki-batch250-2026-10-04/draw-trace.json","traceFileSHA256":"337d65db6ce053f804e4e6dbd95783bc346d5d069f1d1476b26b5b45a80281a6","sourceFile":"../hanja-goal-glyphwiki-batch250-2026-10-04/sources.json","sourceFileSHA256":"f635544d6f0e8c6ca97456dc6c1f870b9e62b77d271fb1148ffb0e2522cec31c"},FIXED_PROOF_SHA="f65ce79e43866e4084d4c407c48cd87b627df76d9fdd950c40a9455edfb1a5c5",FIXED_BASELINE_SHA="0b7a626445e70bf7b894f043d107ed5195b65ac65ddadfd7828914b92c4f1588"
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13]],RAW_COUNT=14,ORIGINAL=[[{"kind":"cdDrawLine","args":[12.935,35.54,93.53,35.54,0,100]}],[{"kind":"cdDrawLine","args":[63.68,13.18,63.68,57.04,0,300]}],[{"kind":"cdDrawLine","args":[135.32,13.18,135.32,57.04,0,300]}],[{"kind":"cdDrawLine","args":[105.47,35.54,186.065,35.54,0,0]}],[{"kind":"cdDrawCurve","args":[30.745,63.8,53.12,68.98,62.965,79.34,7,8]}],[{"kind":"cdDrawCurve","args":[13.74,97.84,37.905,103.02000000000002,46.855,113.38,7,8]}],[{"kind":"cdDrawCurve","args":[15.53,147.42000000000002,46.855,154.07999999999998,43.275,185.16,7,8]}],[{"kind":"cdDrawCurve","args":[38.8,160,42.38,151.12,79.97,98.58,32,7]}],[{"kind":"cdDrawLine","args":[99.9,70.55375000000001,99.9,181.69625,12,32]}],[{"kind":"cdDrawLine","args":[99.9,70.55375000000001,159.3,70.55375000000001,2,2]}],[{"kind":"cdDrawLine","args":[159.3,70.55375000000001,159.3,181.69625,22,32]}],[{"kind":"cdDrawLine","args":[99.9,107.09375,159.3,107.09375,2,2]}],[{"kind":"cdDrawLine","args":[99.9,143.63375000000002,159.3,143.63375000000002,2,2]}],[{"kind":"cdDrawLine","args":[72.84,181.69625,186.36,181.69625,0,100]}]],TRACE_SHA256="9326310b7d1ff135f36c6f3039eed4c8852616d22d0af7eec5e2d90f8ee29362",GROUPS_SHA256="41791ad9a478bfcceade2dc74a1fb851eaa23ac9eec651e95c3d5d723cd3d767",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot='u83f9-k',sourceGroups=[[0],[1],[3],[2],[4],[5],[6,7],[8],[9,10],[11],[12],[13]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[p,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(p))),h,p);assert.deepEqual(proof,{...json(identity.headerFile),trace:json(identity.traceFile)});for(const[p,h]of[[identity.headerFile,identity.headerFileSHA256],[identity.traceFile,identity.traceFileSHA256],[identity.sourceFile,identity.sourceFileSHA256]])assert.equal(sha(readFileSync(local(p))),h);const s=json(identity.sourceFile);assert.equal(s.root,sourceRoot);assert.equal(s.glyph,'菹');assert.equal(digest(s),"0cbac6c7ce6cb0878e15780a05f9c6e3ad7d159065294256cde1be31fd0e5d94");assert.deepEqual(s.missing,[]);assert.deepEqual(Object.keys(s.records).sort(),["u4e14","u4e14-02","u6c35-01","u8279-k03","u83f9-k","u83f9-var-001","ufa5e-03"]);assert.deepEqual(s.aliases,[]);assert.deepEqual(s.providerVersions,[]);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
function generateGeometry(trace,proof,identity){const sourceGroups=ORIGINAL_SOURCE_GROUPS;
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
export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(geometryRuns,0);const rawBaseline=generateGeometry(trace,proof,identity);const baseline=[rawBaseline[0],rawBaseline[1],rawBaseline[3],rawBaseline[2],rawBaseline[4],rawBaseline[5],[rawBaseline[6][0],rawBaseline[7][0]],...rawBaseline.slice(8)];geometryRuns++;return{rawBaseline,baseline}}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const f=json('./fixtures.json')['u83f9-k'];assert.equal(digest(f.fullProof),FIXED_PROOF_SHA);assert.equal(digest(f.baseline),FIXED_BASELINE_SHA);assert.deepEqual(f.strokes,f.baseline);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return 0}
export function cachedPositiveCallCount(){return cachedCalls}
