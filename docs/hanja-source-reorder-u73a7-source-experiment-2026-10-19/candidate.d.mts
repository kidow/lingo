export type ProofIdentity=Readonly<{root:'u73a7';file:'engine-proof.json';fileSHA256:'52e5d86cf380cf6ae1bf2cacd583287f87e5519f804cf4211ad32d9545233b3d'}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u73a7',originalPenOrder:readonly[1,3,2,4,5,6,7,8]
export const nativeApproval:false,runtimeApplied:false
export function guards():void
export function assertPermutation(baseline:Strokes,order:readonly number[],strokes:Strokes):void
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u73a7',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
