// =============================================================================
// Touch hover — card components
// Adds .is-touched on finger down (mirrors :hover styles), removes it after
// a short delay on finger up so the state clears when the tap ends.
// =============================================================================

(function () {
  'use strict';

  function initCardTouch() {
    var cards = document.querySelectorAll('.card');

    cards.forEach(function (card) {
      var startX, startY, didScroll;

      card.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        didScroll = false;
      }, { passive: true });

      card.addEventListener('touchmove', function (e) {
        if (Math.abs(e.touches[0].clientX - startX) > 8 ||
            Math.abs(e.touches[0].clientY - startY) > 8) {
          didScroll = true;
        }
      }, { passive: true });

      card.addEventListener('touchend', function () {
        if (didScroll) return; // swipe gesture — don't trigger hover state
        cards.forEach(function (c) { c.classList.remove('is-touched'); });
        card.classList.add('is-touched');
        setTimeout(function () {
          card.classList.remove('is-touched');
        }, 150);
      }, { passive: true });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCardTouch);
  } else {
    initCardTouch();
  }
})();
