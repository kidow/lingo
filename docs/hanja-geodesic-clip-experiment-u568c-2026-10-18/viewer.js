import {buildGeodesicField,rasterMask,maskCoverage} from './geodesic-field.mjs'
import {renderProgressive} from './legacy.mjs'
const $=id=>document.getElementById(id),input=await fetch('./input.json').then(r=>{if(!r.ok)throw Error('Input guard failed');return r.json()})
let field=null,local=0,frame=0
const canvas=document.createElement('canvas')
$('identity').textContent=JSON.stringify(input.identity,null,2)
function show(p){
 local=p;$('progress').value=Math.max(0,p)*100;$('percent').textContent=(p*100).toFixed(8)+'% of rise mask'
 const begin=input.Vmask.weight/(input.Vmask.weight+input.Qmask.weight),whole=begin+(1-begin)*p
 $('legacy').innerHTML=renderProgressive([[input.Vmask,input.Qmask]],1,Math.max(0,whole),'legacy')
 if(!field)return
 const start=performance.now(),alpha=rasterMask(field,p),context=canvas.getContext('2d'),pixels=context.createImageData(field.size,field.size)
 for(let i=0;i<alpha.length;i++){pixels.data[i*4]=pixels.data[i*4+1]=pixels.data[i*4+2]=255;pixels.data[i*4+3]=alpha[i]}
 context.putImageData(pixels,0,0)
 const href=canvas.toDataURL('image/png') // Public derived mask only; RAM data URL, never persisted.
 const v=renderProgressive([[input.Vmask]],1,Math.max(0,whole)*(input.Vmask.weight+input.Qmask.weight)/input.Vmask.weight,'previous-v')
 $('experiment').innerHTML='<div class="layer">'+v+'</div><svg class="layer" viewBox="0 0 100 100"><defs><mask id="distance-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><image href="'+href+'" x="0" y="0" width="100" height="100" style="image-rendering:pixelated"/></mask></defs><path fill="#222" d="'+input.Qmask.outline+'" mask="url(#distance-mask)"/></svg>'
 $('coverage').textContent=JSON.stringify({...maskCoverage(field,p),maskPaintMillis:performance.now()-start,fullOutlineUnmaskFallback:false,vectorCoverageProven:false},null,2)
}
function rebuild(){
 cancelAnimationFrame(frame);field=null;$('experiment').textContent='Computing raster field…'
 const start=performance.now()
 try{field=buildGeodesicField({domain:input.domain,seed:input.seed,size:Number($('resolution').value)});canvas.width=canvas.height=field.size;$('diagnostics').textContent=JSON.stringify({...field.diagnostics,totalBuildMillis:performance.now()-start,nativeApproval:false,productionApplied:false},null,2);show(local)}
 catch(error){$('experiment').textContent='REJECTED — '+error.message;$('diagnostics').textContent=JSON.stringify(error.diagnostics??{error:error.message},null,2);$('coverage').textContent='No field is rendered. No fallback fill or100% unmask.';show(local)}
}
$('resolution').onchange=rebuild;$('progress').oninput=()=>{cancelAnimationFrame(frame);show(Number($('progress').value)/100)}
for(const button of document.querySelectorAll('[data-p]'))button.onclick=()=>{cancelAnimationFrame(frame);show(Number(button.dataset.p))}
for(const button of document.querySelectorAll('[data-boundary]'))button.onclick=()=>{cancelAnimationFrame(frame);const b=input.Vmask.weight/(input.Vmask.weight+input.Qmask.weight);show(Number(button.dataset.boundary)*1e-10/(1-b))}
$('play').onclick=()=>{cancelAnimationFrame(frame);const start=performance.now();const tick=t=>{show(Math.min(1,(t-start)/8000));if(t-start<8000)frame=requestAnimationFrame(tick)};frame=requestAnimationFrame(tick)}
rebuild()
