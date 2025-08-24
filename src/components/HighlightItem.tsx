import React from 'react'
import { 
  ListItem, 
  ListItemText, 
  IconButton, 
  Typography, 
  Box, 
  Link 
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import type { Highlight } from '../types/highlight'
import { formatDate } from '../utils/dateFormatter'

interface HighlightItemProps {
  highlight: Highlight
  onDelete: (id: string) => void
}

export const HighlightItem: React.FC<HighlightItemProps> = ({ highlight, onDelete }) => {
  return (
    <ListItem 
      sx={{ 
        px: 2, 
        py: 1.5,
        '&:hover': { bgcolor: 'grey.50' }
      }}
      secondaryAction={
        <IconButton 
          edge="end" 
          aria-label="delete"
          onClick={() => onDelete(highlight.id)}
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={
          <Typography 
            variant="body2" 
            sx={{ 
              fontStyle: 'italic',
              mb: 0.5,
              wordBreak: 'break-word'
            }}
          >
            "{highlight.text}"
          </Typography>
        }
        secondary={
          <Box>
            <Link 
              href={highlight.url} 
              target="_blank" 
              rel="noopener"
              sx={{ 
                fontSize: '0.75rem',
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              {highlight.title}
            </Link>
            <Typography 
              variant="caption" 
              sx={{ display: 'block', color: 'text.secondary', mt: 0.5 }}
            >
              {formatDate(highlight.timestamp)}
            </Typography>
          </Box>
        }
      />
    </ListItem>
  )
}