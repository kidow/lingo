import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU5dd1Context,makeReviewedU5dd1SourceContext} from './hanja-stroke-start-caps-u5dd1.ts'
function freeze<T>(v:T):T{if(v&&typeof v==='object'){for(const d of Object.values(Object.getOwnPropertyDescriptors(v)))if('value'in d)freeze(d.value);Object.freeze(v)}return v}
const TARGETS=freeze([{"id":"u5dd1-cardinal-contact-17-2","kind":"cardinal-contact-prefix-u5dd1","pen":17,"mask":2,"segment":{"outline":"M84.25 48.25 L84.25 77.6 L78.25 80.6 L78.25 48.25 Z M78.25 47.25 L81.25 44.75 L86.75 49.25 L84.25 51.25 L78.25 48.25 Z","bounds":[78.25,44.75,86.75,80.6],"direction":"down","weight":28.38},"predecessor":{"outline":"M48.75 47.25 L81.25 47.25 L81.25 49.25 L48.75 49.25 Z","bounds":[48.75,47.25,81.25,49.25],"direction":"right","weight":32.5},"axis":"y","originY":48.26,"origin":48.26,"negativeExtent":3.51,"positiveExtent":32.34}] as const)
const CONTEXT=Object.freeze({id:'u5dd1-original-down-cardinal-contact' as const})
export type ReviewedU5dd1CardinalContext=typeof CONTEXT
export type ReviewedU5dd1CardinalPolicy=typeof TARGETS[number]
function exact(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&exact(x.value,y.value)})}
export function reviewedU5dd1CardinalContext(strokes:HanjaOutlineStrokes):ReviewedU5dd1CardinalContext|null{return reviewedU5dd1Context(strokes)?CONTEXT:null}
export function makeReviewedU5dd1CardinalSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU5dd1CardinalContext|null{return makeReviewedU5dd1SourceContext(proof,identity,strokes)?CONTEXT:null}
export function reviewedU5dd1CardinalPolicy(context:ReviewedU5dd1CardinalContext|null,pen:number,mask:number):ReviewedU5dd1CardinalPolicy|null{return context===CONTEXT?TARGETS.find(t=>t.pen===pen+1&&t.mask===mask+1)??null:null}
export type ReviewedU5dd1CardinalFrame=Readonly<{policyId:string;progress:number;previousMaskProgress:number;phase:'empty'|'contact-prefix'|'full';visible:boolean;originalPDirect:boolean;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;requiresCompletedOriginalPredecessor:true;UARead:false}>
export function sampleReviewedU5dd1CardinalFrame(policy:ReviewedU5dd1CardinalPolicy,segment:HanjaOutlineSegment,progress:number,previousMaskProgress:number):ReviewedU5dd1CardinalFrame{
 if(!TARGETS.includes(policy)||!exact(segment,policy.segment))throw Error('Private exact original 巑 V/cardinal fields required')
 if(!Number.isFinite(progress)||progress<0||progress>1||!Number.isFinite(previousMaskProgress)||previousMaskProgress<0||previousMaskProgress>1)throw Error('Finite original progress required')
 if(progress>0&&previousMaskProgress!==1)throw Error('Same-frame completed opaque original 巑 predecessor required')
 if(progress===0||progress===1)return Object.freeze({policyId:policy.id,progress,previousMaskProgress,phase:progress===0?'empty':'full',visible:progress===1,originalPDirect:progress===1,clip:null,requiresCompletedOriginalPredecessor:true,UARead:false})
 const b=policy.segment.bounds,clip={x:b[0],y:policy.origin-policy.negativeExtent*progress,width:b[2]-b[0],height:(policy.negativeExtent+policy.positiveExtent)*progress}
 return Object.freeze({policyId:policy.id,progress,previousMaskProgress,phase:'contact-prefix',visible:true,originalPDirect:false,clip:Object.freeze(clip),requiresCompletedOriginalPredecessor:true,UARead:false})
}
/** Required before and after visibility commit; previous progress alone is never DOM proof. */
export function verifyReviewedU5dd1CardinalPrior(policy:ReviewedU5dd1CardinalPolicy,g:SVGGElement,previousMaskProgress:number):boolean{
 if(!TARGETS.includes(policy)||previousMaskProgress!==1||!g.isConnected)return false
 const previous=g.previousElementSibling,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc?.defaultView
 if(!previous||!owner||!view||view.document!==doc||previous.parentNode!==g.parentNode||previous.nextElementSibling!==g||previous.ownerDocument!==doc||(previous as SVGElement).ownerSVGElement!==owner)return false
 if(g.getAttribute('data-stroke-start-gate')!==policy.id||g.parentElement?.getAttribute('data-outline-stroke')!=='17'||g.parentElement.children.length!==2||g.parentElement.children[1]!==g)return false
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
export const REVIEWED_U5DD1_CARDINAL_SOURCE=freeze({"root":"u5dd1","target":[17,2],"fixture":"docs/hanja-source-original-u5dd1-2026-10-25/fixtures.json","fixtureSHA256":"92cbc5fa6f48cc959a6e29a4274301f546666033fe7be034841c5fbdd00212ef","geometrySHA256":"577820a1d7bbe9d5d0a054ae06d5be4d433ccf9702dfca9f91a4c9e4a590820b","sourceProofFormat":"actual-body3","sourceContextModule":"lib/hanja-stroke-start-caps-u5dd1.ts","sourceContextSHA256":"e608dc33edae566c061942376248cfbbb65919d31b898afd2a2cd9e75b77b277","sourceFieldsChanged":false,"originalOuterClockChanged":false,"newDisplayBandExplicit":true,"requiresCompletedOriginalPriorH":true,"requiresActualSameFrameDOMGateBeforeAfter":true,"noSourceGuideInvented":true,"proofFile":"docs/hanja-source-original-u5dd1-2026-10-25/cardinal-contact-17-proof.json","proofSHA256":"87b888ef65187581d9a636df7c545d8824367c9cefd2241d9c41b44901ad6ff8","nativeApproval":false,"runtimeApplied":false})
