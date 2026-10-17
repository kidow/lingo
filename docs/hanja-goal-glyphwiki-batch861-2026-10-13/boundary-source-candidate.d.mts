export type OriginalVertex={readonly x:number;readonly y:number;readonly off:number}
export type OriginalCall={readonly kind:string;readonly args:readonly number[];readonly polygons:readonly (readonly OriginalVertex[])[]}
export type Full5Proof={readonly engineRevision:string;readonly engineHashes:Readonly<Record<string,string>>;readonly groups:readonly {readonly raw:readonly unknown[];readonly polygons:readonly (readonly OriginalVertex[])[]}[];readonly trace:readonly (readonly OriginalCall[])[];readonly defaults:Readonly<Record<string,number>>}
export type OriginalMask={readonly outline:string;readonly bounds:readonly number[];readonly direction:string;readonly weight:number;readonly revealPath?:string;readonly revealWidth?:number}
export type OriginalIdentity={readonly sourceRoot:'u568c';readonly sourceProofFile:'engine-whole-u568c.json';readonly sourceProofFileSHA256:'693a1dd8860f2b88625e6bc3c93c613a6f755da63bd8a3e329181dfd2721ed3d'}
export const sourceRoot:'u568c'
export const sourceProofFile:'engine-whole-u568c.json'
export const selectedProofIdentity:OriginalIdentity
export const originalSourceGroups:readonly (readonly number[])[]
export const sourceGroups:readonly (readonly number[])[]
export const originalBaselineSHA256:string
export const nativeApproval:false
export const runtimeApplied:false
export const approvalStatus:string
export function sourceCompileExecutions():number
export function compileProgressive(trace:Full5Proof['trace'],proof:Full5Proof,identity:OriginalIdentity):readonly (readonly OriginalMask[])[]
export function compileSourceWhole(root:typeof sourceRoot,trace:Full5Proof['trace'],proof:Full5Proof,identity:OriginalIdentity):readonly (readonly OriginalMask[])[]
export function renderProgressive(strokes:readonly (readonly OriginalMask[])[],stroke:number,progress:number,key?:string):string
