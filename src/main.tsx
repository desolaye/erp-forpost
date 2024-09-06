import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app/app'

const root = document.getElementById('root')
if (!root) throw new Error("Root element with id 'root' is not defined")

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
