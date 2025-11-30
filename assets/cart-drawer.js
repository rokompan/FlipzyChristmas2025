class CartDrawer extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
    const overlay = this.querySelector('#CartDrawer-Overlay');
    if (overlay) {
      overlay.addEventListener('click', this.close.bind(this));
    }
    this.setHeaderCartIconAccessibility();
  }

  setHeaderCartIconAccessibility() {
    const cartLink = document.querySelector('#cart-icon-bubble');
    if (!cartLink) return;

    cartLink.setAttribute('role', 'button');
    cartLink.setAttribute('aria-haspopup', 'dialog');
    cartLink.addEventListener('click', (event) => {
      event.preventDefault();
      this.open(cartLink);
    });
    cartLink.addEventListener('keydown', (event) => {
      if (event.code.toUpperCase() === 'SPACE') {
        event.preventDefault();
        this.open(cartLink);
      }
    });
  }

  open(triggeredBy) {
    if (triggeredBy) this.setActiveElement(triggeredBy);
    const cartDrawerNote = this.querySelector('[id^="Details-"] summary');
    if (cartDrawerNote && !cartDrawerNote.hasAttribute('role')) this.setSummaryAccessibility(cartDrawerNote);
    
    setTimeout(() => {
      this.classList.add('animate', 'active');
    });

    this.addEventListener(
      'transitionend',
      () => {
        const containerToTrapFocusOn = this.classList.contains('is-empty')
          ? this.querySelector('.drawer__inner-empty')
          : document.getElementById('CartDrawer');
        
        const focusElement = this.querySelector('.drawer__inner') || this.querySelector('.drawer__close');
        
        // --- FLIPZY FIX 1: Varovalka za trapFocus ---
        // Če element ne obstaja (ker se HTML še nalaga ali je error), ne kliči trapFocus, da ne sesuješ strani.
        if (containerToTrapFocusOn && focusElement && typeof trapFocus === 'function') {
           trapFocus(containerToTrapFocusOn, focusElement);
        }
        // --------------------------------------------
      },
      { once: true }
    );

    document.body.classList.add('overflow-hidden');
  }

  close() {
    this.classList.remove('active');
    if (typeof removeTrapFocus === 'function' && this.activeElement) {
        removeTrapFocus(this.activeElement);
    }
    document.body.classList.remove('overflow-hidden');
  }

  setSummaryAccessibility(cartDrawerNote) {
    cartDrawerNote.setAttribute('role', 'button');
    cartDrawerNote.setAttribute('aria-expanded', 'false');

    if (cartDrawerNote.nextElementSibling && cartDrawerNote.nextElementSibling.getAttribute('id')) {
      cartDrawerNote.setAttribute('aria-controls', cartDrawerNote.nextElementSibling.id);
    }

    cartDrawerNote.addEventListener('click', (event) => {
      event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
    });

    cartDrawerNote.parentElement.addEventListener('keyup', onKeyUpEscape);
  }

  renderContents(parsedState) {
    const innerDrawer = this.querySelector('.drawer__inner');
    if (innerDrawer && innerDrawer.classList.contains('is-empty')) {
        innerDrawer.classList.remove('is-empty');
    }

    this.productId = parsedState.id;
    
    this.getSectionsToRender().forEach((section) => {
      const sectionElement = section.selector
        ? document.querySelector(section.selector)
        : document.getElementById(section.id);

      if (!sectionElement) return;

      const htmlContent = this.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
      
      // --- FLIPZY FIX 2: Preveri, če imamo vsebino ---
      if (htmlContent) {
          sectionElement.innerHTML = htmlContent;
      } else {
          // Če selector ni našel ničesar, morda HTML struktura ne ustreza.
          // Poskusimo vstaviti celoten response (fallback), da vsaj nekaj prikažemo.
          if (parsedState.sections[section.id]) {
             // Zadnji poskus: samo vstavimo raw HTML
             // To pomaga, če ID #CartDrawer manjka v response-u
             sectionElement.innerHTML = parsedState.sections[section.id];
          }
      }
    });

    setTimeout(() => {
      const overlay = this.querySelector('#CartDrawer-Overlay');
      if (overlay) overlay.addEventListener('click', this.close.bind(this));
      this.open();
    });
  }

  getSectionInnerHTML(html, selector = '.shopify-section') {
    // --- FLIPZY FIX 3: Robustno parsanje ---
    if (!html) return '';
    
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const el = doc.querySelector(selector);
    
    // Če najdemo točno določen selector (npr #CartDrawer), vrnemo njegov innerHTML
    if (el) return el.innerHTML;
    
    // Če selectorja ne najdemo (npr. ker je ID na wrapperju), vrnemo raje celo telo, 
    // kot pa da vrnemo prazno in pokažemo bel zaslon.
    if (doc.body && doc.body.innerHTML.trim().length > 0) {
        return doc.body.innerHTML;
    }

    return '';
  }

  getSectionsToRender() {
    return [
      {
        id: 'cart-drawer',
        selector: '#CartDrawer',
      },
      {
        id: 'cart-icon-bubble',
      },
    ];
  }

  getSectionDOM(html, selector = '.shopify-section') {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector);
  }

  setActiveElement(element) {
    this.activeElement = element;
  }
}

customElements.define('cart-drawer', CartDrawer);

class CartDrawerItems extends CartItems {
  getSectionsToRender() {
    return [
      {
        id: 'CartDrawer',
        section: 'cart-drawer',
        selector: '.drawer__inner',
      },
      {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section',
      },
    ];
  }
}

customElements.define('cart-drawer-items', CartDrawerItems);