/* ===== Bandeau de consentement cookies — mode basique =====
   Aucun script Google n'est chargé tant que l'utilisateur n'a pas cliqué "Accepter"
   (ou n'a pas déjà un consentement "accepté" valide en mémoire). */
(function(){
  var STORAGE_KEY = 'nv_cookie_consent';
  var SIX_MONTHS_MS = 1000 * 60 * 60 * 24 * 182;
  var GADS_ID = 'AW-18206550386';
  var scriptInjected = false;

  function getStored(){
    try{
      var raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return null;
      var data = JSON.parse(raw);
      if(!data || !data.choice || !data.date) return null;
      if(Date.now() - new Date(data.date).getTime() > SIX_MONTHS_MS) return null;
      return data;
    }catch(e){
      return null;
    }
  }

  function store(choice){
    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify({choice:choice, date:new Date().toISOString()}));
    }catch(e){}
  }

  function clearStored(){
    try{ localStorage.removeItem(STORAGE_KEY); }catch(e){}
  }

  // Injecte gtag.js uniquement quand c'est appelé — jamais avant consentement.
  function loadGoogleAds(){
    if(scriptInjected) return;
    scriptInjected = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GADS_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GADS_ID);
    if(typeof window.__nvAdsAfterLoad === 'function'){
      window.__nvAdsAfterLoad();
    }
  }

  function hideBanner(){
    var el = document.getElementById('cookieBanner');
    if(el) el.remove();
  }

  function buildBanner(){
    if(document.getElementById('cookieBanner')) return;
    var el = document.createElement('div');
    el.className = 'cookie-banner';
    el.id = 'cookieBanner';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Gestion des cookies');
    el.innerHTML =
      '<div class="cookie-text">' +
        '<p>Ce site utilise des cookies de mesure publicitaire pour améliorer nos annonces. Vous pouvez accepter ou refuser.</p>' +
        '<a href="/mentions-legales" class="cookie-more">En savoir plus</a>' +
      '</div>' +
      '<div class="cookie-actions">' +
        '<button type="button" class="cookie-btn reject" id="cookieReject">Refuser</button>' +
        '<button type="button" class="cookie-btn accept" id="cookieAccept">Accepter</button>' +
      '</div>';
    document.body.appendChild(el);

    document.getElementById('cookieAccept').addEventListener('click', function(){
      store('granted');
      loadGoogleAds();
      hideBanner();
    });
    document.getElementById('cookieReject').addEventListener('click', function(){
      store('denied');
      hideBanner();
    });
  }

  function init(){
    var stored = getStored();
    if(stored && stored.choice === 'granted'){
      loadGoogleAds();
    } else if(stored && stored.choice === 'denied'){
      // Choix refusé et encore valide : rien à charger, pas de bandeau.
    } else {
      buildBanner();
    }
  }

  // Lien(s) "Gérer mes cookies" dans le footer : efface le choix et réaffiche le bandeau
  document.addEventListener('click', function(e){
    var target = e.target.closest && e.target.closest('.cookie-manage');
    if(target){
      e.preventDefault();
      clearStored();
      buildBanner();
    }
  });

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
