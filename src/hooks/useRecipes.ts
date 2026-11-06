import { useCallback, useEffect, useState } from 'react'
import { isAbortError, searchMeals } from '../api/mealdb'
import type { FavoriteRecipe } from '../types'

export function useRecipes(query: string) {
  const [recipes, setRecipes] = useState<FavoriteRecipe[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState<number>(0)

  useEffect(() => {
    const controller = new AbortController()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    setError(null)
    searchMeals(query, controller.signal)
      .then((data) => {
        setRecipes(data)
        setLoading(false)
      })
      .catch((e: unknown) => {
        if (isAbortError(e)) return
        setError(e instanceof Error ? e.message : 'No se pudieron cargar las recetas')
        setLoading(false)
      })
    return () => controller.abort()
  }, [query, attempt])

  const retry = useCallback(() => setAttempt((a) => a + 1), [])
  return { recipes, loading, error, retry }
}
