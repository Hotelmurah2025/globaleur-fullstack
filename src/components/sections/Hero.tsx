import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPin } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"

export default function Hero() {
  const [date, setDate] = useState<Date>()

  return (
    <section className="relative flex min-h-[600px] flex-col items-center justify-center bg-[#0000E6] px-4 py-24 text-center text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
      <div className="relative z-10 max-w-4xl">
        <h1 className="mb-4 text-5xl font-bold">Travel Smart</h1>
        <p className="mb-2 text-xl">A new way to plan</p>
        <p className="mb-12 text-lg opacity-90">
          Plan your travel itinerary with AI recommendation & route optimization
        </p>

        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 sm:flex-row">
          <div className="relative w-full">
            <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Where are you going?"
              className="h-12 w-full bg-white/10 pl-10 text-white placeholder:text-gray-300 focus:bg-white/20"
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-12 w-full justify-start bg-white/10 text-left font-normal text-gray-300 hover:bg-white/20 hover:text-white sm:w-[200px]"
              >
                <CalendarIcon className="mr-2 h-5 w-5" />
                {date ? format(date, "PPP") : "Select dates"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="rounded-md border-none bg-white p-3"
              />
            </PopoverContent>
          </Popover>

          <Button
            className="h-12 w-full bg-[#6366F1] text-white hover:bg-[#4F46E5] sm:w-auto"
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  )
}
