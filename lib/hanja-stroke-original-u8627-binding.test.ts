import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import fixture from '../docs/hanja-source-original-u8627-vs2-2026-10-23/fixtures.json' with {type:'json'}
import terminal from '../docs/hanja-original-left-terminal-qb-preparation-2026-10-23/terminal-proof.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU8627SourceContext,reviewedU8627Policy,commitReviewedU8627Caps} from './hanja-stroke-start-caps-u8627.ts'
import {makeReviewedU8627FootSourceContext,reviewedU8627FootPolicy,REVIEWED_U8627_FOOT_SOURCE,commitReviewedU8627FootMask,type ReviewedU8627FootFrame} from './hanja-stroke-source-foot-u8627.ts'
import {makeReviewedU8627LeftSourceContext,reviewedU8627LeftPolicy,leftFrame,REVIEWED_U8627_LEFT_SOURCE} from './hanja-stroke-original-left-terminal-u8627.ts'
import {commitLeftU8627} from './hanja-stroke-original-left-terminal-dom-u8627.ts'
const f=fixture['u8627-ue0102'],s=f.strokes as HanjaOutlineStrokes,clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x))
const sha=(p:string)=>createHash('sha256').update(readFileSync(new URL(p,import.meta.url))).digest('hex')
test('蘧 independent source factories reject changed full contexts and accessor identities',()=>{
 const factories=[makeReviewedU8627SourceContext,makeReviewedU8627FootSourceContext,makeReviewedU8627LeftSourceContext]
 for(const make of factories){
  assert(make(f.fullProof,f.identity,s));assert(make(clone(f.fullProof),Object.fromEntries(Object.entries(f.identity).reverse()),clone(s)))
  const bad=clone(f.fullProof);bad.groups[0].raw[3]=(bad.groups[0].raw[3] as number)+1;assert.equal(make(bad,f.identity,s),null)
  const changed=clone(s).map(p=>p.map(m=>({...m})));changed[20][1]={...changed[20][1],revealWidth:15};assert.equal(make(f.fullProof,f.identity,changed),null)
  assert.equal(make(f.fullProof,{...f.identity,root:'u7c67'},s),null)
  let gets=0;const access=Object.defineProperty({...f.identity},'root',{enumerable:true,get(){gets++;return f.identity.root}});assert.equal(make(f.fullProof,access,s),null);assert.equal(gets,0)
 }
 assert.equal(s.length,21);assert.equal(s.flat().length,22);assert.equal(s.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),54)
})
test('蘧 last QB remains distinct original masks with exact contact-body extent',()=>{
 const c=makeReviewedU8627SourceContext(f.fullProof,f.identity,s),fc=makeReviewedU8627FootSourceContext(f.fullProof,f.identity,s);assert(c&&fc)
 assert(reviewedU8627Policy(c,20,0));const p=reviewedU8627FootPolicy(fc,20,1);assert(p);assert.deepEqual(p.segment,s[20][1])
 assert.equal(reviewedU8627FootPolicy(fc,20,0),null);assert.equal(reviewedU8627FootPolicy(fc,19,1),null);assert.equal(reviewedU8627FootPolicy({...fc},20,1),null)
 assert.deepEqual(f.sourceGroups.at(-1),[8,9]);assert.notDeepEqual([27.5,81.025],[26.5,80.2]);assert.equal(REVIEWED_U8627_FOOT_SOURCE.originalGuideEndX,89.5);assert.equal(REVIEWED_U8627_FOOT_SOURCE.originalPMaxX,95.1)
 assert.equal(s[20][0].revealPath,'M8 91.3375 Q17.5 86.8 27.5 81.025');assert.equal(s[20][1].revealPath,'M26.5 80.2 C34 88.45 42 92.1625 89.5 90.5125')
})
test('蘧 LEFT partition keeps the exact prepared coefficients and original four P',()=>{
 const c=makeReviewedU8627LeftSourceContext(f.fullProof,f.identity,s);assert(c);const p=reviewedU8627LeftPolicy(c,12,0);assert(p)
 assert.equal(reviewedU8627LeftPolicy(c,14,0),null);assert.equal(reviewedU8627LeftPolicy({...c},12,0),null);assert.deepEqual(p.segment,terminal.originalSegment)
 for(const n of[0,15526797/20526797,1]){const z=leftFrame(p,s[12][0],n);assert.equal(z.bodyOutline,terminal.bodyOutline);assert.equal(z.tailOutline,terminal.terminalOutline);assert.equal(z.originalLogicalPens,21);assert.equal(z.originalMaskCount,22);assert.equal(z.originalPolygonCount,54);assert.equal(z.originalOuterWeight,s[12][0].weight)}
 const end=leftFrame(p,s[12][0],1);assert.equal(end.tailRect.x,53.5);assert.equal(end.tailRect.width,10);assert.deepEqual(REVIEWED_U8627_LEFT_SOURCE.bodyShareExact,[15526797,20526797]);assert.equal(REVIEWED_U8627_LEFT_SOURCE.nativeApproval,false)
 assert.throws(()=>leftFrame({...p},s[12][0],.5));for(const n of[-1,NaN,Infinity,1.1])assert.throws(()=>leftFrame(p,s[12][0],n))
 assert.equal(sha('../docs/hanja-source-original-u8627-vs2-2026-10-23/fixtures.json'),'25ee5175bb428fa2673b95b4aa2bf4ade6acc1ea49c9f52625865a5054fdd216')
})
test('蘧 missing actual bindings remain hidden without browser measurements',()=>{
 const c=makeReviewedU8627SourceContext(f.fullProof,f.identity,s),lc=makeReviewedU8627LeftSourceContext(f.fullProof,f.identity,s);assert(c&&lc);const p=reviewedU8627Policy(c,12,0),l=reviewedU8627LeftPolicy(lc,12,0);assert(p&&l)
 assert.equal(commitReviewedU8627Caps(p,s[12][0],.5,'test',{measurement:null,guide:null,startCap:null,endCap:null,ink:null}).status,'hidden')
 assert.equal(commitReviewedU8627FootMask({ink:null,foot:null,body:null,rect:null,measurement:null},{} as ReviewedU8627FootFrame),false)
 assert.equal(commitLeftU8627(l,p,s[12][0],.5,'test',{measurement:null,bodyClip:null,tailClip:null,guide:null,startCap:null,endCap:null,bodyFill:null,tailRect:null,ink:null}).status,'hidden')
})
