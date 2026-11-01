/* Vyla storefront: shared chrome + interactions */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const money = n => 'Rs. ' + n.toLocaleString('en-IN');
const store = { get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} } };

/* ---------- data (placeholder catalogue) ---------- */
const PRODUCTS = [
  { id: 'brass', slug: 'brass', name: 'The Vyla Filtered Showerhead', finish: 'Polished Brass', price: 4999, img: 'assets/img/prod-brass-rain.jpg', alt: 'assets/img/prod-brass-bowl.jpg', swatch: '#b8914f', kind: 'head' },
  { id: 'brushed', slug: 'brushed', name: 'The Vyla Filtered Showerhead', finish: 'Brushed Brass', price: 4999, img: 'assets/img/prod-brass-bowl.jpg', alt: 'assets/img/hands-brass.jpg', swatch: '#9c7e48', kind: 'head' },
  { id: 'chrome', slug: 'chrome', name: 'The Vyla Filtered Showerhead', finish: 'Satin Chrome', price: 4999, img: 'assets/img/prod-chrome-rain.jpg', alt: 'assets/img/silver-pot-marble.jpg', swatch: '#c9ccc9', kind: 'head' },
  { id: 'noir', slug: 'noir', name: 'The Vyla Filtered Showerhead', finish: 'Noir', price: 4999, img: 'assets/img/prod-black-hand.jpg', alt: 'assets/img/black-terracotta.jpg', swatch: '#26292a', kind: 'head' },
  { id: 'refill', slug: 'refill', name: 'The Vyla Replacement Filter', finish: 'Brass cartridge', price: 1299, img: 'assets/img/hands-brass.jpg', alt: 'assets/img/prod-silver-pot.jpg', swatch: '#b8914f', kind: 'refill' },
];
const ARTICLES = [
  { id: 'filter-shower', t: 'Do I really have to filter my shower water?', img: 'assets/img/life-back.jpg', d: 'What’s actually in shower water, from chlorine to heavy metals, and how it may impact your skin, scalp and hair over time.' },
  { id: 'skin-hair', t: 'How water affects your skin and hair', img: 'assets/img/life-hair.jpg', d: 'Hard water, chlorine and warm steam each do something different to the skin barrier and the hair cuticle.' },
  { id: 'experts', t: 'What experts think about shower water', img: 'assets/img/life-jali.jpg', d: 'Dermatologists and trichologists on why the water you wash in matters as much as what you wash with.' },
  { id: 'brass', t: 'Why we make our filters in brass', img: 'assets/img/prod-brass-bowl.jpg', d: 'Weight, warmth and a finish that ages beautifully. The case for a filter you actually want on display.' },
  { id: 'ritual', t: 'The ten-minute shower ritual', img: 'assets/img/life-mirror.jpg', d: 'Temperature, timing and order of operations for the calmest, clearest-skinned version of your morning.' },
  { id: 'install', t: 'Installing in 60 seconds', img: 'assets/img/hands-brass.jpg', d: 'No plumber, no tools. Unscrew, screw, run the water for two minutes, done.' },
];
const REVIEWS = [
  ['I moved cities and immediately noticed more shedding in the shower drain. Three months with Vyla and it’s back to a normal amount, and my hair feels softer at the roots.', 'Customer name', 'City'],
  ['My curls used to puff up within an hour of drying. With filtered water the frizz is gone and I need half the product. I did not expect water to be the problem.', 'Customer name', 'City'],
  ['My colour used to fade in about three weeks. Now I’m at six, and the tone stays warm instead of going brassy.', 'Customer name', 'City'],
  ['Flakes cleared up inside a month without changing my shampoo. The only thing I changed was the showerhead.', 'Customer name', 'City'],
  ['I stopped getting that tight, stripped feeling after showers. My skin finally holds moisturiser through the day.', 'Customer name', 'City'],
  ['My flare-ups calmed down noticeably once the chlorine was out of the picture. Quieter skin, fewer bad weeks.', 'Customer name', 'City'],
  ['I’ve had eczema patches on my arms for years. They’re calmer and I reach for the cream a lot less.', 'Customer name', 'City'],
  ['Fewer breakouts along my jaw and back. It took about six weeks to see it, then it kept improving.', 'Customer name', 'City'],
];

/* ---------- shared chrome ---------- */
const isHome = document.body.dataset.page === 'home';
const CHROME_TOP = `
<div class="curtain" aria-hidden="true"><span class="curtain__mark">vyla</span></div>
<div class="announce" role="region" aria-label="Announcements">
  <p class="announce__msg is-on">Free shipping, free 60-day returns</p>
  <p class="announce__msg">Try it 60 days risk free. Free shipping.</p>
  <p class="announce__msg">Pure water, brighter you.</p>
</div>
<header class="header ${isHome ? 'is-top' : ''}" id="header">
  <button class="header__burger" aria-label="Menu" id="burger"><span></span><span></span></button>
  <nav class="header__nav header__nav--l" aria-label="Primary">
    <a href="shop.html" class="link-u">Shop all</a>
    <a href="education.html" class="link-u">Education</a>
  </nav>
  <a href="index.html" class="header__logo" aria-label="Vyla home">vyla</a>
  <nav class="header__nav header__nav--r" aria-label="Secondary">
    <a href="water-report.html" class="link-u">Water report</a>
    <a href="faq.html" class="link-u">FAQ</a>
    <a href="account.html" class="link-u">Account</a>
    <button class="header__cart" id="cartOpen" aria-label="Open cart">
      <svg width="16" height="18" viewBox="0 0 16 18" fill="none" stroke="currentColor" stroke-width="1"><path d="M2 5.5h12l-.8 11H2.8L2 5.5Z"/><path d="M5.2 5.5V4a2.8 2.8 0 0 1 5.6 0v1.5"/></svg>
      <i id="cartCount" hidden>0</i>
    </button>
  </nav>
</header>
<aside class="mmenu" id="mmenu" aria-hidden="true">
  <a href="shop.html">Shop all</a><a href="education.html">Education</a><a href="water-report.html">Water report</a><a href="faq.html">FAQ</a><a href="account.html">Account</a>
</aside>`;
const CHROME_BOTTOM = `
<footer class="footer">
  <ul class="footer__usp"><li>Free returns within 60 days</li><li>Pure water, brighter you</li><li>Free shipping</li></ul>
  <div class="footer__main">
    <div class="footer__news">
      <h4 class="display">Stay in the flow</h4>
      <p>Water notes, rituals and early access. No noise.</p>
      <form class="footer__form" onsubmit="event.preventDefault();this.querySelector('button').textContent='Thank you';">
        <input type="email" placeholder="Email address" aria-label="Email address" required><button>Subscribe</button>
      </form>
    </div>
    <nav><h5>Shop</h5><a href="product.html?f=brass">The Vyla Filtered Showerhead</a><a href="product.html?f=refill">Replacement Filter</a><a href="shop.html">All finishes</a></nav>
    <nav><h5>Learn</h5><a href="education.html">Education</a><a href="water-report.html">Water report</a><a href="faq.html">FAQ</a></nav>
    <nav><h5>Company</h5><a href="policy.html#contact">Contact</a><a href="policy.html#shipping">Shipping &amp; returns</a><a href="policy.html#privacy">Privacy</a><a href="policy.html#terms">Terms</a></nav>
  </div>
  <p class="footer__mark display" aria-hidden="true">Beauty starts from step zero</p>
  <p class="footer__legal">© 2026 Vyla. All rights reserved.</p>
</footer>
<a href="product.html?f=brass" class="mini" id="mini"><img src="assets/img/filter-thumb.jpg" alt=""><span><b>The Vyla Brass Filter</b><em>Polished Brass</em><i>Rs. 4,999</i></span></a>
<div class="scrim" id="scrim"></div>
<aside class="cart" id="cart" aria-hidden="true">
  <div class="cart__top"><h3 class="display">Your cart</h3><button id="cartClose" aria-label="Close cart">✕</button></div>
  <div class="cart__body" id="cartBody"></div>
  <div class="cart__foot"><div><span>Subtotal</span><b id="cartTotal">Rs. 0</b></div><p class="cart__note">Shipping is free. Taxes included.</p><button class="btn btn--dark btn--wide" id="checkoutBtn">Checkout</button></div>
</aside>
<div class="modal" id="wrModal" aria-hidden="true">
  <div class="modal__box">
    <button class="modal__x" id="wrClose" aria-label="Close">✕</button>
    <p class="eyebrow">Your water report</p>
    <h3 class="display" id="wrModalTitle">Pin code</h3>
    <p>Tell us where to send it. We’ll show you what’s likely in your water right away, and email the full local report.</p>
    <form id="wrMail"><input name="name" placeholder="First name" required aria-label="First name"><input type="email" name="email" placeholder="Email address" required aria-label="Email"><button class="btn btn--dark">See my report</button></form>
  </div>
</div>
<div class="wrload" id="wrLoad" aria-hidden="true">
  <p class="eyebrow wrload__top">Your water report</p>
  <button class="wrload__x" id="wrLoadX" aria-label="Close">✕</button>
  <div class="wrload__ring"><span class="wrload__art" id="wrLoadArt"></span></div>
  <h3 class="display wrload__t">Preparing your water report</h3>
  <span class="wrload__bar"><i></i></span>
</div>`;
document.body.insertAdjacentHTML('afterbegin', CHROME_TOP);
document.body.insertAdjacentHTML('beforeend', CHROME_BOTTOM);
if (!isHome) { document.body.classList.add('inner'); $('.curtain').remove(); }

/* ---------- boot ---------- */
window.addEventListener('load', () => {
  setTimeout(() => { document.body.classList.remove('is-loading'); document.body.classList.add('is-ready'); }, isHome ? 1300 : 0);
});
setTimeout(() => { document.body.classList.remove('is-loading'); document.body.classList.add('is-ready'); }, 2600);

/* ---------- announcement ---------- */
{
  const m = $$('.announce__msg'); let i = 0;
  setInterval(() => { m[i].classList.remove('is-on'); i = (i + 1) % m.length; m[i].classList.add('is-on'); }, 4200);
}

/* ---------- header ---------- */
const header = $('#header'); let lastY = 0;
function headerState() {
  const y = scrollY;
  if (isHome) header.classList.toggle('is-top', y < innerHeight * .6);
  header.classList.toggle('is-hidden', y > lastY && y > innerHeight * 1.2 && !$('#mmenu').classList.contains('is-open'));
  lastY = y;
}
$('#burger').onclick = () => { const o = $('#mmenu').classList.toggle('is-open'); lockScroll(o); };
$$('#mmenu a').forEach(a => a.addEventListener('click', () => { $('#mmenu').classList.remove('is-open'); lockScroll(false); }));

/* ---------- hero slides ---------- */
{
  const s = $$('.hero__slide'); let i = 0;
  if (s.length > 1) setInterval(() => { s[i].classList.remove('is-on'); i = (i + 1) % s.length; s[i].classList.add('is-on'); }, 6000);
}

/* ---------- reveals ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
const observeReveals = () => $$('.reveal:not(.in),.reveal-img:not(.in)').forEach(el => io.observe(el));
observeReveals();

/* ---------- parallax ---------- */
const par = $$('[data-parallax]');
function parallax() {
  par.forEach(el => {
    const host = el.parentElement.getBoundingClientRect();
    if (host.bottom < -200 || host.top > innerHeight + 200) return;
    const lim = el.classList.contains('hero__slides') ? host.height * .2 : host.height * .24;   // never travel past the overscan
    const off = clamp((host.top + host.height / 2 - innerHeight / 2) * parseFloat(el.dataset.parallax), -lim, lim);
    el.style.transform = `translate3d(0,${off.toFixed(1)}px,0)`;
  });
}

/* ---------- water report timeline ---------- */
/* Drop falls, ripples, and the watercolour closes in around the question.
   Blobs are rasterised once so scrolling only moves GPU-composited bitmaps. */
const wr = $('.wr');
let wrTick = null;
if (wr) {
  const title = $('#wrTitle'), drop = $('#wrDrop'), rips = $$('.wr__ripple', wr), form = $('#wrForm');
  const svg = $('.wr__splash');
  const layers = [];
  const defs = $('defs', svg).outerHTML;
  $$('.blob', svg).forEach(g => {
    const markup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900">${defs}${g.outerHTML.replace(/ data-d[xy]="[^"]*"/g, '')}</svg>`;
    const img = new Image();
    img.className = 'wr__blob'; img.alt = ''; img.decoding = 'async';
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(markup);
    svg.parentElement.insertBefore(img, svg);
    layers.push({ el: img, dx: +g.dataset.dx, dy: +g.dataset.dy });
  });
  svg.style.display = 'none';
  let cur = -1;
  const ease = t => t * t * (3 - 2 * t);
  wrTick = (dt) => {
    const r = wr.getBoundingClientRect();
    const target = clamp(-r.top / (r.height - innerHeight));
    if (cur < 0) cur = target;
    cur += (target - cur) * (1 - Math.pow(0.0008, dt));
    if (Math.abs(target - cur) < 0.00005) cur = target;
    const p = cur;
    const enter = clamp(1 - r.top / innerHeight);                        // 0 when the section enters, 1 when it pins
    const tIn = smooth(.35, .95, enter), tOut = smooth(.16, .3, p);
    title.style.opacity = (tIn * (1 - tOut)).toFixed(3);
    title.style.transform = `translate3d(0,${((1 - tIn) * 60 - tOut * 120).toFixed(1)}px,0) scale(${(1 + p * .15).toFixed(4)})`;
    const d = smooth(.18, .42, p), dd = d * d;                       // accelerates like a real drop
    const squash = smooth(.38, .42, p) * (1 - smooth(.42, .46, p));   // flattens on impact
    drop.style.opacity = d > 0 && p < .45 ? 1 : 0;
    drop.style.transform = `translate3d(0,${(dd * innerHeight * .5).toFixed(1)}px,0) scale(${(1 - squash * .3).toFixed(3)},${(1 + d * .5 + squash * -.55).toFixed(3)})`;
    rips.forEach((rp, i) => {
      const q = smooth(.42 + i * .035, .7 + i * .035, p);
      rp.style.opacity = q > 0 && q < 1 ? ((1 - q) * (.9 - i * .2)).toFixed(3) : 0;
      rp.style.transform = `scale(${(1 + q * (16 - i * 2)).toFixed(3)})`;
    });
    const t = ease(clamp((p - .26) / .44)), k = innerWidth / 1440;
    const out = smooth(.9, 1, p), now = performance.now() / 1000;      // ink dissolves softly at the end, no hard cut
    layers.forEach((l, i) => {
      const tt = t * (1 - .35 * out);
      const fx = Math.sin(now * .5 + i * 1.7) * 7 * t, fy = Math.cos(now * .42 + i * 1.3) * 6 * t;   // slow living drift
      l.el.style.opacity = (clamp(t * 1.5) * (1 - out)).toFixed(3);
      l.el.style.transform = `translate3d(${(l.dx * (1 - tt) * k + fx).toFixed(1)}px,${(l.dy * (1 - tt) * k + fy).toFixed(1)}px,0) scale(${(1 + (1 - tt) * .08 + p * .02).toFixed(4)})`;
    });
    const f = smooth(.6, .82, p);
    form.style.opacity = f.toFixed(3); form.style.transform = `translate3d(0,${((1 - f) * 40).toFixed(1)}px,0)`;
    form.style.pointerEvents = f > .5 ? 'auto' : 'none';
  };
}
const wrPage = $('#wrPageForm');

/* ---------- mini card ---------- */
const mini = $('#mini');
function miniState() { mini.classList.toggle('is-on', document.body.classList.contains('is-ready') && !location.pathname.endsWith('product.html'));
  // white text while the card floats over a photo, dark text over light sections
  const r = mini.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  const overPhoto = $$('.hero,.split2,.fq,.pp,.edu__feature,.footer').some(s => { const b = s.getBoundingClientRect(); return cy > b.top && cy < b.bottom && cx > b.left && cx < b.right; });
  mini.classList.toggle('is-glass', overPhoto);
}

/* ---------- smooth scroll + frame loop ---------- */
let lenis = null;
if (window.Lenis && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true });
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const t = $(a.getAttribute('href')); if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -100, duration: 1.4 }); }
  }));
}
const lockScroll = on => { document.body.style.overflow = on ? 'hidden' : ''; if (lenis) on ? lenis.stop() : lenis.start(); };
let last = performance.now();
function loop(now) {
  const dt = Math.min(.05, (now - last) / 1000); last = now;
  if (lenis) lenis.raf(now);
  headerState(); parallax(); if (wrTick) wrTick(dt); miniState();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

/* ---------- reviews tabs ---------- */
{
  const chips = $('#chips'), q = $('#revQuote');
  if (chips) {
    const set = k => {
      const [t, n, c] = REVIEWS[k];
      $('p', q).textContent = '“' + t + '”'; $('b', q).textContent = n; $('em', q).textContent = c;
    };
    set(0);
    chips.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      $$('button', chips).forEach(x => x.classList.toggle('is-on', x === b));
      q.classList.add('is-swap'); setTimeout(() => { set(+b.dataset.k); q.classList.remove('is-swap'); }, 350);
    });
  }
}

/* ---------- cart ---------- */
let cart = store.get('vyla_cart', []);
const cartEl = $('#cart'), scrim = $('#scrim');
function renderCart() {
  const body = $('#cartBody');
  const n = cart.reduce((a, l) => a + l.q, 0);
  const cc = $('#cartCount'); cc.hidden = !n; cc.textContent = n;
  if (!cart.length) body.innerHTML = '<p class="cart__empty">Your cart is empty.</p>';
  else body.innerHTML = cart.map((l, i) => { const p = PRODUCTS.find(x => x.id === l.id); return `<div class="citem"><img src="${p.img}" alt=""><div><b>${p.name}</b><em>${p.finish}</em><br><span class="qty qty--sm"><button data-q="${i}" data-d="-1">−</button><i>${l.q}</i><button data-q="${i}" data-d="1">+</button></span></div><div>${money(p.price * l.q)}<br><button data-rm="${i}">Remove</button></div></div>`; }).join('');
  $('#cartTotal').textContent = money(cart.reduce((a, l) => a + PRODUCTS.find(x => x.id === l.id).price * l.q, 0));
  store.set('vyla_cart', cart);
}
function openCart(o = true) { cartEl.classList.toggle('is-open', o); scrim.classList.toggle('is-on', o); lockScroll(o); }
function addToCart(id, q = 1) { const l = cart.find(x => x.id === id); l ? l.q += q : cart.push({ id, q }); renderCart(); openCart(true); }
$('#cartOpen').onclick = () => openCart(true); $('#cartClose').onclick = scrim.onclick = () => openCart(false);
$('#cartBody').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.rm) cart.splice(+b.dataset.rm, 1);
  if (b.dataset.q) { const l = cart[+b.dataset.q]; l.q += +b.dataset.d; if (l.q < 1) cart.splice(+b.dataset.q, 1); }
  renderCart();
});
$('#checkoutBtn').onclick = () => alert('Checkout is handled by the Shopify build. This design preview stops at the cart.');
renderCart();
document.addEventListener('click', e => {
  const a = e.target.closest('.card__add'); if (!a) return;
  e.preventDefault(); addToCart(a.closest('.card').dataset.id);
});

/* ---------- water report (PIN) ---------- */
function bindPin(form, input) {
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const v = input.value.replace(/\D/g, '');
    if (v.length !== 6) { input.value = ''; input.placeholder = '[ 6-digit PIN ]'; input.focus(); return; }
    pendingPin = v; $('#wrModalTitle').textContent = 'PIN ' + v;
    $('#wrModal').classList.add('is-open');
  });
}
bindPin($('#wrForm'), $('#pin')); bindPin($('#wrPageForm'), $('#pin2') || {});
$('#wrClose').onclick = () => $('#wrModal').classList.remove('is-open');
$('#wrModal').addEventListener('click', e => { if (e.target.id === 'wrModal') e.target.classList.remove('is-open'); });
let pendingPin = '';
$('#wrMail').addEventListener('submit', e => {
  e.preventDefault();
  const name = e.target.name.value.trim();
  $('#wrModal').classList.remove('is-open');
  const art = $('#wrLoadArt'); if (window.ILL) art.innerHTML = ILL.glass();
  const load = $('#wrLoad'); load.classList.add('is-open'); lockScroll(true);
  const go = setTimeout(() => { location.href = `report.html?pin=${encodeURIComponent(pendingPin)}&name=${encodeURIComponent(name)}`; }, 2600);
  $('#wrLoadX').onclick = () => { clearTimeout(go); load.classList.remove('is-open'); lockScroll(false); };
});

/* ---------- product card grids (shop page + home) ---------- */
function cardHTML(p) {
  return `<article class="card reveal" data-id="${p.id}"><a href="product.html?f=${p.slug}" class="card__media"><img src="${p.img}" alt="${p.name} in ${p.finish}" loading="lazy"><img class="card__alt" src="${p.alt}" alt="" loading="lazy"></a>
  <div class="card__row"><h3>${p.name}</h3><span class="rate">★ 4.8 <small>(128)</small></span></div><p class="card__fin">${p.finish}</p>
  <div class="card__row"><p class="card__price">${money(p.price)}</p><button class="card__add">Add to cart</button></div></article>`;
}
$$('[data-grid]').forEach(g => {
  const kind = g.dataset.grid;
  g.innerHTML = PRODUCTS.filter(p => kind === 'all' || p.kind === kind).map(cardHTML).join('');
});
$$('[data-articles]').forEach(g => {
  const n = +g.dataset.articles || ARTICLES.length;
  g.innerHTML = ARTICLES.slice(0, n).map(a => `<a href="article.html?a=${a.id}" class="acard reveal"><span class="acard__img"><img src="${a.img}" alt="" loading="lazy"></span><small>1 min read</small><h3>${a.t}</h3></a>`).join('');
});
observeReveals();

/* ---------- product page ---------- */
const pp = $('#pdp');
if (pp) {
  const slug = new URLSearchParams(location.search).get('f') || 'brass';
  let cur = PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0];
  const gallery = {
    head: p => [p.img, p.alt, 'assets/img/hands-brass.jpg', 'assets/img/life-steam.jpg', 'assets/img/life-mirror.jpg'],
    refill: p => [p.img, p.alt, 'assets/img/prod-brass-bowl.jpg'],
  };
  const paint = () => {
    document.title = `${cur.name} (${cur.finish}) | Vyla`;
    $('#pName').textContent = cur.name; $('#pFinish').textContent = cur.finish; $('#pPrice').textContent = money(cur.price);
    const g = gallery[cur.kind](cur);
    $('#pMain').src = g[0];
    $('#pThumbs').innerHTML = g.map((s, i) => `<button class="${i ? '' : 'is-on'}" data-s="${s}"><img src="${s}" alt=""></button>`).join('');
    const heads = PRODUCTS.filter(p => p.kind === cur.kind);
    $('#pSwatch').innerHTML = cur.kind === 'head' ? heads.map(p => `<button class="${p === cur ? 'is-on' : ''}" data-id="${p.id}" style="--c:${p.swatch}" aria-label="${p.finish}" title="${p.finish}"></button>`).join('') : '';
    $('#pSwatchWrap').hidden = cur.kind !== 'head';
    const f2=$('#pFinish2'); if(f2) f2.textContent = cur.finish;
  };
  paint();
  $('#pThumbs').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('#pThumbs button').forEach(x => x.classList.toggle('is-on', x === b)); const m = $('#pMain'); m.style.opacity = 0; setTimeout(() => { m.src = b.dataset.s; m.style.opacity = 1; }, 220); });
  $('#pSwatch').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; cur = PRODUCTS.find(p => p.id === b.dataset.id); history.replaceState(null, '', '?f=' + cur.slug); paint(); });
  let qty = 1;
  $('#qty').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; qty = Math.max(1, qty + +b.dataset.d); $('#qtyN').textContent = qty; });
  $('#pAdd').onclick = () => addToCart(cur.id, qty);
  $$('.acc__h', pp).forEach(h => h.addEventListener('click', () => h.parentElement.classList.toggle('is-open')));
}

/* ---------- article page ---------- */
const art = $('#article');
if (art) {
  const id = new URLSearchParams(location.search).get('a') || ARTICLES[0].id;
  const a = ARTICLES.find(x => x.id === id) || ARTICLES[0];
  document.title = a.t + ' | Vyla';
  $('#aTitle').textContent = a.t; $('#aDek').textContent = a.d; $('#aImg').src = a.img;
  $('#aMore').innerHTML = ARTICLES.filter(x => x !== a).slice(0, 3).map(x => `<a href="article.html?a=${x.id}" class="acard"><span class="acard__img"><img src="${x.img}" alt=""></span><small>1 min read</small><h3>${x.t}</h3></a>`).join('');
}

/* ---------- accordions (faq/policy) ---------- */
$$('.faq .acc__h').forEach(h => h.addEventListener('click', () => h.parentElement.classList.toggle('is-open')));
$$('.tabs [data-tab]').forEach(b => b.addEventListener('click', () => {
  const t = b.closest('.tabs'); $$('[data-tab]', t).forEach(x => x.classList.toggle('is-on', x === b));
  $$('[data-pane]', t.parentElement).forEach(p => p.hidden = p.dataset.pane !== b.dataset.tab);
}));

/* ---------- water report results page ---------- */
if (document.body.dataset.page === 'report') {
  const q = new URLSearchParams(location.search);
  const pin = (q.get('pin') || '').replace(/\D/g, '').slice(0, 6), name = (q.get('name') || '').trim().slice(0, 30);
  $('#rpTitle').textContent = name || pin ? `${name ? name + ', h' : 'H'}ere’s your water report${pin ? ' for ' + pin : ''}.` : 'Here’s your water report.';
  if (pin) $('#rpPin').textContent = pin;
  $$('[data-ill]').forEach(el => { if (!el.closest('#rpSteps') && window.ILL && ILL[el.dataset.ill]) el.innerHTML = ILL[el.dataset.ill](); });
  const steps = $$('#rpSteps li'), orb = $('#rpOrb'), cap = $('#rpCaption');
  steps.forEach(li => { const f = document.createElement('div'); f.className = 'rp-orb__f'; f.innerHTML = ILL[li.dataset.ill](); orb.appendChild(f); });
  const frames = $$('.rp-orb__f', orb); let k = 0;
  const show = i => { k = i; steps.forEach((s, j) => s.classList.toggle('is-on', j === i)); frames.forEach((f, j) => f.classList.toggle('is-on', j === i)); cap.textContent = steps[i].dataset.c; };
  show(0);
  let timer = setInterval(() => show((k + 1) % steps.length), 2800);
  steps.forEach((s, i) => s.addEventListener('click', () => { clearInterval(timer); show(i); timer = setInterval(() => show((k + 1) % steps.length), 2800); }));
  $('#rpShare').addEventListener('click', async e => {
    try { await navigator.clipboard.writeText(location.href); e.target.textContent = 'Link copied'; } catch { e.target.textContent = location.href; }
  });
}
