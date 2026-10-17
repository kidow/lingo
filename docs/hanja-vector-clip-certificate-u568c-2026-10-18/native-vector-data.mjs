// 공개 고정 proof만 RAM에서 읽는 native viewer 입력. 원 engine/source compiler 실행 없음.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {buildMesh,certifyMesh,buildField,summarize,exact} from './vector-certificate.mjs';
const HERE=path.dirname(fileURLToPath(import.meta.url)),ROOT=path.resolve(HERE,'../..'),cfg=JSON.parse(fs.readFileSync(path.join(HERE,'native-vector-config.json'),'utf8'));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex'),read=f=>fs.readFileSync(path.join(ROOT,f));
for(const [file,hash]of Object.entries({...cfg.immutablePins,...cfg.experimentFilePins})){const resolved=path.resolve(ROOT,file);assert.ok(resolved.startsWith(ROOT+path.sep));assert.equal(sha(read(file)),hash,'pin changed: '+file)}
assert.equal(cfg.grid,200);assert.equal(cfg.nativeApproval,false);assert.equal(cfg.runtimeApplied,false);
const certificateText=fs.readFileSync(path.join(HERE,'certificate.json'),'utf8'),stored=JSON.parse(certificateText),proof=JSON.parse(read(cfg.wholeProofFile));
assert.equal(sha(Buffer.from(certificateText)),cfg.certificateSHA256);
assert.deepEqual(Object.keys(proof).sort(),['defaults','groups','trace']);assert.equal(proof.groups.length,20);assert.equal(proof.trace.length,20);
for(let i=0;i<20;i++)assert.deepEqual(proof.trace[i].flatMap(c=>c.polygons),proof.groups[i].polygons);
const normalize=polygons=>polygons.map(poly=>poly.map(p=>{assert.equal(p.off,0);return{x:p.x/2,y:p.y/2,off:0}}));
const mesh=buildMesh({domain:normalize(proof.groups[14].polygons),seed:normalize(proof.groups[13].polygons),size:200});
const certified=certifyMesh(mesh);
for(const [key,value]of Object.entries(certified.diagnostics))if(key!=='localPiecesByCell')assert.deepEqual(value,stored.geometryCertificate[key],'geometry certificate '+key);
assert.equal(stored.geometryCertificate.positiveAreaOverlaps,0);assert.equal(stored.geometryCertificate.sharedEdgesConforming,true);assert.equal(stored.geometryCertificate.orientedBoundaryPreserved,true);
// 同一 mesh と直前の certifyMesh 戻り値だけを渡す。外部 certificate の差し替えは受け取らない。
const field=buildField(mesh,certified);
for(const key of ['seedPlateaus','nonseedPlateaus','minimumPositiveTriangleSpan','maximum','normalizedMinimumSpan','sharedVertexScalars','strictlyLowerNonseedPredecessors'])assert.deepEqual(field.diagnostics[key],stored.scalarCertificate[key],'scalar certificate '+key);
const summary=summarize(mesh,field);
for(const expected of stored.sublevelArea){const actual=summary.levels.find(l=>l.progress===expected.progress);assert.ok(actual);for(const key of ['thresholdExact','missingAreaBoundsExact','missingAreaExact'])if(expected[key]!==undefined)assert.deepEqual(actual[key],expected[key],'sublevel '+expected.progress+' '+key)}
const wireMesh={vertices:mesh.vertices.map(p=>[exact.key(p.x),exact.key(p.y)]),triangles:mesh.triangles.map(t=>t.v)};
const wireField={values:field.values,maximum:field.maximum};
const binding={certificateSHA256:cfg.certificateSHA256,moduleSHA256:cfg.immutablePins[cfg.certificateModuleFile],sourceProofSHA256:cfg.immutablePins[cfg.wholeProofFile],meshSHA256:sha(JSON.stringify(wireMesh)),fieldSHA256:sha(JSON.stringify(wireField))};
process.stdout.write(JSON.stringify({grid:200,mesh:wireMesh,field:wireField,binding,diagnostics:{vertices:wireMesh.vertices.length,triangles:wireMesh.triangles.length,meshBuild:1,meshCertification:1,fieldBuild:1,sourceCompile:0,engine:0,nativeApproval:false,runtimeApplied:false}}));
