export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
// Provisional source-only review compiler. Domestic order and browser approval are pending.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const endpoint = (call) => call.args.slice(call.kind === 'cdDrawLine' ? 2 : call.kind === 'cdDrawCurve' ? 4 : 6, call.kind === 'cdDrawLine' ? 4 : call.kind === 'cdDrawCurve' ? 6 : 8)
const point = (x, y) => ({ x: Math.floor(x * 10) / 10, y: Math.floor(y * 10) / 10, off: 0 })


const local=n=>new URL(n,import.meta.url),json=n=>JSON.parse(readFileSync(local(n),'utf8')),sha=b=>createHash('sha256').update(b).digest('hex')
const T=json('./config.json').targets.u86b3,FIXED_PINS={"../hanja-goal-glyphwiki-batch890-2026-10-13/NOTICE.md":"038e1d184a940f151e27e7909732e0d4f9ededef93519b43ff2a11d1ac29d6e2","../hanja-goal-glyphwiki-batch890-2026-10-13/README.md":"27ab8a6d4dfb3999c01247788454b71cc3a6266a190931e4ff0de2b70c6601fa","../hanja-goal-glyphwiki-batch890-2026-10-13/candidate-compile-analysis.json":"52536dcfcd17025e7ae8a3c6bfa1890cee089fe94fde7205df25b9d2f2fdf5b8","../hanja-goal-glyphwiki-batch890-2026-10-13/engine-proof.json":"480f607c5d5a30836e0b6fc7f1dd09050a85e7f1dd52975cf6c528d7a7412c69","../hanja-goal-glyphwiki-batch890-2026-10-13/engine-whole-u86b3-ue0100.json":"67d19876a451ded3d1b1257e57b16fab1551097a14fc6848e488af274270eb16","../hanja-goal-glyphwiki-batch890-2026-10-13/engine-whole-u86b3.json":"67d19876a451ded3d1b1257e57b16fab1551097a14fc6848e488af274270eb16","../hanja-goal-glyphwiki-batch890-2026-10-13/metadata.json":"b0482ef4feff8864f384c31625aeddede0ef48b229fcc1f43f31dbb2cdcdf912","../hanja-goal-glyphwiki-batch890-2026-10-13/native-server-preflight-source-analysis.json":"54fb7f337471da5b5eb37a1d20792ea56567c9b093c32e0dbae9e4d171f1927c","../hanja-goal-glyphwiki-batch890-2026-10-13/progressive.mjs":"615e0097f24bcf9b02ee1b41f81207b6be06a454de4af43ec57b55af21afeab4","../hanja-goal-glyphwiki-batch890-2026-10-13/resume.json":"c2c5ee039728c2d0878526da8b2835191187df2c9c0b762cec8903917fa146ae","../hanja-goal-glyphwiki-batch890-2026-10-13/review.json":"6c1fe6a809fc0613db26cd386ff7707a9c1f5d2b14f0002f1a1557cf88615586","../hanja-goal-glyphwiki-batch890-2026-10-13/serve-progressive.py":"0754f217867dc87748c67fbe50133493c715cc133efd040a1dd86f37d39b7bdb","../hanja-goal-glyphwiki-batch890-2026-10-13/serve-whole.py":"b732248790611077f80d9049b653a98fb26e10e42dc3601a8bdf3cf65e9207db","../hanja-goal-glyphwiki-batch890-2026-10-13/source-analysis.json":"cc3c3a5e74718f658f98759d76058beb838c76cb2d2f5c5d9be17f82e404ec96","../hanja-goal-glyphwiki-batch890-2026-10-13/source-join-analysis.json":"01d1b9b9929263c6bec0cbda97f2c748997a1c497616fb7f51a97f0504be9d67","../hanja-goal-glyphwiki-batch890-2026-10-13/source-preservation-audit.json":"eeadcba844dff1f54a1ccc041bdd4c94cfed315acde6f4940c22fffb8de99025","../hanja-goal-glyphwiki-batch890-2026-10-13/sources.json":"a7a2bafcf88e8320023138c0d4993ef9dcf0b542717342eb858ae73d00391131","../hanja-goal-glyphwiki-batch890-2026-10-13/validation.json":"c9497d7ff3287ffc04b36d98cf10c13692dee5579cd85469f14c8ca1923ff3ca","../hanja-goal-glyphwiki-batch890-2026-10-13/verify-source.mjs":"1741f50eb362f9401b58aaf72805f0cff9ed560c191ffd12171ced34d097bbd8","../hanja-current-source-u4f8a-2026-10-18/progressive.mjs":"cc77d4853fc1e7f72e6931e14e441bee323886a0cc7f998986b6e1b1f35aec8f","../hanja-goal-glyphwiki-batch979-2026-10-13/progressive-terminal15-candidate.mjs":"94026c85f62937e2414ad474c04efe7ddbdbf63e833b73a5d4d0f5abfa094d70","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"root":"u86b3","file":"engine-proof.json","fileSHA256":"480f607c5d5a30836e0b6fc7f1dd09050a85e7f1dd52975cf6c528d7a7412c69"}
const ORIGINAL_SOURCE_GROUPS=[[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12]],RAW_COUNT=13,ORIGINAL=[[{"kind":"cdDrawLine","args":[23.875,55,23.875,110,12,13]}],[{"kind":"cdDrawLine","args":[23.875,55,74.625,55,2,2]}],[{"kind":"cdDrawLine","args":[74.625,55,74.625,110,22,323]}],[{"kind":"cdDrawLine","args":[23.875,110,74.625,110,2,2]}],[{"kind":"cdDrawLine","args":[49.25,14,49.25,158,0,32]}],[{"kind":"cdDrawCurve","args":[15.125,173,46.625,162,72.875,147,0,7]}],[{"kind":"cdDrawCurve","args":[61.5,125,77.25,144,79,169,7,8]}],[{"kind":"cdDrawCurve","args":[172.775,23,142.25,37,105.95,42,0,7]}],[{"kind":"cdDrawLine","args":[105.95,42,105.95,150,12,32]}],[{"kind":"cdDrawCurve","args":[86.975,155,109.25,150,139.775,137,0,7]}],[{"kind":"cdDrawLine","args":[105.95,90,188.45,90,2,0]}],[{"kind":"cdDrawCurve","args":[141.425,34,141.425,156,181.85,170,32,15]}],[{"kind":"cdDrawLine","args":[86.975,177,160.4,177,0,0]}]]
const TRACE_SHA256="aaa3e7e839b2ad81994cfe2a15f6b67f77a35ff5256c8c75ee5d7b888d121098",GROUPS_SHA256="0153848f7c32a757fb8ab6b7a7ec54876a1c052760cd115836cb25c9a8544a9a",FIXED_PROOF_SHA="a4a4a5113b7f0b4661424d548ed5358995e85e1b31c091b3e3f2bf2ea2cd2ebc"
const PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"}
const UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[],FIXED_TERMINALS=[{"raw":11,"call":0,"pen":10,"maskIndex":0,"args":[141.425,34,141.425,156,181.85,170,32,15],"kind":"cdDrawCurve","originalPenMasks":1}]
const FIXED_BASELINE_SHA="4b05d3e8c37d5ac49681213fc2d49d430431e2b9d92ac2ddcfdd40cddc8af072",FIXED_DERIVED_SHA="5a68de870e39e9245f4b7b414924db0ab9cf57906fe8536bdc37035726105c37"
function validateSelectedProof(trace,proof,identity){
 assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.factorySourceGroups,ORIGINAL_SOURCE_GROUPS);assert.deepEqual(T.sourceGroups,sourceGroups);assert.deepEqual(T.terminals,FIXED_TERMINALS);assert.equal(T.baselineSHA256,FIXED_BASELINE_SHA);assert.equal(T.derivedSHA256,FIXED_DERIVED_SHA);
 assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),FIXED_PROOF_SHA);assert.equal(T.fullProofSHA256,FIXED_PROOF_SHA);assert.deepEqual(trace,proof.trace);for(const[f,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(local(f))),h,f);assert.equal(sha(readFileSync(local(T.sourceDirectory+'/'+identity.file))),identity.fileSHA256);assert.deepEqual(proof,json(T.sourceDirectory+'/'+identity.file));const s=json(T.sourceDirectory+'/sources.json');assert.equal(s.root,sourceRoot);assert.equal(s.glyph,'蚳');assert.deepEqual(s.missing,[]);assert.deepEqual(s.aliases,[]);assert.equal(Object.keys(s.records).length,4);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])
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
 assert.deepEqual(canonicalPolys(result),canonicalPolys(baseline));assert.deepEqual(canonicalPolys(result),proof.groups.flatMap(g=>g.polygons).map(canonical).sort());for(let i=0;i<baseline.length;i++)if(i!==9)assert.deepEqual(result[i],baseline[i]);assert.equal(result.length,11);assert.equal(result.flat().length,13);return result
}
let geometryRuns=0,deriveRuns=0,cachedCalls=0
export const selectedProofIdentity=structuredClone(EXPECTED_IDENTITY),sourceRoot='u86b3',sourceGroups=[[0],[1,2],[3],[4],[5],[6],[7],[8,9],[10],[11],[12]],nativeApproval=false,runtimeApplied=false
export function captureGeometry(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(geometryRuns,0);const rawBaseline=generateGeometry(trace,proof,identity);assert.equal(rawBaseline.length,12);assert(rawBaseline.every(p=>p.length===1));assert.notDeepEqual(endpoint(trace[8][0]),trace[9][0].args.slice(0,2));assert.deepEqual(endpoint(trace[7][0]),trace[8][0].args.slice(0,2));const baseline=[...rawBaseline.slice(0,7),[rawBaseline[7][0],rawBaseline[8][0]],...rawBaseline.slice(9)];assert.deepEqual(baseline.flat(),rawBaseline.flat());assert.equal(baseline.length,11);assert.equal(baseline.flat().length,12);geometryRuns++;return{rawBaseline,baseline}}
export function deriveTerminal(...args){assert.equal(args.length,4);const[baseline,trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);assert.equal(digest(baseline),FIXED_BASELINE_SHA);assert.equal(deriveRuns,0);const result=partitionTerminal(trace,proof,{sourceGroups,terminals:FIXED_TERMINALS},baseline);deriveRuns++;return result}
export function compileProgressive(...args){assert.equal(args.length,3);const[trace,proof,identity]=args;validateSelectedProof(trace,proof,identity);const f=json('./fixtures.json').u86b3;assert.equal(digest(f.fullProof),FIXED_PROOF_SHA);assert.equal(digest(f.baseline),FIXED_BASELINE_SHA);assert.equal(digest(f.strokes),FIXED_DERIVED_SHA);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function sourceCompileCallCount(){return geometryRuns}
export function geometryDerivationCallCount(){return deriveRuns}
export function cachedPositiveCallCount(){return cachedCalls}
