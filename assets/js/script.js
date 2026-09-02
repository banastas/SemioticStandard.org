// SemioticStandard.org grid layout and label interaction.
(function () {
  'use strict';

  const gallery = document.getElementById('symbolGrid');
  const symbolLabel = document.getElementById('symbolLabel');
  const symbolItems = gallery ? gallery.querySelectorAll('.symbol-item') : [];

  if (!gallery || !symbolLabel || symbolItems.length === 0) return;

  const CREDIT_SPAN = 2;
  const CELL_COUNT = symbolItems.length + CREDIT_SPAN;
  const gridOptions = [];

  let activeItem = null;
  let lastPointerType = 'mouse';
  let resizeFrame = 0;

  for (let columns = 2; columns <= CELL_COUNT; columns += 1) {
    if (CELL_COUNT % columns === 0) {
      gridOptions.push({ columns, rows: CELL_COUNT / columns });
    }
  }

  function formatSymbolName(symbolData) {
    return symbolData
      .replace(/^\d+[A-C]?\./, '')
      .replace(/\./g, ' ')
      .trim();
  }

  function showLabel(item) {
    activeItem = item;
    symbolLabel.textContent = formatSymbolName(item.dataset.symbol || '');
    symbolLabel.classList.add('active');
  }

  function hideLabel() {
    activeItem = null;
    symbolLabel.classList.remove('active');
  }

  function computeLayout() {
    const viewportAspect = window.innerWidth / window.innerHeight;
    let bestOption = gridOptions[0];
    let bestScore = Number.POSITIVE_INFINITY;

    gridOptions.forEach((option) => {
      const cellAspect = viewportAspect * (option.rows / option.columns);
      const score = Math.abs(Math.log(cellAspect));

      if (score < bestScore) {
        bestOption = option;
        bestScore = score;
      }
    });

    document.documentElement.style.setProperty('--cols', bestOption.columns);
    document.documentElement.style.setProperty('--rows', bestOption.rows);
  }

  computeLayout();

  window.addEventListener('resize', function () {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(computeLayout);
  });

  document.addEventListener('pointerdown', function (event) {
    lastPointerType = event.pointerType;

    if (activeItem && !event.target.closest('.symbol-item')) {
      hideLabel();
    }
  }, { passive: true });

  document.addEventListener('keydown', function () {
    lastPointerType = 'keyboard';
  });

  gallery.addEventListener('pointerover', function (event) {
    const item = event.target.closest('.symbol-item');
    if (item && event.pointerType !== 'touch') showLabel(item);
  });

  gallery.addEventListener('pointerout', function (event) {
    const item = event.target.closest('.symbol-item');
    if (item && event.pointerType !== 'touch' && !item.contains(event.relatedTarget)) {
      hideLabel();
    }
  });

  gallery.addEventListener('focusin', function (event) {
    const item = event.target.closest('.symbol-item');
    if (item && lastPointerType !== 'touch') showLabel(item);
  });

  gallery.addEventListener('focusout', function (event) {
    if (event.target.closest('.symbol-item') && lastPointerType !== 'touch') {
      hideLabel();
    }
  });

  gallery.addEventListener('click', function (event) {
    const item = event.target.closest('.symbol-item');
    if (!item || lastPointerType !== 'touch') return;

    if (activeItem === item) hideLabel();
    else showLabel(item);
  });

  gallery.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;

    const item = event.target.closest('.symbol-item');
    hideLabel();
    if (item) item.blur();
  });

  symbolLabel.addEventListener('transitionend', function () {
    if (!this.classList.contains('active')) this.textContent = '';
  });
})();
