import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CitiesPage from './pages/Cities'

function App() {
  return (
    <Routes>
      <Route path="/cities" element={<CitiesPage />} />
      {/* Other routes will be added here */}
    </Routes>
  )
}

export default App
