const q=id=>document.getElementById(id);
const allowed={u9a2d:[7,8,11,12,13,14,15,16,17],'u9a2d-ue0102':[8,11,12,13,14,15,16,17,18]};
const domesticAllowed=[8,11,12,13,14,15,16,17];
async function getSVG(url,node){const response=await fetch(url,{cache:'no-store'});if(!response.ok)throw Error('고정 자료 또는 요청 계약 불일치: '+response.status);const text=await response.text();if(!text.startsWith('<svg '))throw Error('SVG 응답 계약 불일치');node.innerHTML=text;}
async function showRaw(){const root=q('root').value,raw=Number(q('raw').value);if(!Object.hasOwn(allowed,root)||!allowed[root].includes(raw))throw Error('미허용 원 raw');q('raw-label').textContent=root+' / 원 raw '+raw+' (0부터)';await getSVG('/api/raw?root='+root+'&raw='+raw,q('original-raw'));}
async function showDomestic(pen){if(!domesticAllowed.includes(pen))throw Error('미허용 국내 획');q('domestic-label').textContent='국내 '+pen+'획 · 원 방향';await getSVG('/api/domestic?stroke='+pen,q('domestic'));}
async function run(fn){q('status').textContent='고정 자료 읽는 중';try{await fn();q('status').textContent='읽기 전용 · 새 호환/필순 승인 없음';}catch(error){q('status').textContent=error.message;}}
function rootControls(){const root=q('root').value;if(!Object.hasOwn(allowed,root))throw Error('미허용 root');const prior=Number(q('raw').value);q('raw').replaceChildren();q('raw-buttons').replaceChildren();for(const raw of allowed[root]){const option=document.createElement('option');option.value=String(raw);option.textContent=String(raw);q('raw').append(option);const button=document.createElement('button');button.textContent='raw '+raw+'만';button.onclick=()=>{q('raw').value=String(raw);run(showRaw);};q('raw-buttons').append(button);}q('raw').value=String(allowed[root].includes(prior)?prior:allowed[root][0]);}
q('root').onchange=()=>run(async()=>{rootControls();await showRaw();});q('raw').onchange=()=>run(showRaw);
for(const pen of domesticAllowed)q('domestic-'+pen).onclick=()=>run(()=>showDomestic(pen));
q('domestic-whole').onclick=()=>run(()=>getSVG('/api/domestic-whole',q('whole-domestic')));
rootControls();run(async()=>{await Promise.all([getSVG('/api/whole?root=u9a2d',q('whole-base')),getSVG('/api/whole?root=u9a2d-ue0102',q('whole-vs2')),getSVG('/api/domestic-whole',q('whole-domestic')),showDomestic(8),showRaw()]);});
