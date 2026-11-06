import { useEffect, useRef } from 'react'

interface Props {
  open: boolean
  onAccept: () => void
  onDecline: () => void
}

/**
 * ⚠️ DARK PATTERN INTENCIONAL (confirmshaming) ⚠️
 *
 * Este modal está diseñado a propósito como ejemplo de patrón oscuro, con fines
 * educativos. Es "confirmshaming" porque:
 *  - La opción de aceptar es enorme, colorida y llamativa, mientras que la de
 *    rechazar es diminuta, gris y de bajo contraste (jerarquía visual manipuladora).
 *  - El texto del rechazo culpabiliza al usuario ("No gracias, prefiero comer
 *    siempre lo mismo") para empujarlo a suscribirse contra su voluntad.
 * No debe replicarse en un producto real: una buena UX presentaría ambas
 * opciones con el mismo peso y un lenguaje neutro.
 */
export default function DarkPatternDialog({ open, onAccept, onDecline }: Props) {
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
        onDecline()
      }}
      aria-labelledby="newsletter-title"
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-3xl bg-crema-50 p-6 text-center text-cafe-900 shadow-2xl sm:p-8"
    >
      <p className="text-5xl" aria-hidden="true">
        💌
      </p>
      <h2 id="newsletter-title" className="mt-2 text-2xl font-extrabold sm:text-3xl">
        ¡Recetas exclusivas en tu correo!
      </h2>
      <p className="my-4">
        Suscríbete a nuestro newsletter y recibe cada semana las mejores recetas, gratis.
      </p>
      <button
        type="button"
        onClick={onAccept}
        className="w-full animate-pulse rounded-2xl bg-gradient-to-r from-naranja-500 to-red-500 px-6 py-6 text-xl font-black uppercase tracking-wide text-white shadow-xl ring-4 ring-yellow-300 hover:scale-105 sm:text-2xl"
      >
        ¡Sí, quiero recetas deliciosas!
      </button>
      <button
        type="button"
        onClick={onDecline}
        className="mt-6 block w-full text-center text-[10px] text-gray-400 underline"
      >
        No gracias, prefiero comer siempre lo mismo
      </button>
    </dialog>
  )
}
