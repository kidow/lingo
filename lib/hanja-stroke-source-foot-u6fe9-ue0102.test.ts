import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync}from'node:fs'
import {createHash}from'node:crypto'
import{makeReviewedU6fe9Ue0102FootSourceContext,reviewedU6fe9Ue0102FootContext,reviewedU6fe9Ue0102FootPolicy,measureReviewedU6fe9Ue0102FootFrame,verifyReviewedU6fe9Ue0102FootPrior,REVIEWED_U6fe9Ue0102_FOOT_SOURCE as S}from'./hanja-stroke-source-foot-u6fe9-ue0102.ts'
const body4=JSON.parse(readFileSync(new URL('../docs/hanja-goal-glyphwiki-batch384-2026-10-09/engine-proof.json',import.meta.url),'utf8'))
const trace=JSON.parse(readFileSync(new URL('../docs/hanja-goal-glyphwiki-batch384-2026-10-09/draw-trace.json',import.meta.url),'utf8'))
const ready=JSON.parse(readFileSync(new URL('../docs/hanja-source-readiness-u6fe9-2026-10-25/water3-foot-readiness.json',import.meta.url),'utf8'))
const pair=ready.sourcePairOnly.derivedMasksForMath.map((s:any,i:number)=>({...s,weight:Math.round(Math.hypot(trace[i+2][0].args[4]-trace[i+2][0].args[0],trace[i+2][0].args[5]-trace[i+2][0].args[1])/2*1e6)/1e6}))
// 무관한15획은 검증하지 않는 pair-only 계약의 DOM 단위검사용 더미이다. 실제17획 source 검증을 대신하지 않는다.
const unrelated={outline:'M0 0L1 0L1 1Z',bounds:[0,0,1,1],direction:'right',weight:1}
const outlines:any=Array.from({length:17},()=>[{...unrelated}]);outlines[2]=pair;outlines[0].push({...unrelated})
const f={strokes:outlines,identity:S.sourceIdentity}
const clone=<T>(v:T):T=>JSON.parse(JSON.stringify(v))
const context=makeReviewedU6fe9Ue0102FootSourceContext(body4,trace,f.identity,outlines)!
const policy=reviewedU6fe9Ue0102FootPolicy(context,2,1)!
function setup(){
 const doc:any={};let owner:any
 class E{namespaceURI='http://www.w3.org/2000/svg';isConnected=true;ownerDocument=doc;parentElement:any=null;children:any[]=[];a:Record<string,string>={};localName:string;kind='plain'
 constructor(name:string,attrs:Record<string,string>={}){this.localName=name;this.a={...attrs}}
 get ownerSVGElement(){return this===owner?null:owner}get previousElementSibling(){const i=this.parentElement?.children.indexOf(this);return i>0?this.parentElement.children[i-1]:null}get nextElementSibling(){const i=this.parentElement?.children.indexOf(this);return this.parentElement?.children[i+1]??null}
 add(n:any){n.parentElement=this;this.children.push(n);return n}getAttribute(k:string){return this.a[k]??null}setAttribute(k:string,v:string){this.a[k]=v}removeAttribute(k:string){delete this.a[k]}contains(n:any):boolean{return this.children.includes(n)||this.children.some(c=>c.contains(n))}
 getTotalLength(){return 100}getPointAtLength(d:number){const t=d/100;return{x:(1-t)**2*16.7+2*t*(1-t)*18.22+t*t*34.18,y:(1-t)**2*75+2*t*(1-t)*69+t*t*33.5}}
 }
 owner=new E('svg');const pen=owner.add(new E('g',{'data-outline-stroke':'3'})),prior=pen.add(new E('g',{'data-stroke-reveal-progress':'1'})),defs=prior.add(new E('defs')),mask=defs.add(new E('mask',{id:'prior-q7',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'})),q=mask.add(new E('path',{d:f.strokes[2][0].revealPath,fill:'none',stroke:'white','stroke-width':'14','stroke-linecap':'round','stroke-linejoin':'miter',pathLength:'1','stroke-dasharray':'1 2','stroke-dashoffset':'0'}));q.kind='guide'
 const ink=prior.add(new E('path',{d:f.strokes[2][0].outline,mask:'url(#prior-q7)'}));ink.kind='ink'
 const target=pen.add(new E('g',{'data-stroke-start-gate':policy.id,'data-stroke-reveal-progress':'0'})),md=target.add(new E('defs')),measurement=md.add(new E('path',{d:policy.segment.revealPath!,'data-u6fe9-ue0102-foot-measurement':'true'}))
 const view:any={document:doc,getComputedStyle(n:E){return{transform:n.getAttribute('transform')??'none',filter:'none',clipPath:'none',visibility:'visible',display:'inline',opacity:'1',fillOpacity:'1',fill:n.kind==='guide'?'none':'rgb(0, 0, 0)',stroke:n.kind==='guide'?'rgb(255, 255, 255)':'none',strokeWidth:'14px',strokeLinecap:'round',strokeLinejoin:'miter',strokeOpacity:'1',strokeDashoffset:'0px',strokeDasharray:'1px, 2px',getPropertyValue(k:string){return k==='mask-image'&&n.kind==='ink'?'url(#prior-q7)':'none'}}}};doc.defaultView=view;doc.getElementById=(id:string)=>{const visit=(n:E):any=>n.getAttribute('id')===id?n:n.children.map(visit).find(Boolean);return visit(owner)}
 return{E,owner,pen,prior,q,ink,target,measurement,doc}
}
test('濩 원4키와 별도trace를 묶되 pair-only를 전체17획 승인으로 표시하지 않는다',()=>{
 assert.ok(context);assert.equal(context,reviewedU6fe9Ue0102FootContext(outlines));assert.equal(policy.id,'u6fe9-ue0102-3-2')
 assert.equal(S.newFull5Assembly,false);assert.equal(S.whole17OutlinesValidatedHere,false);assert.equal(S.whole17RuntimeBindingPending,true);assert.equal(S.nativeApproval,false);assert.equal(S.runtimeApplied,false)
 for(const[p,expected]of[[S.sourceFile,S.sourceSHA256],[S.separateTraceFile,S.separateTraceSHA256],[S.proofFile,S.proofSHA256]])assert.equal(createHash('sha256').update(readFileSync(new URL('../'+p,import.meta.url))).digest('hex'),expected)
 const wrong=clone(outlines);wrong[2][1].weight+=1;assert.equal(reviewedU6fe9Ue0102FootContext(wrong),null)
 const id=clone(f.identity);id.sourceRoot='other';assert.equal(makeReviewedU6fe9Ue0102FootSourceContext(body4,trace,id,outlines),null)
 const tr=clone(trace);tr[2][0].args[0]+=1;assert.equal(makeReviewedU6fe9Ue0102FootSourceContext(body4,tr,f.identity,outlines),null)
 const fabricated={...body4,trace};assert.equal(makeReviewedU6fe9Ue0102FootSourceContext(fabricated,trace,f.identity,outlines),null)
})
test('이전 원본 Q7 완료 DOM만 통과하고 경로·원폭·중복 페인트 변조는 거절한다',()=>{
 const x=setup(),g=x.target as any;assert.equal(verifyReviewedU6fe9Ue0102FootPrior(policy,g,1),true);assert.equal(verifyReviewedU6fe9Ue0102FootPrior(policy,g,.99),false)
 for(const[n,k,v]of[[x.prior,'data-stroke-reveal-progress','.99'],[x.q,'stroke-width','13'],[x.q,'stroke-linejoin','round'],[x.q,'d','wrong'],[x.ink,'d','wrong'],[x.pen,'transform','translate(1 0)']] as const){const old=n.getAttribute(k);n.setAttribute(k,v);assert.equal(verifyReviewedU6fe9Ue0102FootPrior(policy,g,1),false);old===null?n.removeAttribute(k):n.setAttribute(k,old)}
 x.prior.add(new x.E('path',{d:f.strokes[2][0].outline,visibility:'hidden'}));assert.equal(verifyReviewedU6fe9Ue0102FootPrior(policy,g,1),false)
})
test('DOM 측정 스텁에서 발끝·몸통·완료 경계와 중간 선행상태 변경을 검사한다',()=>{
 const x=setup();for(const p of[0,1e-6,S.phaseShare,S.phaseShare+1e-10,.99999999,1]){x.target.setAttribute('data-stroke-reveal-progress',String(p));const frame=measureReviewedU6fe9Ue0102FootFrame(policy,p,x.measurement as any);assert.equal(frame.progress,p);assert.ok(frame.threshold>=22&&frame.threshold<=34.55);if(p===1){assert.equal(frame.phase,'full');assert.equal(frame.threshold,34.55)}if(p===0)assert.equal(frame.footPathD,'')}
 x.target.setAttribute('data-stroke-reveal-progress','.8');x.measurement.getPointAtLength=()=>{x.prior.setAttribute('data-stroke-reveal-progress','.5');return{x:25,y:50}};assert.throws(()=>measureReviewedU6fe9Ue0102FootFrame(policy,.8,x.measurement as any))
})
