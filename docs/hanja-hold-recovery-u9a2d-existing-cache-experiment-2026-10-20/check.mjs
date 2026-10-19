import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
const here=dirname(fileURLToPath(import.meta.url)),repo=resolve(here,'../..');
const read=name=>readFileSync(resolve(repo,name));
const hash=value=>createHash('sha256').update(value).digest('hex');
const digest=value=>hash(JSON.stringify(value));
const bytes=readFileSync(resolve(here,'config.json')),c=JSON.parse(bytes);
const server=readFileSync(resolve(here,'server.py'),'utf8'),browser=readFileSync(resolve(here,'browser.mjs'),'utf8');
assert.equal(c.glyph,'騭');assert.equal(c.glyph.codePointAt(0),0x9a2d);assert.equal(c.codepoint,'U+9A2D');
assert.ok(server.includes("CONFIG_SHA='"+hash(bytes)+"'"));assert.equal(hash(browser),c.browserSHA256);
for(const[file,expected]of Object.entries(c.inputSHA256))assert.equal(hash(read(file)),expected,file);
assert.deepEqual(Object.keys(c.roots),['u9a2d','u9a2d-ue0102']);
assert.deepEqual(c.roots.u9a2d.rawSelectors,[7,8,11,12,13,14,15,16,17]);
assert.deepEqual(c.roots['u9a2d-ue0102'].rawSelectors,[8,11,12,13,14,15,16,17,18]);
assert.deepEqual(c.domesticPens,[8,11,12,13,14,15,16,17]);
assert.equal(c.foreignHeaderCombination,false);assert.equal(c.newGrouping,false);assert.equal(c.nativeApproval,false);
function validate(proof,spec){
 assert.deepEqual(Object.keys(proof).sort(),spec.keys);assert.equal(digest(proof),spec.objectSHA256);
 assert.equal(proof.groups.length,spec.raw);assert.equal(proof.trace.length,spec.raw);
 assert.equal(proof.groups.reduce((n,g)=>n+g.polygons.length,0),spec.polygons);
 for(let i=0;i<proof.groups.length;i++){assert.deepEqual(proof.trace[i].flatMap(call=>call.polygons),proof.groups[i].polygons);assert.ok(proof.groups[i].polygons.every(p=>p.every(v=>v.off===0)));}
}
const full=JSON.parse(read(c.sourceFolder+c.full5.file));validate(full,c.full5);
const originals={};for(const[root,spec]of Object.entries(c.roots)){const raw=read(c.sourceFolder+spec.file);assert.equal(hash(raw),spec.SHA256);const proof=JSON.parse(raw);validate(proof,spec);originals[root]=proof;}
for(const key of ['groups','trace','defaults'])assert.deepEqual(full[key],originals.u9a2d[key]);
assert.deepEqual(Object.keys(originals['u9a2d-ue0102']).sort(),['defaults','groups','trace']);
const sources=JSON.parse(read(c.sourceFolder+'sources.json'));
assert.deepEqual(Object.keys(sources.records).sort(),c.sourceClosure.map(x=>x.name).sort());
for(const record of c.sourceClosure){const actual=sources.records[record.name];assert.equal(actual.name,record.name);assert.equal(actual.related,record.related);assert.equal(hash(actual.data),record.sourceSha256);}
const reference=read('docs/hanja-g2-batch10-2026-09-16/serve.py').toString();
function functionText(text,name){const start=text.indexOf('def '+name+'(');assert.ok(start>=0);const end=text.indexOf('\ndef ',start+2);return text.slice(start,end<0?undefined:end).trimEnd()+'\n';}
for(const name of ['source','dictionary_svg']){assert.equal(functionText(server,name),functionText(reference,name));assert.equal(hash(functionText(server,name)),c.originalRendererFunctions[name]);}
assert.ok(!/importlib|subprocess|compileProgressive|compileSourceWhole|C=compiled/.test(server));
assert.ok(server.includes("ThreadingHTTPServer(('127.0.0.1',args.port),Handler)"));
assert.ok(server.includes('width:520px;height:520px'));
assert.ok(server.includes("ENTRIES={'騭':{'strokes':20,'dictionary':CONFIG['dictionary']}}"));
assert.ok(server.includes("dictionary_svg('騭',route[1]"));
assert.ok(!server.includes('ENTRIES[root]'));assert.ok(!/localStorage|sessionStorage|POST|PUT|DELETE|sendBeacon/.test(browser));
for(const pen of c.domesticPens)assert.ok(server.includes('id="domestic-'+pen+'"'));
let negatives=0;const rejects=fn=>{assert.throws(fn);negatives++;};
for(const[root,proof]of Object.entries(originals))for(const mutate of [p=>p.engineHashes=full.engineHashes,p=>p.trace[0][0].args[0]+=.1,p=>p.groups[0].polygons[0][0].x+=.1,p=>p.defaults.kWidth+=.1,p=>delete p.defaults]){const p=structuredClone(proof);mutate(p);rejects(()=>validate(p,c.roots[root]));}
const badFull=structuredClone(full);delete badFull.engineRevision;rejects(()=>validate(badFull,c.full5));
rejects(()=>assert.equal(hash(Buffer.concat([read(c.sourceFolder+'sources.json'),Buffer.from(' ')])),c.inputSHA256[c.sourceFolder+'sources.json']));
rejects(()=>assert.equal(c.dictionary.url+'?root=u9a2d',c.dictionary.url));
const pythonCode="import ast,json\nfrom pathlib import Path\nfrom urllib.parse import parse_qs,urlparse\nfolder=Path('docs/hanja-hold-recovery-u9a2d-existing-cache-experiment-2026-10-20')\ntree=ast.parse((folder/'server.py').read_text())\nfunction=next(n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name=='parse_route')\nnamespace={'parse_qs':parse_qs,'urlparse':urlparse,'CONFIG':json.loads((folder/'config.json').read_text())}\nexec(compile(ast.fix_missing_locations(ast.Module(body=[function],type_ignores=[])),'owned-route-only','exec'),namespace)\nparse=namespace['parse_route']\nvalid=[('/',('page',)),('/api/whole?root=u9a2d',('whole','u9a2d')),('/api/whole?root=u9a2d-ue0102',('whole','u9a2d-ue0102')),('/api/raw?root=u9a2d&raw=7',('raw','u9a2d',7)),('/api/raw?root=u9a2d&raw=17',('raw','u9a2d',17)),('/api/raw?root=u9a2d-ue0102&raw=8',('raw','u9a2d-ue0102',8)),('/api/raw?root=u9a2d-ue0102&raw=18',('raw','u9a2d-ue0102',18)),('/api/domestic?stroke=8',('domestic',8)),('/api/domestic?stroke=17',('domestic',17)),('/api/domestic-whole',('domestic-whole',))]\nfor path,expected in valid:assert parse(path)==expected,path\ninvalid=['/api/whole?root=u9a2d-ue0100','/api/whole?root=u9b37','/api/raw?root=u9a2d&raw=18','/api/raw?root=u9a2d-ue0102&raw=7','/api/raw?root=u9a2d&raw=7&raw=8','/api/whole?root=u9a2d&root=u9a2d','/api/domestic?stroke=8&root=u9a2d','/api/domestic-whole?root=u9a2d','/api/domestic?stroke=10','/?malformed','/api/whole?root=']\nfor path in invalid:\n    try:parse(path)\n    except (ValueError,KeyError):pass\n    else:raise AssertionError(path)\nprint(json.dumps({'validRoutes':len(valid),'rejectedRoutes':len(invalid),'PythonAST':'PASS','serverImported':False,'HTTPRequests':0,'serverStarted':False}))\n";
const result=spawnSync('rtk',['proxy','python3','-c',pythonCode],{cwd:repo,encoding:'utf8',timeout:30000});assert.equal(result.status,0,result.stderr||result.stdout);
const routes=JSON.parse(result.stdout);assert.equal(routes.validRoutes,10);assert.equal(routes.rejectedRoutes,11);assert.equal(routes.PythonAST,'PASS');
console.log(JSON.stringify({focused:'PASS',inputPins:Object.keys(c.inputSHA256).length,sourceRecords:c.sourceClosure.length,rootProofs:2,full5Proof:1,foreignHeaderCombinations:0,resourceNegatives:negatives,validRoutes:routes.validRoutes,rejectedRoutes:routes.rejectedRoutes,PythonAST:'PASS',compilerExecutions:0,engineExecutions:0,HTTPRequests:0,serverStarted:false,nativeApproval:false}));
