import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  Button, 
  Typography, 
  Box, 
  IconButton
} from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import TumblrIcon from '@mui/icons-material/Portrait'; // Placeholder for Tumblr

function App() {
  const [quotes, setQuotes] = useState([]);
  const [selectedQuoteIndex, setSelectedQuoteIndex] = useState(null);
  const [color, setColor] = useState('#4caf50');

  useEffect(() => {
    fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')
      .then(response => response.json())
      .then(data => {
        setQuotes(data);
        setSelectedQuoteIndex(Math.floor(Math.random() * data.length));
      })
      .catch(error => console.error('Error fetching quotes:', error));
  }, []);

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  };

  const nextQuoteClickHandler = () => {
    setSelectedQuoteIndex(Math.floor(Math.random() * quotes.length));
    setColor(generateRandomColor());
  };

  const selectedQuote = quotes[selectedQuoteIndex];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: color,
        transition: 'background-color 0.5s ease',
      }}
    >
      <Box
        id="quote-box"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 500,
          width: '90%',
          padding: 3,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {selectedQuote && (
          <>
            <Typography id="text" variant="h6" component="div" sx={{ color: color, mb: 2 }}>
              "{selectedQuote.quote}"
            </Typography>
            <Typography id="author" variant="subtitle2" sx={{ color: color, textAlign: 'right', mb: 3 }}>
              - {selectedQuote.author}
            </Typography>
          </>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${selectedQuote?.quote}" - ${selectedQuote?.author}`)}`}
              id="tweet-quote" 
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: color, textDecoration: 'none' }}
            >
              <IconButton size="small" sx={{ color: color }}>
                <TwitterIcon />
              </IconButton>
            </a>
            <IconButton size="small" sx={{ color: color }}>
              <TumblrIcon />
            </IconButton>
          </Box>
          <Button 
            id="new-quote"
            variant="contained" 
            onClick={nextQuoteClickHandler}
            sx={{ 
              backgroundColor: color,
              '&:hover': {
                backgroundColor: color,
                opacity: 0.9,
              }
            }}
          >
            New quote
          </Button>
        </Box>
      </Box>
      <Box sx={{ position: 'absolute', bottom: 10, textAlign: 'center' }}>
        <Typography variant="caption" color="white">
          ~ dedicated to Syprose by Arnold © {new Date().getFullYear()} All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default App;