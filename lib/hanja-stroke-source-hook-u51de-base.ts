/** Original 凞 12m3, authored body→UP display clock; native approval pending. */
import {outlineSegmentProgress,type HanjaOutlineSegment,type HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {REVIEWED_U51DE_BASE_SOURCE_REVEAL_INPUT as INPUT,makeReviewedU51deBaseSourceRevealContext,reviewedU51deBaseSourceRevealPolicy,verifyReviewedU51deBaseSourceRevealPriorDOM,verifyReviewedU51deBaseSourceRevealCompletedDOM} from './hanja-stroke-source-reveal-u51de-base.ts'
const STROKES=INPUT.strokes,SEGMENT=STROKES[11][2],PRIOR=STROKES[11][1],NS='http://www.w3.org/2000/svg'
const PREFIX='data-u51de-base-source-hook-',AXIS='data-u51de-base-source-reveal-',FINGERPRINT='e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e'
const CONTEXT=Object.freeze({id:'u51de-base-original-16-source-hook' as const})
const AXIS_CONTEXT=makeReviewedU51deBaseSourceRevealContext(INPUT.fullProof,INPUT.identity,STROKES),PRIOR_POLICY=reviewedU51deBaseSourceRevealPolicy(AXIS_CONTEXT,11,1)!
export type ReviewedU51deBaseHookContext=typeof CONTEXT
export function makeReviewedU51deBaseHookContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU51deBaseHookContext|null{return arguments.length===3&&makeReviewedU51deBaseSourceRevealContext(proof,identity,strokes)?CONTEXT:null}
const POLICY=Object.freeze({id:'u51de-base-source-hook-12-3',kind:'source-body-then-up-u51de-base',pen:12,mask:3,segment:SEGMENT,predecessor:PRIOR,phaseShare:31/56,proofFingerprint:FINGERPRINT,previewOnly:true}as const)
export type ReviewedU51deBaseHookPolicy=typeof POLICY
export function reviewedU51deBaseHookPolicy(context:ReviewedU51deBaseHookContext|null,pen:number,mask:number):ReviewedU51deBaseHookPolicy|null{return context===CONTEXT&&pen===11&&mask===2?POLICY:null}
/** JSON-cloned source data may cross the renderer boundary; policy branding and DOM receipts remain identity-bound. */
function sameSource(a:unknown,b:unknown):boolean{
 if(Object.is(a,b))return true
 if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false
 const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b)
 return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&sameSource(x.value,y.value)})
}
function source(policy:ReviewedU51deBaseHookPolicy,segment:HanjaOutlineSegment){if(policy!==POLICY||!sameSource(segment,SEGMENT))throw Error('Exact reviewed original hook policy/source data required')}
export type ReviewedU51deBaseHookRect=Readonly<{x:number;y:number;width:number;height:number}>
export function sampleReviewedU51deBaseHookFrame(policy:ReviewedU51deBaseHookPolicy,segment:HanjaOutlineSegment,progress:number){
 source(policy,segment);if(!Number.isFinite(progress)||progress<0||progress>1)throw Error('Finite unit progress required')
 const q=Math.max(0,(progress-POLICY.phaseShare)/(1-POLICY.phaseShare))
 return Object.freeze({progress,phase:progress===0?'empty':progress===1?'full':progress<=POLICY.phaseShare?'body':'up',body:Object.freeze({x:75.5,y:60.5,width:18.5*Math.min(1,progress/POLICY.phaseShare),height:6}),up:Object.freeze({x:88,y:60.5-12.5*q,width:4,height:12.5*q}),originalPDirect:progress===1,outline:SEGMENT.outline})
}
export type ReviewedU51deBaseHookNodes={group:SVGGElement|null;ink:SVGPathElement|null;unionClip:SVGClipPathElement|null;body:SVGRectElement|null;up:SVGRectElement|null}
function opaqueRGB(value:string):boolean{const m=/^rgba?\(([^)]+)\)$/.exec(value.trim());if(!m)return false;const slash=m[1].split('/'),parts=slash[0].replaceAll(',',' ').trim().split(/\s+/);let alpha:string|undefined=slash[1]?.trim();if(slash.length>2)return false;if(alpha===undefined&&parts.length===4)alpha=parts.pop();return parts.length===3&&parts.every(v=>Number.isFinite(Number(v.replace('%',''))))&&(alpha===undefined||(alpha.endsWith('%')?Number(alpha.slice(0,-1))/100:Number(alpha))===1)}
function cssPath(doc:Document,value:string,d:string):boolean{if(value==='')return true;const p=doc.createElementNS(NS,'path');p.style.setProperty('d','path('+JSON.stringify(d)+')');const expected=p.style.getPropertyValue('d');return expected!==''&&value===expected}
function bound(policy:ReviewedU51deBaseHookPolicy,p:number,prior:number,logical:number,frameId:string,g:SVGGElement|null):boolean{
 if(policy!==POLICY||!g||!frameId||!Number.isFinite(logical)||logical<0||logical>1)return false
 const amounts=outlineSegmentProgress(STROKES[11],logical)
 return amounts[2]===p&&amounts[1]===prior&&g.getAttribute('data-stroke-start-gate')===policy.id&&g.getAttribute('data-stroke-reveal-policy')===policy.kind&&g.getAttribute('data-stroke-reveal-progress')===String(p)&&g.getAttribute(PREFIX+'context')===CONTEXT.id&&g.getAttribute(PREFIX+'fingerprint')===FINGERPRINT&&g.getAttribute(PREFIX+'prior-progress')===String(prior)&&g.getAttribute(PREFIX+'logical-progress')===String(logical)&&g.getAttribute(PREFIX+'frame')===frameId
}
function unmodifiedTree(nodes:Element[],owner:SVGSVGElement,doc:Document,view:Window):boolean{
 const all=new Set(nodes);for(const start of nodes){let n:Element|null=start;while(n&&n!==owner){all.add(n);const parent:ParentNode|null=n.parentNode;n=parent?.nodeType===1?parent as Element:null}if(n!==owner)return false}all.add(owner)
 for(const n of all){const s=view.getComputedStyle(n);if(!n.isConnected||n.ownerDocument!==doc||n.namespaceURI!==NS||(n!==owner&&(n as SVGElement).ownerSVGElement!==owner)||['transform','filter','mask'].some(k=>n.hasAttribute(k))||s.display==='none'||(n.localName!=='path'&&s.visibility!=='visible')||Number(s.opacity)!==1||Number(s.fillOpacity)!==1||s.transform!=='none'||s.filter!=='none'||s.mixBlendMode!=='normal'||!['','none'].includes(s.getPropertyValue('mask-image'))||['translate','rotate','scale'].some(k=>!['','none'].includes(s.getPropertyValue(k))))return false;if(n.localName!=='path'&&(n.hasAttribute('clip-path')||s.clipPath!=='none'))return false}
 return view.document===doc&&doc.defaultView===view
}
/** Confirms the actual completed mask2 ink; its predecessor verifier additionally checks mask1 lineage. */
export function verifyReviewedU51deBaseHookPriorDOM(policy:ReviewedU51deBaseHookPolicy,p:number,prior:number,logical:number,frameId:string,g:SVGGElement|null):boolean{
 try{source(policy,SEGMENT);if(prior!==1||!bound(policy,p,prior,logical,frameId,g)||!g)return false
 const slot=g.parentNode as SVGGElement,outer=slot?.parentNode as SVGGElement,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,H=slot?.children[1]as SVGGElement,ink=H?.children[1]as SVGPathElement
 if(!owner||!view||!outer||!H||!ink||slot.children.length!==3||slot.children[2]!==g||outer.children.length!==16||outer.children[11]!==slot||slot.getAttribute('data-outline-stroke')!=='12'||outer.getAttribute('data-stroke-outlines')!=='true'||owner.getAttribute('viewBox')!=='0 0 100 100'||H.children.length!==2||H.getAttribute('data-stroke-start-gate')!==PRIOR_POLICY.id||H.getAttribute('data-stroke-reveal-policy')!==PRIOR_POLICY.kind||H.getAttribute('data-stroke-reveal-progress')!=='1'||H.getAttribute(AXIS+'fingerprint')!==PRIOR_POLICY.proofFingerprint||H.getAttribute(AXIS+'logical-progress')!==String(logical)||H.getAttribute(AXIS+'frame')!==frameId)return false
 if(!verifyReviewedU51deBaseSourceRevealCompletedDOM(PRIOR_POLICY,H,logical,frameId)||!verifyReviewedU51deBaseSourceRevealPriorDOM(PRIOR_POLICY,H,1,1,logical,frameId))return false
 const s=view.getComputedStyle(ink)
 return unmodifiedTree([g,H,ink],owner,doc,view)&&ink.parentNode===H&&ink.localName==='path'&&ink.getAttribute('d')===PRIOR.outline&&ink.getAttribute('visibility')==='visible'&&['committed','direct-original','source-full','one-ink'].every(k=>ink.getAttribute(AXIS+k)==='true')&&ink.getAttribute(AXIS+'phase')==='full'&&ink.getAttribute(AXIS+'progress')==='1'&&['clip-path','mask','pathLength','stroke-dasharray','stroke-dashoffset'].every(k=>ink.getAttribute(k)===null)&&s.visibility==='visible'&&s.clipPath==='none'&&s.stroke==='none'&&s.fillRule==='nonzero'&&opaqueRGB(s.fill)&&cssPath(doc,s.getPropertyValue('d'),PRIOR.outline)
 }catch{return false}
}
export function commitReviewedU51deBaseHook(policy:ReviewedU51deBaseHookPolicy,segment:HanjaOutlineSegment,p:number,clipId:string,nodes:ReviewedU51deBaseHookNodes,prior:number,logical:number,frameId:string){
 const{group:g,ink,unionClip:clip,body,up}=nodes
 const hide=()=>{ink?.setAttribute('visibility','hidden');ink?.setAttribute(PREFIX+'committed','false')}
 hide()
 try{
  source(policy,segment);if(!g||!ink||!clip||!body||!up||!/^[A-Za-z0-9_:.-]+$/.test(clipId)||!clipId.endsWith('-11-2')||g.getAttribute(PREFIX+'clip')!==clipId||!bound(policy,p,prior,logical,frameId,g))throw Error('Exact hook frame/owner required')
  const frame=sampleReviewedU51deBaseHookFrame(policy,segment,p),defs=g.children[0],owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,slot=g.parentNode as SVGGElement,outer=slot?.parentNode as SVGGElement,key=clipId+'-u51de-base-source-hook-clip'
  if(!owner||!view||!slot||!outer)throw Error('Connected original owner required')
  for(const[r,shape]of [[body,frame.body],[up,frame.up]]as const)for(const[k,v]of Object.entries(shape))r.setAttribute(k,String(v))
  if(p===1)ink.removeAttribute('clip-path');else ink.setAttribute('clip-path','url(#'+key+')')
  for(const[k,v]of Object.entries({progress:String(p),phase:frame.phase,'direct-original':String(p===1),'source-full':String(p===1),'one-ink':'true','logical-progress':String(logical),frame:frameId}))ink.setAttribute(PREFIX+k,v)
  const expectedVisibility=p>0?'visible':'hidden'
  const exact=()=>bound(policy,p,prior,logical,frameId,g)&&g.getAttribute(PREFIX+'clip')===clipId&&g.children.length===2&&g.children[0]===defs&&g.children[1]===ink&&defs.localName==='defs'&&defs.children.length===1&&defs.children[0]===clip&&clip.children.length===2&&clip.children[0]===body&&clip.children[1]===up&&clip.localName==='clipPath'&&clip.id===key&&clip.getAttribute('clipPathUnits')==='userSpaceOnUse'&&body.id===clipId+'-u51de-base-source-hook-body'&&up.id===clipId+'-u51de-base-source-hook-up'&&body.localName==='rect'&&up.localName==='rect'&&slot.children.length===3&&slot.children[2]===g&&outer.children.length===16&&outer.children[11]===slot&&slot.getAttribute('data-outline-stroke')==='12'&&outer.getAttribute('data-stroke-outlines')==='true'&&owner.getAttribute('viewBox')==='0 0 100 100'&&ink.localName==='path'&&ink.getAttribute('d')===SEGMENT.outline&&ink.getAttribute('clip-path')===(p===1?null:'url(#'+key+')')&&['mask','pathLength','stroke-dasharray','stroke-dashoffset'].every(k=>ink.getAttribute(k)===null)
  const tree=[g,defs,clip,body,up,ink,slot,outer,owner],parents=new Map(tree.map(n=>[n,n.parentNode]))
  const canonical=(shape:ReviewedU51deBaseHookRect)=>{const probe=doc.createElementNS(NS,'rect'),host=doc.createElementNS(NS,'g');host.setAttribute('visibility','hidden');for(const[k,v]of Object.entries(shape))probe.setAttribute(k,String(v));host.appendChild(probe);owner.appendChild(host);try{const css=view.getComputedStyle(probe),b=probe.getBBox();return{css:new Map(['x','y','width','height','rx','ry'].map(k=>[k,css.getPropertyValue(k)])),box:{x:b.x,y:b.y,width:b.width,height:b.height}}}finally{host.remove()}}
  const canon=[canonical(frame.body),canonical(frame.up)]
  const safe=()=>{if(!exact()||!unmodifiedTree(tree,owner,doc,view)||tree.some(n=>n.parentNode!==parents.get(n))||(p>0&&!verifyReviewedU51deBaseHookPriorDOM(policy,p,prior,logical,frameId,g)))return false
   for(const[r,shape,c]of [[body,frame.body,canon[0]],[up,frame.up,canon[1]]]as const){const s=view.getComputedStyle(r),box=r.getBBox();if(Object.entries(shape).some(([k,v])=>r.getAttribute(k)!==String(v)||box[k as keyof typeof c.box]!==c.box[k as keyof typeof c.box])||['x','y','width','height','rx','ry'].some(k=>s.getPropertyValue(k)!==c.css.get(k))||r.hasAttribute('rx')||r.hasAttribute('ry')||s.clipPath!=='none'||s.stroke!=='none'||s.visibility!=='visible')return false}
   const s=view.getComputedStyle(ink),clipCSS=p===1?'none':'url("#'+key+'")';return s.stroke==='none'&&s.fillRule==='nonzero'&&opaqueRGB(s.fill)&&cssPath(doc,s.getPropertyValue('d'),SEGMENT.outline)&&(s.clipPath===clipCSS||s.clipPath===(p===1?'none':'url(#'+key+')'))}
  if(!safe())throw Error('Changed source hook/prior/computed geometry')
  ink.setAttribute('visibility',expectedVisibility);ink.setAttribute(PREFIX+'committed','true')
  if(!safe()||view.getComputedStyle(ink).visibility!==expectedVisibility)throw Error('Changed hook visibility during commit')
  return{status:'committed' as const,frame,cleanup:hide}
 }catch(error){hide();return{status:'hidden' as const,error:error instanceof Error?error.message:String(error),cleanup:hide}}
}
export const REVIEWED_U51DE_BASE_HOOK_INPUT=INPUT
export const REVIEWED_U51DE_BASE_HOOK_INPUT_SHA256=Object.freeze({'lib/hanja-stroke-source-reveal-u51de-base.ts':'c7c5185d1b26e4e8c578d9dcb06f142e016c53245c6d3c636ca9db925eb04633','docs/hanja-source-original-u51de-base-2026-10-27/feasibility-initial-9-16.json':FINGERPRINT})
export const REVIEWED_U51DE_BASE_HOOK_SOURCE=Object.freeze({glyph:'凞',root:'u51de',target:[12,3],authoredPhase:'31/56',publisherClockEquivalent:false,sourceGeometryChanged:false,nativeApproval:false,catalog:false,registry:false})
