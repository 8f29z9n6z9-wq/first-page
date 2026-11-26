/* ==========================================================================
   Therma — Logique du site (vanilla JS, aucune dépendance)
   --------------------------------------------------------------------------
   >>> TOUT CE QUI EST ÉDITABLE SE TROUVE DANS L'OBJET CONFIG CI-DESSOUS <<<
   - Prix des offres ............ CONFIG.offers
   - Infos produit (specs) ...... CONFIG.specs
   - Frais / délais / retours ... CONFIG.delivery
   - Avis clients ............... CONFIG.reviews
   - Galerie .................... CONFIG.gallery
   - Vidéo ...................... CONFIG.videoUrl
   - WhatsApp / marque .......... CONFIG.whatsapp / CONFIG.brandName
   Un champ laissé vide ("") est automatiquement masqué (aucun "À confirmer").
   ========================================================================== */

const CONFIG = {
  brandName: 'Therma',
  brandTagline: 'Thermos isotherme inox',
  whatsapp: '212719300005', // format international, sans + ni espaces
  heroPriceLabel: 'À partir de',

  // ---- OFFRES (prix en MAD). Laisse price vide "" pour masquer l'offre. ----
  //  save = économie affichée en MAD (optionnel, sinon calculé automatiquement)
  offers: [
    { id: 'A', name: 'Offre A', qty: 1, label: '1 thermos', price: 200, badge: '', featured: false },
    { id: 'B', name: 'Offre B', qty: 3, label: '3 thermos (2 + 1 gratuit)', price: 500, badge: 'Meilleure offre', featured: true, save: 100 },
  ],

  // ---- LIVRAISON / POLITIQUE (vide = masqué) ----
  delivery: {
    fee: '',            // ex: "29 MAD" ou "Gratuite"
    time: '',           // ex: "24–72h"
    returns: '',        // ex: "Retour sous 7 jours"
  },

  // ---- CARACTÉRISTIQUES (value vide = ligne masquée) ----
  specs: [
    { label: 'Type', value: 'Thermos isotherme' },
    { label: 'Matériau', value: 'Acier inoxydable' },
    { label: 'Chaleur', value: 'Jusqu\'à 12 heures' },
    { label: 'Fraîcheur', value: 'Jusqu\'à 24 heures' },
    { label: 'Étanchéité', value: 'Antifuite' },
    { label: 'Capacité', value: '' },
    { label: 'Dimensions', value: '' },
    { label: 'Poids', value: '' },
    { label: 'Coloris', value: '' },
    { label: 'Contenu du colis', value: '1 thermos' },
  ],

  // ---- FAQ (answer vide = question masquée) ----
  faqs: [
    { q: 'Combien de temps le thermos conserve-t-il les boissons chaudes ?', a: 'Jusqu\'à 12 heures.' },
    { q: 'Combien de temps conserve-t-il les boissons froides ?', a: 'Jusqu\'à 24 heures.' },
    { q: 'Quelle est sa capacité ?', a: '' },
    { q: 'Est-il étanche ?', a: 'Le thermos est antifuite.' },
    { q: 'Quels sont les coloris disponibles ?', a: '' },
    { q: 'Où livrez-vous ?', a: 'Partout au Maroc, selon la couverture du service de livraison.' },
    { q: 'Quels sont les frais de livraison ?', a: '' },
    { q: 'Quels sont les délais de livraison ?', a: '' },
    { q: 'Comment fonctionne le paiement à la livraison ?', a: 'Vous payez en espèces à la réception de votre colis.' },
    { q: 'Puis-je retourner le produit ?', a: '' },
    { q: 'Comment nettoyer mon thermos ?', a: 'À la main, avec de l\'eau et du savon doux.' },
    { q: 'Comment contacter le service client ?', a: 'Par WhatsApp au 0719300005.' },
  ],

  // ---- GALERIE (src vide = masqué). Ajoute tes images ici. ----
  gallery: [
    { src: 'termo1.webp', alt: 'Thermos isotherme inox — vue principale', label: 'Vue principale' },
    { src: 'termo2.webp', alt: 'Thermos isotherme inox — deuxième angle', label: 'Deuxième angle' },
  ],

  // ---- VIDÉO (vide = section masquée). URL .mp4 ou lien YouTube. ----
  videoUrl: '',

  // ---- AVIS (tableau vide = section masquée. N'ajoute que de vrais avis.) ----
  reviews: [
    // { name: 'Youssef B.', city: 'Casablanca', rating: 5, text: 'Très bonne qualité, garde le café chaud toute la matinée.' },
  ],
};

/* ==========================================================================
   Identifiants de tracking (à remplir plus tard, laisser "" pour désactiver)
   Remplis dans le <head> (window.PIXEL_IDS) OU ci-dessous.
   ========================================================================== */
window.PIXEL_IDS = window.PIXEL_IDS || {
  meta: '',    // ex: '1234567890'
  tiktok: '',  // ex: 'CXXXXXXXXXXXX'
};

/* ==========================================================================
   Rendu dynamique
   ========================================================================== */
(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const money = (n) => n + ' MAD';
  const has = (v) => v !== null && v !== undefined && String(v).trim() !== '';

  /* ---------- Prix hero ---------- */
  function renderHeroPrice() {
    const el = $('#heroPrice');
    if (!el) return;
    const label = $('#heroPriceLabel');
    if (label) label.textContent = CONFIG.heroPriceLabel;
    const prices = CONFIG.offers.filter(o => has(o.price)).map(o => o.price);
    const min = prices.length ? Math.min.apply(null, prices) : null;
    el.textContent = has(min) ? money(min) : '';
    const badge = $('.price-badge');
    if (badge && !has(min)) badge.classList.add('hidden');
    const fp = $('#finalPrice');
    if (fp) fp.textContent = has(min) ? CONFIG.heroPriceLabel + ' ' + money(min) : '';
    const sp = $('#stickyPrice');
    if (sp) sp.textContent = has(min) ? CONFIG.heroPriceLabel + ' ' + money(min) : '';
  }

  /* ---------- Offres ---------- */
  function renderOffers() {
    const grid = $('#offersGrid');
    if (!grid) return;
    grid.innerHTML = CONFIG.offers.map((o) => {
      const price = o.price;
      const hasPrice = has(price);
      const unit = hasPrice ? money(Math.round(price / o.qty)) + ' / unité' : 'À confirmer';
      let savings = has(o.save) ? o.save : 0;
      if (!has(o.save) && hasPrice && o.qty > 1 && CONFIG.offers[0] && has(CONFIG.offers[0].price)) {
        savings = Math.round((CONFIG.offers[0].price - price / o.qty) * o.qty);
      }
      const savingsHtml = savings > 0
        ? '<div class="offer-savings"><svg class="icon"><use href="#i-tag"/></svg>Vous économisez ' + money(savings) + '</div>'
        : '<div class="offer-savings"></div>';
      const badge = o.badge ? '<div class="offer-badge">' + o.badge + '</div>' : '';
      const cta = hasPrice
        ? '<button class="offer-cta" data-offer="' + o.id + '">Commander</button>'
        : '<button class="offer-cta secondary" data-offer-contact="' + o.id + '">Me contacter</button>';
      return '' +
        '<div class="offer-card' + (o.featured ? ' featured' : '') + '" data-card="' + o.id + '">' +
          badge +
          '<div class="offer-name">' + o.name + '</div>' +
          '<div class="offer-qty">' + o.label + '</div>' +
          '<div class="offer-price">' + (hasPrice ? money(price) : 'Sur demande') + '</div>' +
          '<span class="offer-unit">' + unit + '</span>' +
          savingsHtml +
          cta +
        '</div>';
    }).join('');

    $$('#offersGrid .offer-cta[data-offer]').forEach(btn => {
      btn.addEventListener('click', () => selectOffer(btn.getAttribute('data-offer')));
    });
    $$('#offersGrid .offer-cta[data-offer-contact]').forEach(btn => {
      btn.addEventListener('click', () => {
        const o = CONFIG.offers.find(x => x.id === btn.getAttribute('data-offer-contact'));
        openWa('Bonjour, je souhaite des informations sur ' + (o ? o.name : 'vos offres') + '.');
      });
    });
  }

  /* ---------- Tableau specs ---------- */
  function renderSpecs() {
    const body = $('#specsBody');
    if (!body) return;
    const rows = CONFIG.specs.filter(s => has(s.value));
    body.innerHTML = rows.map(s =>
      '<tr><th>' + s.label + '</th><td>' + s.value + '</td></tr>'
    ).join('');
    const table = body.closest('.specs-table');
    const section = table ? table.closest('section') : null;
    if (!rows.length && section) section.classList.add('hidden');
  }

  /* ---------- FAQ ---------- */
  function renderFaq() {
    const list = $('#faqList');
    if (!list) return;
    const items = CONFIG.faqs.filter(f => has(f.a));
    list.innerHTML = items.map(f =>
      '<div class="faq-item">' +
        '<div class="faq-question" role="button" tabindex="0">' +
          '<span>' + f.q + '</span><span class="faq-toggle">+</span>' +
        '</div>' +
        '<div class="faq-answer">' + f.a + '</div>' +
      '</div>'
    ).join('');
    $$('#faqList .faq-question').forEach(q => {
      const handler = () => toggleFaq(q);
      q.addEventListener('click', handler);
      q.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
    });
    const section = list.closest('section');
    if (!items.length && section) section.classList.add('hidden');
  }

  function toggleFaq(el) {
    const answer = el.nextElementSibling;
    const toggle = el.querySelector('.faq-toggle');
    const open = answer.classList.toggle('open');
    toggle.textContent = open ? '−' : '+';
  }

  /* ---------- Galerie + lightbox ---------- */
  function renderGallery() {
    const grid = $('#galleryGrid');
    if (!grid) return;
    const items = CONFIG.gallery.filter(g => has(g.src));
    grid.innerHTML = items.map(g =>
      '<div class="gallery-item" data-full="' + g.src + '" data-alt="' + (g.alt || '') + '">' +
        '<img src="' + g.src + '" alt="' + (g.alt || '') + '" width="800" height="800" loading="lazy" decoding="async">' +
        '<span class="gallery-zoom"><svg class="icon"><use href="#i-zoom"/></svg></span>' +
        (g.label ? '<div class="gallery-label">' + g.label + '</div>' : '') +
      '</div>'
    ).join('');
    $$('#galleryGrid .gallery-item').forEach(item => {
      item.addEventListener('click', () => openLightbox(item.getAttribute('data-full'), item.getAttribute('data-alt')));
    });
    const section = grid.closest('section');
    if (!items.length && section) section.classList.add('hidden');
  }

  function openLightbox(src, alt) {
    const lb = $('#lightbox');
    if (!lb) return;
    $('#lightboxImg').src = src;
    $('#lightboxImg').alt = alt || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    const lb = $('#lightbox');
    if (!lb) return;
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ---------- Vidéo ---------- */
  function renderVideo() {
    const section = $('#videoSection');
    if (!section) return;
    const url = (CONFIG.videoUrl || '').trim();
    if (!has(url)) { section.classList.add('hidden'); return; }
    const wrap = $('#videoWrap');
    const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/);
    if (yt) {
      wrap.innerHTML = '<iframe src="https://www.youtube.com/embed/' + yt[1] + '" title="Vidéo du produit" loading="lazy" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    } else {
      wrap.innerHTML = '<video controls preload="metadata" playsinline><source src="' + url + '">Votre navigateur ne prend pas en charge la vidéo.</video>';
    }
  }

  /* ---------- Avis ---------- */
  function renderReviews() {
    const section = $('#avis');
    if (!section) return;
    const grid = $('#reviewsGrid');
    const list = (CONFIG.reviews || []).filter(r => has(r.text));
    if (!list.length) { section.classList.add('hidden'); return; }
    grid.innerHTML = list.map(r => {
      const rating = Math.max(0, Math.min(5, parseInt(r.rating, 10) || 5));
      const stars = '★★★★★'.slice(0, rating) + '☆☆☆☆☆'.slice(0, 5 - rating);
      return '' +
        '<div class="review-card">' +
          '<div class="review-stars" aria-label="' + rating + ' sur 5">' + stars + '</div>' +
          '<p class="review-text">' + r.text + '</p>' +
          '<div class="review-author">' + (r.name || 'Client') + '</div>' +
          (has(r.city) ? '<div class="review-city">' + r.city + '</div>' : '') +
        '</div>';
    }).join('');
  }

  /* ---------- Marque ---------- */
  function renderBrand() {
    $$('.js-brand-name').forEach(el => el.textContent = CONFIG.brandName);
    $$('.js-brand-tagline').forEach(el => el.textContent = CONFIG.brandTagline);
    document.title = CONFIG.brandName + ' | ' + CONFIG.brandTagline + ' au Maroc';
  }

  /* ---------- Offre sélectionnée ---------- */
  let selectedOffer = null;
  function selectOffer(id) {
    const o = CONFIG.offers.find(x => x.id === id);
    if (!o) return;
    selectedOffer = o;
    $$('#offersGrid .offer-card').forEach(c => c.classList.toggle('featured', c.getAttribute('data-card') === id));
    const select = $('#orderOffer');
    if (select) select.value = id;
    const target = $('#commander') || $('#orderForm');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ---------- Construction du message WhatsApp ---------- */
  function buildWaMessage(extra) {
    const lines = [
      'Bonjour, je souhaite commander votre thermos.',
      '',
      'Offre choisie : ' + (selectedOffer ? selectedOffer.name + ' – ' + selectedOffer.label : 'À préciser'),
      'Prix : ' + (selectedOffer && has(selectedOffer.price) ? money(selectedOffer.price) : 'À confirmer'),
    ];
    if (extra) lines.push(extra);
    lines.push('', 'Merci.');
    return lines.join('\n');
  }
  function openWa(prefill) {
    const text = prefill || buildWaMessage();
    const url = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(text);
    window.open(url, '_blank', 'noopener');
  }

  /* ---------- Formulaire : validation ---------- */
  const PHONE_RE = /^(?:06|07)\d{8}$/;

  function setFieldError(field, show) {
    const wrap = field.closest('.form-field');
    if (wrap) wrap.classList.toggle('invalid', show);
  }

  function validateForm(form) {
    let ok = true;
    const name = form.querySelector('#fName');
    const phone = form.querySelector('#fPhone');
    const city = form.querySelector('#fCity');
    const address = form.querySelector('#fAddress');
    const offer = form.querySelector('#orderOffer');

    setFieldError(name, !has(name.value) || name.value.trim().length < 3);
    if (!has(name.value) || name.value.trim().length < 3) ok = false;

    const phoneClean = phone.value.replace(/[\s.-]/g, '');
    const phoneBad = !PHONE_RE.test(phoneClean);
    setFieldError(phone, phoneBad);
    if (phoneBad) ok = false;

    setFieldError(city, !has(city.value));
    if (!has(city.value)) ok = false;

    setFieldError(address, !has(address.value) || address.value.trim().length < 5);
    if (!has(address.value) || address.value.trim().length < 5) ok = false;

    setFieldError(offer, !has(offer.value));
    if (!has(offer.value)) ok = false;

    return ok;
  }

  /* ---------- Tracking ---------- */
  function trackLead() {
    try { if (typeof fbq === 'function') fbq('track', 'Lead'); } catch (e) {}
    try { if (typeof ttq === 'function') ttq.track('Submit'); } catch (e) {}
  }

  /* ---------- Soumission Netlify ---------- */
  function initForm() {
    const form = $('#orderForm');
    if (!form) return;

    // Remplit le <select> des offres
    const select = $('#orderOffer');
    if (select) {
      select.innerHTML = '<option value="">— Choisir une offre —</option>' +
        CONFIG.offers.filter(o => has(o.price)).map(o =>
          '<option value="' + o.id + '">' + o.name + ' – ' + o.label + ' (' + money(o.price) + ')</option>'
        ).join('');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm(form)) {
        const firstInvalid = form.querySelector('.form-field.invalid input, .form-field.invalid select, .form-field.invalid textarea');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const data = new FormData(form);
      const body = new URLSearchParams();
      body.append('form-name', 'commande');
      ['fName', 'fPhone', 'fCity', 'fAddress', 'orderOffer'].forEach(k => body.append(k, data.get(k) || ''));

      const btn = form.querySelector('.form-submit');
      btn.disabled = true;
      btn.textContent = 'Envoi en cours…';

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      }).then(() => {
        trackLead();
        form.classList.add('hidden');
        const success = $('#formSuccess');
        if (success) {
          const wa = $('#successWa');
          if (wa) wa.href = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(buildWaMessage());
          success.classList.add('show');
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }).catch(() => {
        btn.disabled = false;
        btn.textContent = 'Confirmer ma commande';
        alert('Une erreur est survenue. Veuillez réessayer ou commander via WhatsApp.');
      });
    });

    // Efface l'erreur dès que l'utilisateur corrige un champ
    $$('input, select, textarea', form).forEach(el => {
      el.addEventListener('input', () => setFieldError(el, false));
      el.addEventListener('change', () => setFieldError(el, false));
    });
  }

  /* ---------- Navigation mobile ---------- */
  function initNav() {
    const toggle = $('.menu-toggle');
    const links = $('#navLinks');
    if (toggle && links) {
      toggle.addEventListener('click', () => links.classList.toggle('open'));
      $$('a', links).forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
    }
  }

  /* ---------- Boutons WhatsApp statiques ---------- */
  function initWaButtons() {
    $$('[data-wa]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openWa(btn.getAttribute('data-wa') || undefined);
      });
    });
    const float = $('.float-wa');
    if (float && !float.hasAttribute('data-wa')) {
      float.setAttribute('href', 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent('Bonjour, je souhaite commander un thermos.'));
      float.setAttribute('target', '_blank');
      float.setAttribute('rel', 'noopener');
    }
  }

  /* ---------- Lightbox events ---------- */
  function initLightbox() {
    const lb = $('#lightbox');
    if (!lb) return;
    lb.addEventListener('click', (e) => {
      if (e.target === lb || e.target.closest('.lightbox-close')) closeLightbox();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  }

  /* ---------- Init ---------- */
  function init() {
    renderBrand();
    renderHeroPrice();
    renderOffers();
    renderSpecs();
    renderFaq();
    renderGallery();
    renderVideo();
    renderReviews();
    initForm();
    initNav();
    initWaButtons();
    initLightbox();
    // Rend le sélecteur d'offre accessible globalement pour les boutons inline
    window.selectOffer = selectOffer;
    window.openWa = openWa;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();