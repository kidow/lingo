export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// 고정원본 전용 source 실험. 새 native/runtime 승인이 아닙니다.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const digest=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex'),sha=b=>createHash('sha256').update(b).digest('hex'),local=n=>new URL(n,import.meta.url),json=n=>JSON.parse(readFileSync(local(n),'utf8')),round=x=>Math.round(x*1e6)/1e6
const point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0}),endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8)
const T=json('./config.json').targets["u73eb"],FIXED_PINS={"../hanja-goal-glyphwiki-batch942-2026-10-13/NOTICE.md":"17563cfeea8ed6d1ed2d3dff46a64d9e65005bd66a31f2639a4cbd981925fbab","../hanja-goal-glyphwiki-batch942-2026-10-13/README.md":"9602d3f4847160a63fcdbd2164cb2a920c477f1b038677382e27402f9e7c1244","../hanja-goal-glyphwiki-batch942-2026-10-13/candidate-compile-analysis.json":"4584247d1fe961c00d199944b1d7d993e9b05d2b2e5ddc85b6b9b712d9e63b68","../hanja-goal-glyphwiki-batch942-2026-10-13/engine-proof.json":"80aa9ca757b39af99f49a15e33364e6c4a2affd858e0111db4bf275656d9ae8a","../hanja-goal-glyphwiki-batch942-2026-10-13/engine-whole-u73eb-g.json":"5e587505023c99d82b71595628e1a081f23bce2a6231ab3b680c2fd3d394b326","../hanja-goal-glyphwiki-batch942-2026-10-13/engine-whole-u73eb.json":"80aa9ca757b39af99f49a15e33364e6c4a2affd858e0111db4bf275656d9ae8a","../hanja-goal-glyphwiki-batch942-2026-10-13/metadata.json":"2b688fb38d2fc9f06172fcd65161121b4f42b589d0e5ceed8ce9d5b40121f79f","../hanja-goal-glyphwiki-batch942-2026-10-13/native-hold.json":"cfd72cc1fb20b96f6e0943b16f7274f56306c38d05a28f2aff9e217710efd853","../hanja-goal-glyphwiki-batch942-2026-10-13/native-server-compile.mjs":"ddd0cb2331ccb0c1c8c8f1c9a8c6e72920c8435166a4b277a0e78f84d65a75f1","../hanja-goal-glyphwiki-batch942-2026-10-13/native-server-source-audit.json":"07576fb35cba6df7a9b9ee9dd5e7a88a7e1f997f9a6d20d6896f97715d123be4","../hanja-goal-glyphwiki-batch942-2026-10-13/native-server-validation.json":"383dc1502cfd2e0ed62b80623715437798130dee003f36502eba253fdb61cb08","../hanja-goal-glyphwiki-batch942-2026-10-13/progressive.mjs":"30b4ea8bf3ca2f1174f1712789d376da3d8a3d2e5b4fb47519de04d586807113","../hanja-goal-glyphwiki-batch942-2026-10-13/resume.json":"8fbd5fbbe45667d8853ff78c0a5083fd6f8d1d336643bc322130f02bb4d35e42","../hanja-goal-glyphwiki-batch942-2026-10-13/serve-native.py":"6a714d256da6c69d9d81c709a4f88797285008115e418ad3eeded066ca488b4b","../hanja-goal-glyphwiki-batch942-2026-10-13/source-analysis.json":"a67bdf10351be291444411ee840304bb1d471ad34835cb95dcbc97abf16c604d","../hanja-goal-glyphwiki-batch942-2026-10-13/source-join-analysis.json":"56d856607eb9d3b78c90a37ef5eaba49962731f4f0ca59c4eaf86c2f6dbb7e75","../hanja-goal-glyphwiki-batch942-2026-10-13/source-preservation-audit.json":"258ac4e8a226bfd6451a10d3c05bebf9f07436d1a506ce407677c0aa8bb677c9","../hanja-goal-glyphwiki-batch942-2026-10-13/sources.json":"15275939bc9ca1ead0faf89985ce2583ce73cfc6e257e7273dde1e62868a102a","../hanja-goal-glyphwiki-batch942-2026-10-13/validation.json":"5d1c2b483dd22a3bafce144070718c434f775793b25833fc8ebb63caf6755d30","../hanja-goal-glyphwiki-batch942-2026-10-13/verify-source.mjs":"b07c1ddabc54cb35c7dd9668aa7982d7971d1da503ab6cc299309691e111d487","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47","../hanja-terminal-tail-left-source-experiment-2026-10-18/tail-candidate.mjs":"abd4e5011d011e463e52069248b9d73831df9d7f4ee79361b22194c9f9721de5","../hanja-goal-glyphwiki-batch997-2026-10-13/progressive.mjs":"25b9a23cdf644798a7336df3f78b72ecc3c4ad10d0fbe860b403a38911e514f6"},EXPECTED_IDENTITY={"root":"u73eb","file":"../hanja-goal-glyphwiki-batch942-2026-10-13/engine-whole-u73eb.json","fileSHA256":"80aa9ca757b39af99f49a15e33364e6c4a2affd858e0111db4bf275656d9ae8a"},FIXED_PROOF_SHA="fadbab0432daacd95695d700be4b501a8f1a8d081029dd4f123989149560edfc",FIXED_BASELINE_SHA="4643cf2a48be122c98216f1736711a13176160be4076da2f31ca91a0b31d6709",FIXED_DERIVED_SHA="088b4b7b6de94f5ad3781330f294b324a1c69e219a1be30c19b18c88fdc098fa",TAIL_SPEC={"pens":10,"masks":11,"polygons":32,"pen":10,"rawIndices":[10],"tailDirection":"up","sourceGroups":[[0],[2],[1],[3],[4],[5],[6,7],[8],[9],[10]],"exactCalls":[{"kind":"cdDrawLine","args":[145.9,105,145.9,170,0,1]},{"kind":"cdDrawCurve","args":[145.9,170,145.9,180,155.9,180,1,1]},{"kind":"cdDrawLine","args":[155.9,180,182.2,180,6,5]}]}
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10]],RAW_COUNT=11,ORIGINAL=[[{"kind":"cdDrawLine","args":[14.7,42,78.75,42,0,0]}],[{"kind":"cdDrawLine","args":[43.05,42,43.05,149,32,32]}],[{"kind":"cdDrawLine","args":[17.85,93,75.6,93,0,0]}],[{"kind":"cdDrawCurve","args":[14.7,160,45.15,150,81.9,135,0,7]}],[{"kind":"cdDrawLine","args":[130.5,16,130.5,47,0,32]}],[{"kind":"cdDrawLine","args":[79.9,47,187.7,47,0,0]}],[{"kind":"cdDrawCurve","args":[130.5,50,121.69999999999999,69,100.8,97,0,7]}],[{"kind":"cdDrawCurve","args":[84.3,101,127.19999999999999,95,170.1,88,0,7]}],[{"kind":"cdDrawCurve","args":[149.2,65,172.3,86,178.9,105,7,8]}],[{"kind":"cdDrawLine","args":[115.1,110,115.1,128,0,1]},{"kind":"cdDrawCurve","args":[115.1,128,114,171,66.7,189,1,7]}],[{"kind":"cdDrawLine","args":[145.9,105,145.9,170,0,1]},{"kind":"cdDrawCurve","args":[145.9,170,145.9,180,155.9,180,1,1]},{"kind":"cdDrawLine","args":[155.9,180,182.2,180,6,5]}]],TRACE_SHA256="f2cf0de55406e90b1464ba323ccc4daae67174c91cc194450f28131773f5c9f6",GROUPS_SHA256="682ecaa30be241f6d596b91d9674a840a7bec6beed951d37874ce0516d742ac8",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot="u73eb",sourceGroups=[[0],[2],[1],[3],[4],[5],[6,7],[8],[9],[10]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){
 assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,[[0],[2],[1],[3],[4],[5],[6,7],[8],[9],[10]]);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_DERIVED_SHA);assert.deepEqual(T.tailSpec,TAIL_SPEC);
 assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);
 assert.deepEqual(proof,json(identity.file));assert.deepEqual(proof,json('../hanja-goal-glyphwiki-batch942-2026-10-13/engine-proof.json'));assert.equal(T.archiveFull5,true);assert.equal(T.newFull5Combination,false);
 const s=json('../hanja-goal-glyphwiki-batch942-2026-10-13/sources.json');assert.equal(s.root,"u73eb");assert.equal(s.glyph,"珫");assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.deepEqual(s.providerVersions,[]);assert.deepEqual(Object.keys(s.records).sort(),["u5145-02","u5145-g02","u738b-01","u73eb","u73eb-g"]);
 const closure=[];function visit(n){assert(s.records[n]);if(closure.includes(n))return;closure.push(n);const data=s.records[n].data;if(data.startsWith('[[')&&data.endsWith(']]'))visit(data.slice(2,-2));else for(const row of data.split('$'))if(row.startsWith('99:'))visit(row.split(':')[7])}visit(sourceRoot);assert.deepEqual(closure,["u73eb","u738b-01","u5145-02"]);assert.deepEqual(T.sourceFamily.selectedRootClosure,closure);
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
export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(geometryRuns,0);const rawBaseline=generateGeometry(trace,proof,identity);assert.equal(rawBaseline.length,11);assert.notDeepEqual(endpoint(trace[6][0]),trace[7][0].args.slice(0,2));const baseline=[[0],[2],[1],[3],[4],[5],[6,7],[8],[9],[10]].map(indices=>indices.flatMap(i=>rawBaseline[i]));geometryRuns++;return{rawBaseline,baseline}}
export function deriveTail(...args){assert.equal(args.length,4);const[baseline,trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(digest(baseline),FIXED_BASELINE_SHA);assert.equal(deriveRuns,0);const tail=eligible(TAIL_SPEC,proof),out=derive(TAIL_SPEC,baseline,proof,tail);assert.deepEqual(baseline[9][0].bounds,[69.95,52,94.1,93]);assert.deepEqual(out[9][0].bounds,[69.95,52,94.1,93]);assert.equal(out[9][1].weight,12.5);deriveRuns++;return out}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const f=json('./fixtures.json')["u73eb"];assert.equal(digest(f.fullProof),FIXED_PROOF_SHA);assert.equal(digest(f.baseline),FIXED_BASELINE_SHA);assert.equal(digest(f.strokes),FIXED_DERIVED_SHA);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return deriveRuns}
export function cachedPositiveCallCount(){return cachedCalls}
