/* ============ Jan Mall — interactions ============ */
(function () {
  'use strict';

  var WA_NUMBER = '923365583334';

  /* ----- Build per-item WhatsApp order links ----- */
  function waLink(message) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
  }
  document.querySelectorAll('.wa-order').forEach(function (el) {
    var item = el.getAttribute('data-item') || 'an item from your collection';
    el.href = waLink(
      'Hello Jan Mall! I would like to order: ' + item + '. Please confirm size and availability. Thank you!'
    );
  });

  /* ----- Mobile hamburger menu ----- */
  var burger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  function closeMenu() {
    burger.classList.remove('active');
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
  }
  burger.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    burger.classList.toggle('active', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ----- Reveal on scroll ----- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ----- Animated stat counters ----- */
  var counters = document.querySelectorAll('.stat-num[data-count]');
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var duration = 1400;
    var start = null;
    function fmt(n) { return n >= 1000 ? n.toLocaleString('en-PK') : String(n); }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = fmt(target);
      return;
    }
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ----- Testimonial slider ----- */
  var slidesWrap = document.getElementById('slides');
  var slides = slidesWrap.querySelectorAll('.slide');
  var dotsWrap = document.getElementById('dots');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var index = 0;
  var timer = null;

  slides.forEach(function (_, i) {
    var dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', 'Show review ' + (i + 1));
    dot.addEventListener('click', function () { goTo(i); restart(); });
    dotsWrap.appendChild(dot);
  });
  var dots = dotsWrap.querySelectorAll('.dot');

  function goTo(i) {
    slides[index].classList.remove('active');
    dots[index].classList.remove('active');
    index = (i + slides.length) % slides.length;
    slides[index].classList.add('active');
    dots[index].classList.add('active');
  }
  function restart() {
    if (timer) clearInterval(timer);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timer = setInterval(function () { goTo(index + 1); }, 6000);
    }
  }
  prevBtn.addEventListener('click', function () { goTo(index - 1); restart(); });
  nextBtn.addEventListener('click', function () { goTo(index + 1); restart(); });
  document.getElementById('slider').addEventListener('mouseenter', function () {
    if (timer) clearInterval(timer);
  });
  document.getElementById('slider').addEventListener('mouseleave', restart);
  slides[0].classList.add('active');
  restart();

  /* ----- Enquiry form: validate, then open WhatsApp ----- */
  var form = document.getElementById('enquiryForm');
  var nameInput = document.getElementById('fname');
  var phoneInput = document.getElementById('fphone');
  var itemInput = document.getElementById('fitem');
  var msgInput = document.getElementById('fmsg');

  function setInvalid(input, bad) {
    input.closest('.field').classList.toggle('invalid', bad);
    return !bad;
  }
  function validate() {
    var ok = true;
    ok = setInvalid(nameInput, nameInput.value.trim().length < 2) && ok;
    ok = setInvalid(phoneInput, !/^[0-9+\-\s]{7,16}$/.test(phoneInput.value.trim())) && ok;
    ok = setInvalid(msgInput, msgInput.value.trim().length < 5) && ok;
    return ok;
  }
  [nameInput, phoneInput, msgInput].forEach(function (input) {
    input.addEventListener('input', function () {
      input.closest('.field').classList.remove('invalid');
    });
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;
    var message =
      'Hello Jan Mall! New website enquiry:\n' +
      'Name: ' + nameInput.value.trim() + '\n' +
      'Phone: ' + phoneInput.value.trim() + '\n' +
      'Interested in: ' + itemInput.value + '\n' +
      'Message: ' + msgInput.value.trim();
    window.open(waLink(message), '_blank', 'noopener');
    form.reset();
  });
})();
