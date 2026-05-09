<template>
  <section v-if="forecast?.length" class="forecast">
    <h2>Prognoza 5-dniowa</h2>
    <div class="forecast-grid">
      <ForecastItem
        v-for="item in forecast"
        :key="item.date"
        :forecast="item"
      />
    </div>
  </section>
</template>

<script setup>
import ForecastItem from './ForecastItem.vue'

defineProps({
  forecast: {
    type: Array,
    default: () => []
  }
})
</script>
