<template>
  <button class="theme-toggle" type="button" @click="$emit('toggle')">
    {{ isDark ? 'Tryb jasny' : 'Tryb ciemny' }}
  </button>
</template>

<script setup>
defineProps({
  isDark: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle'])
</script>
