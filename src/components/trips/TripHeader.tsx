import { Button } from "../ui/button"
import { CalendarIcon, Share2, BookmarkPlus } from "lucide-react"
import { format } from "date-fns"

interface TripHeaderProps {
  city: string
  startDate: Date
  endDate: Date
  onShare?: () => void
  onSave?: () => void
}

export const TripHeader = ({
  city,
  startDate,
  endDate,
  onShare,
  onSave,
}: TripHeaderProps) => {
  return (
    <div className="flex justify-between items-center py-4 border-b">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold">{city}</h1>
        <div className="flex items-center gap-2 text-gray-600">
          <div className="flex items-center border rounded-lg px-3 py-2">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <div className="flex items-center gap-1">
                <div className="flex flex-col items-center">
                  <span className="text-sm">{format(startDate, 'd')}</span>
                  <span className="text-xs">{format(startDate, 'MMM')}</span>
                  <span className="text-xs">{format(startDate, 'yyyy')}</span>
                </div>
                <span className="mx-2">→</span>
                <div className="flex flex-col items-center">
                  <span className="text-sm">{format(endDate, 'd')}</span>
                  <span className="text-xs">{format(endDate, 'MMM')}</span>
                  <span className="text-xs">{format(endDate, 'yyyy')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="gap-2" onClick={onShare}>
          <Share2 className="w-4 h-4" />
          Share
        </Button>
        <Button variant="default" className="gap-2" onClick={onSave}>
          <BookmarkPlus className="w-4 h-4" />
          Save
        </Button>
      </div>
    </div>
  )
}
