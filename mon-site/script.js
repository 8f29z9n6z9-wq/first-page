/* ==========================================================================
   Therma — Logique du site (vanilla JS, aucune dépendance)
   --------------------------------------------------------------------------
   >>> TOUT CE QUI EST ÉDITABLE SE TROUVE DANS CONFIG CI-DESSOUS <<<
   - Marque / contact / ICE .... CONFIG.brand / CONFIG.company
   - Prix des offres ........... CONFIG.offers
   - Infos produit (specs) ..... CONFIG.specs
   - Livraison par ville ....... CONFIG.delivery.cities
   - Garantie / urgence ........ CONFIG.guarantee / CONFIG.urgency
   - Avis clients .............. CONFIG.reviews
   - Galerie / vidéo ........... CONFIG.gallery / CONFIG.videoUrl
   - WhatsApp .................. CONFIG.whatsapp
   Un champ vide ("") est masqué automatiquement (aucun "À confirmer").
   ========================================================================== */

const CONFIG = {
  brandName: 'Therma',
  brandTagline: 'Thermos isotherme inox',
  whatsapp: '212719300005', // format international, sans + ni espaces
  heroPriceLabel: 'À partir de',
  lang: 'fr', // langue par défaut

  // ---- ENTREPRISE / CONTACT (vide = masqué) ----
  company: {
    name: 'Therma',
    legalForm: 'SARL',
    ice: '',                 // ex: "001234567000045"
    email: 'contact@therma.ma',
    phoneDisplay: '0719300005',
    hours: 'Lun – Sam, 9h – 19h',
    address: 'Maroc',
  },

  // ---- OFFRES (prix en MAD). price vide "" => masquée. ----
  //  nameAr/labelAr = version arabe (optionnel)
  offers: [
    { id: 'A', name: 'Offre A', nameAr: 'العرض أ', qty: 1, label: '1 thermos', labelAr: 'ترمس واحد', price: 200, badge: '', featured: false },
    { id: 'B', name: 'Offre B', nameAr: 'العرض ب', qty: 3, label: '3 thermos (2 + 1 gratuit)', labelAr: '3 ترمس (2 + 1 مجاني)', price: 500, badge: 'Meilleure offre', badgeAr: 'أفضل عرض', featured: true, save: 100 },
  ],

  // ---- LIVRAISON PAR VILLE (fee/time vide = ligne masquée) ----
  delivery: {
    fee: '',            // frais généraux (optionnel)
    time: '',           // délai général (optionnel)
    returns: '',        // ex: "Retour sous 7 jours"
    cities: [
      { name: 'Casablanca', nameAr: 'الدار البيضاء', fee: '', time: '24h' },
      { name: 'Rabat', nameAr: 'الرباط', fee: '', time: '24–48h' },
      { name: 'Marrakech', nameAr: 'مراكش', fee: '', time: '48–72h' },
      { name: 'Autres villes', nameAr: 'مدن أخرى', fee: '', time: '48–72h' },
    ],
  },

  // ---- GARANTIE (2 lignes affichées) ----
  guarantee: [
    'Produit non conforme = échange',
    'Vous payez après avoir vu le colis',
  ],

  // ---- URGENCE HONNÊTE (vide = masquée). N'ajoute que si réel. ----
  urgency: '', // ex: "Stock limité" ou "Offre 2+1 se termine le 30/11"

  // ---- CARACTÉRISTIQUES (value vide = ligne masquée) ----
  specs: [
    { label: 'Type', labelAr: 'النوع', value: 'Thermos isotherme', valueAr: 'ترمس معزول' },
    { label: 'Matériau', labelAr: 'المادة', value: 'Acier inoxydable', valueAr: 'فولاذ مقاوم للصدأ' },
    { label: 'Chaleur', labelAr: 'الحرارة', value: 'Jusqu\'à 12 heures', valueAr: 'حتى 12 ساعة' },
    { label: 'Fraîcheur', labelAr: 'البرودة', value: 'Jusqu\'à 24 heures', valueAr: 'حتى 24 ساعة' },
    { label: 'Étanchéité', labelAr: 'مقاومة التسرب', value: 'Antifuite', valueAr: 'مانع للتسرب' },
    { label: 'Capacité', labelAr: 'السعة', value: '' },
    { label: 'Dimensions', labelAr: 'الأبعاد', value: '' },
    { label: 'Poids', labelAr: 'الوزن', value: '' },
    { label: 'Coloris', labelAr: 'الألوان', value: '' },
    { label: 'Contenu du colis', labelAr: 'محتوى الطرد', value: '1 thermos', valueAr: 'ترمس واحد' },
  ],

  // ---- FAQ (answer vide = question masquée) ----
  faqs: [
    { q: 'Combien de temps le thermos conserve-t-il les boissons chaudes ?', qAr: 'كم من الوقت يحافظ الترمس على سخونة المشروبات؟', a: 'Jusqu\'à 12 heures.', aAr: 'حتى 12 ساعة.' },
    { q: 'Combien de temps conserve-t-il les boissons froides ?', qAr: 'كم من الوقت يحافظ على برودة المشروبات؟', a: 'Jusqu\'à 24 heures.', aAr: 'حتى 24 ساعة.' },
    { q: 'Quelle est sa capacité ?', qAr: 'ما هي سعته؟', a: '' },
    { q: 'Est-il étanche ?', qAr: 'هل هو مانع للتسرب؟', a: 'Le thermos est antifuite.', aAr: 'الترمس مانع للتسرب.' },
    { q: 'Quels sont les coloris disponibles ?', qAr: 'ما هي الألوان المتوفرة؟', a: '' },
    { q: 'Où livrez-vous ?', qAr: 'أين توصلون؟', a: 'Partout au Maroc, selon la couverture du service de livraison.', aAr: 'في كل أنحاء المغرب حسب تغطية خدمة التوصيل.' },
    { q: 'Quels sont les frais de livraison ?', qAr: 'ما هي تكاليف التوصيل؟', a: '' },
    { q: 'Quels sont les délais de livraison ?', qAr: 'ما هي آجال التوصيل؟', a: 'Casablanca 24h, autres villes 48–72h.', aAr: 'الدار البيضاء 24 ساعة، المدن الأخرى 48–72 ساعة.' },
    { q: 'Comment fonctionne le paiement à la livraison ?', qAr: 'كيف يعمل الدفع عند الاستلام؟', a: 'Vous payez en espèces à la réception de votre colis.', aAr: 'تدفع نقدا عند استلام طردك.' },
    { q: 'Et si le produit est abîmé ?', qAr: 'ماذا لو كان المنتج تالفا؟', a: 'Produit non conforme = échange. Contactez-nous sur WhatsApp.', aAr: 'منتج غير مطابق = استبدال. تواصل معنا على واتساب.' },
    { q: 'Puis-je ouvrir le colis avant de payer ?', qAr: 'هل يمكنني فتح الطرد قبل الدفع؟', a: 'Oui, vous payez après avoir vérifié le colis.', aAr: 'نعم، تدفع بعد التحقق من الطرد.' },
    { q: 'Puis-je retourner le produit ?', qAr: 'هل يمكنني إرجاع المنتج؟', a: '' },
    { q: 'Comment nettoyer mon thermos ?', qAr: 'كيف أنظف الترمس؟', a: 'À la main, avec de l\'eau et du savon doux.', aAr: 'باليد مع الماء والصابون اللطيف.' },
    { q: 'Comment contacter le service client ?', qAr: 'كيف أتواصل مع خدمة العملاء؟', a: 'Par WhatsApp au 0719300005.', aAr: 'عبر واتساب على 0719300005.' },
  ],

  // ---- GALERIE (src vide = masquée) ----
  gallery: [
    { src: 'termo1.webp', alt: 'Thermos isotherme inox — vue principale', label: 'Vue principale', labelAr: 'المنظر الرئيسي' },
    { src: 'termo2.webp', alt: 'Thermos isotherme inox — deuxième angle', label: 'Deuxième angle', labelAr: 'زاوية أخرى' },
  ],

  // ---- VIDÉO (vide = section masquée). URL .mp4 ou lien YouTube. ----
  videoUrl: '',

  // ---- AVIS (vide = section masquée. N'ajoute que de vrais avis.) ----
  reviews: [
    // { name: 'Youssef B.', city: 'Casablanca', rating: 5, text: 'Très bonne qualité, garde le café chaud toute la matinée.' },
  ],
};

/* ==========================================================================
   Identifiants de tracking (à remplir plus tard, laisser "" pour désactiver)
   ========================================================================== */
window.PIXEL_IDS = window.PIXEL_IDS || {
  meta: '',     // Meta Pixel, ex: '1234567890'
  tiktok: '',   // TikTok Pixel, ex: 'CXXXXXXXXXXXX'
  ga: '',       // Google Analytics (G-XXXXXXX)
};

/* ==========================================================================
   i18n (FR / AR). Ajoute tes clés ici. Les éléments [data-i18n="clé"]
   reçoivent la traduction. Les champs *_Ar de CONFIG gèrent le contenu dynamique.
   ========================================================================== */
const I18N = {
  fr: {
    'nav.accueil': 'Accueil', 'nav.produit': 'Notre produit', 'nav.avis': 'Avis clients',
    'nav.faq': 'FAQ', 'nav.commander': 'Commander',
    'hero.eyebrow': 'Votre compagnon du quotidien',
    'hero.h1': 'Profitez de vos boissons préférées, à la bonne température, partout avec vous.',
    'hero.p': 'Découvrez notre thermos isotherme conçu pour accompagner vos journées, au travail, en déplacement ou à la maison.',
    'hero.cta1': 'Commander maintenant', 'hero.cta2': 'Découvrir le produit',
    'hero.trust1': 'Paiement à la livraison', 'hero.trust2': 'Livraison selon votre ville', 'hero.trust3': 'Service client WhatsApp',
    'benefits.title': 'Pensé pour accompagner votre quotidien.', 'benefits.sub': 'Les avantages de votre thermos isotherme.',
    'benefits.1h': 'Conservation de la chaleur', 'benefits.1p': 'Garde vos boissons chaudes jusqu\'à 12 heures.',
    'benefits.2h': 'Conservation de la fraîcheur', 'benefits.2p': 'Garde vos boissons froides jusqu\'à 24 heures.',
    'benefits.3h': 'Design pratique et élégant', 'benefits.3p': 'Acier inoxydable, finition soignée.',
    'benefits.4h': 'Facile à transporter', 'benefits.4p': 'Léger et adapté au quotidien.',
    'gallery.title': 'Découvrez le produit.', 'gallery.sub': 'Images réelles du thermos. Cliquez pour agrandir.',
    'steps.title': 'Comment fonctionne votre thermos.', 'steps.sub': 'Utilisation simple en 4 étapes.',
    'steps.1h': 'Remplissez', 'steps.1p': 'Remplissez votre thermos.',
    'steps.2h': 'Fermez', 'steps.2p': 'Refermez le bouchon correctement.',
    'steps.3h': 'Emportez', 'steps.3p': 'Emportez-le partout avec vous.',
    'steps.4h': 'Dégustez', 'steps.4p': 'Profitez de votre boisson.',
    'specs.title': 'Caractéristiques techniques.', 'specs.sub': 'Spécifications du thermos isotherme.',
    'offers.title': 'Choisissez votre offre.', 'offers.sub': 'Sélectionnez la quantité adaptée à vos besoins.',
    'offers.note': 'Les prix sont affichés en MAD. Paiement à la livraison.',
    'offers.cta': 'Commander',
    'reviews.title': 'Ce que nos clients disent.', 'reviews.sub': 'Témoignages et avis.',
    'video.title': 'Découvrez votre thermos en action.', 'video.sub': 'Démonstration du produit.',
    'delivery.title': 'Livraison et délais.', 'delivery.sub': 'Prix et délais indicatifs par ville.',
    'order.title': 'Passez votre commande.', 'order.sub': 'Remplissez le formulaire, nous vous rappelons pour confirmer.',
    'order.name': 'Nom complet', 'order.phone': 'Téléphone', 'order.city': 'Ville',
    'order.offer': 'Offre / Quantité', 'order.address': 'Adresse complète',
    'order.submit': 'Confirmer ma commande', 'order.note': 'Paiement à la livraison.', 'order.note2': 'Vous pouvez aussi commander directement sur',
    'order.successH': 'Merci pour votre commande !', 'order.successP': 'Nous vous appellerons pour confirmer votre commande et les détails de livraison.',
    'order.successWa': 'Confirmer aussi sur WhatsApp',
    'delivery.delay': 'Délai', 'delivery.fee': 'Frais',
    'ordersteps.title': 'Commander en toute simplicité.', 'ordersteps.sub': 'Passez votre commande en 4 étapes.',
    'faq.title': 'Questions fréquentes.', 'faq.sub': 'Toutes les réponses avant de commander.',
    'final.h': 'Prêt à profiter de votre thermos au quotidien ?', 'final.p': 'Choisissez votre offre et passez votre commande en quelques instants.',
    'final.cta': 'Commander maintenant',
    'footer.links': 'Liens rapides', 'footer.contact': 'Contact', 'footer.legal': 'Informations légales',
    'footer.tagline': 'Thermos isotherme inox au Maroc. Paiement à la livraison, livraison rapide.',
    'guarantee.title': 'Notre garantie',
    'common.commander': 'Commander', 'common.whatsapp': 'WhatsApp',
  },
  ar: {
    'nav.accueil': 'الرئيسية', 'nav.produit': 'منتجنا', 'nav.avis': 'آراء العملاء',
    'nav.faq': 'الأسئلة الشائعة', 'nav.commander': 'اطلب الآن',
    'hero.eyebrow': 'رفيقك اليومي',
    'hero.h1': 'استمتع بمشروباتك المفضلة بالحرارة المناسبة، في كل مكان.',
    'hero.p': 'اكتشف الترمس المعزول المصمم لمرافقتك في يومك، في العمل أو السفر أو المنزل.',
    'hero.cta1': 'اطلب الآن', 'hero.cta2': 'اكتشف المنتج',
    'hero.trust1': 'الدفع عند الاستلام', 'hero.trust2': 'التوصيل حسب مدينتك', 'hero.trust3': 'خدمة العملاء عبر واتساب',
    'benefits.title': 'مصمم لمرافقتك يوميا.', 'benefits.sub': 'مزايا الترمس المعزول.',
    'benefits.1h': 'الحفاظ على الحرارة', 'benefits.1p': 'يحافظ على سخونة مشروباتك حتى 12 ساعة.',
    'benefits.2h': 'الحفاظ على البرودة', 'benefits.2p': 'يحافظ على برودة مشروباتك حتى 24 ساعة.',
    'benefits.3h': 'تصميم عملي وأنيق', 'benefits.3p': 'فولاذ مقاوم للصدأ، تشطيب متقن.',
    'benefits.4h': 'سهل الحمل', 'benefits.4p': 'خفيف ومناسب للاستخدام اليومي.',
    'gallery.title': 'اكتشف المنتج.', 'gallery.sub': 'صور حقيقية للترمس. اضغط للتكبير.',
    'steps.title': 'كيف يعمل الترمس.', 'steps.sub': 'استخدام سهل في 4 خطوات.',
    'steps.1h': 'املأ', 'steps.1p': 'املأ الترمس.',
    'steps.2h': 'أغلق', 'steps.2p': 'أغلق الغطاء بشكل صحيح.',
    'steps.3h': 'احمل', 'steps.3p': 'احمله معك في كل مكان.',
    'steps.4h': 'استمتع', 'steps.4p': 'استمتع بمشروبك.',
    'specs.title': 'المواصفات التقنية.', 'specs.sub': 'مواصفات الترمس المعزول.',
    'offers.title': 'اختر عرضك.', 'offers.sub': 'اختر الكمية المناسبة لاحتياجاتك.',
    'offers.note': 'الأسعار بالدرهم. الدفع عند الاستلام.',
    'offers.cta': 'اطلب',
    'reviews.title': 'ماذا يقول عملاؤنا.', 'reviews.sub': 'شهادات وآراء.',
    'video.title': 'اكتشف الترمس أثناء الاستخدام.', 'video.sub': 'عرض المنتج.',
    'delivery.title': 'التوصيل والآجال.', 'delivery.sub': 'الأسعار والآجال الإرشادية حسب المدينة.',
    'order.title': 'أتمم طلبك.', 'order.sub': 'املأ النموذج وسنتصل بك للتأكيد.',
    'order.name': 'الاسم الكامل', 'order.phone': 'الهاتف', 'order.city': 'المدينة',
    'order.offer': 'العرض / الكمية', 'order.address': 'العنوان الكامل',
    'order.submit': 'تأكيد طلبي', 'order.note': 'الدفع عند الاستلام.', 'order.note2': 'يمكنك أيضا الطلب مباشرة عبر',
    'order.successH': 'شكرا لطلبك!', 'order.successP': 'سنتصل بك لتأكيد طلبك وتفاصيل التوصيل.',
    'order.successWa': 'تأكيد عبر واتساب',
    'delivery.delay': 'الأجل', 'delivery.fee': 'التكلفة',
    'ordersteps.title': 'اطلب بكل سهولة.', 'ordersteps.sub': 'أتمم طلبك في 4 خطوات.',
    'faq.title': 'الأسئلة الشائعة.', 'faq.sub': 'كل الأجوبة قبل الطلب.',
    'final.h': 'هل أنت مستعد للاستمتاع بالترمس يوميا؟', 'final.p': 'اختر عرضك وأتمم طلبك في لحظات.',
    'final.cta': 'اطلب الآن',
    'footer.links': 'روابط سريعة', 'footer.contact': 'اتصل بنا', 'footer.legal': 'معلومات قانونية',
    'footer.tagline': 'ترمس معزول في المغرب. الدفع عند الاستلام، توصيل سريع.',
    'guarantee.title': 'ضماننا',
    'common.commander': 'اطلب', 'common.whatsapp': 'واتساب',
  },
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
  const isAr = () => CONFIG.lang === 'ar';
  const t = (key) => (I18N[CONFIG.lang] && I18N[CONFIG.lang][key]) || I18N.fr[key] || key;
  const pick = (fr, ar) => (isAr() && has(ar) ? ar : fr);

  /* ---------- i18n statique ---------- */
  function applyStaticI18n() {
    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    $$('[data-i18n-aria]').forEach(el => {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
  }

  function setLang(lang) {
    CONFIG.lang = lang === 'ar' ? 'ar' : 'fr';
    document.documentElement.lang = CONFIG.lang;
    document.documentElement.dir = CONFIG.lang === 'ar' ? 'rtl' : 'ltr';
    const btn = $('#langToggle');
    if (btn) btn.textContent = CONFIG.lang === 'ar' ? 'FR' : 'العربية';
    try { localStorage.setItem('therma_lang', CONFIG.lang); } catch (e) {}
    applyStaticI18n();
    renderOffers();
    renderOfferSelect();
    renderSpecs();
    renderFaq();
    renderGallery();
    renderDelivery();
    renderGuarantee();
    renderHeroPrice();
    renderBrand();
  }

  /* ---------- Prix hero ---------- */
  function renderHeroPrice() {
    const el = $('#heroPrice');
    if (!el) return;
    const label = $('#heroPriceLabel');
    if (label) label.textContent = pick(CONFIG.heroPriceLabel, 'ابتداءً من');
    const prices = CONFIG.offers.filter(o => has(o.price)).map(o => o.price);
    const min = prices.length ? Math.min.apply(null, prices) : null;
    el.textContent = has(min) ? money(min) : '';
    const badge = $('.price-badge');
    if (badge && !has(min)) badge.classList.add('hidden');
    const fp = $('#finalPrice');
    if (fp) fp.textContent = has(min) ? pick(CONFIG.heroPriceLabel, 'ابتداءً من') + ' ' + money(min) : '';
    const sp = $('#stickyPrice');
    if (sp) sp.textContent = has(min) ? pick(CONFIG.heroPriceLabel, 'ابتداءً من') + ' ' + money(min) : '';
  }

  /* ---------- Offres ---------- */
  function renderOffers() {
    const grid = $('#offersGrid');
    if (!grid) return;
    grid.innerHTML = CONFIG.offers.map((o) => {
      const price = o.price;
      const hasPrice = has(price);
      const unit = hasPrice ? money(Math.round(price / o.qty)) + (isAr() ? ' / للوحدة' : ' / unité') : pick('À confirmer', 'غير مؤكد');
      let savings = has(o.save) ? o.save : 0;
      if (!has(o.save) && hasPrice && o.qty > 1 && CONFIG.offers[0] && has(CONFIG.offers[0].price)) {
        savings = Math.round((CONFIG.offers[0].price - price / o.qty) * o.qty);
      }
      const savingsHtml = savings > 0
        ? '<div class="offer-savings"><svg class="icon"><use href="#i-tag"/></svg>' + pick('Vous économisez ', 'توفير ') + money(savings) + '</div>'
        : '<div class="offer-savings"></div>';
      const badge = o.badge ? '<div class="offer-badge">' + pick(o.badge, o.badgeAr) + '</div>' : '';
      const cta = hasPrice
        ? '<button type="button" class="offer-cta" data-offer="' + o.id + '">' + t('offers.cta') + '</button>'
        : '<button type="button" class="offer-cta secondary" data-offer-contact="' + o.id + '">' + pick('Me contacter', 'اتصل بي') + '</button>';
      return '' +
        '<div class="offer-card' + (o.featured ? ' featured' : '') + '" data-card="' + o.id + '">' +
          badge +
          '<div class="offer-name">' + pick(o.name, o.nameAr) + '</div>' +
          '<div class="offer-qty">' + pick(o.label, o.labelAr) + '</div>' +
          '<div class="offer-price">' + (hasPrice ? money(price) : pick('Sur demande', 'عند الطلب')) + '</div>' +
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
        openWa(pick('Bonjour, je souhaite des informations sur ', 'مرحبا، أريد معلومات عن ') + (o ? pick(o.name, o.nameAr) : pick('vos offres', 'عروضكم')) + '.');
      });
    });
  }

  /* ---------- Select des offres (formulaire) ---------- */
  function renderOfferSelect() {
    const select = $('#orderOffer');
    if (!select) return;
    const prev = select.value;
    select.innerHTML = '<option value="">' + pick('— Choisir une offre —', '— اختر عرضا —') + '</option>' +
      CONFIG.offers.filter(o => has(o.price)).map(o =>
        '<option value="' + o.id + '">' + pick(o.name, o.nameAr) + ' – ' + pick(o.label, o.labelAr) + ' (' + money(o.price) + ')</option>'
      ).join('');
    if (prev) select.value = prev;
  }

  /* ---------- Tableau specs ---------- */
  function renderSpecs() {
    const body = $('#specsBody');
    if (!body) return;
    const rows = CONFIG.specs.filter(s => has(s.value));
    body.innerHTML = rows.map(s =>
      '<tr><th>' + pick(s.label, s.labelAr) + '</th><td>' + pick(s.value, s.valueAr) + '</td></tr>'
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
          '<span>' + pick(f.q, f.qAr) + '</span><span class="faq-toggle">+</span>' +
        '</div>' +
        '<div class="faq-answer">' + pick(f.a, f.aAr) + '</div>' +
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
        (g.label ? '<div class="gallery-label">' + pick(g.label, g.labelAr) + '</div>' : '') +
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
      wrap.innerHTML = '<video controls preload="metadata" playsinline><source src="' + url + '">' + pick('Votre navigateur ne prend pas en charge la vidéo.', 'متصفحك لا يدعم الفيديو.') + '</video>';
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

  /* ---------- Livraison ---------- */
  function renderDelivery() {
    const body = $('#deliveryBody');
    if (!body) return;
    const rows = (CONFIG.delivery.cities || []).filter(c => has(c.name) && (has(c.time) || has(c.fee)));
    body.innerHTML = rows.map(c =>
      '<tr><th>' + pick(c.name, c.nameAr) + '</th><td>' + (has(c.time) ? pick(c.time, c.time) : '—') + '</td><td>' + (has(c.fee) ? (isAr() ? c.fee + ' درهم' : money(c.fee)) : '—') + '</td></tr>'
    ).join('');
    const section = body.closest('section');
    if (!rows.length && section) section.classList.add('hidden');
  }

  /* ---------- Garantie ---------- */
  function renderGuarantee() {
    const wrap = $('#guaranteeList');
    if (!wrap) return;
    const items = (CONFIG.guarantee || []).filter(has);
    wrap.innerHTML = items.map(g =>
      '<div class="guarantee-item"><svg class="icon"><use href="#i-shield"/></svg><span>' + g + '</span></div>'
    ).join('');
    const section = wrap.closest('section');
    if (!items.length && section) section.classList.add('hidden');
  }

  /* ---------- Urgence ---------- */
  function renderUrgency() {
    const el = $('#urgency');
    if (!el) return;
    if (has(CONFIG.urgency)) { el.textContent = CONFIG.urgency; el.classList.remove('hidden'); }
    else el.classList.add('hidden');
  }

  /* ---------- Marque / contact ---------- */
  function renderBrand() {
    $$('.js-brand-name').forEach(el => el.textContent = CONFIG.brandName);
    $$('.js-brand-tagline').forEach(el => el.textContent = CONFIG.brandTagline);
    $$('.js-company').forEach(el => el.textContent = CONFIG.company.name + (has(CONFIG.company.legalForm) ? ' (' + CONFIG.company.legalForm + ')' : ''));
    $$('.js-ice').forEach(el => el.textContent = has(CONFIG.company.ice) ? 'ICE : ' + CONFIG.company.ice : '');
    $$('.js-email').forEach(el => { el.textContent = CONFIG.company.email; el.href = 'mailto:' + CONFIG.company.email; });
    $$('.js-hours').forEach(el => el.textContent = CONFIG.company.hours);
    $$('.js-phone').forEach(el => { el.textContent = CONFIG.company.phoneDisplay; el.href = 'tel:+212' + CONFIG.company.phoneDisplay.replace(/^0/, ''); });
    document.title = CONFIG.brandName + ' | ' + CONFIG.brandTagline + (isAr() ? ' في المغرب' : ' au Maroc');
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

  /* ---------- Message WhatsApp pré-rempli ---------- */
  function buildWaMessage(extra) {
    const lines = [
      pick('Bonjour, je souhaite commander votre thermos.', 'مرحبا، أريد طلب الترمس الخاص بكم.'),
      '',
      pick('Offre choisie : ', 'العرض المختار: ') + (selectedOffer ? pick(selectedOffer.name, selectedOffer.nameAr) + ' – ' + pick(selectedOffer.label, selectedOffer.labelAr) : pick('À préciser', 'غير محدد')),
      pick('Prix : ', 'السعر: ') + (selectedOffer && has(selectedOffer.price) ? money(selectedOffer.price) : pick('À confirmer', 'غير مؤكد')),
    ];
    if (extra) lines.push(extra);
    lines.push('', pick('Merci.', 'شكرا.'));
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
    try { if (typeof gtag === 'function') gtag('event', 'generate_lead'); } catch (e) {}
  }

  /* ---------- Soumission Netlify ---------- */
  function initForm() {
    const form = $('#orderForm');
    if (!form) return;

    const select = $('#orderOffer');
    renderOfferSelect();
    if (select) select.addEventListener('change', () => setFieldError(select, false));

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
      btn.textContent = isAr() ? 'جاري الإرسال…' : 'Envoi en cours…';

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      }).then(() => {
        trackLead();
        const name = data.get('fName') || '';
        const city = data.get('fCity') || '';
        const extra = (has(name) ? pick('Nom : ', 'الاسم: ') + name + '\n' : '') + (has(city) ? pick('Ville : ', 'المدينة: ') + city : '');
        form.classList.add('hidden');
        const success = $('#formSuccess');
        if (success) {
          const wa = $('#successWa');
          if (wa) wa.href = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(buildWaMessage(extra));
          success.classList.add('show');
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }).catch(() => {
        btn.disabled = false;
        btn.textContent = t('order.submit');
        alert(pick('Une erreur est survenue. Veuillez réessayer ou commander via WhatsApp.', 'حدث خطأ. حاول مجددا أو اطلب عبر واتساب.'));
      });
    });

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

  /* ---------- Langue ---------- */
  function initLang() {
    let saved = 'fr';
    try { saved = localStorage.getItem('therma_lang') || 'fr'; } catch (e) {}
    setLang(saved);
    const btn = $('#langToggle');
    if (btn) btn.addEventListener('click', () => setLang(isAr() ? 'fr' : 'ar'));
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
    renderDelivery();
    renderGuarantee();
    renderUrgency();
    initForm();
    initNav();
    initWaButtons();
    initLightbox();
    initLang();
    window.selectOffer = selectOffer;
    window.openWa = openWa;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();