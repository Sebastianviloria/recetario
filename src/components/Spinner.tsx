interface Props {
  label?: string
}

export default function Spinner({ label = 'Cargando…' }: Props) {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-16">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-crema-200 border-t-naranja-600 dark:border-cafe-800 dark:border-t-naranja-400"
        aria-hidden="true"
      />
      <p className="text-sm">{label}</p>
    </div>
  )
}
