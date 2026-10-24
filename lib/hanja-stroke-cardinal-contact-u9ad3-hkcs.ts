import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU9ad3HkcsContext,makeReviewedU9ad3HkcsSourceContext} from './hanja-stroke-start-caps-u9ad3-hkcs.ts'
function freeze<T>(v:T):T{if(v&&typeof v==='object'){for(const d of Object.values(Object.getOwnPropertyDescriptors(v)))if('value'in d)freeze(d.value);Object.freeze(v)}return v}
const TARGETS=freeze([{"id":"u9ad3-hkcs-2-2","kind":"cardinal-contact-prefix-u9ad3-hkcs","pen":2,"mask":2,"segment":{"outline":"M36.55 12 L36.55 39 L31.05 39 L31.05 12 Z M31.05 11 L33.8 8.5 L39.05 13 L36.55 14.75 L31.05 12 Z","bounds":[31.05,8.5,39.05,39],"direction":"down","weight":26},"predecessor":{"outline":"M15.7 11 L33.8 11 L33.8 13 L15.7 13 Z","bounds":[15.7,11,33.8,13],"direction":"right","weight":18.09},"axis":"y","originY":12,"origin":12,"negativeExtent":3.5,"positiveExtent":27},{"id":"u9ad3-hkcs-8-2","kind":"cardinal-contact-prefix-u9ad3-hkcs","pen":8,"mask":2,"segment":{"outline":"M36.8 50 L36.8 86 L30.8 86 L30.8 50 Z M30.8 49 L33.8 46.5 L39.3 51 L36.8 53 L30.8 50 Z M30.8 86 L36.8 86 L35.6 87.8 L33.8 89 L32 87.8 Z","bounds":[30.8,46.5,39.3,89],"direction":"down","weight":36},"predecessor":{"outline":"M15.7 49 L33.8 49 L33.8 51 L15.7 51 Z","bounds":[15.7,49,33.8,51],"direction":"right","weight":18.09},"axis":"y","originY":50,"origin":50,"negativeExtent":3.5,"positiveExtent":39},{"id":"u9ad3-hkcs-17-2","kind":"cardinal-contact-prefix-u9ad3-hkcs","pen":17,"mask":2,"segment":{"outline":"M88.6 47 L88.6 74 L82.6 74 L82.6 47 Z M82.6 46 L85.6 43.5 L91.1 48 L88.6 50 L82.6 47 Z M82.6 74 L88.6 74 L87.35 75.8 L85.6 77 L83.8 75.8 Z","bounds":[82.6,43.5,91.1,77],"direction":"down","weight":27},"predecessor":{"outline":"M62.35 46 L85.6 46 L85.6 48 L62.35 48 Z","bounds":[62.35,46,85.6,48],"direction":"right","weight":23.22},"axis":"y","originY":47,"origin":47,"negativeExtent":3.5,"positiveExtent":30},{"id":"u9ad3-hkcs-22-2","kind":"cardinal-contact-prefix-u9ad3-hkcs","pen":22,"mask":2,"segment":{"outline":"M52.45 54 L52.45 77.5 L46.45 80.5 L46.45 54 Z M46.45 53 L49.45 50.5 L54.95 55 L52.45 57 L46.45 54 Z","bounds":[46.45,50.5,54.95,80.5],"direction":"down","weight":25},"predecessor":{"outline":"M39.15 53 L50.1 53 L50.1 55 L39.15 55 Z","bounds":[39.15,53,50.1,55],"direction":"right","weight":10.965},"axis":"y","originY":54,"origin":54,"negativeExtent":3.5,"positiveExtent":26.5}] as const)
const CONTEXT=Object.freeze({id:'u9ad3-hkcs-original-down-cardinal-contact' as const})
export type ReviewedU9ad3HkcsCardinalContext=typeof CONTEXT
export type ReviewedU9ad3HkcsCardinalPolicy=typeof TARGETS[number]
function exact(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&exact(x.value,y.value)})}
export function reviewedU9ad3HkcsCardinalContext(strokes:HanjaOutlineStrokes):ReviewedU9ad3HkcsCardinalContext|null{return reviewedU9ad3HkcsContext(strokes)?CONTEXT:null}
export function makeReviewedU9ad3HkcsCardinalSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU9ad3HkcsCardinalContext|null{return makeReviewedU9ad3HkcsSourceContext(proof,identity,strokes)?CONTEXT:null}
export function reviewedU9ad3HkcsCardinalPolicy(context:ReviewedU9ad3HkcsCardinalContext|null,pen:number,mask:number):ReviewedU9ad3HkcsCardinalPolicy|null{return context===CONTEXT?TARGETS.find(t=>t.pen===pen+1&&t.mask===mask+1)??null:null}
export type ReviewedU9ad3HkcsCardinalFrame=Readonly<{policyId:string;progress:number;previousMaskProgress:number;phase:'empty'|'contact-prefix'|'full';visible:boolean;originalPDirect:boolean;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;requiresCompletedOriginalPredecessor:true;UARead:false}>
export function sampleReviewedU9ad3HkcsCardinalFrame(policy:ReviewedU9ad3HkcsCardinalPolicy,segment:HanjaOutlineSegment,progress:number,previousMaskProgress:number):ReviewedU9ad3HkcsCardinalFrame{
 if(!TARGETS.includes(policy)||!exact(segment,policy.segment))throw Error('Private exact original 髓 V/cardinal fields required')
 if(!Number.isFinite(progress)||progress<0||progress>1||!Number.isFinite(previousMaskProgress)||previousMaskProgress<0||previousMaskProgress>1)throw Error('Finite original progress required')
 if(progress>0&&previousMaskProgress!==1)throw Error('Same-frame completed opaque original 髓 predecessor required')
 if(progress===0||progress===1)return Object.freeze({policyId:policy.id,progress,previousMaskProgress,phase:progress===0?'empty':'full',visible:progress===1,originalPDirect:progress===1,clip:null,requiresCompletedOriginalPredecessor:true,UARead:false})
 const b=policy.segment.bounds,clip={x:b[0],y:policy.origin-policy.negativeExtent*progress,width:b[2]-b[0],height:(policy.negativeExtent+policy.positiveExtent)*progress}
 return Object.freeze({policyId:policy.id,progress,previousMaskProgress,phase:'contact-prefix',visible:true,originalPDirect:false,clip:Object.freeze(clip),requiresCompletedOriginalPredecessor:true,UARead:false})
}
/** Required before and after visibility commit; previous progress alone is never DOM proof. */
export function verifyReviewedU9ad3HkcsCardinalPrior(policy:ReviewedU9ad3HkcsCardinalPolicy,g:SVGGElement,previousMaskProgress:number):boolean{
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
export const REVIEWED_U9AD3_HKCS_CARDINAL_SOURCE=freeze({"fixture":"docs/hanja-source-original-u9ad3-hkcs-2026-10-24/fixtures.json","fixtureSHA256":"7fdbb4c5403f12809c8f08161235f6a9e54b3c0ad3226ebb2667f3f79ee0773a","geometrySHA256":"e5abfd7fc4b7db418b2911a477bf0b800b6b0be6f45b2f21e422d7a0d7068899","sourceContextModule":"lib/hanja-stroke-start-caps-u9ad3-hkcs.ts","sourceContextSHA256":"6883d6f77152e3d22529b80d300424ae52ad25bd9819220a29d66adf2e2a3584","targets":[[2,2],[8,2],[17,2],[22,2]],"sourceFieldsChanged":false,"originalOuterClockChanged":false,"newDisplayBandExplicit":true,"requiresCompletedOriginalPriorH":true,"requiresActualSameFrameDOMGate":true,"noSourceGuideInvented":true,"proofFile":"docs/hanja-source-original-u9ad3-hkcs-2026-10-24/cardinal-contact-proof.json","nativeApproval":false,"runtimeApplied":false})
