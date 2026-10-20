export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs';
import assert from 'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';
const json=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=x=>createHash('sha256').update(x).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const T=json('./config.json').targets.u90b0,FIXED_PINS={"../hanja-goal-glyphwiki-batch966-2026-10-13/metadata.json":"a28874e1211ca62b9d729f76cff1f7ef36814f2b5d19ae9fcb95534cd2df106a","../hanja-goal-glyphwiki-batch966-2026-10-13/sources.json":"ee22b47b40dc4fe36db71060e76c0bac0ad91631c2f30218000ec239d2018071","../hanja-goal-glyphwiki-batch966-2026-10-13/engine-proof.json":"d137e247819ed2a62185f045fb97dc24f48632cfbb1d210f6cdb6ffe88d58e8d","../hanja-goal-glyphwiki-batch966-2026-10-13/engine-whole-u90b0.json":"b19f2a5114acb5851aaac25d09b003366d73b2f5f0e70205772716d58313b5c2","../hanja-goal-glyphwiki-batch966-2026-10-13/source-hold.json":"d67f66196ccf26c93e281fb0cff09395da56cae2119ad520effc43b68e6d5359","../hanja-goal-glyphwiki-batch966-2026-10-13/source-join-analysis.json":"282547bb2b64547a3a0df414f1d46b7c995ae56ac83c4b24c82ea2ba4f0579f1","../hanja-goal-glyphwiki-batch966-2026-10-13/strict-native-adapter.mjs":"606a02da54b7271ee3ce312088a12003c7be2b50685d3e3a8fd251ddce5830f5","../hanja-goal-glyphwiki-batch966-2026-10-13/strict-native-server-preflight.json":"e3edc166acca52ff061d3a30541490b8accc4fbcfa4f1e640489dea096a188b7","../hanja-goal-glyphwiki-batch966-2026-10-13/source-preservation-audit.json":"11b0bf2494a3416e9d43d121fac014ce239cfe5002ab985ba7b8150e42efdbd2","../hanja-goal-glyphwiki-batch966-2026-10-13/NOTICE.md":"302f9d22f9b97b96ca47b575c26e276063cc4634f63fb7b9aa8ab94eba016e6a","../hanja-goal-glyphwiki-batch966-2026-10-13/README.md":"115e08a9f9845de559a9e4cd99c1584e234c1fbd48cfc3fba41fa07efc263d87","../hanja-goal-glyphwiki-batch966-2026-10-13/resume.json":"a4517ee7bd91575ddfab398ca83926a448779784997b31bb89df8cb4bc598641","../hanja-goal-glyphwiki-batch966-2026-10-13/validation.json":"418ffa7391698317e579d04dfd18b0a0a7a7c0fb4d6fd20e0a966a808ae79c06","../hanja-source-raw-compare-u8407-2026-10-21/serve.py":"4182a96bb77041c58f632f1c01822d8c25feaad9bf9a0e80d7527d9da9c39842","../hanja-source-raw-compare-u8407-2026-10-21/check.mjs":"1795128dc88ba9db5bc1c63e75fa63ebd582e1969bf2fe1713fe7b76cd0a112f","../hanja-source-raw-compare-u90b0-2026-10-21/config.json":"106275d99eecd81a1b638ee1870934bab46fe385988757e94e17109dcf32b3c8","../hanja-source-raw-compare-u90b0-2026-10-21/serve.py":"367b11b29ec0f7f1477979ce5513f4503f68cdb5e7dd5979a4fae00e2eea55f5","../hanja-source-raw-compare-u90b0-2026-10-21/check.mjs":"4764d85b7a211bf94ee40af75dbc19beecb1f5f7bc92b53acd5e27dbbe0f6355","../hanja-source-raw-compare-u90b0-2026-10-21/README.md":"cd345db749abfcb7daa223892eba9247a6968cf3cb77190c7fdd06c815ff0101","../hanja-source-raw-compare-u90b0-2026-10-21/validation.json":"9bcd7df1f8ac2262515c7fe1d8f95ffd9711bb77f987588d4f667dcb764057c9","../hanja-source-native-raw-correspondence-u90b0-2026-10-21/README.md":"279a31a2d16baff71e6bd904191c86405837dc8bd4d281e649847d1b0940313c","../hanja-source-native-raw-correspondence-u90b0-2026-10-21/review.json":"ac80372f86dd7dd908c87324f387d03c181b40a69840e0ca37191f11d130423f","../hanja-goal-glyphwiki-batch966-2026-10-13/progressive.mjs":"fe1dc7c3d9c785ca691a1518df6d585f8ab64048744f87a632b178d5f54ff70d","../hanja-source-independent-qb-order-u905d-source-experiment-2026-10-21/candidate.mjs":"231322cccd25f898bd4056073ef26aec0381441557426963b9c95007a227d71a","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"sourceRoot":"u90b0","sourceProofFile":"engine-whole-u90b0.json","sourceProofFileSha256":"b19f2a5114acb5851aaac25d09b003366d73b2f5f0e70205772716d58313b5c2","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"d137e247819ed2a62185f045fb97dc24f48632cfbb1d210f6cdb6ffe88d58e8d"},EXPECTED_GROUPS=[[0,1],[2],[3],[4,5],[6],[7,8],[9],[10]],RAW_COUNT=11,ORIGINAL=[[{"kind":"cdDrawCurve","args":[57.97,17,48.62,49,30.855,86,0,7]}],[{"kind":"cdDrawCurve","args":[15.895,88,47.685,84,99.11,75,0,7]}],[{"kind":"cdDrawCurve","args":[73.865,39,96.305,61,106.59,93,7,8]}],[{"kind":"cdDrawLine","args":[31.537550000000007,113.61,31.537550000000007,171.39,12,113]}],[{"kind":"cdDrawLine","args":[31.537550000000007,113.61,92.81745,113.61,2,2]}],[{"kind":"cdDrawLine","args":[92.81745,113.61,92.81745,171.39,22,123]}],[{"kind":"cdDrawLine","args":[31.537550000000007,171.39,92.81745,171.39,2,2]}],[{"kind":"cdDrawLine","args":[124,28,176,28,2,2]}],[{"kind":"cdDrawCurve","args":[176,28,166,53,145,84,22,7]}],[{"kind":"cdDrawBezier","args":[145,83,183,99,182,133,175.9872611141445,146.82929943746765,7,1]},{"kind":"cdDrawCurve","args":[175.9872611141445,146.82929943746765,172,156,162,156,1,414]}],[{"kind":"cdDrawLine","args":[124,28,124,186,12,0]}]],TRACE_SHA256="54636108bd24ae79e78363bcf7ed4f5c59cab67096a7df90f15f4b02e872f2ca",GROUPS_SHA256="7cd12069622c6b21558f40376169cf12c4cd2d735fb60b7584b54a90ddb1ecff",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10]],UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[];
const endpoint=call=>call.args.slice(call.kind==='cdDrawLine'?2:call.kind==='cdDrawCurve'?4:6,call.kind==='cdDrawLine'?4:call.kind==='cdDrawCurve'?6:8),point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0});
const FIXED_RAW_SHA="3fad87709f7fddd638b298c4e30ba6d0472779996c4a333de7e33d66af941f5e",FIXED_COMPILED_SHA="de6862f71c830c487b390f34132364582066e8ee1610295405b2f7bcaa4cc19c",FIXED_PAYLOAD_SHA="0c50cea074b4df99c55d8658d427635e95be47451df187605c45e7b6073e13a2";
export const sourceRoot='u90b0',selectedProofIdentity=clone(EXPECTED_IDENTITY),sourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
function validateSelectedProof(trace,proof,identity){assert.equal(arguments.length,3);assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.sourceGroups,EXPECTED_GROUPS);assert.equal(T.actualFull5File,'../hanja-goal-glyphwiki-batch966-2026-10-13/engine-proof.json');assert.equal(T.selectedBody3File,'../hanja-goal-glyphwiki-batch966-2026-10-13/engine-whole-u90b0.json');assert.equal(T.actualFull5SHA256,'d137e247819ed2a62185f045fb97dc24f48632cfbb1d210f6cdb6ffe88d58e8d');assert.equal(T.selectedBody3SHA256,'b19f2a5114acb5851aaac25d09b003366d73b2f5f0e70205772716d58313b5c2');for(const[p,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h,p);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),'de50edca62f3307d3447546caa6a3e92f5fcac09cd8a002e94b798b09e22a7fc');assert.deepEqual(trace,proof.trace);const full=json(T.actualFull5File),body=json(T.selectedBody3File);assert.equal(sha(readFileSync(new URL(T.actualFull5File,import.meta.url))),T.actualFull5SHA256);assert.equal(sha(readFileSync(new URL(T.selectedBody3File,import.meta.url))),T.selectedBody3SHA256);assert.deepEqual(full,proof);assert.deepEqual(body,{groups:full.groups,trace:full.trace,defaults:full.defaults});}
function projectRaw(trace,proof,identity){const sourceGroups=ORIGINAL_SOURCE_GROUPS;
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
function mergeExact(raw,indices,trace){assert(indices.length===2);assert(EXPECTED_GROUPS.some(g=>JSON.stringify(g)===JSON.stringify(indices)));assert([[4,5],[7,8]].some(g=>JSON.stringify(g)===JSON.stringify(indices)));const calls=indices.flatMap(i=>trace[i]);assert.equal(calls.length,2);assert.deepEqual(endpoint(calls[0]),calls[1].args.slice(0,2),'no connector or positive gap joins');const parts=indices.map(i=>{assert.equal(raw[i].length,1);return raw[i][0]}),first=calls[0].args;return{outline:parts.map(p=>p.outline).join(' '),bounds:[Math.min(...parts.map(p=>p.bounds[0])),Math.min(...parts.map(p=>p.bounds[1])),Math.max(...parts.map(p=>p.bounds[2])),Math.max(...parts.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(parts.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:'M'+first[0]/2+' '+first[1]/2+' '+calls.map(c=>{const a=c.args;return c.kind==='cdDrawLine'?'L'+a[2]/2+' '+a[3]/2:c.kind==='cdDrawCurve'?'Q'+a[2]/2+' '+a[3]/2+' '+a[4]/2+' '+a[5]/2:'C'+a[2]/2+' '+a[3]/2+' '+a[4]/2+' '+a[5]/2+' '+a[6]/2+' '+a[7]/2}).join(' '),revealWidth:14}}
let projectionRuns=0,internalRawProjectorRuns=0,cachedCalls=0;
export function captureProjection(...args){assert.equal(args.length,3);validateSelectedProof(...args);assert.equal(projectionRuns,0,'author first projection only');projectionRuns++;internalRawProjectorRuns++;const[trace,proof,identity]=args,rawBaseline=projectRaw(trace,proof,identity),strokes=EXPECTED_GROUPS.map(g=>g.length===1?rawBaseline[g[0]]:g[0]===0?g.flatMap(i=>rawBaseline[i]):[mergeExact(rawBaseline,g,trace)]);return{fullProof:proof,rawBaseline,baseline:clone(strokes),strokes,traceProjectionOperations:1,newInternalRawProjectorExecutions:1,originalCompilerExecutions:0,existingFactoryCalls:0,engineRuns:0,tailDerivations:0,staticMappingApproved:true,nativeAnimationApproved:false,nativeApproval:false,runtimeApplied:false}}
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);assert.equal(T.rawBaselineSHA256,FIXED_RAW_SHA);assert.equal(T.derivedSHA256,FIXED_COMPILED_SHA);assert.equal(T.fixturePayloadSHA256,FIXED_PAYLOAD_SHA);const f=json('./fixtures.json').u90b0;assert.equal(digest(f),FIXED_PAYLOAD_SHA);assert.equal(digest(f.fullProof),T.fullProofSHA256);assert.equal(digest(f.rawBaseline),T.rawBaselineSHA256);assert.equal(digest(f.strokes),T.derivedSHA256);assert.deepEqual(f.baseline,f.strokes);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1))}
export function traceProjectionCallCount(){return projectionRuns}
export function newInternalRawProjectorCallCount(){return internalRawProjectorRuns}
export function cachedPositiveCallCount(){return cachedCalls}
export function originalSourceCompilerCallCount(){return 0}
export function existingFactoryCallCount(){return 0}
