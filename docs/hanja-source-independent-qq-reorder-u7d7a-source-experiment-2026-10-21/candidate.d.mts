export type ProofIdentity=Readonly<{sourceRoot:'u7d7a';sourceProofFile:'engine-proof.json';sourceProofFileSha256:'8ca5792ecff90e6324438b4fdaa6d64cb038762bd4f0b62a79948ce95d9966a6'}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];trace:readonly unknown[];defaults:Readonly<Record<string,number>>}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const sourceRoot:'u7d7a',selectedProofIdentity:ProofIdentity,sourceGroups:readonly(readonly number[])[],nativeApproval:false,runtimeApplied:false,actualAppUI:false
export function captureProjection(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{fullProof:FullProof;rawBaseline:Strokes;baseline:Strokes;strokes:Strokes;traceProjectionOperations:1;newInternalRawProjectorExecutions:1;originalCompilerExecutions:0;existingFactoryCalls:0;engineRuns:0;tailDerivations:0;staticMappingApproved:true;nativeAnimationApproved:false;nativeApproval:false;runtimeApplied:false}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u7d7a',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function traceProjectionCallCount():number
export function newInternalRawProjectorCallCount():number
export function cachedPositiveCallCount():number
export function originalSourceCompilerCallCount():number
export function existingFactoryCallCount():number
export function renderProgressive(strokes:Strokes,stroke:number,progress:number,prefix?:string):string
