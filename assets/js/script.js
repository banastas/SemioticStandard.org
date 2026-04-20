// SemioticStandard.org — grid layout + label interaction.

(function () {
  'use strict';

  const symbolItems = document.querySelectorAll('.symbol-item');
  const symbolLabel = document.getElementById('symbolLabel');
  if (!symbolLabel || symbolItems.length === 0) return;

  const TOUCH_WINDOW_MS = 500;
  const CREDIT_SPAN = 2;
  const CELL_COUNT = symbolItems.length + CREDIT_SPAN; // 34 symbols + credit card (spans 2)

  let activeItem = null;
  let lastTouchTime = 0;

  function formatSymbolName(symbolData) {
    return symbolData
      .replace(/^\d+[A-C]?\./, '')
      .replace(/\./g, ' ')
      .trim();
  }

  function showLabel(item) {
    activeItem = item;
    symbolLabel.textContent = formatSymbolName(item.getAttribute('data-symbol') || '');
    symbolLabel.classList.add('active');
  }

  function hideLabel() {
    activeItem = null;
    symbolLabel.classList.remove('active');
  }

  function recentTouch() {
    return Date.now() - lastTouchTime < TOUCH_WINDOW_MS;
  }

  // --- Layout: compute cols × rows from viewport aspect so the grid fills 100svh. ---

  function computeLayout() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const aspect = w / h;

    let cols;
    if (aspect > 1.5)       cols = Math.ceil(Math.sqrt(CELL_COUNT * aspect));
    else if (aspect < 0.8)  cols = Math.ceil(Math.sqrt(CELL_COUNT / (h / w)));
    else                    cols = Math.ceil(Math.sqrt(CELL_COUNT));

    const rows = Math.ceil(CELL_COUNT / cols);
    const root = document.documentElement;
    root.style.setProperty('--cols', cols);
    root.style.setProperty('--rows', rows);
  }

  computeLayout();

  let resizeRaf = 0;
  window.addEventListener('resize', () => {
    if (resizeRaf) cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(computeLayout);
  });

  // --- Interaction ---

  document.addEventListener('touchstart', () => {
    lastTouchTime = Date.now();
  }, { passive: true });

  symbolItems.forEach((item) => {
    item.addEventListener('mouseenter', function () {
      if (!recentTouch()) showLabel(this);
    });

    item.addEventListener('mouseleave', function () {
      if (!recentTouch()) hideLabel();
    });

    item.addEventListener('focus', function () {
      if (!recentTouch()) showLabel(this);
    });

    item.addEventListener('blur', function () {
      if (!recentTouch()) hideLabel();
    });

    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (activeItem === this) hideLabel(); else showLabel(this);
      } else if (e.key === 'Escape') {
        hideLabel();
        this.blur();
      }
    });

    item.addEventListener('touchend', function (e) {
      e.preventDefault(); // suppress emulated mouse events
      if (activeItem === this) hideLabel(); else showLabel(this);
    });
  });

  // Tap outside dismisses the label on mobile
  document.addEventListener('touchend', (e) => {
    if (!e.target.closest('.symbol-item')) hideLabel();
  });

  // Clear text after fade-out completes to keep a11y tree tidy
  symbolLabel.addEventListener('transitionend', function () {
    if (!this.classList.contains('active')) this.textContent = '';
  });
})();
