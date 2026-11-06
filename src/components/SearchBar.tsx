interface Props {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="flex-1">
      <label htmlFor="buscador" className="mb-1 block text-sm font-semibold">
        Buscar receta
      </label>
      <input
        id="buscador"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ej. pasta, pollo, tarta…"
        className="w-full rounded-lg border border-crema-200 bg-white px-4 py-2 dark:border-cafe-800 dark:bg-cafe-800"
      />
    </div>
  )
}
