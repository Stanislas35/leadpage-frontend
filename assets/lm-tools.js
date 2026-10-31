(function () {
  var t = document.getElementById('ct-t'), m = document.getElementById('ct-m');
  if (t && m) {
    var L = [['Note 300', 300], ['Note 200', 200], ['Message 1', 400], ['Message 2', 350]];
    var up = function () {
      var v = t.value, n = v.length, w = (v.trim().match(/\S+/g) || []).length, h = '<div><b>' + n + '</b>caractères</div><div><b>' + w + '</b>mots</div>';
      L.forEach(function (l) { var r = l[1] - n; h += '<div class="' + (r < 0 ? 'bad' : 'ok') + '"><b>' + (r < 0 ? Math.abs(r) + ' en trop' : r + ' restants') + '</b>' + l[0] + ' (' + l[1] + ')</div>'; });
      m.innerHTML = h;
    };
    t.addEventListener('input', up); up();
  }
  var d = document.getElementById('pl-d'), o = document.getElementById('pl-o');
  if (d && o) {
    var S = [['Invitation LinkedIn et mail 1', 0], ['Mail 2, relance', 3], ['Message LinkedIn 1 (si accepté)', 4], ['Mail 3, dernier message', 7], ['Message LinkedIn 2', 9]];
    var f = function (x) { return x.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }); };
    var go = function () {
      if (!d.value) { o.innerHTML = ''; return; }
      var b = new Date(d.value + 'T12:00:00');
      o.innerHTML = S.map(function (s) { var x = new Date(b); x.setDate(x.getDate() + s[1]); var w = x.getDay(); if (w === 6) x.setDate(x.getDate() + 2); else if (w === 0) x.setDate(x.getDate() + 1); return '<li><span>' + s[0] + '</span><b>' + f(x) + '</b></li>'; }).join('');
    };
    var n = new Date(); n.setDate(n.getDate() + 1); d.value = n.toISOString().slice(0, 10);
    d.addEventListener('input', go); go();
  }
})();
