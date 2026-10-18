import type {HanjaOutlineStrokes} from '../../lib/hanja-stroke-outline.ts'
export type FixedWholeIdentity=Readonly<{sourceRoot:"u5bac-ue0102";sourceProofFile:"../hanja-remaining-seven-sources-2026-10-17/engine-whole-u5bac-ue0102.json";sourceProofFileSha256:"e3f068c77fe3fcb35ee58b6ebf1f231175e0e1857d97065bf7167a532209e111";sourceCapsuleFile:"../hanja-remaining-seven-sources-2026-10-17/u5bac-sources.json";sourceCapsuleFileSha256:"25838cad67a8ee96c8a786f1d3fb53738351940bf14fe1807f30a3b033e4b1ba";sourceChecksFile:"../hanja-remaining-seven-sources-2026-10-17/source-checks.json";sourceChecksFileSha256:"b1f8f691f84df20be4439a5c241734f9225cd2292db4c2948b840488d087fc72"}>
export type Full5Proof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];trace:readonly unknown[];defaults:Readonly<Record<string,number>>}>
export declare const selectedProofIdentity:FixedWholeIdentity
export declare const sourceGroups:readonly (readonly number[])[]
export declare const nativeApproved:false
export declare const runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:FixedWholeIdentity):HanjaOutlineStrokes
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
