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
    <div className="space-y-6 py-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">{city}</h1>
          <div className="flex items-center text-muted-foreground">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>
              {format(startDate, "MMM d")} - {format(endDate, "MMM d, yyyy")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={onShare}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={onSave}
          >
            <BookmarkPlus className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
