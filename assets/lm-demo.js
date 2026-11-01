(function () {
  var root = document.getElementById('lm-demo'); if (!root) return;
  var C = [
    { p: 'Camille', n: 'Roux', poste: 'Directrice marketing', ent: 'Atelier Nova', sec: 'Mobilier', desc: "Mobilier d'intérieur, trois boutiques en France",
      enjeu: "Pour une marque de mobilier avec trois boutiques, garder le même discours en magasin et en ligne demande une vraie coordination côté marketing.",
      offre: "aide les marques de ce type à décliner leurs campagnes pour chaque point de vente sans multiplier les allers-retours",
      q2: "comment adaptez-vous aujourd'hui une campagne nationale à chacune de vos trois boutiques ?", sujet: 'vos trois boutiques',
      li0: "je travaille avec des marques de mobilier qui animent plusieurs points de vente",
      li1: "Avec trois boutiques, l'adaptation des campagnes à chaque point de vente doit vite devenir un sujet. Comment l'organisez-vous aujourd'hui ?" },
    { p: 'Julien', n: 'Marchand', poste: 'Directeur commercial', ent: 'Brasserie des Quais', sec: 'Boissons', desc: 'Brasserie artisanale, vente aux cafés et restaurants',
      enjeu: "Pour une brasserie qui vend aux cafés et aux restaurants, la prospection de nouveaux points de vente repose souvent sur quelques visites terrain.",
      offre: "aide les producteurs de boissons à préparer une approche ciblée pour chaque établissement",
      q2: "comment repérez-vous aujourd'hui les établissements les plus susceptibles de référencer vos bières ?", sujet: 'de nouveaux points de vente',
      li0: "je travaille avec des producteurs de boissons qui vendent aux cafés et aux restaurants",
      li1: "Trouver de nouveaux points de vente sans multiplier les visites doit être un vrai sujet. Comment choisissez-vous les établissements à démarcher ?" },
    { p: 'Sophie', n: 'Lemaire', poste: 'Responsable RH', ent: 'Clinique Saint-Loup', sec: 'Santé', desc: 'Clinique privée, recrutement de personnel soignant',
      enjeu: "Pour une clinique qui recrute du personnel soignant, se faire remarquer est difficile quand tous les établissements cherchent les mêmes profils.",
      offre: "aide les établissements de santé à rédiger des messages d'approche adaptés à chaque profil",
      q2: "quels canaux vous donnent aujourd'hui le plus de réponses pour vos recrutements ?", sujet: 'vos recrutements',
      li0: "je travaille avec des établissements de santé qui recrutent du personnel soignant",
      li1: "Recruter du personnel soignant doit demander beaucoup de temps à votre équipe. Quel canal fonctionne le mieux chez vous ?" }
  ];
  var ST = [
    { k: 'li0', d: 'J0', t: 'Invitation LinkedIn', f: 'linkedin_1', g: function (c) { return 'Bonjour ' + c.p + ', ' + c.li0 + ', un sujet proche de celui de ' + c.ent + '. Je serais ravi de vous compter dans mon réseau.'; } },
    { k: 'm1', d: 'J0', t: 'Mail 1', f: 'mail1_corps', g: function (c) { return 'Objet : ' + c.ent + ' et ' + c.sujet + '\n\nBonjour ' + c.p + ',\n\n' + c.enjeu + '\n\nStudio Arca ' + c.offre + '.\n\nSeriez-vous disponible 20 minutes la semaine prochaine pour en parler ?\n\nStudio Arca'; } },
    { k: 'm2', d: 'J+3', t: 'Mail 2', f: 'mail2_corps', g: function (c) { return c.p + ", une question plus concrète : " + c.q2 + "\n\nSi c'est un sujet, je peux vous présenter notre méthode en dix minutes.\n\nStudio Arca"; } },
    { k: 'li1', d: 'J+4', t: 'Message LinkedIn 1', f: 'linkedin_2', g: function (c) { return 'Merci pour la connexion, ' + c.p + '. ' + c.li1; } },
    { k: 'm3', d: 'J+7', t: 'Mail 3', f: 'mail3_corps', g: function (c) { return c.p + ", je ne veux pas encombrer votre boîte. Si le sujet n'est pas pour vous, pouvez-vous m'indiquer la bonne personne chez " + c.ent + " ?\n\nStudio Arca"; } },
    { k: 'li2', d: 'J+9', t: 'Message LinkedIn 2', f: 'linkedin_3', g: function (c) { return c.p + ", un dernier mot : je peux vous envoyer un court exemple d'approche adapté à " + c.ent + ", sans engagement. Souhaitez-vous le recevoir ?"; } }
  ];
  var NAMES = ['Importer', 'Parcours', 'Générer', 'Lire', 'Exporter'];
  var step = 0, sel = { li0: 1, m1: 1, m2: 1, li1: 1 }, who = 0, timer = null, prog = 0;
  var steps = document.getElementById('dm-steps'), stage = document.getElementById('dm-stage'), prev = document.getElementById('dm-prev'), next = document.getElementById('dm-next');
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function chosen() { return ST.filter(function (s) { return sel[s.k]; }); }
  function head() {
    steps.innerHTML = NAMES.map(function (n, i) { return '<button type="button" class="lm-dst' + (i === step ? ' on' : i < step ? ' done' : '') + '" data-i="' + i + '"><b>Étape ' + (i + 1) + '</b>' + n + '</button>'; }).join('');
  }
  function view() {
    clearInterval(timer);
    var h = '';
    if (step === 0) {
      h = '<h3>1. Importez votre fichier</h3><p class="sub">Un CSV exporté de votre outil habituel. Seuls le prénom, le poste et l\'entreprise sont indispensables.</p><div style="overflow-x:auto"><table class="lm-dt"><tr><th>prénom</th><th>nom</th><th>poste</th><th>entreprise</th><th>description</th></tr>' +
        C.map(function (c) { return '<tr><td>' + c.p + '</td><td>' + c.n + '</td><td>' + c.poste + '</td><td>' + c.ent + '</td><td>' + c.desc + '</td></tr>'; }).join('') + '</table></div><p class="sub" style="margin-top:14px">Trois contacts fictifs. Doublons et lignes vides sont retirés avant la génération.</p>';
    } else if (step === 1) {
      h = '<h3>2. Composez le parcours</h3><p class="sub">Cochez les messages voulus. Un crédit par contact, quel que soit le parcours.</p><div id="dm-chips">' + ST.map(function (s) { return '<button type="button" class="lm-chip' + (sel[s.k] ? ' on' : '') + '" data-k="' + s.k + '"><i>✓</i><span>' + s.t + '</span><small>' + s.d + '</small></button>'; }).join('') + '</div><div class="lm-sum"><b>' + chosen().length + '</b> message' + (chosen().length > 1 ? 's' : '') + ' par contact · <b>3</b> crédits pour ces trois contacts</div>';
    } else if (step === 2) {
      h = '<h3>3. LeadMessage rédige</h3><p class="sub">Chaque message est écrit pour le contact, à partir de son poste, de son entreprise et de sa description.</p><div class="lm-dp"><i id="dm-bar"></i></div><ul class="lm-dl" id="dm-list">' + C.map(function (c) { return '<li>' + c.p + ' ' + c.n + ', ' + c.ent + '</li>'; }).join('') + '</ul>';
    } else if (step === 3) {
      var c = C[who], list = chosen();
      h = '<h3>4. Lisez le résultat</h3><p class="sub">Choisissez un contact : le parcours change, les faits restent ceux du fichier.</p><div class="lm-dtabs">' + C.map(function (x, i) { return '<button type="button" class="lm-pre' + (i === who ? ' on' : '') + '" data-w="' + i + '">' + x.p + ' ' + x.n + '</button>'; }).join('') + '</div><div class="lm-data"><span>' + c.poste + '</span><span>' + c.ent + '</span><span>' + c.desc + '</span></div><ol class="lm-tl">' +
        (list.length ? list.map(function (s) { return '<li><span class="d' + (s.k.indexOf('li') === 0 ? ' li' : '') + '">' + s.d + '</span><div class="lm-msg"><h4>' + s.t + '</h4>' + esc(s.g(c)) + '</div></li>'; }).join('') : '<div class="lm-empty">Aucun message choisi : revenez à l\'étape 2.</div>') + '</ol>';
    } else {
      var cols = ['email', 'prénom', 'entreprise'].concat(chosen().map(function (s) { return s.f; }));
      h = '<h3>5. Exportez le fichier</h3><p class="sub">Votre CSV d\'origine, avec une colonne par message. Importez-le dans votre outil d\'envoi.</p><div style="overflow-x:auto"><table class="lm-dt"><tr>' + cols.map(function (x) { return '<th>' + x + '</th>'; }).join('') + '</tr>' +
        C.map(function (c, i) { return '<tr><td>' + ['camille@atelier-nova.fr', 'julien@brasserie-quais.fr', 'sophie@clinique-saint-loup.fr'][i] + '</td><td>' + c.p + '</td><td>' + c.ent + '</td>' + chosen().map(function (s) { return '<td>' + esc(s.g(c).replace(/\n+/g, ' ').slice(0, 34)) + '…</td>'; }).join('') + '</tr>'; }).join('') + '</table></div><p style="margin-top:20px"><a class="lm-btn" href="../../?p=message#connexion">Essayer sur mon fichier</a></p>';
    }
    stage.innerHTML = h; head();
    prev.disabled = step === 0; prev.style.opacity = step === 0 ? .4 : 1; next.textContent = step === 4 ? 'Recommencer' : 'Suivant';
    if (step === 2) {
      prog = 0; var bar = document.getElementById('dm-bar'), lis = document.querySelectorAll('#dm-list li');
      timer = setInterval(function () { prog++; if (bar) bar.style.width = Math.round(prog / 3 * 100) + '%'; if (lis[prog - 1]) lis[prog - 1].classList.add('ok'); if (prog >= 3) { clearInterval(timer); } }, 700);
    }
  }
  root.addEventListener('click', function (ev) {
    var b = ev.target.closest('button'); if (!b) return;
    if (b.id === 'dm-next') { step = step === 4 ? 0 : step + 1; view(); }
    else if (b.id === 'dm-prev') { if (step > 0) { step--; view(); } }
    else if (b.dataset.i != null) { step = +b.dataset.i; view(); }
    else if (b.dataset.k) { sel[b.dataset.k] = sel[b.dataset.k] ? 0 : 1; view(); }
    else if (b.dataset.w != null) { who = +b.dataset.w; view(); }
  });
  // lecture automatique : démarre quand la démo est visible, s'arrête dès que le visiteur agit
  var auto = null, playBtn = document.getElementById('dm-play'), playing = false;
  function setPlay(on) {
    playing = on; clearInterval(auto);
    if (playBtn) { playBtn.textContent = on ? '⏸ Pause' : '▶ Lecture automatique'; playBtn.setAttribute('aria-pressed', on ? 'true' : 'false'); }
    if (on) auto = setInterval(function () { step = step === 4 ? 0 : step + 1; view(); }, step === 2 ? 3200 : 4200);
  }
  root.addEventListener('click', function (ev) {
    var b = ev.target.closest('button'); if (!b) return;
    if (b.id === 'dm-play') setPlay(!playing); else if (playing) setPlay(false);
  }, true);
  view();
  if ('IntersectionObserver' in window && !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    var seen = false;
    new IntersectionObserver(function (es) { es.forEach(function (e) {
      if (e.isIntersecting && !seen) { seen = true; setPlay(true); }
      else if (!e.isIntersecting && playing) setPlay(false);
    }); }, { threshold: .45 }).observe(root);
  } else setPlay(false);
})();
