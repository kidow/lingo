/** Original 蘉11/12/18 union-kernel point windows; author clocks, native pending. */
import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU8609HkcsSourceContext,type ReviewedU8609HkcsContext} from './hanja-stroke-start-caps-u8609-hkcs.ts'
import fixture from '../docs/hanja-source-original-u8609-hkcs-2026-10-26/fixtures.json' with {type:'json'}
const FIXED=fixture.hkcs_m8609,STROKES=FIXED.strokes as HanjaOutlineStrokes
function freeze<T>(v:T):T{if(v&&typeof v==='object'){for(const d of Object.values(Object.getOwnPropertyDescriptors(v)))if('value'in d)freeze(d.value);Object.freeze(v)}return v}
freeze(FIXED)
function same(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&same(x.value,y.value)})}
const SOURCE_CONTEXT=makeReviewedU8609HkcsSourceContext(FIXED.fullProof,FIXED.identity,STROKES)
if(!SOURCE_CONTEXT)throw Error('Exact original whole 蘉20 source factory required')
const CONFIG=freeze([{"pen":11,"mask":2,"id":"u8609-hkcs-union-point-window-11-2","kind":"source-union-point-window-u8609-hkcs","anchor":[84.29815088757397,40.78171753347867],"extents":[7.598150887573964,6.201849112426036,3.881717533478667,7.468282466521333],"width":13.8,"height":11.35,"strictHalfWidth":"6307/30400","initialOutsidePriorEmptyUpper":null,"proofFingerprint":"4cea6ff29c451c5f1cadeabd77a864cebbe5de1f074a708e88fd0c56a8cab1ba"},{"pen":12,"mask":1,"id":"u8609-hkcs-union-point-window-12-1","kind":"source-union-point-window-u8609-hkcs","anchor":[32.25983708189076,45.86368217875492],"extents":[22.509837081890762,2.5901629181092387,2.4136821787549243,28.636317821245076],"width":25.1,"height":31.05,"strictHalfWidth":"164241/5945600","initialOutsidePriorEmptyUpper":null,"proofFingerprint":"4cea6ff29c451c5f1cadeabd77a864cebbe5de1f074a708e88fd0c56a8cab1ba"},{"pen":18,"mask":2,"id":"u8609-hkcs-union-point-window-18-2","kind":"source-union-point-window-u8609-hkcs","anchor":[83.38,66.47],"extents":[5.28,6.37,3.77,5.18],"width":11.65,"height":8.95,"strictHalfWidth":"167/600","initialOutsidePriorEmptyUpper":"87/637","proofFingerprint":"0b6ccaf662f1e2b3368022807eb5f3c50fc1d2a2da445d4948b9856d9670641f"}] as const)
export type ReviewedU8609HkcsUnionPointPolicy=Readonly<{id:string;kind:'source-union-point-window-u8609-hkcs';pen:number;mask:number;segment:HanjaOutlineSegment;predecessor:HanjaOutlineSegment|null;anchor:readonly[number,number];extents:readonly[number,number,number,number];width:number;height:number;strictHalfWidth:string;initialOutsidePriorEmptyUpper:string|null;proofFingerprint:string;completedPriorFingerprint:string|null;commonKernelAnchor:readonly[number,number]}>
const POLICIES:readonly ReviewedU8609HkcsUnionPointPolicy[]=Object.freeze(CONFIG.map(t=>freeze({...t,segment:STROKES[t.pen-1][t.mask-1],predecessor:t.mask===2?STROKES[t.pen-1][0]:null,completedPriorFingerprint:({"11":"aab22099a1cecde679dc049394918c4e3b800fe57c729e16aa66063039354bf8","18":"853657f9627a081159120df3913a963ed18e50e2a4cac33528d983889de3e062"} as Record<number,string>)[t.pen]??null,commonKernelAnchor:t.anchor})))
function privatePolicy(policy:ReviewedU8609HkcsUnionPointPolicy):boolean{return POLICIES.includes(policy)}
export function makeReviewedU8609HkcsUnionPointSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU8609HkcsContext|null{const c=makeReviewedU8609HkcsSourceContext(proof,identity,strokes);return c===SOURCE_CONTEXT?c:null}
export function reviewedU8609HkcsUnionPointPolicy(context:ReviewedU8609HkcsContext|null,pen:number,mask:number):ReviewedU8609HkcsUnionPointPolicy|null{return context===SOURCE_CONTEXT?POLICIES.find(p=>p.pen===pen+1&&p.mask===mask+1)??null:null}
export type ReviewedU8609HkcsUnionPointFrame=Readonly<{policyId:string;progress:number;phase:'empty'|'source-union-point-window'|'full';visible:boolean;originalPDirect:boolean;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;sourceGuide:string;authorAnchorDifferentFromSourceQ0:true;requiresCompletedOriginalPredecessor:boolean;UARead:false}>
export function sampleReviewedU8609HkcsUnionPointFrame(policy:ReviewedU8609HkcsUnionPointPolicy,segment:HanjaOutlineSegment,p:number,previousMaskProgress=0,priorOpaque=false):ReviewedU8609HkcsUnionPointFrame{
 if(!privatePolicy(policy)||!same(segment,policy.segment))throw Error('Private original 蘉 union-point P/Q/width/weight required')
 if(!Number.isFinite(p)||p<0||p>1||!Number.isFinite(previousMaskProgress)||previousMaskProgress<0||previousMaskProgress>1)throw Error('Finite authored 蘉 point-window progress required')
 if(policy.predecessor&&p>0&&(previousMaskProgress!==1||priorOpaque!==true))throw Error('Exact same-frame completed opaque original 蘉 H required')
 const clip=p===0||p===1?null:Object.freeze({x:policy.anchor[0]-policy.extents[0]*p,y:policy.anchor[1]-policy.extents[2]*p,width:policy.width*p,height:policy.height*p})
 return Object.freeze({policyId:policy.id,progress:p,phase:p===0?'empty':p===1?'full':'source-union-point-window',visible:p!==0,originalPDirect:p===1,clip,sourceGuide:segment.revealPath!,authorAnchorDifferentFromSourceQ0:true,requiresCompletedOriginalPredecessor:!!policy.predecessor,UARead:false})
}
function opaqueRGB(value:string):boolean{
 const match=/^rgba?\(([^)]+)\)$/.exec(value.trim());if(!match)return false
 const slash=match[1].split('/'),parts=slash[0].replaceAll(',',' ').trim().split(/\s+/);let alpha:string|undefined=slash[1]?.trim()
 if(slash.length>2)return false
 if(alpha===undefined&&parts.length===4)alpha=parts.pop()
 return parts.length===3&&parts.every(v=>Number.isFinite(Number(v.replace('%',''))))&&(alpha===undefined||(alpha.endsWith('%')?Number(alpha.slice(0,-1))/100:Number(alpha))===1)
}
function sameComputedD(value:string,expected:string):boolean{
 if(value==='')return true
 const match=/^path\((?:nonzero,\s*)?["']([^"']+)["']\)$/.exec(value);if(!match)return false
 const tokens=(v:string)=>{
  const re=/[MLZ]|[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g,a=v.match(re)||[]
  if(v.replace(re,'').replace(/[\s,]/g,''))return null
  return a.map(x=>/^[MLZ]$/.test(x)?x:Number(x))
 }
 const a=tokens(match[1]),b=tokens(expected)
 return !!a&&!!b&&a.length===b.length&&a.every((v,i)=>v===b[i])
}
function styleIsUnmodified(node:Element,view:Window):boolean{
 if(['mask','clip-path','transform','filter'].some(k=>node.getAttribute(k)!==null))return false
 const s=view.getComputedStyle(node)
 if(s.display==='none'||s.visibility!=='visible'||Number(s.opacity)!==1||Number(s.fillOpacity)!==1||s.transform!=='none'||s.filter!=='none'||s.clipPath!=='none'||s.getPropertyValue('mask-image')!=='none'||s.mixBlendMode!=='normal')return false
 return ['translate','rotate','scale'].every(k=>{const v=s.getPropertyValue(k);return v===''||v==='none'})
}
/** Only11m2/18m2: exact direct completed H followed by this target in its original20-pen slot. */
export function verifyReviewedU8609HkcsUnionPointPrior(policy:ReviewedU8609HkcsUnionPointPolicy,g:SVGGElement|null,previousMaskProgress:number):boolean{
 try{
  if(!privatePolicy(policy)||!policy.predecessor||policy.mask!==2||![11,18].includes(policy.pen)||previousMaskProgress!==1||!g||g.localName!=='g'||!g.isConnected)return false
  if(g.getAttribute('data-stroke-start-gate')!==policy.id||g.getAttribute('data-stroke-reveal-policy')!==policy.kind||g.getAttribute('data-u8609-union-point-fingerprint')!==policy.proofFingerprint)return false
  const clipId=g.getAttribute('data-u8609-union-point-clip'),tail='-'+(policy.pen-1)+'-'+(policy.mask-1)
  if(!clipId||!/^[A-Za-z0-9_:.-]+$/.test(clipId)||!clipId.endsWith(tail))return false
  const owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,parent=g.parentNode
  if(!owner||!view||view.document!==doc||owner.ownerDocument!==doc||!owner.isConnected||owner.getAttribute('viewBox')!=='0 0 100 100'||!parent||parent.nodeType!==1)return false
  const pen=parent as SVGGElement,outerNode=pen.parentNode
  if(pen.namespaceURI!=='http://www.w3.org/2000/svg'||pen.localName!=='g'||pen.ownerSVGElement!==owner||pen.getAttribute('data-outline-stroke')!==String(policy.pen)||!outerNode||outerNode.nodeType!==1)return false
  const outer=outerNode as SVGGElement
  if(outer.getAttribute('data-stroke-outlines')!=='true'||outer.children.length!==20||outer.children[policy.pen-1]!==pen||pen.children.length!==2||pen.children[1]!==g||pen.children[0].localName!=='path')return false
  const prior=pen.children[0] as SVGPathElement
  if(prior.parentNode!==pen||prior.ownerSVGElement!==owner||prior.ownerDocument!==doc||prior.getAttribute('d')!==policy.predecessor.outline||['pathLength','stroke-dasharray','stroke-dashoffset'].some(k=>prior.getAttribute(k)!==null))return false
  if(!styleIsUnmodified(g,view))return false
  const parents=new Map<Element,ParentNode|null>(),seen=new Set<Element>();let n:Element|null=prior
  while(n){
   if(seen.has(n)||!n.isConnected||n.ownerDocument!==doc||n.namespaceURI!=='http://www.w3.org/2000/svg'||(n!==owner&&(n as SVGElement).ownerSVGElement!==owner)||!styleIsUnmodified(n,view))return false
   seen.add(n);parents.set(n,n.parentNode);if(n===owner)break
   const p:ParentNode|null=n.parentNode;n=p&&p.nodeType===1?p as Element:null
  }
  if(n!==owner)return false
  const paint=view.getComputedStyle(prior)
  if(!opaqueRGB(paint.fill)||paint.fillRule!=='nonzero'||paint.stroke!=='none'||Number(paint.strokeOpacity)!==1||!['','none'].includes(paint.strokeDasharray)||!sameComputedD(paint.getPropertyValue('d').trim(),policy.predecessor.outline))return false
  return [...parents].every(([x,p])=>x.isConnected&&x.ownerDocument===doc&&x.parentNode===p)&&g.parentNode===pen&&pen.parentNode===outer&&outer.children.length===20&&outer.children[policy.pen-1]===pen&&pen.children.length===2&&pen.children[0]===prior&&pen.children[1]===g&&prior.getAttribute('d')===policy.predecessor.outline&&g.getAttribute('data-stroke-start-gate')===policy.id&&g.getAttribute('data-stroke-reveal-policy')===policy.kind&&g.getAttribute('data-u8609-union-point-fingerprint')===policy.proofFingerprint&&g.getAttribute('data-u8609-union-point-clip')===clipId
 }catch{return false}
}
export const REVIEWED_U8609_HKCS_UNION_POINT_SOURCE=freeze({glyph:'蘉',root:'hkcs_m8609',targets:[[11,2],[12,1],[18,2]],sourceCounts:{pens:20,masks:25,P:40},originalPCounts:[2,3,2],wholeSourceFactoryReused:true,nativePriorDOMGuaranteedByFactory:false,sameFrameAndOwnerDOMCheckRequired:true,originalQAndWidthAndWeightUnchanged:true,authorAnchorsNotOriginalQ0:true,authorClockNotOriginalTraversal:true,allPositivePConnected:true,compoundPriorOriginalHAndOpaqueDOMRequired:[11,18],initial18WindowInsideCompletedPrior:'0<p<87/637',source19Excluded:true,source19OtherFamiliesImpossible:false,oldGrowingPoliciesUnmodified:true,originalClockIdentityApproved:false,originalMicroDirectionApproved:false,sharedRendererConnected:false,nativeApproval:false,runtimeApplied:false})
export const REVIEWED_U8609_HKCS_UNION_POINT_INPUT_SHA256=Object.freeze({"docs/hanja-source-original-u8609-hkcs-2026-10-26/fixtures.json":"35a774f8c744cd0a6ccd4454221ce4f629860581434c57413696b830912e4ca6","lib/hanja-stroke-start-caps-u8609-hkcs.ts":"de9bdab530cc74ecf98ac21776ee8f604d7538ad47ea7e075bff6fa7330dad50","docs/hanja-source-original-u8609-hkcs-2026-10-26/verify-11-12-union-point-windows.py":"57ffa6245a3db0c0d3cae0962b9767fd14b18ed70abb49961e90dbda266b3b4c","docs/hanja-source-original-u8609-hkcs-2026-10-26/11-12-union-point-window-proof.json":"4cea6ff29c451c5f1cadeabd77a864cebbe5de1f074a708e88fd0c56a8cab1ba","docs/hanja-source-original-u8609-hkcs-2026-10-26/verify-18-19-union-point-kernels.py":"9d7e236ee764119b3da8caaeeba644a9d1115d4145312402c30c876711ab9b16","docs/hanja-source-original-u8609-hkcs-2026-10-26/18-19-union-point-kernel-proof.json":"0b6ccaf662f1e2b3368022807eb5f3c50fc1d2a2da445d4948b9856d9670641f","docs/hanja-source-original-u8609-hkcs-2026-10-26/paint-equivalence-proof.json":"844d5d6d9c6d7321daa3cd0c2a62ada60ac6784a396749788579e7de131889cb","docs/hanja-source-original-u8609-hkcs-2026-10-26/source-projection.json":"56717c0c63bb5091e3b0627345ba7696b30b38f27a33d56a2dc4a887653c7e86","docs/hanja-source-original-u8609-hkcs-2026-10-26/verify-early-wide-strips.py":"3f6c7371de515ae8908fd2d67a65e54fc6f88ec4179abd4c1f2a988cd32dbda8","docs/hanja-source-original-u8609-hkcs-2026-10-26/early-wide-strip-proof.json":"4e3819ca03bc49cc282b7c46ae2e6076e0b6f77dca503f839b23d3c93c654e8d"})
