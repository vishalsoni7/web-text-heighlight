import React from 'react'
import { Box, Alert } from '@mui/material'

export const EmptyState: React.FC = () => {
  return (
    <Box sx={{ p: 3, textAlign: 'center', mt: 4 }}>
      <Alert severity="info" sx={{ textAlign: 'left' }}>
        No highlights saved yet. Select any text on a webpage and click "Save Highlight?" to get started!
      </Alert>
    </Box>
  )
}