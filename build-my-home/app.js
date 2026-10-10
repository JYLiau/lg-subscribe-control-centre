(() => {
'use strict';
const SUPABASE_URL='https://jmnnesumjpkraugtzdkl.supabase.co';
const SUPABASE_KEY='sb_publishable__CO_CJqvrVqG-LClfcD_Wg_CVdZZZU8';
const DEFAULT_HALF9_PROMO={id:'half9',label:'50% OFF 9 bulan',type:'percent',value:50,months:9};
const CATALOG=(window.LG_CATALOG||[]).map((p,i)=>{
  const promos=Array.isArray(p.promos)?p.promos.map(x=>x.id==='half9'?{...x,...DEFAULT_HALF9_PROMO,validFrom:null,validTo:null}:x):[];
  if(!promos.some(x=>x.id==='half9'))promos.splice(Math.min(1,promos.length),0,{...DEFAULT_HALF9_PROMO});
  return {...p,promos,order:i};
});
const icons={'Aircond':'❄️','Laundry':'🧺','Fridge':'🧊','Air Purifier':'🌿','Water Purifier':'💧','TV':'📺','Dishwasher':'🍽️','Soundbar':'🔊','Vacuum':'🧹','Styler':'👔','Microwave':'♨️','Massage Recliner':'🪑','Monitor':'🖥️'};
const COMBO_PRESETS=[
  {id:'setA',tag:'SET A',name:'Sejuk + Segar',desc:'1.0HP Aircond + 493L Fridge',items:[{id:'ac1',plan:0},{id:'ref1',plan:0}]},
  {id:'setB',tag:'SET B',name:'Segar + Laundry',desc:'493L Fridge + 12kg Washer',items:[{id:'ref1',plan:0},{id:'lau1',plan:0}]},
  {id:'setC',tag:'SET C',name:'Sejuk + Laundry',desc:'1.0HP Aircond + 12kg Washer',items:[{id:'ac1',plan:0},{id:'lau1',plan:0}]},
  {id:'setD',tag:'SET D',name:'Whole Home Trio',desc:'Aircond + Fridge + Washer',items:[{id:'ac1',plan:0},{id:'ref1',plan:0},{id:'lau1',plan:0}]},
  {id:'setE',tag:'SET E',name:'Laundry Duo',desc:'12kg Washer + 10kg Dryer',items:[{id:'lau1',plan:0},{id:'lau2',plan:0}]}
];
const I18N={
ms:{
  brandSub:'Bina Rumah · Bilik Pameran Pelanggan',navProducts:'Produk',navPackage:'Pakej saya',liveConnecting:'Menyambung stok Control Centre…',
  heroEyebrow:'● Bilik pameran awam · tiada log masuk diperlukan',heroTitle:'Rumah anda.<br>Pilihan anda.',heroText:'Pilih produk, bandingkan pelan 5 atau 7 tahun, cuba promosi, dan lihat jadual bayaran pakej anda — semuanya dalam satu halaman.',
  agentNote:'Harga & stok dipaparkan sebagai rujukan. Jason akan sahkan promosi, kelayakan dan stok akhir sebelum permohonan.',
  popularTitle:'PAKEJ POPULAR',popularIntro:'Pilih pakej cadangan sebagai titik mula, kemudian tambah atau buang produk mengikut keperluan.',popularTiny:'Pilih pakej → ubah tempoh, servis & promosi',popularNote:'Pakej cadangan ialah titik mula. Sebelum tambah ke pakej, anda boleh pilih tempoh 5/7 tahun, servis dan promosi bagi setiap produk.',
  homeTitle:'PAKEJ RUMAH ANDA',homeIntro:'Susunan responsif — produk ke-3 dan seterusnya kekal sejajar.',
  catalogTitle:'Pilih perkakas anda',catalogIntro:'Harga kad ialah harga pelan standard terendah. Promosi dipilih semasa tambah produk.',priceRef:'Harga rujukan · Oktober 2026',
  searchPH:'Cari model atau produk…',sortFeatured:'Susun: Disyorkan',sortPrice:'Harga terendah',sortModel:'Model A–Z',stockConnecting:'Stok sedang disambungkan…',
  shareTitle:'Pakej khas untuk anda',shareText:'Produk, tempoh, servis dan promosi di bawah telah dipilih berdasarkan permintaan anda.',editChoice:'Ubah pilihan',
  packageTitle:'PAKEJ PILIHAN ANDA',packageIntro:'Bayaran berubah ikut promosi & tempoh.',selectedProducts:'Produk dipilih',paymentNow:'Bayaran sekarang',budget:'Bajet bulanan',
  schedule:'Jadual bayaran',savings:'Jumlah penjimatan',contract:'Jumlah kontrak',askWa:'Tanya Jason di WhatsApp',copyLink:'Salin link untuk customer',clearPackage:'Kosongkan pakej',
  disclaimer:'Promosi 50% dan RM10 combo ialah pilihan berasingan dan tidak digabungkan. RM10 combo hanya aktif apabila sekurang-kurangnya 2 produk/order kedua-duanya memilih pakej RM10 combo. Stok boleh berubah selepas laporan terakhir.',
  liveStockTitle:'Stok live daripada Control Centre',liveStockText:'Setiap kad memaparkan jumlah baki positif AL2 + AL3 + AL8 daripada sumber stok yang sama dengan LG Subscribe Control Centre.',
  footer:'Jason Yang · 011-5972 6619 · LGM122989<br>Imej produk daripada bahan rujukan yang dibekalkan. T&C apply.',
  comboHelp:'Pilih tempoh, servis dan promosi untuk setiap produk. Harga pakej akan dikira semula sebelum ditambah.',comboEstimate:'Anggaran bayaran bulan pertama',comboAdd:'Tambah set ke pakej',
  choosePlan:'1. Pilih pelan',choosePromo:'2. Pilih promosi',qty:'Kuantiti',copy:'Salin ayat',copyTitle:'Salin copywriting untuk pelan & promosi dipilih',addPackage:'Tambah ke pakej',
  all:'Semua',years:'tahun',month:'bulan',months:'bulan',from:'Dari',viewPlans:'Lihat pelan',pricePending:'Harga akan dikemas kini',planPending:'Pelan belum tersedia',currentSelection:'Pilihan semasa',availableLateNov:'Tersedia hujung November 2026',
  noProducts:'Belum ada produk.',startAppliance:'Mulakan dengan satu perkakas',startAppliance2:'Pilih produk di bawah untuk bina pakej rumah anda.',
  productSelected:'produk dipilih',unit:'unit',model:'model',standard:'standard',period:'Tempoh',service:'Servis',promotion:'Promosi',
  notAvailable:'Tidak tersedia',chooseCustomize:'Pilih & ubah suai',standardPlanFrom:'Dari pelan standard',canCustomize:'boleh ubah tempoh/servis/promosi',
  comboNeed2:'RM10 OFF combo perlukan sekurang-kurangnya 2 produk/order dalam pakej yang kedua-duanya memilih RM10 OFF combo.',
  addedPackage:'Ditambah ke pakej',comboAdded:'ditambah ke pakej',comboNeedAnother:'Ditambah. RM10 combo perlukan satu lagi item dengan pakej RM10 OFF combo yang sama.',
  stockNotListed:'Stok tidak disenaraikan',stockSyncing:'Stok: sedang diselaraskan…',lowStock:'Stok rendah: {n}',stock:'Stok: {n}',openingStock:'Stok pembukaan: {n}',outStock:'Tiada stok',
  currentStock:'Stok semasa',opening:'Stok pembukaan',openingAl8:'Stok pembukaan',westMalaysia:'Semenanjung Malaysia',sabah:'Sabah',sarawak:'Sarawak',asOf:'Setakat',stockDataSync:'Data stok sedang diselaraskan…',
  promoStandard:'Harga standard',promoHalf9:'50% OFF 9 bulan',promoCombo10:'RM10 OFF combo',promoOctober:'Promosi Oktober / Evergreen · Jason sahkan',promoDw99:'Promosi khas RM99/bulan',promoDw99Desc:'Sah untuk permohonan 1 Okt–31 Dis 2026. Harga biasa RM150/bulan.',
  promoStandardDesc:'Tiada diskaun pengenalan.',promoHalf9Desc:'Promosi asas LG Subscribe: 50% OFF untuk 9 bulan pertama. Tidak boleh digabungkan dengan RM10 OFF combo pada item yang sama.',promoCombo10Desc:'Perlu sekurang-kurangnya 2 produk/order dan kedua-duanya mesti pilih RM10 OFF combo. Tidak boleh campur satu item combo dengan item 50% OFF.',promoOctoberDesc:'Helaian pelancaran mengesahkan Promosi Oktober & Evergreen tetapi kadar/tempoh diskaun tidak dinyatakan. Jason akan sahkan tawaran semasa.',
  comboInactive:'belum aktif (perlu 2 item combo)',monthWord:'Bulan',notActiveAdd:'Belum aktif — tambah 1 lagi item menggunakan RM10 OFF combo',
  withinBudget:'Dalam bajet sebanyak {amount}/bulan',overBudget:'Melebihi bajet sebanyak {amount}/bulan',buildToCompare:'Bina pakej untuk banding dengan bajet.',
  liveConnected:'Stok live disambungkan',stockSynced:'Stok diselaraskan · {date}',stockInfoFull:'Stok semasa mengira baki positif AL2 + AL3 + AL8. Jika stok semasa sifar, kad memaparkan stok pembukaan laporan. Muat semula selepas kemas kini stok Control Centre untuk angka terkini.',
  liveUnavailable:'Stok sementara tidak tersedia',syncUnavailable:'Penyelarasan stok tidak tersedia',
  addFirst:'Tambah produk dahulu sebelum jana link customer.',linkCopied:'Link customer disalin',copyLinkPrompt:'Salin link customer ini',packageCleared:'Pakej dikosongkan',
  copyDone:'Copywriting disalin',copyFail:'Salin copywriting ini',waIntro:'Hi Jason, saya berminat dengan pakej LG Subscribe ini:',estimateNow:'Anggaran sekarang',
  catAircond:'Penyaman Udara',catLaundry:'Dobi',catFridge:'Peti Sejuk',catAP:'Penapis Udara',catWP:'Penapis Air',catTV:'TV',catDishwasher:'Mesin Basuh Pinggan',
  svcRV:'Regular Visit',svcRV1:'Regular Visit 1x/tahun',svcRV2:'Regular Visit 2x/tahun',svcRV2Y:'Regular Visit setiap 2 tahun',svcSS:'Self-Service',svcCM:'Combine Maintenance',svcSub:'Subscription',
  copyHeadline:'✨ LG Subscribe — {name}',copyModel:'Model: {code}',copyPlan:'Pelan {years} Tahun · {service}',copyNormal:'Harga biasa: {price}/bulan',
  copyHalf9:'🔥 50% OFF untuk 9 bulan pertama: {promo}/bulan\nBulan 10–{end}: {normal}/bulan',
  copyCombo:'🎁 RM10 OFF Combo: {promo}/bulan\n*Aktif apabila sekurang-kurangnya 2 produk/order memilih pakej RM10 OFF combo.',
  copyStandard:'💳 Bayaran bulanan: {normal}/bulan',copyOctober:'🎉 Promosi Oktober / Evergreen tersedia. Kadar promosi semasa akan disahkan oleh Jason.',
  copyPackageIncludes:'Pakej termasuk:',copyDelivery:'🚚 Penghantaran & pemasangan asas percuma',copyServiceLine:'🛠️ Servis: {service}',copyCmKit:'✅️ Kit servis sendiri percuma setiap 6 bulan',copyCmVisit:'✅️ Lawatan juruteknik & servis setiap 12 bulan',copyCTA:'Nak saya semak stok & pakej yang sesuai untuk anda? 😊\nWhatsApp Jason: 011-5972 6619',
  combo_setA_name:'Sejuk + Segar',combo_setA_desc:'Aircond 1.0HP + Peti Sejuk 493L',combo_setB_name:'Segar + Dobi',combo_setB_desc:'Peti Sejuk 493L + Mesin Basuh 12kg',combo_setC_name:'Sejuk + Dobi',combo_setC_desc:'Aircond 1.0HP + Mesin Basuh 12kg',combo_setD_name:'Trio Lengkap Rumah',combo_setD_desc:'Aircond + Peti Sejuk + Mesin Basuh',combo_setE_name:'Duo Dobi',combo_setE_desc:'Mesin Basuh 12kg + Pengering 10kg'
},
en:{
  brandSub:'Build My Home · Customer Showroom',navProducts:'Products',navPackage:'My package',liveConnecting:'Connecting to Control Centre stock…',
  heroEyebrow:'● Public showroom · no login required',heroTitle:'Your home.<br>Your choice.',heroText:'Choose products, compare 5- or 7-year plans, try promotions, and see your package payment schedule — all on one page.',
  agentNote:'Prices & stock are for reference. Jason will confirm the promotion, eligibility and final stock before application.',
  popularTitle:'POPULAR PACKAGES',popularIntro:'Choose a suggested package as a starting point, then add or remove products to suit your needs.',popularTiny:'Choose a package → adjust term, service & promotion',popularNote:'A suggested package is only a starting point. Before adding it, you can choose the 5/7-year term, service and promotion for each product.',
  homeTitle:'YOUR HOME PACKAGE',homeIntro:'Responsive layout — the 3rd product and beyond stay aligned.',
  catalogTitle:'Choose your appliances',catalogIntro:'Card price shows the lowest standard plan. Choose the promotion when adding a product.',priceRef:'Reference pricing · October 2026',
  searchPH:'Search model or product…',sortFeatured:'Sort: Recommended',sortPrice:'Lowest price',sortModel:'Model A–Z',stockConnecting:'Connecting stock…',
  shareTitle:'A package selected for you',shareText:'The products, term, service and promotion below were selected based on your request.',editChoice:'Change selection',
  packageTitle:'YOUR SELECTED PACKAGE',packageIntro:'Payment changes with promotion & term.',selectedProducts:'Selected products',paymentNow:'Payment now',budget:'Monthly budget',
  schedule:'Payment schedule',savings:'Total savings',contract:'Contract total',askWa:'Ask Jason on WhatsApp',copyLink:'Copy customer link',clearPackage:'Clear package',
  disclaimer:'50% promotion and RM10 combo are separate choices and cannot be combined. RM10 combo is active only when at least 2 products/orders both use the RM10 combo package. Stock may change after the latest report.',
  liveStockTitle:'Live stock from Control Centre',liveStockText:'Each card shows positive AL2 + AL3 + AL8 balances from the same source as LG Subscribe Control Centre.',
  footer:'Jason Yang · 011-5972 6619 · LGM122989<br>Product images are from supplied reference materials. T&C apply.',
  comboHelp:'Choose the term, service and promotion for each product. The package price will be recalculated before adding.',comboEstimate:'Estimated first-month payment',comboAdd:'Add set to package',
  choosePlan:'1. Choose plan',choosePromo:'2. Choose promotion',qty:'Quantity',copy:'Copy text',copyTitle:'Copy copywriting for the selected plan & promotion',addPackage:'Add to package',
  all:'All',years:'years',month:'month',months:'months',from:'From',viewPlans:'View plans',pricePending:'Price pending',planPending:'Plan not available yet',currentSelection:'Current selection',availableLateNov:'Available end of November 2026',
  noProducts:'No products yet.',startAppliance:'Start with one appliance',startAppliance2:'Choose a product below to build your home package.',
  productSelected:'products selected',unit:'unit',model:'model',standard:'standard',period:'Term',service:'Service',promotion:'Promotion',
  notAvailable:'Unavailable',chooseCustomize:'Choose & customise',standardPlanFrom:'From standard plan',canCustomize:'term/service/promotion can be changed',
  comboNeed2:'RM10 OFF combo requires at least 2 products/orders in the package, and both must select RM10 OFF combo.',
  addedPackage:'Added to package',comboAdded:'added to package',comboNeedAnother:'Added. RM10 combo needs one more item using the same RM10 OFF combo package.',
  stockNotListed:'Stock not listed',stockSyncing:'Stock: syncing…',lowStock:'Low stock: {n}',stock:'Stock: {n}',openingStock:'Opening stock: {n}',outStock:'Out of stock',
  currentStock:'Current stock',opening:'Opening stock',openingAl8:'Opening stock',westMalaysia:'West Malaysia',sabah:'Sabah',sarawak:'Sarawak',asOf:'As of',stockDataSync:'Stock data syncing…',
  promoStandard:'Standard price',promoHalf9:'50% OFF 9 months',promoCombo10:'RM10 OFF combo',promoOctober:'October / Evergreen promo · Jason confirms',
  promoStandardDesc:'No introductory discount.',promoHalf9Desc:'LG Subscribe baseline offer: 50% OFF for the first 9 months. Cannot be combined with RM10 OFF combo on the same item.',promoCombo10Desc:'Requires at least 2 products/orders and both must select RM10 OFF combo. Cannot mix one combo item with a 50% OFF item.',promoOctoberDesc:'The launch sheet confirms October & Evergreen promotions but does not state the discount amount/duration. Jason will confirm the current offer.',
  comboInactive:'not active (need 2 combo items)',monthWord:'Month',notActiveAdd:'Not active — add 1 more item using RM10 OFF combo',
  withinBudget:'Within budget by {amount}/month',overBudget:'Over budget by {amount}/month',buildToCompare:'Build your package to compare with budget.',
  liveConnected:'Live stock connected',stockSynced:'Stock synced · {date}',stockInfoFull:'Current stock counts positive AL2 + AL3 + AL8 balances. If current stock is zero, the card shows report opening stock. Refresh after a Control Centre stock upload for the latest figures.',
  liveUnavailable:'Stock temporarily unavailable',syncUnavailable:'Stock sync unavailable',
  addFirst:'Add a product before generating a customer link.',linkCopied:'Customer link copied',copyLinkPrompt:'Copy this customer link',packageCleared:'Package cleared',
  copyDone:'Copywriting copied',copyFail:'Copy this copywriting',waIntro:'Hi Jason, I am interested in this LG Subscribe package:',estimateNow:'Estimated now',
  catAircond:'Air Conditioner',catLaundry:'Laundry',catFridge:'Refrigerator',catAP:'Air Purifier',catWP:'Water Purifier',catTV:'TV',catDishwasher:'Dishwasher',
  svcRV:'Regular Visit',svcRV1:'Regular Visit 1x/year',svcRV2:'Regular Visit 2x/year',svcRV2Y:'Regular Visit every 2 years',svcSS:'Self-Service',svcCM:'Combined Maintenance',svcSub:'Subscription',
  copyHeadline:'✨ LG Subscribe — {name}',copyModel:'Model: {code}',copyPlan:'{years}-Year Plan · {service}',copyNormal:'Normal price: {price}/month',
  copyHalf9:'🔥 50% OFF for the first 9 months: {promo}/month\nMonth 10–{end}: {normal}/month',
  copyCombo:'🎁 RM10 OFF Combo: {promo}/month\n*Active when at least 2 products/orders select the RM10 OFF combo package.',
  copyStandard:'💳 Monthly payment: {normal}/month',copyOctober:'🎉 October / Evergreen promotion is available. Jason will confirm the current promotional rate.',
  copyPackageIncludes:'Package includes:',copyDelivery:'🚚 Free delivery & basic installation',copyServiceLine:'🛠️ Service: {service}',copyCmKit:'✅️ Free self-service kit every 6 months',copyCmVisit:'✅️ Technician visit & service every 12 months',copyCTA:'Want me to check current stock and the most suitable package for you? 😊\nWhatsApp Jason: 011-5972 6619',
  combo_setA_name:'Cool + Fresh',combo_setA_desc:'1.0HP Air Conditioner + 493L Refrigerator',combo_setB_name:'Fresh + Laundry',combo_setB_desc:'493L Refrigerator + 12kg Washer',combo_setC_name:'Cool + Laundry',combo_setC_desc:'1.0HP Air Conditioner + 12kg Washer',combo_setD_name:'Whole Home Trio',combo_setD_desc:'Air Conditioner + Refrigerator + Washer',combo_setE_name:'Laundry Duo',combo_setE_desc:'12kg Washer + 10kg Dryer'
},
zh:{
  brandSub:'打造我的家 · 客户展示厅',navProducts:'产品',navPackage:'我的配套',liveConnecting:'正在连接 Control Centre 库存…',
  heroEyebrow:'● 公开展示厅 · 无需登录',heroTitle:'你的家。<br>你的选择。',heroText:'选择产品、比较 5 年或 7 年方案、选择优惠，并查看整套配套的付款时间表 — 一页完成。',
  agentNote:'价格与库存仅供参考。申请前，Jason 会确认最新优惠、资格与最终库存。',
  popularTitle:'热门配套',popularIntro:'先选择推荐组合，再按需要增加或删除产品。',popularTiny:'选择配套 → 调整年限、服务与优惠',popularNote:'推荐配套只是起点。加入前，你可为每件产品选择 5/7 年、服务方案与优惠。',
  homeTitle:'你的家电配套',homeIntro:'响应式排列 — 第 3 件及之后的产品会保持整齐对齐。',
  catalogTitle:'选择你的家电',catalogIntro:'产品卡显示最低标准月费。加入产品时再选择优惠。',priceRef:'参考价格 · 2026 年 10 月',
  searchPH:'搜索型号或产品…',sortFeatured:'排序：推荐',sortPrice:'最低价格',sortModel:'型号 A–Z',stockConnecting:'正在连接库存…',
  shareTitle:'为你挑选的配套',shareText:'以下产品、年限、服务和优惠是根据你的需求预先选择。',editChoice:'修改选择',
  packageTitle:'你选择的配套',packageIntro:'月费会根据优惠与年限变化。',selectedProducts:'已选产品',paymentNow:'目前月费',budget:'每月预算',
  schedule:'付款时间表',savings:'总节省',contract:'合约总额',askWa:'WhatsApp 咨询 Jason',copyLink:'复制客户链接',clearPackage:'清空配套',
  disclaimer:'50% 优惠与 RM10 组合优惠为不同方案，不可叠加。RM10 组合优惠只有在至少 2 件产品/订单都选择 RM10 combo 时才生效。库存以最新报告为准。',
  liveStockTitle:'Control Centre 实时库存',liveStockText:'每张产品卡显示与 LG Subscribe Control Centre 同一来源的 AL2 + AL3 + AL8 正数库存余额。',
  footer:'Jason Yang · 011-5972 6619 · LGM122989<br>产品图片来自所提供的参考资料。须符合条款与条件。',
  comboHelp:'为每件产品选择年限、服务和优惠。加入前会重新计算配套价格。',comboEstimate:'首月预计月费',comboAdd:'加入整套配套',
  choosePlan:'1. 选择方案',choosePromo:'2. 选择优惠',qty:'数量',copy:'复制文案',copyTitle:'复制所选方案与优惠的文案',addPackage:'加入配套',
  all:'全部',years:'年',month:'月',months:'个月',from:'每月低至',viewPlans:'查看方案',currentSelection:'当前可选',availableLateNov:'2026年11月底上市',
  noProducts:'尚未选择产品。',startAppliance:'从一件家电开始',startAppliance2:'从下方选择产品，建立你的家电配套。',
  productSelected:'件产品已选择',unit:'件',model:'型号',standard:'标准价',period:'年限',service:'服务',promotion:'优惠',
  notAvailable:'暂不可用',chooseCustomize:'选择并调整',standardPlanFrom:'标准方案起',canCustomize:'可更改年限/服务/优惠',
  comboNeed2:'RM10 OFF 组合优惠需要至少 2 件产品/订单，而且两件都必须选择 RM10 OFF combo。',
  addedPackage:'已加入配套',comboAdded:'已加入配套',comboNeedAnother:'已加入。RM10 combo 还需要另一件产品选择相同 RM10 OFF combo 才会生效。',
  stockNotListed:'未列出库存',stockSyncing:'库存同步中…',lowStock:'库存偏低：{n}',stock:'库存：{n}',openingStock:'期初库存：{n}',outStock:'无库存',
  currentStock:'当前库存',opening:'期初库存',openingAl8:'期初库存',westMalaysia:'西马',sabah:'沙巴',sarawak:'砂拉越',asOf:'截至',stockDataSync:'库存资料同步中…',
  promoStandard:'标准价格',promoHalf9:'首 9 个月 50% OFF',promoCombo10:'RM10 OFF 组合优惠',promoOctober:'10 月 / Evergreen 优惠 · Jason 确认',
  promoStandardDesc:'没有首期折扣。',promoHalf9Desc:'LG Subscribe 基础优惠：首9个月 50% OFF。同一件产品不可与 RM10 OFF combo 叠加。',promoCombo10Desc:'至少需要 2 件产品/订单，而且两件都必须选择 RM10 OFF combo。不可一件选 combo、另一件选 50% OFF。',promoOctoberDesc:'新品资料确认有 10 月及 Evergreen 优惠，但没有注明折扣金额/期限。Jason 会确认当前优惠。',
  comboInactive:'尚未生效（需 2 件 combo 产品）',monthWord:'第',notActiveAdd:'尚未生效 — 再加入 1 件使用 RM10 OFF combo 的产品',
  withinBudget:'每月比预算少 {amount}',overBudget:'每月超出预算 {amount}',buildToCompare:'先建立配套以比较预算。',
  liveConnected:'实时库存已连接',stockSynced:'库存已同步 · {date}',stockInfoFull:'当前库存以 AL2 + AL3 + AL8 的正数余额计算。如当前库存为 0，产品卡会显示报告的期初库存。Control Centre 上传新库存后刷新即可查看最新数据。',
  liveUnavailable:'库存暂时无法取得',syncUnavailable:'库存同步失败',
  addFirst:'请先加入产品再生成客户链接。',linkCopied:'客户链接已复制',copyLinkPrompt:'复制此客户链接',packageCleared:'配套已清空',
  copyDone:'文案已复制',copyFail:'复制此文案',waIntro:'Hi Jason，我对以下 LG Subscribe 配套有兴趣：',estimateNow:'目前预计',
  catAircond:'空调',catLaundry:'洗衣家电',catFridge:'冰箱',catAP:'空气净化器',catWP:'净水器',catTV:'电视',catDishwasher:'洗碗机',
  svcRV:'定期上门服务',svcRV1:'每年 1 次上门服务',svcRV2:'每年 2 次上门服务',svcRV2Y:'每 2 年 1 次上门服务',svcSS:'自助服务',svcCM:'综合保养',svcSub:'订阅方案',
  copyHeadline:'✨ LG Subscribe — {name}',copyModel:'型号：{code}',copyPlan:'{years} 年方案 · {service}',copyNormal:'原价：{price}/月',
  copyHalf9:'🔥 首 9 个月 50% OFF：{promo}/月\n第 10–{end} 个月：{normal}/月',
  copyCombo:'🎁 RM10 OFF 组合优惠：{promo}/月\n*至少 2 件产品/订单都选择 RM10 OFF combo 后才生效。',
  copyStandard:'💳 月费：{normal}/月',copyOctober:'🎉 可享 10 月 / Evergreen 优惠。当前优惠价格由 Jason 确认。',
  copyPackageIncludes:'配套包括：',copyDelivery:'🚚 免费送货及基本安装',copyServiceLine:'🛠️ 服务：{service}',copyCmKit:'✅️ 每6个月免费提供自助保养套件',copyCmVisit:'✅️ 每12个月提供技师上门检查与保养',copyCTA:'要我帮你查看最新库存和适合的配套吗？😊\nWhatsApp Jason：011-5972 6619',
  combo_setA_name:'凉爽 + 保鲜',combo_setA_desc:'1.0HP 空调 + 493L 冰箱',combo_setB_name:'保鲜 + 洗衣',combo_setB_desc:'493L 冰箱 + 12kg 洗衣机',combo_setC_name:'凉爽 + 洗衣',combo_setC_desc:'1.0HP 空调 + 12kg 洗衣机',combo_setD_name:'全屋三件套',combo_setD_desc:'空调 + 冰箱 + 洗衣机',combo_setE_name:'洗衣双组合',combo_setE_desc:'12kg 洗衣机 + 10kg 烘干机'
}};
let currentLang=(()=>{const q=new URL(location.href).searchParams.get('lang');const s=q||localStorage.getItem('lg-bmh-lang')||'ms';return ['ms','en','zh'].includes(s)?s:'ms';})();
function tr(key,vars={}){let s=(I18N[currentLang]&&I18N[currentLang][key])??I18N.en[key]??key;for(const[k,v]of Object.entries(vars))s=String(s).replaceAll('{'+k+'}',String(v));return s;}
function categoryLabel(c){return c==='Aircond'?tr('catAircond'):c==='Laundry'?tr('catLaundry'):c==='Fridge'?tr('catFridge'):c==='Air Purifier'?tr('catAP'):c==='Water Purifier'?tr('catWP'):c==='TV'?tr('catTV'):c==='Dishwasher'?tr('catDishwasher'):c;}
function serviceLabel(s){return s==='Regular Visit 1x/year'?tr('svcRV1'):s==='Regular Visit 2x/year'?tr('svcRV2'):s==='Regular Visit every 2 years'?tr('svcRV2Y'):s==='Regular Visit'?tr('svcRV'):s==='Self-Service'?tr('svcSS'):s==='Combine Maintenance'?tr('svcCM'):s==='Subscription'?tr('svcSub'):s;}
function promoLabelById(id,fallback=''){return id==='standard'?tr('promoStandard'):id==='half9'?tr('promoHalf9'):id==='half12'?(currentLang==='zh'?'首12个月 50% OFF':currentLang==='en'?'50% OFF 12 months':'50% OFF 12 bulan'):id==='combo10'?tr('promoCombo10'):id==='octevergreen'?tr('promoOctober'):id==='dw99'?tr('promoDw99'):fallback;}
function promoDescById(id,fallback=''){return id==='half9'?tr('promoHalf9Desc'):id==='half12'?(currentLang==='zh'?'首12个月享有 50% 折扣。':currentLang==='en'?'50% OFF for the first 12 months.':'50% OFF untuk 12 bulan pertama.'):id==='combo10'?tr('promoCombo10Desc'):id==='octevergreen'?tr('promoOctoberDesc'):id==='dw99'?tr('promoDw99Desc'):(fallback||tr('promoStandardDesc'));}
function promoLocalized(p,field){
  if(!p)return'';
  const k=currentLang==='zh'?field+'Zh':currentLang==='en'?field+'En':field+'Ms';
  return p[k]??p[field]??'';
}
function promoLabel(p){return promoLabelById(p?.id||'',promoLocalized(p,'label'));}
function promoDescription(p){return promoDescById(p?.id||'',promoLocalized(p,'description'));}
function promoIsLive(p){
  if(!p||p.id==='standard')return true;
  const now=Date.now();
  if(p.validFrom&&now<new Date(p.validFrom+'T00:00:00+08:00').getTime())return false;
  if(p.validTo&&now>new Date(p.validTo+'T23:59:59+08:00').getTime())return false;
  return true;
}
function livePromos(product){
  const live=(product?.promos||[]).filter(p=>promoIsLive(p));
  const hasLiveHalf12=live.some(p=>p.type==='percent'&&Number(p.value)===50&&Number(p.months)===12);
  let out=live.filter(p=>!(hasLiveHalf12&&p.type==='percent'&&Number(p.value)===50&&Number(p.months)===9));
  if(!hasLiveHalf12&&!out.some(p=>p.type==='percent'&&Number(p.value)===50&&Number(p.months)===9)){
    const stdIndex=out.findIndex(p=>p.id==='standard');
    const half9={...DEFAULT_HALF9_PROMO};
    if(stdIndex>=0)out.splice(stdIndex+1,0,half9);else out.unshift(half9);
  }
  return out;
}
function promoObj(product,id){return livePromos(product).find(p=>p.id===id)||{id:'standard',type:'none'};}
function promoPrice(product,plan,promoId,month,{comboActive=true,pairActive=true}={}){
  let m=Number(plan?.monthly)||0;const p=promoObj(product,promoId);
  const within=!p.months||month<=Number(p.months);
  if(p.type==='percent'&&within)m*=1-(Number(p.value)||0)/100;
  if(p.type==='fixed'&&within){
    if(p.id==='combo10'&&!comboActive)return m;
    if(p.id==='airpair15'&&!pairActive)return m;
    m=Math.max(0,m-(Number(p.value)||0));
  }
  if(p.type==='fixedMonthly'&&within)m=Number(p.value)||m;
  return m;
}
function comboName(p){const k='combo_'+p.id+'_name';return I18N[currentLang]?.[k]??I18N.en?.[k]??p.name;}
function comboDesc(p){const k='combo_'+p.id+'_desc';return I18N[currentLang]?.[k]??I18N.en?.[k]??p.desc;}
function applyI18n(){
  document.documentElement.lang=currentLang==='zh'?'zh-CN':currentLang;
  document.querySelectorAll('[data-i18n]').forEach(e=>{e.textContent=tr(e.dataset.i18n);});
  document.querySelectorAll('[data-i18n-html]').forEach(e=>{e.innerHTML=tr(e.dataset.i18nHtml);});
  document.querySelectorAll('[data-i18n-placeholder]').forEach(e=>{e.placeholder=tr(e.dataset.i18nPlaceholder);});
  if($('langSelect'))$('langSelect').value=currentLang;if($('copyCopyBtn'))$('copyCopyBtn').title=tr('copyTitle');
}
function setLanguage(lang){
  if(!['ms','en','zh'].includes(lang))return;
  currentLang=lang;localStorage.setItem('lg-bmh-lang',lang);
  const u=new URL(location.href);u.searchParams.set('lang',lang);history.replaceState({},'',u);
  applyI18n();renderCats();renderComboMenu();renderProducts();renderCart();
  if($('modal')?.open&&activeProduct){renderProductStock();renderPlans();renderPromos();}
  if($('comboModal')?.open&&comboDraft.length)renderComboRefine();
  window.dispatchEvent(new CustomEvent('lg-language-change',{detail:{lang}}));
}
window.LG_I18N_T=(key,vars)=>tr(key,vars);window.LG_CURRENT_LANG=()=>currentLang;

let activeCat='All',cart=[],activeProduct=null,chosenPlan=null,chosenPromo='standard',stocks=new Map(),stockLoaded=false,activeComboPreset=null,comboDraft=[];
const $=id=>document.getElementById(id);
const money=n=>'RM'+Math.max(0,Math.round(Number(n)||0)).toLocaleString('en-MY');
const baseCode=s=>{
  let x=String(s||'').split('.')[0].toUpperCase().replace(/[^A-Z0-9]/g,'');
  if(x.startsWith('S3NQ')) x='S3Q'+x.slice(4);
  return x;
};
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const minPrice=p=>Array.isArray(p.plans)&&p.plans.length?Math.min(...p.plans.map(x=>Number(x.monthly)||999999)):Infinity;
function stockRowsFromSnapshot(snapshot){
  const state=snapshot?.state_json;
  if(!state?.products||typeof state.products!=='object')throw new Error('Public stock snapshot is not available');
  const asOf=String(state.reportDate||snapshot.updated_at||'').slice(0,10)||null;
  return Object.entries(state.products).map(([code,p])=>{
    const quantity=(region,field)=>Number(p.stock?.[region]?.[field])||0;
    const balances=['AL8','AL2','AL3'].map(region=>quantity(region,'balance'));
    return {
      model_code:p.code||code,product_name:p.description||null,category:p.category||null,
      lifecycle_status:p.lifecycleStatus||null,submission_status:p.submissionStatus||null,
      // The report's opening column is West Malaysia, not a regional total.
      opening_stock:quantity('AL8','opening'),
      available_stock:balances.reduce((total,n)=>total+Math.max(0,n),0),
      al8_balance:balances[0],al2_balance:balances[1],al3_balance:balances[2],
      as_of_date:asOf,updated_at:snapshot.updated_at||null
    };
  });
}
function aggregateStockRows(rows){
  const grouped=new Map();
  for(const r of rows||[]){
    const k=baseCode(r.model_code);
    if(!grouped.has(k))grouped.set(k,[]);
    grouped.get(k).push(r);
  }
  const out=new Map();
  for(const [k,list] of grouped){
    const active=list.filter(r=>{const s=String(r.submission_status||'').toLowerCase();return !s.includes('stop')&&!s.includes('pause');});
    const use=active.length?active:list;
    const sum=field=>use.reduce((a,r)=>a+(Number(r[field])||0),0);
    const dates=use.map(r=>r.as_of_date).filter(Boolean).sort();
    out.set(k,{
      ...use[0],
      model_code:k,
      submission_status:active.length?null:(use[0]?.submission_status||'STOP Submission'),
      opening_stock:sum('opening_stock'),
      available_stock:sum('available_stock'),
      total_stock:sum('available_stock'),
      al8_balance:sum('al8_balance'),
      al2_balance:sum('al2_balance'),
      al3_balance:sum('al3_balance'),
      as_of_date:dates.at(-1)||use[0]?.as_of_date||null
    });
  }
  return out;
}

function customerCategoryFromStock(raw){
  const c=String(raw||'').trim().toUpperCase();
  if(c==='RAC'||c==='AIRCOND'||c==='AIR CONDITIONER')return 'Aircond';
  if(c==='WASHER'||c==='DRYER'||c==='LAUNDRY')return 'Laundry';
  if(c==='REF'||c==='REFRIGERATOR'||c==='FRIDGE')return 'Fridge';
  if(c==='AP'||c==='AIR PURIFIER')return 'Air Purifier';
  if(c==='WP'||c==='WATER PURIFIER')return 'Water Purifier';
  if(c==='TV')return 'TV';
  if(c==='AV'||c==='SOUNDBAR')return 'Soundbar';
  if(c==='DISHWASHER')return 'Dishwasher';
  if(c==='VACUUM')return 'Vacuum';
  if(c==='STYLER')return 'Styler';
  if(c==='MICROWAVE')return 'Microwave';
  if(c==='MASSAGE RECLINER')return 'Massage Recliner';
  if(c==='MONITOR')return 'Monitor';
  return String(raw||'Other');
}
function isDehumidifierStock(s){
  const code=String(s?.model_code||'').toUpperCase();
  const name=String(s?.product_name||'').toLowerCase();
  const cat=String(s?.category||'').toLowerCase();
  return code.startsWith('DD16')||name.includes('dehumidifier')||cat.includes('dehumidifier');
}
function sameModelFamily(a,b){
  a=baseCode(a);b=baseCode(b);
  if(a===b)return true;
  const shorter=a.length<=b.length?a:b,longer=a.length>b.length?a:b;
  return shorter.length>=6&&longer.startsWith(shorter);
}
function isStackingKitStock(code,s){
  const c=String(code||'').toUpperCase();
  const cat=String(s?.category||'').toUpperCase();
  const name=String(s?.product_name||'').toUpperCase();
  return c.startsWith('STKIT')||cat.includes('STACKING KIT')||name.includes('STACKING KIT');
}
const EXCLUDED_CUSTOMER_BASES=new Set(['GXJB18HBGVR','GNB312PQJB','OLED65B6SSA']);
function ensureEligibleStockModels(){
  const existing=[...CATALOG.map(p=>baseCode(p.code))];
  let added=0;
  for(const [code,s] of stocks){
    const n=Math.max(0,Number(s?.total_stock)||0);
    const sub=String(s?.submission_status||'').toLowerCase();
    const codeBase=baseCode(code);
    const isOled=String(code||'').toUpperCase().startsWith('OLED');
    const explicitlyExcluded=EXCLUDED_CUSTOMER_BASES.has(codeBase);
    const alreadyShown=existing.some(e=>sameModelFamily(e,code));
    if(n<=0||sub.includes('stop')||sub.includes('pause')||isDehumidifierStock(s)||isStackingKitStock(code,s)||isOled||explicitlyExcluded||alreadyShown)continue;
    CATALOG.push({
      id:'stock-'+code.toLowerCase().replace(/[^a-z0-9]+/g,'-'),
      code,
      name:s?.product_name||code,
      category:customerCategoryFromStock(s?.category),
      plans:[],
      promos:[{id:'standard',label:'Harga standard',type:'none'},{...DEFAULT_HALF9_PROMO}],
      autoStockOnly:true,
      order:CATALOG.length
    });
    existing.push(code);
    added++;
  }
  return added;
}
const stockFor=p=>{
  const k=baseCode(p.code);
  if(stocks.has(k))return stocks.get(k);
  for(const [sk,v] of stocks){
    if(sk.startsWith(k)||k.startsWith(sk))return v;
  }
  return null;
};
const stopSubmission=p=>{const s=String(stockFor(p)?.submission_status||'').toLowerCase();return s.includes('stop')||s.includes('pause');};
const icon=p=>icons[p.category]||'LG';
function stockBadge(p){const s=stockFor(p);if(!s)return stockLoaded?'<span class="stock-badge loading">'+esc(tr('stockNotListed'))+'</span>':'<span class="stock-badge loading">'+esc(tr('stockSyncing'))+'</span>';const n=Math.max(0,Math.round(Number(s.total_stock)||0));const opening=Math.max(0,Math.round(Number(s.opening_stock)||0));if(n>0){const c=n<=3?'low':'good';return '<span class="stock-badge '+c+'">'+esc(n<=3?tr('lowStock',{n}):tr('stock',{n}))+'</span>';}if(opening>0)return '<span class="stock-badge low">'+esc(tr('openingStock',{n:opening}))+'</span>';return '<span class="stock-badge out">'+esc(tr('outStock'))+'</span>';}
function visual(p){
  const src=p.imageData||p.imageUrl||'',fallback=p.fallbackImageUrl||'';
  if(!src)return '<div class="generic-icon">'+icon(p)+'</div>';
  const onerr=fallback
    ?"if(!this.dataset.fallback){this.dataset.fallback='1';this.src='"+fallback.replace(/'/g,"&#39;")+"';}else{this.style.display='none';this.nextElementSibling.style.display='grid';}"
    :"this.style.display='none';this.nextElementSibling.style.display='grid';";
  return '<img loading="lazy" decoding="async" referrerpolicy="no-referrer" src="'+src+'" alt="'+esc(p.name)+'" onerror="'+onerr+'"><div class="generic-icon" style="display:none">'+icon(p)+'</div>';
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
      '<h3>'+esc(comboName(p))+'</h3>'+
      '<p>'+esc(comboDesc(p))+'</p>'+
      '<div class="combo-price"><span>RM</span><b>'+Math.round(d.monthly)+'</b><em>/'+esc(tr('month'))+'</em></div>'+
      '<small>'+esc(tr('standardPlanFrom'))+' · '+d.items.length+' · '+esc(tr('canCustomize'))+'</small>'+
      '<button class="combo-pick" data-combo="'+p.id+'" '+(d.blocked?'disabled':'')+'>'+esc(d.blocked?tr('notAvailable'):tr('chooseCustomize'))+'</button>'+
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
  return cart.filter(x=>x.promo==='combo10').length+comboDraft.filter(x=>x.promo==='combo10').length>=2;
}
function comboDraftPairEligible(item){
  const target=String(item?.product?.pairPromoWith||'').split('.')[0].toUpperCase();
  if(!target)return true;
  return comboDraft.some(x=>String(x.product?.code||'').split('.')[0].toUpperCase()===target)
    || cart.some(x=>String(x.product?.code||'').split('.')[0].toUpperCase()===target);
}
function comboDraftMonthly(item,month=1){
  const plan=comboPlanFor(item);
  return promoPrice(item.product,plan,item.promo,month,{comboActive:comboEligibleDraft(),pairActive:comboDraftPairEligible(item)});
}
function openComboRefine(id){
  const preset=COMBO_PRESETS.find(x=>x.id===id);if(!preset)return;
  const d=comboPresetData(preset);
  if(d.blocked)return toast(tr('notAvailable'));
  activeComboPreset=preset;
  comboDraft=d.items.map(x=>({product:x.product,years:Number(x.plan.years),service:x.plan.service,promo:'standard'}));
  $('comboModalTag').textContent=preset.tag;
  $('comboModalTitle').textContent=comboName(preset);
  $('comboModalSub').textContent=comboDesc(preset);
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
      '<div class="combo-refine-product"><div class="combo-refine-img">'+visual(d.product)+'</div><div><b>'+esc(d.product.code)+'</b><span>'+esc(d.product.name)+'</span><strong>'+money(plan.monthly)+'/'+esc(tr('month'))+' '+esc(tr('standard'))+'</strong></div></div>'+
      '<div class="combo-refine-fields">'+
        '<label>'+esc(tr('period'))+'<select class="select combo-years" data-i="'+i+'">'+years.map(y=>'<option value="'+y+'" '+(Number(d.years)===y?'selected':'')+'>'+y+' '+esc(tr('years'))+'</option>').join('')+'</select></label>'+
        '<label>'+esc(tr('service'))+'<select class="select combo-service" data-i="'+i+'">'+services.map(v=>'<option value="'+esc(v)+'" '+(d.service===v?'selected':'')+'>'+esc(serviceLabel(v))+'</option>').join('')+'</select></label>'+
        '<label>'+esc(tr('promotion'))+'<select class="select combo-promo" data-i="'+i+'">'+livePromos(d.product).map(p=>'<option value="'+p.id+'" '+(d.promo===p.id?'selected':'')+'>'+esc(promoLabel(p))+'</option>').join('')+'</select></label>'+
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
  const combinedComboCount=cart.filter(x=>x.promo==='combo10').length+comboCount;
  const err=comboCount>0&&combinedComboCount<2?tr('comboNeed2'):'';
  $('comboRefineError').textContent=err;
  $('comboRefineError').classList.toggle('show',!!err);
  const total=comboDraft.reduce((a,x)=>a+comboDraftMonthly(x,1),0);
  $('comboRefineMonthly').textContent=money(total);
  $('comboAddBtn').disabled=!!err;
}
function addRefinedCombo(){
  if(!activeComboPreset||!comboDraft.length)return;
  const draftComboCount=comboDraft.filter(x=>x.promo==='combo10').length;
  if(draftComboCount>0&&cart.filter(x=>x.promo==='combo10').length+draftComboCount<2){updateComboRefineSummary();return;}
  const seed=Date.now();
  cart.push(...comboDraft.map((d,i)=>({key:seed+i+Math.random(),product:d.product,plan:{...comboPlanFor(d)},promo:d.promo,qty:1})));
  const name=comboName(activeComboPreset);
  closeComboModal();renderCart();scrollToPackage();toast(name+' '+tr('comboAdded'));
}
function renderCats(){const cats=['All',...new Set(CATALOG.map(x=>x.category))];$('catRow').innerHTML=cats.map(c=>'<button class="cat '+(c===activeCat?'active':'')+'" data-cat="'+esc(c)+'">'+esc(c==='All'?tr('all'):categoryLabel(c))+'</button>').join('');$('catRow').querySelectorAll('.cat').forEach(b=>b.onclick=()=>{activeCat=b.dataset.cat;renderCats();renderProducts();});}
function isUpcoming(p){return Boolean(p.availableFrom && new Date(Date.now()+8*60*60*1000).toISOString().slice(0,10) < p.availableFrom);}
function visibleProducts(){const q=($('search')?.value||'').trim().toLowerCase(),sort=$('sort')?.value||'featured';let rows=CATALOG.filter(p=>!stopSubmission(p)&&(activeCat==='All'||p.category===activeCat)&&(!q||((p.code+' '+p.name+' '+p.category).toLowerCase().includes(q))));if(sort==='price')rows.sort((a,b)=>minPrice(a)-minPrice(b));else if(sort==='model')rows.sort((a,b)=>a.code.localeCompare(b.code));else rows.sort((a,b)=>a.order-b.order);rows.sort((a,b)=>Number(isUpcoming(a))-Number(isUpcoming(b)));return rows;}
function renderProducts(){const rows=visibleProducts();$('catalogCount').textContent=rows.length+' '+tr('model');$('products').innerHTML=rows.map(p=>{const s=stockFor(p),n=s?Math.max(0,Math.round(Number(s.total_stock)||0)):null,out=n===0,pending=!Array.isArray(p.plans)||!p.plans.length;const priceHtml=pending?'<div class="price pending-price"><div><small>'+esc(tr('pricePending'))+'</small></div></div>':'<div class="price"><div><small>'+esc(tr('from'))+'</small><strong>'+money(minPrice(p))+'</strong><em>/'+esc(tr('month'))+'</em></div></div>';return '<article class="product '+(out?'unavailable':'')+' '+(pending?'pricing-pending':'')+'"><div class="pvisual">'+stockBadge(p)+visual(p)+'</div><div class="pbody"><div class="pcat">'+esc(categoryLabel(p.category))+'</div><h3>'+esc(p.code)+'</h3><div class="psub">'+esc(p.name)+'</div><span class="lifecycle current">'+esc(tr(isUpcoming(p)?'availableLateNov':'currentSelection'))+'</span>'+priceHtml+'<button class="addbtn" data-id="'+p.id+'" '+(pending?'disabled':'')+'>'+esc(pending?tr('planPending'):tr('viewPlans'))+'</button></div></article>';}).join('');$('products').querySelectorAll('.addbtn:not(:disabled)').forEach(b=>b.onclick=()=>openProduct(b.dataset.id));}
function renderProductStock(){if(!activeProduct)return;const s=stockFor(activeProduct);$('modalStock').innerHTML=s?tr('currentStock')+': <b>'+Math.round(Number(s.total_stock)||0)+'</b> · '+tr('openingAl8')+': <b>'+Math.round(Number(s.opening_stock)||0)+'</b><br><span style="font-size:11px">AL2 '+Math.round(Number(s.al2_stock)||0)+' / '+tr('opening').toLowerCase()+' '+Math.round(Number(s.al2_opening)||0)+' · AL3 '+Math.round(Number(s.al3_stock)||0)+' / '+tr('opening').toLowerCase()+' '+Math.round(Number(s.al3_opening)||0)+' · AL8 '+Math.round(Number(s.al8_stock)||0)+' / '+tr('opening').toLowerCase()+' '+Math.round(Number(s.al8_opening)||0)+(s.as_of_date?' · '+tr('asOf')+' '+s.as_of_date:'')+'</span>':tr('stockDataSync');}
function openProduct(id){activeProduct=CATALOG.find(x=>x.id===id);if(!activeProduct||!Array.isArray(activeProduct.plans)||!activeProduct.plans.length)return;chosenPlan=activeProduct.plans[0];chosenPromo='standard';$('qtyInput').value=1;$('modalModel').textContent=activeProduct.code;$('modalSub').textContent=activeProduct.name;renderProductStock();renderPlans();renderPromos();$('modal').showModal();}
window.closeModal=()=>$('modal').close();
window.stepQty=d=>{const q=$('qtyInput');q.value=Math.max(1,Math.min(9,(Number(q.value)||1)+d));};
function renderPlans(){$('planGrid').innerHTML=activeProduct.plans.map((p,i)=>'<button class="plan-card '+(p===chosenPlan?'active':'')+'" data-i="'+i+'"><b>'+p.years+' '+esc(tr('years'))+'</b><span>'+esc(serviceLabel(p.service))+'</span><strong>'+money(p.monthly)+'/'+esc(tr('month'))+'</strong></button>').join('');$('planGrid').querySelectorAll('.plan-card').forEach(b=>b.onclick=()=>{chosenPlan=activeProduct.plans[Number(b.dataset.i)];renderPlans();});}
function renderPromos(){
  const promos=livePromos(activeProduct);
  if(!promos.some(p=>p.id===chosenPromo))chosenPromo=promos[0]?.id||'standard';
  let info='';
  if(activeProduct?.doubleMatchEligible){
    const p={validFrom:activeProduct.doubleMatchValidFrom,validTo:activeProduct.doubleMatchValidTo};
    if(promoIsLive(p)){
      const msg=currentLang==='zh'
        ?'🎁 Double Match：任选 2 件符合条件的前置式洗衣机 / 顶开式洗衣机 / 烘干机，可获赠 65" LG UHD 4K AI TV（65UA7350PSB）。活动至 2026年10月15日，须于10月完成安装，送完即止。'
        :currentLang==='en'
        ?'🎁 Double Match: choose any 2 eligible Front Load Washer / Top Load Washer / Dryer products and get a FREE 65" LG UHD 4K AI TV (65UA7350PSB). Valid until 15 Oct 2026; installation must be within October, while stocks last.'
        :'🎁 Double Match: pilih mana-mana 2 produk layak Front Load Washer / Top Load Washer / Dryer dan dapatkan TV LG UHD 4K AI 65" PERCUMA (65UA7350PSB). Sah hingga 15 Okt 2026; pemasangan mesti dalam Oktober, sementara stok masih ada.';
      info='<div style="grid-column:1/-1;border:1px solid #f1b5be;background:#fff5f6;border-radius:18px;padding:14px 16px;font-weight:700;line-height:1.4">'+esc(msg)+'</div>';
    }
  }
  $('promoGrid').innerHTML=info+promos.map(p=>'<button class="promo-card '+(p.id===chosenPromo?'active':'')+'" data-id="'+p.id+'"><b>'+esc(promoLabel(p))+'</b><span>'+esc(promoDescription(p))+'</span></button>').join('');
  $('promoGrid').querySelectorAll('.promo-card').forEach(b=>b.onclick=()=>{chosenPromo=b.dataset.id;renderPromos();});
}
function comboLineCount(){return cart.filter(x=>x.promo==='combo10').length;}
function comboEligible(){return comboLineCount()>=2;}
function pairPromoEligible(item){
  const target=String(item?.product?.pairPromoWith||'').split('.')[0].toUpperCase();
  if(!target)return true;
  return cart.some(x=>String(x.product?.code||'').split('.')[0].toUpperCase()===target);
}
function promoLabelFor(item){
  const p=promoObj(item.product,item.promo);let label=promoLabel(p);
  if(item.promo==='combo10'&&!comboEligible())label+=' — '+tr('comboInactive');
  if(item.promo==='airpair15'&&!pairPromoEligible(item))label+=(currentLang==='zh'?' — 需搭配 AS30':currentLang==='en'?' — pair AS30 required':' — perlu padan AS30');
  return label;
}
function monthlyFor(item,month){
  return promoPrice(item.product,item.plan,item.promo,month,{comboActive:comboEligible(),pairActive:pairPromoEligible(item)})*item.qty;
}

const PRODUCT_FEATURE_GROUPS={
  acPremium:{
    bm:['Plasmaster™ Ionizer++','Pemampat DUAL Inverter™','Penyejukan lebih pantas & jimat tenaga','Kawalan pintar LG ThinQ™'],
    en:['Plasmaster™ Ionizer++','DUAL Inverter Compressor™','Faster cooling & energy saving','LG ThinQ™ smart control'],
    zh:['Plasmaster™ Ionizer++','DUAL Inverter 双变频压缩机','快速制冷，更节能','LG ThinQ™ 智能控制']
  },
  artcool:{
    bm:['Plasmaster™ Ionizer+','Reka bentuk cermin ARTCOOL™','Penyejukan pantas dengan DUAL Inverter','Kawalan pintar LG ThinQ™'],
    en:['Plasmaster™ Ionizer+','Stylish ARTCOOL™ mirror design','Fast cooling with DUAL Inverter','LG ThinQ™ smart control'],
    zh:['Plasmaster™ Ionizer+','ARTCOOL™ 镜面设计','DUAL Inverter 快速制冷','LG ThinQ™ 智能控制']
  },
  acAI:{
    bm:['AI Air dengan LG ThinQ™','Soft Air untuk aliran udara lebih selesa','Comfort Humidity Control','kW Manager untuk kawalan penggunaan tenaga'],
    en:['AI Air with LG ThinQ™','Soft Air for gentler airflow','Comfort Humidity Control','kW Manager for energy control'],
    zh:['AI Air + LG ThinQ™ 智能送风','Soft Air 柔风模式','舒适湿度控制','kW Manager 能耗管理']
  },
  wt25:{
    bm:['Sistem satu badan Washer 25kg + Dryer 20kg','Panel kawalan tengah all-in-one','AI Direct Drive™','TurboWash™ 360°','Serasi dengan LG ThinQ™'],
    en:['One-body 25kg Washer + 20kg Dryer','All-in-one center control','AI Direct Drive™','TurboWash™ 360°','LG ThinQ™ compatible'],
    zh:['25kg洗衣 + 20kg烘干一体式洗衣塔','中央一体控制面板','AI Direct Drive™','TurboWash™ 360°','支持 LG ThinQ™']
  },
  wt14:{
    bm:['Sistem WashTower™ bersepadu 14/10kg','Center Control','AI DD™ + Smart Pairing™','TurboWash™ 360° + Dry Ready','DUAL Inverter HeatPump™'],
    en:['Integrated 14/10kg WashTower™','Center Control','AI DD™ + Smart Pairing™','TurboWash™ 360° + Dry Ready','DUAL Inverter HeatPump™'],
    zh:['14/10kg 一体式 WashTower™','中央控制面板','AI DD™ + Smart Pairing™','TurboWash™ 360° + Dry Ready','DUAL Inverter HeatPump™ 热泵']
  },
  fx1412:{
    bm:['Kapasiti besar 12kg','AI DD™ untuk penjagaan fabrik pintar','TurboWash™ 360° untuk cucian pantas','Steam+™ membantu mengurangkan alergen'],
    en:['Large 12kg capacity','AI DD™ intelligent fabric care','TurboWash™ 360° for faster washing','Steam+™ helps reduce allergens'],
    zh:['12公斤大容量','AI DD™ 智能衣物护理','TurboWash™ 360° 快速洗涤','Steam+™ 帮助减少过敏原']
  },
  rx10:{
    bm:['Kapasiti pengeringan 10kg','AI Dry™','Turbo Dry untuk pengeringan pantas','DUAL Inverter Heat Pump™','Auto Cleaning Condenser'],
    en:['10kg drying capacity','AI Dry™','Turbo Dry for faster drying','DUAL Inverter Heat Pump™','Auto Cleaning Condenser'],
    zh:['10公斤烘干容量','AI Dry™ 智能烘干','Turbo Dry 快速烘干','DUAL Inverter Heat Pump™ 热泵','自动清洁冷凝器']
  },
  fv1209:{
    bm:['Washer 9kg + Dryer 5kg dalam satu mesin','AI Direct Drive™','Steam™','TurboWash™','LG ThinQ™'],
    en:['9kg washer + 5kg dryer in one machine','AI Direct Drive™','Steam™','TurboWash™','LG ThinQ™'],
    zh:['9kg洗衣 + 5kg烘干二合一','AI Direct Drive™','Steam™ 蒸汽护理','TurboWash™','LG ThinQ™ 智能控制']
  },
  fv1450:{
    bm:['Kapasiti 10.5kg','AI Direct Drive™','TurboWash™ 360°','Steam+™','Kawalan pintar LG ThinQ™'],
    en:['10.5kg capacity','AI Direct Drive™','TurboWash™ 360°','Steam+™','LG ThinQ™ smart control'],
    zh:['10.5公斤容量','AI Direct Drive™','TurboWash™ 360°','Steam+™ 蒸汽护理','LG ThinQ™ 智能控制']
  },
  tv2520:{
    bm:['Kapasiti 20kg','AI Direct Drive™','TurboWash™','Scent+','Tab keluli tahan karat penuh','LG ThinQ™'],
    en:['20kg capacity','AI Direct Drive™','TurboWash™','Scent+','Full stainless steel tub','LG ThinQ™'],
    zh:['20公斤容量','AI Direct Drive™','TurboWash™','Scent+ 香氛护理','全不锈钢内桶','LG ThinQ™ 智能控制']
  },
  f2520:{
    bm:['Kapasiti besar 20kg','AI Direct Drive™','TurboWash™ 360°','Steam+™','Kawalan pintar LG ThinQ™'],
    en:['Large 20kg capacity','AI Direct Drive™','TurboWash™ 360°','Steam+™','LG ThinQ™ smart control'],
    zh:['20公斤大容量','AI Direct Drive™','TurboWash™ 360°','Steam+™','LG ThinQ™ 智能控制']
  },
  tx2522:{
    bm:['Kapasiti besar 22kg','AI Wash dengan AI DD™','TurboWash™','EasyUnload™ untuk keluarkan pakaian dengan mudah','Easy Control dengan LCD dial'],
    en:['Large 22kg capacity','AI Wash powered by AI DD™','TurboWash™','EasyUnload™ for easier reach','Easy Control with LCD dial'],
    zh:['22公斤超大容量','AI Wash + AI DD™ 智能洗涤','TurboWash™ 快速洗涤','EasyUnload™ 更容易取放衣物','Easy Control LCD 旋钮']
  },
  f2515:{
    bm:['Kapasiti 15kg basuh + 8kg kering','AI DD™ untuk cucian pintar','TurboWash™ 360°','Steam™ membantu mengurangkan alergen','LG ThinQ™'],
    en:['15kg wash + 8kg dry capacity','AI DD™ intelligent washing','TurboWash™ 360°','Steam™ helps reduce allergens','LG ThinQ™'],
    zh:['15kg洗衣 + 8kg烘干','AI DD™ 智能洗涤','TurboWash™ 360°','Steam™ 帮助减少过敏原','LG ThinQ™ 智能连接']
  },
  fx1411:{
    bm:['Mesin 2-dalam-1 11kg basuh + 7kg kering','AI DD™','Steam™','TurboWash™ 360°','Basuh & kering dalam satu mesin'],
    en:['2-in-1 11kg wash + 7kg dry','AI DD™','Steam™','TurboWash™ 360°','Wash and dry in one machine'],
    zh:['11kg洗衣 + 7kg烘干二合一','AI DD™','Steam™ 蒸汽护理','TurboWash™ 360°','洗烘一体']
  },
  gxjb18:{
    bm:['Kapasiti 580L','Kemasan Black Glass','Linear Cooling™','Door Cooling+™','AI Fresh'],
    en:['580L capacity','Black Glass finish','Linear Cooling™','Door Cooling+™','AI Fresh'],
    zh:['580L 大容量','Black Glass 黑色玻璃面板','Linear Cooling™ 线性恒温','Door Cooling+™ 门冷技术','AI Fresh 智能保鲜']
  },
  gnf452:{
    bm:['Kapasiti besar 493L','LinearCooling™','DoorCooling+™','Dispenser air + Auto Ice Maker','LG ThinQ™'],
    en:['Large 493L capacity','LinearCooling™','DoorCooling+™','Water dispenser + Auto Ice Maker','LG ThinQ™'],
    zh:['493L 大容量','LinearCooling™ 线性恒温','DoorCooling+™ 门冷技术','饮水机 + 自动制冰机','LG ThinQ™ 智能控制']
  },
  gcb257:{
    bm:['Kapasiti besar 664L','Linear Cooling™','Multi Air Flow','Pencahayaan LED','Kemasan Silver'],
    en:['Large 664L capacity','Linear Cooling™','Multi Air Flow','LED lighting','Silver finish'],
    zh:['664L 大容量','Linear Cooling™ 线性恒温','Multi Air Flow 多重气流','LED 照明','银色机身']
  },
  gcj257:{
    bm:['Kapasiti besar 635L','InstaView Door-in-Door™','UVnano® Water Dispenser','DoorCooling+™','LG ThinQ™'],
    en:['Large 635L capacity','InstaView Door-in-Door™','UVnano® Water Dispenser','DoorCooling+™','LG ThinQ™'],
    zh:['635L 大容量','InstaView Door-in-Door™ 敲敲门','UVnano® 饮水机','DoorCooling+™ 门冷技术','LG ThinQ™']
  },
  gvk25:{
    bm:['Kapasiti 612L French Door','InstaView™ — ketuk dua kali untuk lihat dalam','Dispenser air','Ruang simpanan peti sejuk lebih luas','Teknologi pengekalan kesegaran'],
    en:['612L French Door capacity','InstaView™ — knock twice to see inside','Water dispenser','Expanded fridge storage','Freshness-preserving technology'],
    zh:['612L 法式多门大容量','InstaView™ 敲两下即可查看内部','饮水机','更宽敞的冷藏空间','保鲜技术']
  },
  as10:{
    bm:['Penapisan udara 360°','Sistem multi-filtration','Clean Booster','Pet Mode + Allergy Care','Reka bentuk Alpha Pet Double'],
    en:['360° air purification','Multi-filtration system','Clean Booster','Pet Mode + Allergy Care','Alpha Pet Double design'],
    zh:['360°全方位空气净化','多重过滤系统','Clean Booster 净化增压','Pet Mode + Allergy Care 宠物/过敏护理','Alpha Pet Double 双层设计']
  },
  as65:{
    bm:['Penapisan udara 360°','Sistem multi-filtration','Clean Booster','Pet Care','Allergy Care'],
    en:['360° purification','Multi-filtration system','Clean Booster','Pet Care','Allergy Care'],
    zh:['360°全方位净化','多重过滤系统','Clean Booster 净化增压','宠物护理','过敏护理']
  },
  as60hit:{
    bm:['Reka bentuk kompak tetapi berkuasa','Sistem multi-filtration','Pet Care untuk rumah dengan haiwan','Penapisan udara menyeluruh','Kawalan pintar LG ThinQ™'],
    en:['Compact yet powerful design','Multi-filtration system','Pet Care for pet-friendly homes','Thorough air purification','LG ThinQ™ smart control'],
    zh:['小巧但净化力强','多重过滤系统','Pet Care 宠物护理','全面空气净化','LG ThinQ™ 智能控制']
  },
  as55:{
    bm:['Aero V Pet Filter','DUAL Airflow + Clean Booster','Pet Mode','Reka bentuk slim & premium','Mudah dibersihkan'],
    en:['Aero V Pet Filter','DUAL Airflow + Clean Booster','Pet Mode','Slim & premium design','Easy-to-clean design'],
    zh:['Aero V 宠物滤网','DUAL Airflow + Clean Booster','Pet Mode 宠物模式','纤薄高级设计','易于清洁']
  },
  as25:{
    bm:['Tempat rehat dome dengan pemanas','Penapisan udara menyeluruh','Cat Relax Mode','Pet Care Tracking melalui LG ThinQ™','Penimbang terbina dalam untuk pantau berat kucing'],
    en:['Heated dome seat','Total air purification','Cat Relax Mode','Pet Care Tracking via LG ThinQ™','Built-in scale for cat weight tracking'],
    zh:['恒温加热猫咪座舱','全面空气净化','Cat Relax 猫咪休息模式','通过 LG ThinQ™ 追踪宠物状态','内置体重秤监测猫咪体重']
  },
  aeromini:{
    bm:['Reka bentuk kompak & minimal','Penulenan udara 360°','Penapisan udara berkuasa','Operasi bunyi rendah','LG ThinQ™'],
    en:['Compact refined design','360° air purification','Powerful air filtration','Low-noise operation','LG ThinQ™'],
    zh:['精巧简约设计','360°空气净化','强效空气过滤','低噪音运行','LG ThinQ™ 智能控制']
  },
  wallfit:{
    bm:['Dual Airflow','Reka bentuk slim & rata yang menjimatkan ruang','AI Mode','Smart Air Control melalui LG ThinQ™','Liputan sehingga 59.4m²'],
    en:['Dual Airflow','Slim & flat space-saving design','AI Mode','Smart Air Control via LG ThinQ™','Coverage up to 59.4m²'],
    zh:['Dual Airflow 双向气流','纤薄平面节省空间设计','AI 智能模式','通过 LG ThinQ™ 智能控制空气','净化面积高达 59.4m²']
  },
  wu525:{
    bm:['Sistem All Puri Filter yang diperakui WQA','Auto-sanitization paip & outlet air','Reka bentuk built-in yang kemas','Kawalan pintar LG ThinQ™'],
    en:['WQA-certified All Puri Filter system','Auto-sanitization of water pipes & outlet','Sleek built-in design','LG ThinQ™ smart control'],
    zh:['WQA认证 All Puri 过滤系统','水管与出水口自动杀菌','简洁嵌入式设计','LG ThinQ™ 智能控制']
  },
  wd518:{
    bm:['Sistem tanpa tangki untuk air panas, sejuk & suhu bilik','4-Stage Filtration','Auto Sterilization','Tetapan suhu & isipadu boleh disesuaikan','LG ThinQ™'],
    en:['Tankless hot, cold & ambient water','4-Stage Filtration','Auto Sterilization','Customizable temperature & volume','LG ThinQ™'],
    zh:['无水箱即热/冷/常温水','四阶段过滤系统','自动杀菌','可自定义温度与出水量','LG ThinQ™']
  },
  wd516:{
    bm:['Pilihan air panas, suhu bilik & sejuk','Rekaan tanpa tangki','Auto Sterilization + 4-Stage All-Puri Filter','Rekaan ultra nipis 17cm','LG ThinQ™'],
    en:['Hot, ambient & cold water','Tankless design','Auto Sterilization + 4-Stage All-Puri Filter','Ultra-slim 17cm design','LG ThinQ™'],
    zh:['热水、常温水与冷水','无水箱设计','自动杀菌 + 四阶段 All-Puri 过滤','17cm 超纤薄设计','LG ThinQ™']
  },
  gcg22:{
    bm:['InstaView™ — ketuk dua kali untuk lihat dalam','UVnano™ Water Dispenser','LinearCooling™','Kawalan pintar LG ThinQ™','Kapasiti 508L'],
    en:['InstaView™ — knock twice to see inside','UVnano™ Water Dispenser','LinearCooling™','LG ThinQ™ smart control','508L capacity'],
    zh:['InstaView™ 敲两下即可查看内部','UVnano™ 饮水机','LinearCooling™ 线性恒温','LG ThinQ™ 智能控制','508L 大容量']
  },
  oledb6:{
    bm:['Perfect Black & Perfect Color','OLED 4K sehingga 144Hz','α8 AI Processor 4K Gen3','webOS dengan pengalaman AI','Sokongan G-SYNC & FreeSync Premium'],
    en:['Perfect Black & Perfect Color','OLED 4K up to 144Hz','α8 AI Processor 4K Gen3','webOS with advanced AI experiences','G-SYNC & FreeSync Premium support'],
    zh:['Perfect Black & Perfect Color','OLED 4K 高达144Hz','α8 AI Processor 4K Gen3','webOS AI 智能体验','支持 G-SYNC 与 FreeSync Premium']
  },
  qned55:{
    bm:['QNED evo AI Mini LED 4K','Dynamic QNED Color Pro','Precision Dimming untuk kontras lebih tepat','α8 AI Processor 4K','webOS dengan pengalaman AI pintar'],
    en:['QNED evo AI Mini LED 4K','Dynamic QNED Color Pro','Precision Dimming for refined contrast','α8 AI Processor 4K','webOS with advanced AI experiences'],
    zh:['QNED evo AI Mini LED 4K','Dynamic QNED Color Pro 广色域','Precision Dimming 精准控光','α8 AI Processor 4K AI处理器','webOS 智能AI体验']
  },
  nanoTV:{
    bm:['NANO 4K UHD AI','Nano Detail Enhancer','HDR10 Pro','α7 AI Processor 4K','webOS dengan AI Hub'],
    en:['NANO 4K UHD AI','Nano Detail Enhancer','HDR10 Pro','α7 AI Processor 4K','webOS with AI Hub'],
    zh:['NANO 4K UHD AI','Nano Detail Enhancer 细节增强','HDR10 Pro','α7 AI Processor 4K','webOS + AI Hub 智能中心']
  },
  dishwasher335:{
    bm:['TrueSteam™ untuk cucian lebih bersih & higienik','QuadWash™ membersih dari pelbagai arah','EasyRack™ Plus untuk susunan pinggan fleksibel','Auto Opening Door membantu proses pengeringan','LG ThinQ™ untuk kawalan pintar'],
    en:['TrueSteam™ for a cleaner, more hygienic wash','QuadWash™ cleans from multiple angles','EasyRack™ Plus for flexible loading','Auto Opening Door helps drying','LG ThinQ™ smart control'],
    zh:['TrueSteam™ 蒸汽洁净，更卫生','QuadWash™ 多角度强力清洗','EasyRack™ Plus 灵活碗篮设计','自动开门辅助烘干','LG ThinQ™ 智能控制']
  },
  dishwasher533:{
    bm:['TrueSteam™ untuk cucian lebih bersih & higienik','QuadWash™ membersih dari pelbagai arah','EasyRack™ Plus untuk susunan pinggan fleksibel','Kapasiti 14 place settings','LG ThinQ™ untuk kawalan pintar'],
    en:['TrueSteam™ for a cleaner, more hygienic wash','QuadWash™ cleans from multiple angles','EasyRack™ Plus for flexible loading','14 place settings capacity','LG ThinQ™ smart control'],
    zh:['TrueSteam™ 蒸汽洁净，更卫生','QuadWash™ 多角度强力清洗','EasyRack™ Plus 灵活碗篮设计','14套餐具容量','LG ThinQ™ 智能控制']
  }
};
const PRODUCT_FEATURE_GROUP_BY_CODE={
  'S3-Q09JAYPP':'acPremium','S3-Q12JAYPP':'acPremium','S3-Q18KAYPA':'acPremium','S3-Q24KLYPA':'acPremium',
  'S3-Q24K2RPA':'artcool','S3-Q120AGZB':'acAI','S3-Q2412GZC':'acAI',
  'WT2520NHEGR':'wt25','WT1410NHB':'wt14','FX1412S5GR':'fx1412','RX10VHP3KR':'rx10',
  'FV1209D4W':'fv1209','FV1450S2W':'fv1450','TV2520SV9KR':'tv2520','F2520SNEKR':'f2520','TX2522AT9GR':'tx2522','F2515RNTKAR':'f2515','FX1411R5WR':'fx1411',
  'GN-F452':'gnf452','GN-F452PQAK':'gnf452','GC-B257KLJR':'gcb257','GC-J257SQNW':'gcj257','GV-K25FFGER':'gvk25','GC-G22FFQAB':'gcg22','GXJB18JBQRC':'gxjb18',
  'AS10GDBY0':'as10','AS65GDBY0':'as65','AS30GGW10':'aeromini','AS60GHBT0':'as60hit','AS55GGSY0':'as55','AS25GCBZ0':'as25','AS60GLSG0':'wallfit',
  'WU525BS':'wu525','WD518AN':'wd518','WD516AN':'wd516',
  'DFC335HM':'dishwasher335','DFC533FV':'dishwasher533','55QNED87BSA':'qned55','65QNED87BSA':'qned55','75QNED87BSA':'qned55','50NU865BPSA':'nanoTV','55NU865BPSA':'nanoTV','65NU865BPSA':'nanoTV'
};
function productFeatureLines(product){
  const base=String(product?.code||'').split('.')[0].toUpperCase();
  const group=PRODUCT_FEATURE_GROUP_BY_CODE[base],pack=group&&PRODUCT_FEATURE_GROUPS[group];
  return pack?(pack[currentLang]||pack.en||[]):[];
}
function featureHeading(){return currentLang==='zh'?'✨ 主要特点：':currentLang==='en'?'✨ Key features:':'✨ Ciri-ciri utama:';}
function warrantyLine(years){return currentLang==='zh'?('🛡️ '+years+'年保修'):currentLang==='en'?('🛡️ '+years+'-year warranty'):('🛡️ Waranti '+years+' tahun');}

function selectedCopywriting(){
  if(!activeProduct||!chosenPlan)return'';
  const normal=Math.round(Number(chosenPlan.monthly)||0),promo=promoObj(activeProduct,chosenPromo),end=Number(chosenPlan.years)*12;
  const month1=Math.round(promoPrice(activeProduct,chosenPlan,chosenPromo,1,{comboActive:true,pairActive:true}));
  let offer;
  if(promo.type==='percent'){
    const n=Number(promo.months)||0,v=Number(promo.value)||0;
    offer=currentLang==='zh'
      ?('🔥 首 '+n+' 个月 '+v+'% OFF：'+money(month1)+'/月\n第 '+(n+1)+'–'+end+' 个月：'+money(normal)+'/月')
      :currentLang==='en'
      ?('🔥 '+v+'% OFF for the first '+n+' months: '+money(month1)+'/month\nMonth '+(n+1)+'–'+end+': '+money(normal)+'/month')
      :('🔥 '+v+'% OFF untuk '+n+' bulan pertama: '+money(month1)+'/bulan\nBulan '+(n+1)+'–'+end+': '+money(normal)+'/bulan');
  }else if(promo.type==='fixed'){
    const v=Number(promo.value)||0;
    offer=currentLang==='zh'
      ?('🔥 每月 RM'+v+' OFF：'+money(month1)+'/月（原价 '+money(normal)+'/月）')
      :currentLang==='en'
      ?('🔥 RM'+v+' OFF/month: '+money(month1)+'/month (Normal '+money(normal)+'/month)')
      :('🔥 RM'+v+' OFF/bulan: '+money(month1)+'/bulan (Harga biasa '+money(normal)+'/bulan)');
    if(promo.id==='combo10')offer+='\n'+(currentLang==='zh'?'*至少 2 件产品/订单都选择 RM10 OFF combo 后才生效。':currentLang==='en'?'*Active when at least 2 products/orders select the RM10 OFF combo package.':'*Aktif apabila sekurang-kurangnya 2 produk/order memilih pakej RM10 OFF combo.');
    if(promo.id==='airpair15')offer+='\n'+(currentLang==='zh'?'*需与 AS30GGW10 配套。':currentLang==='en'?'*Requires pairing with AS30GGW10.':'*Perlu dipasangkan dengan AS30GGW10.');
  }else if(promo.type==='fixedMonthly'){
    offer=currentLang==='zh'
      ?('🔥 特价：'+money(month1)+'/月（原价 '+money(normal)+'/月）')
      :currentLang==='en'
      ?('🔥 Special: '+money(month1)+'/month (Normal '+money(normal)+'/month)')
      :('🔥 Promosi khas: '+money(month1)+'/bulan (Harga biasa '+money(normal)+'/bulan)');
  }else{
    offer=tr('copyStandard',{normal:money(normal)});
  }
  const features=productFeatureLines(activeProduct);
  const lines=[tr('copyHeadline',{name:activeProduct.name}),tr('copyModel',{code:activeProduct.code})];
  if(features.length)lines.push('',featureHeading(),...features.map(x=>'✔️ '+x));
  lines.push('',tr('copyPlan',{years:chosenPlan.years,service:serviceLabel(chosenPlan.service)}),offer,'',tr('copyPackageIncludes'),tr('copyDelivery'),warrantyLine(chosenPlan.years));
  if(activeProduct.category!=='TV')lines.push(tr('copyServiceLine',{service:serviceLabel(chosenPlan.service)}));
  if(chosenPlan.service==='Combine Maintenance')lines.push(tr('copyCmKit'),tr('copyCmVisit'));
  return lines.join('\n');
}
function copySelectedCopywriting(){
  const txt=selectedCopywriting();if(!txt)return;
  navigator.clipboard?.writeText(txt).then(()=>toast(tr('copyDone'))).catch(()=>prompt(tr('copyFail'),txt));
}
window.copySelectedCopywriting=copySelectedCopywriting;
function addActive(){if(!activeProduct||!chosenPlan)return;const qty=Math.max(1,Math.min(9,Number($('qtyInput').value)||1));cart.push({key:Date.now()+Math.random(),product:activeProduct,plan:{...chosenPlan},promo:chosenPromo,qty});closeModal();renderCart();toast(chosenPromo==='combo10'&&!comboEligible()?tr('comboNeedAnother'):tr('addedPackage'));}
function totalUnits(){return cart.reduce((a,x)=>a+x.qty,0);}
function renderCart(){const units=totalUnits();$('cartUnits').textContent=units+' '+tr('unit');$('selectedCount').textContent=units+' '+tr('productSelected');const sharePhotos=$('sharePhotoGrid');if(!cart.length){$('cartItems').innerHTML='<div class="room-empty" style="padding:16px">'+esc(tr('noProducts'))+'</div>';$('roomGrid').innerHTML='<div class="room-empty"><b>'+esc(tr('startAppliance'))+'</b><br>'+esc(tr('startAppliance2'))+'</div>';if(sharePhotos)sharePhotos.innerHTML='';$('currentMonthly').textContent='RM0';$('scheduleRows').innerHTML='';$('saving').textContent='RM0';$('contractTotal').textContent='RM0';budgetCheck();syncUrl(false);return;}$('cartItems').innerHTML=cart.map((x,i)=>'<div class="cart-item"><div><b>'+esc(x.product.code)+'</b><span>'+x.qty+' × '+x.plan.years+'Y · '+esc(serviceLabel(x.plan.service))+'</span><small>'+esc(promoLabelById(x.promo,(x.product.promos.find(p=>p.id===x.promo)||{}).label||''))+'</small></div><button data-i="'+i+'" class="remove">×</button></div>').join('');$('cartItems').querySelectorAll('.remove').forEach(b=>b.onclick=()=>{cart.splice(Number(b.dataset.i),1);renderCart();});const productCards=cart.map(x=>'<div class="room-item"><div class="qtydot">×'+x.qty+'</div><div class="miniimg">'+visual(x.product)+'</div><b>'+esc(x.product.code)+'</b><span>'+esc(x.product.name)+'</span></div>').join('');$('roomGrid').innerHTML=productCards;if(sharePhotos)sharePhotos.innerHTML=productCards;$('currentMonthly').textContent=money(cart.reduce((a,x)=>a+monthlyFor(x,1),0));renderSchedule();budgetCheck();syncUrl(false);}
function renderSchedule(){const units=totalUnits(),maxMonths=Math.max(...cart.map(x=>x.plan.years*12)),cuts=new Set([1,maxMonths+1]);cart.forEach(x=>{const p=promoObj(x.product,x.promo);if(p.months)cuts.add(Number(p.months)+1);cuts.add(x.plan.years*12+1);});const pts=[...cuts].filter(n=>n>=1&&n<=maxMonths+1).sort((a,b)=>a-b);let rows=[],total=0,standard=0;for(let i=0;i<pts.length-1;i++){const a=pts[i],b=pts[i+1]-1;if(a>b)continue;const m=cart.reduce((s,x)=>a<=x.plan.years*12?s+monthlyFor(x,a):s,0),normal=cart.reduce((s,x)=>a<=x.plan.years*12?s+(Number(x.plan.monthly)||0)*x.qty:s,0),months=b-a+1;total+=m*months;standard+=normal*months;rows.push('<div class="schedule-row"><span>'+esc(tr('monthWord'))+' '+a+(b>a?'–'+b:'')+'</span><b>'+money(m)+'/'+esc(tr('month'))+'</b></div>');}$('scheduleRows').innerHTML=rows.join('')+(comboLineCount()===1?'<div class="schedule-row combo-warning"><span>RM10 OFF combo</span><b>'+esc(tr('notActiveAdd'))+'</b></div>':'');$('saving').textContent=money(Math.max(0,standard-total));$('contractTotal').textContent=money(total);}
function budgetCheck(){const budget=Number($('budget')?.value)||0,cur=Number($('currentMonthly')?.textContent.replace(/[^\d.]/g,''))||0,e=$('budgetResult');if(!cart.length){e.textContent=tr('buildToCompare');e.className='budget-result';return;}if(cur<=budget){e.textContent=tr('withinBudget',{amount:money(budget-cur)});e.className='budget-result ok';}else{e.textContent=tr('overBudget',{amount:money(cur-budget)});e.className='budget-result over';}}
async function loadStock(){try{const r=await fetch(SUPABASE_URL+'/rest/v1/control_centre_public_snapshot?select=state_json,updated_at&workspace_id=eq.d257117f-df44-4da3-b7cb-7d0b84e6e0e4',{headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY},cache:'no-store'});if(!r.ok)throw new Error('HTTP '+r.status);const snapshot=(await r.json())[0];const rows=stockRowsFromSnapshot(snapshot);window.__LG_PUBLIC_STOCK_ROWS__=rows;stocks=aggregateStockRows(rows);ensureEligibleStockModels();stockLoaded=true;window.dispatchEvent(new Event('lg-stock-ready'));const dates=rows.map(x=>x.as_of_date).filter(Boolean).sort(),d=dates.at(-1)||'latest';$('liveDot').className='live-dot ok';$('liveText').textContent=tr('liveConnected');$('stockStamp').textContent=tr('stockSynced',{date:d});$('stockInfo').textContent=tr('stockInfoFull');renderCats();renderProducts();renderComboMenu();}catch(e){console.warn(e);stockLoaded=true;$('liveDot').className='live-dot err';$('liveText').textContent=tr('liveUnavailable');$('stockStamp').textContent=tr('syncUnavailable');renderProducts();renderComboMenu();}}
function payload(){return cart.map(x=>({id:x.product.id,plan:x.product.plans.findIndex(p=>p.years===x.plan.years&&p.service===x.plan.service&&p.monthly===x.plan.monthly),years:x.plan.years,service:x.plan.service,monthly:x.plan.monthly,promo:x.promo,qty:x.qty}));}
function packageToken(){return btoa(unescape(encodeURIComponent(JSON.stringify(payload())))).replace(/=+$/,'');}
function customerShareUrl(){
  const u=new URL(location.origin+location.pathname);
  if(cart.length)u.searchParams.set('pkg',packageToken());
  u.searchParams.set('share','1');
  u.searchParams.set('v','20261008n');u.searchParams.set('lang',currentLang);
  return u.toString();
}
function syncUrl(push=true){const u=new URL(location.href);if(cart.length)u.searchParams.set('pkg',packageToken());else u.searchParams.delete('pkg');if(push)history.pushState({},'',u);else history.replaceState({},'',u);}
function loadFromUrl(){const u=new URL(location.href),v=u.searchParams.get('pkg');if(u.searchParams.get('share')==='1'){document.body.classList.add('shared-package-view');const b=document.querySelector('.budget');if(b)b.style.display='none';const k=document.querySelectorAll('.kpis .kpi');if(k.length>1)k[k.length-1].style.display='none';}if(!v)return;try{const pad=v+'==='.slice((v.length+3)%4),data=JSON.parse(decodeURIComponent(escape(atob(pad))));cart=data.map(x=>{const p=CATALOG.find(y=>y.id===x.id);if(!p)return null;const exact=p.plans.find(pl=>Number(pl.years)===Number(x.years)&&pl.service===x.service&&Number(pl.monthly)===Number(x.monthly));const plan=exact||p.plans[x.plan]||p.plans[0];return{key:Date.now()+Math.random(),product:p,plan:{...plan},promo:p.promos.some(z=>z.id===x.promo)?x.promo:'standard',qty:Math.max(1,Math.min(9,Number(x.qty)||1))};}).filter(Boolean);}catch(e){console.warn('bad package link',e);}}
function sharePackage(){
  if(!cart.length)return toast(tr('addFirst'));
  const url=customerShareUrl();
  navigator.clipboard?.writeText(url).then(()=>toast(tr('linkCopied'))).catch(()=>prompt(tr('copyLinkPrompt'),url));
}
function editSharedPackage(){
  document.body.classList.remove('shared-package-view');
  const u=new URL(location.href);u.searchParams.delete('share');history.replaceState({},'',u);
  $('catalogSection')?.scrollIntoView({behavior:'smooth',block:'start'});
}
function wa(){const lines=[tr('waIntro')];cart.forEach(x=>lines.push('• '+x.qty+'x '+x.product.code+' — '+x.plan.years+'Y '+serviceLabel(x.plan.service)+' — '+promoLabelById(x.promo,(x.product.promos.find(p=>p.id===x.promo)||{}).label||'')));const link=cart.length?customerShareUrl():location.href;lines.push(tr('estimateNow')+': '+$('currentMonthly').textContent+'/'+tr('month'),link);window.open('https://wa.me/601159726619?text='+encodeURIComponent(lines.join('\n')),'_blank');}
function toast(t){const e=$('toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),1800);}
window.scrollToCatalog=()=>$('catalogSection').scrollIntoView({behavior:'smooth',block:'start'});
window.scrollToPackage=()=>$('packageSide').scrollIntoView({behavior:'smooth',block:'start'});
document.addEventListener('DOMContentLoaded',()=>{applyI18n();loadFromUrl();renderCats();renderComboMenu();renderProducts();renderCart();loadStock();$('langSelect').addEventListener('change',e=>setLanguage(e.target.value));$('search').addEventListener('input',renderProducts);$('sort').addEventListener('change',renderProducts);$('budget').addEventListener('input',budgetCheck);$('modalAdd').onclick=addActive;$('copyCopyBtn').onclick=copySelectedCopywriting;$('comboAddBtn').onclick=addRefinedCombo;$('shareBtn').onclick=sharePackage;$('waBtn').onclick=wa;$('editSharedBtn').onclick=editSharedPackage;$('resetBtn').onclick=()=>{cart=[];renderCart();toast(tr('packageCleared'));};$('modal').addEventListener('click',e=>{if(e.target===$('modal'))closeModal();});$('comboModal').addEventListener('click',e=>{if(e.target===$('comboModal'))closeComboModal();});if(document.body.classList.contains('shared-package-view')&&cart.length)setTimeout(()=>scrollToPackage(),80);});
})();