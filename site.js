// Shared site behaviors (analytics, link wiring, year stamp)
(function(){
  const GITHUB_URL = 'https://github.com/francoxlam/proofant';

  function byId(id){ return document.getElementById(id); }

  function setYear(){
    var el = byId('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  function wireGitHubLinks(){
    ['getstarted-link','top-github-link','second-bottom-github-link','bottom-github-link','m-cta','gh']
      .map(byId)
      .filter(Boolean)
      .forEach(function(a){ a.href = GITHUB_URL; });
  }

  function onLinkClick(e){
    var a = e.target.closest('a');
    if (!a) return;
    if (!('gtag' in window)) return;

    // Track only links we explicitly mark, to avoid noise
    var tag = a.getAttribute('data-track');
    if (!tag) return;

    window.gtag('event','link_click',{
      event_category: 'nav',
      event_label: tag,
      link_text: (a.textContent || '').trim(),
      link_url: a.href
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    setYear();
    wireGitHubLinks();
    document.addEventListener('click', onLinkClick, {capture:true});
  });
})();
