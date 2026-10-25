import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU705dHkcsMCapsContext,makeReviewedU705dHkcsMCapsSourceContext} from './hanja-stroke-start-caps-u705d-hkcs-m.ts'
function freeze<T>(v:T):T{if(v&&typeof v==='object'){for(const d of Object.values(Object.getOwnPropertyDescriptors(v)))if('value'in d)freeze(d.value);Object.freeze(v)}return v}
const TARGETS=freeze([{"id":"u705d-hkcs-m-cardinal-contact-5-2","kind":"cardinal-contact-prefix-u705d-hkcs-m","pen":5,"mask":2,"segment":{"outline":"M56.5 12.9 L56.5 36.15 L51 36.15 L51 12.9 Z M51 11.9 L53.75 9.4 L59 13.9 L56.5 15.65 L51 12.9 Z","bounds":[51,9.4,59,36.15],"direction":"down","weight":22.23},"predecessor":{"outline":"M31.75 11.9 L53.75 11.9 L53.75 13.9 L31.75 13.9 Z","bounds":[31.75,11.9,53.75,13.9],"direction":"right","weight":22.007475},"axis":"y","originY":13.4,"origin":13.4,"negativeExtent":4,"positiveExtent":22.75},{"id":"u705d-hkcs-m-cardinal-contact-11-2","kind":"cardinal-contact-prefix-u705d-hkcs-m","pen":11,"mask":2,"segment":{"outline":"M56.35 52 L56.35 68 L50.85 68 L50.85 52 Z M50.85 51 L53.6 48.5 L58.85 53 L56.35 54.75 L50.85 52 Z","bounds":[50.85,48.5,58.85,68],"direction":"down","weight":15},"predecessor":{"outline":"M31.95 51 L53.6 51 L53.6 53 L31.95 53 Z","bounds":[31.95,51,53.6,53],"direction":"right","weight":21.65815},"axis":"y","originY":52.5,"origin":52.5,"negativeExtent":4,"positiveExtent":15.5},{"id":"u705d-hkcs-m-cardinal-contact-19-2","kind":"cardinal-contact-prefix-u705d-hkcs-m","pen":19,"mask":2,"segment":{"outline":"M90 29 L90 75.5 L84 75.5 L84 29 Z M84 28 L87 25.5 L92.5 30 L90 32 L84 29 Z","bounds":[84,25.5,92.5,75.5],"direction":"down","weight":45.5},"predecessor":{"outline":"M67 28 L87 28 L87 30 L67 30 Z","bounds":[67,28,87,30],"direction":"right","weight":20.0175},"axis":"y","originY":29.5,"origin":29.5,"negativeExtent":4,"positiveExtent":46}] as const)
const CONTEXT=Object.freeze({id:'u705d-hkcs-m-original-down-cardinal-contact' as const})
export type ReviewedU705dHkcsMCardinalContext=typeof CONTEXT
export type ReviewedU705dHkcsMCardinalPolicy=typeof TARGETS[number]
function exact(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&exact(x.value,y.value)})}
export function reviewedU705dHkcsMCardinalContext(strokes:HanjaOutlineStrokes):ReviewedU705dHkcsMCardinalContext|null{return reviewedU705dHkcsMCapsContext(strokes)?CONTEXT:null}
export function makeReviewedU705dHkcsMCardinalSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU705dHkcsMCardinalContext|null{return makeReviewedU705dHkcsMCapsSourceContext(proof,identity,strokes)?CONTEXT:null}
export function reviewedU705dHkcsMCardinalPolicy(context:ReviewedU705dHkcsMCardinalContext|null,pen:number,mask:number):ReviewedU705dHkcsMCardinalPolicy|null{return context===CONTEXT?TARGETS.find(t=>t.pen===pen+1&&t.mask===mask+1)??null:null}
export type ReviewedU705dHkcsMCardinalFrame=Readonly<{policyId:string;progress:number;previousMaskProgress:number;phase:'empty'|'contact-prefix'|'full';visible:boolean;originalPDirect:boolean;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;requiresCompletedOriginalPredecessor:true;UARead:false}>
export function sampleReviewedU705dHkcsMCardinalFrame(policy:ReviewedU705dHkcsMCardinalPolicy,segment:HanjaOutlineSegment,progress:number,previousMaskProgress:number):ReviewedU705dHkcsMCardinalFrame{
 if(!TARGETS.includes(policy)||!exact(segment,policy.segment))throw Error('Private exact original 灝 V/cardinal fields required')
 if(!Number.isFinite(progress)||progress<0||progress>1||!Number.isFinite(previousMaskProgress)||previousMaskProgress<0||previousMaskProgress>1)throw Error('Finite original progress required')
 if(progress>0&&previousMaskProgress!==1)throw Error('Same-frame completed opaque original 灝 predecessor required')
 if(progress===0||progress===1)return Object.freeze({policyId:policy.id,progress,previousMaskProgress,phase:progress===0?'empty':'full',visible:progress===1,originalPDirect:progress===1,clip:null,requiresCompletedOriginalPredecessor:true,UARead:false})
 const b=policy.segment.bounds,clip={x:b[0],y:policy.origin-policy.negativeExtent*progress,width:b[2]-b[0],height:(policy.negativeExtent+policy.positiveExtent)*progress}
 return Object.freeze({policyId:policy.id,progress,previousMaskProgress,phase:'contact-prefix',visible:true,originalPDirect:false,clip:Object.freeze(clip),requiresCompletedOriginalPredecessor:true,UARead:false})
}
function attrs(n:Element,k:Record<string,string|null>){return Object.entries(k).every(([a,b])=>n.getAttribute(a)===b)}
function opaqueSolidFill(value:string){const f=value.trim().toLowerCase();if(!f||['none','transparent'].includes(f)||f.startsWith('url('))return false;const a=f.includes('/')?f.slice(f.lastIndexOf('/')+1,f.lastIndexOf(')')).trim():/^(rgba|hsla)\(/.test(f)?f.slice(f.lastIndexOf(',')+1,f.lastIndexOf(')')).trim():null;if(a!==null)return a==='1'||a==='100%';if(/^#[0-9a-f]{8}$/.test(f))return f.endsWith('ff');if(/^#[0-9a-f]{4}$/.test(f))return f.endsWith('f');return true}
function clean(n:Element,view:Window,ink:boolean){const s=view.getComputedStyle(n);return attrs(n,{transform:null,filter:null,mask:null,'clip-path':null})&&s.transform==='none'&&s.filter==='none'&&s.clipPath==='none'&&['','none'].includes(s.getPropertyValue('mask-image'))&&s.visibility==='visible'&&s.display!=='none'&&Number(s.opacity)===1&&Number(s.fillOpacity)===1&&['translate','rotate','scale'].every(k=>['','none'].includes(s.getPropertyValue(k)))&&(!ink||(s.stroke==='none'&&opaqueSolidFill(s.fill)&&s.fillRule==='nonzero'&&['','none'].includes(s.strokeDasharray)))}

function isOriginalGroup(n:Element|null):n is SVGGElement{return n?.namespaceURI==='http://www.w3.org/2000/svg'&&n.localName==='g'}
export function verifyReviewedU705dHkcsMCardinalPrior(policy:ReviewedU705dHkcsMCardinalPolicy,g:Element|null,previousMaskProgress:number):boolean{
 try{
  if(!TARGETS.includes(policy)||policy.mask!==2||![5,11,19].includes(policy.pen)||!policy.predecessor||previousMaskProgress!==1||!isOriginalGroup(g)||!g.isConnected||g.getAttribute('data-stroke-start-gate')!==policy.id||g.getAttribute('data-stroke-reveal-policy')!==policy.kind)return false
  const prev=g.previousElementSibling,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,pen=g.parentElement
  if(!prev||prev.localName!=='path'||!owner||!view||view.document!==doc||!pen||pen.getAttribute('data-outline-stroke')!==String(policy.pen)||prev.parentElement!==pen||prev.nextElementSibling!==g||Array.from(pen.children).indexOf(g)!==1||pen.children.length!==2)return false
  if(prev.getAttribute('d')!==policy.predecessor.outline||!attrs(prev,{pathLength:null,'stroke-dasharray':null,'stroke-dashoffset':null}))return false
  const nodes:Element[]=[g,prev];let n:Element|null=pen
  while(n){nodes.push(n);if(n===owner)break;n=n.parentElement}
  if(nodes[nodes.length-1]!==owner)return false
  return nodes.every(n=>n.namespaceURI==='http://www.w3.org/2000/svg'&&n.isConnected&&n.ownerDocument===doc&&(n===owner||(n as SVGElement).ownerSVGElement===owner)&&clean(n,view,n===prev))
 }catch{return false}
}


export const REVIEWED_U705dHkcsM_CARDINAL_SOURCE=freeze({"root":"u705d-hkcs-m","originalMasks":1,"proofFile":"docs/hanja-source-original-u705d-hkcs-m-2026-10-25/compound-HV-contact-proof.json","proofSHA256":"a1b9c475c26369ab5fb9e54ff363b96dc037b39f4ae8eb6c2e83ae887d838875","nativeApproval":false,"runtimeApplied":false,"newDisplayClockExplicit":true,"previousCompletedOriginalHRequired":true})
