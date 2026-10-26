/** Exact completed 幪2 kernel group may precede short-hook mask3; direct-path cases remain unchanged. */
import fixture from '../docs/hanja-source-original-u5e6a-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU5e6aHkcsSourceContexts} from './hanja-stroke-source-context-u5e6a-hkcs.ts'
import {reviewedU5e6aHkcsShortHookPolicy,verifyReviewedU5e6aHkcsShortHookPrior,type ReviewedU5e6aHkcsShortHookPolicy} from './hanja-stroke-short-hook-prefix-u5e6a-hkcs.ts'
import {makeReviewedU5e6aHkcsKernelPointWindowSourceContext,reviewedU5e6aHkcsKernelPointWindowPolicy,verifyReviewedU5e6aHkcsKernelPointWindowPrior} from './hanja-stroke-contact-kernel-point-window-u5e6a-hkcs.ts'
const FIXED=fixture.hkcs_m5e6a,CONTEXT=reviewedU5e6aHkcsSourceContexts(FIXED.strokes as HanjaOutlineStrokes)
const POINT_CONTEXT=makeReviewedU5e6aHkcsKernelPointWindowSourceContext(FIXED.fullProof,FIXED.identity,FIXED.strokes as HanjaOutlineStrokes)
if(!CONTEXT||!POINT_CONTEXT)throw Error('Exact 幪 private source contexts required')
const SHORT=reviewedU5e6aHkcsShortHookPolicy(CONTEXT.shortHook,1,2),BAND=reviewedU5e6aHkcsKernelPointWindowPolicy(POINT_CONTEXT,1,1)
if(!SHORT||!BAND||SHORT.predecessor.outline!==BAND.segment.outline)throw Error('Exact 幪2 consecutive original masks required')
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

export function verifyReviewedU5e6aHkcsShortHookPointPriorDOM(policy:ReviewedU5e6aHkcsShortHookPolicy,g:Element|null,previousProgress:number):boolean{
 if(verifyReviewedU5e6aHkcsShortHookPrior(policy,g,previousProgress))return true
 try{
  if(policy!==SHORT||!g||previousProgress!==1||!BAND||g.namespaceURI!=='http://www.w3.org/2000/svg'||g.localName!=='g'||!g.isConnected)return false
  const band=g.previousElementSibling,pen=g.parentElement,owner=(g as SVGGElement).ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,ns='u5e6a-hkcs-kernel-point-window'
  if(!band||band.localName!=='g'||!pen||!owner||!view||view.document!==doc||!verifyReviewedU5e6aHkcsKernelPointWindowPrior(BAND,band,1))return false
  const ink=band.children[1],h=band.previousElementSibling,outer=pen.parentElement
  if(!ink||ink.localName!=='path'||!h||h.localName!=='path'||!outer)return false
  const attributes:Record<string,string>={['data-'+ns+'-progress']:'1',['data-'+ns+'-phase']:'full',['data-'+ns+'-direct-original']:'true',['data-'+ns+'-source-full']:'true',['data-'+ns+'-committed']:'true',['data-'+ns+'-one-ink']:'true',['data-'+ns+'-source-subpaths']:'3',['data-'+ns+'-ua-read']:'false',['data-'+ns+'-ink']:'true'}
  const exact=()=>g.getAttribute('data-stroke-start-gate')===policy.id&&g.getAttribute('data-stroke-reveal-policy')===policy.kind&&g.parentElement===pen&&g.previousElementSibling===band&&pen.children.length===3&&pen.children[0]===h&&pen.children[1]===band&&pen.children[2]===g&&pen.getAttribute('data-outline-stroke')==='2'&&pen.parentElement===outer&&outer.getAttribute('data-stroke-outlines')==='true'&&outer.children.length===17&&outer.children[1]===pen&&owner.getAttribute('viewBox')==='0 0 100 100'&&band.parentElement===pen&&band.getAttribute('data-stroke-start-gate')===BAND.id&&band.getAttribute('data-stroke-reveal-policy')===BAND.kind&&band.getAttribute('data-stroke-reveal-progress')==='1'&&band.getAttribute('data-'+ns+'-previous-progress')==='1'&&band.getAttribute('data-'+ns+'-display-clock')==='source-author-kernel-point-window'&&band.getAttribute('data-'+ns+'-author-clock')==='true'&&band.getAttribute('data-'+ns+'-original-clock-equivalent')==='false'&&band.children.length===2&&band.children[0].localName==='defs'&&band.children[1]===ink&&ink.parentElement===band&&ink.getAttribute('d')===BAND.segment.outline&&h.getAttribute('d')===BAND.predecessor.outline&&Object.entries(attributes).every(([k,v])=>ink.getAttribute(k)===v)&&[ink,h].every(n=>n.getAttribute('pathLength')===null&&n.getAttribute('stroke-dasharray')===null&&n.getAttribute('stroke-dashoffset')===null)
  if(!exact())return false
  const nodes:Element[]=[g,band,ink,h];let node:Element|null=pen;const seen=new Set<Element>()
  while(node){if(seen.has(node))return false;seen.add(node);nodes.push(node);if(node===owner)break;node=node.parentElement}
  if(node!==owner)return false
  const parents=new Map(nodes.map(n=>[n,n.parentElement]))
  for(const n of nodes)if(!n.isConnected||n.ownerDocument!==doc||n.namespaceURI!=='http://www.w3.org/2000/svg'||(n!==owner&&(n as SVGElement).ownerSVGElement!==owner)||!styleIsUnmodified(n,view))return false
  for(const[n,d]of[[ink,BAND.segment.outline],[h,BAND.predecessor.outline]] as const){const s=view.getComputedStyle(n);if(s.fillRule!=='nonzero'||s.stroke!=='none'||Number(s.strokeOpacity)!==1||!opaqueRGB(s.fill)||!sameComputedD(s.getPropertyValue('d').trim(),d))return false}
  return view.document===doc&&doc.defaultView===view&&[...parents].every(([n,p])=>n.isConnected&&n.ownerDocument===doc&&n.parentElement===p)&&exact()
 }catch{return false}
}
export const REVIEWED_U5E6A_SHORT_HOOK_POINT_DOM_INPUT_SHA256=Object.freeze({"lib/hanja-stroke-source-context-u5e6a-hkcs.ts":"ca8bad199c734b56c948247cd9e0ca7a2e34d0a0dc30d2ef39039850ddc80f75","lib/hanja-stroke-short-hook-prefix-u5e6a-hkcs.ts":"18b9c449aebfd8ebb39a98ee5419c6de929820053ad0bcb8be277debb7576aec","lib/hanja-stroke-contact-kernel-point-window-u5e6a-hkcs.ts":"d5809606d30cfb8a1e272b71acaf0936ba94668981d997a1d4eecb71a11a0ae0","docs/hanja-source-original-u5e6a-hkcs-2026-10-26/fixtures.json":"9a4f42f0206be94e4905f2a177caef251dbce5f0d7073772a52a7d47f84eace8"})
