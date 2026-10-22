import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import type {HanjaOutlineStrokes} from './hanja-stroke-outline'
import {reviewedU61e5Context,reviewedU61e5Policy,makeReviewedU61e5SourceContext,commitReviewedU61e5Caps,REVIEWED_U61E5_SOURCE,REVIEWED_U61E5_PROOFS,REVIEWED_U61E5_INPUT_SHA256} from './hanja-stroke-start-caps-u61e5.ts'
const fixture=JSON.parse(readFileSync(new URL('../docs/hanja-source-cache-u61e5-2026-10-23/fixture.json',import.meta.url),'utf8')),strokes=fixture.strokes as HanjaOutlineStrokes,clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x)),sha=(v:string|Buffer)=>createHash('sha256').update(v).digest('hex')
const targets=[[0,0],[1,0],[5,0],[6,1],[12,0],[13,0],[16,0],[17,0]] as const,context=reviewedU61e5Context(strokes),policies=targets.map(([p,m])=>{const q=reviewedU61e5Policy(context,p,m);assert(q);return q})
// 새exact Fraction batch1을 이미통과한고유저장증거와원source에결박한다. 산술재실행0.
test('懥 own MQ8 source/certificate guard FIRST',()=>{
 assert(context);assert.equal(sha(JSON.stringify(strokes)),REVIEWED_U61E5_SOURCE.geometrySHA256);
 assert.deepEqual([strokes.length,strokes.flat().length,strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0)],[18,21,38]);
 for(const[p,h]of Object.entries(REVIEWED_U61E5_INPUT_SHA256))assert.equal(sha(readFileSync(new URL('../'+p,import.meta.url))),h,p);
 const full=JSON.parse(readFileSync(new URL('../'+REVIEWED_U61E5_SOURCE.full5File,import.meta.url),'utf8'));
 assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace']);
 assert.equal(makeReviewedU61e5SourceContext(full,REVIEWED_U61E5_SOURCE.sourceIdentity,strokes),context);
 const badProof=clone(full);badProof.trace[0][0].args[0]++;assert.equal(makeReviewedU61e5SourceContext(badProof,REVIEWED_U61E5_SOURCE.sourceIdentity,strokes),null);
 assert.equal(makeReviewedU61e5SourceContext({groups:full.groups,trace:full.trace,defaults:full.defaults},REVIEWED_U61E5_SOURCE.sourceIdentity,strokes),null);
 assert.equal(makeReviewedU61e5SourceContext(full,{...REVIEWED_U61E5_SOURCE.sourceIdentity,file:'other'},strokes),null);
 let count=0;for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)if(reviewedU61e5Policy(context,i,j))count++;assert.equal(count,8);assert.equal(reviewedU61e5Policy(context,12,1),null);
 for(let i=0;i<targets.length;i++){
  const[pen,mask]=targets[i],proof=REVIEWED_U61E5_PROOFS[i],policy=policies[i],segment=strokes[pen][mask];
  assert.equal(proof.maskSHA256,sha(JSON.stringify(segment)));assert.equal(proof.guide,segment.revealPath);assert.equal(proof.width,14);assert.equal(proof.weight,segment.weight);
  assert.equal(policy.certificate.syntax,'MQ');assert.equal(proof.initialSufficientConditions,true);assert.equal(proof.previousMaskContactNotProved,true);assert.equal(proof.fullSweepNotProved,true);
  for(const key of ['lambdaMin','chordSquaredMinus49','curvatureMargin','cosMinusRK','tangentSquareMargin']){const v=String((proof as any)[key]);assert(v&&!v.startsWith('-')&&v!=='0')}
  assert(Object.isFrozen(policy)&&Object.isFrozen(policy.certificate.storedBounds));
 }
 assert.deepEqual(REVIEWED_U61E5_PROOFS.map(p=>[p.T,p.K]),[['1/2','1/50'],['1/2','1/25'],['1/2','1/20'],['2/3','1/50'],['1/2','1/50'],['1/2','1/25'],['1/2','1/25'],['1/2','1/10']]);
 let negatives=0;for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)for(const key of Object.keys(strokes[i][j])){
  const q=clone(strokes),m=q[i][j] as any;if(key==='bounds')m.bounds[0]+=.01;else if(typeof m[key]==='number')m[key]+=.01;else m[key]+=' ';
  assert.equal(reviewedU61e5Context(q),null);negatives++;
 }
 let getters=0;const accessor=clone(strokes);Object.defineProperty(accessor[0][0],'weight',{get(){getters++;return 1},enumerable:true});assert.equal(reviewedU61e5Context(accessor),null);assert.equal(getters,0);
 assert.equal(reviewedU61e5Policy({...context!},0,0),null);assert.equal(REVIEWED_U61E5_SOURCE.newNativeRecoveryApproved,false);assert.equal(REVIEWED_U61E5_SOURCE.source13FootNotSelected,true);
 console.log(JSON.stringify({newOwnCapsSourceGuard:true,targets:8,negative:negatives,getters,mathBatchAlreadyExecuted:1,mathRerun:0}));
})
function fake(index:number){
 const policy=policies[index];
 const id='u61e5-test-'+index,events:string[]=[],doc:any={defaultView:null},view={document:doc,getComputedStyle:(n:any)=>({transform:n.cssTransform,getPropertyValue:(k:string)=>k==='translate'?n.cssTranslate:'none'})};doc.defaultView=view;let owner:any=null
 const node=(name:string,attrs:Record<string,string>={})=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:doc,parentElement:null as any,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},writeHook:null as null|((k:string,v:string)=>void),getAttribute(k:string){return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v;events.push(name+':'+k+'='+v);this.writeHook?.(k,v)},removeAttribute(k:string){delete this.attrs[k]}})
 const svg=node('svg');owner=svg;const group=node('g'),target=node('g',{'data-stroke-start-gate':policy!.id,'data-u61e5-progress':'0.5','data-u61e5-clip':id}),defs=node('defs');group.parentElement=svg;target.parentElement=group;defs.parentElement=target
 const segment=policy!.segment,q0=segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number);let length=100,reads=0,points=0,lengthHook:(()=>void)|null=null,pointHook:((d:number)=>{x:number;y:number})|null=null
 const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-u61e5-measurement':'true',id:id+'-u61e5-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('UA:length');lengthHook?.();return length},getPointAtLength(d:number){points++;events.push('UA:point');return pointHook?pointHook(d):{x:q0[0]+d/10,y:q0[1]}}});measurement.parentElement=defs
 const mask=node('mask',{id:id+'-u61e5-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'});mask.parentElement=defs
 const guide=node('path',{'data-growing-owner':id,id:id+'-u61e5-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('path',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-u61e5-growing)',visibility:'hidden'});guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
 const completed=node('path',{d:segment.outline,visibility:'visible'});completed.parentElement=target
 return{policy,id,segment,q0,svg,group,target,measurement,mask,guide,startCap,endCap,ink,completed,nodes:{measurement,guide,startCap,endCap,ink},events,counts:()=>[reads,points],setLength:(n:number)=>{length=n},onLength:(f:()=>void)=>{lengthHook=f},onPoint:(f:(d:number)=>{x:number;y:number})=>{pointHook=f}}
}

const dispatch=(x:ReturnType<typeof fake>,p:number,s=x.segment)=>commitReviewedU61e5Caps(x.policy,s,p,x.id,x.nodes as any),commit=(x:ReturnType<typeof fake>,p:number)=>{x.target.attrs['data-u61e5-progress']=String(p);return dispatch(x,p)}
function runDOM(index:number){
 for(const p of[1e-6,.03,.5]){const x=fake(index),r=commit(x,p);assert.equal(r.status,'visible');assert(r.frame);assert.deepEqual(x.counts(),[1,1]);assert.equal(r.frame.d,p*100);assert.equal(r.frame.rho,Math.min(7,p*100));assert.equal(x.ink.getAttribute('data-growing-distance'),String(r.frame.d));assert.equal(x.startCap.getAttribute('r'),String(r.frame.rho));assert.equal(x.endCap.getAttribute('r'),String(r.frame.rho));assert.equal(x.events.at(-1),'path:visibility=visible');r.cleanup();assert.equal(x.ink.getAttribute('visibility'),'hidden');assert.equal(x.guide.getAttribute('stroke-dasharray'),'0 2');assert.equal(x.startCap.getAttribute('r'),'0');for(const k of['progress','length','distance','radius','end-x','end-y'])assert.equal(x.ink.getAttribute('data-growing-'+k),null)}
 for(const p of[0,1]){const x=fake(index),r=commit(x,p);assert.equal(r.status,p===0?'empty':'complete');assert.deepEqual(x.counts(),[0,0]);r.cleanup();assert.equal(x.completed.getAttribute('visibility'),'visible')}
 let negatives=0;for(const p of[NaN,Infinity,-.1,1.1]){const x=fake(index);assert.equal(commit(x,p).status,'hidden');negatives++}
 const mutations=[(x:ReturnType<typeof fake>)=>{x.measurement.attrs.d+=' '},(x:ReturnType<typeof fake>)=>{x.measurement.attrs.pathLength='1'},(x:ReturnType<typeof fake>)=>{x.target.attrs['data-u61e5-progress']='.4'},(x:ReturnType<typeof fake>)=>{x.group.attrs.transform='translate(1)'},(x:ReturnType<typeof fake>)=>{x.svg.cssTransform='matrix(1,0,0,1,0,0)'},(x:ReturnType<typeof fake>)=>{x.group.cssTranslate='1px'},(x:ReturnType<typeof fake>)=>{x.measurement.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.measurement.ownerDocument={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.ownerSVGElement={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.isConnected=false},(x:ReturnType<typeof fake>)=>{x.startCap.attrs.transform='translate(10)'},(x:ReturnType<typeof fake>)=>{x.endCap.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.ink.cssTransform='matrix(1,0,0,1,5,0)'}]
 for(const mutate of mutations)for(const when of['before','length','point']){const x=fake(index);if(when==='before')mutate(x);else if(when==='length')x.onLength(()=>mutate(x));else x.onPoint(d=>{mutate(x);return{x:x.q0[0]+d/10,y:x.q0[1]}});assert.equal((when==='before'?dispatch(x,.5):commit(x,.5)).status,'hidden');assert.equal(x.ink.getAttribute('visibility'),'hidden');negatives++}
 for(const L of[NaN,Infinity,-1,0,7]){const x=fake(index);x.setLength(L);assert.equal(commit(x,.5).status,'hidden');assert.deepEqual(x.counts(),[1,0]);negatives++}
 const invalid=fake(index);invalid.onPoint(()=>({x:NaN,y:0}));assert.equal(commit(invalid,.5).status,'hidden');negatives++
 const changed=fake(index);changed.guide.writeHook=k=>{if(k==='stroke-dasharray'&&changed.counts()[1])changed.target.attrs['data-u61e5-progress']='.25'};assert.equal(commit(changed,.5).status,'hidden');negatives++
 const wrong=fake(index);assert.equal(dispatch(wrong,.5,{...wrong.segment,weight:1}).status,'hidden');assert.deepEqual(wrong.counts(),[0,0]);negatives++
 const impostor=fake(index);assert.equal(commitReviewedU61e5Caps({...impostor.policy},impostor.segment,.5,impostor.id,impostor.nodes as any).status,'hidden');negatives++
 console.log(JSON.stringify({DOMFirst:true,targetIndex:index,visibleSamples:3,emptyCompleteSamples:2,negative:negatives,canonicalSetRemove:true,visibilityLast:true,SSR:0,nativeApproval:false}))
}
test('懥 own eight MQ starts DOM canonical lifecycle FIRST',()=>{for(let i=0;i<targets.length;i++)runDOM(i)})
