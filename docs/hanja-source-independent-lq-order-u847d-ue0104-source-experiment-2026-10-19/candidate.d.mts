export type ProofIdentity=Readonly<{"root":"u847d-ue0104";"headerFile":"../hanja-goal-glyphwiki-batch751-2026-10-12/engine-proof.json";"headerFileSHA256":"a9ceda14b6ff4923bb3d9d4deb4269d8eedcb57cc883124c9b216d155e43e0fd";"wholeFile":"../hanja-goal-glyphwiki-batch751-2026-10-12/engine-whole-u847d-ue0104.json";"wholeFileSHA256":"9e801590ed9c307e785b84f9b1f15193b8a4834bce1a7e2badd2ad128298aa7d";"sourceFile":"../hanja-goal-glyphwiki-batch751-2026-10-12/sources.json";"sourceFileSHA256":"37adaafaedae3c4d04fa46c26d58256815c41c305fb831832e4332c698005af4"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:"u847d-ue0104"
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:"u847d-ue0104",trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
