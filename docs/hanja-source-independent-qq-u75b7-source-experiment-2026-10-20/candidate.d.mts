export type ProofIdentity=Readonly<{root:'u75b7';file:'../hanja-goal-glyphwiki-batch838-2026-10-13/engine-whole-u75b7.json';fileSHA256:'a79941bfb48ad7f6433d9285c68c3be71cd0e205ebcfece1fa1015318e7e1f7b'}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];defaults:Readonly<Record<string,number>>;trace:readonly unknown[]}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const selectedProofIdentity:ProofIdentity,sourceRoot:'u75b7'
export const sourceProofFile:string,sourceProofFileSha256:string
export const nativeApproval:false,runtimeApplied:false,preparationOriginalCompilerPositiveCount:1
export const sourceGroups:readonly(readonly number[])[]
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u75b7',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function validateCachedFixture(fixture:unknown):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
export function renderProgressive(strokes:Strokes,stroke:number,progress:number,prefix?:string):string
