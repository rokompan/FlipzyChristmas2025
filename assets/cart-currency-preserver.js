/**
 * Flipzy Custom COD Currency Preserver
 * 
 * Saves the local currency and presentment total to the cart attributes
 * right before checkout so that Cash on Delivery orders retain the correct
 * customer-facing currency value instead of defaulting to EUR.
 */

(function () {
  document.addEventListener('submit', function (e) {
    const form = e.target;
    if (form.getAttribute('action') === '/cart' && form.querySelector('[name="checkout"]')) {
      // Find the checkout button that was clicked to submit the form (if any)
      const submitter = e.submitter;
      if (submitter && submitter.name === 'checkout') {
        interceptCheckout(e, form);
      }
    }
  });

  document.addEventListener('click', function (e) {
    const target = e.target.closest('a[href="/checkout"], button[name="checkout"], input[name="checkout"]');
    if (target) {
      // For links and non-form submit buttons
      if (!target.closest('form[action="/cart"]')) {
        interceptCheckout(e, target);
      }
    }
  });

  function interceptCheckout(e, triggerElement) {
    // Only intercept once
    if (triggerElement.dataset.currencyPreserved === 'true') {
      return; 
    }

    e.preventDefault();
    e.stopImmediatePropagation(); // Try to prevent default Shopify submit

    // Extract presentment total from DOM
    // Cart drawer usually updates `.totals__total-value`
    const totalEl = document.querySelector('.totals__total-value');
    let presentmentTotalRaw = '';
    let presentmentCurrency = '';
    let presentmentTotalNumeric = '';

    if (totalEl) {
      presentmentTotalRaw = totalEl.textContent.trim();
      
      // Attempt to parse currency and numeric amount
      // e.g. "362,07 PLN" -> currency "PLN", numeric "362.07"
      // e.g. "€100.00" -> currency "€", numeric "100.00"
      // e.g. "271,80 zł" -> currency "zł", numeric "271.80"
      
      // Match any letters (e.g. PLN) or common currency symbols (e.g. €, £, zł)
      const currencyMatch = presentmentTotalRaw.match(/[A-Z]{3}|€|£|\$|zł/i);
      if (currencyMatch) {
         presentmentCurrency = currencyMatch[0];
      }
      
      // Extract numbers and comma/dot
      const numberMatch = presentmentTotalRaw.match(/[\d\.,\s]+/);
      if (numberMatch) {
         // clean up spaces, replace comma with dot for saving standard numeric
         presentmentTotalNumeric = numberMatch[0].replace(/\s/g, '').replace(',', '.');
      }
    }

    if (!presentmentCurrency) {
      // fallback if we can't parse it (Shopify native object if available)
      if (window.Shopify && window.Shopify.currency && window.Shopify.currency.active) {
         presentmentCurrency = window.Shopify.currency.active;
      }
    }

    const shopCurrency = 'EUR'; // Base store currency context

    // Prepare attributes payload
    const data = {
      attributes: {
        'customer_presentment_currency': presentmentCurrency,
        'customer_presentment_total': presentmentTotalNumeric,
        'customer_presentment_total_raw': presentmentTotalRaw,
        'shop_currency': shopCurrency
      }
    };

    // If trigger element is a button, visually show loading
    const isButton = triggerElement.tagName === 'BUTTON' || triggerElement.tagName === 'INPUT';
    let originalText = '';
    if (isButton) {
      originalText = triggerElement.innerHTML || triggerElement.value;
      if (triggerElement.tagName === 'BUTTON') {
        triggerElement.innerHTML = '...';
      } else {
        triggerElement.value = '...';
      }
      triggerElement.style.opacity = '0.7';
      triggerElement.style.pointerEvents = 'none';
    }

    // Save attributes via AJAX API
    fetch('/cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => {
      console.warn('Currency preserver error (non-fatal):', error);
    })
    .finally(() => {
      // Mark as preserved to bypass interception on retry
      triggerElement.dataset.currencyPreserved = 'true';

      // Restore button state just in case redirect takes a moment
      if (isButton) {
        if (triggerElement.tagName === 'BUTTON') {
          triggerElement.innerHTML = originalText;
        } else {
          triggerElement.value = originalText;
        }
        triggerElement.style.opacity = '1';
        triggerElement.style.pointerEvents = 'auto';
      }

      // Resume checkout
      if (triggerElement.tagName === 'FORM') {
         // Trigger the submit programmatically bypassing the listener
         HTMLFormElement.prototype.submit.call(triggerElement);
      } else if (triggerElement.tagName === 'A') {
         window.location.href = triggerElement.href;
      } else if (triggerElement.closest('form')) {
         // Button inside a form
         HTMLFormElement.prototype.submit.call(triggerElement.closest('form'));
      } else {
         // Fallback just redirect
         window.location.href = '/checkout';
      }
    });
  }
})();
