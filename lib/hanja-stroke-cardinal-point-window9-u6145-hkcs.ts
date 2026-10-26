/** Original 慅9m2 cardinal P2 union; prior-H common kernel and author point clock. */
import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU6145HkcsSourceContext,type ReviewedU6145HkcsContext} from './hanja-stroke-start-caps-u6145-hkcs.ts'
import fixture from '../docs/hanja-source-original-u6145-hkcs-2026-10-26/fixtures.json' with {type:'json'}
const FIXED=fixture.hkcs_m6145,STROKES=FIXED.strokes as HanjaOutlineStrokes
function freeze<T>(v:T):T{if(v&&typeof v==='object'){for(const d of Object.values(Object.getOwnPropertyDescriptors(v)))if('value'in d)freeze(d.value);Object.freeze(v)}return v}
freeze(FIXED)
function same(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&same(x.value,y.value)})}
const SOURCE_CONTEXT=makeReviewedU6145HkcsSourceContext(FIXED.fullProof,FIXED.identity,STROKES)
if(!SOURCE_CONTEXT)throw Error('Exact original 慅 whole13 source factory required')
const AX=317/4,AY=55
export type ReviewedU6145HkcsCardinalPoint9Policy=Readonly<{id:'u6145-hkcs-cardinal-point-window-9-2';kind:'source-cardinal-point-window-u6145-hkcs';segment:HanjaOutlineSegment;predecessor:HanjaOutlineSegment;pen:9;mask:2;proofFingerprint:string;anchor:readonly[number,number]}>
const POLICY:ReviewedU6145HkcsCardinalPoint9Policy=Object.freeze({id:'u6145-hkcs-cardinal-point-window-9-2',kind:'source-cardinal-point-window-u6145-hkcs',segment:STROKES[8][1],predecessor:STROKES[8][0],pen:9,mask:2,proofFingerprint:"ff32a5efbf0e6a2db1409464fc43ae319c4135063caada5f50d110fb1558e690",anchor:Object.freeze([AX,AY] as const)})
export function makeReviewedU6145HkcsCardinalPoint9SourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU6145HkcsContext|null{const c=makeReviewedU6145HkcsSourceContext(proof,identity,strokes);return c===SOURCE_CONTEXT?c:null}
export function reviewedU6145HkcsCardinalPoint9Policy(context:ReviewedU6145HkcsContext|null,pen:number,mask:number):ReviewedU6145HkcsCardinalPoint9Policy|null{return context===SOURCE_CONTEXT&&pen===8&&mask===1?POLICY:null}
export type ReviewedU6145HkcsCardinalPoint9Frame=Readonly<{policyId:string;progress:number;phase:'empty'|'source-cardinal-point-window'|'full';visible:boolean;originalPDirect:boolean;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;originalLine:string;segmentGuideAdded:false;authorAnchorDifferentFromSourceQ0:true;requiresPreviousMask:true;UARead:false}>
export function sampleReviewedU6145HkcsCardinalPoint9Frame(policy:ReviewedU6145HkcsCardinalPoint9Policy,segment:HanjaOutlineSegment,p:number,previousMaskProgress=0,priorOpaque=false):ReviewedU6145HkcsCardinalPoint9Frame{
 if(policy!==POLICY||!same(segment,POLICY.segment))throw Error('Private original 慅9 cardinal P/Q/width/weight required')
 if(!Number.isFinite(p)||p<0||p>1)throw Error('Finite authored 慅9 cardinal point-window progress required')
 if(!Number.isFinite(previousMaskProgress)||previousMaskProgress<0||previousMaskProgress>1)throw Error('Finite original prior progress required')
 if(p>0&&(previousMaskProgress!==1||priorOpaque!==true))throw Error('Same-frame completed opaque original H required')
 const clip=p===0||p===1?null:Object.freeze({x:AX-1.5*p,y:AY-3.5*p,width:8.5*p,height:22*p})
 return Object.freeze({policyId:policy.id,progress:p,phase:p===0?'empty':p===1?'full':'source-cardinal-point-window',visible:p!==0,originalPDirect:p===1,clip,originalLine:'M80.76 55 L80.76 72.5',segmentGuideAdded:false,authorAnchorDifferentFromSourceQ0:true,requiresPreviousMask:true,UARead:false})
}
function privatePolicy(p:ReviewedU6145HkcsCardinalPoint9Policy){return p===POLICY}
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
/** Only9m2: exact direct completed H followed by this target in its original13-pen slot. */
export function verifyReviewedU6145HkcsCardinalPoint9PriorDOM(policy:ReviewedU6145HkcsCardinalPoint9Policy,g:SVGGElement|null,previousMaskProgress:number):boolean{
 try{
  if(!privatePolicy(policy)||!policy.predecessor||policy.mask!==2||![9].includes(policy.pen)||previousMaskProgress!==1||!g||g.localName!=='g'||!g.isConnected)return false
  if(g.getAttribute('data-stroke-start-gate')!==policy.id||g.getAttribute('data-stroke-reveal-policy')!==policy.kind||g.getAttribute('data-u6145-cardinal-point-fingerprint')!==policy.proofFingerprint)return false
  const clipId=g.getAttribute('data-u6145-cardinal-point-clip'),tail='-'+(policy.pen-1)+'-'+(policy.mask-1)
  if(!clipId||!/^[A-Za-z0-9_:.-]+$/.test(clipId)||!clipId.endsWith(tail))return false
  const owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,parent=g.parentNode
  if(!owner||!view||view.document!==doc||owner.ownerDocument!==doc||!owner.isConnected||owner.getAttribute('viewBox')!=='0 0 100 100'||!parent||parent.nodeType!==1)return false
  const pen=parent as SVGGElement,outerNode=pen.parentNode
  if(pen.namespaceURI!=='http://www.w3.org/2000/svg'||pen.localName!=='g'||pen.ownerSVGElement!==owner||pen.getAttribute('data-outline-stroke')!==String(policy.pen)||!outerNode||outerNode.nodeType!==1)return false
  const outer=outerNode as SVGGElement
  if(outer.getAttribute('data-stroke-outlines')!=='true'||outer.children.length!==13||outer.children[policy.pen-1]!==pen||pen.children.length!==2||pen.children[1]!==g||pen.children[0].localName!=='path')return false
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
  return [...parents].every(([x,p])=>x.isConnected&&x.ownerDocument===doc&&x.parentNode===p)&&g.parentNode===pen&&pen.parentNode===outer&&outer.children.length===13&&outer.children[policy.pen-1]===pen&&pen.children.length===2&&pen.children[0]===prior&&pen.children[1]===g&&prior.getAttribute('d')===policy.predecessor.outline&&g.getAttribute('data-stroke-start-gate')===policy.id&&g.getAttribute('data-stroke-reveal-policy')===policy.kind&&g.getAttribute('data-u6145-cardinal-point-fingerprint')===policy.proofFingerprint&&g.getAttribute('data-u6145-cardinal-point-clip')===clipId
 }catch{return false}
}
export const REVIEWED_U6145_HKCS_CARDINAL_POINT9_SOURCE=freeze({"glyph":"慅","root":"hkcs_m6145","pen":9,"mask":2,"sourceRaw":11,"originalP":2,"originalCardinalArgs":[161.52,110,161.52,145,22,32],"originalSegmentHasNoRevealPath":true,"originalSegmentHasNoRevealWidth":true,"sourceGuideAdded":false,"anchor":[79.25,55],"strictCommonKernelBoxHalfWidth":"1/2","sourceOriginalQStart":[80.76,55],"authorAnchorIsOriginalQStart":false,"requiresCompletedOriginalPriorH":true,"actualSameOwnerPriorOpaqueDOMRequired":true,"sourceFactoryDoesNotGuaranteePriorDOM":true,"p0Hidden":true,"p1OriginalPDirect":true,"allPositivePConnected":true,"allPositivePPriorContact":true,"bothAxesShrinkTo0":true,"oldCardinalSeparatedWedgePreserved":true,"sourcePOrQOrWidthOrWeightChanged":false,"originalClockIdentityApproved":false,"originalMicroDirectionApproved":false,"nativeApproval":false,"runtimeApplied":false})
export const REVIEWED_U6145_HKCS_CARDINAL_POINT9_INPUT_SHA256=Object.freeze({"docs/hanja-source-original-u6145-hkcs-2026-10-26/fixtures.json":"1e1fd8df28591095a09018740222d9a9e2ccd0b6255a6fe545d87967116b1546","lib/hanja-stroke-start-caps-u6145-hkcs.ts":"43d5d1e904c02a7804da17476373789ef89a3f51c17a5697fae31f4f86e803a7","docs/hanja-source-original-u6145-hkcs-2026-10-26/verify-9-cardinal-initial-and-kernel.py":"342e5f031125121b0f6a3f73931aba457cbbe867143a1606d761d944174e42b2","docs/hanja-source-original-u6145-hkcs-2026-10-26/9-cardinal-initial-and-kernel-proof.json":"ff32a5efbf0e6a2db1409464fc43ae319c4135063caada5f50d110fb1558e690","docs/hanja-source-original-u6145-hkcs-2026-10-26/paint-and-compound-contacts-proof.json":"1721dbba5fc4fc5303abfee84a66083686c96155e08336442e45b5df492fbc8a","docs/hanja-source-original-u6145-hkcs-2026-10-26/source-projection.json":"6284ce469aee17eee08aacc3a2119b76f876cc5d2f48dce3110f9fefaaed1db3"})
