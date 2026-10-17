import test from 'node:test'
import assert from 'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{buildMesh,certifyMesh,buildField,assertNoPlateau,clippedArea,summarize,exact}from'./vector-certificate.mjs'
const rect=(x,y,r,b)=>[{x,y},{x:r,y},{x:r,y:b},{x,y:b}],input=(domain,seed)=>({domain,seed,size:4,viewBox:[0,0,4,4]})
test('exact supercover preserves a subcell thin branch; all triangles cover the source with no end unmask',()=>{
 const data=input([rect(0,0,2,2),rect(2,.1,4,.2)],[rect(0,0,1,2)]),before=JSON.stringify(data),mesh=buildMesh(data),c=certifyMesh(mesh),field=buildField(mesh,c),s=summarize(mesh,field)
 assert.equal(c.diagnostics.sourceUnionAreaExact,'21/5');assert.equal(c.diagnostics.triangleAreaExact,'21/5');assert.equal(s.p1MissingAreaExact,'0/1');assert.equal(s.field.nonseedPlateaus,0);assert.equal(s.field.strictlyLowerNonseedPredecessors,true);assert.equal(JSON.stringify(data),before)
 assert(s.levels.find(x=>x.progress===.9999).missingArea>0)
})
test('same global U component retains two separate local pieces inside one cell',()=>{
 const mesh=buildMesh(input([rect(.1,.1,.3,1.8),rect(.7,.1,.9,1.8),rect(.1,1.6,.9,1.8)],[rect(0,0,1,2)])),c=certifyMesh(mesh)
 assert.equal(c.diagnostics.positiveInterfaceComponents.length,1);assert.equal(c.diagnostics.localPiecesByCell.find(x=>x.cell==='0,0').components,2)
})
test('a subcell slit stays disconnected even though both fragments lie inside the same cell',()=>{
 const c=certifyMesh(buildMesh(input([rect(0,0,.49,3),rect(.51,0,1,3)],[rect(0,0,1,1)])))
 assert.equal(c.diagnostics.positiveInterfaceComponents.length,2);assert.equal(c.diagnostics.localPiecesByCell.find(x=>x.cell==='0,1').components,2)
})
test('an unsampled tiny island with no full-cell V seed is rejected',()=>{
 assert.throws(()=>certifyMesh(buildMesh(input([rect(0,0,2,2),rect(3.1,3.1,3.2,3.2)],[rect(0,0,2,2)]))),/component has no full-cell V seed/)
})
test('point-only self-touch and a source hole are rejected without repair',()=>{
 assert.throws(()=>buildMesh(input([rect(0,0,1,1),rect(1,1,2,2)],[rect(0,0,1,1)])),/self-touch/)
 const c=[{x:0,y:0},{x:3,y:0},{x:3,y:1},{x:1,y:1},{x:1,y:3},{x:3,y:3},{x:3,y:4},{x:0,y:4}]
 assert.throws(()=>buildMesh(input([c,rect(2,0,3,4)],[rect(0,0,1,4)])),/holes unsupported/)
})
test('thin V without a full seed cell, malformed input and triangle coverage tampering are rejected',()=>{
 assert.throws(()=>certifyMesh(buildMesh(input([rect(0,0,4,4)],[rect(.1,.1,.9,.9)]))),/component has no full-cell V seed/)
 assert.throws(()=>buildMesh(input([[{x:0,y:0},{x:3,y:3},{x:0,y:3},{x:2,y:0}]],[rect(0,0,1,1)])),/self-intersection/)
 const mesh=buildMesh(input([rect(0,0,2,2)],[rect(0,0,1,2)]));mesh.triangles.push({...mesh.triangles[0],v:[...mesh.triangles[0].v]});assert.throws(()=>certifyMesh(mesh),/positive-area triangle overlap/)
 const incomplete=buildMesh(input([rect(0,0,2,2)],[rect(0,0,1,2)]));incomplete.triangles.pop();assert.throws(()=>certifyMesh(incomplete),/boundary mismatch|area mismatch/)
})
test('nonseed T3 distance ties are rejected; a near-flat triangle remains a real sampled-frame counterexample',()=>{
 const R=exact.rational,mesh={vertices:[{x:R(0),y:R(0)},{x:R(1),y:R(0)},{x:R(0),y:R(1)}],triangles:[{v:[0,1,2]}],V:[{x:R(3),y:R(3)},{x:R(4),y:R(3)},{x:R(4),y:R(4)},{x:R(3),y:R(4)}]}
 assert.throws(()=>assertNoPlateau(mesh,[1,1,1]),/nonseed positive-area plateau/)
 assert.equal(assertNoPlateau(mesh,[.99999,1,1]).nonseedPlateaus,0);assert.equal(exact.key(clippedArea(mesh,[.99999,1,1],.9999)),'0/1');assert.equal(exact.key(clippedArea(mesh,[.99999,1,1],1)),'1/2')
})
test('fixed public861: exact static certificate or explicit refusal, never a direction/native approval',()=>{
 const cfg=JSON.parse(readFileSync(new URL('./config.json',import.meta.url))),root=new URL('../../',import.meta.url)
 for(const[p,h]of Object.entries({...cfg.immutableInputPins,...cfg.experimentFilePins}))assert.equal(createHash('sha256').update(readFileSync(new URL(p,root))).digest('hex'),h,p)
 const originalBytes=readFileSync(new URL(cfg.publicProofFile,root)),proof=JSON.parse(originalBytes),normalize=polys=>polys.map(p=>p.map(v=>({x:v.x/2,y:v.y/2,off:v.off}))),domain=normalize(proof.groups[14].polygons),seed=normalize(proof.groups[13].polygons),data={domain,seed,size:200,viewBox:[0,0,100,100]},before=JSON.stringify(data)
 const started=performance.now();let outcome
 try{const mesh=buildMesh(data),certificate=certifyMesh(mesh),field=buildField(mesh,certificate);outcome={status:'static-certificate-passed',...summarize(mesh,field)}}
 catch(error){if(!/nonseed positive-area plateau|self-touch\/nonmanifold|holes unsupported|component has no full-cell V seed/.test(error.message))throw error;outcome={status:'rejected',reason:error.message,coverageCertificateGranted:false,nativeApproval:false,runtimeApplied:false}}
 assert.equal(JSON.stringify(data),before);assert.equal(readFileSync(new URL(cfg.publicProofFile,root)).equals(originalBytes),true)
 console.log('ACTUAL_VECTOR_861 '+JSON.stringify({...outcome,elapsedMillis:performance.now()-started,protectedPins:Object.keys(cfg.immutableInputPins).length,sourceCompile:0,engine:0,HTTP:0,server:0,native:0,build:0,git:0}))
})
