import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, IconButton,  } from "@mui/material";
import {  ArrowBack as ArrowBackIcon,  ArrowForward as ArrowForwardIcon, Clear as ClearIcon} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import './index.css'

const Location = () => {
  const [location, setLocation] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showRetryButton, setShowRetryButton] = useState(false);
  const navigate = useNavigate();

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (location.trim() === "") {
      setError(true);
      setErrorMessage("* Location is required");
      setShowRetryButton(false);
    } else {
      navigate(`/weather-details/${location}`);
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setError(false);
    setErrorMessage("");
    setShowRetryButton(false);

  };

  const handleRetryButtonClick = () => {
    setLocation("");
    setError(false);
    setErrorMessage("");
    setShowRetryButton(false);
  };

  return (
    <>
      <div className="header">
        <IconButton
          onClick={() => navigate(-1)}
          className="icon-button icon-button-arrow-left"
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          onClick={() => navigate("/gardening-wizard")}
          className="icon-button icon-button-arrow-right"
        >
          <ArrowForwardIcon />
        </IconButton>
      </div>
      <div className="container">
        <Typography variant="h4" className="subtitle" color="white">
          Looking for gardening plants suggestions?
        </Typography>
        <img
          src="../image/garden-ideas.jpg"
          alt="Gardening Suggestions"
          className="img"
        />
        <Typography variant="h6" className="subtitle">
          Enter your location and get plant suggestions based on the weather
          in your area.
        </Typography>
        <form onSubmit={handleLocationSubmit}>
          <div className="form">
            <TextField
              label="Enter Location"
              value={location}
              onChange={handleLocationChange}
              variant="outlined"
              error={error}
              helperText={error ? errorMessage : ""}
              className="text-field"
            />
            <IconButton
              type="submit"
              aria-label="search"
              className="icon-button"
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              onClick={handleRetryButtonClick}
              aria-label="clear"
              className={`icon-button retry-button ${
                showRetryButton ? "show" : ""
              }`}
            >
              <ClearIcon />
            </IconButton>
          </div>
        </form>
        <Typography variant="body2" className="subtitle1">
          *Accepts location name or postcode
        </Typography>
      </div>
    </>
  );
}

export default Location;
    