import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createSourceFile,isFunctionDeclaration,transpileModule,ScriptTarget,ScriptKind,ModuleKind,JsxEmit} from 'typescript'
import {runInNewContext} from 'node:vm'
import {reviewedU7228Context,reviewedU7228Policy,commitReviewedU7228Caps,verifyReviewedU7228CapsPrior} from './hanja-stroke-start-caps-u7228.ts'
import {reviewedU7228CardinalContext,reviewedU7228CardinalPolicy,sampleReviewedU7228CardinalFrame,verifyReviewedU7228CardinalPrior} from './hanja-stroke-cardinal-contact-u7228.ts'
const read=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),f=JSON.parse(read('docs/hanja-source-original-u7228-vs0-2026-10-25/fixtures.json').toString()).u7228_ue0100
function el(doc:any,owner:any,name:string,a:Record<string,string>={}){const x:any={localName:name,namespaceURI:'http://www.w3.org/2000/svg',ownerDocument:doc,ownerSVGElement:owner,isConnected:true,parentElement:null,children:[],attrs:new Map(Object.entries(a)),css:{}};doc.nodes.push(x);x.getAttribute=(k:string)=>x.attrs.get(k)??null;x.setAttribute=(k:string,v:any)=>x.attrs.set(k,String(v));x.removeAttribute=(k:string)=>x.attrs.delete(k);x.contains=(n:any):boolean=>x===n||x.children.some((c:any)=>c.contains(n));Object.defineProperties(x,{parentNode:{get:()=>x.parentElement},id:{get:()=>x.getAttribute('id')??''},previousElementSibling:{get:()=>{const i=x.parentElement?.children.indexOf(x);return i>0?x.parentElement.children[i-1]:null}},nextElementSibling:{get:()=>{const i=x.parentElement?.children.indexOf(x);return i>=0?x.parentElement.children[i+1]??null:null}}});return x}
function put(p:any,...nodes:any[]){for(const n of nodes){n.parentElement=p;p.children.push(n)}}
function world(){const doc:any={nodes:[]},view:any={document:doc};doc.defaultView=view;doc.getElementById=(id:string)=>doc.nodes.find((n:any)=>n.id===id)??null;view.getComputedStyle=(n:any)=>{const a=(k:string)=>n.getAttribute(k);const s:any={transform:'none',filter:'none',clipPath:'none',visibility:a('visibility')??'visible',display:'inline',opacity:'1',fillOpacity:'1',strokeOpacity:'1',fill:a('fill')==='none'?'none':a('fill')==='white'?'rgb(255, 255, 255)':'rgb(0, 0, 0)',stroke:a('stroke')==='white'?'rgb(255, 255, 255)':a('stroke')??'none',fillRule:a('fill-rule')??'nonzero',strokeWidth:(a('stroke-width')??'0')+'px',strokeLinecap:a('stroke-linecap')??'butt',strokeLinejoin:a('stroke-linejoin')??'miter',strokeDasharray:a('stroke-dasharray')==='1 2'?'1px, 2px':a('stroke-dasharray')??'none',strokeDashoffset:(a('stroke-dashoffset')??'0')+'px',...n.css};s.getPropertyValue=(k:string)=>k==='mask-image'?(n.css.maskImage??(a('mask')?'url("http://local/#'+a('mask').slice(5,-1)+'")':'none')):k==='clip-path'?s.clipPath:['translate','rotate','scale'].includes(k)?'none':s[k]??'';return s};const svg=el(doc,null,'svg');return{doc,view,svg}}
function directPrior(pen:number,policy:any,prior:any){const w=world(),parent=el(w.doc,w.svg,'g',{'data-outline-stroke':String(pen)}),v=el(w.doc,w.svg,'path',{d:prior.outline}),g=el(w.doc,w.svg,'g',{'data-stroke-start-gate':policy.id,'data-stroke-reveal-policy':policy.kind});put(w.svg,parent);put(parent,v,g);return{...w,parent,v,g}}

function actualComponent(name:string,w:any,api:any){
 const raw=read('components/hanja/stroke-outlines.tsx').toString(),sf=createSourceFile('renderer.tsx',raw,ScriptTarget.Latest,true,ScriptKind.TSX),n=sf.statements.find(n=>isFunctionDeclaration(n)&&n.name?.text===name);assert(n)
 const effects:Array<()=>unknown>=[],jsx=(tag:string,props:any)=>{const attrs:Record<string,string>={};for(const[k,v]of Object.entries(props??{})){if(['children','ref','key'].includes(k)||v===undefined||v===null||v===false)continue;const names:Record<string,string>={fillRule:'fill-rule',strokeWidth:'stroke-width',strokeLinecap:'stroke-linecap',strokeLinejoin:'stroke-linejoin',strokeDasharray:'stroke-dasharray',strokeDashoffset:'stroke-dashoffset',clipPath:'clip-path'};attrs[names[k]??k]=String(v)}const node=el(w.doc,w.svg,tag,attrs);const append=(v:any)=>{if(Array.isArray(v))v.forEach(append);else if(v&&typeof v==='object'&&v.localName)put(node,v)};append(props?.children);if(props?.ref)props.ref.current=node;return node}
 const out=transpileModule('export '+n.getText(sf),{compilerOptions:{target:ScriptTarget.ES2022,module:ModuleKind.CommonJS,jsx:JsxEmit.ReactJSX},reportDiagnostics:true});assert.equal(out.diagnostics?.length??0,0)
 const module={exports:{}as any},sandbox={module,exports:module.exports,require:(id:string)=>{assert.equal(id,'react/jsx-runtime');return{jsx,jsxs:jsx}},useRef:()=>({current:null}),useLayoutEffect:(fn:()=>unknown)=>effects.push(fn),...api};runInNewContext(out.outputText,sandbox)
 return{render:(props:any)=>{const actual=module.exports[name](props);w.parent.children.pop();put(w.parent,actual);effects.forEach(fn=>fn());return actual},rerun:()=>effects.forEach(fn=>fn())}
}
test('爨 actual completed caps use full original ink and strict compound prior',()=>{
 for(const [pen,mask]of[[1,1],[2,1],[11,2],[15,2],[30,1]]){
  const policy=reviewedU7228Policy(reviewedU7228Context(f.strokes),pen-1,mask-1)!;assert(policy);const w=directPrior(pen,policy,policy.previousSegment??policy.segment)
  if(mask>1)assert.equal(commitReviewedU7228Caps(policy,policy.segment,1,'full-cap',{measurement:null,guide:null,startCap:null,endCap:null,ink:null},1).status,'hidden')
  const c=actualComponent('U7228CapsOutline',w,{commitReviewedU7228Caps,verifyReviewedU7228CapsPrior}),actual=c.render({policy,segment:policy.segment,progress:1,previousMaskProgress:mask>1?1:0,clipId:'full-cap'})
  const ink=actual.children.find((n:any)=>n.localName==='path');assert(ink);assert.equal(ink.getAttribute('d'),policy.segment.outline);assert.equal(ink.getAttribute('visibility'),'visible');assert.equal(ink.getAttribute('data-u7228-full-committed'),'true')
  if(mask>1){w.v.setAttribute('d',policy.previousSegment!.outline+' ');c.rerun();assert.equal(ink.getAttribute('visibility'),'hidden')}
 }
})
test('爨 actual source-guide bands preserve partial/full original P and reject stale actual H',()=>{
 for(const pen of[6,9])for(const progress of[.01,1]){
  const policy=reviewedU7228CardinalPolicy(reviewedU7228CardinalContext(f.strokes),pen-1,1)!;assert(policy);const w=directPrior(pen,policy,policy.predecessor),c=actualComponent('U7228CardinalOutline',w,{sampleReviewedU7228CardinalFrame,verifyReviewedU7228CardinalPrior}),actual=c.render({policy,segment:policy.segment,progress,previousMaskProgress:1,clipId:'source-band'}),ink=actual.children.find((n:any)=>n.localName==='path')
  assert(ink);assert.equal(ink.getAttribute('visibility'),'visible');assert.equal(ink.getAttribute('d'),policy.segment.outline);assert.equal(ink.getAttribute('data-u7228-cardinal-committed'),'true');assert.equal(ink.getAttribute('clip-path'),progress===1?null:'url(#source-band-u7228-cardinal-clip)')
  w.v.setAttribute('d',policy.predecessor.outline+' ');c.rerun();assert.equal(ink.getAttribute('visibility'),'hidden')
 }
})
