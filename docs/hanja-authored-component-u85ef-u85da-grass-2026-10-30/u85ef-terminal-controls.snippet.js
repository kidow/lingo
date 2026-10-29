function setupU85efTerminalControls(){
 if(!U85efFoldUpExact||!FoldContactContext)throw Error('Exact 藯 terminal source required');const t=C.sourceTerminalDisplayPolicy.targets[0],row=strokes[t.pen-1],segment=row[t.mask-1],sum=row.reduce((n,s)=>n+s.weight,0),before=row.slice(0,t.mask-1).reduce((n,s)=>n+s.weight,0),phase=1119/1244,toGlobal=p=>(before+p*segment.weight)/sum;
 if(t.pen!==17||t.mask!==3||C.sourceTerminalDisplayPolicy.bodyPhase!==phase||row.length!==3||segment.direction!=='right')throw Error('Fixed original17 terminal mask required');
 button('藯17 terminal body-UP boundary3',()=>{pen=17;board([phase-1e-8,phase,phase+1e-8].map(toGlobal),300)});
 button('藯17 terminal clock compact11',()=>{pen=17;board([0,1e-6,.01,.05,.1,.5,phase-1e-8,phase,phase+1e-8,.99999999,1].map(toGlobal),300)});
}
