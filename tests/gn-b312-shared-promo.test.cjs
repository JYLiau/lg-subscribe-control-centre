const fs=require('fs'),vm=require('vm'),assert=require('assert');
const app=fs.readFileSync(require('path').join(__dirname,'../build-my-home/app.js'),'utf8');
const data=[{id:'ref-gn-b312pqjf',years:5,service:'Regular Visit every 2 years',monthly:75,plan:1,promo:'half9',qty:1}];
async function check(short){
 const token=Buffer.from(JSON.stringify(data)).toString('base64').replace(/=+$/,'');
 const ctx={window:{},URL,location:{href:'https://example.com/build-my-home/?'+(short?'q=abcdefghij':'pkg='+token)+'&share=1'},localStorage:{getItem:()=>null},document:{addEventListener(){},body:{classList:{add(){},contains(){return false}}},querySelector(){return null},querySelectorAll(){return []}},fetch:async()=>({ok:true,json:async()=>({items:data})}),console,setTimeout(){},atob:s=>Buffer.from(s,'base64').toString('binary'),btoa:s=>Buffer.from(s,'binary').toString('base64')};
 vm.createContext(ctx);vm.runInContext(fs.readFileSync(require('path').join(__dirname,'../build-my-home/catalog.js'),'utf8'),ctx);
 vm.runInContext(app.replace(/\}\)\(\);\s*$/,'window.test={loadFromUrl,getCart:()=>cart,monthlyFor,payload,money};})();'),ctx);
 await ctx.window.test.loadFromUrl();const t=ctx.window.test,item=t.getCart()[0];assert.equal(item.promo,'half9');assert.equal(t.monthlyFor(item,1),37.5);assert.equal(t.monthlyFor(item,9),37.5);assert.equal(t.monthlyFor(item,10),75);assert.equal(t.money(t.monthlyFor(item,1)),'RM38');assert.equal(t.payload()[0].promo,'half9');console.log('PASS '+(short?'short link':'full link')+': half9 retained; months 1–9 RM37.50 (display RM38), months 10–60 RM75; resharing retains promo.');
}
check(false).then(()=>check(true)).catch(e=>{console.error(e);process.exit(1)});
