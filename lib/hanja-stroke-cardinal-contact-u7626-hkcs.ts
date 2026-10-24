import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU7626HkcsContext,makeReviewedU7626HkcsSourceContext} from './hanja-stroke-start-caps-u7626-hkcs.ts'
function freeze<T>(v:T):T{if(v&&typeof v==='object'){for(const d of Object.values(Object.getOwnPropertyDescriptors(v)))if('value'in d)freeze(d.value);Object.freeze(v)}return v}
const TARGETS=freeze([{"id":"u7626-hkcs-10-2","kind":"cardinal-contact-prefix-u7626-hkcs","pen":10,"mask":2,"segment":{"outline":"M84.15 33.3 L84.15 59.75 L78.15 59.75 L78.15 33.3 Z M78.15 32.3 L81.15 29.8 L86.65 34.3 L84.15 36.3 L78.15 33.3 Z","bounds":[78.15,29.8,86.65,59.75],"direction":"down","weight":25.44},"predecessor":{"outline":"M66.45 33.1 L81.15 33.1 L81.15 35.1 L66.45 35.1 Z","bounds":[66.45,33.1,81.15,35.1],"direction":"right","weight":14.7},"axis":"y","originY":33.3,"origin":33.3,"negativeExtent":3.5,"positiveExtent":26.45}] as const)
const CONTEXT=Object.freeze({id:'u7626-hkcs-original-down-cardinal-contact' as const})
export type ReviewedU7626HkcsCardinalContext=typeof CONTEXT
export type ReviewedU7626HkcsCardinalPolicy=typeof TARGETS[number]
function exact(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&exact(x.value,y.value)})}
export function reviewedU7626HkcsCardinalContext(strokes:HanjaOutlineStrokes):ReviewedU7626HkcsCardinalContext|null{return reviewedU7626HkcsContext(strokes)?CONTEXT:null}
export function makeReviewedU7626HkcsCardinalSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU7626HkcsCardinalContext|null{return makeReviewedU7626HkcsSourceContext(proof,identity,strokes)?CONTEXT:null}
export function reviewedU7626HkcsCardinalPolicy(context:ReviewedU7626HkcsCardinalContext|null,pen:number,mask:number):ReviewedU7626HkcsCardinalPolicy|null{return context===CONTEXT?TARGETS.find(t=>t.pen===pen+1&&t.mask===mask+1)??null:null}
export type ReviewedU7626HkcsCardinalFrame=Readonly<{policyId:string;progress:number;previousMaskProgress:number;phase:'empty'|'contact-prefix'|'full';visible:boolean;originalPDirect:boolean;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;requiresCompletedOriginalPredecessor:true;UARead:false}>
export function sampleReviewedU7626HkcsCardinalFrame(policy:ReviewedU7626HkcsCardinalPolicy,segment:HanjaOutlineSegment,progress:number,previousMaskProgress:number):ReviewedU7626HkcsCardinalFrame{
 if(!TARGETS.includes(policy)||!exact(segment,policy.segment))throw Error('Private exact original 瘦 V/cardinal fields required')
 if(!Number.isFinite(progress)||progress<0||progress>1||!Number.isFinite(previousMaskProgress)||previousMaskProgress<0||previousMaskProgress>1)throw Error('Finite original progress required')
 if(progress>0&&previousMaskProgress!==1)throw Error('Same-frame completed opaque original 瘦 predecessor required')
 if(progress===0||progress===1)return Object.freeze({policyId:policy.id,progress,previousMaskProgress,phase:progress===0?'empty':'full',visible:progress===1,originalPDirect:progress===1,clip:null,requiresCompletedOriginalPredecessor:true,UARead:false})
 const b=policy.segment.bounds,clip={x:b[0],y:policy.origin-policy.negativeExtent*progress,width:b[2]-b[0],height:(policy.negativeExtent+policy.positiveExtent)*progress}
 return Object.freeze({policyId:policy.id,progress,previousMaskProgress,phase:'contact-prefix',visible:true,originalPDirect:false,clip:Object.freeze(clip),requiresCompletedOriginalPredecessor:true,UARead:false})
}
/** Required before and after visibility commit; previous progress alone is never DOM proof. */
export function verifyReviewedU7626HkcsCardinalPrior(policy:ReviewedU7626HkcsCardinalPolicy,g:SVGGElement,previousMaskProgress:number):boolean{
 if(!TARGETS.includes(policy)||previousMaskProgress!==1||!g.isConnected)return false
 const previous=g.previousElementSibling,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc?.defaultView
 if(!previous||!owner||!view||view.document!==doc||previous.parentNode!==g.parentNode||previous.nextElementSibling!==g||previous.ownerDocument!==doc||(previous as SVGElement).ownerSVGElement!==owner)return false
 if(previous.localName!=='path'&&(previous.localName!=='g'||[...previous.children].some(n=>n.localName!=='path'&&n.localName!=='defs')))return false
 const painted=previous.localName==='path'?[previous]:[...previous.children].filter(n=>n.localName==='path'&&view.getComputedStyle(n).visibility==='visible'&&view.getComputedStyle(n).display!=='none')
 if(painted.length!==1)return false
 const p=painted[0]
 if(!p||p.ownerDocument!==doc||(p as SVGElement).ownerSVGElement!==owner||!p.isConnected||p.getAttribute('d')!==policy.predecessor.outline||['mask','clip-path','pathLength'].some(k=>p.getAttribute(k)!==null))return false
 if(previous.localName!=='path'&&previous.getAttribute('data-stroke-reveal-progress')!=='1')return false
 const chain=new Set<Element>()
 for(const start of[g,previous,p]){
  let n:Element|null=start
  while(n){chain.add(n);if(n===owner)break;n=n.parentElement}
  if(n!==owner)return false
 }
 for(const n of chain){
  if(!n.isConnected||n.namespaceURI!=='http://www.w3.org/2000/svg'||n.ownerDocument!==doc||(n!==owner&&(n as SVGElement).ownerSVGElement!==owner)||['transform','filter','mask','clip-path'].some(k=>n.getAttribute(k)!==null))return false
  const s=view.getComputedStyle(n)
  if(s.transform!=='none'||s.filter!=='none'||s.clipPath!=='none'||!['','none'].includes(s.getPropertyValue('mask-image'))||s.visibility!=='visible'||s.display==='none'||s.opacity!=='1'||['translate','rotate','scale'].some(k=>!['','none'].includes(s.getPropertyValue(k))))return false
 }
 for(const n of[previous,p]){const s=view.getComputedStyle(n);if(s.fillOpacity!=='1'||s.stroke!=='none'||s.fill==='none'||s.fill==='transparent'||s.fill==='rgba(0, 0, 0, 0)')return false}
 return true
}
export const REVIEWED_U7626_HKCS_CARDINAL_SOURCE=freeze({"fixture":"docs/hanja-source-original-u7626-hkcs-2026-10-24/fixtures.json","fixtureSHA256":"e4a3b4f84ff5172b88114abe41770a1048a48fb78b20e3c7a7eca30bb00e2772","geometrySHA256":"97104242baa1bf71304f87f6ac3189976bddf46b15c4ad60346e0df24883053c","sourceContextModule":"lib/hanja-stroke-start-caps-u7626-hkcs.ts","sourceContextSHA256":"e85df6e6453109f630b1b15b1ec562e999162858be40a30e461be41b19a47e92","targets":[[10,2]],"proofFile":"docs/hanja-source-original-u7626-hkcs-2026-10-24/initial-caps-cardinal-proof.json","proofSHA256":"629f92f4339a0cf7f1f29f6e6ee24fac650b3536ac2eeff36830a579124b5c6d","sourceFieldsChanged":false,"newDisplayBandExplicit":true,"originalOuterClockChanged":false,"originalGuideStartY":"33.31","originalPriorGuideEndY":"34.105","guideGapUnchanged":true,"originBasedOnOriginalFilledP":"333/10","nativeApproval":false,"runtimeApplied":false,"catalogStrokes":14,"individualPlaybackStrokes":15,"individualVariantApprovalPending":true})
