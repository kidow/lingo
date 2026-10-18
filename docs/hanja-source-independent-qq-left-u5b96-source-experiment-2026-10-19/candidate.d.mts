export type ProofIdentity=Readonly<{"root":"u5b96";"headerFile":"../hanja-goal-glyphwiki-batch120-2026-09-27/engine-proof.json";"headerFileSHA256":"1889f38d5387f2183379693fcdf16129438eb22218348519cc2b5d2e4fd271ac";"traceFile":"../hanja-goal-glyphwiki-batch120-2026-09-27/draw-trace.json";"traceFileSHA256":"927182470bc9f7325b156f25d0b8852720ff30ff074c22aff66a5ae7171e1963";"sourceFile":"../hanja-goal-glyphwiki-batch120-2026-09-27/sources.json";"sourceFileSHA256":"951f00dfa3ecba9af57a507ec3b76649dfe08bc0efdd77e9a9d4830181911f20"}>
export type FullProof=Readonly<{engineRevision:string;hashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u5b96'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function deriveTail(baseline:Strokes,trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u5b96',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
