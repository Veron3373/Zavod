import './style.css'

declare global {
  interface Window {
    L?: {
      map: (...args: unknown[]) => {
        setView: (...args: unknown[]) => unknown
        invalidateSize: () => void
      }
      tileLayer: (...args: unknown[]) => { addTo: (target: unknown) => void }
      divIcon: (...args: unknown[]) => unknown
      marker: (...args: unknown[]) => {
        addTo: (target: unknown) => {
          bindPopup: (...popupArgs: unknown[]) => { openPopup: () => void }
        }
      }
    }
  }
}

const mapCoords = { lat: 49.259756551931645, lng: 28.48389620346503 }
const assetBase = import.meta.env.BASE_URL

function assetPath(path: string) {
  return `${assetBase}${path.replace(/^\/+/, '')}`
}

let leafletLoader: Promise<NonNullable<typeof window.L>> | null = null

function loadLeaflet() {
  if (window.L) return Promise.resolve(window.L)
  if (leafletLoader) return leafletLoader

  leafletLoader = new Promise((resolve, reject) => {
    if (!document.querySelector('link[href*="leaflet"]')) {
      const css = document.createElement('link')
      css.rel = 'stylesheet'
      css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.append(css)
    }

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.async = true
    script.onload = () => {
      if (window.L) resolve(window.L)
      else reject(new Error('Leaflet did not initialize'))
    }
    script.onerror = () => reject(new Error('Leaflet failed to load'))
    document.head.append(script)
  })

  return leafletLoader
}

function initFactoryMap() {
  const mapRoot = document.getElementById('factoryMap')
  if (!mapRoot || mapRoot.dataset.ready === 'true') return

  loadLeaflet()
    .then((L) => {
      const map = L.map(mapRoot, {
        scrollWheelZoom: false,
        zoomControl: true,
      }).setView([mapCoords.lat, mapCoords.lng], 16) as { invalidateSize: () => void }

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
      }).addTo(map)

      const markerIcon = L.divIcon({
        className: 'factory-marker',
        html: '<div class="factory-marker__inner">🏭</div>',
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -20],
      })

      L.marker([mapCoords.lat, mapCoords.lng], { icon: markerIcon })
        .addTo(map)
        .bindPopup(
          `<div class="factory-popup">
            <strong>ПрАТ «ОЗ ЗБВіК»</strong>
            <span>вул. Айвазовського, 4-А</span>
            <a href="tel:+380432664643">(0432) 66-46-43</a>
          </div>`,
          { autoClose: false, closeOnClick: false, className: 'factory-popup-shell' },
        )
        .openPopup()

      mapRoot.dataset.ready = 'true'
      window.setTimeout(() => map.invalidateSize(), 150)
    })
    .catch(() => {
      mapRoot.innerHTML = `
        <div class="map-fallback">
          <p>Не вдалося завантажити карту.</p>
          <a href="https://www.google.com/maps?q=${mapCoords.lat},${mapCoords.lng}" target="_blank" rel="noreferrer">
            Відкрити точку в Google Maps
          </a>
        </div>`
    })
}

// ===== SVG LOGO =====
const logoSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#eef1f5"/><stop offset="100%" stop-color="#dde3eb"/>
    </linearGradient>
  </defs>
  <rect width="128" height="128" rx="20" fill="url(#lg)"/>
  <rect x="8" y="112" width="112" height="4" rx="2" fill="#1a3a5c"/>
  <rect x="22" y="18" width="6" height="94" fill="#1a3a5c"/>
  <polygon points="20,18 28,18 25,10 23,10" fill="#1a3a5c"/>
  <line x1="22" y1="30" x2="28" y2="42" stroke="#1a3a5c" stroke-width="1.5"/>
  <line x1="28" y1="30" x2="22" y2="42" stroke="#1a3a5c" stroke-width="1.5"/>
  <line x1="22" y1="42" x2="28" y2="54" stroke="#1a3a5c" stroke-width="1.5"/>
  <line x1="28" y1="42" x2="22" y2="54" stroke="#1a3a5c" stroke-width="1.5"/>
  <line x1="22" y1="54" x2="28" y2="66" stroke="#1a3a5c" stroke-width="1.5"/>
  <line x1="28" y1="54" x2="22" y2="66" stroke="#1a3a5c" stroke-width="1.5"/>
  <line x1="22" y1="66" x2="28" y2="78" stroke="#1a3a5c" stroke-width="1.5"/>
  <line x1="28" y1="66" x2="22" y2="78" stroke="#1a3a5c" stroke-width="1.5"/>
  <line x1="22" y1="78" x2="28" y2="90" stroke="#1a3a5c" stroke-width="1.5"/>
  <line x1="28" y1="78" x2="22" y2="90" stroke="#1a3a5c" stroke-width="1.5"/>
  <line x1="22" y1="90" x2="28" y2="102" stroke="#1a3a5c" stroke-width="1.5"/>
  <line x1="28" y1="90" x2="22" y2="102" stroke="#1a3a5c" stroke-width="1.5"/>
  <rect x="16" y="18" width="80" height="5" rx="1" fill="#1a3a5c"/>
  <line x1="28" y1="18" x2="38" y2="23" stroke="#1a3a5c" stroke-width="1.2"/>
  <line x1="38" y1="18" x2="48" y2="23" stroke="#1a3a5c" stroke-width="1.2"/>
  <line x1="48" y1="18" x2="58" y2="23" stroke="#1a3a5c" stroke-width="1.2"/>
  <line x1="58" y1="18" x2="68" y2="23" stroke="#1a3a5c" stroke-width="1.2"/>
  <line x1="68" y1="18" x2="78" y2="23" stroke="#1a3a5c" stroke-width="1.2"/>
  <line x1="78" y1="18" x2="88" y2="23" stroke="#1a3a5c" stroke-width="1.2"/>
  <rect x="8" y="18" width="14" height="5" rx="1" fill="#1a3a5c"/>
  <rect x="8" y="23" width="10" height="8" rx="1" fill="#c9a55a" stroke="#9e8040" stroke-width="0.5"/>
  <line x1="90" y1="23" x2="90" y2="40" stroke="#1a3a5c" stroke-width="1.8"/>
  <circle cx="90" cy="42" r="3" fill="none" stroke="#1a3a5c" stroke-width="2"/>
  <rect x="78" y="46" width="24" height="6" rx="1" fill="#8a9bae" stroke="#6a7b8e" stroke-width="0.5"/>
  <rect x="78" y="53" width="24" height="6" rx="1" fill="#a0b0c0" stroke="#6a7b8e" stroke-width="0.5"/>
  <line x1="80" y1="49" x2="100" y2="49" stroke="#6a7b8e" stroke-width="0.5"/>
  <line x1="80" y1="56" x2="100" y2="56" stroke="#6a7b8e" stroke-width="0.5"/>
  <rect x="32" y="68" width="74" height="44" rx="2" fill="#c9a55a" stroke="#9e8040" stroke-width="0.8"/>
  <rect x="42" y="42" width="54" height="26" rx="2" fill="#b0bec5" stroke="#78909c" stroke-width="0.8"/>
  <rect x="56" y="32" width="4" height="10" fill="#90a4ae"/>
  <rect x="64" y="28" width="4" height="14" fill="#90a4ae"/>
  <rect x="72" y="34" width="4" height="8" fill="#90a4ae"/>
  <rect x="46" y="46" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="58" y="46" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="70" y="46" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="82" y="46" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="46" y="57" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="58" y="57" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="70" y="57" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="82" y="57" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="36" y="72" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="48" y="72" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="60" y="72" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="72" y="72" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="84" y="72" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="96" y="72" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="36" y="84" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="48" y="84" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="60" y="84" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="72" y="84" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="84" y="84" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="96" y="84" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="36" y="96" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="48" y="96" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="60" y="96" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="72" y="96" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="84" y="96" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="96" y="96" width="8" height="8" rx="1" fill="#1a3a5c"/>
  <rect x="16" y="108" width="18" height="4" rx="1" fill="#1a3a5c"/>
</svg>`

// ===== PRODUCT IMAGES MAP =====
const productImages: Record<string, string> = {
  'Панелі перекриття': assetPath('/images/products/paneli-perekryttya.webp'),
  'Перемички залізобетонні': assetPath('/images/products/peremychky.webp'),
  'Плити плоскі': assetPath('/images/products/plyty-ploski.webp'),
  'Плити дорожні': assetPath('/images/products/plyty-dorozhni.webp'),
  'Сходові площадки': assetPath('/images/products/skhodovi-ploschadky.webp'),
  'Бордюр, поребрик': assetPath('/images/products/bordyur.webp'),
  'Плита огорожі': assetPath('/images/products/plyta-ogorozhi.webp'),
  'Блоки фундаментні': assetPath('/images/products/bloky-fundamentni.webp'),
  'Бетон на міксер (Відсів П-3)': assetPath('/images/products/beton-mikser.webp'),
  'Бетон на міксер (Пісок П-3)': assetPath('/images/products/beton-mikser.webp'),
  Прогони: assetPath('/images/products/prohony.webp'),
  Лотки: assetPath('/images/products/lotky.webp'),
  'Стовпчики для огорожі': assetPath('/images/products/stovpchyky-ogorozhi.webp'),
  'Палі забивні залізобетонні': assetPath('/images/products/pali-zabyvni.webp'),
  'Сходові марші': assetPath('/images/products/skhodovi-marshi.webp'),
  'Фундаменти стрічкові': assetPath('/images/products/fundamenty-strichkovi.webp'),
  'Плита аеродромна': assetPath('/images/products/plyta-aerodromna.webp'),
  'Плита ребриста': assetPath('/images/products/plyta-rebrysta.webp'),
  'Кільця каналізаційні': assetPath('/images/products/kiltsia-kanalizatsiyni.webp'),
  'Вироби з арматури': assetPath('/images/products/vyroby-armatury.webp'),
}

const productIcons: Record<string, string> = {
  'Панелі перекриття': '🏗️',
  'Перемички залізобетонні': '🧱',
  'Плити плоскі': '📐',
  'Плити дорожні': '🛤️',
  'Сходові площадки': '🪜',
  'Сходові марші': '🪜',
  'Бордюр, поребрик': '🚧',
  'Плита огорожі': '🏛️',
  Прогони: '📏',
  Лотки: '🔲',
  'Стовпчики для огорожі': '📍',
  'Палі забивні залізобетонні': '🔩',
  'Фундаменти стрічкові': '🏠',
  'Плита аеродромна': '✈️',
  'Плита ребриста': '📊',
  'Кільця каналізаційні': '⭕',
  'Вироби з арматури': '⚙️',
  'Блоки фундаментні': '🧊',
  'Бетон на міксер (Відсів П-3)': '🚛',
  'Бетон на міксер (Пісок П-3)': '🚛',
}

// ===== PRICE DATA =====
interface PriceItem {
  category: string
  name: string
  spec: string
  unit: string
  price: number | null
  note: string
}

const priceData: PriceItem[] = [
  {
    category: 'Перемички залізобетонні',
    name: 'Б',
    spec: '1ПБ-13-1п 1290×120×65',
    unit: 'шт',
    price: 135,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'Б-10',
    spec: '2ПБ-10-1п 1030×120×140',
    unit: 'шт',
    price: 225,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'Б-13',
    spec: '2ПБ-13-1п 1290×120×140',
    unit: 'шт',
    price: 245,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'Б-15',
    spec: '2ПБ-16-2п 1550×120×140',
    unit: 'шт',
    price: 325,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'Б-17',
    spec: '2ПБ-17-2п 1680×120×140',
    unit: 'шт',
    price: 345,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'Б-19',
    spec: '2ПБ-19-3п 1940×120×140',
    unit: 'шт',
    price: 375,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'Б-22',
    spec: '2ПБ-22-3п 2200×120×140',
    unit: 'шт',
    price: 455,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'Б-24',
    spec: '2ПБ-25-3п 2460×120×140',
    unit: 'шт',
    price: 495,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'Б-26',
    spec: '2ПБ-26-3п 2600×120×140',
    unit: 'шт',
    price: 555,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'Б-28',
    spec: '2ПБ-29-4п 2850×120×140',
    unit: 'шт',
    price: 655,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'Б-30',
    spec: '2ПБ-30-4п 2980×120×140',
    unit: 'шт',
    price: 675,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'Б-33',
    spec: '2ПБ-33-4п 3270×120×140',
    unit: 'шт',
    price: 705,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'БУ-13',
    spec: '3ПБ-13-37п 1290×120×220',
    unit: 'шт',
    price: 425,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'БУ-18',
    spec: '5ПБ-18-27п 1810×250×220',
    unit: 'шт',
    price: 1195,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'БУ-24',
    spec: '5ПБ-25-37п 2460×250×220',
    unit: 'шт',
    price: 1895,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'БУ-30',
    spec: '5ПБ-30-37п 2980×250×220',
    unit: 'шт',
    price: 2755,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'БУ-36',
    spec: '5ПБ-36-20п 3630×250×220',
    unit: 'шт',
    price: 2985,
    note: '',
  },
  {
    category: 'Плити плоскі',
    name: 'ПТП',
    spec: '3,0×1,2×0,12',
    unit: 'шт',
    price: 4650,
    note: '',
  },
  {
    category: 'Плити плоскі',
    name: 'ПТП',
    spec: '3,0×1,5×0,12',
    unit: 'шт',
    price: 5350,
    note: '',
  },
  {
    category: 'Плити дорожні',
    name: 'ПО-1',
    spec: '1,2×1,2×0,1 отв',
    unit: 'шт',
    price: 2350,
    note: '',
  },
  { category: 'Плити дорожні', name: 'КЦП 1-15-2', spec: 'отв', unit: 'шт', price: 3150, note: '' },
  {
    category: 'Плити дорожні',
    name: 'ПД',
    spec: '3,0×1,2×0,18',
    unit: 'шт',
    price: 6950,
    note: '',
  },
  {
    category: 'Плити дорожні',
    name: 'ПД',
    spec: '3,0×1,5×0,18',
    unit: 'шт',
    price: 7750,
    note: '',
  },
  {
    category: 'Сходові площадки',
    name: 'ЛП28-12',
    spec: '3,11×1,3×0,32',
    unit: 'шт',
    price: 5750,
    note: '',
  },
  {
    category: 'Сходові площадки',
    name: 'ЛП22-15',
    spec: '2,48×1,6×0,32',
    unit: 'шт',
    price: 4750,
    note: '',
  },
  {
    category: 'Сходові площадки',
    name: 'ЛП25-15',
    spec: '2,78×1,6×0,32',
    unit: 'шт',
    price: 5450,
    note: '',
  },
  {
    category: 'Бордюр, поребрик',
    name: 'Бордюр БП 30-3',
    spec: '3000×300×300',
    unit: 'шт',
    price: 695,
    note: '',
  },
  {
    category: 'Бордюр, поребрик',
    name: 'Бордюр БП15-30',
    spec: '1000×150×300',
    unit: 'шт',
    price: 185,
    note: '',
  },
  {
    category: 'Бордюр, поребрик',
    name: 'Поребрик БП 8-10',
    spec: '1000×80×200',
    unit: 'шт',
    price: 85,
    note: '',
  },
  {
    category: 'Плита огорожі',
    name: 'ПЗК',
    spec: '3,16×2,5×0,1',
    unit: 'шт',
    price: 4950,
    note: '',
  },
  {
    category: 'Прогони',
    name: 'ПРГ 60.2.5-4т',
    spec: '5,98×0,2×0,5',
    unit: 'шт',
    price: 10450,
    note: '',
  },
  {
    category: 'Прогони',
    name: 'ПРГ 36.1.4-4т',
    spec: '3,60×0,12×0,4',
    unit: 'шт',
    price: 2350,
    note: '',
  },
  { category: 'Лотки', name: 'Л-2', spec: '2,97×0,76×0,53', unit: 'шт', price: 3950, note: '' },
  {
    category: 'Стовпчики для огорожі',
    name: 'Ст-2,4',
    spec: '2,4×0,12×0,14',
    unit: 'шт',
    price: 515,
    note: '',
  },
  {
    category: 'Стовпчики для огорожі',
    name: 'Ст-3,9',
    spec: '3,9×0,10×0,10',
    unit: 'шт',
    price: 695,
    note: '',
  },
  {
    category: 'Палі забивні залізобетонні',
    name: 'С 5-30',
    spec: '',
    unit: 'шт',
    price: 4250,
    note: '',
  },
  {
    category: 'Палі забивні залізобетонні',
    name: 'С 6-30',
    spec: '',
    unit: 'шт',
    price: 4850,
    note: '',
  },
  {
    category: 'Сходові марші',
    name: 'ЛМ 28-12',
    spec: '2,72×1,2 / 8 ст',
    unit: 'шт',
    price: 5850,
    note: '',
  },
  {
    category: 'Сходові марші',
    name: 'ЛМ 30.12.15-4',
    spec: '3,03×1,2 / 9 ст',
    unit: 'шт',
    price: 6950,
    note: '',
  },
  {
    category: 'Фундаменти стрічкові',
    name: 'ФЛ 32-12',
    spec: '',
    unit: 'шт',
    price: 8650,
    note: '',
  },
  {
    category: 'Фундаменти стрічкові',
    name: 'ФЛ 24-12',
    spec: '',
    unit: 'шт',
    price: 4650,
    note: '',
  },
  {
    category: 'Фундаменти стрічкові',
    name: 'ФЛ 16-12',
    spec: '',
    unit: 'шт',
    price: 2250,
    note: '',
  },
  {
    category: 'Фундаменти стрічкові',
    name: 'ФЛ 10-12',
    spec: '',
    unit: 'шт',
    price: 1350,
    note: '',
  },
  {
    category: 'Плита аеродромна',
    name: 'ПДН',
    spec: '6,0×2,0×0,14',
    unit: 'шт',
    price: 19000,
    note: '',
  },
  {
    category: 'Плита ребриста',
    name: 'ПНС-16',
    spec: '6,0×1,5×0,25',
    unit: 'шт',
    price: 5950,
    note: '',
  },
  {
    category: 'Кільця каналізаційні',
    name: 'КЦ — 0,8 м',
    spec: 'Н=800',
    unit: 'шт',
    price: 750,
    note: '',
  },
  {
    category: 'Кільця каналізаційні',
    name: 'КЦ — 1,5 м',
    spec: 'Н=900',
    unit: 'шт',
    price: 1950,
    note: '',
  },
  { category: 'Панелі перекриття', name: '90-12-8', spec: '', unit: 'шт', price: 14650, note: '' },
  { category: 'Панелі перекриття', name: '75-12-8', spec: '', unit: 'шт', price: 10450, note: '' },
  { category: 'Панелі перекриття', name: '63-12-8', spec: '', unit: 'шт', price: 6850, note: '' },
  { category: 'Панелі перекриття', name: '60-12-8', spec: '', unit: 'шт', price: 6250, note: '' },
  { category: 'Панелі перекриття', name: '50-12-8', spec: '', unit: 'шт', price: 4550, note: '' },
  { category: 'Панелі перекриття', name: '40-12-8', spec: '', unit: 'шт', price: 3650, note: '' },
  { category: 'Панелі перекриття', name: '30-12-8', spec: '', unit: 'шт', price: 2750, note: '' },
  { category: 'Панелі перекриття', name: '21-12-8', spec: '', unit: 'шт', price: 2050, note: '' },
  {
    category: 'Блоки фундаментні',
    name: 'ФБС 24-3-6',
    spec: '',
    unit: 'шт',
    price: 1355,
    note: '',
  },
  {
    category: 'Блоки фундаментні',
    name: 'ФБС 24-4-6',
    spec: '',
    unit: 'шт',
    price: 1675,
    note: '',
  },
  {
    category: 'Блоки фундаментні',
    name: 'ФБС 24-5-6',
    spec: '',
    unit: 'шт',
    price: 2055,
    note: '',
  },
  {
    category: 'Блоки фундаментні',
    name: 'ФБС 24-6-6',
    spec: '',
    unit: 'шт',
    price: 2435,
    note: '',
  },
  { category: 'Блоки фундаментні', name: 'ФБС 12-3-6', spec: '', unit: 'шт', price: 745, note: '' },
  {
    category: 'Блоки фундаментні',
    name: 'ФБС 12-6-6',
    spec: '',
    unit: 'шт',
    price: 1315,
    note: '',
  },
  {
    category: 'Бетон на міксер (Відсів П-3)',
    name: 'М-100 П-3 / В-7,5',
    spec: '',
    unit: 'м³',
    price: 2065,
    note: '',
  },
  {
    category: 'Бетон на міксер (Відсів П-3)',
    name: 'М-200 П-3 / В-15',
    spec: '',
    unit: 'м³',
    price: 2615,
    note: '',
  },
  {
    category: 'Бетон на міксер (Відсів П-3)',
    name: 'М-300 П-3 / В-22,5',
    spec: '',
    unit: 'м³',
    price: 3115,
    note: '',
  },
  {
    category: 'Бетон на міксер (Пісок П-3)',
    name: 'М-200 П-3 / В-15',
    spec: '',
    unit: 'м³',
    price: 2725,
    note: '',
  },
  {
    category: 'Бетон на міксер (Пісок П-3)',
    name: 'М-300 П-3 / В-22,5',
    spec: '',
    unit: 'м³',
    price: 3255,
    note: '',
  },
  {
    category: 'Бетон на міксер (Пісок П-3)',
    name: 'М-400 П-3 / В-30',
    spec: '',
    unit: 'м³',
    price: 3565,
    note: '',
  },
  {
    category: 'Вироби з арматури',
    name: 'Сітка цег. клад.',
    spec: '',
    unit: 'тн',
    price: null,
    note: 'За запитом',
  },
  {
    category: 'Вироби з арматури',
    name: 'Каркас плоский / просторовий',
    spec: '',
    unit: 'тн',
    price: null,
    note: 'За запитом',
  },
]

// ===== UNIQUE CATEGORIES =====
const categories = [...new Set(priceData.map((i) => i.category))]

// ===== PRODUCT CARD CATEGORIES =====
interface ProductCategory {
  name: string
  image: string | null
  icon: string
  desc: string
  priceFrom: number | null
  priceTo: number | null
}

const mergeGroups: Record<string, string[]> = {
  'Бетон на міксер': ['Бетон на міксер (Відсів П-3)', 'Бетон на міксер (Пісок П-3)'],
}
const mergedChildren = new Set(Object.values(mergeGroups).flat())

function getProductCategories(): ProductCategory[] {
  const result: ProductCategory[] = []
  const handled = new Set<string>()

  for (const cat of categories) {
    if (handled.has(cat)) continue
    const groupName = Object.keys(mergeGroups).find((g) => mergeGroups[g].includes(cat))

    if (groupName && !handled.has(groupName)) {
      const children = mergeGroups[groupName]
      children.forEach((c) => handled.add(c))
      handled.add(groupName)
      const allItems = priceData.filter((i) => children.includes(i.category))
      const prices = allItems.map((i) => i.price).filter((p): p is number => p !== null && p > 0)
      result.push({
        name: groupName,
        image: productImages[children[0]] ?? null,
        icon: productIcons[children[0]] ?? '🏗️',
        desc: `${allItems.length} позицій у каталозі`,
        priceFrom: prices.length ? Math.min(...prices) : null,
        priceTo: prices.length ? Math.max(...prices) : null,
      })
    } else if (!mergedChildren.has(cat)) {
      const allItems = priceData.filter((i) => i.category === cat)
      const prices = allItems.map((i) => i.price).filter((p): p is number => p !== null && p > 0)
      result.push({
        name: cat,
        image: productImages[cat] ?? null,
        icon: productIcons[cat] ?? '🏗️',
        desc: `${allItems.length} позицій у каталозі`,
        priceFrom: prices.length ? Math.min(...prices) : null,
        priceTo: prices.length ? Math.max(...prices) : null,
      })
    }
  }
  return result
}

// ===== HELPERS =====
const escMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}
function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => escMap[c])
}

// ===== HERO IMAGES =====
const heroImages = [
  assetPath('/images/hero/hero-bg-1.webp'),
  assetPath('/images/hero/hero-main.webp'),
]

// ===== SHOWCASE IMAGES =====
const showcaseImages = [
  { src: assetPath('/images/products/paneli-perekryttya.webp'), label: 'Панелі перекриття' },
  { src: assetPath('/images/products/bloky-fundamentni.webp'), label: 'Блоки ФБС' },
  { src: assetPath('/images/products/peremychky.webp'), label: 'Перемички' },
  { src: assetPath('/images/products/plyty-dorozhni.webp'), label: 'Плити дорожні' },
  { src: assetPath('/images/products/beton-mikser.webp'), label: 'Бетон на міксер' },
  { src: assetPath('/images/products/skhodovi-marshi.webp'), label: 'Сходові марші' },
  { src: assetPath('/images/products/fundamenty-strichkovi.webp'), label: 'Фундаменти' },
  { src: assetPath('/images/products/bordyur.webp'), label: 'Бордюри' },
  { src: assetPath('/images/products/pali-zabyvni.webp'), label: 'Палі забивні' },
  { src: assetPath('/images/products/plyta-aerodromna.webp'), label: 'Аеродромні плити' },
]

// ===== MARQUEE ITEMS =====
const marqueeItems = [
  'Плити перекриття',
  'Фундаментні блоки',
  'Товарний бетон',
  'Перемички ЗБ',
  'Дорожні плити',
  'Сходові марші',
  'Бордюри',
  'Аеродромні плити',
  'Прогони',
  'Кільця каналізаційні',
  'Палі забивні',
  'Фундаменти стрічкові',
]

// ===== PARTICLES GENERATOR =====
function generateParticles(count: number): string {
  const types = ['square', 'line', 'dot', 'cross']
  let html = ''
  for (let i = 0; i < count; i++) {
    const type = types[i % types.length]
    const left = Math.random() * 100
    const delay = Math.random() * 15
    const duration = 10 + Math.random() * 15
    const opacity = 0.15 + Math.random() * 0.25
    html += `<div class="particle particle--${type}" style="left:${left}%;animation:particleFloat ${duration}s linear ${delay}s infinite;opacity:${opacity}"></div>`
  }
  return html
}

// ===== RENDER APP =====
function render() {
  const app = document.getElementById('app')
  if (!app) return

  const prodCats = getProductCategories()
  const showcaseDoubled = [...showcaseImages, ...showcaseImages]

  app.innerHTML = `
    <!-- PAGE LOADER -->
    <div class="page-loader" id="pageLoader">
      <div class="loader-logo">${logoSVG}</div>
      <div class="loader-bar"></div>
    </div>

    <!-- HEADER -->
    <header class="header" id="header">
      <div class="header__inner">
        <a href="#hero" class="logo">
          <div class="logo__icon">${logoSVG}</div>
          <div class="logo__text">
            <span class="logo__name">ОЗ ЗБВіК</span>
            <span class="logo__sub">Завод залізобетонних виробів</span>
          </div>
        </a>
        <div class="nav-overlay" id="navOverlay"></div>
        <nav class="nav" id="nav">
          <ul class="nav__list">
            <li><a href="#about" class="nav__link">Про нас</a></li>
            <li><a href="#products" class="nav__link">Продукція</a></li>
            <li><a href="#price" class="nav__link">Прайс</a></li>
            <li><a href="#contacts" class="nav__link">Контакти</a></li>
            <li><a href="tel:+380432664643" class="nav__link nav__cta">📞 Зателефонувати</a></li>
          </ul>
        </nav>
        <button class="burger" id="burger" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <!-- HERO -->
    <section class="hero" id="hero">
      <div class="hero__bg">
        <img class="hero__bg-image" src="${heroImages[0]}" alt="" loading="eager" id="heroBgImg" />
        <div class="hero__bg-overlay"></div>
        <div class="hero__noise"></div>
        <div class="hero__particles" id="heroParticles">
          ${generateParticles(20)}
        </div>
      </div>
      <div class="hero__content">
        <div class="hero__info">
          <div class="hero__badge">
            <span class="hero__badge-dot"></span>
            Працюємо з 1963 року
          </div>
          <h1 class="hero__title">
            Залізобетонні<br>
            <span class="hero__title-accent">вироби</span> та<br>
            конструкції
          </h1>
          <p class="hero__desc">Виробництво та продаж якісних ЗБВ у Вінниці. Від плит перекриття та фундаментних блоків до товарного бетону — все від виробника.</p>
          <div class="hero__actions">
            <a href="#products" class="btn btn--primary btn--large">Каталог продукції</a>
            <a href="#contacts" class="btn btn--outline">Як нас знайти</a>
          </div>
        </div>
        <div class="hero__visual">
          <div class="hero__gallery">
            <div class="hero__gallery-item">
              <img src="${heroImages[0]}" alt="Виробництво ЗБВ" width="400" height="416" loading="eager" />
            </div>
            <div class="hero__gallery-item">
              <img src="${heroImages[1]}" alt="Завод ЗБВіК" width="400" height="200" loading="eager" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS ROW -->
    <div class="hero__stats-row">
      <div class="hero__stats">
        <div class="hero__stat">
          <div class="hero__stat-num" data-count="60">0</div>
          <div class="hero__stat-label">років досвіду</div>
        </div>
        <div class="hero__stat">
          <div class="hero__stat-num" data-count="200">0</div>
          <div class="hero__stat-label">видів продукції</div>
        </div>
        <div class="hero__stat">
          <div class="hero__stat-num" data-count="1963">0</div>
          <div class="hero__stat-label">рік заснування</div>
        </div>
      </div>
    </div>

    <!-- MARQUEE TICKER -->
    <div class="marquee">
      <div class="marquee__inner">
        ${[...marqueeItems, ...marqueeItems].map((item) => `<span class="marquee__item"><span class="marquee__sep"></span>${esc(item)}</span>`).join('')}
      </div>
    </div>

    <!-- ABOUT -->
    <section class="section section--light" id="about">
      <div class="container">
        <div class="section__header reveal">
          <div class="section__badge">🏭 Про підприємство</div>
          <h2 class="section__title">Обласний завод <span class="section__title-accent">залізобетонних</span> виробів</h2>
          <p class="section__subtitle">ПрАТ «ОЗ ЗБВіК» — одне з провідних підприємств Вінницької області у галузі виробництва ЗБВ та бетонних розчинів</p>
          <div class="section__line"></div>
        </div>
        <div class="about-grid">
          <div class="about-card about-card--wide about-card--highlight reveal delay-1">
            <div class="about-card__icon">🏭</div>
            <h3 class="about-card__title">Власне виробництво</h3>
            <p class="about-card__text">Повний цикл виробництва ЗБВ на сучасному обладнанні з 1963 року. Контроль якості на кожному етапі — від арматурного каркаса до готового виробу.</p>
          </div>
          <div class="about-card reveal delay-2">
            <div class="about-card__icon">📋</div>
            <h3 class="about-card__title">Широкий асортимент</h3>
            <p class="about-card__text">Понад 200 найменувань продукції для житлового, промислового та дорожнього будівництва.</p>
          </div>
          <div class="about-card reveal delay-3">
            <div class="about-card__icon">💰</div>
            <h3 class="about-card__title">Ціни від виробника</h3>
            <p class="about-card__text">Працюємо без посередників — оптові та роздрібні ціни напряму від заводу.</p>
          </div>
          <div class="about-card reveal delay-4">
            <div class="about-card__icon">🚛</div>
            <h3 class="about-card__title">Доставка</h3>
            <p class="about-card__text">Власний автотранспорт для доставки по Вінницькій області та Україні.</p>
          </div>
          <div class="about-card about-card--highlight reveal delay-5">
            <div class="about-card__icon">🔬</div>
            <h3 class="about-card__title">Власна лабораторія</h3>
            <p class="about-card__text">Випробування міцності, морозостійкості та водонепроникності кожної партії. Сертифікована продукція згідно ДСТУ.</p>
          </div>
          <div class="about-card about-card--wide reveal delay-6">
            <div class="about-card__icon">🏗️</div>
            <h3 class="about-card__title">Комплектація об'єкта</h3>
            <p class="about-card__text">Плити, блоки, перемички, сходи, бордюри — все для будівництва в одному замовленні. Індивідуальний прорахунок під ваш проект.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SHOWCASE GALLERY STRIP -->
    <div class="showcase">
      <div class="showcase__strip">
        ${showcaseDoubled
          .map(
            (img) => `
          <div class="showcase__item">
            <img src="${img.src}" alt="${esc(img.label)}" loading="lazy" />
            <span class="showcase__label">${esc(img.label)}</span>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>

    <!-- PRODUCTS -->
    <section class="section section--light" id="products">
      <div class="container">
        <div class="section__header reveal">
          <div class="section__badge">📦 Наша продукція</div>
          <h2 class="section__title">Каталог <span class="section__title-accent">залізобетонних</span> виробів</h2>
          <p class="section__subtitle">Виробляємо широкий спектр ЗБВ для будь-яких типів будівництва</p>
          <div class="section__line"></div>
        </div>
        <div class="products-grid">
          ${prodCats
            .map(
              (cat, i) => `
            <div class="product-card reveal delay-${(i % 4) + 1}" data-category="${esc(cat.name)}" role="button" tabindex="0" aria-label="${esc(cat.name)} — переглянути прайс">
              <div class="product-card__img">
                ${
                  cat.image
                    ? `<img src="${cat.image}" alt="${esc(cat.name)}" width="600" height="400" loading="lazy" decoding="async" />
                     <div class="product-card__overlay"><span class="product-card__overlay-text">Переглянути прайс</span></div>`
                    : `<div class="product-card__no-img">${cat.icon}</div>`
                }
              </div>
              <div class="product-card__body">
                <div class="product-card__category">${cat.icon} ${esc(cat.name)}</div>
                <h3 class="product-card__name">${esc(cat.name)}</h3>
                <p class="product-card__desc">${esc(cat.desc)}</p>
              </div>
            </div>
          `,
            )
            .join('')}
        </div>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="cta">
      <div class="cta__bg-shape cta__bg-shape--1"></div>
      <div class="cta__bg-shape cta__bg-shape--2"></div>
      <div class="container">
        <div class="cta__content reveal">
          <h2 class="cta__title">Потрібна консультація або розрахунок?</h2>
          <p class="cta__desc">Наші менеджери допоможуть підібрати продукцію, розрахувати необхідну кількість та організувати доставку</p>
          <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
            <a href="tel:+380432664643" class="btn btn--primary btn--large">📞 Зателефонувати</a>
            <a href="mailto:ozzbvik@meta.ua" class="btn btn--outline">📧 Написати на пошту</a>
          </div>
        </div>
      </div>
    </section>

    <!-- PRICE TABLE -->
    <section class="section section--dark" id="price">
      <div class="container">
        <div class="section__header reveal">
          <h2 class="section__title"><span class="section__title-accent">Наша продукція</span></h2>
        </div>
        <div class="price-tabs reveal" id="priceTabs">
          ${categories
            .map(
              (cat, i) => `
            <button class="price-tab${i === 0 ? ' active' : ''}" data-tab="${esc(cat)}">${esc(cat)}</button>
          `,
            )
            .join('')}
        </div>
        <div class="price-table-wrapper reveal">
          <table class="price-table" id="priceTable">
            <thead>
              <tr>
                <th scope="col">Марка</th>
                <th scope="col">Характеристика</th>
                <th scope="col" class="price-table__unit-col">Од.</th>
              </tr>
            </thead>
            <tbody id="priceBody"></tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- CONTACTS -->
    <section class="section section--dark" id="contacts">
      <div class="container">
        <div class="section__header reveal">
          <div class="section__badge">📍 Контакти</div>
          <h2 class="section__title">Як нас <span class="section__title-accent">знайти</span></h2>
          <p class="section__subtitle">Ми знаходимося у Вінниці. Приїжджайте — покажемо виробництво та продукцію</p>
          <div class="section__line"></div>
        </div>
        <div class="contact-grid reveal">
          <div class="contact-panel">
            <div class="contact-info">
              <div class="contact-item">
                <div class="contact-item__icon">📍</div>
                <div class="contact-item__body">
                  <div class="contact-item__label">Адреса</div>
                  <div class="contact-item__value">21022, м. Вінниця, вул. Айвазовського, 4-А</div>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-item__icon">📞</div>
                <div class="contact-item__body">
                  <div class="contact-item__label">Телефон</div>
                  <div class="contact-item__value contact-item__value--phones">
                    <a href="tel:+380432664643">(0432) 66-46-43</a>
                    <span class="contact-item__divider">/</span>
                    <a href="tel:+380432670384">(0432) 67-03-84</a>
                  </div>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-item__icon">📱</div>
                <div class="contact-item__body">
                  <div class="contact-item__label">Мобільний</div>
                  <div class="contact-item__value contact-item__value--phones">
                    <a href="tel:+380504233009">(050) 423-30-09</a>
                    <span class="contact-item__divider">/</span>
                    <a href="tel:+380504613851">(050) 461-38-51</a>
                  </div>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-item__icon">📧</div>
                <div class="contact-item__body">
                  <div class="contact-item__label">E-mail</div>
                  <div class="contact-item__value"><a href="mailto:ozzbvik@meta.ua">ozzbvik@meta.ua</a></div>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-item__icon">🕐</div>
                <div class="contact-item__body">
                  <div class="contact-item__label">Графік роботи</div>
                  <div class="contact-item__value">Пн-Пт: 07:00 – 16:00</div>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-item__icon">📄</div>
                <div class="contact-item__body">
                  <div class="contact-item__label">ЄДРПОУ</div>
                  <div class="contact-item__value">03326920</div>
                </div>
              </div>
            </div>
          </div>
          <div class="map-panel">
            <div class="map-panel__head">🏭 ОЗ ЗБВіК • КАРТА</div>
            <div class="map-wrapper">
              <div id="factoryMap" class="factory-map" aria-label="Карта розташування заводу"></div>
            </div>
            <div class="map-panel__note">Точка на карті позначає територію заводу</div>
            <div class="map-panel__actions">
              <a href="https://www.google.com/maps?q=49.259756551931645,28.48389620346503" class="btn btn--primary" target="_blank" rel="noreferrer">
                Відкрити в Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <div class="logo">
              <div class="logo__icon">${logoSVG}</div>
              <div class="logo__text">
                <span class="logo__name">ОЗ ЗБВіК</span>
                <span class="logo__sub">Завод залізобетонних виробів</span>
              </div>
            </div>
            <p class="footer__desc">Виробництво залізобетонних виробів та конструкцій у Вінниці з 1963 року. Широкий асортимент продукції для будівництва.</p>
          </div>
          <div>
            <h4 class="footer__heading">Навігація</h4>
            <div class="footer__links">
              <a href="#about" class="footer__link">Про нас</a>
              <a href="#products" class="footer__link">Продукція</a>
              <a href="#price" class="footer__link">Прайс-лист</a>
              <a href="#contacts" class="footer__link">Контакти</a>
            </div>
          </div>
          <div>
            <h4 class="footer__heading">Контакти</h4>
            <div class="footer__links">
              <a href="tel:+380432664643" class="footer__link">📞 (0432) 66-46-43</a>
              <a href="tel:+380432670384" class="footer__link">📞 (0432) 67-03-84</a>
              <a href="mailto:ozzbvik@meta.ua" class="footer__link">📧 ozzbvik@meta.ua</a>
              <span class="footer__link">📍 м. Вінниця, вул. Айвазовського, 4-А</span>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <span>© ${new Date().getFullYear()} ПрАТ «ОЗ ЗБВіК». Всі права захищені.</span>
          <span>ЄДРПОУ: 03326920</span>
        </div>
      </div>
    </footer>

    <!-- SCROLL TOP -->
    <button class="scroll-top" id="scrollTop" aria-label="Повернутися нагору">↑</button>
  `

  initInteractions()
  initFactoryMap()
}

// ===== INTERACTIONS =====
function initInteractions() {
  // Page loader — hide after load
  const loader = document.getElementById('pageLoader')
  window.setTimeout(() => loader?.classList.add('hidden'), 1400)

  // Header scroll
  const header = document.getElementById('header')
  const scrollBtn = document.getElementById('scrollTop')

  window.addEventListener(
    'scroll',
    () => {
      header?.classList.toggle('header--scrolled', window.scrollY > 50)
      scrollBtn?.classList.toggle('visible', window.scrollY > 600)
    },
    { passive: true },
  )
  header?.classList.toggle('header--scrolled', window.scrollY > 50)

  // Hero parallax on scroll
  const heroBgImg = document.getElementById('heroBgImg') as HTMLImageElement | null
  if (heroBgImg) {
    window.addEventListener(
      'scroll',
      () => {
        const offset = window.scrollY * 0.3
        heroBgImg.style.transform = `translateY(${offset}px) scale(1.05)`
      },
      { passive: true },
    )
  }

  // Mobile burger
  const burger = document.getElementById('burger')
  const nav = document.getElementById('nav')
  const overlay = document.getElementById('navOverlay')
  burger?.addEventListener('click', () => {
    burger.classList.toggle('active')
    nav?.classList.toggle('open')
    overlay?.classList.toggle('active')
  })
  overlay?.addEventListener('click', () => {
    burger?.classList.remove('active')
    nav?.classList.remove('open')
    overlay?.classList.remove('active')
  })
  nav?.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      burger?.classList.remove('active')
      nav?.classList.remove('open')
      overlay?.classList.remove('active')
    })
  })

  // ===== SCROLL REVEAL =====
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.08, rootMargin: '0px 0px -60px 0px' },
  )

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
    revealObserver.observe(el)
  })

  // ===== ANIMATED COUNTERS =====
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          const target = parseInt(el.dataset.count ?? '0', 10)
          animateCounter(el, target)
          counterObserver.unobserve(el)
        }
      })
    },
    { threshold: 0.5 },
  )

  document.querySelectorAll('[data-count]').forEach((el) => counterObserver.observe(el))

  // ===== PRICE TABS =====
  const tabs = document.getElementById('priceTabs')
  const body = document.getElementById('priceBody')

  function renderTable(cats: string[]) {
    if (!body) return
    const items = priceData.filter((i) => cats.includes(i.category))
    body.innerHTML = items
      .map(
        (item) => `
      <tr>
        <td><strong>${esc(item.name)}</strong></td>
        <td>${esc(item.spec)}</td>
        <td class="price-table__unit-col"><span class="price-table__unit-badge">${esc(item.unit)}</span></td>
      </tr>`,
      )
      .join('')
  }

  if (categories.length > 0) renderTable([categories[0]])

  tabs?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.classList.contains('price-tab')) return
    tabs.querySelectorAll('.price-tab').forEach((t) => t.classList.remove('active'))
    target.classList.add('active')
    const cat = target.dataset.tab
    if (cat) renderTable([cat])
  })

  // Product card click -> scroll to price
  document.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('click', () => {
      const cat = (card as HTMLElement).dataset.category
      if (!cat) return
      const children = mergeGroups[cat]
      if (children) {
        tabs?.querySelectorAll('.price-tab').forEach((t) => t.classList.remove('active'))
        children.forEach((c) => {
          const tab = tabs?.querySelector(`[data-tab="${c}"]`) as HTMLElement | null
          tab?.classList.add('active')
        })
        renderTable(children)
      } else {
        const tab = tabs?.querySelector(`[data-tab="${cat}"]`) as HTMLElement | null
        if (tab) {
          tabs?.querySelectorAll('.price-tab').forEach((t) => t.classList.remove('active'))
          tab.classList.add('active')
          renderTable([cat])
        }
      }
      document.getElementById('price')?.scrollIntoView({ behavior: 'smooth' })
    })
    ;(card as HTMLElement).style.cursor = 'pointer'
    card.addEventListener('keydown', (e) => {
      if ((e as KeyboardEvent).key === 'Enter' || (e as KeyboardEvent).key === ' ') {
        e.preventDefault()
        ;(card as HTMLElement).click()
      }
    })
  })

  // Scroll to top
  scrollBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

// ===== ANIMATED COUNTER =====
function animateCounter(el: HTMLElement, target: number) {
  const duration = 2000
  const start = performance.now()
  const suffix = target === 60 ? '+' : target === 200 ? '+' : ''

  function update(now: number) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
    const current = Math.round(eased * target)
    el.textContent = current.toLocaleString('uk-UA') + suffix
    if (progress < 1) requestAnimationFrame(update)
  }

  requestAnimationFrame(update)
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', render)
