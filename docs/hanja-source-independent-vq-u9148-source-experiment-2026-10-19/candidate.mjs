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
const T=json('./config.json').targets.u9148,FIXED_PINS={"../hanja-goal-glyphwiki-batch535-2026-10-11/NOTICE.md":"67180bcca1d63f1839089c8b1b686e4c103d6dd211f8b7fcbbc6534db600666f","../hanja-goal-glyphwiki-batch535-2026-10-11/README.md":"7c54b0f6b0d41536ae78b1d0e3f577614c0e3640365a42683eeedae062e39c52","../hanja-goal-glyphwiki-batch535-2026-10-11/draw-trace.json":"14d315d191bd41a69cf16c77ea40fffd5aa20e5ec8901ab03afeb806182ff278","../hanja-goal-glyphwiki-batch535-2026-10-11/engine-proof.json":"d9d9ee732bb7a04f0daa3d370fe9991ab6451923a55e9e3ad154c28e41f08592","../hanja-goal-glyphwiki-batch535-2026-10-11/engine-whole-u9148-ue0100.json":"d464b270347cb1893d2520ad4a506fc07aa5e964c1f74585f15a3c169635eaec","../hanja-goal-glyphwiki-batch535-2026-10-11/engine-whole-u9148.json":"99f96412da6de7c87723f3ea1cef0d0c5404b31a106963f48e10eb480ebdc24c","../hanja-goal-glyphwiki-batch535-2026-10-11/metadata.json":"3e6f8d55deda3c92d9680d3f5128bbbf192efb37402ceecc2b750a14d8d34e75","../hanja-goal-glyphwiki-batch535-2026-10-11/progressive-review.json":"2e87f8c6f03fd8dfbd79f26ce5db1ffe5cedf093e8e4491876dd73f89679b30e","../hanja-goal-glyphwiki-batch535-2026-10-11/progressive.mjs":"546c0dca235ddb442209f01854db843b18a9cf12fd7047b2de90c557d6aa5366","../hanja-goal-glyphwiki-batch535-2026-10-11/resume.json":"517b664a42bc7367c681f2ebfc7dc4ce15c34ac980d56811a327f2877196d3e5","../hanja-goal-glyphwiki-batch535-2026-10-11/serve-progressive.py":"d04c8c997ca9d003842c56709c98e528aeedc798aad53525c5fb1a38b530f203","../hanja-goal-glyphwiki-batch535-2026-10-11/serve-variants.py":"b7ae9bb24e718c212147410d7a88feefd37145b262251d671944e08d0964e93c","../hanja-goal-glyphwiki-batch535-2026-10-11/sources.json":"8fe239f421e048cb8d6f26b2f6b69b398dd4e08667aedf30acc987a94cfe5288","../hanja-goal-glyphwiki-batch535-2026-10-11/validation.json":"d3cbdd96239e5f3eb4c7678ef71d82e812f4acdefe1be28b3596948d7f069852","../hanja-goal-glyphwiki-batch535-2026-10-11/verify-source.mjs":"633f719a416341e04505c7a826cb9ef4d89caa26bbac9fb54416fe53d5d6b9bf","../hanja-goal-glyphwiki-batch535-2026-10-11/whole-variant-inventory.json":"a0c052fcc218a58cbf9eb18fec62a618b638d958159421654d4283a755f3ebda","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u9148","file":"../hanja-goal-glyphwiki-batch535-2026-10-11/engine-whole-u9148.json","fileSHA256":"99f96412da6de7c87723f3ea1cef0d0c5404b31a106963f48e10eb480ebdc24c"},FIXED_PROOF_SHA="1d4f749b6e4c3bdf431960fd54823b962cda06e552ecf3cb101329b677b8fc43",FIXED_BASELINE_SHA="2353595a5a6975481d2034ab82f96a151683373e5b417656c1a1acd3843fd531"
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2,3],[4],[5],[6],[7,8],[9],[10],[11],[12],[13,14],[16],[17],[15],[18],[19],[20],[21],[22],[23,24],[25],[26]],FACTORY_MAP=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16,17],[18],[19],[20],[21],[22]],RAW_COUNT=27,ORIGINAL=[[{"kind":"cdDrawLine","args":[16.015,25,69.445,25,0,0]}],[{"kind":"cdDrawLine","args":[25.605,38,25.605,73,2012,200]}],[{"kind":"cdDrawLine","args":[25.605,38,58.485,38,2,2]}],[{"kind":"cdDrawLine","args":[58.485,38,58.485,72,4022,200]}],[{"kind":"cdDrawLine","args":[42.73,45,42.73,71,4000,200]}],[{"kind":"cdDrawLine","args":[76.295,25,131.095,25,0,0]}],[{"kind":"cdDrawLine","args":[85.885,38,85.885,72,4012,200]}],[{"kind":"cdDrawLine","args":[85.885,38,118.765,38,2,2]}],[{"kind":"cdDrawLine","args":[118.765,38,118.765,71,2022,200]}],[{"kind":"cdDrawLine","args":[101.64,43,101.64,70,4000,200]}],[{"kind":"cdDrawLine","args":[72.185,64,72.185,85,4000,32]}],[{"kind":"cdDrawLine","args":[27.66,85,126.3,85,2,0]}],[{"kind":"cdDrawLine","args":[27.66,85,27.66,129,12,1]},{"kind":"cdDrawCurve","args":[27.66,129,27.66,164,13.275,189,1,7]}],[{"kind":"cdDrawLine","args":[27.66,104,118.08,104,2,2]}],[{"kind":"cdDrawLine","args":[118.08,104,118.08,123,22,323]}],[{"kind":"cdDrawLine","args":[27.66,123,118.08,123,2,2]}],[{"kind":"cdDrawLine","args":[59.17,88,59.17,123,0,32]}],[{"kind":"cdDrawLine","args":[88.625,88,88.625,123,0,32]}],[{"kind":"cdDrawLine","args":[46.84,151,77.665,151,2,200]}],[{"kind":"cdDrawLine","args":[46.84,130,46.84,176,0,32]}],[{"kind":"cdDrawCurve","args":[29.715,181,48.895,177,81.09,168,0,7]}],[{"kind":"cdDrawCurve","args":[119.45,140,107.12,149,89.995,155,0,7]}],[{"kind":"cdDrawLine","args":[86.57,131,86.57,169,0,1]},{"kind":"cdDrawCurve","args":[86.57,169,86.57,179,96.57,179,1,1]},{"kind":"cdDrawLine","args":[96.57,179,124.245,179,6,5]}],[{"kind":"cdDrawLine","args":[142.94,28,178.56,28,2,2]}],[{"kind":"cdDrawCurve","args":[178.56,28,171.70999999999998,53,157.325,84,22,7]}],[{"kind":"cdDrawBezier","args":[157.325,83,183.35500000000002,99,182.67000000000002,133,178.6743586981255,146.41602188950563,7,1]},{"kind":"cdDrawCurve","args":[178.6743586981255,146.41602188950563,175.82,156,165.82,156,1,514]}],[{"kind":"cdDrawLine","args":[142.94,28,142.94,186,12,0]}]],TRACE_SHA256="410bd8ab5ffc31721b3a89f4125f20dbc0a6e3344cd78fd2b11daa4068c52d54",GROUPS_SHA256="500e603ba43b07e8863903e41c5aecdb55a62f6c7f3ca197898cc81bd978ffd2",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot='u9148',sourceGroups=[[0],[1],[2,3],[4],[5],[6],[7,8],[9],[10],[11],[12],[13,14],[16],[17],[15],[18],[19,20],[21],[22],[23,24],[25],[26]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,FACTORY_MAP);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.deepEqual(proof,json(identity.file));const header=json('../hanja-goal-glyphwiki-batch535-2026-10-11/engine-proof.json');assert.deepEqual(proof.trace,json('../hanja-goal-glyphwiki-batch535-2026-10-11/draw-trace.json'));for(const k of ['groups','defaults','engineHashes','engineRevision'])assert.deepEqual(proof[k],header[k]);const s=json("../hanja-goal-glyphwiki-batch535-2026-10-11/sources.json");assert.equal(s.root,"u9148");assert.equal(s.glyph,T.glyph);assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.equal(Object.keys(s.records).length,T.sourceFamily.records);assert.equal(s.providerVersions.length,T.sourceFamily.providerVersions);for(const p of s.providerVersions)assert.equal(s.records[p.name].data,(p.responseIdentity||p).data);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
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
