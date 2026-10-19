export type ProofIdentity=Readonly<{"root":"u7f5b";"headerFile":"../hanja-goal-glyphwiki-batch442-2026-10-09/engine-proof.json";"headerFileSHA256":"228fcac1a9cf41a1b900a64955be1e6b2ecd3b25f61ac92f27d9495a995a3bf2";"traceFile":"../hanja-goal-glyphwiki-batch442-2026-10-09/draw-trace.json";"traceFileSHA256":"d5339b48ebd58f518fd601ed20eacc5c2f56d3be2663e25d2cf9c82798924953";"sourceFile":"../hanja-goal-glyphwiki-batch442-2026-10-09/sources.json";"sourceFileSHA256":"e165543da19894fa44c2828d84330adec03ae78cc0e0b82f6c30705e9b509bf6"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u7f5b'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u7f5b',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
