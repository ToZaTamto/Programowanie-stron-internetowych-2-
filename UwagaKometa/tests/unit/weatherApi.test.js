import { describe, it, expect } from 'vitest'
import { formatTemp } from '../src/utils/weatherApi'

describe('weatherApi utils', () => {
  it('should format temperature (already in Celsius)', () => {
    // Open-Meteo returns temperatures in Celsius already
    expect(formatTemp(0)).toBe(0)
    expect(formatTemp(20)).toBe(20)
    expect(formatTemp(20.5)).toBe(20) // Should round
    expect(formatTemp(20.7)).toBe(21) // Should round up
  })

  it('should round temperature to nearest integer', () => {
    expect(formatTemp(20.4)).toBe(20)
    expect(formatTemp(20.6)).toBe(21)
  })
})
