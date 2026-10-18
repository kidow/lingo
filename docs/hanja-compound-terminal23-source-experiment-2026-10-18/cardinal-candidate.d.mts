import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
import type{SelectedProofIdentity as Identity1082,SelectedProof}from'../hanja-goal-glyphwiki-batch1082-2026-10-13/strict-source-candidate.mjs'
import type{SelectedProofIdentity as Identity1101,Full5Proof}from'../hanja-goal-glyphwiki-batch1101-2026-10-13/strict-source-candidate.mjs'
import type{SelectedProofIdentity as Identity1105,Full8Proof}from'../hanja-goal-glyphwiki-batch1105-2026-10-13/strict-source-candidate.mjs'
export declare const nativeApproval:false,runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:SelectedProof,identity:Identity1082):HanjaOutlineStrokes
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:Identity1101):HanjaOutlineStrokes
export declare function compileProgressive(trace:readonly unknown[],proof:Full8Proof,identity:Identity1105):HanjaOutlineStrokes
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:SelectedProof|Full5Proof|Full8Proof,identity:Identity1082|Identity1101|Identity1105):HanjaOutlineStrokes
export declare function sourceCompileCallCount(key:string):number
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function lastCompilation(key:string):{baseline:HanjaOutlineStrokes;strokes:HanjaOutlineStrokes}|undefined
export declare function guards():void
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
