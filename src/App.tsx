import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ToastProvider from './components/ToastProvider'
import FavoritesProvider from './context/FavoritesProvider'
import ContactPage from './pages/ContactPage'
import ExplorePage from './pages/ExplorePage'
import FavoritesPage from './pages/FavoritesPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import RecipeDetailPage from './pages/RecipeDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <FavoritesProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/explorar" element={<ExplorePage />} />
                <Route path="/explorar/:id" element={<RecipeDetailPage />} />
                <Route path="/favoritos" element={<FavoritesPage />} />
                <Route path="/contacto" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </FavoritesProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
