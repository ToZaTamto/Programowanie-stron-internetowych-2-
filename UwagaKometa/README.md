# 🌠 UwagaKometa – Aplikacja Pogodowa

Reaktywna aplikacja pogodowa zbudowana z Vue 3 + Vite, pobierająca dane w czasie rzeczywistym z OpenWeatherMap API.

## ✨ Funkcjonalności

- 🔍 **Wyszukiwanie miasta** – szybkie wyszukiwanie aktualne dane pogodowe
- 🌤️ **Aktualna pogoda** – temperatura, wilgotność, wiatr, ciśnienie
- 📅 **Prognoza 5-dniowa** – podgląd pogody na następne dni
- ⭐ **Ulubione miasta** – zapisywanie i zarządzanie miastami
- 🌓 **Tryb ciemny/jasny** – przełączanie motywu z zachowaniem preferencji
- 📱 **Responsywny design** – optymalizacja dla urządzeń mobilnych

## 🛠️ Stos technologiczny

| Warstwa | Technologia |
|---------|-------------|
| **Framework** | Vue 3 (Composition API) |
| **Bundler** | Vite |
| **Język** | JavaScript (ES6+) |
| **Stylowanie** | CSS3 + CSS Modules |
| **HTTP Client** | Axios |
| **Testy** | Vitest + Vue Test Utils |
| **API** | [Open-Meteo](https://open-meteo.com/en/docs)  |

## 🚀 Szybki start

### Wymagania
- Node.js 16+ 
- npm lub yarn

### Instalacja

```bash
# Klonowanie repozytorium
git clone https://github.com/your-username/uwagakometa.git
cd uwagakometa

# Instalacja zależności
npm install
```

### Uruchomienie

```bash
# Serwer deweloperski (http://localhost:5173)
npm run dev

# Build produkcyjny
npm run build

# Podgląd buildu
npm run preview

# Uruchomienie testów
npm run test

# Widok testów z UI
npm run test:ui

# Raport pokrycia testami
npm run test:coverage
```

## 📁 Struktura projektu

```
uwagakometa/
├── src/
│   ├── components/           # Komponenty Vue
│   │   ├── SearchBar.vue
│   │   ├── WeatherCard.vue
│   │   ├── ForecastList.vue
│   │   ├── ForecastItem.vue
│   │   ├── FavouritesCities.vue
│   │   ├── ThemeToggle.vue
│   │   ├── LoadingSpinner.vue
│   │   └── ErrorMessage.vue
│   ├── composables/          # Reusable logic
│   │   └── useFavourites.js
│   ├── utils/                # Utility functions
│   │   └── weatherApi.js
│   ├── assets/
│   │   └── styles/
│   │       └── main.css
│   ├── App.vue               # Główny komponent
│   └── main.js               # Entry point
├── tests/
│   ├── unit/                 # Testy jednostkowe
│   └── components/           # Testy komponentów
├── index.html
├── package.json
├── vite.config.js
├── vitest.config.js
└── .env.example
```

## 🔑 Zmienne środowiskowe

**Good news!** 🎉 Open-Meteo API jest **CAŁKOWICIE BEZPŁATNE** i **NIE wymaga klucza API**!

Plik `.env` jest już skonfigurowany i aplikacja będzie działać od razu po instalacji.

```env
# Open-Meteo API - brak klucza wymaganego!
# Aplikacja działa out-of-the-box
```

Aplikacja automatycznie używa darmowych publicznych API:
- **Geocoding**: https://geocoding-api.open-meteo.com/
- **Weather Forecast**: https://api.open-meteo.com/

Więcej informacji: https://open-meteo.com/en/docs

## 📊 Plan testów

Projekt zawiera kompleksowe testy jednostkowe i komponentowe:

| Komponent | Testy |
|-----------|-------|
| `formatTemp()` | Zaokrąglanie temperatury do liczby całkowitej |
| `SearchBar.vue` | Emisja zdarzenia `search` |
| `WeatherCard.vue` | Renderowanie danych pogodowych |
| `useFavourites` | Dodawanie/usuwanie ulubionych |
| `ErrorMessage.vue` | Renderowanie warunkowe błędów |

Uruchomienie testów:
```bash
npm run test
```

## 🎨 Paleta kolorów

- **Główny**: `#6366f1` (Indigo)
- **Akcentowy**: `#ec4899` (Pink)
- **Sukces**: `#10b981` (Green)
- **Błąd**: `#ef4444` (Red)

## 📱 Responsywność

Aplikacja jest w pełni responsywna:
- 📱 Mobile (< 480px)
- 📱 Tablet (480px - 768px)
- 💻 Desktop (> 768px)

## 🌐 Hosting

Projekt jest gotowy do deploymentu na:
- **Vercel** – `npm run build` → Deploy folder `dist/`
- **Netlify** – Skonfiguruj build command: `npm run build`
- **GitHub Pages** – Use `gh-pages` branch

## 🔒 Konwencje commitów

Projekt używa [Conventional Commits](https://www.conventionalcommits.org/):


