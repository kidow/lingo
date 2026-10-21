export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs';
import assert from'node:assert/strict';import{readFileSync,existsSync}from'node:fs';import{createHash}from'node:crypto';import{fileURLToPath}from'node:url';
const json=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=x=>createHash('sha256').update(x).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const T=json('./config.json').targets.u7d8e,FIXED_PINS={"../hanja-goal-glyphwiki-batch851-2026-10-13/NOTICE.md":"0c84d4e51c257aa3ef89f6bb6d75195cb2a7a9936975fb27d4a6950047715726","../hanja-goal-glyphwiki-batch851-2026-10-13/README.md":"83971ba98caca6418cf236a0492f89a7570e69a9fc9b37bd8571c4e0dcfc00a4","../hanja-goal-glyphwiki-batch851-2026-10-13/candidate-compile-analysis.json":"18fc3c63d604e64fe624ec87b6d5f0b2753ff146f49e897a6e0dc368ad4a01db","../hanja-goal-glyphwiki-batch851-2026-10-13/engine-proof.json":"e774251d4531b0813c96f2303da5beb41b0401a557407bac35587f10ef5d7e25","../hanja-goal-glyphwiki-batch851-2026-10-13/engine-whole-u7d8e-k.json":"b5b9694c81d1f4ab14bde7f728e982bd12be9ec770d0fcee37de8e5fabfdf2f5","../hanja-goal-glyphwiki-batch851-2026-10-13/engine-whole-u7d8e-var-001.json":"fa0e85b3b2e1928732471022876227273369f19561cf059b2563ab55390584dd","../hanja-goal-glyphwiki-batch851-2026-10-13/engine-whole-u7d8e.json":"e774251d4531b0813c96f2303da5beb41b0401a557407bac35587f10ef5d7e25","../hanja-goal-glyphwiki-batch851-2026-10-13/metadata.json":"9f99c5a827220fe77bb5eb9763c90a9dd1e8591822b33aec8d52b4e2ceed1bb6","../hanja-goal-glyphwiki-batch851-2026-10-13/progressive.mjs":"67206d2ddb6b96c2d812f4ededb4c1b050c625b4463d81756d53cfdd63a9dab2","../hanja-goal-glyphwiki-batch851-2026-10-13/resume.json":"161a95e5a5fa13e353ed0cbd7d06d647a3dafdcd98ebac957d1dcf6b70f3118f","../hanja-goal-glyphwiki-batch851-2026-10-13/review.json":"b057368f861264e719d4ba64aee71c641e837daf25b64f4d4c648be02f1a1a91","../hanja-goal-glyphwiki-batch851-2026-10-13/serve-progressive.py":"3312291a2cae11ea6c53a16b109d2c60005e7441413406146df22b76bfb7d198","../hanja-goal-glyphwiki-batch851-2026-10-13/serve-whole.py":"cf9f9afec566a1b7bc9dd99419bfa9ef617abff842f5c0106525b1fba8347bcd","../hanja-goal-glyphwiki-batch851-2026-10-13/source-analysis.json":"9d32b6bb94c619f583c9e83ccb5179c1fdf0551cb2ccbb8bf5ba82458e4b7fca","../hanja-goal-glyphwiki-batch851-2026-10-13/source-join-analysis.json":"b8e52078468c5143c1d6ba715d28f90504d8869491843695856c5b7d3de0612e","../hanja-goal-glyphwiki-batch851-2026-10-13/source-preservation-audit.json":"7d88f3e460d89b734120e747e034d0ffc2cfde795cec16913217532cebdad36a","../hanja-goal-glyphwiki-batch851-2026-10-13/sources.json":"3c3ed837fae6e1fd83e7db2e8386154f086dabfd7bba37b9c899a6bbda79a771","../hanja-goal-glyphwiki-batch851-2026-10-13/validation.json":"cb01e34c26b3fa35f7dd7689d4a2fe6d4e6752b7f7ee9ace2cf277a8dafcc7dc","../hanja-goal-glyphwiki-batch851-2026-10-13/verify-source.mjs":"d46cd122ad4d4fe11869634e8fbb18843685a47b2c3e94f388e8b479c60b9af9","../hanja-source-raw-compare-u7d8e-2026-10-21/config.json":"4647f46e821d46108c2ce2811020115a6d3ff656286a55f2495039eb96c56781","../hanja-source-raw-compare-u7d8e-2026-10-21/serve.py":"25266cacf9c4aa8fe22e808e7446c0d5332bd1ddbbf374c267bdfc45067e90f7","../hanja-source-raw-compare-u7d8e-2026-10-21/check.mjs":"5c6cc6814668a3d9b14ed4b8b15a76cfa1f1a565c66740242719a3c05a7b04d4","../hanja-source-raw-compare-u7d8e-2026-10-21/README.md":"37eca31833f09923b13d654f9da8eee537f19222059dfe66c585c2b4b0aac34b","../hanja-source-raw-compare-u7d8e-2026-10-21/validation.json":"f5f5541479bde859cefc00d3be80fc242d5c375e48e1da9d1e172f3f5fb1f036","../hanja-source-raw-review-u7d8e-2026-10-21/README.md":"e8a162de87031a03476117a23900783990a2c2b4960c9b93c3a844bcc7c37a39","../hanja-source-raw-review-u7d8e-2026-10-21/review.json":"e1dfaa520d4cb32397f71285392795ac7f9edae9e9ccd2a1c997bc4ad6ff6cac","../hanja-source-independent-qq-reorder-u7d7a-source-experiment-2026-10-21/candidate.mjs":"c5de7d721edfe195fb8394b0f435872fc1f1ee885ac70a4bffa060a31358f374","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09"},EXPECTED_IDENTITY={"sourceRoot":"u7d8e","sourceProofFile":"engine-whole-u7d8e.json","sourceProofFileSha256":"e774251d4531b0813c96f2303da5beb41b0401a557407bac35587f10ef5d7e25"},EXPECTED_GROUPS=[[0,1],[2,3],[4],[5],[6],[7],[16],[13],[14],[15],[8,9],[10,11],[12]],EXPECTED_CONFIG_SHA="96e2a43d5020485f6b75e8c12dca8e07825ae9c15719d6f444557ef9beb632f0";
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');if(Array.isArray(v)){assert.equal(Object.getPrototypeOf(v),Array.prototype);assert.equal(Reflect.ownKeys(v).length,v.length+1);for(let i=0;i<v.length;i++){assert(Object.hasOwn(v,i));const d=Object.getOwnPropertyDescriptor(v,String(i));assert(d&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}assert.equal(Object.getPrototypeOf(v),Object.prototype);assert.equal(Reflect.ownKeys(v).length,Object.keys(v).length);for(const k of Object.keys(v)){const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}

function validateSelectedProof(trace,proof,identity){assert.equal(arguments.length,3);strictJSON(identity);strictJSON(proof);strictJSON(trace);assert.equal(sha(readFileSync(new URL('./config.json',import.meta.url))),EXPECTED_CONFIG_SHA);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.sourceGroups,EXPECTED_GROUPS);for(const[p,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h,p);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),"e5ddb2e7be953bd9d2bb529538840355a0503274e04eeba3ab36ea6a5dc811ab");assert.deepEqual(trace,proof.trace);assert.equal(T.actualFull5File,"../hanja-goal-glyphwiki-batch851-2026-10-13/engine-whole-u7d8e.json");assert.equal(T.selectedWholeFile,"../hanja-goal-glyphwiki-batch851-2026-10-13/engine-whole-u7d8e.json");const b=readFileSync(new URL(T.selectedWholeFile,import.meta.url));assert.equal(sha(b),EXPECTED_IDENTITY.sourceProofFileSha256);assert.equal(T.selectedWholeSHA256,EXPECTED_IDENTITY.sourceProofFileSha256);assert.deepEqual(JSON.parse(b),proof);assert.deepEqual(json(T.actualFull5File),proof);}
export const sourceRoot='u7d8e',selectedProofIdentity=clone(EXPECTED_IDENTITY),sourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
const RAW_COUNT=17,ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16]],ORIGINAL=[[{"kind":"cdDrawCurve","args":[46.9,16,37.8,37,26.75,56,0,7]}],[{"kind":"cdDrawCurve","args":[13.1,45,28.7,56,35.2,76,7,8]}],[{"kind":"cdDrawCurve","args":[65.75,39,47.55,76,26.1,110,0,7]}],[{"kind":"cdDrawCurve","args":[14.4,113,41.7,109,65.75,101,0,7]}],[{"kind":"cdDrawCurve","args":[52.1,78,64.45,91,69.65,114,7,8]}],[{"kind":"cdDrawLine","args":[44.3,109,44.3,186,32,0]}],[{"kind":"cdDrawCurve","args":[28.7,127,26.1,155,13.1,180,0,7]}],[{"kind":"cdDrawCurve","args":[52.75,122,64.45,136,69,161,7,8]}],[{"kind":"cdDrawLine","args":[73.65,33,105.95,33,0,2]}],[{"kind":"cdDrawLine","args":[105.95,33,86,89,22,113]}],[{"kind":"cdDrawLine","args":[86,89,111.65,89,0,2]}],[{"kind":"cdDrawCurve","args":[111.65,89,105.95,167,63.2,187,22,7]}],[{"kind":"cdDrawCurve","args":[80.3,114,91.7,185,180.05,177,7,0]}],[{"kind":"cdDrawLine","args":[114.5,86,187.65,86,0,0]}],[{"kind":"cdDrawLine","args":[148.7,39,148.7,147,32,32]}],[{"kind":"cdDrawLine","args":[115.45,148,183.85,148,0,0]}],[{"kind":"cdDrawCurve","args":[177.2,28,152.5,37,117.35,44,0,7]}]],TRACE_SHA256="bdeea6aa38eb3e9870cc32274b607b3a1e5e1942d585152542b75903749d4850",GROUPS_SHA256="c150c6f270e13cfa1808bc6fcd3c540fa5ab22d10ee543381a5e3f3175cbe076",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[];
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
function mergeExact(raw,indices,trace){assert(indices.length===2&&((indices[0]===8&&indices[1]===9)||(indices[0]===10&&indices[1]===11)),'only fixed HL/HQ');const calls=indices.flatMap(i=>trace[i]);assert.equal(calls.length,2);assert.equal(calls[0].kind,'cdDrawLine');assert.equal(calls[1].kind,indices[0]===8?'cdDrawLine':'cdDrawCurve');assert.deepEqual(endpoint(calls[0]),calls[1].args.slice(0,2),'no connector or positive-gap join');const parts=indices.map(i=>{assert.equal(raw[i].length,1);return raw[i][0]}),first=calls[0].args;return{outline:parts.map(p=>p.outline).join(' '),bounds:[Math.min(...parts.map(p=>p.bounds[0])),Math.min(...parts.map(p=>p.bounds[1])),Math.max(...parts.map(p=>p.bounds[2])),Math.max(...parts.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(parts.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:'M'+first[0]/2+' '+first[1]/2+' '+calls.map(c=>{const a=c.args;return c.kind==='cdDrawLine'?'L'+a[2]/2+' '+a[3]/2:'Q'+a[2]/2+' '+a[3]/2+' '+a[4]/2+' '+a[5]/2}).join(' '),revealWidth:14}}
let projectionRuns=0,internalRawProjectorRuns=0,cachedCalls=0;
export function captureProjection(...args){assert.equal(args.length,3);assert(!existsSync(new URL('./fixture.json',import.meta.url)),'public fixture exists; projection disabled');validateSelectedProof(...args);assert.equal(projectionRuns,0);projectionRuns++;internalRawProjectorRuns++;const[trace,proof]=args,rawBaseline=projectRaw(...args),strokes=EXPECTED_GROUPS.map(g=>g.length===1?rawBaseline[g[0]]:g[0]===0||g[0]===2?g.flatMap(i=>rawBaseline[i]):[mergeExact(rawBaseline,g,trace)]);return{fullProof:proof,rawBaseline,baseline:clone(strokes),strokes,traceProjectionOperations:1,newInternalRawProjectorExecutions:1,originalCompilerExecutions:0,existingFactoryCalls:0,engineRuns:0,tailDerivations:0,staticCorrespondenceObserved:true,nativeAnimationApproved:false,nativeApproval:false,runtimeApplied:false}}
export function traceProjectionCallCount(){return projectionRuns}export function newInternalRawProjectorCallCount(){return internalRawProjectorRuns}export function cachedPositiveCallCount(){return cachedCalls}export function originalSourceCompilerCallCount(){return 0}export function existingFactoryCallCount(){return 0}
if(process.argv[1]===fileURLToPath(import.meta.url)){assert.equal(process.argv.length,3);assert.equal(process.argv[2],'--author-capture-once');const proof=json(T.actualFull5File);process.stdout.write(JSON.stringify({u7d8e:captureProjection(proof.trace,proof,EXPECTED_IDENTITY)}))}
const FIXED_RAW_SHA="cbf59535b8acb10989cb66da20e5d7d7fd9ab34cc679eca50c2179e04db478d2",FIXED_COMPILED_SHA="43e7fb4fb818efc60c325c72710b74ffb7c6d601d5710afa02f5b85be3670f67",FIXED_PAYLOAD_SHA="fcfd418357acfca5b5292b7fdd83c7157cc606ad4f937cd5f7a25eb6c7f0eaa5",FIXED_FILE_SHA="cd22bb35196582ca3e4eb8a122f6b5f260185b23daa326851cc2306d7ea6887c";
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);assert.equal(T.rawBaselineSHA256,FIXED_RAW_SHA);assert.equal(T.derivedSHA256,FIXED_COMPILED_SHA);assert.equal(T.fixturePayloadSHA256,FIXED_PAYLOAD_SHA);const bytes=readFileSync(new URL('./fixture.json',import.meta.url));assert.equal(sha(bytes),FIXED_FILE_SHA);const f=JSON.parse(bytes).u7d8e;assert.equal(digest(f),FIXED_PAYLOAD_SHA);assert.deepEqual(f.fullProof,args[1]);assert.equal(digest(f.rawBaseline),FIXED_RAW_SHA);assert.equal(digest(f.strokes),FIXED_COMPILED_SHA);assert.deepEqual(f.baseline,f.strokes);cachedCalls++;return f.strokes}

export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1))}
