// Stock availability is intentionally disabled on the customer site.
// Legacy browsers may still request this file; hide any cached stock badges
// without fetching public quantities or rendering region-specific balances.
(() => {
  const style = document.createElement('style');
  style.textContent = '.stock-badge,.stock-mini-v2,.stock-asof-v2,.modal-stock{display:none!important}';
  document.head.appendChild(style);
})();
