import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import EkranWynik from './EkranWynik.vue'

function mountResult(score, total = 5) {
  return mount(EkranWynik, {
    props: { score, total }
  })
}

describe('EkranWynik.vue', () => {
  it('oblicza i renderuje procent wyniku', () => {
    const wrapper = mountResult(4)

    expect(wrapper.text()).toContain('4 / 5')
    expect(wrapper.text()).toContain('80%')
  })

  it.each([
    [5, 'Doskonale'],
    [4, 'Bardzo dobrze'],
    [3, 'Nie'],
    [1, 'Warto']
  ])('dla wyniku %i pokazuje odpowiedni komunikat', (score, expectedText) => {
    const wrapper = mountResult(score)

    expect(wrapper.text()).toContain(expectedText)
  })

  it('emituje restart po kliknieciu przycisku', async () => {
    const wrapper = mountResult(2)

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('restart')).toHaveLength(1)
  })
})
