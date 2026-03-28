<script setup>
import { computed, ref } from 'vue'

// Dane wejściowe przechowujemy jako stringi,
// ponieważ input z v-model zwraca tekst.
const weight = ref('')
const height = ref('')
const isDarkMode = ref(true)

// Poprawne obliczanie BMI przez computed.
const bmi = computed(() => {
  const parsedWeight = parseFloat(weight.value)
  const parsedHeight = parseFloat(height.value)

  // Brak wyniku przy pustych lub niepoprawnych danych.
  if (
    Number.isNaN(parsedWeight) ||
    Number.isNaN(parsedHeight) ||
    parsedWeight <= 0 ||
    parsedHeight <= 0
  ) {
    return null
  }

  const heightInMeters = parsedHeight / 100
  const result = parsedWeight / (heightInMeters * heightInMeters)

  return result.toFixed(2)
})

// Kategoria BMI jako osobne computed.
const bmiCategory = computed(() => {
  if (!bmi.value) return ''

  const value = parseFloat(bmi.value)

  if (value < 18.5) return 'Niedowaga'
  if (value < 25) return 'Waga prawidłowa'
  if (value < 30) return 'Nadwaga'
  return 'Otyłość'
})

// Klasa kolorystyczna kategorii.
const categoryClass = computed(() => {
  switch (bmiCategory.value) {
    case 'Niedowaga':
      return 'underweight'
    case 'Waga prawidłowa':
      return 'normal'
    case 'Nadwaga':
      return 'overweight'
    case 'Otyłość':
      return 'obesity'
    default:
      return ''
  }
})

// Krótka interpretacja wyniku.
const bmiMessage = computed(() => {
  switch (bmiCategory.value) {
    case 'Niedowaga':
      return 'Twoja masa ciała jest poniżej zalecanego zakresu.'
    case 'Waga prawidłowa':
      return 'Twój wynik mieści się w prawidłowym zakresie BMI.'
    case 'Nadwaga':
      return 'Twój wynik wskazuje na podwyższoną masę ciała.'
    case 'Otyłość':
      return 'Twój wynik wskazuje na otyłość.'
    default:
      return ''
  }
})
</script>

<template>
  <section class="bmi-wrapper" :class="{ dark: isDarkMode }">
    <div class="orbit orbit-one"></div>
    <div class="orbit orbit-two"></div>

    <div class="bmi-card">
      <div class="card-top">
        <div>
          <p class="eyebrow">Vue 3 • Composition API</p>
          <h1>Kalkulator BMI</h1>
          <p class="subtitle">
            Kosmiczna wersja aplikacji liczącej BMI w czasie rzeczywistym.
          </p>
        </div>

        <button
          class="theme-toggle"
          type="button"
          @click="isDarkMode = !isDarkMode"
        >
          {{ isDarkMode ? '☀️ Light mode' : '🌙 Black mode' }}
        </button>
      </div>

      <div class="grid">
        <div class="panel input-panel">
          <div class="form-group">
            <label for="weight">Masa ciała (kg)</label>
            <input
              id="weight"
              v-model="weight"
              type="text"
              inputmode="decimal"
              placeholder="Np. 70"
            />
          </div>

          <div class="form-group">
            <label for="height">Wzrost (cm)</label>
            <input
              id="height"
              v-model="height"
              type="text"
              inputmode="decimal"
              placeholder="Np. 175"
            />
          </div>

          <p class="hint">
            Wynik oblicza się automatycznie bez użycia przycisku.
          </p>
        </div>

        <div class="panel result-panel">
          <template v-if="bmi">
            <p class="result-label">Twój wskaźnik BMI</p>
            <p class="result-value">{{ bmi }}</p>

            <p class="category-badge" :class="categoryClass">
              {{ bmiCategory }}
            </p>

            <p class="result-text">
              {{ bmiMessage }}
            </p>
          </template>

          <template v-else>
            <p class="result-label">Panel odczytu</p>
            <p class="empty-state">
              Wprowadź poprawną masę i wzrost, aby uruchomić skan BMI.
            </p>
          </template>
        </div>
      </div>

      <div class="legend panel">
        <h2>Zakresy BMI</h2>
        <ul>
          <li><span class="dot underweight"></span> poniżej 18.5 — Niedowaga</li>
          <li><span class="dot normal"></span> 18.5 – 24.99 — Waga prawidłowa</li>
          <li><span class="dot overweight"></span> 25.0 – 29.99 — Nadwaga</li>
          <li><span class="dot obesity"></span> 30.0 i powyżej — Otyłość</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bmi-wrapper {
  position: relative;
  width: min(100%, 980px);
  padding: 24px;
  border-radius: 28px;
  overflow: hidden;
  background:
    radial-gradient(circle at top, rgba(157, 78, 221, 0.18), transparent 28%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(226, 232, 240, 0.92));
  box-shadow:
    0 30px 70px rgba(15, 23, 42, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(14px);
  transition: background 0.35s ease, box-shadow 0.35s ease, color 0.35s ease;
}

.bmi-wrapper.dark {
  background:
    radial-gradient(circle at top, rgba(168, 85, 247, 0.28), transparent 30%),
    linear-gradient(145deg, rgba(5, 8, 20, 0.94), rgba(17, 24, 39, 0.96));
  box-shadow:
    0 35px 90px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.bmi-card {
  position: relative;
  z-index: 2;
}

.card-top {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;
  margin-bottom: 24px;
}

.eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #7c3aed;
}

.dark .eyebrow {
  color: #c084fc;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.05;
  color: #0f172a;
}

.dark h1 {
  color: #f8fafc;
}

.subtitle {
  max-width: 580px;
  margin: 12px 0 0;
  color: #475569;
  line-height: 1.6;
}

.dark .subtitle {
  color: #cbd5e1;
}

.theme-toggle {
  border: 1px solid rgba(148, 163, 184, 0.3);
  background: rgba(255, 255, 255, 0.7);
  color: #0f172a;
  border-radius: 999px;
  padding: 12px 18px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.dark .theme-toggle {
  background: rgba(15, 23, 42, 0.85);
  color: #f8fafc;
  border-color: rgba(148, 163, 184, 0.2);
}

.theme-toggle:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(99, 102, 241, 0.18);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.panel {
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 24px;
  padding: 22px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
}

.dark .panel {
  background: rgba(15, 23, 42, 0.55);
  border-color: rgba(148, 163, 184, 0.12);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
}

label {
  margin-bottom: 8px;
  font-weight: 700;
  color: #1e293b;
}

.dark label {
  color: #e2e8f0;
}

input {
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.32);
  background: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  color: #0f172a;
  outline: none;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.dark input {
  background: rgba(2, 6, 23, 0.85);
  color: #f8fafc;
  border-color: rgba(148, 163, 184, 0.2);
}

input:focus {
  border-color: #8b5cf6;
  transform: translateY(-1px);
  box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.16);
}

.hint,
.result-label,
.result-text,
.empty-state,
.legend li,
.legend h2 {
  color: #475569;
}

.dark .hint,
.dark .result-label,
.dark .result-text,
.dark .empty-state,
.dark .legend li,
.dark .legend h2 {
  color: #cbd5e1;
}

.result-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
}

.result-label {
  margin: 0 0 10px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.result-value {
  margin: 0;
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 800;
  line-height: 1;
  color: #7c3aed;
  text-shadow: 0 0 18px rgba(124, 58, 237, 0.22);
}

.dark .result-value {
  color: #c084fc;
  text-shadow: 0 0 24px rgba(192, 132, 252, 0.25);
}

.category-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin: 18px 0 14px;
  padding: 10px 16px;
  border-radius: 999px;
  font-weight: 800;
  font-size: 15px;
  border: 1px solid currentColor;
}

.empty-state {
  margin: 0;
  font-size: 18px;
  line-height: 1.7;
}

.legend {
  margin-top: 20px;
}

.legend h2 {
  margin-top: 0;
  margin-bottom: 14px;
}

.legend ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}

.dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 10px;
  border-radius: 50%;
}

.underweight {
  color: #38bdf8;
}

.normal {
  color: #22c55e;
}

.overweight {
  color: #f59e0b;
}

.obesity {
  color: #f43f5e;
}

.dot.underweight,
.dot.normal,
.dot.overweight,
.dot.obesity {
  background: currentColor;
}

.orbit {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(148, 163, 184, 0.14);
  pointer-events: none;
}

.orbit-one {
  width: 420px;
  height: 420px;
  top: -180px;
  right: -80px;
}

.orbit-two {
  width: 280px;
  height: 280px;
  bottom: -120px;
  left: -50px;
}

@media (max-width: 768px) {
  .card-top,
  .grid {
    grid-template-columns: 1fr;
    display: grid;
  }

  .card-top {
    gap: 16px;
  }

  .theme-toggle {
    width: 100%;
  }

  .bmi-wrapper {
    padding: 18px;
  }
}
</style>
