// =============================================================================
// Parallax — topic hero banner image
// Translates the banner image upward at ~30% of scroll speed for depth.
// Skipped on devices that prefer reduced motion.
// =============================================================================

(function () {
  'use strict';

  function initHeroParallax() {
    var img = document.querySelector('.hero__banner-image');
    if (!img) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var hero = img.closest('.hero--topic');
    if (!hero) return;

    var ticking = false;

    function update() {
      var heroRect = hero.getBoundingClientRect();
      // Only run while hero is in view
      if (heroRect.bottom < 0 || heroRect.top > window.innerHeight) {
        ticking = false;
        return;
      }
      // Shift image up proportionally — 0.3 gives a subtle effect
      var offset = (window.scrollY - hero.offsetTop) * 0.08;
      img.style.transform = 'translateY(' + offset + 'px)';
      ticking = false;
    }

    // Parallax for desktop device SVG (slightly different speed for depth)
    var device = document.querySelector('.hero__banner-device--desktop');

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    function updateDevice() {
      var heroRect = hero.getBoundingClientRect();
      if (heroRect.bottom < 0 || heroRect.top > window.innerHeight) return;
      var offset = (window.scrollY - hero.offsetTop) * -0.05;
      if (device) device.style.transform = 'translateY(' + offset + 'px)';
    }

    if (device) {
      window.addEventListener('scroll', function () {
        requestAnimationFrame(updateDevice);
      }, { passive: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroParallax);
  } else {
    initHeroParallax();
  }
})();

// =============================================================================
// Subscribe banner — decorative device grid slow rotation on scroll
// Rotates the bg SVG a few degrees as the banner scrolls through the viewport.
// =============================================================================

(function () {
  'use strict';

  function initSubscribeRotate() {
    var bg = document.querySelector('.subscribe-banner__bg');
    if (!bg) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var banner = bg.closest('.subscribe-banner');
    if (!banner) return;

    var ticking = false;

    function update() {
      var rect = banner.getBoundingClientRect();
      // Progress: 0 when banner bottom enters viewport, 1 when top leaves
      var progress = 1 - (rect.bottom / (window.innerHeight + rect.height));
      // Clamp to [-0.1, 1.1] to avoid jank at edges
      progress = Math.max(-0.1, Math.min(1.1, progress));
      // Map to a small rotation range: -4deg to +4deg
      var deg = (progress - 0.5) * 24;
      bg.style.transform = 'translateY(-50%) rotate(' + deg.toFixed(2) + 'deg)';
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSubscribeRotate);
  } else {
    initSubscribeRotate();
  }
})();

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

// =============================================================================
// Back to top
// Reveals a floating back-to-top button after the lead section has been passed.
// Safe on pages without the trigger element.
// =============================================================================

(function () {
  'use strict';

  function initBackToTop() {
    var buttons = document.querySelectorAll('.js-back-to-top');
    if (!buttons.length) return;

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    buttons.forEach(function (button) {
      var selector = button.getAttribute('data-show-after');
      var anchor = selector ? document.querySelector(selector) : null;
      var ticking = false;

      function getThreshold() {
        if (anchor) {
          return Math.max(anchor.offsetTop + anchor.offsetHeight - 96, 280);
        }

        return Math.max(window.innerHeight * 0.6, 280);
      }

      function update() {
        button.classList.toggle('is-visible', window.scrollY > getThreshold());
        ticking = false;
      }

      window.addEventListener('scroll', function () {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      }, { passive: true });

      window.addEventListener('resize', update);

      button.addEventListener('click', function () {
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
        });
      });

      update();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBackToTop);
  } else {
    initBackToTop();
  }
})();
