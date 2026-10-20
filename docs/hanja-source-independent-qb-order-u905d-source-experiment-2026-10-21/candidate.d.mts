export type SelectedProofIdentity=Readonly<{sourceRoot:'u905d';sourceProofFile:'./engine-whole-u905d.json';sourceProofFileSha256:'7362e9e76893c652a5916e830e27254414ddd6568fa7583af5e27e1a1fdd5d51';sourceHeaderFile:'./engine-proof.json';sourceHeaderFileSha256:'747a19309cdf2b7188af2372a3f036be63ae6227dcdfea28788d81c06e9008ff'}>
export declare const sourceRoot:'u905d',selectedProofIdentity:SelectedProofIdentity,nativeApproval:false,runtimeApplied:false,actualAppUI:false;
export declare const sourceGroups:readonly(readonly number[])[];
export declare function captureProjection(trace:unknown,proof:unknown,identity:SelectedProofIdentity):unknown;
export declare function compileProgressive(trace:unknown,proof:unknown,identity:SelectedProofIdentity):unknown[][];
export declare function compileSourceWhole(root:'u905d',trace:unknown,proof:unknown,identity:SelectedProofIdentity):unknown[][];
export declare function traceProjectionCallCount():number;
export declare function newInternalRawProjectorCallCount():number;
export declare function cachedPositiveCallCount():number;
export declare function originalSourceCompilerCallCount():0;
export declare function existingFactoryCallCount():0;
export declare function renderProgressive(strokes:unknown[][],stroke:number,progress:number,prefix?:string):string;
