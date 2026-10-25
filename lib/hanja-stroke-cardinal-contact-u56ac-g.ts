import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU56acGContext,makeReviewedU56acGSourceContext} from './hanja-stroke-start-caps-u56ac-g.ts'
function freeze<T>(v:T):T{if(v&&typeof v==='object'){for(const d of Object.values(Object.getOwnPropertyDescriptors(v)))if('value'in d)freeze(d.value);Object.freeze(v)}return v}
const TARGETS=freeze([{"id":"u56acg-cardinal-contact-2-2","kind":"cardinal-contact-prefix-u56acg","pen":2,"mask":2,"segment":{"outline":"M27.25 22 L27.25 70 L21.25 73 L21.25 22 Z M21.25 21 L24.25 18.5 L29.75 23 L27.25 25 L21.25 22 Z","bounds":[21.25,18.5,29.75,73],"direction":"down","weight":44},"predecessor":{"outline":"M10 21 L24.25 21 L24.25 23 L10 23 Z","bounds":[10,21,24.25,23],"direction":"right","weight":14.25},"axis":"y","originY":22,"origin":22,"negativeExtent":3.5,"positiveExtent":51},{"id":"u56acg-cardinal-contact-14-2","kind":"cardinal-contact-prefix-u56acg","pen":14,"mask":2,"segment":{"outline":"M89.4 28 L89.4 72 L83.4 75 L83.4 28 Z M83.4 27 L86.4 24.5 L91.9 29 L89.4 31 L83.4 28 Z","bounds":[83.4,24.5,91.9,75],"direction":"down","weight":43},"predecessor":{"outline":"M67.1 27 L86.4 27 L86.4 29 L67.1 29 Z","bounds":[67.1,27,86.4,29],"direction":"right","weight":19.32},"axis":"y","originY":28,"origin":28,"negativeExtent":3.5,"positiveExtent":47}] as const)
const CONTEXT=Object.freeze({id:'u56acg-original-down-cardinal-contact' as const})
export type ReviewedU56acGCardinalContext=typeof CONTEXT
export type ReviewedU56acGCardinalPolicy=typeof TARGETS[number]
function exact(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&exact(x.value,y.value)})}
export function reviewedU56acGCardinalContext(strokes:HanjaOutlineStrokes):ReviewedU56acGCardinalContext|null{return reviewedU56acGContext(strokes)?CONTEXT:null}
export function makeReviewedU56acGCardinalSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU56acGCardinalContext|null{return makeReviewedU56acGSourceContext(proof,identity,strokes)?CONTEXT:null}
export function reviewedU56acGCardinalPolicy(context:ReviewedU56acGCardinalContext|null,pen:number,mask:number):ReviewedU56acGCardinalPolicy|null{return context===CONTEXT?TARGETS.find(t=>t.pen===pen+1&&t.mask===mask+1)??null:null}
export type ReviewedU56acGCardinalFrame=Readonly<{policyId:string;progress:number;previousMaskProgress:number;phase:'empty'|'contact-prefix'|'full';visible:boolean;originalPDirect:boolean;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;requiresCompletedOriginalPredecessor:true;UARead:false}>
export function sampleReviewedU56acGCardinalFrame(policy:ReviewedU56acGCardinalPolicy,segment:HanjaOutlineSegment,progress:number,previousMaskProgress:number):ReviewedU56acGCardinalFrame{
 if(!TARGETS.includes(policy)||!exact(segment,policy.segment))throw Error('Private exact original 嚬 V/cardinal fields required')
 if(!Number.isFinite(progress)||progress<0||progress>1||!Number.isFinite(previousMaskProgress)||previousMaskProgress<0||previousMaskProgress>1)throw Error('Finite original progress required')
 if(progress>0&&previousMaskProgress!==1)throw Error('Same-frame completed opaque original 嚬 predecessor required')
 if(progress===0||progress===1)return Object.freeze({policyId:policy.id,progress,previousMaskProgress,phase:progress===0?'empty':'full',visible:progress===1,originalPDirect:progress===1,clip:null,requiresCompletedOriginalPredecessor:true,UARead:false})
 const b=policy.segment.bounds,clip={x:b[0],y:policy.origin-policy.negativeExtent*progress,width:b[2]-b[0],height:(policy.negativeExtent+policy.positiveExtent)*progress}
 return Object.freeze({policyId:policy.id,progress,previousMaskProgress,phase:'contact-prefix',visible:true,originalPDirect:false,clip:Object.freeze(clip),requiresCompletedOriginalPredecessor:true,UARead:false})
}
function attrs(n:Element,k:Record<string,string|null>){return Object.entries(k).every(([a,b])=>n.getAttribute(a)===b)}
function opaqueSolidFill(value:string){const f=value.trim().toLowerCase();if(!f||['none','transparent'].includes(f)||f.startsWith('url('))return false;const a=f.includes('/')?f.slice(f.lastIndexOf('/')+1,f.lastIndexOf(')')).trim():/^(rgba|hsla)\(/.test(f)?f.slice(f.lastIndexOf(',')+1,f.lastIndexOf(')')).trim():null;if(a!==null)return a==='1'||a==='100%';if(/^#[0-9a-f]{8}$/.test(f))return f.endsWith('ff');if(/^#[0-9a-f]{4}$/.test(f))return f.endsWith('f');return true}
function clean(n:Element,view:Window,ink:boolean){const s=view.getComputedStyle(n);return attrs(n,{transform:null,filter:null,mask:null,'clip-path':null})&&s.transform==='none'&&s.filter==='none'&&s.clipPath==='none'&&['','none'].includes(s.getPropertyValue('mask-image'))&&s.visibility==='visible'&&s.display!=='none'&&Number(s.opacity)===1&&Number(s.fillOpacity)===1&&['translate','rotate','scale'].every(k=>['','none'].includes(s.getPropertyValue(k)))&&(!ink||(s.stroke==='none'&&opaqueSolidFill(s.fill)&&s.fillRule==='nonzero'&&['','none'].includes(s.strokeDasharray)))}

function isOriginalGroup(n:Element|null):n is SVGGElement{return n?.namespaceURI==='http://www.w3.org/2000/svg'&&n.localName==='g'}
export function verifyReviewedU56acGCardinalPrior(policy:ReviewedU56acGCardinalPolicy,g:Element|null,previousMaskProgress:number):boolean{
 try{
  if(!TARGETS.includes(policy)||policy.mask!==2||![2,14].includes(policy.pen)||!policy.predecessor||previousMaskProgress!==1||!isOriginalGroup(g)||!g.isConnected||g.getAttribute('data-stroke-start-gate')!==policy.id||g.getAttribute('data-stroke-reveal-policy')!==policy.kind)return false
  const prev=g.previousElementSibling,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,pen=g.parentElement
  if(!prev||prev.localName!=='path'||!owner||!view||view.document!==doc||!pen||pen.getAttribute('data-outline-stroke')!==String(policy.pen)||prev.parentElement!==pen||prev.nextElementSibling!==g||Array.from(pen.children).indexOf(g)!==1||pen.children.length!==2)return false
  if(prev.getAttribute('d')!==policy.predecessor.outline||!attrs(prev,{pathLength:null,'stroke-dasharray':null,'stroke-dashoffset':null}))return false
  const nodes:Element[]=[g,prev];let n:Element|null=pen
  while(n){nodes.push(n);if(n===owner)break;n=n.parentElement}
  if(nodes[nodes.length-1]!==owner)return false
  return nodes.every(n=>n.namespaceURI==='http://www.w3.org/2000/svg'&&n.isConnected&&n.ownerDocument===doc&&(n===owner||(n as SVGElement).ownerSVGElement===owner)&&clean(n,view,n===prev))
 }catch{return false}
}


export const REVIEWED_U56acG_CARDINAL_SOURCE=freeze({"root":"u56ac-g","originalMasks":2,"proofFile":"docs/hanja-source-original-u56ac-g-2026-10-25/compound-HV-contact-proof.json","proofSHA256":"b1f6fabff5142be9333010fc9b7aa06208f8890c123a95262c03b2a8fa851995","nativeApproval":false,"runtimeApplied":false,"newDisplayClockExplicit":true,"previousCompletedOriginalHRequired":true})
