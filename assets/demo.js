/* Visite guidée interactive de LeadPage (60 s, données d'exemple). Se monte dans [data-demo]. */
(function () {
  'use strict';
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var STEPS = [
    { d: 9, t: 'Importez votre CSV', p: 'Déposez l\'export de votre outil de sourcing. Les colonnes sont reconnues, vous corrigez si besoin.', cap: 'Un fichier de 247 contacts, colonnes reconnues en quelques secondes.',
      h: '<h5>Nouvelle campagne</h5><div class="sub">Importez votre export CSV</div><div class="drop dm-a" style="--t:.2s"><span class="ico">CSV</span><div><b>prospects_mars.csv</b><br><span style="color:#6A7280">247 contacts · 42 Ko</span></div><span class="ok">Chargé</span></div>' +
        [['Prénom', 'first_name', 1.4], ['Nom', 'last_name', 2.1], ['Poste', 'job_title', 2.8], ['Entreprise', 'company', 3.5], ['Site web', 'website', 4.2]].map(function (r) { return '<div class="row dm-a" style="--t:' + r[2] + 's"><b>' + r[0] + '</b><em>→ ' + r[1] + '</em><span class="ok">✓</span></div>'; }).join('') +
        '<div class="dm-a" style="--t:5.4s"><span class="chip">Séparateur détecté : point-virgule</span><span class="chip">Encodage UTF-8</span><span class="chip">0 doublon d\'email</span></div>' },
    { d: 9, t: 'Choisissez votre charte', p: 'Logo, couleurs, ton et offre sont ceux de votre marque ou de votre client.', cap: 'Chaque client garde sa propre charte, réutilisée à chaque campagne.',
      h: '<h5>Charte et contenu</h5><div class="sub">Agence Nova · client actif</div><div class="row dm-a" style="--t:.2s"><span class="logo" style="background:#2B50FF">N</span><b>Agence Nova</b><em>Prospection · 5 blocs</em><span class="ok">Active</span></div><div class="sw dm-a" style="--t:1.2s"><u style="background:#2B50FF"></u><u style="background:#0A0B0D"></u><u style="background:#FFE14D"></u><u style="background:#EAF0FF;border:1px solid #E6E8EE"></u></div>' +
        '<div class="dm-a" style="--t:2.2s"><span class="chip" style="background:#2B50FF;color:#fff">Ton : direct</span><span class="chip">Chaleureux</span><span class="chip">Formel</span></div>' +
        '<div class="row dm-a" style="--t:3.6s;margin-top:14px"><b>PDF personnalisé</b><em>2 pages, logo du prospect</em><span class="ok">✓</span></div><div class="row dm-a" style="--t:4.4s"><b>Mail d\'accroche</b><em>texte prêt à coller</em><span class="ok">✓</span></div>' +
        '<div class="dm-a" style="--t:5.8s;margin-top:14px"><span class="btn-m" style="animation:dmPulse 1.6s 6.2s 3">Lancer la génération</span></div>' },
    { d: 12, t: 'Lancez la génération', p: 'Un document et un mail par contact, en arrière-plan. Vous pouvez fermer la page.', cap: 'Chaque contact est retenté jusqu\'à 3 fois, les erreurs sont signalées.',
      h: '<h5>Génération en cours</h5><div class="sub">Traitement en arrière-plan</div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px" class="dm-a"><b data-cnt="247" data-d="0.3" data-dur="9.5" data-fmt="n/247">0 / 247</b><span data-cnt="100" data-d="0.3" data-dur="9.5" data-fmt="pct">0 %</span></div><div class="bar dm-a"><i data-w="1" data-d="0.3" data-dur="9.5"></i></div><div style="margin-top:14px">' +
        [['SF', 'Salesforce', '#00A1E0', 'Marie Dupont', 2.2], ['DL', 'Doctolib', '#107ACA', 'Thomas Roux', 4.2], ['DC', 'Decathlon', '#0082C3', 'Julie Martin', 6.2], ['QO', 'Qonto', '#0A0B0D', 'Hugo Bernard', 8.0]].map(function (r) { return '<div class="row dm-a" style="--t:' + (r[4] - 1.2) + 's"><span class="logo" style="background:' + r[2] + '">' + r[0] + '</span><b>' + r[3] + '</b><em>' + r[1] + '</em><span class="tag">prêt</span></div>'; }).join('') +
        '</div><div class="dm-a" style="--t:10s"><span class="chip">Reprise automatique : 0 erreur</span><span class="chip">247 documents prêts</span></div>' },
    { d: 10, t: 'Relisez un document', p: 'Accroche, diagnostic, plan d\'action et prochaine étape, rédigés pour ce contact.', cap: 'Lisez dix documents avant d\'envoyer : c\'est la règle qui évite les erreurs.',
      h: '<div class="doc"><div class="page dm-a" style="--t:.2s"><div class="hd"><span class="logo" style="background:#fff;color:#00A1E0">SF</span><div><b>Salesforce</b><br><span style="font-size:10.5px;opacity:.85">Proposition personnalisée · Agence Nova</span></div></div><div class="bd"><b style="font-size:13px">Bonjour Marie,</b><div class="ln" style="width:92%;margin-top:8px"></div><div class="ln" style="width:78%"></div><div class="blk dm-a" style="--t:1.8s"><b>Diagnostic</b><div class="ln"></div><div class="ln" style="width:70%"></div></div><div class="blk dm-a" style="--t:3.4s"><b>Plan d\'action sur 90 jours</b><div class="ln"></div><div class="ln" style="width:60%"></div></div><div class="dm-a" style="--t:5s"><span class="btn-m" style="font-size:11px;padding:7px 12px">Planifier un échange →</span></div></div></div>' +
        '<div class="call"><span class="dm-a" style="--t:1s">Accroche liée au poste</span><span class="dm-a" style="--t:2.4s">Diagnostic court</span><span class="dm-a" style="--t:4s">Plan et calendrier</span><span class="dm-a" style="--t:5.6s">Lien de rendez-vous suivi</span></div></div>' },
    { d: 9, t: 'Récupérez le fichier enrichi', p: 'Votre CSV revient avec le lien du document et le texte du mail pour chaque contact.', cap: 'Importez-le tel quel dans Snov.io, Lemlist ou votre outil d\'envoi.',
      h: '<h5>Fichier enrichi</h5><div class="sub">2 colonnes ajoutées à votre CSV</div><div class="tbl dm-a" style="--t:.2s"><div class="th">email</div><div class="th hl dm-a" style="--t:1.4s">pdf_url</div><div class="th hl dm-a" style="--t:1.8s">mail1_corps</div>' +
        [['marie@salesforce…', '/v/a8f3k2…', 'Bonjour Marie, j\'ai préparé…', 2.4], ['thomas@doctolib…', '/v/c91xq7…', 'Bonjour Thomas, voici…', 3.2], ['julie@decathlon…', '/v/f20mb4…', 'Bonjour Julie, une piste…', 4]].map(function (r) { return '<div class="dm-a" style="--t:' + r[3] + 's">' + r[0] + '</div><div class="hl dm-a" style="--t:' + r[3] + 's">' + r[1] + '</div><div class="hl dm-a" style="--t:' + r[3] + 's">' + r[2] + '</div>'; }).join('') +
        '</div><div class="dm-a" style="--t:5.4s;margin-top:14px"><span class="chip">Importer dans Snov.io</span><span class="chip">Importer dans Lemlist</span><span class="chip">Votre outil d\'envoi</span></div><div class="dm-a" style="--t:6.4s;margin-top:10px;color:#6A7280;font-size:12px">LeadPage n\'envoie rien : votre domaine et vos boîtes restent les vôtres.</div>' },
    { d: 11, t: 'Suivez la lecture', p: 'Qui a vraiment lu, combien de temps, jusqu\'où, et qui a cliqué sur votre rendez-vous.', cap: 'Les robots sont écartés : vous relancez selon la lecture réelle.',
      h: '<h5>Tableau de lecture</h5><div class="sub">Campagne Vague 3 · lien de suivi client en lecture seule</div><div class="kpis dm-a" style="--t:.2s"><div><b data-cnt="46" data-d="0.4" data-dur="2" data-fmt="pct">0 %</b><span>lectures confirmées</span></div><div><b data-cnt="80" data-d="0.4" data-dur="2" data-fmt="secs">0 s</b><span>temps moyen</span></div><div><b data-cnt="18" data-d="0.4" data-dur="2" data-fmt="n">0</b><span>liens cliqués</span></div></div>' +
        '<div class="row dm-a" style="--t:2.2s"><span class="dot"></span><b>Marie D.</b><em><span data-cnt="95" data-d="2.4" data-dur="2" data-fmt="secs">0 s</span> · page 2</em><span class="tag">lien cliqué</span></div><div class="row dm-a" style="--t:3.6s"><span class="dot"></span><b>Julie M.</b><em>48 s · page 1</em></div><div class="row dm-a" style="--t:5s"><span class="dot g"></span><b>Thomas R.</b><em>ouvert, non lu</em></div><div class="dm-a" style="--t:6.6s"><span class="chip">Robots écartés : 12</span><span class="chip">Lien client : lecture seule</span></div>' }
  ];
  var TOTAL = STEPS.reduce(function (a, s) { return a + s.d; }, 0);
  function fmtS(s) { s = Math.round(s); return s < 60 ? s + ' s' : Math.floor(s / 60) + ' min ' + (s % 60 ? (s % 60) + ' s' : ''); }
  function mm(s) { s = Math.floor(s); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }

  function mount(root) {
    var el = document.createElement('div'); el.className = 'dm' + (RM ? ' static' : '');
    el.innerHTML = '<div class="dm-side"><ol class="dm-steps">' + STEPS.map(function (s, i) { return '<li><button type="button" data-i="' + i + '"><b>' + ('0' + (i + 1)).slice(-2) + '</b><div><h4>' + s.t + '</h4><p>' + s.p + '</p></div><u></u></button></li>'; }).join('') + '</ol>' +
      '<div class="dm-total"><i></i></div><div class="dm-ctrl"><button type="button" class="main" data-a="play">Pause</button><button type="button" data-a="prev" aria-label="Étape précédente">←</button><button type="button" data-a="next" aria-label="Étape suivante">→</button><span class="dm-time">0:00 / ' + mm(TOTAL) + '</span></div></div>' +
      '<div class="dm-stage"><div class="dm-win"><div class="dm-top"><span></span><span></span><span></span><em>app.leadpage.fr</em><small>Données d\'exemple</small></div><div class="dm-body">' + STEPS.map(function (s) { return '<div class="dm-pane">' + s.h + '</div>'; }).join('') + '</div></div><div class="dm-cap" aria-live="polite"></div></div>';
    root.appendChild(el);
    var lis = [].slice.call(el.querySelectorAll('.dm-steps li')), panes = [].slice.call(el.querySelectorAll('.dm-pane')), cap = el.querySelector('.dm-cap'),
      btnPlay = el.querySelector('[data-a=play]'), total = el.querySelector('.dm-total i'), tm = el.querySelector('.dm-time');
    var cur = -1, t0 = 0, playing = !RM, started = false, last = 0, inView = false, el0 = 0;
    function offset(i) { var o = 0; for (var k = 0; k < i; k++) o += STEPS[k].d; return o; }
    function go(i, keep) {
      i = (i + STEPS.length) % STEPS.length; cur = i; t0 = 0;
      panes.forEach(function (p, k) { p.classList.remove('on'); if (k === i) { void p.offsetWidth; p.classList.add('on'); } });
      lis.forEach(function (l, k) { l.classList.toggle('on', k === i); l.classList.toggle('done', k < i); l.querySelector('u').style.width = '0'; });
      cap.textContent = STEPS[i].cap; if (!keep) { el.classList.remove('paused'); }
      tick(0);
    }
    function tick(dt) {
      if (cur < 0) return;
      var pane = panes[cur];
      pane.querySelectorAll('[data-cnt]').forEach(function (n) {
        var d = +n.dataset.d, dur = +n.dataset.dur, p = Math.max(0, Math.min(1, (t0 - d) / dur)), v = +n.dataset.cnt * (1 - Math.pow(1 - p, 3)), f = n.dataset.fmt;
        n.textContent = f === 'pct' ? Math.round(v) + ' %' : f === 'secs' ? fmtS(v) : f === 'n/247' ? Math.round(v) + ' / 247' : Math.round(v);
      });
      pane.querySelectorAll('[data-w]').forEach(function (n) { var p = Math.max(0, Math.min(1, (t0 - +n.dataset.d) / +n.dataset.dur)); n.style.width = (p * 100) + '%'; });
      lis[cur].querySelector('u').style.width = Math.min(100, t0 / STEPS[cur].d * 100) + '%';
      var g = offset(cur) + t0; total.style.width = (g / TOTAL * 100) + '%'; tm.textContent = mm(g) + ' / ' + mm(TOTAL);
    }
    function loop(ts) {
      var dt = last ? Math.min(0.1, (ts - last) / 1000) : 0; last = ts;
      if (playing && inView && cur >= 0) { t0 += dt; if (t0 >= STEPS[cur].d) go(cur + 1); else tick(dt); }
      requestAnimationFrame(loop);
    }
    function setPlay(v) { playing = v; btnPlay.textContent = v ? 'Pause' : (started && cur === STEPS.length - 1 && t0 >= STEPS[cur].d ? 'Rejouer' : 'Lecture'); el.classList.toggle('paused', !v); }
    el.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.dataset.i !== undefined) { go(+b.dataset.i); setPlay(true); }
      else if (b.dataset.a === 'play') setPlay(!playing);
      else if (b.dataset.a === 'next') { go(cur + 1); }
      else if (b.dataset.a === 'prev') { go(cur - 1); }
    });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { es.forEach(function (x) { inView = x.isIntersecting; if (inView && !started) { started = true; if (!RM) { go(0); setPlay(true); } } }); }, { threshold: 0.35 }).observe(el);
    else { inView = true; started = true; go(0); }
    go(0); if (RM) { playing = false; btnPlay.textContent = 'Lecture'; }
    requestAnimationFrame(loop);
  }
  function boot() { [].slice.call(document.querySelectorAll('[data-demo]')).forEach(function (r) { if (!r.__m) { r.__m = 1; mount(r); } }); }
  if (document.readyState !== 'loading') boot(); else document.addEventListener('DOMContentLoaded', boot);
})();
