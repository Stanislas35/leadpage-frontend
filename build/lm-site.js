// Site LeadMessage : un univers à part (logo, rouge) : accueil, démo, modèles, cas d'usage.
const faq = [
  ['Que reçois-je pour chaque contact ?', 'Le parcours que vous choisissez : jusqu\'à trois mails (le premier avec son objet), une note d\'invitation LinkedIn et deux messages LinkedIn. Chaque texte est ajouté dans une colonne de votre CSV.'],
  ['Combien de crédits consomme un parcours ?', 'Un crédit par contact, que vous génériez un seul message ou les six. Les contacts en erreur ne sont pas débités. Ce sont les mêmes crédits que ceux de LeadPage.'],
  ['Les messages sont-ils vraiment personnalisés ?', 'Chacun est rédigé à partir des informations de votre fichier : poste, entreprise, secteur, taille, description. LeadMessage n\'invente ni fait, ni chiffre, ni référence. Si le fichier est pauvre, le texte reste général plutôt que faux.'],
  ['Quelles sont les limites des messages LinkedIn ?', 'La note d\'invitation est limitée à 300 caractères, ou 200 si votre compte LinkedIn l\'impose : vous choisissez au lancement. Le premier message fait 400 caractères au maximum, le second 350. Un texte trop long est raccourci proprement.'],
  ['LeadMessage envoie-t-il les messages ?', 'Non. Vous téléchargez le fichier enrichi et l\'importez dans votre outil d\'envoi de mails ou d\'automatisation LinkedIn. Vous gardez la main sur vos boîtes, vos volumes et votre délivrabilité.'],
  ['Quel est le lien avec LeadPage ?', 'Même plateforme, même compte, mêmes chartes et mêmes crédits. LeadPage produit un document personnalisé avec mesure de lecture ; LeadMessage produit la séquence de messages. Vous pouvez utiliser l\'un sur tout votre fichier et l\'autre sur vos comptes prioritaires.'],
  ['Puis-je choisir le ton ?', 'Oui. Le tutoiement ou le vouvoiement, le style et la signature viennent de la charte du client, comme pour les PDF.']
];
const pk = [['Gratuit', '0 €', 'offert à l\'inscription', '5 contacts', ['Parcours complet possible', 'Une charte', 'Sans carte bancaire'], 0, 'Créer un compte'], ['Starter', '29 €', 'par mois', '500 contacts', ['500 crédits par mois', 'Trois chartes', 'Export compatible Snov.io, Lemlist, HeyReach'], 0, 'Choisir Starter'], ['Growth', '79 €', 'par mois', '2 000 contacts', ['2 000 crédits par mois', 'Chartes illimitées, une par client', 'Support prioritaire'], 1, 'Choisir Growth']];
const hdr = ['email', 'prénom', 'entreprise', 'mail1_objet', 'mail1_corps', 'mail2_corps', 'mail3_corps', 'linkedin_1', 'linkedin_2', 'linkedin_3'];
const rows = [['camille@atelier-nova.fr', 'Camille', 'Atelier Nova', 'Atelier Nova et vos trois…', 'Bonjour Camille, pour une…', 'Camille, une question plus…', 'Camille, je ne veux pas…', 'Bonjour Camille, je travaille…', 'Merci pour la connexion…', 'Camille, un dernier mot…'], ['thomas@maison-delta.fr', 'Thomas', 'Maison Delta', 'Maison Delta : vos…', 'Bonjour Thomas, avec une…', 'Thomas, une question…', 'Thomas, je ne veux pas…', 'Bonjour Thomas, je suis…', 'Merci Thomas, pour…', 'Thomas, un dernier…']];


const e = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const ROOT_URL = 'messages/';

// ── Habillage commun : navigation, pied de page, styles ──────────────────────────────────
function shell(B, SITE, o) {
  const M = B + ROOT_URL, url = SITE + o.r + '/';
  const ld = (o.faq ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: o.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) })}</script>` : '') +
    (o.article ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: o.t, description: o.d, inLanguage: 'fr', mainEntityOfPage: url, author: { '@type': 'Organization', name: 'Devoleads' }, publisher: { '@type': 'Organization', name: 'LeadMessage' } })}</script>` : '');
  const link = (href, label, key) => `<a href="${href}"${o.active === key ? ' class="cur" aria-current="page"' : ''}>${label}</a>`;
  const nav = link(M + '#parcours', 'Parcours', 'home') + link(M + 'demo/', 'Démo', 'demo') + link(M + 'modeles/', 'Modèles', 'modeles') + link(M + 'cas/', 'Cas d\'usage', 'cas') + link(M + '#tarifs', 'Tarifs', 't') + link(M + '#faq', 'FAQ', 'f');
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${e(o.t)}${o.r === 'messages' ? '' : ' | LeadMessage'}</title>
<meta name="description" content="${e(o.d)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#E4332E"><meta name="color-scheme" content="light">
<meta property="og:type" content="${o.article ? 'article' : 'website'}"><meta property="og:title" content="${e(o.t)}"><meta property="og:description" content="${e(o.d)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${SITE}icon-512.png">
<link rel="icon" href="${B}favicon-lm.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${B}assets/lm.css">
${ld}
</head>
<body class="lm">
${o.curtain ? `<div class="lm-curtain" aria-hidden="true"><img src="${B}logo-lm.svg" alt=""></div>` : ''}
<header class="lm-nav"><div class="lm-w">
  <a class="lm-brand" href="${M}" aria-label="LeadMessage, accueil"><img src="${B}logo-lm.svg" alt=""><span>Lead<b>Message</b></span></a>
  <nav class="lm-links" aria-label="Sections">${nav}</nav>
  <div class="lm-right">
    <div class="lm-uni" aria-label="Changer d'univers"><a href="${B}">LeadPage</a><span class="on">LeadMessage</span></div>
    <a class="lm-login" href="${B}?p=message#connexion">Connexion</a>
    <a class="lm-btn sm" href="${B}?p=message#connexion">Essayer</a>
  </div>
</div></header>
<main>
${o.body}
</main>
<footer class="lm-foot"><div class="lm-w">
  <div><a class="lm-brand" href="${M}"><img src="${B}logo-lm.svg" alt=""><span>Lead<b>Message</b></span></a><p style="max-width:300px;margin:10px 0 0">Un parcours de messages personnalisé par prospect.</p></div>
  <div><b>LeadMessage</b><a href="${M}demo/">Démo guidée</a><a href="${M}modeles/">Modèles de séquences</a><a href="${M}cas/">Cas d'usage</a><a href="${M}#tarifs">Tarifs</a></div>
  <div><b>Produits</b><a href="${B}">LeadPage, documents personnalisés</a><a href="${B}demo/">Démo LeadPage</a><a href="${B}outils/">Outils gratuits</a></div>
  <div><b>Confiance</b><a href="${B}legal/mentions-legales/">Mentions légales</a><a href="${B}legal/confidentialite/">Confidentialité</a><a href="${B}legal/cgv/">CGV et CGU</a><a href="${B}legal/cookies/">Cookies</a><a href="${B}legal/donnees-et-securite/">Données et sécurité</a></div>
  <small>© 2026 LeadMessage, un produit LeadPage · Édité par Devoleads, La Rochelle</small>
</div></footer>
<script src="${B}assets/lm.js" defer></script>${o.script ? `<script src="${B}assets/${o.script}" defer></script>` : ''}
</body></html>`;
}

const hero2 = (tag, h, p) => `<section class="lm-hero sm"><div class="lm-w"><div><span class="lm-tag">${tag}</span><h1>${h}</h1><p class="lead">${p}</p></div></div></section>`;
const sec = (k, h, sub, inner, id, alt) => `<section class="lm-sec${alt ? ' alt' : ''}"${id ? ` id="${id}"` : ''}><div class="lm-w">${k ? `<span class="lm-k">${k}</span>` : ''}<h2>${h}</h2>${sub ? `<p class="lm-sub">${sub}</p>` : ''}${inner}</div></section>`;
const finalCta = (B, h, p) => `<section class="lm-final lm-rv"><h2>${h}</h2><p>${p}</p><a class="lm-btn" href="${B}?p=message#connexion">Essayer gratuitement</a></section>`;

// ── Page d'accueil (landing) ─────────────────────────────────────────────────────────────
function landingBody(B) {
  return `
<section class="lm-hero"><div class="lm-w">
  <div>
    <span class="lm-tag">Nouveau : le parcours de messages par prospect</span>
    <h1>Un parcours de messages écrit pour <em>chaque prospect</em></h1>
    <p class="lead">Mails 1, 2 et 3, invitation et messages LinkedIn : vous choisissez le parcours, LeadMessage rédige chaque texte à partir de votre fichier. Prêt à importer dans votre outil d'envoi.</p>
    <div class="row"><a class="lm-btn wh" href="${B}?p=message#connexion">Essayer gratuitement</a><a class="lm-btn ghost" style="color:#fff;border-color:rgba(255,255,255,.7)" href="#parcours">Composer mon parcours</a></div>
    <div class="meta"><span>1 crédit par contact</span><span>Aucun fait inventé</span><span>Cinq contacts offerts</span></div>
  </div>
  <div class="lm-conv" aria-hidden="true">
    <div class="lm-bub a"><b>Mail 1 · J0</b>Bonjour Camille, pour une marque de mobilier avec trois boutiques, garder le même discours en magasin et en ligne…</div>
    <div class="lm-bub b"><b>Invitation LinkedIn</b>Bonjour Camille, je travaille avec des marques de mobilier qui animent plusieurs points de vente…</div>
    <div class="lm-bub c"><b>Mail 2 · J+3</b>Camille, une question plus concrète : comment adaptez-vous une campagne à chacune de vos trois boutiques ?</div>
  </div>
</div></section>

<section class="lm-sec" id="parcours"><div class="lm-w">
  <span class="lm-k">Votre parcours</span>
  <h2>Composez la séquence, voyez le résultat</h2>
  <p class="lm-sub">Choisissez les messages que vous voulez pour chaque contact. Le coût reste le même : un crédit par contact, du message seul au parcours complet.</p>
  <div class="lm-sim lm-rv">
    <div class="lm-panel">
      <div class="lm-presets"><button class="lm-pre" data-p="mail" type="button">Séquence mail</button><button class="lm-pre" data-p="li" type="button">Séquence LinkedIn</button><button class="lm-pre" data-p="full" type="button">Parcours complet</button></div>
      <div id="lm-chips"></div>
      <div class="lm-sum" id="lm-sum"></div>
    </div>
    <div>
      <div class="lm-data" aria-label="Données du fichier utilisées dans l'exemple"><span>Camille Roux</span><span>Directrice marketing</span><span>Atelier Nova</span><span>Mobilier, trois boutiques</span></div>
      <ol class="lm-tl" id="lm-tl"></ol>
      <p class="lm-note">Exemple fictif. Les textes ne s'appuient que sur les données du fichier ci-dessus : poste, entreprise, secteur et description.</p>
    </div>
  </div>
</div></section>

<section class="lm-sec alt" id="comment"><div class="lm-w">
  <span class="lm-k">Fonctionnement</span>
  <h2>Du CSV au parcours, en trois étapes</h2>
  <div class="lm-grid3">${[['Importez votre CSV', 'Le même fichier que pour LeadPage : prénom, poste, entreprise, secteur. Doublons et lignes vides retirés avant la génération.'], ['Choisissez le parcours', 'Cochez les messages voulus, la charte du client et, pour LinkedIn, la limite de la note (200 ou 300 caractères). Le coût s\'affiche avant le lancement.'], ['Téléchargez le fichier', 'Chaque message arrive dans sa colonne. Importez le CSV dans Snov.io, Lemlist, HeyReach ou votre outil habituel.']].map((x, i) => `<div class="lm-card lm-rv"><span class="n">${i + 1}</span><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join('')}</div>
</div></section>

<section class="lm-sec" id="export"><div class="lm-w">
  <span class="lm-k">Export</span>
  <h2>Un fichier prêt pour votre outil d'envoi</h2>
  <p class="lm-sub">Votre CSV d'origine, avec une colonne par message choisi. Utilisez-les comme variables dans vos séquences.</p>
  <div class="lm-tbl lm-rv"><table><thead><tr>${hdr.map((h, i) => `<th${i > 2 ? ' class="hl"' : ''}>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map((c, i) => `<td${i > 2 ? ' class="hl"' : ''}>${e(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
  <div class="lm-grid3">${[['Aucun fait inventé', 'Les textes s\'appuient sur votre fichier. Sans information précise, ils restent généraux plutôt que faux.'], ['Limites respectées', 'Note d\'invitation de 200 ou 300 caractères, messages LinkedIn courts, mails de 25 à 90 mots.'], ['Ton de la charte', 'Tutoiement ou vouvoiement, style et signature viennent de la charte du client, comme pour les PDF.']].map(x => `<div class="lm-card lm-rv"><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join('')}</div>
</div></section>

<section class="lm-sec alt" id="tarifs"><div class="lm-w">
  <span class="lm-k">Tarifs</span>
  <h2>Un contact, un crédit, quel que soit le parcours</h2>
  <p class="lm-sub">Les crédits sont partagés avec LeadPage : un crédit couvre un parcours de messages complet ou un PDF. Sans engagement.</p>
  <div class="lm-price">${pk.map(k => `<div class="lm-pk${k[5] ? ' feat' : ''} lm-rv">${k[5] ? '<span class="bd">Le plus choisi</span>' : ''}<h3>${k[0]}</h3><p class="amt">${k[1]} <small>${k[2]}</small></p><p class="ct">${k[3]}</p><ul>${k[4].map(x => `<li>${x}</li>`).join('')}</ul><a class="lm-btn${k[5] ? '' : ' ghost'}" style="text-align:center" href="${B}?p=message#connexion">${k[6]}</a></div>`).join('')}</div>
  <p class="lm-note">Moins de 0,06 € le contact avec Starter, moins de 0,04 € avec Growth, pour un parcours de six messages. Besoin de plus de volume ? Écrivez-nous pour un forfait sur mesure.</p>
</div></section>

<section class="lm-sec" id="faq"><div class="lm-w">
  <span class="lm-k">FAQ</span>
  <h2>Questions fréquentes</h2>
  <div class="lm-faq">${faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
</div></section>

<section class="lm-final lm-rv">
  <h2>Testez le parcours sur cinq contacts</h2>
  <p>Cinq contacts offerts, sans carte bancaire. Relisez les textes, ajustez la charte, puis passez à l'échelle.</p>
  <a class="lm-btn" href="${B}?p=message#connexion">Essayer gratuitement</a>
</section>
<p class="lm-cross">Vous préférez un document personnalisé avec mesure de lecture ? <a href="${B}">Découvrir LeadPage</a></p>
`;
}

// ── Démo guidée ──────────────────────────────────────────────────────────────────────────
function demoBody(B) {
  return hero2('Démo guidée', 'LeadMessage en 60 secondes', 'Un fichier de contacts devient un parcours de messages écrit pour chacun. Cinq étapes, trois contacts fictifs, sans inscription.') +
    sec('', 'La visite guidée', 'Avancez à votre rythme, ou laissez défiler. Vous pouvez modifier le parcours à l\'étape 2 et voir le résultat changer.',
      `<div class="lm-demo" id="lm-demo" aria-live="polite"><div class="lm-demo-steps" id="dm-steps"></div><div class="lm-demo-stage" id="dm-stage"></div><div class="lm-demo-ctl"><button type="button" class="lm-btn ghost sm" id="dm-prev">Précédent</button><button type="button" class="lm-btn sm" id="dm-next">Suivant</button></div></div><noscript><p>Cette visite demande JavaScript. Essayez plutôt le simulateur de la page d'accueil.</p></noscript>`, 'visite') +
    finalCta(B, 'Faites la même chose sur votre fichier', 'Cinq contacts offerts, sans carte bancaire.');
}

// ── Modèles de séquences ─────────────────────────────────────────────────────────────────
const SEQ = [
  { k: 'services', t: 'Premier contact, services B2B', s: 'Pour une agence, un cabinet ou un prestataire qui approche des décideurs qu\'il ne connaît pas encore.', m: [
    ['Invitation LinkedIn', 'li', 'Bonjour {{prénom}}, je travaille avec des entreprises de {{secteur}} sur {{sujet}}, un sujet proche de celui de {{entreprise}}. Je serais ravi de vous compter dans mon réseau.'],
    ['Mail 1', 'mail', 'Objet : {{entreprise}} et {{sujet}}\n\nBonjour {{prénom}},\n\n{{enjeu_du_poste}}\n\n{{agence}} aide les entreprises de {{secteur}} à {{ce_que_vous_faites}}, sans {{frein_principal}}.\n\nSeriez-vous disponible 20 minutes la semaine prochaine pour en parler ?\n\n{{agence}}'],
    ['Mail 2, relance', 'mail', 'Bonjour {{prénom}},\n\nUne question plus concrète : comment gérez-vous aujourd\'hui {{sujet}} chez {{entreprise}} ?\n\nSi c\'est un sujet, je peux vous présenter notre méthode en dix minutes.\n\n{{agence}}'],
    ['Message LinkedIn 1', 'li', 'Merci pour la connexion, {{prénom}}. Dans {{secteur}}, {{sujet}} devient vite un vrai chantier. Comment l\'abordez-vous chez {{entreprise}} ?'],
    ['Mail 3, dernier message', 'mail', 'Bonjour {{prénom}},\n\nJe ne veux pas encombrer votre boîte. Si le sujet n\'est pas pour vous, pouvez-vous m\'indiquer la bonne personne chez {{entreprise}} ?\n\n{{agence}}'],
    ['Message LinkedIn 2', 'li', '{{prénom}}, un dernier mot : je peux vous envoyer un court exemple adapté à {{entreprise}}, sans engagement. Souhaitez-vous le recevoir ?']] },
  { k: 'salon', t: 'Après un salon ou un événement', s: 'Pour relancer des personnes croisées ou inscrites, avec un rappel naturel du contexte.', m: [
    ['Invitation LinkedIn', 'li', 'Bonjour {{prénom}}, nous nous sommes croisés à {{evenement}}. Je serais heureux de poursuivre l\'échange ici.'],
    ['Mail 1', 'mail', 'Objet : Suite à {{evenement}}\n\nBonjour {{prénom}},\n\nMerci pour l\'échange à {{evenement}}. Vous évoquiez {{sujet_evoque}}, et j\'y ai repensé depuis.\n\n{{agence}} peut vous montrer concrètement comment {{ce_que_vous_faites}}.\n\nUn créneau de 20 minutes cette semaine ou la suivante ?\n\n{{agence}}'],
    ['Mail 2, relance', 'mail', 'Bonjour {{prénom}},\n\nJe reviens sur {{sujet_evoque}} : voici l\'idée en une phrase, {{idee_en_une_phrase}}.\n\nEst-ce un sujet pour {{entreprise}} en ce moment ?\n\n{{agence}}'],
    ['Message LinkedIn 1', 'li', 'Merci d\'avoir accepté, {{prénom}}. À {{evenement}}, vous parliez de {{sujet_evoque}}. Où en êtes-vous aujourd\'hui sur ce point ?'],
    ['Mail 3, dernier message', 'mail', 'Bonjour {{prénom}},\n\nSans nouvelle de votre part, je classe le sujet. Si cela change, je reste joignable.\n\nBonne continuation chez {{entreprise}}.\n\n{{agence}}'],
    ['Message LinkedIn 2', 'li', '{{prénom}}, je partage avec plaisir le support présenté à {{evenement}} si cela peut vous servir. Souhaitez-vous que je vous l\'envoie ?']] },
  { k: 'recrutement', t: 'Chasse de profils et recrutement', s: 'Pour approcher des candidats en poste, avec un message court et respectueux.', m: [
    ['Invitation LinkedIn', 'li', 'Bonjour {{prénom}}, votre parcours en {{domaine}} chez {{entreprise}} a retenu mon attention. Je serais ravi d\'échanger avec vous.'],
    ['Mail 1', 'mail', 'Objet : Un poste en {{domaine}}, sans engagement\n\nBonjour {{prénom}},\n\nVotre expérience en {{domaine}} correspond à un poste que nous ouvrons chez {{societe_qui_recrute}} : {{intitule_du_poste}}.\n\nSans engagement, seriez-vous ouvert à un échange de 15 minutes pour en savoir plus ?\n\n{{signature}}'],
    ['Mail 2, relance', 'mail', 'Bonjour {{prénom}},\n\nJe précise l\'essentiel du poste : {{trois_points_cles}}.\n\nSi le moment n\'est pas le bon, dites-le moi simplement, je comprendrai.\n\n{{signature}}'],
    ['Message LinkedIn 1', 'li', 'Merci pour la connexion, {{prénom}}. Je recrute un poste en {{domaine}} et votre profil m\'a semblé pertinent. Seriez-vous ouvert à en discuter ?'],
    ['Mail 3, dernier message', 'mail', 'Bonjour {{prénom}},\n\nDernier message de ma part : si ce poste ne vous parle pas, auriez-vous quelqu\'un à me recommander dans votre réseau ?\n\n{{signature}}'],
    ['Message LinkedIn 2', 'li', '{{prénom}}, pas de pression : si vous connaissez une personne en {{domaine}} qui cherche une nouvelle étape, je serais heureux d\'échanger avec elle.']] },
  { k: 'webinaire', t: 'Invitation à un webinaire ou un événement', s: 'Pour inviter chaque personne avec le sujet qui la concerne, et relancer sans insister.', m: [
    ['Invitation LinkedIn', 'li', 'Bonjour {{prénom}}, nous organisons un webinaire sur {{theme}}, un sujet proche de votre rôle chez {{entreprise}}. Je serais ravi de vous compter dans mon réseau.'],
    ['Mail 1', 'mail', 'Objet : {{theme}} : webinaire le {{date}}\n\nBonjour {{prénom}},\n\nNous organisons un webinaire de {{duree}} sur {{theme}}, le {{date}}. Il s\'adresse aux {{poste}} comme vous.\n\nVous y verrez {{ce_que_ils_verront}}. L\'inscription est gratuite : {{lien}}\n\n{{agence}}'],
    ['Mail 2, relance', 'mail', 'Bonjour {{prénom}},\n\nLe webinaire a lieu {{jour_et_heure}}. Si vous ne pouvez pas être présent, l\'inscription vous donne aussi accès à l\'enregistrement : {{lien}}\n\n{{agence}}'],
    ['Message LinkedIn 1', 'li', 'Merci pour la connexion, {{prénom}}. Le webinaire du {{date}} sur {{theme}} peut vous intéresser. Souhaitez-vous que je vous envoie le lien d\'inscription ?'],
    ['Mail 3, dernier message', 'mail', 'Bonjour {{prénom}},\n\nDernier rappel : le webinaire commence demain à {{heure}}. {{lien}}\n\nSi le sujet ne vous concerne pas, n\'hésitez pas à me le dire.\n\n{{agence}}'],
    ['Message LinkedIn 2', 'li', '{{prénom}}, le replay du webinaire sur {{theme}} est disponible. Je peux vous l\'envoyer si cela vous est utile.']] }
];
function modelesBody(B) {
  const chips = SEQ.map(s => `<a class="lm-chipl" href="#${s.k}">${s.t}</a>`).join('');
  return hero2('Modèles', 'Quatre séquences à copier', 'Des parcours complets : mails 1 à 3, invitation et deux messages LinkedIn. Les variables entre accolades se remplacent par les colonnes de votre fichier, ou par LeadMessage lui-même.') +
    `<section class="lm-sec"><div class="lm-w"><div class="lm-chips">${chips}</div></div></section>` +
    SEQ.map((s, i) => sec('Séquence ' + (i + 1), s.t, s.s,
      `<div class="lm-seq">${s.m.map((m, j) => `<div class="lm-card lm-tpl ${m[1]}"><h3>${m[0]}<u>${m[1] === 'li' ? 'LinkedIn' : 'Mail'}</u></h3><pre id="t-${s.k}-${j}">${e(m[2])}</pre><button type="button" class="lm-btn ghost sm" data-copy="t-${s.k}-${j}">Copier</button></div>`).join('')}</div>`, s.k, i % 2 === 1)).join('') +
    sec('', 'Avant d\'envoyer', null, `<div class="lm-grid3">${[['Relisez un échantillon', 'Dix messages pris au hasard avant l\'envoi. Corrigez la charte ou le fichier, puis relancez.'], ['Espacez les envois', 'Trois à quatre jours entre deux messages. Ne combinez pas mail et LinkedIn le même jour.'], ['Un seul objectif par message', 'Une question, un lien, ou une proposition de créneau. Jamais les trois.']].map(x => `<div class="lm-card lm-rv"><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join('')}</div>`) +
    finalCta(B, 'Laissez LeadMessage remplir les variables', 'Chaque message est rédigé pour le contact à partir de votre fichier.');
}

// ── Cas d'usage ──────────────────────────────────────────────────────────────────────────
const LMCAS = {
  agences: { t: 'Agences et prestataires B2B', s: 'Une charte par client, un parcours par prospect, livré dans le fichier du client.', p: 'full',
    lead: 'Vous prospectez pour plusieurs clients, chacun avec son ton, son offre et sa signature. LeadMessage garde ces réglages séparés.',
    secs: [['Le problème', 'Écrire à la main des séquences différentes pour dix clients et mille contacts est impossible. Les modèles génériques se repèrent tout de suite.'], ['Ce que fait LeadMessage', 'Une charte par client (ton, tutoiement ou vouvoiement, signature, offre). Un parcours rédigé pour chaque contact à partir de son poste, de son entreprise et de son secteur, avec les colonnes prêtes à importer dans l\'outil du client.'], ['Un flux type', 'Vous exportez la liste du client, choisissez sa charte, composez le parcours (par exemple invitation LinkedIn, mail 1, mail 2, message LinkedIn 1), générez, relisez dix lignes, puis importez le fichier dans l\'outil d\'envoi.'], ['Bon à savoir', 'Plus le fichier est complet (poste, secteur, description), plus les messages sont précis. Sans information, ils restent généraux plutôt que faux.']] },
  commerciaux: { t: 'Équipes commerciales', s: 'Une séquence sur vos comptes cibles, sans y passer l\'après-midi.', p: 'mail',
    lead: 'Sur vos comptes prioritaires, un mail générique se noie. Une séquence qui parle du contexte du décideur change la conversation.',
    secs: [['Le problème', 'Les commerciaux écrivent un très bon premier mail, puis relancent avec des formules toutes faites ou ne relancent pas.'], ['Ce que fait LeadMessage', 'Mails 1, 2 et 3 cohérents entre eux : un angle d\'accroche, une relance qui apporte un angle nouveau, puis un dernier message courtois. Chaque texte reste court et se termine par une seule question.'], ['Le rythme conseillé', 'Mail 1 au jour 0, mail 2 au jour 3, mail 3 au jour 7. Vous gardez la main sur l\'outil d\'envoi et vos volumes.'], ['Bon à savoir', 'LeadMessage ne mesure pas les ouvertures et n\'envoie rien. Pour savoir qui lit un document, LeadPage ajoute le suivi de lecture.']] },
  independants: { t: 'Consultants et indépendants', s: 'Une présence de cabinet, avec le temps d\'un indépendant.', p: 'li',
    lead: 'Vous êtes seul, et votre réseau LinkedIn est votre principal canal. Chaque prise de contact doit sonner juste.',
    secs: [['Le problème', 'Les notes d\'invitation sont trop longues ou trop commerciales, et les messages de suite arrivent trop vite ou jamais.'], ['Ce que fait LeadMessage', 'Une invitation de 200 ou 300 caractères selon votre compte, un message d\'accueil après l\'acceptation et un message de relance une semaine plus tard. Sans lien, sans pitch long.'], ['Pour démarrer', 'Commencez par vingt contacts, relisez tout, ajustez la charte (ton et signature), puis passez à cent.'], ['Bon à savoir', 'Respectez les limites d\'envoi quotidiennes de LinkedIn : LeadMessage prépare les textes, vous gardez la main sur le rythme.']] },
  recrutement: { t: 'Recrutement et événements', s: 'Inviter, convaincre, relancer : un parcours par personne.', p: 'full',
    lead: 'Chasse de profils, salons, webinaires : la réponse dépend de la pertinence perçue dès les premiers mots.',
    secs: [['Recrutement', 'Une approche courte et respectueuse, adaptée au parcours de la personne, avec la possibilité de recommander quelqu\'un d\'autre dans le dernier message.'], ['Événements et webinaires', 'Une invitation qui rappelle le sujet utile à son métier, une relance avec le lien, un rappel la veille.'], ['Un flux type', 'Vous importez la liste des profils ou des inscrits, choisissez le parcours complet, relisez un échantillon, puis exportez.'], ['Bon à savoir', 'Pour un poste, précisez dans votre charte l\'intitulé et l\'entreprise qui recrute : les messages s\'appuieront dessus et n\'inventeront rien.']] }
};
const PRE = { full: 'Parcours complet : six messages', mail: 'Séquence mail : trois mails', li: 'Séquence LinkedIn : invitation et deux messages' };
function casIndexBody(B) {
  return hero2('Cas d\'usage', 'LeadMessage selon votre métier', 'Quatre façons d\'utiliser un parcours de messages par prospect.') +
    sec('', 'Choisissez le vôtre', null, `<div class="lm-grid3 two">${Object.entries(LMCAS).map(([k, v]) => `<a class="lm-card lm-link-card lm-rv" href="${B}${ROOT_URL}cas/${k}/"><h3>${v.t}</h3><p>${v.s}</p><span class="lm-go">Lire le cas d'usage →</span></a>`).join('')}</div>`) +
    finalCta(B, 'Quel est votre cas ? Testez sur cinq contacts.', 'Cinq contacts offerts, sans carte bancaire.');
}
function casBody(B, k) {
  const v = LMCAS[k];
  const others = Object.entries(LMCAS).filter(([x]) => x !== k).map(([x, o]) => `<a class="lm-chipl" href="${B}${ROOT_URL}cas/${x}/">${o.t}</a>`).join('');
  return hero2('Cas d\'usage', v.t, v.lead) +
    `<section class="lm-sec"><div class="lm-w lm-art">${v.secs.map(([h, t]) => `<h2>${h}</h2><p>${t}</p>`).join('')}<div class="lm-card lm-rv" style="margin-top:26px"><h3>Parcours conseillé</h3><p>${PRE[v.p]}. Vous pouvez le modifier message par message dans le formulaire.</p><a class="lm-btn sm" style="margin-top:12px" href="${B}${ROOT_URL}#parcours">Voir le simulateur</a></div><h3 style="margin-top:34px">Autres cas d'usage</h3><div class="lm-chips">${others}</div></div></section>` +
    finalCta(B, 'Générez votre premier parcours', 'Cinq contacts offerts, sans carte bancaire.');
}

// ── Liste des routes ─────────────────────────────────────────────────────────────────────
const routes = [
  { r: 'messages', t: 'LeadMessage : une séquence de mails et de messages LinkedIn par prospect', d: 'Mail 1, 2 et 3, invitation et messages LinkedIn rédigés pour chaque prospect à partir de votre fichier CSV. Vous choisissez le parcours, 1 crédit par contact.', faq, curtain: true, active: 'home', body: B => landingBody(B), script: null },
  { r: 'messages/demo', t: 'Démo guidée de LeadMessage en 60 secondes', d: 'De l\'import du fichier au parcours de messages exporté : la visite guidée interactive de LeadMessage, avec trois contacts fictifs.', active: 'demo', body: demoBody, script: 'lm-demo.js' },
  { r: 'messages/modeles', t: 'Modèles de séquences de prospection : mails et messages LinkedIn', d: 'Quatre séquences à copier : premier contact B2B, après un salon, chasse de profils, invitation à un webinaire. Mails 1 à 3 et messages LinkedIn.', active: 'modeles', body: modelesBody, script: null },
  { r: 'messages/cas', t: 'Cas d\'usage de LeadMessage : agences, commerciaux, indépendants, recrutement', d: 'Quatre façons d\'utiliser un parcours de messages personnalisé par prospect : agences, équipes commerciales, indépendants, recrutement et événements.', active: 'cas', body: casIndexBody, script: null },
  ...Object.entries(LMCAS).map(([k, v]) => ({ r: 'messages/cas/' + k, t: v.t + ' : parcours de messages personnalisés', d: v.s + ' ' + v.lead, active: 'cas', article: true, body: B => casBody(B, k), script: null }))
];

module.exports = { routes, shell, faq };
