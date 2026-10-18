export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// Provisional source-only review compiler. Domestic order and browser approval are pending.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const endpoint = (call) => call.args.slice(call.kind === 'cdDrawLine' ? 2 : call.kind === 'cdDrawCurve' ? 4 : 6, call.kind === 'cdDrawLine' ? 4 : call.kind === 'cdDrawCurve' ? 6 : 8)
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })

function compileBound(trace, proof, identity) {
  validateSelectedProof(trace, proof, identity)
  assert.deepEqual(rawSourceGroups, ORIGINAL_SOURCE_GROUPS, "Pinned numeric source grouping; no native order approval")
  assert.equal(trace.length, RAW_COUNT)
  assert.equal(proof.groups.length, RAW_COUNT)
  assert.deepEqual(trace.map(row => row.map(call => ({ kind: call.kind, args: call.args }))), ORIGINAL)
  assert.equal(digest(trace), TRACE_SHA256, 'Every original trajectory and polygon must match the selected whole root')
  assert.equal(digest(proof.groups), GROUPS_SHA256)
  assert.deepEqual(proof.defaults, PINNED_DEFAULTS)
  assert.equal(proof.engineRevision, ENGINE_REVISION)
  assert.deepEqual(proof.engineHashes, ENGINE_HASHES)
  const rawIndices = rawSourceGroups.flat()
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
  const outlines = rawSourceGroups.map(indices => {
    const tail = tails.get(JSON.stringify(indices))
    return tail ? [compile(indices, tail), segment([tail.polygon], tail.direction, tail.jump / 2)] : [compile(indices)]
  })
  const emittedPolygonCount = outlines.flat().reduce((sum, mask) => sum + (mask.outline.match(/M/g)?.length ?? 0), 0)
  assert.equal(emittedPolygonCount, trace.flatMap(calls => calls.flatMap(call => call.polygons)).length, 'Every original polygon must be emitted in exactly one mask')

  // Terminal13 is one original emitted polygon, not a separate authored tip.
  // Keep its full original bounds in a cardinal down mask; do not invent a curve connector or split geometry.
  for (const raw of SINGLE_CARDINAL_TIP_RAW) {
    const index = rawSourceGroups.findIndex(indices => indices.length === 1 && indices[0] === raw);
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

const read=f=>readFileSync(new URL(f,import.meta.url)),obj=f=>JSON.parse(read(f)),sha=v=>createHash('sha256').update(v).digest('hex'),T=obj('config.json').targets.u5a0d
const FIXED_IDENTITY={"root":"u5a0d","headerFile":"../hanja-goal-glyphwiki-batch655-2026-10-11/engine-proof.json","headerFileSHA256":"c7c68c4c406a1d2979a9d0528292f83b6036c40831ee29c8a4a33e99231e2553","traceFile":"../hanja-goal-glyphwiki-batch655-2026-10-11/draw-trace.json","traceFileSHA256":"cf99ddf035d2351cfa7818d508cb6ac7407c5b5e1db9409a2211971786a92b04","sourceFile":"../hanja-goal-glyphwiki-batch655-2026-10-11/sources.json","sourceFileSHA256":"ed39dfc3b1df765a4b41229a225b71d36f8dc582842d04a6972ae5d7209c4188"},FIXED_PINS={"../hanja-goal-glyphwiki-batch655-2026-10-11/README.md":"e8ef5e8946c566f29a481c63caca7bb37af16cdd53df80573716b83e1aa75c66","../hanja-goal-glyphwiki-batch655-2026-10-11/draw-trace.json":"cf99ddf035d2351cfa7818d508cb6ac7407c5b5e1db9409a2211971786a92b04","../hanja-goal-glyphwiki-batch655-2026-10-11/engine-proof.json":"c7c68c4c406a1d2979a9d0528292f83b6036c40831ee29c8a4a33e99231e2553","../hanja-goal-glyphwiki-batch655-2026-10-11/engine-whole-u5a0d-ue0100.json":"e7b0265020a126fcefe4b7c89ff3853c4891f026da722a756cd3c507dfacb90c","../hanja-goal-glyphwiki-batch655-2026-10-11/engine-whole-u5a0d-var-001.json":"5adcf6eb85435ca37f06eded0c0d541603de4366814097c9e750eb4feb7764a2","../hanja-goal-glyphwiki-batch655-2026-10-11/engine-whole-u5a0d.json":"e7b0265020a126fcefe4b7c89ff3853c4891f026da722a756cd3c507dfacb90c","../hanja-goal-glyphwiki-batch655-2026-10-11/metadata.json":"1f5f1be597e82c943cb60aa5e90add49e69f7bb5baf7b3f9aea41f585fa2b364","../hanja-goal-glyphwiki-batch655-2026-10-11/progressive-review.json":"a065f5a1a80d602205f639cdb2ba44ead2c351d66d6652098eb9c7df3c60fbbc","../hanja-goal-glyphwiki-batch655-2026-10-11/progressive.mjs":"38f9cbb6dd3dbabf7c3b01c7f14d6f5340e26aa1e1cd800aa604056b92a77d3f","../hanja-goal-glyphwiki-batch655-2026-10-11/resume.json":"f19b849b3a2053dcb541fb141cd9c460a3e173014dadec45fbad4aa698427a8d","../hanja-goal-glyphwiki-batch655-2026-10-11/serve-progressive.py":"f968516e1a2bfaa5d798af3d1b6577a555be21866a24bd400d271ec095eb6712","../hanja-goal-glyphwiki-batch655-2026-10-11/serve-variants.py":"406a619bb68e3dc1e40fbc815b996a56813fa9ae7a2ac42d6971788a33c9e54e","../hanja-goal-glyphwiki-batch655-2026-10-11/sources.json":"ed39dfc3b1df765a4b41229a225b71d36f8dc582842d04a6972ae5d7209c4188","../hanja-goal-glyphwiki-batch655-2026-10-11/validation.json":"896360bd949c1bcca8141ae0a311967c7b1cbc070ef039dcc7795146883d0359","../hanja-goal-glyphwiki-batch655-2026-10-11/verify-source.mjs":"2e730b65cbeee1c886ad58a602475f83248d5bf46e6942f7d97938da6e2f6f50","../hanja-goal-glyphwiki-batch655-2026-10-11/whole-variant-inventory.json":"cfadc9e52298ef7e7699445f5dd1230fe6e677764edb44c6ec2a9675e9939da9","../hanja-remaining-source-recovery-u7628-2026-10-18/progressive.mjs":"7e59b053af205f184bb56cdfcda95d9d5fe9cbf0adbc7bb2c8d4b96e4def3ddc","../hanja-source-independent-lq-u59c3-source-experiment-2026-10-18/candidate.mjs":"a44562e7db2d2e8590fcd35f8270e243d54729e340168531886b4cd6511e7e37","../hanja-terminal-tail-legacy-source-experiment-2026-10-18/tail-candidate.mjs":"fc78e7d787c14bfe25be30f1c461f6edc054154a00a90dcf0ee05614eba3d1f4","../hanja-goal-glyphwiki-batch997-2026-10-13/progressive.mjs":"25b9a23cdf644798a7336df3f78b72ecc3c4ad10d0fbe860b403a38911e514f6","../hanja-goal-glyphwiki-batch979-2026-10-13/progressive-terminal15-candidate.mjs":"94026c85f62937e2414ad474c04efe7ddbdbf63e833b73a5d4d0f5abfa094d70","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09"},FIXED_PROOF_SHA="bdda38d8984ff010bf51cab68e09fa30a32a19913c745e2facc1fa60ba5ce566"
export const selectedProofIdentity=Object.freeze({...FIXED_IDENTITY}),sourceRoot='u5a0d',sourceGroups=[[0,1],[2],[3],[4],[5],[6,7],[8],[9],[10]],nativeApproval=false,runtimeApplied=false
const rawSourceGroups=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10]],ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10]],RAW_COUNT=11
const ORIGINAL=[[{"kind":"cdDrawLine","args":[48.38,16,27.19,135,0,0]}],[{"kind":"cdDrawCurve","args":[28.82,118,59.79,129,75.275,156,7,8]}],[{"kind":"cdDrawCurve","args":[70.385,61,60.605,153,13.335,188,22,7]}],[{"kind":"cdDrawLine","args":[18.225,61,70.385,61,0,2]}],[{"kind":"cdDrawLine","args":[93.9,53.27,93.9,108.545,12,1]},{"kind":"cdDrawCurve","args":[93.9,108.545,93.9,162.815,71.85,187.94,1,7]}],[{"kind":"cdDrawLine","args":[93.9,53.27,186.3,53.27,2,0]}],[{"kind":"cdDrawLine","args":[93.9,94.475,136.95,94.475,2,100]}],[{"kind":"cdDrawCurve","args":[123.30000000000001,94.475,124.35,126.635,120.15455118019553,139.25559502120777,32,0]},{"kind":"cdDrawCurve","args":[120.15455118019553,139.25559502120777,117,148.745,107,148.745,2,14]}],[{"kind":"cdDrawCurve","args":[138,14.075,147.45,177.89,183.15,178.895,0,15]}],[{"kind":"cdDrawCurve","args":[173.7,80.405,152.7,170.855,109.65,186.935,0,7]}],[{"kind":"cdDrawCurve","args":[149.55,16.085,163.2,23.12,170.55,37.19,7,8]}]],TRACE_SHA256="619966239c89615fe73867b7d0255287bbf25ccc8c2f13bb56992e36d2c8af5c",GROUPS_SHA256="8420691f163339a43be9ed3aa91d508eb6d9151b107b4e49e8ca049119a62d2a"
const PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
const FIXED_RAW_SHA="f5615501bc812848a198d1a21f2f6aeecd7e4bac7e466d0f6be7347d6a74ae47",FIXED_PRETAIL_SHA="49b8fc00551f246f840650a3202ef6e99391e394cb40b64a2e97ca8ca73caffb",FIXED_DERIVED_SHA="2bc8c0975c648e1a5dd0ad24080bc76c52d6b1eaeb59b4b5a01867261c503b4f"
function validateSelectedProof(trace,proof,id){assert.equal(T.rawBaselineSHA256,FIXED_RAW_SHA);assert.equal(T.preTailBaselineSHA256,FIXED_PRETAIL_SHA);assert.equal(T.derivedSHA256,FIXED_DERIVED_SHA);assert.deepEqual(T.identity,FIXED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert(id&&Object.getPrototypeOf(id)===Object.prototype);assert.deepEqual(id,FIXED_IDENTITY);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(read(f)),h,f);for(const[f,k]of[['headerFile','headerFileSHA256'],['traceFile','traceFileSHA256'],['sourceFile','sourceFileSHA256']])assert.equal(sha(read(id[f])),id[k]);assert.deepEqual(proof,{...obj(id.headerFile),trace:obj(id.traceFile)})}
let sourceRuns=0,deriveRuns=0,cachedCalls=0
export const sourceCompileCallCount=()=>sourceRuns,geometryDerivationCallCount=()=>deriveRuns,cachedPositiveCallCount=()=>cachedCalls
export function captureRawGeometry(...args){assert.equal(args.length,3);const[trace,proof,id]=args;validateSelectedProof(trace,proof,id);assert.equal(sourceRuns,0);sourceRuns++;return compileBound(trace,proof,id)}
function deriveLeftFromRaw(t,baseline,proof){
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })
const round=x=>Math.round(x*1e6)/1e6
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
return derive(t,baseline,proof,eligible(t,proof))
}
const contourPolygons=outline=>(outline.match(/M[^Z]+Z/g)||[]).map(path=>{
 const values=path.match(/-?\d+(?:\.\d+)?/g).map(Number)
 return {path,points:Array.from({length:values.length/2},(_,i)=>({x:values[i*2]*2,y:values[i*2+1]*2,off:0}))}
})
const canonical=points=>{
 const p=points.map(v=>[v.x,v.y]),choices=[]
 for(const o of[p,[...p].reverse()])for(let i=0;i<o.length;i++)choices.push(JSON.stringify([...o.slice(i),...o.slice(0,i)]))
 return choices.sort()[0]
}
const bounds=points=>[Math.min(...points.map(p=>p.x/2)),Math.min(...points.map(p=>p.y/2)),Math.max(...points.map(p=>p.x/2)),Math.max(...points.map(p=>p.y/2))]
function partitionTail(trace,proof,p,baseline){
 const result=baseline.map(pen=>pen.map(mask=>({...mask,bounds:[...mask.bounds]})))
 for(const fixture of p.terminals){
  const {raw,call,pen,maskIndex,args,kind}=fixture
  assert.equal(p.sourceGroups[pen-1].at(-1),raw,'Terminal must be last authored raw of this same pen')
  assert.equal(trace[raw].length-1,call,'No following authored call may be silently delayed')
  const terminal=trace[raw][call]
  assert.equal(terminal.kind,kind);assert.deepEqual(terminal.args,args)
  assert(kind==='cdDrawCurve'||kind==='cdDrawBezier')
  const endpoint=terminal.args.slice(kind==='cdDrawCurve'?4:6,kind==='cdDrawCurve'?6:8),[x2,y2]=endpoint
  const ta1=terminal.args.at(-2),ta2=terminal.args.at(-1)
  assert.equal(ta2,15);assert(terminal.args[1]<y2)
  const opt1=Math.floor((ta1%10000)/1000),width=proof.defaults.kMinWidthT-opt1/2,jump=proof.defaults.kWidth*5
  const point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0})
  const expectedTail=[point(x2,y2-width+1),point(x2+2,y2-width-jump),point(x2,y2-width-jump),point(x2-width,y2-width+1)]
  const tailPolygon=terminal.polygons.at(-1)
  assert.deepEqual(tailPolygon,expectedTail,'Separate last original terminal15 quad, unchanged')
  assert.equal(baseline[pen-1].length,fixture.originalPenMasks)
  const oldMask=baseline[pen-1][maskIndex]
  assert.equal(maskIndex,baseline[pen-1].length-1)
  assert.equal(oldMask.direction,'curve')
  const contours=contourPolygons(oldMask.outline),target=canonical(tailPolygon),matched=contours.flatMap((c,i)=>canonical(c.points)===target?[i]:[])
  assert.equal(matched.length,1,'Original quad appears exactly once in current curve mask')
  const ti=matched[0],bodyContours=contours.filter((_,i)=>i!==ti)
  assert(bodyContours.length>0)
  assert.deepEqual(bounds(bodyContours.flatMap(c=>c.points)),oldMask.bounds,'Body bounds must already equal original mask bounds; otherwise hold')
  const body={...oldMask,bounds:[...oldMask.bounds],outline:bodyContours.map(c=>c.path).join(' ')}
  const tail={outline:contours[ti].path,bounds:bounds(tailPolygon),direction:'up',weight:jump/2}
  assert.equal(tail.weight,12.5,'Fixed original jump, never bbox-height weight')
  result[pen-1].splice(maskIndex,1,body,tail)
 }
 const sourcePolygons=proof.groups.flatMap(g=>g.polygons).map(canonical).sort()
 const outputPolygons=result.flat().flatMap(m=>contourPolygons(m.outline)).map(c=>canonical(c.points)).sort();assert.deepEqual(outputPolygons,sourcePolygons)
 return result
}
const logical=raw=>[[...raw[0],...raw[1]],raw[2],raw[3],raw[4],raw[5],[...raw[6],...raw[7]],raw[8],raw[9],raw[10]]
export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,id]=args;validateSelectedProof(trace,proof,id);assert.equal(deriveRuns,0);const f=obj('fixtures.json').u5a0d,rawBaseline=f.rawBaseline;assert.equal(sha(JSON.stringify(rawBaseline)),T.rawBaselineSHA256);const before=JSON.stringify(rawBaseline),left=deriveLeftFromRaw(T.leftSpec,rawBaseline,proof),up=partitionTail(trace,proof,T.upSpec,rawBaseline);assert.equal(JSON.stringify(rawBaseline),before);const combined=rawBaseline.map((p,i)=>i===7?left[7]:i===8?up[8]:p),baseline=logical(rawBaseline),strokes=logical(combined);assert.equal(strokes.length,9);assert.equal(strokes.flat().length,13);assert.deepEqual(strokes[6][0].bounds,baseline[6][0].bounds);deriveRuns++;return{rawBaseline,baseline,strokes}}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,id]=args;validateSelectedProof(trace,proof,id);const f=obj('fixtures.json').u5a0d;assert.equal(digest(f.fullProof),FIXED_PROOF_SHA);assert.equal(digest(f.rawBaseline),T.rawBaselineSHA256);assert.equal(digest(f.baseline),T.preTailBaselineSHA256);assert.equal(digest(f.strokes),T.derivedSHA256);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,id]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,id)}
