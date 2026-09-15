 
/* ==========================================================================
   HORSE ESTÉTICA AUTOMOTIVA — script.js
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Data source (services) ---------------- */
  const SERVICES = [
    { id:'lavagem',      name:'Lavagem Completa',            icon:'fa-droplet',        desc:'Lavagem externa e interna detalhada, com produtos que preservam o brilho da pintura.', time:'50 min',  price:120, cat:'lavagem' },
    { id:'higienizacao', name:'Higienização Interna',         icon:'fa-spray-can-sparkles', desc:'Limpeza profunda de bancos, forros, tapetes e painel, com higienização bacteriológica.', time:'2h',    price:250, cat:'lavagem' },
    { id:'polimento',    name:'Polimento Técnico',            icon:'fa-gem',            desc:'Remoção de riscos e microrriscos, devolvendo profundidade e brilho ao acabamento.', time:'1 dia',  price:450, cat:'polimento' },
    { id:'cristalizacao',name:'Cristalização',                icon:'fa-snowflake',      desc:'Camada de proteção com brilho intenso e repelência à água, ideal para manutenção periódica.', time:'3h', price:280, cat:'vitrificacao' },
    { id:'vitrificacao', name:'Vitrificação',                 icon:'fa-shield-halved',  desc:'Proteção de vidro líquido de alta durabilidade, com brilho e resistência superiores.', time:'1 dia',  price:900, cat:'vitrificacao' },
    { id:'ppf',          name:'PPF (Paint Protection Film)',  icon:'fa-layer-group',    desc:'Proteção invisível de alta performance, com auto regeneração de microrriscos e brilho intenso — a pintura fica blindada sem perder o aspecto original.', time:'2 dias', price:2200, cat:'ppf' },
    { id:'farois',       name:'Revitalização de Faróis',      icon:'fa-lightbulb',      desc:'Remoção do amarelamento e opacidade, recuperando a transparência original dos faróis.', time:'1h',   price:180, cat:'polimento' },
    { id:'motor',        name:'Limpeza de Motor',             icon:'fa-gear',           desc:'Limpeza segura do compartimento do motor, sem riscos aos componentes elétricos.', time:'45 min', price:150, cat:'lavagem' },
    { id:'ceramica',     name:'Proteção Cerâmica',            icon:'fa-circle-half-stroke', desc:'Coating cerâmico de longa duração com proteção contra raios UV e agentes químicos.', time:'1 dia', price:1200, cat:'vitrificacao' },
    { id:'premium',      name:'Estética Premium',             icon:'fa-star',           desc:'Pacote completo: lavagem, higienização, polimento e proteção em um único atendimento.', time:'2 dias', price:1600, cat:'antes-depois' },
  ];

  const money = v => v.toLocaleString('pt-BR', { style:'currency', currency:'BRL', maximumFractionDigits:0 });

  /* ---------------- Render service cards ---------------- */
  const grid = document.getElementById('servicesGrid');
  if (grid){
    grid.innerHTML = SERVICES.map((s,i) => `
      <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${(i%3)*100}">
        <div class="service-card">
          <div class="thumb"><i class="fa-solid ${s.icon}"></i></div>
          <div class="body">
            <h4>${s.name}</h4>
            <p>${s.desc}</p>
            <a href="#agendamento" class="card-cta">Agendar <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
      </div>`).join('');
  }

  /* ---------------- Render spec table ---------------- */
  const specBody = document.getElementById('specTableBody');
  if (specBody){
    specBody.innerHTML = SERVICES.map(s => `
      <tr>
        <td>${s.name}</td>
        <td class="desc">${s.desc}</td>
        <td>${s.time}</td>
        <td><a href="#agendamento" class="btn-neon btn-row">Agendar</a></td>
      </tr>`).join('');
  }

  /* ---------------- Gallery (masonry + filter + lightbox) ---------------- */
  const GALLERY = [
    { cat:'antes-depois', label:' ', h:260, img:'assets/img/galeria/beje4k.jpg', },
    { cat:'ppf', label:'', h:320,img: 'assets/img/galeria/polimento-porshe.jpeg',},
    { cat:'polimento',     label:' ', h:220, img:'assets/img/galeria/bmw4k.jpg',}, 
    { cat:'lavagem',       label:' ', h:300, img: 'assets/img/galeria/rs34k.png',},
    { cat:'vitrificacao',  label:' ', h:260, img:'assets/img/galeria/sandero4k.jpg', },
    { cat:'antes-depois',  label:' ', h:220, img:'assets/img/galeria/mercedes4k.png', },
    { cat:'ppf',           label:'', h:280, img:'assets/img/galeria/interna_mercedes4k.png', },
    { cat:'polimento',     label:' ', h:320, img:'assets/img/galeria/audi4k.png', },
    { cat:'vitrificacao',  label:' ', h:240, img:'assets/img/galeria/carpete4k.jpg', },
  ];
  const masonry = document.getElementById('masonryGrid');
  if (masonry){
   masonry.innerHTML = GALLERY.map((g,i) => `
      <div class="masonry-item" data-cat="${g.cat}" data-caption="${g.label}" data-img="${g.img || ''}">
        <div class="ph" style="height:${g.h}px${g.img ? `;background-image:url('${g.img}');background-size:cover;background-position:center;` : ''}">
          ${g.img ? '' : '<i class="fa-solid fa-car-side"></i>'}
        </div>
        <div class="cap"><span>${g.label}</span></div>
      </div>`).join('');
    };
    {
    const lightbox = document.getElementById('lightbox');
    const lbCaption = document.getElementById('lbCaption');
    const lbPh = document.querySelector('#lightbox .lb-ph');
    masonry.addEventListener('click', e => {
      const item = e.target.closest('.masonry-item');
      if(!item) return;
      lbCaption.textContent = item.dataset.caption;
      if (item.dataset.img){
        lbPh.style.backgroundImage = `url('${item.dataset.img}')`;
        lbPh.style.backgroundSize = 'cover';
        lbPh.style.backgroundRepeat = 'no-repeat';
        lbPh.style.backgroundPosition = 'center';
        lbPh.innerHTML = '';
      } else {
        lbPh.style.backgroundImage = '';
        lbPh.innerHTML = '<i class="fa-solid fa-car-side" style="font-size:3rem;color:var(--neon)"></i>';
      }
      lightbox.classList.add('open');
    });
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox || e.target.closest('.lb-close')) lightbox.classList.remove('open');
    });
    document.addEventListener('keydown', e => { if(e.key === 'Escape') lightbox.classList.remove('open'); });
  
  }

  /* ---------------- Before / After slider ---------------- */
  const baSlider = document.getElementById('baSlider');
  if (baSlider){
    const range  = document.getElementById('baRange');
    const after  = document.getElementById('baAfter');
    const handle = document.getElementById('baHandle');
    const update = v => {
      after.style.clipPath = `inset(0 0 0 ${v}%)`;
      handle.style.left = `${v}%`;
      handle.style.transform = 'translateX(-50%)';
    };
    update(50);
    range.addEventListener('input', e => update(e.target.value));
  }

  /* ---------------- Quote calculator ---------------- */
  const vehicleMultiplier = { hatch:1, sedan:1.15, suv:1.4, pickup:1.5 };
  const quoteVehicle = document.getElementById('quoteVehicle');
  const quoteService = document.getElementById('quoteService');
  const quotePrice = document.getElementById('quotePrice');
  const quoteTime = document.getElementById('quoteTime');
  const quoteWhatsApp = document.getElementById('quoteWhatsApp');

  function updateQuote(){
    if (!quoteVehicle) return;
    const svc = SERVICES.find(s => s.id === quoteService.value) || SERVICES[0];
    const mult = vehicleMultiplier[quoteVehicle.value] || 1;
    const estLow = Math.round((svc.price * mult) * 0.9 / 10) * 10;
    const estHigh = Math.round((svc.price * mult) * 1.1 / 10) * 10;
    quotePrice.textContent = `${money(estLow)} – ${money(estHigh)}`;
    quoteTime.textContent = svc.time;

    const vehicleLabel = quoteVehicle.options[quoteVehicle.selectedIndex].text;
    const msg = encodeURIComponent(`Olá! Gostaria de um orçamento para: ${svc.name} em um ${vehicleLabel}. Faixa estimada no site: ${money(estLow)} a ${money(estHigh)}.`);
    quoteWhatsApp.href = `https://wa.me/5541995850180?text=${msg}`;
  }
  if (quoteVehicle){
    quoteVehicle.addEventListener('change', updateQuote);
    quoteService.addEventListener('change', updateQuote);
    updateQuote();
  }

  /* ---------------- Booking form (demo submit) ---------------- */
  const bookingForm = document.getElementById('bookingForm');
  bookingForm.addEventListener('submit', e => {
      e.preventDefault();
      if (!bookingForm.checkValidity()){
        bookingForm.classList.add('was-validated');
        return;
      }

      const nome     = document.getElementById('bknome').value;
      const telefone = document.getElementById('bktelefone').value;
      const whats    = document.getElementById('bkwhats').value;
      const email    = document.getElementById('bkemail').value;
      const carro    = document.getElementById('bkcarro').value;
      const placa    = document.getElementById('bkplaca').value;
      const servico  = document.getElementById('bkservico').value;
      const data     = document.getElementById('bkdata').value;
      const horario  = document.getElementById('bkhorario').value;
      const obs      = document.getElementById('bkobs').value;

      const texto = `*Novo agendamento pelo site*%0A`
        + `Nome: ${nome}%0A`
        + `Telefone: ${telefone}%0A`
        + `WhatsApp: ${whats}%0A`
        + `E-mail: ${email}%0A`
        + `Carro: ${carro}%0A`
        + `Placa: ${placa}%0A`
        + `Serviço: ${servico}%0A`
        + `Data: ${data}%0A`
        + `Horário: ${horario}%0A`
        + `Observações: ${obs || '-'}`;

      window.open(`https://wa.me/5541995850180?text=${texto}`, '_blank');

      document.getElementById('formSuccess').classList.add('show');
      bookingForm.reset();
      bookingForm.classList.remove('was-validated');
    });
    

  /* ---------------- Animated counters ---------------- */
  const stats = document.querySelectorAll('.stat-num');
  const animateCount = el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (stats.length){
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          animateCount(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .6 });
    stats.forEach(el => io.observe(el));
  }

  /* ---------------- Sweep signature trigger ---------------- */
  const sweepEls = document.querySelectorAll('.sweep');
  if (sweepEls.length){
    const sweepIO = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('sweep-active');
          setTimeout(() => entry.target.classList.remove('sweep-active'), 1300);
        }
      });
    }, { threshold:.4 });
    sweepEls.forEach(el => sweepIO.observe(el));
    setInterval(() => {
      sweepEls.forEach(el => {
        if (isInViewport(el)){
          el.classList.add('sweep-active');
          setTimeout(() => el.classList.remove('sweep-active'), 1300);
        }
      });
    }, 6000);
  }
  function isInViewport(el){
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  }

  /* ---------------- Header scroll state ---------------- */
  const header = document.getElementById('site-header');
  const backToTop = document.getElementById('backToTop');
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    backToTop.classList.toggle('show', y > 500);
  };
  document.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
  backToTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

  /* ---------------- Collapse mobile menu on link click ---------------- */
  const navMenu = document.getElementById('navMenu');
  navMenu.querySelectorAll('.nav-link, .nav-cta a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show')){
        bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
      }
    });
  });

  /* ---------------- Active nav link on scroll ---------------- */
  const sections = ['sobre','servicos','galeria','depoimentos','faq','contato'].map(id => document.getElementById(id)).filter(Boolean);
  const navLinks = document.querySelectorAll('.nav-link');
  const navIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin:'-45% 0px -50% 0px' });
  sections.forEach(s => navIO.observe(s));

  /* ---------------- Footer year ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Preloader ---------------- */
  window.addEventListener('load', () => {
    const pre = document.getElementById('preloader');
    setTimeout(() => pre.classList.add('hide'), 350);
  });

  /* ---------------- AOS init ---------------- */
  if (window.AOS) AOS.init({ duration:700, once:true, offset:60, easing:'ease-out-cubic' });

  /* ---------------- Testimonials swiper ---------------- */
  if (window.Swiper){
    new Swiper('#testiSwiper', {
      slidesPerView:1,
      spaceBetween:24,
      loop:true,
      autoplay:{ delay:4500, disableOnInteraction:false },
      pagination:{ el:'.swiper-pagination', clickable:true },
           breakpoints:{
        768:{ slidesPerView:2 },
        1200:{ slidesPerView:3 }
      }
    });
  }

});
