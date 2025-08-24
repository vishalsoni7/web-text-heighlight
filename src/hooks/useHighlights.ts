import { useState, useEffect } from 'react'
import type { Highlight } from '../types/highlight'
import { loadHighlights as loadHighlightsFromApi, deleteHighlight as deleteHighlightFromApi } from '../utils/chromeApi'
import { toast } from 'react-hot-toast'

export const useHighlights = () => {
  const [highlights, setHighlights] = useState<Highlight[]>([])

  useEffect(() => {
    loadHighlights()
  }, [])

  const loadHighlights = async () => {
    const data = await loadHighlightsFromApi()
    setHighlights(data)
  }

  const deleteHighlight = async (id: string) => {
    const success = await deleteHighlightFromApi(id)
    if (success) {
      setHighlights(highlights.filter(h => h.id !== id))
      toast.success('Highlight deleted successfully!')
    }
  }

  return {
    highlights,
    deleteHighlight
  }
}