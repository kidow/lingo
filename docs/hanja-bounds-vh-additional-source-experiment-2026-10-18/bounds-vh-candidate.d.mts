import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"sourceRoot":"u83e1-ue0102","sourceProofFile":"engine-whole-u83e1-ue0102.json","sourceProofFileSha256":"a936e5e37f4b8850eeedc2a55723bf49d099435d895da59c09c582a1e267604f","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"fe049e837e88471943a88125d0f6bc6cadf716ee32af3d9cf6bbf197f927e3d8"}|{"root":"u5dd8","sourceProofFile":"engine-whole-u5dd8.json","sourceProofFileSHA256":"13b5f039316a76e6862894677a10033f2caccfc8b24af837f19d336bd6456abc","engineHeaderSHA256":"13b5f039316a76e6862894677a10033f2caccfc8b24af837f19d336bd6456abc","sourceFileSHA256":"6ae4e39699413702e05f8dbf905c5151b924ad2f9a821d4d95235796847266fc","compilerFileSHA256":"ea81b0ab3cb152405147afe39ab6b5a5d4a3714e1394b1daf80cad9a6cd07c16"}|{"sourceRoot":"u5dbc-k","sourceProofFile":"./engine-whole-u5dbc-k.json","sourceProofFileSha256":"5fed1f353746571c424168b5b65d6c0770be78aee8b43e3b6eeaf43433689365","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"b4b34a7a5f11371ea18c2d132c8989b58f0230c3da31fb6c2cc9de81a1123255","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"848a2ef0d13b28e583da92456c95c870ea64261d5863eab8c5a9a2c9e02eea6d"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:"u83e1-ue0102"|"u5dd8"|"u5dbc-k",trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function sourceCompileCallCount():number
export declare function candidateDerivationCount(key:string):number
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function lastCompilation(key:string):{baseline:HanjaOutlineStrokes;strokes:HanjaOutlineStrokes;sourceCompilations:0;displayPolicyChanged:true}|undefined
export declare function guards():void
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
