'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const app=fs.readFileSync('build-my-home/app.js','utf8'),ctx={window:{}};
vm.runInNewContext(fs.readFileSync('build-my-home/catalog.js','utf8'),ctx);
vm.runInNewContext(app.slice(app.indexOf('const DEFAULT_HALF9_PROMO='),app.indexOf('const icons='))+app.slice(app.indexOf('function promoIsLive('),app.indexOf('function comboName('))+'\nwindow.test={CATALOG,livePromos,promoPrice,defaultQuotePromo};',ctx);
const {CATALOG,livePromos,promoPrice,defaultQuotePromo}=ctx.window.test;
const dryer=CATALOG.find(p=>p.id==='lau-vdh9066'),bundle=CATALOG.find(p=>p.id==='lau-fv1450-vdh9066-combo');
for(const [i,normal] of [110,100].entries()){
 assert.equal(promoPrice(dryer,dryer.plans[i],'standard',1),normal);
 for(const month of [1,9])assert.equal(promoPrice(dryer,dryer.plans[i],'half9',month),normal/2);
 for(const month of [10,60])assert.equal(promoPrice(dryer,dryer.plans[i],'half9',month),normal);
}
assert.equal(bundle.plans.length,1);assert.equal(bundle.plans[0].years,5);assert.equal(bundle.plans[0].service,'Combine Maintenance');
assert.equal(defaultQuotePromo(bundle),'laundry150');assert.deepEqual(Array.from(livePromos(bundle),p=>p.id),['laundry150']);
assert.deepEqual(Array.from(bundle.bundleItems),['lau-fv1450','lau-vdh9066']);
for(let month=1;month<=60;month++)assert.equal(promoPrice(bundle,bundle.plans[0],'laundry150',month),150);
assert.equal(CATALOG.filter(p=>p.id===dryer.id).length,1);
console.log('PASS: Dryer normal/half9 pricing, month 10 restoration, exact 5-year RM150 bundle, and no stacked discounts');
async function checkShare(){
 const data=[{id:bundle.id,years:5,service:'Combine Maintenance',monthly:190,plan:0,promo:'laundry150',qty:1}];
 const token=Buffer.from(JSON.stringify(data)).toString('base64').replace(/=+$/,'');
 const ctx={window:{},URL,location:{href:'https://example.com/?pkg='+token+'&share=1'},localStorage:{getItem:()=>null},document:{addEventListener(){},body:{classList:{add(){},contains(){return false}}},querySelector(){return null},querySelectorAll(){return []}},console,setTimeout(){},atob:s=>Buffer.from(s,'base64').toString('binary'),btoa:s=>Buffer.from(s,'binary').toString('base64')};
 vm.createContext(ctx);vm.runInContext(fs.readFileSync('build-my-home/catalog.js','utf8'),ctx);
 vm.runInContext(app.replace(/\}\)\(\);\s*$/,'window.test={loadFromUrl,getCart:()=>cart,monthlyFor,payload,packageCopywriting,comboPresetData,COMBO_PRESETS};})();'),ctx);
 const t=ctx.window.test;await t.loadFromUrl();const item=t.getCart()[0];assert.equal(item.product.id,bundle.id);assert.equal(t.monthlyFor(item,1),150);assert.equal(t.monthlyFor(item,60),150);assert.equal(t.payload()[0].promo,'laundry150');
 const copy=t.packageCopywriting();assert.match(copy,/FV1450S2W \+ VD-H9066WSR/);assert.match(copy,/RM150/);assert.match(copy,/60/);assert.equal(t.comboPresetData(t.COMBO_PRESETS.find(p=>p.id==='setF')).monthly,150);
 console.log('PASS: RM150 combo preset, share-link restoration, 60-month schedule and customer copywriting');
}
checkShare().catch(e=>{console.error(e);process.exitCode=1;});
