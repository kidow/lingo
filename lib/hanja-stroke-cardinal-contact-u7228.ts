import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU7228Context,makeReviewedU7228SourceContext} from './hanja-stroke-start-caps-u7228.ts'
function freeze<T>(v:T):T{if(v&&typeof v==='object'){for(const d of Object.values(Object.getOwnPropertyDescriptors(v)))if('value'in d)freeze(d.value);Object.freeze(v)}return v}
const TARGETS=freeze([{"id":"u7228-cardinal-contact-6-2","kind":"cardinal-contact-prefix-u7228","pen":6,"mask":2,"segment":{"outline":"M66 10.8 L66 37.5 L61 37.5 L61 10.8 Z M61 9.8 L63.5 7.3 L68.5 11.8 L66 13.3 L61 10.8 Z","bounds":[61,7.3,68.5,37.5],"direction":"down","weight":25.7025},"predecessor":{"outline":"M36.5 9.8 L63.5 9.8 L63.5 11.8 L36.5 11.8 Z","bounds":[36.5,9.8,63.5,11.8],"direction":"right","weight":27},"axis":"y","originY":10.8125,"origin":10.8125,"negativeExtent":3.5125,"positiveExtent":26.6875},{"id":"u7228-cardinal-contact-9-2","kind":"cardinal-contact-prefix-u7228","pen":9,"mask":2,"segment":{"outline":"M57.45 22.9 L57.45 31.35 L52.95 33.6 L52.95 22.9 Z M52.95 21.9 L55.2 19.4 L59.95 23.9 L57.45 25.15 L52.95 22.9 Z","bounds":[52.95,19.4,59.95,33.6],"direction":"down","weight":7.44255},"predecessor":{"outline":"M44.75 21.9 L55.2 21.9 L55.2 23.9 L44.75 23.9 Z","bounds":[44.75,21.9,55.2,23.9],"direction":"right","weight":10.44},"axis":"y","originY":22.922475,"origin":22.922475,"negativeExtent":3.522475,"positiveExtent":10.677525}] as const)
const CONTEXT=Object.freeze({id:'u7228-original-down-cardinal-contact' as const})
export type ReviewedU7228CardinalContext=typeof CONTEXT
export type ReviewedU7228CardinalPolicy=typeof TARGETS[number]
function exact(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&exact(x.value,y.value)})}
export function reviewedU7228CardinalContext(strokes:HanjaOutlineStrokes):ReviewedU7228CardinalContext|null{return reviewedU7228Context(strokes)?CONTEXT:null}
export function makeReviewedU7228CardinalSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU7228CardinalContext|null{return makeReviewedU7228SourceContext(proof,identity,strokes)?CONTEXT:null}
export function reviewedU7228CardinalPolicy(context:ReviewedU7228CardinalContext|null,pen:number,mask:number):ReviewedU7228CardinalPolicy|null{return context===CONTEXT?TARGETS.find(t=>t.pen===pen+1&&t.mask===mask+1)??null:null}
export type ReviewedU7228CardinalFrame=Readonly<{policyId:string;progress:number;previousMaskProgress:number;phase:'empty'|'contact-prefix'|'full';visible:boolean;originalPDirect:boolean;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;requiresCompletedOriginalPredecessor:true;UARead:false}>
export function sampleReviewedU7228CardinalFrame(policy:ReviewedU7228CardinalPolicy,segment:HanjaOutlineSegment,progress:number,previousMaskProgress:number):ReviewedU7228CardinalFrame{
 if(!TARGETS.includes(policy)||!exact(segment,policy.segment))throw Error('Private exact original 爨 V/cardinal fields required')
 if(!Number.isFinite(progress)||progress<0||progress>1||!Number.isFinite(previousMaskProgress)||previousMaskProgress<0||previousMaskProgress>1)throw Error('Finite original progress required')
 if(progress>0&&previousMaskProgress!==1)throw Error('Same-frame completed opaque original 爨 predecessor required')
 if(progress===0||progress===1)return Object.freeze({policyId:policy.id,progress,previousMaskProgress,phase:progress===0?'empty':'full',visible:progress===1,originalPDirect:progress===1,clip:null,requiresCompletedOriginalPredecessor:true,UARead:false})
 const b=policy.segment.bounds,clip={x:b[0],y:policy.origin-policy.negativeExtent*progress,width:b[2]-b[0],height:(policy.negativeExtent+policy.positiveExtent)*progress}
 return Object.freeze({policyId:policy.id,progress,previousMaskProgress,phase:'contact-prefix',visible:true,originalPDirect:false,clip:Object.freeze(clip),requiresCompletedOriginalPredecessor:true,UARead:false})
}
function attrs(n:Element,k:Record<string,string|null>){return Object.entries(k).every(([a,b])=>n.getAttribute(a)===b)}
function clean(n:Element,view:Window,ink:boolean){const s=view.getComputedStyle(n);return attrs(n,{transform:null,filter:null,mask:null,'clip-path':null})&&s.transform==='none'&&s.filter==='none'&&s.clipPath==='none'&&['','none'].includes(s.getPropertyValue('mask-image'))&&s.visibility==='visible'&&s.display!=='none'&&Number(s.opacity)===1&&Number(s.fillOpacity)===1&&['translate','rotate','scale'].every(k=>['','none'].includes(s.getPropertyValue(k)))&&(!ink||(s.stroke==='none'&&s.fill!=='none'&&s.fill!=='transparent'&&s.fillRule==='nonzero'&&['','none'].includes(s.strokeDasharray)))}

function isOriginalGroup(n:Element|null):n is SVGGElement{return n?.namespaceURI==='http://www.w3.org/2000/svg'&&n.localName==='g'}
export function verifyReviewedU7228CardinalPrior(policy:ReviewedU7228CardinalPolicy,g:Element|null,previousMaskProgress:number):boolean{
 try{
  if(!TARGETS.includes(policy)||policy.mask!==2||![6,9].includes(policy.pen)||!policy.predecessor||previousMaskProgress!==1||!isOriginalGroup(g)||!g.isConnected||g.getAttribute('data-stroke-start-gate')!==policy.id||g.getAttribute('data-stroke-reveal-policy')!==policy.kind)return false
  const prev=g.previousElementSibling,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,pen=g.parentElement
  if(!prev||prev.localName!=='path'||!owner||!view||view.document!==doc||!pen||pen.getAttribute('data-outline-stroke')!==String(policy.pen)||prev.parentElement!==pen||prev.nextElementSibling!==g||Array.from(pen.children).indexOf(g)!==1||pen.children.length!==2)return false
  if(prev.getAttribute('d')!==policy.predecessor.outline||!attrs(prev,{pathLength:null,'stroke-dasharray':null,'stroke-dashoffset':null}))return false
  const nodes:Element[]=[g,prev];let n:Element|null=pen
  while(n){nodes.push(n);if(n===owner)break;n=n.parentElement}
  if(nodes[nodes.length-1]!==owner)return false
  return nodes.every(n=>n.namespaceURI==='http://www.w3.org/2000/svg'&&n.isConnected&&n.ownerDocument===doc&&(n===owner||(n as SVGElement).ownerSVGElement===owner)&&clean(n,view,n===prev))
 }catch{return false}
}


export const REVIEWED_U7228_CARDINAL_SOURCE=freeze({"root":"u7228-ue0100","originalMasks":2,"proofFile":"docs/hanja-source-original-u7228-vs0-2026-10-25/cardinal-contact-proof.json","proofSHA256":"6b89e83d18310ab5ef636ee9c59eb482fcedca7c17eca33e7608771d6ea2fffb","nativeApproval":false,"runtimeApplied":false,"sourcePGuideWeightChanged":false,"newGuideAdded":false,"UARead":false})

