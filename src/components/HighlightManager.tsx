import React from 'react'
import { Box, ThemeProvider, CssBaseline } from '@mui/material'
import { Toaster } from 'react-hot-toast'
import { theme } from '../theme/theme'
import { useHighlights } from '../hooks/useHighlights'
import { Header } from './Header'
import { EmptyState } from './EmptyState'
import { HighlightList } from './HighlightList'

export const HighlightManager: React.FC = () => {
  const { highlights, deleteHighlight } = useHighlights()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster 
        position="bottom-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Box sx={{ width: 400, height: 500, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Header highlightCount={highlights.length} />
        {highlights.length === 0 ? (
          <EmptyState />
        ) : (
          <HighlightList highlights={highlights} onDelete={deleteHighlight} />
        )}
      </Box>
    </ThemeProvider>
  )
}