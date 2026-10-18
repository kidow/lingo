import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"root":"u8451-ue0102","file":"engine-whole-u8451-ue0102.json","fileSHA256":"38d89087939ca3915dc6ec1a0725bf9cde116a06d8801fb14b4406ef54627cd9"}|{"root":"u8c76-ue0102","file":"engine-whole-u8c76-ue0102.json","fileSHA256":"9e1d1da2707328c645e4987514fde7f50f6040c476980c13e4417037e27c266f"}|{"root":"u5070-ue0103","file":"engine-whole-u5070-ue0103.json","fileSHA256":"18d21a4a8bd43cb6bb27454c0e06a7522f0cf99b017e0c8efd4e4c5670495e3a"}|{"root":"u9a02","file":"engine-whole-u9a02.json","fileSHA256":"4840cb8a78fcbcc926d960fae564af116e17d6533b677f56aea9bb49a40de60e"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function sourceCompileCallCount(key:string):number
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function lastCompilation(key:string):{baseline:HanjaOutlineStrokes;strokes:HanjaOutlineStrokes}|undefined
export declare function guards():void
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
