/** Preview only: unchanged first two original masks share one authored forward source-P prefix. */
import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import fixture from '../docs/hanja-source-original-u5a93-2026-10-26/fixtures.json' with {type:'json'}
const FIXED=fixture.u5a93,STROKES=FIXED.strokes as HanjaOutlineStrokes,NS='http://www.w3.org/2000/svg',PREFIX='data-u5a93-first-prefix-'
function freeze<T>(v:T):T{if(v&&typeof v==='object')for(const d of Object.values(Object.getOwnPropertyDescriptors(v))){if('value'in d)freeze(d.value)}return Object.freeze(v)}
function same(a:unknown,b:unknown):boolean{
 if(Object.is(a,b))return true
 if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false
 const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b)
 return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&same(x.value,y.value)})
}
freeze(FIXED)

export type ReviewedU5a93FirstPrefixContext=Readonly<{id:'u5a93-original-12-first-prefix-preview'}>
const CONTEXT:ReviewedU5a93FirstPrefixContext=Object.freeze({id:'u5a93-original-12-first-prefix-preview'})
export function makeReviewedU5a93FirstPrefixContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU5a93FirstPrefixContext|null{try{return arguments.length===3&&same(proof,FIXED.fullProof)&&same(identity,FIXED.identity)&&same(strokes,STROKES)?CONTEXT:null}catch{return null}}
export type ReviewedU5a93FirstPrefixPolicy=Readonly<{id:'u5a93-first-source-prefix-1';kind:'source-union-y-prefix-u5a93-first';pen:1;segments:readonly HanjaOutlineSegment[];sourceMasks:2;sourcePPerMask:readonly[2,2];y0:6.9;y1:79.6;outerX:readonly[8.3,41.9];rectTop:5.9;proofFingerprint:string;previewOnly:true}>
const POLICY:ReviewedU5a93FirstPrefixPolicy=freeze({id:'u5a93-first-source-prefix-1',kind:'source-union-y-prefix-u5a93-first',pen:1,segments:STROKES[0],sourceMasks:2,sourcePPerMask:[2,2],y0:6.9,y1:79.6,outerX:[8.3,41.9],rectTop:5.9,proofFingerprint:'72cc3a983ea1e53b7c04373adaba41cc32eaa96acbf6b1e82d7e73760c526ee2',previewOnly:true})
export function reviewedU5a93FirstPrefixPolicy(context:ReviewedU5a93FirstPrefixContext|null,pen:number):ReviewedU5a93FirstPrefixPolicy|null{return context===CONTEXT&&pen===0?POLICY:null}
function source(policy:ReviewedU5a93FirstPrefixPolicy,segments:readonly HanjaOutlineSegment[]){if(policy!==POLICY||!same(segments,POLICY.segments))throw Error('Private first-prefix policy and both exact original mask P/Q/width/weight required')}
export function sampleReviewedU5a93FirstPrefixFrame(policy:ReviewedU5a93FirstPrefixPolicy,segments:readonly HanjaOutlineSegment[],progress:number){
 source(policy,segments);if(!Number.isFinite(progress)||progress<0||progress>1)throw Error('Finite unit source-author progress required')
 const cutoff=policy.y0+(policy.y1-policy.y0)*progress,clip=Object.freeze({x:policy.outerX[0],y:policy.rectTop,width:policy.outerX[1]-policy.outerX[0],height:cutoff-policy.rectTop})
 return Object.freeze({policyId:policy.id,progress,phase:progress===0?'empty':progress===1?'full':'source-union-y-prefix',visible:progress>0,originalPDirect:progress===1,cutoff,clip,outlines:Object.freeze(segments.map(s=>s.outline)),sourceGuides:Object.freeze(segments.map(s=>s.revealPath!)),sourceWeights:Object.freeze(segments.map(s=>s.weight)),sourceWidth:14 as const,originalMaskCount:2 as const,sourcePPerMask:Object.freeze([2,2]),sourceGroupingChanged:false as const,authorClock:'source-author-common-forward-y-prefix' as const,originalGuideOrMaskWeightClockEquivalent:false as const,sourceLQRestarted:false as const,UARead:false as const,previewOnly:true as const,nativeForwardApproval:false as const,runtimeApplied:false as const})
}
export type ReviewedU5a93FirstPrefixMaskNodes={group:SVGGElement|null;ink:SVGPathElement|null;rect:SVGRectElement|null;clipPath:SVGClipPathElement|null}
export type ReviewedU5a93FirstPrefixNodes=readonly[ReviewedU5a93FirstPrefixMaskNodes,ReviewedU5a93FirstPrefixMaskNodes]
function opaqueRGB(value:string):boolean{
 const match=/^rgba?\(([^)]+)\)$/.exec(value.trim());if(!match)return false
 const slash=match[1].split('/'),parts=slash[0].replaceAll(',',' ').trim().split(/\s+/);let alpha:string|undefined=slash[1]?.trim()
 if(slash.length>2)return false
 if(alpha===undefined&&parts.length===4)alpha=parts.pop()
 return parts.length===3&&parts.every(v=>Number.isFinite(Number(v.replace('%',''))))&&(alpha===undefined||(alpha.endsWith('%')?Number(alpha.slice(0,-1))/100:Number(alpha))===1)
}
function cssSourcePath(doc:Document,value:string,outline:string):boolean{
 if(value==='')return true
 const probe=doc.createElementNS(NS,'path');probe.style.setProperty('d','path('+JSON.stringify(outline)+')')
 const expected=probe.style.getPropertyValue('d')
 return expected!==''&&value===expected
}

/** Commits both original masks in one current owner/frame, or hides both. No positional epsilon or progress snap. */
export function commitReviewedU5a93FirstPrefix(policy:ReviewedU5a93FirstPrefixPolicy,segments:readonly HanjaOutlineSegment[],progress:number,clipIds:readonly[string,string],nodes:ReviewedU5a93FirstPrefixNodes){
 const reset=()=>{for(const n of nodes){n.ink?.setAttribute('visibility','hidden');n.ink?.setAttribute(PREFIX+'committed','false')}};reset()
 try{
  const frame=sampleReviewedU5a93FirstPrefixFrame(policy,segments,progress)
  if(nodes.length!==2||clipIds.length!==2||clipIds[0]===clipIds[1])throw Error('Exactly two source-mask owners required')
  const first=nodes[0],owner=first.group?.ownerSVGElement,doc=first.group?.ownerDocument,slot=first.group?.parentNode,outer=slot?.parentNode,view=doc?.defaultView
  if(!owner||!doc||!slot||!outer||slot.nodeType!==1||outer.nodeType!==1||!view||view.document!==doc)throw Error('Actual source SVG owner required')
  const pen=slot as SVGGElement,outlines=outer as SVGGElement,tree:Element[]=[],expectedCSS=new Map<SVGRectElement,Map<string,string>>()
  for(let i=0;i<2;i++){
   const n=nodes[i],{group:g,ink:p,rect:r,clipPath:c}=n,id=clipIds[i],defs=c?.parentNode
   if(!g||!p||!r||!c||!defs||defs.nodeType!==1||!/^[A-Za-z0-9_:.-]+$/.test(id)||!id.endsWith('-0-'+i))throw Error('Exact original mask nodes and source-index id required')
   const css=new Map<string,string>();for(const[k,v]of Object.entries(frame.clip)){const value=String(v);r.setAttribute(k,value);r.style.setProperty(k,value+'px');css.set(k,r.style.getPropertyValue(k))}expectedCSS.set(r,css)
   if(frame.originalPDirect)p.removeAttribute('clip-path');else p.setAttribute('clip-path','url(#'+id+'-u5a93-first-prefix-clip)')
   tree.push(g,p,r,c,defs as Element)
  }
  const seen=new Set<Element>();let ancestor:Element|null=pen
  while(ancestor){if(seen.has(ancestor))throw Error('Cyclic source owner');seen.add(ancestor);tree.push(ancestor);if(ancestor===owner)break;const parent:ParentNode|null=ancestor.parentNode;ancestor=parent&&parent.nodeType===1?parent as Element:null}
  if(ancestor!==owner)throw Error('Disconnected first source pen')
  const parents=new Map(tree.map(n=>[n,n.parentNode]))
  const exact=(visible:string,committed:boolean)=>{
   if(owner.getAttribute('viewBox')!=='0 0 100 100'||pen.parentNode!==outlines||outlines.getAttribute('data-stroke-outlines')!=='true'||outlines.children.length!==12||outlines.children[0]!==pen||pen.getAttribute('data-outline-stroke')!=='1'||pen.children.length!==2)return false
   for(let i=0;i<2;i++){
    const {group:g,ink:p,rect:r,clipPath:c}=nodes[i],id=clipIds[i],defs=c!.parentNode as SVGDefsElement
    if(g!.localName!=='g'||p!.localName!=='path'||r!.localName!=='rect'||c!.localName!=='clipPath'||defs.localName!=='defs'||g!.parentNode!==pen||pen.children[i]!==g||g!.children.length!==2||g!.children[0]!==defs||g!.children[1]!==p||p!.parentNode!==g||defs.parentNode!==g||defs.children.length!==1||defs.children[0]!==c||c!.children.length!==1||c!.children[0]!==r||r!.parentNode!==c||g!.getAttribute('data-stroke-start-gate')!==policy.id||g!.getAttribute('data-stroke-reveal-policy')!==policy.kind||g!.getAttribute('data-stroke-reveal-progress')!==String(progress)||g!.getAttribute(PREFIX+'mask')!==String(i+1)||g!.getAttribute(PREFIX+'clip')!==id||g!.getAttribute(PREFIX+'fingerprint')!==policy.proofFingerprint||p!.getAttribute('d')!==segments[i].outline||p!.getAttribute('visibility')!==visible||p!.getAttribute(PREFIX+'committed')!==String(committed)||p!.getAttribute('clip-path')!==(frame.originalPDirect?null:'url(#'+id+'-u5a93-first-prefix-clip)')||['mask','pathLength','stroke-dasharray','stroke-dashoffset'].some(k=>p!.getAttribute(k)!==null)||c!.getAttribute('id')!==id+'-u5a93-first-prefix-clip'||c!.getAttribute('clipPathUnits')!=='userSpaceOnUse'||Object.entries(frame.clip).some(([k,v])=>r!.getAttribute(k)!==String(v)))return false
   }
   return true
  }
  const stable=(visible:string,committed:boolean)=>{
   if(!exact(visible,committed)||owner.ownerDocument!==doc||doc.defaultView!==view||view.document!==doc)return false
   const inks=nodes.map(n=>n.ink)
   for(const n of tree){const cs=view.getComputedStyle(n);if(!n.isConnected||n.ownerDocument!==doc||n.namespaceURI!==NS||n.parentNode!==parents.get(n)||(n!==owner&&(n as SVGElement).ownerSVGElement!==owner)||['mask','transform','filter'].some(k=>n.getAttribute(k)!==null)||(!inks.includes(n as SVGPathElement)&&n.getAttribute('clip-path')!==null)||cs.display==='none'||Number(cs.opacity)!==1||Number(cs.fillOpacity)!==1||(!inks.includes(n as SVGPathElement)&&cs.visibility!=='visible')||cs.transform!=='none'||cs.filter!=='none'||cs.mixBlendMode!=='normal'||!['','none'].includes(cs.getPropertyValue('mask-image'))||['translate','rotate','scale'].some(k=>!['','none'].includes(cs.getPropertyValue(k)))||(!inks.includes(n as SVGPathElement)&&cs.clipPath!=='none'))return false}
   for(let i=0;i<2;i++){
    const {ink:p,rect:r}=nodes[i],css=expectedCSS.get(r!)!,paint=view.getComputedStyle(p!),rectStyle=view.getComputedStyle(r!),probe=doc.createElementNS(NS,'path');probe.style.setProperty('clip-path',p!.getAttribute('clip-path')??'none')
    if(paint.clipPath!==probe.style.getPropertyValue('clip-path')||paint.visibility!==visible||paint.stroke!=='none'||paint.fillRule!=='nonzero'||Number(paint.fillOpacity)!==1||!opaqueRGB(paint.fill)||!cssSourcePath(doc,paint.getPropertyValue('d').trim(),segments[i].outline))return false
    for(const[k,v]of css)if(v===''||r!.style.getPropertyValue(k)!==v||rectStyle.getPropertyValue(k)!==v)return false
   }
   return exact(visible,committed)&&tree.every(n=>n.isConnected&&n.parentNode===parents.get(n)&&n.ownerDocument===doc&&(n===owner||(n as SVGElement).ownerSVGElement===owner))
  }
  if(!stable('hidden',false))throw Error('Changed source mask owner/geometry/CSS')
  for(const n of nodes)n.ink!.setAttribute(PREFIX+'phase',frame.phase)
  if(!stable('hidden',false))throw Error('Changed first-prefix frame before paint')
  for(const n of nodes){n.ink!.setAttribute(PREFIX+'committed','true');n.ink!.setAttribute('visibility',frame.visible?'visible':'hidden')}
  if(!stable(frame.visible?'visible':'hidden',true))throw Error('Changed two-mask source paint')
  return{status:progress===0?'empty' as const:progress===1?'complete' as const:'visible' as const,frame,cleanup:reset}
 }catch(error){reset();return{status:'hidden' as const,error:error instanceof Error?error.message:String(error),cleanup:reset}}
}
export const REVIEWED_U5A93_FIRST_PREFIX_INPUT=Object.freeze({fullProof:FIXED.fullProof,identity:FIXED.identity})
export const REVIEWED_U5A93_FIRST_PREFIX_SOURCE=freeze({glyph:'媓',root:'u5a93',pens:12,masks:13,firstSourceMasks:2,firstPPerMask:[2,2],prefixRange:[6.9,79.6],finitePositiveStates:140,originalSourceGrouping:FIXED.sourceGroups,sourceGuideOrWidthOrWeightsChanged:false,oldSequentialBacktrackApproval:false,authorPrefixNotOriginalClock:true,previewOnly:true,nativeForwardApproval:false,runtimeApplied:false})
export const REVIEWED_U5A93_FIRST_PREFIX_INPUT_SHA256=Object.freeze({"docs/hanja-goal-glyphwiki-batch1039-2026-10-13/engine-whole-u5a93.json":"689e2d502a5cf1bf337192a939dc0efad1f877c476e0d980bc404d9ddf5c25f8","docs/hanja-goal-glyphwiki-batch1039-2026-10-13/boundary-source-preparation.json":"7e044b948b0b8ea95ab403318b13b6eb30b397f09aea2150d161778d5d21a567","docs/hanja-goal-glyphwiki-batch1039-2026-10-13/boundary-native-review.json":"50ead7d1648942391779e794ab0c19d20d3a759d8b73771c4e8262a44452abe7","docs/hanja-official-media-compare-u5a93-2026-10-25/native-first1-supplemental-review.json":"8cad4a325f3f6bf5ae0545fd512f0746d042136e46c1ebfc63ac13abffd1c1bb","docs/hanja-source-original-u8609-hkcs-2026-10-26/verify-19-point-rect-conditions.py":"62074465d2fab4f05ff58a6a749f6c7cbd95770e11ac422312ceeaae9b09e93b","docs/hanja-source-original-u7443-g-2026-10-26/verify-raw9-point-rect.py":"4925401a247d15236789debce8eb467359569187a0bc99b761fb1921e8400cc3","docs/hanja-source-original-u840d-hkcs-2026-10-25/verify-body-rising-bands.py":"2ceee7728789781ccb8bb58173b131560229dfebc794d47463bcad1f5ea00f76","docs/hanja-source-original-u5a93-2026-10-26/fixtures.json":"a7ad43dd32a18ac22628c77d942fc53ab26d3642bcabce108248a74babf79733","docs/hanja-source-original-u5a93-2026-10-26/first-forward-prefix-conditions-proof.json":"72cc3a983ea1e53b7c04373adaba41cc32eaa96acbf6b1e82d7e73760c526ee2","docs/hanja-source-original-u5a93-2026-10-26/verify-first-forward-prefix-conditions.py":"c50aa6e7251f6d75eafe806b973ed3739d745558f12ddbb2eb9bfaaad1afafbf"})
