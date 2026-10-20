export type OriginalProof={defaults:unknown;engineHashes:unknown;engineRevision:unknown;groups:unknown[];trace:unknown[]}
export type SourceIdentity={sourceRoot:string;sourceProofFile:string;sourceProofFileSha256:string}
export type StrokeMask={outline:string;bounds:number[];direction:string;weight:number;revealPath?:string;revealWidth?:number}
export declare function validateSelectedProof(trace:unknown,proof:OriginalProof,identity:SourceIdentity):true
export declare function capturePartition(trace:unknown,proof:OriginalProof,identity:SourceIdentity):Record<string,unknown>
export declare function compileProgressive(trace:unknown,proof:OriginalProof,identity:SourceIdentity):StrokeMask[][]
export declare function compileSourceWhole(root:string,trace:unknown,proof:OriginalProof,identity:SourceIdentity):StrokeMask[][]
export declare function cachedPartitionCallCount():number
export declare function cachedFixtureReadCount():number
export declare const sourceRoot:string,sourceIdentity:Readonly<SourceIdentity>,originalGeometrySHA256:string
