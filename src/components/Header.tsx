import React from 'react'
import { Box, Typography } from '@mui/material'

interface HeaderProps {
  highlightCount: number
}

export const Header: React.FC<HeaderProps> = ({ highlightCount }) => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2 }}>
      <Typography variant="h6" component="h1">
        Text Highlighter
      </Typography>
      <Typography variant="caption" sx={{ opacity: 0.8 }}>
        {highlightCount} saved highlights
      </Typography>
    </Box>
  )
}