(function () {
  document.documentElement.classList.add('js');
  var DATA = {
    li0: { d: 'J0', li: 1, t: 'Invitation LinkedIn', u: 'note de connexion', x: "Bonjour Camille, je travaille avec des marques de mobilier qui animent plusieurs points de vente, un sujet proche de celui d'Atelier Nova. Je serais ravi de vous compter dans mon réseau." },
    m1: { d: 'J0', t: 'Mail 1', u: 'Objet : Atelier Nova et vos trois boutiques', x: "Bonjour Camille,\n\nPour une marque de mobilier avec trois boutiques, garder le même discours en magasin et en ligne demande une vraie coordination côté marketing.\n\nStudio Arca aide les marques de ce type à décliner leurs campagnes pour chaque point de vente sans multiplier les allers-retours.\n\nSeriez-vous disponible 20 minutes la semaine prochaine pour en parler ?" },
    m2: { d: 'J+3', t: 'Mail 2', u: 'relance, angle nouveau', x: "Camille, une question plus concrète : comment adaptez-vous aujourd'hui une campagne nationale à chacune de vos trois boutiques ?\n\nSi c'est un sujet, je peux vous présenter notre méthode en dix minutes." },
    li1: { d: 'J+4', li: 1, t: 'Message LinkedIn 1', u: "après l'acceptation", x: "Merci pour la connexion, Camille. Avec trois boutiques, l'adaptation des campagnes à chaque point de vente doit vite devenir un sujet. Comment l'organisez-vous aujourd'hui ?" },
    m3: { d: 'J+7', t: 'Mail 3', u: 'dernier message', x: "Camille, je ne veux pas encombrer votre boîte. Si le sujet n'est pas pour vous, pouvez-vous m'indiquer la bonne personne chez Atelier Nova ?" },
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

// ═══ Dynamisme : hero animé, apparitions variées, compteurs, parallaxe, barre de progression ═══
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  // 1. Hero : un parcours qui s'écrit, contact après contact
  var C = [
    { n: 'Atelier Nova · Camille Roux', r: 'Directrice marketing · Mobilier, trois boutiques', s: {
      m1: ['Atelier Nova et vos trois boutiques', 'Bonjour Camille, pour une marque de mobilier avec trois boutiques et un site, garder le même discours…', 'J0'],
      li0: ['Invitation LinkedIn', "Bonjour Camille, je travaille avec des marques de mobilier qui animent plusieurs points de vente…", 'c'],
      m2: ['Mail 2, relance', "Camille, une question plus concrète : comment adaptez-vous une campagne nationale à chacune de vos boutiques ?", 'J+3'] } },
    { n: 'Brasserie des Quais · Julien Marchand', r: 'Gérant · Brasserie de 120 couverts, salle privatisable', s: {
      m1: ['Privatisations à la Brasserie des Quais', 'Bonjour Julien, une salle privatisable est un vrai atout pour les repas d’entreprise, mais ces demandes…', 'J0'],
      li0: ['Invitation LinkedIn', "Bonjour Julien, j'accompagne des restaurateurs sur la privatisation de leurs salles. Au plaisir d'échanger ici.", 'c'],
      m2: ['Mail 2, relance', "Julien, une question utile : sur quelle période de l'année votre salle est-elle la moins occupée ?", 'J+3'] } },
    { n: 'Clinique Saint-Loup · Sophie Lemaire', r: 'Directrice des ressources humaines · Clinique de 180 lits', s: {
      m1: ['Recruter des infirmiers à Saint-Loup', 'Bonjour Sophie, recruter des infirmiers en continu, dans une clinique de 180 lits, mobilise beaucoup…', 'J0'],
      li0: ['Invitation LinkedIn', "Bonjour Sophie, je travaille sur l'approche des candidats dans la santé, un enjeu que vous connaissez…", 'c'],
      m2: ['Mail 2, relance', "Sophie, une seule question : combien de candidats infirmiers contactez-vous à la main chaque semaine ?", 'J+3'] } }
  ];
  var NOTES = ['Aucune information inventée : sans donnée précise, le texte reste général.', 'Note d’invitation tenue sous 300 caractères, sans lien ni vente.', 'Une seule question par message, jamais plusieurs demandes.', 'Chaque relance apporte un angle nouveau, sans répéter le mail 1.'];
  var rows = document.getElementById('ha-rows');
  if (rows && !reduce) {
    var nm = document.getElementById('ha-name'), rl = document.getElementById('ha-role'), cnt = document.getElementById('ha-n'), bar = document.getElementById('ha-bar'),
        chips = document.querySelectorAll('#ha-chips i'), fl = document.getElementById('ha-float'), alive = true, ci = 0, ni = 0;
    var ORD = ['m1', 'li0', 'm2'], IC = { m1: ['M1', ''], li0: ['in', 'background:#1A2F5C'], m2: ['M2', ''] };
    function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
    function setChip(k) { Array.prototype.forEach.call(chips, function (c) { c.classList.toggle('on', c.dataset.k === k || c.classList.contains('done')); }); }
    async function type(el, txt, speed, onTick) {
      for (var i = 1; i <= txt.length; i++) { if (!alive) return; el.textContent = txt.slice(0, i); if (onTick) onTick(i); await wait(speed); }
    }
    async function play() {
      while (alive) {
        var c = C[ci % C.length];
        rows.parentElement.classList.remove('swap'); void rows.offsetWidth; rows.parentElement.classList.add('swap');
        nm.textContent = c.n; rl.textContent = c.r; cnt.textContent = 'Contact ' + (ci % C.length + 1) + ' / 3';
        rows.innerHTML = ''; bar.style.width = '0%';
        Array.prototype.forEach.call(chips, function (x) { x.classList.remove('on', 'done'); });
        await wait(500);
        for (var k = 0; k < ORD.length && alive; k++) {
          var key = ORD[k], d = c.s[key], row = document.createElement('div');
          row.className = 'lm-row ha-r';
          row.innerHTML = '<span class="ic" style="' + IC[key][1] + '">' + IC[key][0] + '</span><div><b></b><br><span class="ha-t"></span><span class="ha-caret"></span></div><em></em>';
          rows.appendChild(row); void row.offsetWidth; row.classList.add('on');
          Array.prototype.forEach.call(chips, function (x) { if (x.dataset.k === key) x.classList.add('on'); });
          var b = row.querySelector('b'), t = row.querySelector('.ha-t'), em = row.querySelector('em');
          b.textContent = d[0]; em.textContent = d[2] === 'c' ? '0 / 300' : d[2];
          await type(t, d[1], 22, d[2] === 'c' ? function (i) { em.textContent = Math.min(300, Math.round(i / d[1].length * 176)) + ' / 300'; } : null);
          if (d[2] === 'c') em.textContent = d[1].length + ' / 300';
          em.classList.add('ok'); row.querySelector('.ha-caret').remove();
          Array.prototype.forEach.call(chips, function (x) { if (x.dataset.k === key) { x.classList.remove('on'); x.classList.add('done'); } });
          bar.style.width = Math.round((k + 1) / ORD.length * 100) + '%';
          await wait(450);
        }
        ni++; fl.classList.add('out'); await wait(260);
        fl.querySelector('span').textContent = NOTES[ni % NOTES.length]; fl.classList.remove('out');
        await wait(2400); ci++;
      }
    }
    var ha = document.getElementById('lm-ha'), running = false;
    function start() { if (running) return; running = true; play().then(function () { running = false; if (alive) start(); }); }
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { alive = es[0].isIntersecting; if (alive) start(); }, { threshold: .1 }).observe(ha);
    else start();
  }

  // 2. Apparitions variées et décalées
  document.querySelectorAll('.lm-split').forEach(function (sp) {
    var a = sp.children[0], b = sp.children[1], rev = sp.classList.contains('rev');
    if (a) { a.classList.add('lm-rv', rev ? 'rv-r' : 'rv-l'); } if (b) { b.classList.add('lm-rv', rev ? 'rv-l' : 'rv-r'); }
  });
  document.querySelectorAll('.lm-grid3,.lm-bento,.lm-stats,.lm-price,.lm-seq,.lm-ba').forEach(function (g) {
    Array.prototype.forEach.call(g.children, function (c, i) { c.style.transitionDelay = (i * 90) + 'ms'; if (!c.classList.contains('lm-rv')) c.classList.add('lm-rv'); });
  });
  document.querySelectorAll('.lm-sec > .lm-w > h2, .lm-sec > .lm-w > .lm-k, .lm-sec > .lm-w > .lm-sub, .lm-final h2').forEach(function (e) { e.classList.add('lm-rv'); });
  document.querySelectorAll('.lm-fmsg mark').forEach(function (m, i) { m.style.transitionDelay = (400 + i * 250) + 'ms'; });
  document.querySelectorAll('.lm-cad, .lm-ftm, .lm-cmp, .lm-tbl, .lm-calc').forEach(function (e) { e.classList.add('lm-rv'); });
  if ('IntersectionObserver' in window) {
    var io2 = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io2.unobserve(e.target); } }); }, { threshold: .12 });
    document.querySelectorAll('.lm-rv:not(.in)').forEach(function (i) { io2.observe(i); });
  } else document.querySelectorAll('.lm-rv').forEach(function (i) { i.classList.add('in'); });

  // 3. Compteurs
  document.querySelectorAll('.lm-stat b').forEach(function (b) {
    var end = parseInt(b.textContent, 10); if (isNaN(end) || end < 2 || reduce) return;
    b.textContent = '0';
    var io3 = new IntersectionObserver(function (es) { if (!es[0].isIntersecting) return; io3.disconnect(); var t0 = performance.now();
      (function step(t) { var p = Math.min(1, (t - t0) / 1100); b.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); })(t0); }, { threshold: .6 });
    io3.observe(b);
  });

  // 4. Barre de progression, parallaxe douce, bandeau qui se range en descendant
  var bar2 = document.createElement('div'); bar2.className = 'lm-prog'; document.body.appendChild(bar2);
  var nav = document.querySelector('.lm-nav'), win = document.querySelector('.lm-hero .lm-win'), fl2 = document.querySelector('.lm-float'), last = 0, tick = false;
  function onScroll() {
    var y = window.scrollY || 0, h = document.documentElement.scrollHeight - innerHeight;
    bar2.style.width = (h > 0 ? y / h * 100 : 0) + '%';
    if (nav) { nav.classList.toggle('lm-scrolled', y > 8); if (!document.getElementById('lm-links') || !document.getElementById('lm-links').classList.contains('open')) nav.classList.remove('lm-hide'); }
    if (!reduce && y < 900) { if (win) win.style.transform = 'translateY(' + (y * -0.06).toFixed(1) + 'px)'; if (fl2) fl2.style.transform = 'translateY(' + (y * -0.12).toFixed(1) + 'px)'; document.documentElement.style.setProperty('--hy', (y * 0.25).toFixed(1) + 'px'); }
    last = y; tick = false;
  }
  window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
})();
