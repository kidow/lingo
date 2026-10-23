import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const read=n=>readFileSync(new URL(n,import.meta.url)),json=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex'),digest=v=>sha(JSON.stringify(v))
const endpoint=call=>call.args.slice(call.kind==='cdDrawLine'?2:call.kind==='cdDrawCurve'?4:6,call.kind==='cdDrawLine'?4:call.kind==='cdDrawCurve'?6:8)
const point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0})
const ID={"root":"u995f","file":"../hanja-goal-glyphwiki-batch701-2026-10-12/engine-proof.json","fileSHA256":"ce533cc6fd25af9b6058423b1efafd878f8e40f682fc614432d92aced651139d"},PINS={"docs/hanja-goal-glyphwiki-batch701-2026-10-12/engine-proof.json":"ce533cc6fd25af9b6058423b1efafd878f8e40f682fc614432d92aced651139d","docs/hanja-source-raw-compare-u995f-2026-10-23/native-review.json":"b2d2ee9e3e9db2d2b13d0eea71c0f614a9faf603d3c00534179a628fbfb01e03","docs/hanja-source-independent-qq-two-u7e58-source-experiment-2026-10-19/candidate.mjs":"598c0f541830e65328badee27bee42dea6f88f052b68cf09b7b273648c3d7b66","docs/hanja-goal-glyphwiki-batch701-2026-10-12/draw-trace.json":"c31c6cada5156e039888fa63642567d3520b99e4d04a4ba51774f6eea919adf7","docs/hanja-goal-glyphwiki-batch701-2026-10-12/metadata.json":"3c8f7b5269232ad09cb0912457a17e42693750d5342c8cb2a80929f6b5a82770","docs/hanja-goal-glyphwiki-batch701-2026-10-12/NOTICE.md":"9741b313acb10d82e28b1794a74fde60042ed4f753588395cfc1bfcf336caeee"},ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[4,5],[6],[7],[3],[8],[9],[10],[11],[12],[13,14],[15],[16],[17,18],[19],[20],[23],[21],[22],[24],[25,26],[27,28],[29],[30]],RAW_COUNT=31,ORIGINAL=[[{"kind":"cdDrawCurve","args":[51.15,15,33.825,58,10.725,86,0,7]}],[{"kind":"cdDrawCurve","args":[47.85,25,68.475,37,77.55,56,7,8]}],[{"kind":"cdDrawLine","args":[34.65,61,69.3,61,0,200]}],[{"kind":"cdDrawLine","args":[29.7,79,29.7,186,12,0]}],[{"kind":"cdDrawLine","args":[29.7,79,68.475,79,2,2]}],[{"kind":"cdDrawLine","args":[68.475,79,68.475,123,22,223]}],[{"kind":"cdDrawLine","args":[29.7,100,68.475,100,0,2]}],[{"kind":"cdDrawLine","args":[28.875,123,68.475,123,2,2]}],[{"kind":"cdDrawLine","args":[29.7,147,79.2,147,2,100]}],[{"kind":"cdDrawLine","args":[29.7,170,80.025,170,2,0]}],[{"kind":"cdDrawLine","args":[135.01749999999998,13.6,135.01749999999998,35.8,0,32]}],[{"kind":"cdDrawLine","args":[80.57712500000001,35.8,189.45787499999997,35.8,0,100]}],[{"kind":"cdDrawLine","args":[96.33654999999999,51.74,96.33654999999999,72.26,12,213]}],[{"kind":"cdDrawLine","args":[96.33654999999999,51.74,125.07845000000002,51.74,2,2]}],[{"kind":"cdDrawLine","args":[125.07845000000002,51.74,125.07845000000002,72.26,1022,323]}],[{"kind":"cdDrawLine","args":[96.33654999999999,72.26,125.07845000000002,72.26,2,2]}],[{"kind":"cdDrawLine","args":[144.41425,51.74,144.41425,72.26,1012,313]}],[{"kind":"cdDrawLine","args":[144.41425,51.74,174.24075,51.74,2,2]}],[{"kind":"cdDrawLine","args":[174.24075,51.74,174.24075,72.26,22,223]}],[{"kind":"cdDrawLine","args":[144.41425,72.26,174.24075,72.26,2,2]}],[{"kind":"cdDrawLine","args":[85.1633,95.59,180.1967,95.59,0,200]}],[{"kind":"cdDrawLine","args":[116.6354,79.83,116.6354,131.05,0,32]}],[{"kind":"cdDrawLine","args":[148.72459999999998,79.83,148.72459999999998,131.05,0,32]}],[{"kind":"cdDrawLine","args":[90.7172,113.32,174.6428,113.32,0,200]}],[{"kind":"cdDrawLine","args":[79.6094,131.05,185.75059999999996,131.05,0,200]}],[{"kind":"cdDrawLine","args":[123.4235,131.6804,132.0629,131.6804,2,2]}],[{"kind":"cdDrawCurve","args":[127.7432,131.6804,112.93279999999999,154.1384,78.3752,167.6132,132,7]}],[{"kind":"cdDrawLine","args":[111.08149999999999,152.6412,111.08149999999999,176.5964,32,32]}],[{"kind":"cdDrawCurve","args":[93.18560000000001,181.08800000000002,121.57220000000001,175.0992,149.9588,167.6132,0,7]}],[{"kind":"cdDrawCurve","args":[172.1744,139.1664,163.535,148.14960000000002,151.193,158.63,0,7]}],[{"kind":"cdDrawCurve","args":[135.14839999999998,130.9318,152.4272,167.6132,180.81380000000001,179.59080000000003,7,0]}]],TRACE_SHA256="2782239a1f1c1cbe4f4df6b281f560ec48440a696d943226039a65c99e12385e",GROUPS_SHA256="5c0189e289f4e5d70c86d29fa59a6430d30eef5999bd6eff4fc618fbccaf80cd",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},FULL_SHA="2cf1f32b88c8a1fa9411547bb9ecbfc2dbbc76ec52ff4501f7b0e780e87949fe"
const UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[],INDEPENDENT_PENS=[23,24]
export const sourceRoot='u995f',sourceGroups=structuredClone(ORIGINAL_SOURCE_GROUPS),selectedProofIdentity=Object.freeze({...ID}),nativeApproval=false,runtimeApplied=false
let geometryRuns=0,cachedCalls=0
function validateSelectedProof(trace,proof,identity){
 assert.deepEqual(identity,ID);const config=json('./config.json');assert.deepEqual(config.identity,ID);assert.deepEqual(config.sourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(config.inputSHA256,PINS)
 for(const[p,h]of Object.entries(PINS))assert.equal(sha(read('../'+p.slice(5))),h,p)
 const captured=json(ID.file);assert.deepEqual(proof,captured);assert.deepEqual(proof.trace,trace);assert.equal(digest(proof),FULL_SHA);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 const mapping=json('../hanja-source-raw-compare-u995f-2026-10-23/native-review.json');assert.equal(mapping.staticNumberedMappingApprovedByROOT,true);assert.deepEqual(mapping.acceptedLogicalRawMapping,ORIGINAL_SOURCE_GROUPS.map(row=>row.map(raw=>raw+1)));assert.equal(mapping.animationNativeApproval,false)
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

export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(geometryRuns,0);geometryRuns++;const strokes=compileBound(trace,proof,identity);assert.deepEqual([strokes.length,strokes.flat().length,strokes.flat().reduce((n,s)=>n+(s.outline.match(/M/g)||[]).length,0)],[26,28,52]);return strokes}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const fixed=json('./fixtures.json').u995f;assert.deepEqual(fixed.fullProof,proof);assert.deepEqual(fixed.identity,ID);assert.equal(fixed.sourceGeometryGenerations,1);assert.equal(fixed.engineExecutions,0);assert.equal(fixed.sourceMappingApproved,true);assert.deepEqual([fixed.strokes.length,fixed.strokes.flat().length],[26,28]);assert.equal(digest(fixed.strokes),fixed.geometrySHA256);cachedCalls++;return fixed.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1))}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return 0}
export function cachedPositiveCallCount(){return cachedCalls}
