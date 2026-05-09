<template>
  <main class="app" :class="{ dark: isDark }">
    <section class="hero">
      <div>
        <p class="eyebrow">Open-Meteo forecast</p>
        <h1>UwagaKometa</h1>
        <p class="lead">Sprawdz aktualna pogode i prognoze dla wybranego miasta.</p>
      </div>
      <ThemeToggle :is-dark="isDark" @toggle="toggleTheme" />
    </section>

    <SearchBar @search="searchWeather" />
    <FavouriteCities :cities="favouriteCities" @select="searchWeather" />

    <LoadingSpinner v-if="isLoading" />
    <ErrorMessage v-else-if="error" :message="error" />

    <template v-if="weather && !isLoading">
      <WeatherCard
        :weather="weather"
        :is-favourite="isCityFavourite(weather.city)"
        @add-favourite="addFavourite"
      />
      <ForecastList :forecast="weather.forecast" />
    </template>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ErrorMessage from './components/ErrorMessage.vue'
import FavouriteCities from './components/FavouriteCities.vue'
import ForecastList from './components/ForecastList.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import SearchBar from './components/SearchBar.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import WeatherCard from './components/WeatherCard.vue'
import { useFavourites } from './composables/useFavourites'
import { getWeatherForCity } from './utils/weatherApi'

const weather = ref(null)
const error = ref('')
const isLoading = ref(false)
const isDark = ref(localStorage.getItem('uwagakometa-theme') === 'dark')

const { favouriteCities, addFavourite, isCityFavourite } = useFavourites()

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('uwagakometa-theme', isDark.value ? 'dark' : 'light')
}

async function searchWeather(city) {
  isLoading.value = true
  error.value = ''

  try {
    weather.value = await getWeatherForCity(city)
  } catch (err) {
    weather.value = null
    error.value = err.message || 'Nie udalo sie pobrac pogody'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  searchWeather('Warszawa')
})
</script>
