import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"sourceRoot":"u83e1-ue0102","sourceProofFile":"engine-whole-u83e1-ue0102.json","sourceProofFileSha256":"a936e5e37f4b8850eeedc2a55723bf49d099435d895da59c09c582a1e267604f","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"fe049e837e88471943a88125d0f6bc6cadf716ee32af3d9cf6bbf197f927e3d8"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function guards():void
export declare function sourceCompileCallCount():number
export declare function cachedPermutationCallCount():number
export declare function reorderOriginalPens(baseline:HanjaOutlineStrokes,order:readonly number[]):HanjaOutlineStrokes
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:'u83e1-ue0102',trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
