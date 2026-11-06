export default function Footer() {
  return (
    <footer className="border-t border-crema-200 py-6 text-center text-sm dark:border-cafe-800">
      <p>
        © {new Date().getFullYear()} Recetario · Datos de{' '}
        <a
          href="https://www.themealdb.com"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-naranja-700 underline dark:text-naranja-400"
        >
          TheMealDB
        </a>
      </p>
    </footer>
  )
}
