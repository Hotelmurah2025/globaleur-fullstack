import React from 'react'
import { Share2, BookmarkPlus } from 'lucide-react'
import { Button } from '../ui/button'
import { useToast } from '@/hooks/use-toast'

interface TripActionsProps {
  city: string
}

export const TripActions: React.FC<TripActionsProps> = ({ city }) => {
  const { toast } = useToast()

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${city} Trip Itinerary`,
        text: `Check out this ${city} trip itinerary on Globaleur!`,
        url: window.location.href
      })
    } catch (error) {
      // Fallback to copying to clipboard if Web Share API is not supported
      await navigator.clipboard.writeText(window.location.href)
      toast({
        title: 'Link copied to clipboard',
        description: 'You can now share this trip with others'
      })
    }
  }

  const handleSave = () => {
    // TODO: Implement save functionality when backend is ready
    toast({
      title: 'Trip saved',
      description: `Your ${city} trip has been saved to your profile`
    })
  }

  return (
    <div className="flex gap-4">
      <Button variant="outline" size="sm" onClick={handleShare}>
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
      <Button variant="outline" size="sm" onClick={handleSave}>
        <BookmarkPlus className="w-4 h-4 mr-2" />
        Save
      </Button>
    </div>
  )
}
