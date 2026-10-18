import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"root":"u7f3e","file":"engine-whole-u7f3e.json","fileSHA256":"79e0f80d8788c3dbd6a6d9fa97626850ee3356153c8a5c5a38344149cf4bb655"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false
export declare function guards():void
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function sourceCompileCallCount():number
export declare function candidateDerivationCount():number
export declare function lastCompilation():{baseline:HanjaOutlineStrokes;strokes:HanjaOutlineStrokes;sourceCompilations:0;sourceIdentityWasNewBinding:true}|undefined
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,id:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:'u7f3e',trace:readonly unknown[],proof:Full5Proof,id:SelectedProofIdentity):HanjaOutlineStrokes
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
