/** 慅4 source-specific rect intersection proof; not a common-kernel policy or a native approval. */
import fixture from '../docs/hanja-source-original-u6145-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU6145HkcsSourceContext} from './hanja-stroke-start-caps-u6145-hkcs.ts'
const FIXED=fixture.hkcs_m6145,STROKES=FIXED.strokes as HanjaOutlineStrokes
const CAPS_CONTEXT=makeReviewedU6145HkcsSourceContext(FIXED.fullProof,FIXED.identity,STROKES)
if(!CAPS_CONTEXT)throw Error('Exact 慅 whole-bound source required')
function freeze<T>(v:T):T{if(v&&typeof v==='object'){for(const key of Reflect.ownKeys(v as object)){const d=Object.getOwnPropertyDescriptor(v,key);if(d&&'value'in d)freeze(d.value)}Object.freeze(v)}return v}
function same(a:unknown,b:unknown):boolean{
 if(Object.is(a,b))return true
 if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false
 const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false
 return bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&same(x.value,y.value)})
}
export type ReviewedU6145HkcsPointRect4Context=Readonly<{id:'u6145-hkcs-source4-point-rect'}>
export type ReviewedU6145HkcsPointRect4Policy=Readonly<{id:'u6145-hkcs-point-rect4-4-2';kind:'source-point-rect4-u6145-hkcs';pen:4;mask:2;segment:HanjaOutlineSegment;priorSegment:HanjaOutlineSegment;anchor:readonly[number,number];sourceBounds:readonly[number,number,number,number];proofFingerprint:string}>
const CONTEXT:ReviewedU6145HkcsPointRect4Context=Object.freeze({id:'u6145-hkcs-source4-point-rect'})
const POLICY:ReviewedU6145HkcsPointRect4Policy=freeze({id:'u6145-hkcs-point-rect4-4-2',kind:'source-point-rect4-u6145-hkcs',pen:4,mask:2,segment:STROKES[3][1],priorSegment:STROKES[3][0],anchor:[78.5,14]as const,sourceBounds:[32.8,10.5,85.2,51.4]as const,proofFingerprint:'ec9cb762bd8b3bbb49ca59b65e92d1169c6adf09fc4c4ae082101dd36458c413'})
const PRIVATE_POLICY=new WeakSet<object>([POLICY])
export function makeReviewedU6145HkcsPointRect4SourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU6145HkcsPointRect4Context|null{return makeReviewedU6145HkcsSourceContext(proof,identity,strokes)===CAPS_CONTEXT?CONTEXT:null}
export function reviewedU6145HkcsPointRect4Policy(context:ReviewedU6145HkcsPointRect4Context|null,pen:number,mask:number):ReviewedU6145HkcsPointRect4Policy|null{return context===CONTEXT&&pen===3&&mask===1?POLICY:null}
function privateSource(policy:ReviewedU6145HkcsPointRect4Policy,segment:HanjaOutlineSegment){if(!policy||!PRIVATE_POLICY.has(policy)||policy!==POLICY||!same(segment,POLICY.segment))throw Error('Private 慅4 policy and exact original fields required')}
export type ReviewedU6145HkcsPointRect4Frame=Readonly<{policyId:string;progress:number;status:'empty'|'partial'|'complete';phase:'empty'|'source-point-rect4'|'full';visible:boolean;originalPDirect:boolean;outline:string|null;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;sourceGuide:string;sourceWidth:14;UARead:false;authorClock:'source-author-point-rect4';originalClockEquivalent:false}>
export function sampleReviewedU6145HkcsPointRect4Frame(policy:ReviewedU6145HkcsPointRect4Policy,segment:HanjaOutlineSegment,p:number,previousMaskProgress=0,priorOpaque=false):ReviewedU6145HkcsPointRect4Frame{
 privateSource(policy,segment)
 if(!Number.isFinite(p)||p<0||p>1||!Number.isFinite(previousMaskProgress)||previousMaskProgress<0||previousMaskProgress>1||typeof priorOpaque!=='boolean')throw Error('Exact unit progress required')
 if(p>0&&(previousMaskProgress!==1||!priorOpaque))throw Error('Exact completed opaque 慅4 prior H required')
 const [ax,ay]=POLICY.anchor,[x0,y0,x1,y1]=POLICY.sourceBounds
 const clip=p>0&&p<1?Object.freeze({x:ax-(ax-x0)*p,y:ay-(ay-y0)*p,width:(x1-x0)*p,height:(y1-y0)*p}):null
 return Object.freeze({policyId:policy.id,progress:p,status:p===0?'empty':p===1?'complete':'partial',phase:p===0?'empty':p===1?'full':'source-point-rect4',visible:p>0,originalPDirect:p===1,outline:p===0?null:segment.outline,clip,sourceGuide:segment.revealPath!,sourceWidth:14,UARead:false,authorClock:'source-author-point-rect4',originalClockEquivalent:false})
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

/** g follows the sole completed original H in the exact4th source slot. No prior progress marker is inferred. */
export function verifyReviewedU6145HkcsPointRect4Prior(policy:ReviewedU6145HkcsPointRect4Policy,g:SVGGElement|null,previousMaskProgress:number):boolean{
 try{
  if(!policy||!PRIVATE_POLICY.has(policy)||policy!==POLICY||!g||previousMaskProgress!==1)return false
  privateSource(policy,POLICY.segment)
  const pen=g.parentNode,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,clipId=g.getAttribute('data-u6145-point-rect4-clip')
  if(!pen||pen.nodeType!==1||!owner||!view||view.document!==doc||owner.ownerDocument!==doc||!clipId||!/^[A-Za-z0-9_:.-]+$/.test(clipId)||!clipId.endsWith('-3-1')||clipId.length<=5)return false
  const group=pen as SVGGElement,prior=group.children[0]as SVGPathElement,outer=group.parentNode
  if(!outer||outer.nodeType!==1||!prior)return false
  const outlines=outer as SVGGElement
  const exact=()=>g.localName==='g'&&g.parentNode===group&&group.parentNode===outlines&&group.children.length===2&&group.children[0]===prior&&group.children[1]===g&&prior.localName==='path'&&prior.parentNode===group&&prior.getAttribute('d')===POLICY.priorSegment.outline&&prior.getAttribute('pathLength')===null&&prior.getAttribute('stroke-dasharray')===null&&prior.getAttribute('stroke-dashoffset')===null&&group.getAttribute('data-outline-stroke')==='4'&&outlines.getAttribute('data-stroke-outlines')==='true'&&outlines.children.length===13&&outlines.children[3]===group&&owner.getAttribute('viewBox')==='0 0 100 100'&&g.getAttribute('data-stroke-start-gate')===POLICY.id&&g.getAttribute('data-stroke-reveal-policy')===POLICY.kind&&g.getAttribute('data-u6145-point-rect4-fingerprint')===POLICY.proofFingerprint&&g.getAttribute('data-u6145-point-rect4-clip')===clipId
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
export const REVIEWED_U6145_HKCS_POINT_RECT4_SOURCE=freeze({glyph:'慅',root:'hkcs_m6145',pen:4,mask:2,sourceP:2,authorAnchor:[78.5,14],sourceBounds:[32.8,10.5,85.2,51.4],sourceCommonKernel:false,sourceSpecificFiniteRectProof:true,eventCount:89,closedPositiveStates:88,openIntervals:88,positiveAreaComponentsAllOne:true,pointOnlyOrLineOnlyBoundary:0,strictHeadAndPriorBoxHalfWidth:'1/4',positivePriorAreaLowerCoefficient:'1/4',initialDiameterSquaredUpperBoundCoefficient:'441857/100',sourcePOrQOrWidth14OrWeightChanged:false,originalClockEquivalent:false,priorOpaqueDOMRequired:true,sharedRendererConnected:false,nativeApproval:false,runtimeApplied:false})
export const REVIEWED_U6145_HKCS_POINT_RECT4_INPUT_SHA256=Object.freeze({"docs/hanja-source-original-u6145-hkcs-2026-10-26/fixtures.json":"1e1fd8df28591095a09018740222d9a9e2ccd0b6255a6fe545d87967116b1546","lib/hanja-stroke-start-caps-u6145-hkcs.ts":"43d5d1e904c02a7804da17476373789ef89a3f51c17a5697fae31f4f86e803a7","docs/hanja-source-original-u6145-hkcs-2026-10-26/4-point-rect-conditions-proof.json":"ec9cb762bd8b3bbb49ca59b65e92d1169c6adf09fc4c4ae082101dd36458c413","docs/hanja-source-original-u6145-hkcs-2026-10-26/verify-4-point-rect-conditions.py":"896a3e19c880e3fff0746d8aba985575959f52b2f0b6c67925be1401f6d1f568"})
