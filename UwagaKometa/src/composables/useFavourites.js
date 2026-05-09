import { ref } from 'vue'

const STORAGE_KEY = 'uwagakometa-favourites'

function loadFavourites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export function useFavourites() {
  const favouriteCities = ref(loadFavourites())

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favouriteCities.value))
  }

  function addFavourite(city) {
    if (!city || favouriteCities.value.includes(city)) return
    favouriteCities.value.push(city)
    save()
  }

  function removeFavourite(city) {
    favouriteCities.value = favouriteCities.value.filter((item) => item !== city)
    save()
  }

  function isCityFavourite(city) {
    return favouriteCities.value.includes(city)
  }

  return {
    favouriteCities,
    addFavourite,
    removeFavourite,
    isCityFavourite
  }
}
