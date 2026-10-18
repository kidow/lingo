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
const T=json('./config.json').targets["u7e45"],FIXED_PINS={"../hanja-goal-glyphwiki-batch659-2026-10-11/README.md":"46b89703f3849ed907f50b9cf1a89483b852c76690565db7dcee005221dc8031","../hanja-goal-glyphwiki-batch659-2026-10-11/draw-trace.json":"d5fefa3ed378031e64d4ed16c5223c86fe532e8b3a37eb48d314abad961bd28f","../hanja-goal-glyphwiki-batch659-2026-10-11/engine-proof.json":"515b51101863b4984b513f0b9f7b55c24d49ee47e0f9d63d0c9171c1392d28cc","../hanja-goal-glyphwiki-batch659-2026-10-11/engine-whole-u7e45-ue0100.json":"15cafcc3c79fe705fc4876cc4c641238b9943eddf50429147ffbec304c53b5ee","../hanja-goal-glyphwiki-batch659-2026-10-11/engine-whole-u7e45-ue0101.json":"15cafcc3c79fe705fc4876cc4c641238b9943eddf50429147ffbec304c53b5ee","../hanja-goal-glyphwiki-batch659-2026-10-11/engine-whole-u7e45-ue0102.json":"96d8362cd4c90c662fecb39ff2f0d8727ac538e675b886a083f17713ebe38e42","../hanja-goal-glyphwiki-batch659-2026-10-11/engine-whole-u7e45-ufe00.json":"96d8362cd4c90c662fecb39ff2f0d8727ac538e675b886a083f17713ebe38e42","../hanja-goal-glyphwiki-batch659-2026-10-11/engine-whole-u7e45.json":"287b1d50903525fb54d201623ccb281d3fb513cf614195525b7ec7c1151a6e31","../hanja-goal-glyphwiki-batch659-2026-10-11/metadata.json":"4f1125b4eb0bab59f8cf289e990f3401b290b5406a1a737a5042edee513ff04a","../hanja-goal-glyphwiki-batch659-2026-10-11/progressive-review.json":"3e6fffd1a6344275b940cc1701afbbc7cb86f28a6ea4078ea8ce3ecc08fa31f3","../hanja-goal-glyphwiki-batch659-2026-10-11/progressive.mjs":"52f8f9b9092f3497588d8d51defb4bf7bebf64b5379d9669f97acab69161985a","../hanja-goal-glyphwiki-batch659-2026-10-11/resume.json":"9872069f10bd07b778db875543a2f6d302d64002b1e7e3655c9a22be3b984ab8","../hanja-goal-glyphwiki-batch659-2026-10-11/serve-variants.py":"22ff18ed2937d292f681a18eed6fc4150d84a6ffda20f492b5a6475ae31360dc","../hanja-goal-glyphwiki-batch659-2026-10-11/sources.json":"a31da0eef5e4c47f37566b14c7dc52c8d4f3abb41ec48d20ddd66c9fcec158f1","../hanja-goal-glyphwiki-batch659-2026-10-11/validation.json":"876fd49feef6c256ca210435083d86597eece446e299b70299c5e4f98ffab6ca","../hanja-goal-glyphwiki-batch659-2026-10-11/verify-source.mjs":"936b03c0ce5e6ac398b3cdfd8410bdb478cee13fcd7acc243cd2ba0c7c193683","../hanja-goal-glyphwiki-batch659-2026-10-11/whole-variant-inventory.json":"5fd323d8f525bcc5f8ba28e16cfe99f5951d4ef5f296301de47312affd808668","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u7e45","headerFile":"../hanja-goal-glyphwiki-batch659-2026-10-11/engine-proof.json","headerFileSHA256":"515b51101863b4984b513f0b9f7b55c24d49ee47e0f9d63d0c9171c1392d28cc","traceFile":"../hanja-goal-glyphwiki-batch659-2026-10-11/draw-trace.json","traceFileSHA256":"d5fefa3ed378031e64d4ed16c5223c86fe532e8b3a37eb48d314abad961bd28f","sourceFile":"../hanja-goal-glyphwiki-batch659-2026-10-11/sources.json","sourceFileSHA256":"a31da0eef5e4c47f37566b14c7dc52c8d4f3abb41ec48d20ddd66c9fcec158f1"},FIXED_PROOF_SHA="dfcc3511b5eacf34021c0a4d8b9e7cfa73e2c2be415fc330bc9b5b70ea6e4837",FIXED_BASELINE_SHA="35494d2ea234cebbee5d3bc460c3cab0d984e4b88efb38c67a03ccc0aeaa1d8a"
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10,11],[12,13],[14],[15,16],[17],[18],[19],[20],[21],[22]],FACTORY_MAP=[[0,1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18]],RAW_COUNT=23,ORIGINAL=[[{"kind":"cdDrawCurve","args":[49.86,16,39.92,37,27.85,56,0,7]}],[{"kind":"cdDrawCurve","args":[12.94,45,29.98,56,37.08,76,7,8]}],[{"kind":"cdDrawCurve","args":[70.45,39,50.57,76,27.14,110,0,7]}],[{"kind":"cdDrawCurve","args":[14.36,113,44.18,109,70.45,101,0,7]}],[{"kind":"cdDrawCurve","args":[55.54,78,69.03,91,74.71,114,7,8]}],[{"kind":"cdDrawLine","args":[47.02,109,47.02,186,32,0]}],[{"kind":"cdDrawCurve","args":[29.98,127,27.14,155,12.94,180,0,7]}],[{"kind":"cdDrawCurve","args":[56.25,122,69.03,136,74,161,7,8]}],[{"kind":"cdDrawCurve","args":[105.61,16.79,99.715,26.615,89.235,37.095,0,7]}],[{"kind":"cdDrawCurve","args":[89.235,37.095,99.715,44.955,105.61,57.4,7,8]}],[{"kind":"cdDrawCurve","args":[136.39499999999998,16.79,130.5,26.615,120.02000000000001,37.095,0,7]}],[{"kind":"cdDrawCurve","args":[120.02000000000001,37.095,130.5,44.955,136.39499999999998,57.4,7,8]}],[{"kind":"cdDrawCurve","args":[167.18,16.79,161.285,26.615,150.805,37.095,0,7]}],[{"kind":"cdDrawCurve","args":[150.805,37.095,161.285,44.955,167.18,57.4,7,8]}],[{"kind":"cdDrawLine","args":[96.44,67.66,96.44,110.13999999999999,12,213]}],[{"kind":"cdDrawLine","args":[96.44,67.66,164.56,67.66,2,2]}],[{"kind":"cdDrawLine","args":[164.56,67.66,164.56,110.13999999999999,22,223]}],[{"kind":"cdDrawLine","args":[96.44,88.9,164.56,88.9,2,2]}],[{"kind":"cdDrawLine","args":[96.44,110.13999999999999,164.56,110.13999999999999,2,2]}],[{"kind":"cdDrawLine","args":[75.48,131.38,185.51999999999998,131.38,0,0]}],[{"kind":"cdDrawLine","args":[130.5,67.66,130.5,184.48,32,0]}],[{"kind":"cdDrawCurve","args":[126.57,131.38,106.92,167.96,72.86,185.66,132,7]}],[{"kind":"cdDrawCurve","args":[134.43,131.38,154.735,164.42,180.935,177.4,7,0]}]],TRACE_SHA256="514ec4b23a634113095ab833294cfde43aec3ec27210f710ec3b23bc825a9e1b",GROUPS_SHA256="f6ad60e34374f06876059096bd8f8cd135e14985cb61e6296c523bf359d80442",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot="u7e45",sourceGroups=[[0,1],[2,3],[4],[5],[6],[7],[8,9],[10,11],[12,13],[14],[15,16],[17],[18],[19],[20],[21],[22]],nativeApproval=false,runtimeApplied=false
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
