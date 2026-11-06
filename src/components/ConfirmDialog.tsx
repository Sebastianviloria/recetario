import { useEffect, useRef } from 'react'

interface Props {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

/** Modal reutilizable basado en <dialog> nativo. */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault()
        onCancel()
      }}
      aria-labelledby="confirm-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-crema-50 p-6 text-cafe-900 shadow-2xl dark:bg-cafe-800 dark:text-crema-100"
    >
      <h2 id="confirm-title" className="mb-2 text-xl font-bold">
        {title}
      </h2>
      <p className="mb-6">{message}</p>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-crema-200 px-4 py-2 font-medium hover:bg-crema-200 dark:border-cafe-900 dark:hover:bg-cafe-900"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-lg bg-naranja-600 px-4 py-2 font-semibold text-white hover:bg-naranja-700"
        >
          {confirmLabel}
        </button>
      </div>
    </dialog>
  )
}
