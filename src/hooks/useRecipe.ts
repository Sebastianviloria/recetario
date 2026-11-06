import { useCallback, useEffect, useState } from 'react'
import { fetchMeal, isAbortError } from '../api/mealdb'
import type { RecipeDetail } from '../types'

export function useRecipe(id: string | undefined) {
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState<number>(0)

  useEffect(() => {
    if (!id) return
    const controller = new AbortController()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    setError(null)
    fetchMeal(id, controller.signal)
      .then((data) => {
        setRecipe(data)
        setLoading(false)
      })
      .catch((e: unknown) => {
        if (isAbortError(e)) return
        setError(e instanceof Error ? e.message : 'No se pudo cargar la receta')
        setLoading(false)
      })
    return () => controller.abort()
  }, [id, attempt])

  const retry = useCallback(() => setAttempt((a) => a + 1), [])
  return { recipe, loading, error, retry }
}
