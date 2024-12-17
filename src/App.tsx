import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { Trips } from "./pages/Trips"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trips/:tripId" element={<Trips />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
