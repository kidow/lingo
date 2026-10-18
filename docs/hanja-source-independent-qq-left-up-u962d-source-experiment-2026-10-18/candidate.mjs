export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// Provisional source-only review compiler. Domestic order and browser approval are pending.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const endpoint = (call) => call.args.slice(call.kind === 'cdDrawLine' ? 2 : call.kind === 'cdDrawCurve' ? 4 : 6, call.kind === 'cdDrawLine' ? 4 : call.kind === 'cdDrawCurve' ? 6 : 8)
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })


const local=n=>new URL(n,import.meta.url),json=n=>JSON.parse(readFileSync(local(n),'utf8')),sha=b=>createHash('sha256').update(b).digest('hex'),round=x=>Math.round(x*1e6)/1e6
const T=json('./config.json').targets.u962d,FIXED_PINS={"../hanja-goal-glyphwiki-batch795-2026-10-13/NOTICE.md":"6982c284761ed1a7af5def55b51ac94b4a23041073116e051e1274df37777c9c","../hanja-goal-glyphwiki-batch795-2026-10-13/README.md":"0981867ccf24a0c55f8645bb89ef8ad1dce66df402f5fb4b0349b50b876ba458","../hanja-goal-glyphwiki-batch795-2026-10-13/draw-trace.json":"8ce4404e6dbc4c2d56b0557c7ee7f50d260e693b296488dcbbbad8936431c774","../hanja-goal-glyphwiki-batch795-2026-10-13/engine-proof.json":"74c4c2649bb223c8b7177f51f6bcbf39457f1ba86629ed58aec51c2fa46a679c","../hanja-goal-glyphwiki-batch795-2026-10-13/engine-whole-u962d-var-001.json":"f888b33f8aa856b25ef1588d7c67650620e4c8ed8039cacfbb0ba202265bee9f","../hanja-goal-glyphwiki-batch795-2026-10-13/engine-whole-u962d.json":"74c4c2649bb223c8b7177f51f6bcbf39457f1ba86629ed58aec51c2fa46a679c","../hanja-goal-glyphwiki-batch795-2026-10-13/metadata.json":"0c0feee5049532100dc558fd94bff7e4d29c66ba4a152cec3502ce23caa3c1a2","../hanja-goal-glyphwiki-batch795-2026-10-13/native-agent-review.json":"fe3ac1b236f96f7c8f85740c7ea26206cc534bbbb468334d9c3e1ec6a5d39d6f","../hanja-goal-glyphwiki-batch795-2026-10-13/progressive.mjs":"56a856cccbd94eb0683fc27e2baf5e654843ee3b7f76bd1b916127c00e77a4ed","../hanja-goal-glyphwiki-batch795-2026-10-13/resume.json":"6bb0cd8ee851a063a116dc034db08f52037722107e8dfeda01d877ce234879b7","../hanja-goal-glyphwiki-batch795-2026-10-13/review.json":"fd913a80f81d4a6dba8e268eab38006d7acdbabee8689dae02b7d4c6e6374fea","../hanja-goal-glyphwiki-batch795-2026-10-13/serve-memory.py":"eb1ae86958240af57cc209fb206c8329f2c26b2f2512822f80a99d5c7bdb1f25","../hanja-goal-glyphwiki-batch795-2026-10-13/serve-progressive.py":"f861383c3462456a3a34bb0d4281a61ff455a231a783c1db560dfc08122fa3c9","../hanja-goal-glyphwiki-batch795-2026-10-13/source-analysis.json":"72af0c54fbde574dcada492cbb719d8ae68a001f06ebcf79ef7824702f5fa931","../hanja-goal-glyphwiki-batch795-2026-10-13/source-join-analysis.json":"0bdb30970bfa2739195fd214440f36a4ab1dc36bdee3f04bf5b107f210387028","../hanja-goal-glyphwiki-batch795-2026-10-13/sources.json":"093d7e14235752ae92ff99599427d63fb895bc5fe7b0c4e0f64a072502a67b5d","../hanja-goal-glyphwiki-batch795-2026-10-13/validation.json":"749cc2b5b8da2f2a2afccde14386b72cadf0ac26895cb4941b883e7e68e06da3","../hanja-goal-glyphwiki-batch795-2026-10-13/verify-source.mjs":"fa1e96fc7742e7d91645b721d3ccdaf52565958cd68bae299e1c75d59c3e4365","../hanja-goal-glyphwiki-batch795-2026-10-13/whole-variant-inventory.json":"fc69f1b1253517f7177601c1669a828fba1774ce4afcda62f2e1b7847f1765dd","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-terminal-tail-left-source-experiment-2026-10-18/tail-candidate.mjs":"abd4e5011d011e463e52069248b9d73831df9d7f4ee79361b22194c9f9721de5","../hanja-goal-glyphwiki-batch997-2026-10-13/progressive.mjs":"25b9a23cdf644798a7336df3f78b72ecc3c4ad10d0fbe860b403a38911e514f6","../hanja-goal-glyphwiki-batch719-2026-10-12/progressive.mjs":"17f21ae041455f0a5e6d46f8bdbe6d8d2c9e736cf9ce550367e02a83979f4063","../hanja-goal-glyphwiki-batch1183-2026-10-18/review.json":"aff8d111b4574eeda09ae93dc134eb9c543e2340f9b829e73eadc234a7a65634","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u962d","file":"engine-proof.json","fileSHA256":"74c4c2649bb223c8b7177f51f6bcbf39457f1ba86629ed58aec51c2fa46a679c"}
const ORIGINAL_SOURCE_GROUPS=[[0,1],[2],[3],[4],[5],[6],[7],[8]],RAW_COUNT=9,ORIGINAL=[[{"kind":"cdDrawLine","args":[28.725,28,72.8,28,2,2]}],[{"kind":"cdDrawCurve","args":[72.8,28,65.625,49,47.175,76,22,7]}],[{"kind":"cdDrawCurve","args":[47.175,75,73.825,100,67.9060891686771,125.26364379223192,7,0]},{"kind":"cdDrawCurve","args":[67.9060891686771,125.26364379223192,65.625,135,55.625,135,2,514]}],[{"kind":"cdDrawLine","args":[28.725,28,28.725,186,12,0]}],[{"kind":"cdDrawCurve","args":[126.4,17,115.9,50,99.1,79,0,7]}],[{"kind":"cdDrawCurve","args":[80.2,80,123.25,77,170.5,70,0,7]}],[{"kind":"cdDrawCurve","args":[143.2,36,169.45,59,182.05,90,7,8]}],[{"kind":"cdDrawLine","args":[109.6,91,109.6,123,0,1]},{"kind":"cdDrawCurve","args":[109.6,123,109.6,173,65.5,188,1,7]}],[{"kind":"cdDrawLine","args":[143.2,91,143.2,164,0,1]},{"kind":"cdDrawCurve","args":[143.2,164,143.2,174,153.2,174,1,1]},{"kind":"cdDrawLine","args":[153.2,174,182.05,174,6,5]}]]
const TRACE_SHA256="9c3867671f27ad04d4dc8f74648780f8c95e14870cd2275c00d0d716bd9fbbdb",GROUPS_SHA256="9986c47b84c7a50b68f14be5287286727d19e27b7d10b25b27e9efe67aab8efa",FIXED_PROOF_SHA="5c6217f5da05de5716028bff8bc765396ed7ab320e4e6e069574d1ac9db28924"
const PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
const FIXED_BASELINE_SHA="3300d3b24bb3190c797f5d4c0ebc1ae4ea1e98fd5641435b7df74a2ff99b2697",FIXED_DERIVED_SHA="02450f8c6dd539f0b4bb503ffbcc5dbe2441b69a9092b252d3f5311e4c22329e",TAIL_SPECS=[{"pens":7,"masks":8,"polygons":28,"pen":2,"rawIndices":[2],"tailDirection":"left","sourceGroups":[[0,1],[2],[3],[4,5],[6],[7],[8]],"exactCalls":[{"kind":"cdDrawCurve","args":[47.175,75,73.825,100,67.9060891686771,125.26364379223192,7,0]},{"kind":"cdDrawCurve","args":[67.9060891686771,125.26364379223192,65.625,135,55.625,135,2,514]}]},{"pens":7,"masks":8,"polygons":28,"pen":7,"rawIndices":[8],"tailDirection":"up","sourceGroups":[[0,1],[2],[3],[4,5],[6],[7],[8]],"exactCalls":[{"kind":"cdDrawLine","args":[143.2,91,143.2,164,0,1]},{"kind":"cdDrawCurve","args":[143.2,164,143.2,174,153.2,174,1,1]},{"kind":"cdDrawLine","args":[153.2,174,182.05,174,6,5]}]}]
function validateSelectedProof(trace,proof,identity){
 assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.sourceGroups,sourceGroups);assert.deepEqual(T.tailSpecs,TAIL_SPECS);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_DERIVED_SHA);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.equal(sha(readFileSync(local(T.sourceDirectory+'/'+identity.file))),identity.fileSHA256);assert.deepEqual(proof,json(T.sourceDirectory+'/'+identity.file));const s=json(T.sourceDirectory+'/sources.json');assert.equal(s.root,sourceRoot);assert.equal(s.glyph,'阭');assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.equal(Object.keys(s.records).length,5);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])
}
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

 return compileBound(trace,proof,identity)
}
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

let geometryRuns=0,deriveRuns=0,primitiveRuns=0,cachedCalls=0
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot='u962d',sourceGroups=[[0,1],[2],[3],[4,5],[6],[7],[8]],nativeApproval=false,runtimeApplied=false
export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(geometryRuns,0);const rawBaseline=generateGeometry(trace,proof,identity);assert.equal(rawBaseline.length,8);assert(rawBaseline.every(p=>p.length===1));assert.deepEqual(endpoint(trace[0][0]),trace[1][0].args.slice(0,2));assert.notDeepEqual(endpoint(trace[4][0]),trace[5][0].args.slice(0,2));const baseline=[...rawBaseline.slice(0,3),[rawBaseline[3][0],rawBaseline[4][0]],...rawBaseline.slice(5)];assert.deepEqual(baseline.flat(),rawBaseline.flat());assert.equal(baseline.length,7);assert.equal(baseline.flat().length,8);geometryRuns++;return{rawBaseline,baseline}}
export function deriveTailPair(...args){assert.equal(args.length,4);const[baseline,trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(digest(baseline),FIXED_BASELINE_SHA);assert.equal(deriveRuns,0);const before=JSON.stringify(baseline),left=derive(TAIL_SPECS[0],baseline,proof,eligible(TAIL_SPECS[0],proof)),up=derive(TAIL_SPECS[1],baseline,proof,eligible(TAIL_SPECS[1],proof));assert.equal(JSON.stringify(baseline),before);const out=baseline.slice();out[1]=left[1];out[6]=up[6];for(let i=0;i<baseline.length;i++)if(i!==1&&i!==6)assert.equal(out[i],baseline[i]);assert.deepEqual(out[1][0].bounds,[23.6,37.5,37.45,70.5]);assert.deepEqual(out[6][0].bounds,baseline[6][0].bounds);assert.equal(out.length,7);assert.equal(out.flat().length,10);assert.equal(out.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),28);deriveRuns++;primitiveRuns+=2;return out}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const f=json('./fixtures.json').u962d;assert.equal(digest(f.fullProof),FIXED_PROOF_SHA);assert.equal(digest(f.baseline),FIXED_BASELINE_SHA);assert.equal(digest(f.strokes),FIXED_DERIVED_SHA);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return deriveRuns}
export function primitiveDerivationCallCount(){return primitiveRuns}
export function cachedPositiveCallCount(){return cachedCalls}
