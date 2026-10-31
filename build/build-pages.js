// Génère les pages HTML statiques (cas d'usage, ressources, templates, outils, comparatif),
// assets/site.css, sitemap.xml et robots.txt à partir de index.html et de build/pages-render.js.
// Usage : node build/build-pages.js   (à relancer après toute modification du CSS d'index.html ou des contenus)
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const SITE = 'https://stanislas35.github.io/leadpage-frontend/';
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

// 1. CSS partagé : tous les <style> de index.html
const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('\n');
fs.mkdirSync(path.join(ROOT, 'assets'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'assets/site.css'), css);

// 2. Rendu des pages via le même code que l'ancien routeur
const els = {};
const el = id => els[id] || (els[id] = { innerHTML: '', classList: { contains: () => true }, scrollIntoView() {} });
const ctx = { document: { getElementById: el, title: '', querySelector: () => null, querySelectorAll: () => [] },
  window: { scrollTo() {} }, location: { hash: '' }, navigator: {}, showScreen() {}, addEventListener() {}, console };
ctx.lpPageTitle = () => {};
ctx.lpFooterHTML = () => FOOTER;
const FOOTER = '<footer class="pgf"><div class="pgf-in"><div><span class="pgl">Lead<i>Page</i></span><p style="margin-top:10px">Un document personnalisé par prospect, avec mesure de lecture.</p></div>' +
  '<div><b>Cas d\'usage</b><a href="#/cas/agences">Agences et prestataires</a><a href="#/cas/commerciaux">Équipes commerciales</a><a href="#/cas/consultants">Consultants</a><a href="#/cas/recrutement">Recrutement et événements</a></div>' +
  '<div><b>Ressources</b><a href="#/ressources">Livres blancs</a><a href="#/templates">Templates de mails</a><a href="#/outils">Outils gratuits</a><a href="#/comparatif">Comparatif</a></div>' +
  '<div><b>LeadPage</b><a href="§B§#lp-pricing">Tarifs</a><a href="§B§#lp-faq">FAQ</a><a href="§B§#connexion">Connexion</a></div></div><small>© 2026 LeadPage · Édité par Devoleads, La Rochelle</small></footer>';
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'pages-render.js'), 'utf8').replace(/addEventListener\('hashchange'[^\n]*\n?/, '') + '\n;this.__CAS=CAS;this.__GUIDES=GUIDES;', ctx);
const CAS = ctx.__CAS, GUIDES = ctx.__GUIDES;

const routes = [
  { r: 'cas', t: "Cas d'usage : agences, commerciaux, consultants", d: "Quatre façons d'utiliser LeadPage : agences et prestataires B2B, équipes commerciales, consultants, recrutement et événements." },
  ...Object.entries(CAS).map(([k, v]) => ({ r: 'cas/' + k, t: v.t, d: v.s, article: true })),
  { r: 'ressources', t: 'Livres blancs et guides de prospection B2B', d: 'Personnalisation, mesure de lecture, préparation du CSV, délivrabilité : des méthodes pratiques pour mieux prospecter.' },
  ...Object.entries(GUIDES).map(([k, v]) => ({ r: 'ressources/' + k, t: v.t, d: v.s, article: true })),
  { r: 'templates', t: 'Templates de mails de prospection', d: 'Quatre modèles de mails à copier pour accompagner un document personnalisé : premier contact, relances, invitation.' },
  { r: 'outils', t: 'Outils gratuits pour préparer vos campagnes', d: 'Vérificateur de colonnes CSV, objets de mail, volume d\'envoi, SPF DKIM DMARC.' },
  { r: 'comparatif', t: "LeadPage et votre outil d'envoi : complémentaires", d: "LeadPage ne remplace ni l'outil de sourcing ni l'outil d'envoi : il ajoute le document personnalisé et la mesure de lecture." },
];

const brand = (html.match(/<div class="nav-logo"[^>]*>([\s\S]*?)<\/div>\s*<div class="nav-links"/) || [])[1] || 'LeadPage';
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const fix = (s, B) => s
  .replace(/href="#\/(cas|ressources)\/([\w-]+)"/g, (m, a, b) => `href="${B}${a}/${b}/"`)
  .replace(/href="#\/(cas|ressources|templates|outils|comparatif)"/g, (m, a) => `href="${B}${a}/"`)
  .replace(/href="#" onclick="goToDashboardOrAuth\(\);return false"/g, `href="${B}#connexion"`)
  .replace(/§B§/g, B);

for (const o of routes) {
  const depth = o.r.split('/').length, B = '../'.repeat(depth);
  ctx.location.hash = '#/' + o.r;
  vm.runInContext('lpRoutePages()', ctx);
  const body = fix(el('pg-body').innerHTML, B);
  const url = SITE + o.r + '/';
  const ld = o.article ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: o.t, description: o.d, inLanguage: 'fr', mainEntityOfPage: url, author: { '@type': 'Organization', name: 'Devoleads' }, publisher: { '@type': 'Organization', name: 'LeadPage' } })}</script>` : '';
  const page = `<!DOCTYPE html>
<html lang="fr" data-theme="light">
<head>
<script>try{var t=localStorage.getItem("lp_theme");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t)}catch(e){}</script>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(o.t)} | LeadPage</title>
<meta name="description" content="${esc(o.d)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#2B50FF"><meta name="color-scheme" content="light dark">
<meta property="og:type" content="${o.article ? 'article' : 'website'}"><meta property="og:title" content="${esc(o.t)} | LeadPage"><meta property="og:description" content="${esc(o.d)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${SITE}icon-512.png">
<link rel="icon" href="${B}favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="${B}apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${B}assets/site.css">
${ld}
</head>
<body>
<nav>
  <a class="nav-logo" href="${B}" style="text-decoration:none;color:inherit">${brand}</a>
  <div class="nav-links" id="nav-links">
    <a href="${B}#lp-how">Fonctionnement</a><a href="${B}#lp-measure">Mesure</a><a href="${B}cas/">Cas d'usage</a><a href="${B}ressources/">Ressources</a><a href="${B}#lp-pricing">Tarifs</a><a href="${B}#lp-faq">FAQ</a>
  </div>
  <div class="nav-right">
    <button id="theme-btn" aria-label="Changer de thème" title="Changer de thème">☾</button>
    <a class="btn btn-ghost" id="nav-login" href="${B}#connexion" style="text-decoration:none">Connexion</a>
    <a class="btn btn-primary" id="nav-signup" href="${B}#connexion" style="text-decoration:none">Essayer gratuitement</a>
  </div>
</nav>
<div id="pages" class="screen active"><div id="pg-body">${body}</div></div>
<script>(function(){var b=document.getElementById('theme-btn'),r=document.documentElement;function i(){b.textContent=r.getAttribute('data-theme')==='dark'?'☀':'☾'}i();b.onclick=function(){var n=r.getAttribute('data-theme')==='dark'?'light':'dark';r.setAttribute('data-theme',n);try{localStorage.setItem('lp_theme',n)}catch(e){}i()}})()</script>
</body></html>`;
  const dir = path.join(ROOT, o.r); fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page);
}

// 3. sitemap + robots
const today = new Date().toISOString().slice(0, 10);
const urls = [SITE, ...routes.map(o => SITE + o.r + '/')];
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.map(u => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n') + '\n</urlset>\n');
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}sitemap.xml\n`);
console.log(routes.length + ' pages générées');
