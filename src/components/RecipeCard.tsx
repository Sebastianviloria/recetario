import { useState } from 'react'
import { Link } from 'react-router-dom'
import ConfirmDialog from './ConfirmDialog'
import { useFavorites } from '../context/favoritesContext'
import { useToast } from '../context/toastContext'
import type { FavoriteRecipe } from '../types'

interface Props {
  recipe: FavoriteRecipe
}

export default function RecipeCard({ recipe }: Props) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const { showToast } = useToast()
  const fav = isFavorite(recipe.id)
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false)

  const toggle = () => {
    if (!fav) {
      addFavorite(recipe)
      showToast('success', `“${recipe.name}” se agregó a tu recetario`)
    } else {
      setConfirmOpen(true)
    }
  }

  const confirmRemove = () => {
    setConfirmOpen(false)
    removeFavorite(recipe.id)
    showToast('info', `“${recipe.name}” se quitó de tu recetario`)
  }

  return (
    <article className="relative flex flex-col overflow-hidden rounded-2xl border border-crema-200 bg-white shadow-sm transition hover:shadow-lg dark:border-cafe-800 dark:bg-cafe-800">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={fav}
        aria-label={fav ? `Quitar ${recipe.name} de favoritos` : `Agregar ${recipe.name} a favoritos`}
        className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl shadow hover:scale-110 dark:bg-cafe-900/90"
      >
        <span aria-hidden="true">{fav ? '❤️' : '🤍'}</span>
      </button>
      <Link to={`/explorar/${recipe.id}`} className="flex flex-1 flex-col">
        <img
          src={`${recipe.image}/medium`}
          alt={`Plato: ${recipe.name}`}
          loading="lazy"
          className="aspect-square w-full object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold leading-snug">{recipe.name}</h3>
          <p className="mt-1 text-sm opacity-75">
            {recipe.category}
            {recipe.area && ` · ${recipe.area}`}
          </p>
        </div>
      </Link>
      <ConfirmDialog
        open={confirmOpen}
        title="¿Quitar de tu recetario?"
        message={`Se quitará “${recipe.name}” de tus favoritos.`}
        confirmLabel="Sí, quitar"
        onConfirm={confirmRemove}
        onCancel={() => setConfirmOpen(false)}
      />
    </article>
  )
}
