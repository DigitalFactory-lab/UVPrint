/* Trace pixel-cell boundaries at alpha >= 128, retaining holes and islands.
   Coordinates are relative to the tight bounding box, without resampling. */
function traceAlpha(data, width, height) {
  if(width*height>4194304) throw new Error('Le PNG est trop grand. Réduis-le à 4 millions de pixels maximum.');
  const mask=new Uint8Array(width*height);
  let minX=width,minY=height,maxX=-1,maxY=-1,transparent=false;
  for(let y=0;y<height;y++) for(let x=0;x<width;x++) {
    const a=data[(y*width+x)*4+3];
    if(a===0) transparent=true;
    if(a>=128) {mask[y*width+x]=1; minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);}
  }
  if(maxX<0) throw new Error('Ce PNG ne contient aucune forme suffisamment opaque.');
  if(!transparent) throw new Error('Le fichier de forme libre doit être un PNG sur fond transparent. Détoure le fond avant de l’importer.');
  const edges=[], starts=new Map(), stride=width+1;
  const add=(x,y,xx,yy,d)=>{if(edges.length>=200000) throw new Error('Contour trop complexe : nettoie les petits détails du PNG.'); const a=y*stride+x,b=yy*stride+xx,i=edges.length;edges.push({a,b,d});if(!starts.has(a)) starts.set(a,[]);starts.get(a).push(i);};
  const filled=(x,y)=>x>=0&&x<width&&y>=0&&y<height&&mask[y*width+x];
  for(let y=minY;y<=maxY;y++) for(let x=minX;x<=maxX;x++) if(filled(x,y)) {
    if(!filled(x,y-1)) add(x,y,x+1,y,0);
    if(!filled(x+1,y)) add(x+1,y,x+1,y+1,1);
    if(!filled(x,y+1)) add(x+1,y+1,x,y+1,2);
    if(!filled(x-1,y)) add(x,y+1,x,y,3);
  }
  const used=new Uint8Array(edges.length),paths=[];
  for(let i=0;i<edges.length;i++) if(!used[i]) {
    const path=[];let current=i, previous=-1;
    do {
      const e=edges[current];used[current]=1;
      if(e.d!==previous) path.push([e.a%stride-minX,Math.floor(e.a/stride)-minY]);
      previous=e.d;
      if(e.b===edges[i].a) break;
      const candidates=(starts.get(e.b)||[]).filter(j=>!used[j]);
      // At diagonal contacts, turn right to keep each island a closed loop.
      candidates.sort((a,b)=>[1,0,3,2].indexOf((edges[a].d-e.d+4)%4)-[1,0,3,2].indexOf((edges[b].d-e.d+4)%4));
      if(!candidates.length) throw new Error('Le contour ne peut pas être fermé.');
      current=candidates[0];
    } while(!used[current]);
    paths.push(path);
  }
  return {x:minX,y:minY,w:maxX-minX+1,h:maxY-minY+1,paths};
}
if(typeof module!=='undefined') module.exports={traceAlpha};
