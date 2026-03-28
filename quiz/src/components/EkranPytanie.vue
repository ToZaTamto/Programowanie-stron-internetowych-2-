<template>
  <section class="question-screen">
    <div class="question-top">
      <p class="counter">Pytanie {{ questionIndex + 1 }} / {{ totalQuestions }}</p>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
    </div>

    <h2>{{ question.tresc }}</h2>

    <div class="answers">
      <button
        v-for="(answer, index) in question.odpowiedzi"
        :key="index"
        class="answer-btn"
        :class="getAnswerClass(index)"
        :disabled="selectedAnswer !== null"
        @click="selectAnswer(index)"
      >
        {{ answer }}
      </button>
    </div>

    <div class="bottom-actions">
      <button class="secondary-btn" :disabled="selectedAnswer === null" @click="goNext">
        {{ questionIndex + 1 === totalQuestions ? 'Zobacz wynik' : 'Następne pytanie' }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  questionIndex: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['answered', 'next'])

const selectedAnswer = ref(null)
const hasAnswered = ref(false)

const progress = computed(() => ((props.questionIndex + 1) / props.totalQuestions) * 100)

function selectAnswer(index) {
  if (hasAnswered.value) return

  selectedAnswer.value = index
  hasAnswered.value = true

  const isCorrect = index === props.question.poprawna
  emit('answered', isCorrect)
}

function getAnswerClass(index) {
  if (selectedAnswer.value === null) return ''

  if (index === props.question.poprawna) {
    return 'correct'
  }

  if (index === selectedAnswer.value && index !== props.question.poprawna) {
    return 'wrong'
  }

  return 'disabled-look'
}

function goNext() {
  emit('next')
}

watch(
  () => props.question,
  () => {
    selectedAnswer.value = null
    hasAnswered.value = false
  }
)
</script>

<style scoped>
.counter {
  margin: 0 0 12px;
  font-weight: 700;
  opacity: 0.9;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background: rgba(148, 163, 184, 0.25);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 28px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
  border-radius: 999px;
  transition: width 0.3s ease;
}

h2 {
  font-size: 1.7rem;
  margin-bottom: 24px;
  line-height: 1.4;
}

.answers {
  display: grid;
  gap: 14px;
}

.answer-btn {
  width: 100%;
  text-align: left;
  padding: 16px 18px;
  background: rgba(148, 163, 184, 0.08);
  color: inherit;
  border: 1px solid rgba(148, 163, 184, 0.15);
  font-size: 1rem;
}

.answer-btn:hover:enabled {
  transform: translateY(-1px);
  border-color: #3b82f6;
}

.correct {
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid #22c55e;
  color: inherit;
}

.wrong {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid #ef4444;
  color: inherit;
}

.disabled-look {
  opacity: 0.72;
}

.bottom-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 26px;
}
</style>
