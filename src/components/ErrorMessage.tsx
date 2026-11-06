interface Props {
  message: string
  onRetry: () => void
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div
      role="alert"
      className="mx-auto my-10 max-w-md rounded-2xl border border-red-300 bg-red-50 p-6 text-center text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100"
    >
      <p className="mb-1 text-lg font-semibold">Algo salió mal</p>
      <p className="mb-4 text-sm">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg bg-naranja-600 px-5 py-2 font-semibold text-white hover:bg-naranja-700"
      >
        Reintentar
      </button>
    </div>
  )
}
