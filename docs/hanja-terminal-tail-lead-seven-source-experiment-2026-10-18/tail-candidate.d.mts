import type{HanjaOutlineStrokes}from'../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"root":"u9a54","file":"engine-whole-u9a54.json","fileSHA256":"f8343fc060c29b0042cbcd1118f8aa260755b8f8586795691cd8739bd46a2caf"}|{"root":"u52f1-ue0102","file":"engine-whole-u52f1-ue0102.json","fileSHA256":"cbfe25927fb3a949a268994c0ee03ee9ac5a55002adfdfb9f15228300d6a735b"}|{"root":"u8f17","file":"engine-whole-u8f17.json","fileSHA256":"e036053406e745606591138754ef00ab80f791ed8d17a14ff0a7ee1fb32beb4b"}|{"root":"u5804","file":"engine-whole-u5804.json","fileSHA256":"3cffc221b5dbde9677fda15b2cb1f301387b82f927b69262cf4b68b6aa6fad51"}|{"root":"u9e91","file":"engine-whole-u9e91.json","fileSHA256":"76e3100c1cee7397c6ebd403e96b5ff69fad0f711b9067a31719692a761dc11e"}|{"root":"u854a-ue0102","file":"engine-whole-u854a-ue0102.json","fileSHA256":"022ca8caca417e00ff9e0d581251d77977ad57ea7202e4fd43cb0243d367bd69"}|{"root":"u84fa-var-001","file":"engine-whole-u84fa-var-001.json","fileSHA256":"a34bf05f3364ebc262ec088bada212282587452fd52d45da942bc1dd8572178c"}
export interface Full5Proof{readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly unknown[];readonly trace:readonly(readonly unknown[])[];readonly defaults:Readonly<Record<string,unknown>>}
export declare const nativeApproval:false,runtimeApplied:false
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:string,trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function sourceCompileCallCount(key:string):number
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function lastCompilation(key:string):{baseline:HanjaOutlineStrokes;strokes:HanjaOutlineStrokes}|undefined
export declare function guards():void
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
