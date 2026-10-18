export type ProofIdentity=Readonly<{root:'u6fc8';file:'engine-proof.json';fileSHA256:'9bef99f1313a764285040f9edfd8e03d7e05db49c65eecc9280968700165894b'}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];trace:readonly unknown[];defaults:Readonly<Record<string,number>>}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const SELECTED_PROOF_IDENTITY:ProofIdentity
export const nativeApproval:false,runtimeApplied:false
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Readonly<{originalNumericBaseline:Strokes;baseline:Strokes;strokes:Strokes}>
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u6fc8',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
export function sourceCompileCallCount():number
export const sourceGroups:readonly(readonly number[])[]
