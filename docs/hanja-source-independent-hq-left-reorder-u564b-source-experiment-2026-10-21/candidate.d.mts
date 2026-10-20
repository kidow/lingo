export type ProofIdentity=Readonly<{sourceRoot:"u564b";sourceProofFile:"engine-whole-u564b.json";sourceProofFileSha256:"9e468c43ae57c61254b5ce92073ccf53e8d86c1c6c0ab254853a7059aa1c2410";sourceHeaderFile:"engine-proof.json";sourceHeaderFileSha256:"1fc94a42491373532b26a978d70943bd9e23e3d4d882e0eedfb143587ec22110"}>
export type FullProof=Readonly<{engineRevision:string;engineHashes:Readonly<Record<string,string>>;groups:readonly unknown[];trace:readonly unknown[];defaults:Readonly<Record<string,number>>}>
export type Mask=Readonly<{outline:string;bounds:readonly[number,number,number,number];direction:string;weight:number;revealPath?:string;revealWidth?:number}>
export type Strokes=readonly(readonly Mask[])[]
export const sourceRoot:'u564b',selectedProofIdentity:ProofIdentity,sourceGroups:readonly(readonly number[])[],nativeApproval:false,runtimeApplied:false,actualAppUI:false
export function deriveTails(baseline:Strokes,trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileProgressive(trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function compileSourceWhole(root:'u564b',trace:FullProof['trace'],proof:FullProof,identity:ProofIdentity):Strokes
export function sourceCompileCallCount():number
export function geometryDerivationCallCount():number
export function cachedPositiveCallCount():number
