import test from 'node:test';
import assert from 'node:assert/strict';
import {digest,verifyEnvelope,prepareField,sublevelPaths,clipTriangle,rational} from './native-vector-viewer.mjs';
const scalar={values:[0,1,1],maximum:1},mesh={vertices:[['0/1','0/1'],['1/1','0/1'],['0/1','1/1']],triangles:[[0,1,2]]};
const certificateText=JSON.stringify({grid:200,geometryCertificate:{vertices:3,triangles:1},scalarCertificate:{maximum:1}});
async function fixture(){const binding={certificateSHA256:await digest(certificateText),moduleSHA256:'a'.repeat(64),sourceProofSHA256:'b'.repeat(64),meshSHA256:await digest(JSON.stringify(mesh)),fieldSHA256:await digest(JSON.stringify(scalar))};return{packet:{grid:200,mesh:structuredClone(mesh),field:structuredClone(scalar),binding:{...binding}},expected:{...binding,grid:200}}}
test('exact affine clipping: empty p0, nested sublevels, identical p1 threshold rule',()=>{
 const field=prepareField({mesh,field:scalar});
 assert.deepEqual(sublevelPaths(field,0),[]);assert.deepEqual(sublevelPaths(field,-1e-8),[]);
 assert.equal(sublevelPaths(field,.5)[0],'M0 0 L0.5 0 L0 0.5 Z');
 assert.equal(sublevelPaths(field,1)[0],'M0 0 L1 0 L0 1 Z');
 const end=clipTriangle(field.triangles[0],rational(.9999));
 assert.equal(end[1].x[0],9999n);assert.equal(end[1].x[1],10000n);
 assert.notDeepEqual(sublevelPaths(field,.9999),sublevelPaths(field,1));
 assert.throws(()=>sublevelPaths(field,1.1));assert.throws(()=>sublevelPaths(field,NaN));
});
test('zero plateau does not stamp at p0; affine clip keeps positive progress only inside triangle',()=>{
 const field=prepareField({mesh,field:{values:[0,0,0],maximum:1}});
 assert.deepEqual(sublevelPaths(field,0),[]);assert.equal(sublevelPaths(field,1e-8)[0],'M0 0 L1 0 L0 1 Z');
 const points=clipTriangle(prepareField({mesh,field:scalar}).triangles[0],rational(.25));
 assert.ok(points.every(p=>Number(p.x[0])/Number(p.x[1])+Number(p.y[0])/Number(p.y[1])<=.25));
});
test('certificate/mesh/scalar binding rejects drift, self-rehash, wrong grid, certificate swap',async()=>{
 const {packet,expected}=await fixture();assert.equal((await verifyEnvelope(packet,certificateText,expected)).triangles.length,1);
 const changed=structuredClone(packet);changed.mesh.vertices[1][0]='2/1';await assert.rejects(verifyEnvelope(changed,certificateText,expected),/digest/);
 changed.binding.meshSHA256=await digest(JSON.stringify(changed.mesh));await assert.rejects(verifyEnvelope(changed,certificateText,expected),/binding/);
 const scalarChanged=structuredClone(packet);scalarChanged.field.values[1]=.5;await assert.rejects(verifyEnvelope(scalarChanged,certificateText,expected),/digest/);
 await assert.rejects(verifyEnvelope({...packet,grid:400},certificateText,expected),/grid200/);
 await assert.rejects(verifyEnvelope(packet,certificateText+' ',expected),/certificate digest/);
 await assert.rejects(verifyEnvelope({...packet,binding:{...packet.binding,moduleSHA256:'c'.repeat(64)}},certificateText,expected),/binding/);
});
