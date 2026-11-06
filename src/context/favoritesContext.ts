import { createContext, useContext } from 'react'
import type { FavoriteRecipe } from '../types'

export interface FavoritesContextValue {
  favorites: FavoriteRecipe[]
  isFavorite: (id: string) => boolean
  addFavorite: (recipe: FavoriteRecipe) => void
  removeFavorite: (id: string) => void
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites debe usarse dentro de FavoritesProvider')
  return ctx
}
