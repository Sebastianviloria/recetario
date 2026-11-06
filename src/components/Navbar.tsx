import { Link, NavLink } from 'react-router-dom'
import { useFavorites } from '../context/favoritesContext'

const links: { to: string; label: string; end?: boolean }[] = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/explorar', label: 'Explorar' },
  { to: '/favoritos', label: 'Mi recetario' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const { favorites } = useFavorites()

  return (
    <header className="sticky top-0 z-40 border-b border-crema-200 bg-crema-50/95 backdrop-blur dark:border-cafe-800 dark:bg-cafe-900/95">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-3 sm:flex-row sm:justify-between">
        <Link to="/" className="text-2xl font-extrabold text-naranja-600 dark:text-naranja-400">
          🍳 Recetario
        </Link>
        <nav aria-label="Principal">
          <ul className="flex flex-wrap justify-center gap-1 sm:gap-2">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    `rounded-full px-3 py-1.5 text-sm font-medium md:px-4 md:text-base ${
                      isActive
                        ? 'bg-naranja-600 text-white'
                        : 'hover:bg-crema-200 dark:hover:bg-cafe-800'
                    }`
                  }
                >
                  {l.label}
                  {l.to === '/favoritos' && favorites.length > 0 && (
                    <span
                      className="ml-1.5 rounded-full bg-white/80 px-1.5 text-xs font-bold text-naranja-700"
                      aria-label={`${favorites.length} guardadas`}
                    >
                      {favorites.length}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
