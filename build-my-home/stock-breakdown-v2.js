(()=>{let st=document.createElement('style');st.textContent='.product{content-visibility:auto;contain-intrinsic-size:360px}.stock-mini-v2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px 10px;margin:9px 0 8px;padding:8px 9px;border:1px solid #ece6de;border-radius:11px;background:#faf9f7}.stock-mini-v2 span,.stock-mini-v2 b{font-size:10px;line-height:1.25;color:#655f58;font-weight:600}.stock-mini-v2 b{font-weight:800;color:#171717;margin-left:3px}.stock-asof-v2{font-size:10px;color:#8a8177;margin:-2px 0 10px}';document.head.appendChild(st);
const U='https://jmnnesumjpkraugtzdkl.supabase.co',K='sb_publishable__CO_CJqvrVqG-LClfcD_Wg_CVdZZZU8';let M=new Map;
const N=s=>{let x=String(s||'').split('.')[0].toUpperCase().replace(/[^A-Z0-9]/g,'');return x.startsWith('S3NQ')?'S3Q'+x.slice(4):x};
const F=m=>{let k=N(m);if(M.has(k))return M.get(k);for(const[r,v]of M)if(r.startsWith(k)||k.startsWith(r))return v};
const Q=v=>Math.round(Number(v)||0);
const B=s=>!s?'<div class="stock-mini-v2">Stock not listed</div>':'<div class="stock-mini-v2"><span>Opening stock <b>'+Q(s.opening_stock)+'</b></span><span>West Malaysia (AL8) <b>'+Q(s.al8_balance)+'</b></span><span>Sabah <b>'+Q(s.al2_balance)+'</b></span><span>Sarawak <b>'+Q(s.al3_balance)+'</b></span></div>';
function P(){
  document.querySelectorAll('#products .product').forEach(c=>{
    const m=c.querySelector('.pbody h3')?.textContent?.trim(),p=c.querySelector('.psub');if(!m||!p)return;
    const s=F(m),sig=[m,Q(s?.opening_stock),Q(s?.al8_balance),Q(s?.al2_balance),Q(s?.al3_balance)].join('|');
    if(c.dataset.stockSig===sig)return;
    c.dataset.stockSig=sig;
    c.querySelector('.stock-badge')?.remove();
    let box=c.querySelector('.stock-mini-v2');
    if(box) box.outerHTML=B(s); else p.insertAdjacentHTML('afterend',B(s));
  });
}
function D(){
  const m=document.getElementById('modalModel')?.textContent?.trim(),t=document.getElementById('modalStock');if(!m||!t)return;
  const s=F(m),sig=[m,Q(s?.opening_stock),Q(s?.al8_balance),Q(s?.al2_balance),Q(s?.al3_balance)].join('|');
  if(t.dataset.stockSig===sig)return;t.dataset.stockSig=sig;
  t.innerHTML=B(s)+(s?.as_of_date?'<div class="stock-asof-v2">As of '+s.as_of_date+'</div>':'');
}
document.addEventListener('DOMContentLoaded',async()=>{
  const p=document.getElementById('products'),d=document.getElementById('modal');
  if(p)new MutationObserver(()=>requestAnimationFrame(P)).observe(p,{childList:true});
  if(d)new MutationObserver(()=>{if(d.open)requestAnimationFrame(D)}).observe(d,{attributes:true,attributeFilter:['open']});
  try{
    const r=await fetch(U+'/rest/v1/rpc/get_public_stock_v4',{method:'POST',headers:{apikey:K,Authorization:'Bearer '+K,'Content-Type':'application/json'},body:'{}',cache:'no-store'});
    if(!r.ok)throw new Error('HTTP '+r.status);
    const a=await r.json();M=new Map(a.map(x=>[N(x.model_code),x]));requestAnimationFrame(P);
  }catch(e){console.warn('stock breakdown',e)}
});
})();