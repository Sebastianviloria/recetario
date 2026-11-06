import type {
  CategoriesResponse,
  FavoriteRecipe,
  Ingredient,
  Meal,
  MealsResponse,
  RecipeDetail,
} from '../types'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

async function getJson<T>(path: string, signal: AbortSignal): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { signal })
  if (!res.ok) throw new Error(`Error ${res.status} al consultar el servidor`)
  return (await res.json()) as T
}

export function toFavorite(meal: Meal): FavoriteRecipe {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory ?? '',
    area: meal.strArea ?? '',
  }
}

export async function searchMeals(query: string, signal: AbortSignal): Promise<FavoriteRecipe[]> {
  const data = await getJson<MealsResponse>(`/search.php?s=${encodeURIComponent(query)}`, signal)
  return (data.meals ?? []).map(toFavorite)
}

export async function fetchMeal(id: string, signal: AbortSignal): Promise<RecipeDetail | null> {
  const data = await getJson<MealsResponse>(`/lookup.php?i=${encodeURIComponent(id)}`, signal)
  const meal = data.meals?.[0]
  if (!meal) return null

  const ingredients: Ingredient[] = []
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]?.trim()
    const measure = meal[`strMeasure${i}`]?.trim() ?? ''
    if (name) ingredients.push({ name, measure })
  }

  return {
    ...toFavorite(meal),
    instructions: meal.strInstructions ?? '',
    youtube: meal.strYoutube?.trim() || null,
    ingredients,
  }
}

export async function fetchCategories(signal: AbortSignal): Promise<string[]> {
  const data = await getJson<CategoriesResponse>('/list.php?c=list', signal)
  return (data.meals ?? []).map((c) => c.strCategory)
}

export function isAbortError(e: unknown): boolean {
  return e instanceof DOMException && e.name === 'AbortError'
}
