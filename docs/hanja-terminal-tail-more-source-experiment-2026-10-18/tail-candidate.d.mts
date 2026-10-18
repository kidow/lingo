import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"root":"u75d7","file":"engine-whole-u75d7.json","fileSHA256":"4598ec48fc6719fe2eeb290a244518742064c2cf1893668c134f35f29ba8a944"}|{"root":"u82fa-k","file":"engine-whole-u82fa-k.json","fileSHA256":"74ef19471b97d7771aeb7bf657b25ea6425e69d03ab279572a8bfa0bd1a659a7"}|{"root":"u6958","file":"engine-whole-u6958.json","fileSHA256":"5b2c8503d36edcf0859043b420fa5a95a4f8c6e3df91fefb2c278e1325cd997d"}|{"root":"u81b4","file":"engine-whole-u81b4.json","fileSHA256":"1e974e46e55acde4f948331046cdcbdae389593e8cb3a1e390efed438e6a391d"}|{"root":"u8add","file":"engine-whole-u8add.json","fileSHA256":"b7cdf5687c533c130ce0200565964afbd1b209aba61c12dbfc470fc864de1c2b"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function sourceCompileCallCount(key:string):number
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function lastCompilation(key:string):{baseline:HanjaOutlineStrokes;strokes:HanjaOutlineStrokes}|undefined
export declare function guards():void
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
