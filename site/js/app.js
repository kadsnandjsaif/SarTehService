(function () {
  'use strict';

  // ========== НАСТРОЙКА ФОРМЫ: замените на ваш ID с https://formspree.io (часть после /f/) ==========
  const FORMSPREE_ID = 'YOUR_FORM_ID';

  const ICONS = {
    fridge: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="1"/><line x1="4" y1="10" x2="20" y2="10"/></svg>',
    washing: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>',
    boiler: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4l4 2v8l-4 2-4-2v-8l4-2V2z"/><circle cx="12" cy="12" r="2"/></svg>',
    dishwasher: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="1"/><path d="M2 8h20M6 12h4"/></svg>',
    microwave: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="1"/><path d="M6 8h12M6 12h8"/></svg>'
  };

  const APPLIANCES = [
    { id: 'refrigerator', name: 'Холодильники', icon: 'fridge', iconAlt: 'Ремонт холодильников в Саратове', services: ['найдем причину неисправности', 'замена или восстановление узла холодильника', 'поменяем фреон и проведем плановое обслуживание вашей техники'], guarantee: 'гаранития на работу от 1 года', serviceArea: 'выезд мастера в любой район Саратова и Энгельса' },
    { id: 'washing-machine', name: 'Стиральные машины', icon: 'washing', iconAlt: 'Ремонт стиральных машин в Саратове', services: ['проведем качественную диагностику', 'ремонт сломанных узлов и устранение протечек', 'чистка и плановое обслуживание стиральной машины'], guarantee: 'Мастер дает гарантию на технику и его работу от 1 года', serviceArea: 'Скорый приезд мастера в любую точку Саратова и Энгельса' },
    { id: 'boiler', name: 'Бойлеры', icon: 'boiler', iconAlt: 'Ремонт бойлеров в Саратове', services: ['быстро выявленим неисправности у вашей техники', 'полная реставрация или замена узла бойлера', 'чистка и плановое обслуживание со скидкой'], guarantee: 'Мастер подберет любое решение именно под ваш бюджет', serviceArea: 'выезд мастера в любой район Саратова и Энгельса' },
    { id: 'dishwasher', name: 'Посудомойки', icon: 'dishwasher', iconAlt: 'Ремонт посудомоек в Саратове', services: ['обнаружение причин поломки техники', 'восстановление старых узлов или замена на новые', 'чистка и плановое обслуживание вашей посудомойки'], guarantee: 'гаранития на работу от 1 года', serviceArea: 'выезд мастера в любой район Саратова и Энгельса' },
    { id: 'microwave', name: 'Микроволновые печи', icon: 'microwave', iconAlt: 'Ремонт микроволновых печей в Саратове', services: ['Выявление неисправности в вашей СВЧ', 'восстановление старых узлов или замена на новые детали', 'чистка и плановое обслуживание техники со скидкой'], guarantee: 'Гарантия на работу от 1 года со дня ремонта', serviceArea: 'выезд мастера в любой район Саратова и Энгельса' }
  ];

  const WHY_CARDS = [
    { id: 1, text: 'На рынке более 5 лет', description: 'Работаем с оригинальными запчастями. Качественный ремонт за разумный ценник. Ремонтируем технику LG, Samsung, Zanussi, Ariston, Indesit, Beko, Bosch, Atlant. С гарантией на запчасти от 2 лет.' },
    { id: 2, text: 'Используем только оригинальные и проверенные запчасти', description: 'Даем самую длительную гарантию в городе — от 2 лет. Работаем для вас в Саратове и области уже более 5 лет. Вашу технику обслуживают лучшие спецы по своим направлениям. После ремонта проводим контрольный тест работы техники.' },
    { id: 3, text: 'Проведем полную диагностику и предложим оптимальное решение', description: 'Работаем с оригинальными запчастями. Качественная и недорогая замена фреона и компрессора. Ремонтируем технику LG, Samsung, Zanussi, Ariston, Indesit, Beko, Bosch, Atlant. С гарантией на запчасти от 2 лет.' },
    { id: 4, text: 'Наши лучшие спецы — мастера с профильным образованием', description: 'Честная диагностика и фиксированная цена. За это время отремонтировали более 2000 единиц техники. Работаем во всех районах города без выходных.' },
    { id: 5, text: 'Качественный ремонт магнетронов, грилей и электронных плат', description: 'На рынке более 5 лет. Работаем с оригинальными запчастями. Ремонтируем технику LG, Samsung, Daewoo, Panasonic, BBK, Supra. Выезжаем во все районы Саратова и Энгельса. С гарантией на запчасти от 2 лет.' },
    { id: 6, text: 'Прочистка форсунок, ремонт насосов, замена уплотнителей', description: 'На рынке более 5 лет. Работаем с оригинальными запчастями. Ремонтируем технику Bosch, Siemens, Electrolux, Indesit, Beko. Работаем в Кировском, Ленинском, Заводском, Октябрьском, Волжском районах. С гарантией на запчасти от 2 лет.' }
  ];

  const FAQ_ITEMS = [
    { id: 1, question: 'Вы даете гарантию, если я закажу ремонт? Или это будет «на словах»?', answer: 'Конечно, даем. После ремонта вы получаете официальный гарантийный талон на работу и запчасти сроком от 2 лет. Но главное — чтобы не пришлось пользоваться гарантией часто, наш мастер во время диагностики обязательно проверит смежные узлы и даст рекомендации по профилактике. Часто небольшое обслуживание сейчас предотвращает дорогой ремонт в будущем.' },
    { id: 2, question: 'У меня сосед сам заменил деталь в стиральной машине, и она снова сломалась. Все таки вызвать мастера дешевле?', answer: 'Это частая ситуация. Современная техника — сложный организм. Поломка одного узла часто является следствием проблемы в другом. Мастер не просто меняет сгоревшую деталь, а находит первопричину. Например, замена насоса без проверки электроники может через месяц привести к выходу из строя платы управления, что в 3-5 раз дороже. Мы несем ответственность за весь ремонт, поэтому делаем его качественно.' },
    { id: 3, question: 'У меня холодильник стал хуже морозить, но пока работает. Можно подождать?', answer: 'Мы не рекомендуем. Такие симптомы — как раз тот случай, когда своевременный ремонт в 2-3 раза дешевле последствий. Скорее всего, есть утечка фреона или износ компрессора. Если компрессор будет работать «всухую», он перегреется и сгорит. Тогда вместо недорогой заправки потребуется дорогостоящая замена компрессора целиком. Мастер оценит риски и предложит оптимальное решение.' },
    { id: 4, question: 'Зачем нужно обслуживание, если техника работает? Мастер будет что-то навязывать?', answer: 'Мастер ничего не навязывает. Его задача — дать вам информацию для принятия решения. Регулярное обслуживание (раз в 1-2 года) — как техосмотр для автомобиля. Оно позволяет: 1) выявить износ деталей (например, трещину в патрубке стиральной машины) до того, как она порвется и зальет соседей; 2) почистить системы (от накипи в бойлере, пыли в холодильнике), что снижает нагрузку и экономит до 20% электроэнергии. Стоимость такого сервиса несопоставима с ценами на ремонт после внезапной поломки.' }
  ];

  function renderSliderCard(appliance) {
    const icon = ICONS[appliance.icon] || ICONS.fridge;
    const servicesHtml = appliance.services.map(s => `<li><span class="dot">•</span><span>${s}</span></li>`).join('');
    return `
      <article class="slider-card" itemscope itemtype="https://schema.org/Service">
        <div class="slider-card-bg" style="background: linear-gradient(135deg, rgba(249,115,22,0.08), rgba(255,247,237,0.5));"></div>
        <div class="slider-card-overlay"></div>
        <div class="slider-card-header">
          <div class="slider-card-body">
            <div class="slider-card-icon">${icon}</div>
            <ul class="slider-card-services">${servicesHtml}</ul>
          </div>
        </div>
        <div class="slider-card-footer">
          <p class="guarantee">${appliance.guarantee}</p>
          <p>${appliance.serviceArea}</p>
        </div>
      </article>
    `;
  }

  function initSlider() {
    const track = document.getElementById('slider-track');
    const iconsWrap = document.getElementById('appliance-icons');
    const dotsWrap = document.getElementById('slider-dots');
    if (!track || !iconsWrap) return;

    const slides = [APPLIANCES[APPLIANCES.length - 1], ...APPLIANCES, APPLIANCES[0]];
    let index = 1;
    let transitioning = false;
    let transitionEnabled = true;
    let autoPlay = true;
    let touchStart = null, touchEnd = null;
    const minSwipe = 50;

    track.innerHTML = slides.map(a => `<div class="slider-slide">${renderSliderCard(a)}</div>`).join('');

    iconsWrap.innerHTML = APPLIANCES.map((a, i) => {
      const icon = ICONS[a.icon] || ICONS.fridge;
      return `<button type="button" class="appliance-btn" data-index="${i}" aria-label="${a.name} - ${a.iconAlt}" aria-pressed="false">
        <span class="icon-wrap">${icon}</span>
        <span>${a.name}</span>
      </button>`;
    }).join('');

    dotsWrap.innerHTML = APPLIANCES.map((_, i) =>
      `<button type="button" class="slider-dot" data-index="${i}" aria-label="Перейти к слайду ${i + 1}"></button>`
    ).join('');

    const viewport = document.getElementById('slider-viewport');
    const updateUI = () => {
      track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
      const realIdx = ((index - 1) + APPLIANCES.length) % APPLIANCES.length;
      iconsWrap.querySelectorAll('.appliance-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === realIdx);
        btn.setAttribute('aria-pressed', i === realIdx);
      });
      dotsWrap.querySelectorAll('.slider-dot').forEach((btn, i) => {
        btn.classList.toggle('active', i === realIdx);
      });
    };

    const goNext = (manual) => {
      if (transitioning) return;
      if (manual) autoPlay = false;
      transitioning = true;
      index++;
      updateUI();
    };

    const goPrev = (manual) => {
      if (transitioning) return;
      if (manual) autoPlay = false;
      transitioning = true;
      index--;
      updateUI();
    };

    const onTransitionEnd = () => {
      transitioning = false;
      if (index === 0) {
        transitionEnabled = false;
        index = APPLIANCES.length;
        track.style.transition = 'none';
        updateUI();
        requestAnimationFrame(() => {
          track.style.transition = '';
          transitionEnabled = true;
        });
      } else if (index === slides.length - 1) {
        transitionEnabled = false;
        index = 1;
        track.style.transition = 'none';
        updateUI();
        requestAnimationFrame(() => {
          track.style.transition = '';
          transitionEnabled = true;
        });
      }
    };

    track.addEventListener('transitionend', onTransitionEnd);

    setInterval(() => {
      if (autoPlay) goNext(false);
    }, 5000);

    if (viewport) {
      viewport.addEventListener('mouseenter', () => { autoPlay = false; });
      viewport.addEventListener('mouseleave', () => { autoPlay = true; });
      viewport.addEventListener('touchstart', e => { touchEnd = null; touchStart = e.touches[0].clientX; });
      viewport.addEventListener('touchmove', e => { touchEnd = e.touches[0].clientX; });
      viewport.addEventListener('touchend', () => {
        if (touchStart == null || touchEnd == null) return;
        const d = touchStart - touchEnd;
        if (d > minSwipe) goNext(true);
        if (d < -minSwipe) goPrev(true);
      });
    }

    document.querySelector('.slider-prev').addEventListener('click', () => goPrev(true));
    document.querySelector('.slider-next').addEventListener('click', () => goNext(true));

    iconsWrap.addEventListener('click', e => {
      const btn = e.target.closest('.appliance-btn');
      if (!btn || transitioning) return;
      const i = +btn.dataset.index;
      autoPlay = false;
      transitioning = true;
      index = i + 1;
      updateUI();
    });

    dotsWrap.addEventListener('click', e => {
      const btn = e.target.closest('.slider-dot');
      if (!btn || transitioning) return;
      const i = +btn.dataset.index;
      autoPlay = false;
      transitioning = true;
      index = i + 1;
      updateUI();
    });

    updateUI();
  }

  function initWhy() {
    const grid = document.getElementById('why-grid');
    if (!grid) return;
    grid.innerHTML = WHY_CARDS.map((c, i) => `
      <div class="why-card" data-id="${c.id}" style="transition-delay: ${i * 100}ms">
        <h3>${c.text}</h3>
        <p>${c.description}</p>
      </div>
    `).join('');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    grid.querySelectorAll('.why-card').forEach(el => observer.observe(el));
  }

  function initFAQ() {
    const list = document.getElementById('faq-list');
    if (!list) return;
    let openId = FAQ_ITEMS[0]?.id ?? null;

    list.innerHTML = FAQ_ITEMS.map((item, i) => {
      const open = openId === item.id;
      const paragraphs = item.answer.split(/(?<=[.!?])\s+/).map(s => `<p>${s.trim()}</p>`).join('');
      return `
        <div class="faq-item${open ? ' open' : ''}" data-id="${item.id}" style="transition-delay: ${i * 100}ms">
          <button type="button" class="faq-trigger" aria-expanded="${open}" aria-controls="faq-answer-${item.id}">
            <span class="faq-question">${item.question}</span>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="faq-content" id="faq-answer-${item.id}">
            <div class="faq-answer">${paragraphs}</div>
          </div>
        </div>
      `;
    }).join('');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    list.querySelectorAll('.faq-item').forEach(el => observer.observe(el));

    list.addEventListener('click', e => {
      const trigger = e.target.closest('.faq-trigger');
      if (!trigger) return;
      const item = trigger.closest('.faq-item');
      const id = +item.dataset.id;
      openId = openId === id ? null : id;
      list.querySelectorAll('.faq-item').forEach(el => {
        el.classList.toggle('open', +el.dataset.id === openId);
        const t = el.querySelector('.faq-trigger');
        if (t) t.setAttribute('aria-expanded', +el.dataset.id === openId);
      });
    });
  }

  function initHeroCards() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.hero-card').forEach(el => observer.observe(el));
  }

  function initForms() {
    const modal = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');

    document.querySelectorAll('.lead-form-inner').forEach(form => {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const submitBtn = this.querySelector('.btn-submit');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Отправка...';
        }
        var formId = FORMSPREE_ID;
        var isDemo = !formId || formId === 'YOUR_FORM_ID';

        if (isDemo) {
          setTimeout(function() {
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Отправить заявку'; }
            form.reset();
            if (modal) { modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); }
          }, 800);
          return;
        }

        var formData = new FormData(form);
        fetch('https://formspree.io/f/' + formId, {
          method: 'POST',
          body: formData
        }).then(function() {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Отправить заявку'; }
          form.reset();
          if (modal) { modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); }
        }).catch(function() {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Отправить заявку'; }
          alert('Ошибка отправки. Попробуйте позже или позвоните нам.');
        });
      });
    });

    document.querySelectorAll('.input-wrap input[type="tel"]').forEach(input => {
      input.addEventListener('input', function () {
        this.value = this.value.replace(/[^\d+]/g, '');
      });
    });

    if (modalClose && modal) {
      modalClose.addEventListener('click', () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
      });
      modal.addEventListener('click', e => {
        if (e.target === modal) {
          modal.classList.remove('open');
          modal.setAttribute('aria-hidden', 'true');
        }
      });
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
          modal.classList.remove('open');
          modal.setAttribute('aria-hidden', 'true');
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  function run() {
    initSlider();
    initWhy();
    initFAQ();
    initHeroCards();
    initForms();
  }
})();
