export function renderProgressive(strokes, stroke, progress, prefix = 'reveal') {
  const all = strokes.map(s => s.map(p => `<path d="${p.outline}"/>`).join(''))
  const current = strokes[stroke-1]
  const weight = current.reduce((n,s) => n+s.weight,0)
  let elapsed = Math.max(0,Math.min(1,progress))*weight
  const pieces = current.map((s,i) => {
    const p = Math.max(0,Math.min(1,elapsed/s.weight)); elapsed -= s.weight
    if (p === 0) return ''
    if (p === 1) return `<path d="${s.outline}"/>`
    const id = `${prefix}-${stroke}-${i}`
    const [x,y,right,bottom] = s.bounds, width=right-x,height=bottom-y
    if (s.direction === 'curve') return `<defs><mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path d="${s.revealPath}" fill="none" stroke="white" stroke-width="${s.revealWidth}" stroke-linecap="round" pathLength="1" stroke-dasharray="${p} 2" stroke-dashoffset="0"/></mask></defs><path d="${s.outline}" mask="url(#${id})"/>`
    const horizontal = s.direction === 'right' || s.direction === 'left'
    const rx = s.direction === 'left' ? right-width*p : x
    const ry = s.direction === 'up' ? bottom-height*p : y
    return `<defs><clipPath id="${id}"><rect x="${rx}" y="${ry}" width="${horizontal?width*p:width}" height="${horizontal?height:height*p}"/></clipPath></defs><path d="${s.outline}" clip-path="url(#${id})"/>`
  }).join('')
  return `<svg viewBox="0 0 100 100"><g fill="#222">${all.slice(0,stroke-1).join('')}${pieces}</g></svg>`
}

const FIXED_STROKES=[[{"outline":"M13.75 9.75 L15.5 10.25 L17.25 10.65 L18.9 11.2 L20.5 11.85 L21.95 12.55 L23.35 13.4 L24.65 14.3 L25.85 15.35 L26.95 16.45 L27.95 17.7 L22.75 20.65 L22.35 19.65 L21.85 18.65 L21.25 17.6 L20.5 16.6 L19.65 15.55 L18.65 14.55 L17.55 13.55 L16.35 12.5 L15 11.45 L13.45 10.6 Z M27.95 17.7 L28.2 19.95 L26.85 21.8 L24.55 22.05 L22.75 20.65 Z","bounds":[13.45,9.75,28.2,22.05],"direction":"curve","weight":16.679676,"revealPath":"M13.16 10 Q22.16 13.5 26.12 20.5","revealWidth":14}],[{"outline":"M6.9 32.7 L8.8 33.2 L10.65 33.65 L12.4 34.15 L14.05 34.8 L15.55 35.55 L17 36.35 L18.3 37.3 L19.55 38.35 L20.65 39.5 L21.6 40.75 L16.25 43.5 L15.95 42.55 L15.5 41.6 L14.9 40.6 L14.2 39.6 L13.3 38.6 L12.25 37.55 L11.1 36.55 L9.75 35.5 L8.3 34.45 L6.6 33.55 Z M21.6 40.75 L21.75 43.05 L20.3 44.8 L18 44.95 L16.25 43.5 Z","bounds":[6.6,32.7,21.75,44.95],"direction":"curve","weight":16.960908,"revealPath":"M6.32 33 Q16.04 36.5 19.64 43.5","revealWidth":14}],[{"outline":"M7.65 66.2 L10.25 66.85 L12.6 67.95 L14.75 69.5 L16.65 71.5 L18.2 73.9 L19.4 76.65 L20.35 79.7 L20.95 83.05 L21.25 86.75 L21.25 90.7 L15.3 90.25 L15.55 86.75 L15.6 83.5 L15.4 80.6 L14.95 77.95 L14.3 75.65 L13.45 73.55 L12.35 71.7 L10.95 70.05 L9.3 68.5 L7.35 67.05 Z M21.25 90.7 L20.25 92.7 L18.05 93.45 L16.05 92.45 L15.3 90.25 Z","bounds":[7.35,66.2,21.25,93.45],"direction":"curve","weight":27.83515,"revealPath":"M7.04 66.5 Q19.64 71 18.2 92","revealWidth":14},{"outline":"M13.45 74.25 L14.1 72.65 L14.95 70.5 L16.1 67.85 L17.55 64.6 L19.25 60.8 L21.25 56.45 L23.6 51.5 L26.2 46 L29.15 39.9 L32.5 33.3 L33.35 33.65 L30.9 40.65 L28.65 47 L26.6 52.75 L24.8 57.85 L23.2 62.4 L21.9 66.3 L20.8 69.6 L20.05 72.3 L19.5 74.35 L19.3 75.7 Z","bounds":[13.45,33.3,33.35,75.7],"direction":"curve","weight":44.682028,"revealPath":"M16.4 75 Q17.84 69 32.96 33.5","revealWidth":14}],[{"outline":"M50.9 9.5 L49.3 14.95 L47.6 20.25 L45.85 25.4 L44 30.5 L42.05 35.45 L40.05 40.3 L37.9 45 L35.7 49.55 L33.3 53.95 L30.8 58.2 L29.95 57.8 L31.6 53.2 L33.25 48.5 L34.9 43.75 L36.5 38.95 L38.05 34 L39.6 29 L41.05 23.9 L42.45 18.7 L43.8 13.4 L45.05 8 Z M44.95 8.5 L45.3 7.15 L50.9 9.5 Z M50.9 9.5 L52.1 10.85 L49.3 11.7 Z","bounds":[29.95,7.15,52.1,58.2],"direction":"curve","weight":52.790763,"revealPath":"M48.123400000000004 8.3125 Q40.9792 36.1 30.3952 58.0375","revealWidth":14}],[{"outline":"M43.95 37.05 L43.95 90.15 L37.95 93.15 L37.95 36.05 Z M43.95 37.05 L45.45 38.05 L42.95 39.55 Z","bounds":[37.95,36.05,45.45,93.15],"direction":"down","weight":55.0875}],[{"outline":"M59 12.5 L59 47 L53 50 L53 9.5 Z","bounds":[53,9.5,59,50],"direction":"down","weight":26.5}],[{"outline":"M56 12.5 L83.7 12.5 L83.7 14.5 L56 14.5 Z M86.7 13.5 L86.7 44 L80.7 47 L80.7 13.5 Z M80.7 12.5 L83.7 10 L89.2 14.5 L86.7 16.5 L80.7 13.5 Z","bounds":[56,10,89.2,47],"direction":"curve","weight":54.22,"revealPath":"M56.019999999999996 13.5 L83.74000000000001 13.5 L83.74000000000001 40","revealWidth":14}],[{"outline":"M56 39 L83.7 39 L83.7 41 L56 41 Z","bounds":[56,39,83.7,41],"direction":"right","weight":27.72}],[{"outline":"M47 55.5 L92 55.5 L92 57.5 L47 57.5 Z M92 55.5 L80 56.5 L86 50.5 Z","bounds":[47,50.5,92,57.5],"direction":"right","weight":45}],[{"outline":"M72.3 39 L72.3 90 L66.3 93 L66.3 39 Z","bounds":[66.3,39,72.3,93],"direction":"down","weight":51.5}],[{"outline":"M70.3 56.5 L70 57.4 L68.45 61.4 L66.7 65.25 L64.75 68.95 L62.65 72.45 L60.4 75.75 L57.9 78.9 L55.3 81.85 L52.45 84.6 L49.45 87.1 L46.2 89.3 L45.6 88.65 L48.15 85.7 L50.5 82.75 L52.75 79.75 L54.85 76.65 L56.85 73.45 L58.65 70.1 L60.3 66.65 L61.8 63.1 L63.1 59.4 L64 56.5 Z","bounds":[45.6,56.5,70.3,89.3],"direction":"curve","weight":38.82509,"revealPath":"M67.18 56.5 Q60.7 76.5 45.94 89","revealWidth":14}],[{"outline":"M72.45 56.8 L74.3 59.75 L76.1 62.65 L77.9 65.4 L79.8 68 L81.7 70.5 L83.75 72.85 L85.8 75.05 L88 77.15 L90.3 79.1 L92.65 80.9 L88.45 86.05 L86.05 83.7 L83.8 81.3 L81.65 78.7 L79.7 76 L77.9 73.2 L76.25 70.25 L74.75 67.15 L73.45 63.95 L72.4 60.6 L71.6 57.1 Z M88.45 86.05 L92.65 80.9 L93.9 81.95 Z","bounds":[71.6,56.8,93.9,86.05],"direction":"curve","weight":32.854808,"revealPath":"M71.86 56.5 Q78.34 73.5 90.58 83.5","revealWidth":14}]];
const same=(a,b)=>{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&same(ad.value,bd.value)})},clone=v=>JSON.parse(JSON.stringify(v)),ensure=(v,m)=>{if(!v)throw Error(m)};
for(const row of FIXED_STROKES){for(const s of row){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(row)}Object.freeze(FIXED_STROKES);
const S=FIXED_STROKES[6][0],H="M56 12.5 L83.7 12.5 L83.7 14.5 L56 14.5 Z",B="M86.7 13.5 L86.7 44 L80.7 47 L80.7 13.5 Z",J="M80.7 12.5 L83.7 10 L89.2 14.5 L86.7 16.5 L80.7 13.5 Z";
const A=[56.019999999999996,13.5],G=[83.74000000000001,13.5],ENDY=40;
function fixed(s){ensure(same(s,S)&&s.outline===H+' '+B+' '+J,'only exact 湺7m1/allfields and original H/B/J')}
export function assertFixedGeometry(rows){ensure(same(rows,FIXED_STROKES),'exact 湺12p13m23 full geometry');return true}
export function targetMask(){return clone(S)}
export function clipState(s,p,L,q){fixed(s);ensure(Number.isFinite(p)&&p>=0&&p<=1&&Number.isFinite(L)&&L>7&&q&&Number.isFinite(q.x)&&Number.isFinite(q.y),'finite original UA frame');const phase=p===0?'empty':p===1?'complete':q.y<=13.5?'H':'V',alpha=phase==='H'?Math.max(0,Math.min(1,(q.x-A[0])/(G[0]-A[0]))):phase==='V'?Math.max(0,Math.min(1,(q.y-13.5)/(53/2))):p;return{progress:p,L,d:p*L,point:{x:q.x,y:q.y},phase,alpha,hH:phase==='H'?56+(166/5)*alpha:phase==='empty'?56:89.2,hV:phase==='V'?13.5+(67/2)*alpha:phase==='complete'?47:13.5,nativePointFromOriginalDOM:true,branchQuantizationCertified:false}}
function coordinateBinding(nodes, owner) {
    const document = owner.ownerDocument, view = document?.defaultView;
    if (!view || view.document !== document)
        throw new Error('Connected 湺 SVG document required');
    const parents = new Map();
    for (const node of nodes) {
        let current = node;
        const visited = new Set();
        while (current) {
            if (visited.has(current))
                throw new Error('Cyclic 湺 SVG parent');
            visited.add(current);
            if (current.namespaceURI !== 'http://www.w3.org/2000/svg' || current.ownerDocument !== document || !current.isConnected || (current !== owner && current.ownerSVGElement !== owner))
                throw new Error('Mismatched 湺 SVG coordinate owner');
            const parent = current.parentElement;
            if (parent && (!parent.isConnected || parent.ownerDocument !== document))
                throw new Error('Mismatched 湺 outer SVG parent');
            parents.set(current, parent);
            if (current === owner)
                break;
            current = current.parentElement;
        }
        if (current !== owner)
            throw new Error('Detached 湺 SVG coordinate tree');
    }
    return () => {
        if (owner.ownerDocument !== document || document.defaultView !== view || view.document !== document)
            return false;
        for (const [node, parent] of parents) {
            if (!node.isConnected || node.ownerDocument !== document || node.parentElement !== parent || (node !== owner && node.ownerSVGElement !== owner) || node.getAttribute('transform') !== null)
                return false;
            const style = view.getComputedStyle(node);
            if (style.transform !== 'none' || ['translate', 'rotate', 'scale'].some(key => { const value = style.getPropertyValue(key); return value !== '' && value !== 'none'; }))
                return false;
        }
        return true;
    };
}

export function measureTarget(s,p,guide){fixed(s);ensure(Number.isFinite(p)&&p>=0&&p<=1,'exact progress');const owner=guide?.ownerSVGElement,defs=guide?.parentElement,target=defs?.parentElement;ensure(owner&&defs?.localName==='defs'&&target?.localName==='g','measurement parent');const coordinates=coordinateBinding([guide],owner),exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')==='u6e7a-7-1'&&target.getAttribute('data-can-progress')===String(p)&&guide.getAttribute('d')===S.revealPath&&guide.getAttribute('data-can-measurement')==='true'&&guide.getAttribute('pathLength')===null;ensure(exact(),'connected original guide/frame attrs');const L=guide.getTotalLength();ensure(Number.isFinite(L)&&L>7&&exact(),'same original native L');const point=guide.getPointAtLength(p*L);ensure(point&&Number.isFinite(point.x)&&Number.isFinite(point.y)&&exact(),'same native point after binding');return clipState(s,p,L,point)}
export function commitTarget(s,p,id,nodes){fixed(s);const{measurement,hclip,bclip,hrect,brect,ink,hink,bink}=nodes,reset=()=>{ink?.setAttribute('visibility','hidden');hrect?.setAttribute('width','0');brect?.setAttribute('height','0');for(const k of ['progress','length','distance','end-x','end-y','phase','alpha','h-h','h-v'])ink?.removeAttribute('data-source-clip-'+k)};reset();try{ensure(Number.isFinite(p)&&p>=0&&p<=1&&/^[A-Za-z0-9_:.-]+$/.test(id),'clip frame/id');if(p===0||p===1)return{status:p===0?'empty':'complete',frame:null,cleanup:reset};const owner=measurement?.ownerSVGElement,defs=measurement?.parentElement,target=defs?.parentElement;ensure(owner&&defs?.localName==='defs'&&target?.localName==='g'&&hclip&&bclip&&hrect&&brect&&ink&&hink&&bink,'clip DOM nodes');const coords=coordinateBinding([measurement,hclip,bclip,hrect,brect,ink,hink,bink],owner);const bound=()=>coords()&&defs.parentElement===target&&measurement.parentElement===defs&&target.getAttribute('data-stroke-start-gate')==='u6e7a-7-1'&&target.getAttribute('data-can-progress')===String(p)&&target.getAttribute('data-can-clip')===id&&measurement.getAttribute('data-growing-owner')===id&&measurement.getAttribute('id')===id+'-measure'&&measurement.getAttribute('d')===S.revealPath&&measurement.getAttribute('pathLength')===null&&[hclip,bclip].every(n=>n.localName==='clipPath'&&n.parentElement===defs&&n.getAttribute('clipPathUnits')==='userSpaceOnUse')&&hclip.getAttribute('id')===id+'-h-clip'&&bclip.getAttribute('id')===id+'-b-clip'&&hrect.parentElement===hclip&&brect.parentElement===bclip&&hrect.localName==='rect'&&brect.localName==='rect'&&hrect.getAttribute('x')==='56'&&hrect.getAttribute('y')==='10'&&hrect.getAttribute('height')==='6.5'&&brect.getAttribute('x')==='80.7'&&brect.getAttribute('y')==='13.5'&&brect.getAttribute('width')==='6'&&ink.parentElement===target&&hink.parentElement===ink&&bink.parentElement===ink&&hink.getAttribute('d')===H+' '+J&&bink.getAttribute('d')===B&&hink.getAttribute('clip-path')==='url(#'+id+'-h-clip)'&&bink.getAttribute('clip-path')==='url(#'+id+'-b-clip)'&&[hclip,bclip,hrect,brect,ink,hink,bink].every(n=>n.getAttribute('data-growing-owner')===id);ensure(bound(),'exact clip allfields/owner/attrs/frame');const frame=measureTarget(s,p,measurement);ensure(bound(),'DOM changed during native read');const w=frame.hH-56,h=frame.hV-13.5;hrect.setAttribute('width',String(w));brect.setAttribute('height',String(h));for(const[k,v]of Object.entries({progress:p,length:frame.L,distance:frame.d,'end-x':frame.point.x,'end-y':frame.point.y,phase:frame.phase,alpha:frame.alpha,'h-h':frame.hH,'h-v':frame.hV}))ink.setAttribute('data-source-clip-'+k,String(v));ensure(bound()&&hrect.getAttribute('width')===String(w)&&brect.getAttribute('height')===String(h),'clip changed before visibility');ink.setAttribute('visibility','visible');return{status:'visible',frame,cleanup:reset}}catch(e){reset();return{status:'hidden',frame:null,reason:String(e),cleanup:reset}}}
function targetHTML(p,id){const defs='<defs><path id="'+id+'-measure" data-growing-owner="'+id+'" data-can-measurement="true" d="'+S.revealPath+'" fill="none" stroke="none" visibility="hidden"/><clipPath id="'+id+'-h-clip" data-growing-owner="'+id+'" clipPathUnits="userSpaceOnUse"><rect data-growing-owner="'+id+'" x="56" y="10" width="0" height="6.5"/></clipPath><clipPath id="'+id+'-b-clip" data-growing-owner="'+id+'" clipPathUnits="userSpaceOnUse"><rect data-growing-owner="'+id+'" x="80.7" y="13.5" width="6" height="0"/></clipPath></defs>';return '<g data-stroke-start-gate="u6e7a-7-1" data-can-progress="'+p+'" data-can-clip="'+id+'">'+defs+(p===1?'<path data-original-P-complete="true" d="'+S.outline+'"/>':p>0?'<g data-source-clip-ink="true" data-growing-owner="'+id+'" visibility="hidden"><path data-source-hj="true" data-growing-owner="'+id+'" d="'+H+' '+J+'" clip-path="url(#'+id+'-h-clip)"/><path data-source-b="true" data-growing-owner="'+id+'" d="'+B+'" clip-path="url(#'+id+'-b-clip)"/></g>':'')+'</g>'}
export function renderCandidate(rows,p,prefix='new'){assertFixedGeometry(rows);ensure(Number.isFinite(p)&&p>=0&&p<=1&&/^[A-Za-z][\w-]*$/.test(prefix),'fixed clip p/id');return '<svg viewBox="0 0 100 100"><g fill="#222">'+rows.slice(0,6).flat().map(s=>'<path d="'+s.outline+'"/>').join('')+targetHTML(p,prefix)+'</g></svg>'}
export function renderTargetLocal(rows,p,prefix='local'){assertFixedGeometry(rows);ensure(Number.isFinite(p)&&p>=0&&p<=1&&/^[A-Za-z][\w-]*$/.test(prefix),'local p/id');return '<svg viewBox="0 0 100 100"><g fill="#222">'+targetHTML(p,prefix)+'</g></svg>'}
export function renderOriginal(rows,p,prefix='old'){assertFixedGeometry(rows);return renderProgressive(rows,7,p,prefix)}
export function renderWhole(rows,prefix='whole'){assertFixedGeometry(rows);return renderProgressive(rows,12,1,prefix)}
export function commitHost(host){ensure(host?.isConnected,'connected host');return Array.from(host.querySelectorAll('[data-stroke-start-gate="u6e7a-7-1"]')).map(g=>{const p=Number(g.getAttribute('data-can-progress')),id=g.getAttribute('data-can-clip'),ink=g.querySelector(':scope > g[data-source-clip-ink="true"]'),v=commitTarget(S,p,id,{measurement:g.querySelector('[data-can-measurement="true"]'),hclip:g.querySelector('clipPath[id$="-h-clip"]'),bclip:g.querySelector('clipPath[id$="-b-clip"]'),hrect:g.querySelector('clipPath[id$="-h-clip"] rect'),brect:g.querySelector('clipPath[id$="-b-clip"] rect'),ink,hink:g.querySelector('[data-source-hj="true"]'),bink:g.querySelector('[data-source-b="true"]')});return{progress:p,status:v.status,reason:v.reason??null,frame:v.frame,originalPComplete:!!g.querySelector('[data-original-P-complete="true"]'),inkVisible:ink?.getAttribute('visibility')==='visible'}})}
export function residual(prefix='old-residual',directP=false){ensure(/^[A-Za-z][\w-]*$/.test(prefix),'residual id');return '<svg viewBox="0 0 100 100" data-residual-policy="'+(directP?'same-P-tautology-not-coverage-proof':'original-fullround-knownFAIL')+'"><rect width="100" height="100" fill="white"/><defs><mask id="'+prefix+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="white"/>'+(directP?'<path d="'+S.outline+'" fill="black"/>':'<path d="'+S.revealPath+'" fill="none" stroke="black" stroke-width="14" stroke-linecap="round" stroke-linejoin="miter"/>')+'</mask></defs><path d="'+S.outline+'" fill="black" mask="url(#'+prefix+')"/></svg>'}
export const nativeApproval=false,actualAppUI=false,runtimeApplied=false;

// New four fixed MQ targets only; preceding 湺7 source-clip module is byte-preserved.
const Q_SPECS=[{"pen":1,"mask":1,"raw":0,"T":[1,2],"K":[1,20],"id":"u6e7a-1-1","kind":"fixed-MQ-source-certified","path":"M13.16 10 Q22.16 13.5 26.12 20.5","maskSHA256":"4e9920c85e2f23d90321d86891a93b62ad0991831540253b333aa53a8afb09ca","storedCertificate":{"pen":1,"mask":1,"syntax":"MQ","T":"1/2","K":"1/20","A":["9/1","7/2"],"B":["-126/25","7/2"],"minimumT":"1/2","speedHalfSquaredLower":"695529/10000","cross":"2457/50","chordSquared":"3161929/40000","chordSquaredMinus49":"1201929/40000","curvatureMargin":"94995559291520889/100000000000000","rK":"7/20","cosLower":"751/800","cosMinusRK":"471/800","sufficientInitialArc7":true}},{"pen":2,"mask":1,"raw":1,"T":[1,2],"K":[1,20],"id":"u6e7a-2-1","kind":"fixed-MQ-source-certified","path":"M6.32 33 Q16.04 36.5 19.64 43.5","maskSHA256":"fff8024b411e3899ae9a592f85ede33c15f64adbc996d5850dc06b462541fbee","storedCertificate":{"pen":2,"mask":1,"syntax":"MQ","T":"1/2","K":"1/20","A":["243/25","7/2"],"B":["-153/25","7/2"],"minimumT":"1/2","speedHalfSquaredLower":"719181/10000","cross":"1386/25","chordSquared":"3448669/40000","chordSquaredMinus49":"1488669/40000","curvatureMargin":"64616379494406741/100000000000000","rK":"7/20","cosLower":"751/800","cosMinusRK":"471/800","sufficientInitialArc7":true}},{"pen":3,"mask":1,"raw":2,"T":[1,2],"K":[1,12],"id":"u6e7a-3-1","kind":"fixed-MQ-source-certified","path":"M7.04 66.5 Q19.64 71 18.2 92","maskSHA256":"9aad0d4ea4da1b98c089bcfb21e44dbe366221502d00682980c6e4bf79bbe7a7","storedCertificate":{"pen":3,"mask":1,"syntax":"MQ","T":"1/2","K":"1/12","A":["63/5","9/2"],"B":["-351/25","33/2"],"minimumT":"28515/130381","speedHalfSquaredLower":"20412324/130381","cross":"6777/25","chordSquared":"6280749/40000","chordSquaredMinus49":"4320749/40000","curvatureMargin":"45864288693287205150411/1385233355060213125","rK":"7/12","cosLower":"239/288","cosMinusRK":"71/288","sufficientInitialArc7":true}},{"pen":3,"mask":2,"raw":3,"T":[1,3],"K":[1,11],"id":"u6e7a-3-2","kind":"fixed-MQ-source-certified","path":"M16.4 75 Q17.84 69 32.96 33.5","maskSHA256":"aefa96b7c578bb177bbba1c2abbcb2c70da1b09548284f95a8c90cf71c282f5a","storedCertificate":{"pen":3,"mask":2,"syntax":"MQ","T":"1/3","K":"1/11","A":["36/25","-6/1"],"B":["342/25","-59/2"],"minimumT":"0/1","speedHalfSquaredLower":"23796/625","cross":"198/5","chordSquared":"11971081/202500","chordSquaredMinus49":"2048581/202500","curvatureMargin":"7572864386844/29541015625","rK":"7/11","cosLower":"193/242","cosMinusRK":"39/242","sufficientInitialArc7":true}}];
const Q_POLICIES=Object.freeze(Q_SPECS.map(t=>Object.freeze({id:t.id,pen:t.pen,mask:t.mask,kind:t.kind,segment:FIXED_STROKES[t.pen-1][t.mask-1],certificate:t.storedCertificate})));
function policy(s){const t=Q_POLICIES.find(t=>same(t.segment,s));ensure(t,'only four exact source-certified MQ masks');return t}
function source(t,s){ensure(Q_POLICIES.includes(t)&&same(t.segment,s)&&s.revealWidth===14,'private exact MQ fields/width');return{q0:s.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number),r:7,minimumLength:7}}
export function targetInfo(pen,mask){ensure(arguments.length===2,'explicit pen+mask');if(pen===7&&mask===1)return{id:'u6e7a-7-1',pen,mask,kind:'original-HJ-B-source-clip',segment:clone(S)};const t=Q_POLICIES.find(t=>t.pen===pen&&t.mask===mask);ensure(t,'only four MQ plus original7');return{id:t.id,pen,mask,kind:t.kind,segment:clone(t.segment),certificate:clone(t.certificate)}}
export function qCertificate(s){return clone(policy(s).certificate)}
function measureFrame(policy, segment, progress, guide) {
    const fixed = source(policy, segment);
    if (!Number.isFinite(progress) || progress < 0 || progress > 1)
        throw new Error('Invalid 湺 MQ progress');
    const owner = guide?.ownerSVGElement;
    const defs = guide?.parentElement, target = defs?.parentElement;
    if (!owner || !guide || defs?.localName !== 'defs' || target?.localName !== 'g' || target.getAttribute('data-stroke-start-gate') !== policy.id)
        throw new Error('Exact 湺 MQ measurement parent required');
    const coordinates = coordinateBinding([guide], owner);
    const exact = () => coordinates() && guide.parentElement === defs && defs.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && target.getAttribute('data-can-progress') === String(progress) && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('data-can-measurement') === 'true' && guide.getAttribute('pathLength') === null;
    if (!exact())
        throw new Error('Exact connected 湺 MQ measurement guide required');
    const L = guide.getTotalLength();
    if (!Number.isFinite(L) || L <= fixed.minimumLength || !exact())
        throw new Error('Invalid 湺 MQ browser length');
    const d = Math.min(progress * L, L), point = guide.getPointAtLength(d);
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !exact())
        throw new Error('Changed 湺 MQ guide or invalid endpoint');
    if (progress === 0 && Math.hypot(point.x - fixed.q0[0], point.y - fixed.q0[1]) >= 1e-4)
        throw new Error('湺 MQ UA start differs from exact M');
    return Object.freeze({ policyId: policy.id, guide: segment.revealPath, progress, L, d, rho: Math.min(fixed.r, d), q0: Object.freeze(fixed.q0), point: Object.freeze({ x: point.x, y: point.y }) });
}
function commitFrame(policy, segment, progress, clipId, nodes) {
    const { measurement, guide, startCap, endCap, ink } = nodes;
    const reset = () => {
        ink?.setAttribute('visibility', 'hidden');
        guide?.setAttribute('stroke-dasharray', '0 2');
        for (const cap of [startCap, endCap]) {
            cap?.setAttribute('r', '0');
            cap?.setAttribute('cx', '0');
            cap?.setAttribute('cy', '0');
        }
        for (const key of ['data-growing-progress', 'data-growing-length', 'data-growing-distance', 'data-growing-radius', 'data-growing-end-x', 'data-growing-end-y'])
            ink?.removeAttribute(key);
    };
    reset();
    try {
        source(policy, segment);
        if (!Number.isFinite(progress) || progress < 0 || progress > 1 || !/^[A-Za-z0-9_:.-]+$/.test(clipId))
            throw new Error('Invalid 湺 MQ frame/id');
        if (progress === 0 || progress === 1)
            return { status: progress === 0 ? 'empty' : 'complete', frame: null, cleanup: reset };
        const owner = measurement?.ownerSVGElement;
        const defs = measurement?.parentElement, target = defs?.parentElement, mask = guide?.parentElement;
        if (!owner || !measurement || !guide || !startCap || !endCap || !ink || defs?.localName !== 'defs' || target?.localName !== 'g' || mask?.localName !== 'mask')
            throw new Error('Missing 湺 MQ SVG binding tree');
        const coordinates = coordinateBinding([measurement, guide, startCap, endCap, ink], owner);
        const bound = () => coordinates() && measurement.parentElement === defs && defs.parentElement === target && guide.parentElement === mask && mask.parentElement === defs && startCap.parentElement === mask && endCap.parentElement === mask && ink.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && target.getAttribute('data-can-progress') === String(progress) && mask.getAttribute('id') === clipId + '-can-growing' && mask.getAttribute('maskUnits') === 'userSpaceOnUse' && ['x', 'y'].every(key => mask.getAttribute(key) === '0') && ['width', 'height'].every(key => mask.getAttribute(key) === '100') && [measurement, guide, startCap, endCap, ink].every(node => node.getAttribute('data-growing-owner') === clipId) && measurement.getAttribute('id') === clipId + '-can-measure' && guide.getAttribute('id') === clipId + '-can-guide' && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('pathLength') === '1' && guide.getAttribute('stroke-width') === '14' && guide.getAttribute('stroke-linecap') === 'butt' && guide.getAttribute('stroke-linejoin') === 'miter' && ink.getAttribute('d') === segment.outline && ink.getAttribute('mask') === 'url(#' + clipId + '-can-growing)';
        if (!bound())
            throw new Error('Mismatched 湺 MQ SVG binding');
        const frame = measureFrame(policy, segment, progress, measurement);
        if (!bound())
            throw new Error('湺 MQ binding changed during UA read');
        guide.setAttribute('stroke-dasharray', String(frame.progress) + ' 2');
        startCap.setAttribute('cx', String(frame.q0[0]));
        startCap.setAttribute('cy', String(frame.q0[1]));
        startCap.setAttribute('r', String(frame.rho));
        endCap.setAttribute('cx', String(frame.point.x));
        endCap.setAttribute('cy', String(frame.point.y));
        endCap.setAttribute('r', String(frame.rho));
        for (const [key, value] of Object.entries({ 'data-growing-progress': frame.progress, 'data-growing-length': frame.L, 'data-growing-distance': frame.d, 'data-growing-radius': frame.rho, 'data-growing-end-x': frame.point.x, 'data-growing-end-y': frame.point.y }))
            ink.setAttribute(key, String(value));
        if (!bound())
            throw new Error('湺 MQ binding changed before visibility commit');
        ink.setAttribute('visibility', 'visible');
        return { status: 'visible', frame, cleanup: reset };
    }
    catch {
        reset();
        return { status: 'hidden', frame: null, cleanup: reset };
    }
}


function full(s,id){return '<mask id="'+id+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path d="'+s.revealPath+'" fill="none" stroke="white" stroke-width="14" stroke-linecap="round" stroke-linejoin="miter" pathLength="1" stroke-dasharray="1 2" stroke-dashoffset="0"/></mask>'}
function growingHTML(t,p,id){const s=t.segment,defs='<defs><path id="'+id+'-can-measure" data-growing-owner="'+id+'" data-can-measurement="true" d="'+s.revealPath+'" fill="none" stroke="none" visibility="hidden"/>'+full(s,id)+'<mask id="'+id+'-can-growing" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path id="'+id+'-can-guide" data-growing-owner="'+id+'" d="'+s.revealPath+'" fill="none" stroke="white" stroke-width="14" stroke-linecap="butt" stroke-linejoin="miter" pathLength="1" stroke-dasharray="0 2" stroke-dashoffset="0"/><circle data-growing-owner="'+id+'" cx="0" cy="0" r="0" fill="white"/><circle data-growing-owner="'+id+'" cx="0" cy="0" r="0" fill="white"/></mask></defs>';return '<g data-can-target="'+t.id+'" data-stroke-start-gate="'+t.id+'" data-can-progress="'+p+'" data-can-clip="'+id+'">'+defs+(p===1?'<path data-can-full="true" d="'+s.outline+'" mask="url(#'+id+')"/>':p>0?'<path data-can-ink="true" data-growing-owner="'+id+'" d="'+s.outline+'" mask="url(#'+id+'-can-growing)" visibility="hidden"/>':'')+'</g>'}
function ordinary(s,p,id){if(p===0)return '';if(p===1)return '<path d="'+s.outline+'"/>';const[x,y,right,bottom]=s.bounds,width=right-x,height=bottom-y;if(s.direction==='curve')return '<defs><mask id="'+id+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path d="'+s.revealPath+'" fill="none" stroke="white" stroke-width="'+s.revealWidth+'" stroke-linecap="round" pathLength="1" stroke-dasharray="'+p+' 2" stroke-dashoffset="0"/></mask></defs><path d="'+s.outline+'" mask="url(#'+id+')"/>';const horizontal=s.direction==='right'||s.direction==='left',rx=s.direction==='left'?right-width*p:x,ry=s.direction==='up'?bottom-height*p:y;return '<defs><clipPath id="'+id+'"><rect x="'+rx+'" y="'+ry+'" width="'+(horizontal?width*p:width)+'" height="'+(horizontal?height:height*p)+'"/></clipPath></defs><path d="'+s.outline+'" clip-path="url(#'+id+')"/>'}

export function measureGrowthTarget(s,p,path){return measureFrame(policy(s),s,p,path)}
export function commitGrowthTarget(s,p,id,nodes){return commitFrame(policy(s),s,p,id,nodes)}
export function renderIntegrated(rows,pen,p,prefix='new'){assertFixedGeometry(rows);ensure(Number.isInteger(pen)&&pen>=1&&pen<=12&&Number.isFinite(p)&&p>=0&&p<=1&&/^[A-Za-z][\w-]*$/.test(prefix),'exact integrated pen/progress');let out='';rows.forEach((masks,pi)=>{const global=pi<pen-1?1:pi===pen-1?p:0,total=masks.reduce((n,s)=>n+s.weight,0);let elapsed=global*total;masks.forEach((s,mi)=>{const q=Q_POLICIES.find(t=>t.pen===pi+1&&t.mask===mi+1),is7=pi===6&&mi===0,raw=Math.max(0,Math.min(1,elapsed/s.weight)),local=pi<pen-1?1:(q||is7)&&global===1?1:raw,id=prefix+'-'+(pi+1)+'-'+mi;elapsed-=s.weight;out+=is7?targetHTML(local,id):q?growingHTML(q,local,id):ordinary(s,local,id)})});return '<svg viewBox="0 0 100 100"><g fill="#222">'+out+'</g></svg>'}
export function renderIntegratedWhole(rows,prefix='whole-new'){return renderIntegrated(rows,12,1,prefix)}
export function renderIntegratedOriginal(rows,pen,p,prefix='old'){assertFixedGeometry(rows);return renderProgressive(rows,pen,p,prefix)}
export function renderIntegratedLocal(rows,pen,mask,p,prefix='local-new'){assertFixedGeometry(rows);const t=targetInfo(pen,mask);ensure(Number.isFinite(p)&&p>=0&&p<=1&&/^[A-Za-z][\w-]*$/.test(prefix),'local progress/id');return pen===7?renderTargetLocal(rows,p,prefix):'<svg viewBox="0 0 100 100"><g fill="#222">'+growingHTML(t,p,prefix+'-'+pen+'-'+mask)+'</g></svg>'}
export function commitIntegratedHost(host){const results=commitHost(host);for(const g of host.querySelectorAll('[data-can-target]')){const t=Q_POLICIES.find(t=>t.id===g.getAttribute('data-can-target'));ensure(t,'own MQ id');const id=g.getAttribute('data-can-clip'),p=Number(g.getAttribute('data-can-progress')),caps=g.querySelectorAll('mask circle'),ink=g.querySelector(':scope > path[data-can-ink="true"]'),v=commitFrame(t,t.segment,p,id,{measurement:g.querySelector('[data-can-measurement="true"]'),guide:g.querySelector('path[id$="-can-guide"]'),startCap:caps[0],endCap:caps[1],ink});results.push({id:t.id,pen:t.pen,mask:t.mask,kind:t.kind,requestedLocal:p,status:v.status,frame:v.frame,inkVisible:ink?.getAttribute('visibility')==='visible',fullRound:!!g.querySelector('[data-can-full="true"]')})}return results}
export function growthResidual(s,prefix='q-residual'){policy(s);ensure(/^[A-Za-z][\w-]*$/.test(prefix),'own MQ residual id');return '<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="white"/><defs><mask id="'+prefix+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="white"/><path d="'+s.revealPath+'" fill="none" stroke="black" stroke-width="14" stroke-linecap="round" stroke-linejoin="miter"/></mask></defs><path d="'+s.outline+'" fill="black" mask="url(#'+prefix+')"/></svg>'}
