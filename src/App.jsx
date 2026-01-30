import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { store, persistor } from './store/store'
import MainApp from './components/common/MainApp'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <MainApp />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App