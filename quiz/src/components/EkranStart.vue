<template>
  <section class="start-screen">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>

    <div class="info-box">
      <span>🏁 Tematyka: motoryzacja</span>
      <span>📋 Liczba pytań: 5</span>
      <span>✅ Jednokrotny wybór</span>
    </div>

    <button class="primary-btn" @click="$emit('start')">
      Rozpocznij quiz
    </button>
  </section>
</template>

<script setup>
defineProps({
  title: String,
  description: String
})

defineEmits(['start'])
</script>

<style scoped>
.start-screen {
  text-align: center;
}


h1 {
  font-size: 2.2rem;
  margin-bottom: 14px;
}

p {
  font-size: 1.05rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto 28px;
  opacity: 0.9;
}

.info-box {
  display: grid;
  gap: 12px;
  margin-bottom: 28px;
  padding: 20px;
  border-radius: 18px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  background: rgba(148, 163, 184, 0.08);
}
</style>
