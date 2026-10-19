export type ProofIdentity=Readonly<{sourceRoot:'u9b37';sourceProofFile:'./engine-whole-u9b37.json';sourceProofFileSha256:'d0b4a55d6516204f56b74b66045c10b9cd5696ebb26892ec9155af52066d9e16'}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u9b37'
export const sourceProofFile:string,sourceProofFileSha256:string
export const nativeApproval:false,runtimeApplied:false,preparationOriginalCompilerPositiveCount:1
export const sourceGroups:readonly(readonly number[])[]
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u9b37',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function validateCachedFixture(fixture:unknown):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
export function renderProgressive(strokes:Strokes,stroke:number,progress:number,prefix?:string):string
