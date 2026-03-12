document.addEventListener('DOMContentLoaded', function() {
    const symbolItems = document.querySelectorAll('.symbol-item');
    const symbolLabel = document.getElementById('symbolLabel');

    function formatSymbolName(symbolData) {
        let formatted = symbolData.replace(/^\d+[A-C]?\./, '');
        formatted = formatted.replace(/\./g, ' ');
        return formatted.trim();
    }

    let activeItem = null;
    let lastTouchTime = 0;

    function showLabel(item) {
        activeItem = item;
        const symbolData = item.getAttribute('data-symbol');
        symbolLabel.textContent = formatSymbolName(symbolData);
        symbolLabel.classList.add('active');
    }

    function hideLabel() {
        activeItem = null;
        symbolLabel.classList.remove('active');
    }

    function recentTouch() {
        return Date.now() - lastTouchTime < 500;
    }

    document.addEventListener('touchstart', function() {
        lastTouchTime = Date.now();
    }, { passive: true });

    symbolItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');

        item.addEventListener('mouseenter', function() {
            if (!recentTouch()) showLabel(this);
        });

        item.addEventListener('mouseleave', function() {
            if (!recentTouch()) hideLabel();
        });

        item.addEventListener('focus', function() {
            if (!recentTouch()) showLabel(this);
        });

        item.addEventListener('blur', function() {
            if (!recentTouch()) hideLabel();
        });

        item.addEventListener('touchend', function(e) {
            e.preventDefault(); // Prevent emulated mouse events
            if (activeItem === this) {
                hideLabel();
            } else {
                showLabel(this);
            }
        });
    });

    // Dismiss label on tap outside (mobile)
    document.addEventListener('touchend', function(e) {
        if (!e.target.closest('.symbol-item')) {
            hideLabel();
        }
    });

    symbolLabel.addEventListener('transitionend', function() {
        if (!this.classList.contains('active')) {
            this.textContent = '';
        }
    });

    function adjustGridLayout() {
        const container = document.querySelector('.grid-container');
        const itemCount = symbolItems.length + 1; // +1 for credit card
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const aspectRatio = viewportWidth / viewportHeight;

        let cols, rows;

        if (aspectRatio > 1.5) {
            cols = Math.ceil(Math.sqrt(itemCount * aspectRatio));
            rows = Math.ceil(itemCount / cols);
        } else if (aspectRatio < 0.8) {
            rows = Math.ceil(Math.sqrt(itemCount / aspectRatio));
            cols = Math.ceil(itemCount / rows);
        } else {
            cols = Math.ceil(Math.sqrt(itemCount));
            rows = Math.ceil(itemCount / cols);
        }

        const minSize = Math.min(viewportWidth / cols, viewportHeight / rows) - 4;
        const finalMinSize = Math.max(60, Math.min(200, minSize));

        container.style.gridTemplateColumns = `repeat(auto-fit, minmax(${finalMinSize}px, 1fr))`;
    }

    adjustGridLayout();

    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(adjustGridLayout, 100);
    });
});
