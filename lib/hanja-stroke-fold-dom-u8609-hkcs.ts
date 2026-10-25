/** Source-bound completed priorH predicate for original 蘉 folds6/14; actual integration pending. */
import {measureReviewedU8609FoldFrame,type ReviewedU8609FoldPolicy} from './hanja-stroke-fold-u8609-hkcs.ts'

function plainValue(value:object,key:string):unknown{
 const d=Object.getOwnPropertyDescriptor(value,key)
 return d&&d.enumerable&&'value'in d?d.value:undefined
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
function exactReviewedU8609FoldOpaque(priorInk:SVGPathElement,penGroup:SVGGElement,owner:SVGSVGElement,ownerId:string,expectedD:string,priorProgress:number,penNumber:6|14):boolean{
 const doc=owner.ownerDocument,view=doc.defaultView,ns='http://www.w3.org/2000/svg'
 if(!view||view.document!==doc||priorProgress!==1||!expectedD||!/^[A-Za-z0-9_:.-]+$/.test(ownerId))return false
 if(!owner.isConnected||owner.namespaceURI!==ns||owner.getAttribute('viewBox')!=='0 0 100 100'||penGroup.localName!=='g')return false
 if(priorInk.localName!=='path'||priorInk.parentNode!==penGroup||priorInk.ownerSVGElement!==owner||penGroup.ownerSVGElement!==owner||priorInk.getAttribute('d')!==expectedD||priorInk.getAttribute('pathLength')!==null)return false
 if([priorInk,penGroup].some(n=>n.getAttribute('data-u8609-fold-owner')!==ownerId||n.getAttribute('data-u8609-fold-pen')!==String(penNumber))||priorInk.getAttribute('data-u8609-fold-mask')!=='1'||priorInk.getAttribute('data-u8609-fold-progress')!=='1')return false
 const parents=new Map<Element,ParentNode|null>(),seen=new Set<Element>();let node:Element|null=priorInk
 while(node){
  if(seen.has(node)||!node.isConnected||node.ownerDocument!==doc||node.namespaceURI!==ns||(node!==owner&&(node as SVGElement).ownerSVGElement!==owner)||!styleIsUnmodified(node,view))return false
  seen.add(node);parents.set(node,node.parentNode)
  if(node===owner)break
  const parent:ParentNode|null=node.parentNode
  node=parent&&parent.nodeType===1?parent as Element:null
 }
 if(node!==owner)return false
 const paint=view.getComputedStyle(priorInk)
 if(paint.fillRule!=='nonzero'||paint.stroke!=='none'||Number(paint.strokeOpacity)!==1||!opaqueRGB(paint.fill)||!sameComputedD(paint.getPropertyValue('d').trim(),expectedD))return false
 return doc.defaultView===view&&view.document===doc&&[...parents].every(([n,p])=>n.isConnected&&n.ownerDocument===doc&&n.parentNode===p)&&priorInk.parentNode===penGroup&&priorInk.getAttribute('d')===expectedD&&priorInk.getAttribute('data-u8609-fold-progress')==='1'
}
/** g is the second direct child of its own20-pen source slot, after exact opaque priorH. */
export function verifyReviewedU8609FoldPriorDOM(policy:ReviewedU8609FoldPolicy,g:SVGGElement|null,previousProgress:number):boolean{
 try{
  if(!policy||typeof policy!=='object'||!g||previousProgress!==1)return false
  const segment=plainValue(policy,'segment'),prior=plainValue(policy,'priorSegment'),spec=plainValue(policy,'spec')
  if(!segment||!prior||!spec||typeof spec!=='object')return false
  const frame=measureReviewedU8609FoldFrame(policy,segment as ReviewedU8609FoldPolicy['segment'],prior as ReviewedU8609FoldPolicy['priorSegment'],0,false)
  const penNumber=plainValue(spec,'pen')
  if((penNumber!==6&&penNumber!==14)||plainValue(spec,'mask')!==2||plainValue(spec,'priorMask')!==1||frame.status!=='empty'||g.localName!=='g'||g.getAttribute('data-stroke-start-gate')!==plainValue(policy,'id')||g.getAttribute('data-stroke-reveal-policy')!==plainValue(policy,'kind'))return false
  const clipId=g.getAttribute('data-u8609-hkcs-fold-clip'),suffix='-'+(penNumber-1)+'-1'
  if(!clipId||!/^[A-Za-z0-9_:.-]+$/.test(clipId)||!clipId.endsWith(suffix)||clipId.length<=suffix.length)return false
  const ownerId=clipId.slice(0,-suffix.length)+'-u8609-fold-'+penNumber,pen=g.parentNode,owner=g.ownerSVGElement
  if(!pen||pen.nodeType!==1||!owner||!g.isConnected||g.ownerDocument!==owner.ownerDocument||g.namespaceURI!=='http://www.w3.org/2000/svg')return false
  const group=pen as SVGGElement,children=group.children,outer=group.parentNode,view=owner.ownerDocument.defaultView
  if(!outer||outer.nodeType!==1||!view||children.length!==2||children[1]!==g||children[0].localName!=='path'||group.getAttribute('data-outline-stroke')!==String(penNumber))return false
  const outlines=outer as SVGGElement
  if(outlines.getAttribute('data-stroke-outlines')!=='true'||outlines.children.length!==20||outlines.children[penNumber-1]!==group||!styleIsUnmodified(g,view))return false
  const priorInk=children[0] as SVGPathElement
  if(!exactReviewedU8609FoldOpaque(priorInk,group,owner,ownerId,(prior as ReviewedU8609FoldPolicy['priorSegment']).outline,previousProgress,penNumber))return false
  return g.parentNode===group&&group.parentNode===outlines&&outlines.children.length===20&&outlines.children[penNumber-1]===group&&group.children.length===2&&group.children[0]===priorInk&&group.children[1]===g&&g.getAttribute('data-u8609-hkcs-fold-clip')===clipId&&g.getAttribute('data-stroke-start-gate')===plainValue(policy,'id')&&g.getAttribute('data-stroke-reveal-policy')===plainValue(policy,'kind')
 }catch{return false}
}
export const REVIEWED_U8609_FOLD_DOM_INPUT_SHA256=Object.freeze({"lib/hanja-stroke-source-context-u8609-hkcs.ts":"0b5261dfe9a94640ee58a7aa1d55c13b9ca3645b5a1dcc196c009b828625c6fd","lib/hanja-stroke-fold-u8609-hkcs.ts":"1aa519ae7d0c68d8b3a8824b9ecb72189368229b332dcde956f95602abcce06d","docs/hanja-source-original-u8609-hkcs-2026-10-26/fixtures.json":"35a774f8c744cd0a6ccd4454221ce4f629860581434c57413696b830912e4ca6"})
