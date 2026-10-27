import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const repo=new URL('../../',import.meta.url),read=p=>readFileSync(new URL(p,repo)),sha=x=>createHash('sha256').update(x).digest('hex')
const bytes=read('docs/hanja-component-recipe-u995b-2026-10-27/recipe.json');assert.equal(sha(bytes),'eaefeb0fc260ffd31857297168753b0e2803d8f50b9c8d8a1a3342a8aff107b8')
export const verifiedRecipe=JSON.parse(bytes)
const r=verifiedRecipe;for(const[p,h]of Object.entries(r.sourceBinding.inputSHA256))assert.equal(sha(read(p)),h)
const source=JSON.parse(read('docs/hanja-goal-glyphwiki-batch571-2026-10-11/sources.json')),parent=JSON.parse(read('docs/hanja-goal-glyphwiki-batch571-2026-10-11/engine-whole-u995b-ue0104.json'));assert.equal(r.recipeId,'lingo-u995b-no-extra-v1');assert.equal(r.locallyAuthoredRoot,true);assert.equal(r.publicGlyphWikiRoot,false);assert.equal(r.originalWhole,false);assert.deepEqual(r.originalWholeIdentityWrapper,source.records['u995b-ue0104'])
assert.equal(r.originalWholeIdentityWrapper.data,'99:0:0:0:0:200:200:koseki-504080')
for(const[n,record]of Object.entries(r.originalRecords))assert.deepEqual(record,source.records[n])
export const records={...r.originalChildren,...r.localRecords};assert.deepEqual(r.virtualRoot,r.localRecords[r.recipeId])
const reverse=Object.fromEntries(Object.entries(r.cloneMap).map(([a,b])=>[b,a]))
for(const[oldName,newName]of Object.entries(r.cloneMap)){
 const original=r.originalRecords[oldName],local=r.localRecords[newName];const expected=structuredClone(original);expected.name=newName
 let rows=original.data.split('$');if(oldName==='u27c28-04@5'){assert.equal(rows[0],'1:2:2:92:70:108:70');rows=rows.slice(1)}
 expected.data=rows.map(row=>{const a=row.split(':');if(a[0]==='99'&&r.cloneMap[a[7]])a[7]=r.cloneMap[a[7]];return a.join(':')}).join('$')
 if(oldName===r.parentRoot){expected.version='local-recipe-v1';expected.versionOrigin='Explicit locally authored original-row omission, not a public GlyphWiki revision'}
 assert.deepEqual(local,expected,'Exact copied metadata, flags, parent boxes and row order '+oldName)
}
for(const[n,record]of Object.entries(r.originalChildren)){assert(!r.cloneMap[n]);assert.deepEqual(record,source.records[n])}
function flatten(map,name,path=[]){assert(!path.includes(name));const rec=map[name];assert(rec);return rec.data.split('$').flatMap(row=>{const a=row.split(':');return a[0]==='99'?flatten(map,a[7],[...path,name]):[{name:reverse[name]??name,row}]})}
const before=flatten(r.originalRecords,r.parentRoot),after=flatten(records,r.recipeId);assert.equal(before.length,parent.groups.length);assert.equal(before.length,26);assert.deepEqual(before[19],{name:'u27c28-04@5',row:r.omission.originalRow});assert.deepEqual(after,before.filter((_,i)=>i!==19));assert.equal(after.length,25)
assert.deepEqual(parent.groups[19],r.omission.originalGroup);assert.deepEqual(parent.trace[19],[r.omission.originalCall]);assert.deepEqual(parent.trace[19][0].args,[130.2,99.7638,139.8,99.7638,2,2]);assert.equal(parent.groups[19].polygons.length,1);assert.equal(parent.groups[19].polygons[0].length,4)
const seen=new Set();function visit(name,path=[]){assert(!path.includes(name));if(seen.has(name))return;seen.add(name);assert(records[name]);for(const row of records[name].data.split('$')){const a=row.split(':');if(a[0]==='99')visit(a[7],[...path,name])}}visit(r.recipeId);assert.deepEqual([...seen].sort(),Object.keys(records).sort())
export const readinessFacts={schema:'hanja-local-row-omission-readiness/v1',glyph:'饛',root:r.recipeId,recipeSHA256:sha(bytes),originalCapsuleSHA256:sha(read('docs/hanja-goal-glyphwiki-batch571-2026-10-11/sources.json')),originalFull5SHA256:sha(read('docs/hanja-goal-glyphwiki-batch571-2026-10-11/engine-whole-u995b-ue0104.json')),sourceRowOmissions:1,omittedRawZeroBased:19,originalPrimitiveRows:before.length,preparedPrimitiveRows:after.length,clonedRecords:Object.keys(r.localRecords).length,unchangedPublicRecords:Object.keys(r.originalChildren).length,sourceRowsApartFromOmittedAndReferenceNamesExactlySame:true,metadataAndVersionTypesPreserved:true,parentBoxesFlagsAndRowOrderPreserved:true,allFlattenedRetainedLeafRowsExactlySame:true,originalCallAndPBinding:true,closedAndAcyclic:true,sourcePDeletedDirectly:false,newWholeCompiled:false,formal23Membership:false,newEngine:0,nativeApproval:false,runtimeApplied:false}
if(import.meta.url===new URL(process.argv[1],'file:').href)console.log(JSON.stringify(readinessFacts))
