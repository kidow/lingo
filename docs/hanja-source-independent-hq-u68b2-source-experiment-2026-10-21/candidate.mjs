export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs';
import assert from 'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';
const json=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=x=>createHash('sha256').update(x).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const T=json('./config.json').targets.u68b2,FIXED_PINS={"../hanja-goal-glyphwiki-batch961-2026-10-13/metadata.json":"52254dbaef5b488991068188f40f99541598238d2a3f1f83bb5cc139225f57e2","../hanja-goal-glyphwiki-batch961-2026-10-13/sources.json":"ce2cb19b1874e6b5d65f00a0a89bb08165c330db986ebb832d19ed50317f1d0f","../hanja-goal-glyphwiki-batch961-2026-10-13/NOTICE.md":"8af8b844a4a31738f4658eedbb5bef114593095e001167438d924a6f31b11772","../hanja-goal-glyphwiki-batch961-2026-10-13/README.md":"5901bd367b94f1db1bf5b86bf28a38d38db77882d86145237fa0f92780f527ec","../hanja-goal-glyphwiki-batch961-2026-10-13/engine-proof.json":"34661db3c3df9d28426acc3cc502792efa792f83cb4e908013b13170f54c51bc","../hanja-goal-glyphwiki-batch961-2026-10-13/engine-whole-u68b2.json":"34661db3c3df9d28426acc3cc502792efa792f83cb4e908013b13170f54c51bc","../hanja-goal-glyphwiki-batch961-2026-10-13/engine-whole-u68b2-ue0100.json":"34661db3c3df9d28426acc3cc502792efa792f83cb4e908013b13170f54c51bc","../hanja-goal-glyphwiki-batch961-2026-10-13/candidate-compile-analysis.json":"59a2525cec66e15b060f0ee3fc8de3676e6550a122a7cad41e01b611d8d529df","../hanja-goal-glyphwiki-batch961-2026-10-13/source-hold.json":"9dca747a16920048b435017c9db90decfe99938c613d969943ebc07e973a965d","../hanja-goal-glyphwiki-batch961-2026-10-13/source-join-analysis.json":"dd7286e7fe86c679626c399c98c7c0b5ec540ba50be93f95ba23730be7f3bd26","../hanja-goal-glyphwiki-batch961-2026-10-13/source-preservation-audit.json":"e4607eeee221605bfcee813f2dab71dda9ed80e21566a9a45c6f5a3083ea5530","../hanja-goal-glyphwiki-batch961-2026-10-13/validation.json":"74f7854201f7fd8c1f93070cb58a8a230a19a32453a1a8adef45312eaac92320","../hanja-goal-glyphwiki-batch961-2026-10-13/resume.json":"5968ddc842180a97d71e4a16ba2d878ce59234b659f09cab2055de121da8c0bd","../hanja-goal-glyphwiki-batch961-2026-10-13/native-server-preflight-hold.json":"0c073423350a1f1e35bd360d9aa3d23353da3f6e3fec8128cd733a5b279b5788","../hanja-goal-glyphwiki-batch961-2026-10-13/native-static-server-preparation.json":"8270f7465865467adb474a8b67b342d70212681ebb71a509bfbf3aa45c332793","../hanja-goal-glyphwiki-batch961-2026-10-13/serve-whole.py":"2542256a3863397d4661960eebaf8e826078eadc8ece88a5bd0449e148a82502","../hanja-source-raw-compare-u90b0-2026-10-21/serve.py":"367b11b29ec0f7f1477979ce5513f4503f68cdb5e7dd5979a4fae00e2eea55f5","../hanja-source-raw-compare-u90b0-2026-10-21/check.mjs":"4764d85b7a211bf94ee40af75dbc19beecb1f5f7bc92b53acd5e27dbbe0f6355","../hanja-source-raw-compare-u68b2-2026-10-21/config.json":"511f6b9b8527db2f6ada4c10b8230403c0019c76e3c4842ef46c2fae736ddc54","../hanja-source-raw-compare-u68b2-2026-10-21/serve.py":"eac29cfcfac49f5584dc3a67e3ab90b6c47920156563d6833bf6ae1f88832efc","../hanja-source-raw-compare-u68b2-2026-10-21/check.mjs":"2d58f4ad1bf96f343232df7951196824827c054b8fbc6a7f67dcb27bc7716703","../hanja-source-raw-compare-u68b2-2026-10-21/README.md":"8064ccbb1439bd8a8222fdb89919541b213178e9ead0afa7f38584b161c916b7","../hanja-source-raw-compare-u68b2-2026-10-21/validation.json":"82578e1bced3110c599694500c1d19c25a2757db1328977620ab89650d6e636c","../hanja-source-native-raw-correspondence-u68b2-2026-10-21/README.md":"2d23af22792ccfc1670b9819c0043fa1826e067aa049322d92e9dd9417c968ee","../hanja-source-native-raw-correspondence-u68b2-2026-10-21/review.json":"87ea90a89c5036bba8a71cb76dccee34925bf723a194920d2245153ab1d70ae7","../hanja-source-independent-qq-u90b0-source-experiment-2026-10-21/candidate.mjs":"7bb2da8dbe7a11a0e07b3959975961ba4522060ebf33894198a7278db612e339","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"},EXPECTED_IDENTITY={"sourceRoot":"u68b2","sourceProofFile":"engine-whole-u68b2.json","sourceProofFileSha256":"34661db3c3df9d28426acc3cc502792efa792f83cb4e908013b13170f54c51bc"},EXPECTED_GROUPS=[[0],[1],[2],[3],[4],[5,6],[7],[8,9],[10],[11],[12]],RAW_COUNT=13,ORIGINAL=[[{"kind":"cdDrawLine","args":[13.7,61,83,61,0,0]}],[{"kind":"cdDrawLine","args":[49.7,15,49.7,186,0,0]}],[{"kind":"cdDrawCurve","args":[47,61,38,110,13.7,148,132,7]}],[{"kind":"cdDrawCurve","args":[51.5,86,68.6,94,78.5,109,7,8]}],[{"kind":"cdDrawCurve","args":[113.08,33,99.3,59,74.92,80,0,7]}],[{"kind":"cdDrawLine","args":[108.84,25,158.66,25,0,100]}],[{"kind":"cdDrawCurve","args":[145.94,25,157.6,49,181.98,65,7,0]}],[{"kind":"cdDrawLine","args":[101.42,72,101.42,114,12,13]}],[{"kind":"cdDrawLine","args":[101.42,72,165.02,72,2,2]}],[{"kind":"cdDrawLine","args":[165.02,72,165.02,114,22,23]}],[{"kind":"cdDrawLine","args":[101.42,114,165.02,114,2,2]}],[{"kind":"cdDrawCurve","args":[121.56,121,115.2,169,68.56,189,0,7]}],[{"kind":"cdDrawLine","args":[142.76,114,142.76,170,32,1]},{"kind":"cdDrawCurve","args":[142.76,170,142.76,180,152.76,180,1,1]},{"kind":"cdDrawLine","args":[152.76,180,180.92,180,6,5]}]],TRACE_SHA256="a07d00b7c6c0a86b6971a4ba787d980e9443bc00a558b3a65e46b864f3c2d642",GROUPS_SHA256="d6ba842755891a611100288e09c9b63137aea10d065256e769ea9852719b2c43",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12]],UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[];
const endpoint=call=>call.args.slice(call.kind==='cdDrawLine'?2:call.kind==='cdDrawCurve'?4:6,call.kind==='cdDrawLine'?4:call.kind==='cdDrawCurve'?6:8),point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0});
const FIXED_RAW_SHA="66bbca7a337002e7d457272ee2a114fb382cea91d3b17c3b4a29d87fc0847aa1",FIXED_COMPILED_SHA="f79556fa5410a401f2ec5ea998bbf65a498a0c10f87e17d687f8a51f16ff55db",FIXED_PAYLOAD_SHA="c8e57ad19981d3698bd18b5d9c492fd98b6cd09f47749738ff044e67a1ca5bdc";
export const sourceRoot='u68b2',selectedProofIdentity=clone(EXPECTED_IDENTITY),sourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
function validateSelectedProof(trace,proof,identity){assert.equal(arguments.length,3);assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.sourceGroups,EXPECTED_GROUPS);assert.equal(T.actualFull5File,"../hanja-goal-glyphwiki-batch961-2026-10-13/engine-whole-u68b2.json");assert.equal(T.actualFull5SHA256,"34661db3c3df9d28426acc3cc502792efa792f83cb4e908013b13170f54c51bc");for(const[p,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h,p);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),"84e01d3c9c2cdeaaf105c324d2eb3bb2578879db23b7016ac127e398ca7ea460");assert.deepEqual(trace,proof.trace);assert.deepEqual(json(T.actualFull5File),proof);}
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
function mergeExact(raw,indices,trace){assert(indices.length===2);assert(EXPECTED_GROUPS.some(g=>JSON.stringify(g)===JSON.stringify(indices)));assert([[8,9]].some(g=>JSON.stringify(g)===JSON.stringify(indices)));const calls=indices.flatMap(i=>trace[i]);assert.equal(calls.length,2);assert.deepEqual(endpoint(calls[0]),calls[1].args.slice(0,2),'no connector or positive gap joins');const parts=indices.map(i=>{assert.equal(raw[i].length,1);return raw[i][0]}),first=calls[0].args;return{outline:parts.map(p=>p.outline).join(' '),bounds:[Math.min(...parts.map(p=>p.bounds[0])),Math.min(...parts.map(p=>p.bounds[1])),Math.max(...parts.map(p=>p.bounds[2])),Math.max(...parts.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(parts.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:'M'+first[0]/2+' '+first[1]/2+' '+calls.map(c=>{const a=c.args;return c.kind==='cdDrawLine'?'L'+a[2]/2+' '+a[3]/2:c.kind==='cdDrawCurve'?'Q'+a[2]/2+' '+a[3]/2+' '+a[4]/2+' '+a[5]/2:'C'+a[2]/2+' '+a[3]/2+' '+a[4]/2+' '+a[5]/2+' '+a[6]/2+' '+a[7]/2}).join(' '),revealWidth:14}}
let projectionRuns=0,internalRawProjectorRuns=0,cachedCalls=0;
export function captureProjection(...args){assert.equal(args.length,3);validateSelectedProof(...args);assert.equal(projectionRuns,0,'author first projection only');projectionRuns++;internalRawProjectorRuns++;const[trace,proof,identity]=args,rawBaseline=projectRaw(trace,proof,identity),strokes=EXPECTED_GROUPS.map(g=>g.length===1?rawBaseline[g[0]]:g[0]===5?g.flatMap(i=>rawBaseline[i]):[mergeExact(rawBaseline,g,trace)]);return{fullProof:proof,rawBaseline,baseline:clone(strokes),strokes,traceProjectionOperations:1,newInternalRawProjectorExecutions:1,originalCompilerExecutions:0,existingFactoryCalls:0,engineRuns:0,tailDerivations:0,staticMappingApproved:true,nativeAnimationApproved:false,nativeApproval:false,runtimeApplied:false}}
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);assert.equal(T.rawBaselineSHA256,FIXED_RAW_SHA);assert.equal(T.derivedSHA256,FIXED_COMPILED_SHA);assert.equal(T.fixturePayloadSHA256,FIXED_PAYLOAD_SHA);const f=json('./fixtures.json').u68b2;assert.equal(digest(f),FIXED_PAYLOAD_SHA);assert.equal(digest(f.fullProof),T.fullProofSHA256);assert.equal(digest(f.rawBaseline),T.rawBaselineSHA256);assert.equal(digest(f.strokes),T.derivedSHA256);assert.deepEqual(f.baseline,f.strokes);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1))}
export function traceProjectionCallCount(){return projectionRuns}
export function newInternalRawProjectorCallCount(){return internalRawProjectorRuns}
export function cachedPositiveCallCount(){return cachedCalls}
export function originalSourceCompilerCallCount(){return 0}
export function existingFactoryCallCount(){return 0}
