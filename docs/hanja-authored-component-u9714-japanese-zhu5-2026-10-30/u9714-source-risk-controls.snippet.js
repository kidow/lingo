function setupU9714SourceRiskControls(){
 if(!U9714JapaneseZhuStartExact)throw Error('Exact 霔 source required');for(const selected of[3,11]){const row=strokes[selected-1],sum=row.reduce((n,s)=>n+s.weight,0),before=row[0].weight,segment=row[1],B=before/sum;if(row.length!==2||segment.direction!=='curve')throw Error('Fixed two-mask source compound required');button('霔'+selected+' source-secondQ local3',()=>{pen=selected;board([.01,.05,.1].map(p=>(before+p*segment.weight)/sum),520)});button('霔'+selected+' source-boundary3',()=>{pen=selected;board([B-1e-8,B,B+1e-8],300)});}
}
