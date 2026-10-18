import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"root":"u66bb-k","file":"sources.json","fileSHA256":"7c0328784eb967be311c8a05069950b06ce2a6153717f23e6f245b47e9ab8542"}|{"root":"u8559-k","file":"sources.json","fileSHA256":"2e281c8023e63c21d0fee8f37312d0f32fcfa99d7e0446f4e39ca5bbd7dcbadc"}|{"root":"u8aea-k","file":"sources.json","fileSHA256":"3588ab806076ff1d0a992b65c58939c3a17c8786c37ac286f4e06938f73d1794"}|{"root":"u931e-k","file":"sources.json","fileSHA256":"1e91ec612894ce10e4b18d48bea7501054671c69d9bb5454d3a30d7627c30a51"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false,sourceEngineReplayKnown:false,sourceVerified:null
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:"u66bb-k"|"u8559-k"|"u8aea-k"|"u931e-k",trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function sourceCompileCallCount(key:string):number
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function lastCompilation(key:string):{baseline:HanjaOutlineStrokes;strokes:HanjaOutlineStrokes}|undefined
export declare function guards():void
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
