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
 const ctx={window:{},URL,location:{href:'https://example.com/?pkg='+token+'&share=1'},localStorage:{getItem:()=>null},document:{getElementById(){return null},addEventListener(){},body:{classList:{add(){},contains(){return false}}},querySelector(){return null},querySelectorAll(){return []}},console,setTimeout(){},atob:s=>Buffer.from(s,'base64').toString('binary'),btoa:s=>Buffer.from(s,'binary').toString('base64')};
 vm.createContext(ctx);vm.runInContext(fs.readFileSync('build-my-home/catalog.js','utf8'),ctx);
 vm.runInContext(app.replace(/\}\)\(\);\s*$/,'window.test={loadFromUrl,getCart:()=>cart,monthlyFor,payload,packageCopywriting,selectedPackageItem,visibleProducts,stopSubmission,setSubmissionRows:rows=>submissionRows=rows,COMBO_PRESETS};})();'),ctx);
 const t=ctx.window.test;await t.loadFromUrl();const item=t.getCart()[0];assert.equal(item.product.id,bundle.id);assert.equal(t.monthlyFor(item,1),150);assert.equal(t.monthlyFor(item,60),150);assert.equal(t.payload()[0].promo,'laundry150');
 const copy=t.packageCopywriting();assert.match(copy,/FV1450S2W \+ VD-H9066WSR/);assert.match(copy,/RM150/);assert.match(copy,/60/);assert.ok(!t.COMBO_PRESETS.some(p=>p.id==='setF'));
 assert.ok(!t.visibleProducts().some(p=>p.id===bundle.id));
 assert.ok(t.visibleProducts().some(p=>p.id===dryer.id));
 t.setSubmissionRows([{model_code:'VD-H9066WSR.BBWREML',submission_status:'Stopped on 07 Oct'},{model_code:'FV1209D4W.ABWREML',submission_status:'Stopped'}]);
 assert.equal(t.stopSubmission(dryer),false,'Owner-enabled dryer must survive status refresh');
 assert.ok(t.visibleProducts().some(p=>p.id===dryer.id),'Dryer stays visible after stopped status loads');
 assert.equal(t.stopSubmission({code:'FV1209D4W.ABWREML'}),true,'Unrelated blocked models remain blocked');
 const single=t.selectedPackageItem(dryer,dryer.plans[1],'half9',1);
 assert.equal(single.product.id,dryer.id);assert.equal(t.monthlyFor(single,1),50);
 const combo=t.selectedPackageItem(dryer,dryer.plans[0],'laundry150',2);
 assert.equal(combo.product.id,bundle.id);assert.equal(combo.plan.service,'Combine Maintenance');assert.equal(t.monthlyFor(combo,1),300);assert.equal(t.monthlyFor(combo,60),300);
 console.log('PASS: Dryer-only product card, separate purchase, combo promotion expands to both appliances, share links and copywriting');
}
checkShare().catch(e=>{console.error(e);process.exitCode=1;});
