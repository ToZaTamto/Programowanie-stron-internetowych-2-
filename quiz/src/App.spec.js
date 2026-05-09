import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import App from './App.vue'

describe('App.vue', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('startuje na ekranie startowym i przechodzi do quizu', async () => {
    const wrapper = mount(App)

    expect(wrapper.text()).toContain('Quiz motoryzacyjny')

    await wrapper.get('.primary-btn').trigger('click')

    expect(wrapper.text()).toContain('Pytanie 1 / 5')
  })

  it('liczy wynik i pokazuje ekran rezultatu po ostatnim pytaniu', async () => {
    const wrapper = mount(App)

    await wrapper.get('.primary-btn').trigger('click')

    for (const correctIndex of [1, 2, 2, 1, 2]) {
      await wrapper.findAll('.answer-btn')[correctIndex].trigger('click')
      await wrapper.get('.secondary-btn').trigger('click')
    }

    expect(wrapper.text()).toContain('5 / 5')
    expect(wrapper.text()).toContain('100%')
  })

  it('restartuje quiz po ekranie wyniku', async () => {
    const wrapper = mount(App)

    await wrapper.get('.primary-btn').trigger('click')

    for (const correctIndex of [0, 0, 0, 0, 0]) {
      await wrapper.findAll('.answer-btn')[correctIndex].trigger('click')
      await wrapper.get('.secondary-btn').trigger('click')
    }

    await wrapper.get('.primary-btn').trigger('click')

    expect(wrapper.text()).toContain('Quiz motoryzacyjny')
  })

  it('przelacza motyw i zapisuje go w localStorage', async () => {
    const wrapper = mount(App)

    expect(wrapper.classes()).toContain('theme-dark')

    await wrapper.get('.theme-toggle').trigger('click')

    expect(wrapper.classes()).toContain('theme-light')
    expect(localStorage.getItem('quiz-theme')).toBe('light')
  })

  it('odczytuje zapisany jasny motyw po zamontowaniu', async () => {
    localStorage.setItem('quiz-theme', 'light')

    const wrapper = mount(App)
    await nextTick()

    expect(wrapper.classes()).toContain('theme-light')
  })
})
