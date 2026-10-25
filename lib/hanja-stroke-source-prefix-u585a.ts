import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU585aSourceContext,reviewedU585aContext} from './hanja-stroke-start-caps-u585a.ts'
function freeze<T>(x:T):T{if(x&&typeof x==='object'){for(const v of Object.values(x))freeze(v);Object.freeze(x)}return x}
const POLICIES=freeze([{"id":"u585a-source-prefix-8-2","kind":"source-prefix-left-u585a","pen":8,"mask":2,"segment":{"outline":"M66 87.5 L65.35 88.55 L64.6 89.55 L63.8 90.45 L62.85 91.25 L61.85 91.95 L60.8 92.5 L59.65 92.95 L58.45 93.25 L57.25 93.4 L56 93.5 L56 87.5 L56.65 87.45 L57.3 87.35 L57.85 87.2 L58.35 87.05 L58.8 86.8 L59.2 86.5 L59.6 86.15 L60 85.75 L60.35 85.25 L60.7 84.65 Z M56 90.5 L46 89 L46 87.5 L56 87.5 Z","bounds":[46,84.65,66,93.5],"direction":"curve","weight":8.588216,"revealPath":"M63.37574457367442 86.10047301171404 Q61 90.5 56 90.5","revealWidth":14},"previousSegment":{"outline":"M55.65 42.55 L59.7 46.75 L63.05 51.05 L65.7 55.5 L67.8 60 L69.2 64.55 L69.95 69.15 L70.05 73.8 L69.45 78.45 L68.2 83.05 L66.25 87.65 L60.45 84.5 L62.35 80.8 L63.7 77.05 L64.55 73.25 L64.85 69.4 L64.6 65.4 L63.8 61.25 L62.45 57 L60.5 52.55 L58 47.95 L54.95 43.15 Z M60.45 84.5 L66.25 87.65 L59.4 86.5 Z","bounds":[54.95,42.55,70.05,87.65],"direction":"curve","weight":44.397684,"revealPath":"M55 42.5 Q74.5 65.5 63.37574457367442 86.10047301171404","revealWidth":14},"previousCompletion":"original-Q7-tube","bounds":[46,84.65,66,93.5],"originalPOnce":true,"originalGuideUnchanged":true,"originalWeightUnchanged":true}] as const)
export type ReviewedU585aPrefixPolicy=typeof POLICIES[number]
const exact=(a:unknown,b:unknown)=>JSON.stringify(a)===JSON.stringify(b)
export function reviewedU585aPrefixContext(strokes:HanjaOutlineStrokes){return reviewedU585aContext(strokes)}
export function makeReviewedU585aPrefixSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes){return makeReviewedU585aSourceContext(proof,identity,strokes)}
export function reviewedU585aPrefixPolicy(context:ReturnType<typeof reviewedU585aContext>,pen:number,mask:number){return context&&pen===7&&mask===1?POLICIES[0]:null}
export function sampleReviewedU585aPrefixFrame(policy:ReviewedU585aPrefixPolicy,segment:HanjaOutlineSegment,progress:number,previousMaskProgress:number){
 if(!POLICIES.includes(policy)||!exact(segment,policy.segment))throw Error('Exact original 塚 prefix required')
 if(!Number.isFinite(progress)||progress<0||progress>1||!Number.isFinite(previousMaskProgress)||previousMaskProgress<0||previousMaskProgress>1)throw Error('Finite bounded original mask progress required')
 if(progress>0&&previousMaskProgress!==1)throw Error('Completed exact original Q7 predecessor required')
 const [x,y,right,bottom]=policy.bounds
 return Object.freeze({policyId:policy.id,progress,phase:progress===0?'empty':progress===1?'full':'prefix',clip:Object.freeze({x:right-(right-x)*progress,y,width:(right-x)*progress,height:bottom-y}),visible:progress>0,originalPDirect:progress===1,paintOriginalPOnce:true,originalGuideUnchanged:true,originalWeightUnchanged:true,sourceClockSuitabilityClaimed:false,UARead:false})
}
export const REVIEWED_U585a_PREFIX_SOURCE=freeze({"root":"u585a","geometrySHA256":"2cccc641c770be0c780c628cfff7f2bcb80497bb79743b7c84e99b2fe225881b","proof":"docs/hanja-source-original-u585a-base-2026-10-25/prefix-risk-proof.json","proofSHA256":"df3a3ba475b54436e39fdb5d3aabbabc93753eca03f68761b42cbdd7f58da4d8","nativeApproval":false,"runtimeApplied":false,"newDisplayClockExplicit":true,"previousCompletedOriginalQ7Required":true})
function attrs(n:Element,k:Record<string,string|null>){return Object.entries(k).every(([a,b])=>n.getAttribute(a)===b)}
function opaqueSolidFill(value:string){const f=value.trim().toLowerCase();if(!f||['none','transparent'].includes(f)||f.startsWith('url('))return false;const a=f.includes('/')?f.slice(f.lastIndexOf('/')+1,f.lastIndexOf(')')).trim():/^(rgba|hsla)\(/.test(f)?f.slice(f.lastIndexOf(',')+1,f.lastIndexOf(')')).trim():null;if(a!==null)return a==='1'||a==='100%';if(/^#[0-9a-f]{8}$/.test(f))return f.endsWith('ff');if(/^#[0-9a-f]{4}$/.test(f))return f.endsWith('f');return true}
function opaque(n:Element,view:Window,ink:boolean,allowedMask:string|null=null){const s=view.getComputedStyle(n),mi=s.getPropertyValue('mask-image'),clean=mi.replaceAll('"','').replaceAll("'",'');return s.transform==='none'&&s.filter==='none'&&s.clipPath==='none'&&(allowedMask?(clean.startsWith('url(')&&clean.endsWith('#'+allowedMask+')')&&!clean.includes(',')):['','none'].includes(mi))&&s.visibility==='visible'&&s.display!=='none'&&Number(s.opacity)===1&&Number(s.fillOpacity)===1&&['translate','rotate','scale'].every(k=>['','none'].includes(s.getPropertyValue(k)))&&(!ink||(s.stroke==='none'&&opaqueSolidFill(s.fill)&&s.fillRule==='nonzero'))}
export function verifyReviewedU585aPrefixPrior(policy:ReviewedU585aPrefixPolicy,g:SVGGElement|null,previousMaskProgress:number):boolean{
 try{
  if(!POLICIES.includes(policy)||previousMaskProgress!==1||!g?.isConnected||g.getAttribute('data-stroke-start-gate')!==policy.id||g.getAttribute('data-stroke-reveal-policy')!==policy.kind)return false
  const prev=g.previousElementSibling,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,pen=g.parentElement
  if(!prev||!owner||!view||view.document!==doc||!pen||pen.getAttribute('data-outline-stroke')!==String(policy.pen)||prev.parentElement!==pen||prev.nextElementSibling!==g||Array.from(pen.children).indexOf(g)!==policy.mask-1||pen.children.length!==2)return false
  const nodes:Element[]=[g,prev];let ink:Element|null=null;let guide:Element|null=null;let fullMask:Element|null=null
  if(prev.localName==='path'){if(policy.previousSegment.direction==='curve')return false;ink=prev}
  else{
   if(prev.localName!=='g'||prev.getAttribute('data-stroke-reveal-progress')!=='1'||prev.getAttribute('data-stroke-start-gate')!=='u585a-'+policy.pen+'-1'||prev.getAttribute('data-stroke-reveal-policy')!=='growing-u585a-caps')return false
   const direct=Array.from(prev.children).filter(n=>n.localName==='path');if(direct.length!==1||Array.from(prev.children).some(n=>!['defs','path'].includes(n.localName)))return false;ink=direct[0];if(ink.getAttribute('data-u585a-full-original-q-tube')!=='true'||ink.getAttribute('data-u585a-full-committed')!=='true')return false
   if(policy.previousSegment.direction==='curve'){
    const ref=ink.getAttribute('mask');if(!ref||!/^url\(#[A-Za-z0-9_-]+\)$/.test(ref))return false;fullMask=doc.getElementById(ref.slice(5,-1));if(!fullMask||fullMask.localName!=='mask'||!prev.contains(fullMask)||!attrs(fullMask,{maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'}))return false
    if(![null,'userSpaceOnUse'].includes(fullMask.getAttribute('maskContentUnits')))return false
    const gg=Array.from(fullMask.children);if(gg.length!==1||gg[0].localName!=='path')return false;guide=gg[0]
    if(!attrs(guide,{d:policy.previousSegment.revealPath??null,fill:'none',stroke:'white','stroke-width':'14','stroke-linecap':'round','stroke-linejoin':'miter',pathLength:'1','stroke-dasharray':'1 2','stroke-dashoffset':'0',transform:null,mask:null,'clip-path':null}))return false
    const cs=view.getComputedStyle(guide);if(cs.fill!=='none'||!['white','rgb(255, 255, 255)'].includes(cs.stroke)||Number.parseFloat(cs.strokeWidth)!==14||cs.strokeLinecap!=='round'||cs.strokeLinejoin!=='miter'||Number(cs.strokeOpacity)!==1||Number.parseFloat(cs.strokeDashoffset)!==0||cs.strokeDasharray.split(/[ ,]+/).filter(Boolean).map(Number.parseFloat).join(',')!=='1,2')return false
   }else if(ink.getAttribute('mask')!==null)return false
  }
  if(!ink||ink.getAttribute('d')!==policy.previousSegment.outline||ink.getAttribute('clip-path')!==null||ink.getAttribute('pathLength')!==null||(!fullMask&&ink.getAttribute('mask')!==null)||ink.getAttribute('transform')!==null)return false
  nodes.push(ink);if(guide&&fullMask){if(fullMask.parentElement?.localName!=='defs'||fullMask.parentElement.parentElement!==prev||guide.parentElement!==fullMask)return false;nodes.push(guide,fullMask,fullMask.parentElement)}
  let n:Element|null=pen;while(n){nodes.push(n);if(n===owner)break;n=n.parentElement}if(nodes[nodes.length-1]!==owner)return false
  return nodes.every(n=>n.namespaceURI==='http://www.w3.org/2000/svg'&&n.isConnected&&n.ownerDocument===doc&&(n===owner||(n as SVGElement).ownerSVGElement===owner)&&attrs(n,{transform:null,filter:null,'clip-path':null})&&(n===ink&&fullMask||n===guide||n===fullMask||n.getAttribute('mask')===null)&&opaque(n,view,n!==guide&&n!==fullMask,n===ink&&fullMask?fullMask.getAttribute('id'):null))
 }catch{return false}
}
