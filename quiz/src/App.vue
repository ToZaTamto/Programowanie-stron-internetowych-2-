<template>
  <div class="app-shell" :class="themeClass">
    <div class="quiz-container">
      <header class="top-bar">
        <button class="theme-toggle" @click="toggleTheme">
          {{ isDarkMode ? '☀️ Light mode' : '🌙 Dark mode' }}
        </button>
      </header>

      <EkranStart
        v-if="currentScreen === 'start'"
        :title="quizTitle"
        :description="quizDescription"
        @start="startQuiz"
      />

      <EkranPytanie
        v-else-if="currentScreen === 'quiz'"
        :question="questions[currentQuestionIndex]"
        :question-index="currentQuestionIndex"
        :total-questions="questions.length"
        @answered="handleAnswer"
        @next="goToNextQuestion"
      />

      <EkranWynik
        v-else-if="currentScreen === 'result'"
        :score="score"
        :total="questions.length"
        @restart="restartQuiz"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import EkranStart from './components/EkranStart.vue'
import EkranPytanie from './components/EkranPytanie.vue'
import EkranWynik from './components/EkranWynik.vue'

const quizTitle = 'Quiz motoryzacyjny'
const quizDescription = 'Sprawdź swoją wiedzę o samochodach, markach i podstawach motoryzacji. Możesz też przełączać motyw między dark mode i light mode.'

const questions = [
  {
    id: 1,
    tresc: 'Która marka produkuje model Mustang?',
    odpowiedzi: ['BMW', 'Ford', 'Audi', 'Toyota'],
    poprawna: 1
  },
  {
    id: 2,
    tresc: 'Jak nazywa się element odpowiedzialny za zatrzymywanie samochodu?',
    odpowiedzi: ['Alternator', 'Sprzęgło', 'Hamulce', 'Chłodnica'],
    poprawna: 2
  },
  {
    id: 3,
    tresc: 'Które paliwo jest najczęściej oznaczane symbolem ON na stacjach w Polsce?',
    odpowiedzi: ['Benzyna 95', 'Gaz LPG', 'Olej napędowy', 'AdBlue'],
    poprawna: 2
  },
  {
    id: 4,
    tresc: 'Która z tych marek jest marką luksusową należącą do Toyoty?',
    odpowiedzi: ['Infiniti', 'Lexus', 'Acura', 'Genesis'],
    poprawna: 1
  },
  {
    id: 5,
    tresc: 'Co oznacza skrót ABS w samochodzie?',
    odpowiedzi: [
      'Automatyczny balans silnika',
      'Aktywny system bezpieczeństwa',
      'System zapobiegający blokowaniu kół podczas hamowania',
      'Asystent bocznej stabilizacji'
    ],
    poprawna: 2
  }
]

const currentScreen = ref('start')
const currentQuestionIndex = ref(0)
const score = ref(0)
const isDarkMode = ref(true)

const themeClass = computed(() => (isDarkMode.value ? 'theme-dark' : 'theme-light'))

function startQuiz() {
  currentScreen.value = 'quiz'
}

function handleAnswer(isCorrect) {
  if (isCorrect) {
    score.value++
  }
}

function goToNextQuestion() {
  if (currentQuestionIndex.value < questions.length - 1) {
    currentQuestionIndex.value++
  } else {
    currentScreen.value = 'result'
  }
}

function restartQuiz() {
  currentScreen.value = 'start'
  currentQuestionIndex.value = 0
  score.value = 0
}

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value
}

onMounted(() => {
  const savedTheme = localStorage.getItem('quiz-theme')

  if (savedTheme === 'light') {
    isDarkMode.value = false
  } else if (savedTheme === 'dark') {
    isDarkMode.value = true
  }
})

watch(isDarkMode, (newValue) => {
  localStorage.setItem('quiz-theme', newValue ? 'dark' : 'light')
})
</script>

<style>
:root {
  font-family: Inter, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}

* {
  box-sizing: border-box;
}

html,
body,
#app {
  margin: 0;
  padding: 0;
  min-height: 100%;
}

body {
  transition: background 0.25s ease, color 0.25s ease;
}

button {
  font: inherit;
}

.app-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  transition: background 0.25s ease, color 0.25s ease;
}

.quiz-container {
  width: 100%;
  max-width: 760px;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
  transition: background 0.25s ease, border-color 0.25s ease;
}

.top-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}


.theme-toggle,
.primary-btn,
.secondary-btn,
.answer-btn {
  border: none;
  border-radius: 14px;
  transition: 0.2s ease;
  cursor: pointer;
}

.theme-toggle {
  padding: 12px 16px;
  font-weight: 700;
}

.primary-btn {
  padding: 14px 22px;
  font-weight: 700;
}

.secondary-btn {
  padding: 12px 18px;
  font-weight: 600;
}

.secondary-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.theme-dark {
  background: linear-gradient(135deg, #0f172a, #111827, #1e293b);
  color: #e5e7eb;
}

.theme-dark .quiz-container {
  background: rgba(17, 24, 39, 0.95);
  border: 1px solid rgba(148, 163, 184, 0.15);
}


.theme-dark .theme-toggle {
  background: #334155;
  color: #f8fafc;
}

.theme-dark .theme-toggle:hover {
  background: #475569;
}

.theme-dark .primary-btn {
  background: #3b82f6;
  color: white;
}

.theme-dark .primary-btn:hover {
  background: #2563eb;
}

.theme-dark .secondary-btn {
  background: #334155;
  color: #f8fafc;
}

.theme-dark .secondary-btn:hover:enabled {
  background: #475569;
}

.theme-light {
  background: linear-gradient(135deg, #eff6ff, #f8fafc, #dbeafe);
  color: #0f172a;
}

.theme-light .quiz-container {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(148, 163, 184, 0.28);
}


.theme-light .theme-toggle {
  background: #e2e8f0;
  color: #0f172a;
}

.theme-light .theme-toggle:hover {
  background: #cbd5e1;
}

.theme-light .primary-btn {
  background: #2563eb;
  color: white;
}

.theme-light .primary-btn:hover {
  background: #1d4ed8;
}

.theme-light .secondary-btn {
  background: #e2e8f0;
  color: #0f172a;
}

.theme-light .secondary-btn:hover:enabled {
  background: #cbd5e1;
}

@media (max-width: 640px) {
  .quiz-container {
    padding: 22px;
  }

  .top-bar {
    align-items: stretch;
  }

  .theme-toggle {
    width: 100%;
  }
}
</style>
