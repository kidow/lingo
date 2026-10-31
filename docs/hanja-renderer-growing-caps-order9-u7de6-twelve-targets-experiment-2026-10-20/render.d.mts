import type {HanjaOutlineSegment} from '../../lib/hanja-stroke-outline.ts'
type Frame={p:number;L:number;d:number;rho:number;q0:number[];point:{x:number;y:number}}
export function growingCapsState(segment:HanjaOutlineSegment,progress:number,length:number,point:{x:number;y:number}):Frame
export function remainingQState(segment:HanjaOutlineSegment,progress:number,length:number,point:{x:number;y:number}):Frame
