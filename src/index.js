import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom"
import AppProvider from "./contexts/AppContext"
import reportWebVitals from './reportWebVitals';
import AuthProvider from './contexts/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
