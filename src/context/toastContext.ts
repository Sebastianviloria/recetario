import { createContext, useContext } from 'react'
import type { ToastType } from '../types'

export interface ToastContextValue {
  showToast: (type: ToastType, message: string) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast debe usarse dentro de ToastProvider')
  return ctx
}
