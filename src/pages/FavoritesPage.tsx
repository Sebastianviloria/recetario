import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import RecipeGrid from '../components/RecipeGrid'
import { useFavorites } from '../context/favoritesContext'

export default function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-extrabold">Mi recetario</h1>
      {favorites.length === 0 ? (
        <EmptyState icon="📖" title="Aún no tienes recetas guardadas" description="Explora y guarda las que más te gusten.">
          <Link to="/explorar" className="inline-block rounded-full bg-naranja-600 px-6 py-2 font-semibold text-white hover:bg-naranja-700">
            Ir a explorar
          </Link>
        </EmptyState>
      ) : (
        <RecipeGrid recipes={favorites} />
      )}
    </section>
  )
}
