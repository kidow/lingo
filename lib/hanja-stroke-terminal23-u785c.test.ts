import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {reviewedU785cT23Context,reviewedU785cT23Policy,REVIEWED_U785C_T23_INPUT_SHA256} from './hanja-stroke-start-caps-u785c-t23.ts'
import {reviewedU785cT23FootContext,reviewedU785cT23FootPolicy,makeReviewedU785cT23FootSourceContext} from './hanja-stroke-source-foot-u785c-t23.ts'
const read=(p:string)=>JSON.parse(readFileSync(new URL('../'+p,import.meta.url),'utf8'))
const f=read('docs/hanja-terminal23-u785c-2026-10-23/fixtures.json').u785c
const previous=read('docs/hanja-source-independent-qq-three-u785c-source-experiment-2026-10-23/fixtures.json').u785c
const digest=(v:unknown)=>createHash('sha256').update(JSON.stringify(v)).digest('hex')
test('terminal23 new fixture/policy binding and changed-tail metadata only',()=>{
 assert.equal(digest(f.strokes),'ef01b0a716ba10f20b49ff4546bb378c12a7c3b5b137c3dbdbb6ade3b573f6ac')
 assert.deepEqual(f.fullProof,previous.fullProof)
 assert.deepEqual(f.baselineStrokes,previous.strokes)
 assert.equal(f.strokes.length,12);assert.equal(f.strokes.flat().length,16)
 assert.equal(f.strokes.flat().reduce((n:any,m:any)=>n+(m.outline.match(/M/g)?.length??0),0),31)
 assert.equal(f.fullProof.trace.flat().reduce((n:any,m:any)=>n+(m.polygons?.length??0),0),30)
 for(let i=0;i<12;i++)if(i!==3)assert.deepEqual(f.strokes[i],previous.strokes[i])
 const old=previous.strokes[3][0],body=f.strokes[3][0],tail=f.strokes[3][1]
 for(const k of ['direction','revealPath','revealWidth','weight'])assert.deepEqual(body[k],old[k])
 assert.deepEqual(tail,{outline:'M35.5 81.5 L29.5 84.5 L29.5 81.5 Z',bounds:[29.5,81.5,35.5,84.5],direction:'down',weight:3})
 assert.equal(body.weight/(body.weight+tail.weight),3973/4213)
 assert.equal(f.sourcePreservation.originalClockIdentityApproved,false)
 const c=reviewedU785cT23Context(f.strokes);assert(c)
 assert.equal(reviewedU785cT23Context(previous.strokes),null)
 for(const p of [1,3,6,7,8])assert.deepEqual(reviewedU785cT23Policy(c,p,0)?.segment,f.strokes[p][0])
 assert.equal(reviewedU785cT23Policy(c,3,1),null)
 const foot=reviewedU785cT23FootContext(f.strokes);assert(foot)
 assert.equal(reviewedU785cT23FootContext(previous.strokes),null)
 for(const p of [6,7,8])assert.deepEqual(reviewedU785cT23FootPolicy(foot,p,1)?.segment,previous.strokes[p][1])
 const id={root:'u785c',file:'../hanja-source-original-full-u785c-2026-10-23/engine-proof.json',fileSHA256:'da9a0299154697b3d5aa39f520f725175da503ec23168aeeb431c38c2eae3f39'}
 assert(makeReviewedU785cT23FootSourceContext(f.fullProof,id,f.strokes))
 assert.equal(makeReviewedU785cT23FootSourceContext(f.fullProof,{...id,root:'u785c-t23'},f.strokes),null)
 for(const [p,h] of Object.entries(REVIEWED_U785C_T23_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+p,import.meta.url))).digest('hex'),h)
})
