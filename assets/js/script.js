document.addEventListener('DOMContentLoaded', function() {
    const symbolItems = document.querySelectorAll('.symbol-item');
    const symbolLabel = document.getElementById('symbolLabel');

    function formatSymbolName(symbolData) {
        let formatted = symbolData.replace(/^\d+[A-C]?\./, '');
        formatted = formatted.replace(/\./g, ' ');
        return formatted.trim();
    }

    function showLabel(item) {
        const symbolData = item.getAttribute('data-symbol');
        const formattedName = formatSymbolName(symbolData);
        symbolLabel.textContent = formattedName;
        symbolLabel.classList.add('active');
    }

    function hideLabel() {
        symbolLabel.classList.remove('active');
    }

    symbolItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');

        item.addEventListener('mouseenter', function() {
            showLabel(this);
        });

        item.addEventListener('mouseleave', hideLabel);

        item.addEventListener('focus', function() {
            showLabel(this);
        });

        item.addEventListener('blur', hideLabel);

        item.addEventListener('click', function(e) {
            if (symbolLabel.classList.contains('active') && symbolLabel.textContent === formatSymbolName(this.getAttribute('data-symbol'))) {
                hideLabel();
            } else {
                showLabel(this);
            }
        });
    });

    // Dismiss label on tap outside (mobile)
    document.addEventListener('click', function(e) {
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
