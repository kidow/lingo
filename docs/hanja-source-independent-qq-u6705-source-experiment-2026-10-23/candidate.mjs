import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const read=n=>readFileSync(new URL(n,import.meta.url)),json=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex'),digest=v=>sha(JSON.stringify(v))
const endpoint=call=>call.args.slice(call.kind==='cdDrawLine'?2:call.kind==='cdDrawCurve'?4:6,call.kind==='cdDrawLine'?4:call.kind==='cdDrawCurve'?6:8)
const point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0})
const ID={"root":"u6705","headerFile":"../hanja-goal-glyphwiki-batch417-2026-10-09/engine-proof.json","headerFileSHA256":"ad06c8f0ce5d3912935f8393fbdc1ce68f144432a31e5aadf755176612a476fa","traceFile":"../hanja-goal-glyphwiki-batch417-2026-10-09/draw-trace.json","traceFileSHA256":"0fd77624601fcb16a3acd027c23b7ca66863bc8f56d71cc54689ac7d2c2975b6","sourceFile":"../hanja-goal-glyphwiki-batch417-2026-10-09/sources.json","sourceFileSHA256":"3735192b5c96b7f5ab75b3eca113b5612b87da9434a5e702e828a76ae426f152"},PINS={"docs/hanja-goal-glyphwiki-batch417-2026-10-09/engine-proof.json":"ad06c8f0ce5d3912935f8393fbdc1ce68f144432a31e5aadf755176612a476fa","docs/hanja-goal-glyphwiki-batch417-2026-10-09/draw-trace.json":"0fd77624601fcb16a3acd027c23b7ca66863bc8f56d71cc54689ac7d2c2975b6","docs/hanja-goal-glyphwiki-batch417-2026-10-09/sources.json":"3735192b5c96b7f5ab75b3eca113b5612b87da9434a5e702e828a76ae426f152","docs/hanja-goal-glyphwiki-batch417-2026-10-09/review.json":"af79dcecab83d815e97812ec4b879132a88feefc55e4bb36cc96e3852cfa9994","docs/hanja-goal-glyphwiki-batch417-2026-10-09/validation.json":"edaeb96cb0adb96959fe4d59eb336f505c8e714337defb1078b6448626dfc5bf","docs/hanja-goal-glyphwiki-batch417-2026-10-09/metadata.json":"bc5bcfc70718e818b44cf1946f03168b0b531d60f79fc86750eb815cda6e24bf","docs/hanja-goal-glyphwiki-batch417-2026-10-09/NOTICE.md":"81f55c0a2719fddc646fcf51aaef78b2d4cdd600ed354672ade6ebe30a1841b4","docs/hanja-source-independent-hv-two-u995f-source-experiment-2026-10-23/candidate.mjs":"d519739ae185ab4e62e4237efff13fe2a1c962498bc2cac975bf1368ae3f7008"},ORIGINAL_SOURCE_GROUPS=[[3],[5],[4],[0,1],[2],[6],[7,8],[9],[10],[11],[12,13],[14],[15],[16,17]],RAW_COUNT=18,ORIGINAL=[[{"kind":"cdDrawCurve","args":[49.05,96,42.25,123,25.25,167,0,7]}],[{"kind":"cdDrawCurve","args":[15.05,168,39.7,161,73.7,149,0,7]}],[{"kind":"cdDrawCurve","args":[53.3,123,74.55,150,81.35,169,7,8]}],[{"kind":"cdDrawLine","args":[17.6,48,81.35,48,0,0]}],[{"kind":"cdDrawLine","args":[12.5,93,88.15,93,0,0]}],[{"kind":"cdDrawLine","args":[48.2,14,48.2,93,0,32]}],[{"kind":"cdDrawLine","args":[97.9575,24.96,97.9575,80.04,12,313]}],[{"kind":"cdDrawLine","args":[97.9575,24.96,167.2125,24.96,2,2]}],[{"kind":"cdDrawLine","args":[167.2125,24.96,167.2125,80.04,22,123]}],[{"kind":"cdDrawLine","args":[97.9575,51.69,167.2125,51.69,2,2]}],[{"kind":"cdDrawLine","args":[97.9575,80.04,167.2125,80.04,2,2]}],[{"kind":"cdDrawCurve","args":[120.615,82,103.515,116,76.155,139,0,7]}],[{"kind":"cdDrawLine","args":[106.935,105,176.19,105,2,2]}],[{"kind":"cdDrawCurve","args":[176.19,105,177.9,156,166.810454459247,174.43137763006035,22,0]},{"kind":"cdDrawCurve","args":[166.810454459247,174.43137763006035,161.655,183,151.655,183,2,14]}],[{"kind":"cdDrawCurve","args":[135.15,112,127.455,142,106.935,159,0,7]}],[{"kind":"cdDrawCurve","args":[130.01999999999998,126,145.41,134,155.67,150,7,8]}],[{"kind":"cdDrawLine","args":[98.24820000000001,127.44,98.24820000000001,166.38,0,13]}],[{"kind":"cdDrawLine","args":[98.24820000000001,166.38,158.769375,166.38,2,0]}]],TRACE_SHA256="6e6c392094a647e95c47e13f572a1be6ea285fb62a4ccd2ed7e317cc861f2c11",GROUPS_SHA256="2215b95dca0cbc70b742907d58cc42e7bef017110549d74265209c73a8dfa2e2",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[],INDEPENDENT_PENS=[4]
export const sourceRoot='u6705',sourceGroups=structuredClone(ORIGINAL_SOURCE_GROUPS),selectedProofIdentity=Object.freeze({...ID}),nativeApproval=false,runtimeApplied=false
let geometryRuns=0,cachedCalls=0
function validateSelectedProof(trace,proof,identity){
 assert.deepEqual(identity,ID);const config=json('./config.json');assert.deepEqual(config.identity,ID);assert.deepEqual(config.sourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(config.inputSHA256,PINS)
 for(const[p,h]of Object.entries(PINS))assert.equal(sha(read('../'+p.slice(5))),h,p)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups']);assert.deepEqual(proof,json(ID.headerFile));assert.deepEqual(trace,json(ID.traceFile));assert.equal(Object.keys(proof.engineHashes).length,8)
 const sources=json(ID.sourceFile);assert.equal(sources.root,'u6705');assert.equal(sources.glyph,'朅');assert.equal(Object.keys(sources.records).length,5);assert.deepEqual(sources.missing,[]);assert.deepEqual(sources.aliases,[]);assert.equal(sources.providerVersions.length,1);for(const p of sources.providerVersions)assert.equal(sources.records[p.name].data,p.data)
 const closure=new Set;function visit(name){if(closure.has(name))return;closure.add(name);const rec=sources.records[name];assert(rec);for(const row of rec.data.split('$')){const a=row.split(':');if(a[0]==='99')visit(a[7])}}visit('u6705');assert.equal(closure.size,5)
}
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
  const outlines = sourceGroups.map((indices, logicalIndex) => {
    if (INDEPENDENT_PENS.includes(logicalIndex + 1)) return indices.map(raw => compile([raw]))
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

export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(geometryRuns,0);geometryRuns++;const strokes=compileBound(trace,proof,identity);assert.deepEqual([strokes.length,strokes.flat().length,strokes.flat().reduce((n,s)=>n+(s.outline.match(/M/g)||[]).length,0)],[14,15,37]);return strokes}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const fixed=json('./fixtures.json').u6705;assert.deepEqual(fixed.headerProof,proof);assert.deepEqual(fixed.originalTrace,trace);assert.deepEqual(fixed.identity,ID);assert.equal(fixed.sourceGeometryGenerations,1);assert.equal(fixed.engineExecutions,0);assert.deepEqual([fixed.strokes.length,fixed.strokes.flat().length],[14,15]);assert.equal(digest(fixed.strokes),fixed.geometrySHA256);cachedCalls++;return fixed.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1))}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return 0}
export function cachedPositiveCallCount(){return cachedCalls}
