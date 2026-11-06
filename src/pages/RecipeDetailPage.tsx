import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import Spinner from '../components/Spinner'
import { useFavorites } from '../context/favoritesContext'
import { useToast } from '../context/toastContext'
import { useRecipe } from '../hooks/useRecipe'

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { recipe, loading, error, retry } = useRecipe(id)
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const { showToast } = useToast()
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false)

  useEffect(() => {
    if (error) showToast('error', error)
  }, [error, showToast])

  const back = (
    <Link to="/explorar" className="mb-6 inline-block font-semibold text-naranja-700 underline dark:text-naranja-400">
      ← Volver a explorar
    </Link>
  )

  let body
  if (loading) body = <Spinner label="Cargando receta…" />
  else if (error) body = <ErrorMessage message={error} onRetry={retry} />
  else if (!recipe) body = <EmptyState icon="🤷" title="Receta no encontrada" description="Esta receta no existe." />
  else {
    const fav = isFavorite(recipe.id)
    const toggle = () => {
      if (fav) {
        setConfirmOpen(true)
      } else {
        addFavorite({
          id: recipe.id,
          name: recipe.name,
          image: recipe.image,
          category: recipe.category,
          area: recipe.area,
        })
        showToast('success', `“${recipe.name}” se agregó a tu recetario`)
      }
    }
    const confirmRemove = () => {
      setConfirmOpen(false)
      removeFavorite(recipe.id)
      showToast('info', `“${recipe.name}” se quitó de tu recetario`)
    }
    body = (
      <article className="grid gap-8 md:grid-cols-2">
        <img src={recipe.image} alt={`Plato: ${recipe.name}`} className="w-full rounded-2xl object-cover shadow-lg" />
        <div>
          <h1 className="text-3xl font-extrabold md:text-4xl">{recipe.name}</h1>
          <p className="mt-2">
            <span className="rounded-full bg-naranja-600 px-3 py-1 text-sm font-semibold text-white">{recipe.category}</span>{' '}
            <span className="ml-2">Origen: {recipe.area}</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={toggle}
              aria-pressed={fav}
              className="rounded-lg bg-naranja-600 px-5 py-2 font-semibold text-white hover:bg-naranja-700"
            >
              {fav ? '💔 Quitar de mi recetario' : '❤️ Agregar a mi recetario'}
            </button>
            {recipe.youtube && (
              <a
                href={recipe.youtube}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-naranja-600 px-5 py-2 font-semibold text-naranja-700 hover:bg-crema-200 dark:text-naranja-400 dark:hover:bg-cafe-800"
              >
                ▶ Ver en YouTube
              </a>
            )}
          </div>
          <section aria-labelledby="ingredientes" className="mt-6">
            <h2 id="ingredientes" className="mb-2 text-xl font-bold">Ingredientes</h2>
            <ul className="list-inside list-disc space-y-1">
              {recipe.ingredients.map((i) => (
                <li key={i.name}>
                  {i.measure && <strong>{i.measure}</strong>} {i.name}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <section aria-labelledby="instrucciones" className="md:col-span-2">
          <h2 id="instrucciones" className="mb-2 text-xl font-bold">Instrucciones</h2>
          <p className="whitespace-pre-line leading-relaxed">{recipe.instructions}</p>
        </section>
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

  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      {back}
      {body}
    </section>
  )
}
