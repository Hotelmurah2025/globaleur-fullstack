import { Navbar } from "./components/sections/Navbar"
import { Hero } from "./components/sections/Hero"
import { TrendingCities } from "./components/sections/TrendingCities"
import { FirstTimeVisits } from "./components/sections/FirstTimeVisits"
import { SmartPlanning } from "./components/sections/SmartPlanning"
import { Footer } from "./components/sections/Footer"

function App() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">
        <section className="relative min-h-screen bg-gradient-to-r from-blue-600 to-blue-800">
          <Hero />
        </section>

        <section className="container mx-auto py-16">
          <TrendingCities />
        </section>

        <section className="container mx-auto py-16">
          <FirstTimeVisits />
        </section>

        <section className="container mx-auto py-16">
          <SmartPlanning />
        </section>
      </div>
      <Footer />
    </main>
  )
}

export default App
