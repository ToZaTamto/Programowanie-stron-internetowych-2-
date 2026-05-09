<template>
  <p class="error-message">
    <span aria-hidden="true">⚠️</span>
    {{ message }}
  </p>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    required: true
  }
})
</script>
