import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import { AppProvider } from './Context/AppContext'
import { ToastProvider } from './Context/ToastContext'

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <Router>
          <AppProvider>
            <App />
          </AppProvider>
        </Router>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
