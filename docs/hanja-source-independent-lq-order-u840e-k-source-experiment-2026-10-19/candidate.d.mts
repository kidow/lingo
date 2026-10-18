export type ProofIdentity=Readonly<{"root":"u840e-k";"headerFile":"../hanja-goal-glyphwiki-batch770-2026-10-13/engine-proof.json";"headerFileSHA256":"dc233862a5082c07d0d1a56fa5e47ca53ed3689d8e4201f793d80115152269db";"wholeFile":"../hanja-goal-glyphwiki-batch770-2026-10-13/engine-whole-u840e-k.json";"wholeFileSHA256":"88f9110039316a705b21e6ae53a90930f26b30d32f2a7d98aac4f3795825f18f";"sourceFile":"../hanja-goal-glyphwiki-batch770-2026-10-13/sources.json";"sourceFileSHA256":"787ace2d325edc710fc5e7d9be798b94624d079450091f88f95a67dda6da2719"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:"u840e-k"
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:"u840e-k",trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
