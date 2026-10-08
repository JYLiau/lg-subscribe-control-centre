(() => {
'use strict';
const SUPABASE_URL='https://jmnnesumjpkraugtzdkl.supabase.co';
const SUPABASE_KEY='sb_publishable__CO_CJqvrVqG-LClfcD_Wg_CVdZZZU8';
const CATALOG=(window.LG_CATALOG||[]).map((p,i)=>({...p,order:i}));
const icons={'Aircond':'❄️','Laundry':'🧺','Fridge':'🧊','Air Purifier':'🌿','Water Purifier':'💧','TV':'📺'};
const COMBO_PRESETS=[
  {id:'setA',tag:'SET A',name:'Sejuk + Segar',desc:'1.0HP Aircond + 493L Fridge',items:[{id:'ac1',plan:0},{id:'ref1',plan:0}]},
  {id:'setB',tag:'SET B',name:'Segar + Laundry',desc:'493L Fridge + 12kg Washer',items:[{id:'ref1',plan:0},{id:'lau1',plan:0}]},
  {id:'setC',tag:'SET C',name:'Sejuk + Laundry',desc:'1.0HP Aircond + 12kg Washer',items:[{id:'ac1',plan:0},{id:'lau1',plan:0}]},
  {id:'setD',tag:'SET D',name:'Whole Home Trio',desc:'Aircond + Fridge + Washer',items:[{id:'ac1',plan:0},{id:'ref1',plan:0},{id:'lau1',plan:0}]},
  {id:'setE',tag:'SET E',name:'Laundry Duo',desc:'12kg Washer + 10kg Dryer',items:[{id:'lau1',plan:0},{id:'lau2',plan:0}]}
];
let activeCat='All',cart=[],activeProduct=null,chosenPlan=null,chosenPromo='standard',stocks=new Map(),stockLoaded=false,activeComboPreset=null,comboDraft=[];
const $=id=>document.getElementById(id);
const money=n=>'RM'+Math.max(0,Math.round(Number(n)||0)).toLocaleString('en-MY');
const baseCode=s=>{
  let x=String(s||'').split('.')[0].toUpperCase().replace(/[^A-Z0-9]/g,'');
  if(x.startsWith('S3NQ')) x='S3Q'+x.slice(4);
  return x;
};
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const minPrice=p=>Math.min(...p.plans.map(x=>Number(x.monthly)||999999));
const stockFor=p=>{
  const k=baseCode(p.code);
  if(stocks.has(k))return stocks.get(k);
  for(const [sk,v] of stocks){
    if(sk.startsWith(k)||k.startsWith(sk))return v;
  }
  return null;
};
const stopSubmission=p=>String(stockFor(p)?.submission_status||'').toLowerCase().includes('stop');
const icon=p=>icons[p.category]||'LG';
function stockBadge(p){const s=stockFor(p);if(!s)return stockLoaded?'<span class="stock-badge loading">Stock not listed</span>':'<span class="stock-badge loading">Stock: syncing…</span>';const n=Math.max(0,Math.round(Number(s.total_stock)||0));const opening=Math.max(0,Math.round(Number(s.opening_stock)||0));if(n>0){const c=n<=3?'low':'good';return '<span class="stock-badge '+c+'">'+(n<=3?'Low stock: '+n:'Stock: '+n)+'</span>';}if(opening>0)return '<span class="stock-badge low">Opening stock: '+opening+'</span>';return '<span class="stock-badge out">Out of stock</span>';}
function visual(p){
  const src=p.imageData||p.imageUrl||'';
  return src?'<img loading="lazy" decoding="async" referrerpolicy="no-referrer" src="'+src+'" alt="'+esc(p.name)+'" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'grid\'"><div class="generic-icon" style="display:none">'+icon(p)+'</div>':'<div class="generic-icon">'+icon(p)+'</div>';
}
function comboPresetData(preset){
  const items=preset.items.map(x=>{const product=CATALOG.find(p=>p.id===x.id);if(!product)return null;return{product,plan:product.plans[x.plan]||product.plans[0]};}).filter(Boolean);
  const monthly=items.reduce((sum,x)=>sum+(Number(x.plan.monthly)||0),0);
  const blocked=items.some(x=>stopSubmission(x.product));
  return{items,monthly,blocked};
}
function renderComboMenu(){
  const el=$('comboMenu');if(!el)return;
  el.innerHTML=COMBO_PRESETS.map(p=>{
    const d=comboPresetData(p);
    const pics=d.items.map(x=>'<div class="combo-thumb">'+visual(x.product)+'</div>').join('');
    return '<article class="combo-card '+(d.blocked?'disabled':'')+'">'+
      '<div class="combo-tag">'+esc(p.tag)+'</div>'+
      '<div class="combo-pics">'+pics+'</div>'+
      '<h3>'+esc(p.name)+'</h3>'+
      '<p>'+esc(p.desc)+'</p>'+
      '<div class="combo-price"><span>RM</span><b>'+Math.round(d.monthly)+'</b><em>/bulan</em></div>'+
      '<small>Dari pelan standard · '+d.items.length+' produk · boleh ubah tempoh/servis/promosi</small>'+
      '<button class="combo-pick" data-combo="'+p.id+'" '+(d.blocked?'disabled':'')+'>'+(d.blocked?'Tidak tersedia':'Pilih & ubah suai')+'</button>'+
    '</article>';
  }).join('');
  el.querySelectorAll('.combo-pick:not(:disabled)').forEach(b=>b.onclick=()=>openComboRefine(b.dataset.combo));
}
function comboPlanFor(d){
  return d.product.plans.find(p=>Number(p.years)===Number(d.years)&&p.service===d.service)
    || d.product.plans.find(p=>Number(p.years)===Number(d.years))
    || d.product.plans[0];
}
function comboEligibleDraft(){
  return comboDraft.filter(x=>x.promo==='combo10').length>=2;
}
function comboDraftMonthly(item,month=1){
  const plan=comboPlanFor(item);let m=Number(plan?.monthly)||0;
  if(item.promo==='half9'&&month<=9)m*=.5;
  if(item.promo==='combo10'&&comboEligibleDraft())m=Math.max(0,m-10);
  return m;
}
function openComboRefine(id){
  const preset=COMBO_PRESETS.find(x=>x.id===id);if(!preset)return;
  const d=comboPresetData(preset);
  if(d.blocked)return toast('Set ini mengandungi model yang tidak menerima submission sekarang.');
  activeComboPreset=preset;
  comboDraft=d.items.map(x=>({product:x.product,years:Number(x.plan.years),service:x.plan.service,promo:'standard'}));
  $('comboModalTag').textContent=preset.tag;
  $('comboModalTitle').textContent=preset.name;
  $('comboModalSub').textContent=preset.desc;
  renderComboRefine();
  $('comboModal').showModal();
}
window.closeComboModal=()=>{$('comboModal').close();activeComboPreset=null;comboDraft=[];};
function renderComboRefine(){
  const el=$('comboRefineItems');if(!el)return;
  el.innerHTML=comboDraft.map((d,i)=>{
    const years=[...new Set(d.product.plans.map(p=>Number(p.years)))].sort((a,b)=>a-b);
    if(!years.includes(Number(d.years)))d.years=years[0];
    const services=[...new Set(d.product.plans.filter(p=>Number(p.years)===Number(d.years)).map(p=>p.service))];
    if(!services.includes(d.service))d.service=services[0];
    const plan=comboPlanFor(d);
    return '<article class="combo-refine-card">'+
      '<div class="combo-refine-product"><div class="combo-refine-img">'+visual(d.product)+'</div><div><b>'+esc(d.product.code)+'</b><span>'+esc(d.product.name)+'</span><strong>'+money(plan.monthly)+'/bulan standard</strong></div></div>'+
      '<div class="combo-refine-fields">'+
        '<label>Tempoh<select class="select combo-years" data-i="'+i+'">'+years.map(y=>'<option value="'+y+'" '+(Number(d.years)===y?'selected':'')+'>'+y+' tahun</option>').join('')+'</select></label>'+
        '<label>Servis<select class="select combo-service" data-i="'+i+'">'+services.map(v=>'<option value="'+esc(v)+'" '+(d.service===v?'selected':'')+'>'+esc(v)+'</option>').join('')+'</select></label>'+
        '<label>Promosi<select class="select combo-promo" data-i="'+i+'">'+d.product.promos.map(p=>'<option value="'+p.id+'" '+(d.promo===p.id?'selected':'')+'>'+esc(p.label)+'</option>').join('')+'</select></label>'+
      '</div>'+
    '</article>';
  }).join('');
  el.querySelectorAll('.combo-years').forEach(x=>x.onchange=()=>{
    const i=Number(x.dataset.i),d=comboDraft[i];d.years=Number(x.value);
    const services=d.product.plans.filter(p=>Number(p.years)===d.years).map(p=>p.service);
    d.service=services[0];renderComboRefine();
  });
  el.querySelectorAll('.combo-service').forEach(x=>x.onchange=()=>{comboDraft[Number(x.dataset.i)].service=x.value;updateComboRefineSummary();});
  el.querySelectorAll('.combo-promo').forEach(x=>x.onchange=()=>{comboDraft[Number(x.dataset.i)].promo=x.value;updateComboRefineSummary();});
  updateComboRefineSummary();
}
function updateComboRefineSummary(){
  const comboCount=comboDraft.filter(x=>x.promo==='combo10').length;
  const err=comboCount===1?'RM10 OFF combo perlukan sekurang-kurangnya 2 produk dalam set ini yang kedua-duanya memilih RM10 OFF combo.':'';
  $('comboRefineError').textContent=err;
  $('comboRefineError').classList.toggle('show',!!err);
  const total=comboDraft.reduce((a,x)=>a+comboDraftMonthly(x,1),0);
  $('comboRefineMonthly').textContent=money(total);
  $('comboAddBtn').disabled=!!err;
}
function addRefinedCombo(){
  if(!activeComboPreset||!comboDraft.length)return;
  if(comboDraft.filter(x=>x.promo==='combo10').length===1){updateComboRefineSummary();return;}
  const seed=Date.now();
  cart.push(...comboDraft.map((d,i)=>({key:seed+i+Math.random(),product:d.product,plan:{...comboPlanFor(d)},promo:d.promo,qty:1})));
  const name=activeComboPreset.name;
  closeComboModal();renderCart();scrollToPackage();toast(name+' ditambah ke pakej');
}
function renderCats(){const cats=['All',...new Set(CATALOG.map(x=>x.category))];$('catRow').innerHTML=cats.map(c=>'<button class="cat '+(c===activeCat?'active':'')+'" data-cat="'+esc(c)+'">'+esc(c)+'</button>').join('');$('catRow').querySelectorAll('.cat').forEach(b=>b.onclick=()=>{activeCat=b.dataset.cat;renderCats();renderProducts();});}
function visibleProducts(){const q=($('search')?.value||'').trim().toLowerCase(),sort=$('sort')?.value||'featured';let rows=CATALOG.filter(p=>!stopSubmission(p)&&(activeCat==='All'||p.category===activeCat)&&(!q||((p.code+' '+p.name+' '+p.category).toLowerCase().includes(q))));if(sort==='price')rows.sort((a,b)=>minPrice(a)-minPrice(b));else if(sort==='model')rows.sort((a,b)=>a.code.localeCompare(b.code));else rows.sort((a,b)=>a.order-b.order);return rows;}
function renderProducts(){const rows=visibleProducts();$('catalogCount').textContent=rows.length+' model';$('products').innerHTML=rows.map(p=>{const s=stockFor(p),n=s?Math.max(0,Math.round(Number(s.total_stock)||0)):null,out=n===0;return '<article class="product '+(out?'unavailable':'')+'"><div class="pvisual">'+stockBadge(p)+visual(p)+'</div><div class="pbody"><div class="pcat">'+esc(p.category)+'</div><h3>'+esc(p.code)+'</h3><div class="psub">'+esc(p.name)+'</div><span class="lifecycle current">Current selection</span><div class="price"><div><small>From</small><strong>'+money(minPrice(p))+'</strong><em>/month</em></div></div><button class="addbtn" data-id="'+p.id+'">View plans</button></div></article>';}).join('');$('products').querySelectorAll('.addbtn').forEach(b=>b.onclick=()=>openProduct(b.dataset.id));}
function openProduct(id){activeProduct=CATALOG.find(x=>x.id===id);if(!activeProduct)return;chosenPlan=activeProduct.plans[0];chosenPromo='standard';$('qtyInput').value=1;$('modalModel').textContent=activeProduct.code;$('modalSub').textContent=activeProduct.name;const s=stockFor(activeProduct);$('modalStock').innerHTML=s?'Current stock: <b>'+Math.round(Number(s.total_stock)||0)+'</b> · Opening: <b>'+Math.round(Number(s.opening_stock)||0)+'</b><br><span style="font-size:11px">AL2 '+Math.round(Number(s.al2_stock)||0)+' / opening '+Math.round(Number(s.al2_opening)||0)+' · AL3 '+Math.round(Number(s.al3_stock)||0)+' / opening '+Math.round(Number(s.al3_opening)||0)+' · AL8 '+Math.round(Number(s.al8_stock)||0)+' / opening '+Math.round(Number(s.al8_opening)||0)+(s.as_of_date?' · As of '+s.as_of_date:'')+'</span>':'Stock data syncing…';renderPlans();renderPromos();$('modal').showModal();}
window.closeModal=()=>$('modal').close();
window.stepQty=d=>{const q=$('qtyInput');q.value=Math.max(1,Math.min(9,(Number(q.value)||1)+d));};
function renderPlans(){$('planGrid').innerHTML=activeProduct.plans.map((p,i)=>'<button class="plan-card '+(p===chosenPlan?'active':'')+'" data-i="'+i+'"><b>'+p.years+' years</b><span>'+esc(p.service)+'</span><strong>'+money(p.monthly)+'/month</strong></button>').join('');$('planGrid').querySelectorAll('.plan-card').forEach(b=>b.onclick=()=>{chosenPlan=activeProduct.plans[Number(b.dataset.i)];renderPlans();});}
function renderPromos(){$('promoGrid').innerHTML=activeProduct.promos.map(p=>'<button class="promo-card '+(p.id===chosenPromo?'active':'')+'" data-id="'+p.id+'"><b>'+esc(p.label)+'</b><span>'+(p.id==='half9'?'Cannot be combined with RM10 OFF combo on the same item.':p.id==='combo10'?'Requires at least 2 products/orders, and both must select RM10 OFF combo. Cannot mix one combo item with a 50% OFF item.':'No introductory discount')+'</span></button>').join('');$('promoGrid').querySelectorAll('.promo-card').forEach(b=>b.onclick=()=>{chosenPromo=b.dataset.id;renderPromos();});}
function comboLineCount(){return cart.filter(x=>x.promo==='combo10').length;}
function comboEligible(){return comboLineCount()>=2;}
function promoLabelFor(item){const base=(item.product.promos.find(p=>p.id===item.promo)||{}).label||'';return item.promo==='combo10'&&!comboEligible()?base+' — not active (need 2 combo items)':base;}
function monthlyFor(item,month){let m=Number(item.plan.monthly)||0;if(item.promo==='half9'&&month<=9)m*=.5;if(item.promo==='combo10'&&comboEligible())m=Math.max(0,m-10);return m*item.qty;}
function addActive(){if(!activeProduct||!chosenPlan)return;const qty=Math.max(1,Math.min(9,Number($('qtyInput').value)||1));cart.push({key:Date.now()+Math.random(),product:activeProduct,plan:{...chosenPlan},promo:chosenPromo,qty});closeModal();renderCart();toast(chosenPromo==='combo10'&&!comboEligible()?'Added. RM10 combo needs another item using the same RM10 combo package.':'Added to package');}
function totalUnits(){return cart.reduce((a,x)=>a+x.qty,0);}
function renderCart(){const units=totalUnits();$('cartUnits').textContent=units+' unit';$('selectedCount').textContent=units+' product selected';if(!cart.length){$('cartItems').innerHTML='<div class="room-empty" style="padding:16px">No products yet.</div>';$('roomGrid').innerHTML='<div class="room-empty"><b>Start with one appliance</b><br>Select a product below to build a package for your home.</div>';$('currentMonthly').textContent='RM0';$('scheduleRows').innerHTML='';$('saving').textContent='RM0';$('contractTotal').textContent='RM0';budgetCheck();syncUrl(false);return;}$('cartItems').innerHTML=cart.map((x,i)=>'<div class="cart-item"><div><b>'+esc(x.product.code)+'</b><span>'+x.qty+' × '+x.plan.years+'Y · '+esc(x.plan.service)+'</span><small>'+esc((x.product.promos.find(p=>p.id===x.promo)||{}).label||'')+'</small></div><button data-i="'+i+'" class="remove">×</button></div>').join('');$('cartItems').querySelectorAll('.remove').forEach(b=>b.onclick=()=>{cart.splice(Number(b.dataset.i),1);renderCart();});$('roomGrid').innerHTML=cart.map(x=>'<div class="room-item"><div class="qtydot">×'+x.qty+'</div><div class="miniimg">'+visual(x.product)+'</div><b>'+esc(x.product.code)+'</b><span>'+esc(x.product.name)+'</span></div>').join('');$('currentMonthly').textContent=money(cart.reduce((a,x)=>a+monthlyFor(x,1),0));renderSchedule();budgetCheck();syncUrl(false);}
function renderSchedule(){const units=totalUnits(),maxMonths=Math.max(...cart.map(x=>x.plan.years*12)),cuts=new Set([1,maxMonths+1]);cart.forEach(x=>{if(x.promo==='half9')cuts.add(10);cuts.add(x.plan.years*12+1);});const pts=[...cuts].filter(n=>n>=1&&n<=maxMonths+1).sort((a,b)=>a-b);let rows=[],total=0,standard=0;for(let i=0;i<pts.length-1;i++){const a=pts[i],b=pts[i+1]-1;if(a>b)continue;const m=cart.reduce((s,x)=>a<=x.plan.years*12?s+monthlyFor(x,a):s,0),normal=cart.reduce((s,x)=>a<=x.plan.years*12?s+(Number(x.plan.monthly)||0)*x.qty:s,0),months=b-a+1;total+=m*months;standard+=normal*months;rows.push('<div class="schedule-row"><span>Month '+a+(b>a?'–'+b:'')+'</span><b>'+money(m)+'/month</b></div>');}$('scheduleRows').innerHTML=rows.join('')+(comboLineCount()===1?'<div class="schedule-row combo-warning"><span>RM10 OFF combo</span><b>Not active — add 1 more item using RM10 OFF combo</b></div>':'');$('saving').textContent=money(Math.max(0,standard-total));$('contractTotal').textContent=money(total);}
function budgetCheck(){const budget=Number($('budget')?.value)||0,cur=Number($('currentMonthly')?.textContent.replace(/[^\d.]/g,''))||0,e=$('budgetResult');if(!cart.length){e.textContent='Build your package to compare with budget.';e.className='budget-result';return;}if(cur<=budget){e.textContent='Within budget by '+money(budget-cur)+'/month';e.className='budget-result ok';}else{e.textContent='Over budget by '+money(cur-budget)+'/month';e.className='budget-result over';}}
async function loadStock(){try{const r=await fetch(SUPABASE_URL+'/rest/v1/rpc/get_public_stock_v4',{method:'POST',headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY,'Content-Type':'application/json'},body:'{}'});if(!r.ok)throw new Error('HTTP '+r.status);const rows=await r.json();window.__LG_PUBLIC_STOCK_ROWS__=rows;stocks=new Map(rows.map(x=>[baseCode(x.model_code),x]));stockLoaded=true;window.dispatchEvent(new Event('lg-stock-ready'));const dates=rows.map(x=>x.as_of_date).filter(Boolean).sort(),d=dates.at(-1)||'latest';$('liveDot').className='live-dot ok';$('liveText').textContent='Live stock connected';$('stockStamp').textContent='Stock synced · '+d;$('stockInfo').textContent='Current stock counts positive balances in AL2 + AL3 + AL8. If current stock is zero, the card shows the report opening stock instead. Refresh after a Control Centre stock upload for the latest figures.';renderCats();renderProducts();renderComboMenu();}catch(e){console.warn(e);stockLoaded=true;$('liveDot').className='live-dot err';$('liveText').textContent='Stock temporarily unavailable';$('stockStamp').textContent='Stock sync unavailable';renderProducts();renderComboMenu();}}
function payload(){return cart.map(x=>({id:x.product.id,plan:x.product.plans.findIndex(p=>p.years===x.plan.years&&p.service===x.plan.service&&p.monthly===x.plan.monthly),promo:x.promo,qty:x.qty}));}
function syncUrl(push=true){const u=new URL(location.href);if(cart.length)u.searchParams.set('pkg',btoa(unescape(encodeURIComponent(JSON.stringify(payload())))).replace(/=+$/,''));else u.searchParams.delete('pkg');if(push)history.pushState({},'',u);else history.replaceState({},'',u);}
function loadFromUrl(){const v=new URL(location.href).searchParams.get('pkg');if(!v)return;try{const pad=v+'==='.slice((v.length+3)%4),data=JSON.parse(decodeURIComponent(escape(atob(pad))));cart=data.map(x=>{const p=CATALOG.find(y=>y.id===x.id);if(!p)return null;const plan=p.plans[x.plan]||p.plans[0];return{key:Date.now()+Math.random(),product:p,plan:{...plan},promo:p.promos.some(z=>z.id===x.promo)?x.promo:'standard',qty:Math.max(1,Math.min(9,Number(x.qty)||1))};}).filter(Boolean);}catch(e){console.warn('bad package link',e);}}
function sharePackage(){syncUrl(false);navigator.clipboard?.writeText(location.href).then(()=>toast('Package link copied')).catch(()=>prompt('Copy this link',location.href));}
function wa(){const lines=['Hi Jason, saya berminat dengan pakej LG Subscribe ini:'];cart.forEach(x=>lines.push('• '+x.qty+'x '+x.product.code+' — '+x.plan.years+'Y '+x.plan.service+' — '+((x.product.promos.find(p=>p.id===x.promo)||{}).label||'')));lines.push('Anggaran sekarang: '+$('currentMonthly').textContent+'/bulan',location.href);window.open('https://wa.me/601159726619?text='+encodeURIComponent(lines.join('\n')),'_blank');}
function toast(t){const e=$('toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),1800);}
window.scrollToCatalog=()=>$('catalogSection').scrollIntoView({behavior:'smooth',block:'start'});
window.scrollToPackage=()=>$('packageSide').scrollIntoView({behavior:'smooth',block:'start'});
document.addEventListener('DOMContentLoaded',()=>{renderCats();renderComboMenu();loadFromUrl();renderProducts();renderCart();loadStock();$('search').addEventListener('input',renderProducts);$('sort').addEventListener('change',renderProducts);$('budget').addEventListener('input',budgetCheck);$('modalAdd').onclick=addActive;$('comboAddBtn').onclick=addRefinedCombo;$('shareBtn').onclick=sharePackage;$('waBtn').onclick=wa;$('resetBtn').onclick=()=>{cart=[];renderCart();toast('Package cleared');};$('modal').addEventListener('click',e=>{if(e.target===$('modal'))closeModal();});$('comboModal').addEventListener('click',e=>{if(e.target===$('comboModal'))closeComboModal();});});
})();