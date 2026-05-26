/* =========================================================
   Pay it Forward — main.js
   ========================================================= */
(() => {
  'use strict';

  /* ---------- Year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Loader ---------- */
  // マグロが泳ぐ演出を最低 2.4s は見せたい。
  // 画面表示開始からの経過時間と、window.load の発火を両方待ってから消す。
  const loaderStart = performance.now();
  const MIN_LOADER_MS = 2400;
  const hideLoader = () => {
    const loader = document.getElementById('loader');
    if (!loader) return;
    const elapsed = performance.now() - loaderStart;
    const wait = Math.max(0, MIN_LOADER_MS - elapsed);
    setTimeout(() => loader.classList.add('is-hidden'), wait);
  };
  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
    // 安全弁: 画像が遅い場合でも 6 秒で必ず消す
    setTimeout(hideLoader, 6000);
  }

  /* ---------- Header on scroll ---------- */
  const header = document.getElementById('header');
  const pagetop = document.getElementById('pagetop');
  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-scrolled', y > 24);
    if (pagetop) pagetop.classList.toggle('is-show', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Hamburger / Mobile Nav ---------- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Scroll Reveal ----------
     Mark candidate elements, then animate when in view. */
  const revealSelectors = [
    '.section__head',
    '.intro__copy',
    '.intro__text',
    '.intro__media',
    '.movie__wrap',
    '.phil-card',
    '.biz',
    '.shop',
    '.gal',
    '.num-card',
    '.recruit__hero',
    '.rec-card',
    '.company__row',
    '.contact__inner',
    // recruit subpage
    '.page-hero__inner',
    '.rec-message__copy',
    '.rec-message__media',
    '.reason',
    '.pay__group',
    '.case',
    '.req-row',
    '.flow-step',
    '.value-card',
    '.apply__inner',
  ];
  const revealEls = document.querySelectorAll(revealSelectors.join(','));
  revealEls.forEach((el, i) => {
    el.setAttribute('data-reveal', '');
    // 同じ親に並ぶ要素には連番ディレイ
    const sibIdx = Array.from(el.parentElement?.children || []).indexOf(el);
    if (sibIdx > 0 && sibIdx < 5) el.setAttribute('data-reveal-delay', String(sibIdx));
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-in'));
  }

  /* ---------- Counter animation ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    const duration = 1600;
    const start = performance.now();
    const startVal = 0;
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(startVal + (target - startVal) * eased).toString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toString();
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          co.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(el => co.observe(el));
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Smooth-scroll offset for fixed header ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- Hero parallax (subtle) ---------- */
  const blobs = document.querySelectorAll('.hero__blob');
  if (blobs.length && window.matchMedia('(min-width: 720px)').matches) {
    window.addEventListener('mousemove', (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5);
      const y = (e.clientY / h - 0.5);
      blobs.forEach((b, i) => {
        const mag = (i + 1) * 14;
        b.style.transform = `translate(${x * mag}px, ${y * mag}px)`;
      });
    }, { passive: true });
  }
})();
