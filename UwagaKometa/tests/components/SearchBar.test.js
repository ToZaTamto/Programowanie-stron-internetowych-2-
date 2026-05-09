import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from '../../src/components/SearchBar.vue'

describe('SearchBar.vue', () => {
  it('renders search input and button', () => {
    const wrapper = mount(SearchBar)
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('emits search event with city name', async () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input')
    const form = wrapper.find('form')

    await input.setValue('Warszawa')
    await form.trigger('submit')

    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')[0]).toEqual(['Warszawa'])
  })

  it('clears input after search', async () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input')
    const form = wrapper.find('form')

    await input.setValue('Kraków')
    await form.trigger('submit')

    expect(input.element.value).toBe('')
  })

  it('does not emit for empty input', async () => {
    const wrapper = mount(SearchBar)
    const form = wrapper.find('form')

    await form.trigger('submit')

    expect(wrapper.emitted('search')).toBeFalsy()
  })
})
