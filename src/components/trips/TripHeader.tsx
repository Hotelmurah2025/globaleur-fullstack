import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { TripActions } from "./TripActions"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

interface TripHeaderProps {
  city: string
  startDate: Date
  endDate: Date
  view: 'map' | 'table'
  onViewChange: (view: 'map' | 'table') => void
}

export const TripHeader = ({
  city,
  startDate,
  endDate,
  view,
  onViewChange,
}: TripHeaderProps) => {
  return (
    <div className="space-y-4 border-b border-gray-200 pb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">{city}</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <div className="flex items-center border rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <div className="flex items-center gap-1">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-medium">{format(startDate, 'd')}</span>
                    <span className="text-xs">{format(startDate, 'MMM')}</span>
                    <span className="text-xs">{format(startDate, 'yyyy')}</span>
                  </div>
                  <span className="mx-2">→</span>
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-medium">{format(endDate, 'd')}</span>
                    <span className="text-xs">{format(endDate, 'MMM')}</span>
                    <span className="text-xs">{format(endDate, 'yyyy')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TripActions city={city} />
      </div>
      <Tabs value={view} onValueChange={onViewChange as any} className="w-full">
        <TabsList>
          <TabsTrigger value="map" className="px-6">Map</TabsTrigger>
          <TabsTrigger value="table" className="px-6">Table</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
