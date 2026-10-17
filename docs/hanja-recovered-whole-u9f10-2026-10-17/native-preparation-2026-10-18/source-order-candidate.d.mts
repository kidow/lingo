import type {HanjaOutlineStrokes} from '../../../lib/hanja-stroke-outline.ts'
import type {FixedRecoveryIdentity,Full5Proof} from '../progressive.mjs'
export declare const selectedProofIdentity:FixedRecoveryIdentity
export declare const sourceMaskOrder:readonly number[]
export declare const sourceGroups:readonly (readonly number[])[]
export declare const nativeApproved:false
export declare const runtimeApplied:false
export declare function sourceCompileCallCount():number
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:FixedRecoveryIdentity):HanjaOutlineStrokes
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
