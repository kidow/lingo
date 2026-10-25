import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU8543TContext,makeReviewedU8543TSourceContext} from './hanja-stroke-start-caps-u8543-t.ts'
function freeze<T>(v:T):T{if(v&&typeof v==='object'){for(const d of Object.values(Object.getOwnPropertyDescriptors(v)))if('value'in d)freeze(d.value);Object.freeze(v)}return v}
const TARGETS=freeze([{"id":"u8543t-cardinal-contact-13-2","kind":"cardinal-contact-prefix-u8543t","pen":13,"mask":2,"segment":{"outline":"M78.1 66 L78.1 90.85 L72.1 93.85 L72.1 66 Z M72.1 65 L75.1 62.5 L80.6 67 L78.1 69 L72.1 66 Z","bounds":[72.1,62.5,80.6,93.85],"direction":"down","weight":22.85075},"predecessor":{"outline":"M24.85 65 L75.1 65 L75.1 67 L24.85 67 Z","bounds":[24.85,65,75.1,67],"direction":"right","weight":50.25},"axis":"y","originY":66,"origin":66,"negativeExtent":3.5,"positiveExtent":27.85}] as const)
const CONTEXT=Object.freeze({id:'u8543t-original-down-cardinal-contact' as const})
export type ReviewedU8543TCardinalContext=typeof CONTEXT
export type ReviewedU8543TCardinalPolicy=typeof TARGETS[number]
function exact(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&exact(x.value,y.value)})}
export function reviewedU8543TCardinalContext(strokes:HanjaOutlineStrokes):ReviewedU8543TCardinalContext|null{return reviewedU8543TContext(strokes)?CONTEXT:null}
export function makeReviewedU8543TCardinalSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU8543TCardinalContext|null{return makeReviewedU8543TSourceContext(proof,identity,strokes)?CONTEXT:null}
export function reviewedU8543TCardinalPolicy(context:ReviewedU8543TCardinalContext|null,pen:number,mask:number):ReviewedU8543TCardinalPolicy|null{return context===CONTEXT?TARGETS.find(t=>t.pen===pen+1&&t.mask===mask+1)??null:null}
export type ReviewedU8543TCardinalFrame=Readonly<{policyId:string;progress:number;previousMaskProgress:number;phase:'empty'|'contact-prefix'|'full';visible:boolean;originalPDirect:boolean;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;requiresCompletedOriginalPredecessor:true;UARead:false}>
export function sampleReviewedU8543TCardinalFrame(policy:ReviewedU8543TCardinalPolicy,segment:HanjaOutlineSegment,progress:number,previousMaskProgress:number):ReviewedU8543TCardinalFrame{
 if(!TARGETS.includes(policy)||!exact(segment,policy.segment))throw Error('Private exact original 蕃 V/cardinal fields required')
 if(!Number.isFinite(progress)||progress<0||progress>1||!Number.isFinite(previousMaskProgress)||previousMaskProgress<0||previousMaskProgress>1)throw Error('Finite original progress required')
 if(progress>0&&previousMaskProgress!==1)throw Error('Same-frame completed opaque original 蕃 predecessor required')
 if(progress===0||progress===1)return Object.freeze({policyId:policy.id,progress,previousMaskProgress,phase:progress===0?'empty':'full',visible:progress===1,originalPDirect:progress===1,clip:null,requiresCompletedOriginalPredecessor:true,UARead:false})
 const b=policy.segment.bounds,clip={x:b[0],y:policy.origin-policy.negativeExtent*progress,width:b[2]-b[0],height:(policy.negativeExtent+policy.positiveExtent)*progress}
 return Object.freeze({policyId:policy.id,progress,previousMaskProgress,phase:'contact-prefix',visible:true,originalPDirect:false,clip:Object.freeze(clip),requiresCompletedOriginalPredecessor:true,UARead:false})
}
function attrs(n:Element,k:Record<string,string|null>){return Object.entries(k).every(([a,b])=>n.getAttribute(a)===b)}
function opaqueSolidFill(value:string){const f=value.trim().toLowerCase();if(!f||['none','transparent'].includes(f)||f.startsWith('url('))return false;const a=f.includes('/')?f.slice(f.lastIndexOf('/')+1,f.lastIndexOf(')')).trim():/^(rgba|hsla)\(/.test(f)?f.slice(f.lastIndexOf(',')+1,f.lastIndexOf(')')).trim():null;if(a!==null)return a==='1'||a==='100%';if(/^#[0-9a-f]{8}$/.test(f))return f.endsWith('ff');if(/^#[0-9a-f]{4}$/.test(f))return f.endsWith('f');return true}
function clean(n:Element,view:Window,ink:boolean){const s=view.getComputedStyle(n);return attrs(n,{transform:null,filter:null,mask:null,'clip-path':null})&&s.transform==='none'&&s.filter==='none'&&s.clipPath==='none'&&['','none'].includes(s.getPropertyValue('mask-image'))&&s.visibility==='visible'&&s.display!=='none'&&Number(s.opacity)===1&&Number(s.fillOpacity)===1&&['translate','rotate','scale'].every(k=>['','none'].includes(s.getPropertyValue(k)))&&(!ink||(s.stroke==='none'&&opaqueSolidFill(s.fill)&&s.fillRule==='nonzero'&&['','none'].includes(s.strokeDasharray)))}

function isOriginalGroup(n:Element|null):n is SVGGElement{return n?.namespaceURI==='http://www.w3.org/2000/svg'&&n.localName==='g'}
export function verifyReviewedU8543TCardinalPrior(policy:ReviewedU8543TCardinalPolicy,g:Element|null,previousMaskProgress:number):boolean{
 try{
  if(!TARGETS.includes(policy)||policy.mask!==2||![13].includes(policy.pen)||!policy.predecessor||previousMaskProgress!==1||!isOriginalGroup(g)||!g.isConnected||g.getAttribute('data-stroke-start-gate')!==policy.id||g.getAttribute('data-stroke-reveal-policy')!==policy.kind)return false
  const prev=g.previousElementSibling,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,pen=g.parentElement
  if(!prev||prev.localName!=='path'||!owner||!view||view.document!==doc||!pen||pen.getAttribute('data-outline-stroke')!==String(policy.pen)||prev.parentElement!==pen||prev.nextElementSibling!==g||Array.from(pen.children).indexOf(g)!==1||pen.children.length!==2)return false
  if(prev.getAttribute('d')!==policy.predecessor.outline||!attrs(prev,{pathLength:null,'stroke-dasharray':null,'stroke-dashoffset':null}))return false
  const nodes:Element[]=[g,prev];let n:Element|null=pen
  while(n){nodes.push(n);if(n===owner)break;n=n.parentElement}
  if(nodes[nodes.length-1]!==owner)return false
  return nodes.every(n=>n.namespaceURI==='http://www.w3.org/2000/svg'&&n.isConnected&&n.ownerDocument===doc&&(n===owner||(n as SVGElement).ownerSVGElement===owner)&&clean(n,view,n===prev))
 }catch{return false}
}


export const REVIEWED_U8543T_CARDINAL_SOURCE=freeze({"root":"u8543-t","originalMasks":1,"proofFile":"docs/hanja-source-original-u8543-t-2026-10-25/compound-HV-contact-proof.json","proofSHA256":"8603ca88bacc4e89ad9787c2c2ce6cb53dd450920d46f9ff1d7b6dd8edaa4ba5","nativeApproval":false,"runtimeApplied":false,"newDisplayClockExplicit":true,"previousCompletedOriginalHRequired":true})
