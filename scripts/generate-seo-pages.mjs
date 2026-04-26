import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const targetRoot = resolve(root, process.argv[2] ?? 'public')
const siteUrl = 'https://zbvik.vn.ua'

const categoryPages = [
  {
    category: 'Панелі перекриття',
    slug: 'paneli-perekryttya-vinnytsia',
    title: 'Панелі перекриття Вінниця',
    h1: 'Панелі перекриття у Вінниці від виробника',
    description:
      'Панелі та плити перекриття у Вінниці від ПрАТ ОЗ ЗБВіК. Виробництво залізобетонних панелей, консультація, самовивіз і доставка.',
    intro:
      'ПрАТ «ОЗ ЗБВіК» виготовляє залізобетонні панелі перекриття для житлового, комерційного та промислового будівництва у Вінниці та Вінницькій області.',
    image: '/images/products/paneli-perekryttya.webp',
    aliases: ['плити перекриття Вінниця', 'залізобетонні панелі Вінниця', 'панельні перекриття'],
  },
  {
    category: 'Блоки фундаментні',
    slug: 'bloky-fundamentni-fbs-vinnytsia',
    title: 'Блоки фундаментні ФБС Вінниця',
    h1: 'Блоки фундаментні ФБС у Вінниці',
    description:
      'Фундаментні блоки ФБС у Вінниці від заводу залізобетонних виробів. Різні типорозміри, ціни від виробника, доставка.',
    intro:
      'Фундаментні блоки ФБС використовують для стрічкових фундаментів, підвалів, технічних приміщень та промислових об’єктів.',
    image: '/images/products/bloky-fundamentni.webp',
    aliases: ['ФБС Вінниця', 'фундаментні блоки ціна', 'блоки бетонні фундаментні'],
  },
  {
    category: 'Перемички залізобетонні',
    slug: 'peremychky-zalizobetonni-vinnytsia',
    title: 'Перемички залізобетонні Вінниця',
    h1: 'Залізобетонні перемички у Вінниці',
    description:
      'Купити залізобетонні перемички у Вінниці: 1ПБ, 2ПБ, 3ПБ, 5ПБ та інші марки. Виробництво ПрАТ ОЗ ЗБВіК.',
    intro:
      'Залізобетонні перемички застосовують для перекриття дверних і віконних прорізів у цегляних, блочних та монолітних будівлях.',
    image: '/images/products/peremychky.webp',
    aliases: ['перемички бетонні Вінниця', 'перемички ЗБВ', 'перемички над вікна'],
  },
  {
    category: 'Плити дорожні',
    slug: 'plyty-dorozhni-vinnytsia',
    title: 'Плити дорожні Вінниця',
    h1: 'Дорожні плити у Вінниці',
    description:
      'Дорожні залізобетонні плити у Вінниці для тимчасових доріг, майданчиків та промислових територій. Заводські ЗБВ.',
    intro:
      'Дорожні плити підходять для облаштування проїздів, будівельних майданчиків, під’їзних шляхів та зон із транспортним навантаженням.',
    image: '/images/products/plyty-dorozhni.webp',
    aliases: ['бетонні плити для дороги', 'дорожні плити ціна Вінниця', 'плити ПД'],
  },
  {
    category: 'Плити плоскі',
    slug: 'plyty-ploski-vinnytsia',
    title: 'Плити плоскі Вінниця',
    h1: 'Плоскі залізобетонні плити у Вінниці',
    description:
      'Плоскі залізобетонні плити у Вінниці від виробника. Типорозміри, консультація, самовивіз і доставка.',
    intro:
      'Плоскі плити ЗБВ застосовують у будівництві, благоустрої, перекриттях технічних зон та інших конструктивних рішеннях.',
    image: '/images/products/plyty-ploski.webp',
    aliases: ['плити бетонні Вінниця', 'плоскі плити ЗБВ', 'залізобетонні плити'],
  },
  {
    category: 'Бордюр, поребрик',
    slug: 'bordyur-porebryk-vinnytsia',
    title: 'Бордюр і поребрик Вінниця',
    h1: 'Бордюр та поребрик у Вінниці',
    description:
      'Бетонний бордюр і поребрик у Вінниці від виробника. Дорожній бордюр, тротуарний поребрик, ціни заводу.',
    intro:
      'Бордюр і поребрик використовують для доріг, тротуарів, паркувальних зон, територій підприємств і благоустрою приватних об’єктів.',
    image: '/images/products/bordyur.webp',
    aliases: ['бетонний бордюр Вінниця', 'поребрик Вінниця', 'дорожній бордюр'],
  },
  {
    category: 'Плита огорожі',
    slug: 'plyty-ogorozhi-vinnytsia',
    title: 'Плити огорожі Вінниця',
    h1: 'Залізобетонні плити огорожі у Вінниці',
    description:
      'Плити огорожі та бетонні елементи для парканів у Вінниці. Виробництво ЗБВ, самовивіз, доставка.',
    intro:
      'Плити огорожі застосовують для промислових територій, складів, підприємств, приватних ділянок і технічних зон.',
    image: '/images/products/plyta-ogorozhi.webp',
    aliases: ['бетонні забори Вінниця', 'плити для паркану', 'залізобетонна огорожа'],
  },
  {
    category: 'Стовпчики для огорожі',
    slug: 'stovpchyky-ogorozhi-vinnytsia',
    title: 'Стовпчики для огорожі Вінниця',
    h1: 'Бетонні стовпчики для огорожі у Вінниці',
    description:
      'Стовпчики для огорожі у Вінниці від заводу ЗБВ. Бетонні та залізобетонні елементи для парканів.',
    intro:
      'Стовпчики для огорожі потрібні для монтажу бетонних парканів, секційних огорож і територіального розмежування.',
    image: '/images/products/stovpchyky-ogorozhi.webp',
    aliases: ['стовпці бетонні Вінниця', 'стовпчики бетонні', 'стовпи для паркану'],
  },
  {
    category: 'Бетон на міксер',
    sourceCategories: ['Бетон на міксер (Відсів П-3)', 'Бетон на міксер (Пісок П-3)'],
    slug: 'beton-na-mikser-vinnytsia',
    title: 'Бетон на міксер Вінниця',
    h1: 'Бетон на міксер у Вінниці',
    description:
      'Товарний бетон на міксер у Вінниці: М-100, М-150, М-200, М-250, М-300, М-350, М-400. Бетон від виробника.',
    intro:
      'ПрАТ «ОЗ ЗБВіК» постачає бетон на міксер для фундаментів, монолітних робіт, майданчиків, промислового і приватного будівництва.',
    image: '/images/products/beton-mikser.webp',
    aliases: ['цемент Вінниця', 'товарний бетон Вінниця', 'бетон з доставкою Вінниця'],
  },
  {
    category: 'Кільця каналізаційні',
    slug: 'kiltsia-kanalizatsiyni-vinnytsia',
    title: 'Кільця каналізаційні Вінниця',
    h1: 'Каналізаційні бетонні кільця у Вінниці',
    description:
      'Каналізаційні кільця у Вінниці від виробника ЗБВ. Бетонні кільця для колодязів, каналізації та інженерних мереж.',
    intro:
      'Бетонні кільця використовують для каналізаційних, водопровідних, оглядових колодязів та інших інженерних споруд.',
    image: '/images/products/kiltsia-kanalizatsiyni.webp',
    aliases: ['бетонні кільця Вінниця', 'кільця для колодязя', 'залізобетонні кільця'],
  },
  {
    category: 'Лотки',
    slug: 'lotky-zalizobetonni-vinnytsia',
    title: 'Лотки залізобетонні Вінниця',
    h1: 'Залізобетонні лотки у Вінниці',
    description:
      'Залізобетонні лотки у Вінниці для інженерних мереж, водовідведення та комунікацій. Заводські ЗБВ.',
    intro:
      'Лотки ЗБВ застосовують для прокладання та захисту інженерних мереж, водовідведення і технічних каналів.',
    image: '/images/products/lotky.webp',
    aliases: ['бетонні лотки Вінниця', 'лотки водовідвідні', 'лотки інженерних мереж'],
  },
  {
    category: 'Палі забивні залізобетонні',
    slug: 'pali-zabyvni-vinnytsia',
    title: 'Палі забивні залізобетонні Вінниця',
    h1: 'Залізобетонні забивні палі у Вінниці',
    description:
      'Забивні залізобетонні палі у Вінниці від виробника. Палі для фундаментів промислових та житлових об’єктів.',
    intro:
      'Забивні палі використовують для фундаментів на слабких ґрунтах, промислових будівель, складських і житлових об’єктів.',
    image: '/images/products/pali-zabyvni.webp',
    aliases: ['сваї Вінниця', 'палі бетонні', 'залізобетонні сваї'],
  },
  {
    category: 'Сходові марші',
    slug: 'skhodovi-marshi-vinnytsia',
    title: 'Сходові марші Вінниця',
    h1: 'Залізобетонні сходові марші у Вінниці',
    description:
      'Сходові марші у Вінниці від заводу ЗБВ. Залізобетонні сходи для житлових, адміністративних і промислових будівель.',
    intro:
      'Сходові марші ЗБВ використовують у багатоповерховому будівництві, адміністративних спорудах і промислових об’єктах.',
    image: '/images/products/skhodovi-marshi.webp',
    aliases: ['бетонні сходи Вінниця', 'залізобетонні сходи', 'сходові марші ЗБВ'],
  },
  {
    category: 'Сходові площадки',
    slug: 'skhodovi-ploshchadky-vinnytsia',
    title: 'Сходові площадки Вінниця',
    h1: 'Залізобетонні сходові площадки у Вінниці',
    description:
      'Сходові площадки у Вінниці від виробника ЗБВ. Залізобетонні елементи сходових клітин.',
    intro:
      'Сходові площадки комплектують сходові марші та застосовуються в житлових, громадських і виробничих будівлях.',
    image: '/images/products/skhodovi-ploschadky.webp',
    aliases: ['площадки сходові ЗБВ', 'залізобетонні площадки', 'бетонні сходові площадки'],
  },
  {
    category: 'Фундаменти стрічкові',
    slug: 'fundamenty-strichkovi-vinnytsia',
    title: 'Фундаменти стрічкові Вінниця',
    h1: 'Стрічкові фундаменти ЗБВ у Вінниці',
    description:
      'Стрічкові фундаменти та плити ФЛ у Вінниці від виробника. Залізобетонні елементи фундаментів.',
    intro:
      'Стрічкові фундаменти та плити ФЛ застосовують для основ будівель, несучих стін і конструкцій із високим навантаженням.',
    image: '/images/products/fundamenty-strichkovi.webp',
    aliases: ['плити ФЛ Вінниця', 'фундаментні подушки', 'залізобетонний фундамент'],
  },
  {
    category: 'Прогони',
    slug: 'prohony-zalizobetonni-vinnytsia',
    title: 'Прогони залізобетонні Вінниця',
    h1: 'Залізобетонні прогони у Вінниці',
    description:
      'Залізобетонні прогони у Вінниці для будівництва промислових і господарських об’єктів. Виробник ЗБВ.',
    intro:
      'Прогони ЗБВ використовують як несучі елементи у покриттях, каркасах та промислових будівельних конструкціях.',
    image: '/images/products/prohony.webp',
    aliases: ['прогони ПРГ Вінниця', 'залізобетонні балки', 'несучі ЗБВ'],
  },
  {
    category: 'Плита аеродромна',
    slug: 'plyta-aerodromna-vinnytsia',
    title: 'Плита аеродромна Вінниця',
    h1: 'Аеродромні плити у Вінниці',
    description:
      'Аеродромні залізобетонні плити у Вінниці від заводу ЗБВ. Міцні плити для навантажених майданчиків.',
    intro:
      'Аеродромні плити застосовують для майданчиків із високим навантаженням, тимчасових доріг, промислових територій і складів.',
    image: '/images/products/plyta-aerodromna.webp',
    aliases: ['плити ПДН Вінниця', 'аеродромна плита ПДН', 'міцні бетонні плити'],
  },
  {
    category: 'Плита ребриста',
    slug: 'plyta-rebrysta-vinnytsia',
    title: 'Плита ребриста Вінниця',
    h1: 'Ребристі залізобетонні плити у Вінниці',
    description:
      'Ребристі плити у Вінниці від виробника залізобетонних виробів. ЗБВ для покриттів та промислового будівництва.',
    intro:
      'Ребристі плити використовують у покриттях, перекриттях та конструкціях, де потрібне поєднання міцності й оптимальної ваги.',
    image: '/images/products/plyta-rebrysta.webp',
    aliases: ['ребристі плити ЗБВ', 'плити покриття Вінниця', 'залізобетонні ребристі плити'],
  },
  {
    category: 'Вироби з арматури',
    slug: 'vyroby-z-armatury-vinnytsia',
    title: 'Вироби з арматури Вінниця',
    h1: 'Вироби з арматури у Вінниці',
    description:
      'Арматурні вироби у Вінниці: сітка, плоскі та просторові каркаси для ЗБВ і будівництва.',
    intro:
      'Вироби з арматури застосовують для армування бетонних і залізобетонних конструкцій, кладки та монолітних робіт.',
    image: '/images/products/vyroby-armatury.webp',
    aliases: ['арматурна сітка Вінниця', 'каркаси з арматури', 'сітка кладочна'],
  },
]

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function parseCatalog() {
  const file = readFileSync(join(root, 'src', 'data', 'catalog.ts'), 'utf8')
  const match = file.match(/const rawCatalog = `([\s\S]*?)`/)
  if (!match) throw new Error('Cannot find rawCatalog in src/data/catalog.ts')

  return match[1]
    .split('\n')
    .slice(1)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [source, category, name, size, unit, price, note] = line.split(';')
      return {
        source: source.trim(),
        category: category.trim(),
        name: name.trim(),
        size: (size ?? '').trim().replace(/^\/+/, ''),
        unit: (unit ?? '').trim(),
        price: price?.trim() ? Number.parseFloat(price) : null,
        note: (note ?? '').trim(),
      }
    })
}

function productRows(items) {
  return items
    .slice(0, 80)
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.name)}</td>
        <td>${escapeHtml(item.size || 'уточнюйте у менеджера')}</td>
        <td>${escapeHtml(item.unit || 'шт')}</td>
      </tr>`,
    )
    .join('')
}

function pageHtml(page, items, allPages) {
  const url = `${siteUrl}/produktsiya/${page.slug}.html`
  const related = allPages
    .filter((candidate) => candidate.slug !== page.slug)
    .slice(0, 8)
    .map((candidate) => `<a href="/produktsiya/${candidate.slug}.html">${escapeHtml(candidate.title)}</a>`)
    .join('')
  const aliases = page.aliases.map((alias) => `<li>${escapeHtml(alias)}</li>`).join('')
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: page.title,
    image: `${siteUrl}${page.image}`,
    description: page.description,
    brand: {
      '@type': 'Organization',
      name: 'ПрАТ "ОЗ ЗБВіК"',
    },
    areaServed: {
      '@type': 'City',
      name: 'Вінниця',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'UAH',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'ПрАТ "ОЗ ЗБВіК"',
      },
    },
  }

  return `<!doctype html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(page.title)} | ПрАТ ОЗ ЗБВіК</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${url}">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta property="og:title" content="${escapeHtml(page.title)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${siteUrl}${page.image}">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <style>
    :root { color-scheme: light; --ink:#182534; --muted:#5d6878; --brand:#1a3a5c; --gold:#c9a55a; --line:#d9e0e8; --soft:#f4f6f8; }
    * { box-sizing: border-box; }
    body { margin:0; font-family: Arial, sans-serif; color:var(--ink); background:#fff; line-height:1.55; }
    header, main, footer { width:min(1120px, calc(100% - 32px)); margin:0 auto; }
    header { padding:22px 0; display:flex; justify-content:space-between; gap:18px; align-items:center; border-bottom:1px solid var(--line); }
    .brand { font-weight:800; color:var(--brand); text-decoration:none; }
    nav { display:flex; gap:14px; flex-wrap:wrap; }
    nav a, .related a { color:var(--brand); text-decoration:none; font-weight:700; }
    .hero { padding:42px 0 26px; display:grid; grid-template-columns:1.2fr .8fr; gap:32px; align-items:center; }
    h1 { margin:0 0 16px; font-size:clamp(30px, 4vw, 54px); line-height:1.05; letter-spacing:0; color:var(--brand); }
    h2 { margin:34px 0 14px; font-size:28px; color:var(--brand); }
    p { margin:0 0 14px; }
    .lead { font-size:19px; color:#334155; }
    .hero img { width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:8px; border:1px solid var(--line); }
    .actions { display:flex; gap:12px; flex-wrap:wrap; margin-top:22px; }
    .btn { display:inline-flex; align-items:center; min-height:44px; padding:10px 16px; border-radius:6px; background:var(--brand); color:#fff; text-decoration:none; font-weight:800; }
    .btn.secondary { background:#fff; color:var(--brand); border:1px solid var(--brand); }
    .panel { background:var(--soft); border:1px solid var(--line); border-radius:8px; padding:20px; margin:22px 0; }
    table { width:100%; border-collapse:collapse; margin-top:10px; background:#fff; }
    th, td { padding:12px; border:1px solid var(--line); text-align:left; vertical-align:top; }
    th { background:#eef2f6; color:var(--brand); }
    ul { padding-left:22px; }
    .related { display:flex; flex-wrap:wrap; gap:10px 18px; }
    footer { padding:28px 0 40px; margin-top:36px; border-top:1px solid var(--line); color:var(--muted); }
    @media (max-width: 760px) { header, .hero { display:block; } nav { margin-top:12px; } .hero img { margin-top:18px; } th, td { padding:9px; } }
  </style>
</head>
<body>
  <header>
    <a class="brand" href="/">ПрАТ «ОЗ ЗБВіК»</a>
    <nav>
      <a href="/">Головна</a>
      <a href="/#products">Продукція</a>
      <a href="/#contacts">Контакти</a>
    </nav>
  </header>
  <main>
    <section class="hero">
      <div>
        <h1>${escapeHtml(page.h1)}</h1>
        <p class="lead">${escapeHtml(page.intro)}</p>
        <p>Працюємо у Вінниці за адресою вул. Айвазовського, 4-А. Допоможемо уточнити наявність, підібрати марку виробу та організувати самовивіз або доставку.</p>
        <div class="actions">
          <a class="btn" href="tel:+380432664643">Подзвонити на завод</a>
          <a class="btn secondary" href="mailto:ozzbvik@meta.ua">Написати на пошту</a>
        </div>
      </div>
      <img src="${page.image}" alt="${escapeHtml(page.title)}" width="600" height="450">
    </section>
    <section class="panel">
      <h2>Що можна замовити</h2>
      <p>Сторінка підходить для запитів:</p>
      <ul>${aliases}</ul>
    </section>
    <section>
      <h2>Номенклатура</h2>
      <p>Нижче наведені основні позиції. Актуальну ціну, терміни виготовлення та доставку уточнюйте у менеджера.</p>
      <table>
        <thead>
          <tr><th>Марка / найменування</th><th>Характеристика / розмір</th><th>Од.</th></tr>
        </thead>
        <tbody>${productRows(items)}</tbody>
      </table>
    </section>
    <section class="panel">
      <h2>Контакти</h2>
      <p><strong>Адреса:</strong> 21022, м. Вінниця, вул. Айвазовського, 4-А.</p>
      <p><strong>Телефони:</strong> <a href="tel:+380432664643">(0432) 66-46-43</a>, <a href="tel:+380432670384">(0432) 67-03-84</a>, <a href="tel:+380504233009">(050) 423-30-09</a>.</p>
      <p><strong>E-mail:</strong> <a href="mailto:ozzbvik@meta.ua">ozzbvik@meta.ua</a>.</p>
    </section>
    <section>
      <h2>Інша продукція заводу</h2>
      <div class="related">${related}</div>
    </section>
  </main>
  <footer>ПрАТ «ОЗ ЗБВіК» — завод залізобетонних виробів і конструкцій у Вінниці.</footer>
</body>
</html>`
}

const catalog = parseCatalog()
const productDir = join(targetRoot, 'produktsiya')
rmSync(productDir, { recursive: true, force: true })
mkdirSync(productDir, { recursive: true })

for (const page of categoryPages) {
  const categories = page.sourceCategories ?? [page.category]
  const items = catalog.filter((item) => categories.includes(item.category))
  writeFileSync(join(productDir, `${page.slug}.html`), pageHtml(page, items, categoryPages))
}

const urls = [
  { loc: `${siteUrl}/`, priority: '1.0' },
  ...categoryPages.map((page) => ({ loc: `${siteUrl}/produktsiya/${page.slug}.html`, priority: '0.9' })),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>2026-04-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(join(targetRoot, 'sitemap.xml'), sitemap)
console.log(`Generated ${categoryPages.length} SEO pages in ${productDir}`)
