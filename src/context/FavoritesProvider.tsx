import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { FavoriteRecipe } from '../types'
import { FavoritesContext } from './favoritesContext'
import type { FavoritesContextValue } from './favoritesContext'

const STORAGE_KEY = 'recetario:favoritos'

function load(): FavoriteRecipe[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? (parsed as FavoriteRecipe[]) : []
  } catch {
    return []
  }
}

interface Props {
  children: ReactNode
}

export default function FavoritesProvider({ children }: Props) {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      /* almacenamiento no disponible */
    }
  }, [favorites])

  const addFavorite = useCallback((recipe: FavoriteRecipe) => {
    setFavorites((prev) => (prev.some((r) => r.id === recipe.id) ? prev : [...prev, recipe]))
  }, [])

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((r) => r.id !== id))
  }, [])

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite: (id: string) => favorites.some((r) => r.id === id),
    }),
    [favorites, addFavorite, removeFavorite],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
