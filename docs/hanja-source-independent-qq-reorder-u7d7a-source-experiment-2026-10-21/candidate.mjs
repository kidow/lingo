export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs';
import assert from 'node:assert/strict';import{readFileSync,existsSync}from'node:fs';import{createHash}from'node:crypto';import{fileURLToPath}from'node:url';
const json=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=x=>createHash('sha256').update(x).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const T=json('./config.json').targets.u7d7a,FIXED_PINS={"../hanja-goal-glyphwiki-batch949-2026-10-13/NOTICE.md":"0d78bc245382efeb375f39c5b2f6072f940e4f81df3a61295747fb8e5380778f","../hanja-goal-glyphwiki-batch949-2026-10-13/README.md":"d6b89f603749109acf37c52ed54087e9b106b93193f4292de4910cb5c0219923","../hanja-goal-glyphwiki-batch949-2026-10-13/candidate-compile-analysis.json":"c09b58130d092cbb1059c04e48fdf96d01c4cab623c7f9394e649c0af26b30a1","../hanja-goal-glyphwiki-batch949-2026-10-13/engine-proof.json":"8ca5792ecff90e6324438b4fdaa6d64cb038762bd4f0b62a79948ce95d9966a6","../hanja-goal-glyphwiki-batch949-2026-10-13/engine-whole-u7d7a-ue0100.json":"611e55e39e0ece888384112c74ccf7575534e31a5340789b01b333bac1ef112f","../hanja-goal-glyphwiki-batch949-2026-10-13/engine-whole-u7d7a.json":"611e55e39e0ece888384112c74ccf7575534e31a5340789b01b333bac1ef112f","../hanja-goal-glyphwiki-batch949-2026-10-13/metadata.json":"7b0b0d995c3e7a373da0240fc02be63f75aa16840cf7afa4e7c969bbde9fa0f7","../hanja-goal-glyphwiki-batch949-2026-10-13/native-server-input-pins.json":"2a8472276762dcc0d7bc293c942cfe4e9f7670dc18b20e3962a1a7fa296fa465","../hanja-goal-glyphwiki-batch949-2026-10-13/progressive.mjs":"3503b92174e6374f7638a4ccb493d87ba835b88d05e7420918a0037a13618362","../hanja-goal-glyphwiki-batch949-2026-10-13/resume.json":"a598d5ceb99d23aabac314bd0c39cdb79eab672aba4d16cca4a707e11f282e56","../hanja-goal-glyphwiki-batch949-2026-10-13/serve-native.py":"907bb5d070c4c45f41daba9d0b2e5eeb264b809f6eaaeb4489bb534ba5b3700f","../hanja-goal-glyphwiki-batch949-2026-10-13/source-analysis.json":"184cac79d1a0455a646dcc63e8d74f7725f5b513020262ff37be11661ac7dd10","../hanja-goal-glyphwiki-batch949-2026-10-13/source-hold.json":"03c21ebf9a91dea2eb62b47546e5be34f0122661bf03dcbc542ed9767aa078dd","../hanja-goal-glyphwiki-batch949-2026-10-13/source-join-analysis.json":"56d2e1291b6feaab5f70e385607315f4da7f57b9ff11e05ee17fc62ca54a4d2f","../hanja-goal-glyphwiki-batch949-2026-10-13/sources.json":"829c646f4bbb1ce23f9ff79fb77fce3b5403a773bbeceff6edcf5b7d083661a2","../hanja-goal-glyphwiki-batch949-2026-10-13/strict-native-adapter.mjs":"4593ec7c32d15e6c75d09c25cdadae27c303df2dcd9717d697a61d74de074bcf","../hanja-goal-glyphwiki-batch949-2026-10-13/strict-native-server-preflight.json":"6a87fb589a11a1d0ccb28eaacb2285c161e88fc068352f696ee21290b8b16906","../hanja-goal-glyphwiki-batch949-2026-10-13/validation.json":"8e48802309e7a2a76040b3d9c22ad7de598e3379b56f3e16b3148c736ac4b6e0","../hanja-goal-glyphwiki-batch949-2026-10-13/verify-source.mjs":"6e995ccbc32d092a5d060086a1716802294c917e0135c90628957514356f5f13","../hanja-source-raw-compare-u7c1c-2026-10-21/serve.py":"25266cacf9c4aa8fe22e808e7446c0d5332bd1ddbbf374c267bdfc45067e90f7","../hanja-source-raw-compare-u7c1c-2026-10-21/check.mjs":"5413ac0ece90138c47d405ac2fdef098b2502f987110446dfc120ddb943344a8","../hanja-source-independent-qq-hv-u7c1c-source-experiment-2026-10-21/candidate.mjs":"d7e7a436a03903782437c22137f70bd253e85f835af7bc645edb6699921ae2b8","../hanja-source-raw-compare-u7d7a-2026-10-21/config.json":"856e772e9436142f7ee0adf1fb9bf621aa27e8affbf8ce4c2e5d30e719387b1a","../hanja-source-raw-compare-u7d7a-2026-10-21/serve.py":"25266cacf9c4aa8fe22e808e7446c0d5332bd1ddbbf374c267bdfc45067e90f7","../hanja-source-raw-compare-u7d7a-2026-10-21/check.mjs":"8c2954e1ce3985f83a8ea6654d56cb6c9936f7d8dc9ef95c19ffdc7a32886985","../hanja-source-raw-compare-u7d7a-2026-10-21/README.md":"4e6cd2090a177434c4cf9e975a21d6e0c2bcb002696e53210c511276f6c43a27","../hanja-source-raw-compare-u7d7a-2026-10-21/validation.json":"cb14abf667d57adea62d617632182d80d5c4abeac23475cf0e0f3898c04a52ab"},EXPECTED_IDENTITY={"sourceRoot":"u7d7a","sourceProofFile":"engine-proof.json","sourceProofFileSha256":"8ca5792ecff90e6324438b4fdaa6d64cb038762bd4f0b62a79948ce95d9966a6"},EXPECTED_GROUPS=[[0,1],[2,3],[4],[5],[6],[7],[8],[9],[11],[10],[13],[14,15],[12]];
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');if(Array.isArray(v)){assert.equal(Object.getPrototypeOf(v),Array.prototype);assert.equal(Reflect.ownKeys(v).length,v.length+1);for(let i=0;i<v.length;i++){assert(Object.hasOwn(v,i));const d=Object.getOwnPropertyDescriptor(v,String(i));assert(d&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}assert.equal(Object.getPrototypeOf(v),Object.prototype);assert.equal(Reflect.ownKeys(v).length,Object.keys(v).length);for(const k of Object.keys(v)){const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}

export const sourceRoot='u7d7a',selectedProofIdentity=clone(EXPECTED_IDENTITY),sourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
const EXPECTED_CONFIG_SHA="b045badb1e4ddf54f5a16da03d42c546ec2892655dca483ad6b9b1149a2d8ece";
function validateSelectedProof(trace,proof,identity){assert.equal(arguments.length,3);strictJSON(identity);strictJSON(proof);strictJSON(trace);assert.equal(sha(readFileSync(new URL('./config.json',import.meta.url))),EXPECTED_CONFIG_SHA);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.sourceGroups,EXPECTED_GROUPS);for(const[p,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h,p);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),"48e1f7b44d0d008a38f38c3f1df90526298869a8f22e68108ab74b12a18fc552");assert.deepEqual(trace,proof.trace);assert.equal(T.actualFull5File,"../hanja-goal-glyphwiki-batch949-2026-10-13/engine-proof.json");assert.equal(T.selectedBody3File,"../hanja-goal-glyphwiki-batch949-2026-10-13/engine-whole-u7d7a.json");assert.equal(sha(readFileSync(new URL(T.actualFull5File,import.meta.url))),EXPECTED_IDENTITY.sourceProofFileSha256);assert.deepEqual(json(T.actualFull5File),proof);assert.equal(sha(readFileSync(new URL(T.selectedBody3File,import.meta.url))),"611e55e39e0ece888384112c74ccf7575534e31a5340789b01b333bac1ef112f");const body=json(T.selectedBody3File);assert.deepEqual(Object.keys(body).sort(),['defaults','groups','trace']);for(const k of['defaults','groups','trace'])assert.deepEqual(body[k],proof[k]);}
const RAW_COUNT=16,ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15]],ORIGINAL=[[{"kind":"cdDrawCurve","args":[51.51,16,41.22,37,28.725,56,0,7]}],[{"kind":"cdDrawCurve","args":[13.29,45,30.93,56,38.28,76,7,8]}],[{"kind":"cdDrawCurve","args":[72.825,39,52.245,76,27.99,110,0,7]}],[{"kind":"cdDrawCurve","args":[14.76,113,45.63,109,72.825,101,0,7]}],[{"kind":"cdDrawCurve","args":[57.39,78,71.355,91,77.235,114,7,8]}],[{"kind":"cdDrawLine","args":[48.57,109,48.57,186,32,0]}],[{"kind":"cdDrawCurve","args":[30.93,127,27.99,155,13.29,180,0,7]}],[{"kind":"cdDrawCurve","args":[58.125,122,71.355,136,76.5,161,7,8]}],[{"kind":"cdDrawCurve","args":[162.875,19,141.275,42,87.275,66,0,7]}],[{"kind":"cdDrawCurve","args":[98.075,19,142.625,41,165.575,63,7,8]}],[{"kind":"cdDrawLine","args":[75.125,82,187.85,82,0,0]}],[{"kind":"cdDrawCurve","args":[124.4,62,110.9,108,75.8,144,0,7]}],[{"kind":"cdDrawLine","args":[135.2,90,135.2,185,0,0]}],[{"kind":"cdDrawLine","args":[104.15,115,104.15,172,32,0]}],[{"kind":"cdDrawLine","args":[104.15,115,168.95,115,2,2]}],[{"kind":"cdDrawLine","args":[168.95,115,168.95,158,22,1]},{"kind":"cdDrawCurve","args":[168.95,158,168.95,168,158.95,168,1,514]}]],TRACE_SHA256="a7745892ebc15a776e47a15001564c3ffa37bfacda97462a94d71db69a4b8bda",GROUPS_SHA256="8eb78b736913df2bd4ad50b258d26847774ab6efb0d6ef208f2e99b4ab848d66",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[];
const endpoint=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8),point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0});
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
function mergeExact(raw,indices,trace){assert.deepEqual(indices,[14,15]);const calls=indices.flatMap(i=>trace[i]);assert.equal(calls.length,3);for(let i=1;i<calls.length;i++)assert.deepEqual(endpoint(calls[i-1]),calls[i].args.slice(0,2),'no connector or positive-gap join');const parts=indices.map(i=>{assert.equal(raw[i].length,1);return raw[i][0]}),first=calls[0].args;return{outline:parts.map(p=>p.outline).join(' '),bounds:[Math.min(...parts.map(p=>p.bounds[0])),Math.min(...parts.map(p=>p.bounds[1])),Math.max(...parts.map(p=>p.bounds[2])),Math.max(...parts.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(parts.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:'M'+first[0]/2+' '+first[1]/2+' '+calls.map(c=>{const a=c.args;return c.kind==='cdDrawLine'?'L'+a[2]/2+' '+a[3]/2:'Q'+a[2]/2+' '+a[3]/2+' '+a[4]/2+' '+a[5]/2}).join(' '),revealWidth:14}}
let projectionRuns=0,internalRawProjectorRuns=0,cachedCalls=0;
export function captureProjection(...args){assert.equal(args.length,3);assert(!existsSync(new URL('./fixtures.json',import.meta.url)),'public fixture exists; projection disabled');validateSelectedProof(...args);assert.equal(projectionRuns,0);projectionRuns++;internalRawProjectorRuns++;const[trace,proof,identity]=args,rawBaseline=projectRaw(trace,proof,identity),strokes=EXPECTED_GROUPS.map(g=>g.length===1?rawBaseline[g[0]]:g[0]===0||g[0]===2?g.flatMap(i=>rawBaseline[i]):[mergeExact(rawBaseline,g,trace)]);return{fullProof:proof,rawBaseline,baseline:clone(strokes),strokes,traceProjectionOperations:1,newInternalRawProjectorExecutions:1,originalCompilerExecutions:0,existingFactoryCalls:0,engineRuns:0,tailDerivations:0,staticMappingApproved:true,nativeAnimationApproved:false,nativeApproval:false,runtimeApplied:false}}
export function traceProjectionCallCount(){return projectionRuns}export function newInternalRawProjectorCallCount(){return internalRawProjectorRuns}export function cachedPositiveCallCount(){return cachedCalls}export function originalSourceCompilerCallCount(){return 0}export function existingFactoryCallCount(){return 0}
if(process.argv[1]===fileURLToPath(import.meta.url)){assert.equal(process.argv.length,3);assert.equal(process.argv[2],'--author-capture-once');const proof=json(T.actualFull5File);process.stdout.write(JSON.stringify({u7d7a:captureProjection(proof.trace,proof,EXPECTED_IDENTITY)}))}
const FIXED_RAW_SHA="d7039131834e3d8813a0aa0bcf3369ce09a0a63643a9f105730cbe059478cb29",FIXED_COMPILED_SHA="933b3e52ba6e2a53237c09777724d4ea34ac05cd3124e1ecfb1ae38682cf719b",FIXED_PAYLOAD_SHA="040de3fe5e707e4969fcff367479dc46af76b8f11707a0a473f9998fa35f8607",FIXED_FILE_SHA="ec1e588e5b20f10ceba579ec33096e421b80ab97672f9e4715945831054d2c98";
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);assert.equal(T.rawBaselineSHA256,FIXED_RAW_SHA);assert.equal(T.derivedSHA256,FIXED_COMPILED_SHA);assert.equal(T.fixturePayloadSHA256,FIXED_PAYLOAD_SHA);const bytes=readFileSync(new URL('./fixtures.json',import.meta.url));assert.equal(sha(bytes),FIXED_FILE_SHA);const f=JSON.parse(bytes).u7d7a;assert.equal(digest(f),FIXED_PAYLOAD_SHA);assert.deepEqual(f.fullProof,args[1]);assert.equal(digest(f.rawBaseline),FIXED_RAW_SHA);assert.equal(digest(f.strokes),FIXED_COMPILED_SHA);assert.deepEqual(f.baseline,f.strokes);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1))}
