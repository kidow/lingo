export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs';
import assert from 'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';
const json=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=x=>createHash('sha256').update(x).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const T=json('./config.json').targets.u564b,FIXED_PINS={"../hanja-goal-glyphwiki-batch970-2026-10-13/metadata.json":"b139df4434f5960ebe72e64b62fd72cff104197ed5816bfa21cdab59a09c0586","../hanja-goal-glyphwiki-batch970-2026-10-13/sources.json":"fd573f1b95021f9f23dae3cda4f9fbdfec523fc8249c25636b96ac286b0c1725","../hanja-goal-glyphwiki-batch970-2026-10-13/NOTICE.md":"21a4537094d530817feb09e88594da72f90cf1bd31842d7d62719f9faeee3bba","../hanja-goal-glyphwiki-batch970-2026-10-13/README.md":"ea0c6774439170e86e42e2ce6a6195d67e63b66208de9df58ccc48cc532256a6","../hanja-goal-glyphwiki-batch970-2026-10-13/engine-proof.json":"1fc94a42491373532b26a978d70943bd9e23e3d4d882e0eedfb143587ec22110","../hanja-goal-glyphwiki-batch970-2026-10-13/engine-whole-u564b.json":"9e468c43ae57c61254b5ce92073ccf53e8d86c1c6c0ab254853a7059aa1c2410","../hanja-goal-glyphwiki-batch970-2026-10-13/engine-whole-u564b-ue0100.json":"11607fef8feac896c91dc9959b1cfa676eadc2734983f8c412906ada460ac638","../hanja-goal-glyphwiki-batch970-2026-10-13/candidate-compile-analysis.json":"204d6cbd5cc860d8adf80770277e5461c160214a18f3391782d41312be703088","../hanja-goal-glyphwiki-batch970-2026-10-13/source-hold.json":"a3136d3e15590af9e68408415dd11a4214a001a73284fcb8fea3d64412251691","../hanja-goal-glyphwiki-batch970-2026-10-13/source-join-analysis.json":"809499f83745c57605c6a63db2f0811e87beda040f746f9a1b321a5dd16bd3f8","../hanja-goal-glyphwiki-batch970-2026-10-13/source-preservation-audit.json":"7ec0c1ebad20410ac33925d2c28e75c4f82d27dd7cdbd291576a138f0b7f8a5b","../hanja-goal-glyphwiki-batch970-2026-10-13/validation.json":"0661fd46d95d8ef597b56c3039e7b1f21d1ca7950d14e5e1ea0698cc992b21eb","../hanja-goal-glyphwiki-batch970-2026-10-13/resume.json":"0075326f621a6f542e50a7a09f0b289e4230c6b160d7e809869d7d400e963117","../hanja-goal-glyphwiki-batch970-2026-10-13/strict-native-server-preflight.json":"9f5521ee97efdd9ed8d978deb0195f587242313352ced35dd497bb1272393528","../hanja-goal-glyphwiki-batch970-2026-10-13/strict-native-adapter.mjs":"7a67a39ab9a77a2a342baf7b9ec8443953425a6bb60d2c12af4c8a27123aa83a","../hanja-goal-glyphwiki-batch970-2026-10-13/progressive.mjs":"b6ad8b7b255d1a8752754f8a305fe5232eb8398706d0c82f2ccf4e5f2a39e349","../hanja-goal-glyphwiki-batch970-2026-10-13/serve-native.py":"9905bbed79b83c7ee8efdcc30ba29c1494562077c66d02a643ec547876f5df2b","../hanja-source-raw-compare-u90b0-2026-10-21/serve.py":"367b11b29ec0f7f1477979ce5513f4503f68cdb5e7dd5979a4fae00e2eea55f5","../hanja-source-raw-compare-u90b0-2026-10-21/check.mjs":"4764d85b7a211bf94ee40af75dbc19beecb1f5f7bc92b53acd5e27dbbe0f6355","../hanja-source-raw-compare-u564b-2026-10-21/README.md":"9260a3c8b41025cfab3173e9e14340f4339836805d77450affe401de28a7adc8","../hanja-source-raw-compare-u564b-2026-10-21/check.mjs":"2d58f4ad1bf96f343232df7951196824827c054b8fbc6a7f67dcb27bc7716703","../hanja-source-raw-compare-u564b-2026-10-21/config.json":"22c032fcd591b664ef305d55c1c82418a289d15d55a84e4fdac85251ebace681","../hanja-source-raw-compare-u564b-2026-10-21/serve.py":"eac29cfcfac49f5584dc3a67e3ab90b6c47920156563d6833bf6ae1f88832efc","../hanja-source-raw-compare-u564b-2026-10-21/validation.json":"a0d982f6de9b531210af5bec11a66da5715c58ce990ffb52c707e7bcb01346b6","../hanja-source-independent-hq-u68b2-source-experiment-2026-10-21/candidate.mjs":"ef255a8bdffa1bfda944e82251b861669229059e263381d499e714d8b85717e0","../hanja-source-independent-hq-u68b2-source-experiment-2026-10-21/source-check.mjs":"7ae700c928a174bd4b87cc612bb643dc09f72784c5c17f3e5e40a5b66cecf05f","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-source-native-raw-correspondence-u564b-2026-10-21/README.md":"d25006f1bec11100cb61463fb33138218fb03572b5c86e16557b2bfd98e3151a","../hanja-source-native-raw-correspondence-u564b-2026-10-21/review.json":"2b861f0e07247ceff1bc77470066f7c9f2deb7fdee2281bc8c667e3e3442df01"},EXPECTED_IDENTITY={"sourceRoot":"u564b","sourceProofFile":"engine-whole-u564b.json","sourceProofFileSha256":"9e468c43ae57c61254b5ce92073ccf53e8d86c1c6c0ab254853a7059aa1c2410","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"1fc94a42491373532b26a978d70943bd9e23e3d4d882e0eedfb143587ec22110"},EXPECTED_GROUPS=[[0],[1,2],[3],[4],[5],[6],[7,8],[10],[9,11],[12],[13],[14],[15],[16],[17]],FIXED_RAW_SHA='89d02cf8759d17014616cfa8479703a12dee2461120faa1a51b427e282c279e2',FIXED_COMPILED_SHA='519ad7f16c10a35732478a09a21f70e5636adac18c6df92df0f38c14ca818620',FIXED_PAYLOAD_SHA='3c13d01b0b145755614cf68588806eeaad307813ad14d907d3b85de11ce4107c';
export const sourceRoot='u564b',selectedProofIdentity=clone(EXPECTED_IDENTITY),sourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
function validateSelectedProof(trace,proof,identity){assert.equal(arguments.length,3);assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.sourceGroups,EXPECTED_GROUPS);for(const[p,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h,p);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),"f811054ce16f917d18994fec10f79c14fb8790a13bdea229f6cc92269cfde698");assert.deepEqual(trace,proof.trace);assert.equal(T.actualFull5File,'../hanja-goal-glyphwiki-batch970-2026-10-13/engine-proof.json');assert.equal(T.sourceDirectory,'../hanja-goal-glyphwiki-batch970-2026-10-13/');assert.equal(T.selectedBody3File,'../hanja-goal-glyphwiki-batch970-2026-10-13/engine-whole-u564b.json');assert.equal(sha(readFileSync(new URL(T.actualFull5File,import.meta.url))),"1fc94a42491373532b26a978d70943bd9e23e3d4d882e0eedfb143587ec22110");assert.deepEqual(json(T.actualFull5File),proof);assert.equal(sha(readFileSync(new URL(T.selectedBody3File,import.meta.url))),EXPECTED_IDENTITY.sourceProofFileSha256);const body=json(T.selectedBody3File);assert.deepEqual(Object.keys(body).sort(),['defaults','groups','trace']);for(const k of['defaults','groups','trace'])assert.deepEqual(body[k],proof[k]);assert.equal(sha(readFileSync(new URL(T.sourceDirectory+identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256);}
const RAW_COUNT=18,ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17]],ORIGINAL=[[{"kind":"cdDrawLine","args":[20.459500000000002,43.72,20.459500000000002,132.28,12,13]}],[{"kind":"cdDrawLine","args":[20.459500000000002,43.72,53.490500000000004,43.72,2,2]}],[{"kind":"cdDrawLine","args":[53.490500000000004,43.72,53.490500000000004,132.28,22,23]}],[{"kind":"cdDrawLine","args":[20.459500000000002,132.28,53.490500000000004,132.28,2,2]}],[{"kind":"cdDrawLine","args":[96.8475,14,96.8475,40,0,32]}],[{"kind":"cdDrawLine","args":[66.4185,40,130.1745,40,0,0]}],[{"kind":"cdDrawLine","args":[80.184,57,80.184,83,12,213]}],[{"kind":"cdDrawLine","args":[80.184,57,113.511,57,2,2]}],[{"kind":"cdDrawLine","args":[113.511,57,113.511,83,22,323]}],[{"kind":"cdDrawLine","args":[70.7655,107,116.40899999999999,107,0,2]}],[{"kind":"cdDrawLine","args":[80.184,83,113.511,83,0,2]}],[{"kind":"cdDrawCurve","args":[116.40899999999999,107,106.9905,121,98.29650000000001,130,22,7]}],[{"kind":"cdDrawLine","args":[98.29650000000001,122,98.29650000000001,172,0,1]},{"kind":"cdDrawCurve","args":[98.29650000000001,172,98.29650000000001,182,88.29650000000001,182,1,14]}],[{"kind":"cdDrawCurve","args":[68.592,153,102.6435,146,128.001,135,0,7]}],[{"kind":"cdDrawCurve","args":[148.94939999999997,14,141.1662,65,123.0054,100,0,7]}],[{"kind":"cdDrawLine","args":[138.5718,63,186.5682,63,2,100]}],[{"kind":"cdDrawCurve","args":[168.4074,63,160.6242,160,110.68199999999999,188,2,7]}],[{"kind":"cdDrawCurve","args":[134.6802,73,141.8148,150,181.37939999999998,178,7,0]}]],TRACE_SHA256="9628e1fdec9910073b40654e3bb0221130b68afceb138e5820a5f96d8105f757",GROUPS_SHA256="525a3cf32750b6e4fc2c389da2c591bb691706c25b918e856508959e7bb64d72",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[];
const endpoint=call=>call.args.slice(call.kind==='cdDrawLine'?2:call.kind==='cdDrawCurve'?4:6,call.kind==='cdDrawLine'?4:call.kind==='cdDrawCurve'?6:8),point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0});
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
function mergeExact(raw,indices,trace){assert(indices.length===2);assert(EXPECTED_GROUPS.some(g=>JSON.stringify(g)===JSON.stringify(indices)));assert([[1,2],[7,8]].some(g=>JSON.stringify(g)===JSON.stringify(indices)));const calls=indices.flatMap(i=>trace[i]);assert.equal(calls.length,2);assert.deepEqual(endpoint(calls[0]),calls[1].args.slice(0,2),'no connector or positive gap joins');const parts=indices.map(i=>{assert.equal(raw[i].length,1);return raw[i][0]}),first=calls[0].args;return{outline:parts.map(p=>p.outline).join(' '),bounds:[Math.min(...parts.map(p=>p.bounds[0])),Math.min(...parts.map(p=>p.bounds[1])),Math.max(...parts.map(p=>p.bounds[2])),Math.max(...parts.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(parts.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:'M'+first[0]/2+' '+first[1]/2+' '+calls.map(c=>{const a=c.args;return c.kind==='cdDrawLine'?'L'+a[2]/2+' '+a[3]/2:c.kind==='cdDrawCurve'?'Q'+a[2]/2+' '+a[3]/2+' '+a[4]/2+' '+a[5]/2:'C'+a[2]/2+' '+a[3]/2+' '+a[4]/2+' '+a[5]/2+' '+a[6]/2+' '+a[7]/2}).join(' '),revealWidth:14}}
let projectionRuns=0,internalRawProjectorRuns=0,cachedCalls=0;
export function captureProjection(...args){assert.equal(args.length,3);validateSelectedProof(...args);assert.equal(projectionRuns,0,'author first projection only');projectionRuns++;internalRawProjectorRuns++;const[trace,proof,identity]=args,rawBaseline=projectRaw(trace,proof,identity),strokes=EXPECTED_GROUPS.map(g=>g.length===1?rawBaseline[g[0]]:g[0]===9?g.flatMap(i=>rawBaseline[i]):[mergeExact(rawBaseline,g,trace)]);return{fullProof:proof,rawBaseline,baseline:clone(strokes),strokes,traceProjectionOperations:1,newInternalRawProjectorExecutions:1,originalCompilerExecutions:0,existingFactoryCalls:0,engineRuns:0,tailDerivations:0,staticMappingApproved:true,nativeAnimationApproved:false,nativeApproval:false,runtimeApplied:false}}
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);assert.equal(T.rawBaselineSHA256,FIXED_RAW_SHA);assert.equal(T.derivedSHA256,FIXED_COMPILED_SHA);assert.equal(T.fixturePayloadSHA256,FIXED_PAYLOAD_SHA);const f=json('./fixtures.json').u564b;assert.equal(digest(f),FIXED_PAYLOAD_SHA);assert.equal(digest(f.fullProof),T.fullProofSHA256);assert.equal(digest(f.rawBaseline),T.rawBaselineSHA256);assert.equal(digest(f.strokes),T.derivedSHA256);assert.deepEqual(f.baseline,f.strokes);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1))}
export function traceProjectionCallCount(){return projectionRuns}
export function newInternalRawProjectorCallCount(){return internalRawProjectorRuns}
export function cachedPositiveCallCount(){return cachedCalls}
export function originalSourceCompilerCallCount(){return 0}
export function existingFactoryCallCount(){return 0}
