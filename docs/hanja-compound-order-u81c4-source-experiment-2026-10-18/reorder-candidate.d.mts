import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"sourceRoot":"u81c4","sourceProofFile":"../hanja-outside-three-source-capture-2026-10-18/engine-whole-u81c4.json","sourceProofFileSha256":"a8c9e4f325b1547cd7c3b0ede3a9a29ec2029d89d648f180a1e17bc2e5eb320d","sourceCapsuleFile":"../hanja-outside-three-source-capture-2026-10-18/sources-u81c4.json","sourceCapsuleFileSha256":"49aba54ccc13360075e9c35545a3c4a8db956c341a22fe765530fab5f3f7c792","sourceChecksFile":"../hanja-outside-three-source-capture-2026-10-18/validation.json","sourceChecksFileSha256":"8b2910ec5df27955b48bf9946d160928671ed7e3d9a4b0c94248eb57b6151842"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function guards():void
export declare function sourceCompileCallCount():number
export declare function cachedPermutationCallCount():number
export declare function reorderOriginalPens(baseline:HanjaOutlineStrokes,order:readonly number[]):HanjaOutlineStrokes
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:'u81c4',trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
