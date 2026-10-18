import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"root":"u79bb","file":"engine-whole-u79bb.json","fileSHA256":"e829a2f8ae1849ebbec673ad1cbc5b184985f85a78338ff8521ad173f3577098"}|{"root":"u79a1","file":"engine-whole-u79a1.json","fileSHA256":"59612a2899b5ba3d5ce8e8ab8c02311a96dbb2db5048fd102b6fa0eed68c2933"}|{"root":"u615c-g","file":"engine-whole-u615c-g.json","fileSHA256":"d20d723c9816add30cb648a244541793e2daecd38d877ca8d94d8f10ffba8338"}|{"root":"u97b6","file":"engine-whole-u97b6.json","fileSHA256":"95f106ca42dea9209a0f4700232bedec17aa4ab882f4e0b7bff7404fe6b094f5"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function sourceCompileCallCount(key:string):number
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function lastCompilation(key:string):{baseline:HanjaOutlineStrokes;strokes:HanjaOutlineStrokes}|undefined
export declare function guards():void
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
