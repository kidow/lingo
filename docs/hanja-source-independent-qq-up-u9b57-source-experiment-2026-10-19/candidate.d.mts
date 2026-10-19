export type ProofIdentity=Readonly<{"root":"u9b57";"headerFile":"../hanja-goal-glyphwiki-batch667-2026-10-11/engine-proof.json";"headerFileSHA256":"220f5ea6f5e4d7f4ad844bf667adf3c82a8d679be3c156ff4f687c2dfa6de100";"traceFile":"../hanja-goal-glyphwiki-batch667-2026-10-11/draw-trace.json";"traceFileSHA256":"1aaa9cea15a7e160cf18a4e1103fdc9654f656dd95a225c3cb3ebacd67d5c3db";"sourceFile":"../hanja-goal-glyphwiki-batch667-2026-10-11/sources.json";"sourceFileSHA256":"0355b51f2a74fd03460f7340b1ef30b8c7209345aef26c2147ec963b515f928a"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u9b57'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u9b57',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
export function deriveTail(baseline:Strokes,trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
