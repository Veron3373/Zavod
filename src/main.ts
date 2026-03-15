import './style.css';

// ============================================================
// DATA
// ============================================================

const products = [
  {
    category: 'plita',
    label: 'Плити',
    icon: '🏗️',
    name: 'Плити перекриття',
    desc: 'Залізобетонні плити для міжповерхових і покрівельних перекриттів. Виготовляються за ДСТУ з ребристою та пустотною структурою.',
    spec: 'від 2PK до 12PK',
    img: '/products/plita-perekryttia.jpg',
  },
  {
    category: 'plita',
    label: 'Плити',
    icon: '🛣️',
    name: 'Плити дорожні',
    desc: "Дорожні плити для покриття тимчасових доріг, майданчиків, під'їздів та промислових зон з підвищеним навантаженням.",
    spec: 'ПД, ПДН',
    img: '/products/plita-dorozhnia.jpg',
  },
  {
    category: 'plita',
    label: 'Плити',
    icon: '✈️',
    name: 'Плити аеродромні',
    desc: 'Спеціальні залізобетонні плити підвищеної міцності для аеродромних і промислових покриттів.',
    spec: 'ПА-IV',
    img: '/products/plita-aerodromna.jpg',
  },
  {
    category: 'fundament',
    label: 'Фундамент',
    icon: '🧱',
    name: 'Блоки фундаментні (ФБС)',
    desc: 'Фундаментні стінові блоки для влаштування стрічкових фундаментів і підвальних приміщень будівель.',
    spec: 'ФБС 9, 12, 24',
    img: '/products/blok-fbс.jpg',
  },
  {
    category: 'fundament',
    label: 'Фундамент',
    icon: '⬇️',
    name: 'Палі забивні',
    desc: 'Залізобетонні забивні палі проміжного і кінцевого спирання для слабких і складних ґрунтів.',
    spec: 'С30-35, С50-70',
    img: '/products/pali.jpg',
  },
  {
    category: 'fundament',
    label: 'Фундамент',
    icon: '📐',
    name: 'Фундаменти стрічкові',
    desc: 'Готові залізобетонні елементи стрічкового фундаменту для прискореного монтажу малоповерхових будівель.',
    spec: 'ФЛ 6–16',
    img: '/products/fundament-strichkoviy.jpg',
  },
  {
    category: 'skhody',
    label: 'Сходи',
    icon: '🪜',
    name: 'Сходові марші',
    desc: 'Залізобетонні сходові марші для цивільного та промислового будівництва з різними кутами нахилу та ступенями.',
    spec: 'ЛМ-1, ЛМ-2, ЛМ-3',
    img: '/products/skhodovi-marshi.jpg',
  },
  {
    category: 'skhody',
    label: 'Сходи',
    icon: '⬛',
    name: 'Сходові майданчики',
    desc: 'Міжмаршеві й поверхові залізобетонні майданчики для стандартних і нестандартних прольотів.',
    spec: 'ЛП-27, ЛП-29',
    img: '/products/skhodovi-maidanchyk.jpg',
  },
  {
    category: 'inshi',
    label: 'Інші',
    icon: '🔲',
    name: 'Перемички',
    desc: 'Залізобетонні перемички для дверних та віконних отворів різних прольотів і навантажень.',
    spec: 'ПБ, ПРП',
    img: '/products/peremychky.jpg',
  },
  {
    category: 'inshi',
    label: 'Інші',
    icon: '⭕',
    name: 'Кільця каналізаційні',
    desc: 'Залізобетонні кільця для облаштування колодязів каналізаційних, водопровідних та зливових мереж.',
    spec: 'КС 10, КС 15, КС 20',
    img: '/products/kilcia.jpg',
  },
  {
    category: 'inshi',
    label: 'Інші',
    icon: '🧴',
    name: 'Бордюри та поребрики',
    desc: 'Залізобетонні бордюрні камені для доріг, тротуарів, газонів та декоративних огорож.',
    spec: 'БР 100.30.15',
    img: '/products/bordury.jpg',
  },
  {
    category: 'beton',
    label: 'Бетон',
    icon: '🪣',
    name: 'Товарний бетон',
    desc: 'Готовий товарний бетон класів C8/10 — C30/37. Доставка автоміксером по Вінниці та області.',
    spec: 'П-1, П-3 (міксер)',
    img: '/products/beton.jpg',
  },
  {
    category: 'beton',
    label: 'Бетон',
    icon: '🏺',
    name: 'Будівельні розчини',
    desc: 'Цементні та вапняні розчини для кладки, штукатурення та інших будівельних робіт.',
    spec: 'М50 – М200',
    img: '/products/rozchin.jpg',
  },
  {
    category: 'metal',
    label: 'Метал',
    icon: '🔩',
    name: 'Металоконструкції',
    desc: 'Зварні металеві конструкції, ферми, балки, колони, каркаси та решітки за індивідуальними кресленнями.',
    spec: 'Індивідуальне замовлення',
    img: '/products/metalkonstruktsii.jpg',
  },
  {
    category: 'metal',
    label: 'Метал',
    icon: '🕸️',
    name: 'Арматурні сітки та каркаси',
    desc: "Складені та точкові арматурні сітки, плоскі та об'ємні каркаси для монолітного будівництва.",
    spec: 'Ø6 – Ø16 мм',
    img: '/products/armatyrna-sitka.jpg',
  },
];

const services = [
  {
    icon: '🏭',
    title: 'Виробництво ЗБВ',
    desc: 'Повний цикл виробництва залізобетонних виробів і конструкцій на власних потужностях із суворим контролем якості.',
  },
  {
    icon: '🚛',
    title: 'Доставка транспортом',
    desc: 'Власний автопарк для доставки виробів і товарного бетону (міксер) по Вінниці та Вінницькій області.',
  },
  {
    icon: '⚙️',
    title: 'Металообробка',
    desc: 'Механічне оброблення металевих виробів, виготовлення металоконструкцій та арматурних виробів.',
  },
  {
    icon: '🔬',
    title: 'Технічні випробування',
    desc: 'Лабораторні випробування та дослідження будівельних матеріалів і конструкцій відповідно до ДСТУ.',
  },
  {
    icon: '🏗️',
    title: 'Будівельні роботи',
    desc: "Спеціалізовані будівельні та монтажні роботи для промислових і цивільних об'єктів.",
  },
  {
    icon: '🏢',
    title: 'Оренда нерухомості',
    desc: 'Надання в оренду виробничих і складських площ, а також будівельного обладнання й техніки.',
  },
];

const advantages = [
  {
    num: '01',
    title: 'Власне виробництво',
    desc: 'Повний цикл — від арматурування до готового виробу на сучасному обладнанні.',
  },
  {
    num: '02',
    title: 'Контроль якості',
    desc: 'Власна лабораторія та технічний контроль на кожному етапі виробництва.',
  },
  {
    num: '03',
    title: 'Широкий асортимент',
    desc: 'Понад 200 найменувань стандартних виробів і можливість виготовлення на замовлення.',
  },
  {
    num: '04',
    title: 'Доставка по регіону',
    desc: 'Власний автопарк забезпечує оперативну доставку по Вінниці та Вінницькій області.',
  },
  {
    num: '05',
    title: 'Досвід понад 60 років',
    desc: 'Завод із багаторічним досвідом — доведена надійність і тисячі реалізованих проектів.',
  },
  {
    num: '06',
    title: 'Індивідуальний підхід',
    desc: 'Розробка нестандартних виробів за кресленнями замовника у стислі терміни.',
  },
];

const tabs = [
  { id: 'all', label: 'Всі вироби' },
  { id: 'plita', label: 'Плити' },
  { id: 'fundament', label: 'Фундамент' },
  { id: 'skhody', label: 'Сходи' },
  { id: 'beton', label: 'Бетон' },
  { id: 'metal', label: 'Метал' },
  { id: 'inshi', label: 'Інші' },
];

// ============================================================
// RENDER
// ============================================================

function renderLogoSVG(): string {
  return `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="url(#grad)"/>
    <rect x="10" y="14" width="22" height="5" rx="2" fill="white" opacity="0.9"/>
    <rect x="10" y="22" width="16" height="4" rx="2" fill="white" opacity="0.7"/>
    <rect x="10" y="29" width="22" height="5" rx="2" fill="white" opacity="0.9"/>
    <defs>
      <linearGradient id="grad" x1="0" y1="0" x2="48" y2="48">
        <stop offset="0%" stop-color="#e8872a"/>
        <stop offset="100%" stop-color="#d4751e"/>
      </linearGradient>
    </defs>
  </svg>`;
}

function renderNav(): string {
  return `
    <nav class="navbar" id="navbar">
      <div class="container">
        <a class="nav-logo" href="#hero" id="nav-logo">
          <div class="nav-logo-icon">${renderLogoSVG()}</div>
          <div class="nav-logo-text">
            <span class="nav-logo-name">ОЗ ЗБВіК</span>
            <span class="nav-logo-sub">Залізобетонні вироби і конструкції</span>
          </div>
        </a>
        <ul class="nav-menu" id="nav-menu">
          <li><a class="nav-link" href="#about">Про завод</a></li>
          <li><a class="nav-link" href="#products">Продукція</a></li>
          <li><a class="nav-link" href="#services">Послуги</a></li>
          <li><a class="nav-link" href="#advantages">Переваги</a></li>
          <li><a class="nav-link" href="#location">Контакти</a></li>
          <li><a class="nav-link nav-cta" href="tel:+380432664643" id="nav-call-btn">📞 Зателефонувати</a></li>
        </ul>
        <button class="nav-hamburger" id="hamburger" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
    <div class="mobile-overlay" id="mobile-overlay"></div>
    <div class="mobile-menu" id="mobile-menu">
      <a class="nav-link" href="#about" data-close>Про завод</a>
      <a class="nav-link" href="#products" data-close>Продукція</a>
      <a class="nav-link" href="#services" data-close>Послуги</a>
      <a class="nav-link" href="#advantages" data-close>Переваги</a>
      <a class="nav-link" href="#location" data-close>Контакти</a>
      <a class="nav-link nav-cta" href="tel:+380432664643">📞 Зателефонувати</a>
    </div>
  `;
}

function renderParticles(): string {
  const sizes = [3, 4, 5, 3, 4, 3, 5, 4];
  const positions = [
    [10, 80], [25, 60], [40, 90], [55, 40],
    [70, 75], [80, 30], [90, 85], [60, 55],
  ];
  const durations = [8, 10, 7, 12, 9, 11, 8, 10];
  const delays = [0, 2, 4, 1, 3, 5, 2, 6];

  return positions.map((pos, i) => `
    <div class="particle" style="
      width: ${sizes[i]}px;
      height: ${sizes[i]}px;
      left: ${pos[0]}%;
      top: ${pos[1]}%;
      --duration: ${durations[i]}s;
      --delay: ${delays[i]}s;
    "></div>
  `).join('');
}

function renderHero(): string {
  return `
    <section class="hero" id="hero">
      <div class="hero-bg" id="hero-bg">
        <div class="hero-bg-fallback" id="hero-fallback"></div>
      </div>
      <div class="hero-grid"></div>
      <div class="hero-particles">${renderParticles()}</div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-eyebrow">
            <span class="hero-line"></span>
            <span class="hero-eyebrow-text">Вінниця · З 1962 року</span>
          </div>
          <h1 class="hero-title">
            Залізобетонні<br>
            <span class="accent">Вироби та</span>
            Конструкції
          </h1>
          <p class="hero-desc">
            ПрАТ «Обласний завод залізобетонних виробів і конструкцій» — 
            понад 60 років постачаємо якісні залізобетонні вироби для будівництва 
            у Вінниці та по всій Україні.
          </p>
          <div class="hero-actions">
            <a href="#products" class="btn-primary" id="hero-catalog-btn">
              Переглянути каталог
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#location" class="btn-secondary" id="hero-contact-btn">
              Зв'язатися з нами
            </a>
          </div>
          <div class="hero-stats">
            <div class="hero-stat-item">
              <span class="hero-stat-num">60+</span>
              <span class="hero-stat-label">Років досвіду</span>
            </div>
            <div class="hero-stat-item">
              <span class="hero-stat-num">200+</span>
              <span class="hero-stat-label">Видів виробів</span>
            </div>
            <div class="hero-stat-item">
              <span class="hero-stat-num">1000+</span>
              <span class="hero-stat-label">Об'єктів зведено</span>
            </div>
            <div class="hero-stat-item">
              <span class="hero-stat-num">24/7</span>
              <span class="hero-stat-label">Приймаємо замовлення</span>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-scroll" id="hero-scroll">
        <div class="hero-scroll-mouse"></div>
        <span class="hero-scroll-text">Прокрутіть</span>
      </div>
    </section>
  `;
}

function renderAbout(): string {
  const features = [
    { icon: '🏭', text: 'Власне виробництво повного циклу' },
    { icon: '🔬', text: 'Лабораторний контроль якості' },
    { icon: '🚛', text: 'Оперативна доставка' },
    { icon: '📐', text: 'Виготовлення за кресленнями' },
  ];

  return `
    <section class="about" id="about">
      <div class="container">
        <div class="about-inner">
          <div class="about-visual reveal">
            <div class="about-img-wrap">
              <img 
                src="/about-factory.jpg" 
                alt="Завод ЗБВіК — виробничі потужності"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
              />
              <div class="about-img-placeholder" style="display:none;">🏭</div>
              <div class="about-img-overlay"></div>
            </div>
            <div class="about-badge-float">
              <div class="num">1962</div>
              <div class="lbl">Рік заснування</div>
            </div>
          </div>

          <div class="about-content reveal reveal-delay-2">
            <div class="badge">Про нас</div>
            <h2 class="section-title">
              Надійний партнер у <span>будівництві</span>
            </h2>
            <p class="about-text">
              ПрАТ «Обласний завод залізобетонних виробів і конструкцій» (ОЗ ЗБВіК) — 
              одне з найстаріших підприємств Вінниці з виробництва залізобетонних 
              виробів. Завод розташований за адресою: вул. Айвазовського, 4А, м. Вінниця.
            </p>
            <p class="about-text">
              Ми виготовляємо широкий спектр залізобетонних виробів — від плит перекриття 
              та фундаментних блоків до дорожніх плит і товарного бетону. Власна 
              виробнича база та конструкторський відділ дозволяють виконувати як 
              стандартні, так і нестандартні замовлення.
            </p>
            <div class="about-features">
              ${features.map(f => `
                <div class="about-feature">
                  <div class="about-feature-icon">${f.icon}</div>
                  <div class="about-feature-text">${f.text}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderProducts(): string {
  const tabsHTML = tabs.map(t => `
    <button class="products-tab${t.id === 'all' ? ' active' : ''}" data-tab="${t.id}" id="tab-${t.id}">${t.label}</button>
  `).join('');

  const cardsHTML = products.map((p, i) => `
    <article class="product-card visible" data-category="${p.category}" id="product-${i}">
      <div class="product-img">
        <img 
          src="${p.img}" 
          alt="${p.name}"
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        />
        <div class="product-img-placeholder" style="display:none;">${p.icon}</div>
        <div class="product-img-overlay"></div>
        <span class="product-category-tag">${p.label}</span>
      </div>
      <div class="product-body">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <span class="product-spec">📏 ${p.spec}</span>
          <a href="#location" class="product-link">
            Замовити 
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </article>
  `).join('');

  return `
    <section class="products" id="products">
      <div class="container">
        <div class="products-header reveal">
          <div class="badge" style="margin: 0 auto 20px;">Каталог продукції</div>
          <h2 class="section-title">Наша <span>Продукція</span></h2>
          <p class="section-subtitle">
            Виготовляємо повний спектр залізобетонних виробів і конструкцій 
            відповідно до державних стандартів України
          </p>
        </div>
        <div class="products-tabs reveal" id="products-tabs">
          ${tabsHTML}
        </div>
        <div class="products-grid" id="products-grid">
          ${cardsHTML}
        </div>
      </div>
    </section>
  `;
}

function renderServices(): string {
  return `
    <section class="services" id="services">
      <div class="container">
        <div class="services-header reveal">
          <div class="badge">Послуги</div>
          <h2 class="section-title">Що ми <span>пропонуємо</span></h2>
          <p class="section-subtitle">
            Комплексний підхід — від виробництва до доставки на об'єкт
          </p>
        </div>
        <div class="services-inner">
          ${services.map((s, i) => `
            <div class="service-card reveal reveal-delay-${(i % 3) + 1}" id="service-${i}">
              <div class="service-icon">${s.icon}</div>
              <h3 class="service-title">${s.title}</h3>
              <p class="service-desc">${s.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderAdvantages(): string {
  return `
    <section class="advantages" id="advantages">
      <div class="container">
        <div class="advantages-inner">
          <div class="advantages-content reveal">
            <div class="badge">Наші переваги</div>
            <h2 class="section-title">
              Чому обирають <span>нас</span>
            </h2>
            <p class="advantages-text">
              За понад 60 років роботи ми вибудували репутацію надійного 
              виробника і постачальника залізобетонних виробів. 
              Тисячі будівельних об'єктів Вінниці та регіону зведені 
              з використанням нашої продукції.
            </p>
            <div class="advantages-counter">
              <div class="adv-counter-item">
                <div class="adv-counter-num" data-count="60">0</div>
                <div class="adv-counter-label">Років на ринку</div>
              </div>
              <div class="adv-counter-item">
                <div class="adv-counter-num" data-count="200">0</div>
                <div class="adv-counter-label">Видів виробів</div>
              </div>
              <div class="adv-counter-item">
                <div class="adv-counter-num" data-count="1000">0</div>
                <div class="adv-counter-label">Об'єктів</div>
              </div>
            </div>
          </div>
          <div class="advantages-list">
            ${advantages.map((a, i) => `
              <div class="adv-card reveal reveal-delay-${(i % 2) + 1}" id="adv-${i}">
                <div class="adv-num">${a.num}</div>
                <div class="adv-title">${a.title}</div>
                <div class="adv-desc">${a.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderLocation(): string {
  return `
    <section class="location" id="location">
      <div class="container">
        <div class="location-inner">
          <div class="location-info reveal">
            <div class="badge">Контакти & Адреса</div>
            <h2 class="section-title">Де нас <span>знайти</span></h2>
            <p class="section-subtitle">
              Приїжджайте на завод або зв'яжіться з нами будь-яким зручним способом
            </p>
            <div class="contact-items">
              <div class="contact-item">
                <div class="contact-icon">📍</div>
                <div class="contact-text">
                  <span class="contact-label">Адреса</span>
                  <span class="contact-value">м. Вінниця, вул. Айвазовського, 4А<br><small style="color:var(--steel-400);">Вінницька обл., 21022</small></span>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">📞</div>
                <div class="contact-text">
                  <span class="contact-label">Телефон</span>
                  <span class="contact-value">
                    <a href="tel:+380432664643">(0432) 66-46-43</a><br>
                    <a href="tel:+380432670384">(0432) 67-03-84</a><br>
                    <a href="tel:+380504233009">(050) 423-30-09</a>
                  </span>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">✉️</div>
                <div class="contact-text">
                  <span class="contact-label">Електронна пошта</span>
                  <span class="contact-value"><a href="mailto:ozzbvik@meta.ua">ozzbvik@meta.ua</a></span>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">🏢</div>
                <div class="contact-text">
                  <span class="contact-label">Повна назва підприємства</span>
                  <span class="contact-value" style="font-size:0.82rem; line-height:1.6;">
                    Приватне акціонерне товариство<br>
                    «Обласний завод залізобетонних<br>
                    виробів і конструкцій»<br>
                    <span style="color:var(--steel-400);">ЄДРПОУ: 03326920</span>
                  </span>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">👤</div>
                <div class="contact-text">
                  <span class="contact-label">Керівник</span>
                  <span class="contact-value">Малюта Сергій Васильович</span>
                </div>
              </div>
            </div>
          </div>

          <div class="map-wrap reveal reveal-delay-2">
            <iframe
              id="factory-map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=28.43,49.23,28.47,49.25&layer=mapnik&marker=49.2381,28.4502"
              title="Розташування заводу ЗБВіК на карті Вінниці"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderCTA(): string {
  return `
    <section class="cta" id="cta">
      <div class="container">
        <div class="cta-inner">
          <div class="cta-text">
            <h2 class="cta-title">Потрібна консультація<br>або комерційна пропозиція?</h2>
            <p class="cta-sub">
              Зателефонуйте нам або напишіть на e-mail — 
              наші менеджери відповідять оперативно та нададуть детальну інформацію про продукцію.
            </p>
          </div>
          <div class="cta-actions">
            <a href="tel:+380432664643" class="btn-white" id="cta-call-btn">
              📞 (0432) 66-46-43
            </a>
            <a href="mailto:ozzbvik@meta.ua" class="btn-outline-white" id="cta-email-btn">
              ✉️ Написати
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderFooter(): string {
  const navLinks = [
    { href: '#about', label: 'Про завод' },
    { href: '#products', label: 'Продукція' },
    { href: '#services', label: 'Послуги' },
    { href: '#advantages', label: 'Переваги' },
    { href: '#location', label: 'Контакти' },
  ];

  const productLinks = [
    'Плити перекриття',
    'Фундаментні блоки',
    'Сходові марші',
    'Дорожні плити',
    'Товарний бетон',
    'Металоконструкції',
  ];

  return `
    <footer class="footer" id="footer">
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand">
            <div class="footer-logo">
              <div class="footer-logo-icon">З</div>
              <div>
                <div class="footer-logo-name">ПрАТ «ОЗ ЗБВіК»</div>
              </div>
            </div>
            <p class="footer-desc">
              Обласний завод залізобетонних виробів і конструкцій. 
              Виробляємо якісні ЗБВ з 1962 року. 
              Вінниця, вул. Айвазовського, 4А.
            </p>
            <div class="footer-socials">
              <a class="social-btn" href="tel:+380432664643" title="Зателефонувати" id="footer-phone-btn">📞</a>
              <a class="social-btn" href="mailto:ozzbvik@meta.ua" title="Написати email" id="footer-email-btn">✉️</a>
              <a class="social-btn" href="#location" title="Показати на карті" id="footer-map-btn">📍</a>
            </div>
          </div>

          <div class="footer-col">
            <div class="footer-col-title">Навігація</div>
            <ul class="footer-links">
              ${navLinks.map(l => `
                <li><a class="footer-link" href="${l.href}">${l.label}</a></li>
              `).join('')}
            </ul>
          </div>

          <div class="footer-col">
            <div class="footer-col-title">Продукція</div>
            <ul class="footer-links">
              ${productLinks.map(l => `
                <li><a class="footer-link" href="#products">${l}</a></li>
              `).join('')}
            </ul>
          </div>

          <div class="footer-col">
            <div class="footer-col-title">Контактна інформація</div>
            <ul class="footer-contact-list">
              <li class="footer-contact-row">
                <span class="footer-contact-icon">📍</span>
                <span class="footer-contact-text">м. Вінниця, вул. Айвазовського, 4А, 21022</span>
              </li>
              <li class="footer-contact-row">
                <span class="footer-contact-icon">📞</span>
                <span class="footer-contact-text">
                  <a href="tel:+380432664643">(0432) 66-46-43</a><br>
                  <a href="tel:+380504233009">(050) 423-30-09</a>
                </span>
              </li>
              <li class="footer-contact-row">
                <span class="footer-contact-icon">✉️</span>
                <span class="footer-contact-text">
                  <a href="mailto:ozzbvik@meta.ua">ozzbvik@meta.ua</a>
                </span>
              </li>
              <li class="footer-contact-row">
                <span class="footer-contact-icon">🏛️</span>
                <span class="footer-contact-text">ЄДРПОУ: 03326920</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="footer-copy">
            © ${new Date().getFullYear()} <span>ПрАТ «ОЗ ЗБВіК»</span>. Всі права захищено.
          </p>
          <div class="footer-legal">
            <a class="footer-legal-link" href="#">Політика конфіденційності</a>
            <a class="footer-legal-link" href="#">Умови використання</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

function renderApp(): void {
  const app = document.getElementById('app')!;
  app.innerHTML = `
    ${renderNav()}
    <main>
      ${renderHero()}
      ${renderAbout()}
      ${renderProducts()}
      ${renderServices()}
      ${renderAdvantages()}
      ${renderLocation()}
      ${renderCTA()}
    </main>
    ${renderFooter()}
  `;
}

// ============================================================
// INTERACTIONS
// ============================================================

function initNavbar(): void {
  const navbar = document.getElementById('navbar')!;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Hamburger
  const hamburger = document.getElementById('hamburger')!;
  const mobileMenu = document.getElementById('mobile-menu')!;
  const mobileOverlay = document.getElementById('mobile-overlay')!;

  function closeMobile() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMobile();
    } else {
      hamburger.classList.add('open');
      mobileMenu.classList.add('open');
      mobileOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  mobileOverlay.addEventListener('click', closeMobile);

  document.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeMobile);
  });
}

function initScrollAnimations(): void {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
}

function initProductTabs(): void {
  const tabsEl = document.getElementById('products-tabs');
  const grid = document.getElementById('products-grid')!;

  tabsEl?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.products-tab');
    if (!btn) return;

    const tab = btn.dataset.tab!;
    document.querySelectorAll('.products-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cards = grid.querySelectorAll<HTMLElement>('.product-card');
    cards.forEach(card => {
      const match = tab === 'all' || card.dataset.category === tab;
      card.classList.toggle('visible', match);
    });
  });
}

function initCounters(): void {
  const counters = document.querySelectorAll<HTMLElement>('[data-count]');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(el => {
          const target = parseInt(el.dataset.count || '0');
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = Math.round(current) + (target >= 1000 ? '+' : '+');
          }, 16);
        });
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function initHeroScroll(): void {
  document.getElementById('hero-scroll')?.addEventListener('click', () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  });
}

function initHeroBg(): void {
  const heroBg = document.getElementById('hero-bg') as HTMLElement;
  const img = new Image();
  img.onload = () => {
    heroBg.style.backgroundImage = `url('/hero-bg.jpg')`;
    document.getElementById('hero-fallback')!.style.display = 'none';
  };
  img.onerror = () => {
    // fallback gradient stays
  };
  img.src = '/hero-bg.jpg';
}

function initSmoothLinks(): void {
  document.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const targetId = link.getAttribute('href')?.slice(1);
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
}

// ============================================================
// INIT
// ============================================================
function init(): void {
  renderApp();
  initNavbar();
  initScrollAnimations();
  initProductTabs();
  initCounters();
  initHeroScroll();
  initHeroBg();
  initSmoothLinks();
}

init();
