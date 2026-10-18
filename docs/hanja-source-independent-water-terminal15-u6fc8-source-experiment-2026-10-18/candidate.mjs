export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// Provisional source-only review compiler. Domestic order and browser approval are pending.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'

const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const endpoint = (call) => call.args.slice(call.kind === 'cdDrawLine' ? 2 : call.kind === 'cdDrawCurve' ? 4 : 6, call.kind === 'cdDrawLine' ? 4 : call.kind === 'cdDrawCurve' ? 6 : 8)
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })

function compileOriginalAndRegroup(trace, proof) {
  assert.deepEqual(originalNumericSourceGroups, ORIGINAL_SOURCE_GROUPS, "Pinned numeric source grouping; no native order approval")
  assert.equal(trace.length, RAW_COUNT)
  assert.equal(proof.groups.length, RAW_COUNT)
  assert.deepEqual(trace,proof.trace,'Selected complete whole trace must match, including empty metadata')
  assert.deepEqual(trace.map(row => row.map(call => ({ kind: call.kind, args: call.args }))), ORIGINAL)
  assert.equal(digest(trace), TRACE_SHA256, 'Every original trajectory and polygon must match the selected whole root')
  assert.equal(digest(proof.groups), GROUPS_SHA256)
  assert.deepEqual(proof.defaults, PINNED_DEFAULTS)
  assert.equal(proof.engineRevision, ENGINE_REVISION)
  assert.deepEqual(proof.engineHashes, ENGINE_HASHES)
  assert.equal(digest({engineRevision:proof.engineRevision,engineHashes:proof.engineHashes,groups:proof.groups,trace,defaults:proof.defaults}),WHOLE_PAYLOAD_SHA256,'The entire selected original body must match')
  const rawIndices = originalNumericSourceGroups.flat()
  assert.deepEqual([...rawIndices].sort((a, b) => a - b), Array.from({ length: RAW_COUNT }, (_, index) => index).filter(index=>!NON_DRAWING_SOURCE_ROWS.some(row=>row.raw===index)), 'Every drawing raw group must occur exactly once; empty metadata remains in the whole proof')
  for(const row of NON_DRAWING_SOURCE_ROWS){assert.deepEqual(trace[row.raw],[]);assert.deepEqual(proof.groups[row.raw].polygons,[]);assert.deepEqual(proof.groups[row.raw].raw,row.originalRaw)}
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
  const outlines = originalNumericSourceGroups.map(indices => {
    const tail = tails.get(JSON.stringify(indices))
    return tail ? [compile(indices, tail), segment([tail.polygon], tail.direction, tail.jump / 2)] : [compile(indices)]
  })
  const emittedPolygonCount = outlines.flat().reduce((sum, mask) => sum + (mask.outline.match(/M/g)?.length ?? 0), 0)
  assert.equal(emittedPolygonCount, trace.flatMap(calls => calls.flatMap(call => call.polygons)).length, 'Every original polygon must be emitted in exactly one mask')

  // Terminal13 is one original emitted polygon, not a separate authored tip.
  // Keep its full original bounds in a cardinal down mask; do not invent a curve connector or split geometry.
  for (const raw of SINGLE_CARDINAL_TIP_RAW) {
    const index = originalNumericSourceGroups.findIndex(indices => indices.length === 1 && indices[0] === raw);
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
  assert.equal(outlines.length,CATALOG_COUNT,'Numerical candidate count only; no domestic approval')
  const baseline=[outlines[0],outlines[1],[outlines[2][0],outlines[3][0]],[compile([4])],outlines[5],[compile([7])],...outlines.slice(6)]
  assert.equal(baseline.length,16);assert.equal(baseline.flat().length,17)
  return {originalNumericBaseline:outlines,baseline}
}

export const sourceRoot = "u6fc8"
export const originalNumericSourceGroups = [[0],[1],[2],[3],[4,7],[5,6],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17]]
const RAW_COUNT = 18
const CATALOG_COUNT = 16
const ORIGINAL_SOURCE_GROUPS = [[0],[1],[2],[3],[4,7],[5,6],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17]]
const NON_DRAWING_SOURCE_ROWS = []
const ORIGINAL = [[{"kind":"cdDrawCurve","args":[24.855,20,42.48,27,50.235,41,7,8]}],[{"kind":"cdDrawCurve","args":[11.46,66,30.495,73,37.545,87,7,8]}],[{"kind":"cdDrawCurve","args":[12.87,133,37.545,142,34.725,184,7,8]}],[{"kind":"cdDrawCurve","args":[31.2,150,34.019999999999996,138,63.63,67,32,7]}],[{"kind":"cdDrawLine","args":[72.31203400000001,22.8,72.31203400000001,55.2,12,313]}],[{"kind":"cdDrawLine","args":[72.31203400000001,22.8,109.74256600000001,22.8,2,2]}],[{"kind":"cdDrawLine","args":[109.74256600000001,22.8,109.74256600000001,55.2,22,223]}],[{"kind":"cdDrawLine","args":[72.31203400000001,55.2,109.74256600000001,55.2,2,2]}],[{"kind":"cdDrawLine","args":[58.843959999999996,75.55,123.63244,75.55,0,100]}],[{"kind":"cdDrawLine","args":[73.826296,75.55,73.826296,160.23000000000002,32,32]}],[{"kind":"cdDrawLine","args":[73.826296,102.56,107.03039199999999,102.56,2,2]}],[{"kind":"cdDrawLine","args":[73.826296,128.84,107.03039199999999,128.84,2,2]}],[{"kind":"cdDrawCurve","args":[59.248888,163.88,73.826296,160.23000000000002,107.03039199999999,152.2,0,7]}],[{"kind":"cdDrawLine","args":[107.03039199999999,75.55,107.03039199999999,185.78,32,0]}],[{"kind":"cdDrawLine","args":[126.0034,75,186.7796,69,0,0]}],[{"kind":"cdDrawCurve","args":[155.6848,21,169.1121,31,175.4724,48,7,8]}],[{"kind":"cdDrawBezier","args":[143.67090000000002,14,143.67090000000002,169,176.1791,180,182.5394,180,0,15]}],[{"kind":"cdDrawCurve","args":[174.76569999999998,95,154.27140000000003,169,109.74929999999999,188,0,7]}]]
const TRACE_SHA256 = "55e676856e15f409c3dc82e9090d31c6e3d0cab3512b74b8848defaf42e5bcd3"
const GROUPS_SHA256 = "a9810530464bbb725d220c4dbba84d9489bcde787d92da20019cb04f3ab6cd66"
const WHOLE_PAYLOAD_SHA256 = "b118b6e5d2aa88835b7d85400eaf330590da58972c238eb494764cb40409c7f8"
const PINNED_DEFAULTS = {"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5}
const ENGINE_REVISION = "49232bac0348fe815f4200d4116ab7917e0db47f"
const ENGINE_HASHES = {"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS = []
const LEFT_TAIL_GROUPS = []
const SINGLE_CARDINAL_TIP_RAW = []
const originalSourceProofFile = "engine-whole-u6fc8.json"
const originalSourceWholeFileSHA256 = "26241702ea2ecf023a5e4e1d106467f80a435e16e12c23eddb0929c5edc7fd64"
export const approvalStatus = "candidate-native-review-pending"

import{readFileSync}from'node:fs'
const read=f=>readFileSync(new URL(f,import.meta.url)),obj=f=>JSON.parse(read(f)),hash=v=>createHash('sha256').update(v).digest('hex'),CONFIG=obj('config.json'),T=CONFIG.targets.u6fc8
const EXPECTED_IDENTITY={"root":"u6fc8","file":"engine-proof.json","fileSHA256":"9bef99f1313a764285040f9edfd8e03d7e05db49c65eecc9280968700165894b"},FIXED_PINS={"../hanja-goal-glyphwiki-batch888-2026-10-13/NOTICE.md":"aee08bd1c78850078c26ffa3a1108390cd848ef43f12a254c63091d4c29b3b90","../hanja-goal-glyphwiki-batch888-2026-10-13/README.md":"94516d9d4bf0ed945828a3442946a5038e39af08f08128d46c0819bce0efb416","../hanja-goal-glyphwiki-batch888-2026-10-13/candidate-compile-analysis.json":"5fced523194e58e8e1e5c33ed52cb802d86e5378946e4834d83ce38bb4aa9498","../hanja-goal-glyphwiki-batch888-2026-10-13/engine-proof.json":"9bef99f1313a764285040f9edfd8e03d7e05db49c65eecc9280968700165894b","../hanja-goal-glyphwiki-batch888-2026-10-13/engine-whole-u6fc8-ue0100.json":"f5c006c1fea1e95c740df24368f62749d87c531b0dd55187076ee4cf74e518d1","../hanja-goal-glyphwiki-batch888-2026-10-13/engine-whole-u6fc8-ue0101.json":"0ba9cd052935e6a2c733bdac2fb0b45c35f3f3481c95d11fa5c943ee6f8674a4","../hanja-goal-glyphwiki-batch888-2026-10-13/engine-whole-u6fc8-ue0102.json":"8fd511b04dac0782fae85e069c56c96e98ed5363c91b9e20ae0a71953d578174","../hanja-goal-glyphwiki-batch888-2026-10-13/engine-whole-u6fc8.json":"26241702ea2ecf023a5e4e1d106467f80a435e16e12c23eddb0929c5edc7fd64","../hanja-goal-glyphwiki-batch888-2026-10-13/metadata.json":"f988b3d7809f6b13039f56ccba4fe3f36799b865cfcdbf8869cb6cf8e6a58f11","../hanja-goal-glyphwiki-batch888-2026-10-13/native-preflight-source-analysis.json":"10cd763f0e5142558ec56199088bdbb8895de07ea2e282ed042674285edee77a","../hanja-goal-glyphwiki-batch888-2026-10-13/native-server-preparation-source-analysis.json":"59aae61cfecc29b793af78780c5520d9e918eec54ec2694400032bc0ff72bbd3","../hanja-goal-glyphwiki-batch888-2026-10-13/progressive.mjs":"e889cb7edce580f2d1f85cd6ee663082ab5dd989cc7826ae2f930a398a0dfc9b","../hanja-goal-glyphwiki-batch888-2026-10-13/resume.json":"c37483b9004489d926b7a5ee88dd845e40d8f3fec27b31e9b71ace4040aff94b","../hanja-goal-glyphwiki-batch888-2026-10-13/review.json":"c383631f8d8cca5a99f8d727be2c3a2702a6242fab28e0cdae2c950597053e8d","../hanja-goal-glyphwiki-batch888-2026-10-13/serve-progressive.py":"3e92a3a83aeaf5bfc60a1c2848a1a684dd90545b032c7b1753082775b10b0d8d","../hanja-goal-glyphwiki-batch888-2026-10-13/serve-whole.py":"afe8d3adf46a117a6e2a07501de6150c985f5902edf1978cab19f52e6416b3f2","../hanja-goal-glyphwiki-batch888-2026-10-13/source-analysis.json":"1a083572a4252fe56b7359062a8aa4a0269e767ac98359b6e9da73bf543b2a5a","../hanja-goal-glyphwiki-batch888-2026-10-13/source-join-analysis.json":"dc87380dc646ca0000c887d78e075d1701b24eb1b40a97adf0f0b5199b024f9a","../hanja-goal-glyphwiki-batch888-2026-10-13/sources.json":"f7c4d3482efecb3eba7cff0dc65eb092dbc80ec4f36e01e3ea8ef651c81e9630","../hanja-goal-glyphwiki-batch888-2026-10-13/validation.json":"42d29f34dc6b9fad0739c0192e6ffff581ebb903e9c01063272934e7d5d8181d","../hanja-goal-glyphwiki-batch888-2026-10-13/verify-source.mjs":"b62e3096f10cc066dca87896beddaacf6460bd1657bf7bbab88110483515a189","../hanja-goal-glyphwiki-batch719-2026-10-12/progressive.mjs":"17f21ae041455f0a5e6d46f8bdbe6d8d2c9e736cf9ce550367e02a83979f4063","../hanja-goal-glyphwiki-batch1183-2026-10-18/review.json":"aff8d111b4574eeda09ae93dc134eb9c543e2340f9b829e73eadc234a7a65634","../../public/hanja-strokes/glyphwiki/u6de2.json":"237988ede60cd796e78a01662146cdde74d582bcf3bd979825475bd3255ea0d4","../hanja-goal-glyphwiki-batch979-2026-10-13/progressive-terminal15-candidate.mjs":"94026c85f62937e2414ad474c04efe7ddbdbf63e833b73a5d4d0f5abfa094d70","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09"},FIXED_PROOF_SHA="b118b6e5d2aa88835b7d85400eaf330590da58972c238eb494764cb40409c7f8"
const FIXED_DERIVED_SHA="2e0d36646e1218965e0e16894c201f150273eeaed4d956b61764c4cf82c78407",FIXED_REGROUPED_BASELINE_SHA="17acaa7f77697354f8c073b65d0f730542ba6c8937b4b2b8fd1de643684d0cf4"
export const SELECTED_PROOF_IDENTITY=Object.freeze({...EXPECTED_IDENTITY})
export const nativeApproval=false,runtimeApplied=false
export const sourceGroups=[[0],[1],[2,3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17]]
export const sourceProofFile=EXPECTED_IDENTITY.file,sourceWholeFileSHA256=EXPECTED_IDENTITY.fileSHA256
let derivations=0,cachedCalls=0
export const geometryDerivationCallCount=()=>derivations
export const cachedPositiveCallCount=()=>cachedCalls
export const sourceCompileCallCount=()=>0
function validate(trace,proof,identity){
 assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.sourceGroups,sourceGroups);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.equal(T.derivedSHA256,FIXED_DERIVED_SHA);assert.equal(T.regroupedBaselineSHA256,FIXED_REGROUPED_BASELINE_SHA)
 assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY)
 assert.equal(hash(read(T.sourceDirectory+'/'+identity.file)),identity.fileSHA256);assert.deepEqual(trace,proof.trace);assert.equal(hash(JSON.stringify(proof)),FIXED_PROOF_SHA)
 for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(hash(read(f)),h,f)
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
export function captureGeometry(trace,proof,identity){assert.equal(arguments.length,3);validate(trace,proof,identity);assert.equal(derivations,0);derivations++;const{originalNumericBaseline,baseline}=compileOriginalAndRegroup(trace,proof);assert.equal(hash(JSON.stringify(originalNumericBaseline)),T.originalNumericBaselineSHA256);const strokes=partitionTail(trace,proof,T,baseline);return{originalNumericBaseline,baseline,strokes}}
export function compileProgressive(trace,proof,identity){assert.equal(arguments.length,3);validate(trace,proof,identity);const f=obj('fixtures.json').u6fc8;assert.equal(hash(JSON.stringify(f.strokes)),FIXED_DERIVED_SHA);assert.equal(hash(JSON.stringify(f.baseline)),FIXED_REGROUPED_BASELINE_SHA);cachedCalls++;return f.strokes}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4);assert.equal(root,T.root);return compileProgressive(trace,proof,identity)}
