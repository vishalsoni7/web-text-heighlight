import type { Highlight } from '../types/highlight'

export const loadHighlights = (): Promise<Highlight[]> => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: 'getHighlights' }, (response) => {
      if (response && response.highlights) {
        resolve(response.highlights)
      } else {
        resolve([])
      }
    })
  })
}

export const deleteHighlight = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: 'deleteHighlight', id }, (response) => {
      resolve(response && response.success)
    })
  })
}