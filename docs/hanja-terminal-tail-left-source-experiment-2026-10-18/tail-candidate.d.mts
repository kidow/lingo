import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"root":"u9a0b","file":"engine-whole-u9a0b.json","fileSHA256":"ea0711d6efe6a70cda7c0bdd7c3f825c3b13fc57ffa19882c3ad0d54a0cb553c"}|{"root":"u85d0-ue0102","file":"engine-whole-u85d0-ue0102.json","fileSHA256":"fa7a60916d12f38cfb7bbf49fb1c1ba882dfb26c54cbafb9f5f86ce9dc6e7393"}|{"root":"u93cb","file":"engine-whole-u93cb.json","fileSHA256":"0bf05d6e8e6aaa9502d188610bf44df2ca43c2be2ac3fb35d3422d50be826d41"}|{"root":"u92c2","file":"engine-whole-u92c2.json","fileSHA256":"4f13490f88250b916892e57ae74d6b6deb6bb5682393a46345b23124d251cc80"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function sourceCompileCallCount(key:string):number
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function lastCompilation(key:string):{baseline:HanjaOutlineStrokes;strokes:HanjaOutlineStrokes}|undefined
export declare function guards():void
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
