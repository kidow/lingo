import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline'
import {reviewedU7367Context} from './hanja-stroke-start-caps-u7367.ts'

/** Provisional reveal-side partition; original source stays sixteen pens/seventeen masks. */
const LEFT="M20.8 91 L13.8 89.5 L13.8 88 L20.8 88 Z"
const BODY="M10 7.95 L18.1 15.15 L24.2 23.8 L28.7 33.15 L31.8 42.85 L33.65 52.45 L34.5 61.65 L34.45 70.1 L33.8 77.5 L32.55 83.55 L30.85 88.1 L25.65 85.15 L27 81.9 L28.3 76.6 L29.2 69.75 L29.45 61.75 L29 53 L27.55 43.8 L25 34.5 L21.2 25.45 L16 16.8 L9.4 8.65 Z M30.85 88.1 L29.05 89.45 L26.8 89.25 L25.4 87.4 L25.65 85.15 Z M30.85 88.1 L30.2 89.15 L29.45 90.1 L28.65 91 L27.7 91.8 L26.7 92.45 L25.6 93 L24.45 93.45 L23.3 93.75 L22.05 93.9 L20.8 94 L20.8 88 L21.5 87.95 L22.15 87.85 L22.7 87.7 L23.2 87.55 L23.65 87.3 L24.1 87 L24.5 86.65 L24.9 86.25 L25.25 85.75 L25.65 85.15 Z"
const BODY_WEIGHT=89.513895
const LEFT_CLOCK=7
const SHARE=BODY_WEIGHT/(BODY_WEIGHT+LEFT_CLOCK)
const CONTEXT=Object.freeze({id:'u7367-original-left-tail' as const})
export type ReviewedU7367TailContext=typeof CONTEXT
export type ReviewedU7367TailFrame=Readonly<{phase:'empty'|'body'|'tail'|'complete';bodyProgress:number;tailProgress:number;bodyOutline:string;tailOutline:typeof LEFT;tailRect:Readonly<{x:number;y:88;width:number;height:3}>;paintOriginalInkOnce:true;originalMaskCount:17;internalRevealPhases:2}>
export function reviewedU7367TailContext(strokes:HanjaOutlineStrokes):ReviewedU7367TailContext|null {
  return reviewedU7367Context(strokes)?CONTEXT:null
}
export function reviewedU7367TailFrame(context:ReviewedU7367TailContext|null,segment:HanjaOutlineSegment,progress:number):ReviewedU7367TailFrame {
  if(context!==CONTEXT||segment.revealPath!=="M9.35 8 C37.2175 32 33.685 77 28.280387939151346 86.63879857985748 Q25.835 91 20.835 91"||segment.weight!==BODY_WEIGHT||segment.revealWidth!==14||segment.direction!=='curve')throw new Error('Exact original 獧 pen2 tail context required')
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 獧 composite progress')
  const polygons=segment.outline.match(/M[^M]+/g)?.map(p=>p.trim())
  if(polygons?.length!==4||polygons[3]!==LEFT||segment.outline!==BODY+' '+LEFT||JSON.stringify(segment.bounds)!=="[9.4,7.95,34.5,94]")throw new Error('Original 獧 body and LEFT polygons required')
  // Body uses the original whole MCQ guide and original weight. This explicit
  // internal phase clock is not a new source mask, guide, or official clock.
  const tailProgress=progress<=SHARE?0:Math.min(1,(progress-SHARE)/(1-SHARE))
  const bodyProgress=Math.min(1,progress/SHARE)
  return Object.freeze({phase:progress===0?'empty':progress===1?'complete':progress<=SHARE?'body':'tail',bodyProgress,tailProgress,bodyOutline:polygons.slice(0,3).join(' '),tailOutline:LEFT,tailRect:Object.freeze({x:20.8-LEFT_CLOCK*tailProgress,y:88 as const,width:LEFT_CLOCK*tailProgress,height:3 as const}),paintOriginalInkOnce:true,originalMaskCount:17,internalRevealPhases:2})
}
export const REVIEWED_U7367_LEFT_TAIL=Object.freeze({bodyWeight:BODY_WEIGHT,leftClock:LEFT_CLOCK,bodyShare:SHARE,originalLogicalPen:2,originalMaskCount:17,originalPolygonCount:34,derivedSourceMasks:0,originalLEFTFlag:14,originalLEFTVertices:LEFT,sourceFieldsUnchanged:true,bodyCoverageAndEveryPositiveTailPrefixProof:'lib/hanja-stroke-original-left-tail-u7367.test.ts',nativeApproval:false,runtimeApplied:false})
