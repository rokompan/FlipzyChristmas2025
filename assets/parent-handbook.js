(function () {
  function initParentHandbookPrint(root) {
    var scope = root || document;
    var buttons = scope.querySelectorAll('[data-flipzy-handbook-print]');

    buttons.forEach(function (button) {
      if (button.dataset.flipzyPrintBound === 'true') return;

      button.dataset.flipzyPrintBound = 'true';
      button.addEventListener('click', function () {
        window.print();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initParentHandbookPrint(document);
    });
  } else {
    initParentHandbookPrint(document);
  }

  document.addEventListener('shopify:section:load', function (event) {
    initParentHandbookPrint(event.target);
  });
})();
