interface Props {
  categories: string[]
  value: string
  onChange: (value: string) => void
}

export default function CategoryFilter({ categories, value, onChange }: Props) {
  return (
    <div className="sm:w-60">
      <label htmlFor="categoria" className="mb-1 block text-sm font-semibold">
        Categoría
      </label>
      <select
        id="categoria"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-crema-200 bg-white px-4 py-2 dark:border-cafe-800 dark:bg-cafe-800"
      >
        <option value="">Todas</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  )
}
