(function () {
  var root = document.documentElement;

  /* ---------- Theme toggle ---------- */
  function setIcon() {
    var dark = root.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('.theme-toggle i').forEach(function (i) {
      i.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });
  }
  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (err) {}
      setIcon();
    });
  });
  setIcon();

  /* ---------- Mobile menu ---------- */
  var burger = document.querySelector('.nav-hamburger');
  var menu = document.getElementById('mobile-menu');
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    burger.querySelector('i').className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });
  menu.querySelectorAll('a:not(.theme-toggle)').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.querySelector('i').className = 'fa-solid fa-bars';
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  var links = document.querySelectorAll('.nav-links a[href^="#"]');
  var sections = Array.prototype.map.call(links, function (a) {
    return document.querySelector(a.getAttribute('href'));
  });
  var toTop = document.querySelector('.back-to-top');
  function onScroll() {
    var y = window.scrollY + 120;
    var idx = 0;
    sections.forEach(function (s, i) { if (s && s.offsetTop <= y) idx = i; });
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) idx = sections.length - 1;
    links.forEach(function (a, i) { a.classList.toggle('active', i === idx); });
    toTop.classList.toggle('show', window.scrollY > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ---------- Publication filters ---------- */
  var buttons = document.querySelectorAll('.filter-btn');
  var groups = document.querySelectorAll('.pub-group');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      buttons.forEach(function (b) { b.classList.toggle('active', b === btn); });
      groups.forEach(function (g) {
        var visible = 0;
        g.querySelectorAll('.paper-card').forEach(function (card) {
          var show = f === 'all' ||
            (f === 'first' ? card.hasAttribute('data-first') : card.getAttribute('data-type') === f);
          card.classList.toggle('is-hidden', !show);
          if (show) visible++;
        });
        g.classList.toggle('is-hidden', visible === 0);
      });
    });
  });

  /* ---------- Copy email ---------- */
  document.querySelectorAll('.copy-email').forEach(function (el) {
    el.addEventListener('click', function () {
      var email = el.getAttribute('data-email');
      var tip = el.querySelector('.copy-tooltip');
      function flash() { tip.classList.add('show'); setTimeout(function () { tip.classList.remove('show'); }, 1400); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(flash, function () { window.location.href = 'mailto:' + email; });
      } else {
        window.location.href = 'mailto:' + email;
      }
    });
  });
})();
