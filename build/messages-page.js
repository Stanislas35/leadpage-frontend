// Page autonome LeadMessage : un univers à part (logo, rouge), tout sur une seule landing page.
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

module.exports = function page(B, SITE) {
  const url = SITE + 'messages/';
  const t = 'LeadMessage : une séquence de mails et de messages LinkedIn par prospect';
  const d = 'Mail 1, 2 et 3, invitation et messages LinkedIn rédigés pour chaque prospect à partir de votre fichier CSV. Vous choisissez le parcours, 1 crédit par contact.';
  const ld = `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) })}</script>`;
  const e = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const navLinks = `<a href="#parcours">Parcours</a><a href="#comment">Fonctionnement</a><a href="#export">Export</a><a href="#tarifs">Tarifs</a><a href="#faq">FAQ</a>`;
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${e(t)}</title>
<meta name="description" content="${e(d)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#E4332E"><meta name="color-scheme" content="light">
<meta property="og:type" content="website"><meta property="og:title" content="${e(t)}"><meta property="og:description" content="${e(d)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${SITE}icon-512.png">
<link rel="icon" href="${B}favicon-lm.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${B}assets/lm.css">
${ld}
</head>
<body class="lm">
<div class="lm-curtain" aria-hidden="true"><img src="${B}logo-lm.svg" alt=""></div>
<header class="lm-nav"><div class="lm-w">
  <a class="lm-brand" href="${B}messages/" aria-label="LeadMessage"><img src="${B}logo-lm.svg" alt="">Lead<b>Message</b></a>
  <nav class="lm-links" aria-label="Sections">${navLinks}</nav>
  <div class="lm-right">
    <div class="lm-uni" aria-label="Changer d'univers"><a href="${B}">LeadPage</a><span class="on">LeadMessage</span></div>
    <a class="lm-login" href="${B}#connexion">Connexion</a>
    <a class="lm-btn sm" href="${B}#connexion">Essayer</a>
  </div>
</div></header>

<main>
<section class="lm-hero"><div class="lm-w">
  <div>
    <span class="lm-tag">Nouveau : le parcours de messages par prospect</span>
    <h1>Un parcours de messages écrit pour <em>chaque prospect</em></h1>
    <p class="lead">Mails 1, 2 et 3, invitation et messages LinkedIn : vous choisissez le parcours, LeadMessage rédige chaque texte à partir de votre fichier. Prêt à importer dans votre outil d'envoi.</p>
    <div class="row"><a class="lm-btn wh" href="${B}#connexion">Essayer gratuitement</a><a class="lm-btn ghost" style="color:#fff;border-color:rgba(255,255,255,.7)" href="#parcours">Composer mon parcours</a></div>
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
  <div class="lm-price">${pk.map(k => `<div class="lm-pk${k[5] ? ' feat' : ''} lm-rv">${k[5] ? '<span class="bd">Le plus choisi</span>' : ''}<h3>${k[0]}</h3><p class="amt">${k[1]} <small>${k[2]}</small></p><p class="ct">${k[3]}</p><ul>${k[4].map(x => `<li>${x}</li>`).join('')}</ul><a class="lm-btn${k[5] ? '' : ' ghost'}" style="text-align:center" href="${B}#connexion">${k[6]}</a></div>`).join('')}</div>
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
  <a class="lm-btn" href="${B}#connexion">Essayer gratuitement</a>
</section>
<p class="lm-cross">Vous préférez un document personnalisé avec mesure de lecture ? <a href="${B}">Découvrir LeadPage</a></p>
</main>

<footer class="lm-foot"><div class="lm-w">
  <div><a class="lm-brand" href="${B}messages/"><img src="${B}logo-lm.svg" alt="">Lead<b>Message</b></a><p style="max-width:300px;margin:10px 0 0">Un parcours de messages personnalisé par prospect.</p></div>
  <div><b>Produits</b><a href="${B}">LeadPage</a><a href="${B}messages/">LeadMessage</a><a href="${B}demo/">Démo LeadPage</a></div>
  <div><b>Ressources</b><a href="${B}templates/">Templates de mails</a><a href="${B}outils/">Outils gratuits</a><a href="${B}ressources/">Livres blancs</a></div>
  <div><b>Confiance</b><a href="${B}legal/mentions-legales/">Mentions légales</a><a href="${B}legal/confidentialite/">Confidentialité</a><a href="${B}legal/cgv/">CGV et CGU</a><a href="${B}legal/cookies/">Cookies</a><a href="${B}legal/donnees-et-securite/">Données et sécurité</a></div>
  <small>© 2026 LeadMessage, un produit LeadPage · Édité par Devoleads, La Rochelle</small>
</div></footer>
<script src="${B}assets/lm.js" defer></script>
</body></html>`;
};
module.exports.faq = faq;
