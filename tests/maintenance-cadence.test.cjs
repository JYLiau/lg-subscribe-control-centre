const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const code=fs.readFileSync(path.join(__dirname,'../build-my-home/catalog.js'),'utf8');
const app=fs.readFileSync(path.join(__dirname,'../build-my-home/app.js'),'utf8');
const context={window:{}};
vm.runInNewContext(code,context);
const catalog=context.window.LG_CATALOG;
assert.equal(catalog.length,43);
const product=prefix=>{const p=catalog.find(p=>p.code.startsWith(prefix));assert.ok(p,'Missing '+prefix);return p;};
for(const p of catalog.filter(p=>p.category==='Laundry')){
  for(const plan of p.plans){
    if(plan.service==='Regular Visit 6M') assert.equal(plan.visitIntervalMonths,6,p.code);
    else if(plan.service==='Combine Maintenance'){
      assert.equal(plan.visitIntervalMonths,12,p.code);
      assert.equal(plan.kitIntervalMonths,6,p.code);
    } else assert.fail('Unverified laundry maintenance label for '+p.code+': '+plan.service);
  }
}
for(const [prefix,expected] of Object.entries({
  'GC-G22FFQAB':[[5,160,24],[5,180,12]],
  'GN-F452':[[5,80,24],[5,100,12]],
  'GC-J257SQNW':[[5,130,24],[5,150,12]],
  'GV-K25FFGER':[[5,180,24],[5,200,12],[7,160,24],[7,180,12]]
})){
  assert.deepEqual(product(prefix).plans.map(p=>[p.years,p.monthly,p.visitIntervalMonths]),expected,prefix);
}
assert.deepEqual(product('S3-Q24K2RPA').plans.map(p=>[p.monthly,p.visitIntervalMonths]),[[130,12],[150,6]]);
assert.deepEqual(product('F2515RNTKAR').plans.map(p=>[p.years,p.monthly,p.visitIntervalMonths]),[[5,105,12],[5,115,6],[7,85,12],[7,95,6]]);
for(const marker of ['svcLaundryRV6:','svcLaundryCombinedDetail:','function serviceDetail(','serviceDetail(activeProduct,p)','serviceDetail(item.product,item.plan)'])assert.ok(app.includes(marker),'Missing copywriting rule: '+marker);
assert.doesNotThrow(()=>new Function(app));
console.log('PASS: maintenance cadence, multilingual copywriting and fridge/ARTCOOL/15-8 plans');
