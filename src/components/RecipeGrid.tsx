import RecipeCard from './RecipeCard'
import type { FavoriteRecipe } from '../types'

interface Props {
  recipes: FavoriteRecipe[]
  onRemoveRequest?: (recipe: FavoriteRecipe) => void
}

export default function RecipeGrid({ recipes, onRemoveRequest }: Props) {
  return (
    <section aria-label="Listado de recetas">
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes.map((r) => (
          <li key={r.id} className="flex">
            <div className="flex w-full flex-col [&>article]:flex-1">
              <RecipeCard recipe={r} onRemoveRequest={onRemoveRequest} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
