import { renderString } from './svg-string-adapter.mjs'
import { renderDOM } from './svg-dom-adapter.mjs'
import { revealDescriptor, EXPERIMENT } from './reveal-descriptor.mjs'
const fixture=await fetch('/fixture').then(r=>{if(!r.ok)throw Error('Fixture pin failure');return r.json()})
const strokes=fixture.strokes,boundary=fixture.contract.fixture.boundary
const original=document.getElementById('original'),gated=document.getElementById('gated'),status=document.getElementById('status')
const slider=document.getElementById('progress'),penInput=document.getElementById('pen'),adapter=document.getElementById('adapter'),timing=document.getElementById('timing')
let pen=12,progress=0,frame=null,runId=0
function insert(target,p,mode,prefix){if(adapter.value==='dom')target.replaceChildren(renderDOM(document,strokes,pen,p,mode,prefix));else target.innerHTML=renderString(strokes,pen,p,mode,prefix)}
function show(p){progress=Math.max(0,Math.min(1,p));insert(original,progress,'original','original');insert(gated,progress,'gated','gated');slider.value=progress*100;penInput.value=pen;const d=revealDescriptor(strokes,pen,progress,'gated').find(d=>d.pen===12&&d.mask===2);status.textContent=pen+'/17 · '+(progress*100).toFixed(10)+'% · mask2 opacity '+(d?.opacity??0).toFixed(10);window.experimentState={pen,progress,alpha:d?.opacity??0,adapter:adapter.value,mode:timing.value,nativeApproval:false}}
function stop(){runId++;if(frame!==null)cancelAnimationFrame(frame);frame=null}
function replay(){stop();const id=runId,start=performance.now(),whole=timing.value==='whole',duration=timing.value==='slow'?8000:whole?17*fixture.contract.timing.strokeDurationMilliseconds+16*fixture.contract.timing.gapMilliseconds:fixture.contract.timing.strokeDurationMilliseconds;const selected=pen;function tick(now){if(id!==runId)return;const t=Math.min(duration,now-start);if(whole){const interval=fixture.contract.timing.strokeDurationMilliseconds+fixture.contract.timing.gapMilliseconds;pen=Math.min(17,Math.floor(t/interval)+1);show((t-(pen-1)*interval)/fixture.contract.timing.strokeDurationMilliseconds)}else{pen=selected;show(t/duration)}if(t<duration)frame=requestAnimationFrame(tick);else{frame=null;show(1)}}frame=requestAnimationFrame(tick)}
function sampleGrid(){const target=document.getElementById('samples');target.replaceChildren();[0,.125,.25,.375,.5,.625,.75,.875,1].forEach((p,i)=>{const section=document.createElement('section'),label=document.createElement('b');label.textContent=p*100+'%';section.appendChild(label);const pair=document.createElement('div');pair.className='sample-pair';for(const mode of ['original','gated']){const node=document.createElement('div');node.appendChild(renderDOM(document,strokes,pen,p,mode,'sample-'+i+'-'+mode));pair.appendChild(node)}section.appendChild(pair);target.appendChild(section)})}
document.getElementById('before').onclick=()=>{stop();pen=12;show(boundary-1e-10)}
document.getElementById('at').onclick=()=>{stop();pen=12;show(boundary)}
document.getElementById('after').onclick=()=>{stop();pen=12;show(boundary+1e-10)}
for(const p of [.01,.04,.1,.25,.5,.75,.9999,1]){const button=document.createElement('button');button.textContent=p*100+'%';button.onclick=()=>{stop();show(p)};document.getElementById('percent-controls').appendChild(button)}
document.getElementById('play').onclick=replay
document.getElementById('stop').onclick=stop
slider.oninput=()=>{stop();show(+slider.value/100)}
penInput.onchange=()=>{stop();pen=+penInput.value;show(0);sampleGrid()}
adapter.onchange=()=>show(progress)
document.getElementById('large').onchange=e=>document.body.classList.toggle('enlarged',e.target.checked)
const query=new URLSearchParams(location.search);pen=Math.max(1,Math.min(17,+(query.get('stroke')??12)));document.getElementById('large').checked=query.get('enlarged')==='1';document.body.classList.toggle('enlarged',document.getElementById('large').checked)
show(0);sampleGrid()
