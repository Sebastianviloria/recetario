# Recetario

SPA en español para buscar, explorar y guardar recetas usando la API pública de [TheMealDB](https://www.themealdb.com) (sin API key). Hecha con Vite + React + TypeScript + Tailwind CSS.

## Cómo correrlo

```bash
npm install
npm run dev      # desarrollo
npm run build    # compilación de producción (tsc + vite)
npm run preview  # previsualizar el build
```

Despliegue en Vercel: `vercel.json` redirige todas las rutas a `/index.html`.

## Requisitos cumplidos

- Rutas con react-router-dom y NavLink: `/`, `/explorar`, `/explorar/:id`, `/favoritos`, `/contacto` y `*` (404).
- Explorar: buscador con debounce (`?q=`), filtro por categoría (`?categoria=`), contador "Mostrando X recetas".
- Detalle con ingredientes + medidas (1..20), instrucciones, categoría, origen y enlace a YouTube.
- Estados de loading (spinner), error (con Reintentar) y vacío; peticiones canceladas con `AbortController`.
- Favoritos con Context en la raíz, persistidos en `localStorage` (id, nombre, imagen, categoría, origen).
- Toasts (éxito/error/info) hechos desde cero con Context + `setTimeout`, con `role="status"` y `aria-live`.
- Modales con `<dialog>` + `useRef` + `showModal()`: `ConfirmDialog` reutilizable (quitar favorito, enviar formulario) y `DarkPatternDialog` (dark pattern intencional de tipo confirmshaming, documentado en el código).
- Formulario de contacto controlado con validación y botón deshabilitado mientras sea inválido.
- Hooks propios: `useRecipes`, `useRecipe`, `useCategories`, `useDebounce`.
- Accesibilidad: `alt`, `label`/`htmlFor`, HTML semántico, foco visible. Tema cálido naranja/crema con modo oscuro automático.
- Tipos en `src/types`, más de 10 componentes en archivos `.tsx` separados.
