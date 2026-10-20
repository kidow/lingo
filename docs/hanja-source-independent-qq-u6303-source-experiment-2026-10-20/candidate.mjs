export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'
import {readFileSync} from 'node:fs'
const digest=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex')
const sha=value=>createHash('sha256').update(value).digest('hex')
const local=n=>new URL(n,import.meta.url),json=n=>JSON.parse(readFileSync(local(n),'utf8'))
const endpoint=call=>call.args.slice(call.kind==='cdDrawLine'?2:call.kind==='cdDrawCurve'?4:6,call.kind==='cdDrawLine'?4:call.kind==='cdDrawCurve'?6:8)
const point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0})
const T=json('./config.json').targets.u6303,FIXED_PINS={"../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-goal-glyphwiki-batch901-2026-10-13/NOTICE.md":"415d8739b40f25543e221ebadd5501565df91d9e4dae0081ec4294ef69e0c199","../hanja-goal-glyphwiki-batch901-2026-10-13/README.md":"c485e50370c25aa4be83e3b06e03a6d2c0d38c515405235e5039f248bae82938","../hanja-goal-glyphwiki-batch901-2026-10-13/candidate-compile-analysis.json":"2e3dba230afadd632eb2d3808ad45c209571a9778322eade15f05877070427ad","../hanja-goal-glyphwiki-batch901-2026-10-13/engine-proof.json":"37bcba1d9a61def4d1628bae9474605484d73cc3e336965a2d604e2d9c91065f","../hanja-goal-glyphwiki-batch901-2026-10-13/engine-whole-u6303-ue0100.json":"37bcba1d9a61def4d1628bae9474605484d73cc3e336965a2d604e2d9c91065f","../hanja-goal-glyphwiki-batch901-2026-10-13/engine-whole-u6303.json":"37bcba1d9a61def4d1628bae9474605484d73cc3e336965a2d604e2d9c91065f","../hanja-goal-glyphwiki-batch901-2026-10-13/metadata.json":"de9098031184e55302770d6009c7463d581af21f03b3b152691499444d088a05","../hanja-goal-glyphwiki-batch901-2026-10-13/native-server-preparation-source-analysis.json":"61c4af3f742ba284df4517ba64fdab6d064bcc8732e5330c67a0ebd0ae37ad16","../hanja-goal-glyphwiki-batch901-2026-10-13/native-server-validation.json":"c60e84a9657c389e0192c5ee4b8b3d3e6a77117c26856fba1c6f0d9e3a903922","../hanja-goal-glyphwiki-batch901-2026-10-13/resume.json":"a17d03dab30951ccd724989836b992df111473f21aeb3e435e11168c9058a89a","../hanja-goal-glyphwiki-batch901-2026-10-13/review.json":"00b825d75760c62459eb0df62f705868f4b8416bdc7aad33bd3aa4274c193919","../hanja-goal-glyphwiki-batch901-2026-10-13/serve-whole.py":"5c2df399bf113130719711a9ea12f727e514aa635e65a36d4868e0c4d8279513","../hanja-goal-glyphwiki-batch901-2026-10-13/source-analysis.json":"841c5572f280d50ec17bd5f7e223e9f28d4771c3544ff09fba3086b6a7708062","../hanja-goal-glyphwiki-batch901-2026-10-13/source-join-analysis.json":"dccca185b184543e0ed8cf12db0bfa8f544528debd4a439b5f4db8776adfbfd2","../hanja-goal-glyphwiki-batch901-2026-10-13/sources.json":"6867c993f63ac8f225d345b825b9fd9bf9a9dfbb5569246437fbf804131078cb","../hanja-goal-glyphwiki-batch901-2026-10-13/validation.json":"9aef7cf7b3820c15924924a9a8ed90380a8dd7fb7661f9e693dc320d87f03991","../hanja-goal-glyphwiki-batch901-2026-10-13/verify-source.mjs":"00e202995a1c6cff562a1ad270cce2fc0533ec00c72273281807f2a3ac07e3f9","../hanja-source-independent-lq-u981e-source-experiment-2026-10-19/candidate.mjs":"e76180f741b37cf2712b97a8cb412a65185eccb3a37664aab1d08f396d55a020","../hanja-source-native-raw-correspondence-u6303-2026-10-20/README.md":"4f7c7b4b230db0ec8696810667d02ef3fdca32ec10ad3a9a7a52f61dc721c9fa","../hanja-source-native-raw-correspondence-u6303-2026-10-20/review.json":"d08841d1543928ba060c3e077ff133361528991bce03308e36fd77d4281b6398","../hanja-source-raw-compare-u6303-2026-10-20/README.md":"0278baff24dc1da0ede1bb3c0874b1d083708cce786d5f6aa4645c0e4ccd0be0","../hanja-source-raw-compare-u6303-2026-10-20/check.mjs":"9beeb4067b402231d50d2f0d656ab7e334022ba26ff4c8158eb36480f9b5b424","../hanja-source-raw-compare-u6303-2026-10-20/config.json":"867638312a47e8353e81b1c085ae2385aac92738a0d7ec66ef1853014c9655e9","../hanja-source-raw-compare-u6303-2026-10-20/serve.py":"bf84bbe073d42412ce1fc79a384b280defb98aca303106b026cb04cb086fe600","../hanja-source-raw-compare-u6303-2026-10-20/validation.json":"536ee2d58b383a044be4f735618bd5cb93f98f4381fe3e44b1eff840d4f6d623","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c"},EXPECTED_IDENTITY={"root":"u6303","file":"../hanja-goal-glyphwiki-batch901-2026-10-13/engine-whole-u6303.json","fileSHA256":"37bcba1d9a61def4d1628bae9474605484d73cc3e336965a2d604e2d9c91065f"},FIXED_PROOF_SHA="f358eea0c2aa82ddda26b3cbc31bad276958782c5d9a5a519f5092fea6b34ebf",FIXED_RAW_SHA="4d928e11a64372091beb099b0408eae1431f7b493927cecdfa9b91adf6e6d80c",FIXED_BASELINE_SHA="d5d64efcd4de35b20b8097a5dcf9635d60b04e6500ab76bf1f8bafbc62a122de"
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9]],FACTORY_MAP=[[0],[1],[2],[3],[4,5],[6],[7],[8],[9]],RAW_COUNT=10,ORIGINAL=[[{"kind":"cdDrawLine","args":[14.325,55,77.4,55,0,0]}],[{"kind":"cdDrawLine","args":[45.5,15,45.5,171,0,1]},{"kind":"cdDrawCurve","args":[45.5,171,45.5,181,35.5,181,1,314]}],[{"kind":"cdDrawCurve","args":[15.05,122,47.675,107,77.4,91,0,7]}],[{"kind":"cdDrawLine","args":[81.525,33,184.725,33,0,0]}],[{"kind":"cdDrawCurve","args":[126.67500000000001,33,114.85,59,95.5,90,132,7]}],[{"kind":"cdDrawCurve","args":[81.525,93,120.225,86,166.45,77,0,7]}],[{"kind":"cdDrawCurve","args":[146.025,50,168.6,71,176.125,96,7,8]}],[{"kind":"cdDrawLine","args":[83.675,133,177.2,133,0,0]}],[{"kind":"cdDrawLine","args":[127.75,99,127.75,179,0,32]}],[{"kind":"cdDrawLine","args":[64.325,179,187.95,179,0,0]}]],TRACE_SHA256="73436a2b7253effabf3cebf370c5172d185419dfecc27727d743d961d6e136fa",GROUPS_SHA256="e70de19e6d3b5fcd500ea2f58f26e1af508cbf924624e26450d17960bca4507c",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot="u6303",sourceGroups=[[0],[1],[2],[3],[4,5],[6],[7],[8],[9]],nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){
 assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.factoryGroupMap,FACTORY_MAP);assert.deepEqual(T.sourceGroups,sourceGroups)
 assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.deepEqual(proof,json(identity.file))
 const s=json("../hanja-goal-glyphwiki-batch901-2026-10-13/sources.json");assert.equal(s.root,sourceRoot);assert.equal(s.glyph,T.glyph);assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.equal(Object.keys(s.records).length,T.sourceFamily.records);assert.equal(s.providerVersions.length,T.sourceFamily.providerVersions);const closure=[];function visit(n){if(closure.includes(n))return;closure.push(n);assert(s.records[n]);const d=s.records[n].data;if(d.startsWith('[[')&&d.endsWith(']]'))visit(d.slice(2,-2));else for(const row of d.split('$'))if(row.startsWith('99:'))visit(row.split(':')[7])}visit(sourceRoot);assert.deepEqual(closure,T.sourceFamily.selectedRootClosure)
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
