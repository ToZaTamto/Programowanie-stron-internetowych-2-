import axios from 'axios'

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

export function formatTemp(value) {
  const integer = Math.floor(value)
  return value - integer <= 0.5 ? integer : integer + 1
}

function weatherCodeToDescription(code) {
  const descriptions = {
    0: 'Bezchmurnie',
    1: 'Glownie slonecznie',
    2: 'Czesciowe zachmurzenie',
    3: 'Pochmurno',
    45: 'Mgla',
    48: 'Mgla z osadem',
    51: 'Lekka mzawka',
    53: 'Mzawka',
    55: 'Silna mzawka',
    61: 'Lekki deszcz',
    63: 'Deszcz',
    65: 'Silny deszcz',
    71: 'Lekki snieg',
    73: 'Snieg',
    75: 'Silny snieg',
    80: 'Przelotny deszcz',
    81: 'Opady deszczu',
    82: 'Silne opady deszczu',
    95: 'Burza'
  }

  return descriptions[code] || 'Zmienna pogoda'
}

function weatherCodeToIcon(code) {
  if (code === 0) return '☀'
  if ([1, 2].includes(code)) return '⛅'
  if ([3, 45, 48].includes(code)) return '☁'
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return '☂'
  if ([71, 73, 75].includes(code)) return '❄'
  if (code === 95) return '⚡'
  return '🌡'
}

export async function getWeatherForCity(city) {
  const geoResponse = await axios.get(GEOCODING_URL, {
    params: {
      name: city,
      count: 1,
      language: 'pl',
      format: 'json'
    }
  })

  const location = geoResponse.data.results?.[0]
  if (!location) {
    throw new Error('Nie znaleziono miasta')
  }

  const weatherResponse = await axios.get(FORECAST_URL, {
    params: {
      latitude: location.latitude,
      longitude: location.longitude,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min',
      timezone: 'auto'
    }
  })

  const current = weatherResponse.data.current
  const daily = weatherResponse.data.daily

  return {
    city: location.name,
    country: location.country_code || location.country || '',
    temp: formatTemp(current.temperature_2m),
    feelsLike: formatTemp(current.apparent_temperature),
    humidity: current.relative_humidity_2m,
    pressure: Math.round(current.pressure_msl),
    windSpeed: Math.round(current.wind_speed_10m),
    description: weatherCodeToDescription(current.weather_code),
    icon: weatherCodeToIcon(current.weather_code),
    clouds: current.cloud_cover,
    forecast: daily.time.slice(0, 5).map((date, index) => ({
      date,
      icon: weatherCodeToIcon(daily.weather_code[index]),
      description: weatherCodeToDescription(daily.weather_code[index]),
      tempMax: formatTemp(daily.temperature_2m_max[index]),
      tempMin: formatTemp(daily.temperature_2m_min[index])
    }))
  }
}
