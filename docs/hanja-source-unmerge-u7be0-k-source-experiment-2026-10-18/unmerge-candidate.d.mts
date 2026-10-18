import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity=Readonly<{sourceRoot:"u7be0-k";sourceProofFile:"../hanja-remaining-seven-sources-2026-10-17/engine-whole-u7be0-k.json";sourceProofFileSha256:"6e9a9b8751722d9bde3c6be4d9b0f3ab3bdee004629058b0dc0941ab6e47c800";sourceCapsuleFile:"../hanja-remaining-seven-sources-2026-10-17/u7be0-sources.json";sourceCapsuleFileSha256:"dab465d0ba7c5e3b34722987e035c17f04eb21a3b53474ed4e5a5c14ea2bd727";sourceChecksFile:"../hanja-remaining-seven-sources-2026-10-17/source-checks.json";sourceChecksFileSha256:"b1f8f691f84df20be4439a5c241734f9225cd2292db4c2948b840488d087fc72"}>
export type Full5Proof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];trace:readonly unknown[];defaults:Readonly<Record<string,number>>}>
export declare const selectedProofIdentity:SelectedProofIdentity
export declare const originalSourceGroups:readonly(readonly number[])[]
export declare const sourceGroups:readonly(readonly number[])[]
export declare const nativeApproved:false
export declare const runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:'u7be0-k',trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function captureUnmerged(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):Readonly<{baseline:HanjaOutlineStrokes;strokes:HanjaOutlineStrokes}>
export declare function sourceCaptureCount():number
export declare function fixedTargets():Readonly<Record<'u7be0-k',unknown>>
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
