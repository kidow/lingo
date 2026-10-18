import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"sourceRoot":"u6a32","sourceProofFile":"../hanja-remaining-five-source-recovery-2026-10-17/engine-archive-recovered-u6a32.json","sourceProofFileSha256":"e5d38d7243fcfeafd19df03894b186da4a3e899896220c57ccae4360c6c0bb77","sourceCapsuleFile":"../hanja-remaining-five-source-recovery-2026-10-17/archive-recovered-u6a32-sources.json","sourceCapsuleFileSha256":"cc772f9bb3bdde9bebc334ae1988151bb8daa6849f0433a2ea9a95721237c905","sourceManifestFile":"../hanja-remaining-five-source-recovery-2026-10-17/manifest.json","sourceManifestFileSha256":"0c4a6414b7865608df7a44924cc01c1f0c04dc91683f784f8b9e7061de0c5002"}
export type Full5Proof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];trace:readonly unknown[];defaults:Readonly<Record<string,number>>}>
export declare const nativeApproval:false,runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:'u6a32',trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function sourceCompileCallCount():number
export declare function cachedDerivationCallCount():number
export declare function guards():void
export declare function deriveOriginalTail(baseline:HanjaOutlineStrokes,proof:Full5Proof):HanjaOutlineStrokes
export declare function reorderOriginalPens(baseline:HanjaOutlineStrokes,order:readonly number[]):HanjaOutlineStrokes
