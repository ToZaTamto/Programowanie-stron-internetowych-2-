<template>
  <section class="weather-card">
    <div class="weather-card__header">
      <div>
        <p class="label">Aktualna pogoda</p>
        <h2>{{ weather.city }} <span>{{ weather.country }}</span></h2>
      </div>
      <button
        class="favourite-btn"
        :class="{ active: isFavourite }"
        type="button"
        aria-label="Dodaj do ulubionych"
        @click="$emit('add-favourite', weather.city)"
      >
        ★
      </button>
    </div>

    <div class="weather-card__main">
      <span class="weather-icon">{{ weather.icon }}</span>
      <div>
        <p class="temperature">{{ weather.temp }}°C</p>
        <p>{{ weather.description }}</p>
      </div>
    </div>

    <dl class="weather-details">
      <div>
        <dt>Odczuwalna</dt>
        <dd>{{ weather.feelsLike }}°C</dd>
      </div>
      <div>
        <dt>Wilgotnosc</dt>
        <dd>{{ weather.humidity }}%</dd>
      </div>
      <div>
        <dt>Cisnienie</dt>
        <dd>{{ weather.pressure }} hPa</dd>
      </div>
      <div>
        <dt>Wiatr</dt>
        <dd>{{ weather.windSpeed }} km/h</dd>
      </div>
      <div>
        <dt>Zachmurzenie</dt>
        <dd>{{ weather.clouds }}%</dd>
      </div>
    </dl>
  </section>
</template>

<script setup>
defineProps({
  weather: {
    type: Object,
    required: true
  },
  isFavourite: {
    type: Boolean,
    default: false
  }
})

defineEmits(['add-favourite'])
</script>
