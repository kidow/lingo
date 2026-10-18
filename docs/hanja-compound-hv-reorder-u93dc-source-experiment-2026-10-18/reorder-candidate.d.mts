import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"root":"u93dc","file":"engine-whole-u93dc.json","fileSHA256":"42ca8342b3d1d6c33771238a96c4c5e1b1b7d952be65af4a17629d6e4d28961d"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function guards():void
export declare function sourceCompileCallCount():number
export declare function cachedPermutationCallCount():number
export declare function reorderOriginalPens(baseline:HanjaOutlineStrokes,order:readonly number[]):HanjaOutlineStrokes
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:'u93dc',trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
