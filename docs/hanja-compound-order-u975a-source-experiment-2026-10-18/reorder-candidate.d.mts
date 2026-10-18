import type {HanjaOutlineStrokes} from '../../lib/hanja-stroke-outline.ts'
export type SelectedProofIdentity={"sourceRoot":"u975a","sourceProofFile":"../hanja-related-whole-jing-bian-pian-native-source-2026-10-14/engine-whole-u975a.json","sourceProofFileSha256":"655ea27e919286a4fc8692a147a1a6025ef58513e4ceb11d7e61a6a4e2dd1b7c","sourceCapsuleFile":"../hanja-related-whole-jing-bian-pian-native-source-2026-10-14/sources.json","sourceCapsuleFileSha256":"acdb287e18a5b2dc4f83d39270c7ebe276aee479bab3c798bb23076f38ea706a","sourceChecksFile":"../hanja-related-whole-jing-bian-pian-native-source-2026-10-14/metadata.json","sourceChecksFileSha256":"921ada4a03563e123ddeddd4c64de64c9b50b45566426499ad43a2575520a9d3"}
export type Full5Proof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];trace:readonly unknown[];defaults:Readonly<Record<string,number>>}>
export declare const nativeApproval:false
export declare const runtimeApplied:false
export declare function fixedTargets():Readonly<Record<string,unknown>>
export declare function guards():void
export declare function sourceCompileCallCount():number
export declare function cachedPermutationCallCount():number
export declare function reorderOriginalPens(baseline:HanjaOutlineStrokes,order:readonly number[]):HanjaOutlineStrokes
export declare function compileProgressive(trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function compileSourceWhole(root:'u975a',trace:readonly unknown[],proof:Full5Proof,identity:SelectedProofIdentity):HanjaOutlineStrokes
export declare function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
