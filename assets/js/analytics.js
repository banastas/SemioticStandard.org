// Load analytics after the gallery is interactive so it never blocks first paint.
(function () {
  'use strict';

  function loadAnalytics() {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-5C5ET6DMNM';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', 'G-5C5ET6DMNM', { anonymize_ip: true });
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(loadAnalytics, { timeout: 3000 });
  } else {
    window.addEventListener('load', function () {
      window.setTimeout(loadAnalytics, 1500);
    });
  }
})();
