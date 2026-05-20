import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import App from './App.tsx'
import Header from './components/Header.tsx'
import DetallePokemon from './pages/DetallePokemon.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>

      <Header />

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/DetallePokemon/:nombre" element={<DetallePokemon />} />
      </Routes>

    </BrowserRouter>
  </StrictMode>,
)