import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"root":"u5dd8","sourceProofFile":"engine-whole-u5dd8.json","sourceProofFileSHA256":"13b5f039316a76e6862894677a10033f2caccfc8b24af837f19d336bd6456abc","engineHeaderSHA256":"13b5f039316a76e6862894677a10033f2caccfc8b24af837f19d336bd6456abc","sourceFileSHA256":"6ae4e39699413702e05f8dbf905c5151b924ad2f9a821d4d95235796847266fc","compilerFileSHA256":"ea81b0ab3cb152405147afe39ab6b5a5d4a3714e1394b1daf80cad9a6cd07c16"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false
export declare const sourceGroups:readonly(readonly number[])[],originalSourceGroups:readonly(readonly number[])[]
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function reorderOriginalPens(baseline:HanjaOutlineStrokes,order:readonly number[]):HanjaOutlineStrokes
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function sourceCompileCallCount():number
export declare function cachedPermutationCallCount():number
export declare function guards():void
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
