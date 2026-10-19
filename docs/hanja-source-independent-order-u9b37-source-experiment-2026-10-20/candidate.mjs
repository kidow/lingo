import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs';
const sha=value=>createHash('sha256').update(value).digest('hex');
const digest=value=>sha(JSON.stringify(value));
const read=name=>readFileSync(new URL(name,import.meta.url));
const CONFIG_SHA='7d724bb1049c6449e67e4be40e5114859555334be5bb6322e4f0fa5e617b011f';
const FIXTURE_SHA='ea19f08960d5422099989c7639ad3a39458871e50a90b7cb2b7b8f610713f670';
const IDENTITY={"sourceRoot":"u9b37","sourceProofFile":"./engine-whole-u9b37.json","sourceProofFileSha256":"d0b4a55d6516204f56b74b66045c10b9cd5696ebb26892ec9155af52066d9e16"};
const INPUT_PINS={"docs/hanja-goal-glyphwiki-batch877-2026-10-13/sources.json":"ffb9d5fdbe20a7b79291b54f1c66db8decaa7b85d187b7154b0aaf1a3d0f9d8f","docs/hanja-goal-glyphwiki-batch877-2026-10-13/metadata.json":"dd7b83ebf386cb6b9d4143401c418af4423a8c0dde48b75b0f2b732b4a9be724","docs/hanja-goal-glyphwiki-batch877-2026-10-13/source-analysis.json":"934874a61ab099a5302e76a47e1d11dcafb18b04117f4cba68ab2679c5ecac7d","docs/hanja-goal-glyphwiki-batch877-2026-10-13/source-join-analysis.json":"c49af0ac2f2227a849fc63211204b6471f828df07401f79eb7c556e301ecb312","docs/hanja-goal-glyphwiki-batch877-2026-10-13/candidate-compile-analysis.json":"a4513aed312dee8fa5aa633c573895ffa10da38bd362ce97fd8e73e6604e5cbd","docs/hanja-goal-glyphwiki-batch877-2026-10-13/review.json":"4e38f9aef6e080b412603a0e2342c66df6c20af32d5693a9f9f07d9f87777371","docs/hanja-goal-glyphwiki-batch877-2026-10-13/engine-proof.json":"d0b4a55d6516204f56b74b66045c10b9cd5696ebb26892ec9155af52066d9e16","docs/hanja-goal-glyphwiki-batch877-2026-10-13/engine-whole-u9b37.json":"d0b4a55d6516204f56b74b66045c10b9cd5696ebb26892ec9155af52066d9e16","docs/hanja-goal-glyphwiki-batch877-2026-10-13/engine-whole-u9b37-ue0100.json":"caea13f67f1825f0e3b28e61b6bad6448359296b763b6ceacc8a84a485412654","docs/hanja-goal-glyphwiki-batch877-2026-10-13/progressive.mjs":"f0451f4737a63bd12a7091496e4fa0c908f7a1eb716bf02cf3d3d4ca184e3d5c","docs/hanja-goal-glyphwiki-batch877-2026-10-13/serve-native.py":"4c97299986d36ea225fab049215e09ea7c3f15e8a01db9bfb26503affbbdb333","docs/hanja-goal-glyphwiki-batch877-2026-10-13/native-server-compile.mjs":"497b5130b710aab8f822611d8eb0b508331190d76027a487b782f03ebfb5aacc","docs/hanja-goal-glyphwiki-batch877-2026-10-13/native-server-source-audit.json":"c308d1c5c030e4ab3a55f2e98f839337f3c0c5f79f689f33b07cd7101309529e","docs/hanja-g2-batch10-2026-09-16/serve.py":"3aa179d2dba9043c213052c2fb6a51664a0403682292769325aac38143c83a47","docs/hanja-hold-recovery-u9b37-existing-cache-experiment-2026-10-20/README.md":"1704c4071e96e2f57064d5e70238fc84d5785639bcd037d4e624fb6586bbf93b","docs/hanja-hold-recovery-u9b37-existing-cache-experiment-2026-10-20/config.json":"e437bdaa4514bb3d151b91b8c1f8a3979db824d9a98c9cbe95206fb2db2c3922","docs/hanja-hold-recovery-u9b37-existing-cache-experiment-2026-10-20/server.py":"b53781742401d4da75ca4ec724809c7386e2d88da89fdfaeb5977f4c98fa47f6","docs/hanja-hold-recovery-u9b37-existing-cache-experiment-2026-10-20/browser.mjs":"45ef83265999c4a9695854dc9140a2cbe9d80bf034f39a54a9e1756e0561f623","docs/hanja-hold-recovery-u9b37-existing-cache-experiment-2026-10-20/check.mjs":"920f74d5019352df8c255281a201bb2ae87e07c560c6071c0e4831c1a482a0b5","docs/hanja-hold-recovery-u9b37-existing-cache-experiment-2026-10-20/validation.json":"148cfed9b45a31eb82f09388b0a66fcc408194964c9ca210e7591087fd6f3805","docs/hanja-source-order-u9b37-native-recheck-2026-10-20/README.md":"3835762c67d2b92209e602a45253855f009c4809ccfd27f521ec65e24845cefe","docs/hanja-source-order-u9b37-native-recheck-2026-10-20/review.json":"6e5c17ffce8b5baa981b0c20f679e94a052f6d76bf9347c940a2af6e0fbd920d","docs/hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs":"a69ec8daf44d40344a112e6e5cd4da39079e82ce03c6ebdadc391dd9064eae09"};
const ORDER=[1,2,3,4,5,6,7,8,9,10,15,16,11,12,13,14,17,18,19];
const GROUPS=[[0],[1],[2,3],[4],[5],[6,7],[8],[9],[10],[11],[17],[18],[12,14],[13],[15],[16],[19],[20,21],[22]];
const OLD_GROUPS=[[0],[1],[2,3],[4],[5],[6,7],[8],[9],[10],[11],[12,14],[13],[15],[16],[17],[18],[19],[20,21],[22]];
const PROOF_SHA='80737dfdb82e1b5cefe5e039328395f1299c69be41ec68a06e350b27ff109f4c';
const BASELINE_SHA='db10c40a7b916651c14c2048125c5c67fd114d781b44073f8770926dcdbe27e7';
const FINAL_SHA='faf153afd4f1e98808d9f835a2bd565d3ee4f49a7b57dedf2785cecdce8d0402';
let cachedCalls=0;
export const sourceRoot='u9b37';
export const sourceProofFile='../hanja-goal-glyphwiki-batch877-2026-10-13/engine-whole-u9b37.json';
export const sourceProofFileSha256='d0b4a55d6516204f56b74b66045c10b9cd5696ebb26892ec9155af52066d9e16';
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
  assert.equal(f.originalOrderBaseline.length,19);
  assert.equal(f.originalOrderBaseline.reduce((s,p)=>s+p.length,0),22);
  const strokes=ORDER.map(i=>f.originalOrderBaseline[i-1]);
  assert.equal(digest(strokes),FINAL_SHA);
  return strokes;
}
function validate(trace,proof,identity){
  plain(identity);assert.deepEqual(identity,IDENTITY);
  plain(proof);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);
  assert.deepEqual(trace,proof.trace);assert.equal(digest(proof),PROOF_SHA);
  const configBytes=read('./config.json');assert.equal(sha(configBytes),CONFIG_SHA);
  const target=JSON.parse(configBytes).targets.u9b37;
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
