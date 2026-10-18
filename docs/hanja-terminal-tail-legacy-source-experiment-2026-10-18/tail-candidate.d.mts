import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"root":"u7954","file":"engine-whole-u7954.json","fileSHA256":"aa3db71ecefd15da269a7dbd8e9057dbbabf4bb6e333824b0dfa74f11e22a654"}|{"root":"u7f66","file":"engine-whole-u7f66.json","fileSHA256":"8e96e9325137d2e6bf85363a41bc4b035d97b78fab381375dccf6b32c14456cf"}|{"root":"u73d7","file":"engine-whole-u73d7.json","fileSHA256":"1f54ba2e7581accd541324070f083e7a50e37b421a2bb0f01c509c19127e28f4"}|{"root":"u73bf","file":"engine-whole-u73bf.json","fileSHA256":"8383ecdfded2aa1598cebd62ec4eebcd5a894e7f28da9f13585c8f2b8f40f578"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function sourceCompileCallCount(key:string):number
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function lastCompilation(key:string):{baseline:HanjaOutlineStrokes;strokes:HanjaOutlineStrokes}|undefined
export declare function guards():void
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
