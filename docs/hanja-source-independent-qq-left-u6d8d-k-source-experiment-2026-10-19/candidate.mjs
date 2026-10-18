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
const T=json('./config.json').targets['u6d8d-k'],FIXED_PINS={"../hanja-goal-glyphwiki-batch192-2026-10-04/NOTICE.md":"91b3d822b06e11ae9d5ea56c0c4a2ed798d5e136098d38d2fdf48d8ed8e79cf0","../hanja-goal-glyphwiki-batch192-2026-10-04/README.md":"3e31dd0dd9ccc83356112849a4d1255fbf2aca1660801e6bfa2b0f2bc1e67ed6","../hanja-goal-glyphwiki-batch192-2026-10-04/alternative-u6d8d-ue0100.json":"254f94d920a9c47f75ad3e617125309dba2236365cdb2f153705a121650cf314","../hanja-goal-glyphwiki-batch192-2026-10-04/coverage.json":"ad3724f60c45a51df7b3870c8ce800e4e97fbd17475b2210925dc45989fc7838","../hanja-goal-glyphwiki-batch192-2026-10-04/draw-trace.json":"d1ef87669a09035e91ea5883f205845368ec33d2e926b06455f6ff5eb40263f1","../hanja-goal-glyphwiki-batch192-2026-10-04/engine-proof.json":"0a4420d7b0c80aa4b8ad1659ebba54abf4e09f2ccfe573aeabc4b919c23d0940","../hanja-goal-glyphwiki-batch192-2026-10-04/findings.json":"c45bedc0542327d78684d4bbff8f9dac33be40128607a4ab58fe712507d0f6bf","../hanja-goal-glyphwiki-batch192-2026-10-04/metadata.json":"b07f13452700b83908a7681368d39760ae02d3dc813ba123e39a27910df34d6e","../hanja-goal-glyphwiki-batch192-2026-10-04/next-source-inventory.json":"82418121d733d08ff76681c26df1f06e17cf5f2d9996cc12d4c9f849f730bdc2","../hanja-goal-glyphwiki-batch192-2026-10-04/next.json":"6a06e46378a3fd98c6e59e64b215e5304d5d7f2edd774f83527fd1c7f0b901d8","../hanja-goal-glyphwiki-batch192-2026-10-04/serve.py":"212f1aeb14d11114fa7831eac8b32ce7acca18dc748035ec5acb3834fd33e9db","../hanja-goal-glyphwiki-batch192-2026-10-04/sources.json":"4a9442f1b360b17307bd47b45238cb3e62ebfbbc1ebc3bebfbd29bf15a9f5079","../hanja-goal-glyphwiki-batch192-2026-10-04/validation.json":"b831051d66472c0323b767a6330e370eb907a67b285f1739281d6315b5b97f94","../hanja-goal-glyphwiki-batch192-2026-10-04/verify.mjs":"155f3433cb4bd6a11c865625b27f49c3b1ee0538abcbd48ef8c5ddcade2136ba","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-terminal-tail-left-source-experiment-2026-10-18/tail-candidate.mjs":"abd4e5011d011e463e52069248b9d73831df9d7f4ee79361b22194c9f9721de5","../hanja-goal-glyphwiki-batch997-2026-10-13/progressive.mjs":"25b9a23cdf644798a7336df3f78b72ecc3c4ad10d0fbe860b403a38911e514f6","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u6d8d-k","file":"../hanja-goal-glyphwiki-batch192-2026-10-04/engine-proof.json","fileSHA256":"0a4420d7b0c80aa4b8ad1659ebba54abf4e09f2ccfe573aeabc4b919c23d0940"},FIXED_PROOF_SHA="a1c601e42486745d130b6d240a07b8d5707892ce1c1e00911b1f9dff23a51c5f",FIXED_BASELINE_SHA="2b361f26995ca92051d1cb244a948163828ae66e71134f56456068708faa8c10",FIXED_DERIVED_SHA="260159824fa40df7172f1f7215638260dc53c7f1e3e79bc70c6ad041501165c9",TAIL_SPEC={"glyph":"涍","root":"u6d8d-k","pens":10,"masks":11,"polygons":26,"pen":9,"rawIndices":[10],"tailDirection":"left","sourceGroups":[[0],[1],[2,3],[4],[5],[6],[7],[8,9],[10],[11]],"exactCalls":[{"kind":"cdDrawLine","args":[131.44,117,131.44,172,0,1]},{"kind":"cdDrawCurve","args":[131.44,172,131.44,182,121.44,182,1,14]}]}
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11]],RAW_COUNT=12,ORIGINAL=[[{"kind":"cdDrawCurve","args":[26.8,20,46.8,27,55.6,41,7,8]}],[{"kind":"cdDrawCurve","args":[11.6,66,33.2,73,41.2,87,7,8]}],[{"kind":"cdDrawCurve","args":[13.2,133,41.2,142,38,184,7,8]}],[{"kind":"cdDrawCurve","args":[34,150,37.2,138,70.8,67,32,7]}],[{"kind":"cdDrawLine","args":[82.93,45,154.95999999999998,45,0,0]}],[{"kind":"cdDrawLine","args":[123.355,15,123.355,78,0,32]}],[{"kind":"cdDrawLine","args":[68.965,78,188.77,78,0,0]}],[{"kind":"cdDrawCurve","args":[171.865,21,137.32,91,68.23,138,0,7]}],[{"kind":"cdDrawLine","args":[91.015,99,154.225,99,0,2]}],[{"kind":"cdDrawCurve","args":[154.225,99,144.67000000000002,111,134.38,122,22,7]}],[{"kind":"cdDrawLine","args":[131.44,117,131.44,172,0,1]},{"kind":"cdDrawCurve","args":[131.44,172,131.44,182,121.44,182,1,14]}],[{"kind":"cdDrawLine","args":[80.725,141,182.89,141,0,0]}]],TRACE_SHA256="2133ca7e452bb5f792c195b983c9defcced90fc8d65325206e584d5c326d6a7b",GROUPS_SHA256="267a196080600e8947debfdeff55905c7661ce738471d29157fe4741a646a385",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot='u6d8d-k',sourceGroups=[[0],[1],[2,3],[4],[5],[6],[7],[8,9],[10],[11]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.sourceGroups,sourceGroups);for(const[k,v]of Object.entries(TAIL_SPEC))assert.deepEqual(T[k],v);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_DERIVED_SHA);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.equal(sha(readFileSync(local(identity.file))),identity.fileSHA256);assert.deepEqual(proof,json(identity.file));assert.deepEqual(proof.trace,json('../hanja-goal-glyphwiki-batch192-2026-10-04/draw-trace.json'));const s=json('../hanja-goal-glyphwiki-batch192-2026-10-04/sources.json');assert.equal(s.root,sourceRoot);assert.equal(s.glyph,'涍');assert.equal(digest(s),"3c8c97b776f90a2d157f5ee33b688b1477fc7d63c84ac6c79b35a6e80013c38d");assert.deepEqual(s.missing,[]);assert.deepEqual(Object.keys(s.records).sort(),["u5b5d","u6c35-01","u6d8d","u6d8d-k"]);assert.deepEqual(s.aliases,[]);assert.deepEqual(s.providerVersions,[]);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
function generateGeometry(trace,proof,identity){const sourceGroups=ORIGINAL_SOURCE_GROUPS;
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
export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(geometryRuns,0);const rawBaseline=generateGeometry(trace,proof,identity);const baseline=[...rawBaseline.slice(0,2),[rawBaseline[2][0],rawBaseline[3][0]],...rawBaseline.slice(4)];geometryRuns++;return{rawBaseline,baseline}}
export function deriveTail(...args){assert.equal(args.length,4);const[baseline,trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(digest(baseline),FIXED_BASELINE_SHA);assert.equal(deriveRuns,0);const tail=eligible(TAIL_SPEC,proof),result=derive(TAIL_SPEC,baseline,proof,tail);assert.deepEqual(baseline[8][0].bounds,[50.7,58,70.2,94]);assert.deepEqual(result[8][0].bounds,[60.7,58,70.2,94]);assert.equal(result[8][1].weight,10);deriveRuns++;return result}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const f=json('./fixtures.json')['u6d8d-k'];assert.equal(digest(f.fullProof),FIXED_PROOF_SHA);assert.equal(digest(f.baseline),FIXED_BASELINE_SHA);assert.equal(digest(f.strokes),FIXED_DERIVED_SHA);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return deriveRuns}
export function cachedPositiveCallCount(){return cachedCalls}
