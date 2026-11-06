import type { ToastItem, ToastType } from '../types'

interface Props {
  toast: ToastItem
  onClose: (id: number) => void
}

const styles: Record<ToastType, string> = {
  success: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-cafe-800 text-crema-50 dark:bg-crema-100 dark:text-cafe-900',
}

const icons: Record<ToastType, string> = { success: '✓', error: '⚠', info: 'ℹ' }

export default function Toast({ toast, onClose }: Props) {
  return (
    <div
      className={`pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl px-4 py-3 shadow-lg ${styles[toast.type]}`}
    >
      <span aria-hidden="true">{icons[toast.type]}</span>
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        type="button"
        onClick={() => onClose(toast.id)}
        aria-label="Cerrar notificación"
        className="rounded px-1 text-lg leading-none opacity-80 hover:opacity-100"
      >
        ×
      </button>
    </div>
  )
}
