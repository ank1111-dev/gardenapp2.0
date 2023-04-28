import { useState, useEffect } from "react";
import { Typography, IconButton, CircularProgress, Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from "@mui/icons-material";
import moment from "moment";
import "moment-timezone";
import ClimateZone from "../ClimateZone";
import "./index.css"

const ErrorMessage = styled("div")({
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#8f2e06",
  marginBottom: "40px",
  padding: "10px",
  border: "1px solid red",
  borderRadius: "3px",
  textAlign: 'center'
});

const WeatherDetails = () => {
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const { location } = useParams();
  const [tempAndPrecip, setTempAndPrecip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherDataFetched, setWeatherDataFetched] = useState(false);
  const [cityName, setCityName] = useState(null);
  const navigate = useNavigate();
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const apiRegex = /^\d+$/

  const apiUrl = apiRegex.test(location)
    ? `https://api.openweathermap.org/data/2.5/weather?zip=${location},AU&appid=${apiKey}`
    : `https://api.openweathermap.org/data/2.5/weather?q=${location},AU&appid=${apiKey}`;

    useEffect(() => {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.cod === 200) {
            console.log("Timezone:", data.timezone);
            setWeatherData({
              temperature: Math.round(data.main.temp - 273.15),
              humidity: data.main.humidity,
              precipitation: data.clouds.all,
              windSpeed: data.wind.speed,
              windDirection: data.wind.deg,
              weather: data.weather[0].description,
              icon: data.weather[0].icon,
              date: moment().utcOffset(data.timezone / 60).format('lll'),
            });
            setCityName(data.name);
            setTempAndPrecip({
              temperature: Math.round(data.main.temp - 273.15),
              precipitation: data.clouds.all,
            });
            setLoading(false);
            setWeatherDataFetched(true);
          } else {
            setError("The location you entered is not valid. Please enter a valid Australian postcode or city name.");
            setLoading(false);
            setWeatherDataFetched(false);
          }
        })
        .catch(() => {
          setError("Unable to retrieve weather data");
          setLoading(false);
          setWeatherDataFetched(false);
        });
    }, [apiUrl]);
    

  const { temperature, humidity, precipitation, windSpeed, windDirection, weather, icon, date  } = weatherData || {}

  return (
    <>
      <div className="header">
        <div className="IconButtonContainer">
          <IconButton
            onClick={() => navigate(-1)}
            className="IconButton"
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
            onClick={() => navigate("/gardening-wizard")}
            className="IconButton"
          >
            <ArrowForwardIcon />
          </IconButton>
        </div>
      </div>
      <div className="WeatherContainer">
        <div className="WeatherDataContainer">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {!error && !weatherData && loading &&  (     
            <div className="LoaderContainer">
              <CircularProgress size={80} />
              <Typography variant="h5" className="LoaderText">Loading...</Typography>
            </div>
          )}
        </div>
        {weatherData && (
          <div className="WeatherCard">
            <Typography variant="h4">{cityName}</Typography>
            <Typography variant="h6">{date}</Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <img className="WeatherIcon" src={`http://openweathermap.org/img/w/${icon}.png`} alt="Iweather mage icon"/>
              <Typography variant="h5" sx={{ ml: 1 }}>
                {weather}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h5">
                  Temperature: {temperature}°C
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5">Humidity: {humidity}%</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5">
                  Precipitation: {precipitation}%
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5">
                  Wind: {windSpeed} km/h {windDirection}°
                </Typography>
              </Grid>
            </Grid>
          </div>
        )}
        {weatherDataFetched && !error && (
          <ClimateZone
            temperature={tempAndPrecip?.temperature}
            precipitation={tempAndPrecip?.precipitation}
          />
        )}   
      </div>
    </>
  );
 }
  
  export default WeatherDetails;
  

