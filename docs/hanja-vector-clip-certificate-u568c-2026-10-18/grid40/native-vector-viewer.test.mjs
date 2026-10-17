import test from 'node:test';
import assert from 'node:assert/strict';
import {digest,verifyEnvelope} from './native-vector-viewer.mjs';
test('grid40-only certificate and mesh/scalar binding rejects grid200 and tampering',async()=>{
 const mesh={vertices:[['0/1','0/1'],['1/1','0/1'],['0/1','1/1']],triangles:[[0,1,2]]},field={values:[0,1,1],maximum:1};
 const certificateText=JSON.stringify({grid:40,geometryCertificate:{vertices:3,triangles:1},scalarCertificate:{maximum:1}});
 const binding={certificateSHA256:await digest(certificateText),moduleSHA256:'a'.repeat(64),sourceProofSHA256:'b'.repeat(64),meshSHA256:await digest(JSON.stringify(mesh)),fieldSHA256:await digest(JSON.stringify(field))},expected={...binding,grid:40},packet={grid:40,mesh,field,binding};
 assert.equal((await verifyEnvelope(packet,certificateText,expected)).triangles.length,1);
 await assert.rejects(verifyEnvelope({...packet,grid:200},certificateText,expected),/grid40/);
 await assert.rejects(verifyEnvelope(packet,certificateText,{...expected,grid:200}),/grid40/);
 await assert.rejects(verifyEnvelope(packet,certificateText+' ',expected),/certificate digest/);
 const bad=structuredClone(packet);bad.field.values[1]=.5;await assert.rejects(verifyEnvelope(bad,certificateText,expected),/digest/);
 bad.binding.fieldSHA256=await digest(JSON.stringify(bad.field));await assert.rejects(verifyEnvelope(bad,certificateText,expected),/binding/);
 const foreign=JSON.stringify({grid:200,geometryCertificate:{vertices:3,triangles:1},scalarCertificate:{maximum:1}}),foreignExpected={...expected,certificateSHA256:await digest(foreign)},foreignPacket={...packet,binding:{...binding,certificateSHA256:foreignExpected.certificateSHA256}};
 await assert.rejects(verifyEnvelope(foreignPacket,foreign,foreignExpected),/certificate dimensions/);
});
