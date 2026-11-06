import ContactForm from '../components/ContactForm'

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-extrabold">Contacto</h1>
      <p className="mb-6">¿Tienes una duda o sugerencia? Escríbenos.</p>
      <ContactForm />
    </section>
  )
}
