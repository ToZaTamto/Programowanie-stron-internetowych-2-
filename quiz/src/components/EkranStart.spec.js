import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import EkranStart from './EkranStart.vue'

describe('EkranStart.vue', () => {
  it('renderuje tytul i opis przekazane przez propsy', () => {
    const wrapper = mount(EkranStart, {
      props: {
        title: 'Quiz testowy',
        description: 'Opis quizu do testu'
      }
    })

    expect(wrapper.text()).toContain('Quiz testowy')
    expect(wrapper.text()).toContain('Opis quizu do testu')
  })

  it('emituje start po kliknieciu przycisku', async () => {
    const wrapper = mount(EkranStart, {
      props: {
        title: 'Quiz testowy',
        description: 'Opis quizu do testu'
      }
    })

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('start')).toHaveLength(1)
  })
})
