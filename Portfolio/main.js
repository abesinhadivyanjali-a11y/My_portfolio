/* =====================================================
   PORTFOLIO — main.js
   Apsara Divyanjali | Material Technology Portfolio
   ===================================================== */

// -------------------------------------------------------
// 1. INIT ICONS (Lucide)
// -------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  // -------------------------------------------------------
  // 2. NAVIGATION — scroll effect & hamburger
  // -------------------------------------------------------
  const nav        = document.getElementById('nav');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // -------------------------------------------------------
  // 3. ACTIVE NAV LINK — highlight on scroll
  // -------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__links a');

  const highlightNav = () => {
    let current = '';
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 100;
      if (window.scrollY >= secTop) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  // -------------------------------------------------------
  // 4. SCROLL REVEAL — IntersectionObserver
  // -------------------------------------------------------
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  // -------------------------------------------------------
  // 5. SKILL BARS — animate when in view
  // -------------------------------------------------------
  const skillFills = document.querySelectorAll('.skill__fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const pct = entry.target.getAttribute('data-pct');
        entry.target.style.width = pct + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillFills.forEach(fill => barObserver.observe(fill));

  // -------------------------------------------------------
  // 6. CONTACT FORM — basic demo handler
  //    CHANGE: Replace with actual fetch to Formspree or your backend
  // -------------------------------------------------------
  const form     = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      /*
       * TO ENABLE REAL SUBMISSIONS:
       * 1. Create a free account at https://formspree.io
       * 2. Get your form endpoint URL
       * 3. Replace the action attribute in index.html:
       *    <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
       * 4. Remove the e.preventDefault() above and the fake delay below
       *
       * Or use EmailJS, Netlify Forms, etc.
       */

      // Fake delay for demo
      await new Promise(r => setTimeout(r, 1200));

      formNote.className = 'form__note success';
      formNote.textContent = '✓ Message sent! I\'ll get back to you soon.';
      form.reset();

      submitBtn.disabled = false;
      submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg> Send Message';
      lucide.createIcons(); // re-render icon
    });
  }

  // -------------------------------------------------------
  // 7. FOOTER YEAR — auto-update copyright year
  // -------------------------------------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
