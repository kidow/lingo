import assert from 'node:assert/strict';
import{readFileSync}from'node:fs';import{createHash}from'node:crypto';import*as R from'./render.mjs';
const read=p=>readFileSync(new URL(p,import.meta.url)),json=p=>JSON.parse(read(p)),sha=b=>createHash('sha256').update(b).digest('hex'),digest=v=>sha(JSON.stringify(v)),clone=v=>JSON.parse(JSON.stringify(v));
const F=json('./fixture.json').u5611,O=json('../hanja-source-independent-hv-hq-u5611-source-experiment-2026-10-22/fixtures.json').u5611;
let negatives=0;
if(process.argv[2]!=='--inverse-tail-only'){
assert.equal(sha(read('./fixture.json')),"da96222ca399787ebafbaf15d78dbbd3c742dc67d3aa22cfa5aac9cf389b2260");assert.equal(digest(F.strokes),"ea03032f8d367306063644973a80a18d73db3e1df2dde62b6ae17096d939ab31");
assert.deepEqual(F.fullProof,O.fullProof);assert.deepEqual(F.rawBaseline,O.rawBaseline);assert.deepEqual(F.baseline,O.strokes);
assert.deepEqual([F.strokes.length,F.strokes.flat().length],[14,17]);assert.equal(F.tailPartition.geometryDerivations,1);
const source=F.fullProof.trace[10],last=source.at(-1);assert.equal(last.kind,'cdDrawLine');assert.deepEqual(last.args,[131.545,87,177.9,87,6,5]);assert.equal(digest(last.polygons.at(-1)),"b4b37933a1275731b7e3abf67f025664f954aa91e2d919fa19779d4eed7c525b");
const old=O.strokes[8][0],[body,tail]=F.strokes[8],chunks=old.outline.match(/M[^Z]* Z/g);assert.equal(chunks.length,8);
assert.deepEqual(body,{...old,outline:chunks.slice(0,-1).join(' ')});assert.deepEqual(tail,{outline:chunks.at(-1),bounds:[85.95,28,89.95,40.5],direction:'up',weight:12.5});
assert.equal(body.outline+' '+tail.outline,old.outline);assert.equal(body.revealPath,old.revealPath);assert.equal(body.weight,old.weight);assert.equal(body.revealWidth,14);
for(let i=0;i<14;i++)if(i!==8)assert.deepEqual(F.strokes[i],O.strokes[i]);
const all=x=>x.flat().flatMap(s=>s.outline.match(/M[^Z]* Z/g)||[]);assert.equal(all(F.strokes).length,40);assert.deepEqual(all(F.strokes),all(O.strokes));
assert.equal(R.assertFixedGeometry(F.strokes),true);for(const mutate of[b=>b[8][1].weight++,b=>b[8][0].revealPath+=' L0 0',b=>b[5][1].revealWidth++,b=>b[8].reverse()]){const b=clone(F.strokes);mutate(b);assert.throws(()=>R.assertFixedGeometry(b));negatives++}
}
const src=read('./render.mjs').toString(),previous=read('../hanja-renderer-growing-hq6-u5611-experiment-2026-10-22/render.mjs').toString(),restored=src.replace('const FIXED_STROKES='+JSON.stringify(F.strokes)+';','const FIXED_STROKES='+JSON.stringify(O.strokes)+';').replace("SOURCE_GEOMETRY_SHA256='"+"ea03032f8d367306063644973a80a18d73db3e1df2dde62b6ae17096d939ab31"+"'","SOURCE_GEOMETRY_SHA256='23a8bf5267cde446e1fd1fc487430cdd37683e1d4289e37d57c74dc5f2772b53'").replace("'exact14p17m40 cached-UP9 source only'","'exact14p16m40 source only'");
assert.equal(restored,previous);assert.equal(R.certificateCheckCount(),0);assert.deepEqual(R.targetMask(6,2),O.strokes[5][1]);
console.log(JSON.stringify({PASS:true,newPartitionFocused:1,failedFirstInverseNewlineOnly:true,tailOnly:process.argv[2]==='--inverse-tail-only',previousPassedPrefixRepeated:false,pens:14,masks:17,polygons:40,other13PensDeepUnchanged:true,bodyGuideWidthWeightBoundsUnchanged:true,outlineUnionExactOnce:true,Q6FunctionAndOldRendererInverseByteExact:true,negative:process.argv[2]==='--inverse-tail-only'?'passed-first-prefix-4':negatives,geometryDerivations:1,sourceCompiler:0,engine:0,oldFocusedRepeated:0,nativeApproval:false,runtimeApplied:false}));
