(function () {
  document.documentElement.classList.add('js');
  var DATA = {
    li0: { d: 'J0', li: 1, t: 'Invitation LinkedIn', u: 'note de connexion', x: "Bonjour Camille, je travaille avec des marques de mobilier qui animent plusieurs points de vente, un sujet proche de celui d'Atelier Nova. Je serais ravi de vous compter dans mon réseau." },
    m1: { d: 'J0', t: 'Mail 1', u: 'Objet : Atelier Nova et vos trois boutiques', x: "Bonjour Camille,\n\nPour une marque de mobilier avec trois boutiques, garder le même discours en magasin et en ligne demande une vraie coordination côté marketing.\n\nStudio Arca aide les marques de ce type à décliner leurs campagnes pour chaque point de vente sans multiplier les allers-retours.\n\nSeriez-vous disponible 20 minutes la semaine prochaine pour en parler ?\n\nStudio Arca" },
    m2: { d: 'J+3', t: 'Mail 2', u: 'relance, angle nouveau', x: "Camille, une question plus concrète : comment adaptez-vous aujourd'hui une campagne nationale à chacune de vos trois boutiques ?\n\nSi c'est un sujet, je peux vous présenter notre méthode en dix minutes.\n\nStudio Arca" },
    li1: { d: 'J+4', li: 1, t: 'Message LinkedIn 1', u: "après l'acceptation", x: "Merci pour la connexion, Camille. Avec trois boutiques, l'adaptation des campagnes à chaque point de vente doit vite devenir un sujet. Comment l'organisez-vous aujourd'hui ?" },
    m3: { d: 'J+7', t: 'Mail 3', u: 'dernier message', x: "Camille, je ne veux pas encombrer votre boîte. Si le sujet n'est pas pour vous, pouvez-vous m'indiquer la bonne personne chez Atelier Nova ?\n\nStudio Arca" },
    li2: { d: 'J+9', li: 1, t: 'Message LinkedIn 2', u: 'relance', x: "Camille, un dernier mot sur le sujet : je peux vous envoyer un court exemple de calendrier de campagne multi-boutiques, sans engagement. Souhaitez-vous le recevoir ?" }
  };
  var ORDER = ['li0', 'm1', 'm2', 'li1', 'm3', 'li2'];
  var PRE = { mail: ['m1', 'm2', 'm3'], li: ['li0', 'li1', 'li2'], full: ORDER.slice() };
  var sel = { li0: 1, m1: 1, m2: 1, li1: 1 };
  var tl = document.getElementById('lm-tl'), chips = document.getElementById('lm-chips'), sum = document.getElementById('lm-sum');
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function render() {
    if (!tl) return;
    var on = ORDER.filter(function (k) { return sel[k]; });
    tl.innerHTML = on.length ? on.map(function (k) {
      var m = DATA[k];
      return '<li><span class="d' + (m.li ? ' li' : '') + '">' + m.d + '</span><div class="lm-msg"><h4>' + m.t + '<u>' + m.u + '</u></h4>' + esc(m.x) + '</div></li>';
    }).join('') : '<div class="lm-empty">Cochez au moins un message pour voir le parcours.</div>';
    Array.prototype.forEach.call(chips.children, function (c) { c.classList.toggle('on', !!sel[c.dataset.k]); c.setAttribute('aria-pressed', sel[c.dataset.k] ? 'true' : 'false'); });
    sum.innerHTML = '<b>' + on.length + '</b> message' + (on.length > 1 ? 's' : '') + ' par contact · <b>1</b> crédit par contact';
    Array.prototype.forEach.call(document.querySelectorAll('.lm-pre'), function (p) {
      var arr = PRE[p.dataset.p], same = arr.length === on.length && arr.every(function (k) { return sel[k]; });
      p.classList.toggle('on', same);
    });
  }
  if (chips) {
    chips.innerHTML = ORDER.map(function (k) { var m = DATA[k]; return '<button type="button" class="lm-chip" data-k="' + k + '" aria-pressed="false"><i>✓</i><span>' + m.t + '</span><small>' + m.d + '</small></button>'; }).join('');
    chips.addEventListener('click', function (e) { var b = e.target.closest('.lm-chip'); if (!b) return; sel[b.dataset.k] = sel[b.dataset.k] ? 0 : 1; render(); });
    Array.prototype.forEach.call(document.querySelectorAll('.lm-pre'), function (p) {
      p.addEventListener('click', function () { sel = {}; PRE[p.dataset.p].forEach(function (k) { sel[k] = 1; }); render(); });
    });
    render();
  }
  // apparitions au défilement
  var items = document.querySelectorAll('.lm-rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .08 });
    items.forEach(function (i) { io.observe(i); });
    setTimeout(function () { items.forEach(function (i) { i.classList.add('in'); }); }, 2500);
  } else items.forEach(function (i) { i.classList.add('in'); });
  // pas de rideau si on revient sur la page ou si le mouvement est réduit
  var cu = document.querySelector('.lm-curtain');
  if (cu) setTimeout(function () { cu.remove(); }, 1500);
})();
// boutons « Copier »
document.addEventListener('click', function (ev) {
  var b = ev.target.closest && ev.target.closest('[data-copy]'); if (!b) return;
  var el = document.getElementById(b.getAttribute('data-copy')); if (!el) return;
  var txt = el.textContent, old = b.textContent;
  function done() { b.textContent = 'Copié ✓'; setTimeout(function () { b.textContent = old; }, 1600); }
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, done); else done();
});
// menu mobile
(function () {
  var b = document.getElementById('lm-burger'), l = document.getElementById('lm-links');
  if (!b || !l) return;
  b.addEventListener('click', function () { var o = l.classList.toggle('open'); b.setAttribute('aria-expanded', o ? 'true' : 'false'); b.textContent = o ? '✕' : '☰'; });
  l.addEventListener('click', function (e) { if (e.target.tagName === 'A') { l.classList.remove('open'); b.textContent = '☰'; } });
})();
// calculateur de crédits
(function () {
  var n = document.getElementById('lc-n'), r = document.getElementById('lc-r'), out = document.getElementById('lc-out');
  if (!n || !out) return;
  function fmt(x) { return x.toLocaleString('fr-FR'); }
  function calc(v) {
    v = Math.max(1, Math.min(100000, Math.round(+v || 0)));
    var plan, price, per;
    if (v <= 5) { plan = 'Gratuit'; price = 0; }
    else if (v <= 500) { plan = 'Starter'; price = 29; }
    else if (v <= 2000) { plan = 'Growth'; price = 79; }
    else { plan = 'Forfait sur mesure'; price = null; }
    out.innerHTML = '<b>' + fmt(v) + ' crédit' + (v > 1 ? 's' : '') + '</b><p>Parcours de 1 à 6 messages par contact, un crédit par contact.</p><p style="margin-top:10px"><b style="font-size:20px">' + plan + '</b>' + (price === null ? '</p><p>Au-delà de 2 000 contacts par mois, écrivez-nous pour un forfait adapté.' : (price === 0 ? '</p><p>Offert à l\'inscription, sans carte bancaire.' : ' · ' + price + ' € par mois</p><p>Soit environ ' + (price / (plan === 'Starter' ? 500 : 2000)).toFixed(3).replace('.', ',') + ' € par contact si vous utilisez tout votre forfait.')) + '</p>';
  }
  n.addEventListener('input', function () { r.value = Math.min(+n.value || 1, +r.max); calc(n.value); });
  r.addEventListener('input', function () { n.value = r.value; calc(r.value); });
  calc(n.value);
})();
