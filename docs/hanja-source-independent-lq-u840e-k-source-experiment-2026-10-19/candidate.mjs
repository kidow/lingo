export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// 고정원본 전용 source 실험. 새 native/runtime 승인이 아닙니다.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex'),sha=b=>createHash('sha256').update(b).digest('hex'),local=n=>new URL(n,import.meta.url),json=n=>JSON.parse(readFileSync(local(n),'utf8')),round=x=>Math.round(x*1e6)/1e6
const point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0}),endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8)
const T=json('./config.json').targets["u840e-k"],FIXED_PINS={"../hanja-goal-glyphwiki-batch770-2026-10-13/NOTICE.md":"309871726318e347d2ec10c74df16d2b826531a5ca59c5a3e427a513c053b107","../hanja-goal-glyphwiki-batch770-2026-10-13/README.md":"ba058e42f49a2b50e16583e520ab31830d6bdbded856603a7d1d73a6eadeba5b","../hanja-goal-glyphwiki-batch770-2026-10-13/draw-trace.json":"c8030da53f8f0c6b4425d013d87849a415bab95ab60a7ff374a36fa86650554d","../hanja-goal-glyphwiki-batch770-2026-10-13/engine-proof.json":"dc233862a5082c07d0d1a56fa5e47ca53ed3689d8e4201f793d80115152269db","../hanja-goal-glyphwiki-batch770-2026-10-13/engine-whole-u840e-k.json":"88f9110039316a705b21e6ae53a90930f26b30d32f2a7d98aac4f3795825f18f","../hanja-goal-glyphwiki-batch770-2026-10-13/engine-whole-u840e-ue0100.json":"3e60299171ef5a54ac7d53a42a3cbcdca704aaee3337ca69def93e79364f0ce0","../hanja-goal-glyphwiki-batch770-2026-10-13/engine-whole-u840e-ue0101.json":"3e60299171ef5a54ac7d53a42a3cbcdca704aaee3337ca69def93e79364f0ce0","../hanja-goal-glyphwiki-batch770-2026-10-13/engine-whole-u840e-ue0102.json":"88f9110039316a705b21e6ae53a90930f26b30d32f2a7d98aac4f3795825f18f","../hanja-goal-glyphwiki-batch770-2026-10-13/engine-whole-u840e.json":"a11db08b88635c459c8cb870b1127b71ebe13191c93f94a08778aba600c14516","../hanja-goal-glyphwiki-batch770-2026-10-13/metadata.json":"d7f7f0ac5ca6da68357ff9284b9794f5614813998e495c5ada321258a40f5ad0","../hanja-goal-glyphwiki-batch770-2026-10-13/resume.json":"698bbb109135da8804756de98174555a7d98962ac877f7c1a5a72c8b0f2e289e","../hanja-goal-glyphwiki-batch770-2026-10-13/review.json":"7cf80997dba1027f423bdac32b4891295133fee3c2f812bfd71b5e0d803d147e","../hanja-goal-glyphwiki-batch770-2026-10-13/serve-memory.py":"02dbda38eea26a8a5c1eb7857804827f2a72ec15bd3fb05bc20363347e809a35","../hanja-goal-glyphwiki-batch770-2026-10-13/source-analysis.json":"e4279a59ed971f34da573cff1d3e6795917a8fde0e512e797ea9d1b26b8e3f33","../hanja-goal-glyphwiki-batch770-2026-10-13/source-join-analysis.json":"c2a046c603138d943cff1232c6c9a6147e0ea6b802387d28d17bfbce1e3f4019","../hanja-goal-glyphwiki-batch770-2026-10-13/sources.json":"787ace2d325edc710fc5e7d9be798b94624d079450091f88f95a67dda6da2719","../hanja-goal-glyphwiki-batch770-2026-10-13/validation.json":"88705e16eb7a6a70ecfa65b867c87f631e1e273de13182daff0ee043d97cb634","../hanja-goal-glyphwiki-batch770-2026-10-13/verify-source.mjs":"5cd0ffcd506458da236c1d7b80d0c2c845a3345a7833a64a392329d333f69044","../hanja-goal-glyphwiki-batch770-2026-10-13/whole-variant-inventory.json":"bd689abe2af8871aa666631e67e6bed0cf8ce9d3cc28f5d44fdfcf63d3c10c4b","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u840e-k","headerFile":"../hanja-goal-glyphwiki-batch770-2026-10-13/engine-proof.json","headerFileSHA256":"dc233862a5082c07d0d1a56fa5e47ca53ed3689d8e4201f793d80115152269db","wholeFile":"../hanja-goal-glyphwiki-batch770-2026-10-13/engine-whole-u840e-k.json","wholeFileSHA256":"88f9110039316a705b21e6ae53a90930f26b30d32f2a7d98aac4f3795825f18f","sourceFile":"../hanja-goal-glyphwiki-batch770-2026-10-13/sources.json","sourceFileSHA256":"787ace2d325edc710fc5e7d9be798b94624d079450091f88f95a67dda6da2719"},FIXED_PROOF_SHA="a01e71eedd3014997f5dbc2c73714b691f15c94c870770e9e47fe0932df8d281",FIXED_BASELINE_SHA="9aff49b1888e058a3a13e158756124273cfd4e8304045a0649cc6327b7134fd7"
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12]],RAW_COUNT=13,ORIGINAL=[[{"kind":"cdDrawLine","args":[13,31.665,94,31.665,0,0]}],[{"kind":"cdDrawLine","args":[64,12.555,64,50.04,0,300]}],[{"kind":"cdDrawLine","args":[136,12.555,136,50.04,0,300]}],[{"kind":"cdDrawLine","args":[106,31.665,187,31.665,0,0]}],[{"kind":"cdDrawCurve","args":[146.9232,53.33599999999999,104.9904,61.855999999999995,34.104,66.968,0,7]}],[{"kind":"cdDrawLine","args":[21.1248,83.156,180.86880000000002,83.156,0,0]}],[{"kind":"cdDrawLine","args":[99.9984,61.855999999999995,99.9984,124.052,32,0]}],[{"kind":"cdDrawCurve","args":[93.0096,83.156,65.05440000000002,109.568,17.1312,124.052,132,7]}],[{"kind":"cdDrawCurve","args":[104.9904,83.156,142.9296,110.42,175.8768,117.236,7,0]}],[{"kind":"cdDrawLine","args":[88.44,125.09199999999998,57.72,166.952,0,300]}],[{"kind":"cdDrawCurve","args":[67.32,158.57999999999998,125.88,164.37600000000003,161.4,184.34,7,8]}],[{"kind":"cdDrawCurve","args":[128.76,137.972,126.84,177.9,24.12,185.628,132,7]}],[{"kind":"cdDrawLine","args":[16.439999999999998,137.972,181.56,137.972,0,0]}]],TRACE_SHA256="a65fe0aa60caeab9fb1e0dc4404d4f5035c455f6cfff76f88604c0bfa96feedf",GROUPS_SHA256="9c3ee34e6a43f5065a7360b40701fb51133ac41fe3d45072bd74e1ff0d78b6db",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot="u840e-k",sourceGroups=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10],[11],[12]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){
 assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10],[11],[12]]);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);
 assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);
 const header=json(identity.headerFile),body=json(identity.wholeFile);assert.deepEqual(Object.keys(body).sort(),['defaults','groups','trace']);assert.deepEqual(proof,{engineRevision:header.engineRevision,engineHashes:header.engineHashes,groups:body.groups,trace:body.trace,defaults:body.defaults});assert.equal(T.archiveFull5,false);assert.equal(T.newFull5Combination,true);
 const s=json('../hanja-goal-glyphwiki-batch770-2026-10-13/sources.json');assert.equal(s.root,"u840e");assert.equal(s.glyph,"萎");assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.deepEqual(s.providerVersions,[]);assert.deepEqual(Object.keys(s.records).sort(),["koseki-351650","u5973-04","u59d4","u79be-03","u8279-03","u8279-k03","u840e","u840e-k","u840e-ue0100","u840e-ue0101","u840e-ue0102"]);
 const closure=[];function visit(n){assert(s.records[n]);if(closure.includes(n))return;closure.push(n);const data=s.records[n].data;if(data.startsWith('[[')&&data.endsWith(']]'))visit(data.slice(2,-2));else for(const row of data.split('$'))if(row.startsWith('99:'))visit(row.split(':')[7])}visit(sourceRoot);assert.deepEqual(closure,["u840e-k","koseki-351650","u8279-k03","u59d4","u79be-03","u5973-04"]);assert.deepEqual(T.sourceFamily.selectedRootClosure,closure);
}
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
export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(geometryRuns,0);const rawBaseline=generateGeometry(trace,proof,identity);assert.equal(rawBaseline.length,13);assert.notDeepEqual(endpoint(trace[9][0]),trace[10][0].args.slice(0,2));const baseline=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10],[11],[12]].map(indices=>indices.flatMap(i=>rawBaseline[i]));geometryRuns++;return{rawBaseline,baseline}}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const f=json('./fixtures.json')["u840e-k"];assert.equal(digest(f.fullProof),FIXED_PROOF_SHA);assert.equal(digest(f.baseline),FIXED_BASELINE_SHA);assert.deepEqual(f.strokes,f.baseline);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return 0}
export function cachedPositiveCallCount(){return cachedCalls}
