export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs';
import assert from 'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';
const json=p=>JSON.parse(readFileSync(new URL(p,import.meta.url))),sha=x=>createHash('sha256').update(x).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const T=json('./config.json').targets.u905d,FIXED_PINS={"../hanja-goal-glyphwiki-batch1072-2026-10-13/NOTICE.md":"e73287978b39c0560f372db17d9c791af7607a761e4b0f756cbe7c31a5fd7af8","../hanja-goal-glyphwiki-batch1072-2026-10-13/candidate-compile-analysis.json":"7d18070b05b36ac75698892a3532b90afb8db289b4d8f7f07277e456f60323ed","../hanja-goal-glyphwiki-batch1072-2026-10-13/combined-native-source-pins.json":"1e438b51cc872bbecd5474f5b0f76ad6b384016c1547545e208961ce065f7011","../hanja-goal-glyphwiki-batch1072-2026-10-13/engine-proof.json":"747a19309cdf2b7188af2372a3f036be63ae6227dcdfea28788d81c06e9008ff","../hanja-goal-glyphwiki-batch1072-2026-10-13/engine-whole-u905d-k.json":"e6779897b76b7a3b4516076a60bca0693efb81f68c71344caa20b1b61d53a4fe","../hanja-goal-glyphwiki-batch1072-2026-10-13/engine-whole-u905d-ue0100.json":"e6779897b76b7a3b4516076a60bca0693efb81f68c71344caa20b1b61d53a4fe","../hanja-goal-glyphwiki-batch1072-2026-10-13/engine-whole-u905d-ue0101.json":"e6779897b76b7a3b4516076a60bca0693efb81f68c71344caa20b1b61d53a4fe","../hanja-goal-glyphwiki-batch1072-2026-10-13/engine-whole-u905d-ue0102.json":"ff6fd860826efcbdef27942cc62027ebb893d9fc2f5c2156557b4900bb4153a6","../hanja-goal-glyphwiki-batch1072-2026-10-13/engine-whole-u905d-var-001.json":"d7d3b1d6b1b6ae9fbbdaf5c03e380a65ba179ed2957fbbb55e0d885e7aefc0e5","../hanja-goal-glyphwiki-batch1072-2026-10-13/engine-whole-u905d-var-002.json":"709a7d1226c55c4a35fbe6ec1eebda7ecf22eff800b38ab06c363f29468aeaf3","../hanja-goal-glyphwiki-batch1072-2026-10-13/engine-whole-u905d-var-003.json":"6c0427f6491ca8be5ca770f887f536be2cf2cc0d7607fbbb0f591dba1d549d6e","../hanja-goal-glyphwiki-batch1072-2026-10-13/engine-whole-u905d-var-004.json":"1ac66bda5f433f3a102dc0fa42dc99818bc14a3911d0c9deee9d18e5d1c87ea4","../hanja-goal-glyphwiki-batch1072-2026-10-13/engine-whole-u905d-var-005.json":"38b94960a87cf1fb69cba1d9f41bcb2fd2bdb182fa61c2fb6472ad5e3454fc36","../hanja-goal-glyphwiki-batch1072-2026-10-13/engine-whole-u905d-var-006.json":"a06a72a9e5239622541ed57ef3d2cb3872f41fd4e7e524b9de1ee72181f9d616","../hanja-goal-glyphwiki-batch1072-2026-10-13/engine-whole-u905d.json":"7362e9e76893c652a5916e830e27254414ddd6568fa7583af5e27e1a1fdd5d51","../hanja-goal-glyphwiki-batch1072-2026-10-13/metadata.json":"1e6caeb9ffc9ec26bb5814b0f18534c97e7ddf6f60db72373eb58fa7432e8660","../hanja-goal-glyphwiki-batch1072-2026-10-13/native-server-input-pins.json":"758a61c67f6146c2ba2a919a42c6dfa76921ae24fe2054876b364a9605aa489b","../hanja-goal-glyphwiki-batch1072-2026-10-13/progressive.mjs":"629abe65e12f595b2150b6c392877b75ab802596120a1703a356558876005f6e","../hanja-goal-glyphwiki-batch1072-2026-10-13/serve-combined-native.py":"2f6733397ddb82fd371d3b70ca06fb79e297ab8a1cee35aaeb63638abaed2137","../hanja-goal-glyphwiki-batch1072-2026-10-13/serve-native.py":"7d484460acbb8340d41dbccd86fef61c2d2547a1b2aa2ab5a1dfb87431e7af58","../hanja-goal-glyphwiki-batch1072-2026-10-13/server-compile-strict-candidate.mjs":"492aba6e6eaef6c84f96d1857de6beee7a2768aa78d24841560f02837aa933f1","../hanja-goal-glyphwiki-batch1072-2026-10-13/source-analysis.json":"29a2fe8a530cfdd86aafc304e20d382281553b207c98a998e429bace6a2367e0","../hanja-goal-glyphwiki-batch1072-2026-10-13/source-join-analysis.json":"de61959a2d2e28ba6bc7fc983d0070769f5b8c3993491ea969b6bf4232375ff2","../hanja-goal-glyphwiki-batch1072-2026-10-13/source-only-helper-readiness.json":"469eca0635208eab501f384214c7cb178c2efff4182e28bd7e52b039dc4c2888","../hanja-goal-glyphwiki-batch1072-2026-10-13/sources.json":"edb92c6c5826253c6af36abd27bcf27b3d7bbf2792a84ba54abcaeae5d943f5e","../hanja-goal-glyphwiki-batch1072-2026-10-13/strict-native-adapter.mjs":"5215807a0464ec388fe81ef0a8d861cf9b86030a4434c5040f2355fed9300332","../hanja-goal-glyphwiki-batch1072-2026-10-13/strict-native-server-preflight.json":"f97ee749b6d041f4a2de962ebebd7fd09ba6bd6b90f27c737ea48f78ebc80782","../hanja-goal-glyphwiki-batch1072-2026-10-13/strict-source-candidate.d.mts":"a5fa9ef56c86352a7947d3e2b963ef080c16c8197fabdd6e85393e3edd216da8","../hanja-goal-glyphwiki-batch1072-2026-10-13/strict-source-candidate.mjs":"89299e7cb1607340ca5f7342b082ceb1e326cc78fd55f85ad60f0733cb0ab107","../hanja-goal-glyphwiki-batch1072-2026-10-13/strict-source-preparation.json":"b4441e8595d06426885796e39079cfd2cb8ea91aca6bf6605082cf5633a9dd64","../hanja-goal-glyphwiki-batch1072-2026-10-13/verify-source.mjs":"b8b24e15e1a6821fc593c5d1dc2b034d8826396c0ab4b9034d1932e131a590d3","../hanja-goal-glyphwiki-batch1072-2026-10-13/native-review.json":"62182a4986d584fcc72c98fa3f761a3f1c146aea3a455fe6877acc5c54b1d007","../hanja-goal-glyphwiki-batch1072-2026-10-13/checkpoint-README.md":"76540e0f0e8f1625ef2a37378f06d8214764b446721e7843b3934bd15922368d","../hanja-goal-glyphwiki-batch1072-2026-10-13/resume.json":"7736f13324b94684b0bc5f6d4f46be085f9842f3da26d2617988503f64e537de","../hanja-goal-glyphwiki-batch1072-2026-10-13/validation.json":"ba7ec35aa7b1c0a739686be3696a3c542431658a3a38c6474485ccadeed8b15a","../hanja-special2-direction-review-2026-09-21/serve.py":"3370373c8bebfebadc6cf789b144e852407787357c42b424dde33ecff169976c","../hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47","../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","../hanja-source-raw-compare-u7d3d-2026-10-20/serve.py":"1c7a4aa0db39d39293d76d06806c004cb72809978f97b42a8007c6d250dbf33a","../hanja-source-raw-compare-u7d3d-2026-10-20/check.mjs":"2ea264bdcb63609a215c1d67c1a0fdffe149a580930a52fafd14ce2183ce0e1d","../hanja-source-raw-compare-u905d-2026-10-21/README.md":"809b67b5b3930cc8617837a9e2fe97a6f79adba087f9324fa74fca15b942105c","../hanja-source-raw-compare-u905d-2026-10-21/check.mjs":"be8f72b83497ada12143f0463e134162f8d0a1f00a84b4de20fc9087b0271c79","../hanja-source-raw-compare-u905d-2026-10-21/config.json":"72dbed2cf6a08c927c6562d23a153f9cc00cd380ee3d4b532438ee5dd0fe04a7","../hanja-source-raw-compare-u905d-2026-10-21/serve.py":"c9a998d1831751f31132278c5ec03fa1e17327c2201ce0aa1fb21d8553215fd1","../hanja-source-raw-compare-u905d-2026-10-21/validation.json":"2fd9b3b62f3cee04df1663bb554c7f2d340f8a87dfb1bfc148b379a86bd0e5dd","../hanja-source-native-raw-correspondence-u905d-2026-10-21/review.json":"72ea39f52536d29e97cc351f7e8322383f8f8dec892cb9ec1a4a8a196f8596f6","../hanja-source-native-raw-correspondence-u905d-2026-10-21/README.md":"a82fa3b69cb6b0bbd0e328c36d2ba80233088f65a1a9c8edc59cdd1b04280b01","../hanja-source-independent-lq-u981e-source-experiment-2026-10-19/candidate.mjs":"e76180f741b37cf2712b97a8cb412a65185eccb3a37664aab1d08f396d55a020"},EXPECTED_IDENTITY={"sourceRoot":"u905d","sourceProofFile":"./engine-whole-u905d.json","sourceProofFileSha256":"7362e9e76893c652a5916e830e27254414ddd6568fa7583af5e27e1a1fdd5d51","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"747a19309cdf2b7188af2372a3f036be63ae6227dcdfea28788d81c06e9008ff"},EXPECTED_GROUPS=[[6],[7,8],[9],[10],[11],[12],[13],[14],[15],[16],[0],[1],[2,3],[4,5]],RAW_COUNT=17,ORIGINAL=[[{"kind":"cdDrawCurve","args":[27,21,46,30,58,46,7,8]}],[{"kind":"cdDrawCurve","args":[16,57,35,65,49,81,7,8]}],[{"kind":"cdDrawLine","args":[14,107,50,107,0,2]}],[{"kind":"cdDrawLine","args":[50,107,50,158,22,300]}],[{"kind":"cdDrawCurve","args":[16,179,35,168,55,154,0,7]}],[{"kind":"cdDrawBezier","args":[53,152,68,172,84,181,179,177,7,0]}],[{"kind":"cdDrawLine","args":[78.97675,25.01326875,78.97675,58.36670625,12,13]}],[{"kind":"cdDrawLine","args":[78.97675,25.01326875,172.02325,25.01326875,2,2]}],[{"kind":"cdDrawLine","args":[172.02325,25.01326875,172.02325,58.36670625,22,23]}],[{"kind":"cdDrawLine","args":[109.99225000000001,25.01326875,109.99225000000001,58.36670625,32,32]}],[{"kind":"cdDrawLine","args":[141.00775,25.01326875,141.00775,58.36670625,32,32]}],[{"kind":"cdDrawLine","args":[78.97675,58.36670625,172.02325,58.36670625,2,2]}],[{"kind":"cdDrawLine","args":[125.5,64.95,125.5,167.61,0,0]}],[{"kind":"cdDrawCurve","args":[110.275,82.65,92.875,101.235,66.775,115.395,0,7]}],[{"kind":"cdDrawCurve","args":[110.275,116.28,92.875,134.865,66.775,149.025,0,7]}],[{"kind":"cdDrawCurve","args":[141.45,82.65,164.65,92.385,178.425,111.855,7,8]}],[{"kind":"cdDrawCurve","args":[141.45,116.28,164.65,126.015,178.425,145.485,7,8]}]],TRACE_SHA256="222ef7140fc7893e4fb27e54d29d76f86f4bb6f9e94ea9ff92bc437586e86fcc",GROUPS_SHA256="1b19e99c210e6c20d1560c164804106363565a81510bf1ae95d70c75adb7ea43",PINNED_DEFAULTS={"kMage":10,"kWidth":5,"kMinWidthT":6,"kAdjustMageStep":5},ENGINE_REVISION="49232bac0348fe815f4200d4116ab7917e0db47f",ENGINE_HASHES={"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},ORIGINAL_SOURCE_GROUPS=[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16]],UP_TAIL_GROUPS=[],LEFT_TAIL_GROUPS=[],SINGLE_CARDINAL_TIP_RAW=[];
const endpoint=call=>call.args.slice(call.kind==='cdDrawLine'?2:call.kind==='cdDrawCurve'?4:6,call.kind==='cdDrawLine'?4:call.kind==='cdDrawCurve'?6:8),point=(x,y)=>({x:Math.floor(x*10)/10,y:Math.floor(y*10)/10,off:0});
const FIXED_RAW_SHA="509d62860a69d271403ecb6c5e774e57fe35fcba798ac8447824beea1bed814d",FIXED_COMPILED_SHA="a09c4b5aaa1eaae2e7ec70bf5cddb22f2dc450c3e92967bcc50ae69adf107c2c",FIXED_PAYLOAD_SHA="6da8521869d536763e534592f26e2d7298eed358245aac2f724ac4659d44837c";
export const sourceRoot='u905d',selectedProofIdentity=clone(EXPECTED_IDENTITY),sourceGroups=clone(EXPECTED_GROUPS),nativeApproval=false,runtimeApplied=false,actualAppUI=false;
function validateSelectedProof(trace,proof,identity){assert.equal(arguments.length,3);assert(identity&&Object.getPrototypeOf(identity)===Object.prototype);assert.deepEqual(identity,EXPECTED_IDENTITY);assert.deepEqual(T.identity,EXPECTED_IDENTITY);assert.deepEqual(T.inputSHA256,FIXED_PINS);assert.deepEqual(T.sourceGroups,EXPECTED_GROUPS);assert.equal(T.actualFull5File,'../hanja-goal-glyphwiki-batch1072-2026-10-13/engine-proof.json');assert.equal(T.selectedBody3File,'../hanja-goal-glyphwiki-batch1072-2026-10-13/engine-whole-u905d.json');assert.equal(T.actualFull5SHA256,'747a19309cdf2b7188af2372a3f036be63ae6227dcdfea28788d81c06e9008ff');assert.equal(T.selectedBody3SHA256,'7362e9e76893c652a5916e830e27254414ddd6568fa7583af5e27e1a1fdd5d51');for(const[p,h]of Object.entries(FIXED_PINS))assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h,p);assert(proof&&Object.getPrototypeOf(proof)===Object.prototype);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(digest(proof),'830b30c7f6088790e51abd1fd1c7d7db20443546dbb647b65f29ba75ecc806fe');assert.deepEqual(trace,proof.trace);const full=json(T.actualFull5File),body=json(T.selectedBody3File);assert.equal(sha(readFileSync(new URL(T.actualFull5File,import.meta.url))),T.actualFull5SHA256);assert.equal(sha(readFileSync(new URL(T.selectedBody3File,import.meta.url))),T.selectedBody3SHA256);assert.deepEqual(full,proof);assert.deepEqual(body,{groups:full.groups,trace:full.trace,defaults:full.defaults});}
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
function mergeExact(raw,indices,trace){assert(indices.length===2);assert(EXPECTED_GROUPS.some(g=>JSON.stringify(g)===JSON.stringify(indices)));assert([[2,3],[7,8]].some(g=>JSON.stringify(g)===JSON.stringify(indices)));const calls=indices.flatMap(i=>trace[i]);assert.equal(calls.length,2);assert.deepEqual(endpoint(calls[0]),calls[1].args.slice(0,2),'no connector or positive gap joins');const parts=indices.map(i=>{assert.equal(raw[i].length,1);return raw[i][0]}),first=calls[0].args;return{outline:parts.map(p=>p.outline).join(' '),bounds:[Math.min(...parts.map(p=>p.bounds[0])),Math.min(...parts.map(p=>p.bounds[1])),Math.max(...parts.map(p=>p.bounds[2])),Math.max(...parts.map(p=>p.bounds[3]))],direction:'curve',weight:Math.round(parts.reduce((n,p)=>n+p.weight,0)*1e6)/1e6,revealPath:'M'+first[0]/2+' '+first[1]/2+' '+calls.map(c=>{const a=c.args;return c.kind==='cdDrawLine'?'L'+a[2]/2+' '+a[3]/2:c.kind==='cdDrawCurve'?'Q'+a[2]/2+' '+a[3]/2+' '+a[4]/2+' '+a[5]/2:'C'+a[2]/2+' '+a[3]/2+' '+a[4]/2+' '+a[5]/2+' '+a[6]/2+' '+a[7]/2}).join(' '),revealWidth:14}}
let projectionRuns=0,internalRawProjectorRuns=0,cachedCalls=0;
export function captureProjection(...args){assert.equal(args.length,3);validateSelectedProof(...args);assert.equal(projectionRuns,0,'author first projection only');projectionRuns++;internalRawProjectorRuns++;const[trace,proof,identity]=args,rawBaseline=projectRaw(trace,proof,identity),strokes=EXPECTED_GROUPS.map(g=>g.length===1?rawBaseline[g[0]]:g[0]===4?g.flatMap(i=>rawBaseline[i]):[mergeExact(rawBaseline,g,trace)]);return{fullProof:proof,rawBaseline,baseline:clone(strokes),strokes,traceProjectionOperations:1,newInternalRawProjectorExecutions:1,originalCompilerExecutions:0,existingFactoryCalls:0,engineRuns:0,tailDerivations:0,staticMappingApproved:true,nativeAnimationApproved:false,nativeApproval:false,runtimeApplied:false}}
export function compileProgressive(...args){assert.equal(args.length,3);validateSelectedProof(...args);assert.equal(T.rawBaselineSHA256,FIXED_RAW_SHA);assert.equal(T.derivedSHA256,FIXED_COMPILED_SHA);assert.equal(T.fixturePayloadSHA256,FIXED_PAYLOAD_SHA);const f=json('./fixtures.json').u905d;assert.equal(digest(f),FIXED_PAYLOAD_SHA);assert.equal(digest(f.fullProof),T.fullProofSHA256);assert.equal(digest(f.rawBaseline),T.rawBaselineSHA256);assert.equal(digest(f.strokes),T.derivedSHA256);assert.deepEqual(f.baseline,f.strokes);cachedCalls++;return f.strokes}
export function compileSourceWhole(...args){assert.equal(args.length,4);assert.equal(args[0],sourceRoot);return compileProgressive(...args.slice(1))}
export function traceProjectionCallCount(){return projectionRuns}
export function newInternalRawProjectorCallCount(){return internalRawProjectorRuns}
export function cachedPositiveCallCount(){return cachedCalls}
export function originalSourceCompilerCallCount(){return 0}
export function existingFactoryCallCount(){return 0}
