import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline'
import {reviewedU8fc5Context} from './hanja-stroke-start-caps-u8fc5.ts'

/** Provisional reveal-side partition; original source stays seven pens/eight masks. */
const UP='M89 78 L86 78 L89 65 L90 65 Z'
const BODY='M35 14.5 L75.5 14.5 L75.5 16.5 L35 16.5 Z M78.45 15.55 L78.25 27.55 L78.35 38.3 L78.85 47.8 L79.65 55.95 L80.8 62.85 L82.25 68.45 L83.9 72.65 L85.75 75.45 L87.5 76.95 L89.25 77.5 L88.7 83.45 L84.6 82.15 L81.2 79.35 L78.6 75.35 L76.5 70.3 L74.9 64.1 L73.7 56.75 L72.85 48.2 L72.4 38.5 L72.25 27.55 L72.5 15.4 Z M72.5 14.5 L75.5 12 L81 16.5 L78.5 18 L72.5 20.5 Z M89.25 77.5 L91.25 78.6 L91.95 80.75 L90.85 82.75 L88.7 83.45 Z'
const BODY_WEIGHT=106.887122
const UP_CLOCK=13
const SHARE=BODY_WEIGHT/(BODY_WEIGHT+UP_CLOCK)
const CONTEXT=Object.freeze({id:'u8fc5-original-up-tail' as const})
export type ReviewedU8fc5TailContext=typeof CONTEXT
export type ReviewedU8fc5TailFrame=Readonly<{phase:'empty'|'body'|'tail'|'complete';bodyProgress:number;tailProgress:number;bodyOutline:string;tailOutline:typeof UP;tailRect:Readonly<{x:86;y:number;width:4;height:number}>;paintOriginalInkOnce:true;originalMaskCount:8;internalRevealPhases:2}>
export function reviewedU8fc5TailContext(strokes:HanjaOutlineStrokes):ReviewedU8fc5TailContext|null {
  return reviewedU8fc5Context(strokes)?CONTEXT:null
}
export function reviewedU8fc5TailFrame(context:ReviewedU8fc5TailContext|null,segment:HanjaOutlineSegment,progress:number):ReviewedU8fc5TailFrame {
  if(context!==CONTEXT||segment.revealPath!=='M35 15.5 L75.5 15.5 Q73.5 79 89 80.5'||segment.weight!==BODY_WEIGHT||segment.revealWidth!==14||segment.direction!=='curve')throw new Error('Exact original 迅 pen1 tail context required')
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 迅 composite progress')
  const polygons=segment.outline.match(/M[^M]+/g)?.map(p=>p.trim())
  if(polygons?.length!==5||polygons[4]!==UP||segment.outline!==BODY+' '+UP||JSON.stringify(segment.bounds)!=='[35,12,91.95,83.45]')throw new Error('Original 迅 body and UP polygons required')
  // Body uses the original whole MLQ guide and original weight. This explicit
  // internal phase clock is not a new source mask, guide, or official clock.
  const tailProgress=progress<=SHARE?0:Math.min(1,(progress-SHARE)/(1-SHARE))
  const bodyProgress=Math.min(1,progress/SHARE)
  return Object.freeze({phase:progress===0?'empty':progress===1?'complete':progress<=SHARE?'body':'tail',bodyProgress,tailProgress,bodyOutline:polygons.slice(0,4).join(' '),tailOutline:UP,tailRect:Object.freeze({x:86 as const,y:78-UP_CLOCK*tailProgress,width:4 as const,height:UP_CLOCK*tailProgress}),paintOriginalInkOnce:true,originalMaskCount:8,internalRevealPhases:2})
}
export const REVIEWED_U8FC5_UP_TAIL=Object.freeze({bodyWeight:BODY_WEIGHT,upClock:UP_CLOCK,bodyShare:SHARE,originalLogicalPen:1,originalMaskCount:8,originalPolygonCount:23,derivedSourceMasks:0,originalUPFlag:15,originalUPVertices:UP,sourceFieldsUnchanged:true,bodyCoverageAndEveryPositiveTailPrefixProof:'docs/hanja-u8fc5-start-tail-feasibility-2026-10-23/check.py',nativeApproval:false,runtimeApplied:false})
