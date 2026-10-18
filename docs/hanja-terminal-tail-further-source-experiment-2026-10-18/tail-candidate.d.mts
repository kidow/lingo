import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"root":"u803c","file":"engine-whole-u803c.json","fileSHA256":"82f0e5c048ada94a3367795ea4f2418c629adf1d0aac0f3675188c97d99e18f7"}|{"root":"u8b48","file":"engine-whole-u8b48.json","fileSHA256":"9986cb9d90df2e63afbc9c9dacdd4bf914a2bb34b390e848d36c91d98dfbb4aa"}|{"root":"u8203-g","file":"engine-whole-u8203-g.json","fileSHA256":"7d3351fbfbf96faec0a88659705ced0a050be8763e357662f5676e4c119c7ecc"}|{"root":"u99ea","file":"engine-whole-u99ea.json","fileSHA256":"04fc55841533a1a8c16d5771be88e91bdb8d6c5fae3f3a0e8bdae77ba5afeaef"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function sourceCompileCallCount(key:string):number
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function lastCompilation(key:string):{baseline:HanjaOutlineStrokes;strokes:HanjaOutlineStrokes}|undefined
export declare function guards():void
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
