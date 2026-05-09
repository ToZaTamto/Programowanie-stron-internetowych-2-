<template>
  <form class="search-bar" @submit.prevent="submitSearch">
    <input
      v-model="city"
      type="search"
      placeholder="Wpisz miasto"
      aria-label="Miasto"
    />
    <button type="submit">Szukaj</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search'])
const city = ref('')

function submitSearch() {
  const value = city.value.trim()
  if (!value) return

  emit('search', value)
  city.value = ''
}
</script>
