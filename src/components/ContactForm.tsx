import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import ConfirmDialog from './ConfirmDialog'
import { useToast } from '../context/toastContext'
import type { ContactFormErrors, ContactFormValues } from '../types'

const initial: ContactFormValues = { nombre: '', email: '', mensaje: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(v: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}
  if (v.nombre.trim().length < 2) errors.nombre = 'El nombre debe tener al menos 2 caracteres.'
  if (!EMAIL_RE.test(v.email.trim())) errors.email = 'Ingresa un correo electrónico válido.'
  if (v.mensaje.trim().length < 10) errors.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
  return errors
}

export default function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initial)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
  const { showToast } = useToast()

  const errors = validate(values)
  const invalid = Object.keys(errors).length > 0

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }
  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (invalid) {
      showToast('error', 'Revisa los campos del formulario.')
      return
    }
    setConfirmOpen(true)
  }

  const confirmSend = () => {
    setConfirmOpen(false)
    setValues(initial)
    setTouched({})
    showToast('success', '¡Mensaje enviado! Te responderemos pronto.')
  }

  const field =
    'w-full rounded-lg border bg-white px-4 py-2 dark:bg-cafe-800 border-crema-200 dark:border-cafe-800'
  const fieldError = (name: keyof ContactFormValues) =>
    touched[name] && errors[name] ? (
      <p id={`${name}-error`} role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
        {errors[name]}
      </p>
    ) : null
  const aria = (name: keyof ContactFormValues) => ({
    'aria-invalid': Boolean(touched[name] && errors[name]),
    'aria-describedby': touched[name] && errors[name] ? `${name}-error` : undefined,
  })

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Formulario de contacto">
        <div>
          <label htmlFor="nombre" className="mb-1 block font-semibold">
            Nombre
          </label>
          <input id="nombre" name="nombre" type="text" value={values.nombre} onChange={handleChange} onBlur={handleBlur} className={field} {...aria('nombre')} />
          {fieldError('nombre')}
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block font-semibold">
            Correo electrónico
          </label>
          <input id="email" name="email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className={field} {...aria('email')} />
          {fieldError('email')}
        </div>
        <div>
          <label htmlFor="mensaje" className="mb-1 block font-semibold">
            Mensaje
          </label>
          <textarea id="mensaje" name="mensaje" rows={5} value={values.mensaje} onChange={handleChange} onBlur={handleBlur} className={field} {...aria('mensaje')} />
          {fieldError('mensaje')}
        </div>
        <button
          type="submit"
          disabled={invalid}
          className="w-full rounded-lg bg-naranja-600 px-6 py-3 font-semibold text-white hover:bg-naranja-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          Enviar mensaje
        </button>
      </form>
      <ConfirmDialog
        open={confirmOpen}
        title="¿Enviar mensaje?"
        message="Vamos a enviar tu mensaje al equipo de Recetario."
        confirmLabel="Sí, enviar"
        onConfirm={confirmSend}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  )
}
