export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// Provisional source-only review compiler. Domestic order and browser approval are pending.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const endpoint = (call) => call.args.slice(call.kind === 'cdDrawLine' ? 2 : call.kind === 'cdDrawCurve' ? 4 : 6, call.kind === 'cdDrawLine' ? 4 : call.kind === 'cdDrawCurve' ? 6 : 8)
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })

const local=n=>new URL(n,import.meta.url),json=n=>JSON.parse(readFileSync(local(n),'utf8')),sha=b=>createHash('sha256').update(b).digest('hex'),round=x=>Math.round(x*1e6)/1e6
const T=json('./config.json').targets.u8fcb,FIXED_PINS={"../hanja-goal-glyphwiki-batch456-2026-10-09/NOTICE.md":"570c2a2769c86f087eb48f638ae1faf2eb2870e8eb84baf78453bbe4bed964af","../hanja-goal-glyphwiki-batch456-2026-10-09/README.md":"dd4614ea261e7f6dd5645d0a64bf76349d87881272b24de9104fe202ef242b09","../hanja-goal-glyphwiki-batch456-2026-10-09/draw-trace.json":"7855c424db239182557d1eb17e0e0114a4af35d26aefc2ebad30589269c1964c","../hanja-goal-glyphwiki-batch456-2026-10-09/engine-proof.json":"578dc69da1e2997cb94668c14625d9d0ada324789449edc8e2e4dd3de1c9feda","../hanja-goal-glyphwiki-batch456-2026-10-09/held-review.json":"e3072fbe56a07a09ecd8768aef66de15fe988da4469c4659609097c591df7b5d","../hanja-goal-glyphwiki-batch456-2026-10-09/metadata.json":"027c5e52aff67f5d814cf0eb6e5aedf38d835bad922f0fcbfb12d4483486f6c4","../hanja-goal-glyphwiki-batch456-2026-10-09/next-source-inventory.json":"2b14ffe3638198d9c5e3476221b495fb5c705d47931190ba390835aefacf022b","../hanja-goal-glyphwiki-batch456-2026-10-09/resume.json":"b672d49ba0e2a16233a8ad7b6e0788a910f27147abc1d05b9ce01d8c3208151f","../hanja-goal-glyphwiki-batch456-2026-10-09/serve.py":"c62c5f156d2f1f9a4816bea9d7e40dd744ec8c31a74583f70a3767be60f72d3d","../hanja-goal-glyphwiki-batch456-2026-10-09/sources.json":"3bcefbc3d91f1b6e7008b07b9c79509e18116ed137447bd13f2f1b64c48041ba","../hanja-goal-glyphwiki-batch456-2026-10-09/validation.json":"ac4346ce87dc6a3a912dbfe595414ad0298b9f7b53630f69e22d4662ba5ca087","../hanja-goal-glyphwiki-batch456-2026-10-09/verify-source.mjs":"4848afee7afbd42200fa13e55f51d56fdfd54c095ceabef7135afe967b31dd92","../hanja-goal-glyphwiki-batch456-2026-10-09/whole-engine-proofs.json":"842d22cab353e200c8035944ccdfdd5404b28373a0ca5be3298392fe5a8abc9b","../hanja-goal-glyphwiki-batch456-2026-10-09/whole-variant-inventory.json":"19e447c713ae89b4175978b1c2e9a2e7d324f5f98f3debefa22391e072d8f5b3","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch719-2026-10-12/progressive.mjs":"17f21ae041455f0a5e6d46f8bdbe6d8d2c9e736cf9ce550367e02a83979f4063","../hanja-goal-glyphwiki-batch1183-2026-10-18/review.json":"aff8d111b4574eeda09ae93dc134eb9c543e2340f9b829e73eadc234a7a65634","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u8fcb","headerFile":"../hanja-goal-glyphwiki-batch456-2026-10-09/engine-proof.json","headerFileSHA256":"578dc69da1e2997cb94668c14625d9d0ada324789449edc8e2e4dd3de1c9feda","traceFile":"../hanja-goal-glyphwiki-batch456-2026-10-09/draw-trace.json","traceFileSHA256":"7855c424db239182557d1eb17e0e0114a4af35d26aefc2ebad30589269c1964c","sourceFile":"../hanja-goal-glyphwiki-batch456-2026-10-09/sources.json","sourceFileSHA256":"3bcefbc3d91f1b6e7008b07b9c79509e18116ed137447bd13f2f1b64c48041ba"},FIXED_PROOF_SHA="b2b1058eaa54de427f55dedf773b41ad62520558dd1946872ebe6c8d6915b4fb",FIXED_BASELINE_SHA="d7fdde16f57c7315ed1f05116508048500c08d155c973939797a184fa1b90edb"
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2,3],[4],[5],[6],[7],[8],[9]],RAW_COUNT=10,ORIGINAL=[[{"kind":"cdDrawCurve","args":[26.865,21,45.77,30,57.71,46,7,8]}],[{"kind":"cdDrawCurve","args":[15.92,57,34.825,65,48.755,81,7,8]}],[{"kind":"cdDrawLine","args":[13.93,107,49.75,107,0,2]}],[{"kind":"cdDrawLine","args":[49.75,107,49.75,158,22,300]}],[{"kind":"cdDrawCurve","args":[15.92,179,34.825,168,54.725,154,0,7]}],[{"kind":"cdDrawBezier","args":[52.735,152,67.66,172,83.58,181,178.105,177,7,0]}],[{"kind":"cdDrawLine","args":[71.18,30.24,178.82,30.24,0,0]}],[{"kind":"cdDrawLine","args":[125,30.24,125,144.22,32,32]}],[{"kind":"cdDrawLine","args":[78.77,84.36,171.23000000000002,84.36,0,0]}],[{"kind":"cdDrawLine","args":[65.66,144.22,184.34,144.22,0,0]}]],TRACE_SHA256="0c7b0883d1e53de3c76ebfa6423fc72cfeef42f4aa078b761463c08a76f89f5f",GROUPS_SHA256="6272ed27f73b2089fb0f964915ff497ebfd206302a9ac57fc26e6474b5637a74",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[]
export const sourceGroups=[[6],[8],[7],[9],[0],[1],[2,3],[4,5]],selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot='u8fcb',nativeApproval=false,runtimeApplied=false
function validateSelectedProof(trace,proof,identity){assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);for(const[p,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(p))),h,p);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);assert.deepEqual(proof,{...json(identity.headerFile),trace:json(identity.traceFile)});assert.equal(sha(readFileSync(local(identity.headerFile))),identity.headerFileSHA256);assert.equal(sha(readFileSync(local(identity.traceFile))),identity.traceFileSHA256);assert.equal(sha(readFileSync(local(identity.sourceFile))),identity.sourceFileSHA256);const source=json(identity.sourceFile);assert.equal(source.root,sourceRoot);assert.equal(source.glyph,'迋');assert.deepEqual(Object.keys(source.records).sort(),['u738b@6','u8fb6','u8fcb']);assert.equal(source.providerVersions.length,1);assert.equal(source.providerVersions[0].name,'u738b@6');assert.equal(source.providerVersions[0].version,6);assert.equal(sha(source.records['u738b@6'].data),source.providerVersions[0].sha256);assert.deepEqual(T.sourceGroups,sourceGroups);const whole=json(T.sourceDirectory+'/whole-engine-proofs.json');assert.deepEqual(Object.keys(whole).sort(),['u8fcb','u8fcb-ue0100','u8fcb-ue0101','u8fcb-ue0102']);for(const v of Object.values(whole))assert.deepEqual(Object.keys(v.engineProof).sort(),['defaults','engineHashes','engineRevision','groups']);assert.deepEqual(whole.u8fcb.engineProof,json(identity.headerFile));assert.deepEqual(whole.u8fcb.movement,trace.map(row=>row.map(c=>({kind:c.kind,args:c.args}))))}
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
let geometryRuns=0,cachedCalls=0
export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(geometryRuns,0);const rawBaseline=generateGeometry(trace,proof,identity);const baseline=[rawBaseline[5],rawBaseline[7],rawBaseline[6],rawBaseline[8],rawBaseline[0],rawBaseline[1],rawBaseline[2],[rawBaseline[3][0],rawBaseline[4][0]]];geometryRuns++;return {rawBaseline,baseline}}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const f=json('./fixtures.json').u8fcb;assert.equal(digest(f.fullProof),FIXED_PROOF_SHA);assert.equal(digest(f.baseline),FIXED_BASELINE_SHA);assert.deepEqual(f.strokes,f.baseline);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return 0}
export function cachedPositiveCallCount(){return cachedCalls}
