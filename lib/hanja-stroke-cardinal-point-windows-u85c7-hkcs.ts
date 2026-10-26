/** Original 藇11m2/13m2 P2 unions; exact completed-H kernels and author point clocks. */
import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU85c7HkcsSourceContext,type ReviewedU85c7HkcsContext} from './hanja-stroke-start-caps-u85c7-hkcs.ts'
import fixture from '../docs/hanja-source-original-u85c7-hkcs-2026-10-26/fixtures.json' with {type:'json'}
const FIXED=fixture.hkcs_m85c7,STROKES=FIXED.strokes as HanjaOutlineStrokes
function freeze<T>(v:T):T{if(v&&typeof v==='object'){for(const d of Object.values(Object.getOwnPropertyDescriptors(v)))if('value'in d)freeze(d.value);Object.freeze(v)}return v}
freeze(FIXED)
function same(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&same(x.value,y.value)})}
const SOURCE_CONTEXT=makeReviewedU85c7HkcsSourceContext(FIXED.fullProof,FIXED.identity,STROKES)
if(!SOURCE_CONTEXT)throw Error('Exact original 藇 whole18 source factory required')
export type ReviewedU85c7HkcsCardinalPointPolicy=Readonly<{id:string;kind:'source-cardinal-point-window-u85c7-hkcs';segment:HanjaOutlineSegment;predecessor:HanjaOutlineSegment;pen:11|13;mask:2;proofFingerprint:string;anchor:readonly[number,number];extents:readonly[number,number,number,number];priorFirstOutsideProgress:number;originalArgs:readonly number[]}>
const POLICIES:readonly ReviewedU85c7HkcsCardinalPointPolicy[]=Object.freeze([
 Object.freeze({id:'u85c7-hkcs-cardinal-point-window-11-2',kind:'source-cardinal-point-window-u85c7-hkcs' as const,segment:STROKES[10][1],predecessor:STROKES[10][0],pen:11 as const,mask:2 as const,proofFingerprint:'b54baf1df7be9ff22753aef737165d789f260f0512e4d15e5bf0587839de552c',anchor:Object.freeze([111/2,923/20] as const),extents:Object.freeze([3/2,7,7/2,107/4] as const),priorFirstOutsideProgress:4/107,originalArgs:Object.freeze([...FIXED.fullProof.trace[7][0].args])}),
 Object.freeze({id:'u85c7-hkcs-cardinal-point-window-13-2',kind:'source-cardinal-point-window-u85c7-hkcs' as const,segment:STROKES[12][1],predecessor:STROKES[12][0],pen:13 as const,mask:2 as const,proofFingerprint:'b54baf1df7be9ff22753aef737165d789f260f0512e4d15e5bf0587839de552c',anchor:Object.freeze([159/2,617/20] as const),extents:Object.freeze([3/2,7,7/2,841/20] as const),priorFirstOutsideProgress:20/841,originalArgs:Object.freeze([...FIXED.fullProof.trace[16][0].args])})
])
export function makeReviewedU85c7HkcsCardinalPointSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU85c7HkcsContext|null{if(arguments.length!==3)return null;const c=makeReviewedU85c7HkcsSourceContext(proof,identity,strokes);return c===SOURCE_CONTEXT?c:null}
export function reviewedU85c7HkcsCardinalPointPolicy(context:ReviewedU85c7HkcsContext|null,pen:number,mask:number):ReviewedU85c7HkcsCardinalPointPolicy|null{return context===SOURCE_CONTEXT&&mask===1?POLICIES.find(p=>p.pen===pen+1)||null:null}
export type ReviewedU85c7HkcsCardinalPointFrame=Readonly<{policyId:string;progress:number;phase:'empty'|'source-cardinal-point-window'|'full';visible:boolean;originalPDirect:boolean;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;originalLine:string;segmentGuideAdded:false;authorAnchorDifferentFromSourceQ0:true;requiresPreviousMask:true;UARead:false}>
export function sampleReviewedU85c7HkcsCardinalPointFrame(policy:ReviewedU85c7HkcsCardinalPointPolicy,segment:HanjaOutlineSegment,p:number,previousMaskProgress=0,priorOpaque=false):ReviewedU85c7HkcsCardinalPointFrame{
 if(!privatePolicy(policy)||!same(segment,policy.segment))throw Error('Private original 藇 cardinal P/Q/width/weight required')
 if(!Number.isFinite(p)||p<0||p>1)throw Error('Finite authored 藇 cardinal point-window progress required')
 if(!Number.isFinite(previousMaskProgress)||previousMaskProgress<0||previousMaskProgress>1)throw Error('Finite original prior progress required')
 if(p>0&&(previousMaskProgress!==1||priorOpaque!==true))throw Error('Same-frame completed opaque original H required')
 const [ax,ay]=policy.anchor,[left,right,up,down]=policy.extents
 const clip=p===0||p===1?null:Object.freeze({x:ax-left*p,y:ay-up*p,width:(left+right)*p,height:(up+down)*p})
 const a=policy.originalArgs
 return Object.freeze({policyId:policy.id,progress:p,phase:p===0?'empty':p===1?'full':'source-cardinal-point-window',visible:p!==0,originalPDirect:p===1,clip,originalLine:'M'+a[0]/2+' '+a[1]/2+' L'+a[2]/2+' '+a[3]/2,segmentGuideAdded:false,authorAnchorDifferentFromSourceQ0:true,requiresPreviousMask:true,UARead:false})
}
function privatePolicy(p:ReviewedU85c7HkcsCardinalPointPolicy){return POLICIES.includes(p)}
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
/** Exact completed source H and target in the same original18-pen slot, owner and frame. */
export function verifyReviewedU85c7HkcsCardinalPointPriorDOM(policy:ReviewedU85c7HkcsCardinalPointPolicy,g:SVGGElement|null,previousMaskProgress:number):boolean{
 try{
  if(!privatePolicy(policy)||!policy.predecessor||policy.mask!==2||![11,13].includes(policy.pen)||previousMaskProgress!==1||!g||g.localName!=='g'||!g.isConnected)return false
  if(g.getAttribute('data-stroke-start-gate')!==policy.id||g.getAttribute('data-stroke-reveal-policy')!==policy.kind||g.getAttribute('data-u85c7-cardinal-point-fingerprint')!==policy.proofFingerprint)return false
  const clipId=g.getAttribute('data-u85c7-cardinal-point-clip'),tail='-'+(policy.pen-1)+'-'+(policy.mask-1)
  if(!clipId||!/^[A-Za-z0-9_:.-]+$/.test(clipId)||!clipId.endsWith(tail))return false
  const owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,parent=g.parentNode
  if(!owner||!view||view.document!==doc||owner.ownerDocument!==doc||!owner.isConnected||owner.getAttribute('viewBox')!=='0 0 100 100'||!parent||parent.nodeType!==1)return false
  const pen=parent as SVGGElement,outerNode=pen.parentNode
  if(pen.namespaceURI!=='http://www.w3.org/2000/svg'||pen.localName!=='g'||pen.ownerSVGElement!==owner||pen.getAttribute('data-outline-stroke')!==String(policy.pen)||!outerNode||outerNode.nodeType!==1)return false
  const outer=outerNode as SVGGElement
  if(outer.getAttribute('data-stroke-outlines')!=='true'||outer.children.length!==18||outer.children[policy.pen-1]!==pen||pen.children.length!==2||pen.children[1]!==g||pen.children[0].localName!=='path')return false
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
  return [...parents].every(([x,p])=>x.isConnected&&x.ownerDocument===doc&&x.parentNode===p)&&g.parentNode===pen&&pen.parentNode===outer&&outer.children.length===18&&outer.children[policy.pen-1]===pen&&pen.children.length===2&&pen.children[0]===prior&&pen.children[1]===g&&prior.getAttribute('d')===policy.predecessor.outline&&g.getAttribute('data-stroke-start-gate')===policy.id&&g.getAttribute('data-stroke-reveal-policy')===policy.kind&&g.getAttribute('data-u85c7-cardinal-point-fingerprint')===policy.proofFingerprint&&g.getAttribute('data-u85c7-cardinal-point-clip')===clipId
 }catch{return false}
}
export const REVIEWED_U85C7_HKCS_CARDINAL_POINT_SOURCE=freeze({"glyph":"藇","root":"hkcs_m85c7","targets":[{"pen":11,"mask":2,"sourceRaw":8,"originalP":2,"originalCardinalArgs":[114,92.35,114,143.87,22,32],"anchor":["111/2","923/20"],"strictCommonKernelBoxHalfWidth":"1/2","extents":["3/2","7","7/2","107/4"],"completedPriorH":{"outline":"M43 45.15 L57 45.15 L57 47.15 L43 47.15 Z","bounds":[43,45.15,57,47.15],"direction":"right","weight":14},"priorFirstOutsideProgress":"4/107"},{"pen":13,"mask":2,"sourceRaw":17,"originalP":2,"originalCardinalArgs":[162,61.760000000000005,162,143.87,22,32],"anchor":["159/2","617/20"],"strictCommonKernelBoxHalfWidth":"1/2","extents":["3/2","7","7/2","841/20"],"completedPriorH":{"outline":"M64 29.85 L81 29.85 L81 31.85 L64 31.85 Z","bounds":[64,29.85,81,31.85],"direction":"right","weight":17},"priorFirstOutsideProgress":"20/841"}],"sourceGuideAdded":false,"originalQOrPOrWidthOrWeightChanged":false,"p0Hidden":true,"p1OriginalPDirect":true,"allPositivePConnected":true,"allPositivePPriorContact":true,"bothAxesShrinkTo0":true,"authorClockIsOriginalQTraversal":false,"sourceFactoryDoesNotGuaranteePriorDOM":true,"originalMicroDirectionApproved":false,"nativeApproval":false,"runtimeApplied":false})
export const REVIEWED_U85C7_HKCS_CARDINAL_POINT_INPUT_SHA256=Object.freeze({"docs/hanja-source-original-u85c7-hkcs-2026-10-26/fixtures.json":"fbb7b817d68a9c1a70064f8ab31b49237dbdfbc0ab69e33b6f77f5dd9aa0aed1","lib/hanja-stroke-start-caps-u85c7-hkcs.ts":"00e766d93b46a6155dd242d4098bd554fe56e6db7882cd7e7f0fa782e484e6d4","docs/hanja-source-original-u85c7-hkcs-2026-10-26/verify-11-13-cardinal-point-kernels.py":"32e3243d6b1ec59d5f511bed993c59a53f450454e34685312e5db6af1c2b36e7","docs/hanja-source-original-u85c7-hkcs-2026-10-26/11-13-cardinal-point-kernels-proof.json":"b54baf1df7be9ff22753aef737165d789f260f0512e4d15e5bf0587839de552c","docs/hanja-source-original-u85c7-hkcs-2026-10-26/paint-and-compound-contacts-proof.json":"145b66073163a60abd737344d6204a92a5b34eafa37bc954034fbd31a8f5eebe","docs/hanja-source-original-u85c7-hkcs-2026-10-26/source-projection.json":"23b24b8ca60e6fb37e7df88655881133df76924db70d626de4deca1cfc97ea8a"})
