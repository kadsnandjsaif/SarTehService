(function () {
  'use strict';

  const FORMSPREE_ID = 'xgoljaoz';

  function initSlider() {
    var track = document.getElementById('slider-track');
    var iconsWrap = document.getElementById('appliance-icons');
    if (!track || !iconsWrap) return;

    var current = 0;
    var slides = track.querySelectorAll('.slider-slide');
    var buttons = iconsWrap.querySelectorAll('.appliance-btn');

    function goTo(idx) {
      if (idx === current) return;
      slides[current].classList.remove('active');
      buttons[current].classList.remove('active');
      buttons[current].setAttribute('aria-pressed', 'false');
      current = idx;
      slides[current].classList.add('active');
      buttons[current].classList.add('active');
      buttons[current].setAttribute('aria-pressed', 'true');
    }

    iconsWrap.addEventListener('click', function(e) {
      var btn = e.target.closest('.appliance-btn');
      if (!btn) return;
      goTo(+btn.dataset.index);
    });
  }

  function initWhy() {
    var grid = document.getElementById('why-grid');
    if (!grid) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    grid.querySelectorAll('.why-card').forEach(function(el) { observer.observe(el); });
  }

  function initFAQ() {
    var list = document.getElementById('faq-list');
    if (!list) return;

    var openItem = list.querySelector('.faq-item.open');
    var openId = openItem ? +openItem.dataset.id : null;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    list.querySelectorAll('.faq-item').forEach(function(el) { observer.observe(el); });

    list.addEventListener('click', function(e) {
      var trigger = e.target.closest('.faq-trigger');
      if (!trigger) return;
      var item = trigger.closest('.faq-item');
      var id = +item.dataset.id;
      openId = openId === id ? null : id;
      list.querySelectorAll('.faq-item').forEach(function(el) {
        var isOpen = +el.dataset.id === openId;
        el.classList.toggle('open', isOpen);
        var t = el.querySelector('.faq-trigger');
        if (t) t.setAttribute('aria-expanded', isOpen);
      });
    });
  }

  function initHeroCards() {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.hero-card').forEach(function(el) { observer.observe(el); });
  }

  function formatPhone(value) {
    var digits = value.replace(/\D/g, '');
    if (digits.length === 0) return '';
    if (digits[0] === '8') digits = '7' + digits.slice(1);
    if (digits[0] !== '7') digits = '7' + digits;
    var result = '+7';
    if (digits.length > 1) result += ' (' + digits.slice(1, 4);
    if (digits.length >= 4) result += ') ';
    if (digits.length > 4) result += digits.slice(4, 7);
    if (digits.length > 7) result += '-' + digits.slice(7, 9);
    if (digits.length > 9) result += '-' + digits.slice(9, 11);
    return result;
  }

  function isValidPhone(value) {
    var digits = value.replace(/\D/g, '');
    return digits.length === 11 && digits[0] === '7';
  }

  function initForms() {
    var modal = document.getElementById('modal-overlay');
    var modalClose = document.getElementById('modal-close');

    document.querySelectorAll('.input-wrap input[type="tel"]').forEach(function(input) {
      input.addEventListener('input', function () {
        var pos = this.selectionStart;
        var before = this.value.length;
        this.value = formatPhone(this.value);
        var after = this.value.length;
        var newPos = pos + (after - before);
        this.setSelectionRange(newPos, newPos);
      });
      input.addEventListener('focus', function () {
        if (!this.value) this.value = '+7 (';
      });
      input.addEventListener('blur', function () {
        if (this.value === '+7 (' || this.value === '+7') this.value = '';
      });
    });

    document.querySelectorAll('.lead-form-inner').forEach(function(form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var phoneInput = this.querySelector('input[type="tel"]');
        if (phoneInput && !isValidPhone(phoneInput.value)) {
          phoneInput.classList.add('input-error');
          phoneInput.focus();
          setTimeout(function() { phoneInput.classList.remove('input-error'); }, 2000);
          return;
        }
        var submitBtn = this.querySelector('.btn-submit');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Отправка...';
        }

        var formData = new FormData(form);
        fetch('https://formspree.io/f/' + FORMSPREE_ID, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        }).then(function(response) {
          if (response.ok) {
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Отправить заявку'; }
            form.reset();
            if (modal) { modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); }
          } else {
            throw new Error('Formspree error');
          }
        }).catch(function() {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Отправить заявку'; }
          alert('Ошибка отправки. Попробуйте позже или позвоните нам.');
        });
      });
    });

    if (modalClose && modal) {
      modalClose.addEventListener('click', function() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
      });
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          modal.classList.remove('open');
          modal.setAttribute('aria-hidden', 'true');
        }
      });
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
          modal.classList.remove('open');
          modal.setAttribute('aria-hidden', 'true');
        }
      });
    }
  }

  function initAutoSlider(trackId, interval) {
    var track = document.getElementById(trackId);
    if (!track) return;
    var slides = track.querySelectorAll('img');
    if (slides.length === 0) return;
    var idx = 0;
    setInterval(function () {
      idx = (idx + 1) % slides.length;
      track.style.transform = 'translateX(-' + idx * 100 + '%)';
    }, interval || 4000);
  }

  function initVideoReviews() {
    var overlay = document.getElementById('video-modal');
    var body = document.getElementById('video-modal-body');
    var closeBtn = document.getElementById('video-modal-close');
    if (!overlay || !body) return;

    function openVideo(src) {
      body.innerHTML = '<iframe src="' + src + '" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
    }
    function closeVideo() {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      body.innerHTML = '';
    }

    document.querySelectorAll('.review-card[data-video]').forEach(function(card) {
      card.addEventListener('click', function() {
        openVideo(this.dataset.video);
      });
    });
    if (closeBtn) closeBtn.addEventListener('click', closeVideo);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) closeVideo(); });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeVideo();
    });
  }

  function run() {
    initSlider();
    initAutoSlider('hero-slider-track', 4000);
    initAutoSlider('slider-banner-track', 4500);
    initWhy();
    initVideoReviews();
    initFAQ();
    initHeroCards();
    initForms();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
