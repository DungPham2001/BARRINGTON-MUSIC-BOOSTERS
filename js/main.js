(function () {
  'use strict';
  var EMAIL = 'cutestshortie@gmail.com';

  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');

  function setMenu(open) {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }
  toggle.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });

  // Highlight the nav link of the section currently in view
  var links = Array.prototype.slice.call(menu.querySelectorAll('li a'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    links.forEach(function (a) {
      var s = document.querySelector(a.getAttribute('href'));
      if (s) io.observe(s);
    });
  }

  document.getElementById('year').textContent = new Date().getFullYear();

  // Contact form: validate, then open the visitor's email app (no backend required)
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements['name'].value.trim();
    var email = form.elements['email'].value.trim();
    var message = form.elements['message'].value.trim();
    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    [form.elements['name'], form.elements['email'], form.elements['message']].forEach(function (f) { f.classList.remove('invalid'); });
    if (!name) form.elements['name'].classList.add('invalid');
    if (!valid) form.elements['email'].classList.add('invalid');
    if (!message) form.elements['message'].classList.add('invalid');

    if (!name || !valid || !message) {
      status.className = 'form__status error';
      status.textContent = 'Please fill in your name, a valid email and a message.';
      return;
    }
    var subject = 'Message from ' + name + ' via website';
    var body = message + '\n\n--\n' + name + '\n' + email;
    status.className = 'form__status ok';
    status.textContent = 'Thank you! Your email app should open now. If not, write to ' + EMAIL + '.';
    window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    form.reset();
  });
})();
