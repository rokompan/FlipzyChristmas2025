/* The original Flipzy set has its own native Shopify quantity offer. */
window.FlipzyLegacyOfferPricing ||= {
  discounts: { 1: 0, 2: 10, 3: 34, 4: 35 },
  total(unitPrice, quantity, percent = this.discounts[quantity] || 0) {
    // Shopify floors percentage product discounts per unit before multiplying
    // quantity. Keep hundredths until the currency formatter displays the total.
    return (unitPrice - Math.floor(unitPrice * percent / 100)) * quantity;
  },
  format(amount, currency, locale) {
    return new Intl.NumberFormat(locale || 'en', { style: 'currency', currency }).format(amount / 100);
  },
};
