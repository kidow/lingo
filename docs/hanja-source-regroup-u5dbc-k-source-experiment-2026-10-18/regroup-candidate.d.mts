import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"sourceRoot":"u5dbc-k","sourceProofFile":"./engine-whole-u5dbc-k.json","sourceProofFileSha256":"5fed1f353746571c424168b5b65d6c0770be78aee8b43e3b6eeaf43433689365","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"b4b34a7a5f11371ea18c2d132c8989b58f0230c3da31fb6c2cc9de81a1123255","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"848a2ef0d13b28e583da92456c95c870ea64261d5863eab8c5a9a2c9e02eea6d"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false
export declare const sourceGroups:readonly(readonly number[])[],originalSourceGroups:readonly(readonly number[])[]
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function sourceCompileCallCount():number
export declare function originalWholeCompilerCallCount():number
export declare function guards():void
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
