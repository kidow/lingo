import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"sourceRoot":"u757d","sourceProofFile":"engine-whole-u757d.json","sourceProofFileSha256":"3af3b640106536e880d70516a9e5ae3b7e0ad6b1f91e802896d653d903918778","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"6dda7004316fccca44ab4e6e1e3babf27e0a27dd7fddf90dec96f08270a26a7c"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function guards():void
export declare function sourceCompileCallCount():number
export declare function cachedPermutationCallCount():number
export declare function reorderOriginalPens(baseline:HanjaOutlineStrokes,order:readonly number[]):HanjaOutlineStrokes
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:'u757d',trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
