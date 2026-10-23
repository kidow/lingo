import type {HanjaOutlineSegment} from '../../lib/hanja-stroke-outline'
import {measureReviewedU7c67Frame,type ReviewedU7c67Policy} from '../../lib/hanja-stroke-start-caps-u7c67.ts'
import {leftFrame,type LeftPolicy} from './left-terminal.ts'

export type LeftU7c67Nodes={measurement:SVGPathElement|null;bodyClip:SVGPathElement|null;tailClip:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;bodyFill:SVGPathElement|null;tailRect:SVGRectElement|null;ink:SVGPathElement|null}
/** One original ink path; a body-clip and original-LEFT-clip form its mask union. */
export function commitLeftU7c67(left:LeftPolicy,policy:ReviewedU7c67Policy,segment:HanjaOutlineSegment,progress:number,id:string,n:ReviewedU7c67TailNodes){
  const reset=()=>{n.ink?.setAttribute('visibility','hidden');n.bodyFill?.setAttribute('visibility','hidden');n.tailRect?.setAttribute('x','63.5');n.tailRect?.setAttribute('width','0');n.tailRect?.setAttribute('y','81.3');n.tailRect?.setAttribute('height','3');n.guide?.setAttribute('stroke-dasharray','0 2');n.startCap?.setAttribute('r','0');n.endCap?.setAttribute('r','0');for(const key of['data-u7c67-composite-phase','data-u7c67-body-progress','data-u7c67-left-progress'])n.ink?.removeAttribute(key)}
  reset()
  try{
    const frame=leftFrame(left,segment,progress)
    if(!/^[A-Za-z0-9_-]+$/.test(id)||(policy.id!=='u7c67-15-1'||left.id!==policy.id||left.root!=='u7c67'))throw new Error('Exact 籧 composite target required')
    const{measurement,bodyClip,tailClip,guide,startCap,endCap,bodyFill,tailRect,ink}=n
    if(!measurement||!bodyClip||!tailClip||!guide||!startCap||!endCap||!bodyFill||!tailRect||!ink)throw new Error('Incomplete 籧 composite nodes')
    const defs=measurement.parentElement,target=defs?.parentElement,mask=bodyFill.parentElement,bodyGroup=guide.parentElement,tailGroup=tailRect.parentElement,owner=measurement.ownerSVGElement
    if(!owner||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask'||bodyGroup?.localName!=='g'||tailGroup?.localName!=='g')throw new Error('Exact 籧 composite parents required')
    const doc=owner.ownerDocument,view=doc.defaultView
    if(!view||view.document!==doc)throw new Error('Connected 籧 composite document required')
    const parents=new Map<Element,Element|null>()
    for(const node of Object.values(n)){
      let x:Element|null=node
      const visited=new Set<Element>()
      while(x){if(visited.has(x)||x.namespaceURI!=='http://www.w3.org/2000/svg'||x.ownerDocument!==doc||!x.isConnected||(x!==owner&&(x as SVGElement).ownerSVGElement!==owner))throw new Error('Changed 籧 composite coordinate tree');visited.add(x);parents.set(x,x.parentElement);if(x===owner)break;x=x.parentElement}
      if(x!==owner)throw new Error('Detached 籧 composite node')
    }
    const exact=()=>{
      if(owner.ownerDocument!==doc||doc.defaultView!==view||view.document!==doc)return false
      for(const[node,parent]of parents){if(node.parentElement!==parent||!node.isConnected||node.ownerDocument!==doc||node.getAttribute('transform')!==null)return false;const s=view.getComputedStyle(node);if(s.transform!=='none'||['translate','rotate','scale'].some(k=>{const v=s.getPropertyValue(k);return v!==''&&v!=='none'}))return false}
      return measurement.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-stroke-reveal-policy')==='original-left-terminal'&&target.getAttribute('data-u7c67-progress')===String(frame.bodyProgress)&&target.getAttribute('data-u7c67-composite-progress')===String(progress)&&target.getAttribute('data-u7c67-clip')===id&&mask.parentElement===defs&&mask.getAttribute('id')===id+'-u7c67-composite'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y','width','height'].every((k,i)=>mask.getAttribute(k)===['0','0','100','100'][i])&&bodyGroup.parentElement===mask&&bodyGroup.getAttribute('clip-path')==='url(#'+id+'-u7c67-body)'&&bodyGroup.getAttribute('id')===id+'-u7c67-body-guide'&&guide.parentElement===bodyGroup&&startCap.parentElement===bodyGroup&&endCap.parentElement===bodyGroup&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&guide.getAttribute('stroke')==='white'&&startCap.getAttribute('fill')==='white'&&endCap.getAttribute('fill')==='white'&&bodyClip.getAttribute('d')===frame.bodyOutline&&bodyClip.parentElement?.localName==='clipPath'&&bodyClip.parentElement.parentElement===defs&&bodyClip.parentElement.getAttribute('id')===id+'-u7c67-body'&&bodyClip.parentElement.getAttribute('clipPathUnits')==='userSpaceOnUse'&&tailClip.getAttribute('d')===frame.tailOutline&&tailClip.parentElement?.localName==='clipPath'&&tailClip.parentElement.parentElement===defs&&tailClip.parentElement.getAttribute('id')===id+'-u7c67-left'&&tailClip.parentElement.getAttribute('clipPathUnits')==='userSpaceOnUse'&&bodyFill.parentElement===mask&&bodyFill.getAttribute('d')===frame.bodyOutline&&bodyFill.getAttribute('fill')==='white'&&tailGroup.parentElement===mask&&tailGroup.getAttribute('clip-path')==='url(#'+id+'-u7c67-left)'&&tailRect.parentElement===tailGroup&&tailRect.getAttribute('y')==='81.3'&&tailRect.getAttribute('height')==='3'&&Number.isFinite(Number(tailRect.getAttribute('x')))&&Number.isFinite(Number(tailRect.getAttribute('width')))&&tailRect.getAttribute('fill')==='white'&&ink.parentElement===target&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+id+'-u7c67-composite)'
    }
    if(!exact())throw new Error('Exact 籧 composite DOM required')
    // This validates private source policy plus connected original MQQ measurement.
    const measured=measureReviewedU7c67Frame(policy,segment,frame.bodyProgress,measurement)
    if(!exact())throw new Error('Changed 籧 composite after measurement')
    if(progress===0)return{status:'empty' as const,frame,cleanup:reset}
    if(frame.phase==='body'){
      guide.setAttribute('stroke-dasharray',String(frame.bodyProgress)+' 2')
      guide.setAttribute('stroke-dashoffset','0')
      for(const[c,p]of[[startCap,{x:measured.q0[0],y:measured.q0[1]}],[endCap,measured.point]] as const){c.setAttribute('cx',String(p.x));c.setAttribute('cy',String(p.y));c.setAttribute('r',String(measured.rho))}
    }else bodyFill.setAttribute('visibility','visible')
    tailRect.setAttribute('x',String(frame.tailRect.x));tailRect.setAttribute('width',String(frame.tailRect.width))
    if(tailRect.getAttribute('x')!==String(frame.tailRect.x)||tailRect.getAttribute('width')!==String(frame.tailRect.width))throw new Error('Changed exact LEFT rectangle')
    if(!exact())throw new Error('Changed 籧 composite during write')
    ink.setAttribute('data-u7c67-composite-phase',frame.phase)
    ink.setAttribute('data-u7c67-body-progress',String(frame.bodyProgress))
    ink.setAttribute('data-u7c67-left-progress',String(frame.tailProgress))
    ink.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}

