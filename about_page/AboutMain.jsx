import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/index.css'
import AboutApp from './AboutApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AboutApp />
  </StrictMode>,
)