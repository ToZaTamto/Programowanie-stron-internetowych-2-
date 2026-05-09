<template>
  <article class="forecast-item">
    <p class="forecast-date">{{ formattedDate }}</p>
    <span>{{ forecast.icon }}</span>
    <strong>{{ forecast.tempMax }}° / {{ forecast.tempMin }}°C</strong>
    <small>{{ forecast.description }}</small>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  forecast: {
    type: Object,
    required: true
  }
})

const formattedDate = computed(() =>
  new Intl.DateTimeFormat('pl-PL', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit'
  }).format(new Date(props.forecast.date))
)
</script>
