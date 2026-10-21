export type ProofIdentity=Readonly<{sourceRoot:'u5b76-ue0102';sourceProofFile:'engine-whole-u5b76-ue0102.json';sourceProofFileSha256:'21a36539fcd4ca8ce572502737989296f674f03611dc5bd369a2cc37d0a9eaa0'}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];trace:readonly unknown[];defaults:Readonly<Record<string,number>>}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const sourceRoot:'u5b76-ue0102',selectedProofIdentity:ProofIdentity,sourceGroups:readonly(readonly number[])[],nativeApproval:false,runtimeApplied:false,actualAppUI:false
export function captureProjection(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{fullProof:FullProof;rawBaseline:Strokes;baseline:Strokes;strokes:Strokes;traceProjectionOperations:1;newInternalRawProjectorExecutions:1;originalCompilerExecutions:0;existingFactoryCalls:0;engineRuns:0;tailDerivations:0;staticCorrespondenceObserved:true;nativeAnimationApproved:false;nativeApproval:false;runtimeApplied:false}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u5b76-ue0102',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function traceProjectionCallCount():number
export function newInternalRawProjectorCallCount():number
export function cachedPositiveCallCount():number
export function originalSourceCompilerCallCount():number
export function existingFactoryCallCount():number
export function renderProgressive(strokes:Strokes,stroke:number,progress:number,prefix?:string):string
