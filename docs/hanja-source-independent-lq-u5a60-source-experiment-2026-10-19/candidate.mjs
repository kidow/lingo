export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// 고정원본 전용 source 실험. 새 native/runtime 승인이 아닙니다.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex'),sha=b=>createHash('sha256').update(b).digest('hex'),local=n=>new URL(n,import.meta.url),json=n=>JSON.parse(readFileSync(local(n),'utf8')),round=x=>Math.round(x*1e6)/1e6
const point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0}),endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8)
const T=json('./config.json').targets["u5a60"],FIXED_PINS={"../hanja-goal-glyphwiki-batch747-2026-10-12/NOTICE.md":"f8448511b8bbffc543f4fbc8415006efc723dd2cd119f85eadbab2936beefb8c","../hanja-goal-glyphwiki-batch747-2026-10-12/README.md":"8ebdce6fa64c07c3174c7c1b39895d13b7bbac1992c481a55377b593659cfc3a","../hanja-goal-glyphwiki-batch747-2026-10-12/draw-trace.json":"ee2fdfb9e930958ae8250111ede21a1cb4993afcc31bcbb3ddca62ec03fc78e5","../hanja-goal-glyphwiki-batch747-2026-10-12/engine-proof.json":"3010d0b74575e1985a61b45a25ba7cfb88d305a2a2007582a4f70558cfbb0d7c","../hanja-goal-glyphwiki-batch747-2026-10-12/engine-whole-u5a60-t.json":"8e5e29c8dc51973da926f442c0ac6c62e946a32db4fee425a7ee111e3de8c818","../hanja-goal-glyphwiki-batch747-2026-10-12/engine-whole-u5a60.json":"3974f1a87ee7bee0d081ff1255bc2b9b2996ae50025c4cfa244efa10472d8044","../hanja-goal-glyphwiki-batch747-2026-10-12/metadata.json":"62b484cb290a301e8a7be84a384617934ea92b753908f6a72a903870b2348ce1","../hanja-goal-glyphwiki-batch747-2026-10-12/resume.json":"98f74dd7309116ed97db3ca79553ba1b1ea4a1c4edbdf9e4808536721adb7fd9","../hanja-goal-glyphwiki-batch747-2026-10-12/review.json":"4540b98e55bb2bb5733d2cb9ad58cfa5bf767a72750cc52109fb3562e42dc0a5","../hanja-goal-glyphwiki-batch747-2026-10-12/serve-memory.py":"9f932da88635b1f855ae78a06a027e74e07e2e231d1f0e377612db50daa6d931","../hanja-goal-glyphwiki-batch747-2026-10-12/sources.json":"e2587f231791be6c91d5ef7522af91992f39bc9eef91ad507911a82142a314ef","../hanja-goal-glyphwiki-batch747-2026-10-12/validation.json":"cb36345271c7b055b77b64f2d4e472fa53b91a43db576a16f1b22c6cac241a14","../hanja-goal-glyphwiki-batch747-2026-10-12/verify-source.mjs":"f16f2a16b349509f3a006ad42827cdae5d3dbcfd2c3ae4279882d3e04b437175","../hanja-goal-glyphwiki-batch747-2026-10-12/whole-variant-inventory.json":"44045c40033dc8de859063c5c485d865871883b0e5d2eaee2f76fde82d1bd879","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u5a60","file":"../hanja-goal-glyphwiki-batch747-2026-10-12/engine-proof.json","fileSHA256":"3010d0b74575e1985a61b45a25ba7cfb88d305a2a2007582a4f70558cfbb0d7c"},FIXED_PROOF_SHA="23d3ccf56d821469771f56997885f14c1574ecdaade52c8d072ee0d0c7f70bd3",FIXED_BASELINE_SHA="d78450e79f26281abc67d89f6f66168332baa8d2c73db4aea44c4785afd9f653"
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6,7],[8],[9,10],[11],[12,13],[14]],RAW_COUNT=15,ORIGINAL=[[{"kind":"cdDrawLine","args":[46.2,16,24.1,135,0,0]}],[{"kind":"cdDrawCurve","args":[25.8,118,58.1,129,74.25,156,7,8]}],[{"kind":"cdDrawCurve","args":[69.15,61,58.95,153,9.65,188,22,7]}],[{"kind":"cdDrawLine","args":[14.75,61,69.15,61,0,2]}],[{"kind":"cdDrawLine","args":[134.375,16.34,134.375,41.45,0,32]}],[{"kind":"cdDrawCurve","args":[93.44075000000001,31.244,94.03399999999999,58.217,84.54199999999999,66.965,7,8]}],[{"kind":"cdDrawLine","args":[94.03399999999999,42.179,179.46200000000002,42.179,0,2]}],[{"kind":"cdDrawCurve","args":[179.46200000000002,42.179,175.9025,50.927,167.59699999999998,65.507,22,7]}],[{"kind":"cdDrawLine","args":[106.55,76,106.55,173,12,113]}],[{"kind":"cdDrawLine","args":[106.55,76,162.2,76,2,2]}],[{"kind":"cdDrawLine","args":[162.2,76,162.2,108,22,123]}],[{"kind":"cdDrawLine","args":[106.55,108,162.2,108,2,2]}],[{"kind":"cdDrawLine","args":[106.55,135,169.55,135,2,2]}],[{"kind":"cdDrawLine","args":[169.55,135,169.55,173,22,123]}],[{"kind":"cdDrawLine","args":[106.55,173,169.55,173,2,2]}]],TRACE_SHA256="3c89eae934c5e4d4da6ebfd145a586de2ee8e4931cdab2c48dd7f312876ce1a2",GROUPS_SHA256="e2d2260ce241cff933e3649f8d30e4937ea2c1d29f9dda41790461ccba90c029",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot="u5a60",sourceGroups=[[0,1],[2],[3],[4],[5],[6,7],[8],[9,10],[11],[12,13],[14]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){
 assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,[[0,1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11]]);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);
 assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);
 assert.deepEqual(proof,json(identity.file));assert.deepEqual(proof.trace,json('../hanja-goal-glyphwiki-batch747-2026-10-12/draw-trace.json'));assert.equal(T.archiveFull5,true);assert.equal(T.newFull5Combination,false);
 const s=json('../hanja-goal-glyphwiki-batch747-2026-10-12/sources.json');assert.equal(s.root,"u5a60");assert.equal(s.glyph,"婠");assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.deepEqual(s.providerVersions,[{"name":"u5b98-t@1","version":"1","apiUrl":"https://glyphwiki.org/api/glyph?name=u5b98-t%401","responseIdentity":{"name":"u5b98-t","version":"1","related":"U+5B98","data":"99:0:0:0:0:200:187:u5b80-t03@2:0:0:0$99:0:0:20:45:190:197:u200a4-itaji-001@4:0:0:0"},"sha256":"049ae0e2f824a4ffafaa432ee1f353f24b1304aba2313004eb0ea2eb8eede86d"},{"name":"u5b80-t03@2","version":"2","apiUrl":"https://glyphwiki.org/api/glyph?name=u5b80-t03%402","responseIdentity":{"name":"u5b80-t03","version":"2","related":"U+5B80","data":"2:7:8:82:12:100:21:108:41$99:0:0:0:18:200:198:u5196-03@4"},"sha256":"a0b02a20d31f2d2bd4e6b71612da3d1381c6f102cb3e1f268feffa6168ad489a"},{"name":"u5196-03@4","version":"4","apiUrl":"https://glyphwiki.org/api/glyph?name=u5196-03%404","responseIdentity":{"name":"u5196-03","version":"4","related":"U+5196","data":"2:7:8:31:16:32:53:16:65$1:0:2:32:31:176:31$2:22:7:176:31:170:43:156:63"},"sha256":"4d9da60829a7679ee280b01dfdd7532e90b6c9b8d2be61782bf48b986616d275"},{"name":"u200a4-itaji-001@4","version":"4","apiUrl":"https://glyphwiki.org/api/glyph?name=u200a4-itaji-001%404","responseIdentity":{"name":"u200a4-itaji-001","version":"4","related":"U+3013","data":"99:0:0:0:0:200:200:u200a4-itaiji-001@2"},"sha256":"809d67144e29364fb28333ca1d9e9039ba3d41f9643d6842fb70124a7ed9f653"},{"name":"u200a4-itaiji-001@2","version":"2","apiUrl":"https://glyphwiki.org/api/glyph?name=u200a4-itaiji-001%402","responseIdentity":{"name":"u200a4-itaiji-001","version":"2","related":"U+200A4","data":"1:12:13:42:29:42:163$1:2:2:42:29:139:29$1:22:24:139:29:139:74$1:2:2:42:74:139:74$1:2:2:42:109:155:109$1:22:24:155:109:155:163$1:2:2:42:163:155:163"},"sha256":"b1198aeae0509374ae0f420a5c0ed95cdb7c6fd8ce3bd9225a5c3b4672b269ac"}]);assert.deepEqual(Object.keys(s.records).sort(),["u200a4-itaiji-001@2","u200a4-itaji-001@4","u5196-03","u5196-03@4","u5973-01","u5973-t01","u5a60","u5a60-t","u5b80-03","u5b80-t03@2","u5b98-02","u5b98-t@1"]);
 const closure=[];function visit(n){assert(s.records[n]);if(closure.includes(n))return;closure.push(n);const data=s.records[n].data;if(data.startsWith('[[')&&data.endsWith(']]'))visit(data.slice(2,-2));else for(const row of data.split('$'))if(row.startsWith('99:'))visit(row.split(':')[7])}visit(sourceRoot);assert.deepEqual(closure,["u5a60","u5973-01","u5b98-02","u5b80-03","u5196-03"]);assert.deepEqual(T.sourceFamily.selectedRootClosure,closure);
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
export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(geometryRuns,0);const rawBaseline=generateGeometry(trace,proof,identity);assert.equal(rawBaseline.length,12);assert.notDeepEqual(endpoint(trace[0][0]),trace[1][0].args.slice(0,2));const baseline=[[0,1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11]].map(indices=>indices.flatMap(i=>rawBaseline[i]));geometryRuns++;return{rawBaseline,baseline}}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const f=json('./fixtures.json')["u5a60"];assert.equal(digest(f.fullProof),FIXED_PROOF_SHA);assert.equal(digest(f.baseline),FIXED_BASELINE_SHA);assert.deepEqual(f.strokes,f.baseline);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return 0}
export function cachedPositiveCallCount(){return cachedCalls}
