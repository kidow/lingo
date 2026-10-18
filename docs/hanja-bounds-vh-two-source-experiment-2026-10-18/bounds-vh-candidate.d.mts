import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"root":"u75d7","file":"engine-whole-u75d7.json","fileSHA256":"4598ec48fc6719fe2eeb290a244518742064c2cf1893668c134f35f29ba8a944"}|{"root":"u82fa-k","file":"engine-whole-u82fa-k.json","fileSHA256":"74ef19471b97d7771aeb7bf657b25ea6425e69d03ab279572a8bfa0bd1a659a7"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function sourceCompileCallCount(key?:string):number
export declare function candidateDerivationCount(key:string):number
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function lastCompilation(key:string):{baseline:HanjaOutlineStrokes;strokes:HanjaOutlineStrokes;independent:readonly HanjaOutlineStrokes[];sourceCompilations:0;displayPolicyChanged:true}|undefined
export declare function guards():void
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
