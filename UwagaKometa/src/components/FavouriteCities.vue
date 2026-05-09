<template>
  <section v-if="cities.length" class="favourites">
    <h2>Ulubione miasta</h2>
    <div class="favourite-list">
      <button
        v-for="city in cities"
        :key="city"
        type="button"
        @click="$emit('select', city)"
      >
        {{ city }}
      </button>
    </div>
  </section>
</template>

<script setup>
defineProps({
  cities: {
    type: Array,
    default: () => []
  }
})

defineEmits(['select'])
</script>
