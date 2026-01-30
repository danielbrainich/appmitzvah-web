import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { store, persistor } from './store/store'
import Layout from './components/common/Layout'
import Holidays from './screens/Holidays'
import Shabbat from './screens/Shabbat'
import Settings from './screens/Settings'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/holidays" replace />} />
              <Route path="holidays" element={<Holidays />} />
              <Route path="shabbat" element={<Shabbat />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App