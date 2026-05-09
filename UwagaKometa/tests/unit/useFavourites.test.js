import { describe, it, expect } from 'vitest'
import { useFavourites } from '../../src/composables/useFavourites'

describe('useFavourites composable', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize empty favourites', () => {
    const { favouriteCities } = useFavourites()
    expect(favouriteCities.value).toEqual([])
  })

  it('should add favourite city', () => {
    const { favouriteCities, addFavourite } = useFavourites()
    addFavourite('Warszawa')
    expect(favouriteCities.value).toContain('Warszawa')
  })

  it('should not add duplicate favourite', () => {
    const { favouriteCities, addFavourite } = useFavourites()
    addFavourite('Kraków')
    addFavourite('Kraków')
    expect(favouriteCities.value.filter(c => c === 'Kraków')).toHaveLength(1)
  })

  it('should remove favourite city', () => {
    const { favouriteCities, addFavourite, removeFavourite } = useFavourites()
    addFavourite('Gdańsk')
    removeFavourite('Gdańsk')
    expect(favouriteCities.value).not.toContain('Gdańsk')
  })

  it('should check if city is favourite', () => {
    const { addFavourite, isCityFavourite } = useFavourites()
    addFavourite('Poznań')
    expect(isCityFavourite('Poznań')).toBe(true)
    expect(isCityFavourite('Wrocław')).toBe(false)
  })

  it('should persist to localStorage', () => {
    const { addFavourite } = useFavourites()
    addFavourite('Łódź')
    
    const { favouriteCities } = useFavourites()
    expect(favouriteCities.value).toContain('Łódź')
  })
})
