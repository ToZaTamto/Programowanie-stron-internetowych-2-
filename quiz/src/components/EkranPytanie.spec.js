import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import EkranPytanie from './EkranPytanie.vue'

const question = {
  id: 1,
  tresc: 'Ktora marka produkuje model Mustang?',
  odpowiedzi: ['BMW', 'Ford', 'Audi', 'Toyota'],
  poprawna: 1
}

const nextQuestion = {
  id: 2,
  tresc: 'Co zatrzymuje samochod?',
  odpowiedzi: ['Alternator', 'Hamulce', 'Chlodnica'],
  poprawna: 1
}

function mountQuestion(props = {}) {
  return mount(EkranPytanie, {
    props: {
      question,
      questionIndex: 0,
      totalQuestions: 5,
      ...props
    }
  })
}

describe('EkranPytanie.vue', () => {
  it('renderuje tresc pytania, odpowiedzi i postep', () => {
    const wrapper = mountQuestion({ questionIndex: 1, totalQuestions: 5 })

    expect(wrapper.text()).toContain(question.tresc)
    expect(wrapper.findAll('.answer-btn')).toHaveLength(4)
    expect(wrapper.get('.progress-fill').attributes('style')).toContain('width: 40%')
  })

  it('emituje answered=true po wybraniu poprawnej odpowiedzi', async () => {
    const wrapper = mountQuestion()

    await wrapper.findAll('.answer-btn')[1].trigger('click')

    expect(wrapper.emitted('answered')).toEqual([[true]])
    expect(wrapper.findAll('.answer-btn')[1].classes()).toContain('correct')
  })

  it('emituje answered=false i oznacza bledna odpowiedz', async () => {
    const wrapper = mountQuestion()

    await wrapper.findAll('.answer-btn')[0].trigger('click')

    expect(wrapper.emitted('answered')).toEqual([[false]])
    expect(wrapper.findAll('.answer-btn')[0].classes()).toContain('wrong')
    expect(wrapper.findAll('.answer-btn')[1].classes()).toContain('correct')
  })

  it('blokuje ponowne odpowiadanie po pierwszym wyborze', async () => {
    const wrapper = mountQuestion()
    const answers = wrapper.findAll('.answer-btn')

    await answers[0].trigger('click')
    await answers[1].trigger('click')

    expect(wrapper.emitted('answered')).toHaveLength(1)
    expect(answers.every((button) => button.attributes('disabled') !== undefined)).toBe(true)
  })

  it('emituje next dopiero po kliknieciu aktywnego przycisku dalej', async () => {
    const wrapper = mountQuestion()
    const nextButton = wrapper.get('.secondary-btn')

    expect(nextButton.attributes('disabled')).toBeDefined()

    await wrapper.findAll('.answer-btn')[1].trigger('click')
    await nextButton.trigger('click')

    expect(wrapper.emitted('next')).toHaveLength(1)
  })

  it('resetuje wybrana odpowiedz po zmianie pytania', async () => {
    const wrapper = mountQuestion()

    await wrapper.findAll('.answer-btn')[1].trigger('click')
    await wrapper.setProps({ question: nextQuestion, questionIndex: 1 })

    expect(wrapper.find('.correct').exists()).toBe(false)
    expect(wrapper.get('.secondary-btn').attributes('disabled')).toBeDefined()
  })
})
