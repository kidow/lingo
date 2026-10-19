export type SourcePoint={x:number;y:number;off:number};export type SourceCall={kind:string;args:number[];polygons:SourcePoint[][]};
export type FullProof={engineRevision:string;engineHashes:Record<string,string>;groups:unknown[];trace:SourceCall[][];defaults:Record<string,number>};
export type SelectedIdentity={sourceRoot:'u8343-ue0102';sourceProofFile:'./engine-whole-u8343-ue0102.json';sourceProofFileSha256:string;sourceArchiveSHA256:string};
export type Mask={outline:string;bounds:number[];direction:string;weight:number;revealPath?:string;revealWidth?:number};
export const sourceRoot:'u8343-ue0102';export const sourceProofFile:string;export const sourceProofFileSha256:string;export const selectedProofIdentity:Readonly<SelectedIdentity>;export const sourceGroups:readonly number[][];export const nativeApproved:false,nativeApproval:false,runtimeApplied:false,appUI:false;
export function assertPinnedInputs():true;export function validateCachedFixture(value:unknown):Mask[][];export function compileProgressive(trace:SourceCall[][],proof:FullProof,identity:SelectedIdentity):Mask[][];
export function compileSourceWhole(root:'u8343-ue0102',trace:SourceCall[][],proof:FullProof,identity:SelectedIdentity):Mask[][];
export function cachedPositiveCallCount():number;export function sourceCompileCallCount():0;export function geometryDerivationCallCount():0;
export function renderProgressive(strokes:Mask[][],stroke:number,progress:number,prefix?:string):string;
