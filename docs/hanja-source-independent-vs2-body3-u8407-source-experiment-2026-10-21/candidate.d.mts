export type Mask={outline:string;bounds:readonly number[];direction:'right'|'left'|'down'|'up'|'curve';weight:number;revealPath?:string;revealWidth?:number}
export type Body3={groups:unknown[];trace:unknown[];defaults:Record<string,number>}
export type Identity3={sourceRoot:string;sourceProofFile:string;sourceProofFileSha256:string}
export const sourceRoot:'u8407-ue0102';export const proofKind:'selected-body3-only';export const selectedProofIdentity:Readonly<Identity3>;export const sourceGroups:readonly(readonly number[])[];export const nativeApproval:false;export const runtimeApplied:false;export const preparationRawProjectionCount:1;export const preparationInternalRawMaskCalls:13;
export function compileProgressive(trace:unknown[],body:Body3,identity:Identity3):readonly(readonly Mask[])[];
export function compileSourceWhole(root:string,trace:unknown[],body:Body3,identity:Identity3):readonly(readonly Mask[])[];
export function validateCachedFixture(fixture:unknown):unknown;export function cachedPositiveCallCount():number;export function sourceCompileCallCount():0;export function geometryDerivationCallCount():0;export function renderProgressive(strokes:readonly(readonly Mask[])[],stroke:number,progress:number,prefix?:string):string;
