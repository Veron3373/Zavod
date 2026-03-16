import './style.css'
import { catalog, categories, getCategoryStats } from './data/catalog'
import { company } from './data/company'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('App root not found')
}

const numberFormatter = new Intl.NumberFormat('uk-UA')

const pricedProducts = catalog.filter((product) => product.price !== null)
const topCategories = categories
  .map((category) => ({
    category,
    ...getCategoryStats(category),
  }))
  .sort((first, second) => second.count - first.count)
  .slice(0, 6)

const priceRange = pricedProducts.length
  ? {
      min: Math.min(...pricedProducts.map((product) => product.price ?? 0)),
      max: Math.max(...pricedProducts.map((product) => product.price ?? 0)),
    }
  : null

const topConcreteMixes = catalog
  .filter((product) => product.category.includes('Бетон'))
  .filter((product) => product.price !== null)
  .sort((first, second) => (first.price ?? 0) - (second.price ?? 0))
  .slice(0, 6)

const topPanels = catalog
  .filter((product) => product.category === 'Панелі перекриття')
  .filter((product) => product.price !== null)
  .slice(0, 8)

app.innerHTML = `
  <div class="site-shell">
    <section class="hero" id="top">
      <div class="hero__backdrop"></div>
      <div class="container hero__grid">
        <div class="hero__content">
          <p class="eyebrow">Виробництво залізобетону у Вінниці</p>
          <h1>Завод залізобетонних виробів і конструкцій, ПрАТ (ЗБВіК)</h1>
          <p class="hero__lead">
            Сучасний сайт-каталог для промислового підприємства: від панелей перекриття
            та ФБС до товарного бетону, дорожніх плит і елементів благоустрою.
          </p>

          <div class="hero__actions">
            <a class="button button--primary" href="#catalog">Дивитися продукцію</a>
            <a class="button button--ghost" href="#contacts">Контакти та карта</a>
          </div>

          <div class="hero__chips">
            ${company.focus.map((item) => `<span>${item}</span>`).join('')}
          </div>
        </div>

        <div class="hero__panel">
          <div class="hero-card hero-card--accent">
            <span>Адреса</span>
            <strong>${company.addressShort}</strong>
            <p>Відвантаження, самовивіз, логістика бетону й ЗБВ зі зручним під'їздом.</p>
          </div>
          <div class="hero-card">
            <span>Режим роботи</span>
            <strong>${company.hours}</strong>
            <p>${company.scheduleNote}</p>
          </div>
          <div class="hero-card hero-card--dark">
            <span>Контакт</span>
            <strong>${company.phones[0].label}</strong>
            <p><a href="tel:${company.phones[0].href}">${company.phones[0].display}</a></p>
          </div>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="container stats__grid">
        <article class="stat-card">
          <span>Позицій у каталозі</span>
          <strong>${numberFormatter.format(catalog.length)}+</strong>
          <p>Каталог охоплює ЗБВ, бетон, арматурні вироби та супутню продукцію.</p>
        </article>
        <article class="stat-card">
          <span>Категорій</span>
          <strong>${numberFormatter.format(categories.length)}</strong>
          <p>Зручне групування для забудовників, прорабів, приватних клієнтів і дилерів.</p>
        </article>
        <article class="stat-card">
          <span>Ціни</span>
          <strong>${priceRange ? `${formatPrice(priceRange.min)} - ${formatPrice(priceRange.max)}` : 'Під запит'}</strong>
          <p>Ціни з ПДВ у гривнях; для окремих позицій передбачено уточнення по запиту.</p>
        </article>
      </div>
    </section>

    <section class="section section--split" id="about">
      <div class="container split-layout">
        <div class="section-copy">
          <p class="eyebrow">Про підприємство</p>
          <h2>Промислова надійність у сучасній подачі</h2>
          <p>
            Ми подали завод як сильний локальний бренд: зі зрозумілою структурою, великим
            каталогом, виразним стилем і швидким доступом до менеджера. Такий формат добре
            працює і для B2B-заявок, і для звичайних покупців, які шукають конкретну марку виробу.
          </p>
          <div class="feature-list">
            ${company.advantages
              .map(
                (item) => `
                  <article class="feature">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                  </article>
                `,
              )
              .join('')}
          </div>
        </div>

        <aside class="info-rail">
          <div class="info-rail__card">
            <span>ЄДРПОУ</span>
            <strong>${company.edrpou}</strong>
          </div>
          <div class="info-rail__card">
            <span>E-mail</span>
            <strong><a href="mailto:${company.email}">${company.email}</a></strong>
          </div>
          <div class="info-rail__card">
            <span>Спеціалізація</span>
            <strong>${company.specialization}</strong>
          </div>
        </aside>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Ключові напрями</p>
            <h2>Що завод виробляє найактивніше</h2>
          </div>
          <p>
            Найбільше позицій сконцентровано в категоріях, які найчастіше потрібні для житлового,
            інфраструктурного та промислового будівництва.
          </p>
        </div>

        <div class="category-showcase">
          ${topCategories
            .map(
              (item, index) => `
                <article class="category-tile ${index === 0 ? 'category-tile--wide' : ''}">
                  <span>${item.count} позицій</span>
                  <h3>${item.category}</h3>
                  <p>
                    ${
                      item.minPrice !== null
                        ? `Старт від ${formatPrice(item.minPrice)}`
                        : 'Вартість уточнюється менеджером'
                    }
                  </p>
                </article>
              `,
            )
            .join('')}
        </div>
      </div>
    </section>

    <section class="section section--band">
      <div class="container section-heading">
        <div>
          <p class="eyebrow">Популярні позиції</p>
          <h2>Панелі та бетон, які запитують найчастіше</h2>
        </div>
        <p>Швидкий зріз каталогу для першого контакту з клієнтом або підготовки комерційної пропозиції.</p>
      </div>

      <div class="container quick-grid">
        <div class="quick-panel">
          <div class="quick-panel__head">
            <h3>Панелі перекриття</h3>
            <a href="#catalog">Увесь каталог</a>
          </div>
          <div class="quick-panel__list">
            ${topPanels
              .map(
                (product) => `
                  <article class="product-line">
                    <strong>${product.name}</strong>
                    <span>${formatPrice(product.price)}</span>
                  </article>
                `,
              )
              .join('')}
          </div>
        </div>

        <div class="quick-panel">
          <div class="quick-panel__head">
            <h3>Бетон на міксер</h3>
            <a href="#catalog">Підібрати марку</a>
          </div>
          <div class="quick-panel__list">
            ${topConcreteMixes
              .map(
                (product) => `
                  <article class="product-line">
                    <div>
                      <strong>${product.name}</strong>
                      <p>${product.category}</p>
                    </div>
                    <span>${formatPrice(product.price)}</span>
                  </article>
                `,
              )
              .join('')}
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="catalog">
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Каталог продукції</p>
            <h2>Фільтруй по категоріях і швидко знаходь потрібну марку</h2>
          </div>
          <p>
            Для мобільного та десктопного перегляду каталог адаптовано під швидкий пошук.
            Якщо ціна відсутня, позиція залишається доступною для запиту у менеджера.
          </p>
        </div>

        <div class="catalog-shell">
          <div class="catalog-toolbar">
            <div class="catalog-filters" id="category-filters">
              <button class="filter-chip is-active" data-category="all">Усе</button>
              ${categories
                .map(
                  (category) =>
                    `<button class="filter-chip" data-category="${escapeAttribute(category)}">${category}</button>`,
                )
                .join('')}
            </div>
            <label class="search-field">
              <span>Пошук по марці або розміру</span>
              <input id="catalog-search" type="search" placeholder="Наприклад: ФБС 24-6-6 або М-300" />
            </label>
          </div>

          <div class="catalog-summary" id="catalog-summary"></div>
          <div class="catalog-grid" id="catalog-grid"></div>
        </div>
      </div>
    </section>

    <section class="section section--split">
      <div class="container split-layout split-layout--contact">
        <div class="section-copy">
          <p class="eyebrow">Логістика та сервіс</p>
          <h2>Сайт одразу підводить до заявки</h2>
          <p>
            На сторінці є і товарний каталог, і зрозумілий блок для зв'язку: дзвінок, e-mail,
            адреса, карта та акцент на доставці бетону і великих ЗБВ на об'єкт.
          </p>

          <div class="service-grid">
            ${company.services
              .map(
                (item) => `
                  <article class="service-card">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                  </article>
                `,
              )
              .join('')}
          </div>
        </div>

        <div class="quote-card">
          <p>Для точного прорахунку замовлення менеджер уточнює:</p>
          <ul>
            <li>кількість і марки виробів;</li>
            <li>необхідність доставки або самовивозу;</li>
            <li>термін виробництва / відвантаження;</li>
            <li>актуальність оптових цін.</li>
          </ul>
          <a class="button button--primary" href="mailto:${company.email}">Надіслати запит</a>
        </div>
      </div>
    </section>

    <section class="section contacts" id="contacts">
      <div class="container contacts__grid">
        <div class="contacts__content">
          <p class="eyebrow">Контакти</p>
          <h2>Завітайте на виробництво або зв'яжіться напряму</h2>
          <div class="contact-cards">
            <article class="contact-card">
              <span>Адреса</span>
              <strong>${company.addressFull}</strong>
            </article>
            <article class="contact-card">
              <span>Телефони</span>
              <div class="contact-list">
                ${company.phones
                  .map(
                    (phone) =>
                      `<a href="tel:${phone.href}">${phone.display}</a>`,
                  )
                  .join('')}
              </div>
            </article>
            <article class="contact-card">
              <span>E-mail</span>
              <strong><a href="mailto:${company.email}">${company.email}</a></strong>
            </article>
            <article class="contact-card">
              <span>Графік</span>
              <strong>${company.hours}</strong>
              <p>${company.scheduleNote}</p>
            </article>
          </div>
        </div>

        <div class="map-card">
          <iframe
            title="Карта розміщення заводу"
            src="${company.mapEmbed}"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  </div>
`

const categoryFilters = app.querySelector<HTMLDivElement>('#category-filters')
const catalogGrid = app.querySelector<HTMLDivElement>('#catalog-grid')
const catalogSummary = app.querySelector<HTMLDivElement>('#catalog-summary')
const searchInput = app.querySelector<HTMLInputElement>('#catalog-search')

let activeCategory = 'all'
let searchQuery = ''

const renderCatalog = () => {
  if (!catalogGrid || !catalogSummary) {
    return
  }

  const normalizedQuery = searchQuery.trim().toLowerCase()

  const filteredProducts = catalog.filter((product) => {
    const matchesCategory =
      activeCategory === 'all' || product.category === activeCategory

    const matchesSearch =
      normalizedQuery.length === 0 ||
      [product.name, product.size, product.note, product.category, product.source]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedQuery))

    return matchesCategory && matchesSearch
  })

  const pricedCount = filteredProducts.filter((product) => product.price !== null).length

  catalogSummary.innerHTML = `
    <p>
      Показано <strong>${numberFormatter.format(filteredProducts.length)}</strong> позицій.
      Із них <strong>${numberFormatter.format(pricedCount)}</strong> з вказаною ціною.
    </p>
  `

  if (filteredProducts.length === 0) {
    catalogGrid.innerHTML = `
      <article class="catalog-empty">
        <h3>Нічого не знайдено</h3>
        <p>Спробуйте іншу категорію або коротший пошуковий запит.</p>
      </article>
    `
    return
  }

  catalogGrid.innerHTML = filteredProducts
    .map(
      (product) => `
        <article class="catalog-card">
          <div class="catalog-card__meta">
            <span>${product.category}</span>
            <strong>${product.source}</strong>
          </div>
          <h3>${product.name}</h3>
          <dl>
            <div>
              <dt>Характеристика</dt>
              <dd>${product.size || 'Уточнюйте'}</dd>
            </div>
            <div>
              <dt>Одиниця</dt>
              <dd>${product.unit || '—'}</dd>
            </div>
            <div>
              <dt>Ціна</dt>
              <dd>${formatPrice(product.price)}</dd>
            </div>
            <div>
              <dt>Примітка</dt>
              <dd>${product.note || 'Без приміток'}</dd>
            </div>
          </dl>
        </article>
      `,
    )
    .join('')
}

categoryFilters?.addEventListener('click', (event) => {
  const target = event.target

  if (!(target instanceof HTMLButtonElement)) {
    return
  }

  activeCategory = target.dataset.category ?? 'all'

  categoryFilters
    .querySelectorAll<HTMLButtonElement>('.filter-chip')
    .forEach((button) => button.classList.toggle('is-active', button === target))

  renderCatalog()
})

searchInput?.addEventListener('input', (event) => {
  searchQuery = (event.target as HTMLInputElement).value
  renderCatalog()
})

renderCatalog()

function formatPrice(value: number | null): string {
  if (value === null) {
    return 'Під запит'
  }

  return `${numberFormatter.format(value)} грн`
}

function escapeAttribute(value: string): string {
  return value.replaceAll('"', '&quot;')
}
