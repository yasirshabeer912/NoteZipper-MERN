import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './bootstrap.min.css'
import { Provider } from 'react-redux'
// import store from './store.js';
import { UserProvider } from './context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider >
    <App />
  </UserProvider>,
)
