import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU61b8HkcsContext,makeReviewedU61b8HkcsSourceContext} from './hanja-stroke-start-caps-u61b8-hkcs.ts'
function freeze<T>(v:T):T{if(v&&typeof v==='object'){for(const d of Object.values(Object.getOwnPropertyDescriptors(v)))if('value'in d)freeze(d.value);Object.freeze(v)}return v}
const TARGETS=freeze([{"id":"u61b8-hkcs-cardinal-contact-8-2","kind":"cardinal-contact-prefix-u61b8-hkcs","pen":8,"mask":2,"segment":{"outline":"M58 45.5 L58 64.5 L52.5 64.5 L52.5 45.5 Z M52.5 44.5 L55.25 42 L60.5 46.5 L58 48.25 L52.5 45.5 Z","bounds":[52.5,42,60.5,64.5],"direction":"down","weight":18},"predecessor":{"outline":"M40.2 44.5 L55.25 44.5 L55.25 46.5 L40.2 46.5 Z","bounds":[40.2,44.5,55.25,46.5],"direction":"right","weight":15.08},"axis":"y","originY":45.5,"origin":45.5,"negativeExtent":3.5,"positiveExtent":19},{"id":"u61b8-hkcs-cardinal-contact-11-2","kind":"cardinal-contact-prefix-u61b8-hkcs","pen":11,"mask":2,"segment":{"outline":"M84.8 45.5 L84.8 64.5 L78.8 64.5 L78.8 45.5 Z M78.8 44.5 L81.8 42 L87.3 46.5 L84.8 48.5 L78.8 45.5 Z","bounds":[78.8,42,87.3,64.5],"direction":"down","weight":18},"predecessor":{"outline":"M66.7 44.5 L81.8 44.5 L81.8 46.5 L66.7 46.5 Z","bounds":[66.7,44.5,81.8,46.5],"direction":"right","weight":15.08},"axis":"y","originY":45.5,"origin":45.5,"negativeExtent":3.5,"positiveExtent":19}] as const)
const CONTEXT=Object.freeze({id:'u61b8-hkcs-original-down-cardinal-contact' as const})
export type ReviewedU61b8HkcsCardinalContext=typeof CONTEXT
export type ReviewedU61b8HkcsCardinalPolicy=typeof TARGETS[number]
function exact(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&exact(x.value,y.value)})}
export function reviewedU61b8HkcsCardinalContext(strokes:HanjaOutlineStrokes):ReviewedU61b8HkcsCardinalContext|null{return reviewedU61b8HkcsContext(strokes)?CONTEXT:null}
export function makeReviewedU61b8HkcsCardinalSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU61b8HkcsCardinalContext|null{return makeReviewedU61b8HkcsSourceContext(proof,identity,strokes)?CONTEXT:null}
export function reviewedU61b8HkcsCardinalPolicy(context:ReviewedU61b8HkcsCardinalContext|null,pen:number,mask:number):ReviewedU61b8HkcsCardinalPolicy|null{return context===CONTEXT?TARGETS.find(t=>t.pen===pen+1&&t.mask===mask+1)??null:null}
export type ReviewedU61b8HkcsCardinalFrame=Readonly<{policyId:string;progress:number;previousMaskProgress:number;phase:'empty'|'contact-prefix'|'full';visible:boolean;originalPDirect:boolean;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;requiresCompletedOriginalPredecessor:true;UARead:false}>
export function sampleReviewedU61b8HkcsCardinalFrame(policy:ReviewedU61b8HkcsCardinalPolicy,segment:HanjaOutlineSegment,progress:number,previousMaskProgress:number):ReviewedU61b8HkcsCardinalFrame{
 if(!TARGETS.includes(policy)||!exact(segment,policy.segment))throw Error('Private exact original 憸 V/cardinal fields required')
 if(!Number.isFinite(progress)||progress<0||progress>1||!Number.isFinite(previousMaskProgress)||previousMaskProgress<0||previousMaskProgress>1)throw Error('Finite original progress required')
 if(progress>0&&previousMaskProgress!==1)throw Error('Same-frame completed opaque original 憸 predecessor required')
 if(progress===0||progress===1)return Object.freeze({policyId:policy.id,progress,previousMaskProgress,phase:progress===0?'empty':'full',visible:progress===1,originalPDirect:progress===1,clip:null,requiresCompletedOriginalPredecessor:true,UARead:false})
 const b=policy.segment.bounds,clip={x:b[0],y:policy.origin-policy.negativeExtent*progress,width:b[2]-b[0],height:(policy.negativeExtent+policy.positiveExtent)*progress}
 return Object.freeze({policyId:policy.id,progress,previousMaskProgress,phase:'contact-prefix',visible:true,originalPDirect:false,clip:Object.freeze(clip),requiresCompletedOriginalPredecessor:true,UARead:false})
}
function attrs(n:Element,k:Record<string,string|null>){return Object.entries(k).every(([a,b])=>n.getAttribute(a)===b)}
function opaqueSolidFill(value:string){const f=value.trim().toLowerCase();if(!f||['none','transparent'].includes(f)||f.startsWith('url('))return false;const a=f.includes('/')?f.slice(f.lastIndexOf('/')+1,f.lastIndexOf(')')).trim():/^(rgba|hsla)\(/.test(f)?f.slice(f.lastIndexOf(',')+1,f.lastIndexOf(')')).trim():null;if(a!==null)return a==='1'||a==='100%';if(/^#[0-9a-f]{8}$/.test(f))return f.endsWith('ff');if(/^#[0-9a-f]{4}$/.test(f))return f.endsWith('f');return true}
function clean(n:Element,view:Window,ink:boolean){const s=view.getComputedStyle(n);return attrs(n,{transform:null,filter:null,mask:null,'clip-path':null})&&s.transform==='none'&&s.filter==='none'&&s.clipPath==='none'&&['','none'].includes(s.getPropertyValue('mask-image'))&&s.visibility==='visible'&&s.display!=='none'&&Number(s.opacity)===1&&Number(s.fillOpacity)===1&&['translate','rotate','scale'].every(k=>['','none'].includes(s.getPropertyValue(k)))&&(!ink||(s.stroke==='none'&&opaqueSolidFill(s.fill)&&s.fillRule==='nonzero'&&['','none'].includes(s.strokeDasharray)))}

function isOriginalGroup(n:Element|null):n is SVGGElement{return n?.namespaceURI==='http://www.w3.org/2000/svg'&&n.localName==='g'}
export function verifyReviewedU61b8HkcsCardinalPrior(policy:ReviewedU61b8HkcsCardinalPolicy,g:Element|null,previousMaskProgress:number):boolean{
 try{
  if(!TARGETS.includes(policy)||policy.mask!==2||![8,11].includes(policy.pen)||!policy.predecessor||previousMaskProgress!==1||!isOriginalGroup(g)||!g.isConnected||g.getAttribute('data-stroke-start-gate')!==policy.id||g.getAttribute('data-stroke-reveal-policy')!==policy.kind)return false
  const prev=g.previousElementSibling,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,pen=g.parentElement
  if(!prev||prev.localName!=='path'||!owner||!view||view.document!==doc||!pen||pen.getAttribute('data-outline-stroke')!==String(policy.pen)||prev.parentElement!==pen||prev.nextElementSibling!==g||Array.from(pen.children).indexOf(g)!==1||pen.children.length!==2)return false
  if(prev.getAttribute('d')!==policy.predecessor.outline||!attrs(prev,{pathLength:null,'stroke-dasharray':null,'stroke-dashoffset':null}))return false
  const nodes:Element[]=[g,prev];let n:Element|null=pen
  while(n){nodes.push(n);if(n===owner)break;n=n.parentElement}
  if(nodes[nodes.length-1]!==owner)return false
  return nodes.every(n=>n.namespaceURI==='http://www.w3.org/2000/svg'&&n.isConnected&&n.ownerDocument===doc&&(n===owner||(n as SVGElement).ownerSVGElement===owner)&&clean(n,view,n===prev))
 }catch{return false}
}


export const REVIEWED_U61B8_HKCS_CARDINAL_SOURCE=freeze({"root":"hkcs_m61b8","originalMasks":2,"proofFile":"docs/hanja-source-original-u61b8-hkcs-2026-10-25/axis-contact-proof.json","proofSHA256":"87aafeacafcad12bb541f483ac5cf903ee0c7f5f7d686eb2ecf9f686a8718c1b","nativeApproval":false,"runtimeApplied":false,"sourcePGuideWeightChanged":false,"newGuideAdded":false,"UARead":false})


