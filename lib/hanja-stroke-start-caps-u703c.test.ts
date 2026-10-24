import assert from 'node:assert/strict'
import test from 'node:test'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{makeReviewedU703cSourceContext,reviewedU703cContext,reviewedU703cPolicy,measureReviewedU703cFrame,verifyReviewedU703cPriorComplete,REVIEWED_U703c_SOURCE as S,REVIEWED_U703c_INPUT_SHA256}from'./hanja-stroke-start-caps-u703c.ts'
const f=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u703c-2026-10-25/fixtures.json',import.meta.url),'utf8')).u703c
const clone=<T>(x:T):T=>JSON.parse(JSON.stringify(x))
const context=makeReviewedU703cSourceContext(f.fullProof,f.identity,f.strokes)!
const ids=new Set(['1-1','2-1','3-1','17-2','19-1','20-1'])
test('瀼 원3키와 전체20획을 고정하고 승인된 여섯 대상만 선택한다',()=>{
 assert.ok(context);assert.equal(context,reviewedU703cContext(f.strokes));assert.deepEqual(Object.keys(f.fullProof).sort(),['defaults','groups','trace'])
 assert.equal(makeReviewedU703cSourceContext(Object.fromEntries(Object.entries(f.fullProof).reverse()),f.identity,f.strokes),context)
 for(const[p,h]of Object.entries(REVIEWED_U703c_INPUT_SHA256))assert.equal(createHash('sha256').update(readFileSync(new URL('../'+p,import.meta.url))).digest('hex'),h)
 let count=0;for(let p=0;p<20;p++)for(let m=0;m<f.strokes[p].length;m++){const q=reviewedU703cPolicy(context,p,m);assert.equal(!!q,ids.has((p+1)+'-'+(m+1)));if(q){count++;assert.deepEqual(q.segment,f.strokes[p][m]);assert.equal(q.certificate.T,'1/2');assert.equal(q.certificate.K,p===2?'1/10':'1/20');assert.equal(q.requiresPreviousMaskComplete,p===16&&m===1)}}
 assert.equal(count,6);assert.equal(S.newHeaderOrFull5,false);assert.equal(S.nativeApproval,false);assert.equal(S.runtimeApplied,false)
})
test('瀼 잘못된 헤더·원Q·폭·weight·identity와 getter는 거절한다',()=>{
 assert.equal(makeReviewedU703cSourceContext({...f.fullProof,engineRevision:'forged'},f.identity,f.strokes),null)
 const id=clone(f.identity);id.sourceRoot='wrong';assert.equal(makeReviewedU703cSourceContext(f.fullProof,id,f.strokes),null)
 for(const field of['outline','revealPath','revealWidth','weight']){const s=clone(f.strokes);s[16][1][field]=typeof s[16][1][field]==='number'?s[16][1][field]+1:s[16][1][field]+' ';assert.equal(reviewedU703cContext(s),null)}
 const p=clone(f.fullProof);Object.defineProperty(p,'groups',{enumerable:true,get(){throw Error('getter 실행금지')}});assert.equal(makeReviewedU703cSourceContext(p,f.identity,f.strokes),null)
})
function dom(){
 const doc:any={};let owner:any
 class E{namespaceURI='http://www.w3.org/2000/svg';isConnected=true;ownerDocument=doc;parentElement:any=null;children:any[]=[];a:Record<string,string>;css:Record<string,string>={};localName:string
 constructor(n:string,a:Record<string,string>={}){this.localName=n;this.a={...a}}get ownerSVGElement(){return this===owner?null:owner}get previousElementSibling(){const i=this.parentElement?.children.indexOf(this);return i>0?this.parentElement.children[i-1]:null}get nextElementSibling(){const i=this.parentElement?.children.indexOf(this);return this.parentElement?.children[i+1]??null}add(n:any){n.parentElement=this;this.children.push(n);return n}getAttribute(k:string){return this.a[k]??null}setAttribute(k:string,v:string){this.a[k]=v}removeAttribute(k:string){delete this.a[k]}getTotalLength(){return 100}getPointAtLength(d:number){const t=d/100;return{x:(1-t)**2*58.462+2*t*(1-t)*49.948+t*t*30.082,y:(1-t)**2*65.8402+2*t*(1-t)*77.0692+t*t*83.8066}}
 }
 const q=reviewedU703cPolicy(context,16,1)!;owner=new E('svg');const pen=owner.add(new E('g',{'data-outline-stroke':'17'})),prior=pen.add(new E('path',{d:f.strokes[16][0].outline})),target=pen.add(new E('g',{'data-stroke-start-gate':q.id,'data-u703c-progress':'.01'})),defs=target.add(new E('defs')),measurement=defs.add(new E('path',{d:q.segment.revealPath!,'data-u703c-measurement':'true'}))
 doc.defaultView={document:doc,getComputedStyle(n:E){return{transform:n.getAttribute('transform')??'none',filter:'none',clipPath:'none',visibility:n.css.visibility??'visible',display:'inline',opacity:'1',fillOpacity:'1',fillRule:'nonzero',fill:'rgb(0,0,0)',stroke:'none',getPropertyValue(){return'none'}}}}
 return{E,q,owner,pen,prior,target,measurement}
}
test('17m2만 실제 선행 원H 완료·동일SVG를 요구하고 중간 변경을 거절한다',()=>{
 const x=dom();assert.equal(verifyReviewedU703cPriorComplete(x.q,x.target as any,1),true);assert.equal(verifyReviewedU703cPriorComplete(x.q,x.target as any,.99),false)
 for(const[k,v]of[['d','wrong'],['clip-path','url(#wrong)'],['mask','url(#wrong)'],['transform','translate(1 0)']]){const old=x.prior.getAttribute(k);x.prior.setAttribute(k,v);assert.equal(verifyReviewedU703cPriorComplete(x.q,x.target as any,1),false);old===null?x.prior.removeAttribute(k):x.prior.setAttribute(k,old)}
 x.prior.css.visibility='hidden';assert.equal(verifyReviewedU703cPriorComplete(x.q,x.target as any,1),false);delete x.prior.css.visibility
 x.target.setAttribute('data-u703c-progress','0.01');const frame=measureReviewedU703cFrame(x.q,x.q.segment,.01,x.measurement as any);assert.equal(frame.progress,.01)
 x.measurement.getPointAtLength=()=>{x.prior.setAttribute('d','changed-during-read');return{x:45,y:68}};assert.throws(()=>measureReviewedU703cFrame(x.q,x.q.segment,.01,x.measurement as any))
 x.prior.setAttribute('d',f.strokes[16][0].outline);x.pen.add(new x.E('path',{d:f.strokes[16][0].outline,visibility:'hidden'}));assert.equal(verifyReviewedU703cPriorComplete(x.q,x.target as any,1),false)
})
