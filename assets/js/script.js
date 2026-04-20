// SemioticStandard.org — hover/focus/touch label interaction only.
// Grid sizing is pure CSS (no resize listener, no recalculation).

(function () {
  'use strict';

  const symbolItems = document.querySelectorAll('.symbol-item');
  const symbolLabel = document.getElementById('symbolLabel');
  if (!symbolLabel || symbolItems.length === 0) return;

  const TOUCH_WINDOW_MS = 500;
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
