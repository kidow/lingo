/** Shared product/review DOM predicate for the fixed 讒14 completed prior. */
import {measureReviewedU8b92PriorWindowFrame,type ReviewedU8b92PriorWindowPolicy} from './hanja-stroke-prior-window-u8b92-hkcs.ts'

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
function exactReviewedU8b92Prior14Opaque(priorInk:SVGPathElement,penGroup:SVGGElement,owner:SVGSVGElement,ownerId:string,expectedD:string,priorProgress:number):boolean{
 const doc=owner.ownerDocument,view=doc.defaultView,ns='http://www.w3.org/2000/svg'
 if(!view||view.document!==doc||priorProgress!==1||!expectedD||!/^[A-Za-z0-9_:.-]+$/.test(ownerId))return false
 if(!owner.isConnected||owner.namespaceURI!==ns||owner.getAttribute('viewBox')!=='0 0 100 100'||penGroup.localName!=='g')return false
 if(priorInk.localName!=='path'||priorInk.parentNode!==penGroup||priorInk.ownerSVGElement!==owner||penGroup.ownerSVGElement!==owner||priorInk.getAttribute('d')!==expectedD||priorInk.getAttribute('pathLength')!==null)return false
 if([priorInk,penGroup].some(n=>n.getAttribute('data-u8b92-prior14-owner')!==ownerId||n.getAttribute('data-u8b92-prior14-pen')!=='14')||priorInk.getAttribute('data-u8b92-prior14-mask')!=='1'||priorInk.getAttribute('data-u8b92-prior14-progress')!=='1')return false
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
 return doc.defaultView===view&&view.document===doc&&[...parents].every(([n,p])=>n.isConnected&&n.ownerDocument===doc&&n.parentNode===p)&&priorInk.parentNode===penGroup&&priorInk.getAttribute('d')===expectedD&&priorInk.getAttribute('data-u8b92-prior14-progress')==='1'
}
/** g is the second direct child of pen14; the first is the complete original priorV path. */
export function verifyReviewedU8b92PriorWindowPriorDOM(policy:ReviewedU8b92PriorWindowPolicy,g:SVGGElement|null,previousProgress:number):boolean{
 try{
  if(!policy||typeof policy!=='object'||!g||previousProgress!==1)return false
  const segment=plainValue(policy,'segment'),prior=plainValue(policy,'priorSegment')
  if(!segment||!prior)return false
  const frame=measureReviewedU8b92PriorWindowFrame(policy,segment as ReviewedU8b92PriorWindowPolicy['segment'],prior as ReviewedU8b92PriorWindowPolicy['priorSegment'],0,false)
  if(frame.status!=='empty'||g.localName!=='g'||g.getAttribute('data-stroke-start-gate')!==plainValue(policy,'id')||g.getAttribute('data-stroke-reveal-policy')!==plainValue(policy,'kind'))return false
  const clipId=g.getAttribute('data-u8b92-prior-window-clip')
  if(!clipId||!/^[A-Za-z0-9_:.-]+-13-1$/.test(clipId))return false
  const ownerId=clipId.replace(/-13-1$/,'')+'-u8b92-prior14',pen=g.parentNode,owner=g.ownerSVGElement
  if(!pen||pen.nodeType!==1||!owner||!g.isConnected||g.ownerDocument!==owner.ownerDocument||g.namespaceURI!=='http://www.w3.org/2000/svg')return false
  const group=pen as SVGGElement,children=group.children
  if(children.length!==2||children[1]!==g||children[0].localName!=='path'||!styleIsUnmodified(g,owner.ownerDocument.defaultView!))return false
  const priorInk=children[0] as SVGPathElement
  if(!exactReviewedU8b92Prior14Opaque(priorInk,group,owner,ownerId,(prior as ReviewedU8b92PriorWindowPolicy['priorSegment']).outline,previousProgress))return false
  return g.parentNode===group&&group.children.length===2&&group.children[0]===priorInk&&group.children[1]===g&&g.getAttribute('data-u8b92-prior-window-clip')===clipId&&g.getAttribute('data-stroke-start-gate')===plainValue(policy,'id')&&g.getAttribute('data-stroke-reveal-policy')===plainValue(policy,'kind')
 }catch{return false}
}
