const sharedTranslations = {
  tagline: {tr:"DİJİTAL ASİSTANINIZ", en:"YOUR DIGITAL ASSISTANT"},
  nav1:{tr:"Ana Sayfa",en:"Home"}, nav2:{tr:"DentFlow",en:"DentFlow"},
  nav3:{tr:"Canlı Demo",en:"Live Demo"}, nav4:{tr:"Hakkımızda",en:"About"}, nav5:{tr:"İletişim",en:"Contact"},
  foot1:{tr:"KKTC ve Türkiye'deki diş klinikleri için geliştirildi.", en:"Built for dental clinics in Northern Cyprus and Türkiye."},
  foot2:{tr:"© 2026 DentFlow. Tüm hakları saklıdır.", en:"© 2026 DentFlow. All rights reserved."},
  footKoby:{tr:"KOBY SOFT markasıdır.", en:"A KOBY SOFT brand."},
  kobyTag:{tr:"Büyüyen işletmeler için <span class=\"hl\">akıllı çözümler.</span>", en:"<span class=\"hl\">Smart solutions</span> for growing businesses."},
  contactHead:{tr:"İletişim", en:"Contact"},
  kvkkLink:{tr:"KVKK / Gizlilik Politikası", en:"Privacy Policy (KVKK)"}
};

function initI18n(){
  const translations = Object.assign({}, sharedTranslations, window.pageTranslations || {});

  function setLang(lang){
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if(translations[key]){ el.innerHTML = translations[key][lang]; }
    });
    const btnTr = document.getElementById('btn-tr');
    const btnEn = document.getElementById('btn-en');
    if(btnTr) btnTr.classList.toggle('active', lang==='tr');
    if(btnEn) btnEn.classList.toggle('active', lang==='en');
  }

  const btnTr = document.getElementById('btn-tr');
  const btnEn = document.getElementById('btn-en');
  if(btnTr) btnTr.addEventListener('click', ()=>setLang('tr'));
  if(btnEn) btnEn.addEventListener('click', ()=>setLang('en'));
}

function initMobileMenu(){
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('nav.links');
  if(!menuBtn || !navLinks) return;
  menuBtn.addEventListener('click', ()=>{
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    menuBtn.textContent = isOpen ? '✕' : '☰';
  });
  navLinks.querySelectorAll('a').forEach(link=>{
    link.addEventListener('click', ()=>{
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.textContent = '☰';
    });
  });
  window.addEventListener('resize', ()=>{
    if(window.innerWidth > 900 && navLinks.classList.contains('open')){
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.textContent = '☰';
    }
  });
}

document.addEventListener('DOMContentLoaded', initI18n);
document.addEventListener('DOMContentLoaded', initMobileMenu);
