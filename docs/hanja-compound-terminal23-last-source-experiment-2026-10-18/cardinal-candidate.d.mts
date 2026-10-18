import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"root":"u554d","file":"engine-whole-u554d.json","fileSHA256":"ef0db29035ecce7b1071c8c65abe5e7cbde5c344bd3bc04ef3643203b3ddeb3f"}|{"sourceRoot":"u9a22","sourceProofFile":"./engine-whole-u9a22.json","sourceProofFileSha256":"b9ce8d33ff034039a0fe58dd8ac6b1677ebd7b91534c476efdcbb3bf934d4fe5","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"8b4cc3119febcb64146fb6b64471b6bea7ab6ca2134ecbd5769fed1fda7ea1d9","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"bd167ab27a95af086c8cb2a14d4622c92860e019eedcf4f367fe59b1d5f01056"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function sourceCompileCallCount(key:string):number
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function lastCompilation(key:string):{baseline:HanjaOutlineStrokes;strokes:HanjaOutlineStrokes}|undefined
export declare function guards():void
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
