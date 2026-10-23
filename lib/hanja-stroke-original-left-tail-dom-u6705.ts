import type {HanjaOutlineSegment} from './hanja-stroke-outline'
import {measureReviewedU6705Frame,type ReviewedU6705Policy} from './hanja-stroke-start-caps-u6705.ts'
import {reviewedU6705TailFrame,reviewedU6705Down14Frame,REVIEWED_U6705_DOWN14,type ReviewedU6705TailContext} from './hanja-stroke-original-left-tail-u6705.ts'

export type ReviewedU6705TailNodes={measurement:SVGPathElement|null;bodyClip:SVGPathElement|null;tailClip:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;bodyFill:SVGPathElement|null;tailRect:SVGRectElement|null;ink:SVGPathElement|null}
/** One original ink path; a body-clip and original-LEFT-clip form its mask union. */
export function commitReviewedU6705Tail(context:ReviewedU6705TailContext|null,policy:ReviewedU6705Policy,segment:HanjaOutlineSegment,progress:number,id:string,n:ReviewedU6705TailNodes){
  const reset=()=>{n.ink?.setAttribute('visibility','hidden');n.bodyFill?.setAttribute('visibility','hidden');n.tailRect?.setAttribute('width','0');n.guide?.setAttribute('stroke-dasharray','0 2');n.startCap?.setAttribute('r','0');n.endCap?.setAttribute('r','0')}
  reset()
  try{
    const frame=reviewedU6705TailFrame(context,segment,progress)
    if(!/^[A-Za-z0-9_-]+$/.test(id)||policy.id!=='u6705-11-1')throw new Error('Exact 朅 composite target required')
    const{measurement,bodyClip,tailClip,guide,startCap,endCap,bodyFill,tailRect,ink}=n
    if(!measurement||!bodyClip||!tailClip||!guide||!startCap||!endCap||!bodyFill||!tailRect||!ink)throw new Error('Incomplete 朅 composite nodes')
    const defs=measurement.parentElement,target=defs?.parentElement,mask=bodyFill.parentElement,bodyGroup=guide.parentElement,tailGroup=tailRect.parentElement,owner=measurement.ownerSVGElement
    if(!owner||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask'||bodyGroup?.localName!=='g'||tailGroup?.localName!=='g')throw new Error('Exact 朅 composite parents required')
    const doc=owner.ownerDocument,view=doc.defaultView
    if(!view||view.document!==doc)throw new Error('Connected 朅 composite document required')
    const parents=new Map<Element,Element|null>()
    for(const node of Object.values(n)){
      let x:Element|null=node
      const visited=new Set<Element>()
      while(x){if(visited.has(x)||x.namespaceURI!=='http://www.w3.org/2000/svg'||x.ownerDocument!==doc||!x.isConnected||(x!==owner&&(x as SVGElement).ownerSVGElement!==owner))throw new Error('Changed 朅 composite coordinate tree');visited.add(x);parents.set(x,x.parentElement);if(x===owner)break;x=x.parentElement}
      if(x!==owner)throw new Error('Detached 朅 composite node')
    }
    const exact=()=>{
      if(owner.ownerDocument!==doc||doc.defaultView!==view||view.document!==doc)return false
      for(const[node,parent]of parents){if(node.parentElement!==parent||!node.isConnected||node.ownerDocument!==doc||node.getAttribute('transform')!==null)return false;const s=view.getComputedStyle(node);if(s.transform!=='none'||['translate','rotate','scale'].some(k=>{const v=s.getPropertyValue(k);return v!==''&&v!=='none'}))return false}
      return measurement.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u6705-progress')===String(frame.bodyProgress)&&target.getAttribute('data-u6705-composite-progress')===String(progress)&&target.getAttribute('data-u6705-clip')===id&&mask.parentElement===defs&&mask.getAttribute('id')===id+'-u6705-composite'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y','width','height'].every((k,i)=>mask.getAttribute(k)===['0','0','100','100'][i])&&bodyGroup.parentElement===mask&&bodyGroup.getAttribute('clip-path')==='url(#'+id+'-u6705-body)'&&bodyGroup.getAttribute('id')===id+'-u6705-body-guide'&&guide.parentElement===bodyGroup&&startCap.parentElement===bodyGroup&&endCap.parentElement===bodyGroup&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&guide.getAttribute('stroke')==='white'&&startCap.getAttribute('fill')==='white'&&endCap.getAttribute('fill')==='white'&&bodyClip.getAttribute('d')===frame.bodyOutline&&bodyClip.parentElement?.localName==='clipPath'&&bodyClip.parentElement.parentElement===defs&&bodyClip.parentElement.getAttribute('id')===id+'-u6705-body'&&bodyClip.parentElement.getAttribute('clipPathUnits')==='userSpaceOnUse'&&tailClip.getAttribute('d')===frame.tailOutline&&tailClip.parentElement?.localName==='clipPath'&&tailClip.parentElement.parentElement===defs&&tailClip.parentElement.getAttribute('id')===id+'-u6705-left'&&tailClip.parentElement.getAttribute('clipPathUnits')==='userSpaceOnUse'&&bodyFill.parentElement===mask&&bodyFill.getAttribute('d')===frame.bodyOutline&&bodyFill.getAttribute('fill')==='white'&&tailGroup.parentElement===mask&&tailGroup.getAttribute('clip-path')==='url(#'+id+'-u6705-left)'&&tailRect.parentElement===tailGroup&&tailRect.getAttribute('y')==='88.5'&&tailRect.getAttribute('height')==='3'&&tailRect.getAttribute('fill')==='white'&&ink.parentElement===target&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+id+'-u6705-composite)'
    }
    if(!exact())throw new Error('Exact 朅 composite DOM required')
    // This validates private source policy plus connected original MLQQ measurement.
    const measured=measureReviewedU6705Frame(policy,segment,frame.bodyProgress,measurement)
    if(!exact())throw new Error('Changed 朅 composite after measurement')
    if(progress===0)return{status:'empty' as const,frame,cleanup:reset}
    if(frame.phase==='body'){
      guide.setAttribute('stroke-dasharray',String(frame.bodyProgress)+' 2')
      guide.setAttribute('stroke-dashoffset','0')
      for(const[c,p]of[[startCap,{x:measured.q0[0],y:measured.q0[1]}],[endCap,measured.point]] as const){c.setAttribute('cx',String(p.x));c.setAttribute('cy',String(p.y));c.setAttribute('r',String(measured.rho))}
    }else bodyFill.setAttribute('visibility','visible')
    tailRect.setAttribute('x',String(frame.tailRect.x));tailRect.setAttribute('width',String(frame.tailRect.width))
    if(!exact())throw new Error('Changed 朅 composite during write')
    ink.setAttribute('data-u6705-composite-phase',frame.phase)
    ink.setAttribute('data-u6705-body-progress',String(frame.bodyProgress))
    ink.setAttribute('data-u6705-left-progress',String(frame.tailProgress))
    ink.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}



export type ReviewedU6705Down14Nodes={measurement:SVGPathElement|null;bodyClip:SVGPathElement|null;hClip:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;downFoot:SVGPathElement|null;downRect:SVGRectElement|null;hRect:SVGRectElement|null;ink:SVGPathElement|null}
export function commitReviewedU6705Down14(context:ReviewedU6705TailContext|null,policy:ReviewedU6705Policy,segment:HanjaOutlineSegment,p:number,id:string,n:ReviewedU6705Down14Nodes){
 const reset=()=>{n.ink?.setAttribute('visibility','hidden');n.downRect?.setAttribute('height','0');n.hRect?.setAttribute('width','0');n.guide?.setAttribute('stroke-dasharray','0 2');for(const c of[n.startCap,n.endCap])c?.setAttribute('r','0')}
 reset();try{
  if(policy.id!=='u6705-14-1'||!/^[A-Za-z0-9_-]+$/.test(id))throw Error('Exact 朅14 target')
  const{measurement,bodyClip,hClip,guide,startCap,endCap,downFoot,downRect,hRect,ink}=n;if(!measurement||!bodyClip||!hClip||!guide||!startCap||!endCap||!downFoot||!downRect||!hRect||!ink)throw Error('Missing 朅14 nodes')
  const defs=measurement.parentElement,target=defs?.parentElement,mask=downFoot.parentElement,bodyGroup=guide.parentElement,owner=measurement.ownerSVGElement,doc=owner?.ownerDocument,view=doc?.defaultView
  if(!owner||!doc||!view||view.document!==doc||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask'||bodyGroup?.localName!=='g')throw Error('Exact 朅14 tree')
  const parents=new Map<Element,Element|null>();for(const node of Object.values(n)){let x:Element|null=node;const seen=new Set<Element>();while(x){if(seen.has(x)||!x.isConnected||x.ownerDocument!==doc||x.namespaceURI!=='http://www.w3.org/2000/svg'||(x!==owner&&(x as SVGElement).ownerSVGElement!==owner))throw Error('Changed 朅14 coordinates');seen.add(x);parents.set(x,x.parentElement);if(x===owner)break;x=x.parentElement;}if(x!==owner)throw Error('Detached 朅14 node')}
  const bound=()=>{for(const[x,parent]of parents){if(!x.isConnected||x.parentElement!==parent||x.ownerDocument!==doc||x.getAttribute('transform')!==null)return false;const s=view.getComputedStyle(x);if(s.transform!=='none'||['translate','rotate','scale'].some(k=>!['','none'].includes(s.getPropertyValue(k))))return false;}return doc.defaultView===view&&view.document===doc&&defs.parentElement===target&&mask.parentElement===defs&&mask.id===id+'-u6705-v14-mask'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y','width','height'].every((k,i)=>mask.getAttribute(k)===['0','0','100','100'][i])&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u6705-progress')===String(p)&&measurement.getAttribute('d')===segment.revealPath&&measurement.getAttribute('pathLength')===null&&bodyGroup.parentElement===mask&&bodyGroup.getAttribute('clip-path')==='url(#'+id+'-u6705-v14-body)'&&guide.parentElement===bodyGroup&&startCap.parentElement===bodyGroup&&endCap.parentElement===bodyGroup&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&guide.getAttribute('stroke')==='white'&&startCap.getAttribute('fill')==='white'&&endCap.getAttribute('fill')==='white'&&bodyClip.getAttribute('d')===REVIEWED_U6705_DOWN14.vOutline&&bodyClip.parentElement?.localName==='clipPath'&&bodyClip.parentElement.parentElement===defs&&bodyClip.parentElement.id===id+'-u6705-v14-body'&&bodyClip.parentElement.getAttribute('clipPathUnits')==='userSpaceOnUse'&&downRect.parentElement?.localName==='clipPath'&&downRect.parentElement.parentElement===defs&&downRect.parentElement.id===id+'-u6705-v14-down'&&downRect.parentElement.getAttribute('clipPathUnits')==='userSpaceOnUse'&&downRect.getAttribute('x')==='46.1'&&downRect.getAttribute('y')==='89'&&downRect.getAttribute('width')==='6'&&downFoot.parentElement===mask&&downFoot.getAttribute('d')===REVIEWED_U6705_DOWN14.vOutline&&downFoot.getAttribute('clip-path')==='url(#'+id+'-u6705-v14-down)'&&downFoot.getAttribute('fill')==='white'&&hClip.getAttribute('d')===REVIEWED_U6705_DOWN14.hOutline&&hClip.parentElement?.localName==='clipPath'&&hClip.parentElement.parentElement===defs&&hClip.parentElement.id===id+'-u6705-v14-h'&&hClip.parentElement.getAttribute('clipPathUnits')==='userSpaceOnUse'&&hRect.parentElement===mask&&hRect.getAttribute('clip-path')==='url(#'+id+'-u6705-v14-h)'&&hRect.getAttribute('x')==='49.1'&&hRect.getAttribute('y')==='77.15'&&hRect.getAttribute('height')==='7'&&hRect.getAttribute('fill')==='white'&&ink.parentElement===target&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+id+'-u6705-v14-mask)'}
  if(!bound())throw Error('Changed 朅14 binding')
  const measured=measureReviewedU6705Frame(policy,segment,p,measurement),frame=reviewedU6705Down14Frame(context,segment,p,measured.L),v=measurement.getPointAtLength(frame.vArc);if(!bound()||![v.x,v.y].every(Number.isFinite))throw Error('Invalid 朅14 V point')
  if(frame.vArc===19.47)for(const x of[46.1,52.1])for(const y of[89,89.1])if((x-v.x)**2+(y-v.y)**2>=49)throw Error('朅14 actual completed-cap root not covered')
  let hAlpha=0;if(frame.hProgress>0){const first=measurement.getPointAtLength(19.47),end=measurement.getPointAtLength(measured.L),q=measurement.getPointAtLength(19.47+(measured.L-19.47)*frame.hProgress);if(![first.x,first.y,end.x,end.y,q.x,q.y].every(Number.isFinite)||end.x<=first.x||!bound())throw Error('Invalid 朅14 H point');hAlpha=Math.max(0,Math.min(1,(q.x-first.x)/(end.x-first.x)))}
  if(p===0)return{status:'empty' as const,frame,cleanup:reset}
  guide.setAttribute('stroke-dasharray',String(frame.vProgress)+' 2');guide.setAttribute('stroke-dashoffset','0');for(const[c,q]of[[startCap,{x:measured.q0[0],y:measured.q0[1]}],[endCap,v]] as const){c.setAttribute('cx',String(q.x));c.setAttribute('cy',String(q.y));c.setAttribute('r',String(frame.rho))}
  downRect.setAttribute('height',String(4.15*frame.downProgress));hRect.setAttribute('width',String(30.25*hAlpha));if(!bound())throw Error('Changed 朅14 before commit')
  for(const[k,value]of Object.entries({'phase':frame.phase,'L':frame.L,'down-progress':frame.downProgress,'h-progress':hAlpha}))ink.setAttribute('data-u6705-v14-'+k,String(value));ink.setAttribute('visibility','visible');return{status:'visible' as const,frame,cleanup:reset}
 }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}
