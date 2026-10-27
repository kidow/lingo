/** Preview only: exact locally authored 饛 P under one cap-free whole-logical author clock. */
import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import fixture from '../docs/hanja-source-original-u995b-local-2026-10-27/fixtures-draft.json' with {type:'json'}
const FIXED=fixture.u995b,STROKES=FIXED.strokes as HanjaOutlineStrokes,NS='http://www.w3.org/2000/svg',PREFIX='data-u995b-22-local-prefix-'
function freeze<T>(v:T):T{if(v&&typeof v==='object')for(const d of Object.values(Object.getOwnPropertyDescriptors(v))){if('value'in d)freeze(d.value)}return Object.freeze(v)}
function same(a:unknown,b:unknown):boolean{
 if(Object.is(a,b))return true
 if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false
 const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b)
 return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&same(x.value,y.value)})
}
freeze(FIXED)
export type LocalU995b22SourcePrefixContext=Readonly<{id:'u995b-local-source-prefix-preview'}>
const CONTEXT:LocalU995b22SourcePrefixContext=Object.freeze({id:'u995b-local-source-prefix-preview'})
export function makeLocalU995b22SourcePrefixContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):LocalU995b22SourcePrefixContext|null{try{return arguments.length===3&&same(proof,FIXED.fullProof)&&same(identity,FIXED.identity)&&same(strokes,STROKES)?CONTEXT:null}catch{return null}}
export type LocalU995b22SourcePrefixPolicy=Readonly<{id:string;kind:'source-union-axis-prefix-u995b-22-local';pen:22;segments:readonly HanjaOutlineSegment[];axis:'x'|'y';start:number;finish:number;outer:readonly[number,number,number,number];proofFingerprint:string;previewOnly:true}>
function policy(pen:22,axis:'x'|'y',start:number,finish:number,proofFingerprint:string):LocalU995b22SourcePrefixPolicy{
 const segments=STROKES[pen-1],outer=[Math.min(...segments.map(s=>s.bounds[0]))-1,Math.min(...segments.map(s=>s.bounds[1]))-1,Math.max(...segments.map(s=>s.bounds[2]))+1,Math.max(...segments.map(s=>s.bounds[3]))+1]as[number,number,number,number]
 return freeze({id:'u995b-22-local-source-prefix-'+pen,kind:'source-union-axis-prefix-u995b-22-local',pen,segments,axis,start,finish,outer,proofFingerprint,previewOnly:true})
}
const POLICIES=freeze([policy(22,'x',90.4,75.6,'1569aef47cab968f9390795b78a313500d5cb68c4e7fd6b1cbdba427283ff2a9')])
/** Zero-based logical pen index. A whole logical stroke is the sole policy owner. */
export function localU995b22SourcePrefixPolicy(context:LocalU995b22SourcePrefixContext|null,pen:number):LocalU995b22SourcePrefixPolicy|null{return context===CONTEXT?POLICIES.find(p=>p.pen===pen+1)??null:null}
function source(policy:LocalU995b22SourcePrefixPolicy,segments:readonly HanjaOutlineSegment[]){if(!POLICIES.includes(policy)||!same(segments,policy.segments))throw Error('Private policy and all exact original logical mask P/Q/width/weights required')}
export function sampleLocalU995b22SourcePrefixFrame(policy:LocalU995b22SourcePrefixPolicy,segments:readonly HanjaOutlineSegment[],progress:number){
 source(policy,segments);if(!Number.isFinite(progress)||progress<0||progress>1)throw Error('Finite whole-logical unit author progress required')
 const cutoff=policy.start+(policy.finish-policy.start)*progress,[x0,y0,x1,y1]=policy.outer
 const clip=Object.freeze(policy.axis==='x'?{x:cutoff,y:y0,width:x1-cutoff,height:y1-y0}:{x:x0,y:y0,width:x1-x0,height:cutoff-y0})
 return Object.freeze({policyId:policy.id,progress,phase:progress===0?'empty':progress===1?'full':'source-union-'+policy.axis+'-prefix',visible:progress>0,originalPDirect:progress===1,cutoff,clip,outlines:Object.freeze(segments.map(s=>s.outline)),sourceGuides:Object.freeze(segments.map(s=>s.revealPath??null)),sourceWeights:Object.freeze(segments.map(s=>s.weight)),sourceWidths:Object.freeze(segments.map(s=>s.revealWidth??null)),originalMaskCount:segments.length,sourceGroupingChanged:false as const,wholeLogicalClock:true as const,authorClock:'source-author-common-axis-prefix' as const,originalGuideOrMaskWeightClockEquivalent:false as const,sourceLQRestarted:false as const,UARead:false as const,previewOnly:true as const,nativeForwardApproval:false as const,runtimeApplied:false as const})
}
export type LocalU995b22SourcePrefixMaskNodes={group:SVGGElement|null;ink:SVGPathElement|null;rect:SVGRectElement|null;clipPath:SVGClipPathElement|null}
export type LocalU995b22SourcePrefixNodes=readonly LocalU995b22SourcePrefixMaskNodes[]
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

function canonicalRectGeometry(owner:SVGSVGElement,doc:Document,view:Window,shape:Readonly<{x:number;y:number;width:number;height:number}>){
 const host=doc.createElementNS(NS,'g'),probe=doc.createElementNS(NS,'rect'),keys=['x','y','width','height']as const
 const neutral={display:'inline',visibility:'hidden',opacity:'0',fill:'none',stroke:'none',transform:'none',filter:'none','clip-path':'none','mask-image':'none',translate:'none',rotate:'none',scale:'none',animation:'none',transition:'none'}
 for(const node of[host,probe])for(const[k,v]of Object.entries(neutral))node.style.setProperty(k,v,'important')
 for(const k of keys){probe.setAttribute(k,String(shape[k]));probe.style.setProperty(k,String(shape[k])+'px','important')}
 const inline=new Map(keys.map(k=>[k,probe.style.getPropertyValue(k)]))
 host.appendChild(probe)
 try{
  owner.appendChild(host)
  const exact=()=>host.parentNode===owner&&probe.parentNode===host&&host.children.length===1&&host.children[0]===probe&&host.ownerSVGElement===owner&&probe.ownerSVGElement===owner&&host.ownerDocument===doc&&probe.ownerDocument===doc&&host.isConnected&&probe.isConnected&&doc.defaultView===view&&view.document===doc&&keys.every(k=>probe.getAttribute(k)===String(shape[k])&&probe.style.getPropertyPriority(k)==='important'&&inline.get(k)!==''&&probe.style.getPropertyValue(k)===inline.get(k))
  if(!exact())throw Error('Connected isolated canonical SVG rectangle required')
  for(const node of[host,probe]){
   const style=view.getComputedStyle(node)
   if(style.display==='none'||style.visibility!=='hidden'||Number(style.opacity)!==0||style.fill!=='none'||style.stroke!=='none'||style.transform!=='none'||style.filter!=='none'||style.clipPath!=='none'||!['','none'].includes(style.getPropertyValue('mask-image'))||['translate','rotate','scale'].some(k=>!['','none'].includes(style.getPropertyValue(k))))throw Error('Canonical rectangle probe must have no paint or effects')
  }
  const computed=view.getComputedStyle(probe),css=new Map(keys.map(k=>[k,computed.getPropertyValue(k)])),b=probe.getBBox(),bounds={x:b.x,y:b.y,width:b.width,height:b.height}
  if([...css.values()].some(v=>!v.endsWith('px')||!Number.isFinite(Number(v.slice(0,-2))))||!Object.values(bounds).every(Number.isFinite)||(shape.width>0&&shape.height>0&&(bounds.width<=0||bounds.height<=0))||!exact())throw Error('Finite noncollapsed browser-canonical rectangle required')
  return{css,bounds}
 }finally{host.remove()}
}
/** Commits every original logical mask in one owner/frame, or hides all. No epsilon snap. */
export function commitLocalU995b22SourcePrefix(policy:LocalU995b22SourcePrefixPolicy,segments:readonly HanjaOutlineSegment[],progress:number,clipIds:readonly string[],nodes:LocalU995b22SourcePrefixNodes){
 const reset=()=>{for(const n of nodes){n.ink?.setAttribute('visibility','hidden');n.ink?.setAttribute(PREFIX+'committed','false')}};reset()
 try{
  const frame=sampleLocalU995b22SourcePrefixFrame(policy,segments,progress)
  if(nodes.length!==policy.segments.length||clipIds.length!==policy.segments.length||new Set(clipIds).size!==clipIds.length)throw Error('Exact original source-mask owners required')
  const first=nodes[0],owner=first.group?.ownerSVGElement,doc=first.group?.ownerDocument,slot=first.group?.parentNode,outer=slot?.parentNode,view=doc?.defaultView
  if(!owner||!doc||!slot||!outer||slot.nodeType!==1||outer.nodeType!==1||!view||view.document!==doc)throw Error('Actual source SVG owner required')
  const pen=slot as SVGGElement,outlines=outer as SVGGElement,tree:Element[]=[],expectedCSS=new Map<SVGRectElement,Map<string,string>>(),canonicalGeometry=new Map<SVGRectElement,ReturnType<typeof canonicalRectGeometry>>()
  for(let i=0;i<policy.segments.length;i++){
   const n=nodes[i],{group:g,ink:p,rect:r,clipPath:c}=n,id=clipIds[i],defs=c?.parentNode
   if(!g||!p||!r||!c||!defs||defs.nodeType!==1||!/^[A-Za-z0-9_:.-]+$/.test(id)||!id.endsWith('-'+(policy.pen-1)+'-'+i))throw Error('Exact original mask nodes and source-index id required')
   const css=new Map<string,string>();for(const[k,v]of Object.entries(frame.clip)){const value=String(v);r.setAttribute(k,value);r.style.setProperty(k,value+'px');css.set(k,r.style.getPropertyValue(k))}expectedCSS.set(r,css);canonicalGeometry.set(r,canonicalRectGeometry(owner,doc,view,frame.clip))
   if(frame.originalPDirect)p.removeAttribute('clip-path');else p.setAttribute('clip-path','url(#'+id+'-u995b-22-local-prefix-clip)')
   tree.push(g,p,r,c,defs as Element)
  }
  const seen=new Set<Element>();let ancestor:Element|null=pen
  while(ancestor){if(seen.has(ancestor))throw Error('Cyclic source owner');seen.add(ancestor);tree.push(ancestor);if(ancestor===owner)break;const parent:ParentNode|null=ancestor.parentNode;ancestor=parent&&parent.nodeType===1?parent as Element:null}
  if(ancestor!==owner)throw Error('Disconnected first source pen')
  const parents=new Map(tree.map(n=>[n,n.parentNode]))
  const exact=(visible:string,committed:boolean)=>{
   if(owner.getAttribute('viewBox')!=='0 0 100 100'||pen.parentNode!==outlines||outlines.getAttribute('data-stroke-outlines')!=='true'||outlines.children.length!==23||outlines.children[policy.pen-1]!==pen||pen.getAttribute('data-outline-stroke')!==String(policy.pen)||pen.children.length!==policy.segments.length)return false
   for(let i=0;i<policy.segments.length;i++){
    const {group:g,ink:p,rect:r,clipPath:c}=nodes[i],id=clipIds[i],defs=c!.parentNode as SVGDefsElement
    if(g!.localName!=='g'||p!.localName!=='path'||r!.localName!=='rect'||c!.localName!=='clipPath'||defs.localName!=='defs'||g!.parentNode!==pen||pen.children[i]!==g||g!.children.length!==2||g!.children[0]!==defs||g!.children[1]!==p||p!.parentNode!==g||defs.parentNode!==g||defs.children.length!==1||defs.children[0]!==c||c!.children.length!==1||c!.children[0]!==r||r!.parentNode!==c||g!.getAttribute('data-stroke-start-gate')!==policy.id||g!.getAttribute('data-stroke-reveal-policy')!==policy.kind||g!.getAttribute('data-stroke-reveal-progress')!==String(progress)||g!.getAttribute(PREFIX+'mask')!==String(i+1)||g!.getAttribute(PREFIX+'clip')!==id||g!.getAttribute(PREFIX+'fingerprint')!==policy.proofFingerprint||p!.getAttribute('d')!==segments[i].outline||p!.getAttribute('visibility')!==visible||p!.getAttribute(PREFIX+'committed')!==String(committed)||p!.getAttribute('clip-path')!==(frame.originalPDirect?null:'url(#'+id+'-u995b-22-local-prefix-clip)')||['mask','pathLength','stroke-dasharray','stroke-dashoffset'].some(k=>p!.getAttribute(k)!==null)||c!.getAttribute('id')!==id+'-u995b-22-local-prefix-clip'||c!.getAttribute('clipPathUnits')!=='userSpaceOnUse'||Object.entries(frame.clip).some(([k,v])=>r!.getAttribute(k)!==String(v)))return false
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
    const canonical=canonicalGeometry.get(r!)!
    for(const[k,v]of css)if(v===''||r!.style.getPropertyValue(k)!==v||r!.style.getPropertyPriority(k)!==''||rectStyle.getPropertyValue(k)!==canonical.css.get(k as 'x'|'y'|'width'|'height'))return false
    const actualBox=r!.getBBox();if(!(['x','y','width','height']as const).every(k=>Number.isFinite(actualBox[k])&&actualBox[k]===canonical.bounds[k]))return false
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

export const LOCAL_U995B22_SOURCE_PREFIX_INPUT=Object.freeze({fullProof:FIXED.fullProof,identity:FIXED.identity,strokes:STROKES})
export const LOCAL_U995B22_SOURCE_PREFIX_SOURCE=freeze({glyph:'饛',root:'lingo-u995b-no-extra-v1',pens:23,masks:26,polygons:46,localAuthoredRoot:true,mixedParts:false,originalPublicWhole:false,logicalPens:[22],sourceGrouping:FIXED.sourceGroups,sourceGuideOrWidthOrWeightsChanged:false,authorPrefixNotOriginalClock:true,previewOnly:true,nativeForwardApproval:false,runtimeApplied:false,compiledSHA256:'d661f0f15ef21322c84c0c8eeb5e9ea030e3ab705de8851e4d9b9233ef5b5238',sourceDirectionApprovalPending:true,whole19OrOtherPensAdopted:false})
export const LOCAL_U995B22_SOURCE_PREFIX_INPUT_SHA256=Object.freeze({'docs/hanja-source-original-u995b-local-2026-10-27/fixtures-draft.json':'43c5479209823cc8d6a908098a56cb3ff18eb2d273f4e274c9011f821a4319b0','docs/hanja-source-original-u995b-local-2026-10-27/22-connected-X-prefix-proof.json':'1569aef47cab968f9390795b78a313500d5cb68c4e7fd6b1cbdba427283ff2a9','docs/hanja-official-media-compare-u995b-2026-10-27/native-direction-review.json':'3d6d8ed47b3eb3183a8f24cdc672dbe025baf87fe8b12ed98bd444a1684c5691'})
