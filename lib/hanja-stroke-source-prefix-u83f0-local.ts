/** Preview only: exact locally authored 菰 P under one cap-free whole-logical author clock. */
import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import fixture from '../docs/hanja-source-original-u83f0-local-components-2026-10-27/fixtures-draft.json' with {type:'json'}
const FIXED=fixture.u83f0,STROKES=FIXED.strokes as HanjaOutlineStrokes,NS='http://www.w3.org/2000/svg',PREFIX='data-u83f0-local-prefix-'
function freeze<T>(v:T):T{if(v&&typeof v==='object')for(const d of Object.values(Object.getOwnPropertyDescriptors(v))){if('value'in d)freeze(d.value)}return Object.freeze(v)}
function same(a:unknown,b:unknown):boolean{
 if(Object.is(a,b))return true
 if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false
 const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b)
 return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&same(x.value,y.value)})
}
freeze(FIXED)
export type LocalU83f0SourcePrefixContext=Readonly<{id:'u83f0-local-components-source-prefix-preview'}>
const CONTEXT:LocalU83f0SourcePrefixContext=Object.freeze({id:'u83f0-local-components-source-prefix-preview'})
export function makeLocalU83f0SourcePrefixContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):LocalU83f0SourcePrefixContext|null{try{return arguments.length===3&&same(proof,FIXED.fullProof)&&same(identity,FIXED.identity)&&same(strokes,STROKES)?CONTEXT:null}catch{return null}}
export type LocalU83f0SourcePrefixPolicy=Readonly<{id:string;kind:'source-union-axis-prefix-u83f0-local';pen:8|9|11|12;segments:readonly HanjaOutlineSegment[];axis:'x'|'y';start:number;finish:number;outer:readonly[number,number,number,number];proofFingerprint:string;previewOnly:true}>
function policy(pen:8|9|11|12,axis:'x'|'y',start:number,finish:number,proofFingerprint:string):LocalU83f0SourcePrefixPolicy{
 const segments=STROKES[pen-1],outer=[Math.min(...segments.map(s=>s.bounds[0]))-1,Math.min(...segments.map(s=>s.bounds[1]))-1,Math.max(...segments.map(s=>s.bounds[2]))+1,Math.max(...segments.map(s=>s.bounds[3]))+1]as[number,number,number,number]
 return freeze({id:'u83f0-local-source-prefix-'+pen,kind:'source-union-axis-prefix-u83f0-local',pen,segments,axis,start,finish,outer,proofFingerprint,previewOnly:true})
}
const POLICIES=freeze([
 policy(8,'x',82.7,46.3,'b3ce1dea162f901955f646f16feceb86463e6575efb9f0489073e9a50af1e8ab'),
 policy(9,'y',36.8,92.9,'8602417b5a9f06de636713d32864ef40175b1593c951cd6e4a8ff6b8358e9d79'),
 policy(11,'y',76.25,90.35,'8602417b5a9f06de636713d32864ef40175b1593c951cd6e4a8ff6b8358e9d79'),
 policy(12,'y',37.2,93.7,'8602417b5a9f06de636713d32864ef40175b1593c951cd6e4a8ff6b8358e9d79')
])
/** Zero-based logical pen index. A whole logical stroke is the sole policy owner. */
export function localU83f0SourcePrefixPolicy(context:LocalU83f0SourcePrefixContext|null,pen:number):LocalU83f0SourcePrefixPolicy|null{return context===CONTEXT?POLICIES.find(p=>p.pen===pen+1)??null:null}
function source(policy:LocalU83f0SourcePrefixPolicy,segments:readonly HanjaOutlineSegment[]){if(!POLICIES.includes(policy)||!same(segments,policy.segments))throw Error('Private policy and all exact original logical mask P/Q/width/weights required')}
export function sampleLocalU83f0SourcePrefixFrame(policy:LocalU83f0SourcePrefixPolicy,segments:readonly HanjaOutlineSegment[],progress:number){
 source(policy,segments);if(!Number.isFinite(progress)||progress<0||progress>1)throw Error('Finite whole-logical unit author progress required')
 const cutoff=policy.start+(policy.finish-policy.start)*progress,[x0,y0,x1,y1]=policy.outer
 const clip=Object.freeze(policy.axis==='x'?{x:cutoff,y:y0,width:x1-cutoff,height:y1-y0}:{x:x0,y:y0,width:x1-x0,height:cutoff-y0})
 return Object.freeze({policyId:policy.id,progress,phase:progress===0?'empty':progress===1?'full':'source-union-'+policy.axis+'-prefix',visible:progress>0,originalPDirect:progress===1,cutoff,clip,outlines:Object.freeze(segments.map(s=>s.outline)),sourceGuides:Object.freeze(segments.map(s=>s.revealPath??null)),sourceWeights:Object.freeze(segments.map(s=>s.weight)),sourceWidths:Object.freeze(segments.map(s=>s.revealWidth??null)),originalMaskCount:segments.length,sourceGroupingChanged:false as const,wholeLogicalClock:true as const,authorClock:'source-author-common-axis-prefix' as const,originalGuideOrMaskWeightClockEquivalent:false as const,sourceLQRestarted:false as const,UARead:false as const,previewOnly:true as const,nativeForwardApproval:false as const,runtimeApplied:false as const})
}
export type LocalU83f0SourcePrefixMaskNodes={group:SVGGElement|null;ink:SVGPathElement|null;rect:SVGRectElement|null;clipPath:SVGClipPathElement|null}
export type LocalU83f0SourcePrefixNodes=readonly LocalU83f0SourcePrefixMaskNodes[]
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
export function commitLocalU83f0SourcePrefix(policy:LocalU83f0SourcePrefixPolicy,segments:readonly HanjaOutlineSegment[],progress:number,clipIds:readonly string[],nodes:LocalU83f0SourcePrefixNodes){
 const reset=()=>{for(const n of nodes){n.ink?.setAttribute('visibility','hidden');n.ink?.setAttribute(PREFIX+'committed','false')}};reset()
 try{
  const frame=sampleLocalU83f0SourcePrefixFrame(policy,segments,progress)
  if(nodes.length!==policy.segments.length||clipIds.length!==policy.segments.length||new Set(clipIds).size!==clipIds.length)throw Error('Exact original source-mask owners required')
  const first=nodes[0],owner=first.group?.ownerSVGElement,doc=first.group?.ownerDocument,slot=first.group?.parentNode,outer=slot?.parentNode,view=doc?.defaultView
  if(!owner||!doc||!slot||!outer||slot.nodeType!==1||outer.nodeType!==1||!view||view.document!==doc)throw Error('Actual source SVG owner required')
  const pen=slot as SVGGElement,outlines=outer as SVGGElement,tree:Element[]=[],expectedCSS=new Map<SVGRectElement,Map<string,string>>()
  for(let i=0;i<policy.segments.length;i++){
   const n=nodes[i],{group:g,ink:p,rect:r,clipPath:c}=n,id=clipIds[i],defs=c?.parentNode
   if(!g||!p||!r||!c||!defs||defs.nodeType!==1||!/^[A-Za-z0-9_:.-]+$/.test(id)||!id.endsWith('-'+(policy.pen-1)+'-'+i))throw Error('Exact original mask nodes and source-index id required')
   const css=new Map<string,string>();for(const[k,v]of Object.entries(frame.clip)){const value=String(v);r.setAttribute(k,value);r.style.setProperty(k,value+'px');css.set(k,r.style.getPropertyValue(k))}expectedCSS.set(r,css)
   if(frame.originalPDirect)p.removeAttribute('clip-path');else p.setAttribute('clip-path','url(#'+id+'-u83f0-local-prefix-clip)')
   tree.push(g,p,r,c,defs as Element)
  }
  const seen=new Set<Element>();let ancestor:Element|null=pen
  while(ancestor){if(seen.has(ancestor))throw Error('Cyclic source owner');seen.add(ancestor);tree.push(ancestor);if(ancestor===owner)break;const parent:ParentNode|null=ancestor.parentNode;ancestor=parent&&parent.nodeType===1?parent as Element:null}
  if(ancestor!==owner)throw Error('Disconnected first source pen')
  const parents=new Map(tree.map(n=>[n,n.parentNode]))
  const exact=(visible:string,committed:boolean)=>{
   if(owner.getAttribute('viewBox')!=='0 0 100 100'||pen.parentNode!==outlines||outlines.getAttribute('data-stroke-outlines')!=='true'||outlines.children.length!==12||outlines.children[policy.pen-1]!==pen||pen.getAttribute('data-outline-stroke')!==String(policy.pen)||pen.children.length!==policy.segments.length)return false
   for(let i=0;i<policy.segments.length;i++){
    const {group:g,ink:p,rect:r,clipPath:c}=nodes[i],id=clipIds[i],defs=c!.parentNode as SVGDefsElement
    if(g!.localName!=='g'||p!.localName!=='path'||r!.localName!=='rect'||c!.localName!=='clipPath'||defs.localName!=='defs'||g!.parentNode!==pen||pen.children[i]!==g||g!.children.length!==2||g!.children[0]!==defs||g!.children[1]!==p||p!.parentNode!==g||defs.parentNode!==g||defs.children.length!==1||defs.children[0]!==c||c!.children.length!==1||c!.children[0]!==r||r!.parentNode!==c||g!.getAttribute('data-stroke-start-gate')!==policy.id||g!.getAttribute('data-stroke-reveal-policy')!==policy.kind||g!.getAttribute('data-stroke-reveal-progress')!==String(progress)||g!.getAttribute(PREFIX+'mask')!==String(i+1)||g!.getAttribute(PREFIX+'clip')!==id||g!.getAttribute(PREFIX+'fingerprint')!==policy.proofFingerprint||p!.getAttribute('d')!==segments[i].outline||p!.getAttribute('visibility')!==visible||p!.getAttribute(PREFIX+'committed')!==String(committed)||p!.getAttribute('clip-path')!==(frame.originalPDirect?null:'url(#'+id+'-u83f0-local-prefix-clip)')||['mask','pathLength','stroke-dasharray','stroke-dashoffset'].some(k=>p!.getAttribute(k)!==null)||c!.getAttribute('id')!==id+'-u83f0-local-prefix-clip'||c!.getAttribute('clipPathUnits')!=='userSpaceOnUse'||Object.entries(frame.clip).some(([k,v])=>r!.getAttribute(k)!==String(v)))return false
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

export const LOCAL_U83F0_SOURCE_PREFIX_INPUT=Object.freeze({fullProof:FIXED.fullProof,identity:FIXED.identity,strokes:STROKES})
export const LOCAL_U83F0_SOURCE_PREFIX_SOURCE=freeze({glyph:'菰',root:'lingo-u83f0-components-v1',pens:12,masks:16,localAuthoredRoot:true,originalPublicWhole:false,logicalPens:[8,9,11,12],sourceGrouping:FIXED.sourceGroups,sourceGuideOrWidthOrWeightsChanged:false,authorPrefixNotOriginalClock:true,previewOnly:true,nativeForwardApproval:false,runtimeApplied:false,compiledSHA256:'efbf229cb5e874b17bb812b380408f71dccd6734a2653eda26d207cbaab50606'})
export const LOCAL_U83F0_SOURCE_PREFIX_INPUT_SHA256=Object.freeze({
 'docs/hanja-source-original-u83f0-local-components-2026-10-27/fixtures-draft.json':'80df51355acb56c1b1d69fe5c67e866fb1d484f325e361d91a0b582e3ea11485',
 'docs/hanja-source-original-u83f0-local-components-2026-10-27/logical-axis-prefix-conditions-review.json':'8602417b5a9f06de636713d32864ef40175b1593c951cd6e4a8ff6b8358e9d79',
 'docs/hanja-source-original-u83f0-local-components-2026-10-27/pen8-connected-x-prefix-review.json':'b3ce1dea162f901955f646f16feceb86463e6575efb9f0489073e9a50af1e8ab',
 'docs/hanja-source-original-u83f0-local-components-2026-10-27/pen8-y-prefix-and-macro-direction-review.json':'c3e4612c7958d1dd5cee37e807ee556c97fa05a53bf632286e8900ab853a0c5d',
 'docs/hanja-official-media-compare-u83f0-2026-10-23/official-temporal-native-review.json':'08ab76a6600693b63663b7c6525314858112fa905b052df4c0009caf3c8d761c'
})
