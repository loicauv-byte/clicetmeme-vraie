/* ===== Numérique & Vous — comportements partagés (toutes les pages) ===== */

/* ===== Header + barre de progression ===== */
(function(){
  var header=document.getElementById('header');
  var progress=document.getElementById('progress');
  var topbar=document.getElementById('topbar');
  if(!header) return;
  window.addEventListener('scroll',function(){
    header.classList.toggle('scrolled',window.scrollY>40);
    if(topbar) topbar.classList.toggle('hidden',window.scrollY>40);
    if(progress){
      var h=document.documentElement;
      progress.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
    }
  },{passive:true});
})();

/* ===== Menu overlay mobile ===== */
(function(){
  var burger=document.getElementById('burger');
  var menu=document.getElementById('menu');
  if(!burger||!menu) return;
  function toggleMenu(force){
    var open=force!==undefined?force:!menu.classList.contains('open');
    menu.classList.toggle('open',open);
    burger.classList.toggle('open',open);
    burger.setAttribute('aria-expanded',open);
    document.body.style.overflow=open?'hidden':'';
  }
  burger.addEventListener('click',function(){toggleMenu()});
  menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){toggleMenu(false)})});
})();

/* ===== Reveals au scroll ===== */
(function(){
  var els=document.querySelectorAll('.reveal, .section-head');
  if(!els.length) return;
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target)}
    });
  },{threshold:.15});
  els.forEach(function(el){io.observe(el)});
})();

/* ===== FAQ accordéon ===== */
(function(){
  var items=document.querySelectorAll('.faq-q');
  if(!items.length) return;
  items.forEach(function(btn){
    var plus=btn.querySelector('.plus');
    if(plus) plus.textContent='+';
    btn.addEventListener('click',function(){
      var item=btn.parentElement;
      var answer=item.querySelector('.faq-a');
      var isOpen=item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight=null;
        o.querySelector('.faq-q').setAttribute('aria-expanded','false');
      });
      if(!isOpen){
        item.classList.add('open');
        answer.style.maxHeight=answer.scrollHeight+'px';
        btn.setAttribute('aria-expanded','true');
      }
    });
  });
})();

/* ===== Marquee : duplication pour boucle infinie ===== */
(function(){
  var track=document.getElementById('marqueeTrack');
  if(!track) return;
  track.innerHTML+=track.innerHTML;
})();
