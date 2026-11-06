import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CategoryFilter from '../components/CategoryFilter'
import DarkPatternDialog from '../components/DarkPatternDialog'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import RecipeGrid from '../components/RecipeGrid'
import SearchBar from '../components/SearchBar'
import Spinner from '../components/Spinner'
import { useToast } from '../context/toastContext'
import { useCategories } from '../hooks/useCategories'
import { useDebounce } from '../hooks/useDebounce'
import { useRecipes } from '../hooks/useRecipes'

const NEWSLETTER_KEY = 'recetario:newsletter-visto'
const NEWSLETTER_DELAY_MS = 6000

export default function ExplorePage() {
  const [params, setParams] = useSearchParams()
  const urlQuery = params.get('q') ?? ''
  const category = params.get('categoria') ?? ''

  const [input, setInput] = useState<string>(urlQuery)
  const debounced = useDebounce(input, 400)
  const [newsletterOpen, setNewsletterOpen] = useState<boolean>(false)

  const { showToast } = useToast()
  const { categories, error: catError } = useCategories()
  const { recipes, loading, error, retry } = useRecipes(debounced.trim())

  // Sincroniza el valor debounced con ?q=
  useEffect(() => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (debounced.trim()) next.set('q', debounced.trim())
        else next.delete('q')
        return next
      },
      { replace: true },
    )
  }, [debounced, setParams])

  useEffect(() => {
    if (error) showToast('error', error)
  }, [error, showToast])
  useEffect(() => {
    if (catError) showToast('error', catError)
  }, [catError, showToast])

  // Modal de newsletter: una sola vez, a los pocos segundos.
  useEffect(() => {
    let seen = false
    try {
      seen = localStorage.getItem(NEWSLETTER_KEY) === '1'
    } catch {
      /* ignorar */
    }
    if (seen) return
    const t = setTimeout(() => {
      setNewsletterOpen(true)
      try {
        localStorage.setItem(NEWSLETTER_KEY, '1')
      } catch {
        /* ignorar */
      }
    }, NEWSLETTER_DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(
    () => (category ? recipes.filter((r) => r.category === category) : recipes),
    [recipes, category],
  )

  const handleCategory = (value: string) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set('categoria', value)
        else next.delete('categoria')
        return next
      },
      { replace: true },
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-extrabold">Explorar recetas</h1>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end">
        <SearchBar value={input} onChange={setInput} />
        <CategoryFilter categories={categories} value={category} onChange={handleCategory} />
      </div>

      {loading && <Spinner label="Buscando recetas…" />}
      {!loading && error && <ErrorMessage message={error} onRetry={retry} />}
      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          icon="🔍"
          title="No encontramos recetas"
          description="Prueba con otro nombre o cambia la categoría."
        />
      )}
      {!loading && !error && filtered.length > 0 && (
        <>
          <p className="mb-4" aria-live="polite">
            Mostrando {filtered.length} {filtered.length === 1 ? 'receta' : 'recetas'}
          </p>
          <RecipeGrid recipes={filtered} />
        </>
      )}

      <DarkPatternDialog
        open={newsletterOpen}
        onAccept={() => {
          setNewsletterOpen(false)
          showToast('success', '¡Gracias por suscribirte!')
        }}
        onDecline={() => setNewsletterOpen(false)}
      />
    </section>
  )
}
