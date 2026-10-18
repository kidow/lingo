import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"root":"u67c5","file":"engine-whole-u67c5.json","fileSHA256":"97d46a424e5b90c84e802c03e2b4447c9baa7aae58718ce785f9167fc1d00d33"}|{"root":"u96b4","file":"engine-whole-u96b4.json","fileSHA256":"7f6d0295c6953f55f621011676da27384eff4cd5e62d162dc69313aebc871333"}|{"root":"u6032","file":"engine-whole-u6032.json","fileSHA256":"156bf8d2e30554235f0ea091296a3fac0ebcb14454c5974e5bc6be29b839c0ad"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function sourceCompileCallCount(key:string):number
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function lastCompilation(key:string):{baseline:HanjaOutlineStrokes;strokes:HanjaOutlineStrokes}|undefined
export declare function guards():void
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
