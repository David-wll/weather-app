import React, { useState } from 'react';
import axios from 'axios';
import { 
  AppBar, Toolbar, Typography, Container, TextField, Button, Card, CardContent, 
  Grid, Box, CircularProgress, IconButton 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=938058fcc5ebb4d15aace98d0d2aa1b7`;

  const searchLocation = () => {
    setLoading(true);
    axios.get(url).then((response) => {
      setData(response.data);
      setLoading(false);
      console.log(response.data);
    }).catch(() => {
      setLoading(false);
    });
  };

  return (
    <div className="app">
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #73a5ff, #5477f5)' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            WeatherApp
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{ 
              backgroundColor: 'white', 
              borderRadius: 1, 
              marginRight: 2, 
              width: '250px' 
            }}
          />
          <IconButton color="inherit" onClick={searchLocation}>
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ 
      marginTop: 4, 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center', 
      flexDirection: 'column' 
      }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Card sx={{ 
            minWidth: 275, 
            borderRadius: 3, 
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', 
            backgroundColor: 'rgba(255, 255, 255, 0.9)' 
          }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h4" align="center">
                    {data.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  {data.main ? (
                    <>
                      <Typography variant="h2">
                        {Math.round(data.main.temp - 273.15)}°C
                      </Typography>
                      <Typography variant="h6">
                        {data.weather ? data.weather[0].description : ''}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="h6">
                      Enter a location to see the weather.
                    </Typography>
                  )}
                </Grid>
                {data.main && (
                  <>
                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                  <WbSunnyIcon fontSize="large" sx={{ marginBottom: 1, color: '#ffeb3b' }} />
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {Math.round(data.main.feels_like - 273.15)}°C
                  </Typography>
                  <Typography>Feels like</Typography>
                </Grid>

                    <Grid item xs={4} sx={{ textAlign: 'center' }}>
                      <OpacityIcon fontSize="large" />
                      <Typography variant="h5">{data.main.humidity}%</Typography>
                      <Typography>Humidity</Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: 'center' }}>
                      <AirIcon fontSize="large" />
                      <Typography variant="h5">{data.wind.speed} MPH</Typography>
                      <Typography>Wind speed</Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </CardContent>
          </Card>
        )}
      </Container>
    </div>
  );
}

export default App;
