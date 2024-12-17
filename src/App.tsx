import { HashRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { Trips } from "./pages/Trips"
import { Toaster } from "./components/ui/toaster"

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trips/:tripId" element={<Trips />} />
      </Routes>
      <Toaster />
    </HashRouter>
  )
}

export default App
