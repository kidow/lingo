export type ProofIdentity=Readonly<{"root":"u73ad-j";"headerFile":"../hanja-goal-glyphwiki-batch140-2026-09-27/current-engine-proof.json";"headerFileSHA256":"57d81989a596d0728c0691e7ea214a90997b2b4e141ae3d76ef701ccb5e7ed95";"traceFile":"../hanja-goal-glyphwiki-batch140-2026-09-27/current-draw-trace.json";"traceFileSHA256":"ad1ddb79b0463008f8d0d22da41fce3e3247a99fe3b133d1eedf5825f88fb0cc";"sourceFile":"../hanja-goal-glyphwiki-batch140-2026-09-27/current-source-alternative.json";"sourceFileSHA256":"5daedd8efe88eb4aced662980cc78bdc0e6e4c55e063397cf4b4b254301a9902"}>
export type FullProof=Readonly<{engineRevision:string;hashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u73ad-j'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{rawBaseline:Strokes;baseline:Strokes}
export function deriveTail(baseline:Strokes,trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u73ad-j',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
