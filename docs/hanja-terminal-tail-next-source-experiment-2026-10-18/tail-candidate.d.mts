import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"root":"u8478-var-001","file":"engine-whole-u8478-var-001.json","fileSHA256":"f1c24fed0d8b559df4f93846c1c14c14317833995c58c8f9179cd58839b07259"}|{"root":"u9c68","file":"engine-whole-u9c68.json","fileSHA256":"de447ba692c0c16ebb3d11e14be593139437d8c1e82ca935c37773f8d31984f5"}|{"root":"u7fdb","file":"engine-whole-u7fdb.json","fileSHA256":"4571bf4f9f949e705e404a45d68689b0ac80683f899465011bf8a0de8f9f9309"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function sourceCompileCallCount(key:string):number
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function lastCompilation(key:string):{baseline:HanjaOutlineStrokes;strokes:HanjaOutlineStrokes}|undefined
export declare function guards():void
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
