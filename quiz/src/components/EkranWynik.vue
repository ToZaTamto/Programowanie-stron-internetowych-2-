<template>
  <section class="result-screen">
    <h1>Twój wynik</h1>

    <div class="result-card">
      <p class="score">{{ score }} / {{ total }}</p>
      <p class="percent">{{ percentage }}%</p>
      <p class="message">{{ resultMessage }}</p>
    </div>

    <button class="primary-btn" @click="$emit('restart')">
      Zagraj ponownie
    </button>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  score: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})

defineEmits(['restart'])

const percentage = computed(() => Math.round((props.score / props.total) * 100))

const resultMessage = computed(() => {
  if (percentage.value === 100) {
    return 'Doskonale! Bezbłędny wynik! 🏆'
  }
  if (percentage.value >= 80) {
    return 'Bardzo dobrze! 🎉'
  }
  if (percentage.value >= 60) {
    return 'Nieźle, ale jest pole do poprawy'
  }
  return 'Warto powtórzyć materiał 📚'
})
</script>

<style scoped>
.result-screen {
  text-align: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 24px;
}

.result-card {
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 20px;
  padding: 28px;
  margin-bottom: 28px;
  background: rgba(148, 163, 184, 0.08);
}

.score {
  font-size: 2.6rem;
  font-weight: 800;
  color: #3b82f6;
  margin: 0 0 12px;
}

.percent {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 12px;
}

.message {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.92;
}
</style>
