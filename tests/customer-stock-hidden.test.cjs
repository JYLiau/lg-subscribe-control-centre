const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, '../build-my-home/index.html'), 'utf8');
const app = fs.readFileSync(path.join(__dirname, '../build-my-home/app.js'), 'utf8');
const legacy = fs.readFileSync(path.join(__dirname, '../build-my-home/stock-breakdown-v2.js'), 'utf8');

assert.doesNotThrow(() => new Function(app), 'Customer app JS must parse');
for (const marker of ['control_centre_public_snapshot', 'get_public_stock_v4', '__LG_PUBLIC_STOCK_ROWS__', 'stockRowsFromSnapshot', 'stockBadge(', 'modalStock', 'loadStock(']) {
  assert.ok(!app.includes(marker), 'Stock feed or rendering must remain disabled: ' + marker);
}
for (const marker of ['stock-breakdown-v2.js', 'id="liveText"', 'id="stockStamp"', 'id="modalStock"', 'id="stockInfo"']) {
  assert.ok(!html.includes(marker), 'Customer markup must not expose stock UI: ' + marker);
}
assert.ok(app.includes('get_customer_submission_statuses'), 'STOP/PAUSE exclusion must still use stock-free metadata');
assert.ok(app.includes('STATIC_BLOCKED_BASES'), 'Known STOP models should stay excluded if status checks are unavailable');
assert.ok(!legacy.includes('fetch('), 'Legacy overlay must never request a stock feed');
for (const feature of ['function renderProducts()', 'function renderPlans()', 'function renderCart()', 'function renderSchedule()']) {
  assert.ok(app.includes(feature), 'Core customer feature missing: ' + feature);
}
console.log('PASS: customer stock availability hidden; plans and package builder retained.');
