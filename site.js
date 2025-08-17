(function() {
  // Year
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  // Simple "copy code" helper
  document.querySelectorAll('[data-copy]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var sel = btn.getAttribute('data-copy');
      var el = document.querySelector(sel);
      if (!el) return;
      var text = el.innerText || el.textContent || '';
      navigator.clipboard.writeText(text).then(function(){
        btn.textContent = 'Copied';
        setTimeout(function(){ btn.textContent = 'Copy'; }, 1400);
      });
    });
  });

  // Console URL management (defaults to localhost)
  var defaultConsole = 'http://localhost:8008/';
  function getConsoleURL(){
    try { return localStorage.getItem('proofant.console.url') || defaultConsole; }
    catch(_) { return defaultConsole; }
  }
  function setConsoleURL(url){
    try {
      if (url && !/^\w+:\/\//.test(url)) url = 'http://' + url;
      if (url && !url.endsWith('/')) url += '/';
      localStorage.setItem('proofant.console.url', url);
      applyConsoleURL(url);
    } catch(_) {}
  }
  function applyConsoleURL(url){
    ['open-console-header','open-console-hero','open-console-cta','open-console-docs'].forEach(function(id){
      var a = document.getElementById(id); if (a) a.href = url;
    });
  }
  applyConsoleURL(getConsoleURL());

  // Button to set Console URL
  var setBtn = document.getElementById('set-console-url');
  if (setBtn) {
    setBtn.addEventListener('click', function(){
      var cur = getConsoleURL();
      var next = prompt('Console URL (e.g., http://localhost:8008/):', cur);
      if (!next) return;
      setConsoleURL(next.trim());
      alert('Console URL set to: ' + getConsoleURL());
    });
  }
})();
