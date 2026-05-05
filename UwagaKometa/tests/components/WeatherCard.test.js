import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeatherCard from '../src/components/WeatherCard.vue'

describe('WeatherCard.vue', () => {
  const mockWeather = {
    city: 'Warszawa',
    country: 'PL',
    temp: 20,
    feelsLike: 18,
    humidity: 65,
    pressure: 1013,
    windSpeed: 12,
    description: 'Partly cloudy',
    icon: '⛅',
    clouds: 40
  }

  it('renders weather data correctly', () => {
    const wrapper = mount(WeatherCard, {
      props: {
        weather: mockWeather,
        isFavourite: false
      }
    })

    expect(wrapper.text()).toContain('Warszawa')
    expect(wrapper.text()).toContain('20°C')
    expect(wrapper.text()).toContain('65%')
  })

  it('displays favourite star correctly', () => {
    const { rerender } = mount(WeatherCard, {
      props: {
        weather: mockWeather,
        isFavourite: false
      }
    })

    expect(wrapper.find('.favourite-btn.active').exists()).toBe(false)
  })

  it('emits add-favourite event', async () => {
    const wrapper = mount(WeatherCard, {
      props: {
        weather: mockWeather,
        isFavourite: false
      }
    })

    await wrapper.find('.favourite-btn').trigger('click')
    expect(wrapper.emitted('add-favourite')).toBeTruthy()
  })
})
