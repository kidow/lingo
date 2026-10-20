export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'
import {readFileSync} from 'node:fs'
const digest=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex')
const sha=value=>createHash('sha256').update(value).digest('hex')
const local=n=>new URL(n,import.meta.url),json=n=>JSON.parse(readFileSync(local(n),'utf8'))
const endpoint=call=>call.args.slice(call.kind==='cdDrawLine'?2:call.kind==='cdDrawCurve'?4:6,call.kind==='cdDrawLine'?4:call.kind==='cdDrawCurve'?6:8)
const point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0})
const T=json('./config.json').targets.u7277,FIXED_PINS={"../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-goal-glyphwiki-batch848-2026-10-13/NOTICE.md":"ff4faed84d6766bcb75e74ef812c78a468d79c4cd5b1503993d646b9546c6b37","../hanja-goal-glyphwiki-batch848-2026-10-13/README.md":"7c0e144c0b88644c65b446450e14ba7b14d6e75ff0eec21473e9e9dcc92b74d9","../hanja-goal-glyphwiki-batch848-2026-10-13/candidate-compile-analysis.json":"f1627c443a78eb579e3a921402eba18f5ae2882314987d2c55aa8accdfa98b10","../hanja-goal-glyphwiki-batch848-2026-10-13/engine-proof.json":"7fe0c9ae5651e63c0e0bd6d473f79158c815576c222b6f258d5a148e5295b677","../hanja-goal-glyphwiki-batch848-2026-10-13/engine-whole-u7277-ue0100.json":"7fe0c9ae5651e63c0e0bd6d473f79158c815576c222b6f258d5a148e5295b677","../hanja-goal-glyphwiki-batch848-2026-10-13/engine-whole-u7277.json":"7fe0c9ae5651e63c0e0bd6d473f79158c815576c222b6f258d5a148e5295b677","../hanja-goal-glyphwiki-batch848-2026-10-13/metadata.json":"de24fe11b1f6a380ce4864e237dd0faf179f76bae26ff45036dbf5dc4ca40f02","../hanja-goal-glyphwiki-batch848-2026-10-13/progressive.mjs":"96bf49c77ab7f5f084ff8f73c0307c74dc3bbb247db86cd212145bf34f147ebe","../hanja-goal-glyphwiki-batch848-2026-10-13/resume.json":"a410cea84cde18a0db1f29bc1dce64b44cfc2acc845aabca38b854fda73cf04f","../hanja-goal-glyphwiki-batch848-2026-10-13/review.json":"1e4cf031b60e79f3d7b99a7bfc615e98390fff360ed1eb1646a556f2d0546be2","../hanja-goal-glyphwiki-batch848-2026-10-13/source-analysis.json":"a3d77f564594e40d04784b6854240ecbb8c4e78e6ab1f766b02d9c82cdf188ee","../hanja-goal-glyphwiki-batch848-2026-10-13/source-join-analysis.json":"96d9452cde2a3446f70c2f6ff775d9f8e7b25a601cd75bd69b387162bac2c569","../hanja-goal-glyphwiki-batch848-2026-10-13/sources.json":"25a597141b4f88eeb3e9f642e4888982ca47f7822134b92e91ed7e72d0931232","../hanja-goal-glyphwiki-batch848-2026-10-13/validation.json":"10c8ba45418de7bf0717561a963e1e64dadb9c95d77b08bcdc54b2b640639bdd","../hanja-goal-glyphwiki-batch848-2026-10-13/verify-candidate.mjs":"806073931f2509f7b7b4422aba7d303bcb3c82b1ea72d3f4cb3a7935cfa5f589","../hanja-goal-glyphwiki-batch848-2026-10-13/verify-source.mjs":"396d59c87a8253d098ea61253450db4a99b3fd0657325318a27fe0328d5fe739","../hanja-source-independent-lq-u981e-source-experiment-2026-10-19/candidate.mjs":"e76180f741b37cf2712b97a8cb412a65185eccb3a37664aab1d08f396d55a020","../hanja-source-native-raw-correspondence-u7277-2026-10-20/README.md":"cec52c8f33ee4b07f71560adeec9c3d5ac6baa51973ecec3f74b4275e7b1ff96","../hanja-source-native-raw-correspondence-u7277-2026-10-20/review.json":"368466dffb902e719467a3db26302882a0312148c548484fd4f1c19f7db0c63e","../hanja-source-raw-compare-u7277-2026-10-20/README.md":"459551615197f7e920b974bd0f2c4bf7a42c1516160ad24054c712b0dc5d2bfb","../hanja-source-raw-compare-u7277-2026-10-20/check.mjs":"3b916ff3745fa14e8a55bf2411b69ad08b72271daeb40f94ed7a607bc4308d3b","../hanja-source-raw-compare-u7277-2026-10-20/config.json":"cc21bc7e0125e0356b3cd05ae71e6e0284f5e736f7c73a4ac746ee7037f4d4af","../hanja-source-raw-compare-u7277-2026-10-20/serve.py":"627d9a913d45f5949a47574707d697a4250b1ca65cfe29f2717e6772b52f7827","../hanja-source-raw-compare-u7277-2026-10-20/validation.json":"492c22e895adaa4bd7ee50cddd15aeea9000ff8d312d0f6e279f95aa5420ee90","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c"},EXPECTED_IDENTITY={"root":"u7277","file":"../hanja-goal-glyphwiki-batch848-2026-10-13/engine-whole-u7277.json","fileSHA256":"7fe0c9ae5651e63c0e0bd6d473f79158c815576c222b6f258d5a148e5295b677"},FIXED_PROOF_SHA="f699409a71842fb8208b82c62bec156b2eaf96f1abd6aa3a2aba81c6d7f7e9b6",FIXED_RAW_SHA="f3f83b78097e59b5146f0c4900fb080d71d58260121d8dcd65531ced5c39eda4",FIXED_BASELINE_SHA="0080eaa2405975a46a34d479ba06c9d876e7b83cf9135f32cc8104b099b52b10"
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10]],FACTORY_MAP=[[0],[1],[2],[3],[4],[5,6],[7],[8],[10],[9]],RAW_COUNT=11,ORIGINAL=[[{"kind":"cdDrawCurve","args":[33.7,28,29.6,72,15.66,104,0,7]}],[{"kind":"cdDrawLine","args":[27.96,64,85.36,64,2,0]}],[{"kind":"cdDrawLine","args":[54.2,14,54.2,186,0,0]}],[{"kind":"cdDrawCurve","args":[18.119999999999997,132,46,120,83.72,104,0,7]}],[{"kind":"cdDrawCurve","args":[128.85,25,109.95,72,68.1,106,132,7]}],[{"kind":"cdDrawLine","args":[101.175,25,138.3,25,0,100]}],[{"kind":"cdDrawCurve","args":[131.55,25,153.825,74,182.85,93,7,0]}],[{"kind":"cdDrawLine","args":[97.8,91,158.55,91,0,0]}],[{"kind":"cdDrawLine","args":[91.05,133,165.3,133,0,0]}],[{"kind":"cdDrawLine","args":[75.525,177,180.15,177,0,0]}],[{"kind":"cdDrawLine","args":[127.5,93,127.5,177,32,32]}]],TRACE_SHA256="4228a3afc2d0dc14f22a55808e216271154db4945b7a4e4da729f85c9cc5f39b",GROUPS_SHA256="bc830a55a04a4c78be0520cb5d3ce0bbfb920bf35afa17e8e4b13f865595f7cd",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot="u7277",sourceGroups=[[0],[1],[2],[3],[4],[5,6],[7],[8],[10],[9]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){
 assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,FACTORY_MAP);assert.deepEqual(T.sourceGroups,sourceGroups)
 assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.deepEqual(proof,json(identity.file))
 const s=json("../hanja-goal-glyphwiki-batch848-2026-10-13/sources.json");assert.equal(s.root,sourceRoot);assert.equal(s.glyph,T.glyph);assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.equal(Object.keys(s.records).length,T.sourceFamily.records);assert.equal(s.providerVersions.length,T.sourceFamily.providerVersions);const closure=[];function visit(n){if(closure.includes(n))return;closure.push(n);assert(s.records[n]);const d=s.records[n].data;if(d.startsWith('[[')&&d.endsWith(']]'))visit(d.slice(2,-2));else for(const row of d.split('$'))if(row.startsWith('99:'))visit(row.split(':')[7])}visit(sourceRoot);assert.deepEqual(closure,T.sourceFamily.selectedRootClosure)
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
export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(geometryRuns,0);const rawBaseline=generateGeometry(trace,proof,identity);const baseline=FACTORY_MAP.map(ix=>ix.flatMap(i=>rawBaseline[i]));geometryRuns++;return{rawBaseline,baseline}}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const f=json('./fixtures.json')[sourceRoot];assert.equal(digest(f.fullProof),FIXED_PROOF_SHA);assert.deepEqual(f.fullProof,proof);assert.equal(T.rawBaselineSHA256,FIXED_RAW_SHA);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_BASELINE_SHA);assert.equal(digest(f.rawBaseline),FIXED_RAW_SHA);assert.equal(digest(f.baseline),FIXED_BASELINE_SHA);assert.deepEqual(f.originalOrderBaseline,f.rawBaseline);assert.deepEqual(f.baseline,FACTORY_MAP.map(ix=>ix.flatMap(i=>f.rawBaseline[i])));assert.deepEqual(f.strokes,f.baseline);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return 0}
export function cachedPositiveCallCount(){return cachedCalls}
