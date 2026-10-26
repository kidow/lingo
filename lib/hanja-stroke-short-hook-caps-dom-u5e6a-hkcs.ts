/** Exact completed 幪13 original Q7 mask may precede short2; prior paths and point-kernel behavior remain unchanged. */
import fixture from '../docs/hanja-source-original-u5e6a-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {reviewedU5e6aHkcsSourceContexts} from './hanja-stroke-source-context-u5e6a-hkcs.ts'
import {reviewedU5e6aHkcsPolicy} from './hanja-stroke-start-caps-u5e6a-hkcs.ts'
import {reviewedU5e6aHkcsShortHookPolicy,type ReviewedU5e6aHkcsShortHookPolicy} from './hanja-stroke-short-hook-prefix-u5e6a-hkcs.ts'
import {verifyReviewedU5e6aHkcsShortHookPointPriorDOM} from './hanja-stroke-short-hook-point-dom-u5e6a-hkcs.ts'
const FIXED=fixture.hkcs_m5e6a,CONTEXT=reviewedU5e6aHkcsSourceContexts(FIXED.strokes as HanjaOutlineStrokes)
if(!CONTEXT)throw Error('Exact 幪 source context required')
const SHORT=reviewedU5e6aHkcsShortHookPolicy(CONTEXT.shortHook,12,1),CAP=reviewedU5e6aHkcsPolicy(CONTEXT.caps,12,0)
if(!SHORT||!CAP||SHORT.predecessor.outline!==CAP.segment.outline)throw Error('Exact 幪13 consecutive originals required')
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
  const re=/[MLQCZ]|[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g,a=v.match(re)||[]
  if(v.replace(re,'').replace(/[\s,]/g,''))return null
  return a.map(x=>/^[MLQCZ]$/.test(x)?x:Number(x))
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


function maskURL(value:string,id:string,doc:Document):boolean{
 const m=/^url\(["']?([^"')]+)["']?\)$/.exec(value.trim());if(!m)return false
 if(m[1]==='#'+id)return true
 try{const got=new URL(m[1],doc.baseURI),expected=new URL('#'+id,doc.baseURI);return got.href===expected.href}catch{return false}
}
function noEffect(node:Element,view:Window,maskId:string|null=null):boolean{
 if(maskId===null)return styleIsUnmodified(node,view)
 if(node.getAttribute('mask')!=='url(#'+maskId+')'||['clip-path','transform','filter'].some(k=>node.getAttribute(k)!==null))return false
 const s=view.getComputedStyle(node)
 return maskURL(s.getPropertyValue('mask-image'),maskId,node.ownerDocument)&&s.display!=='none'&&s.visibility==='visible'&&Number(s.opacity)===1&&Number(s.fillOpacity)===1&&s.transform==='none'&&s.filter==='none'&&s.clipPath==='none'&&s.mixBlendMode==='normal'&&['translate','rotate','scale'].every(k=>['','none'].includes(s.getPropertyValue(k)))
}
export function verifyReviewedU5e6aHkcsShortHookCapsPriorDOM(policy:ReviewedU5e6aHkcsShortHookPolicy,g:Element|null,previousProgress:number):boolean{
 if(verifyReviewedU5e6aHkcsShortHookPointPriorDOM(policy,g,previousProgress))return true
 try{
  if(policy!==SHORT||!g||previousProgress!==1||!CAP||!g.isConnected||g.localName!=='g')return false
  const cap=g.previousElementSibling,pen=g.parentElement,owner=(g as SVGElement).ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView
  if(!cap||!pen||!owner||!view||view.document!==doc)return false
  const defs=cap.children[0],ink=cap.children[1],mask=defs?.children[1],guide=mask?.children[0],outer=pen.parentElement,id=cap.getAttribute('data-u5e6a-hkcs-clip')
  if(!id||!/^[A-Za-z0-9_:.-]+$/.test(id)||!defs||!ink||!mask||!guide||!outer)return false
  const exact=()=>g.parentElement===pen&&g.previousElementSibling===cap&&g.getAttribute('data-stroke-start-gate')===policy.id&&g.getAttribute('data-stroke-reveal-policy')===policy.kind&&pen.children.length===2&&pen.children[0]===cap&&pen.children[1]===g&&pen.getAttribute('data-outline-stroke')==='13'&&pen.parentElement===outer&&outer.getAttribute('data-stroke-outlines')==='true'&&outer.children.length===17&&outer.children[12]===pen&&owner.getAttribute('viewBox')==='0 0 100 100'&&cap.parentElement===pen&&cap.localName==='g'&&cap.getAttribute('data-stroke-start-gate')===CAP.id&&cap.getAttribute('data-stroke-reveal-policy')===CAP.kind&&cap.getAttribute('data-u5e6a-hkcs-progress')==='1'&&cap.getAttribute('data-stroke-reveal-progress')==='1'&&cap.getAttribute('data-u5e6a-hkcs-clip')===id&&cap.children.length===2&&cap.children[0]===defs&&cap.children[1]===ink&&defs.localName==='defs'&&defs.parentElement===cap&&defs.children.length===3&&defs.children[1]===mask&&mask.localName==='mask'&&mask.parentElement===defs&&mask.getAttribute('id')===id&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&[null,'userSpaceOnUse'].includes(mask.getAttribute('maskContentUnits'))&&mask.getAttribute('x')==='0'&&mask.getAttribute('y')==='0'&&mask.getAttribute('width')==='100'&&mask.getAttribute('height')==='100'&&mask.children.length===1&&mask.children[0]===guide&&guide.parentElement===mask&&guide.localName==='path'&&guide.getAttribute('d')===CAP.segment.revealPath&&guide.getAttribute('fill')==='none'&&guide.getAttribute('stroke')==='white'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='round'&&guide.getAttribute('stroke-linejoin')==='miter'&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-dasharray')==='1 2'&&guide.getAttribute('stroke-dashoffset')==='0'&&ink.localName==='path'&&ink.parentElement===cap&&ink.getAttribute('data-growing-full-round')==='true'&&ink.getAttribute('d')===CAP.segment.outline&&ink.getAttribute('mask')==='url(#'+id+')'&&['pathLength','stroke-dasharray','stroke-dashoffset'].every(k=>ink.getAttribute(k)===null)
  if(!exact())return false
  const stack:Element[]=[owner],visited=new Set<Element>();let matchingMasks=0
  while(stack.length){const node=stack.pop()!;if(visited.has(node))return false;visited.add(node);if(node.getAttribute('id')===id){if(node!==mask)return false;matchingMasks++}stack.push(...Array.from(node.children))}
  if(matchingMasks!==1)return false
  const nodes:Element[]=[g,cap,defs,mask,guide,ink];let n:Element|null=pen;const seen=new Set<Element>()
  while(n){if(seen.has(n))return false;seen.add(n);nodes.push(n);if(n===owner)break;n=n.parentElement}
  if(n!==owner)return false
  const parents=new Map(nodes.map(n=>[n,n.parentElement]))
  for(const n of nodes)if(!n.isConnected||n.ownerDocument!==doc||n.namespaceURI!=='http://www.w3.org/2000/svg'||(n!==owner&&(n as SVGElement).ownerSVGElement!==owner)||!noEffect(n,view,n===ink?id:null))return false
  const paint=view.getComputedStyle(ink),white=view.getComputedStyle(guide),ms=view.getComputedStyle(mask)
  if(paint.fillRule!=='nonzero'||paint.stroke!=='none'||Number(paint.strokeOpacity)!==1||!opaqueRGB(paint.fill)||!sameComputedD(paint.getPropertyValue('d').trim(),CAP.segment.outline)||!sameComputedD(white.getPropertyValue('d').trim(),CAP.segment.revealPath!))return false
  if(white.fill!=='none'||!['white','rgb(255, 255, 255)'].includes(white.stroke)||Number(white.strokeOpacity)!==1||white.getPropertyValue('stroke-width')!=='14px'||white.getPropertyValue('stroke-linecap')!=='round'||white.getPropertyValue('stroke-linejoin')!=='miter'||!['1px, 2px','1px 2px','1 2'].includes(white.getPropertyValue('stroke-dasharray'))||!['0px','0'].includes(white.getPropertyValue('stroke-dashoffset')))return false
  for(const[k,v]of Object.entries({x:0,y:0,width:100,height:100})){const css=ms.getPropertyValue(k);if(css!==''&&css!==String(v)+'px'&&css!==String(v))return false}
  // Existing exact source certificate covers all original filled P with this full round Q7 mask (73 leaves, no unresolved). No UA read or new coverage claim.
  return view.document===doc&&doc.defaultView===view&&[...parents].every(([n,p])=>n.isConnected&&n.ownerDocument===doc&&n.parentElement===p)&&exact()
 }catch{return false}
}
export const REVIEWED_U5E6A_SHORT_HOOK_CAPS_DOM_INPUT_SHA256=Object.freeze({"lib/hanja-stroke-short-hook-point-dom-u5e6a-hkcs.ts":"e2c7ef2912a835eb0ef9d54ca685240310eb8e06eb9db9af76c8cf7d5fc01dce","lib/hanja-stroke-start-caps-u5e6a-hkcs.ts":"37892258f60b1583a4f75244c0816171ffff39a40ea2b28fb7959c88038fc34d","lib/hanja-stroke-source-context-u5e6a-hkcs.ts":"ca8bad199c734b56c948247cd9e0ca7a2e34d0a0dc30d2ef39039850ddc80f75","docs/hanja-source-original-u5e6a-hkcs-2026-10-26/fixtures.json":"9a4f42f0206be94e4905f2a177caef251dbce5f0d7073772a52a7d47f84eace8","docs/hanja-source-original-u5e6a-hkcs-2026-10-26/caps-conditions-proof.json":"5c28ef663d7ff37f3965b6b239c3f7b55787c142fc3cb4146ff8c1404573fb52"})
