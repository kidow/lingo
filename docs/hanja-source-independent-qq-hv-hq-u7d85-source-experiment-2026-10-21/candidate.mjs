export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs';
import assert from 'node:assert/strict';import{readFileSync,existsSync}from'node:fs';import{createHash}from'node:crypto';import{fileURLToPath}from'node:url';
const json=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=x=>createHash('sha256').update(x).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const T=json('./config.json').targets.u7d85,FIXED_PINS={"../hanja-goal-glyphwiki-batch950-2026-10-13/NOTICE.md":"ee294025a1b10fb184df281213b63b15a01fbc45cba6807fe8c279d77e46a714","../hanja-goal-glyphwiki-batch950-2026-10-13/README.md":"3d60b528cb28357376a3bb1050dbb62ccd6d40471509a1f05eceb76a9f3061d7","../hanja-goal-glyphwiki-batch950-2026-10-13/candidate-compile-analysis.json":"b25f5351cc0b76e12049e8eee82184139bb47cb17903c0cb50a600a672f7835f","../hanja-goal-glyphwiki-batch950-2026-10-13/engine-proof.json":"e8ef74a7a640edd8e94f088bba54260334bcb436aba10326ad172b7a58a26d83","../hanja-goal-glyphwiki-batch950-2026-10-13/engine-whole-u7d85-ue0100.json":"47711a84753cdf7715cfff31f9eeb30f26f95cf9d94856ee93ffb61773d97e74","../hanja-goal-glyphwiki-batch950-2026-10-13/engine-whole-u7d85.json":"cee1fe49497bf4b741e1b06ca9b73dacadda7e975e4926420937caa3b2ea5c0c","../hanja-goal-glyphwiki-batch950-2026-10-13/metadata.json":"ba04bed7a0c534abaa00ccdce25dd68b51f22ca40c0a53565ec4106b7cd04b89","../hanja-goal-glyphwiki-batch950-2026-10-13/native-server-input-pins.json":"7da026cd97bd5295d18d12f7a220b6285cf0aa112f0a4d28f4bf2b1953fb771b","../hanja-goal-glyphwiki-batch950-2026-10-13/progressive.mjs":"ae48cfd0d894fe16d9dbfea1541dcb3b7eeb4f0bfcd84120926347109c763b8e","../hanja-goal-glyphwiki-batch950-2026-10-13/resume.json":"7d925a1120616d3bbe550244af3bd8d501cfd4977729c078642e9b13aff90d0c","../hanja-goal-glyphwiki-batch950-2026-10-13/serve-native.py":"44cac8a9810820c8b204edb13d859dc58433b68a9af1cbfcc727089e314a8156","../hanja-goal-glyphwiki-batch950-2026-10-13/source-analysis.json":"81a86b337fa646df0e2eb2a3d8cf562d15e6ad631de59fdf8ee878358b7b48cb","../hanja-goal-glyphwiki-batch950-2026-10-13/source-hold.json":"01f1c10366b82241cbfc6772d2eab2e78510a4ee280bab9bd29725ffed953b1b","../hanja-goal-glyphwiki-batch950-2026-10-13/source-join-analysis.json":"4c3e17075465303f837481838870ecd07eae47b4327fdc63df5b88328a48b29d","../hanja-goal-glyphwiki-batch950-2026-10-13/source-preservation-audit.json":"3047928055d484db4020091ccc3dfa789695fc12fc7985db42a4a33b6bb21139","../hanja-goal-glyphwiki-batch950-2026-10-13/sources.json":"23573938df571b36cd064c131bc01a8e32a40161822c42cae95cc7d70e8f9d18","../hanja-goal-glyphwiki-batch950-2026-10-13/strict-native-adapter.mjs":"c8dec30a16827f6cb3d0551b07dc703cc1bac6c1803ce3c0ef15454b48c584d4","../hanja-goal-glyphwiki-batch950-2026-10-13/strict-native-server-preflight.json":"22581b3f7e72800ca6607e1f1f4b781ca7a6d3af8721e28a1a9917cfd10e598c","../hanja-goal-glyphwiki-batch950-2026-10-13/validation.json":"ffc4985fa1894a0fb779c90b81ab5ed9c1c2dca0dd779aed724611201b991472","../hanja-goal-glyphwiki-batch950-2026-10-13/verify-source.mjs":"9dbaad881685ee7e9d85b67259e0293953e7fe0c21c6b185f4ef5891027b24ce","../hanja-source-raw-compare-u7d85-2026-10-21/config.json":"b8114e48388429fda352b75702b815a0aa9ecca1a9f56445bb05e3b92be01dd1","../hanja-source-raw-compare-u7d85-2026-10-21/README.md":"443e8052b7732283f673fba7b8be314a449f1500c386191e327ec0ccf8ee5e51","../hanja-source-raw-compare-u7d85-2026-10-21/serve.py":"25266cacf9c4aa8fe22e808e7446c0d5332bd1ddbbf374c267bdfc45067e90f7","../hanja-source-raw-compare-u7d85-2026-10-21/check.mjs":"faf01adc988a758f69e80e64e74fdc604b1efb9af434bdf847311185fff0a8a3","../hanja-source-raw-compare-u7d85-2026-10-21/validation.json":"fc3b0e939b998f98484eb9b05a7aa252fc8d811410714beb443a5b3b25563068","../hanja-source-raw-review-u7d85-2026-10-21/README.md":"2174624c2e409e1fd4f1a6a69a424c1efcc0c7a01d8c40f286cfa2b5f8298207","../hanja-source-raw-review-u7d85-2026-10-21/review.json":"1c68321bb406783f9e1554104ed518f1ca12c0619215baa2ce36c4151db75663","../hanja-source-independent-qq-hv-u7c1c-source-experiment-2026-10-21/candidate.mjs":"d7e7a436a03903782437c22137f70bd253e85f835af7bc645edb6699921ae2b8","../hanja-source-independent-qq-hv-u7c1c-source-experiment-2026-10-21/source-check.mjs":"92ad1d5d275a6b8184dbcee777c5f55e051346cdc846641ae743ec782c1d6fe1","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47","../hanja-g2-batch10-2026-09-16/originals.json":"5e14aff1d1c731ad58cbcd4e48fffda5197361ecacd5ff4732e529775f5eda91"},EXPECTED_IDENTITY={"sourceRoot":"u7d85","sourceProofFile":"engine-proof.json","sourceProofFileSha256":"e8ef74a7a640edd8e94f088bba54260334bcb436aba10326ad172b7a58a26d83"},EXPECTED_GROUPS=[[0,1],[2,3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13,14],[15,16],[17]];
function strictJSON(v){if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'){assert(Number.isFinite(v));return}assert(v&&typeof v==='object');if(Array.isArray(v)){assert.equal(Object.getPrototypeOf(v),Array.prototype);assert.equal(Reflect.ownKeys(v).length,v.length+1);for(let i=0;i<v.length;i++){assert(Object.hasOwn(v,i));const d=Object.getOwnPropertyDescriptor(v,String(i));assert(d&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}assert.equal(Object.getPrototypeOf(v),Object.prototype);assert.equal(Reflect.ownKeys(v).length,Object.keys(v).length);for(const k of Object.keys(v)){const d=Object.getOwnPropertyDescriptor(v,k);assert(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}
export const sourceRoot='u7d85',selectedProofIdentity=clone(EXPECTED_IDENTITY),sourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
const EXPECTED_CONFIG_SHA="9327bbbc6d1c8880ab7533683cd093c1313cc8530d2fc216cbc157d15a619576";
function validateSelectedProof(trace,proof,identity){assert.equal(arguments.length,3);assert.equal(sha(readFileSync(new URL('./config.json',import.meta.url))),EXPECTED_CONFIG_SHA);strictJSON(identity);strictJSON(proof);strictJSON(trace);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.sourceGroups,EXPECTED_GROUPS);for(const[p,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h,p);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),"8af797e3ed009a1b8f630ea9346a45d3af79fcf964da48b788b3bfc515eae1c0");assert.deepEqual(trace,proof.trace);assert.equal(T.actualFull5File,"../hanja-goal-glyphwiki-batch950-2026-10-13/engine-proof.json");assert.equal(sha(readFileSync(new URL(T.actualFull5File,import.meta.url))),EXPECTED_IDENTITY.sourceProofFileSha256);assert.deepEqual(json(T.actualFull5File),proof);assert.equal(T.selectedBody3File,"../hanja-goal-glyphwiki-batch950-2026-10-13/engine-whole-u7d85.json");const body=json(T.selectedBody3File);assert.equal(sha(readFileSync(new URL(T.selectedBody3File,import.meta.url))),"cee1fe49497bf4b741e1b06ca9b73dacadda7e975e4926420937caa3b2ea5c0c");assert.deepEqual(Object.keys(body).sort(),['defaults','groups','trace']);for(const k of['defaults','groups','trace'])assert.deepEqual(body[k],proof[k]);}
const RAW_COUNT=18,ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17]],ORIGINAL=[[{"kind":"cdDrawCurve","args":[50.85,16,40.7,37,28.375,56,0,7]}],[{"kind":"cdDrawCurve","args":[13.15,45,30.55,56,37.8,76,7,8]}],[{"kind":"cdDrawCurve","args":[71.875,39,51.575,76,27.65,110,0,7]}],[{"kind":"cdDrawCurve","args":[14.6,113,45.05,109,71.875,101,0,7]}],[{"kind":"cdDrawCurve","args":[56.65,78,70.425,91,76.225,114,7,8]}],[{"kind":"cdDrawLine","args":[47.95,109,47.95,186,32,0]}],[{"kind":"cdDrawCurve","args":[30.55,127,27.65,155,13.15,180,0,7]}],[{"kind":"cdDrawCurve","args":[57.375,122,70.425,136,75.5,161,7,8]}],[{"kind":"cdDrawLine","args":[106.28,24,163.79,24,0,2]}],[{"kind":"cdDrawLine","args":[163.79,24,163.79,70,22,223]}],[{"kind":"cdDrawLine","args":[94.13,47,186.47,47,0,200]}],[{"kind":"cdDrawLine","args":[106.28,70,163.79,70,0,2]}],[{"kind":"cdDrawCurve","args":[95.07365,82.4,95.6528,106.45,86.3864,114.25,7,8]}],[{"kind":"cdDrawLine","args":[95.6528,92.15,179.0504,92.15,0,2]}],[{"kind":"cdDrawCurve","args":[179.0504,92.15,175.5755,99.95,167.46740000000003,112.95,22,7]}],[{"kind":"cdDrawLine","args":[99.8,116,162.17000000000002,116,0,2]}],[{"kind":"cdDrawCurve","args":[162.17000000000002,116,141.92000000000002,168,75.5,185,22,7]}],[{"kind":"cdDrawCurve","args":[115.19,116,132.2,166,177.56,178,7,0]}]],TRACE_SHA256="7cdb528d9ab141a8ca2cd62559395ecfaf851db8267b0835929b719aae28f8ee",GROUPS_SHA256="553c72cad881bf81bdb56cb3c8a71300b1151628961cf4980f876ea4a2714c69",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[];
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
function mergeExact(raw,indices,trace){assert([[8,9],[13,14],[15,16]].some(g=>JSON.stringify(g)===JSON.stringify(indices)));assert(EXPECTED_GROUPS.some(g=>JSON.stringify(g)===JSON.stringify(indices)));assert.equal(indices.length,2);const calls=indices.flatMap(i=>trace[i]);assert.equal(calls.length,2);assert.equal(calls[0].kind,'cdDrawLine');assert.equal(calls[1].kind,indices[0]===8?'cdDrawLine':'cdDrawCurve');assert.deepEqual(endpoint(calls[0]),calls[1].args.slice(0,2),'exact source endpoint; no connector');const parts=indices.map(i=>{assert.equal(raw[i].length,1);return raw[i][0]}),first=calls[0].args;return{outline:parts.map(p=>p.outline).join(' '),bounds:[Math.min(...parts.map(p=>p.bounds[0])),Math.min(...parts.map(p=>p.bounds[1])),Math.max(...parts.map(p=>p.bounds[2])),Math.max(...parts.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(parts.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:'M'+first[0]/2+' '+first[1]/2+' '+calls.map(c=>{const a=c.args;return c.kind==='cdDrawLine'?'L'+a[2]/2+' '+a[3]/2:'Q'+a[2]/2+' '+a[3]/2+' '+a[4]/2+' '+a[5]/2}).join(' '),revealWidth:14}}
let projectionRuns=0,internalRawProjectorRuns=0,cachedCalls=0;
export function captureProjection(...args){assert.equal(args.length,3);assert(!existsSync(new URL('./fixtures.json',import.meta.url)),'public fixture exists; projection disabled');validateSelectedProof(...args);assert.equal(projectionRuns,0,'author first projection only');projectionRuns++;internalRawProjectorRuns++;const[trace,proof,identity]=args,rawBaseline=projectRaw(trace,proof,identity),strokes=EXPECTED_GROUPS.map(g=>g.length===1?rawBaseline[g[0]]:(g[0]===0||g[0]===2)?g.flatMap(i=>rawBaseline[i]):[mergeExact(rawBaseline,g,trace)]);return{fullProof:proof,rawBaseline,baseline:clone(strokes),strokes,traceProjectionOperations:1,newInternalRawProjectorExecutions:1,originalCompilerExecutions:0,existingFactoryCalls:0,engineRuns:0,tailDerivations:0,staticMappingApproved:true,nativeAnimationApproved:false,nativeApproval:false,runtimeApplied:false}}
export function traceProjectionCallCount(){return projectionRuns}export function newInternalRawProjectorCallCount(){return internalRawProjectorRuns}export function cachedPositiveCallCount(){return cachedCalls}export function originalSourceCompilerCallCount(){return 0}export function existingFactoryCallCount(){return 0}
if(process.argv[1]===fileURLToPath(import.meta.url)){assert.equal(process.argv.length,3);assert.equal(process.argv[2],'--author-capture-once');const proof=json(T.actualFull5File),payload=captureProjection(proof.trace,proof,EXPECTED_IDENTITY);process.stdout.write(JSON.stringify({u7d85:payload}))}
const FIXED_RAW_SHA="c903fce5c6a4bee54dbdf61bd7e2a6b0ba185c5d591c89c7bbe1b596d6a2bf56",FIXED_COMPILED_SHA="5333f55bf957db713a728f045fd7d3803c85605a0acbc61841278ec41a75bd09",FIXED_PAYLOAD_SHA="0db596b839dfae19741bb91b2ffe3ab4d682f314ad2b7af95a4a48eeeca3bf4a",FIXED_FILE_SHA="48bdc3cf39f8c0eb167f60c25d782a305d1785bab552c600967c12963e3c9fcf";
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);assert.equal(T.rawBaselineSHA256,FIXED_RAW_SHA);assert.equal(T.derivedSHA256,FIXED_COMPILED_SHA);assert.equal(T.fixturePayloadSHA256,FIXED_PAYLOAD_SHA);const bytes=readFileSync(new URL('./fixtures.json',import.meta.url));assert.equal(sha(bytes),FIXED_FILE_SHA);const f=JSON.parse(bytes).u7d85;strictJSON(f);assert.equal(digest(f),FIXED_PAYLOAD_SHA);assert.equal(digest(f.fullProof),T.fullProofSHA256);assert.equal(digest(f.rawBaseline),FIXED_RAW_SHA);assert.equal(digest(f.strokes),FIXED_COMPILED_SHA);assert.deepEqual(f.baseline,f.strokes);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1))}
