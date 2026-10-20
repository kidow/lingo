export type ProofIdentity=Readonly<{"sourceRoot":"u7d3d";"sourceProofFile":"./engine-whole-u7d3d.json";"sourceProofFileSha256":"e7c2484d2cca44987ed560c8c8f91766995e161b0f0ec716c674e9fb0602edba";"sourceHeaderFile":"./engine-proof.json";"sourceHeaderFileSha256":"43d96c6fab191814e46c97219036d6c5a3a46fc2c5a12b2ffa3312c43cee7e47"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u7d3d'
export const nativeApproval:false,runtimeApplied:false
export const sourceGroups:readonly(readonly number[])[]
export function captureGeometry(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):{factoryBaseline:Strokes;baseline:Strokes}
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u7d3d',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
export function sourceFactoryAttemptCount():number
export function successfulGeometryGenerationCount():number
