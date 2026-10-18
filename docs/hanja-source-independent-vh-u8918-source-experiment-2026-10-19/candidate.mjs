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
const T=json('./config.json').targets.u8918,FIXED_PINS={"../hanja-goal-glyphwiki-batch772-2026-10-13/NOTICE.md":"80831cda80c1628c3be120d599f7e26f844336b5774e5095f84efea52f97d782","../hanja-goal-glyphwiki-batch772-2026-10-13/README.md":"0528a63102ebc959de7d5898385a4ffd85f8b0a2d7ffb859489b068ffaa6a576","../hanja-goal-glyphwiki-batch772-2026-10-13/draw-trace.json":"62b3fe75bd1462c50ca49fcb94f36dab9a0ddfbf8f888e104969525c7b42d486","../hanja-goal-glyphwiki-batch772-2026-10-13/engine-proof.json":"ba9c109c3d6f562281fd01cb789625dd662763104c82a7102ec8fd37d3dc97a7","../hanja-goal-glyphwiki-batch772-2026-10-13/engine-whole-u8918-k.json":"8a8cf875840d7af10cf2918a19b4d8306be3ede39f3c1d50c0643bcd8a967e60","../hanja-goal-glyphwiki-batch772-2026-10-13/engine-whole-u8918-ue0100.json":"19bc616175470ee25d27b82c2273af16b0b39d2c5661c302d83cdd9fbec152a0","../hanja-goal-glyphwiki-batch772-2026-10-13/engine-whole-u8918-ue0101.json":"19bc616175470ee25d27b82c2273af16b0b39d2c5661c302d83cdd9fbec152a0","../hanja-goal-glyphwiki-batch772-2026-10-13/engine-whole-u8918-ue0102.json":"8a8cf875840d7af10cf2918a19b4d8306be3ede39f3c1d50c0643bcd8a967e60","../hanja-goal-glyphwiki-batch772-2026-10-13/engine-whole-u8918.json":"19bc616175470ee25d27b82c2273af16b0b39d2c5661c302d83cdd9fbec152a0","../hanja-goal-glyphwiki-batch772-2026-10-13/metadata.json":"96f2033bd6f17bb6f62ee9a398878b12f2a5698ddae49630716ea1300da938ee","../hanja-goal-glyphwiki-batch772-2026-10-13/resume.json":"6faf37f9e438a6230e47ce6de7c7c706e300d8c6f3732bf54539305e2c03c25c","../hanja-goal-glyphwiki-batch772-2026-10-13/review.json":"4071d1e41ba2bfb4efcb2b96c0c322ca4fbb8206ba085f286250c1d83afc23fe","../hanja-goal-glyphwiki-batch772-2026-10-13/serve-memory.py":"5f2fcdd50b9547183650faf527407ec0c893a2af0133b365cd1606acee5c9b41","../hanja-goal-glyphwiki-batch772-2026-10-13/source-analysis.json":"1ffa7cbec5c5dca2bdc1b3e260065b44fe4121e98e90b57a6afa400d6fefaece","../hanja-goal-glyphwiki-batch772-2026-10-13/source-join-analysis.json":"8c976466a0a62f14672ce31b4d6050b9a17733ae48c5265cc58d6915321936e5","../hanja-goal-glyphwiki-batch772-2026-10-13/sources.json":"acd020079327ff7d7e47ab248ea589f9e9b4c990c3ce616fdfb0f9512b3b7c3e","../hanja-goal-glyphwiki-batch772-2026-10-13/validation.json":"bc8cebfc277497526f2e34a7298879a50d383dc5155e36f98b847d6a2b030aae","../hanja-goal-glyphwiki-batch772-2026-10-13/verify-source.mjs":"fd6fca5e4aadfb3a297e3410d89bbf80e89c3ba2fc807a3ad706b9d7456dba1a","../hanja-goal-glyphwiki-batch772-2026-10-13/whole-variant-inventory.json":"a101d9bb2e84d40e7224e830190b3094d94bb585324abcd8f79d60e501806a1a","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u8918","file":"../hanja-goal-glyphwiki-batch772-2026-10-13/engine-proof.json","fileSHA256":"ba9c109c3d6f562281fd01cb789625dd662763104c82a7102ec8fd37d3dc97a7"},FIXED_PROOF_SHA="98b4de43ea096ed7a50cbb2488e489a32faf584d199792e6233b5a7aff92b0ab",FIXED_BASELINE_SHA="46c84e791c8668f4211f4d05a96b2fe1548d2de9676727c03b7d2a62f86b9e72"
const ORIGINAL_SOURCE_GROUPS=[[0],[1,2],[3],[4],[5],[6,7],[8],[9],[10],[11,12],[13],[14],[15],[16],[17]],RAW_COUNT=18,ORIGINAL=[[{"kind":"cdDrawLine","args":[43.44,13,43.44,54,0,32]}],[{"kind":"cdDrawLine","args":[13.84,54,66.38,54,0,2]}],[{"kind":"cdDrawCurve","args":[66.38,54,48.62,99,10.14,134,22,7]}],[{"kind":"cdDrawLine","args":[43.44,99,43.44,186,32,0]}],[{"kind":"cdDrawCurve","args":[71.56,90,67.12,99,53.8,115,0,7]}],[{"kind":"cdDrawCurve","args":[44.18,107,62.68,120,70.82,138,7,8]}],[{"kind":"cdDrawLine","args":[81.41,36,155.835,36,0,2]}],[{"kind":"cdDrawLine","args":[155.835,36,155.835,64,22,32]}],[{"kind":"cdDrawLine","args":[123.775,13,112.325,64,0,32]}],[{"kind":"cdDrawLine","args":[72.25,64,186.75,64,0,100]}],[{"kind":"cdDrawLine","args":[98.585,82,98.585,108,12,113]}],[{"kind":"cdDrawLine","args":[98.585,82,160.415,82,2,2]}],[{"kind":"cdDrawLine","args":[160.415,82,160.415,108,22,123]}],[{"kind":"cdDrawLine","args":[98.585,108,160.415,108,2,2]}],[{"kind":"cdDrawLine","args":[92.86,134,181.025,134,2,0]}],[{"kind":"cdDrawLine","args":[92.86,134,92.86,161,12,32]}],[{"kind":"cdDrawLine","args":[72.25,161,186.75,161,0,0]}],[{"kind":"cdDrawLine","args":[138.66,109,138.66,187,0,200]}]],TRACE_SHA256="e1b4eff1ef0ef41af0ec40af718a1990a029f74e4bd319425d63699aa4107e65",GROUPS_SHA256="41f4dd67d9b3e71daf67208c7cf5df777c02a21d13a3be5e06cb13d684485d72",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot='u8918',sourceGroups=[[0],[1,2],[3],[4],[5],[6,7],[8],[9],[10],[11,12],[13],[14],[15,16],[17]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12,13],[14]]);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.deepEqual(proof,json(identity.file));assert.deepEqual(proof.trace,json('../hanja-goal-glyphwiki-batch772-2026-10-13/draw-trace.json'));const s=json('../hanja-goal-glyphwiki-batch772-2026-10-13/sources.json');assert.equal(s.root,sourceRoot);assert.equal(s.glyph,'褘');assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.deepEqual(s.providerVersions,[{"name":"u97cb-g08@2","version":"2","apiUrl":"https://glyphwiki.org/api/glyph?name=u97cb-g08%402","responseIdentity":{"name":"u97cb-g08","version":"2","related":"U+97CB","data":"1:0:2:58:36:123:36$1:22:32:123:36:123:64$1:0:32:92:14:85:64$1:0:0:50:64:150:64$1:12:13:73:82:73:108$1:2:2:73:82:127:82$1:22:23:127:82:127:108$1:2:2:73:108:127:108$1:2:0:60:134:145:134$1:0:313:66:142:58:161$1:2:0:58:161:152:161$1:0:0:101:117:101:187"},"sha256":"9ea016ffe2f0b518c33dbe288ae716ebec83b83b1b7e5601d5accc28f4890c35"}]);assert.equal(s.providerVersions.length,1);assert.equal(s.records["u97cb-g08@2"].data,s.providerVersions[0].responseIdentity.data);assert.deepEqual(Object.keys(s.records).sort(),["u8864-01","u8918","u8918-k","u8918-ue0100","u8918-ue0101","u8918-ue0102","u97cb-08","u97cb-g08@2"]);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
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
export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(geometryRuns,0);const rawBaseline=generateGeometry(trace,proof,identity);const baseline=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12,13],[14]].map(indices=>indices.flatMap(i=>rawBaseline[i]));geometryRuns++;return{rawBaseline,baseline}}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const f=json('./fixtures.json').u8918;assert.equal(digest(f.fullProof),FIXED_PROOF_SHA);assert.equal(digest(f.baseline),FIXED_BASELINE_SHA);assert.deepEqual(f.strokes,f.baseline);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return 0}
export function cachedPositiveCallCount(){return cachedCalls}
