import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs';
const sha=value=>createHash('sha256').update(value).digest('hex');
const digest=value=>sha(JSON.stringify(value));
const read=name=>readFileSync(new URL(name,import.meta.url));
const CONFIG_SHA='7d1427b61a163d069c5add38006fc6567de6a3e738e614ef1dc6ddc799b0e230';
const FIXTURE_SHA='1a7fcfa6ff19f91eeb6957ee8b7476a605f9e35495a909fcda349261c373f741';
const IDENTITY={"root":"u75b7","file":"../hanja-goal-glyphwiki-batch838-2026-10-13/engine-whole-u75b7.json","fileSHA256":"a79941bfb48ad7f6433d9285c68c3be71cd0e205ebcfece1fa1015318e7e1f7b"};
const INPUT_PINS={"docs/hanja-goal-glyphwiki-batch838-2026-10-13/sources.json":"2914540de3bccab6f042c0ad68d3adc6b0cdc57d0d2eeb06b992fa3132b8de22","docs/hanja-goal-glyphwiki-batch838-2026-10-13/metadata.json":"54a6cf43aeb65b4cc3a32a4b86447091d90fa6673c1ab8acc541c55e791257f3","docs/hanja-goal-glyphwiki-batch838-2026-10-13/source-analysis.json":"6a145f1546a7195fb89bf7fc8cb33eda6c2ec563ddfd96c30570ba316a1a7520","docs/hanja-goal-glyphwiki-batch838-2026-10-13/source-join-analysis.json":"642bc17e8504236d8f38da30ff81531bd0b8847d62c8c309c75d66f6eb704640","docs/hanja-goal-glyphwiki-batch838-2026-10-13/candidate-compile-analysis.json":"a132845a2321642d5eae17886e2e52e861b552bc36cf15b22d21fe378c4cf686","docs/hanja-goal-glyphwiki-batch838-2026-10-13/native-raw6-7-source-analysis.json":"c8e11d78ed9524c46513710edee4a2f2efc29b566c7cf8bc43a224891d3531f4","docs/hanja-goal-glyphwiki-batch838-2026-10-13/source-preservation-audit.json":"651856f08300599539cc8f1e57816e747e0dcb6be334d0f3f84a68b3a4313e0d","docs/hanja-goal-glyphwiki-batch838-2026-10-13/review.json":"125adca95f4468686194aca7a330a32bda1f3484b6ab9697bcd278c8ac933ab8","docs/hanja-goal-glyphwiki-batch838-2026-10-13/validation.json":"b82a9fa128be2d4958aafd0fa660868e4d06185c83c9525fb787efdd955cd222","docs/hanja-goal-glyphwiki-batch838-2026-10-13/NOTICE.md":"5ed83a7fccdb833fd354562dedfdf67bbbbc485eca7ec5695eb5ea36c10a1743","docs/hanja-goal-glyphwiki-batch838-2026-10-13/progressive.mjs":"08ebe4526d499bf635ddc843cceb8aafc64efc0d8a8d2653325ca4ba70b98dcf","docs/hanja-goal-glyphwiki-batch838-2026-10-13/engine-proof.json":"a79941bfb48ad7f6433d9285c68c3be71cd0e205ebcfece1fa1015318e7e1f7b","docs/hanja-goal-glyphwiki-batch838-2026-10-13/engine-whole-u75b7.json":"a79941bfb48ad7f6433d9285c68c3be71cd0e205ebcfece1fa1015318e7e1f7b","docs/hanja-goal-glyphwiki-batch838-2026-10-13/engine-whole-u75b7-ue0100.json":"127f54d16dbdedb324db999e67f71a2013366a026b59eba1f8fbd821c7df834a","docs/hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09","docs/hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47"};
const ORDER=[1,2,3,4,5,6,7,8,9,10];
const GROUPS=[[0],[1],[2],[3],[4],[5],[6,7],[8],[9],[10]];
const OLD_GROUPS=[[0],[1],[2],[3],[4],[5],[6,7],[8],[9],[10]];
const PROOF_SHA='daf7056e34964d983f5a5fdbc5233249d18407d246be9367a2ef21f3354f466c';
const BASELINE_SHA='59f289012fa5c31ab8c75d82cfcffdc9a138d7908bf602e36e4925657957e945';
const FINAL_SHA='59f289012fa5c31ab8c75d82cfcffdc9a138d7908bf602e36e4925657957e945';
let cachedCalls=0;
export const sourceRoot='u75b7';
export const sourceProofFile='../hanja-goal-glyphwiki-batch838-2026-10-13/engine-whole-u75b7.json';
export const sourceProofFileSha256='a79941bfb48ad7f6433d9285c68c3be71cd0e205ebcfece1fa1015318e7e1f7b';
export const selectedProofIdentity=Object.freeze(IDENTITY);
export const sourceGroups=Object.freeze(GROUPS.map(g=>Object.freeze(g)));
export const nativeApproval=false,runtimeApplied=false;
function plain(value){assert(value&&Object.getPrototypeOf(value)===Object.prototype);}
export function validateCachedFixture(f){
  plain(f);
  assert.deepEqual(Object.keys(f).sort(),['baselineSHA256','derivedSHA256','engineRuns','newTailDerivations','originalOrderBaseline','originalPenOrder','root','schema','sourceCompilerPositiveCountDuringPreparation']);
  assert.equal(f.schema,1);assert.equal(f.root,sourceRoot);
  assert.deepEqual(f.originalPenOrder,ORDER);
  assert.equal(f.sourceCompilerPositiveCountDuringPreparation,1);
  assert.equal(f.newTailDerivations,0);assert.equal(f.engineRuns,0);
  assert.equal(f.baselineSHA256,BASELINE_SHA);assert.equal(f.derivedSHA256,FINAL_SHA);
  assert.equal(digest(f.originalOrderBaseline),BASELINE_SHA);
  assert.equal(f.originalOrderBaseline.length,10);
  assert.equal(f.originalOrderBaseline.reduce((s,p)=>s+p.length,0),13);
  const strokes=ORDER.map(i=>f.originalOrderBaseline[i-1]);
  assert.equal(digest(strokes),FINAL_SHA);
  return strokes;
}
function validate(trace,proof,identity){
  plain(identity);assert.deepEqual(identity,IDENTITY);
  plain(proof);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);
  assert.deepEqual(trace,proof.trace);assert.equal(digest(proof),PROOF_SHA);
  const configBytes=read('./config.json');assert.equal(sha(configBytes),CONFIG_SHA);
  const target=JSON.parse(configBytes).targets.u75b7;
  assert.deepEqual(target.identity,IDENTITY);assert.deepEqual(target.inputSHA256,INPUT_PINS);
  assert.deepEqual(target.originalPenOrder,ORDER);assert.deepEqual(target.baselinePenMap,ORDER);
  assert.deepEqual(target.sourceGroups,GROUPS);assert.deepEqual(target.originalSourceGroups,OLD_GROUPS);
  assert.equal(target.fullProofSHA256,PROOF_SHA);assert.equal(target.baselineSHA256,BASELINE_SHA);assert.equal(target.derivedSHA256,FINAL_SHA);
  assert.equal(target.fixtureSHA256,FIXTURE_SHA);assert.equal(target.nativeApproval,false);assert.equal(target.runtimeApplied,false);
  for(const [file,expected]of Object.entries(INPUT_PINS))assert.equal(sha(read('../../'+file)),expected,file);
  const actualBytes=read(sourceProofFile);assert.equal(sha(actualBytes),sourceProofFileSha256);
  assert.deepEqual(JSON.parse(actualBytes),proof);
}
export function compileProgressive(...args){
  assert.equal(args.length,3);const[trace,proof,identity]=args;validate(trace,proof,identity);
  const bytes=read('./fixtures.json');assert.equal(sha(bytes),FIXTURE_SHA);
  const result=validateCachedFixture(JSON.parse(bytes));cachedCalls++;return result;
}
export function compileSourceWhole(...args){
  assert.equal(args.length,4);const[root,trace,proof,identity]=args;assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity);
}
export function sourceCompileCallCount(){return 0;}
export function geometryDerivationCallCount(){return 0;}
export function cachedPositiveCallCount(){return cachedCalls;}
export const preparationOriginalCompilerPositiveCount=1;
