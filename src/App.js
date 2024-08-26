import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  Button, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardActions,
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

  const tweetQuote = () => {
    const tweetText = encodeURIComponent(`"${selectedQuote.quote}" - ${selectedQuote.author}`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <Box
      id="quote-box"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: color,
        transition: 'background-color 0.5s ease',
      }}
    >
      <Card sx={{ maxWidth: 500, width: '100%', m: 2, backgroundColor: 'white' }}>
        <CardContent>
          {selectedQuote && (
            <Box sx={{ my: 2 }}>
              <Typography id="text" variant="h6" component="div" sx={{ color: color }} gutterBottom>
                "{selectedQuote.quote}"
              </Typography>
              <Typography id="author" variant="subtitle2" sx={{ color: color }} align="right">
                - {selectedQuote.author}
              </Typography>
            </Box>
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
          <Box>
            <a 
              href="#" 
              id="tweet-quote" 
              onClick={tweetQuote}
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
        </CardActions>
      </Card>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="caption" color="white">
          ~ dedicated to Syprose by Arnold © {new Date().getFullYear()} All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
