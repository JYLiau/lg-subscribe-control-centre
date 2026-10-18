'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');

const catalogCode=fs.readFileSync(path.join(__dirname,'../build-my-home/catalog.js'),'utf8');
const app=fs.readFileSync(path.join(__dirname,'../build-my-home/app.js'),'utf8');
const context={window:{}};
vm.runInNewContext(catalogCode,context);
const original=context.window.LG_CATALOG;
assert.ok(Array.isArray(original)&&original.length>0,'Catalog must contain products');

// Evaluate the actual customer-site promotion normalization and pricing code.
const start=app.indexOf('const DEFAULT_HALF9_PROMO=');
const end=app.indexOf('const icons=');
const priceStart=app.indexOf('function promoIsLive(');
const priceEnd=app.indexOf('function comboName(');
assert.ok(start>=0&&end>start&&priceStart>=0&&priceEnd>priceStart,'Promotion code not found');
vm.runInNewContext(
  app.slice(start,end)+'\n'+app.slice(priceStart,priceEnd)+
  '\nwindow.__comboTest={CATALOG,livePromos,promoPrice};',
  context
);
const {CATALOG,livePromos,promoPrice}=context.window.__comboTest;
assert.equal(CATALOG.length,original.length,'Keep all original products');

for(let i=0;i<CATALOG.length;i++){
  const product=CATALOG[i];
  assert.equal(product.id,original[i].id,'Keep catalog order');
  for(const existing of original[i].promos)
    assert.ok(product.promos.some(p=>p.id===existing.id),'Existing offer lost: '+product.code+' '+existing.id);
  const combos=livePromos(product).filter(p=>p.id==='combo10');
  assert.equal(combos.length,1,'Exactly one RM10 combo option required for '+product.code);
  assert.equal(combos[0].type,'fixed',product.code);
  assert.equal(combos[0].value,10,product.code);
  for(const plan of product.plans||[]){
    const standard=Number(plan.monthly)||0;
    assert.equal(promoPrice(product,plan,'combo10',1),Math.max(0,standard-10),product.code+' active');
    assert.equal(promoPrice(product,plan,'combo10',1,{comboActive:false}),standard,product.code+' inactive');
  }
}
const washer=CATALOG.find(p=>p.code==='TV2517DV3B');
assert.ok(washer,'17kg TV2517 washer missing');
assert.equal(promoPrice(washer,washer.plans[0],'combo10',1),85);
assert.equal(promoPrice(washer,washer.plans[0],'combo10',1,{comboActive:false}),95);
assert.equal(promoPrice(washer,washer.plans[0],'half9',1),47.5,'50% offer remains separate');
assert.equal(promoPrice(washer,washer.plans[0],'half9',10),95);
const dishwasher=CATALOG.find(p=>p.code.startsWith('DFC335HM'));
assert.ok(dishwasher.promos.some(p=>p.id==='dw99'),'Keep special RM99 offer even after its end date');
assert.ok(app.includes('livePromos(activeProduct)'),'Product modal must read universal promotions');
assert.ok(app.includes('livePromos(d.product)'),'Combo package selector must read universal promotions');
console.log('PASS: RM10 Combo on all '+CATALOG.length+' products; prior specials, eligibility and TV2517 pricing preserved');
