import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { readHistoricalAppSnapshot as readOwn, historicalAppSnapshotBindings as ownBindings } from '../../docs/hanja-component-evidence-growing-caps-u9081-vs3-2026-10-21/resolver.mjs';
const ROOT = new URL('../../', import.meta.url), DIR = 'docs/hanja-goal-glyphwiki-batch1332-2026-10-21/', EXP = 'docs/hanja-source-independent-vs3-body3-u9081-source-experiment-2026-10-21/';
const sha = (x) => createHash('sha256').update(x).digest('hex'), digest = (x) => sha(JSON.stringify(x)), raw = (p) => readFileSync(new URL(p, ROOT)), json = (p) => JSON.parse(raw(p).toString()), clone = (x) => JSON.parse(JSON.stringify(x));
const historicalFiles = { "lib/hanja-stroke-start-gate-u905d.ts": "docs/hanja-component-evidence-growing-caps-u905d-2026-10-21/lib__hanja-stroke-start-gate-u905d.ts.source.txt", "lib/hanja-stroke-start-gate-u905d.test.ts": "docs/hanja-component-evidence-growing-caps-u905d-2026-10-21/lib__hanja-stroke-start-gate-u905d.test.ts.source.txt", "components/hanja/stroke-outlines.tsx": "docs/hanja-component-evidence-growing-caps-u9081-vs3-2026-10-21/components__hanja__stroke-outlines.tsx.source.txt", "lib/hanja-stroke-start-gate-si.ts": "docs/hanja-component-evidence-growing-caps-u7de6-2026-10-20/lib__hanja-stroke-start-gate-si.ts.source.txt", "lib/hanja-stroke-start-gate-si.test.ts": "docs/hanja-component-evidence-growing-caps-u7de6-2026-10-20/lib__hanja-stroke-start-gate-si.test.ts.source.txt", "lib/hanja-stroke-start-gate-di.ts": "docs/hanja-component-evidence-growing-caps-u75b7-2026-10-20/lib__hanja-stroke-start-gate-di.ts.source.txt", "lib/hanja-stroke-start-gate-di.test.ts": "docs/hanja-component-evidence-growing-caps-u75b7-2026-10-20/lib__hanja-stroke-start-gate-di.test.ts.source.txt", "lib/hanja-stroke-start-gate.ts": "docs/hanja-component-evidence-growing-caps-u6faf-2026-10-20/lib__hanja-stroke-start-gate.ts.source.txt", "lib/hanja-stroke-start-gate.test.ts": "docs/hanja-component-evidence-growing-caps-u6faf-2026-10-20/lib__hanja-stroke-start-gate.test.ts.source.txt", "lib/hanja-stroke-start-gate-can.ts": "docs/hanja-component-evidence-growing-caps-u6faf-distance-2026-10-20/lib__hanja-stroke-start-gate-can.ts.source.txt", "lib/hanja-stroke-start-gate-can.test.ts": "docs/hanja-component-evidence-growing-caps-u6faf-distance-2026-10-20/lib__hanja-stroke-start-gate-can.test.ts.source.txt", "lib/hanja-stroke-start-gate-u7277.ts": "docs/hanja-component-evidence-growing-caps-u7277-2026-10-20/lib__hanja-stroke-start-gate-u7277.ts.source.txt", "lib/hanja-stroke-start-gate-u7277.test.ts": "docs/hanja-component-evidence-growing-caps-u7277-2026-10-20/lib__hanja-stroke-start-gate-u7277.test.ts.source.txt", "lib/hanja-stroke-start-gate-u6303.ts": "docs/hanja-component-evidence-growing-caps-u6303-2026-10-21/lib__hanja-stroke-start-gate-u6303.ts.source.txt", "lib/hanja-stroke-start-gate-u6303.test.ts": "docs/hanja-component-evidence-growing-caps-u6303-2026-10-21/lib__hanja-stroke-start-gate-u6303.test.ts.source.txt", "lib/hanja-stroke-start-gate-u7037.ts": "docs/hanja-component-evidence-growing-caps-u7037-k-2026-10-21/lib__hanja-stroke-start-gate-u7037.ts.source.txt", "lib/hanja-stroke-start-gate-u7037.test.ts": "docs/hanja-component-evidence-growing-caps-u7037-k-2026-10-21/lib__hanja-stroke-start-gate-u7037.test.ts.source.txt", "lib/hanja-stroke-start-gate-u8cb6.ts": "docs/hanja-component-evidence-growing-caps-u8cb6-2026-10-21/lib__hanja-stroke-start-gate-u8cb6.ts.source.txt", "lib/hanja-stroke-start-gate-u8cb6.test.ts": "docs/hanja-component-evidence-growing-caps-u8cb6-2026-10-21/lib__hanja-stroke-start-gate-u8cb6.test.ts.source.txt", "lib/hanja-stroke-start-gate-u9148.ts": "docs/hanja-component-evidence-growing-caps-u9148-2026-10-21/lib__hanja-stroke-start-gate-u9148.ts.source.txt", "lib/hanja-stroke-start-gate-u9148.test.ts": "docs/hanja-component-evidence-growing-caps-u9148-2026-10-21/lib__hanja-stroke-start-gate-u9148.test.ts.source.txt", "lib/hanja-stroke-start-gate-u7d3d.ts": "docs/hanja-component-evidence-growing-caps-u7d3d-2026-10-21/lib__hanja-stroke-start-gate-u7d3d.ts.source.txt", "lib/hanja-stroke-start-gate-u7d3d.test.ts": "docs/hanja-component-evidence-growing-caps-u7d3d-2026-10-21/lib__hanja-stroke-start-gate-u7d3d.test.ts.source.txt", "lib/hanja-stroke-start-gate-u6f57.ts": "docs/hanja-component-evidence-growing-caps-u6f57-k-2026-10-21/lib__hanja-stroke-start-gate-u6f57.ts.source.txt", "lib/hanja-stroke-start-gate-u6f57.test.ts": "docs/hanja-component-evidence-growing-caps-u6f57-k-2026-10-21/lib__hanja-stroke-start-gate-u6f57.test.ts.source.txt", "lib/hanja-stroke-start-gate-u9081.ts": "docs/hanja-component-evidence-growing-caps-u9081-vs3-2026-10-21/lib__hanja-stroke-start-gate-u9081.ts.source.txt", "lib/hanja-stroke-start-gate-u9081.test.ts": "docs/hanja-component-evidence-growing-caps-u9081-vs3-2026-10-21/lib__hanja-stroke-start-gate-u9081.test.ts.source.txt" };
const read = (p) => { const b = ownBindings().find(b => b.originalPath === p); return b ? readOwn(p, b.expectedSHA256) : raw(historicalFiles[p] ?? p); };
import assert from 'node:assert/strict';
import { HANJA_DICTIONARY_GLYPHWIKI_BATCH1332_STROKES as ENTRY, loadGlyphWikiBatch1332Strokes as loadReviewed } from '../../lib/hanja-stroke-dictionary-glyphwiki-batch1332.ts';
const authorization=json(DIR+'review.json');assert.equal(process.argv.length,2);assert.equal(authorization.runtimeAuthorization.rootApproved,true,'ROOT approval required before runtime verification');assert.equal(authorization.nativeApproval,true,'source native final approval pending');assert.equal(authorization.isolatedActualComponentBrowserVerified,true,'actual component native approval pending');

{
    const b = json('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch1332.json');
    assert.deepEqual(loadReviewed(b), ENTRY);
    const reorder = (x) => Array.isArray(x) ? x.map(reorder) : x && typeof x === 'object' ? Object.fromEntries(Object.entries(x).reverse().map(([k, v]) => [k, reorder(v)])) : x;
    assert.deepEqual(loadReviewed(reorder(b)), ENTRY);
    for (const args of [[], [b, {}]])
        assert.throws(() => Reflect.apply(loadReviewed, null, args));
    for (const mutate of [(x) => x[0].paths[0] += ' ', (x) => x[0].outlines[16][1].weight++, (x) => x[0].outlines[16].reverse(), (x) => x[0].outlines[0][0].bounds[0]++, (x) => x[0].outlines.reverse(), (x) => x[0].sourceStrokeIndices.reverse()]) {
        const bad = clone(b);
        mutate(bad);
        assert.notDeepEqual(bad, b);
        assert.throws(() => loadReviewed(bad));
    }
    const sparse = clone(b);
    delete sparse[0].outlines[0];
    assert.throws(() => loadReviewed(sparse));
    const inherited = clone(b), s = inherited[0].outlines[0][0], w = s.weight;
    delete s.weight;
    Object.setPrototypeOf(s, { weight: w });
    assert.throws(() => loadReviewed(inherited));
    const symbol = clone(b);
    symbol[0][Symbol('extra')] = 1;
    assert.throws(() => loadReviewed(symbol));
    assert(Object.isFrozen(ENTRY));
    assert(Object.isFrozen(ENTRY[0].outlines[16][1].bounds));
}
{
    const r = json(DIR + 'review.json'), F = json(EXP + 'fixtures.json'), T = json(EXP + 'config.json').targets['u9081-ue0103'];
    for (const [p, h] of Object.entries(r.immutableFilesSHA256))
        assert.equal(sha(read(p)), h, p);
    assert.deepEqual(ENTRY[0].outlines, F.strokes);
    assert.equal(digest(F.strokes), '93d845a1aa5ed80c05c39f5a9f52c105aabf98b67dd371dc8923de96c169e081');
    assert.equal(F.strokes.length, 17);
    assert.equal(F.strokes.flat().length, 22);
    assert.equal(F.strokes.flat().reduce((n, s) => n + (s.outline.match(/M/g) || []).length, 0), 40);
    assert.equal(F.rawMasks.length, 21);
    assert.deepEqual(F.sourceGroups, T.sourceGroups);
    for (let p = 0; p < 17; p++)
        assert.deepEqual(F.strokes[p], F.sourceGroups[p].flatMap((i) => F.rawMasks[i]));
    const proof = json('docs/hanja-goal-glyphwiki-batch1079-2026-10-13/engine-whole-u9081-ue0103.json');
    assert.deepEqual(proof, F.selectedBody);
    assert.deepEqual(Object.keys(proof).sort(), ['defaults', 'groups', 'trace']);
    assert.equal(digest(proof), '7dd741f809a5241239a4850b6548d2f2221c38b963d6a769166f49561aa45197');
    assert.deepEqual(T.identity, r.sourceContract.identity);
    assert.equal(r.sourceContract.actualSelectedFull5Available, false);
    assert.equal(r.sourceContract.headerSynthesized, false);
    const asset = json('public/hanja-strokes/glyphwiki/u9081-ue0103.json'), src = json('docs/hanja-goal-glyphwiki-batch1079-2026-10-13/sources.json');
    for (const k of Object.keys(src))
        assert.deepEqual(asset[k], src[k], k);
    assert.deepEqual(asset.selectedBody3, proof);
    assert.deepEqual(asset.drawTrace, proof.trace);
    assert.deepEqual(asset.sourceGroups, F.sourceGroups);
    assert.equal(Object.keys(src.records).length, 23);
    assert.equal(src.wholeNames.length, 9);
    assert.equal(src.providerVersions.length, 5);
    assert.equal(asset.sourceProofShape.existingActualFull5, false);
    assert.equal(asset.sourceProofShape.identityKeys, 3);
    assert.equal(ENTRY[0].geometrySource, sha(raw('public/hanja-strokes/glyphwiki/u9081-ue0103.json')));
    assert.deepEqual(ENTRY[0].paths, F.strokes.map((ms) => ms.map(s => s.outline).join(' ')));
    assert.equal(ENTRY[0].pathsSha256, digest(ENTRY[0].paths));
    assert(raw('public/hanja-strokes/glyphwiki/u9081-ue0103.NOTICE.md').toString().startsWith(raw('docs/hanja-goal-glyphwiki-batch1079-2026-10-13/NOTICE.md').toString()));
}
{
    const r = json(DIR + 'review.json'), s = json(DIR + 'resume.json'), parent = json('docs/hanja-goal-glyphwiki-batch1331-2026-10-21/resume.json'), old = json('docs/hanja-goal-glyphwiki-batch1079-2026-10-13/resume.json');
    assert.equal(sha(raw('docs/hanja-goal-glyphwiki-batch1331-2026-10-21/resume.json')), s.previousResumeSHA256);
    assert.equal(parent.completedRuntime, 5747);
    assert.equal(parent.remainingCommittedRuntime, 231);
    assert.equal(old.newHoldsThisBatch.filter((h) => h.glyph === '邁').length, 1);
    assert.deepEqual(r.canonical.originalHoldRecordExact, old.newHoldsThisBatch[0]);
    assert.equal(digest(old.newHoldsThisBatch[0]), r.canonical.originalHoldRecordSHA256);
    assert.equal(ENTRY[0].sourceReference.orderReviewSha256, sha(raw(DIR + 'review.json')));
    const e = json('docs/hanja-source-native-pass-u9081-vs3-component-2026-10-21/review.json');
    assert.equal(sha(raw('docs/hanja-source-native-pass-u9081-vs3-component-2026-10-21/review.json')), r.actualComponentReview.sha256);
    assert.equal(e.actualAppUI, false);
    assert.equal(r.wholeReplay, false);
    assert.equal(r.actualAppUI, false);
    if (!r.runtimeAuthorization.rootApproved) {
        assert.equal(r.nativeApproval, false);
        assert.equal(r.isolatedActualComponentBrowserVerified, false);
        assert.equal(s.runtimeRegistered, false);
        assert.deepEqual(s.resolvedHoldsThisBatch, []);
    }
    else {
        assert.equal(r.nativeApproval, true);
        assert.equal(r.isolatedActualComponentBrowserVerified, true);
        assert.equal(e.isolatedActualComponentBrowserVerified, true);
    }
}
const component=read('components/hanja/stroke-outlines.tsx').toString(),begin=component.indexOf('function U9081CapsOutline'),end=component.indexOf('function U6f57CapsOutline',begin);assert(begin>=0&&end>begin);const child=component.slice(begin,end);for(const s of['progress===1','data-growing-full-round','strokeLinecap="round"','progress>0&&progress<1','-u9081-growing','data-u9081-measurement','visibility="hidden"'])assert(child.includes(s),s);assert(authorization.startGateIntegration.p0Empty);assert(authorization.startGateIntegration.p1AlwaysOriginalFullRound)
const {HANJA_STROKES,hanjaStrokeData}=await import('../../lib/hanja-strokes.ts')
const {resolve,dirname,basename}=await import('node:path'),{fileURLToPath}=await import('node:url'),rootPath=fileURLToPath(ROOT),resume=json(DIR+'resume.json'),parent=json('docs/hanja-goal-glyphwiki-batch1331-2026-10-21/resume.json')
let cursor=resolve(rootPath,resume.previousResume),refs=0;const seen=new Set(),records=[],resolved=new Set(),glyphOf=r=>typeof r==='object'&&r?r.glyph:typeof r==='string'?(r.match(/batch\d+\s*(\p{Script=Han})/u)||r.match(/^(\p{Script=Han})/u)||[])[1]:undefined
while(cursor){assert(!seen.has(cursor),'canonical cycle');seen.add(cursor);refs++;const j=JSON.parse(readFileSync(cursor));for(const k of['newHolds','newHoldsThisBatch'])for(const r of j[k]||[]){const glyph=glyphOf(r);assert(glyph);records.push({glyph,record:r})}for(const k of['resolvedHolds','resolvedHoldsThisBatch'])for(const r of j[k]||[])if(r?.runtimeApplied===true)resolved.add(r.glyph);if(basename(dirname(cursor))==='hanja-goal-glyphwiki-batch939-2026-10-13')break;assert(j.previousResume);const next=j.previousResume.startsWith('docs/')?resolve(rootPath,j.previousResume):resolve(dirname(cursor),j.previousResume);if(j.previousResumeSHA256)assert.equal(sha(readFileSync(next)),j.previousResumeSHA256);cursor=next}
const historical=new Set(records.map(x=>x.glyph));assert.equal(historical.size,349);assert.equal([...resolved].filter(g=>historical.has(g)).length,172);const target=records.filter(x=>x.glyph==='邁');assert.equal(target.length,1);assert.deepEqual(target[0].record,authorization.canonical.originalHoldRecordExact);assert.equal(refs,389);assert.equal(refs,parent.canonicalInspection.references+1)
for(const k of['resolvedHolds','resolvedHoldsThisBatch'])for(const r of resume[k]||[])if(r.runtimeApplied===true)resolved.add(r.glyph);assert.equal([...resolved].filter(g=>historical.has(g)).length,173);assert.deepEqual([...resolved].filter(g=>!historical.has(g)).sort(),['叟','廋','瞍','餲'].sort())
const unique=new Set(HANJA_STROKES.map(x=>x.glyph));assert.equal(unique.size,5748);assert.equal(HANJA_STROKES.filter(x=>x.glyph==='邁').length,1);assert.deepEqual(hanjaStrokeData({glyph:'邁',strokes:17}),ENTRY[0]);assert.equal(5978-unique.size,230)
console.log(JSON.stringify({batch:1332,glyph:'邁',passed:true,registryUnique:unique.size,remaining:5978-unique.size,historical:349,resolved:173,active:176,refs,targetMatches:target.length,targetRecordType:'object',sourcePins:Object.keys(authorization.immutableFilesSHA256).length,pinMismatches:0,pens:17,masks:22,polygons:40,records:23,whole:9,providers:5,closure:null,selectedBody3Only:true,selectedFull5Available:false,headerSynthesized:false,sourceCompilerCalls:0,factoryCalls:0,fixtureCompiles:0,projectionCalls:0,engineRuns:0,actualComponentBrowserVerified:true,actualAppUI:false,wholeReplay:false,build:false}))
