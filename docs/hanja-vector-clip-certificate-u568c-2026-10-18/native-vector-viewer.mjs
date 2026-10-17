// 격리 실험: 인증된 삼각 mesh의 affine sublevel. production에서 import하지 않습니다.
const sha=async text=>Array.from(new Uint8Array(await globalThis.crypto.subtle.digest('SHA-256',new TextEncoder().encode(text))),b=>b.toString(16).padStart(2,'0')).join('');
const gcd=(a,b)=>{a=a<0n?-a:a;while(b){[a,b]=[b,a%b]}return a};
const q=(n,d=1n)=>{if(d===0n)throw Error('zero denominator');if(d<0n){n=-n;d=-d}const g=gcd(n,d);return[n/g,d/g]};
const add=(a,b)=>q(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),sub=(a,b)=>q(a[0]*b[1]-b[0]*a[1],a[1]*b[1]),mul=(a,b)=>q(a[0]*b[0],a[1]*b[1]),div=(a,b)=>q(a[0]*b[1],a[1]*b[0]);
const cmp=(a,b)=>a[0]*b[1]<b[0]*a[1]?-1:a[0]*b[1]>b[0]*a[1]?1:0;
const num=a=>Number(a[0])/Number(a[1]);
export function rational(value){if(typeof value==='string'&&/^-?\d+\/[1-9]\d*$/.test(value)){const[n,d]=value.split('/');return q(BigInt(n),BigInt(d))}if(typeof value!=='number'||!Number.isFinite(value))throw Error('finite scalar required');let s=String(value),sign=1n;if(s[0]==='-'){sign=-1n;s=s.slice(1)}const[m,e='0']=s.toLowerCase().split('e'),[a,b='']=m.split('.'),power=Number(e)-b.length;return power>=0?q(sign*BigInt(a+b)*10n**BigInt(power)):q(sign*BigInt(a+b),10n**BigInt(-power))}
export async function verifyEnvelope(packet,certificateText,expected){
 if(packet.grid!==200||expected.grid!==200)throw Error('only grid200 is allowed');
 for(const key of ['certificateSHA256','moduleSHA256','sourceProofSHA256','meshSHA256','fieldSHA256'])if(!/^[a-f0-9]{64}$/.test(expected[key]??'' )||packet.binding[key]!==expected[key])throw Error('binding mismatch: '+key);
 if(await sha(certificateText)!==expected.certificateSHA256)throw Error('certificate digest mismatch');
 if(await sha(JSON.stringify(packet.mesh))!==expected.meshSHA256||await sha(JSON.stringify(packet.field))!==expected.fieldSHA256)throw Error('mesh/scalar digest mismatch');
 const cert=JSON.parse(certificateText),{vertices,triangles}=packet.mesh,{values,maximum}=packet.field;
 if(cert.grid!==200||vertices.length!==cert.geometryCertificate.vertices||triangles.length!==cert.geometryCertificate.triangles||maximum!==cert.scalarCertificate.maximum||values.length!==vertices.length)throw Error('certificate dimensions mismatch');
 if(values.some(x=>!Number.isFinite(x)||x<0)||Math.max(...values)!==maximum)throw Error('invalid stored scalar');
 vertices.forEach(v=>{if(!Array.isArray(v)||v.length!==2)throw Error('invalid vertex');v.forEach(rational)});
 triangles.forEach(t=>{if(!Array.isArray(t)||t.length!==3||new Set(t).size!==3||t.some(i=>!Number.isInteger(i)||i<0||i>=vertices.length))throw Error('invalid triangle')});
 return prepareField(packet);
}
export function prepareField(packet){
 const vertices=packet.mesh.vertices.map(v=>v.map(rational)),values=packet.field.values.map(rational),maximum=rational(packet.field.maximum);
 return {maximum,triangles:packet.mesh.triangles.map(t=>t.map(i=>({x:vertices[i][0],y:vertices[i][1],tau:values[i]})))};
}
export function clipTriangle(triangle,level){
 const out=[];for(let i=0;i<3;i++){const a=triangle[i],b=triangle[(i+1)%3],ia=cmp(a.tau,level)<=0,ib=cmp(b.tau,level)<=0;if(ia)out.push(a);if(ia!==ib){const t=div(sub(level,a.tau),sub(b.tau,a.tau));out.push({x:add(a.x,mul(sub(b.x,a.x),t)),y:add(a.y,mul(sub(b.y,a.y),t))})}}return out;
}
export function sublevelPaths(field,p){
 if(!Number.isFinite(p)||p>1)throw Error('progress outside experiment');
 if(p<=0)return []; // p0의 신규 mask는 비움; 완료 V는 별도 원형 레이어입니다.
 const level=mul(rational(p),field.maximum),paths=[];
 for(const triangle of field.triangles){const out=clipTriangle(triangle,level);if(out.length>=3)paths.push(out.map((v,i)=>(i?'L':'M')+num(v.x)+' '+num(v.y)).join(' ')+' Z')}
 return paths; // p1도 동일 threshold/clip 경로. unmask/fill fallback 없음.
}
export const digest=sha;
if(typeof window!=='undefined'&&typeof document!=='undefined'){
 const $=id=>document.getElementById(id);
 try{
  const expected=JSON.parse($('expected').textContent),responses=await Promise.all(['packet.json','certificate.json','input.json'].map(p=>fetch('./'+p).then(r=>{if(!r.ok)throw Error('guard failed '+p);return r.text()})));
  const packet=JSON.parse(responses[0]),input=JSON.parse(responses[2]),field=await verifyEnvelope(packet,responses[1],expected),{renderProgressive}=await import('./legacy.mjs');
  let frame=0,local=0;const begin=input.Vmask.weight/(input.Vmask.weight+input.Qmask.weight);
  $('identity').textContent=JSON.stringify({binding:expected,nativeApproval:false,runtimeApplied:false,sourceCompile:0,engine:0,meshBuildAtStartup:1,fieldBuildAtStartup:1,grid:200},null,2);
  function show(p){
   local=p;$('progress').value=Math.max(0,p)*100;$('percent').textContent=(p*100).toFixed(8)+'%';
   const started=performance.now(),whole=begin+(1-begin)*p;
   $('legacy').innerHTML=renderProgressive([[input.Vmask,input.Qmask]],1,Math.max(0,whole),'legacy');
   const previous=renderProgressive([[input.Vmask]],1,Math.max(0,whole)*(input.Vmask.weight+input.Qmask.weight)/input.Vmask.weight,'previous-v'),paths=sublevelPaths(field,p);
   $('experiment').innerHTML='<div class="layer">'+previous+'</div><svg class="layer" viewBox="0 0 100 100"><defs><clipPath id="derived-clip" clipPathUnits="userSpaceOnUse"><path d="'+paths.join(' ')+'"/></clipPath></defs><path fill="#222" d="'+input.Qmask.outline+'" clip-path="url(#derived-clip)"/></svg>';
   $('diagnostics').textContent=JSON.stringify({localProgress:p,oldWholeProgress:whole,derivedTriangleFragments:paths.length,paintMillis:performance.now()-started,p0Empty:true,p1SameThreshold:true,unmaskFallback:false,AAOrNativeApproval:false},null,2);
  }
  const stop=()=>cancelAnimationFrame(frame);
  $('progress').oninput=()=>{stop();show(Number($('progress').value)/100)};
  for(const b of document.querySelectorAll('[data-p]'))b.onclick=()=>{stop();show(Number(b.dataset.p))};
  for(const b of document.querySelectorAll('[data-boundary]'))b.onclick=()=>{stop();show(Number(b.dataset.boundary)*1e-10/(1-begin))};
  $('play').onclick=()=>{stop();const start=performance.now();const tick=t=>{show(Math.min(1,(t-start)/8000));if(t-start<8000)frame=requestAnimationFrame(tick)};frame=requestAnimationFrame(tick)};
  show(local);
 }catch(error){$('experiment').textContent='REJECTED: '+error.message;$('diagnostics').textContent='검증 실패. 대체 fill 또는 unmask 없음.'}
}
