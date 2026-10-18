import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"sourceRoot":"u9a22","sourceProofFile":"./engine-whole-u9a22.json","sourceProofFileSha256":"b9ce8d33ff034039a0fe58dd8ac6b1677ebd7b91534c476efdcbb3bf934d4fe5","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"8b4cc3119febcb64146fb6b64471b6bea7ab6ca2134ecbd5769fed1fda7ea1d9","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"bd167ab27a95af086c8cb2a14d4622c92860e019eedcf4f367fe59b1d5f01056"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false
export declare function guards():void
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function sourceCompileCallCount():number
export declare function candidateCallCount():number
export declare function independentDerivationCount():number
export declare function lastCompilation():{baseline:HanjaOutlineStrokes;existing12:HanjaOutlineStrokes;independent:readonly HanjaOutlineStrokes[];strokes:HanjaOutlineStrokes;sourceCompilations:0;independentFromSameOriginalBaseline:true}|undefined
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:'u9a22',trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
