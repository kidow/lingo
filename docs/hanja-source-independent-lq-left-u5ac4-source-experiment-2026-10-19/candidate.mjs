export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// 고정원본 전용 source 실험. 새 native/runtime 승인이 아닙니다.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex'),sha=b=>createHash('sha256').update(b).digest('hex'),local=n=>new URL(n,import.meta.url),json=n=>JSON.parse(readFileSync(local(n),'utf8')),round=x=>Math.round(x*1e6)/1e6
const point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0}),endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8)
const T=json('./config.json').targets["u5ac4"],FIXED_PINS={"../hanja-goal-glyphwiki-batch767-2026-10-13/NOTICE.md":"641d1477fdd089bbd65bebb1e2a791b277af04280a7f8adbc21f68425bfa5c10","../hanja-goal-glyphwiki-batch767-2026-10-13/README.md":"ab2712a36ec4ecb7fc9d01f4fe3e65ec7349bbe50a7586fa23bd7c3713a0d269","../hanja-goal-glyphwiki-batch767-2026-10-13/draw-trace.json":"22ba2157095ec94fbe30a4f0e6d74520c1dd30d48d9045a4bbd737dd998dc028","../hanja-goal-glyphwiki-batch767-2026-10-13/engine-proof.json":"d74e7d73f801a6ef59532fb1631b7525b90081614ca690eeee45e1785a3ef825","../hanja-goal-glyphwiki-batch767-2026-10-13/engine-whole-u5ac4-itaiji-001.json":"844256d9cfff63796c2b073ea634773b850280db71e6f0c525481e8639672929","../hanja-goal-glyphwiki-batch767-2026-10-13/engine-whole-u5ac4-k.json":"64b3819f75b5a598270d4da1e73f0124a1ddaff508aa9352307250942c9a0895","../hanja-goal-glyphwiki-batch767-2026-10-13/engine-whole-u5ac4-ue0100.json":"64b3819f75b5a598270d4da1e73f0124a1ddaff508aa9352307250942c9a0895","../hanja-goal-glyphwiki-batch767-2026-10-13/engine-whole-u5ac4.json":"64b3819f75b5a598270d4da1e73f0124a1ddaff508aa9352307250942c9a0895","../hanja-goal-glyphwiki-batch767-2026-10-13/metadata.json":"740c4d30a2eaf8946943deb3628d87bc1e4f7075e4cdf04049569bd4101bfccf","../hanja-goal-glyphwiki-batch767-2026-10-13/resume.json":"69591a5163911de1290ebc7db977af404736f669f1dda1b396217345b549f337","../hanja-goal-glyphwiki-batch767-2026-10-13/review.json":"8428d86d7a0654cf6c0ada34351679f0487014ad5f2a4ade8289fa288ad46fcf","../hanja-goal-glyphwiki-batch767-2026-10-13/serve-memory.py":"1a279c91e8d899e61174dd0903c52121f107bc1839fe395c2d3ec1daa4742141","../hanja-goal-glyphwiki-batch767-2026-10-13/source-analysis.json":"6bcf4d5069096f3a58f625c401efe6ab7bf7ab568acf45d32052cb08f2037ae6","../hanja-goal-glyphwiki-batch767-2026-10-13/source-join-analysis.json":"b5f741083521c777f70825bc43422507879d0edba76c8a33249912011272f28f","../hanja-goal-glyphwiki-batch767-2026-10-13/sources.json":"eed2b618c55b81f04bf50ca249fe9e9e27dcfc9e1b9134ddb5ca4e334424e001","../hanja-goal-glyphwiki-batch767-2026-10-13/validation.json":"b0e51c1f5bbac0f4b4ed4973a1044d0bda9778951fb75520350af62df48766fd","../hanja-goal-glyphwiki-batch767-2026-10-13/verify-source.mjs":"734d99989545790099e4d1e1c8071e35b7c659003a8e74109e20dfb5a1c8218e","../hanja-goal-glyphwiki-batch767-2026-10-13/whole-variant-inventory.json":"c345b2f673500d67a73968a42664c46022b98ccc0020e5a07d5895f29e7d6ccf","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47","../hanja-terminal-tail-left-source-experiment-2026-10-18/tail-candidate.mjs":"abd4e5011d011e463e52069248b9d73831df9d7f4ee79361b22194c9f9721de5","../hanja-goal-glyphwiki-batch997-2026-10-13/progressive.mjs":"25b9a23cdf644798a7336df3f78b72ecc3c4ad10d0fbe860b403a38911e514f6"},EXPECTED_IDENTITY={"root":"u5ac4","file":"../hanja-goal-glyphwiki-batch767-2026-10-13/engine-proof.json","fileSHA256":"d74e7d73f801a6ef59532fb1631b7525b90081614ca690eeee45e1785a3ef825"},FIXED_PROOF_SHA="046cb52a26483bcff6b096d2fa872c207d36bb167a6a97c694b21e98b1fc6572",FIXED_BASELINE_SHA="a8e0ac8de0ca92e7cba32c768725ca855f61713c0a14fb036f44a334e5deb5cb",FIXED_DERIVED_SHA="86a1256c7af0d8a5843b698eb335b55e73df766df23f7ea8581b6e99f420b7a1",TAIL_SPEC={"pens":13,"masks":14,"polygons":28,"pen":11,"rawIndices":[12],"tailDirection":"left","sourceGroups":[[0,1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13],[14]],"exactCalls":[{"kind":"cdDrawLine","args":[143.3,117,143.3,173,32,1]},{"kind":"cdDrawCurve","args":[143.3,173,143.3,183,133.3,183,1,14]}]}
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13],[14]],RAW_COUNT=15,ORIGINAL=[[{"kind":"cdDrawLine","args":[49.94,16,27.97,135,0,0]}],[{"kind":"cdDrawCurve","args":[29.66,118,61.77,129,77.825,156,7,8]}],[{"kind":"cdDrawCurve","args":[72.755,61,62.615,153,13.605,188,22,7]}],[{"kind":"cdDrawLine","args":[18.675,61,72.755,61,0,2]}],[{"kind":"cdDrawLine","args":[93.95,30,187.4,30,2,0]}],[{"kind":"cdDrawLine","args":[93.95,30,93.95,92,1012,1]},{"kind":"cdDrawCurve","args":[93.95,92,93.95,157,74,185,1001,7]}],[{"kind":"cdDrawCurve","args":[144.35,30,140.15,45,133.85,59,132,7]}],[{"kind":"cdDrawLine","args":[116,59,116,117,1012,213]}],[{"kind":"cdDrawLine","args":[116,59,172.7,59,2,2]}],[{"kind":"cdDrawLine","args":[172.7,59,172.7,117,22,223]}],[{"kind":"cdDrawLine","args":[116,87,172.7,87,2,2]}],[{"kind":"cdDrawLine","args":[116,117,172.7,117,2,2]}],[{"kind":"cdDrawLine","args":[143.3,117,143.3,173,32,1]},{"kind":"cdDrawCurve","args":[143.3,173,143.3,183,133.3,183,1,14]}],[{"kind":"cdDrawCurve","args":[118.1,136,111.8,161,93.95,183,0,7]}],[{"kind":"cdDrawCurve","args":[159.05,133,176.9,154,182.15,176,7,8]}]],TRACE_SHA256="6e6f3d29f41e83a56aa4ef85245d9a69b2a8e8174d106198a555e72264e6aa93",GROUPS_SHA256="43941db8914ea0d2809e2f2574f10c9e416dc9621fce19621b0a174bf51bbe58",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot="u5ac4",sourceGroups=[[0,1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13],[14]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){
 assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,[[0,1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13]]);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_DERIVED_SHA);assert.deepEqual(T.tailSpec,TAIL_SPEC);
 assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);
 assert.deepEqual(proof,json(identity.file));assert.deepEqual(proof.trace,json('../hanja-goal-glyphwiki-batch767-2026-10-13/draw-trace.json'));assert.equal(T.archiveFull5,true);assert.equal(T.newFull5Combination,false);
 const s=json('../hanja-goal-glyphwiki-batch767-2026-10-13/sources.json');assert.equal(s.root,"u5ac4");assert.equal(s.glyph,"嫄");assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.deepEqual(s.providerVersions,[{"name":"u539f-02-itaiji-001@1","version":"1","apiUrl":"https://glyphwiki.org/api/glyph?name=u539f-02-itaiji-001%401","responseIdentity":{"related":"U+539F","name":"u539f-02-itaiji-001","version":"1","data":"99:0:0:0:0:200:200:u5382-02$99:0:0:10:39:198:198:u5143-02-var-001@1"},"sha256":"eeedbb2f39cad6bcdc68d3744b4fa35204be78d9e81504afbc4a11a11825bc10"},{"name":"u5143-02-var-001@1","version":"1","apiUrl":"https://glyphwiki.org/api/glyph?name=u5143-02-var-001%401","responseIdentity":{"data":"1:0:0:105:28:177:28$1:0:0:99:77:186:77$2:32:7:129:77:127:164:80:187$3:32:5:151:77:151:174:183:174","name":"u5143-02-var-001","related":"U+5143","version":"1"},"sha256":"c5acd3f6e99ec559a6e4e5f6152839d05e82d7f2e34d76ede957012c3dfe6f93"}]);assert.deepEqual(Object.keys(s.records).sort(),["u5143-02-var-001@1","u5382-02","u539f-02","u539f-02-itaiji-001@1","u5973-01","u5973-g01","u5ac4","u5ac4-itaiji-001","u5ac4-k","u5ac4-ue0100"]);
 const closure=[];function visit(n){assert(s.records[n]);if(closure.includes(n))return;closure.push(n);const data=s.records[n].data;if(data.startsWith('[[')&&data.endsWith(']]'))visit(data.slice(2,-2));else for(const row of data.split('$'))if(row.startsWith('99:'))visit(row.split(':')[7])}visit(sourceRoot);assert.deepEqual(closure,["u5ac4","u5973-01","u539f-02"]);assert.deepEqual(T.sourceFamily.selectedRootClosure,closure);
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
function existingTail(t,proof){const trace=proof.trace;
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
  return t.tailDirection==='up'?terminalUpTail(t.rawIndices):terminalLeftTail(t.rawIndices)
}
function eligible(t,proof){assert.deepEqual(t.sourceGroups[t.pen-1],t.rawIndices);const calls=t.rawIndices.flatMap(i=>proof.trace[i]);assert.deepEqual(calls.map(c=>({kind:c.kind,args:c.args})),t.exactCalls);assert(calls.length>0);for(const c of calls)for(const p of c.polygons){assert(p.length>=3);assert(p.every(q=>q.off===0&&Number.isFinite(q.x)&&Number.isFinite(q.y)))}return existingTail(t,proof)}
const bounds=polys=>{const a=polys.flat();assert(a.length);return[Math.min(...a.map(q=>q.x/2)),Math.min(...a.map(q=>q.y/2)),Math.max(...a.map(q=>q.x/2)),Math.max(...a.map(q=>q.y/2))]}
function derive(t,baseline,proof,tail){assert.equal(baseline.length,t.pens);assert.equal(baseline.flat().length,t.masks);const old=baseline[t.pen-1];assert.equal(old.length,1);const body=old[0],calls=t.rawIndices.flatMap(i=>proof.trace[i]),polygons=calls.flatMap(c=>c.polygons),sourceTail=polygons.at(-1),chunks=body.outline.match(/M[^Z]* Z/g);assert.equal(chunks.length,polygons.length);assert.deepEqual(sourceTail,tail.polygon);assert.deepEqual(body.bounds,bounds(polygons));assert.equal(body.direction,'curve');assert.equal(body.revealWidth,14);const kept=polygons.slice(0,-1),withoutTail={...body,outline:chunks.slice(0,-1).join(' '),bounds:bounds(kept)},terminal={outline:chunks.at(-1),bounds:bounds([sourceTail]),direction:tail.direction,weight:round(tail.jump/2)};assert.equal(withoutTail.revealPath,body.revealPath);assert.equal(withoutTail.revealWidth,body.revealWidth);assert.equal(withoutTail.weight,body.weight);assert(terminal.weight>0);assert.equal(withoutTail.outline+' '+terminal.outline,body.outline);const out=baseline.slice();out[t.pen-1]=[withoutTail,terminal];for(let i=0;i<out.length;i++)if(i!==t.pen-1)assert.equal(out[i],baseline[i]);assert.equal(out.flat().length,t.masks+1);assert.equal(out.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),t.polygons);return out}



let geometryRuns=0,deriveRuns=0,cachedCalls=0
export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(geometryRuns,0);const rawBaseline=generateGeometry(trace,proof,identity);assert.equal(rawBaseline.length,14);assert.notDeepEqual(endpoint(trace[0][0]),trace[1][0].args.slice(0,2));const baseline=[[0,1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13]].map(indices=>indices.flatMap(i=>rawBaseline[i]));geometryRuns++;return{rawBaseline,baseline}}
export function deriveTail(...args){assert.equal(args.length,4);const[baseline,trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(digest(baseline),FIXED_BASELINE_SHA);assert.equal(deriveRuns,0);const tail=eligible(TAIL_SPEC,proof),out=derive(TAIL_SPEC,baseline,proof,tail);assert.deepEqual(baseline[10][0].bounds,[56.65,57.5,74.65,94.5]);assert.deepEqual(out[10][0].bounds,[66.65,57.5,74.65,94.5]);assert.equal(out[10][1].weight,10);deriveRuns++;return out}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const f=json('./fixtures.json')["u5ac4"];assert.equal(digest(f.fullProof),FIXED_PROOF_SHA);assert.equal(digest(f.baseline),FIXED_BASELINE_SHA);assert.equal(digest(f.strokes),FIXED_DERIVED_SHA);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return deriveRuns}
export function cachedPositiveCallCount(){return cachedCalls}
