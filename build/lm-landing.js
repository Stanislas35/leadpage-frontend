// Landing LeadMessage, version complète (niveau LeadPage).
module.exports = function landing(B, c) {
  const { faq, pk, hdr, rows, e } = c;
  const M = B + 'messages/';
  const tools = [['Sales Navigator', 'linkedin.com'], ['Snov.io', 'snov.io'], ['Lemlist', 'lemlist.com'], ['Kaspr', 'kaspr.io'], ['Lusha', 'lusha.com'], ['PhantomBuster', 'phantombuster.com'], ['Waalaxy', 'waalaxy.com'], ['Hunter', 'hunter.io'], ['Brevo', 'brevo.com'], ['HeyReach', 'heyreach.io'], ['Apollo', 'apollo.io'], ['Instantly', 'instantly.ai']];
  const logo = ([n, d], hid) => `<span class="it"${hid ? ' aria-hidden="true"' : ''}><img src="https://www.google.com/s2/favicons?domain=${d}&sz=128" alt="${hid ? '' : n}" width="26" height="26" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('i'),{textContent:'${n[0]}'}))">${n}</span>`;
  const marq = tools.map(t => logo(t, false)).join('') + tools.map(t => logo(t, true)).join('');
  const cta = (t, cls) => `<a class="lm-btn${cls ? ' ' + cls : ''}" href="${B}?p=message#connexion">${t}</a>`;
  const S = (k, h, sub, inner, id, cl) => `<section class="lm-sec${cl ? ' ' + cl : ''}"${id ? ` id="${id}"` : ''}><div class="lm-w">${k ? `<span class="lm-k">${k}</span>` : ''}<h2>${h}</h2>${sub ? `<p class="lm-sub">${sub}</p>` : ''}${inner}</div></section>`;
  const win = (url, inner) => `<div class="lm-win"><div class="bar"><i></i><i></i><i></i><span>${url}</span></div><div class="in">${inner}</div></div>`;
  const card = ([i, h, p]) => `<div class="lm-bc lm-rv"><div class="ic">${i}</div><h3>${h}</h3><p>${p}</p></div>`;

  const hero = `
<section class="lm-hero big"><div class="lm-w">
  <div>
    <span class="lm-tag">Nouveau : le parcours de messages par prospect</span>
    <h1>Mails et messages LinkedIn <span class="lm-mark">écrits pour chaque prospect</span></h1>
    <p class="lead">Vous importez votre fichier, vous choisissez le parcours (mails 1, 2 et 3, invitation, messages LinkedIn). LeadMessage rédige chaque texte à partir des informations du contact. Prêt à importer dans votre outil d'envoi.</p>
    <div class="row">${cta('Essayer gratuitement', 'wh')}<a class="lm-btn ghost" style="color:#fff;border-color:rgba(255,255,255,.7)" href="${M}demo/">Voir la démo guidée</a></div>
    <div class="lm-checks"><span>1 crédit par contact</span><span>Aucun fait inventé</span><span>5 contacts offerts</span><span>Sans carte bancaire</span></div>
  </div>
  <div class="lm-ha" id="lm-ha" style="position:relative" aria-hidden="true">
    ${win('leadmessage / nouvelle campagne', `<div class="lm-ha-top"><div><h4 id="ha-name">Atelier Nova · Camille Roux</h4><p class="sb" id="ha-role">Directrice marketing · Mobilier, trois boutiques</p></div><span class="lm-ha-n" id="ha-n">Contact 1 / 3</span></div>
      <div class="lm-mini" id="ha-chips"><i data-k="m1">Mail 1</i><i data-k="li0">Invitation</i><i data-k="m2">Mail 2</i><i data-k="li1">Message 1</i><i data-k="m3">Mail 3</i><i data-k="li2">Message 2</i></div>
      <div id="ha-rows"><div class="lm-row ha-r on"><span class="ic">M1</span><div><b>Atelier Nova et vos trois boutiques</b><br><span class="ha-t">Bonjour Camille, pour une marque de mobilier avec trois boutiques…</span></div><em class="ok">J0</em></div>
      <div class="lm-row ha-r on"><span class="ic" style="background:#1A2F5C">in</span><div><b>Invitation LinkedIn</b><br><span class="ha-t">Bonjour Camille, je travaille avec des marques de mobilier…</span></div><em>176 / 300</em></div>
      <div class="lm-row ha-r on"><span class="ic">M2</span><div><b>Mail 2, relance</b><br><span class="ha-t">Camille, une question plus concrète : comment adaptez-vous…</span></div><em>J+3</em></div></div>
      <div class="lm-ha-bar"><i id="ha-bar" style="width:100%"></i></div>`)}
    <div class="lm-float" id="ha-float" style="left:-34px;bottom:-26px"><b>Garde-fou</b><span>Aucune information inventée : sans donnée précise, le texte reste général.</span></div>
  </div>
</div>
<div class="lm-marq"><p>Le fichier exporté s'importe dans vos outils de prospection</p><div class="track">${marq}</div></div>
</section>`;

  const stats = `<section class="lm-sec" style="padding-bottom:20px"><div class="lm-w"><div class="lm-stats">
    <div class="lm-stat lm-rv"><b>1</b><span>crédit par contact, du message seul au parcours complet</span></div>
    <div class="lm-stat lm-rv"><b>6</b><span>messages possibles : 3 mails, 1 invitation, 2 messages LinkedIn</span></div>
    <div class="lm-stat lm-rv"><b>300</b><span>caractères maximum pour la note d'invitation (200 au choix)</span></div>
    <div class="lm-stat lm-rv"><b>0</b><span>fait inventé : tout vient des colonnes de votre fichier</span></div></div></div></section>`;

  const pourquoi = S('Pourquoi', 'Un message générique se repère en deux secondes', 'Le prénom inséré par un outil ne suffit plus. Ce qui compte, c\'est que le message parle du poste, de l\'entreprise et du secteur de la personne.',
    `<div class="lm-ba"><div class="bad lm-rv"><h3>Modèle générique</h3><p>Bonjour {{prénom}},

Nous aidons les entreprises à gagner en visibilité. Seriez-vous disponible pour un échange de 15 minutes ?</p></div>
    <div class="good lm-rv"><h3>Avec LeadMessage</h3><p>Bonjour Camille,

Pour une marque de mobilier qui anime trois boutiques, garder le même discours en magasin et en ligne devient vite un casse-tête. Comment adaptez-vous vos campagnes à chaque point de vente ?</p></div></div>
    <div class="lm-wrap"><table class="lm-cmp"><thead><tr><th></th><th>Modèle unique</th><th>Publipostage</th><th class="hl">LeadMessage</th></tr></thead><tbody>
    <tr><td>Texte adapté au poste et au secteur</td><td class="n">Non</td><td class="p">Variables seulement</td><td class="hl y">Oui</td></tr>
    <tr><td>Parcours cohérent mail et LinkedIn</td><td class="p">À écrire à la main</td><td class="p">À écrire à la main</td><td class="hl y">Oui</td></tr>
    <tr><td>Respect des limites LinkedIn</td><td class="p">À vérifier</td><td class="p">À vérifier</td><td class="hl y">Automatique</td></tr>
    <tr><td>Ton et lien d'agenda par client</td><td class="n">Non</td><td class="p">Manuel</td><td class="hl y">Charte réutilisable</td></tr>
    <tr><td>Temps pour 500 contacts</td><td class="y">Court</td><td class="p">Plusieurs jours</td><td class="hl y">Quelques minutes</td></tr>
    </tbody></table></div>`, 'pourquoi');

  const sim = `<section class="lm-sec alt" id="parcours"><div class="lm-w">
  <span class="lm-k">Votre parcours</span>
  <h2>Composez la séquence, voyez le résultat</h2>
  <p class="lm-sub">Choisissez les messages voulus pour chaque contact. Le coût reste le même : un crédit par contact, du message seul au parcours complet.</p>
  <div class="lm-sim lm-rv">
    <div class="lm-panel">
      <div class="lm-presets"><button class="lm-pre" data-p="mail" type="button">Séquence mail</button><button class="lm-pre" data-p="li" type="button">Séquence LinkedIn</button><button class="lm-pre" data-p="full" type="button">Parcours complet</button></div>
      <div id="lm-chips"></div>
      <div class="lm-sum" id="lm-sum"></div>
    </div>
    <div>
      <div class="lm-data" aria-label="Données du fichier utilisées dans l'exemple"><span>Camille Roux</span><span>Directrice marketing</span><span>Atelier Nova</span><span>Mobilier, trois boutiques</span></div>
      <ol class="lm-tl" id="lm-tl"></ol>
      <p class="lm-note">Exemple fictif. Les textes ne s'appuient que sur les données ci-dessus : poste, entreprise, secteur et description.</p>
    </div>
  </div></div></section>`;

  const comment = S('Fonctionnement', 'De votre fichier au parcours, en quatre étapes', null, `
    <div class="lm-split lm-rv"><div><span class="n">1</span><h3>Importez votre CSV</h3><p>Le même fichier que pour LeadPage. Vous associez vos colonnes (prénom, poste, entreprise, secteur, description) en un clic.</p><ul><li>Doublons et lignes vides retirés</li><li>Colonnes reconnues automatiquement</li><li>Aucun format imposé</li></ul></div>
      <div class="lm-stage-bg">${win('leadmessage / import', `<h4>Import du fichier</h4><p class="sb">prospects-septembre.csv · 184 lignes</p><div class="lm-row csv"><span class="ic">CSV</span><b>prospects-septembre.csv</b><em class="ok">184 contacts</em></div><div class="lm-mini"><i class="on">prénom</i><i class="on">poste</i><i class="on">entreprise</i><i class="on">secteur</i><i>site web</i></div><div class="lm-row"><b>6 doublons retirés</b><em class="ok">178 à générer</em></div>`)}</div></div>
    <div class="lm-split rev lm-rv"><div><span class="n">2</span><h3>Choisissez le parcours et la charte</h3><p>Cochez les messages voulus, la limite de la note LinkedIn (200 ou 300 caractères) et la charte du client : ton, vouvoiement, offre, lien d'agenda.</p><ul><li>De 1 à 6 messages par contact</li><li>Coût affiché avant le lancement</li><li>Une charte par client</li></ul></div>
      <div class="lm-stage-bg">${win('leadmessage / parcours', `<h4>Votre parcours</h4><p class="sb">Charte : Studio Arca · style professionnel</p><div class="lm-mini"><i class="on">Mail 1</i><i class="on">Mail 2</i><i class="on">Mail 3</i><i class="on">Invitation</i><i class="on">Message 1</i><i>Message 2</i></div><div class="lm-row"><b>Limite de la note</b><em>300 caractères</em></div><div class="lm-row"><b>Coût</b><em class="ok">178 crédits</em></div>`)}</div></div>
    <div class="lm-split lm-rv"><div><span class="n">3</span><h3>LeadMessage rédige chaque texte</h3><p>Chaque message part des informations du contact et d'un angle propre à son poste. Les relances apportent un angle nouveau au lieu de répéter le premier mail.</p><ul><li>Une seule question par message</li><li>Aucun chiffre ni référence inventés</li><li>Ton constant sur tout le parcours</li></ul></div>
      <div class="lm-stage-bg">${win('leadmessage / génération', `<h4>Génération en cours</h4><p class="sb">Le fichier reste utilisable pendant le traitement</p><div class="lm-row"><b>Camille Roux · Atelier Nova</b><em class="ok">terminé</em></div><div class="lm-row"><b>Julien Marchand · Brasserie des Quais</b><em class="ok">terminé</em></div><div class="lm-row"><b>Sophie Lemaire · Clinique Saint-Loup</b><em>en cours…</em></div>`)}</div></div>
    <div class="lm-split rev lm-rv"><div><span class="n">4</span><h3>Exportez et importez dans votre outil</h3><p>Vous récupérez votre CSV avec une colonne par message. Il suffit de les utiliser comme variables dans votre outil de mails ou d'automatisation LinkedIn.</p><ul><li>Compatible avec les outils courants</li><li>Relecture possible avant l'envoi</li><li>Les contacts en erreur ne sont pas débités</li></ul></div>
      <div class="lm-stage-bg">${win('leadmessage / export', `<h4>Export prêt</h4><p class="sb">prospects-septembre-messages.csv</p><div class="lm-row"><span class="ic">M1</span><b>mail1_objet, mail1_corps</b><em class="ok">178</em></div><div class="lm-row"><span class="ic">M2</span><b>mail2_corps, mail3_corps</b><em class="ok">178</em></div><div class="lm-row"><span class="ic" style="background:#1A2F5C">in</span><b>linkedin_1, linkedin_2</b><em class="ok">178</em></div>`)}</div></div>`, 'comment');

  const ftm = S('Personnalisation', 'Du fichier au message : ce qui est utilisé', 'Chaque phrase s\'appuie sur une donnée précise de la ligne. Voici ce que LeadMessage tire de quatre colonnes.', `
    <div class="lm-ftm"><div class="lm-fdata lm-rv"><h4>Ligne du fichier</h4><dl><dt>Poste</dt><dd class="f1">Directrice marketing</dd><dt>Entreprise</dt><dd class="f2">Atelier Nova</dd><dt>Secteur</dt><dd class="f3">Mobilier</dd><dt>Description</dt><dd class="f4">Trois boutiques en France et vente en ligne</dd></dl></div>
    <div class="lm-rv"><div class="lm-fmsg">Bonjour Camille,<br><br>En tant que <mark class="f1">directrice marketing</mark> chez <mark class="f2">Atelier Nova</mark>, vous gérez sans doute le même discours dans le <mark class="f3">mobilier</mark> entre <mark class="f4">trois boutiques et la vente en ligne</mark>. Comment adaptez-vous vos campagnes à chaque point de vente ?</div>
    <div class="lm-legend"><span><mark class="f1">poste</mark></span><span><mark class="f2">entreprise</mark></span><span><mark class="f3">secteur</mark></span><span><mark class="f4">description</mark></span></div></div></div>`, 'personnalisation', 'alt');

  const gardefous = S('Garde-fous', 'Des messages que vous pouvez envoyer sans les réécrire', 'Les règles sont intégrées à la rédaction, pas laissées à votre relecture.', `<div class="lm-bento">${[
    ['🚫', 'Aucun fait inventé', 'Pas de chiffre, de client ou de référence qui ne vienne pas de votre fichier. Sans donnée, le texte reste général.'],
    ['📏', 'Limites LinkedIn tenues', 'Note de 200 ou 300 caractères, messages courts. Un texte trop long est raccourci proprement.'],
    ['❓', 'Une question par message', 'Un seul appel à l\'action par texte, jamais plusieurs demandes en même temps.'],
    ['🎙️', 'Ton constant', 'Style d\'écriture, vouvoiement ou tutoiement suivent la charte sur tout le parcours. Aucune signature : votre outil d\'envoi ajoute la vôtre.'],
    ['🧹', 'Sans formules creuses', 'Pas de « j\'espère que vous allez bien » ni de promesse vague. Chaque phrase dit quelque chose.'],
    ['🔁', 'Relances qui avancent', 'Chaque relance apporte un angle nouveau et le dernier message laisse une sortie courtoise.']].map(card).join('')}</div>`, 'garde-fous', 'dark');

  const canaux = S('Canaux', 'Mails et LinkedIn : des formats pensés pour chaque canal', null, `
    <div class="lm-ch"><div class="lm-chc lm-rv"><h3>Mails <u>3 messages</u></h3><ul><li><span>Mail 1, avec son objet</span><b>60 à 90 mots</b></li><li><span>Mail 2, relance</span><b>35 à 60 mots</b></li><li><span>Mail 3, dernier message</span><b>25 à 45 mots</b></li></ul></div>
    <div class="lm-chc li lm-rv"><h3>LinkedIn <u>3 messages</u></h3><ul><li><span>Note d'invitation</span><b>200 ou 300 caractères</b></li><li><span>Message 1, après acceptation</span><b>400 caractères</b></li><li><span>Message 2, relance</span><b>350 caractères</b></li></ul></div></div>
    <h3 style="margin:40px 0 0;font-size:20px">Une cadence conseillée</h3>
    <div class="lm-cad"><div><b>J0</b><span>Invitation + mail 1</span></div><div><b>J+3</b><span>Mail 2</span></div><div><b>J+4</b><span>Message 1 si accepté</span></div><div><b>J+7</b><span>Mail 3</span></div><div><b>J+9</b><span>Message 2</span></div></div>
    <p class="lm-note">Repère de départ : adaptez-le à votre marché. LeadMessage prépare les textes, l'envoi et le rythme restent chez vous.</p>`, 'canaux', 'alt');

  const agences = S('Pour les agences', 'Une charte par client, un parcours par prospect', 'Vous prospectez pour plusieurs clients ? Chacun garde son ton, son offre et sa signature.', `
    <div class="lm-split lm-rv" style="margin-top:34px"><div><ul><li>Une charte par client : ton, vouvoiement, offre, lien d'agenda</li><li>Le fichier du client enrichi, prêt à lui livrer</li><li>Un abonnement et des crédits propres à LeadMessage</li><li>Messages cohérents sur toute la liste</li></ul><p style="margin-top:18px"><a class="lm-btn" href="${M}cas/agences/">Lire le cas d'usage agences</a></p></div>
    <div class="lm-stage-bg">${win('leadmessage / chartes', `<h4>Chartes clients</h4><p class="sb">Un réglage par client</p><div class="lm-row"><b>Studio Arca</b><em>vouvoiement · sobre</em></div><div class="lm-row"><b>Maison Delta</b><em>tutoiement · direct</em></div><div class="lm-row"><b>Cabinet Vauban</b><em>vouvoiement · formel</em></div>`)}</div></div>`, 'agences');

  const export_ = S('Export', 'Un fichier prêt pour votre outil d\'envoi', 'Votre CSV d\'origine, avec une colonne par message choisi. Utilisez-les comme variables dans vos séquences.', `
    <div class="lm-tbl lm-rv"><table><thead><tr>${hdr.map((h, i) => `<th${i > 2 ? ' class="hl"' : ''}>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map((x, i) => `<td${i > 2 ? ' class="hl"' : ''}>${e(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    <div class="lm-callout"><b>LeadMessage n'envoie rien.</b> Vous gardez la main sur vos boîtes d'envoi, vos volumes et votre délivrabilité. Relisez un échantillon, importez, puis envoyez à votre rythme.</div>
    <div class="lm-grid3">${[['Relisez dix messages', 'Pris au hasard avant l\'envoi. Corrigez la charte ou le fichier, puis relancez les contacts concernés.'], ['Montez en charge doucement', 'Quelques dizaines de mails par jour au début sur une boîte récente, pour protéger la délivrabilité.'], ['Évitez les liens superflus', 'Un seul lien par mail, et aucun dans la note d\'invitation LinkedIn.']].map(x => `<div class="lm-card lm-rv"><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join('')}</div>`, 'export');

  const cas = S('Cas d\'usage', 'Pour qui, et pour quoi', null, `<div class="lm-grid3 two">${[['agences', 'Agences et prestataires B2B', 'Une charte par client, un parcours par prospect.'], ['commerciaux', 'Équipes commerciales', 'Une séquence sur vos comptes cibles.'], ['independants', 'Consultants et indépendants', 'Un réseau LinkedIn qui répond.'], ['recrutement', 'Recrutement et événements', 'Inviter, convaincre, relancer.']].map(([k, t, s]) => `<a class="lm-card lm-link-card lm-rv" href="${M}cas/${k}/"><h3>${t}</h3><p>${s}</p><span class="lm-go">Lire le cas d'usage →</span></a>`).join('')}</div>`, 'cas', 'alt');

  const res = S('Ressources', 'Guides et outils gratuits', 'Pour préparer vos séquences avant même de créer un compte.', `<div class="lm-grid3">${[
    [M + 'ressources/relance-sans-spam/', 'Guide', 'Relancer sans passer pour du spam'],
    [M + 'ressources/note-invitation-linkedin/', 'Guide', 'Une note d\'invitation LinkedIn qui est acceptée'],
    [M + 'ressources/combien-de-messages/', 'Guide', 'Combien de messages et à quel rythme'],
    [M + 'outils/compteur-caracteres/', 'Outil', 'Compteur de caractères LinkedIn et mail'],
    [M + 'outils/planificateur-sequence/', 'Outil', 'Planificateur de dates de séquence'],
    [M + 'modeles/', 'Modèles', 'Quatre séquences à copier']].map(([h, t, n]) => `<a class="lm-card lm-link-card lm-rv" href="${h}"><span class="lm-k" style="margin-bottom:8px">${t}</span><h3>${n}</h3><span class="lm-go">Ouvrir →</span></a>`).join('')}</div>`, 'ressources');

  const conf = S('Confiance', 'Vos données restent les vôtres', 'Les informations de votre fichier servent uniquement à rédiger vos messages. Les détails sont publics.', `<div class="lm-grid3">${[['Données et sécurité', 'Ce qui est stocké, où, et combien de temps.', B + 'legal/donnees-et-securite/'], ['Confidentialité', 'Traitement des données et vos droits RGPD.', B + 'legal/confidentialite/'], ['CGV et CGU', 'Crédits, facturation et conditions d\'usage.', B + 'legal/cgv/']].map(([h, p, l]) => `<a class="lm-card lm-link-card lm-rv" href="${l}"><h3>${h}</h3><p>${p}</p><span class="lm-go">Lire →</span></a>`).join('')}</div>`, 'confiance', 'alt');

  const tarifs = `<section class="lm-sec" id="tarifs"><div class="lm-w">
  <span class="lm-k">Tarifs</span><h2>Choisissez votre volume de contacts, payez au mois</h2>
  <p class="lm-sub">LeadMessage a son propre abonnement et ses propres crédits, indépendants de LeadPage. Un crédit couvre un parcours de messages complet pour un contact. Déplacez le curseur : le prix par contact baisse avec le volume.</p>
  <div class="lm-slide lm-rv">
    <div class="lm-slide-top"><div><span class="lm-slide-n" id="ls-n">1 000</span> <span class="lm-slide-u">contacts par mois</span></div><div class="lm-slide-p"><b id="ls-p">59 €</b> <small>par mois, HT</small></div></div>
    <input id="ls-r" type="range" min="0" max="5" step="1" value="2" aria-label="Contacts par mois">
    <div class="lm-slide-ticks"><span>200</span><span>500</span><span>1 000</span><span>2 500</span><span>5 000</span><span>10 000</span></div>
    <div class="lm-slide-meta"><span id="ls-u">Soit 0,059 € par contact</span><span>Sans engagement, changement de palier à tout moment</span></div>
    <ul class="lm-slide-ul"><li>Un crédit par contact, quel que soit le parcours</li><li>Mails 1, 2, 3, invitation et messages LinkedIn</li><li>Chartes de ton illimitées, une par client</li><li>Lien d'agenda à l'étape de votre choix</li><li>Export compatible Snov.io, Lemlist, HeyReach</li></ul>
    <a class="lm-btn" style="text-align:center" href="${B}?p=message#connexion">S'abonner ou essayer gratuitement</a>
  </div>
  <p class="lm-note">Pour commencer : 5 contacts offerts à l'inscription, sans carte bancaire. Plus de 10 000 contacts par mois ? Écrivez-nous pour un forfait sur mesure.</p></div></section>`;

  const FG = [['Messages', /personnalis|ton\b|limites|fichier est pauvre|régénérer|agenda|Que reçoit|Qu'est-ce/i], ['Crédits et tarifs', /crédit|engagement|prix|coûte/i], ['Envoi et outils', /envoie|outils|relire|lien avec LeadPage/i], ['Données', /stock|donnée/i]];
  const grp = q => { const g = FG.find(x => x[1].test(q)); return g ? g[0] : 'Messages'; };
  const cats = FG.map(x => x[0]);
  const faqS = `<section class="lm-sec alt" id="faq"><div class="lm-w"><div class="lm-faqw">
  <div class="lm-faqside"><span class="lm-k">FAQ</span><h2>Vos questions, nos réponses</h2><p class="lm-sub">Tout ce qu'il faut savoir avant de lancer votre premier parcours.</p>
  <div class="lm-faqbox"><b>Une question qui n'est pas ici ?</b><p>Écrivez-nous, nous répondons sous un jour ouvré.</p><a class="lm-btn sm" href="mailto:contact@devoleads.fr">Nous écrire</a></div></div>
  <div class="lm-faqmain"><div class="lm-chips" role="tablist"><button class="on" data-g="">Toutes</button>${cats.map(c => `<button data-g="${c}">${c}</button>`).join('')}</div>
  <div class="lm-faq">${faq.map(([q, a]) => `<details data-g="${grp(q)}"><summary><span>${q}</span><i aria-hidden="true"></i></summary><div class="ans"><p>${a}</p></div></details>`).join('')}</div></div>
  </div></div></section>`;

  const fin = `<section class="lm-final lm-rv"><h2>Testez le parcours sur cinq contacts</h2><p>Cinq contacts offerts, sans carte bancaire. Relisez les textes, ajustez la charte, puis passez à l'échelle.</p>${cta('Essayer gratuitement')}</section>
<p class="lm-cross">Vous préférez un document personnalisé avec mesure de lecture ? <a href="${B}">Découvrir LeadPage</a></p>`;

  return hero + stats + pourquoi + sim + comment + ftm + gardefous + canaux + agences + export_ + cas + res + conf + tarifs + faqS + fin;
};
