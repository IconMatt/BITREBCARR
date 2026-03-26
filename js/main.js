// =============================================================================
// Touch hover — card components
// On touch screens, tapping a card triggers the .is-touched class which
// mirrors all :hover styles. A second tap on the same card follows the link.
// Tapping outside removes the state from all cards.
// =============================================================================

(function () {
  'use strict';

  function initCardTouch() {
    var cards = document.querySelectorAll('.card');

    function clearAll(except) {
      cards.forEach(function (c) {
        if (c !== except) c.classList.remove('is-touched');
      });
    }

    cards.forEach(function (card) {
      card.addEventListener('touchstart', function (e) {
        // If this card is already in the touched state, let the tap fall
        // through naturally (follows the link inside).
        if (card.classList.contains('is-touched')) return;

        // Otherwise: show hover state and prevent the immediate link follow.
        e.preventDefault();
        clearAll(card);
        card.classList.add('is-touched');
      }, { passive: false });
    });

    // Tap anywhere outside a card → clear all touched states
    document.addEventListener('touchstart', function (e) {
      if (!e.target.closest('.card')) {
        clearAll(null);
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCardTouch);
  } else {
    initCardTouch();
  }
})();
