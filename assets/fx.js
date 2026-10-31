/* Dynamisme au scroll + outils interactifs des pages. Aucun cookie, rien n'est envoyé hors du navigateur. */
(function () {
  'use strict';
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  if (!RM) document.documentElement.classList.add('fx-on');

  /* ── 1. Révélations échelonnées ── */
  var TAGS = '.lp-section-label,.lp-h2,.lp-section-sub,.pro-dl>div,.mz,.pro-compare-col,.lp-price-card,.lp-faq-item,' +
    '#pages .pgstat,#pages .pgb,#pages .pgcard,#pages .pgvs>div,#pages .pgtl li,#pages .pgcase,#pages .pgfaq details,#pages .pgtool,#pages .pgcmp,#pages .pgcallout,#pages .pgsec>.pgw>h2,#pages .pgprose h2,#pages .pgcta,.mz .r';
  function tag() {
    $$(TAGS).forEach(function (el) {
      if (el.classList.contains('fx') || el.dataset.fx === '0') return;
      var par = el.parentNode, i = 0, n = el;
      while ((n = n.previousElementSibling)) { if (n.className === el.className) i++; }
      el.style.setProperty('--d', Math.min(i, 5));
      if (!el.classList.contains('lp-reveal')) el.classList.add('fx');
      if (el.matches('#pages .pgtl li')) el.classList.add(i % 2 ? 'fx-r' : 'fx-l');
    });
    $$('.lp-reveal').forEach(function (el) {
      if (el.style.getPropertyValue('--d')) return;
      var i = 0, n = el;
      while ((n = n.previousElementSibling)) { if (n.className.indexOf('lp-reveal') > -1) i++; }
      el.style.setProperty('--d', Math.min(i, 5));
    });
  }
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in'); io.unobserve(e.target); count(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }) : null;
  function observe() { tag(); $$('.fx:not(.in)').forEach(function (el) { io ? io.observe(el) : el.classList.add('in'); }); }

  /* ── 2. Compteurs ── */
  function fmtSecs(s) { s = Math.round(s); return s < 60 ? s + ' s' : Math.floor(s / 60) + ' min ' + (s % 60 ? (s % 60) + ' s' : ''); }
  function run(el, to, fmt) {
    if (RM) { el.textContent = fmt(to); return; }
    var t0 = performance.now(), d = 1300;
    (function f(t) { var p = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(to * e); if (p < 1) requestAnimationFrame(f); else el.textContent = fmt(to); })(t0);
  }
  function count(root) {
    $$('[data-count]', root).concat(root.dataset && root.dataset.count ? [root] : []).forEach(function (el) {
      if (el.__done) return; el.__done = 1;
      var to = parseFloat(el.dataset.count), suf = el.dataset.suffix || '';
      run(el, to, function (v) { return Math.round(v).toLocaleString('fr-FR') + suf; });
    });
    $$('[data-secs]', root).concat(root.dataset && root.dataset.secs ? [root] : []).forEach(function (el) {
      if (el.__done) return; el.__done = 1; run(el, parseFloat(el.dataset.secs), fmtSecs);
    });
  }

  /* ── 3. Parallaxe, étapes actives, navigation ── */
  var ticking = false, lastY = window.pageYOffset || 0;
  function frame() {
    ticking = false;
    var y = window.pageYOffset || 0, vh = window.innerHeight, dy = y - lastY;
    var nav = $('nav');
    if (nav && !document.body.classList.contains('in-app')) {
      nav.classList.toggle('nav-scrolled', y > 24);
      if (y > 320 && dy > 8) nav.classList.add('nav-hide'); else if (dy < -6 || y < 320) nav.classList.remove('nav-hide');
    } else if (nav) nav.classList.remove('nav-hide');
    lastY = y;
    if (RM) return;
    var hr = $('.lp-hero-right'); if (hr) hr.style.setProperty('--py', Math.max(-60, -Math.min(y, 900) * 0.07).toFixed(1) + 'px');
    $$('.lp-step-visual .mk,.mz .mk').forEach(function (m) {
      var r = m.getBoundingClientRect(); if (r.bottom < -100 || r.top > vh + 100) return;
      var o = (r.top + r.height / 2 - vh / 2);
      m.style.setProperty('--py', Math.max(-26, Math.min(26, -o * 0.07)).toFixed(1) + 'px');
      m.style.setProperty('--rot', Math.max(-2.5, Math.min(2.5, o * 0.004)).toFixed(2) + 'deg');
    });
    var steps = $$('.lp-step');
    if (steps.length && window.innerWidth > 800) {
      var sec = $('#lp-how'), sr = sec && sec.getBoundingClientRect();
      if (sr && sr.top < vh * .6 && sr.bottom > vh * .4) {
        var best = null, bd = 1e9;
        steps.forEach(function (s) { var r = s.getBoundingClientRect(), d = Math.abs(r.top + r.height / 2 - vh / 2); if (d < bd) { bd = d; best = s; } });
        steps.forEach(function (s) { s.classList.toggle('is-dim', s !== best); });
      } else steps.forEach(function (s) { s.classList.remove('is-dim'); });
    }
    /* sommaire des guides */
    var hs = $$('#pages .pgprose h2[id]');
    if (hs.length) { var cur = hs[0].id; hs.forEach(function (h) { if (h.getBoundingClientRect().top < vh * .35) cur = h.id; }); $$('.pgtoc a').forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + cur); }); }
    /* barre de lecture des pages statiques */
    var pb = document.getElementById('proProgress');
    if (pb && !window.__lpProgress) { var h = document.documentElement.scrollHeight - vh; pb.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, y / h) : 0) + ')'; }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);

  /* ── 4. Filtres, copie ── */
  document.addEventListener('click', function (e) {
    var c = e.target.closest && e.target.closest('.pgchip');
    if (c) {
      var g = c.parentNode; $$('.pgchip', g).forEach(function (x) { x.classList.toggle('on', x === c); });
      var f = c.dataset.f;
      $$('[data-cat]').forEach(function (it) { it.style.display = (f === '*' || it.dataset.cat.split(' ').indexOf(f) > -1) ? '' : 'none'; });
    }
    var b = e.target.closest && e.target.closest('[data-copy]');
    if (b) {
      e.preventDefault();
      var src = b.dataset.copy ? document.getElementById(b.dataset.copy) : b.previousElementSibling;
      var txt = src ? (src.value !== undefined ? src.value : src.textContent) : '';
      var done = function () { var o = b.textContent; b.textContent = 'Copié ✓'; setTimeout(function () { b.textContent = o; }, 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, done); else done();
    }
  });

  /* ── 5. Outils ── */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // 5a. Vérificateur de CSV (traitement local)
  function parseCSV(text, d) {
    var rows = [], row = [], f = '', q = false;
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (q) { if (ch === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += ch; }
      else if (ch === '"') q = true;
      else if (ch === d) { row.push(f); f = ''; }
      else if (ch === '\n') { row.push(f); rows.push(row); row = []; f = ''; }
      else if (ch !== '\r') f += ch;
    }
    if (f.length || row.length) { row.push(f); rows.push(row); }
    return rows;
  }
  function analyse(buf, name) {
    var warn = [], good = [], text, enc = 'UTF-8';
    var u = new Uint8Array(buf);
    try { text = new TextDecoder('utf-8', { fatal: true }).decode(u); }
    catch (e) { text = new TextDecoder('windows-1252').decode(u); enc = 'Windows-1252'; warn.push('Le fichier n\'est pas en UTF-8 (lu en Windows-1252). Réexportez en UTF-8 pour garder les accents.'); }
    if (text.charCodeAt(0) === 0xFEFF) { text = text.slice(1); good.push('BOM UTF-8 détecté (sans conséquence).'); }
    if (/Ã©|Ã¨|Ã |â€™/.test(text)) warn.push('Des caractères mal encodés (Ã©, â€™…) sont présents : l\'export a été relu avec un mauvais encodage.');
    var first = text.split('\n')[0] || '', cnt = { ';': 0, ',': 0, '\t': 0 };
    for (var k in cnt) cnt[k] = first.split(k).length - 1;
    var d = ';'; if (cnt[','] > cnt[d]) d = ','; if (cnt['\t'] > cnt[d]) d = '\t';
    var rows = parseCSV(text, d).filter(function (r) { return r.join('').trim().length; });
    if (rows.length < 2) return '<span class="ko">Fichier vide ou illisible.</span>';
    var head = rows[0].map(function (h) { return h.trim(); }), data = rows.slice(1), n = data.length;
    var idx = function (re) { for (var i = 0; i < head.length; i++) if (re.test(head[i])) return i; return -1; };
    var ie = idx(/mail/i), ip = idx(/pr[ée]nom|first/i), inn = idx(/^nom$|last|famille/i), ic = idx(/entreprise|soci[ée]t[ée]|company|organisation/i), it = idx(/poste|titre|job|fonction/i);
    var bad = data.filter(function (r) { return r.length !== head.length; }).length;
    if (bad) warn.push(bad + ' ligne(s) n\'ont pas le même nombre de colonnes que l\'en-tête (séparateur ou guillemets mal fermés).');
    if (ie < 0) warn.push('Aucune colonne email trouvée (nom de colonne contenant « mail »).');
    else {
      var seen = {}, dup = 0, inv = 0, vide = 0;
      data.forEach(function (r) { var e = (r[ie] || '').trim().toLowerCase(); if (!e) { vide++; return; } if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)) inv++; if (seen[e]) dup++; seen[e] = 1; });
      if (vide) warn.push(vide + ' ligne(s) sans email.'); if (inv) warn.push(inv + ' email(s) au format invalide.'); if (dup) warn.push(dup + ' doublon(s) d\'email.');
      if (!vide && !inv && !dup) good.push('Emails : aucun vide, aucun invalide, aucun doublon.');
    }
    [['prénom', ip], ['entreprise', ic], ['poste', it]].forEach(function (p) {
      if (p[1] < 0) { warn.push('Colonne « ' + p[0] + ' » introuvable : le document sera moins personnalisé.'); return; }
      var v = data.filter(function (r) { return !(r[p[1]] || '').trim(); }).length;
      if (v > n * .1) warn.push(Math.round(v / n * 100) + ' % des lignes n\'ont pas de ' + p[0] + '.'); else good.push('Colonne ' + p[0] + ' bien remplie.');
    });
    [ip, inn].forEach(function (c) { if (c > -1) { var up = data.filter(function (r) { var s = (r[c] || '').trim(); return s.length > 2 && s === s.toUpperCase() && s !== s.toLowerCase(); }).length; if (up > n * .2) warn.push('Plus de 20 % des valeurs de « ' + head[c] + ' » sont en MAJUSCULES : normalisez avant génération.'); } });
    var dn = d === '\t' ? 'tabulation' : d === ';' ? 'point-virgule' : 'virgule';
    return '<p><b>' + esc(name) + '</b> : ' + n + ' contacts, ' + head.length + ' colonnes, séparateur ' + dn + ', encodage ' + enc + '.</p>' +
      '<p style="margin-top:8px"><b>Colonnes</b> : ' + head.map(esc).join(', ') + '</p>' +
      (warn.length ? '<ul style="margin:10px 0 0 18px">' + warn.map(function (w) { return '<li><span class="wa">À corriger</span> ' + esc(w) + '</li>'; }).join('') + '</ul>' : '') +
      (good.length ? '<ul style="margin:10px 0 0 18px">' + good.map(function (w) { return '<li><span class="ok">OK</span> ' + esc(w) + '</li>'; }).join('') + '</ul>' : '');
  }
  function initCsv() {
    var z = $('#csvdrop'); if (!z) return; var inp = $('#csvfile'), out = $('#csvout');
    function go(f) { if (!f) return; var r = new FileReader(); r.onload = function () { out.innerHTML = analyse(r.result, f.name); }; r.readAsArrayBuffer(f); }
    z.addEventListener('click', function () { inp.click(); }); inp.addEventListener('change', function () { go(inp.files[0]); });
    ['dragover', 'dragenter'].forEach(function (ev) { z.addEventListener(ev, function (e) { e.preventDefault(); z.classList.add('on'); }); });
    ['dragleave', 'drop'].forEach(function (ev) { z.addEventListener(ev, function (e) { e.preventDefault(); z.classList.remove('on'); }); });
    z.addEventListener('drop', function (e) { go(e.dataTransfer.files[0]); });
  }

  // 5b. Calculateur de montée en charge
  function initRamp() {
    var f = $('#ramp'); if (!f) return;
    function calc() {
      var mb = Math.max(1, +$('#r-mb').value || 1), target = Math.max(5, +$('#r-target').value || 30), wk = Math.max(2, Math.min(8, +$('#r-wk').value || 4)), contacts = Math.max(0, +$('#r-contacts').value || 0);
      var start = 5, h = '<table><tr><th>Semaine</th><th>Par boîte et par jour</th><th>Total par jour</th><th>Total par semaine (5 j)</th></tr>', cum = 0, w;
      for (w = 1; w <= wk; w++) { var per = Math.round(start + (target - start) * (w - 1) / (wk - 1)); var day = per * mb; cum += day * 5; h += '<tr><td>' + w + '</td><td>' + per + '</td><td>' + day + '</td><td>' + day * 5 + '</td></tr>'; }
      h += '</table>';
      var steady = target * mb, extra = '';
      if (contacts) { var left = Math.max(0, contacts - cum), days = Math.ceil(left / steady); extra = '<p>Pour <b>' + contacts.toLocaleString('fr-FR') + '</b> contacts : ' + (left ? 'après la montée en charge (' + cum.toLocaleString('fr-FR') + ' envoyés), comptez <b>' + days + ' jour(s) ouvré(s)</b> au rythme de ' + steady + ' par jour.' : 'la montée en charge suffit à tout envoyer.') + '</p>'; }
      $('#r-out').innerHTML = h + '<p>Rythme de croisière : <b>' + steady + ' emails par jour</b> sur ' + mb + ' boîte(s).</p>' + extra + '<p style="font-size:13px;opacity:.75;margin-top:8px">Repère général : 30 à 40 emails par boîte et par jour, un domaine dédié à la prospection, et on ralentit dès que les rebonds augmentent.</p>';
    }
    $$('input', f).forEach(function (i) { i.addEventListener('input', calc); }); calc();
  }

  // 5c. Générateur d'objets de mail
  function initSubj() {
    var f = $('#subj'); if (!f) return;
    function gen() {
      var co = $('#s-co').value.trim() || '{{entreprise}}', pr = $('#s-pr').value.trim() || '{{prénom}}', sj = $('#s-sj').value.trim() || 'votre prospection';
      var L = ['Une analyse courte pour ' + co, pr + ', une idée pour ' + sj, 'Question rapide sur ' + sj + ' chez ' + co, co + ' : 3 minutes de lecture', pr + ', j\'ai préparé ceci pour ' + co,
        'Ce que nous avons repéré chez ' + co, sj + ' : un point de vue pour ' + co, 'Un document pour vous, ' + pr, co + ' et ' + sj + ' : une piste', 'Re : ' + sj + ' (' + co + ')'];
      $('#s-out').innerHTML = L.map(function (s, i) { var n = s.length; return '<div style="display:flex;gap:10px;align-items:center;padding:8px 0;border-bottom:1px solid var(--border)"><span style="flex:1" id="sj' + i + '">' + esc(s) + '</span><span style="font:600 12px JetBrains Mono,monospace;color:' + (n > 50 ? '#B7791F' : '#12A150') + '">' + n + ' car.</span><button class="pgbtn" data-copy="sj' + i + '" style="padding:6px 12px;font-size:12px">Copier</button></div>'; }).join('') + '<p style="font-size:13px;opacity:.75;margin-top:8px">Visez moins de 50 caractères pour un affichage complet sur mobile. Testez deux variantes sur un petit échantillon.</p>';
    }
    $$('input', f).forEach(function (i) { i.addEventListener('input', gen); }); gen();
  }

  // 5d. Checklist de délivrabilité
  function initCheck() {
    var c = $('#dcheck'); if (!c) return; var key = 'lp_dcheck', saved = {};
    try { saved = JSON.parse(localStorage.getItem(key) || '{}'); } catch (e) {}
    var boxes = $$('input[type=checkbox]', c);
    function upd() { var n = boxes.filter(function (b) { return b.checked; }).length; $('#dbar').style.width = (n / boxes.length * 100) + '%'; $('#dtxt').textContent = n + ' / ' + boxes.length + ' étapes validées'; }
    boxes.forEach(function (b, i) { b.checked = !!saved[i]; b.addEventListener('change', function () { saved[i] = b.checked; try { localStorage.setItem(key, JSON.stringify(saved)); } catch (e) {} upd(); }); }); upd();
  }

  function boot() { observe(); initCsv(); initRamp(); initSubj(); initCheck(); frame(); }
  if (document.readyState !== 'loading') boot(); else document.addEventListener('DOMContentLoaded', boot);
  window.addEventListener('load', function () { observe(); frame(); setTimeout(observe, 1200); });
  window.__fxObserve = observe;
})();

/* Menu burger mobile (landing et pages statiques) */
(function(){
  function init(){
    var nav=document.querySelector('nav'),links=document.getElementById('nav-links'),right=nav&&nav.querySelector('.nav-right');
    if(!nav||!links||!right||document.getElementById('nav-burger'))return;
    var b=document.createElement('button');b.id='nav-burger';b.type='button';b.setAttribute('aria-label','Ouvrir le menu');b.setAttribute('aria-expanded','false');b.setAttribute('aria-controls','nav-links');b.innerHTML='<i></i><i></i><i></i>';
    right.insertBefore(b,right.firstChild);
    var login=document.getElementById('nav-login'),a=document.createElement('a');a.className='nav-m-only';a.textContent='Connexion';a.href=login&&login.getAttribute('href')||'#';
    a.addEventListener('click',function(e){if(login&&login.tagName==='BUTTON'){e.preventDefault();login.click()}});
    links.appendChild(a);
    function set(o){links.classList.toggle('open',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Fermer le menu':'Ouvrir le menu');document.documentElement.style.overflow=o?'hidden':''}
    b.addEventListener('click',function(e){e.stopPropagation();set(!links.classList.contains('open'))});
    links.addEventListener('click',function(e){if(e.target.closest('a'))set(false)});
    document.addEventListener('click',function(e){if(links.classList.contains('open')&&!links.contains(e.target))set(false)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
    window.addEventListener('resize',function(){if(innerWidth>900)set(false)});
    window.addEventListener('hashchange',function(){set(false)});
  }
  if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();
