export const SmartPlanning = () => {
  return (
    <div className="space-y-20 py-20">
      <section className="space-y-10">
        <h2 className="text-3xl font-semibold text-center">Smart ways to plan your next trip</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Interest-based Plans */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <img src="/assets/heart.svg" alt="Heart" className="w-10 h-10" />
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Receive interest-based recommended plans</h4>
                <p className="text-gray-600">
                  Don't have too many ideas about the destination? Tired of spending endless time researching?
                  We will provide a full itinerary based on your travel interests!
                </p>
                <ol className="space-y-2 text-gray-600 list-decimal pl-4">
                  <li>Choose travel interests</li>
                  <li>Receive three personalized itineraries</li>
                  <li>Select one and customize it</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Travel List */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <img src="/assets/pins.svg" alt="Pins" className="w-10 h-10" />
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Create a "Travel List" to get a fully optimized travel itinerary</h4>
                <p className="text-gray-600">
                  No more tedious planning with Google Maps! We will do the chores!
                  One click to get a day-to-day itinerary that is optimized with all important travel variables!
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src="/assets/trip-planner.svg"
                      alt="Travel List"
                      className="w-8 h-8"
                    />
                    <p className="text-gray-600">'Travel List' is a list of places you want to go</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <img
                      src="/assets/trip-planner.svg"
                      alt="Add Places"
                      className="w-8 h-8"
                    />
                    <p className="text-gray-600">Add all the places you want to visit</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <img
                      src="/assets/trip-planner.svg"
                      alt="Optimized Route"
                      className="w-8 h-8"
                    />
                    <p className="text-gray-600">Travel plan is optimized with the best route!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">A trip itinerary crafted thoughtfully by AI</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#4F46E5] rounded-full"></div>
                AI considers your starting location when generating the best routes
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#4F46E5] rounded-full"></div>
                AI suggests the best commute method
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#4F46E5] rounded-full"></div>
                AI considers popular dining places around when it's meal time
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#4F46E5] rounded-full"></div>
                AI selects places that match your travel interests and considers if you are a first-time visitor
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#4F46E5] rounded-full"></div>
                AI generates the best optimized route based on traffic, opening hours, location, visit duration, best time to visit, holidays, weather, etc.
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#4F46E5] rounded-full"></div>
                AI suggests relevant bookings based on your itinerary, e.g. tickets for the places in your plan
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-center">
            <img
              src="/assets/trip-machine.png"
              alt="Trip Planning"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
