import { useEffect, useState } from 'react'
import { fetchCategories, isAbortError } from '../api/mealdb'

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetchCategories(controller.signal)
      .then(setCategories)
      .catch((e: unknown) => {
        if (isAbortError(e)) return
        setError(e instanceof Error ? e.message : 'No se pudieron cargar las categorías')
      })
    return () => controller.abort()
  }, [])

  return { categories, error }
}
