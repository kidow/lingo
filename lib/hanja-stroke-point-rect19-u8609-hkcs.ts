/** 蘉19 source-specific rect intersection proof; not a common-kernel policy or a native approval. */
import fixture from '../docs/hanja-source-original-u8609-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU8609HkcsSourceContext,reviewedU8609HkcsContext} from './hanja-stroke-start-caps-u8609-hkcs.ts'
const FIXED=fixture.hkcs_m8609,STROKES=FIXED.strokes as HanjaOutlineStrokes
const CAPS_CONTEXT=makeReviewedU8609HkcsSourceContext(FIXED.fullProof,FIXED.identity,STROKES)
if(!CAPS_CONTEXT)throw Error('Exact 蘉 whole-bound source required')
function freeze<T>(v:T):T{if(v&&typeof v==='object'){for(const key of Reflect.ownKeys(v as object)){const d=Object.getOwnPropertyDescriptor(v,key);if(d&&'value'in d)freeze(d.value)}Object.freeze(v)}return v}
function same(a:unknown,b:unknown):boolean{
 if(Object.is(a,b))return true
 if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false
 const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false
 return bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&same(x.value,y.value)})
}
export type ReviewedU8609HkcsPointRect19Context=Readonly<{id:'u8609-hkcs-source19-point-rect'}>
export type ReviewedU8609HkcsPointRect19Policy=Readonly<{id:'u8609-hkcs-point-rect19-19-2';kind:'source-point-rect19-u8609-hkcs';pen:19;mask:2;segment:HanjaOutlineSegment;priorSegment:HanjaOutlineSegment;anchor:readonly[number,number];sourceBounds:readonly[number,number,number,number];proofFingerprint:string}>
const CONTEXT:ReviewedU8609HkcsPointRect19Context=Object.freeze({id:'u8609-hkcs-source19-point-rect'})
const POLICY:ReviewedU8609HkcsPointRect19Policy=freeze({id:'u8609-hkcs-point-rect19-19-2',kind:'source-point-rect19-u8609-hkcs',pen:19,mask:2,segment:STROKES[18][1],priorSegment:STROKES[18][0],anchor:[73.5,73]as const,sourceBounds:[31.85,69.55,80.15,93.45]as const,proofFingerprint:'5f93e2785dcb54ae159c0163a92f523dbb69ec57ddba992f727f202690b46fb3'})
const PRIVATE_POLICY=new WeakSet<object>([POLICY])
export function makeReviewedU8609HkcsPointRect19SourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU8609HkcsPointRect19Context|null{return makeReviewedU8609HkcsSourceContext(proof,identity,strokes)===CAPS_CONTEXT?CONTEXT:null}
export function reviewedU8609HkcsPointRect19Context(strokes:HanjaOutlineStrokes):ReviewedU8609HkcsPointRect19Context|null{return reviewedU8609HkcsContext(strokes)===CAPS_CONTEXT?CONTEXT:null}
export function reviewedU8609HkcsPointRect19Policy(context:ReviewedU8609HkcsPointRect19Context|null,pen:number,mask:number):ReviewedU8609HkcsPointRect19Policy|null{return context===CONTEXT&&pen===18&&mask===1?POLICY:null}
function privateSource(policy:ReviewedU8609HkcsPointRect19Policy,segment:HanjaOutlineSegment){if(!policy||!PRIVATE_POLICY.has(policy)||policy!==POLICY||!same(segment,POLICY.segment))throw Error('Private 蘉19 policy and exact original fields required')}
export type ReviewedU8609HkcsPointRect19Frame=Readonly<{policyId:string;progress:number;status:'empty'|'partial'|'complete';phase:'empty'|'source-point-rect19'|'full';visible:boolean;originalPDirect:boolean;outline:string|null;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;sourceGuide:string;sourceWidth:14;UARead:false;authorClock:'source-author-point-rect19';originalClockEquivalent:false}>
export function sampleReviewedU8609HkcsPointRect19Frame(policy:ReviewedU8609HkcsPointRect19Policy,segment:HanjaOutlineSegment,p:number,previousMaskProgress=0,priorOpaque=false):ReviewedU8609HkcsPointRect19Frame{
 privateSource(policy,segment)
 if(!Number.isFinite(p)||p<0||p>1||!Number.isFinite(previousMaskProgress)||previousMaskProgress<0||previousMaskProgress>1||typeof priorOpaque!=='boolean')throw Error('Exact unit progress required')
 if(p>0&&(previousMaskProgress!==1||!priorOpaque))throw Error('Exact completed opaque 蘉19 prior H required')
 const [ax,ay]=POLICY.anchor,[x0,y0,x1,y1]=POLICY.sourceBounds
 const clip=p>0&&p<1?Object.freeze({x:ax-(ax-x0)*p,y:ay-(ay-y0)*p,width:(x1-x0)*p,height:(y1-y0)*p}):null
 return Object.freeze({policyId:policy.id,progress:p,status:p===0?'empty':p===1?'complete':'partial',phase:p===0?'empty':p===1?'full':'source-point-rect19',visible:p>0,originalPDirect:p===1,outline:p===0?null:segment.outline,clip,sourceGuide:segment.revealPath!,sourceWidth:14,UARead:false,authorClock:'source-author-point-rect19',originalClockEquivalent:false})
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

/** g follows the sole completed original H in the exact19th source slot. No prior progress marker is inferred. */
export function verifyReviewedU8609HkcsPointRect19Prior(policy:ReviewedU8609HkcsPointRect19Policy,g:SVGGElement|null,previousMaskProgress:number):boolean{
 try{
  if(!policy||!PRIVATE_POLICY.has(policy)||policy!==POLICY||!g||previousMaskProgress!==1)return false
  privateSource(policy,POLICY.segment)
  const pen=g.parentNode,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,clipId=g.getAttribute('data-u8609-point-rect19-clip')
  if(!pen||pen.nodeType!==1||!owner||!view||view.document!==doc||owner.ownerDocument!==doc||!clipId||!/^[A-Za-z0-9_:.-]+$/.test(clipId)||!clipId.endsWith('-18-1')||clipId.length<=5)return false
  const group=pen as SVGGElement,prior=group.children[0]as SVGPathElement,outer=group.parentNode
  if(!outer||outer.nodeType!==1||!prior)return false
  const outlines=outer as SVGGElement
  const exact=()=>g.localName==='g'&&g.parentNode===group&&group.parentNode===outlines&&group.children.length===2&&group.children[0]===prior&&group.children[1]===g&&prior.localName==='path'&&prior.parentNode===group&&prior.getAttribute('d')===POLICY.priorSegment.outline&&prior.getAttribute('pathLength')===null&&prior.getAttribute('stroke-dasharray')===null&&prior.getAttribute('stroke-dashoffset')===null&&group.getAttribute('data-outline-stroke')==='19'&&outlines.getAttribute('data-stroke-outlines')==='true'&&outlines.children.length===20&&outlines.children[18]===group&&owner.getAttribute('viewBox')==='0 0 100 100'&&g.getAttribute('data-stroke-start-gate')===POLICY.id&&g.getAttribute('data-stroke-reveal-policy')===POLICY.kind&&g.getAttribute('data-u8609-point-rect19-fingerprint')===POLICY.proofFingerprint&&g.getAttribute('data-u8609-point-rect19-clip')===clipId
  if(!exact())return false
  const nodes:Element[]=[g,prior],parents=new Map<Element,ParentNode|null>(),seen=new Set<Element>();let n:Element|null=group
  while(n){if(seen.has(n))return false;seen.add(n);nodes.push(n);if(n===owner)break;const p:ParentNode|null=n.parentNode;n=p&&p.nodeType===1?p as Element:null}
  if(n!==owner)return false
  const validNode=(node:Element)=>node.isConnected&&node.ownerDocument===doc&&node.namespaceURI==='http://www.w3.org/2000/svg'&&(node===owner||(node as SVGElement).ownerSVGElement===owner)&&styleIsUnmodified(node,view)
  for(const node of nodes){parents.set(node,node.parentNode);if(!validNode(node))return false}
  const paint=view.getComputedStyle(prior)
  if(paint.fillRule!=='nonzero'||paint.stroke!=='none'||Number(paint.strokeOpacity)!==1||!opaqueRGB(paint.fill)||!sameComputedD(paint.getPropertyValue('d').trim(),POLICY.priorSegment.outline))return false
  return doc.defaultView===view&&view.document===doc&&nodes.every(validNode)&&[...parents].every(([node,parent])=>node.parentNode===parent)&&exact()
 }catch{return false}
}
export const REVIEWED_U8609_HKCS_POINT_RECT19_SOURCE=freeze({glyph:'蘉',root:'hkcs_m8609',pen:19,mask:2,sourceP:2,authorAnchor:[73.5,73],sourceBounds:[31.85,69.55,80.15,93.45],sourceCommonKernel:false,sourceSpecificFiniteRectProof:true,eventCount:84,closedPositiveStates:83,openIntervals:83,positiveAreaComponentsAllOne:true,pointOnlyOrLineOnlyBoundary:0,strictHeadAndPriorBoxHalfWidth:'1/4',positivePriorAreaLowerCoefficient:'1/4',initialDiameterSquaredUpperBoundCoefficient:'29041/10',nativeBoundaryCandidates:['79/1249','5389/5407'],sourcePOrQOrWidth14OrWeightChanged:false,originalClockEquivalent:false,priorOpaqueDOMRequired:true,sharedRendererConnected:false,nativeApproval:false,runtimeApplied:false})
export const REVIEWED_U8609_HKCS_POINT_RECT19_INPUT_SHA256=Object.freeze({"docs/hanja-source-original-u8609-hkcs-2026-10-26/fixtures.json":"35a774f8c744cd0a6ccd4454221ce4f629860581434c57413696b830912e4ca6","lib/hanja-stroke-start-caps-u8609-hkcs.ts":"de9bdab530cc74ecf98ac21776ee8f604d7538ad47ea7e075bff6fa7330dad50","docs/hanja-source-original-u8609-hkcs-2026-10-26/19-point-rect-conditions-proof.json":"5f93e2785dcb54ae159c0163a92f523dbb69ec57ddba992f727f202690b46fb3","docs/hanja-source-original-u8609-hkcs-2026-10-26/verify-19-point-rect-conditions.py":"62074465d2fab4f05ff58a6a749f6c7cbd95770e11ac422312ceeaae9b09e93b"})
