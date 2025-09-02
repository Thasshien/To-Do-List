import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App_Context_Provider from '../src/components/context/context.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App_Context_Provider>
      <App />
    </App_Context_Provider>
  </StrictMode>,
)
