import React, { useState, useEffect } from 'react'
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  ThemeProvider,
  createTheme,
  CssBaseline,
  Divider,
  Link,
  Alert
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Toaster, toast } from 'react-hot-toast'
import './App.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
})

interface Highlight {
  id: string
  text: string
  url: string
  title: string
  timestamp: string
}

function App() {
  const [highlights, setHighlights] = useState<Highlight[]>([])

  useEffect(() => {
    loadHighlights()
  }, [])

  const loadHighlights = () => {
    chrome.runtime.sendMessage({ action: 'getHighlights' }, (response) => {
      if (response && response.highlights) {
        setHighlights(response.highlights)
      }
    })
  }

  const deleteHighlight = (id: string) => {
    chrome.runtime.sendMessage({ action: 'deleteHighlight', id }, (response) => {
      if (response && response.success) {
        setHighlights(highlights.filter(h => h.id !== id))
        toast.success('Highlight deleted successfully!')
      }
    })
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

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
        <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2 }}>
          <Typography variant="h6" component="h1">
            Text Highlighter
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            {highlights.length} saved highlights
          </Typography>
        </Box>
        
        {highlights.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center', mt: 4 }}>
            <Alert severity="info" sx={{ textAlign: 'left' }}>
              No highlights saved yet. Select any text on a webpage and click "Save Highlight?" to get started!
            </Alert>
          </Box>
        ) : (
          <List sx={{ overflow: 'auto', flex: 1 }}>
            {highlights.map((highlight, index) => (
              <React.Fragment key={highlight.id}>
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
                      onClick={() => deleteHighlight(highlight.id)}
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
                {index < highlights.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </ThemeProvider>
  )
}

export default App
