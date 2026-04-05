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

const mapCoords = {
  lat: 49.259756551931645,
  lng: 28.48389620346503,
}

const assetBase = import.meta.env.BASE_URL

function assetPath(path: string) {
  return `${assetBase}${path.replace(/^\/+/, '')}`
}

let leafletLoader: Promise<NonNullable<typeof window.L>> | null = null

function loadLeaflet() {
  if (window.L) return Promise.resolve(window.L)
  if (leafletLoader) return leafletLoader

  leafletLoader = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.async = true
    script.onload = () => {
      if (window.L) {
        resolve(window.L)
      } else {
        reject(new Error('Leaflet did not initialize'))
      }
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
        iconSize: [44, 44],
        iconAnchor: [22, 22],
        popupAnchor: [0, -18],
      })

      L.marker([mapCoords.lat, mapCoords.lng], { icon: markerIcon })
        .addTo(map)
        .bindPopup(
          `
            <div class="factory-popup">
              <strong>ПрАТ «ОЗ ЗБВіК»</strong>
              <span>вул. Айвазовського, 4-А</span>
              <a href="tel:+380432664643">(0432) 66-46-43</a>
            </div>
          `,
          {
            autoClose: false,
            closeOnClick: false,
            className: 'factory-popup-shell',
          },
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
        </div>
      `
    })
}

// ===== SVG LOGO INLINE =====
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
  'Панелі перекриття': assetPath('/images/products/paneli-perekryttya.jpg'),
  'Перемички залізобетонні': assetPath('/images/products/peremychky.jpg'),
  'Плити плоскі': assetPath('/images/products/plyty-ploski.jpg'),
  'Плити дорожні': assetPath('/images/products/plyty-dorozhni.png'),
  'Сходові площадки': assetPath('/images/products/skhodovi-ploschadky.jpg'),
  'Бордюр, поребрик': assetPath('/images/products/bordyur.jpg'),
  'Плита огорожі': assetPath('/images/products/plyta-ogorozhi.png'),
  'Блоки фундаментні': assetPath('/images/products/bloky-fundamentni.png'),
  'Бетон на міксер (Відсів П-3)': assetPath('/images/products/beton-mikser.png'),
  'Бетон на міксер (Пісок П-3)': assetPath('/images/products/beton-mikser.png'),
  Прогони: assetPath('/images/products/prohony.png'),
  Лотки: assetPath('/images/products/lotky.png'),
  'Стовпчики для огорожі': assetPath('/images/products/stovpchyky-ogorozhi.png'),
  'Палі забивні залізобетонні': assetPath('/images/products/pali-zabyvni.png'),
  'Сходові марші': assetPath('/images/products/skhodovi-marshi.jpg'),
  'Фундаменти стрічкові': assetPath('/images/products/fundamenty-strichkovi.png'),
  'Плита аеродромна': assetPath('/images/products/plyta-aerodromna.png'),
  'Плита ребриста': assetPath('/images/products/plyta-rebrysta.png'),
  'Кільця каналізаційні': assetPath('/images/products/kiltsia-kanalizatsiyni.png'),
  'Вироби з арматури': assetPath('/images/products/vyroby-armatury.png'),
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
    name: 'БУ-15',
    spec: '3ПБ-16-37п 1550×120×220',
    unit: 'шт',
    price: 545,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'БУ-18б',
    spec: '3ПБ-18-37п 1810×120×220',
    unit: 'шт',
    price: 695,
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
    name: 'БУ-20б',
    spec: '3ПБ-21-8п 2070×120×220',
    unit: 'шт',
    price: 685,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'БУ-20',
    spec: '5ПБ-21-27п 2070×250×220',
    unit: 'шт',
    price: 1395,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'БУ-24б',
    spec: '3ПБ-25-8п 2460×120×220',
    unit: 'шт',
    price: 795,
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
    name: 'БУ-27б',
    spec: '3ПБ-27-8п 2720×120×220',
    unit: 'шт',
    price: 875,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'БУ-27',
    spec: '5ПБ-27-37п 2720×250×220',
    unit: 'шт',
    price: 2195,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'БУ-30б',
    spec: '3ПБ-30-8п 2980×120×220',
    unit: 'шт',
    price: 975,
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
    name: 'БУ-32б',
    spec: '3ПБ-31-8п 3110×120×220',
    unit: 'шт',
    price: 985,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'БУ-32',
    spec: '5ПБ-31-27п 3110×250×220',
    unit: 'шт',
    price: 2705,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'БУ-34б',
    spec: '3ПБ-34-4п 3370×120×220',
    unit: 'шт',
    price: 1035,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'БУ-34',
    spec: '5ПБ-34-20п 3370×250×220',
    unit: 'шт',
    price: 2815,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'БУ-36б',
    spec: '3ПБ-36-4п 3630×120×220',
    unit: 'шт',
    price: 1185,
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
    category: 'Перемички залізобетонні',
    name: 'БУ-39б',
    spec: '3ПБ-39-4п 3900×120×220',
    unit: 'шт',
    price: 1475,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'ЗПП 14-71п',
    spec: '1420×380×220',
    unit: 'шт',
    price: 1515,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'ЗПП 16-71п',
    spec: '1550×380×220',
    unit: 'шт',
    price: 1615,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'ЗПП 18-71п',
    spec: '1810×380×220',
    unit: 'шт',
    price: 1915,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'ЗПП 21-71п',
    spec: '2070×380×220',
    unit: 'шт',
    price: 2255,
    note: '',
  },
  {
    category: 'Перемички залізобетонні',
    name: 'ЗПП 27-71п',
    spec: '2720×380×220',
    unit: 'шт',
    price: 3585,
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
  { category: 'Плити дорожні', name: 'КЦД 1-15-2', spec: '', unit: 'шт', price: 3550, note: '' },
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
    name: 'ЛП25-18',
    spec: '2,78×1,82×0,32',
    unit: 'шт',
    price: 6150,
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
    name: 'ПРГ 60.1/6.5-4т',
    spec: '5,98×0,16×0,5',
    unit: 'шт',
    price: 10050,
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
  {
    category: 'Прогони',
    name: 'ПРГ 32.1.4-4т',
    spec: '3,20×0,12×0,4',
    unit: 'шт',
    price: 2050,
    note: '',
  },
  {
    category: 'Прогони',
    name: 'ПРГ 28.1.4-4т',
    spec: '2,80×0,12×0,4',
    unit: 'шт',
    price: 1575,
    note: '',
  },
  { category: 'Лотки', name: 'Л-2', spec: '2,97×0,76×0,53', unit: 'шт', price: 3950, note: '' },
  { category: 'Лотки', name: 'П 5-8', spec: '2,99×0,78×0,07', unit: 'шт', price: 2250, note: '' },
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
    name: 'ЛМ 28-13,5',
    spec: '2,72×1,35 / 8 ст',
    unit: 'шт',
    price: 6750,
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
    category: 'Сходові марші',
    name: 'ЛМ 30.13,5.15-4',
    spec: '3,03×1,35 / 9 ст',
    unit: 'шт',
    price: 7850,
    note: '',
  },
  {
    category: 'Сходові марші',
    name: 'ЛМ 28-116',
    spec: '3,26×1,05 / 9 ст',
    unit: 'шт',
    price: 5550,
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
    name: 'ФЛ 28-12',
    spec: '',
    unit: 'шт',
    price: 6850,
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
    name: 'ФЛ 20-12',
    spec: '',
    unit: 'шт',
    price: 4550,
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
    name: 'ФЛ 16-24',
    spec: '',
    unit: 'шт',
    price: 4500,
    note: '',
  },
  {
    category: 'Фундаменти стрічкові',
    name: 'ФЛ 14-12',
    spec: '',
    unit: 'шт',
    price: 1850,
    note: '',
  },
  {
    category: 'Фундаменти стрічкові',
    name: 'ФЛ 14-24',
    spec: '',
    unit: 'шт',
    price: 3750,
    note: '',
  },
  {
    category: 'Фундаменти стрічкові',
    name: 'ФЛ 12-12',
    spec: '',
    unit: 'шт',
    price: 1550,
    note: '',
  },
  {
    category: 'Фундаменти стрічкові',
    name: 'ФЛ 12-24',
    spec: '',
    unit: 'шт',
    price: 3150,
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
    category: 'Фундаменти стрічкові',
    name: 'ФЛ 10-24',
    spec: '',
    unit: 'шт',
    price: 2750,
    note: '',
  },
  {
    category: 'Фундаменти стрічкові',
    name: 'ФЛ 8-12',
    spec: '',
    unit: 'шт',
    price: 1050,
    note: '',
  },
  {
    category: 'Фундаменти стрічкові',
    name: 'ФЛ 8-24',
    spec: '',
    unit: 'шт',
    price: 2150,
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
  { category: 'Панелі перекриття', name: '88-12-8', spec: '', unit: 'шт', price: 14250, note: '' },
  { category: 'Панелі перекриття', name: '84-12-8', spec: '', unit: 'шт', price: 13450, note: '' },
  { category: 'Панелі перекриття', name: '80-12-8', spec: '', unit: 'шт', price: 12550, note: '' },
  { category: 'Панелі перекриття', name: '78-12-8', spec: '', unit: 'шт', price: 11350, note: '' },
  { category: 'Панелі перекриття', name: '76-12-8', spec: '', unit: 'шт', price: 10850, note: '' },
  { category: 'Панелі перекриття', name: '75-12-8', spec: '', unit: 'шт', price: 10450, note: '' },
  { category: 'Панелі перекриття', name: '75-15-8', spec: '', unit: 'шт', price: 13350, note: '' },
  { category: 'Панелі перекриття', name: '72-12-8', spec: '', unit: 'шт', price: 9150, note: '' },
  { category: 'Панелі перекриття', name: '72-15-8', spec: '', unit: 'шт', price: 11950, note: '' },
  { category: 'Панелі перекриття', name: '70-12-8', spec: '', unit: 'шт', price: 8965, note: '' },
  { category: 'Панелі перекриття', name: '70-15-8', spec: '', unit: 'шт', price: 11550, note: '' },
  { category: 'Панелі перекриття', name: '68-12-8', spec: '', unit: 'шт', price: 8750, note: '' },
  { category: 'Панелі перекриття', name: '68-15-8', spec: '', unit: 'шт', price: 10950, note: '' },
  { category: 'Панелі перекриття', name: '66-12-8', spec: '', unit: 'шт', price: 7950, note: '' },
  { category: 'Панелі перекриття', name: '66-15-8', spec: '', unit: 'шт', price: 10150, note: '' },
  { category: 'Панелі перекриття', name: '63-12-8', spec: '', unit: 'шт', price: 6850, note: '' },
  { category: 'Панелі перекриття', name: '63-15-8', spec: '', unit: 'шт', price: 8650, note: '' },
  { category: 'Панелі перекриття', name: '60-12-8', spec: '', unit: 'шт', price: 6250, note: '' },
  { category: 'Панелі перекриття', name: '60-15-8', spec: '', unit: 'шт', price: 7750, note: '' },
  { category: 'Панелі перекриття', name: '59-12-8', spec: '', unit: 'шт', price: 5850, note: '' },
  { category: 'Панелі перекриття', name: '59-15-8', spec: '', unit: 'шт', price: 7550, note: '' },
  { category: 'Панелі перекриття', name: '58-12-8', spec: '', unit: 'шт', price: 5650, note: '' },
  { category: 'Панелі перекриття', name: '58-15-8', spec: '', unit: 'шт', price: 7350, note: '' },
  { category: 'Панелі перекриття', name: '57-12-8', spec: '', unit: 'шт', price: 5450, note: '' },
  { category: 'Панелі перекриття', name: '57-15-8', spec: '', unit: 'шт', price: 7150, note: '' },
  { category: 'Панелі перекриття', name: '56-12-8', spec: '', unit: 'шт', price: 5250, note: '' },
  { category: 'Панелі перекриття', name: '56-15-8', spec: '', unit: 'шт', price: 7050, note: '' },
  { category: 'Панелі перекриття', name: '54-12-8', spec: '', unit: 'шт', price: 4850, note: '' },
  { category: 'Панелі перекриття', name: '54-15-8', spec: '', unit: 'шт', price: 6850, note: '' },
  { category: 'Панелі перекриття', name: '53-12-8', spec: '', unit: 'шт', price: 4750, note: '' },
  { category: 'Панелі перекриття', name: '53-15-8', spec: '', unit: 'шт', price: 6750, note: '' },
  { category: 'Панелі перекриття', name: '52-12-8', spec: '', unit: 'шт', price: 4685, note: '' },
  { category: 'Панелі перекриття', name: '52-15-8', spec: '', unit: 'шт', price: 6650, note: '' },
  { category: 'Панелі перекриття', name: '51-12-8', spec: '', unit: 'шт', price: 4650, note: '' },
  { category: 'Панелі перекриття', name: '51-15-8', spec: '', unit: 'шт', price: 6350, note: '' },
  { category: 'Панелі перекриття', name: '50-12-8', spec: '', unit: 'шт', price: 4550, note: '' },
  { category: 'Панелі перекриття', name: '50-15-8', spec: '', unit: 'шт', price: 6250, note: '' },
  { category: 'Панелі перекриття', name: '49-12-8', spec: '', unit: 'шт', price: 4450, note: '' },
  { category: 'Панелі перекриття', name: '49-15-8', spec: '', unit: 'шт', price: 6150, note: '' },
  { category: 'Панелі перекриття', name: '48-12-8', spec: '', unit: 'шт', price: 4350, note: '' },
  { category: 'Панелі перекриття', name: '48-15-8', spec: '', unit: 'шт', price: 5950, note: '' },
  { category: 'Панелі перекриття', name: '47-12-8', spec: '', unit: 'шт', price: 4250, note: '' },
  { category: 'Панелі перекриття', name: '47-15-8', spec: '', unit: 'шт', price: 5850, note: '' },
  { category: 'Панелі перекриття', name: '46-12-8', spec: '', unit: 'шт', price: 4150, note: '' },
  { category: 'Панелі перекриття', name: '46-15-8', spec: '', unit: 'шт', price: 5750, note: '' },
  { category: 'Панелі перекриття', name: '45-12-8', spec: '', unit: 'шт', price: 4050, note: '' },
  { category: 'Панелі перекриття', name: '45-15-8', spec: '', unit: 'шт', price: 5650, note: '' },
  { category: 'Панелі перекриття', name: '43-12-8', spec: '', unit: 'шт', price: 3950, note: '' },
  { category: 'Панелі перекриття', name: '43-15-8', spec: '', unit: 'шт', price: 5350, note: '' },
  { category: 'Панелі перекриття', name: '42-12-8', spec: '', unit: 'шт', price: 3850, note: '' },
  { category: 'Панелі перекриття', name: '42-15-8', spec: '', unit: 'шт', price: 5150, note: '' },
  { category: 'Панелі перекриття', name: '40-12-8', spec: '', unit: 'шт', price: 3650, note: '' },
  { category: 'Панелі перекриття', name: '40-15-8', spec: '', unit: 'шт', price: 4850, note: '' },
  { category: 'Панелі перекриття', name: '39-12-8', spec: '', unit: 'шт', price: 3550, note: '' },
  { category: 'Панелі перекриття', name: '39-15-8', spec: '', unit: 'шт', price: 4650, note: '' },
  { category: 'Панелі перекриття', name: '38-12-8', spec: '', unit: 'шт', price: 3450, note: '' },
  { category: 'Панелі перекриття', name: '38-15-8', spec: '', unit: 'шт', price: 4550, note: '' },
  { category: 'Панелі перекриття', name: '37-12-8', spec: '', unit: 'шт', price: 3350, note: '' },
  { category: 'Панелі перекриття', name: '37-15-8', spec: '', unit: 'шт', price: 4450, note: '' },
  { category: 'Панелі перекриття', name: '36-12-8', spec: '', unit: 'шт', price: 3250, note: '' },
  { category: 'Панелі перекриття', name: '36-15-8', spec: '', unit: 'шт', price: 4350, note: '' },
  { category: 'Панелі перекриття', name: '35-12-8', spec: '', unit: 'шт', price: 3150, note: '' },
  { category: 'Панелі перекриття', name: '35-15-8', spec: '', unit: 'шт', price: 4250, note: '' },
  { category: 'Панелі перекриття', name: '34-12-8', spec: '', unit: 'шт', price: 3050, note: '' },
  { category: 'Панелі перекриття', name: '34-15-8', spec: '', unit: 'шт', price: 4050, note: '' },
  { category: 'Панелі перекриття', name: '33-12-8', spec: '', unit: 'шт', price: 2950, note: '' },
  { category: 'Панелі перекриття', name: '33-15-8', spec: '', unit: 'шт', price: 3950, note: '' },
  { category: 'Панелі перекриття', name: '32-12-8', spec: '', unit: 'шт', price: 2885, note: '' },
  { category: 'Панелі перекриття', name: '32-15-8', spec: '', unit: 'шт', price: 3850, note: '' },
  { category: 'Панелі перекриття', name: '31-12-8', spec: '', unit: 'шт', price: 2850, note: '' },
  { category: 'Панелі перекриття', name: '31-15-8', spec: '', unit: 'шт', price: 3650, note: '' },
  { category: 'Панелі перекриття', name: '30-12-8', spec: '', unit: 'шт', price: 2750, note: '' },
  { category: 'Панелі перекриття', name: '30-15-8', spec: '', unit: 'шт', price: 3550, note: '' },
  { category: 'Панелі перекриття', name: '29-12-8', spec: '', unit: 'шт', price: 2650, note: '' },
  { category: 'Панелі перекриття', name: '29-15-8', spec: '', unit: 'шт', price: 3450, note: '' },
  { category: 'Панелі перекриття', name: '28-12-8', spec: '', unit: 'шт', price: 2550, note: '' },
  { category: 'Панелі перекриття', name: '28-15-8', spec: '', unit: 'шт', price: 3350, note: '' },
  { category: 'Панелі перекриття', name: '27-12-8', spec: '', unit: 'шт', price: 2450, note: '' },
  { category: 'Панелі перекриття', name: '27-15-8', spec: '', unit: 'шт', price: 3250, note: '' },
  { category: 'Панелі перекриття', name: '26-12-8', spec: '', unit: 'шт', price: 2350, note: '' },
  { category: 'Панелі перекриття', name: '26-15-8', spec: '', unit: 'шт', price: 3150, note: '' },
  { category: 'Панелі перекриття', name: '24-12-8', spec: '', unit: 'шт', price: 2150, note: '' },
  { category: 'Панелі перекриття', name: '24-15-8', spec: '', unit: 'шт', price: 2950, note: '' },
  { category: 'Панелі перекриття', name: '22-12-8', spec: '', unit: 'шт', price: 2075, note: '' },
  { category: 'Панелі перекриття', name: '22-15-8', spec: '', unit: 'шт', price: 2850, note: '' },
  { category: 'Панелі перекриття', name: '21-12-8', spec: '', unit: 'шт', price: 2050, note: '' },
  { category: 'Панелі перекриття', name: '21-15-8', spec: '', unit: 'шт', price: 2750, note: '' },
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
  { category: 'Блоки фундаментні', name: 'ФБС 12-4-6', spec: '', unit: 'шт', price: 905, note: '' },
  {
    category: 'Блоки фундаментні',
    name: 'ФБС 12-5-6',
    spec: '',
    unit: 'шт',
    price: 1115,
    note: '',
  },
  {
    category: 'Блоки фундаментні',
    name: 'ФБС 12-6-6',
    spec: '',
    unit: 'шт',
    price: 1315,
    note: '',
  },
  {
    category: 'Блоки фундаментні',
    name: 'ФБС 0,8-3-6',
    spec: '',
    unit: 'шт',
    price: 505,
    note: '',
  },
  {
    category: 'Блоки фундаментні',
    name: 'ФБС 0,8-4-6',
    spec: '',
    unit: 'шт',
    price: 615,
    note: '',
  },
  {
    category: 'Блоки фундаментні',
    name: 'ФБС 0,8-5-6',
    spec: '',
    unit: 'шт',
    price: 755,
    note: '',
  },
  {
    category: 'Блоки фундаментні',
    name: 'ФБС 0,8-6-6',
    spec: '',
    unit: 'шт',
    price: 905,
    note: '',
  },
  {
    category: 'Бетон на міксер (Відсів П-3)',
    name: 'М-100 (5/20) П-3 / В-7,5',
    spec: '',
    unit: 'м³',
    price: 2065,
    note: '',
  },
  {
    category: 'Бетон на міксер (Відсів П-3)',
    name: 'М-150 (5/20) П-3 / В-10',
    spec: '',
    unit: 'м³',
    price: 2245,
    note: '',
  },
  {
    category: 'Бетон на міксер (Відсів П-3)',
    name: 'М-200 (5/20) П-3 / В-15',
    spec: '',
    unit: 'м³',
    price: 2615,
    note: '',
  },
  {
    category: 'Бетон на міксер (Відсів П-3)',
    name: 'М-250 (5/20) П-3 / В-20',
    spec: '',
    unit: 'м³',
    price: 2985,
    note: '',
  },
  {
    category: 'Бетон на міксер (Відсів П-3)',
    name: 'М-300 (5/20) П-3 / В-22,5',
    spec: '',
    unit: 'м³',
    price: 3115,
    note: '',
  },
  {
    category: 'Бетон на міксер (Пісок П-3)',
    name: 'М-100 (5/20) П-3 / В-7,5',
    spec: '',
    unit: 'м³',
    price: 2285,
    note: '',
  },
  {
    category: 'Бетон на міксер (Пісок П-3)',
    name: 'М-150 (5/20) П-3 / В-10',
    spec: '',
    unit: 'м³',
    price: 2465,
    note: '',
  },
  {
    category: 'Бетон на міксер (Пісок П-3)',
    name: 'М-200 (5/20) П-3 / В-15',
    spec: '',
    unit: 'м³',
    price: 2725,
    note: '',
  },
  {
    category: 'Бетон на міксер (Пісок П-3)',
    name: 'М-250 (5/20) П-3 / В-20',
    spec: '',
    unit: 'м³',
    price: 3135,
    note: '',
  },
  {
    category: 'Бетон на міксер (Пісок П-3)',
    name: 'М-300 (5/20) П-3 / В-22,5',
    spec: '',
    unit: 'м³',
    price: 3255,
    note: '',
  },
  {
    category: 'Бетон на міксер (Пісок П-3)',
    name: 'М-350 (5/20) П-3 / В-25',
    spec: '',
    unit: 'м³',
    price: 3325,
    note: '',
  },
  {
    category: 'Бетон на міксер (Пісок П-3)',
    name: 'М-400 (5/20) П-3 / В-30',
    spec: '',
    unit: 'м³',
    price: 3565,
    note: '',
  },
]

// ===== UNIQUE CATEGORIES =====
const categories = [...new Set(priceData.map((i) => i.category))]

// ===== PRODUCT CARD CATEGORIES (with images) =====
interface ProductCategory {
  name: string
  image: string | null
  icon: string
  desc: string
  priceFrom: number | null
  priceTo: number | null
}

// Categories to merge into a single card
const mergeGroups: Record<string, string[]> = {
  'Бетон на міксер': ['Бетон на міксер (Відсів П-3)', 'Бетон на міксер (Пісок П-3)'],
}
const mergedChildren = new Set(Object.values(mergeGroups).flat())

function getProductCategories(): ProductCategory[] {
  const result: ProductCategory[] = []
  const handled = new Set<string>()

  for (const cat of categories) {
    if (handled.has(cat)) continue

    // Check if this category is part of a merge group
    const groupName = Object.keys(mergeGroups).find((g) => mergeGroups[g].includes(cat))

    if (groupName && !handled.has(groupName)) {
      const children = mergeGroups[groupName]
      children.forEach((c) => handled.add(c))
      handled.add(groupName)

      const items = priceData.filter((i) => children.includes(i.category) && i.price !== null)
      const prices = items.map((i) => i.price!).filter((p) => p > 0)
      const minPrice = prices.length ? Math.min(...prices) : null
      const maxPrice = prices.length ? Math.max(...prices) : null

      result.push({
        name: groupName,
        image: productImages[children[0]] ?? null,
        icon: productIcons[children[0]] ?? '🏗️',
        desc: `${items.length} позицій у каталозі`,
        priceFrom: minPrice,
        priceTo: maxPrice,
      })
    } else if (!mergedChildren.has(cat)) {
      const items = priceData.filter((i) => i.category === cat && i.price !== null)
      const prices = items.map((i) => i.price!).filter((p) => p > 0)
      const minPrice = prices.length ? Math.min(...prices) : null
      const maxPrice = prices.length ? Math.max(...prices) : null
      result.push({
        name: cat,
        image: productImages[cat] ?? null,
        icon: productIcons[cat] ?? '🏗️',
        desc: `${items.length} позицій у каталозі`,
        priceFrom: minPrice,
        priceTo: maxPrice,
      })
    }
  }

  return result
}

// ===== ESCAPE HTML =====
function esc(s: string): string {
  const el = document.createElement('span')
  el.textContent = s
  return el.innerHTML
}

// ===== FORMAT PRICE =====
function formatPrice(p: number | null): string {
  if (p === null) return 'За запитом'
  return p.toLocaleString('uk-UA') + ' грн'
}

// ===== RENDER APP =====
function render() {
  const app = document.getElementById('app')
  if (!app) return

  const prodCats = getProductCategories()

  app.innerHTML = `
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
        <div class="hero__grid"></div>
        <div class="hero__shapes">
          <div class="hero__shape hero__shape--1"></div>
          <div class="hero__shape hero__shape--3"></div>
        </div>
      </div>
      <div class="hero__content">
        <div class="hero__info">
          <div class="hero__badge">Працюємо з 1963 року</div>
          <h1 class="hero__title">Залізобетонні <span>вироби</span> та конструкції</h1>
          <p class="hero__desc">Виробництво та продаж якісних ЗБВ у Вінниці. Плити перекриття, фундаментні блоки, перемички, бетон та інша продукція від виробника.</p>
          <div class="hero__actions">
            <a href="#products" class="btn btn--primary">🏗️ Каталог продукції</a>
            <a href="#contacts" class="btn btn--outline">📍 Як нас знайти</a>
          </div>
        </div>
        <div class="hero__visual">
          <div class="hero__img-wrapper">
            <img src="${assetPath('/images/products/paneli-perekryttya.jpg')}" alt="Виробництво залізобетонних виробів — плити перекриття ПрАТ ОЗ ЗБВіК Вінниця" loading="eager" />
          </div>
          <div class="hero__stats">
            <div class="hero__stat">
              <div class="hero__stat-num">60+</div>
              <div class="hero__stat-label">років досвіду</div>
            </div>
            <div class="hero__stat">
              <div class="hero__stat-num">200+</div>
              <div class="hero__stat-label">видів продукції</div>
            </div>
            <div class="hero__stat">
              <div class="hero__stat-num">24/5</div>
              <div class="hero__stat-label">графік роботи</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section class="section section--gray" id="about">
      <div class="container">
        <div class="section__header animate-on-scroll">
          <div class="section__badge">🏭 Про підприємство</div>
          <h2 class="section__title">Обласний завод залізобетонних виробів і конструкцій</h2>
          <p class="section__subtitle">ПрАТ «ОЗ ЗБВіК» — одне з провідних підприємств Вінницької області у галузі виробництва залізобетонних виробів та бетонних розчинів</p>
        </div>
        <div class="advantages">
          <div class="advantage-card animate-on-scroll delay-1">
            <div class="advantage-card__icon">🏭</div>
            <h3 class="advantage-card__title">Власне виробництво</h3>
            <p class="advantage-card__text">Повний цикл виробництва ЗБВ на сучасному обладнанні. Контроль якості на кожному етапі.</p>
          </div>
          <div class="advantage-card animate-on-scroll delay-2">
            <div class="advantage-card__icon">📋</div>
            <h3 class="advantage-card__title">Широкий асортимент</h3>
            <p class="advantage-card__text">Плити перекриття, фундаментні блоки, перемички, сходові марші, бетон та багато іншого.</p>
          </div>
          <div class="advantage-card animate-on-scroll delay-3">
            <div class="advantage-card__icon">🚛</div>
            <h3 class="advantage-card__title">Доставка</h3>
            <p class="advantage-card__text">Вантажний автомобільний транспорт для доставки продукції по Вінницькій області та Україні.</p>
          </div>
          <div class="advantage-card animate-on-scroll delay-4">
            <div class="advantage-card__icon">💰</div>
            <h3 class="advantage-card__title">Вигідні ціни</h3>
            <p class="advantage-card__text">Працюємо напряму від виробника — без посередників. Оптові та роздрібні ціни.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PRODUCTS -->
    <section class="section" id="products">
      <div class="container">
        <div class="section__header animate-on-scroll">
          <div class="section__badge">📦 Наша продукція</div>
          <h2 class="section__title">Каталог залізобетонних виробів</h2>
          <p class="section__subtitle">Виробляємо широкий асортимент ЗБВ для житлового, промислового та дорожнього будівництва</p>
        </div>
        <div class="products-grid">
          ${prodCats
            .map(
              (cat, i) => `
            <div class="product-card animate-on-scroll delay-${(i % 4) + 1}" data-category="${esc(cat.name)}">
              <div class="product-card__img">
                ${
                  cat.image
                    ? `<img src="${cat.image}" alt="${esc(cat.name)} — купити у Вінниці, ПрАТ ОЗ ЗБВіК" loading="lazy" />
                     <div class="product-card__overlay"><span class="product-card__overlay-text">Переглянути прайс →</span></div>`
                    : `<div class="product-card__no-img">${cat.icon}</div>`
                }
              </div>
              <div class="product-card__body">
                <div class="product-card__category">${cat.icon} ${esc(cat.name)}</div>
                <h3 class="product-card__name">${esc(cat.name)}</h3>
                <p class="product-card__desc">${esc(cat.desc)}</p>
                ${
                  cat.priceFrom !== null
                    ? `<div class="product-card__price">від ${formatPrice(cat.priceFrom)}${cat.priceTo !== null && cat.priceTo !== cat.priceFrom ? ` до ${formatPrice(cat.priceTo)}` : ''} <span>/ ${cat.name.includes('Бетон') ? 'м³' : 'шт'}</span></div>`
                    : `<div class="product-card__price">За запитом</div>`
                }
              </div>
            </div>
          `,
            )
            .join('')}
        </div>
      </div>
    </section>

    <!-- PRICE TABLE -->
    <section class="section section--gray price-section" id="price">
      <div class="container">
        <div class="section__header animate-on-scroll">
          <h2 class="section__title">Актуальні ціни на продукцію</h2>
          <p class="section__subtitle">Ціни вказані з ПДВ. Для отримання індивідуальної пропозиції зв'яжіться з нами</p>
        </div>
        <div class="price-tabs animate-on-scroll" id="priceTabs">
          ${categories
            .map(
              (cat, i) => `
            <button class="price-tab${i === 0 ? ' active' : ''}" data-tab="${esc(cat)}">${esc(cat)}</button>
          `,
            )
            .join('')}
        </div>
        <div class="price-table-wrapper animate-on-scroll">
          <table class="price-table" id="priceTable">
            <thead>
              <tr>
                <th>Марка / найменування</th>
                <th>Характеристика / розмір</th>
                <th>Од. виміру</th>
              </tr>
            </thead>
            <tbody id="priceBody"></tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- CONTACTS -->
    <section class="section section--gray" id="contacts">
      <div class="container">
        <div class="section__header animate-on-scroll">
          <div class="section__badge">📍 Контакти</div>
          <h2 class="section__title">Як нас знайти</h2>
          <p class="section__subtitle">Ми знаходимося у місті Вінниця. Приїжджайте — покажемо виробництво та продукцію</p>
        </div>
        <div class="contact-grid animate-on-scroll">
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
                <div class="contact-item__icon">📧</div>
                <div class="contact-item__body">
                  <div class="contact-item__label">E-mail</div>
                  <div class="contact-item__value"><a href="mailto:ozzbvik@meta.ua">ozzbvik@meta.ua</a></div>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-item__icon">📄</div>
                <div class="contact-item__body">
                  <div class="contact-item__label">ЄДРПОУ</div>
                  <div class="contact-item__value">03326920</div>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-item__icon">👤</div>
                <div class="contact-item__body">
                  <div class="contact-item__label">Керівник</div>
                  <div class="contact-item__value">Малюта Сергій Васильович</div>
                </div>
              </div>
            </div>
          </div>
          <div class="map-panel">
            <div class="map-panel__head">
              🏭 ОЗ ЗБВіК • МАПА ЗАВОДУ
            </div>
            <div class="map-wrapper">
              <div id="factoryMap" class="factory-map" aria-label="Карта розташування заводу"></div>
            </div>
            <div class="map-panel__note">Точка на карті позначає територію заводу</div>
            <div class="map-panel__actions">
              <a
                href="https://www.google.com/maps?q=49.259756551931645,28.48389620346503"
                class="btn btn--dark"
                target="_blank"
                rel="noreferrer"
              >
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
              <span class="footer__link footer__link--address">📍 м. Вінниця, вул. Айвазовського, 4-А</span>
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
  // Header scroll
  const header = document.getElementById('header')
  window.addEventListener('scroll', () => {
    header?.classList.toggle('header--scrolled', window.scrollY > 50)
  })
  // Trigger once on load
  header?.classList.toggle('header--scrolled', window.scrollY > 50)

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
  // Close nav on link click
  nav?.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      burger?.classList.remove('active')
      nav?.classList.remove('open')
      overlay?.classList.remove('active')
    })
  })

  // Scroll animations (IntersectionObserver)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
  )

  document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))

  // Price tabs
  const tabs = document.getElementById('priceTabs')
  const body = document.getElementById('priceBody')
  function renderTable(category: string) {
    if (!body) return
    const items = priceData.filter((i) => i.category === category)
    body.innerHTML = items
      .map(
        (item) => `
      <tr>
        <td><strong>${esc(item.name)}</strong></td>
        <td>${esc(item.spec)}</td>
        <td>${esc(item.unit)}</td>
      </tr>
    `,
      )
      .join('')
  }
  // Initial render
  if (categories.length > 0) {
    renderTable(categories[0])
  }
  tabs?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.classList.contains('price-tab')) return
    tabs.querySelectorAll('.price-tab').forEach((t) => t.classList.remove('active'))
    target.classList.add('active')
    const cat = target.dataset.tab
    if (cat) renderTable(cat)
  })

  // Product card click -> scroll to price
  document.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('click', () => {
      const cat = (card as HTMLElement).dataset.category
      if (!cat) return
      // If it's a merged group, activate the first child tab
      const children = mergeGroups[cat]
      const tabCat = children ? children[0] : cat
      const tab = tabs?.querySelector(`[data-tab="${tabCat}"]`) as HTMLElement | null
      if (tab) {
        tabs?.querySelectorAll('.price-tab').forEach((t) => t.classList.remove('active'))
        tab.classList.add('active')
        renderTable(tabCat)
        document.getElementById('price')?.scrollIntoView({ behavior: 'smooth' })
      }
    })
    ;(card as HTMLElement).style.cursor = 'pointer'
  })

  // Scroll top button
  const scrollBtn = document.getElementById('scrollTop')
  window.addEventListener('scroll', () => {
    scrollBtn?.classList.toggle('visible', window.scrollY > 600)
  })
  scrollBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', render)
