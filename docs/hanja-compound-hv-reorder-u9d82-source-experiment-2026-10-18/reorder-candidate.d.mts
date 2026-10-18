import type{Full8Proof,SelectedProofIdentity}from'../hanja-goal-glyphwiki-batch1105-2026-10-13/strict-source-candidate.mjs'
import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export declare const nativeApproval:false,runtimeApplied:false
export declare function guards():void
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function sourceCompileCallCount():number
export declare function cachedPermutationCallCount():number
export declare function reorderOriginalPens(baseline:HanjaOutlineStrokes,order:readonly number[]):HanjaOutlineStrokes
export declare function compileProgressive(trace:readonly unknown[],proof:Full8Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:'koseki-532530@2',trace:readonly unknown[],proof:Full8Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
