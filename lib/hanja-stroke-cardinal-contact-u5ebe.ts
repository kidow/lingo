import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU5ebeContext,makeReviewedU5ebeSourceContext} from './hanja-stroke-start-caps-u5ebe.ts'
function freeze<T>(v:T):T{if(v&&typeof v==='object'){for(const d of Object.values(Object.getOwnPropertyDescriptors(v)))if('value'in d)freeze(d.value);Object.freeze(v)}return v}
const TARGETS=freeze([{"id":"u5ebe-cardinal-contact-8-2","kind":"cardinal-contact-prefix-u5ebe","pen":8,"mask":2,"segment":{"outline":"M84.1 32 L84.1 69.6 L78.1 72.6 L78.1 32 Z M78.1 31 L81.1 28.5 L86.6 33 L84.1 35 L78.1 32 Z","bounds":[78.1,28.5,86.6,72.6],"direction":"down","weight":33.615},"predecessor":{"outline":"M63.8 31 L81.1 31 L81.1 33 L63.8 33 Z","bounds":[63.8,31,81.1,33],"direction":"right","weight":17.3075},"axis":"y","originY":32,"origin":32,"negativeExtent":3.5,"positiveExtent":40.6}] as const)
const CONTEXT=Object.freeze({id:'u5ebe-original-down-cardinal-contact' as const})
export type ReviewedU5ebeCardinalContext=typeof CONTEXT
export type ReviewedU5ebeCardinalPolicy=typeof TARGETS[number]
function exact(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&exact(x.value,y.value)})}
export function reviewedU5ebeCardinalContext(strokes:HanjaOutlineStrokes):ReviewedU5ebeCardinalContext|null{return reviewedU5ebeContext(strokes)?CONTEXT:null}
export function makeReviewedU5ebeCardinalSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU5ebeCardinalContext|null{return makeReviewedU5ebeSourceContext(proof,identity,strokes)?CONTEXT:null}
export function reviewedU5ebeCardinalPolicy(context:ReviewedU5ebeCardinalContext|null,pen:number,mask:number):ReviewedU5ebeCardinalPolicy|null{return context===CONTEXT?TARGETS.find(t=>t.pen===pen+1&&t.mask===mask+1)??null:null}
export type ReviewedU5ebeCardinalFrame=Readonly<{policyId:string;progress:number;previousMaskProgress:number;phase:'empty'|'contact-prefix'|'full';visible:boolean;originalPDirect:boolean;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;requiresCompletedOriginalPredecessor:true;UARead:false}>
export function sampleReviewedU5ebeCardinalFrame(policy:ReviewedU5ebeCardinalPolicy,segment:HanjaOutlineSegment,progress:number,previousMaskProgress:number):ReviewedU5ebeCardinalFrame{
 if(!TARGETS.includes(policy)||!exact(segment,policy.segment))throw Error('Private exact original 庾 V/cardinal fields required')
 if(!Number.isFinite(progress)||progress<0||progress>1||!Number.isFinite(previousMaskProgress)||previousMaskProgress<0||previousMaskProgress>1)throw Error('Finite original progress required')
 if(progress>0&&previousMaskProgress!==1)throw Error('Same-frame completed opaque original 庾 predecessor required')
 if(progress===0||progress===1)return Object.freeze({policyId:policy.id,progress,previousMaskProgress,phase:progress===0?'empty':'full',visible:progress===1,originalPDirect:progress===1,clip:null,requiresCompletedOriginalPredecessor:true,UARead:false})
 const b=policy.segment.bounds,clip={x:b[0],y:policy.origin-policy.negativeExtent*progress,width:b[2]-b[0],height:(policy.negativeExtent+policy.positiveExtent)*progress}
 return Object.freeze({policyId:policy.id,progress,previousMaskProgress,phase:'contact-prefix',visible:true,originalPDirect:false,clip:Object.freeze(clip),requiresCompletedOriginalPredecessor:true,UARead:false})
}
function attrs(n:Element,k:Record<string,string|null>){return Object.entries(k).every(([a,b])=>n.getAttribute(a)===b)}
function opaqueSolidFill(value:string){const f=value.trim().toLowerCase();if(!f||['none','transparent'].includes(f)||f.startsWith('url('))return false;const a=f.includes('/')?f.slice(f.lastIndexOf('/')+1,f.lastIndexOf(')')).trim():/^(rgba|hsla)\(/.test(f)?f.slice(f.lastIndexOf(',')+1,f.lastIndexOf(')')).trim():null;if(a!==null)return a==='1'||a==='100%';if(/^#[0-9a-f]{8}$/.test(f))return f.endsWith('ff');if(/^#[0-9a-f]{4}$/.test(f))return f.endsWith('f');return true}
function clean(n:Element,view:Window,ink:boolean){const s=view.getComputedStyle(n);return attrs(n,{transform:null,filter:null,mask:null,'clip-path':null})&&s.transform==='none'&&s.filter==='none'&&s.clipPath==='none'&&['','none'].includes(s.getPropertyValue('mask-image'))&&s.visibility==='visible'&&s.display!=='none'&&Number(s.opacity)===1&&Number(s.fillOpacity)===1&&['translate','rotate','scale'].every(k=>['','none'].includes(s.getPropertyValue(k)))&&(!ink||(s.stroke==='none'&&opaqueSolidFill(s.fill)&&s.fillRule==='nonzero'&&['','none'].includes(s.strokeDasharray)))}

function isOriginalGroup(n:Element|null):n is SVGGElement{return n?.namespaceURI==='http://www.w3.org/2000/svg'&&n.localName==='g'}
export function verifyReviewedU5ebeCardinalPrior(policy:ReviewedU5ebeCardinalPolicy,g:Element|null,previousMaskProgress:number):boolean{
 try{
  if(!TARGETS.includes(policy)||policy.mask!==2||![8].includes(policy.pen)||!policy.predecessor||previousMaskProgress!==1||!isOriginalGroup(g)||!g.isConnected||g.getAttribute('data-stroke-start-gate')!==policy.id||g.getAttribute('data-stroke-reveal-policy')!==policy.kind)return false
  const prev=g.previousElementSibling,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,pen=g.parentElement
  if(!prev||prev.localName!=='path'||!owner||!view||view.document!==doc||!pen||pen.getAttribute('data-outline-stroke')!==String(policy.pen)||prev.parentElement!==pen||prev.nextElementSibling!==g||Array.from(pen.children).indexOf(g)!==1||pen.children.length!==2)return false
  if(prev.getAttribute('d')!==policy.predecessor.outline||!attrs(prev,{pathLength:null,'stroke-dasharray':null,'stroke-dashoffset':null}))return false
  const nodes:Element[]=[g,prev];let n:Element|null=pen
  while(n){nodes.push(n);if(n===owner)break;n=n.parentElement}
  if(nodes[nodes.length-1]!==owner)return false
  return nodes.every(n=>n.namespaceURI==='http://www.w3.org/2000/svg'&&n.isConnected&&n.ownerDocument===doc&&(n===owner||(n as SVGElement).ownerSVGElement===owner)&&clean(n,view,n===prev))
 }catch{return false}
}


export const REVIEWED_U5ebe_CARDINAL_SOURCE=freeze({"root":"u5ebe-ue0102","originalMasks":1,"proofFile":"docs/hanja-source-original-u5ebe-ue0102-2026-10-25/remaining-mask-proof.json","proofSHA256":"b80306860b98a31409f3ccabcd1e27450251a0f83d59e276962ed73f2a812148","nativeApproval":false,"runtimeApplied":false,"sourcePGuideWeightChanged":false,"newGuideAdded":false,"UARead":false})
