const {test}=require('node:test');
const assert=require('node:assert/strict');
const {traceAlpha}=require('../assets/freeform.js');
function pixels(rows){return Uint8ClampedArray.from(rows.flatMap(row=>[...row].flatMap(v=>[200,100,50,v==='1'?255:0])));}
test('reject opaque and empty images',()=>{
 assert.throws(()=>traceAlpha(pixels(['11','11']),2,2),/transparent/);
 assert.throws(()=>traceAlpha(pixels(['00','00']),2,2),/opaque/);
});
test('tight bounds, holes and diagonal islands',()=>{
 const sh=traceAlpha(pixels(['00000','01110','01010','01110','00000']),5,5);
 assert.deepEqual([sh.x,sh.y,sh.w,sh.h,sh.paths.length],[1,1,3,3,2]);
 assert.equal(traceAlpha(pixels(['10','01']),2,2).paths.length,2);
});
test('every 3 by 3 mask preserves filled area and closed orthogonal contours',()=>{
 for(let bits=1;bits<511;bits++) {
  const rows=Array.from({length:3},(_,y)=>Array.from({length:3},(_,x)=>(bits>>(y*3+x))&1).join(''));
  const sh=traceAlpha(pixels(rows),3,3);
  let area=0;
  for(const path of sh.paths) for(let i=0;i<path.length;i++) {
   const a=path[i],b=path[(i+1)%path.length];
   assert.ok(a[0]===b[0]||a[1]===b[1]);
   area+=(a[0]*b[1]-b[0]*a[1])/2;
  }
  assert.equal(area,rows.join('').split('1').length-1);
 }
});
