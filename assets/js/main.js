(function () {
  var root = document.documentElement;

  /* ---------- Theme toggle ---------- */
  var toggle = document.querySelector('.theme-toggle');
  function setIcon() {
    toggle.querySelector('i').className =
      root.getAttribute('data-theme') === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
  toggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (err) {}
    setIcon();
  });
  setIcon();

  /* ---------- Active section in the sidebar ---------- */
  var links = document.querySelectorAll('.side-nav a');
  var sections = Array.prototype.map.call(links, function (a) {
    return document.querySelector(a.getAttribute('href'));
  });
  function onScroll() {
    var y = window.scrollY + window.innerHeight * 0.3;
    var idx = 0;
    sections.forEach(function (s, i) { if (s && s.offsetTop <= y) idx = i; });
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) idx = sections.length - 1;
    links.forEach(function (a, i) { a.classList.toggle('active', i === idx); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Publication filters ---------- */
  var tabs = document.querySelectorAll('.tab');
  var pubs = document.querySelectorAll('.pub');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var f = tab.getAttribute('data-filter');
      tabs.forEach(function (t) { t.classList.toggle('active', t === tab); });
      pubs.forEach(function (p) {
        var show = f === 'all' || p.getAttribute('data-type') === f;
        p.classList.toggle('is-hidden', !show);
      });
    });
  });
})();
