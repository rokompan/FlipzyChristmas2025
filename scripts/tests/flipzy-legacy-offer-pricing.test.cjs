const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../..');
const browserWindow = {};
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/flipzy-legacy-offer-pricing.js'), 'utf8'), { window: browserWindow });
const pricing = browserWindow.FlipzyLegacyOfferPricing;
const parseJson = source => JSON.parse(source.replace(/^(?:\s*\/\*[\s\S]*?\*\/)+\s*/, ''));
const template = parseJson(fs.readFileSync(path.join(root, 'templates/index.json'), 'utf8'));
const settings = template.sections.flipzy_offer_tiles_ndRRqR.settings;
const english = parseJson(fs.readFileSync(path.join(root, 'locales/en.default.json'), 'utf8'));

test('legacy native quantity tiers preserve cents and match the merchant offer', () => {
  assert.deepEqual([1,2,3,4].map(q => pricing.total(3900,q)), [3900,7020,7722,10140]);
  assert.equal(pricing.total(3499,2), 6300);
  assert.equal(pricing.total(3499,3), 6930);
  assert.equal(pricing.total(3499,4), 9100);
  assert.equal(pricing.total(4699,3), 9306);
  for (const q of [2,3,4]) assert.equal(settings[`qty_${q}_discount`], pricing.discounts[q]);
});

test('display uses the storefront locale and the active currency without hiding cents', () => {
  assert.equal(pricing.format(7020,'EUR','en'), new Intl.NumberFormat('en',{style:'currency',currency:'EUR'}).format(70.2));
  for (const [currency,locale] of [['GBP','en-GB'],['CZK','cs'],['HUF','hu'],['PLN','pl'],['CHF','de-CH']]) {
    assert.equal(pricing.format(10140,currency,locale), new Intl.NumberFormat(locale,{style:'currency',currency}).format(101.4));
  }
});

function renderInline(source) {
  return source.replace(/\{\{[\s\S]*?\}\}/g, token => {
    const translation = token.match(/'([^']+)'\s*\|\s*t/);
    if (translation) return JSON.stringify(translation[1].split('.').reduce((value,key) => value?.[key],english) || translation[1]);
    if (token.includes('cart.currency.iso_code')) return '"EUR"';
    const setting = token.match(/section.settings.(qty_[234]_discount)/);
    if (setting) return JSON.stringify(settings[setting[1]]);
    if (token.includes('variant.price') || token.includes('variant.compare_at_price')) return '3900';
    if (token.includes('shop.money_format')) return '"€{{ amount }}"';
    return token.includes('section.id') ? 'test-section' : '"stub"';
  });
}

test('main offer and sticky price both render the same discounted amount', () => {
  const elements = new Map(['offer-total-price','offer-compare-price','offer-shipping-text','sticky-price-new'].map(id => [id,{innerText:'',style:{}}]));
  const doc = { documentElement:{lang:'en'}, querySelectorAll:()=>[], getElementById:id=>elements.get(id), addEventListener(){} };
  const context = { window:browserWindow, document:doc, console };
  vm.createContext(context);
  for (const name of ['flipzy-offer-tiles','flipzy-sticky-bar']) {
    const source = fs.readFileSync(path.join(root,`sections/${name}.liquid`),'utf8');
    for (const match of source.matchAll(/<script>([\s\S]*?)<\/script>/g)) vm.runInContext(renderInline(match[1]),context);
  }
  for (const [quantity,expected] of [[2,7020],[3,7722],[4,10140]]) {
    context.selectOfferQty(quantity,{classList:{add(){}}});
    context.updateStickyPrice({value:String(quantity)});
    assert.equal(elements.get('offer-total-price').innerText,pricing.format(expected,'EUR','en'));
    assert.equal(elements.get('sticky-price-new').innerText,pricing.format(expected,'EUR','en'));
    assert.equal(elements.get('offer-shipping-text').innerText,english.sections.flipzy_offer[`offer_${quantity}`]);
  }
});

test('cart upgrade arithmetic and all configured locales describe the same tiers', () => {
  const cart = fs.readFileSync(path.join(root,'snippets/cart-drawer.liquid'),'utf8');
  for (const [quantity,percent] of [[2,10],[3,34],[4,35]]) {
    assert.match(cart,new RegExp(`assign discount${quantity} = base_variant_price \\| times: ${(percent / 100).toFixed(2).replace('.','\\.')} \\| floor`));
    assert.match(cart,new RegExp(`assign target_total_price = base_variant_price \\| minus: discount${quantity} \\| times: target_qty`));
    assert.equal((3499-Math.floor(3499*percent/100))*quantity,pricing.total(3499,quantity));
  }
  assert.doesNotMatch(cart,/divided_by: 100\.0 \| ceil \| times: 100/);
  for (const lang of ['en.default','sl','de','hr','it','fr','es','cs','pl','hu','ro','sk','bg','da']) {
    const locale = parseJson(fs.readFileSync(path.join(root,`locales/${lang}.json`),'utf8'));
    assert.match(locale.sections.flipzy_offer.offer_2,/10/);
    assert.match(locale.sections.flipzy_offer.offer_3,/34/);
    assert.match(locale.sections.flipzy_offer.offer_4,/35/);
    assert.match(locale.sections.cart_upsell.upsell_3_sub,/34/);
    assert.match(locale.sections.cart_upsell.upsell_2_sub,/35/);
  }
});
