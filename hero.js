/* ===== Numérique & Vous — hero animé « Google en direct » (accueil) ===== */
(function(){
  var q=document.getElementById('nvQuery');
  var client=document.getElementById('nvClient');
  var notif=document.getElementById('nvNotif');
  var phone=document.getElementById('nvPhone');
  var screen=document.getElementById('nvScreen');
  if(!q||!client||!notif||!phone||!screen) return;
  var cards=[].slice.call(document.querySelectorAll('.nv-card'));
  var TEXT='plombier toulon';
  var wait=function(ms){return new Promise(function(r){setTimeout(r,ms)})};
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setPositions(clientFirst){
    cards.forEach(function(c){
      var start=+c.dataset.start;
      c.style.setProperty('--pos',clientFirst?(c===client?0:start+1):start);
    });
  }

  function finalState(){
    q.textContent=TEXT;
    cards.forEach(function(c){c.classList.add('show')});
    setPositions(true);
    client.classList.add('lift','rated');
    notif.classList.add('in');
  }

  if(reduced||!('IntersectionObserver' in window)){finalState();return}

  async function loop(){
    // réinitialisation
    screen.classList.remove('fade');
    q.textContent='';
    notif.classList.remove('in');
    client.classList.remove('lift','rated');
    cards.forEach(function(c){c.classList.remove('show')});
    setPositions(false);
    await wait(700);

    // 1. saisie de la recherche
    for(var i=0;i<TEXT.length;i++){q.textContent+=TEXT[i];await wait(75+Math.random()*60)}
    await wait(450);

    // 2. résultats
    for(var j=0;j<cards.length;j++){cards[j].classList.add('show');await wait(140)}
    await wait(1100);

    // 3. le client passe premier
    client.classList.add('lift');
    await wait(250);
    setPositions(true);
    await wait(950);
    client.classList.add('rated');
    await wait(900);

    // 4. la demande de devis arrive
    notif.classList.add('in');
    phone.classList.remove('buzz');void phone.offsetWidth;phone.classList.add('buzz');
    await wait(3800);

    // 5. fondu et recommence
    screen.classList.add('fade');
    await wait(700);
    loop();
  }

  // démarre seulement quand le téléphone est visible (économise la batterie sur mobile)
  var started=false;
  var io=new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting&&!started){started=true;io.disconnect();loop()}
  },{threshold:.3});
  io.observe(phone);
})();
