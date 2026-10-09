(() => {
  const selectors = '.pvisual img,.miniimg img,.combo-thumb img,.combo-refine-img img';
  const proxy = src => 'https://wsrv.nl/?url=' + encodeURIComponent(src) + '&w=420&h=300&fit=contain&output=webp&q=72';

  function lite(img) {
    if (img.dataset.liteDone) return;
    const src = img.getAttribute('src') || '';
    img.dataset.liteDone = '1';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.fetchPriority = 'low';
    img.width = 420;
    img.height = 300;
    // Bundled photos load directly, without depending on the image proxy.
    if (!/^https?:\/\//i.test(src) || src.includes('wsrv.nl/?url=')) return;

    const fallback = img.onerror;
    img.dataset.originalSrc = src;
    img.onload = () => {
      img.style.display = '';
      const placeholder = img.nextElementSibling;
      if (placeholder?.classList.contains('generic-icon')) placeholder.style.display = 'none';
    };
    img.onerror = () => {
      img.onerror = fallback;
      img.src = src;
    };
    img.src = proxy(src);
  }

  function scan(root = document) {
    if (root.matches?.(selectors)) lite(root);
    root.querySelectorAll?.(selectors).forEach(lite);
  }

  document.addEventListener('DOMContentLoaded', () => {
    scan();
    const observer = new MutationObserver(changes => {
      for (const change of changes) for (const node of change.addedNodes) {
        if (node.nodeType === 1) scan(node);
      }
    });
    for (const id of ['products', 'roomGrid', 'comboMenu', 'comboRefineItems', 'sharePhotoGrid']) {
      const container = document.getElementById(id);
      if (container) observer.observe(container, { childList: true, subtree: true });
    }
  });
})();
