import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"root":"u6945","file":"engine-whole-u6945.json","fileSHA256":"1981a0b4d005b66b04d6ab78c1149bdf6d3c13792cc023216a55ffe28d927b5a"}|{"sourceRoot":"u9902","sourceProofFile":"engine-whole-u9902.json","sourceProofFileSHA256":"4b2b78430cafdc893c55c01fb0afc649b84690a6bdadd46b92a8a0377e8a2bdf","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSHA256":"4b2b78430cafdc893c55c01fb0afc649b84690a6bdadd46b92a8a0377e8a2bdf"}|{"root":"u93dc","file":"engine-whole-u93dc.json","fileSHA256":"42ca8342b3d1d6c33771238a96c4c5e1b1b7d952be65af4a17629d6e4d28961d"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function sourceCompileCallCount(key:string):number
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function lastCompilation(key:string):{baseline:HanjaOutlineStrokes;strokes:HanjaOutlineStrokes}|undefined
export declare function guards():void
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
