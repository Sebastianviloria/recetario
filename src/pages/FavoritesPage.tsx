import { useState } from 'react'
import { Link } from 'react-router-dom'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'
import RecipeGrid from '../components/RecipeGrid'
import { useFavorites } from '../context/favoritesContext'
import { useToast } from '../context/toastContext'
import type { FavoriteRecipe } from '../types'

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites()
  const { showToast } = useToast()
  const [pending, setPending] = useState<FavoriteRecipe | null>(null)

  const confirmRemove = () => {
    if (pending) {
      removeFavorite(pending.id)
      showToast('info', `“${pending.name}” se quitó de tu recetario`)
    }
    setPending(null)
  }

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
        <RecipeGrid recipes={favorites} onRemoveRequest={setPending} />
      )}
      <ConfirmDialog
        open={pending !== null}
        title="¿Quitar de tu recetario?"
        message={pending ? `Se quitará “${pending.name}” de tus favoritos.` : ''}
        confirmLabel="Sí, quitar"
        onConfirm={confirmRemove}
        onCancel={() => setPending(null)}
      />
    </section>
  )
}
