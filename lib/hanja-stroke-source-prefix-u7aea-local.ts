/** Preview only: exact locally authored 竪 P under one cap-free whole-logical author clock. */
import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import fixture from '../docs/hanja-source-original-u7aea-local-2026-10-27/fixtures-draft.json' with {type:'json'}
const FIXED=fixture.u7aea,STROKES=FIXED.strokes as HanjaOutlineStrokes,NS='http://www.w3.org/2000/svg',PREFIX='data-u7aea-local-prefix-'
function freeze<T>(v:T):T{if(v&&typeof v==='object')for(const d of Object.values(Object.getOwnPropertyDescriptors(v))){if('value'in d)freeze(d.value)}return Object.freeze(v)}
function same(a:unknown,b:unknown):boolean{
 if(Object.is(a,b))return true
 if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false
 const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b)
 return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&same(x.value,y.value)})
}
freeze(FIXED)
export type LocalU7aeaSourcePrefixContext=Readonly<{id:'u7aea-local-components-source-prefix-preview'}>
const CONTEXT:LocalU7aeaSourcePrefixContext=Object.freeze({id:'u7aea-local-components-source-prefix-preview'})
export function makeLocalU7aeaSourcePrefixContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):LocalU7aeaSourcePrefixContext|null{try{return arguments.length===3&&same(proof,FIXED.fullProof)&&same(identity,FIXED.identity)&&same(strokes,STROKES)?CONTEXT:null}catch{return null}}
export type LocalU7aeaSourcePrefixPolicy=Readonly<{id:string;kind:'source-union-axis-prefix-u7aea-local';pen:8|9|11|12;segments:readonly HanjaOutlineSegment[];axis:'x'|'y';start:number;finish:number;outer:readonly[number,number,number,number];proofFingerprint:string;previewOnly:true}>
function policy(pen:8|9|11|12,axis:'x'|'y',start:number,finish:number,proofFingerprint:string):LocalU7aeaSourcePrefixPolicy{
 const segments=STROKES[pen-1],outer=[Math.min(...segments.map(s=>s.bounds[0]))-1,Math.min(...segments.map(s=>s.bounds[1]))-1,Math.max(...segments.map(s=>s.bounds[2]))+1,Math.max(...segments.map(s=>s.bounds[3]))+1]as[number,number,number,number]
 return freeze({id:'u7aea-local-source-prefix-'+pen,kind:'source-union-axis-prefix-u7aea-local',pen,segments,axis,start,finish,outer,proofFingerprint,previewOnly:true})
}
const POLICIES=freeze([
 policy(8,'y',16.85,58.45,'52f0198afcbc1d9fd29b9a9e93391f3388a109b32317425f0da5d4d761e73a80'),
 policy(9,'y',55.75,67.3,'52f0198afcbc1d9fd29b9a9e93391f3388a109b32317425f0da5d4d761e73a80'),
 policy(11,'y',68.85,87.4,'52f0198afcbc1d9fd29b9a9e93391f3388a109b32317425f0da5d4d761e73a80'),
 policy(12,'x',73.4,56.15,'52f0198afcbc1d9fd29b9a9e93391f3388a109b32317425f0da5d4d761e73a80')
])
/** Zero-based logical pen index. A whole logical stroke is the sole policy owner. */
export function localU7aeaSourcePrefixPolicy(context:LocalU7aeaSourcePrefixContext|null,pen:number):LocalU7aeaSourcePrefixPolicy|null{return context===CONTEXT?POLICIES.find(p=>p.pen===pen+1)??null:null}
function source(policy:LocalU7aeaSourcePrefixPolicy,segments:readonly HanjaOutlineSegment[]){if(!POLICIES.includes(policy)||!same(segments,policy.segments))throw Error('Private policy and all exact original logical mask P/Q/width/weights required')}
export function sampleLocalU7aeaSourcePrefixFrame(policy:LocalU7aeaSourcePrefixPolicy,segments:readonly HanjaOutlineSegment[],progress:number){
 source(policy,segments);if(!Number.isFinite(progress)||progress<0||progress>1)throw Error('Finite whole-logical unit author progress required')
 const cutoff=policy.start+(policy.finish-policy.start)*progress,[x0,y0,x1,y1]=policy.outer
 const clip=Object.freeze(policy.axis==='x'?{x:cutoff,y:y0,width:x1-cutoff,height:y1-y0}:{x:x0,y:y0,width:x1-x0,height:cutoff-y0})
 return Object.freeze({policyId:policy.id,progress,phase:progress===0?'empty':progress===1?'full':'source-union-'+policy.axis+'-prefix',visible:progress>0,originalPDirect:progress===1,cutoff,clip,outlines:Object.freeze(segments.map(s=>s.outline)),sourceGuides:Object.freeze(segments.map(s=>s.revealPath??null)),sourceWeights:Object.freeze(segments.map(s=>s.weight)),sourceWidths:Object.freeze(segments.map(s=>s.revealWidth??null)),originalMaskCount:segments.length,sourceGroupingChanged:false as const,wholeLogicalClock:true as const,authorClock:'source-author-common-axis-prefix' as const,originalGuideOrMaskWeightClockEquivalent:false as const,sourceLQRestarted:false as const,UARead:false as const,previewOnly:true as const,nativeForwardApproval:false as const,runtimeApplied:false as const})
}
export type LocalU7aeaSourcePrefixMaskNodes={group:SVGGElement|null;ink:SVGPathElement|null;rect:SVGRectElement|null;clipPath:SVGClipPathElement|null}
export type LocalU7aeaSourcePrefixNodes=readonly LocalU7aeaSourcePrefixMaskNodes[]
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

/** Commits every original logical mask in one owner/frame, or hides all. No epsilon snap. */
export function commitLocalU7aeaSourcePrefix(policy:LocalU7aeaSourcePrefixPolicy,segments:readonly HanjaOutlineSegment[],progress:number,clipIds:readonly string[],nodes:LocalU7aeaSourcePrefixNodes){
 const reset=()=>{for(const n of nodes){n.ink?.setAttribute('visibility','hidden');n.ink?.setAttribute(PREFIX+'committed','false')}};reset()
 try{
  const frame=sampleLocalU7aeaSourcePrefixFrame(policy,segments,progress)
  if(nodes.length!==policy.segments.length||clipIds.length!==policy.segments.length||new Set(clipIds).size!==clipIds.length)throw Error('Exact original source-mask owners required')
  const first=nodes[0],owner=first.group?.ownerSVGElement,doc=first.group?.ownerDocument,slot=first.group?.parentNode,outer=slot?.parentNode,view=doc?.defaultView
  if(!owner||!doc||!slot||!outer||slot.nodeType!==1||outer.nodeType!==1||!view||view.document!==doc)throw Error('Actual source SVG owner required')
  const pen=slot as SVGGElement,outlines=outer as SVGGElement,tree:Element[]=[],expectedCSS=new Map<SVGRectElement,Map<string,string>>()
  for(let i=0;i<policy.segments.length;i++){
   const n=nodes[i],{group:g,ink:p,rect:r,clipPath:c}=n,id=clipIds[i],defs=c?.parentNode
   if(!g||!p||!r||!c||!defs||defs.nodeType!==1||!/^[A-Za-z0-9_:.-]+$/.test(id)||!id.endsWith('-'+(policy.pen-1)+'-'+i))throw Error('Exact original mask nodes and source-index id required')
   const css=new Map<string,string>();for(const[k,v]of Object.entries(frame.clip)){const value=String(v);r.setAttribute(k,value);r.style.setProperty(k,value+'px');css.set(k,r.style.getPropertyValue(k))}expectedCSS.set(r,css)
   if(frame.originalPDirect)p.removeAttribute('clip-path');else p.setAttribute('clip-path','url(#'+id+'-u7aea-local-prefix-clip)')
   tree.push(g,p,r,c,defs as Element)
  }
  const seen=new Set<Element>();let ancestor:Element|null=pen
  while(ancestor){if(seen.has(ancestor))throw Error('Cyclic source owner');seen.add(ancestor);tree.push(ancestor);if(ancestor===owner)break;const parent:ParentNode|null=ancestor.parentNode;ancestor=parent&&parent.nodeType===1?parent as Element:null}
  if(ancestor!==owner)throw Error('Disconnected first source pen')
  const parents=new Map(tree.map(n=>[n,n.parentNode]))
  const exact=(visible:string,committed:boolean)=>{
   if(owner.getAttribute('viewBox')!=='0 0 100 100'||pen.parentNode!==outlines||outlines.getAttribute('data-stroke-outlines')!=='true'||outlines.children.length!==13||outlines.children[policy.pen-1]!==pen||pen.getAttribute('data-outline-stroke')!==String(policy.pen)||pen.children.length!==policy.segments.length)return false
   for(let i=0;i<policy.segments.length;i++){
    const {group:g,ink:p,rect:r,clipPath:c}=nodes[i],id=clipIds[i],defs=c!.parentNode as SVGDefsElement
    if(g!.localName!=='g'||p!.localName!=='path'||r!.localName!=='rect'||c!.localName!=='clipPath'||defs.localName!=='defs'||g!.parentNode!==pen||pen.children[i]!==g||g!.children.length!==2||g!.children[0]!==defs||g!.children[1]!==p||p!.parentNode!==g||defs.parentNode!==g||defs.children.length!==1||defs.children[0]!==c||c!.children.length!==1||c!.children[0]!==r||r!.parentNode!==c||g!.getAttribute('data-stroke-start-gate')!==policy.id||g!.getAttribute('data-stroke-reveal-policy')!==policy.kind||g!.getAttribute('data-stroke-reveal-progress')!==String(progress)||g!.getAttribute(PREFIX+'mask')!==String(i+1)||g!.getAttribute(PREFIX+'clip')!==id||g!.getAttribute(PREFIX+'fingerprint')!==policy.proofFingerprint||p!.getAttribute('d')!==segments[i].outline||p!.getAttribute('visibility')!==visible||p!.getAttribute(PREFIX+'committed')!==String(committed)||p!.getAttribute('clip-path')!==(frame.originalPDirect?null:'url(#'+id+'-u7aea-local-prefix-clip)')||['mask','pathLength','stroke-dasharray','stroke-dashoffset'].some(k=>p!.getAttribute(k)!==null)||c!.getAttribute('id')!==id+'-u7aea-local-prefix-clip'||c!.getAttribute('clipPathUnits')!=='userSpaceOnUse'||Object.entries(frame.clip).some(([k,v])=>r!.getAttribute(k)!==String(v)))return false
   }
   return true
  }
  const stable=(visible:string,committed:boolean)=>{
   if(!exact(visible,committed)||owner.ownerDocument!==doc||doc.defaultView!==view||view.document!==doc)return false
   const inks=nodes.map(n=>n.ink)
   for(const n of tree){const cs=view.getComputedStyle(n);if(!n.isConnected||n.ownerDocument!==doc||n.namespaceURI!==NS||n.parentNode!==parents.get(n)||(n!==owner&&(n as SVGElement).ownerSVGElement!==owner)||['mask','transform','filter'].some(k=>n.getAttribute(k)!==null)||(!inks.includes(n as SVGPathElement)&&n.getAttribute('clip-path')!==null)||cs.display==='none'||Number(cs.opacity)!==1||Number(cs.fillOpacity)!==1||(!inks.includes(n as SVGPathElement)&&cs.visibility!=='visible')||cs.transform!=='none'||cs.filter!=='none'||cs.mixBlendMode!=='normal'||!['','none'].includes(cs.getPropertyValue('mask-image'))||['translate','rotate','scale'].some(k=>!['','none'].includes(cs.getPropertyValue(k)))||(!inks.includes(n as SVGPathElement)&&cs.clipPath!=='none'))return false}
   for(let i=0;i<policy.segments.length;i++){
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

export const LOCAL_U7AEA_SOURCE_PREFIX_INPUT=Object.freeze({fullProof:FIXED.fullProof,identity:FIXED.identity,strokes:STROKES})
export const LOCAL_U7AEA_SOURCE_PREFIX_SOURCE=freeze({glyph:'竪',root:'lingo-u7aea-no-extra-v1',pens:13,masks:16,localAuthoredRoot:true,originalPublicWhole:false,logicalPens:[8,9,11,12],sourceGrouping:FIXED.sourceGroups,sourceGuideOrWidthOrWeightsChanged:false,authorPrefixNotOriginalClock:true,previewOnly:true,nativeForwardApproval:false,runtimeApplied:false,compiledSHA256:'c59c97d44ce071358ae98d1e01b34d32447276e5ab736f88d59766262dc0f110'})
export const LOCAL_U7AEA_SOURCE_PREFIX_INPUT_SHA256=Object.freeze({"docs/hanja-source-original-u7aea-local-2026-10-27/fixtures-draft.json":"9b6539a02fcad5e919ba79b193463f1e26556d434098f0154df0cb8a54a2c91e","docs/hanja-source-original-u7aea-local-2026-10-27/five-prefix-conditions-proof.json":"52f0198afcbc1d9fd29b9a9e93391f3388a109b32317425f0da5d4d761e73a80","docs/hanja-source-original-u7aea-local-2026-10-27/verify-five-prefix-conditions.py":"f61d280a2efec8aeeac5b4ed01074aed51248d7d4dea21aef780462e706db48f","docs/hanja-official-media-compare-u7aea-2026-10-27/native-direction-review.json":"32fedac3cf918dfefa6dce1de9df8eebe895c68deb271221961eaa2ee5a2f43a"})
