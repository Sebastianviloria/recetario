import type { ReactNode } from 'react'

interface Props {
  icon?: string
  title: string
  description?: string
  children?: ReactNode
}

export default function EmptyState({ icon = '🍽️', title, description, children }: Props) {
  return (
    <div className="mx-auto my-12 max-w-md text-center">
      <p className="mb-3 text-5xl" aria-hidden="true">
        {icon}
      </p>
      <h2 className="mb-2 text-xl font-bold">{title}</h2>
      {description && <p className="mb-4 opacity-80">{description}</p>}
      {children}
    </div>
  )
}
