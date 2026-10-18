export type ProofIdentity=Readonly<{root:'u6e3d';file:'engine-proof.json';fileSHA256:'27673593f64276d5d75ede80ef823e95ec061c61a3d6254176d521c874046937'}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];trace:readonly unknown[];defaults:Readonly<Record<string,number>>}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const SELECTED_PROOF_IDENTITY:ProofIdentity
export const nativeApproval:false,runtimeApplied:false
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Readonly<{baseline:Strokes;strokes:Strokes}>
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u6e3d',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
export function sourceCompileCallCount():number
export const sourceGroups:readonly(readonly number[])[]
