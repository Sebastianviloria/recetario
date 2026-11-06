import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'

export default function NotFoundPage() {
  return (
    <section className="px-4 py-12">
      <EmptyState icon="🍳" title="404 · Página no encontrada" description="La página que buscas no existe o se quemó en el horno.">
        <Link to="/" className="inline-block rounded-full bg-naranja-600 px-6 py-2 font-semibold text-white hover:bg-naranja-700">
          Volver al inicio
        </Link>
      </EmptyState>
    </section>
  )
}
