/** Original 凞 source-axis19 draft; four contact/hook masks excluded. No native/runtime approval. */
import {outlineSegmentProgress,outlineClip,type HanjaOutlineSegment,type HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import fixture from '../docs/hanja-source-original-u51de-base-2026-10-27/fixtures-draft.json' with {type:'json'}
const FIXED=fixture.u51de,STROKES=FIXED.strokes as HanjaOutlineStrokes
const NS='http://www.w3.org/2000/svg',PREFIX='data-u51de-base-source-reveal-'
function freeze<T>(v:T):T{if(v&&typeof v==='object')for(const d of Object.values(Object.getOwnPropertyDescriptors(v))){if('value'in d)freeze(d.value)}return Object.freeze(v)}
function same(a:unknown,b:unknown):boolean{
 if(Object.is(a,b))return true
 if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false
 const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b)
 return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&same(x.value,y.value)})
}
freeze(FIXED)
export type ReviewedU51deBaseSourceRevealContext=Readonly<{id:'u51de-base-original-16-source-reveal'}>
const CONTEXT:ReviewedU51deBaseSourceRevealContext=Object.freeze({id:'u51de-base-original-16-source-reveal'})
export function makeReviewedU51deBaseSourceRevealContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU51deBaseSourceRevealContext|null{
 try{return arguments.length===3&&same(proof,FIXED.fullProof)&&same(identity,FIXED.identity)&&same(strokes,STROKES)?CONTEXT:null}catch{return null}
}
export type ReviewedU51deBaseSourceRevealPolicy=Readonly<{id:string;kind:'source-mask-x-prefix-u51de-base'|'source-mask-y-prefix-u51de-base';pen:number;mask:number;axis:'x'|'y';axisStart:number;axisFinish:number;segment:HanjaOutlineSegment;sourceBounds:readonly number[];anchor:readonly[number,number];sourceT:0;priorRequired:boolean;priorSegment:HanjaOutlineSegment|null;proofFingerprint:string;previewOnly:true}>
const POLICIES:readonly ReviewedU51deBaseSourceRevealPolicy[]=freeze([
{...{"id":"u51de-base-mask-y-prefix-1-1","kind":"source-mask-y-prefix-u51de-base","pen":1,"mask":1,"axis":"y","axisStart":9.45,"axisFinish":21.25,"anchor":[9.85,9.45],"sourceT":0,"priorRequired":false,"proofFingerprint":"0147e0711262d64634f465695abce31a06133511acef3229e42751950dc9b2ba"},segment:STROKES[0][0],sourceBounds:STROKES[0][0].bounds,priorSegment:null,previewOnly:true},
{...{"id":"u51de-base-mask-y-prefix-2-1","kind":"source-mask-y-prefix-u51de-base","pen":2,"mask":1,"axis":"y","axisStart":44.45,"axisFinish":68.4,"anchor":[7.1,44.45],"sourceT":0,"priorRequired":false,"proofFingerprint":"0147e0711262d64634f465695abce31a06133511acef3229e42751950dc9b2ba"},segment:STROKES[1][0],sourceBounds:STROKES[1][0].bounds,priorSegment:null,previewOnly:true},
{...{"id":"u51de-base-mask-y-prefix-2-2","kind":"source-mask-y-prefix-u51de-base","pen":2,"mask":2,"axis":"y","axisStart":53.4,"axisFinish":18.95,"anchor":[9.3,18.95],"sourceT":0,"priorRequired":true,"proofFingerprint":"0147e0711262d64634f465695abce31a06133511acef3229e42751950dc9b2ba"},segment:STROKES[1][1],sourceBounds:STROKES[1][1].bounds,priorSegment:STROKES[1][0],previewOnly:true},
{...{"id":"u51de-base-mask-y-prefix-3-1","kind":"source-mask-y-prefix-u51de-base","pen":3,"mask":1,"axis":"y","axisStart":9.4,"axisFinish":35.5,"anchor":[27.15,9.4],"sourceT":0,"priorRequired":false,"proofFingerprint":"0147e0711262d64634f465695abce31a06133511acef3229e42751950dc9b2ba"},segment:STROKES[2][0],sourceBounds:STROKES[2][0].bounds,priorSegment:null,previewOnly:true},
{...{"id":"u51de-base-mask-x-prefix-4-1","kind":"source-mask-x-prefix-u51de-base","pen":4,"mask":1,"axis":"x","axisStart":37.35,"axisFinish":64.3,"anchor":[37.35,7.65],"sourceT":0,"priorRequired":false,"proofFingerprint":"0147e0711262d64634f465695abce31a06133511acef3229e42751950dc9b2ba"},segment:STROKES[3][0],sourceBounds:STROKES[3][0].bounds,priorSegment:null,previewOnly:true},
{...{"id":"u51de-base-mask-y-prefix-5-1","kind":"source-mask-y-prefix-u51de-base","pen":5,"mask":1,"axis":"y","axisStart":12.65,"axisFinish":29.5,"anchor":[46.6,12.65],"sourceT":0,"priorRequired":false,"proofFingerprint":"0147e0711262d64634f465695abce31a06133511acef3229e42751950dc9b2ba"},segment:STROKES[4][0],sourceBounds:STROKES[4][0].bounds,priorSegment:null,previewOnly:true},
{...{"id":"u51de-base-mask-x-prefix-6-1","kind":"source-mask-x-prefix-u51de-base","pen":6,"mask":1,"axis":"x","axisStart":37.35,"axisFinish":60.05,"anchor":[37.35,27.5],"sourceT":0,"priorRequired":false,"proofFingerprint":"0147e0711262d64634f465695abce31a06133511acef3229e42751950dc9b2ba"},segment:STROKES[5][0],sourceBounds:STROKES[5][0].bounds,priorSegment:null,previewOnly:true},
{...{"id":"u51de-base-mask-x-prefix-7-1","kind":"source-mask-x-prefix-u51de-base","pen":7,"mask":1,"axis":"x","axisStart":37.35,"axisFinish":60.05,"anchor":[37.35,44.4],"sourceT":0,"priorRequired":false,"proofFingerprint":"0147e0711262d64634f465695abce31a06133511acef3229e42751950dc9b2ba"},segment:STROKES[6][0],sourceBounds:STROKES[6][0].bounds,priorSegment:null,previewOnly:true},
{...{"id":"u51de-base-mask-y-prefix-8-1","kind":"source-mask-y-prefix-u51de-base","pen":8,"mask":1,"axis":"y","axisStart":44.4,"axisFinish":62.65,"anchor":[46.6,44.4],"sourceT":0,"priorRequired":false,"proofFingerprint":"0147e0711262d64634f465695abce31a06133511acef3229e42751950dc9b2ba"},segment:STROKES[7][0],sourceBounds:STROKES[7][0].bounds,priorSegment:null,previewOnly:true},
{...{"id":"u51de-base-mask-y-prefix-9-1","kind":"source-mask-y-prefix-u51de-base","pen":9,"mask":1,"axis":"y","axisStart":10.15,"axisFinish":65.15,"anchor":[34.85,10.15],"sourceT":0,"priorRequired":false,"proofFingerprint":"e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e"},segment:STROKES[8][0],sourceBounds:STROKES[8][0].bounds,priorSegment:null,previewOnly:true},
{...{"id":"u51de-base-mask-x-prefix-9-2","kind":"source-mask-x-prefix-u51de-base","pen":9,"mask":2,"axis":"x","axisStart":37.35,"axisFinish":65.2,"anchor":[37.35,55.65],"sourceT":0,"priorRequired":true,"proofFingerprint":"e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e"},segment:STROKES[8][1],sourceBounds:STROKES[8][1].bounds,priorSegment:STROKES[8][0],previewOnly:true},
{...{"id":"u51de-base-mask-x-prefix-10-1","kind":"source-mask-x-prefix-u51de-base","pen":10,"mask":1,"axis":"x","axisStart":70.5,"axisFinish":87.5,"anchor":[70.5,11],"sourceT":0,"priorRequired":false,"proofFingerprint":"e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e"},segment:STROKES[9][0],sourceBounds:STROKES[9][0].bounds,priorSegment:null,previewOnly:true},
{...{"id":"u51de-base-mask-x-prefix-11-1","kind":"source-mask-x-prefix-u51de-base","pen":11,"mask":1,"axis":"x","axisStart":70.5,"axisFinish":87.5,"anchor":[70.5,34.5],"sourceT":0,"priorRequired":false,"proofFingerprint":"e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e"},segment:STROKES[10][0],sourceBounds:STROKES[10][0].bounds,priorSegment:null,previewOnly:true},
{...{"id":"u51de-base-mask-y-prefix-12-1","kind":"source-mask-y-prefix-u51de-base","pen":12,"mask":1,"axis":"y","axisStart":8.25,"axisFinish":61.25,"anchor":[67.75,8.25],"sourceT":0,"priorRequired":false,"proofFingerprint":"e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e"},segment:STROKES[11][0],sourceBounds:STROKES[11][0].bounds,priorSegment:null,previewOnly:true},
{...{"id":"u51de-base-mask-y-prefix-12-2","kind":"source-mask-y-prefix-u51de-base","pen":12,"mask":2,"axis":"y","axisStart":58.5,"axisFinish":66.5,"anchor":[67.75,58.5],"sourceT":0,"priorRequired":true,"proofFingerprint":"e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e"},segment:STROKES[11][1],sourceBounds:STROKES[11][1].bounds,priorSegment:STROKES[11][0],previewOnly:true},
{...{"id":"u51de-base-mask-y-prefix-13-1","kind":"source-mask-y-prefix-u51de-base","pen":13,"mask":1,"axis":"y","axisStart":70.45,"axisFinish":93.1,"anchor":[9.45,70.45],"sourceT":0,"priorRequired":false,"proofFingerprint":"e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e"},segment:STROKES[12][0],sourceBounds:STROKES[12][0].bounds,priorSegment:null,previewOnly:true},
{...{"id":"u51de-base-mask-y-prefix-14-1","kind":"source-mask-y-prefix-u51de-base","pen":14,"mask":1,"axis":"y","axisStart":71.05,"axisFinish":91.45,"anchor":[34.45,71.05],"sourceT":0,"priorRequired":false,"proofFingerprint":"e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e"},segment:STROKES[13][0],sourceBounds:STROKES[13][0].bounds,priorSegment:null,previewOnly:true},
{...{"id":"u51de-base-mask-y-prefix-15-1","kind":"source-mask-y-prefix-u51de-base","pen":15,"mask":1,"axis":"y","axisStart":70.95,"axisFinish":91.45,"anchor":[53.55,70.95],"sourceT":0,"priorRequired":false,"proofFingerprint":"e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e"},segment:STROKES[14][0],sourceBounds:STROKES[14][0].bounds,priorSegment:null,previewOnly:true},
{...{"id":"u51de-base-mask-y-prefix-16-1","kind":"source-mask-y-prefix-u51de-base","pen":16,"mask":1,"axis":"y","axisStart":70.45,"axisFinish":92.4,"anchor":[73.6,70.45],"sourceT":0,"priorRequired":false,"proofFingerprint":"e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e"},segment:STROKES[15][0],sourceBounds:STROKES[15][0].bounds,priorSegment:null,previewOnly:true}
]as const)

const PRIVATE=new WeakSet<object>(POLICIES)
const COMMITTED=new WeakMap<SVGGElement,{policy:ReviewedU51deBaseSourceRevealPolicy;ink:SVGPathElement;owner:SVGSVGElement;doc:Document;frameId:string;logicalProgress:number;id:string}>()
export function reviewedU51deBaseSourceRevealPolicy(context:ReviewedU51deBaseSourceRevealContext|null,pen:number,mask:number):ReviewedU51deBaseSourceRevealPolicy|null{return context===CONTEXT?POLICIES.find(p=>p.pen===pen+1&&p.mask===mask+1)??null:null}
function source(policy:ReviewedU51deBaseSourceRevealPolicy,segment:HanjaOutlineSegment){if(!policy||!PRIVATE.has(policy)||!same(segment,policy.segment))throw Error('Private 凞 source axis policy and unchanged original segment required')}
export type ReviewedU51deBaseSourceRevealFrame=Readonly<{policyId:string;progress:number;phase:'empty'|'source-mask-x-prefix'|'source-mask-y-prefix'|'full';visible:boolean;originalPDirect:boolean;outline:string|null;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;sourceGuide:string|undefined;sourceWidth:number|undefined;previewOnly:true;authorClock:'source-author-mask-axis-prefix';originalClockEquivalent:false;UARead:false}>
export function sampleReviewedU51deBaseSourceRevealFrame(policy:ReviewedU51deBaseSourceRevealPolicy,segment:HanjaOutlineSegment,p:number,priorProgress=0,priorOpaque=false):ReviewedU51deBaseSourceRevealFrame{
 source(policy,segment)
 if(!Number.isFinite(p)||p<0||p>1||!Number.isFinite(priorProgress)||priorProgress<0||priorProgress>1||typeof priorOpaque!=='boolean')throw Error('Finite unit source/prior progress required')
 if(p>0&&policy.priorRequired&&(priorProgress!==1||!priorOpaque))throw Error('Current-frame exact completed prior original P must be opaque')
 const [x0,y0,x1,y1]=policy.sourceBounds,start=policy.axisStart,finish=policy.axisFinish,cut=start+(finish-start)*p,low=Math.min(start,cut),size=Math.abs(cut-start)
 const clip=p>0&&p<1?Object.freeze(policy.axis==='x'?{x:low,y:y0,width:size,height:y1-y0}:{x:x0,y:low,width:x1-x0,height:size}):null
 return Object.freeze({policyId:policy.id,progress:p,phase:p===0?'empty':p===1?'full':policy.axis==='x'?'source-mask-x-prefix':'source-mask-y-prefix',visible:p>0,originalPDirect:p===1,outline:p===0?null:segment.outline,clip,sourceGuide:segment.revealPath,sourceWidth:segment.revealWidth,previewOnly:true,authorClock:'source-author-mask-axis-prefix',originalClockEquivalent:false,UARead:false})
}
export type ReviewedU51deBaseSourceRevealNodes={group:SVGGElement|null;ink:SVGPathElement|null;rect:SVGRectElement|null;clipPath:SVGClipPathElement|null}
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
/** Current-frame canonical render equivalence only, not stylesheet-origin purity. Collapsed nonnegative boxes are valid; source window coordinates never change. */
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
  if([...css.values()].some(v=>!v.endsWith('px')||!Number.isFinite(Number(v.slice(0,-2))))||!Object.values(bounds).every(Number.isFinite)||bounds.width<0||bounds.height<0||!exact())throw Error('Finite nonnegative browser-canonical rectangle required')
  return{css,bounds}
 }finally{host.remove()}
}

/** Exact hook peer projection only; the hook factory owns visibility/paint approval. */
function exactHookProjection(node:Element|undefined,amount:number,prior:number,logical:number,frameId:string,id:string,owner:SVGSVGElement|null,doc:Document):boolean{
 if(!node||node.localName!=='g'||!node.isConnected||node.ownerDocument!==doc||(node as SVGElement).ownerSVGElement!==owner||node.children.length!==2)return false
 const pre='data-u51de-base-source-hook-',defs=node.children[0],ink=node.children[1],clip=defs?.children[0],body=clip?.children[0],up=clip?.children[1],lambda=31/56,t=Math.max(0,(amount-lambda)/(1-lambda)),b={x:75.5,y:60.5,width:18.5*Math.min(1,amount/lambda),height:6},u={x:88,y:60.5-12.5*t,width:4,height:12.5*t},key=id+'-u51de-base-source-hook-clip'
 return node.getAttribute('data-stroke-start-gate')==='u51de-base-source-hook-12-3'&&node.getAttribute('data-stroke-reveal-policy')==='source-body-then-up-u51de-base'&&node.getAttribute('data-stroke-reveal-progress')===String(amount)&&node.getAttribute(pre+'context')==='u51de-base-original-16-source-hook'&&node.getAttribute(pre+'clip')===id&&node.getAttribute(pre+'fingerprint')==='e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e'&&node.getAttribute(pre+'prior-progress')===String(prior)&&node.getAttribute(pre+'logical-progress')===String(logical)&&node.getAttribute(pre+'frame')===frameId&&defs?.localName==='defs'&&defs.children.length===1&&clip?.localName==='clipPath'&&clip.id===key&&clip.getAttribute('clipPathUnits')==='userSpaceOnUse'&&clip.children.length===2&&body?.localName==='rect'&&body.id===id+'-u51de-base-source-hook-body'&&up?.localName==='rect'&&up.id===id+'-u51de-base-source-hook-up'&&Object.entries(b).every(([k,v])=>body.getAttribute(k)===String(v))&&Object.entries(u).every(([k,v])=>up.getAttribute(k)===String(v))&&ink.localName==='path'&&ink.getAttribute('d')===STROKES[11][2].outline&&['mask','pathLength','stroke-dasharray','stroke-dashoffset'].every(k=>ink.getAttribute(k)===null)&&ink.getAttribute('clip-path')===(amount===1?null:'url(#'+key+')')
}

/** Structural peer projection is not temporal approval. */
function exactAxisProjection(node:Element|undefined,pol:ReviewedU51deBaseSourceRevealPolicy,amount:number,prior:number,logical:number,frameId:string,id:string,owner:SVGSVGElement|null,doc:Document):boolean{
 if(!node||node.localName!=='g'||!node.isConnected||node.ownerDocument!==doc||(node as SVGElement).ownerSVGElement!==owner||node.children.length!==2)return false
 const defs=node.children[0],ink=node.children[1],clip=defs?.children[0],rect=clip?.children[0],frame=sampleReviewedU51deBaseSourceRevealFrame(pol,pol.segment,amount,prior,prior===1),shape=frame.clip??{x:pol.anchor[0],y:pol.anchor[1],width:0,height:0},key=id+'-u51de-base-source-reveal-clip'
 return node.getAttribute('data-stroke-start-gate')===pol.id&&node.getAttribute('data-stroke-reveal-policy')===pol.kind&&node.getAttribute('data-stroke-reveal-progress')===String(amount)&&node.getAttribute(PREFIX+'clip')===id&&node.getAttribute(PREFIX+'fingerprint')===pol.proofFingerprint&&node.getAttribute(PREFIX+'prior-progress')===String(prior)&&node.getAttribute(PREFIX+'logical-progress')===String(logical)&&node.getAttribute(PREFIX+'frame')===frameId&&defs?.localName==='defs'&&defs.children.length===1&&clip?.localName==='clipPath'&&clip.id===key&&clip.getAttribute('clipPathUnits')==='userSpaceOnUse'&&clip.children.length===1&&rect?.localName==='rect'&&Object.entries(shape).every(([k,v])=>rect.getAttribute(k)===String(v))&&ink.localName==='path'&&ink.getAttribute('d')===pol.segment.outline&&['mask','pathLength','stroke-dasharray','stroke-dashoffset'].every(k=>ink.getAttribute(k)===null)&&ink.getAttribute('clip-path')===(amount===1?null:'url(#'+key+')')
}
function projectedOwnerCount(policy:ReviewedU51deBaseSourceRevealPolicy,p:number,prior:number,logical:number,g:SVGGElement|null,frameId:string):number|null{
 if(!g||!frameId||g.getAttribute(PREFIX+'frame')!==frameId||!Number.isFinite(logical)||logical<0||logical>1||g.getAttribute(PREFIX+'logical-progress')!==String(logical))return null
 const segments=STROKES[policy.pen-1],amounts=outlineSegmentProgress(segments,logical),target=policy.mask-1,slot=g.parentNode as SVGGElement|null,id=g.getAttribute(PREFIX+'clip')
 if(!slot||!id||!id.endsWith('-'+(policy.pen-1)+'-'+target)||amounts[target]!==p||(target?amounts[target-1]:0)!==prior)return null
 const indices=amounts.map((v,i)=>i===target||policy.pen===12&&i===2||POLICIES.some(q=>q.pen===policy.pen&&q.mask===i+1)||v>0?i:-1).filter(i=>i>=0)
 if(slot.children.length!==indices.length||slot.children[indices.indexOf(target)]!==g)return null
 for(let position=0;position<indices.length;position++){
  const i=indices[position];if(i===target)continue
  const node:Element=slot.children[position],segment=segments[i],owner=g.ownerSVGElement,peer=POLICIES.find(q=>q.pen===policy.pen&&q.mask===i+1),clipId=id.slice(0,id.lastIndexOf('-')+1)+i
  if(!node||!node.isConnected||node.ownerDocument!==g.ownerDocument||(node as SVGElement).ownerSVGElement!==owner||node.parentNode!==slot)return null
  if(policy.pen===12&&i===2){if(!exactHookProjection(node,amounts[i],amounts[i-1],logical,frameId,clipId,owner,g.ownerDocument))return null;continue}
  if(peer){if(!exactAxisProjection(node,peer,amounts[i],i?amounts[i-1]:0,logical,frameId,clipId,owner,g.ownerDocument))return null;continue}
  if(amounts[i]===1){if(node.localName!=='path'||node.getAttribute('d')!==segment.outline||['clip-path','mask','pathLength','stroke-dasharray','stroke-dashoffset'].some(k=>node.getAttribute(k)!==null))return null}
  else{
   const defs=node.children[0],path=node.children[1],clip=defs?.children[0],guide=clip?.children[0]
   if(node.localName!=='g'||node.children.length!==2||defs?.localName!=='defs'||defs.children.length!==1||path?.localName!=='path'||path.getAttribute('d')!==segment.outline)return null
   if(segment.direction==='curve'){
    if(clip?.localName!=='mask'||clip.id!==clipId||clip.children.length!==1||[['maskUnits','userSpaceOnUse'],['x','0'],['y','0'],['width','100'],['height','100']].some(([k,v])=>clip.getAttribute(k)!==v)||guide?.localName!=='path'||guide.getAttribute('d')!==segment.revealPath||[['fill','none'],['stroke','white'],['stroke-width',String(segment.revealWidth)],['stroke-linecap','round'],['pathLength','1'],['stroke-dasharray',String(amounts[i])+' 2'],['stroke-dashoffset','0']].some(([k,v])=>guide.getAttribute(k)!==v)||path.getAttribute('mask')!=='url(#'+clipId+')'||path.hasAttribute('clip-path'))return null
   }else{
    const shape=outlineClip(segment,amounts[i]);if(path.getAttribute('clip-path')!=='url(#'+clipId+')'||path.hasAttribute('mask')||clip?.localName!=='clipPath'||clip.id!==clipId||clip.children.length!==1||guide?.localName!=='rect'||Object.entries(shape).some(([k,v])=>guide.getAttribute(k)!==String(v)))return null
   }
  }
 }
 return indices.length
}
export function verifyReviewedU51deBaseSourceRevealPriorDOM(policy:ReviewedU51deBaseSourceRevealPolicy,g:SVGGElement|null,p:number,priorProgress:number,logicalProgress=NaN,frameId=''):boolean{
 try{
  source(policy,policy.segment);if(!Number.isFinite(p)||p<0||p>1||!policy.priorRequired||!policy.priorSegment||priorProgress!==1||!g)return false
  const slot=g.parentNode,outer=slot?.parentNode,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView
  if(!slot||!outer||slot.nodeType!==1||outer.nodeType!==1||!owner||!view||view.document!==doc)return false
  const pen=slot as SVGGElement,outlines=outer as SVGGElement,H=pen.children[policy.mask-2],peer=POLICIES.find(q=>q.pen===policy.pen&&q.mask===policy.mask-1),id=g.getAttribute(PREFIX+'clip')
  if(!H||!peer||!id)return false
  const priorId=id.slice(0,id.lastIndexOf('-')+1)+(policy.mask-2),ink=H.children[1]as SVGPathElement|undefined,defs=H.children[0],clip=defs?.children[0],rect=clip?.children[0]
  if(!ink||!rect)return false
  const receipt=COMMITTED.get(H as SVGGElement)
  if(!receipt||receipt.policy!==peer||receipt.ink!==ink||receipt.owner!==owner||receipt.doc!==doc||receipt.frameId!==frameId||receipt.logicalProgress!==logicalProgress||receipt.id!==priorId)return false
  const exact=()=>g.parentNode===pen&&projectedOwnerCount(policy,p,priorProgress,logicalProgress,g,frameId)===pen.children.length&&pen.children[policy.mask-2]===H&&pen.getAttribute('data-outline-stroke')===String(policy.pen)&&pen.parentNode===outlines&&outlines.getAttribute('data-stroke-outlines')==='true'&&outlines.children.length===16&&outlines.children[policy.pen-1]===pen&&H.parentNode===pen&&exactAxisProjection(H,peer,1,policy.mask===2?0:1,logicalProgress,frameId,priorId,owner,doc)&&owner.getAttribute('viewBox')==='0 0 100 100'&&g.getAttribute('data-stroke-start-gate')===policy.id&&g.getAttribute('data-stroke-reveal-policy')===policy.kind&&g.getAttribute('data-stroke-reveal-progress')===String(p)&&g.getAttribute(PREFIX+'fingerprint')===policy.proofFingerprint&&g.getAttribute(PREFIX+'prior-progress')==='1'&&ink.getAttribute(PREFIX+'committed')==='true'&&ink.getAttribute(PREFIX+'progress')==='1'&&ink.getAttribute(PREFIX+'phase')==='full'&&ink.getAttribute(PREFIX+'direct-original')==='true'&&ink.getAttribute(PREFIX+'source-full')==='true'&&ink.getAttribute(PREFIX+'one-ink')==='true'
  if(!exact())return false
  return opaqueTree([g,H,ink,defs,clip,rect],pen,owner,doc,view,exact)&&opaqueSourcePath(ink,policy.priorSegment.outline,doc,view)&&exact()
 }catch{return false}
}
export function commitReviewedU51deBaseSourceReveal(policy:ReviewedU51deBaseSourceRevealPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU51deBaseSourceRevealNodes,priorProgress=0,logicalProgress=NaN,frameId=''){
 const {group:g,ink:p,rect:r,clipPath:c}=nodes
 const reset=()=>{if(g)COMMITTED.delete(g);p?.setAttribute('visibility','hidden');p?.setAttribute(PREFIX+'committed','false')}
 reset()
 try{
  const f=sampleReviewedU51deBaseSourceRevealFrame(policy,segment,progress,priorProgress,verifyReviewedU51deBaseSourceRevealPriorDOM(policy,g,progress,priorProgress,logicalProgress,frameId))
  if(!g||!p||!r||!c||!/^[A-Za-z0-9_:.-]+$/.test(clipId)||!clipId.endsWith('-'+(policy.pen-1)+'-'+(policy.mask-1)))throw Error('Exact 凞 target nodes and id required')
  const owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,defs=c.parentNode,pen=g.parentNode,outer=pen?.parentNode
  if(!owner||!view||view.document!==doc||!defs||!pen||!outer||defs.nodeType!==1||pen.nodeType!==1||outer.nodeType!==1)throw Error('Connected 凞 SVG owner tree required')
  const d=defs as SVGDefsElement,slot=pen as SVGGElement,outlines=outer as SVGGElement,key=clipId+'-u51de-base-source-reveal-clip'
  const shape=f.clip??{x:policy.anchor[0],y:policy.anchor[1],width:0,height:0}
  for(const [k,v]of Object.entries(shape))r.setAttribute(k,String(v))
  if(f.originalPDirect)p.removeAttribute('clip-path');else p.setAttribute('clip-path','url(#'+key+')')
  const canonical=canonicalRectGeometry(owner,doc,view,shape),expectedCSS=canonical.css
  const tree:Element[]=[g,p,d,c,r],seen=new Set<Element>();let n:Element|null=slot
  while(n){if(seen.has(n))throw Error('Cyclic 凞 owner');seen.add(n);tree.push(n);if(n===owner)break;const parent:ParentNode|null=n.parentNode;n=parent&&parent.nodeType===1?parent as Element:null}
  if(n!==owner)throw Error('Disconnected 凞 SVG chain')
  const parents=new Map(tree.map(node=>[node,node.parentNode]))
  const exact=(visibility:string,committed:boolean)=>g.localName==='g'&&p.localName==='path'&&r.localName==='rect'&&c.localName==='clipPath'&&d.localName==='defs'&&d.parentNode===g&&c.parentNode===d&&r.parentNode===c&&c.children.length===1&&c.children[0]===r&&p.parentNode===g&&g.children.length===2&&g.children[0]===d&&g.children[1]===p&&projectedOwnerCount(policy,progress,priorProgress,logicalProgress,g,frameId)===slot.children.length&&slot.parentNode===outlines&&slot.getAttribute('data-outline-stroke')===String(policy.pen)&&outlines.getAttribute('data-stroke-outlines')==='true'&&outlines.children.length===16&&outlines.children[policy.pen-1]===slot&&owner.getAttribute('viewBox')==='0 0 100 100'&&g.getAttribute('data-stroke-start-gate')===policy.id&&g.getAttribute('data-stroke-reveal-policy')===policy.kind&&g.getAttribute('data-stroke-reveal-progress')===String(progress)&&g.getAttribute(PREFIX+'clip')===clipId&&g.getAttribute(PREFIX+'fingerprint')===policy.proofFingerprint&&g.getAttribute(PREFIX+'prior-progress')===String(priorProgress)&&p.getAttribute('d')===segment.outline&&p.getAttribute('pathLength')===null&&p.getAttribute('stroke-dasharray')===null&&p.getAttribute('stroke-dashoffset')===null&&p.getAttribute('mask')===null&&p.getAttribute('visibility')===visibility&&p.getAttribute(PREFIX+'committed')===String(committed)&&p.getAttribute('clip-path')===(f.originalPDirect?null:'url(#'+key+')')&&c.getAttribute('id')===key&&c.getAttribute('clipPathUnits')==='userSpaceOnUse'&&Object.entries(shape).every(([k,v])=>r.getAttribute(k)===String(v))
  const stable=(visibility:string,committed:boolean)=>{
   if(progress>0&&policy.priorRequired&&!verifyReviewedU51deBaseSourceRevealPriorDOM(policy,g,progress,priorProgress,logicalProgress,frameId))return false
   if(!exact(visibility,committed)||owner.ownerDocument!==doc||doc.defaultView!==view||view.document!==doc)return false
   for(const node of tree){
    if(!node.isConnected||node.ownerDocument!==doc||(node!==owner&&(node as SVGElement).ownerSVGElement!==owner)||node.namespaceURI!==NS||node.parentNode!==parents.get(node)||['transform','filter','mask'].some(k=>node.getAttribute(k)!==null)||(node!==p&&node.getAttribute('clip-path')!==null))return false
    const s=view.getComputedStyle(node)
    if(s.display==='none'||s.transform!=='none'||s.filter!=='none'||(node!==p&&s.clipPath!=='none')||!['','none'].includes(s.getPropertyValue('mask-image'))||Number(s.opacity)!==1||s.mixBlendMode!=='normal'||['translate','rotate','scale'].some(k=>!['','none'].includes(s.getPropertyValue(k))))return false
   }
   const rs=view.getComputedStyle(r)
   if([...expectedCSS].some(([k,v])=>r.style.getPropertyValue(k)!==''||rs.getPropertyValue(k)!==v))return false
   const actualBox=r.getBBox()
   if(!(['x','y','width','height']as const).every(k=>Number.isFinite(actualBox[k])&&actualBox[k]===canonical.bounds[k]))return false
   const paint=view.getComputedStyle(p)
   if(paint.stroke!=='none'||Number(paint.fillOpacity)!==1||paint.fillRule!=='nonzero'||!opaqueRGB(paint.fill)||paint.visibility!==visibility||!cssSourcePath(doc,paint.getPropertyValue('d').trim(),segment.outline))return false
   return exact(visibility,committed)&&tree.every(node=>node.isConnected&&node.ownerDocument===doc&&node.parentNode===parents.get(node)&&(node===owner||(node as SVGElement).ownerSVGElement===owner))
  }
  if(!stable('hidden',false))throw Error('Changed 凞 source/coordinates/rectangle')
  for(const [k,v]of Object.entries({progress,phase:f.phase,'direct-original':f.originalPDirect,'source-full':f.originalPDirect,'one-ink':true,'source-subpaths':(segment.outline.match(/M/g)||[]).length,'ua-read':false}))p.setAttribute(PREFIX+k,String(v))
  if(!stable('hidden',false))throw Error('Changed 凞 pre-visibility binding')
  p.setAttribute(PREFIX+'committed','true');p.setAttribute('visibility',f.visible?'visible':'hidden')
  if(!stable(f.visible?'visible':'hidden',true))throw Error('Changed 凞 visibility commit')
  if(f.originalPDirect)COMMITTED.set(g,{policy,ink:p,owner,doc,frameId,logicalProgress,id:clipId})
  return {status:progress===0?'empty' as const:progress===1?'complete' as const:'visible' as const,error:null,frame:f,cleanup:reset}
 }catch(error){reset();return {status:'hidden' as const,error:error instanceof Error?error.message:'Invalid source point-window DOM binding',frame:null,cleanup:reset}}
}

/** A copied subtree cannot inherit this private successful-commit receipt. */
export function verifyReviewedU51deBaseSourceRevealCompletedDOM(policy:ReviewedU51deBaseSourceRevealPolicy,g:SVGGElement|null,logicalProgress:number,frameId:string):boolean{
 try{
  source(policy,policy.segment);if(!g)return false
  const receipt=COMMITTED.get(g),owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,slot=g.parentNode,outer=slot?.parentNode
  if(!receipt||!owner||!view||view.document!==doc||!slot||slot.nodeType!==1||!outer||outer.nodeType!==1)return false
  const pen=slot as SVGGElement,outlines=outer as SVGGElement,defs=g.children[0],clip=defs?.children[0],rect=clip?.children[0],ink=g.children[1]as SVGPathElement|undefined,amounts=outlineSegmentProgress(STROKES[policy.pen-1],logicalProgress),prior=policy.mask>1?amounts[policy.mask-2]:0
  if(!ink||!rect||amounts[policy.mask-1]!==1)return false
  const exact=()=>receipt===COMMITTED.get(g)&&receipt.policy===policy&&receipt.ink===ink&&receipt.owner===owner&&receipt.doc===doc&&receipt.frameId===frameId&&receipt.logicalProgress===logicalProgress&&g.parentNode===pen&&pen.parentNode===outlines&&pen.getAttribute('data-outline-stroke')===String(policy.pen)&&outlines.getAttribute('data-stroke-outlines')==='true'&&outlines.children.length===16&&outlines.children[policy.pen-1]===pen&&owner.getAttribute('viewBox')==='0 0 100 100'&&projectedOwnerCount(policy,1,prior,logicalProgress,g,frameId)===pen.children.length&&exactAxisProjection(g,policy,1,prior,logicalProgress,frameId,receipt.id,owner,doc)&&ink.getAttribute(PREFIX+'committed')==='true'&&ink.getAttribute(PREFIX+'progress')==='1'&&ink.getAttribute(PREFIX+'phase')==='full'&&ink.getAttribute(PREFIX+'direct-original')==='true'&&ink.getAttribute(PREFIX+'source-full')==='true'&&ink.getAttribute(PREFIX+'one-ink')==='true'
  return exact()&&opaqueTree([g,defs,clip,rect,ink],pen,owner,doc,view,exact)&&opaqueSourcePath(ink,policy.segment.outline,doc,view)&&exact()
 }catch{return false}
}
function opaqueSourcePath(p:SVGPathElement,d:string,doc:Document,view:Window):boolean{
 const s=view.getComputedStyle(p)
 return p.getAttribute('d')===d&&['mask','clip-path','transform','filter','pathLength','stroke-dasharray','stroke-dashoffset'].every(k=>p.getAttribute(k)===null)&&s.visibility==='visible'&&s.stroke==='none'&&s.fillRule==='nonzero'&&Number(s.fillOpacity)===1&&Number(s.opacity)===1&&opaqueRGB(s.fill)&&cssSourcePath(doc,s.getPropertyValue('d').trim(),d)
}
function opaqueTree(extra:Element[],start:Element,owner:SVGSVGElement,doc:Document,view:Window,exact:()=>boolean):boolean{
 const tree=[...extra],seen=new Set<Element>();let n:Element|null=start
 while(n){if(seen.has(n))return false;seen.add(n);tree.push(n);if(n===owner)break;const a:ParentNode|null=n.parentNode;n=a&&a.nodeType===1?a as Element:null}
 if(n!==owner)return false
 const parents=new Map(tree.map(v=>[v,v.parentNode]))
 const valid=(v:Element)=>{const s=view.getComputedStyle(v);return v.isConnected&&v.ownerDocument===doc&&v.namespaceURI===NS&&(v===owner||(v as SVGElement).ownerSVGElement===owner)&&v.parentNode===parents.get(v)&&['mask','clip-path','transform','filter'].every(k=>v.getAttribute(k)===null)&&s.display!=='none'&&s.visibility==='visible'&&Number(s.opacity)===1&&Number(s.fillOpacity)===1&&s.transform==='none'&&s.filter==='none'&&s.clipPath==='none'&&['','none'].includes(s.getPropertyValue('mask-image'))&&s.mixBlendMode==='normal'&&['translate','rotate','scale'].every(k=>['','none'].includes(s.getPropertyValue(k)))}
 return exact()&&tree.every(valid)&&doc.defaultView===view&&view.document===doc&&exact()&&tree.every(v=>v.isConnected&&v.parentNode===parents.get(v))
}

export const REVIEWED_U51DE_BASE_SOURCE_REVEAL_INPUT_SHA256=Object.freeze({"docs/hanja-source-original-u51de-base-2026-10-27/fixtures-draft.json":"623a80e6bbd7363bfb171731d60f730d9f9c412ec07a94afd3eccd7a30ed1255","docs/hanja-source-original-u51de-base-2026-10-27/feasibility-initial-1-8.json":"0147e0711262d64634f465695abce31a06133511acef3229e42751950dc9b2ba","docs/hanja-source-original-u51de-base-2026-10-27/feasibility-initial-9-16.json":"e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e","docs/hanja-goal-glyphwiki-batch1059-2026-10-13/engine-whole-u51de.json":"59adc1112c7e6456b67ecc86c6583f11475287bf71af5a8f0a6e429d5dddc91c"})
export const REVIEWED_U51DE_BASE_SOURCE_REVEAL_INPUT=Object.freeze({fullProof:FIXED.fullProof,identity:FIXED.identity,strokes:STROKES})
export const REVIEWED_U51DE_BASE_SOURCE_REVEAL=freeze({"glyph":"凞","root":"u51de","catalogStrokes":16,"playbackStrokes":16,"masks":23,"polygons":39,"targets":[{"id":"u51de-base-mask-y-prefix-1-1","kind":"source-mask-y-prefix-u51de-base","pen":1,"mask":1,"axis":"y","axisStart":9.45,"axisFinish":21.25,"anchor":[9.85,9.45],"sourceT":0,"priorRequired":false,"proofFingerprint":"0147e0711262d64634f465695abce31a06133511acef3229e42751950dc9b2ba"},{"id":"u51de-base-mask-y-prefix-2-1","kind":"source-mask-y-prefix-u51de-base","pen":2,"mask":1,"axis":"y","axisStart":44.45,"axisFinish":68.4,"anchor":[7.1,44.45],"sourceT":0,"priorRequired":false,"proofFingerprint":"0147e0711262d64634f465695abce31a06133511acef3229e42751950dc9b2ba"},{"id":"u51de-base-mask-y-prefix-2-2","kind":"source-mask-y-prefix-u51de-base","pen":2,"mask":2,"axis":"y","axisStart":53.4,"axisFinish":18.95,"anchor":[9.3,18.95],"sourceT":0,"priorRequired":true,"proofFingerprint":"0147e0711262d64634f465695abce31a06133511acef3229e42751950dc9b2ba"},{"id":"u51de-base-mask-y-prefix-3-1","kind":"source-mask-y-prefix-u51de-base","pen":3,"mask":1,"axis":"y","axisStart":9.4,"axisFinish":35.5,"anchor":[27.15,9.4],"sourceT":0,"priorRequired":false,"proofFingerprint":"0147e0711262d64634f465695abce31a06133511acef3229e42751950dc9b2ba"},{"id":"u51de-base-mask-x-prefix-4-1","kind":"source-mask-x-prefix-u51de-base","pen":4,"mask":1,"axis":"x","axisStart":37.35,"axisFinish":64.3,"anchor":[37.35,7.65],"sourceT":0,"priorRequired":false,"proofFingerprint":"0147e0711262d64634f465695abce31a06133511acef3229e42751950dc9b2ba"},{"id":"u51de-base-mask-y-prefix-5-1","kind":"source-mask-y-prefix-u51de-base","pen":5,"mask":1,"axis":"y","axisStart":12.65,"axisFinish":29.5,"anchor":[46.6,12.65],"sourceT":0,"priorRequired":false,"proofFingerprint":"0147e0711262d64634f465695abce31a06133511acef3229e42751950dc9b2ba"},{"id":"u51de-base-mask-x-prefix-6-1","kind":"source-mask-x-prefix-u51de-base","pen":6,"mask":1,"axis":"x","axisStart":37.35,"axisFinish":60.05,"anchor":[37.35,27.5],"sourceT":0,"priorRequired":false,"proofFingerprint":"0147e0711262d64634f465695abce31a06133511acef3229e42751950dc9b2ba"},{"id":"u51de-base-mask-x-prefix-7-1","kind":"source-mask-x-prefix-u51de-base","pen":7,"mask":1,"axis":"x","axisStart":37.35,"axisFinish":60.05,"anchor":[37.35,44.4],"sourceT":0,"priorRequired":false,"proofFingerprint":"0147e0711262d64634f465695abce31a06133511acef3229e42751950dc9b2ba"},{"id":"u51de-base-mask-y-prefix-8-1","kind":"source-mask-y-prefix-u51de-base","pen":8,"mask":1,"axis":"y","axisStart":44.4,"axisFinish":62.65,"anchor":[46.6,44.4],"sourceT":0,"priorRequired":false,"proofFingerprint":"0147e0711262d64634f465695abce31a06133511acef3229e42751950dc9b2ba"},{"id":"u51de-base-mask-y-prefix-9-1","kind":"source-mask-y-prefix-u51de-base","pen":9,"mask":1,"axis":"y","axisStart":10.15,"axisFinish":65.15,"anchor":[34.85,10.15],"sourceT":0,"priorRequired":false,"proofFingerprint":"e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e"},{"id":"u51de-base-mask-x-prefix-9-2","kind":"source-mask-x-prefix-u51de-base","pen":9,"mask":2,"axis":"x","axisStart":37.35,"axisFinish":65.2,"anchor":[37.35,55.65],"sourceT":0,"priorRequired":true,"proofFingerprint":"e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e"},{"id":"u51de-base-mask-x-prefix-10-1","kind":"source-mask-x-prefix-u51de-base","pen":10,"mask":1,"axis":"x","axisStart":70.5,"axisFinish":87.5,"anchor":[70.5,11],"sourceT":0,"priorRequired":false,"proofFingerprint":"e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e"},{"id":"u51de-base-mask-x-prefix-11-1","kind":"source-mask-x-prefix-u51de-base","pen":11,"mask":1,"axis":"x","axisStart":70.5,"axisFinish":87.5,"anchor":[70.5,34.5],"sourceT":0,"priorRequired":false,"proofFingerprint":"e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e"},{"id":"u51de-base-mask-y-prefix-12-1","kind":"source-mask-y-prefix-u51de-base","pen":12,"mask":1,"axis":"y","axisStart":8.25,"axisFinish":61.25,"anchor":[67.75,8.25],"sourceT":0,"priorRequired":false,"proofFingerprint":"e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e"},{"id":"u51de-base-mask-y-prefix-12-2","kind":"source-mask-y-prefix-u51de-base","pen":12,"mask":2,"axis":"y","axisStart":58.5,"axisFinish":66.5,"anchor":[67.75,58.5],"sourceT":0,"priorRequired":true,"proofFingerprint":"e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e"},{"id":"u51de-base-mask-y-prefix-13-1","kind":"source-mask-y-prefix-u51de-base","pen":13,"mask":1,"axis":"y","axisStart":70.45,"axisFinish":93.1,"anchor":[9.45,70.45],"sourceT":0,"priorRequired":false,"proofFingerprint":"e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e"},{"id":"u51de-base-mask-y-prefix-14-1","kind":"source-mask-y-prefix-u51de-base","pen":14,"mask":1,"axis":"y","axisStart":71.05,"axisFinish":91.45,"anchor":[34.45,71.05],"sourceT":0,"priorRequired":false,"proofFingerprint":"e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e"},{"id":"u51de-base-mask-y-prefix-15-1","kind":"source-mask-y-prefix-u51de-base","pen":15,"mask":1,"axis":"y","axisStart":70.95,"axisFinish":91.45,"anchor":[53.55,70.95],"sourceT":0,"priorRequired":false,"proofFingerprint":"e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e"},{"id":"u51de-base-mask-y-prefix-16-1","kind":"source-mask-y-prefix-u51de-base","pen":16,"mask":1,"axis":"y","axisStart":70.45,"axisFinish":92.4,"anchor":[73.6,70.45],"sourceT":0,"priorRequired":false,"proofFingerprint":"e14a6864e878401867fd3735297cc050ab6c996972084e83ac8e24bcd0488e2e"}],"heldTargets":["3:2","6:2","10:2","12:3"],"fixtureSHA256":"623a80e6bbd7363bfb171731d60f730d9f9c412ec07a94afd3eccd7a30ed1255","compiledSHA256":"c9ac1ef9b6c55526779f888cfd12f31622fad344ed20cbbf3dfa0dabee7caea1","sourcePGuideFlagsWeightsChanged":false,"previewOnly":true,"nativeApproval":false,"runtimeApplied":false})
