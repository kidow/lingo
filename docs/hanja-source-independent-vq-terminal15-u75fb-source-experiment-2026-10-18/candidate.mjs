export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// Provisional source-only review compiler. Domestic order and browser approval are pending.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const endpoint = (call) => call.args.slice(call.kind === 'cdDrawLine' ? 2 : call.kind === 'cdDrawCurve' ? 4 : 6, call.kind === 'cdDrawLine' ? 4 : call.kind === 'cdDrawCurve' ? 6 : 8)
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })


const local=n=>new URL(n,import.meta.url),json=n=>JSON.parse(readFileSync(local(n),'utf8')),sha=b=>createHash('sha256').update(b).digest('hex')
const T=json('./config.json').targets.u75fb,FIXED_PINS={"../hanja-goal-glyphwiki-batch584-2026-10-11/NOTICE.md":"5b757380a551bde0bfc02e2d4bdc86addc9094edb2e0e11111b871b71e76ac60","../hanja-goal-glyphwiki-batch584-2026-10-11/README.md":"5ab55aa393d458fb41c896a3240207a55efd42ee4d1695841a221af4b64572a0","../hanja-goal-glyphwiki-batch584-2026-10-11/draw-trace.json":"e90034a07dec8cbf8c21dcd36facfd321847fd06610dcd685f4d14dc3b8db277","../hanja-goal-glyphwiki-batch584-2026-10-11/engine-proof.json":"7f066ce4faec6cf6bb4ced3ac2b0f3b56f2788f95e7a02b5e4e98be7803afa6a","../hanja-goal-glyphwiki-batch584-2026-10-11/engine-whole-u75fb-g.json":"d2afebd2b81c4c0287e784bb8e118354a2b120c4a1be9f9a06b53c188796d23f","../hanja-goal-glyphwiki-batch584-2026-10-11/engine-whole-u75fb-ue0100.json":"772aac52899d494857045052abb8172148bb27fffdea91d30aad39e10cbec21f","../hanja-goal-glyphwiki-batch584-2026-10-11/engine-whole-u75fb-ue0101.json":"6c6404d4c37e0659c6038ebacc54ec55806b3b0a5520847a1d7f0f3fb793f5b7","../hanja-goal-glyphwiki-batch584-2026-10-11/engine-whole-u75fb.json":"772aac52899d494857045052abb8172148bb27fffdea91d30aad39e10cbec21f","../hanja-goal-glyphwiki-batch584-2026-10-11/metadata.json":"61e43811ab640356e9e052e25851f6591f4d327081343f669d3a4869c99048ea","../hanja-goal-glyphwiki-batch584-2026-10-11/progressive-review.json":"1ea328c7966c141e68b464f3c964977c9c762d24e8b77dffe97087d785c6b2e7","../hanja-goal-glyphwiki-batch584-2026-10-11/resume.json":"80b0e764abb7f5b1d352bf46c5272d81570b14db8c41e6d590efcab2b8eb5e1b","../hanja-goal-glyphwiki-batch584-2026-10-11/serve-variants.py":"f09585f33179eb6040e436aeb59264505b1ee10b2430b5590912950964438ee1","../hanja-goal-glyphwiki-batch584-2026-10-11/sources.json":"8aa5b83ad6fcb3023845dce48ba6b01234b858f2898b4d9ad7e781eda5046247","../hanja-goal-glyphwiki-batch584-2026-10-11/validation.json":"8a65073f1acfcc501c80f5d9c5a0172746a90ae0d2ab6f860c883d6e2f4e774e","../hanja-goal-glyphwiki-batch584-2026-10-11/verify-source.mjs":"420b38555c664e9f3db91c0a5390dba279a5b0156e17382b87222e7b5364cb44","../hanja-goal-glyphwiki-batch584-2026-10-11/whole-variant-inventory.json":"b1496304a7eebf81083d3eb8eeaf028d8311e66b5f68f255c3762aa1b45c4684","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch979-2026-10-13/progressive-terminal15-candidate.mjs":"94026c85f62937e2414ad474c04efe7ddbdbf63e833b73a5d4d0f5abfa094d70","../hanja-goal-glyphwiki-batch719-2026-10-12/progressive.mjs":"17f21ae041455f0a5e6d46f8bdbe6d8d2c9e736cf9ce550367e02a83979f4063","../hanja-goal-glyphwiki-batch1183-2026-10-18/review.json":"aff8d111b4574eeda09ae93dc134eb9c543e2340f9b829e73eadc234a7a65634","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u75fb","file":"engine-whole-u75fb.json","fileSHA256":"772aac52899d494857045052abb8172148bb27fffdea91d30aad39e10cbec21f"}
const ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11,12],[13],[14]],RAW_COUNT=15,ORIGINAL=[[{"kind":"cdDrawLine","args":[110,13,110,39,0,32]}],[{"kind":"cdDrawLine","args":[48,39,186,39,2,0]}],[{"kind":"cdDrawLine","args":[48,39,48,98,12,1]},{"kind":"cdDrawCurve","args":[48,98,48,161,15,187,1,7]}],[{"kind":"cdDrawCurve","args":[14,54,27,64,32,85,7,8]}],[{"kind":"cdDrawCurve","args":[14,128,29,122,47,108,0,7]}],[{"kind":"cdDrawCurve","args":[154.19,53.6,120.38,62.96,80.36,67.64,0,7]}],[{"kind":"cdDrawLine","args":[80.36,67.64,80.36,116.78,12,32]}],[{"kind":"cdDrawCurve","args":[60.35,121.46,91.4,116.78,125.9,108.98,0,7]}],[{"kind":"cdDrawLine","args":[80.36,87.92,174.89,87.92,2,0]}],[{"kind":"cdDrawCurve","args":[122.45,62.96,122.45,115.22,174.2,127.7,32,15]}],[{"kind":"cdDrawLine","args":[86.21119999999999,129.47840000000002,86.21119999999999,173.5016,12,113]}],[{"kind":"cdDrawLine","args":[86.21119999999999,129.47840000000002,151.7888,129.47840000000002,2,2]}],[{"kind":"cdDrawLine","args":[151.7888,129.47840000000002,151.7888,173.5016,22,123]}],[{"kind":"cdDrawLine","args":[86.21119999999999,150.8426,151.7888,150.8426,2,2]}],[{"kind":"cdDrawLine","args":[86.21119999999999,173.5016,151.7888,173.5016,2,2]}]]
const TRACE_SHA256="33accd066aac926ddd245a2036ac6bfd9d90e497a11a3c8df76928534eb09f09",GROUPS_SHA256="9df5b2f76a3e7ababed461aa7a451fb72c06e289796965e52e931f01568f05ef",FIXED_PROOF_SHA="89e2fa55203a7bae4911f272807b41ced04de135aa0f0ed51745b87163e7e7dc"
const PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[],FIXED_TERMINALS=[{"raw":9,"call":0,"pen":9,"maskIndex":0,"args":[122.45,62.96,122.45,115.22,174.2,127.7,32,15],"kind":"cdDrawCurve","originalPenMasks":1}]
const FIXED_BASELINE_SHA="431ba1cb0b6fee71996bc8977a1ababbf729495f36e792062c319fe69d562b10",FIXED_DERIVED_SHA="17c9f37044d515cc4d4abf19dbbd32058b5356df51c9ee1489745f1278e8c69a"
function validateSelectedProof(trace,proof,identity){
 assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.sourceGroups,sourceGroups);assert.deepEqual(T.terminals,FIXED_TERMINALS);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_DERIVED_SHA);
 assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.equal(sha(readFileSync(local(T.sourceDirectory+'/'+identity.file))),identity.fileSHA256);assert.deepEqual(proof,json(T.sourceDirectory+'/'+identity.file));const s=json(T.sourceDirectory+'/sources.json');assert.equal(s.root,sourceRoot);assert.equal(s.glyph,'痻');assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.equal(Object.keys(s.records).length,12);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])
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

function partitionTerminal(trace,proof,p,baseline){
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

 const canonicalPolys=v=>v.flat().flatMap(mask=>contourPolygons(mask.outline)).map(c=>canonical(c.points)).sort()
 assert.deepEqual(canonicalPolys(result),canonicalPolys(baseline));assert.deepEqual(canonicalPolys(result),proof.groups.flatMap(g=>g.polygons).map(canonical).sort());for(let i=0;i<baseline.length;i++)if(i!==8)assert.deepEqual(result[i],baseline[i]);assert.equal(result.length,13);assert.equal(result.flat().length,15);return result
}
let geometryRuns=0,deriveRuns=0,cachedCalls=0
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot='u75fb',sourceGroups=[[0],[1],[2],[3],[4],[5],[6,7],[8],[9],[10],[11,12],[13],[14]],nativeApproval=false,runtimeApplied=false
export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(geometryRuns,0);const rawBaseline=generateGeometry(trace,proof,identity);assert.equal(rawBaseline.length,14);assert(rawBaseline.every(p=>p.length===1));assert.notDeepEqual(endpoint(trace[6][0]),trace[7][0].args.slice(0,2));assert.deepEqual(endpoint(trace[11][0]),trace[12][0].args.slice(0,2));const baseline=[...rawBaseline.slice(0,6),[rawBaseline[6][0],rawBaseline[7][0]],...rawBaseline.slice(8)];assert.deepEqual(baseline.flat(),rawBaseline.flat());assert.equal(baseline.length,13);assert.equal(baseline.flat().length,14);geometryRuns++;return{rawBaseline,baseline}}
export function deriveTerminal(...args){assert.equal(args.length,4);const[baseline,trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(digest(baseline),FIXED_BASELINE_SHA);assert.equal(deriveRuns,0);const result=partitionTerminal(trace,proof,{sourceGroups,terminals:FIXED_TERMINALS},baseline);deriveRuns++;return result}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const f=json('./fixtures.json').u75fb;assert.equal(digest(f.fullProof),FIXED_PROOF_SHA);assert.equal(digest(f.baseline),FIXED_BASELINE_SHA);assert.equal(digest(f.strokes),FIXED_DERIVED_SHA);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return deriveRuns}
export function cachedPositiveCallCount(){return cachedCalls}
