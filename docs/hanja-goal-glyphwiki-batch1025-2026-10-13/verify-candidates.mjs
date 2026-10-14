import fs from 'node:fs';import assert from 'node:assert/strict';import crypto from 'node:crypto';
import {pathToFileURL} from 'node:url';import path from 'node:path';
const configs=[{"batch":1027,"root":"u8585","alternates":[{"root":"u8585-g"},{"root":"u8585-ue0100"},{"root":"u8585-ue0101"}]},{"batch":1028,"root":"u76a5","alternates":[{"root":"u76a5-ue0100"}]},{"batch":1029,"root":"u769c","alternates":[{"root":"u769c-ue0100"},{"root":"u769c-ue0101"}]},{"batch":1031,"root":"u9277","alternates":[{"root":"u9277-ue0100"}]},{"batch":1033,"root":"u96d8-ue0102","alternates":[{"root":"u96d8-ue0103"}]},{"batch":1034,"root":"u9a69-ue0102","alternates":[]}], SHA=x=>crypto.createHash('sha256').update(x).digest('hex'),read=(d,f)=>fs.readFileSync(d+'/'+f),obj=(d,f)=>JSON.parse(read(d,f)),results=[];
const freeze=v=>{if(v&&typeof v==='object'&&!Object.isFrozen(v)){Object.freeze(v);for(const x of Object.values(v))freeze(x);}return v;};
const canonical=polygon=>{const area=polygon.reduce((s,p,i)=>{const q=polygon[(i+1)%polygon.length];return s+p.x*q.y-q.x*p.y;},0);const p=area<0?[polygon[0],...polygon.slice(1).reverse()]:polygon;return p.map((q,i)=>(i?'L':'M')+(q.x/2)+' '+(q.y/2)).join(' ')+' Z';};
for(const config of configs){
 const d='docs/hanja-goal-glyphwiki-batch'+config.batch+'-2026-10-13',m=await import(pathToFileURL(path.resolve(d,'progressive.mjs'))),base=obj(d,'engine-proof.json'),j=obj(d,'source-join-analysis.json');const variants=[];
 for(const root of m.supportedWholeRoots){
  const file='engine-whole-'+root+'.json',w=obj(d,file),proof={engineRevision:base.engineRevision,engineHashes:base.engineHashes,groups:w.groups,trace:w.trace,defaults:w.defaults};
  if(root===m.sourceRoot){assert.equal(m.sourceProofFile,file);assert.equal(m.sourceProofFileSHA256,SHA(read(d,file)));}
  const frozen=freeze(structuredClone(proof)),snapshot=JSON.stringify(frozen),out=m.compileSourceWhole(root,frozen.trace,frozen,{root,file,fileSHA256:SHA(read(d,file))});
  assert.equal(JSON.stringify(frozen),snapshot,'Immutable proof remains unchanged');
  const expected=w.trace.flatMap(row=>row.flatMap(c=>c.polygons)).map(canonical).sort();
  const actual=out.flat().flatMap(mask=>mask.outline.match(/M[^M]*? Z/g)??[]).sort();assert.deepEqual(actual,expected,'Every original polygon appears once with only scale and winding normalization');
  const mutations=[
   ['trajectory',p=>{const c=p.trace.flat().find(c=>c.args.length);c.args[0]+=0.001;}],
   ['polygon',p=>{p.groups.find(g=>g.polygons.length).polygons[0][0].x+=0.001;}],
   ['preset',p=>{p.defaults.kWidth+=1;}],
   ['engineRevision',p=>{p.engineRevision='changed';}],
   ['engineHash',p=>{p.engineHashes['2d.js']='0'.repeat(64);}],
   ['wholeAttribution',p=>{p.sourceRoot='wrong-fixed-whole-root';}]
  ];
  const rejected=[];for(const[name,mutate]of mutations){const p=structuredClone(proof);mutate(p);const before=JSON.stringify(p);assert.throws(()=>m.compileSourceWhole(root,p.trace,p,{root,file,fileSHA256:SHA(read(d,file))}));assert.equal(JSON.stringify(p),before);rejected.push(name);}
  assert.throws(()=>m.compileSourceWhole(root,frozen.trace,frozen));
  assert.throws(()=>m.compileSourceWhole(root,frozen.trace,frozen,{root,file:'wrong-file.json',fileSHA256:SHA(read(d,file))}));
  assert.throws(()=>m.compileSourceWhole(root,frozen.trace,frozen,{root,file,fileSHA256:'0'.repeat(64)}));
  if(root===m.sourceRoot)assert.deepEqual(m.compileProgressive(frozen.trace,frozen,{root,file,fileSHA256:SHA(read(d,file))}),out);
  const metadataGroups=w.trace.flatMap((row,i)=>row.length?[]:[i]);for(const raw of metadataGroups){assert.deepEqual(w.trace[raw],[]);assert.deepEqual(w.groups[raw].polygons,[]);const p=structuredClone(proof);p.groups[raw].raw[3]+=1;const before=JSON.stringify(p);assert.throws(()=>m.compileSourceWhole(root,p.trace,p,{root,file,fileSHA256:SHA(read(d,file))}));assert.equal(JSON.stringify(p),before);}const zeroAreaOriginalPolygons=w.trace.flatMap(row=>row.flatMap(call=>call.polygons)).filter(poly=>poly.reduce((sum,p,i)=>{const next=poly[(i+1)%poly.length];return sum+p.x*next.y-next.x*p.y;},0)===0).length;const nonempty=w.trace.filter(row=>row.length).length, masks=out.flat().length, curves=out.flat().filter(mask=>mask.direction==='curve').length;
  variants.push({root,sourceProofFile:file,sourceProofFileSHA256:SHA(read(d,file)),compiledPens:out.length,masks,curves,raw:w.groups.length,draw:w.trace.flat().length,originalPolygons:expected.length,allOriginalPolygonsExactlyOnce:true,inputImmutable:true,mutationsRejected:rejected,metadataGroupsPreserved:metadataGroups,metadataMutationsRejected:metadataGroups.length,zeroAreaOriginalPolygons,catalogMatches:out.length===j.catalogStrokes,nativeApproval:false,dirs:0,frames:0,replay:0,runtimeApplied:false});
 }
 assert.throws(()=>m.compileSourceWhole('unsupported-or-partial-whole',[],{}));
 results.push({batch:config.batch,glyph:j.glyph,selectedRoot:m.sourceRoot,variants,passed:true});
}
console.log(JSON.stringify(results));
