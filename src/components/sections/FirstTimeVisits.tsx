import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const trips = [
  {
    id: "654c68fb0f5e67a154f2715f",
    title: "An Unforgettable First Trip to HK",
    description: "Recommended by a HK local for travelers who want to enjoy HK on a short trip! Discover HK's most iconic places and attractions.",
    image: "https://cdn.globaleur.com/whitelabel/photos/hongkong.jpg"
  },
  {
    id: "654c68fb0f5e67a154f2715a",
    title: "Enjoy the Best in Kuala Lumpur",
    description: "Explore Malaysia's beautiful capital on this essential 3-day itinerary! You can see many different aspects of the city in a short period of time.",
    image: "https://cdn.globaleur.com/whitelabel/photos/kualalumpur.jpg"
  },
  {
    id: "654c68fb0f5e67a154f2717d",
    title: "A Romantic Walk in Prague",
    description: "Fly to Prague, a romantic city from the movies! Walk along the medieval stone paved roads and be immersed in the beautiful scenery.",
    image: "https://cdn.globaleur.com/whitelabel/photos/prague.jpg"
  }
]

export const FirstTimeVisits = () => {
  return (
    <div className="space-y-8 py-16">
      <h2 className="text-2xl font-semibold px-4">First-time visits</h2>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-6 px-4 pb-4">
          {trips.map((trip) => (
            <Card key={trip.id} className="w-[400px] flex-none group cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="aspect-video relative overflow-hidden rounded-t-xl">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <h6 className="text-lg font-semibold text-gray-900">{trip.title}</h6>
                  <p className="text-sm text-gray-600 line-clamp-2">{trip.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="bg-gray-100" />
      </ScrollArea>
    </div>
  )
}
