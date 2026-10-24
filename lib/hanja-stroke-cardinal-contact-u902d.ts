import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU902dContext,makeReviewedU902dSourceContext} from './hanja-stroke-start-caps-u902d.ts'
function freeze<T>(v:T):T{if(v&&typeof v==='object'){for(const d of Object.values(Object.getOwnPropertyDescriptors(v)))if('value'in d)freeze(d.value);Object.freeze(v)}return v}
const TARGETS=freeze([{"id":"u902d-cardinal-contact-5-2","kind":"cardinal-contact-prefix-u902d","pen":5,"mask":2,"segment":{"outline":"M80.85 30.6 L80.85 48.55 L74.85 51.55 L74.85 30.6 Z M74.85 29.6 L77.85 27.1 L83.35 31.6 L80.85 33.6 L74.85 30.6 Z","bounds":[74.85,27.1,83.35,51.55],"direction":"down","weight":15.984375},"predecessor":{"outline":"M45.6 29.6 L77.85 29.6 L77.85 31.6 L45.6 31.6 Z","bounds":[45.6,29.6,77.85,31.6],"direction":"right","weight":32.2525},"axis":"y","origin":30.6121875,"originExact":"97959/3200","negativeExtent":3.5121875,"positiveExtent":20.9378125},{"id":"u902d-cardinal-contact-7-2","kind":"cardinal-contact-prefix-u902d","pen":7,"mask":2,"segment":{"outline":"M83.85 58.1 L83.85 78.35 L77.85 81.35 L77.85 58.1 Z M77.85 57.1 L80.85 54.6 L86.35 59.1 L83.85 61.1 L77.85 58.1 Z","bounds":[77.85,54.6,86.35,81.35],"direction":"down","weight":17.263125},"predecessor":{"outline":"M45.6 57.1 L80.85 57.1 L80.85 59.1 L45.6 59.1 Z","bounds":[45.6,57.1,80.85,59.1],"direction":"right","weight":35.245},"axis":"y","origin":58.1053125,"originExact":"185937/3200","negativeExtent":3.5053125,"positiveExtent":23.2446875},{"id":"u902d-cardinal-contact-11-2","kind":"cardinal-contact-prefix-u902d","pen":11,"mask":2,"segment":{"outline":"M28 53.5 L28 77.5 L22 80.5 L22 53.5 Z M22 52.5 L25 50 L30.5 54.5 L28 56.5 L22 53.5 Z","bounds":[22,50,30.5,80.5],"direction":"down","weight":25.5},"predecessor":{"outline":"M7 52.5 L25 52.5 L25 54.5 L7 54.5 Z","bounds":[7,52.5,25,54.5],"direction":"right","weight":18},"axis":"y","origin":53.5,"originExact":"107/2","negativeExtent":3.5,"positiveExtent":27.0}] as const)
const CONTEXT=Object.freeze({id:'u902d-original-down-cardinal-contact' as const})
export type ReviewedU902dCardinalContext=typeof CONTEXT
export type ReviewedU902dCardinalPolicy=typeof TARGETS[number]
function exact(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&exact(x.value,y.value)})}
export function reviewedU902dCardinalContext(strokes:HanjaOutlineStrokes):ReviewedU902dCardinalContext|null{return reviewedU902dContext(strokes)?CONTEXT:null}
export function makeReviewedU902dCardinalSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU902dCardinalContext|null{return makeReviewedU902dSourceContext(proof,identity,strokes)?CONTEXT:null}
export function reviewedU902dCardinalPolicy(context:ReviewedU902dCardinalContext|null,pen:number,mask:number):ReviewedU902dCardinalPolicy|null{return context===CONTEXT?TARGETS.find(t=>t.pen===pen+1&&t.mask===mask+1)??null:null}
export type ReviewedU902dCardinalFrame=Readonly<{policyId:string;progress:number;previousMaskProgress:number;phase:'empty'|'contact-prefix'|'full';visible:boolean;originalPDirect:boolean;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;requiresCompletedOriginalPredecessor:true;UARead:false}>
export function sampleReviewedU902dCardinalFrame(policy:ReviewedU902dCardinalPolicy,segment:HanjaOutlineSegment,progress:number,previousMaskProgress:number):ReviewedU902dCardinalFrame{
 if(!TARGETS.includes(policy)||!exact(segment,policy.segment))throw Error('Private exact original 逭 V/cardinal fields required')
 if(!Number.isFinite(progress)||progress<0||progress>1||!Number.isFinite(previousMaskProgress)||previousMaskProgress<0||previousMaskProgress>1)throw Error('Finite original progress required')
 if(progress>0&&previousMaskProgress!==1)throw Error('Same-frame completed opaque original 逭 predecessor required')
 if(progress===0||progress===1)return Object.freeze({policyId:policy.id,progress,previousMaskProgress,phase:progress===0?'empty':'full',visible:progress===1,originalPDirect:progress===1,clip:null,requiresCompletedOriginalPredecessor:true,UARead:false})
 const b=policy.segment.bounds,clip={x:b[0],y:policy.origin-policy.negativeExtent*progress,width:b[2]-b[0],height:(policy.negativeExtent+policy.positiveExtent)*progress}
 return Object.freeze({policyId:policy.id,progress,previousMaskProgress,phase:'contact-prefix',visible:true,originalPDirect:false,clip:Object.freeze(clip),requiresCompletedOriginalPredecessor:true,UARead:false})
}
/** Required before and after visibility commit; previous progress alone is never DOM proof. */
export function verifyReviewedU902dCardinalPrior(policy:ReviewedU902dCardinalPolicy,g:SVGGElement,previousMaskProgress:number):boolean{
 if(!TARGETS.includes(policy)||previousMaskProgress!==1||!g.isConnected)return false
 const previous=g.previousElementSibling,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc?.defaultView
 if(!previous||!owner||!view||view.document!==doc||previous.parentNode!==g.parentNode||previous.nextElementSibling!==g||previous.ownerDocument!==doc||(previous as SVGElement).ownerSVGElement!==owner)return false
 if(g.getAttribute('data-stroke-start-gate')!==policy.id||g.parentElement?.getAttribute('data-outline-stroke')!==String(policy.pen)||g.parentElement.children.length!==2||g.parentElement.children[1]!==g)return false
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
export const REVIEWED_U902D_CARDINAL_SOURCE=freeze({"root":"u902d","targets":[[5,2],[7,2],[11,2]],"fixture":"docs/hanja-source-original-u902d-2026-10-25/fixtures.json","fixtureSHA256":"a50e133dbdf91d394a398c4e0dddee855af6b81ec60c6bbcb8f7438059a4effd","geometrySHA256":"6f03a75cb5d9e9aee3ac646bd98b3e69fffca6b6b7ca7b1b5b4a82b589d30feb","sourceProofFormat":"actual-full5","sourceContextModule":"lib/hanja-stroke-start-caps-u902d.ts","sourceContextSHA256":"7e696eddc4b3528dc5ce2156c6103890a66173f410344c07ebf07fa31a67efb7","sourceFieldsChanged":false,"originalOuterClockChanged":false,"newDisplayBandExplicit":true,"requiresCompletedOriginalPriorH":true,"requiresActualSameFrameDOMGateBeforeAfter":true,"noSourceGuideInvented":true,"proofFile":"docs/hanja-source-original-u902d-2026-10-25/cardinal-contact-proof.json","proofSHA256":"1e724c2150671716fd3409e0ce529fd858471315f80572fe94930ad608373dde","nativeApproval":false,"runtimeApplied":false,"productionImportAllowed":false})
