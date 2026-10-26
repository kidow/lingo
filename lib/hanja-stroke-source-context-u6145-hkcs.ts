/** Exact public source inputs; tokens are created only by the original three-argument factories. */
import type {HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import fixture from '../docs/hanja-source-original-u6145-hkcs-2026-10-26/fixtures.json' with {type:'json'}
import {makeReviewedU6145HkcsSourceContext,type ReviewedU6145HkcsContext} from './hanja-stroke-start-caps-u6145-hkcs.ts'
import {makeReviewedU6145HkcsUnion12SourceContext} from './hanja-stroke-union-point-window12-u6145-hkcs.ts'
import {makeReviewedU6145HkcsPointRect4SourceContext,type ReviewedU6145HkcsPointRect4Context} from './hanja-stroke-point-rect4-u6145-hkcs.ts'
import {makeReviewedU6145HkcsCardinalPoint9SourceContext} from './hanja-stroke-cardinal-point-window9-u6145-hkcs.ts'
const ENTRY=fixture.hkcs_m6145
function freezeSource(value:unknown):void{if(value&&typeof value==='object'){for(const child of Object.values(value))freezeSource(child);Object.freeze(value)}}
freezeSource(ENTRY)
export const REVIEWED_U6145_HKCS_SOURCE_INPUT=Object.freeze({fullProof:ENTRY.fullProof,identity:ENTRY.identity})
export type ReviewedU6145HkcsSourceContexts=Readonly<{caps:ReviewedU6145HkcsContext;union12:ReviewedU6145HkcsContext;pointRect4:ReviewedU6145HkcsPointRect4Context;point9:ReviewedU6145HkcsContext}>
export function makeReviewedU6145HkcsSourceContexts(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU6145HkcsSourceContexts|null{
 if(arguments.length!==3)return null
 try{const caps=makeReviewedU6145HkcsSourceContext(proof,identity,strokes),union12=makeReviewedU6145HkcsUnion12SourceContext(proof,identity,strokes),pointRect4=makeReviewedU6145HkcsPointRect4SourceContext(proof,identity,strokes),point9=makeReviewedU6145HkcsCardinalPoint9SourceContext(proof,identity,strokes);return caps&&union12===caps&&pointRect4&&point9===caps?Object.freeze({caps,union12,pointRect4,point9}):null}catch{return null}
}
export const REVIEWED_U6145_HKCS_SOURCE_CONTEXT_INPUT_SHA256=Object.freeze({"docs/hanja-source-original-u6145-hkcs-2026-10-26/fixtures.json":"1e1fd8df28591095a09018740222d9a9e2ccd0b6255a6fe545d87967116b1546","lib/hanja-stroke-start-caps-u6145-hkcs.ts":"43d5d1e904c02a7804da17476373789ef89a3f51c17a5697fae31f4f86e803a7","lib/hanja-stroke-union-point-window12-u6145-hkcs.ts":"a59590e9069c73e7e7dad36eb905501e6c87378f6e191e483d99a4d22e56d514","lib/hanja-stroke-point-rect4-u6145-hkcs.ts":"f872cc7ed0fc8d8d94af7a24baa75231ff673b173ca5584f18af126a0dc88547","lib/hanja-stroke-cardinal-point-window9-u6145-hkcs.ts":"515a755a028042b408a04c06bdd9464fe6c8888781573e568614d751a7c6fcd8"})
