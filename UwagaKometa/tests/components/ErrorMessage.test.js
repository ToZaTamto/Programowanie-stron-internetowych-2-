import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ErrorMessage from '../../src/components/ErrorMessage.vue'

describe('ErrorMessage.vue', () => {
  it('renders error message', () => {
    const message = 'Nie znaleziono miasta'
    const wrapper = mount(ErrorMessage, {
      props: { message }
    })

    expect(wrapper.text()).toContain(message)
  })

  it('displays error icon', () => {
    const wrapper = mount(ErrorMessage, {
      props: { message: 'Test error' }
    })

    expect(wrapper.text()).toContain('⚠️')
  })
})
