import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {makeReviewedU902dFootSourceContext,reviewedU902dFootContext,reviewedU902dFootPolicy,sampleReviewedU902dFootFrame,verifyReviewedU902dFootPrior,REVIEWED_U902d_FOOT_SOURCE as SOURCE} from './hanja-stroke-source-foot-u902d.ts'
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url))
const sha=(v:Buffer|string)=>createHash('sha256').update(v).digest('hex')
function priorTree(policy:any){
 const all:any[]=[],doc:any={},view:any={document:doc};doc.defaultView=view;const node=(name:string,attrs:Record<string,string>={},parent:any=null):any=>{const n:any={localName:name,parentElement:parent,children:[],isConnected:true,namespaceURI:'http://www.w3.org/2000/svg',ownerDocument:doc,ownerSVGElement:null,attrs:{...attrs},getAttribute(k:string){return this.attrs[k]??null},contains(x:any){let a=x;while(a){if(a===this)return true;a=a.parentElement}return false}};Object.defineProperty(n,'previousElementSibling',{get(){const i=this.parentElement?.children.indexOf(this);return i>0?this.parentElement.children[i-1]:null}});Object.defineProperty(n,'nextElementSibling',{get(){const i=this.parentElement?.children.indexOf(this);return this.parentElement?.children[i+1]??null}});if(parent)parent.children.push(n);all.push(n);return n};
 const owner=node('svg'),pen=node('g',{'data-outline-stroke':String(policy.pen)},owner);let previous:any,ink:any,guide:any=null
 if(policy.previousCompletion==='original-Q7-tube'){previous=node('g',{'data-stroke-reveal-progress':'1'},pen);const defs=node('defs',{},previous),mask=node('mask',{id:'original-q7',maskUnits:'userSpaceOnUse',maskContentUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'},defs);guide=node('path',{d:policy.previousSegment.revealPath,fill:'none',stroke:'white','stroke-width':'14','stroke-linecap':'round','stroke-linejoin':'miter',pathLength:'1','stroke-dasharray':'1 2','stroke-dashoffset':'0'},mask);ink=node('path',{d:policy.previousSegment.outline,mask:'url(#original-q7)'},previous)}else previous=ink=node('path',{d:policy.previousSegment.outline},pen)
 const g=node('g',{'data-stroke-start-gate':policy.id,'data-stroke-reveal-progress':'0.1'},pen);for(const n of all)if(n!==owner)n.ownerSVGElement=owner;doc.getElementById=(id:string)=>all.find(n=>n.attrs.id===id)??null;view.getComputedStyle=(n:any)=>({transform:'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',stroke:n===guide?'rgb(255, 255, 255)':'none',fill:n===guide?'none':'rgb(0, 0, 0)',strokeWidth:'14px',strokeLinecap:'round',strokeLinejoin:'miter',strokeOpacity:'1',strokeDashoffset:'0px',strokeDasharray:'1,2',getPropertyValue:(k:string)=>k==='mask-image'?(n.attrs.mask?'url(http://local/#original-q7)':'none'):'none'});return{g,previous,ink,guide}
}

test('逭12 source-P foot binds actual full5, identity and all12 original pens',()=>{
 const f=JSON.parse(bytes(SOURCE.fixture).toString()).u902d
 assert.equal(sha(bytes(SOURCE.fixture)),SOURCE.fixtureSHA256)
 assert.equal(sha(JSON.stringify(f.strokes)),SOURCE.geometrySHA256)
 assert.equal(sha(bytes(SOURCE.proof)),SOURCE.proofSHA256)
 assert.equal(sha(bytes(SOURCE.actualSourceProofFile)),SOURCE.actualSourceProofSHA256)
 assert.deepEqual(Object.keys(f.fullProof),['engineRevision','engineHashes','groups','trace','defaults'])
 const ctx=makeReviewedU902dFootSourceContext(f.fullProof,f.identity,f.strokes)
 assert(ctx);assert.equal(ctx,reviewedU902dFootContext(f.strokes))
 const changedWhole=structuredClone(f.strokes);changedWhole[0][0].weight++
 assert.equal(reviewedU902dFootContext(changedWhole),null)
 const badProof=structuredClone(f.fullProof);badProof.trace[0][0].args[0]++
 assert.equal(makeReviewedU902dFootSourceContext(badProof,f.identity,f.strokes),null)
 assert.equal(makeReviewedU902dFootSourceContext({...f.fullProof,header:'invented'},f.identity,f.strokes),null)
 assert.equal(makeReviewedU902dFootSourceContext(f.fullProof,{...f.identity,sourceRoot:'u902d-vs2'},f.strokes),null)
 let getters=0;const getterProof={...f.fullProof};Object.defineProperty(getterProof,'groups',{enumerable:true,get(){getters++;throw Error('getter forbidden')}})
 assert.equal(makeReviewedU902dFootSourceContext(getterProof,f.identity,f.strokes),null);assert.equal(getters,0)
 assert.equal(reviewedU902dFootPolicy({...ctx},11,1),null)
 assert.equal(reviewedU902dFootPolicy(ctx,11,0),null)
 const p=reviewedU902dFootPolicy(ctx,11,1);assert(p)
 assert.equal(p.segment.outline,f.strokes[11][1].outline)
 assert.equal(p.segment.revealPath,'M26.5 76 C34 86 42 90.5 89.5 88.5')
 assert.equal(p.previousSegment.revealPath,'M8 89.5 Q17.5 84 27.5 77')
 assert.equal(p.segment.weight,64.228109);assert.equal(p.previousSegment.weight,23.16247)
 assert.equal(p.phaseShare,65127/7361120)
 for(const t of [0,1e-6,.001,.01,.03,p.phaseShare-1e-10,p.phaseShare,p.phaseShare+1e-10,.5,.99999999,1]){
  const frame=sampleReviewedU902dFootFrame(p,p.segment,t,1)
  assert.equal(frame.progress,t);assert.equal(frame.UARead,false)
  assert.equal(frame.paintOriginalPOnce,true);assert.equal(frame.originalPDirect,t===1)
  assert.equal(frame.originalGuideUnchanged,true);assert.equal(frame.originalWeightUnchanged,true)
  assert(frame.bodyClip.width>=0&&frame.fullFootClip.width>=0)
  if(t===0){assert.equal(frame.footPathD,'');assert.equal(frame.fullFootClip.width,0);assert.equal(frame.bodyClip.width,0)}
  if(t<p.phaseShare)assert.equal(frame.bodyClip.width,0)
  if(t>=p.phaseShare){assert.equal(frame.footPathD,'');assert.equal(frame.footFullTriangles,2);assert.equal(frame.fullFootClip.width,28.2-26.4)}
  if(t===1){assert.equal(frame.bodyClip.width,95-28.2);assert.equal(frame.originalSourceFull,true);assert.equal(frame.completionDirectOriginalOutlineRequired,true)}
 }
 assert.throws(()=>sampleReviewedU902dFootFrame(p,p.segment,.01,.99999999))
 assert.throws(()=>sampleReviewedU902dFootFrame(p,{...p.segment,weight:1},.01,1))
 assert.throws(()=>sampleReviewedU902dFootFrame(p,p.segment,NaN,1))
 assert.equal(SOURCE.sourceProofFormat,'actual-full5')
 assert.equal(SOURCE.nativeApproval,false);assert.equal(SOURCE.runtimeApplied,false);assert.equal(SOURCE.guideGapPreserved,true)
})
test('逭12 exact actual prior original-Q7 completion gate rejects changed DOM before/after frame',()=>{
 const f=JSON.parse(bytes(SOURCE.fixture).toString()).u902d
 const ctx=makeReviewedU902dFootSourceContext(f.fullProof,f.identity,f.strokes);assert(ctx)
 const p=reviewedU902dFootPolicy(ctx,11,1);assert(p)
 const tr=priorTree(p);assert(verifyReviewedU902dFootPrior(p,tr.g,1))
 sampleReviewedU902dFootFrame(p,p.segment,.5,1)
 assert(verifyReviewedU902dFootPrior(p,tr.g,1))
 assert.equal(verifyReviewedU902dFootPrior(p,tr.g,.99999999),false)
 const cases:Array<[any,string,string|null]>=[
  [tr.ink,'d',p.previousSegment.outline+' '],
  [tr.ink,'mask',null],
  [tr.guide,'d',p.previousSegment.revealPath+' '],
  [tr.guide,'stroke-width','13'],
  [tr.guide,'stroke-linecap','butt'],
  [tr.guide,'stroke-dashoffset','0.0001'],
  [tr.previous,'data-stroke-reveal-progress','0.99999999'],
  [tr.g,'transform','translate(0 0)']
 ]
 for(const [n,k,v]of cases){const old=n.attrs[k];if(v===null)delete n.attrs[k];else n.attrs[k]=v;assert.equal(verifyReviewedU902dFootPrior(p,tr.g,1),false);if(old===undefined)delete n.attrs[k];else n.attrs[k]=old;assert(verifyReviewedU902dFootPrior(p,tr.g,1))}
 tr.ink.isConnected=false;assert.equal(verifyReviewedU902dFootPrior(p,tr.g,1),false);tr.ink.isConnected=true
 tr.previous.children.push({...tr.ink});assert.equal(verifyReviewedU902dFootPrior(p,tr.g,1),false);tr.previous.children.pop()
 const oldOwner=tr.ink.ownerSVGElement;tr.ink.ownerSVGElement={};assert.equal(verifyReviewedU902dFootPrior(p,tr.g,1),false);tr.ink.ownerSVGElement=oldOwner
 assert(verifyReviewedU902dFootPrior(p,tr.g,1))
})
