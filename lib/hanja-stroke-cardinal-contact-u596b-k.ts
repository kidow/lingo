import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU596bKContext,makeReviewedU596bKSourceContext} from './hanja-stroke-start-caps-u596b-k.ts'
function freeze<T>(v:T):T{if(v&&typeof v==='object'){for(const d of Object.values(Object.getOwnPropertyDescriptors(v)))if('value'in d)freeze(d.value);Object.freeze(v)}return v}
const TARGETS=freeze([{"id":"u596b-k-cardinal-contact-11-2","kind":"cardinal-contact-prefix-u596b-k","pen":11,"mask":2,"segment":{"outline":"M59 72.45 L59 89.35 L53 92.35 L53 72.45 Z M53 71.45 L56 68.95 L61.5 73.45 L59 75.45 L53 72.45 Z","bounds":[53,68.95,61.5,92.35],"direction":"down","weight":18.37875},"predecessor":{"outline":"M40.7 71.45 L56 71.45 L56 73.45 L40.7 73.45 Z","bounds":[40.7,71.45,56,73.45],"direction":"right","weight":15.3075},"axis":"y","originY":72.475,"origin":72.475,"negativeExtent":3.525,"positiveExtent":19.875}] as const)
const CONTEXT=Object.freeze({id:'u596b-k-original-down-cardinal-contact' as const})
export type ReviewedU596bKCardinalContext=typeof CONTEXT
export type ReviewedU596bKCardinalPolicy=typeof TARGETS[number]
function exact(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&exact(x.value,y.value)})}
export function reviewedU596bKCardinalContext(strokes:HanjaOutlineStrokes):ReviewedU596bKCardinalContext|null{return reviewedU596bKContext(strokes)?CONTEXT:null}
export function makeReviewedU596bKCardinalSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU596bKCardinalContext|null{return makeReviewedU596bKSourceContext(proof,identity,strokes)?CONTEXT:null}
export function reviewedU596bKCardinalPolicy(context:ReviewedU596bKCardinalContext|null,pen:number,mask:number):ReviewedU596bKCardinalPolicy|null{return context===CONTEXT?TARGETS.find(t=>t.pen===pen+1&&t.mask===mask+1)??null:null}
export type ReviewedU596bKCardinalFrame=Readonly<{policyId:string;progress:number;previousMaskProgress:number;phase:'empty'|'contact-prefix'|'full';visible:boolean;originalPDirect:boolean;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;requiresCompletedOriginalPredecessor:true;UARead:false}>
export function sampleReviewedU596bKCardinalFrame(policy:ReviewedU596bKCardinalPolicy,segment:HanjaOutlineSegment,progress:number,previousMaskProgress:number):ReviewedU596bKCardinalFrame{
 if(!TARGETS.includes(policy)||!exact(segment,policy.segment))throw Error('Private exact original 奫 V/cardinal fields required')
 if(!Number.isFinite(progress)||progress<0||progress>1||!Number.isFinite(previousMaskProgress)||previousMaskProgress<0||previousMaskProgress>1)throw Error('Finite original progress required')
 if(progress>0&&previousMaskProgress!==1)throw Error('Same-frame completed opaque original 奫 predecessor required')
 if(progress===0||progress===1)return Object.freeze({policyId:policy.id,progress,previousMaskProgress,phase:progress===0?'empty':'full',visible:progress===1,originalPDirect:progress===1,clip:null,requiresCompletedOriginalPredecessor:true,UARead:false})
 const b=policy.segment.bounds,clip={x:b[0],y:policy.origin-policy.negativeExtent*progress,width:b[2]-b[0],height:(policy.negativeExtent+policy.positiveExtent)*progress}
 return Object.freeze({policyId:policy.id,progress,previousMaskProgress,phase:'contact-prefix',visible:true,originalPDirect:false,clip:Object.freeze(clip),requiresCompletedOriginalPredecessor:true,UARead:false})
}
/** Required before and after visibility commit; previous progress alone is never DOM proof. */
export function verifyReviewedU596bKCardinalPrior(policy:ReviewedU596bKCardinalPolicy,g:SVGGElement,previousMaskProgress:number):boolean{
 if(!TARGETS.includes(policy)||previousMaskProgress!==1||!g.isConnected)return false
 const previous=g.previousElementSibling,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc?.defaultView
 if(!previous||!owner||!view||view.document!==doc||previous.parentNode!==g.parentNode||previous.nextElementSibling!==g||previous.ownerDocument!==doc||(previous as SVGElement).ownerSVGElement!==owner)return false
 if(g.getAttribute('data-stroke-start-gate')!==policy.id||g.parentElement?.getAttribute('data-outline-stroke')!=='11'||g.parentElement.children.length!==2||g.parentElement.children[1]!==g)return false
 if(previous.localName!=='path'&&(previous.localName!=='g'||[...previous.children].some(n=>n.localName!=='path'&&n.localName!=='defs')))return false
 const painted=previous.localName==='path'?[previous]:[...previous.children].filter(n=>n.localName==='path')
 if(painted.length!==1)return false
 const p=painted[0]
 if(!p||p.ownerDocument!==doc||(p as SVGElement).ownerSVGElement!==owner||!p.isConnected||p.getAttribute('d')!==policy.predecessor.outline||['mask','clip-path','pathLength','stroke-dasharray','stroke-dashoffset'].some(k=>p.getAttribute(k)!==null))return false
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
 for(const n of[previous,p]){const s=view.getComputedStyle(n);if(s.fillOpacity!=='1'||s.fillRule!=='nonzero'||s.stroke!=='none'||s.fill==='none'||s.fill==='transparent'||s.fill==='rgba(0, 0, 0, 0)')return false}
 return true
}
export const REVIEWED_U596BK_CARDINAL_SOURCE=freeze({"root":"u596b-k","target":[11,2],"fixture":"docs/hanja-source-original-u596b-k-2026-10-25/fixtures.json","fixtureSHA256":"ed840bac44f96f027a0930a80293b5a85609ae64da2af567a7f4d1549d5e2774","geometrySHA256":"6a08406f730368bfc3b075f99fd3d19f26058cb2f9a754a84f3a8e3e9d5bb494","sourceProofFormat":"actual-full5","sourceContextModule":"lib/hanja-stroke-start-caps-u596b-k.ts","sourceContextSHA256":"acf77ebfada70da12f18554efc8de7a736ece0f9ca5cb23f049ba03c93bd64be","sourceFieldsChanged":false,"originalOuterClockChanged":false,"newDisplayBandExplicit":true,"requiresCompletedOriginalPriorH":true,"requiresActualSameFrameDOMGateBeforeAfter":true,"noSourceGuideInvented":true,"proofFile":"docs/hanja-source-original-u596b-k-2026-10-25/correction-source-facts.json","proofSHA256":"6d9bf5ba07c443f8e857b7fecf919821061d197a8595c671a0e20fddc62161a7","nativeApproval":false,"runtimeApplied":false})
