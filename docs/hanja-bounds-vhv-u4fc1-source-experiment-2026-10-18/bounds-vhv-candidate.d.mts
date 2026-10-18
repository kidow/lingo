import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"root":"u4fc1","file":"engine-whole-u4fc1.json","fileSHA256":"6418278620404549ccfecf274f7a59b3365747c75beacb74f6539ba086a466f5"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function sourceCompileCallCount(key?:string):number
export declare function candidateDerivationCount(key:string):number
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function lastCompilation(key:string):{baseline:HanjaOutlineStrokes;strokes:HanjaOutlineStrokes;sourceCompilations:0;displayPolicyChanged:true}|undefined
export declare function guards():void
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
