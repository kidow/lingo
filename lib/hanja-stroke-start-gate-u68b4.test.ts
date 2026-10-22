import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {reviewedU68b4Context as context,reviewedU68b4Policy as policy,sampleReviewedU68b4Prefix as sample,REVIEWED_U68B4_CONTACT_PROOF as F,REVIEWED_U68B4_SOURCE as SOURCE} from './hanja-stroke-start-gate-u68b4.ts'
type R=readonly[bigint,bigint];type P=readonly[R,R]
const gcd=(a:bigint,b:bigint):bigint=>b?gcd(b,a%b):a<0n?-a:a
const r=(n:bigint,d=1n):R=>{assert(d);const g=gcd(n,d);return[n/g,d/g]},add=(a:R,b:R)=>r(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),sub=(a:R,b:R)=>r(a[0]*b[1]-b[0]*a[1],a[1]*b[1]),mul=(a:R,b:R)=>r(a[0]*b[0],a[1]*b[1]),cmp=(a:R,b:R)=>a[0]*b[1]-b[0]*a[1],eq=(a:R,b:R)=>cmp(a,b)===0n
const rat=(x:readonly string[]):R=>r(BigInt(x[0]),BigInt(x[1])),point=(x:readonly(readonly string[])[]):P=>[rat(x[0]),rat(x[1])],vec=(a:P,b:P):P=>[sub(a[0],b[0]),sub(a[1],b[1])],cross=(a:P,b:P)=>sub(mul(a[0],b[1]),mul(a[1],b[0])),ori=(a:P,b:P,p:P)=>cross(vec(b,a),vec(p,a))
const bytes=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(bytes(p).toString()),sha=(x:string|Buffer)=>createHash('sha256').update(x).digest('hex'),clone=(x:any)=>JSON.parse(JSON.stringify(x))
const normalized=(p:any[])=>p.map(v=>[v.x/2,v.y/2]),num=(x:readonly string[])=>Number(x[0])/Number(x[1])
test('1377 own 梴8m2 cardinal contact prefix exact source/union certificate FIRST',()=>{
 for(const[p,h]of Object.entries(SOURCE.inputSHA256))assert.equal(sha(bytes(p)),h,p)
 const f=json(SOURCE.fixtureFile),strokes=f.originalOrderBaseline,full=json(SOURCE.actualFull5File),review=json('docs/hanja-goal-glyphwiki-batch915-2026-10-13/review.json'),hold=json('docs/hanja-source-native-hold-u68b4-vh-prefix-2026-10-20/hold.json')
 assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(full.groups.length,14);assert.equal(full.trace.flat().length,14);assert.equal(full.groups.flatMap((g:any)=>g.polygons).length,25)
 assert.equal(sha(JSON.stringify(strokes)),SOURCE.geometrySHA256);assert.deepEqual([strokes.length,strokes.flat().length],[11,12]);assert.equal(strokes.flat().reduce((n:number,s:any)=>n+(s.outline.match(/M/g)||[]).length,0),25)
 assert.equal(review.compatibleWholeRoots.length,1);assert.equal(review.compatibleWholeRoots[0],'u68b4-var-001');assert(review.dictionaryDirectionStrokes.includes(8));assert(review.reason.includes('Domestic pen8 is a continuous vertical-right turn.'));assert.equal(review.nativeApproval,false);assert.equal(hold.nativeApproval,false)
 const C=context(strokes)!;assert(C);const POL=policy(C,7,1)!;assert(POL);assert.equal(POL.kind,'cardinal-contact-prefix-u68b4');assert.deepEqual(POL.segment,strokes[7][1]);assert.deepEqual(POL.predecessor,strokes[7][0])
 assert.equal(POL.segment.direction,'right');assert.equal(POL.segment.weight,39.425);assert(!Object.hasOwn(POL.segment,'revealPath'));assert(!Object.hasOwn(POL.segment,'revealWidth'));assert.equal(policy({...C},7,1),null)
 for(let pen=0;pen<strokes.length;pen++)for(let mask=0;mask<strokes[pen].length;mask++)assert.equal(policy(C,pen,mask),pen===7&&mask===1?POL:null)
 const R=F.originalHRectangle.map(point),T=F.originalHTriangle.map(point),V=F.originalVBody.map(point),core=F.originalPositiveCore.map(point),a=rat(F.initialLeft),b=rat(F.initialRight),x0=rat(F.xMin),x1=rat(F.xMax),left=rat(F.leftBackfill),right=rat(F.rightAdvance),bottom=rat(F.clipY),height=rat(F.clipHeight),stripY=R[0][1],stripHeight=sub(R[2][1],stripY)
 assert.deepEqual(normalized(full.trace[11][0].polygons[0]),V.map(p=>p.map(x=>Number(x[0])/Number(x[1]))));assert.deepEqual(normalized(full.trace[12][0].polygons[0]),R.map(p=>p.map(x=>Number(x[0])/Number(x[1]))));assert.deepEqual(normalized(full.trace[12][0].polygons[1]),T.map(p=>p.map(x=>Number(x[0])/Number(x[1]))))
 // Exact all-q certificate: [a-left*q,b+right*q] contains the fixed positive core;
 // each vertical section of T intersects R's strip because edge T0--T1 has y in [72,73].
 // Thus clipped H and completed V are connected for every q>0, not just sampled values.
 assert(cmp(x0,a)<0n&&cmp(a,b)<0n&&cmp(b,x1)<0n);assert(eq(sub(a,x0),left)&&eq(sub(x1,b),right));assert(left[0]>0n&&right[0]>0n)
 assert(eq(T[0][1],stripY));assert(cmp(T[1][1],stripY)>=0n&&cmp(T[1][1],R[2][1])<=0n);assert(cmp(T[2][1],stripY)<0n);assert(cmp(T[1][0],T[2][0])<0n&&cmp(T[2][0],T[0][0])<0n);assert(cmp(T[1][0],b)>0n)
 for(const p of core){for(let i=0;i<V.length;i++)assert(ori(V[i],V[(i+1)%V.length],p)[0]>=0n);assert(cmp(p[0],a)>=0n&&cmp(p[0],b)<=0n);assert(cmp(p[1],stripY)>=0n&&cmp(p[1],R[2][1])<=0n)}
 assert(eq(mul(sub(b,a),stripHeight),rat(F.positiveCoreArea)));assert(eq(rat(F.positiveCoreArea),r(11n)));assert(eq(add(mul(left,stripHeight),mul(right,height)),rat(F.newOpaqueUnionAreaLipschitzBound)));assert(eq(rat(F.newOpaqueUnionAreaLipschitzBound),r(2039n,10n)))
 assert(eq(bottom,T[2][1]));assert(eq(add(bottom,height),R[2][1]));assert.equal(F.p0PositiveLimitHAreaAlreadyInsideV,true)
 assert.equal(sample(POL,0).visible,false);assert.equal(sample(POL,0).clip,null);assert.equal(sample(POL,1).originalPDirect,true);assert.equal(sample(POL,1).clip,null)
 let previous={x:num(a),right:num(b)}
 for(const q of[Number.MIN_VALUE,1e-6,.01,.03,.1,.5,.95,.99999999]){const frame=sample(POL,q),clip=frame.clip!;assert(frame.visible);assert.equal(frame.UARead,false);assert.equal(frame.requiresCompletedOriginalPredecessor,true);assert(clip.x>=num(x0)&&clip.x<=num(a));assert(clip.x+clip.width>=num(b)-1e-13&&clip.x+clip.width<=num(x1)+1e-13);assert(clip.x<=previous.x&&clip.x+clip.width>=previous.right-1e-13);assert.equal(clip.y,num(bottom));assert.equal(clip.height,num(height));assert(Object.isFrozen(clip));previous={x:clip.x,right:clip.x+clip.width}}
 for(const q of[-1,NaN,Infinity,1.0001])assert.throws(()=>sample(POL,q));assert.throws(()=>sample({...POL},.01))
 for(const mutate of[(x:any)=>x[7][1].weight++,(x:any)=>x[7][1].revealPath='M0 0L1 1',(x:any)=>x[7][1].revealWidth=14,(x:any)=>x[7][0].outline+=' ',(x:any)=>x[7][1].bounds[0]++,(x:any)=>x[0][0].weight++,(x:any)=>x.reverse()]){const bad=clone(strokes);mutate(bad);assert.notDeepEqual(bad,strokes);assert.equal(context(bad),null)}
 const hidden=clone(strokes);Object.defineProperty(hidden[7][1],'weight',{value:39.425,enumerable:false});assert.equal(context(hidden),null);const holes=clone(strokes);delete holes[7][1];assert.equal(context(holes),null);let reads=0;const accessor=clone(strokes);Object.defineProperty(accessor[7][1],'weight',{enumerable:true,get(){reads++;return 39.425}});assert.equal(context(accessor),null);assert.equal(reads,0)
 assert(Object.isFrozen(POL.segment));assert.equal(SOURCE.newGuideOrConnector,false);assert.equal(SOURCE.newInternalClock,true);assert.equal(SOURCE.sourceTimingPreservedClaim,false);assert.equal(SOURCE.DOMAdapterPrepared,false);assert.equal(SOURCE.nativeApproval,false);assert.equal(SOURCE.runtimeApplied,false)
 console.log(JSON.stringify({glyph:'梴',batch:1377,target:'8m2',actualFull5:true,pens:11,masks:12,polygons:25,positiveCoreArea:'11',boundaryContactOnly:false,newOpaqueUnionAreaLipschitzBound:'2039/10',allQNestedSourceBoundCertificate:true,originalGuideAbsent:true,newGuide:false,newInternalClock:true,sourceClockIdentity:false,DOMAdapter:false,nativeApproval:false,SSR:0,engine:0,projection:0,oldTestsRepeated:0}))
})

import {bindReviewedU68b4Frame as bindFrame,commitReviewedU68b4Prefix as commitPrefix,applyReviewedU68b4Prefix as applyPrefix,REVIEWED_U68B4_DOM_ADAPTER as ADAPTER} from './hanja-stroke-start-gate-u68b4.ts'
function adapterMock(POL:any,p:number){
 const writes:{node:any;key:string;value:string}[]=[],doc:any={baseURI:'http://isolated.test/review'},view:any={}
 doc.defaultView=view;view.document=doc
 const node=(name:string,parent:any,attrs:Record<string,string>={})=>{
  const n:any={localName:name,namespaceURI:'http://www.w3.org/2000/svg',ownerDocument:doc,ownerSVGElement:null,parentElement:parent,isConnected:true,children:[],attrs:{...attrs},styles:{},onSet:null,
   getAttribute(k:string){return Object.hasOwn(this.attrs,k)?this.attrs[k]:null},
   setAttribute(k:string,v:string){writes.push({node:this,key:k,value:v});this.attrs[k]=v;this.onSet?.(k,v)},
   removeAttribute(k:string){delete this.attrs[k];writes.push({node:this,key:k,value:'<removed>'})},
   get previousElementSibling(){const c=this.parentElement?.children||[],i=c.indexOf(this);return i>0?c[i-1]:null},
   get nextElementSibling(){const c=this.parentElement?.children||[],i=c.indexOf(this);return i>=0?c[i+1]||null:null}}
  parent?.children.push(n);return n
 }
 view.getComputedStyle=(n:any)=>({transform:n.styles.transform??'none',opacity:n.styles.opacity??'1',display:n.styles.display??'inline',filter:n.styles.filter??'none',mixBlendMode:n.styles.mixBlendMode??'normal',visibility:n.styles.visibility??n.getAttribute('visibility')??'visible',fill:n.styles.fill??'rgb(0, 0, 0)',fillOpacity:n.styles.fillOpacity??'1',fillRule:n.styles.fillRule??'nonzero',stroke:n.styles.stroke??'none',getPropertyValue(k:string){if(Object.hasOwn(n.styles,k))return n.styles[k];if(k==='clip-path')return n.getAttribute('clip-path')??'none';if(k==='mask-image')return'none';if(['translate','rotate','scale'].includes(k))return'none';return''}})
 const svg=node('svg',null,{viewBox:'0 0 100 100',width:'520',height:'520'}),outline=node('g',svg,{'data-stroke-outlines':'true'}),stroke=node('g',outline,{'data-outline-stroke':'8'}),previous=node('path',stroke,{d:POL.predecessor.outline}),target=node('g',stroke,{'data-stroke-start-gate':POL.id,'data-stroke-reveal-policy':POL.kind,'data-stroke-reveal-progress':String(p)}),defs=node('defs',target),clip=node('clipPath',defs,{id:'own-u68b4-prefix-clip',clipPathUnits:'userSpaceOnUse'}),rect=node('rect',clip,{id:'own-u68b4-prefix-rect',x:'60.15',y:'67',width:'0',height:'7'}),ink=node('path',target,{id:'own-u68b4-ink','data-owner':'own','data-u68b4-ink':'true',d:POL.segment.outline,'clip-path':'url(#own-u68b4-prefix-clip)',visibility:'hidden'})
 let UAReads=0
 for(const n of[outline,stroke,previous,target,defs,clip,rect,ink]){n.ownerSVGElement=svg;n.getTotalLength=()=>{UAReads++;throw Error('No synthetic UA guide allowed')};n.getPointAtLength=()=>{UAReads++;throw Error('No synthetic UA guide allowed')}}
 return{nodes:{ink,rect},svg,outline,stroke,previous,target,defs,clip,rect,ink,doc,view,writes,UAReads:()=>UAReads}
}
test('1377 adapter tail: original complete V, clip lifecycle and fail-closed same-frame only',()=>{
 const strokes=json(SOURCE.fixtureFile).originalOrderBaseline,C=context(strokes)!,POL=policy(C,7,1)!;assert(C&&POL);assert.equal(ADAPTER.prepared,true)
 const t=adapterMock(POL,0),originalV=t.previous.attrs.d,originalH=t.ink.attrs.d
 t.previous.attrs.d='incomplete source V';assert.equal(applyPrefix(POL,0,t.nodes),true);assert.equal(t.ink.attrs.visibility,'hidden');assert.equal(t.rect.attrs.width,'0')
 t.previous.attrs.d=originalV
 for(const p of[.000001,.01,.03,.1,.5,1,.01,0]){
  t.target.attrs['data-stroke-reveal-progress']=String(p);assert.equal(applyPrefix(POL,p,t.nodes),true,'lifecycle '+p)
  const f=sample(POL,p);assert.equal(t.ink.attrs.visibility,f.visible?'visible':'hidden');assert.equal(t.ink.getAttribute('clip-path'),p===1?null:'url(#own-u68b4-prefix-clip)');assert.equal(t.rect.attrs.width,String(f.clip?.width??0));assert.equal(t.rect.attrs.x,String(f.clip?.x??60.15));assert.equal(t.writes.at(-1)!.node,t.ink);assert.equal(t.writes.at(-1)!.key,'visibility');assert.equal(t.previous.attrs.d,originalV);assert.equal(t.ink.attrs.d,originalH)
 }
 assert.equal(t.UAReads(),0);assert.equal(t.writes.filter(w=>w.node===t.previous).length,0)
 const between=adapterMock(POL,.01),frame=bindFrame(POL,.01,between.nodes);between.rect.attrs.width='9';assert.equal(commitPrefix(between.nodes,frame),false);assert.equal(between.ink.attrs.visibility,'hidden');assert.equal(between.rect.attrs.width,'0')
 const forged=adapterMock(POL,.01);assert.equal(commitPrefix(forged.nodes,sample(POL,.01)),false);assert.equal(forged.ink.attrs.visibility,'hidden')
 const wrongNodes=adapterMock(POL,.01),valid=bindFrame(POL,.01,wrongNodes.nodes),other=adapterMock(POL,.01);assert.equal(commitPrefix(other.nodes,valid),false);assert.equal(other.ink.attrs.visibility,'hidden')
 const cases:[string,(m:ReturnType<typeof adapterMock>)=>void][]=[
  ['prior d',m=>m.previous.attrs.d+=' '],['prior clipped',m=>m.previous.attrs['clip-path']='url(#bad)'],['prior masked',m=>m.previous.attrs.mask='url(#bad)'],['prior hidden',m=>m.previous.attrs.visibility='hidden'],
  ['prior opacity',m=>m.previous.styles.opacity='.5'],['prior fill opacity',m=>m.previous.styles.fillOpacity='.5'],['prior stroke',m=>m.previous.styles.stroke='black'],['prior color',m=>m.previous.styles.fill='rgb(1, 0, 0)'],['prior fillrule',m=>m.previous.styles.fillRule='evenodd'],
  ['prior owner',m=>m.previous.ownerDocument={}],['prior detached',m=>m.previous.isConnected=false],['extra stroke child',m=>m.stroke.children.push({})],['wrong clip units',m=>m.clip.attrs.clipPathUnits='objectBoundingBox'],
  ['wrong progress',m=>m.target.attrs['data-stroke-reveal-progress']='.2'],['ink source',m=>m.ink.attrs.d+=' '],['ink mask',m=>m.ink.attrs.mask='url(#bad)'],['ink CSS mask',m=>m.ink.styles['mask-image']='url(#bad)'],
  ['ink CSS clip override',m=>m.ink.styles['clip-path']='none'],['foreign document clip',m=>m.ink.styles['clip-path']='url(http://foreign.test/#own-u68b4-prefix-clip)'],
  ['rect state',m=>m.rect.attrs.width='1'],['CSS transform',m=>m.stroke.styles.transform='matrix(1,0,0,1,1,0)'],['CSS scale',m=>m.svg.styles.scale='2'],['attribute transform',m=>m.target.attrs.transform='translate(1)'],
  ['source pathLength',m=>m.previous.attrs.pathLength='1'],['rect parent',m=>m.rect.parentElement=m.defs],['document owner',m=>m.doc.defaultView={document:m.doc}]
 ]
 for(const[name,change]of cases){const m=adapterMock(POL,.01);change(m);assert.equal(applyPrefix(POL,.01,m.nodes),false,name);assert.equal(m.ink.attrs.visibility,'hidden',name);assert.equal(m.rect.attrs.width,'0',name)}
 const mid=adapterMock(POL,.01);mid.rect.onSet=(key:string,value:string)=>{if(key==='width'&&value!=='0')mid.previous.attrs['clip-path']='url(#changed-during-write)'};assert.equal(applyPrefix(POL,.01,mid.nodes),false);assert.equal(mid.ink.attrs.visibility,'hidden');assert.equal(mid.rect.attrs.width,'0')
 const afterBind=adapterMock(POL,.01),bound=bindFrame(POL,.01,afterBind.nodes);afterBind.target.styles.transform='translate(1px)';assert.equal(commitPrefix(afterBind.nodes,bound),false);assert.equal(afterBind.ink.attrs.visibility,'hidden')
 console.log(JSON.stringify({glyph:'梴',newAdapterTail:true,positiveLifecycleSamples:8,negativeCases:cases.length,betweenAndPostWriteGuards:true,sourceVUnchanged:true,visibilityLast:true,noSyntheticGuide:true,UAReads:0,native:false,oldMathTestRepeated:0,SSR:0,engine:0,projection:0}))
})
