export type ProofIdentity=Readonly<{"sourceRoot":"u51be";"sourceProofFile":"../hanja-current-source-u51be-2026-10-18/engine-whole-u51be.json";"sourceProofFileSha256":"4bf7043e3b4e3aa7ab14d72c17bfbb8e395f70b6d35e881acf5b4a223066246d";"sourceCapsuleFile":"../hanja-current-source-u51be-2026-10-18/sources.json";"sourceCapsuleFileSha256":"5cc3cfba24b728377704e53cae57e5517c42680442816ff188ddcd7f37b9af10"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u51be'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function deriveIndependentMasks(baseline:Strokes,trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u51be',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
