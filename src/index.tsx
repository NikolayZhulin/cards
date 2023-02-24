import React from 'react'

import NiceModal from '@ebay/nice-modal-react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { App } from './app'
import { store } from './app/store'
import reportWebVitals from './reportWebVitals'
import './index.css'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <HashRouter>
      <NiceModal.Provider>
        <App />
      </NiceModal.Provider>
    </HashRouter>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
