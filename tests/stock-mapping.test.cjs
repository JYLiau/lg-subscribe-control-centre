const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const html=fs.readFileSync('index.html','utf8');
const start=html.indexOf('  function parseStockWorkbook(');
const end=html.indexOf('  function excelDateToIso(',start);
const ctx={XLSX:{utils:{sheet_to_json:x=>x}},excelDateToIso:()=> '2026-10-13T00:33:00Z',nowIso:()=>'',stockQty:x=>Number(x)||0,normModel:x=>String(x||'').trim(),validStockCategory:x=>x==='REF',normalizeCategory:x=>x,validStockModelCode:x=>x.includes('.')};
vm.createContext(ctx);vm.runInContext(html.slice(start,end),ctx);
function fixture(shift=0){
 const rows=Array.from({length:21},()=>Array(26+shift).fill(null));
 const at=(r,c,v)=>rows[r-1][c-1+shift]=v;
 at(1,4,'10/13/26 8:33');at(19,3,'Category');at(19,4,'Model');
 for(const c of [5,15,21])at(18,c,'Opening\nStock');
 for(const c of [9,20,26])at(18,c,'Balance\nStock');
 at(21,3,'REF');at(21,4,'GC-J257SQNW.AMCRLML');
 [289,47,118,62,156].forEach((v,i)=>at(21,5+i,v));
 [43,0,0,2,3,38].forEach((v,i)=>at(21,15+i,v));
 [11,0,0,6,1,4].forEach((v,i)=>at(21,21+i,v));
 return {Sheets:{'Available Sum':rows,'Portfolio Status':[['Category','Model','Description','Lifecycle','Submission'],['REF','GC-J257SQNW.AMCRLML','Fridge','Operating','']]}};
}
for(const shift of [0,2]){
 const p=ctx.parseStockWorkbook(fixture(shift),'test').products['GC-J257SQNW.AMCRLML'];
 assert.equal(p.stock.AL8.balance,156);assert.equal(p.stock.AL2.opening,43);assert.equal(p.stock.AL2.balance,38);assert.equal(p.stock.AL3.opening,11);assert.equal(p.stock.AL3.balance,4);
}
const changed=fixture();changed.Sheets['Available Sum'][17][14]='Other';
assert.throws(()=>ctx.parseStockWorkbook(changed,'test'),/layout changed/);
const partial=fixture();partial.Sheets['Available Sum'][20].length=20;
assert.throws(()=>ctx.parseStockWorkbook(partial,'test'),/Incomplete regional/);
console.log('PASS: verified GC-J257 mapping, leading-column shifts, changed headers and incomplete rows.');
