document.addEventListener('DOMContentLoaded', function() {
    const symbolItems = document.querySelectorAll('.symbol-item');
    const symbolLabel = document.getElementById('symbolLabel');

    function formatSymbolName(symbolData) {
        let formatted = symbolData.replace(/^\d+[A-C]?\./, '');
        formatted = formatted.replace(/\./g, ' ');
        formatted = formatted.replace(/\(([^)]+)\)/g, '($1)');
        return formatted.trim();
    }

    symbolItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const symbolData = this.getAttribute('data-symbol');
            const formattedName = formatSymbolName(symbolData);
            symbolLabel.textContent = formattedName;
            symbolLabel.classList.add('active');
        });

        item.addEventListener('mouseleave', function() {
            symbolLabel.classList.remove('active');
        });
    });

    symbolLabel.addEventListener('transitionend', function() {
        if (!this.classList.contains('active')) {
            this.textContent = '';
        }
    });

    function adjustGridLayout() {
        const container = document.querySelector('.grid-container');
        const items = container.children;
        const itemCount = items.length;
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
    window.addEventListener('resize', adjustGridLayout);
});