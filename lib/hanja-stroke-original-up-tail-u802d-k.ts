import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline'
import {reviewedU802dKContext,makeReviewedU802dKSourceContext} from './hanja-stroke-start-caps-u802d-k.ts'

/** Candidate source-only partition after official16 macro/direction review; original source stays18 pens/22 masks. */
const UP='M90.5 87.5 L87.5 87.5 L90.5 74.5 L91.5 74.5 Z'
const BODY='M67.95 10 L68.2 25.7 L69.1 39.45 L70.65 51.35 L72.75 61.45 L75.3 69.75 L78.2 76.35 L81.3 81.2 L84.45 84.5 L87.55 86.35 L90.6 87 L90.35 92.95 L85.35 91.9 L80.7 89.2 L76.55 84.9 L72.85 79.15 L69.65 71.8 L66.95 62.9 L64.75 52.35 L63.15 40.05 L62.2 25.95 L61.95 9.95 Z M61.95 10.45 L62 8.75 L67.95 10 Z M67.95 10 L69.45 11 L66.95 12.5 Z M90.6 87 L92.65 87.95 L93.45 90.1 L92.5 92.15 L90.35 92.95 Z'
const BODY_WEIGHT=84.442288
const UP_CLOCK=13
const SHARE=BODY_WEIGHT/(BODY_WEIGHT+UP_CLOCK)
const CONTEXT=Object.freeze({id:'u802d-k-original-up-tail' as const})
export type ReviewedU802dKTailContext=typeof CONTEXT
export type ReviewedU802dKTailFrame=Readonly<{phase:'empty'|'body'|'tail'|'complete';bodyProgress:number;tailProgress:number;bodyOutline:string;tailOutline:typeof UP;tailRect:Readonly<{x:87.5;y:number;width:4;height:number}>;paintOriginalInkOnce:true;originalMaskCount:22;internalRevealPhases:2}>
export function reviewedU802dKTailContext(strokes:HanjaOutlineStrokes):ReviewedU802dKTailContext|null {
  return reviewedU802dKContext(strokes)?CONTEXT:null
}
export function makeReviewedU802dKTailSourceContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU802dKTailContext|null { return makeReviewedU802dKSourceContext(proof,identity,strokes)?CONTEXT:null }
export function reviewedU802dKTailFrame(context:ReviewedU802dKTailContext|null,segment:HanjaOutlineSegment,progress:number):ReviewedU802dKTailFrame {
  if(context!==CONTEXT||segment.revealPath!=='M65 9.5 C64.5 66 77 89.5 90.5 90'||segment.weight!==BODY_WEIGHT||segment.revealWidth!==14||segment.direction!=='curve')throw new Error('Exact original 耭 pen16 tail context required')
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 耭 composite progress')
  const polygons=segment.outline.match(/M[^M]+/g)?.map(p=>p.trim())
  if(polygons?.length!==5||polygons[4]!==UP||segment.outline!==BODY+' '+UP||JSON.stringify(segment.bounds)!=='[61.95,8.75,93.45,92.95]')throw new Error('Original 耭 body and UP polygons required')
  // Body uses the original whole MC guide and original weight. This explicit
  // internal phase clock is not a new source mask, guide, or official clock.
  const tailProgress=progress<=SHARE?0:Math.min(1,(progress-SHARE)/(1-SHARE))
  const bodyProgress=Math.min(1,progress/SHARE)
  return Object.freeze({phase:progress===0?'empty':progress===1?'complete':progress<=SHARE?'body':'tail',bodyProgress,tailProgress,bodyOutline:polygons.slice(0,4).join(' '),tailOutline:UP,tailRect:Object.freeze({x:87.5 as const,y:87.5-UP_CLOCK*tailProgress,width:4 as const,height:UP_CLOCK*tailProgress}),paintOriginalInkOnce:true,originalMaskCount:22,internalRevealPhases:2})
}
export const REVIEWED_U802dK_UP_TAIL=Object.freeze({bodyWeight:BODY_WEIGHT,upClock:UP_CLOCK,bodyShare:SHARE,originalLogicalPen:16,originalMaskCount:22,originalPolygonCount:55,derivedSourceMasks:0,originalUPFlag:15,originalUPVertices:UP,sourceFieldsUnchanged:true,bodyCoverageNotProved:true,official16DirectionPending:false,official16ExactTimedPathDirectionCompared:true,official16MicroTimingNotProved:true,positiveTailPrefixWitness:'x90,y87.5-min(13*alpha/2,1/8)',actualCompletedMCEndpointDiskMarginSquared:'2679/64',nativeApproval:false,runtimeApplied:false})
