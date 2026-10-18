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
const T=json('./config.json').targets["u61f0"],FIXED_PINS={"../hanja-goal-glyphwiki-batch545-2026-10-11/NOTICE.md":"b537fd623dcf6140344d5599e9f7307db4c4011654c5c713db517eb1d2b02b0d","../hanja-goal-glyphwiki-batch545-2026-10-11/README.md":"ed57720e0fb72496e3506c324c173657e63fc78d01613115eed35c0941fdb7d3","../hanja-goal-glyphwiki-batch545-2026-10-11/draw-trace.json":"b5fba6107a01e830c52a484c7526c6f9479370364e887182eda385cc4a5f5dd8","../hanja-goal-glyphwiki-batch545-2026-10-11/engine-proof.json":"d343723803aec440fe57465a7b2d683631b35263c3c1cdb6c4d0f6f9f29065fb","../hanja-goal-glyphwiki-batch545-2026-10-11/engine-whole-u61f0-g.json":"f857013f0316c0f7d0f0f4dcd84325159f9944eebef53cd1e84002c3dd3bdc8f","../hanja-goal-glyphwiki-batch545-2026-10-11/engine-whole-u61f0.json":"fde72d50f7826f444227a00661180fc8cd5e66db9c5fded55fb3b86ee7c787d4","../hanja-goal-glyphwiki-batch545-2026-10-11/metadata.json":"f7ab29fbfcc1a76f97d4e9d2320ec8d7e7a9d9f383137534baad6d4cbb37761f","../hanja-goal-glyphwiki-batch545-2026-10-11/progressive-review.json":"15db89a8bc4b4452cbe936f27139a2e279ffa99dd60eb1c2492dc8574d0ce0f5","../hanja-goal-glyphwiki-batch545-2026-10-11/progressive.mjs":"032b4287ba51444d8f0f6198c40fa22e5b2cac7c3449e8c51eacc8bf6d0e47fb","../hanja-goal-glyphwiki-batch545-2026-10-11/resume.json":"a74162f4f2b4a841775629f68da3bce70ae971b82cc9581cb160a0a91860ce0c","../hanja-goal-glyphwiki-batch545-2026-10-11/serve-progressive.py":"fe0398141d6f768353aabe0a5f6f4e118f29c9095114723e80eb518f3bd7d69d","../hanja-goal-glyphwiki-batch545-2026-10-11/serve-variants.py":"d2c6ad31141d1bd2e53435118be6009572753c0d66449c62abcf5d95254e174d","../hanja-goal-glyphwiki-batch545-2026-10-11/sources.json":"50025c54e8c73c680843b993d012441c1a078fa3768fb73fadba784c304b041b","../hanja-goal-glyphwiki-batch545-2026-10-11/validation.json":"571dca742654ae5ef57041056f70af8e7df73715cc4de95f16f835325d1794a9","../hanja-goal-glyphwiki-batch545-2026-10-11/verify-source.mjs":"a2dfdeacb63650eefe2c996d938f6bf539c1f5d47093525a0d83dba909d4cfcc","../hanja-goal-glyphwiki-batch545-2026-10-11/whole-variant-inventory.json":"c009749033e425bb4281c6d4e301f31e3bf8090369eed81f384f44ac1fc94c79","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u61f0","headerFile":"../hanja-goal-glyphwiki-batch545-2026-10-11/engine-proof.json","headerFileSHA256":"d343723803aec440fe57465a7b2d683631b35263c3c1cdb6c4d0f6f9f29065fb","traceFile":"../hanja-goal-glyphwiki-batch545-2026-10-11/draw-trace.json","traceFileSHA256":"b5fba6107a01e830c52a484c7526c6f9479370364e887182eda385cc4a5f5dd8","sourceFile":"../hanja-goal-glyphwiki-batch545-2026-10-11/sources.json","sourceFileSHA256":"50025c54e8c73c680843b993d012441c1a078fa3768fb73fadba784c304b041b"},FIXED_PROOF_SHA="8407da64d8afc37a74d0cb0b053870d38ac75327f5cc1f5f89e8167fd32f566b",FIXED_BASELINE_SHA="3183e069642dc95a610dad094c1148ac09b07faeb2faa93398c12c941c0116ee"
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7,8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19]],FACTORY_MAP=[[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18]],RAW_COUNT=20,ORIGINAL=[[{"kind":"cdDrawLine","args":[38.120000000000005,14,38.120000000000005,185,0,0]}],[{"kind":"cdDrawCurve","args":[26.92,55,24.68,85,17.96,98,7,8]}],[{"kind":"cdDrawCurve","args":[45.4,52,55.48,67,58.84,84,7,8]}],[{"kind":"cdDrawCurve","args":[98.03999999999999,17.545,88.94,23.995,73.925,29.8,0,7]}],[{"kind":"cdDrawLine","args":[73.925,29.8,73.925,63.985,12,32]}],[{"kind":"cdDrawCurve","args":[64.825,69.79,77.565,63.34,96.22,51.73,0,7]}],[{"kind":"cdDrawCurve","args":[84.39,35.605000000000004,95.765,45.28,99.405,60.76,7,8]}],[{"kind":"cdDrawLine","args":[103.955,23.995,136.26,23.995,0,2]}],[{"kind":"cdDrawCurve","args":[136.26,23.995,136.715,52.375,134.58128912533377,58.42442204026251,22,0]},{"kind":"cdDrawCurve","args":[134.58128912533377,58.42442204026251,131.255,67.85499999999999,121.255,67.85499999999999,2,114]}],[{"kind":"cdDrawCurve","args":[118.515,23.995,116.695,63.34,93.945,75.595,132,7]}],[{"kind":"cdDrawLine","args":[153.8,30,153.8,152,0,0]}],[{"kind":"cdDrawLine","args":[178.005,15,178.005,172,0,1]},{"kind":"cdDrawCurve","args":[178.005,172,178.005,182,168.005,182,1,14]}],[{"kind":"cdDrawCurve","args":[102.83,71.525,87.39,98.83,55.545,120.42,0,7]}],[{"kind":"cdDrawCurve","args":[101.86500000000001,79.145,125.99,86.13,135.64,96.28999999999999,7,8]}],[{"kind":"cdDrawLine","args":[79.67,107.08500000000001,134.675,107.08500000000001,0,0]}],[{"kind":"cdDrawLine","args":[62.3,127.405,140.465,127.405,0,0]}],[{"kind":"cdDrawLine","args":[101.86500000000001,107.08500000000001,101.86500000000001,166.14,32,32]}],[{"kind":"cdDrawCurve","args":[64.23,138.2,79.67,147.09,81.6,159.79000000000002,7,8]}],[{"kind":"cdDrawCurve","args":[130.815,137.565,124.06,147.725,113.445,157.885,0,7]}],[{"kind":"cdDrawCurve","args":[60.370000000000005,174.39499999999998,99.935,169.315,138.535,161.695,0,7]}]],TRACE_SHA256="e85867bd9a7f418f7024800cd7deb03c6b07b694500cf76f9a8c443109ba4b15",GROUPS_SHA256="2b5300b34fa250673108a556d5793ea04533848362e3e2d7057ef710d04420ab",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot="u61f0",sourceGroups=[[0],[1],[2],[3],[4,5],[6],[7,8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19]],nativeApproval=false,runtimeApplied=false
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
