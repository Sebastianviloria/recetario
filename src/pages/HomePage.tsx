import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <section className="flex flex-col items-center px-4 py-20 text-center sm:py-28 md:py-36">
      <p className="text-6xl" aria-hidden="true">
        🍲
      </p>
      <h1 className="mt-4 text-4xl font-extrabold text-naranja-600 sm:text-5xl md:text-6xl dark:text-naranja-400">
        Recetario
      </h1>
      <p className="mt-4 max-w-xl text-lg md:text-xl">
        Descubre miles de recetas de todo el mundo, guarda tus favoritas y cocina algo delicioso hoy.
      </p>
      <Link
        to="/explorar"
        className="mt-8 rounded-full bg-naranja-600 px-8 py-3 text-lg font-bold text-white shadow-lg hover:bg-naranja-700"
      >
        Explorar recetas
      </Link>
    </section>
  )
}
