import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { Trips } from "./pages/Trips"
import { Toaster } from "./components/ui/toaster"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trips/:tripId" element={<Trips />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
