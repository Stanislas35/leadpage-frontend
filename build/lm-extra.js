// Guides, outils gratuits et index de ressources LeadMessage.
module.exports = function (ctx) {
  const { ROOT_URL, hero2, sec, finalCta, e } = ctx;
  const GUIDES = {
    'relance-sans-spam': { t: 'Relancer sans passer pour du spam', d: 'Combien de relances, avec quel angle, et comment laisser une sortie courtoise. Un guide pratique pour vos séquences de mails.', lead: 'Une relance utile apporte quelque chose de nouveau. Une relance qui répète le premier mail ferme la porte.',
      secs: [['Une relance, un angle nouveau', 'Le mail 2 ne dit pas « je reviens vers vous ». Il pose une question plus concrète, ou apporte un élément que le premier mail ne contenait pas : un exemple, un cas proche, une précision sur votre offre.'],
        ['Trois mails suffisent', 'Au-delà de trois mails sans réponse, le rendement baisse et le risque de plainte augmente. Un mail 1 complet, un mail 2 court, un mail 3 de quelques lignes.'],
        ['Laissez une sortie', 'Le dernier message peut demander la bonne personne à contacter, ou proposer de clore le sujet. Cette sortie courtoise obtient souvent plus de réponses que l\'insistance.'],
        ['Espacez les envois', 'Trois à quatre jours entre deux mails. Ne combinez pas un mail et un message LinkedIn le même jour au même contact.']],
      check: ['Chaque relance apporte un élément nouveau', 'Une seule question par message', 'Pas plus de trois mails sans réponse', 'Un dernier message qui laisse une sortie', 'Un lien de désinscription ou une mention d\'opposition si votre cadre l\'exige'] },
    'note-invitation-linkedin': { t: 'Écrire une note d\'invitation LinkedIn qui est acceptée', d: 'Longueur, contenu, ton : comment rédiger une note d\'invitation LinkedIn de 200 ou 300 caractères qui donne envie d\'accepter.', lead: 'Trois cents caractères au maximum, et seulement deux cents sur certains comptes. Chaque mot compte.',
      secs: [['Une raison précise d\'écrire', 'Mentionnez ce qui vous relie : le secteur, un événement, un sujet commun. Une invitation sans raison ressemble à une démarche automatique.'],
        ['Pas de pitch dans la note', 'La note sert à être accepté, pas à vendre. Gardez l\'offre pour le message qui suit l\'acceptation.'],
        ['Pas de lien', 'Un lien dans la note fait chuter l\'acceptation. Mettez-le, si besoin, dans le deuxième message.'],
        ['Vérifiez la limite de votre compte', 'Selon l\'abonnement, la note est limitée à 200 ou 300 caractères. LeadMessage vous laisse choisir la limite au lancement et raccourcit proprement les textes trop longs.']],
      check: ['Moins de 200 ou 300 caractères selon le compte', 'Une raison précise de se connecter', 'Aucune offre commerciale', 'Aucun lien', 'Signature réduite au prénom'] },
    'combien-de-messages': { t: 'Combien de messages, et à quel rythme ?', d: 'Un parcours de six messages sur dix jours : cadence conseillée entre mails et LinkedIn, et comment l\'ajuster à votre marché.', lead: 'Il n\'existe pas de rythme universel, mais un point de départ raisonnable évite de saturer vos contacts.',
      secs: [['Un parcours de six messages', 'Trois mails (60 à 90, 35 à 60, puis 25 à 45 mots), une invitation LinkedIn et deux messages LinkedIn. Cela couvre les deux canaux sans harceler.'],
        ['Cadence de départ', 'J0 : invitation et mail 1. J+3 : mail 2. J+4 : message LinkedIn 1 si l\'invitation est acceptée. J+7 : mail 3. J+9 : message LinkedIn 2.'],
        ['Ajustez selon votre marché', 'Dans les secteurs très sollicités, allongez les délais. Pour un événement à date fixe, resserrez-les autour de la date. Mesurez, puis corrigez.'],
        ['Respectez vos limites d\'envoi', 'Quelques dizaines de mails par jour sur une boîte récente, et les limites quotidiennes d\'invitations LinkedIn. LeadMessage prépare les textes, vous gardez la main sur les volumes.']],
      check: ['Six messages au maximum par contact', 'Trois à quatre jours entre deux mails', 'Un message LinkedIn seulement si l\'invitation est acceptée', 'Volume quotidien adapté à l\'ancienneté de la boîte', 'Un échantillon relu avant chaque envoi'] }
  };
  function guideBody(B, k) {
    const g = GUIDES[k];
    const others = Object.entries(GUIDES).filter(([x]) => x !== k).map(([x, o]) => `<a class="lm-chipl" href="${B}${ROOT_URL}ressources/${x}/">${o.t}</a>`).join('');
    return hero2('Guide', g.t, g.lead) + `<section class="lm-sec"><div class="lm-w lm-art">${g.secs.map(([h, t]) => `<h2>${h}</h2><p>${t}</p>`).join('')}
      <div class="lm-callout">Besoin d'un point de départ ? Les <a href="${B}${ROOT_URL}modeles/">modèles de séquences</a> reprennent ces règles.</div>
      <h2>Liste de contrôle</h2><ul class="lm-check">${g.check.map(c => `<li>${c}</li>`).join('')}</ul>
      <h3 style="margin-top:34px">Autres guides</h3><div class="lm-chips">${others}<a class="lm-chipl" href="${B}${ROOT_URL}outils/">Outils gratuits</a></div></div></section>` +
      finalCta(B, 'Appliquez ces règles sur tout votre fichier', 'LeadMessage les intègre à chaque message. Cinq contacts offerts.');
  }
  function ressourcesBody(B) {
    const M = B + ROOT_URL;
    return hero2('Ressources', 'Guides et outils pour vos séquences', 'Des repères concrets pour écrire, planifier et envoyer, sans compte.') +
      sec('', 'Guides', null, `<div class="lm-grid3">${Object.entries(GUIDES).map(([k, g]) => `<a class="lm-card lm-link-card lm-rv" href="${M}ressources/${k}/"><h3>${g.t}</h3><p>${g.lead}</p><span class="lm-go">Lire le guide →</span></a>`).join('')}</div>`) +
      sec('', 'Outils gratuits', null, `<div class="lm-grid3 two"><a class="lm-card lm-link-card lm-rv" href="${M}outils/compteur-caracteres/"><h3>Compteur de caractères</h3><p>Vérifiez une note d'invitation LinkedIn ou un mail en direct.</p><span class="lm-go">Ouvrir →</span></a><a class="lm-card lm-link-card lm-rv" href="${M}outils/planificateur-sequence/"><h3>Planificateur de séquence</h3><p>Calculez les dates de chaque message à partir du jour de lancement.</p><span class="lm-go">Ouvrir →</span></a></div>`, null, true) +
      sec('', 'Modèles', null, `<p><a class="lm-btn" href="${M}modeles/">Voir les quatre séquences</a></p>`) +
      finalCta(B, 'Passez de la théorie à votre fichier', 'Cinq contacts offerts, sans carte bancaire.');
  }
  const counterBody = B => hero2('Outil gratuit', 'Compteur de caractères LinkedIn et mail', 'Collez votre texte et vérifiez la limite, en direct. Rien n\'est envoyé : le calcul se fait dans votre navigateur.') +
    sec('', 'Votre texte', null, `<div class="lm-tool"><label for="ct-t" style="font-weight:600;display:block;margin-bottom:8px">Texte à vérifier</label><textarea id="ct-t" placeholder="Bonjour Camille, je travaille avec des marques de mobilier…"></textarea>
    <div class="lm-meter" id="ct-m" aria-live="polite"></div></div><p class="lm-note">Limites : note d'invitation 300 caractères (200 sur certains comptes), message 1 de 400, message 2 de 350. Mail 1 : 60 à 90 mots.</p>`, null) +
    finalCta(B, 'Laissez LeadMessage respecter les limites', 'Chaque texte est rédigé et ajusté pour son canal.');
  const plannerBody = B => hero2('Outil gratuit', 'Planificateur de dates de séquence', 'Choisissez le jour de lancement : les dates de chaque message se calculent, week-ends exclus.') +
    sec('', 'Votre calendrier', null, `<div class="lm-tool"><label for="pl-d" style="font-weight:600;display:block;margin-bottom:8px">Jour de lancement</label><input id="pl-d" type="date" style="max-width:240px"><ul class="lm-sched" id="pl-o" aria-live="polite"></ul></div><p class="lm-note">Cadence de départ : J0 invitation et mail 1, J+3 mail 2, J+4 message 1, J+7 mail 3, J+9 message 2. Un message tombant un week-end passe au lundi.</p>`, null) +
    finalCta(B, 'Préparez les textes de toute la séquence', 'Cinq contacts offerts, sans carte bancaire.');
  const routes = [
    { r: 'messages/ressources', t: 'Ressources LeadMessage : guides et outils de prospection', d: 'Guides pratiques sur la relance, la note d\'invitation LinkedIn et le rythme d\'une séquence, plus deux outils gratuits.', active: 'res', body: ressourcesBody },
    ...Object.entries(GUIDES).map(([k, g]) => ({ r: 'messages/ressources/' + k, t: g.t, d: g.d, active: 'res', article: true, body: B => guideBody(B, k) })),
    { r: 'messages/outils', t: 'Outils gratuits LeadMessage', d: 'Compteur de caractères LinkedIn et mail, planificateur de dates de séquence.', active: 'res', body: ressourcesBody },
    { r: 'messages/outils/compteur-caracteres', t: 'Compteur de caractères LinkedIn et mail', d: 'Vérifiez en direct la longueur d\'une note d\'invitation LinkedIn, d\'un message ou d\'un mail.', active: 'res', body: counterBody, script: 'lm-tools.js' },
    { r: 'messages/outils/planificateur-sequence', t: 'Planificateur de dates de séquence de prospection', d: 'Calculez les dates de vos mails et messages LinkedIn à partir du jour de lancement, week-ends exclus.', active: 'res', body: plannerBody, script: 'lm-tools.js' }
  ];
  return { routes };
};
