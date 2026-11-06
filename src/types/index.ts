export interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory: string
  strArea: string
  strInstructions: string
  strYoutube: string | null
  [key: string]: string | null
}

export interface MealsResponse {
  meals: Meal[] | null
}

export interface Category {
  strCategory: string
}

export interface CategoriesResponse {
  meals: Category[] | null
}

/** Datos mínimos guardados en favoritos. */
export interface FavoriteRecipe {
  id: string
  name: string
  image: string
  category: string
  area: string
}

export interface Ingredient {
  name: string
  measure: string
}

export interface RecipeDetail extends FavoriteRecipe {
  instructions: string
  youtube: string | null
  ingredients: Ingredient[]
}

export type ToastType = 'success' | 'error' | 'info'

export interface ToastItem {
  id: number
  type: ToastType
  message: string
}

export interface FetchState<T> {
  data: T
  loading: boolean
  error: string | null
}

export interface ContactFormValues {
  nombre: string
  email: string
  mensaje: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>
